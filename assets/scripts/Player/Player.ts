import type { EventKeyboard, IPhysics2DContact } from 'cc'
import { Collider2D, Color, Component, Contact2DType, Input, KeyCode, Node, ParticleSystem2D, RigidBody2D, UIOpacity, _decorator, input, log, macro, misc, v2, v3 } from 'cc'
import { getRandomColor, inflictDamage } from '../utils'
import { BulletType } from '../types'
import { GameManager } from '../game/GameManager'
import { PLAYER_ACTION } from '../constants'

const { ccclass, property } = _decorator

@ccclass('Player')
export class Player extends Component {
  @property({
    type: ParticleSystem2D,
    tooltip: '拖尾特效',
  })
  fxTrail: ParticleSystem2D = null!

  @property({
    type: Node,
    tooltip: '喷气',
  })
  jet: Node = null!

  @property({
    type: BulletType,
    tooltip: '子弹类型',
  })
  bulletType = BulletType.Line

  @property({
    displayName: '生命值',
  })
  hp = 100

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
  roleColor = new Color()

  @property({
    displayName: 'Move Dir',
    tooltip: '默认移动方向',
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

  game: GameManager = null!
  // 当前生命值
  curHp = 100
  // 当前分数
  score = 0
  /**
   * 是否正在移动
   */
  isMoving = false
  /**
   * 连续击杀数
   */
  oneShootKills = 0
  /**
   * 是否存活
   */
  isAlive = true
  /**
   * 是否启用输入
   */
  inputEnabled = true
  // internal
  moveLeftFlag = false
  moveRightFlag = false
  _delayFlag = false
  _shootFlag = false

  start() {
    // bind begin contact event
    const collider = this.getComponent(Collider2D)!
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
  }

  init(game: GameManager) {
    this.game = game
    this.curHp = this.hp
    this.score = 0
    this.initPlane()
    this.onControl()
    // 随机位置
    // const mapSize = this.game.map.node.getComponent(UITransform).contentSize
    // this.node.setPosition(
    //   v3((Math.random() - 0.5) * 2 * mapSize.width / 2, (Math.random() - 0.5) * 2 * mapSize.height / 2),
    // )
    this.node.setPosition(v3(0, 0, 0))
    this.oneShootKills = 0
  }

  ready() {
    this.inputEnabled = true
    this.isAlive = true
  }

  // 初始化 plane
  initPlane() {
    // console.log(this.getPosition())
    // 修改颜色
    Color.fromHEX(this.roleColor, getRandomColor())
    // this.node.color = this.RoleColor
    // this.jet.getChildByName('triangle').color = this.RoleColor

    // this.emitter = this.node.getChildByName('emitter')
  }

  // 控制
  onControl() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
  }

  onKeyDown(event: EventKeyboard) {
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

  onKeyUp(event: EventKeyboard) {
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

  startMove(angle?: number) {
    this.isMoving = true
    this.getComponent(RigidBody2D)!.linearDamping = 0
    this.node.getChildByName('jet')!.getComponent(UIOpacity)!.opacity = 255
    this.fxTrail.resetSystem()

    if (typeof angle === 'number') {
      const radian = angle * macro.RAD
      this.moveDir.x = Math.round(Math.cos(radian) * 1)
      this.moveDir.y = Math.round(Math.sin(radian) * 1)

      this.isMoving = true

      this.moveAngle = angle
      this.moveAngle = this.moveAngle < 0
        ? this.moveAngle + 360
        : this.moveAngle > 360
          ? this.moveAngle - 360
          : this.moveAngle
    }
  }

  stopMove() {
    this.isMoving = false
    this.speedUpFlag = false
    this.getComponent(RigidBody2D)!.linearDamping = 0.5
    this.node.getChildByName('jet')!.getComponent(UIOpacity)!.opacity = 0
    this.fxTrail.stopSystem()

    this.moveDir.x = 0
    this.moveDir.y = 0
  }

  shoot() {
    const radian = misc.degreesToRadians(90 - this.node.rotation.z)
    const dir = v2(
      Math.cos(radian),
      Math.sin(radian),
    )
    this._delayFlag = true
    GameManager.bulletMng.spawnBullet(this.bulletType, dir, this)
  }

  roleRotate() {
    if (this.moveLeftFlag)
      this.moveAngle += 2

    if (this.moveRightFlag)
      this.moveAngle -= 2

    const degree = 90 - this.moveAngle
    this.node.setRotationFromEuler(0, 0, degree)
  }

  speedUp() {
    if (this.accelSpeed > 0 && this.moveSpeed < this.maxSpeed)
      this.moveSpeed += this.accelSpeed
  }

  // 获取杀死一个 NPC 得到的经验
  getExp(enemyLv: number) {
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
  // eslint-disable-next-line unused-imports/no-unused-vars
  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    this.curHp -= inflictDamage(otherCollider)
    GameManager.inGameUI.showHp()

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
    const playerFX = this.game.playerFX
    playerFX.playDead()
    GameManager.inGameUI.showLife()
    if (this.life > 0) {
      this.scheduleOnce(() => {
        this.game.death()
      }, playerFX.deadAnim.defaultClip?.duration)
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

    const radian = misc.degreesToRadians(this.moveAngle)
    this.moveDir = v2(
      Math.cos(radian),
      Math.sin(radian),
    )
    this.roleRotate()
    if (!this.isMoving) {
      this.getComponent(RigidBody2D)!.linearVelocity = v2(
        this.moveSpeed * this.moveDir.x,
        this.moveSpeed * this.moveDir.y,
      )
    }
    // cc.log(this.moveSpeed)
    // cc.log(this.node.getPosition())
  }

  addKills() {
    this.oneShootKills++
    GameManager.inGameUI.addCombo()
  }

  addScore(score: number) {
    this.score += score
    GameManager.inGameUI.showScore(this.score)
  }

  onAtkFinished() {
    if (this.oneShootKills >= 3)
      GameManager.inGameUI.showKills(this.oneShootKills)
  }

  /**
   * 玩家行为
   */
  playAction(action: {
    type: PLAYER_ACTION
    data?: any
  }) {
    switch (action.type) {
      case PLAYER_ACTION.MOVE:
        this.startMove(180 - action.data as number)
        break
      case PLAYER_ACTION.STOP_MOVE:
        this.stopMove()
        break
      default:
        break
    }
  }

  // net
  // storeUserGameData() {
  //   const KVData = {
  //     nickName: Global.userInfo ? Global.userInfo.nickName.string : '匿名',
  //     wxgame: {
  //       score: this.score,
  //       update_time: Date.parse(new Date()),
  //     },
  //     cost_ms: this.cost_ms,
  //   }

  //   if (sys.platform === sys.Platform.WECHAT_GAME) {
  //     const KVDataList = []
  //     KVDataList.push(JSON.stringify(KVData))
  //     wx.setUserCloudStorage({
  //       KVDataList,
  //     })
  //   }
  //   //  else {
  //   let records = sys.localStorage.getItem('records')
  //   if (records) {
  //     records = JSON.parse(records)
  //     if (!(Array.isArray(records)))
  //       records = []

  //     else if (records.length >= 20)
  //       log(records.pop())

  //     records.unshift(KVData)
  //   }
  //   sys.localStorage.setItem('curRecord', JSON.stringify(KVData))
  //   sys.localStorage.setItem('records', JSON.stringify(records))
  //   // }

  //   Global.rank.fresh()
  // }
}
