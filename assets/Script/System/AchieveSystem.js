cc.Class({
  extends: cc.Component,

  properties: {

  },

  // onLoad () {},

  start() {
    if (Global.userInfo) {
      Global.userInfo.hide();
    }
  },

});
