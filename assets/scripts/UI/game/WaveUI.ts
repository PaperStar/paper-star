import type { Label } from 'cc'
import { Animation, Component, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('WaveUI')
export class WaveUI extends Component {
  anim: Animation

  @property()
  labelWave: Label

  onLoad() {
    this.anim = this.getComponent(Animation)
  }

  show(num: number) {
    this.labelWave.string = num.toString()
    this.anim.play('wave-pop')
  }

  hide() {
    this.node.active = false
  }
}
