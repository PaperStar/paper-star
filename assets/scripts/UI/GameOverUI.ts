import { Component, Label, _decorator, director, sys } from 'cc'
import type { GameManager } from '../game/GameManager'

const { ccclass, property } = _decorator

@ccclass('GameOverUI')
export class GameOverUI extends Component {
  @property({
    type: Label,
    tooltip: '分数',
  })
  score: Label

  @property({
    type: Label,
    tooltip: '游戏耗时',
  })
  costTime: Label

  game: GameManager

  start() {
    // const app = 'paper-star';
    const curRecord = JSON.parse(sys.localStorage.getItem('curRecord'))
    this.score.string = curRecord.wxgame.score
    this.costTime.string = this.formatTime(curRecord.cost_ms)
  }

  init(game: GameManager) {
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
