import type { Node } from 'cc'
import { Component, _decorator } from 'cc'
import type { BulletType, FoeType } from '../types'
import type { PrefabPoolMng } from './PrefabPoolMng'

const { ccclass, property } = _decorator

@ccclass('PoolMng')
export class PoolMng extends Component {
  @property({
    tooltip: '敌人对象池',
  })
  foePools: PrefabPoolMng[] = []

  bulletPools: PrefabPoolMng[] = []

  // use this for initialization
  init() {
    for (let i = 0; i < this.foePools.length; ++i)
      this.foePools[i].init()

    for (let i = 0; i < this.bulletPools.length; ++i)
      this.bulletPools[i].init()
  }

  getFoe(foeType: FoeType) {
    return this.foePools[foeType].get()
  }

  putFoe(foeType: FoeType, node: Node) {
    return this.foePools[foeType].put(node)
  }

  getBullet(type: BulletType) {
    return this.bulletPools[type].get()
  }

  putBullet(type: BulletType, node: Node) {
    return this.bulletPools[type].put(node)
  }
}
