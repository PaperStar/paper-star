import { Color, Component, KeyCode, ParticleSystem, _decorator, log, sys, v2 } from 'cc'
import { getRandomColor, inflictDamage } from '../utils'
import { BulletType } from '../types'
import type { CameraControl } from '../system/CameraControl'

const { ccclass, property } = _decorator

@ccclass('Player')
export class Player extends Component {
  @property({
    type: ParticleSystem,
    tooltip: '拖尾特效',
  })
  fxTrail: ParticleSystem

  camera: CameraControl
  bulletType = BulletType.Line
  hp = 100
  curHp = 100
  score = 0
  cost_ms = 0
  @property({
    displayName: '子弹可碰撞次数',
  })
  bulletCollisionTime = 2

  @property({
    displayName: '生命数',
  })
  life = 3

  @property({
    displayName: '当前经验值',
  })
  curExp = 0

  @property({
    displayName: '当前等级',
  })
  curLv = 0

  @property({
    displayName: '玩家颜色',
  })
  RoleColor = Color.BLACK

  @property({
    tooltip: '是否停止',
  })
  isStop = true

  @property({
    displayName: 'Move Dir',
    tooltip: '移动方向',
  })
  moveDir = v2(0, 1)

  @property({
    displayName: '移动角度',
  })
  moveAngle = 90

  @property({
    displayName: '开启加速',
  })
  speedUpFlag = false

  @property({
    displayName: '移动速度',
  })
  moveSpeed = 0

  @property({
    displayName: '正常初始速度',
  })
  normalSpeed = 100

  @property({
    displayName: '加速度',
  })
  accelSpeed = 10

  @property({
    displayName: '最大速度',
  })
  maxSpeed = 300

  _delayFlag = false
  _shootFlag = false

  init(game) {
    this.game = game
    this.curHp = this.hp
    this.score = 0
    this.initPlayer()
    this.onControl()
    // 随机位置
    // this.node.setPosition(
    //   cc.v2( (Math.random() - 0.5) * 2  * this.game.map.width / 2,
    //   (Math.random() - 0.5) * 2  * this.game.map.height / 2)
    // )
    this.node.setPosition(cc.v2(0, 0))
    this.oneShootKills = 0
  }

  ready() {
    this.inputEnabled = true
    this.isAlive = true
  }

  // 初始化 plane
  initPlayer() {
    // console.log(this.getPosition())
    // 修改颜色
    const color = Color.BLACK
    this.RoleColor = color.fromHEX(getRandomColor())
    this.node.color = this.RoleColor
    this.jet = this.node.getChildByName('jet')
    this.jet.getChildByName('triangle').color = this.RoleColor

    this.emitter = this.node.getChildByName('emitter')
  }

  // 控制
  onControl() {
    systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      // shoot
      case KeyCode.SPACE:
        this._shootFlag = true
        break
      case KeyCode.ARROW_UP:
      case KeyCode.KEY_W:
        this.moveUp()
        break
      case KeyCode.ARROW_LEFT:
      case KeyCode.KEY_A:
        this.moveLeft()
        break
      case KeyCode.ARROW_RIGHT:
      case KeyCode.KEY_D:
        this.moveRight()
        break
      default:
        break
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      // release shoot
      case KeyCode.SPACE:
        this._shootFlag = false
        break
      case KeyCode.ARROW_UP:
      case KeyCode.KEY_W:
        this.stopMove()
        break
      case KeyCode.ARROW_LEFT:
      case KeyCode.KEY_A:
        this.moveLeftFlag = false
        break
      case KeyCode.ARROW_RIGHT:
      case KeyCode.KEY_D:
        this.moveRightFlag = false
        break
      default:
        break
    }
  }

  moveUp() {
    this.speedUpFlag = true
    this.startMove()
  }

  moveLeft() {
    this.moveLeftFlag = true
  }

  moveRight() {
    this.moveRightFlag = true
  }

  startMove() {
    this.isStop = false
    this.getComponent(cc.RigidBody).linearDamping = 0
    this.node.getChildByName('jet').opacity = 255
    this.fxTrail.resetSystem()
  }

  stopMove() {
    this.isStop = true
    this.speedUpFlag = false
    this.getComponent(cc.RigidBody).linearDamping = 0.5
    this.node.getChildByName('jet').opacity = 0
    this.fxTrail.stopSystem()
  }

  shoot() {
    const radian = cc.misc.degreesToRadians(90 - this.node.rotation)
    const dir = cc.v2(
      Math.cos(radian),
      Math.sin(radian),
    )
    this._delayFlag = true
    this.game.bulletMng.spawnBullet(this.bulletType, dir, this)
  }

  roleRotate() {
    if (this.moveLeftFlag)
      this.moveAngle += 2

    if (this.moveRightFlag)
      this.moveAngle -= 2

    const degree = 90 - this.moveAngle
    this.node.rotation = degree
  }

  speedUp() {
    if (this.accelSpeed > 0 && this.moveSpeed < this.maxSpeed)
      this.moveSpeed += this.accelSpeed
  }

  // 获取杀死一个 NPC 得到的经验
  getExp(enemyLv) {
    if (enemyLv === 0)
      return 50

    return 100 * 2 ^ (enemyLv - 1)
  }

  // 下一等级的计算公式，如果是true就要升级
  cal() {
    const nextExp = 100 * 2 ^ this.curLv
    log('经验：', nextExp, this.curExp)

    if (this.curExp >= nextExp) {
      this.curExp = this.curExp - nextExp
      return true
    }
  }

  // 碰撞回调
  onBeginContact(_contact, _selfCollider, _otherCollider) {
    this.curHp -= inflictDamage(otherCollider)
    this.game.inGameUI.showHp()

    if (this.curHp <= 0 && this.isAlive) {
      this.isAlive = false
      this.dead()
    }

    // if (otherCollider.density >= 100) {
    //     this.camera.shakeCamera();
    // }
  }

  // onEndContact(_contact, _selfCollider, _otherCollider) {
  //   log(otherCollider)
  // }

  dead() {
    this.isAlive = false
    this.life--
    this.game.playerFX.playDead()
    this.game.inGameUI.showLife()
    if (this.life > 0) {
      this.scheduleOnce(() => {
        this.game.death()
      }, this.game.playerFX.deadAnim.currentClip.duration)
    }
    else {
      this.game.gameOver()
    }
  }

  revive() {
    this.isAlive = true
    this.curHp = this.hp
  }

  update() {
    if (this.speedUpFlag)
      this.speedUp()

    if (this._shootFlag && !this._delayFlag)
      this.shoot()

    const radian = cc.misc.degreesToRadians(this.moveAngle)
    this.moveDir = cc.v2(
      Math.cos(radian),
      Math.sin(radian),
    )
    this.roleRotate()
    if (!this.isStop) {
      this.getComponent(cc.RigidBody).linearVelocity = cc.v2(
        this.moveSpeed * this.moveDir.x,
        this.moveSpeed * this.moveDir.y,
      )
    }
    // cc.log(this.moveSpeed)
    // cc.log(this.node.getPosition())
  }

  addKills() {
    this.oneShootKills++
    this.game.inGameUI.addCombo()
  }

  addScore(score) {
    this.score += score
    this.game.inGameUI.showScore(this.score)
  }

  onAtkFinished() {
    if (this.oneShootKills >= 3)
      this.game.inGameUI.showKills(this.oneShootKills)
  }

  // net
  storeUserGameData() {
    const KVData = {
      nickName: Global.userInfo ? Global.userInfo.nickName.string : '匿名',
      wxgame: {
        score: this.score,
        update_time: Date.parse(new Date()),
      },
      cost_ms: this.cost_ms,
    }

    if (sys.platform === sys.WECHAT_GAME) {
      const KVDataList = []
      KVDataList.push(JSON.stringify(KVData))
      wx.setUserCloudStorage({
        KVDataList,
      })
    }
    //  else {
    let records = sys.localStorage.getItem('records')
    if (records) {
      records = JSON.parse(records)
      if (!(Array.isArray(records)))
        records = []

      else if (records.length >= 20)
        log(records.pop())

      records.unshift(KVData)
    }
    sys.localStorage.setItem('curRecord', JSON.stringify(KVData))
    sys.localStorage.setItem('records', JSON.stringify(records))
    // }

    Global.rank.fresh()
  }
}
