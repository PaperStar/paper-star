// import Foe from 'Foe';
// import {FoeType, BossType, BulletType} from 'Types';
import {BossType} from 'Types';
import Spawn from 'Spawn';

const Wave = cc.Class({
  name: 'Wave',
  properties: {
    spawns: {
      default: [],
      type: Spawn,
    },
    bossType: {
      default: BossType.Carrier,
      type: BossType,
    },
  },
  init() {
    this.totalFoes = 0;
    this.spawnIdx = 0;
    for (let i = 0; i < this.spawns.length; ++i) {
      if (this.spawns[i].isCompany === false) {
        this.totalFoes += this.spawns[i].total;
      }
    }
  },
  getNextSpawn() { // return next spawn
    this.spawnIdx++;
    if (this.spawnIdx < this.spawns.length) {
      return this.spawns[this.spawnIdx];
    }
    return null;
  },
});

cc.Class({
  extends: cc.Component,

  properties: {
    waves: {
      default: [],
      type: Wave,
    },
    startWaveIdx: 0,
    spawnMargin: 0,
    killedFoe: {
      visible: false,
      default: 0,
      notify() {
        if (!this.currentWave || !this.waveTotalFoes) {
          return;
        }
        if (this.waveTotalFoes && this.killedFoe >= this.waveTotalFoes) {
          // this.endWave();
        }
        if (this.waveProgress && this.waveTotalFoes) {
          // const ratio = Math.min(this.killedFoe / this.waveTotalFoes, 1);
          // this.waveProgress.updateProgress(ratio)
        }
      },
    },
    waveProgress: cc.Node,
    bossProgress: cc.Node,
  },

  // use this for initialization
  init(game) {
    this.game = game;
    this.map = game.map;
    this.player = game.player;
    this.foeGroup = game.foeGroup;
    this.waveIdx = this.startWaveIdx;
    this.spawnIdx = 0;
    this.currentWave = this.waves[this.waveIdx];

    this.foeGroup.setContentSize(this.map.node.getContentSize());
    // bug? can not find?
    this.waveProgress = this.waveProgress.getComponent('WaveProgress');
    this.waveProgress.init(this);
    this.bossProgress = this.bossProgress.getComponent('BossProgress');
    this.bossProgress.init(this);

    // test
    this.testPos = cc.v2(0, 0);
  },


  startSpawn() {
    this.schedule(this.spawnFoe, this.currentSpawn.spawnInterval);
  },

  startBossSpawn(bossSpawn) {
    this.bossSpawn = bossSpawn;
    this.waveTotalFoes = bossSpawn.total;
    this.killedFoe = 0;
    this.schedule(this.spawnBossFoe, bossSpawn.spawnInterval);
  },

  endSpawn() {
    this.unschedule(this.spawnFoe);
    const nextSpawn = this.currentWave.getNextSpawn();
    if (nextSpawn) {
      this.currentSpawn = nextSpawn;
      this.startSpawn();
      if (nextSpawn.isCompany) {
        this.startBoss();
      }
    }
  },

  startWave() {
    this.unschedule(this.spawnFoe);
    this.currentWave.init();
    this.waveTotalFoes = this.currentWave.totalFoes;
    this.killedFoe = 0;
    this.currentSpawn = this.currentWave.spawns[this.currentWave.spawnIdx];
    this.startSpawn();
    this.game.inGameUI.showWave(this.waveIdx + 1);
  },

  startBoss() {
    this.bossProgress.show();
    this.game.bossMng.startBoss();
  },

  endWave() {
    this.bossProgress.hide();
    this.game.bossMng.endBoss();
    // update wave index
    if (this.waveIdx < this.waves.length - 1) {
      this.waveIdx++;
      this.currentWave = this.waves[this.waveIdx];
      this.startWave();
    } else {
      cc.log('all waves spawned!');
    }
  },

  spawnFoe() {
    if (this.currentSpawn.finished) {
      this.endSpawn();
      return;
    }

    const newFoe = this.currentSpawn.spawn(this.game.poolMng);
    if (newFoe) {
      this.foeGroup.addChild(newFoe);
      newFoe.setPosition(this.getNewFoePosition());
      newFoe.getComponent('Foe').init(this);
      // newFoe.setPosition( this.testPos.addSelf(cc.v2(100, 100)) )
    }
  },

  spawnBossFoe() {
    if (this.bossSpawn.finished) {
      this.unschedule(this.spawnBossFoe);
    }
    const newFoe = this.bossSpawn.spawn(this.game.poolMng);
    if (newFoe) {
      this.foeGroup.addChild(newFoe);
      newFoe.setPosition(this.getNewFoePosition());
      newFoe.getComponent('Foe').init(this);
    }
  },

  spawnBullet(bulletType, dir, role) {
    const newBullet = this.game.poolMng.getBullet(bulletType);
    if (newBullet) {
      newBullet.getComponent('Bullet').init(this, dir, role);
    } else {
      cc.log('Too Many Bullets!');
    }
  },

  killFoe(score) {
    this.killedFoe++;
    this.player.addScore(score);
  },

  hitFoe() {
    this.game.cameraShake();
  },

  despawnFoe(foe) {
    const {foeType} = foe;
    this.game.poolMng.putFoe(foeType, foe.node);
  },

  despawnBullet(bullet) {
    const type = bullet.bulletType;
    this.game.poolMng.putBullet(type, bullet.node);
  },

  getNewFoePosition() {
    const randX = (Math.random() - 0.5)
      * 2 * (this.foeGroup.width - this.spawnMargin) / 2;
    const randY = (Math.random() - 0.5)
      * 2 * (this.foeGroup.height - this.spawnMargin) / 2;
    return cc.v2(randX, randY);
  },
});
