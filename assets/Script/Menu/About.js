cc.Class({
  extends: cc.Component,

  properties: {

  },

  start() {
    /**
     *
     *
     * @param {*} event
     */
    function callback(event) {
      event.stopPropagation();
    }
    this.node.on(cc.Node.EventType.TOUCH_START, callback, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, callback, this);
    this.node.on(cc.Node.EventType.TOUCH_END, callback, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, callback, this);
  },

  open() {
    this.node.active = true;
  },

  close() {
    this.node.active = false;
  },

  test() {
    cc.log('test');
  },

  show(title, content) {
    /* eslint no-case-declarations: "error"*/
    switch (cc.sys.platform) {
      case cc.sys.WECHAT_GAME: {
        const info = {
          title,
          content,
          showCancel: false,
          cancelText: '我知道啦',
        };
        wx.showModal(info);
        break;
      }
      default: {
        window.open(content);
        break;
      }
    }
  },

  openProjectShow() {
    const title = '游戏演示';
    const projectShowUrl = 'https://yunle.fun/show/';
    this.show(title, projectShowUrl);
  },

  openProjectGitHub() {
    const title = 'GitHub 项目地址';
    const projectGitHubUrl = 'https://github.com/PaperStar/';
    this.show(title, projectGitHubUrl);
  },

  openAuthorGitHub() {
    const title = '作者 GitHub 地址';
    const myGitHubUrl = 'https://github.com/YunYouJun/';
    this.show(title, myGitHubUrl);
  },

  openAuthorWeibo() {
    const title = '作者微博';
    const myWeiboUrl = 'https://weibo.com/jizhideyunyoujun';
    this.show(title, myWeiboUrl);
  },

  openGameWeb() {
    const title = '游戏官网';
    const gameWebUrl = 'https://yunle.fun/';
    this.show(title, gameWebUrl);
  },

  sendEmail() {
    const title = '作者邮箱';
    const EmailUrl = 'me@yunyoujun.cn';
    this.show(title, EmailUrl);
  },
});
