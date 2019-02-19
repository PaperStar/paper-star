cc.Class({
  extends: cc.Component,

  properties: {
    about: cc.Node,
  },

  onLoad() {
    this.about = this.about.getComponent('About');
  },

  init() {

  },

  backToStartMenu() {
    this.close();
    Global.Helpers.loadStartMenu();
  },

  loadStoryBoard() {
    this.close();
    cc.director.loadScene('StoryBoard', () => {
      cc.log('StoryBoard is loaded.');
    });
  },

  openAbout() {
    this.about.open();
  },

  open() {
    if (Global.userInfo) {
      Global.userInfo.hide();
    }
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      Global.wxGame.gameClubButton.hide();
    }
    if (this.about.active) {
      this.about.close();
    }
    this.node.active = true;
  },

  close() {
    if (Global.userInfo) {
      if (cc.director.getScene().name === 'StartMenu') {
        Global.userInfo.show();
      }
    }
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      Global.wxGame.gameClubButton.show();
    }
    this.node.active = false;
  },
});
