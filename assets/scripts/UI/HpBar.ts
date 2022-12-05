import type { Node } from 'cc'
import { Color, Component, ProgressBar, _decorator } from 'cc'
const { ccclass, property } = _decorator

@ccclass('HpBar')
export class HpBar extends Component {
  @property()
  bar: Node

  @property()
  anim: Animation

  init() {
    this.node.opacity = 0
    this.progressBar = this.getComponent(ProgressBar)
  }

  setDisplayPosition(pos) {
    const percent = pos.y / (this.node.height * this.node.scale)
    this.node.setAnchorPoint(0.5, -percent)
    this.bar.setAnchorPoint(0, -percent)
  }

  show() {
    this.node.opacity = 255
  }

  display(curHp, hp) {
    const percent = curHp / hp
    this.progressBar.progress = percent
    if (percent > 0.7)
      this.bar.color = Color.GREEN

    else if (percent > 0.3)
      this.bar.color = Color.YELLOW

    else
      this.bar.color = Color.RED

    // fade
    if (this.anim)
      this.anim.play('hpBarFade')
  }

  update() {
    this.node.rotation = -this.node.parent.rotation
  }
}
