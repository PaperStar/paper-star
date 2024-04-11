import { Component, Enum, _decorator, log } from 'cc'
import { FoeType } from '../../types'
import type { PoolMng } from '../../global/PoolMng'

const { ccclass, property } = _decorator

@ccclass('Spawn')
export class Spawn extends Component {
  @property({
    type: Enum(FoeType),
    tooltip: 'Foe Type',
  })
  foeType = FoeType.Foe1

  total = 0
  spawnInterval = 0

  isCompany = false

  spawned = 0
  finished = false

  ctor() {
    this.spawned = 0
    this.finished = false
  }

  spawn(poolMng: PoolMng) {
    if (this.spawned >= this.total)
      return

    const newFoe = poolMng.getFoe(this.foeType)
    if (newFoe) {
      this.spawned++
      if (this.spawned === this.total)
        this.finished = true

      return newFoe
    }
    log('Max foe count reached, will delay spawn!')
    return null
  }
}
