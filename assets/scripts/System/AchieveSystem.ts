import { Component, _decorator } from 'cc'
const { ccclass } = _decorator

@ccclass('AchieveSystem')
export class AchieveSystem extends Component {
  start() {
    if (Global.userInfo)
      Global.userInfo.hide()
  }
}
