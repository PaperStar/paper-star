import type { Animation, Prefab, SpriteFrame } from 'cc'
import { Component, Sprite, _decorator, instantiate, v2 } from 'cc'
import { PlanetType } from '../../../types'
import { getRandom, getRandomColor } from '../../../utils'

const { ccclass, property } = _decorator

@ccclass('NewComponent')
export class NewComponent extends Component {
  @property({
    tooltip: '星球类型',
  })
  planetType = PlanetType.Simple

  hp = 1000
  curHp = 1000
  radius = 100
  gravityRadial: Prefab
  gravityRadius = 200
  gravityForce = 300
  breakSpriteFrame: SpriteFrame
  breakAnim: Animation

  hpBarPrefab: Prefab

  init(map) {
    this.map = map
    this.curHp = this.hp
    const color = cc.Color.BLACK
    this.node.color = color.fromHEX(getRandomColor())
    this.getComponent(cc.RigidBody).angularVelocity
      = (Math.random() - 0.5) * 2 * 200
    this.node.scale = Math.random() * 1 + 0.3
    this.node.rotation = getRandom(0, 360)

    this.initGravity()
    this.initHpBar()
  }

  initHpBar() {
    if (this.hpBarPrefab) {
      const HpBar = instantiate(this.hpBarPrefab)
      this.node.addChild(HpBar)
      this.hpBar = HpBar.getComponent('HpBar')
      this.hpBar.init()
      this.hpBar.setDisplayPosition(v2(0, 0))
    }
  }

  initGravity() {
    // gravity
    let planeGravityRadial = ''
    if (this.node.getChildByName('gravity-radial'))
      planeGravityRadial = this.node.getChildByName('gravity-radial')

    else
      planeGravityRadial = instantiate(this.gravityRadial)

    planeGravityRadial.parent = this.node
    planeGravityRadial.getComponent(cc.PhysicsCircleCollider).radius
      = this.node.width + Math.random() * 200
    this.gravityForce = 100 + Math.random() * 200
    planeGravityRadial.getComponent('gravity-radial').gravityForce
      = this.gravityForce
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
      this.map.putPlanet(PlanetType.Simple, this.node)
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
