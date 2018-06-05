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
            Global.userInfo.displayUserInfo()
            Global.userInfo.show()
        } else {
            let userInfo = {
                nickName: '匿名',
                avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYS5cD3BZMvoJe6LSC6jOyuKIYnMlibuqAxiaz586GoTuXXm6VEO4W85zqnxrUicWYh6KO83yunhHlw/132'
            }
            Global.userInfo.storeUserInfo(userInfo)
            Global.Helpers.loadStoryBoard()
        }
    },
})
