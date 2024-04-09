import { Component, NodePool, Prefab, _decorator, instantiate } from 'cc'

const { ccclass, property } = _decorator

@ccclass('PrefabPoolMng')
export class PrefabPoolMng extends Component {
  @property({
    type: Prefab,
    tooltip: '预制体',
  })
  prefab: Prefab

  @property({
    tooltip: '最大节点数',
  })
  maxSize = 0

  @property({
    tooltip: '节点池',
  })
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
