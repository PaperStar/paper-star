import type { Color, Sprite } from 'cc'
import { Animation, Component, Label, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('ComboDisplay')
export class ComboDisplay extends Component {
  @property({
    type: Label,
    tooltip: '显示连击数',
  })

  @property({
    tooltip: '展示时间',
  })

  anim: Animation

  labelCombo: Label

  spFlare: Sprite
  comboColors: Color[]

  comboCount = 0
  showDuration = 0
  showTimer = 0

  onLoad() {
    this.anim = this.getComponent(Animation) as Animation
  }

  init() {
    this.node.active = false
  }

  // use this for initialization
  playCombo() {
    this.comboCount++
    this.node.active = true
    // this.unschedule(this.hide);
    const colorIdx = Math.min(
      Math.floor(this.comboCount / 10),
      this.comboColors.length - 1,
    )
    this.spFlare.node.color = this.comboColors[colorIdx]
    this.labelCombo.node.color = this.comboColors[colorIdx]
    this.labelCombo.string = this.comboCount
    this.anim.play('combo-pop')
    this.showTimer = 0
    // this.scheduleOnce(this.hide.bind(this), this.showDuration );
  }

  // called every frame, uncomment this function to activate update callback
  hide() {
    this.comboCount = 0
    this.node.active = false
  }

  update(dt) {
    if (!this.node.active)
      return

    this.showTimer += dt
    if (this.showTimer >= this.showDuration)
      this.hide()
  }
}
