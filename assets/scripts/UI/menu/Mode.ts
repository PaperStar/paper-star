import { Component, _decorator, director, sys } from 'cc'
const { ccclass } = _decorator

@ccclass('Mode')
export class Mode extends Component {
  onLoad() {
    if (Global.userInfo)
      Global.userInfo.node.active = false

    if (sys.platform === sys.WECHAT_GAME)
      Global.wxGame.gameClubButton.hide()
  }

  // mode
  loadFreeMode() {
    director.loadScene('FreeMode')
  }

  loadGravityMode() {
    director.loadScene('GravityMode')
  }

  loadMissionMode() {
    director.loadScene('MissionMode')
  }

  loadPropsMode() {
    director.loadScene('PropsMode')
  }
}
