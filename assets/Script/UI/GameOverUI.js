cc.Class({
  extends: cc.Component,

  properties: {
    score: cc.Label,
    cost_time: cc.Label,
  },

  start() {
    // const app = 'paper-star';
    const curRecord = JSON.parse(cc.sys.localStorage.getItem('curRecord'));
    this.score.string = curRecord.wxgame.score;
    this.cost_time.string = this.formatTime(curRecord.cost_ms);
  },

  init(game) {
    this.game = game;
    this.hide();
  },

  hide() {
    this.node.active = false;
  },

  show() {
    this.node.active = true;
  },

  backToStartMenu() {
    cc.director.loadScene('StartMenu');
  },

  restart() {
    this.game.restart();
  },

  openRank() {
    Global.rank.open();
  },

  share() {
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      wx.shareAppMessage({
        title: '快来进行你的冒险吧！',
      });
    }
  },

  // Tools
  formatTime(ms) {
    const time = Math.floor(ms / 1000);
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);
    const timeString = `${minutes} ' ${seconds}`;
    return timeString;
  },

  // update (dt) {},
});
