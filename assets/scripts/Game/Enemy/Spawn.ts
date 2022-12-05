import { Component, _decorator, log } from 'cc'
import { FoeType } from '../../types'

const { ccclass, property } = _decorator

@ccclass('Spawn')
export class Spawn extends Component {
  foeType = FoeType.Foe1
  total = 0
  spawnInterval = 0

  @property()
  isCompany = false

  ctor() {
    this.spawned = 0
    this.finished = false
  }

  spawn(poolMng) {
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
