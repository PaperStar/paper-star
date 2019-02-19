cc.Class({
  extends: cc.Component,

  properties: {

  },

  onLoad() {
    if (Global.userInfo) {
      Global.userInfo.node.active = false;
    }
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      Global.wxGame.gameClubButton.hide();
    }
  },

  start() {

  },

  // mode
  loadFreeMode() {
    cc.director.loadScene('FreeMode');
  },

  loadGravityMode() {
    cc.director.loadScene('GravityMode');
  },

  loadMissionMode() {
    cc.director.loadScene('MissionMode');
  },

  loadPropsMode() {
    cc.director.loadScene('PropsMode');
  },
});
