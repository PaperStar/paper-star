import { Animation, Component, Label, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('WaveUI')
export class WaveUI extends Component {
  anim: Animation

  @property({
    type: Label,
    tooltip: '显示波数',
  })
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
