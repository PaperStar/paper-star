import type { Node } from 'cc'
import { Camera, Color, Component, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('InGameUI')
export class InGameUI extends Component {
  @property()
  waveUI: Node

  killDisplay: Node
  comboDisplay: Node

  @property()
  openPanelFlag = true

  @property()
  hpBar: Node

  joystick: Node

  start() {
    Camera.main.backgroundColor = Color.GRAY
    if (Global.userInfo)
      Global.userInfo.node.active = false

    this.scheduleOnce(this.togglePanel, 3)
  }

  init(game) {
    this.game = game
    this.waveUI = this.waveUI.getComponent('WaveUI')
    this.waveUI.node.active = false
    this.killDisplay = this.killDisplay.getComponent('KillDisplay')
    this.killDisplay.node.active = false
    this.comboDisplay = this.comboDisplay.getComponent('ComboDisplay')
    this.comboDisplay.init()

    // anim
    this.anim = this.node.getChildByName('panel').getComponent(cc.Animation)

    this.shootBtn = this.node.getChildByName('shoot')
    this.shootTouchEvent()

    // info
    this.Info = this.node.getChildByName('Info')
    this.hpBar = this.hpBar.getComponent('HpBar')
    this.hpBar.init()
    this.hpBar.show()
    this.lifeLabel = this.Info.getChildByName('Life')
      .getChildByName('num').getComponent(cc.Label)
    this.lifeLabel.string = this.game.player.life
    this.scoreLabel = this.Info.getChildByName('Score').getComponent(cc.Label)

    this.initJoystick()
  }

  initJoystick() {
    this.joystick = this.joystick.getComponent('Joystick')
    this.joystick.init(this.game.player)
  }

  showWave(num) {
    this.waveUI.node.active = true
    this.waveUI.show(num)
  }

  showKills(num) {
    this.killDisplay.playKill(num)
  }

  showLife() {
    this.lifeLabel.string = this.game.player.life
  }

  showHp() {
    this.hpBar.display(this.game.player.curHp, this.game.player.hp)
  }

  showScore(num) {
    this.scoreLabel.string = num
  }

  addCombo() {
    this.comboDisplay.playCombo()
  }

  shootTouchEvent() {
    this.shootBtn.on(cc.Node.EventType.TOUCH_START, (_event) => {
      this.player._shootFlag = true
    }, this.player)
    this.shootBtn.on(cc.Node.EventType.TOUCH_MOVE, (_event) => {
      // ...
    }, this.player)
    this.shootBtn.on(cc.Node.EventType.TOUCH_CANCEL, () => {
      this.player._shootFlag = false
    }, this.player)
    this.shootBtn.on(cc.Node.EventType.TOUCH_END, () => {
      this.player._shootFlag = false
    }, this.player)
  }

  togglePanel() {
    if (this.openPanelFlag) {
      this.anim.play('ClosePanel')
      this.openPanelFlag = false
    }
    else {
      this.anim.play('OpenPanel')
      this.openPanelFlag = true
    }
  }

  loadConfigMenu() {
    Global.config.open()
  }
}
