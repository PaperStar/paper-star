import type { ParticleSystem } from 'cc'
import { Component, _decorator } from 'cc'
const { ccclass, property } = _decorator

@ccclass('AnimHelper')
export class AnimHelper extends Component {
  @property()
  particleToPlay: ParticleSystem

  finishHandler: Component.EventHandler
  fireHandler: Component.EventHandler

  // use this for initialization
  playParticle() {
    if (this.particleToPlay)
      this.particleToPlay.resetSystem()
  }

  fire() {
    Component.EventHandler.emitEvents([this.fireHandler])
  }

  finish() {
    Component.EventHandler.emitEvents([this.finishHandler])
  }
}
