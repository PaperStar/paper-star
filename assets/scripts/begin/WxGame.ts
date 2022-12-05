import { Component, _decorator, log } from 'cc'
const { ccclass } = _decorator

@ccclass('WxGame')
export class WxGame extends Component {
  // wechat
  init(userInfo) {
    this.userInfo = userInfo
    // 分享
    wx.showShareMenu({
      success(_res) {
        // 用户点击了“转发”按钮
        wx.onShareAppMessage(() => ({
          title: '快来进行你的冒险吧~',
        }))
      },
      fail(res) {
        log('fail')
        log(res)
      },
    })

    // 设置右上角菜单样式
    wx.setMenuStyle({
      // style: 'light'
      style: 'dark',
    })

    wx.login({
      success: () => {
        if (!userInfo.node.active) {
          const userInfoButton = wx.createUserInfoButton({
            type: 'text',
            text: '授权个人信息',
            style: {
              left: 10,
              top: 10,
              width: 140,
              height: 50,
              lineHeight: 50,
              borderColor: '#000000',
              borderWidth: 1,
              backgroundColor: '#ffffff',
              color: '#000000',
              textAlign: 'center',
              fontSize: 16,
              borderRadius: 4,
            },
          })
          userInfoButton.onTap((res) => {
            userInfoButton.text = res.userInfo.nickName
            this.userInfo.storeUserInfo(res.userInfo)
            this.userInfo.getUserInfo()
            this.userInfo.displayUserInfo()
            userInfoButton.hide()
            userInfo.node.active = true
          })
        }
      },
    })

    // 游戏圈 lib 2.0.3
    this.createGameClub()
  }

  createGameClub() {
    this.gameClubButton = wx.createGameClubButton({
      icon: 'dark',
      style: {
        left: 20,
        top: 80,
        width: 40,
        height: 40,
      },
    })
    this.gameClubButton.onTap((res) => {
      log(res)
    })
  }
}

