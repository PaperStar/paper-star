import type { ParticleSystem } from 'cc'
import { Component, _decorator } from 'cc'
const { ccclass, property } = _decorator

@ccclass('NewComponent')
export class NewComponent extends Component {
  @property({
    tooltip: '粒子效果',
  })
  fxParticle: ParticleSystem

  init(waveMng) {
    this.waveMng = waveMng
  }

  show() {
    this.node.active = true
  }

  hide() {
    this.node.active = false
  }

  showParticle() {
    this.fxParticle.resetSystem()
  }
}
