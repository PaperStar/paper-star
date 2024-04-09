import type { Prefab } from 'cc'
import { Component, NodePool, _decorator, instantiate } from 'cc'

const { ccclass, property } = _decorator

@ccclass('PrefabPoolMng')
export class PrefabPoolMng extends Component {
  @property()
  prefab: Prefab

  @property({
    tooltip: '最大节点数',
  })
  maxSize = 0

  @property()
  nodePool = new NodePool()

  init() {
    for (let i = 0; i < this.maxSize; i++) {
      const obj = instantiate(this.prefab)
      this.nodePool.put(obj)
    }
  }

  get() {
    return this.nodePool.get()
  }

  put(obj) {
    return this.nodePool.put(obj)
  }
}
