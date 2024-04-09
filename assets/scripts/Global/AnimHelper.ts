import type { EventHandler } from 'cc'
import { Component, ParticleSystem, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('AnimHelper')
export class AnimHelper extends Component {
  @property({
    type: ParticleSystem,
    tooltip: 'Particle to play',
  })
  particleToPlay: ParticleSystem

  finishHandler: EventHandler
  fireHandler: EventHandler

  // use this for initialization
  playParticle() {
    if (this.particleToPlay)
      this.particleToPlay.resetInEditor()
  }

  fire() {
    Component.EventHandler.emitEvents([this.fireHandler])
  }

  finish() {
    Component.EventHandler.emitEvents([this.finishHandler])
  }
}
