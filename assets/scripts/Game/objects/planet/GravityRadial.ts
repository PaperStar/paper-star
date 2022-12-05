import { Component, _decorator, v2 } from 'cc'

const { ccclass, property } = _decorator

@ccclass('GravityRadial')
export class GravityRadial extends Component {
  @property()
  gravityForce = 500

  onLoad() {
    this._position = v2()
    this._center = v2()
  }

  _applyForce(body) {
    const position = this._position
    const center = this._center

    body.getWorldPosition(position)
    this.body.getWorldPosition(center)

    const dir = center.sub(position)
    if (dir.x !== 0 && dir.y !== 0) {
      const f = center.subSelf(position).normalizeSelf().mulSelf(
        this.gravityForce * body.getMass(),
      )
      body.applyForce(f, position, false)
    }
  }
}
