import { Component, _decorator } from 'cc'
import { BossType } from '../../types'
import type { GameManager } from '../GameManager'
import { Spawn } from './Spawn'

const { ccclass, property } = _decorator

@ccclass('BossMng')
export class BossMng extends Component {
  @property(Spawn)
  demonSpawn: Spawn

  bossIdx: number

  game: GameManager

  init(game: GameManager) {
    this.game = game
    this.bossIdx = 0
  }

  startBoss() {
    if (this.bossIdx === BossType.Carrier)
      this.game.waveMng.startBossSpawn(this.demonSpawn)
  }

  endBoss() {
    this.bossIdx++
  }
}
