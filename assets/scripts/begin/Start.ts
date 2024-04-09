import type { Node } from 'cc'
import { Component, _decorator, director, sys, view } from 'cc'
import { loadStoryBoard } from '../utils'
import type { UserInfo } from './UserInfo'

const { ccclass, property } = _decorator

@ccclass('Start')
export class Start extends Component {
  @property({
    tooltip: '微信小游戏',
  })
  wxGame: Node = null

  userInfo: UserInfo = null

  start() {
    switch (sys.platform) {
      case sys.Platform.WECHAT_GAME:
        if (!Global.wxGame)
          this.initWxGame()

        break
      default:
        view.enableAutoFullScreen(true)
        break
    }

    this.next()
  }

  initWxGame() {
    director.addPersistRootNode(this.wxGame)
    this.wxGame = this.wxGame.getComponent('wxGame')
    this.wxGame.init(Global.userInfo)
    Global.wxGame = this.wxGame
  }

  // 判断是否可以读取到用户信息
  next() {
    if (Global.userInfo.getUserInfo()) {
      Global.userInfo.displayUserInfo()
      Global.userInfo.show()
    }
    else {
      const userInfo = {
        nickName: '匿名',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYS5cD3BZMvoJe6LSC6jOyuKIYnMlibuqAxiaz586GoTuXXm6VEO4W85zqnxrUicWYh6KO83yunhHlw/132',
      }
      Global.userInfo.storeUserInfo(userInfo)
      loadStoryBoard()
    }
  }
}
