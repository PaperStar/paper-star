import {PlanetType} from 'Types';
import Helpers from 'Helpers';

cc.Class({
  extends: cc.Component,
  properties: {
    planetType: {
      default: PlanetType.Simple,
      type: PlanetType,
    },
    hp: 1000,
    curHp: 1000,
    radius: 100,
    gravityRadial: cc.Prefab,
    gravityRadius: 200,
    gravityForce: 300,
    breakSpriteFrame: cc.SpriteFrame,
    breakAnim: cc.Animation,

    hpBarPrefab: cc.Prefab,
  },

  init(map) {
    this.map = map;
    this.curHp = this.hp;
    const color = cc.Color.BLACK;
    this.node.color = color.fromHEX(Helpers.getRandomColor());
    this.getComponent(cc.RigidBody).angularVelocity =
      (Math.random() - 0.5) * 2 * 200;
    this.node.scale = Math.random() * 1 + 0.3;
    this.node.rotation = Helpers.getRandom(0, 360);

    this.initGravity();
    this.initHpBar();
  },

  initHpBar() {
    if (this.hpBarPrefab) {
      const HpBar = cc.instantiate(this.hpBarPrefab);
      this.node.addChild(HpBar);
      this.hpBar = HpBar.getComponent('HpBar');
      this.hpBar.init();
      this.hpBar.setDisplayPosition(cc.v2(0, 0));
    }
  },

  initGravity() {
    // gravity
    let planeGravityRadial = '';
    if (this.node.getChildByName('gravity-radial')) {
      planeGravityRadial = this.node.getChildByName('gravity-radial');
    } else {
      planeGravityRadial = cc.instantiate(this.gravityRadial);
    }

    planeGravityRadial.parent = this.node;
    planeGravityRadial.getComponent(cc.PhysicsCircleCollider).radius =
      this.node.width + Math.random() * 200;
    this.gravityForce = 100 + Math.random() * 200;
    planeGravityRadial.getComponent('gravity-radial').gravityForce =
      this.gravityForce;
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    this.curHp -= this.inflictDamage(otherCollider);

    if (this.curHp === 500) {
      // change spriteframe
      // use === to avoid repeat change
      this.getComponent(cc.Sprite).spriteFrame = this.breakSpriteFrame;
    } else if (this.curHp <= 0) {
      // play break anim
      this.breakAnim.play('break');
      this.map.putPlanet(PlanetType.Simple, this.node);
    }

    this.hpBar.display(this.curHp, this.hp);
  },

  inflictDamage(otherCollider) {
    const name = otherCollider.node.name.toLowerCase();
    if (name.indexOf('bullet') !== -1) {
      return otherCollider.node.getComponent('Bullet').damage;
    }
    return 1;
  },
});
