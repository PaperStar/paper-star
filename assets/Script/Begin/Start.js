cc.Class({
    extends: cc.Component,

    properties: {
        wxGame: cc.Node,
        userInfo: cc.Node,
    },

    // onLoad () {},

    start () {
        if (!Global.userInfo) {
            this.initUserInfo()
        }
        Global.userInfo.show()

        switch (cc.sys.platform) {
            case cc.sys.WECHAT_GAME:
                if (!Global.wxGame) {
                    this.initWxGame()
                }
                break
            default:
                cc.view.enableAutoFullScreen(true)
                break
        }

        this.next()
    },

    initUserInfo () {
        cc.game.addPersistRootNode(this.userInfo)
        this.userInfo = this.userInfo.getComponent('UserInfo')
        this.userInfo.init()
        Global.userInfo = this.userInfo
    },

    initWxGame () {
        cc.game.addPersistRootNode(this.wxGame)
        this.wxGame = this.wxGame.getComponent('wxGame')
        this.wxGame.init(Global.userInfo)
        Global.wxGame = this.wxGame
    },

    // 判断是否可以读取到用户信息
    next () {
        if (Global.userInfo.getUserInfo()) {
            Global.userInfo.show()
            Global.userInfo.displayUserInfo()
        } else {
            Global.Helpers.loadStoryBoard()
        }
    },
})
