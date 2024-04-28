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
import { GameState } from '../constants'
import type { SortMng } from './render/SortMng'
import { PlayerFX } from './render/PlayerFX'
import { BulletMng } from './manager/BulletMng'
import { MapControl } from './map/MapControl'
import type { WaveMng } from './wave/WaveMng'

import type { BossMng } from './enemy/BossMng'
import { Foe } from './enemy/Foe'
import { Bullet } from './objects/bullet/Bullet'

const { ccclass, property } = _decorator

@ccclass('GameManager')
export class GameManager extends Component {
  static curState = GameState.INIT

  // user
  static userInfo: UserInfo
  static player: Player

  playerFX: PlayerFX = null!
  foeGroup: Node = null!

  // manager
  static bulletMng: BulletMng
  static poolMng: PoolMng
  static sortMng: SortMng
  static waveMng: WaveMng
  static bossMng: BossMng

  // ui
  static deathUI: DeathUI
  static gameOverUI: GameOverUI
  static inGameUI: InGameUI

  /**
   * 游戏开始时间
   */
  static startTime: number
  static costTime: number

  @property({
    type: Prefab,
    tooltip: 'Player Prefab',
  })
  playerPrefab: Prefab = null!

  @property({
    type: Prefab,
    tooltip: 'Fight Panel Prefab',
  })
  fightPanelPrefab: Prefab = null!

  // internal
  static mainCamera: MainCamera
  static map: MapControl
  static fightPanelNode: Node

  /**
   * 改变游戏状态
   */
  static setCurState(state: GameState) {
    this.curState = state
    switch (state) {
      case GameState.INIT:
        break
      case GameState.PLAYING:
        break
      case GameState.OVER:
        break
      default:
        break
    }
  }

  async onLoad() {
    GameManager.mainCamera = find('Canvas/Camera')!.getComponent(MainCamera)!

    const mapNode = find('Canvas/map')!
    GameManager.map = mapNode.getComponent(MapControl)!
    GameManager.map.init()

    // init UI & Camera in player
    this.initPlayer()

    GameManager.poolMng = find('pool-mng')!.getComponent(PoolMng)!
    GameManager.poolMng.init()
    // this.waveMng = this.waveMng.getComponent('WaveMng');
    // this.waveMng.init(this);
    // this.bossMng = this.bossMng.getComponent('BossMng');
    // this.bossMng.init(this);
    // this.sortMng = this.foeGroup.getComponent(SortMng)
    this.initMng()

    // user
    GameManager.userInfo = find('UICanvas/user-info')!.getComponent(UserInfo)!
    GameManager.userInfo.init()

    GameManager.fightPanelNode = await ResourceUtil.createUI(this.fightPanelPrefab)
  }

  start() {
    // 进入动画
    this.playerFX?.playIntro()
  }

  initPlayer() {
    const playerInstance = instantiate(this.playerPrefab)
    GameManager.player = playerInstance.getComponent(Player)!
    GameManager.player.node.active = true
    this.node.addChild(GameManager.player.node)
    GameManager.player.init(this)

    this.playerFX = GameManager.player.node.getChildByName('playerFX')!.getComponent(PlayerFX)!
    // TODO: playerFX
    // this.playerFX.init(this)

    this.initUI()
    GameManager.mainCamera.setTarget(GameManager.player.node)
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
    GameManager.bulletMng = new BulletMng()
    GameManager.bulletMng.init(this)
  }

  pause() {
    director.pause()
  }

  resume() {
    director.resume()
  }

  cameraShake() {
    GameManager.mainCamera.node.getComponent(Animation)?.play('shake')
  }

  death() {
    // this.pause()
    GameManager.deathUI.show()
  }

  revive() {
    // this.resume()
    GameManager.deathUI.hide()
    this.playerFX.playRevive()
    GameManager.player.revive()
  }

  clearAllFoes() {
    const nodeList = this.foeGroup.children
    for (let i = 0; i < nodeList.length; ++i) {
      const foe = nodeList[i].getComponent(Foe)
      if (foe) {
        foe.dead()
      }
      else {
        const bullet = nodeList[i].getComponent(Bullet)
        if (bullet)
          bullet.broke()
      }
    }
  }

  playerReady() {
    // this.resume()
    // this.waveMng.startWave();
    GameManager.player.node.active = true
    GameManager.player.ready()

    GameManager.startTime = new Date().valueOf()
  }

  gameOver() {
    const endTime = new Date().valueOf()
    GameManager.costTime = endTime - GameManager.startTime

    // this.resume()
    // TODO: store data
    // this.player.storeUserGameData()
    GameManager.deathUI.hide()
    GameManager.gameOverUI.show()
  }

  restart() {
    // cc.director.loadScene('ModeMenu')
    director.loadScene('FreeMode')
  }
}
