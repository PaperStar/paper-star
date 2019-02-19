import {FoeType} from 'Types';

const Spawn = cc.Class({
  name: 'Spawn',
  properties: {
    foeType: {
      default: FoeType.Foe1,
      type: FoeType,
    },
    total: 0,
    spawnInterval: 0,
    isCompany: false,
  },
  ctor() {
    this.spawned = 0;
    this.finished = false;
  },
  spawn(poolMng) {
    if (this.spawned >= this.total) {
      return;
    }
    const newFoe = poolMng.getFoe(this.foeType);
    if (newFoe) {
      this.spawned++;
      if (this.spawned === this.total) {
        this.finished = true;
      }
      return newFoe;
    }
    cc.log('Max foe count reached, will delay spawn!');
    return null;
  },
});

export default Spawn;
