import { Component, _decorator } from 'cc'
import type { PrefabPoolMng } from './PrefabPoolMng'
// import {FoeType, BulletType} from 'Types';

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

  getFoe(foeType) {
    return this.foePools[foeType].get()
  }

  putFoe(foeType, obj) {
    return this.foePools[foeType].put(obj)
  }

  getBullet(type) {
    return this.bulletPools[type].get()
  }

  putBullet(type, obj) {
    return this.bulletPools[type].put(obj)
  }
}
