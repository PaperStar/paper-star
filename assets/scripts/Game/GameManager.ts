import type { Node } from 'cc'
import { Animation, Camera, Color, Component, _decorator, director, error, instantiate, resources } from 'cc'
import type { PoolMng } from '../global/PoolMng'
import type { Player } from '../player/Player'
import type { DeathUI } from '../ui/game/DeathUI'
import type { GameOverUI } from '../ui/GameOverUI'
import type { InGameUI } from '../ui/game/InGameUI'
import type { UserInfo } from '../begin/UserInfo'
import type { SortMng } from './render/SortMng'
import type { PlayerFX } from './render/PlayerFX'
import { BulletMng } from './manager/BulletMng'
import { MapControl } from './map/MapControl'
import type { WaveMng } from './wave/WaveMng'

import type { BossMng } from './enemy/BossMng'

const { ccclass, property } = _decorator

@ccclass('GameManager')
export class GameManager extends Component {
  @property(MapControl)
  map: MapControl

  // user
  userInfo: UserInfo

  player: Player
  playerFX: PlayerFX
  foeGroup: Node
  mainCamera: Camera

  // manager
  bulletMng: BulletMng
  poolMng: PoolMng
  sortMng: SortMng
  waveMng: WaveMng
  bossMng: BossMng

  // ui
  deathUI: DeathUI
  gameOverUI: GameOverUI
  inGameUI: InGameUI

  startTime: number

  onLoad() {
    this.map = this.map.getComponent('MapControl') as MapControl
    this.map.init()

    this.playerFX = this.playerFX.getComponent('PlayerFX') as PlayerFX
    this.playerFX.init(this)

    // init UI & Camera in player
    this.initPlayer()
    this.poolMng = this.poolMng.getComponent('PoolMng') as PoolMng
    this.poolMng.init()
    // this.waveMng = this.waveMng.getComponent('WaveMng');
    // this.waveMng.init(this);
    // this.bossMng = this.bossMng.getComponent('BossMng');
    // this.bossMng.init(this);
    this.sortMng = this.foeGroup.getComponent('SortMng') as SortMng
    this.initMng()

    // user
    director.addPersistRootNode(this.userInfo.node)
    this.userInfo = this.userInfo.getComponent('UserInfo') as UserInfo
    this.userInfo.init()
  }

  start() {
    this.playerFX.playIntro()
  }

  initPlayer() {
    resources.load('prefab/role/player/main', (err, prefab) => {
      if (err) {
        error(err.message || err)
        return
      }
      const playerInstance = instantiate(prefab)
      this.player = playerInstance.getComponent('Player') as Player
      this.node.addChild(this.player.node)
      this.player.init(this)
      this.player.node.active = false

      this.initUI()
      this.initCamera()
    })
  }

  initCamera() {
    // set default bg color gray
    Camera.main.backgroundColor = Color.GRAY
    this.mainCamera = this.mainCamera.getComponent('MainCamera')
    this.mainCamera.init(this.player.node)
  }

  initUI() {
    // UI initialization
    this.inGameUI = this.inGameUI.getComponent('InGameUI') as InGameUI
    this.inGameUI.init(this)
    this.deathUI = this.deathUI.getComponent('DeathUI') as DeathUI
    this.deathUI.init(this)
    this.gameOverUI = this.gameOverUI.getComponent('GameOverUI') as GameOverUI
    this.gameOverUI.init(this)
  }

  initMng() {
    this.bulletMng = new BulletMng()
    this.bulletMng.init(this)
  }

  pause() {
    director.pause()
  }

  resume() {
    director.resume()
  }

  cameraShake() {
    this.mainCamera.node.getComponent(Animation).play('shake')
  }

  death() {
    // this.pause()
    this.deathUI.show()
  }

  revive() {
    // this.resume()
    this.deathUI.hide()
    this.playerFX.playRevive()
    this.player.revive()
  }

  clearAllFoes() {
    const nodeList = this.foeGroup.children
    for (let i = 0; i < nodeList.length; ++i) {
      const foe = nodeList[i].getComponent('Foe')
      if (foe) {
        foe.dead()
      }
      else {
        const bullet = nodeList[i].getComponent('bullet')
        if (bullet)
          bullet.broke()
      }
    }
  }

  playerReady() {
    // this.resume()
    // this.waveMng.startWave();
    this.player.node.active = true
    this.player.ready()

    this.startTime = new Date().valueOf()
  }

  gameOver() {
    const endTime = new Date().valueOf()
    this.player.cost_ms = endTime - this.startTime
    // this.resume()
    this.player.storeUserGameData()
    this.deathUI.hide()
    this.gameOverUI.show()
  }

  restart() {
    // cc.director.loadScene('ModeMenu')
    director.loadScene('FreeMode')
  }
}
