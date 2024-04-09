import { Animation, Component, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('StoryBoard')
export class StoryBoard extends Component {
  bgAnim: Animation = null

  @property(Animation)
  storyBoardAnim: Animation = null

  // start() {
  //   this.scheduleOnce(this.bgFadeIn, this.storyBoardAnim.defaultClip.duration)
  // }

  // bgFadeIn() {
  //   this.bgAnim.play('bgFadeIn')
  //   this.scheduleOnce(
  //     loadStartMenu,
  //     this.bgAnim.defaultClip.duration,
  //   )
  // }
}
