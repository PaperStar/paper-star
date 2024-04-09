import type { ParticleSystem, Prefab, Sprite } from 'cc'
import { Component, _decorator, instantiate, misc, v2 } from 'cc'
import { inflictDamage } from '../../utils'
import { AttackType, BulletType, FoeType } from '../../types'

const { ccclass, property } = _decorator

@ccclass('Foe')
export class Foe extends Component {
  foeType = FoeType.Foe1
  atkType = AttackType.Melee
  @property({
    tooltip: '子弹类型',
    type: BulletType,
  })
  bulletType = BulletType.Line

  @property({
    tooltip: '子弹可碰撞次数',
  })
  bulletCollisionTime = 2

  hp = 0
  curHp: 0
  score: 0
  crashDamage: 0
  moveSpeed: 0
  turnSpeed: 0
  moveDir = v2(0, 1)
  atkDir = v2()
  atkRange: 0
  atkDuration = 0
  atkPrepTime = 0
  fxSmoke: ParticleSystem

  sprite: Sprite
  hpBarPrefab: Prefab

  // shoot
  _delayFlag = false
  _shootFlag = false

  init(waveMng) {
    this.waveMng = waveMng
    this.player = waveMng.player
    this.isAttacking = false
    this.isAlive = false
    this.isInvincible = false
    this.isMoving = false
    this.curHp = this.hp
    this.anim = this.node.getChildByName('sprite').getComponent(cc.Animation)
    this.anim.play('fadeIn')
    this.readyToMove()
    this.body = this.getComponent(cc.RigidBody)

    this.initHpBar()
    this.node.rotation = Math.random() * 360
  }

  initHpBar() {
    if (this.hpBarPrefab) {
      const HpBar = instantiate(this.hpBarPrefab)
      this.node.addChild(HpBar)
      this.hpBar = HpBar.getComponent('HpBar')
      this.hpBar.init()
      this.hpBar.setDisplayPosition(cc.v2(0, this.sprite.node.height))
    }
  }

  readyToMove() {
    this.isAlive = true
    this.isMoving = true
    this.fxSmoke.resetSystem()
  }

  prepAttack() {
    this.isAttacking = true
    this.scheduleOnce(this.attack, this.atkPrepTime)
  }

  attack() {
    if (this.isAlive === false)
      return

    this.atkDir = cc.pNormalize(
      this.player.node.position.sub(this.node.position),
    )
    // if (this.atkType === AttackType.Melee) {

    // } else if (this.atkType === AttackType.Range) {

    // }
    this.isAttacking = false
    this.isMoving = true
  }

  rotate() {
    const sepAngle = cc.radiansToDegrees(
      cc.pAngleSigned(this.moveDir, this.atkDir),
    )
    if (sepAngle > 10)
      this.node.rotation -= this.turnSpeed

    else if (sepAngle < -10)
      this.node.rotation += this.turnSpeed

    const radian = cc.misc.degreesToRadians(90 - this.node.rotation)
    this.moveDir = cc.v2(
      Math.cos(radian),
      Math.sin(radian),
    )
  }

  attackOnTarget() {
    this.shoot()
  }

  dead() {
    this.isMoving = false
    this.isAttacking = false
    this.unscheduleAllCallbacks()
    this.node.stopAllActions()
    if (this.player && this.player.isAlive) {
      this.player.addKills()
      this.waveMng.killFoe(this.score)
    }
    this.anim.play('dead')
    this.scheduleOnce(this.recycle, this.anim.currentClip.duration)
  }

  recycle() {
    this.waveMng.despawnFoe(this)
  }

  onBeginContact(contact, selfCollider, otherCollider) {
    this.curHp -= inflictDamage(otherCollider)
    this.hpBar.display(this.curHp, this.hp)

    if (this.curHp <= 0 && this.isAlive) {
      this.isAlive = false
      this.dead()
    }

    this.turnSpeed = -this.turnSpeed
  }

  update() {
    if (this.isAlive === false)
      return

    if (!this.isAttacking)
      this.prepAttack()

    else if (this._shootFlag && !this._delayFlag)
      this.shoot()

    if (this.isMoving) {
      this.move()
      this.rotate()
    }
    else {
      // this.body.linearVelocity = cc.v2(0, 0)
    }
  }

  shoot() {
    const radian = misc.degreesToRadians(90 - this.node.rotation)
    const dir = v2(Math.cos(radian), Math.sin(radian))
    this._delayFlag = true
    this.waveMng.spawnBullet(this.bulletType, dir, this)
  }

  move() {
    switch (this.atkType) {
      case AttackType.Melee: {
        this.body.linearVelocity = this.moveDir.mul(this.moveSpeed)
        break
      }
      case AttackType.Range: {
        const distance
          = this.player.node.position.sub(this.node.position).mag()
        if (distance < this.atkRange) {
          this.isMoving = false
          this._shootFlag = true
        }
        else {
          this._shootFlag = false
          this.body.linearVelocity = this.moveDir.mul(this.moveSpeed)
        }
        break
      }
      default: {
        break
      }
    }
  }
}
