import type { Node } from 'cc'
import { Camera, Color, Component, _decorator, director, error, instantiate, resources } from 'cc'
import { BulletMng } from './manager/BulletMng'

const { ccclass, property } = _decorator

@ccclass('Game')
export class Game extends Component {
  @property()
  map: Node

  inGameUI: Node
  playerFX: Node
  waveMng: Node
  bossMng: Node
  poolMng: Node
  foeGroup: Node
  deathUI: Node
  gameOverUI: Node
  mainCamera: Camera

  onLoad() {
    this.map = this.map.getComponent('MapControl')
    this.map.init(this)
    this.playerFX = this.playerFX.getComponent('PlayerFX')
    this.playerFX.init(this)
    // init UI & Camera in player
    this.initPlayer()
    this.poolMng = this.poolMng.getComponent('PoolMng')
    this.poolMng.init()
    // this.waveMng = this.waveMng.getComponent('WaveMng');
    // this.waveMng.init(this);
    // this.bossMng = this.bossMng.getComponent('BossMng');
    // this.bossMng.init(this);
    this.sortMng = this.foeGroup.getComponent('SortMng')
    this.sortMng.init()

    this.initMng()
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
      this.player = instantiate(prefab).getComponent('Player')
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
    this.inGameUI = this.inGameUI.getComponent('InGameUI')
    this.inGameUI.init(this)
    this.deathUI = this.deathUI.getComponent('DeathUI')
    this.deathUI.init(this)
    this.gameOverUI = this.gameOverUI.getComponent('GameOverUI')
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

    this.startTime = new Date()
  }

  gameOver() {
    this.endTime = new Date()
    this.player.cost_ms = this.endTime - this.startTime
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
