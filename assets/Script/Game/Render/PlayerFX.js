cc.Class({
  extends: cc.Component,

  properties: {
    introAnim: cc.Animation,
    deadAnim: cc.Animation,
    reviveAnim: cc.Animation,
  },

  // use this for initialization
  init(game) {
    this.game = game;
    this.introAnim.node.active = false;
    this.deadAnim.node.active = false;
    this.reviveAnim.node.active = false;
  },

  playIntro() {
    this.introAnim.node.active = true;
    this.introAnim.play('start');
  },

  playDead() {
    this.deadAnim.node.active = true;
    this.deadAnim.node.rotation = this.game.player.node.rotation;
    this.game.player.node.active = false;
    // this.deadAnim.node.setPosition(this.game.player.node.position)
    this.deadAnim.play('dead');
  },

  playRevive() {
    this.reviveAnim.node.active = true;
    // this.reviveAnim.node.setPosition(this.game.player.node.position)
    this.reviveAnim.play('revive');
  },

  introFinish() {
    this.game.playerReady();
    this.introAnim.node.active = false;
  },

  deadFinish() {
    this.deadAnim.node.active = false;
  },

  reviveFinish() {
    this.game.playerReady();
    this.reviveAnim.node.active = false;
  },

  reviveKill() { // kill all enemies
    // this.game.clearAllFoes();
  },
});
