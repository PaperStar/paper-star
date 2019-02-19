import NodePool from 'NodePool';
// import {FoeType, BulletType} from 'Types';

cc.Class({
  extends: cc.Component,

  properties: {
    foePools: {
      default: [],
      type: NodePool,
    },
    bulletPools: {
      default: [],
      type: NodePool,
    },
  },

  // use this for initialization
  init() {
    for (let i = 0; i < this.foePools.length; ++i) {
      this.foePools[i].init();
    }

    for (let i = 0; i < this.bulletPools.length; ++i) {
      this.bulletPools[i].init();
    }
  },

  getFoe(foeType) {
    return this.foePools[foeType].get();
  },

  putFoe(foeType, obj) {
    return this.foePools[foeType].put(obj);
  },

  getBullet(type) {
    return this.bulletPools[type].get();
  },

  putBullet(type, obj) {
    return this.bulletPools[type].put(obj);
  },
});
