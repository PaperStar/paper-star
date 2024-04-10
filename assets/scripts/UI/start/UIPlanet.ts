import { Color, Component, Graphics, Layers, Node, type Vec2, _decorator } from 'cc'

export interface UIPlanetProps {
  radian: number
  radius: number
  fillColor: Color
  strokeColor: Color
  hasRing: boolean
  speed: number
  ringRadius: number
  lineWidth: number
  hasParticle?: boolean
}

export interface OrbitProps {
  center: Vec2
  radius: number
  strokeColor: Color
}

/**
 * Planet Orbit
 */
export class Orbit {
  node: Node = new Node('orbit')
  graphics?: Graphics

  constructor(public options: OrbitProps) {
    this.options = options

    this.node.layer = Layers.Enum.UI_2D
  }

  /**
   * init
   */
  draw() {
    this.graphics = this.node.addComponent(Graphics)
    const ctx = this.graphics
    const options = this.options

    ctx.lineWidth = 2
    ctx.strokeColor = options.strokeColor
    ctx.circle(options.center.x, options.center.y, options.radius)
    ctx.stroke()
  }

  update(_dt: number): void {
    // this.node.setPosition()
  }
}

const { ccclass } = _decorator
@ccclass('UIPlanet')
export class UIPlanet extends Component {
  node = new Node('planet')

  /**
   * which Orbit
   */
  orbit?: Orbit

  options: UIPlanetProps = {
    radian: 0,
    radius: 0,
    fillColor: new Color(255, 255, 255, 255),
    strokeColor: new Color(255, 255, 255, 255),
    hasRing: false,
    speed: 0,
    ringRadius: 0,
    lineWidth: 0,
    hasParticle: false,
  }

  init(options: UIPlanetProps) {
    this.options = options
  }

  setOrbit(orbit: Orbit) {
    this.orbit = orbit
  }

  /**
   * draw planet
   */
  draw() {
    const ctx = this.node.getComponent(Graphics)

    ctx.fillColor = this.options.fillColor
    ctx.circle(0, 0, this.options.radius)
    // ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeColor = this.options.fillColor
    ctx.stroke()
    if (this.options.hasRing) {
      ctx.circle(
        0,
        0,
        this.options.ringRadius,
      )
      ctx.lineWidth = this.options.lineWidth
      ctx.strokeColor = this.options.strokeColor
      ctx.stroke()
    }

    // create particle
    if (this.options.hasParticle) {
      // const trailParticle = instantiate(this.planetTrailParticlePrefab)
      // trailParticle.setPosition(x, y)
    }
  }

  /**
   * 更新 planet 位置
   * @param _dt
   */
  update(_dt?: number) {
    const graphics = this.node.getComponent(Graphics)
    const orbit = this.orbit
    if (!orbit)
      return
    const x = Math.cos(this.options.radian) * orbit.options.radius + orbit.options.center.x
    const y = Math.sin(this.options.radian) * orbit.options.radius + orbit.options.center.y
    // this.x = x
    // this.y = y

    // console.log('update', x, y)
    graphics.node.setPosition(x, y)
  }
}
