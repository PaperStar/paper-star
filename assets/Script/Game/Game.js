// import Helpers from 'Helpers';

cc.Class({
  extends: cc.Component,

  properties: {
    map: cc.Node,
    player: cc.Node,
    inGameUI: cc.Node,
    playerFX: cc.Node,
    waveMng: cc.Node,
    bossMng: cc.Node,
    poolMng: cc.Node,
    foeGroup: cc.Node,
    deathUI: cc.Node,
    gameOverUI: cc.Node,
    cameraRoot: cc.Animation,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.map = this.map.getComponent('MapControl');
    this.map.init(this);
    this.playerFX = this.playerFX.getComponent('PlayerFX');
    this.playerFX.init(this);
    this.player = this.player.getComponent('Player');
    this.player.init(this);
    this.player.node.active = false;
    this.poolMng = this.poolMng.getComponent('PoolMng');
    this.poolMng.init();
    this.waveMng = this.waveMng.getComponent('WaveMng');
    this.waveMng.init(this);
    this.bossMng = this.bossMng.getComponent('BossMng');
    this.bossMng.init(this);
    this.sortMng = this.foeGroup.getComponent('SortMng');
    this.sortMng.init();
    cc.director.setClearColor(cc.Color.GRAY); // 默认背景色为暗色
    // cc.Camera.main.backgroundColor = cc.Color.GRAY
  },

  start() {
    this.playerFX.playIntro();
    // UI initialization
    this.inGameUI = this.inGameUI.getComponent('InGameUI');
    this.inGameUI.init(this);
    this.deathUI = this.deathUI.getComponent('DeathUI');
    this.deathUI.init(this);
    this.gameOverUI = this.gameOverUI.getComponent('GameOverUI');
    this.gameOverUI.init(this);
  },

  pause() {
    cc.director.pause();
  },

  resume() {
    cc.director.resume();
  },

  cameraShake() {
    this.cameraRoot.play('shake');
  },

  death() {
    // this.pause()
    this.deathUI.show();
  },

  revive() {
    // this.resume()
    this.deathUI.hide();
    this.playerFX.playRevive();
    this.player.revive();
  },

  clearAllFoes() {
    const nodeList = this.foeGroup.children;
    for (let i = 0; i < nodeList.length; ++i) {
      const foe = nodeList[i].getComponent('Foe');
      if (foe) {
        foe.dead();
      } else {
        const bullet = nodeList[i].getComponent('bullet');
        if (bullet) {
          bullet.broke();
        }
      }
    }
  },

  playerReady() {
    // this.resume()
    this.waveMng.startWave();
    this.player.node.active = true;
    this.player.ready();

    this.startTime = new Date();
  },

  gameOver() {
    this.endTime = new Date();
    this.player.cost_ms = this.endTime - this.startTime;
    // this.resume()
    this.player.storeUserGameData();
    this.deathUI.hide();
    this.gameOverUI.show();
  },

  restart() {
    // cc.director.loadScene('ModeMenu')
    cc.director.loadScene('FreeMode');
  },

  // update (dt) {},
});
