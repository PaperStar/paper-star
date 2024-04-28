import type { EventTouch } from 'cc'
import { Component, Node, UITransform, Vec3, _decorator, v3, view } from 'cc'
import { GameManager } from '../../game/GameManager'
import { GameState, PLAYER_ACTION } from '../../constants'
import { DIRECTION_TYPE, TOUCH_TYPE } from './constants'

const { ccclass, property } = _decorator

const screenHeight = view.getVisibleSize().height // 屏幕可视范围高度

@ccclass('Joystick')
export class Joystick extends Component {
  // @property({
  //   type: Player,
  //   tooltip: '操控角色',
  // })
  // player: Player

  @property({
    type: Node,
    tooltip: '摇杆操纵点',
  })
  dot: Node = null!

  @property({
    type: Node,
    tooltip: '摇杆背景节点',
  })
  ring: Node = null!

  @property({
    type: TOUCH_TYPE,
    tooltip: '触摸类型',
  })
  touchType = TOUCH_TYPE.DEFAULT

  @property({
    type: DIRECTION_TYPE,
    tooltip: '方向类型',
  })
  directionType = DIRECTION_TYPE.ALL

  @property({
    tooltip: '检测时间间隔',
  })
  checkInterval: number = 0.04 // 每40ms刷新一次

  @property({ displayName: '启动半透明' })
  public isEnableTransparent: boolean = false

  @property({ displayName: '点击跟随' })
  public isFollowStart: boolean = false

  @property({ displayName: '内圈大小' })
  public innerSize: number = 10

  onEndCb: Function = null!

  protected isMoving: boolean = false// 是否正在移动
  protected distanceRate: number = 0 // 遥感移动距离比

  // internal
  /**
   * 当前触摸的角度
   */
  angle = 0
  private _oldAngle: number = 0// 之前的角度

  @property({
    type: Vec3,
    tooltip: '圆圈初始位置',
  })
  oriRingPos: Vec3 = v3(0, 0, 0)

  private _targetRingPos: Vec3 = new Vec3() // 圆圈背景位置
  /**
   * 中间按钮初始坐标
   */
  private _oriDotPos: Vec3 = new Vec3()
  /**
   * 移动坐标
   */
  private _movePos: Vec3 = new Vec3()
  private _curRingPos_1: Vec3 = new Vec3() // 当前圆圈坐标
  private _curRingPos_2: Vec3 = new Vec3() //
  /**
   * 开始触碰位置
   */
  private _touchStartLocation = new Vec3()
  private _touchMoveLocation: Vec3 = new Vec3() // 移动触碰位置
  private _touchEndLocation: Vec3 = new Vec3() // 结束触碰位置

  private _isOutInnerSize = false // 终点拖动的点是否超出按钮圆圈背景
  private _currentTime: number = 0 // 当前累积时间

  // init(player: Player) {
  //   this.player = player
  // }

  protected onEnable(): void {
    this.node.on(Node.EventType.TOUCH_START, this._touchStartEvent, this)
    this.node.on(Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this)
    // 触摸在圆圈内离开或在圆圈外离开后，摇杆归位，player速度为0
    this.node.on(Node.EventType.TOUCH_END, this._touchEndEvent, this)
    this.node.on(Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this)

    this.ring.setPosition(this.oriRingPos)
  }

  protected onDisable(): void {
    this.node.off(Node.EventType.TOUCH_START, this._touchStartEvent, this)
    this.node.off(Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this)
    // 触摸在圆圈内离开或在圆圈外离开后，摇杆归位，player速度为0
    this.node.off(Node.EventType.TOUCH_END, this._touchEndEvent, this)
    this.node.off(Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this)

    // reset
    this.dot.setPosition(this._oriDotPos)
    this.ring.setPosition(this.oriRingPos)
  }

  _touchStartEvent(event: EventTouch) {
    // 记录触摸的世界坐标，给touch move使用
    const touch = event.getUILocation()
    this._touchStartLocation.set(touch.x, touch.y, 0)
    let touchPos = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(this._touchStartLocation)

    if (!this.oriRingPos)
      this.oriRingPos = this.ring.getPosition().clone()

    if (!this.isFollowStart) {
      const ringUITransform = this.ring.getComponent(UITransform)!
      touchPos = ringUITransform.convertToNodeSpaceAR(this._touchStartLocation)

      // 触摸点与圆圈中心的距离
      const distance = touchPos.length()
      const width = ringUITransform.contentSize.width
      // 圆圈半径
      const radius = width / 2

      // 手指在圆圈内触摸,控杆跟随触摸点
      if (radius > distance) {
        this.dot.setPosition(touchPos)
        this._updateAngle(touchPos)
        return true
      }
      return false
    }
    else {
      // 设置遥感可移动范围
      if (this.touchType === TOUCH_TYPE.FOLLOW)
        touchPos.y = touchPos.y >= -screenHeight / 6 ? -screenHeight / 6 : touchPos.y

      this.ring.setPosition(touchPos)
    }

    // if (this.touchType === TOUCH_TYPE.DEFAULT) {
    //   this._stickPos = this.ring.getPosition()
    //   // 触摸点与圆圈中心的距离
    //   const distance = touchPos.mag()
    //   const posX = this.ring.getPosition().x + touchPos.x
    //   const posY = this.ring.getPosition().y + touchPos.y
    //   // 手指在圆圈内触摸,控杆跟随触摸点
    //   if (this._radius > distance) {
    //     this.dot.setPosition(cc.v2(posX, posY))
    //     return true
    //   }
    //   return false
    // }

    // if (this.touchType === TOUCH_TYPE.FOLLOW) {
    //   // 记录摇杆位置，给touch move使用
    //   this._stickPos = touchPos
    //   this.node.opacity = 255
    //   this._touchLocation = event.getLocation()
    //   // 更改摇杆的位置
    //   this.ring.setPosition(touchPos)
    //   this.dot.setPosition(touchPos)
    // }
  }

  private _touchMoveEvent(event: EventTouch) {
    // 以圆圈为锚点获取触摸坐标
    const touch = event.getUILocation()
    this._touchMoveLocation.set(touch.x, touch.y, 0)

    const ringUITransform = this.ring.getComponent(UITransform)!
    const touchPos = ringUITransform.convertToNodeSpaceAR(this._touchMoveLocation)

    const distance = touchPos.length()

    if (distance > this.innerSize) {
      this.isMoving = true
      this._isOutInnerSize = true
    }
    else {
      this._isOutInnerSize = false
    }

    // 有拖动且有角度才视为开始游戏
    if (GameManager.curState !== GameState.PLAYING && this.isMoving) {
      GameManager.setCurState(GameState.PLAYING)
      // ClientEvent.dispatchEvent(Constant.EVENT_TYPE.MONSTER_MOVE)

      this._currentTime = this.checkInterval
    }

    const width = ringUITransform.contentSize.width as number
    // 圆圈半径
    const radius = width / 2
    let rate = 0
    // 由于摇杆的 position 是以父节点为锚点，所以定位要加上 ring 和 dot 当前的位置 (stickX,stickY)
    if (radius > distance) {
      rate = Number((distance / radius).toFixed(3))
      this.dot.setPosition(touchPos)
    }
    else if (this.touchType !== TOUCH_TYPE.FOLLOW_DOT) {
      rate = 1
      // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
      const radian = Math.atan2(touchPos.y, touchPos.x)

      const x = Math.cos(radian) * radius
      const y = Math.sin(radian) * radius
      this._movePos.set(x, y, 0)
      if (this.touchType === TOUCH_TYPE.FOLLOW_ALWAYS) {
        this._curRingPos_2.set(touch.x - x, touch.y - y, 0)
        const ringPos = this.node.getComponent(UITransform)?.convertToNodeSpaceAR(this._curRingPos_2) as Vec3
        this._targetRingPos = ringPos
      }

      this.dot.setPosition(this._movePos)
    }
    else {
      // 点跟随移动
      this.dot.setPosition(touchPos)
    }
    // 更新角度
    this._updateAngle(touchPos)
    // 更新遥感移动距离百分比
    this.distanceRate = rate

    // this.player.moveAngle = this._angle
    // // 设置实际速度
    // this._setSpeed(v2(posX, posY))

    // this.player.node.getComponent(RigidBody2D).linearVelocity = v2(
    //   this.player.moveDir.x * this.player.moveSpeed,
    //   this.player.moveDir.y * this.player.moveSpeed,
    // )
    // this.player.startMove()
  }

  _touchEndEvent(event: EventTouch) {
    if (!this.isMoving) {
      // 可以判断为点击
      // this.onClickCb && this.onClickCb()
    }
    else {
      const touch = event.getUILocation()
      this._touchEndLocation.set(touch.x, touch.y, 0)
      const touchPos = this.ring.getComponent(UITransform)?.convertToNodeSpaceAR(this._touchEndLocation) as Vec3
      let isDragToInner = false
      if (touchPos.length() < this.innerSize) {
        // 取消掉
        isDragToInner = true

        this.onEndCb && this.onEndCb(isDragToInner)
      }
      else {
        this.onEndCb && this.onEndCb(isDragToInner)
      }
    }

    this.isMoving = false
    this.dot.setPosition(this._oriDotPos)

    if (this.touchType === TOUCH_TYPE.FOLLOW || this.touchType === TOUCH_TYPE.FOLLOW_ALWAYS || this.touchType === TOUCH_TYPE.FOLLOW_DOT) {
      this._targetRingPos = null!
      this.ring.setPosition(this.oriRingPos)
    }
    // this.player.stopMove()
  }

  // methods

  // 设置实际速度
  // _setSpeed(point) {
  //   // 触摸点和遥控杆中心的距离
  //   const distance = point.sub(this.ring.getPosition()).mag()
  //   // 如果半径
  //   if (distance < this._radius)
  //     this.player.moveSpeed = this.player.normalSpeed
  //   else
  //     this.player.speedUpFlag = true
  // }

  private _updateAngle(pos: Vec3) {
    this.angle = Math.round(Math.atan2(pos.y, pos.x) * 180 / Math.PI)
    return this.angle
  }

  update(deltaTime: number) {
    // get move direction from rotation
    if (GameManager.curState !== GameState.PLAYING || !GameManager.player)
      return

    // console.log(this.player)
    // const rotation = this.player.node.getComponent(cc.RigidBody)
    //                    .getWorldRotation();
    // const radian = cc.misc.degreesToRadians(90 - rotation);
    // const dir = cc.v2(
    //     Math.cos(radian),
    //     Math.sin(radian)
    // );
    // this.player.moveDir = dir;

    // 设置终点按钮位置
    // TOUCH_TYPE.FOLLOW_ALWAYS

    // if (this._targetRingPos) {
    //   this._curRingPos_1.set(0, 0, 0)
    //   Vec3.lerp(this._curRingPos_1, this.ring.position, this._targetRingPos, 20 * deltaTime)
    //   this.ring.setPosition(this._curRingPos_1)
    // }

    this._currentTime += deltaTime

    if (this._currentTime >= this.checkInterval) {
      this._currentTime = 0

      if (this.isMoving) {
        if (this.angle !== this._oldAngle) {
          this._oldAngle = this.angle
          // 移动角色
          GameManager.player.playAction({ type: PLAYER_ACTION.MOVE, data: this.angle })
        }
      }
      else {
        this.isMoving = false
        // 停止移动
        if (GameManager.player.isMoving)
          GameManager.player.playAction({ type: PLAYER_ACTION.STOP_MOVE })
      }
    }
  }
}
