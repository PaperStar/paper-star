import { Component, _decorator, director, v2 } from 'cc'
const { ccclass } = _decorator

@ccclass('Gravity')
export class Gravity extends Component {
  // use this for initialization
  onEnable() {
    const manager = director.getPhysicsManager()

    this.bodies = []
    this.body = this.getComponent(cc.RigidBody)
    this.originGravity = manager.gravity
    manager.gravity = v2()
  }

  onDisable() {
    director.getPhysicsManager().gravity = this.originGravity
  }

  onBeginContact(contact, selfCollider, otherCollider) {
    this.bodies.push(otherCollider.body)
  }

  onEndContact(contact, selfCollider, otherCollider) {
    const index = this.bodies.indexOf(otherCollider.body)
    if (index !== -1)
      this.bodies.splice(index, 1)
  }

  // called every frame, uncomment this function to activate update callback
  update() {
    if (!this.body)
      return

    const { bodies } = this
    for (let i = 0; i < bodies.length; i++)
      this._applyForce(bodies[i])
  }

  _applyForce(_body) {
    // todo
  }
}
