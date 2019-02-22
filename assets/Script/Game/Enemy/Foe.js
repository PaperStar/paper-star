import Helpers from 'Helpers';
import {FoeType, BulletType, AttackType} from 'Types';

cc.Class({
  extends: cc.Component,

  properties: {
    foeType: {
      default: FoeType.Foe1,
      type: FoeType,
    },
    atkType: {
      default: AttackType.Melee,
      type: AttackType,
    },
    bulletType: {
      default: BulletType.Line,
      type: BulletType,
    },
    bulletCollisionTime: {
      default: 2,
      displayName: '子弹可碰撞次数',
    },
    hp: 0,
    curHp: 0,
    score: 0,
    crashDamage: 0,
    moveSpeed: 0,
    turnSpeed: 0,
    moveDir: cc.v2(0, 1),
    atkDir: cc.v2(),
    atkRange: 0,
    atkDuration: 0,
    atkPrepTime: 0,
    fxSmoke: cc.ParticleSystem,

    sprite: cc.Sprite,
    hpBarPrefab: cc.Prefab,

    // shoot
    _delayFlag: false,
    _shootFlag: false,
  },

  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},

  start() {

  },

  init(waveMng) {
    this.waveMng = waveMng;
    this.player = waveMng.player;
    this.isAttacking = false;
    this.isAlive = false;
    this.isInvincible = false;
    this.isMoving = false;
    this.curHp = this.hp;
    this.anim = this.node.getChildByName('sprite').getComponent(cc.Animation);
    this.anim.play('fadeIn');
    this.readyToMove();
    this.body = this.getComponent(cc.RigidBody);

    this.initHpBar();
    this.node.rotation = Math.random() * 360;
  },

  initHpBar() {
    if (this.hpBarPrefab) {
      const HpBar = cc.instantiate(this.hpBarPrefab);
      this.node.addChild(HpBar);
      this.hpBar = HpBar.getComponent('HpBar');
      this.hpBar.init();
      this.hpBar.setDisplayPosition(cc.v2(0, this.sprite.node.height));
    }
  },

  readyToMove() {
    this.isAlive = true;
    this.isMoving = true;
    this.fxSmoke.resetSystem();
  },

  prepAttack() {
    this.isAttacking = true;
    this.scheduleOnce(this.attack, this.atkPrepTime);
  },

  attack() {
    if (this.isAlive === false) {
      return;
    }
    this.atkDir = cc.pNormalize(
        this.player.node.position.sub(this.node.position)
    );
    // if (this.atkType === AttackType.Melee) {

    // } else if (this.atkType === AttackType.Range) {

    // }
    this.isAttacking = false;
    this.isMoving = true;
  },

  rotate() {
    const sepAngle = cc.radiansToDegrees(
        cc.pAngleSigned(this.moveDir, this.atkDir)
    );
    if (sepAngle > 10) {
      this.node.rotation -= this.turnSpeed;
    } else if (sepAngle < -10) {
      this.node.rotation += this.turnSpeed;
    }
    const radian = cc.degreesToRadians(90 - this.node.rotation);
    this.moveDir = cc.v2(
        Math.cos(radian),
        Math.sin(radian)
    );
  },

  attackOnTarget() {
    this.shoot();
  },

  dead() {
    this.isMoving = false;
    this.isAttacking = false;
    this.unscheduleAllCallbacks();
    this.node.stopAllActions();
    if (this.player && this.player.isAlive) {
      this.player.addKills();
      this.waveMng.killFoe(this.score);
    }
    this.anim.play('dead');
    this.scheduleOnce(this.recycle, this.anim.currentClip.duration);
  },

  recycle() {
    this.waveMng.despawnFoe(this);
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    this.curHp -= Helpers.inflictDamage(otherCollider);
    this.hpBar.display(this.curHp, this.hp);

    if (this.curHp <= 0 && this.isAlive) {
      this.isAlive = false;
      this.dead();
    }

    this.turnSpeed = -this.turnSpeed;
  },

  update(dt) {
    if (this.isAlive === false) {
      return;
    }
    if (!this.isAttacking) {
      this.prepAttack();
    } else if (this._shootFlag && !this._delayFlag) {
      this.shoot();
    }

    if (this.isMoving) {
      this.move();
      this.rotate();
    } else {
      // this.body.linearVelocity = cc.v2(0, 0)
    }
  },

  shoot() {
    const radian = cc.degreesToRadians(90 - this.node.rotation);
    const dir = cc.v2(Math.cos(radian), Math.sin(radian));
    this._delayFlag = true;
    this.waveMng.spawnBullet(this.bulletType, dir, this);
  },

  move() {
    switch (this.atkType) {
      case AttackType.Melee: {
        this.body.linearVelocity = this.moveDir.mul(this.moveSpeed);
        break;
      }
      case AttackType.Range: {
        const distance = cc.pDistance(
            this.player.node.position,
            this.node.position
        );
        if (distance < this.atkRange) {
          this.isMoving = false;
          this._shootFlag = true;
        } else {
          this._shootFlag = false;
          this.body.linearVelocity = this.moveDir.mul(this.moveSpeed);
        }
        break;
      }
      default: {
        break;
      }
    }
  },
});
