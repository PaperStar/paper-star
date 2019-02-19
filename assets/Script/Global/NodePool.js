const NodePool = cc.Class({
  name: 'NodePool',
  properties: {
    prefab: cc.Prefab,
    size: {
      default: 0,
      type: cc.Integer,
    },
  },

  init() {
    this.NodePool = new cc.NodePool();
    for (let i = 0; i < this.size; i++) {
      const obj = cc.instantiate(this.prefab);
      this.NodePool.put(obj);
    }
  },

  get() {
    return this.NodePool.get();
  },

  put(obj) {
    return this.NodePool.put(obj);
  },
});

export default NodePool;
