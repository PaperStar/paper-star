import type { Label } from 'cc'
import { Component, _decorator, director, sys } from 'cc'
const { ccclass, property } = _decorator

@ccclass('GameOverUI')
export class GameOverUI extends Component {
  @property()
  score: Label

  @property()
  costTime: Label

  start() {
    // const app = 'paper-star';
    const curRecord = JSON.parse(sys.localStorage.getItem('curRecord'))
    this.score.string = curRecord.wxgame.score
    this.costTime.string = this.formatTime(curRecord.cost_ms)
  }

  init(game) {
    this.game = game
    this.hide()
  }

  hide() {
    this.node.active = false
  }

  show() {
    this.node.active = true
  }

  backToStartMenu() {
    director.loadScene('StartMenu')
  }

  restart() {
    this.game.restart()
  }

  openRank() {
    Global.rank.open()
  }

  share() {
    if (sys.platform === sys.WECHAT_GAME) {
      wx.shareAppMessage({
        title: '快来进行你的冒险吧！',
      })
    }
  }

  // Tools
  // todo: extract
  formatTime(ms: number) {
    const time = Math.floor(ms / 1000)
    const seconds = time % 60
    const minutes = Math.floor(time / 60)
    const timeString = `${minutes} ' ${seconds}`
    return timeString
  }
}
