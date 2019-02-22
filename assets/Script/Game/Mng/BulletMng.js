cc.Class({
  extends: cc.Component,

  properties: {

  },

  init(game) {
    this.game = game;
  },

  spawnBullet(bulletType, dir, role) {
    const newBullet = this.game.poolMng.getBullet(bulletType);
    if (newBullet) {
      newBullet.getComponent('Bullet').init(this, dir, role);
    } else {
      cc.log('Too Many Bullets!');
    }
  },

  despawnBullet(bullet) {
    const type = bullet.bulletType;
    this.game.poolMng.putBullet(type, bullet.node);
  },

  // update (dt) {},
});
