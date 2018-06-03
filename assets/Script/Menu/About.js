cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        function callback(event) {
            event.stopPropagation()
        }
        this.node.on(cc.Node.EventType.TOUCH_START, callback, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, callback, this)
        this.node.on(cc.Node.EventType.TOUCH_END, callback, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, callback, this)
    },

    open () {
        this.node.active = true
    },

    close () {
        this.node.active = false
    },

    test () {
        cc.log('test')
    },

    show (title, content) {
        switch (cc.sys.platform) {
            case cc.sys.WECHAT_GAME:
                let info = {
                    title,
                    content,
                    showCancel: false,
                    cancelText: '我知道啦',
                }
                wx.showModal(info)
                break
            default:
                window.open(content)
                break
        }
    },

    openProjectShow () {
        let title = '游戏演示'
        let projectShowUrl = 'https://yunle.fun/show/'
        this.show(title, projectShowUrl)
    },

    openProjectGitHub () {
        let title = 'GitHub 项目地址'
        let projectGitHubUrl = 'https://github.com/PaperStar/'
        this.show(title, projectGitHubUrl)
    },

    openAuthorGitHub () {
        let title = '作者 GitHub 地址'
        let myGitHubUrl = 'https://github.com/YunYouJun/'
        this.show(title, myGitHubUrl)
    },

    openAuthorWeibo () {
        let title = '作者微博'
        let myWeiboUrl = 'https://weibo.com/jizhideyunyoujun'
        this.show(title, myWeiboUrl)
    },

    openGameWeb () {
        let title = '游戏官网'
        let gameWebUrl = 'https://yunle.fun/'
        this.show(title, gameWebUrl)
    },

    sendEmail () {
        let title = '作者邮箱'
        let EmailUrl = 'me@yunyoujun.cn'
        this.show(title, EmailUrl)
    },
})
