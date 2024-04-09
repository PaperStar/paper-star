import type { Color, Label, Sprite } from 'cc'
import { Component, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('ComboDisplay')
export class ComboDisplay extends Component {
  @property()
  labelCombo: Label

  spFlare: Sprite
  comboColors: Color[]

  @property({
    tooltip: '展示时间',
  })
  showDuration = 0

  onLoad() {
    this.anim = this.getComponent(cc.Animation)
  }

  init() {
    this.comboCount = 0
    this.node.active = false
    this.showTimer = 0
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
