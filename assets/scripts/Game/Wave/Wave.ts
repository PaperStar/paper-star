import type Spawn from 'Spawn'

import { Component, _decorator } from 'cc'
import { BossType } from '../../types'

const { ccclass, property } = _decorator

@ccclass('Wave')
export class Wave extends Component {
  spawns: Spawn = []

  @property({
    tooltip: 'Boss 类型',
  })
  bossType = BossType.Carrier

  init() {
    this.totalFoes = 0
    this.spawnIdx = 0
    for (let i = 0; i < this.spawns.length; ++i) {
      if (this.spawns[i].isCompany === false)
        this.totalFoes += this.spawns[i].total
    }
  }

  getNextSpawn() { // return next spawn
    this.spawnIdx++
    if (this.spawnIdx < this.spawns.length)
      return this.spawns[this.spawnIdx]

    return null
  }
}
