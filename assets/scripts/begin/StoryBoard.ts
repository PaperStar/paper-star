import type { Animation } from 'cc'
import { Component, _decorator } from 'cc'
import { loadStartMenu } from '../utils'

const { ccclass, property } = _decorator

@ccclass('StoryBoard')
export class StoryBoard extends Component {
  bgAnim: Animation = null

  @property()
  storyBoardAnim: Animation = null

  start() {
    this.scheduleOnce(this.bgFadeIn, this.storyBoardAnim.defaultClip.duration)
  }

  bgFadeIn() {
    this.bgAnim.play('bgFadeIn')
    this.scheduleOnce(
      loadStartMenu,
      this.bgAnim.currentClip.duration,
    )
  }
}
