import type { Node, Sprite } from 'cc'
import { BoxCollider, Component, Enum, RigidBody, _decorator, v2 } from 'cc'
import { BulletType } from '../../../types'

const { ccclass, property } = _decorator

@ccclass('Bullet')
export class Bullet extends Component {
  @property({
    tooltip: '子弹类型',
    type: Enum(BulletType),
  })
  bulletType = BulletType.Line

  @property({
    tooltip: '子弹长度',
  })
  length = 20

  @property({
    tooltip: '子弹移动速度',
  })
  moveSpeed = 500

  @property({
    tooltip: '子弹延迟发射时间',
  })
  delay = 0.3

  @property({
    tooltip: '子弹宽度',
  })
  width = 2

  @property({
    tooltip: '存活时间',
  })

  @property({
    tooltip: '可碰撞次数',
  })
  collisionTime = 2

  @property({
    tooltip: '伤害值',
  })
  damage = 10

  sprite: Sprite = null
  canBreak = true
  brokenFX: Node = null
  isVisible = false

  init(bulletMng, dir, role) {
    this.bulletMng = bulletMng
    this.isVisible = true
    this.node.rotation = 0
    this.sprite.enabled = true
    this.sprite.node.opacity = 255
    this.role = role

    this.scheduleOnce(() => {
      role._delayFlag = false
    }, this.delay)

    let pos = v2(0, 0)
    role.node.getChildByName('BulletGroup').addChild(this.node)
    if (role.node.getChildByName('emitter'))
      pos = role.node.getChildByName('emitter').getPosition()

    const roleName = role.node.name.toLowerCase()
    if (roleName === 'player') {
      // const pos = role.node.getChildByName('emitter').getPosition();
      // color
      const { color } = role.node
      this.sprite.node.color = color
      this.brokenFX.getChildByName('pieceU').color = color
      this.brokenFX.getChildByName('pieceD').color = color
    }
    else if (roleName.includes('foe')) {
      pos = cc.v2(0, role.sprite.node.height)
      // role.node.parent.getChildByName('BulletGroup').addChild(this.node)
      // role.node.getChildByName('BulletGroup').addChild(this.node)
    }
    this.node.setPosition(pos)

    if (roleName.indexOf('foe')) {
      // now nothing
    }
    this.collisionTime = role.bulletCollisionTime

    this.anim = this.getComponent(cc.Animation)
    this.anim.stop()

    // 改变子弹长宽
    this.node.height = this.length
    this.node.width = this.width
    this.getComponent(BoxCollider).size.height = this.length
    this.getComponent(BoxCollider).size.width = this.width

    this.getComponent(RigidBody).linearVelocity = dir.mul(this.moveSpeed)
    // this.scheduleOnce(this.vanish, this.lifeTime)

    // fx
    this.brokenFX.active = false
  }

  broke() {
    this.isMoving = false
    this.sprite.enabled = false
    this.brokenFX.active = true
    this.anim.play('break')
    this.scheduleOnce(this.recycle, this.anim.currentClip.duration)
  }

  hit() {

  }

  onBeginContact(contact, selfCollider, otherCollider) {
    switch (otherCollider.node.name) {
      case 'gravity-radial':
        break
      default:
        this.collisionTime--
        break
    }
    if (this.isVisible && this.collisionTime <= 0) {
      this.isVisible = false
      this.broke()
    }
  }

  vanish() {
    this.anim.play('vanish')
    this.scheduleOnce(this.recycle, this.anim.currentClip.duration)
  }

  recycle() {
    this.bulletMng.despawnBullet(this)
  }
}
