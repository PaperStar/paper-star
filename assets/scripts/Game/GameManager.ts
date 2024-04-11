import type { Node } from 'cc'
import { Animation, Component, Prefab, _decorator, director, find, instantiate } from 'cc'
import { PoolMng } from '../global/PoolMng'
import { Player } from '../player/Player'
import type { DeathUI } from '../ui/game/DeathUI'
import type { GameOverUI } from '../ui/GameOverUI'
import type { InGameUI } from '../ui/game/InGameUI'
import { UserInfo } from '../begin/UserInfo'
import { MainCamera } from '../system/camera/MainCamera'
import { ResourceUtil } from '../framework/utils'
import type { SortMng } from './render/SortMng'
import { PlayerFX } from './render/PlayerFX'
import { BulletMng } from './manager/BulletMng'
import { MapControl } from './map/MapControl'
import type { WaveMng } from './wave/WaveMng'

import type { BossMng } from './enemy/BossMng'

const { ccclass, property } = _decorator

@ccclass('GameManager')
export class GameManager extends Component {
  static isGameStart = false

  // user
  userInfo: UserInfo

  player: Player
  playerFX: PlayerFX
  foeGroup: Node

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

  @property({
    type: Prefab,
    tooltip: 'Player Prefab',
  })
  playerPrefab: Prefab

  @property({
    type: Prefab,
    tooltip: 'Fight Panel Prefab',
  })
  fightPanelPrefab: Prefab

  // internal
  mainCamera: MainCamera
  map: MapControl

  fightPanelNode: Node

  async onLoad() {
    this.mainCamera = find('Canvas/Camera').getComponent(MainCamera)

    const mapNode = find('Canvas/map')
    const mapControl = mapNode.getComponent(MapControl)
    this.map = mapControl
    this.map.init()

    // init UI & Camera in player
    this.initPlayer()

    this.poolMng = find('pool-mng').getComponent(PoolMng)
    this.poolMng.init()
    // this.waveMng = this.waveMng.getComponent('WaveMng');
    // this.waveMng.init(this);
    // this.bossMng = this.bossMng.getComponent('BossMng');
    // this.bossMng.init(this);
    // this.sortMng = this.foeGroup.getComponent(SortMng)
    this.initMng()

    // user
    this.userInfo = find('UICanvas/user-info').getComponent(UserInfo)
    this.userInfo.init()

    this.fightPanelNode = await ResourceUtil.createUI(this.fightPanelPrefab)
  }

  start() {
    // 进入动画
    this.playerFX?.playIntro()
  }

  initPlayer() {
    const playerInstance = instantiate(this.playerPrefab)
    this.player = playerInstance.getComponent(Player)
    this.player.node.active = true
    this.node.addChild(this.player.node)
    this.player.init(this)

    this.playerFX = this.player.node.getChildByName('playerFX').getComponent(PlayerFX)
    // TODO: playerFX
    // this.playerFX.init(this)

    this.initUI()
    this.mainCamera.setTarget(this.player.node)
  }

  initUI() {
    // UI initialization
    // this.inGameUI = this.inGameUI.getComponent(InGameUI)
    // this.inGameUI.init(this)
    // this.deathUI = this.deathUI.getComponent(DeathUI)
    // this.deathUI.init(this)
    // this.gameOverUI = this.gameOverUI.getComponent(GameOverUI)
    // this.gameOverUI.init(this)
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
    // TODO: store data
    // this.player.storeUserGameData()
    this.deathUI.hide()
    this.gameOverUI.show()
  }

  restart() {
    // cc.director.loadScene('ModeMenu')
    director.loadScene('FreeMode')
  }
}
