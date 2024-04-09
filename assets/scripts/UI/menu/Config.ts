import { Component, _decorator, director, log, sys } from 'cc'
import { loadStartMenu } from '../../utils'
import type { About } from './About'

const { ccclass } = _decorator

@ccclass('Config')
export class Config extends Component {
  about: About

  onLoad() {
    this.about = this.about.getComponent('About') as About
  }

  backToStartMenu() {
    this.close()
    loadStartMenu()
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
