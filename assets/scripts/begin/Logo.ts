import { Animation, Component, _decorator, log, macro, profiler, sys, view } from 'cc'

const { ccclass, property } = _decorator

@ccclass('Logo')
export class Logo extends Component {
  @property(Animation)
  logoAnim: Animation

  onLoad() {
    log(`os:${sys.os}`)

    view.setOrientation(macro.ORIENTATION_LANDSCAPE)
    profiler.showStats()
  }

  start() {
    // Global.Helpers.displayEgg()
    this.scheduleOnce(() => {
      // Global.Helpers.loadStartMenu()
    }, this.logoAnim.defaultClip.duration)
  }
}
