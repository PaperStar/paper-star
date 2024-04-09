import { Animation, Component, _decorator, log, macro, profiler, sys, view } from 'cc'
// https://docs.cocos.com/creator3d/manual/zh/scripting/modules/#%E8%B0%83%E8%AF%95%E7%BA%A7%E5%88%AB
import { DEBUG } from 'cc/env'
import { displayEgg, loadStartMenu } from '../utils'

const { ccclass, property } = _decorator

@ccclass('Logo')
export class Logo extends Component {
  @property({
    type: Animation,
    tooltip: 'Logo Animation',
  })
  logoAnim: Animation

  onLoad() {
    // cur os
    log(`os:${sys.os}`)

    view.setOrientation(macro.ORIENTATION_LANDSCAPE)

    if (DEBUG)
      profiler.showStats()
  }

  start() {
    displayEgg()

    this.logoAnim.on(Animation.EventType.FINISHED, () => {
      loadStartMenu()
    })
    this.logoAnim.play()
  }
}
