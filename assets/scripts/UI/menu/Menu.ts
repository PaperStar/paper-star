import type { Node } from 'cc'
import { Component, _decorator, sys } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Menu')
export class Menu extends Component {
  @property()
  config: Node

  rank: Node

  onLoad() {
    if (Global.userInfo)
      Global.userInfo.show()

    if (sys.platform === sys.WECHAT_GAME)
      Global.wxGame.gameClubButton.show()
  }

  start() {
    this.initConfig()
    this.initRank()
  }

  initConfig() {
    if (!Global.config) {
      cc.game.addPersistRootNode(this.config)
      Global.config = this.config.getComponent('Config')
    }
    Global.config.close()
  }

  initRank() {
    if (!Global.rank) {
      cc.game.addPersistRootNode(this.rank)
      Global.rank = this.rank.getComponent('Rank')
      Global.rank.init()
    }
    Global.rank.close()
  }

  loadModeMenu() {
    cc.director.loadScene('ModeMenu', () => {
      cc.log('ModeMenu is loaded.')
    })
  }

  openConfigMenu() {
    Global.config.open()
  }

  toggleRankList() {
    if (Global.rank.node.active)
      Global.rank.close()

    else
      Global.rank.open()
  }

  // system
  loadAchieveSystem() {
    cc.director.loadScene('AchieveSystem', () => {
      cc.log('AchieveSystem is loaded.')
    })
  }

  loadRankSystem() {
    cc.director.loadScene('RankSystem', () => {
      cc.log('RankSystem is loaded.')
    })
  }
}
