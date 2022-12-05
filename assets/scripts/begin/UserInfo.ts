import type { Label, Sprite } from 'cc'
import { Component, SpriteFrame, _decorator, resources, sys } from 'cc'
const { ccclass, property } = _decorator

@ccclass('UserInfo')
export class UserInfo extends Component {
  @property({
    tooltip: '昵称',
  })
  nickName: Label = null

  avatarSprite: Sprite

  init() {
    this.avatarSize = 46
  }

  show() {
    this.node.active = true
  }

  hide() {
    this.node.active = false
  }

  getUserInfo() {
    if (sys.localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(sys.localStorage.getItem('userInfo'))
      return this.userInfo
    }
    return false
  }

  // load wechat avatar
  storeUserInfo(userInfo) {
    this.userInfo = userInfo
    // let avatarUrl = this.userInfo.avatarUrl.split('/')
    // avatarUrl[avatarUrl.length-1] = this.avatarSize
    // avatarUrl = avatarUrl.join('/')
    // this.userInfo.avatarUrl = avatarUrl

    cc.sys.localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
  }

  displayUserInfo() {
    this.nickName.string = this.userInfo.nickName

    if (sys.platform === sys.WECHAT_GAME) {
      const image = wx.createImage()
      image.onload = () => {
        const texture = new cc.Texture2D()
        texture.initWithElement(image)
        texture.handleLoadedTexture()
        this.avatarSprite.spriteFrame = new SpriteFrame(texture)
      }
      image.src = this.userInfo.avatarUrl
    }
    else {
      // test
      const wechatAvatar = {
        url: 'https://yunyoujun.cn/images/avatar.jpg',
        // url: 'https://secure.gravatar.com/avatar/18898984c2aeb0dae7530a738f150cba?s=64',    //gravatar
        type: 'jpg',
      }
      resources.load(wechatAvatar.url, (_err, texture) => {
        texture.height = this.avatarSize
        texture.width = this.avatarSize
        this.avatarSprite.spriteFrame.setTexture(texture)
      })
    }
  }
}
