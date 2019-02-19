cc.Class({
  extends: cc.Component,

  properties: {
    nickName: cc.Label,
    avatarSprite: cc.Sprite,
  },

  init() {
    this.avatarSize = 46;
  },

  show() {
    this.node.active = true;
  },

  hide() {
    this.node.active = false;
  },

  getUserInfo() {
    if (cc.sys.localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(cc.sys.localStorage.getItem('userInfo'));
      return this.userInfo;
    }
    return false;
  },

  // load wechat avatar
  storeUserInfo(userInfo) {
    this.userInfo = userInfo;
    // let avatarUrl = this.userInfo.avatarUrl.split('/')
    // avatarUrl[avatarUrl.length-1] = this.avatarSize
    // avatarUrl = avatarUrl.join('/')
    // this.userInfo.avatarUrl = avatarUrl

    cc.sys.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  },

  displayUserInfo() {
    const self = this;
    this.nickName.string = this.userInfo.nickName;

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      const image = wx.createImage();
      image.onload = function() {
        const texture = new cc.Texture2D();
        texture.initWithElement(image);
        texture.handleLoadedTexture();
        self.avatarSprite.spriteFrame = new cc.SpriteFrame(texture);
      };
      image.src = this.userInfo.avatarUrl;
    } else {
      // test
      const WechatAvatar = {
        url: 'https://yunyoujun.cn/images/avatar.jpg',
        // url: 'https://secure.gravatar.com/avatar/18898984c2aeb0dae7530a738f150cba?s=64',    //gravatar
        type: 'jpg',
      };
      cc.loader.load(WechatAvatar, (err, texture) => {
        texture.height = self.avatarSize;
        texture.width = self.avatarSize;
        self.avatarSprite.spriteFrame.setTexture(texture);
      });
    }
  },
});
