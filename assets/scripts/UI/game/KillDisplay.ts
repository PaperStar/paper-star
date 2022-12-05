import type { Label } from 'cc'
import { Animation, Component, _decorator } from 'cc'
const { ccclass, property } = _decorator

@ccclass('KillDisplay')
export class KillDisplay extends Component {
  anim: Animation

  @property({
    tooltip: '击杀数',
  })
  labelKills: Label

  onLoad() {
    this.anim = this.getComponent(Animation)
  }

  playKill(kills) {
    this.node.active = true
    this.labelKills.string = kills
    this.anim.play('kill-pop')
  }

  hide() {
    this.node.active = false
  }
}
