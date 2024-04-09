import { Animation, Component, _decorator } from 'cc'
import type { GameManager } from '../GameManager'

const { ccclass, property } = _decorator

@ccclass('PlayerFX')
export class PlayerFX extends Component {
  @property({
    type: Animation,
    tooltip: 'Intro animation',
  })
  introAnim: Animation

  @property({
    type: Animation,
    tooltip: 'Dead animation',
  })
  deadAnim: Animation

  @property({
    type: Animation,
    tooltip: 'Revive animation',
  })
  reviveAnim: Animation

  game: GameManager

  // use this for initialization
  init(game: GameManager) {
    this.game = game
    this.introAnim.node.active = false
    this.deadAnim.node.active = false
    this.reviveAnim.node.active = false

    // finish callback
    this.introAnim.on('finished', this.introFinish, this)
    this.deadAnim.on('finished', this.deadFinish, this)
    this.reviveAnim.on('finished', this.reviveFinish, this)
  }

  playIntro() {
    this.introAnim.node.active = true
    this.introAnim.play('start')
  }

  playDead() {
    this.deadAnim.node.active = true
    this.deadAnim.node.rotation = this.game.player.node.rotation
    this.game.player.node.active = false
    // this.deadAnim.node.setPosition(this.game.player.node.position)
    this.deadAnim.play('dead')
  }

  playRevive() {
    this.reviveAnim.node.active = true
    // this.reviveAnim.node.setPosition(this.game.player.node.position)
    this.reviveAnim.play('revive')
  }

  introFinish() {
    this.game.playerReady()
    this.introAnim.node.active = false
  }

  deadFinish() {
    this.deadAnim.node.active = false
  }

  reviveFinish() {
    this.game.playerReady()
    this.reviveAnim.node.active = false
  }

  reviveKill() { // kill all enemies
    // this.game.clearAllFoes();
  }
}
