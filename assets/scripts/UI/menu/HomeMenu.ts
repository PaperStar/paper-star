import { Component, Node, _decorator, director, find, log, v3 } from 'cc'
import { SCENE } from '../../constants'

const { ccclass, property } = _decorator

@ccclass('Menu')
export class Menu extends Component {
  @property({
    type: Node,
    tooltip: 'Config node',
  })
  config: Node

  rank: Node

  onLoad() {
    // if (sys.platform === sys.Platform.WECHAT_GAME)
    //   Global.wxGame.gameClubButton.show()
  }

  start() {
    this.initConfig()
    this.initRank()

    this.initPlayButton()
  }

  initPlayButton() {
    const playButton = find('Canvas/start-menu-bg/home-menu/play-button')
    playButton.on(Node.EventType.TOUCH_START, () => {
      playButton.setScale(v3(0.9, 0.9, 0.9))
    })
    playButton.on(Node.EventType.TOUCH_END, () => {
      playButton.setScale(v3(1, 1, 1))
    })
  }

  initConfig() {
    // if (!Global.config) {
    //   cc.game.addPersistRootNode(this.config)
    //   Global.config = this.config.getComponent('Config')
    // }
    // Global.config.close()
  }

  initRank() {
    // if (!Global.rank) {
    //   cc.game.addPersistRootNode(this.rank)
    //   Global.rank = this.rank.getComponent('Rank')
    //   Global.rank.init()
    // }
    // Global.rank.close()
  }

  /**
   * load 道具模式
   */
  loadPropsMode() {
    director.loadScene(SCENE.PROPS_MODE)
  }

  loadModeMenu() {
    director.loadScene('ModeMenu', () => {
      log('ModeMenu is loaded.')
    })
  }

  openConfigMenu() {
    // Global.config.open()
  }

  toggleRankList() {
    // if (Global.rank.node.active)
    //   Global.rank.close()

    // else
    //   Global.rank.open()
  }

  // system
  loadAchieveSystem() {
    director.loadScene('AchieveSystem', () => {
      log('AchieveSystem is loaded.')
    })
  }

  loadRankSystem() {
    director.loadScene('RankSystem', () => {
      log('RankSystem is loaded.')
    })
  }
}
