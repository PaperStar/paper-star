import type { Node } from 'cc'
import { Component, _decorator, director, log, sys } from 'cc'

const { ccclass } = _decorator

@ccclass('Config')
export class Config extends Component {
  about: Node

  onLoad() {
    this.about = this.about.getComponent('About')
  }

  backToStartMenu() {
    this.close()
    Global.Helpers.loadStartMenu()
  }

  loadStoryBoard() {
    this.close()
    director.loadScene('StoryBoard', () => {
      log('StoryBoard is loaded.')
    })
  }

  openAbout() {
    this.about.open()
  }

  open() {
    if (Global.userInfo)
      Global.userInfo.hide()

    if (sys.platform === sys.WECHAT_GAME)
      Global.wxGame.gameClubButton.hide()

    if (this.about.active)
      this.about.close()

    this.node.active = true
  }

  close() {
    if (Global.userInfo) {
      if (director.getScene().name === 'StartMenu')
        Global.userInfo.show()
    }
    if (sys.platform === sys.WECHAT_GAME)
      Global.wxGame.gameClubButton.show()

    this.node.active = false
  }
}
