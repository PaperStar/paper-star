import { Component, _decorator } from 'cc'
import { BossType } from '../../types'
import type { Spawn } from './Spawn'
const { ccclass, property } = _decorator

@ccclass('BossMngt')
export class BossMng extends Component {
  @property()
  demonSpawn: Spawn

  init(game) {
    this.game = game
    this.waveMng = game.waveMng
    this.bossIdx = 0
  }

  startBoss() {
    if (this.bossIdx === BossType.Carrier)
      this.waveMng.startBossSpawn(this.demonSpawn)
  }

  endBoss() {
    this.bossIdx++
  }
}

