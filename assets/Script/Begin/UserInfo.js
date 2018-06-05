cc.Class({
    extends: cc.Component,

    properties: {
        nickName: cc.Label,
        avatarSprite: cc.Sprite,
    },

    init () {
        this.avatarSize = 46
    },

    show () {
        this.node.active = true
    },

    hide () {
        this.node.active = false
    },

    getUserInfo () {
        if (cc.sys.localStorage.getItem('userInfo')) {
            this.userInfo = JSON.parse(cc.sys.localStorage.getItem('userInfo'))
            return this.userInfo
        } else {
            return false
        }
    },

    // load wechat avatar
    storeUserInfo (userInfo) {
        this.userInfo = userInfo
        // let avatarUrl = this.userInfo.avatarUrl.split('/')
        // avatarUrl[avatarUrl.length-1] = this.avatarSize
        // avatarUrl = avatarUrl.join('/')
        // this.userInfo.avatarUrl = avatarUrl

        cc.sys.localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },

    displayUserInfo () {
        let self = this
        this.nickName.string = this.userInfo.nickName

        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            let image = wx.createImage()
            image.onload = function () {
                let texture = new cc.Texture2D()
                texture.initWithElement(image)
                texture.handleLoadedTexture()
                self.avatarSprite.spriteFrame = new cc.SpriteFrame(texture)
            }
            image.src = this.userInfo.avatarUrl
        } else {
            // test
            let WechatAvatar = {
                url: "https://yunyoujun.cn/images/avatar.jpg",
                // url: 'https://secure.gravatar.com/avatar/18898984c2aeb0dae7530a738f150cba?s=64',    //gravatar
                type: "jpg"
            }
            cc.loader.load(WechatAvatar, function(err, texture){
                texture.height = self.avatarSize
                texture.width = self.avatarSize
                self.avatarSprite.spriteFrame.setTexture(texture)
            })
        }
    },
})
