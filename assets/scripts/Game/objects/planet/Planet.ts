import type { Animation, SpriteFrame } from 'cc'
import { CircleCollider2D, Color, Component, Enum, Prefab, RigidBody2D, Sprite, _decorator, instantiate, v2 } from 'cc'
import { PlanetType } from '../../../types'
import { getRandom, getRandomColor } from '../../../utils'
import type { MapControl } from '../../map/MapControl'
import { HpBar } from '../../../ui/HpBar'

const { ccclass, property } = _decorator

@ccclass('Planet')
export class Planet extends Component {
  @property({
    type: Enum(PlanetType),
    tooltip: '星球类型',
  })
  planetType = PlanetType.Simple

  @property({
    tooltip: '血量上限',
  })
  hp = 1000

  hpBar: HpBar
  @property({
    type: Prefab,
    tooltip: '血条预制体',
  })
  hpBarPrefab: Prefab

  @property({
    tooltip: '当前血量',
  })
  curHp = 1000

  @property({
    tooltip: '默认半径',
  })
  radius = 100

  @property({
    tooltip: '最小半径',
  })
  minRadius = 50

  @property({
    tooltip: '最大半径',
  })
  maxRadius = 150

  @property({
    tooltip: '引力预制体',
  })
  gravityRadial: Prefab

  @property({
    tooltip: '引力半径',
  })
  gravityRadius = 200

  @property({
    tooltip: '引力大小',
  })
  gravityForce = 300

  @property({
    tooltip: '碎裂帧动画',
  })
  breakSpriteFrame: SpriteFrame

  @property({
    tooltip: '碎裂动画',
  })
  breakAnim: Animation

  @property({
    tooltip: '最小旋转速度',
  })
  minAngularVelocity = 0

  @property({
    tooltip: '最大旋转速度',
  })
  maxAngularVelocity = 5

  map: MapControl

  initRadius() {
    this.radius = getRandom(this.minRadius, this.maxRadius)
  }

  init(map: MapControl) {
    this.map = map
    this.curHp = this.hp

    // set random color
    const sprite = this.getComponent(Sprite)
    Color.fromHEX(sprite.color, getRandomColor())

    // enable rigid rotation
    const rigidBody2D = this.getComponent(RigidBody2D)
    const velocity = getRandom(this.minAngularVelocity, this.maxAngularVelocity)
    rigidBody2D.angularVelocity = velocity

    // collider radius
    const collider2D = this.getComponent(CircleCollider2D)
    collider2D.radius = this.radius

    const scale = Math.random() * 1 + 0.3
    this.node.setScale(scale, scale)
    this.node.setRotationFromEuler(0, 0, getRandom(0, 360))

    this.initGravity()
    this.initHpBar()
  }

  initHpBar() {
    if (this.hpBarPrefab) {
      const hpBar = instantiate(this.hpBarPrefab)
      this.node.addChild(hpBar)
      this.hpBar = hpBar.getComponent(HpBar)
      this.hpBar.init()
      this.hpBar.setDisplayPosition(v2(0, 0))
    }
  }

  initGravity() {
    // gravity
    // let planeGravityRadial = ''
    // if (this.node.getChildByName('gravity-radial'))
    //   planeGravityRadial = this.node.getChildByName('gravity-radial')

    // else
    //   planeGravityRadial = instantiate(this.gravityRadial)

    // planeGravityRadial.parent = this.node
    // planeGravityRadial.getComponent(cc.PhysicsCircleCollider).radius
    //   = this.node.width + Math.random() * 200
    // this.gravityForce = 100 + Math.random() * 200
    // planeGravityRadial.getComponent('gravity-radial').gravityForce
    //   = this.gravityForce
  }

  onBeginContact(contact, selfCollider, otherCollider) {
    this.curHp -= this.inflictDamage(otherCollider)

    if (this.curHp === 500) {
      // change spriteframe
      // use === to avoid repeat change
      this.getComponent(Sprite).spriteFrame = this.breakSpriteFrame
    }
    else if (this.curHp <= 0) {
      // play break anim
      this.breakAnim.play('break')
      this.map.planetPools[PlanetType.Simple].put(this.node)
    }

    this.hpBar.display(this.curHp, this.hp)
  }

  inflictDamage(otherCollider) {
    const name = otherCollider.node.name.toLowerCase()
    if (name.includes('bullet'))
      return otherCollider.node.getComponent('Bullet').damage

    return 1
  }
}
