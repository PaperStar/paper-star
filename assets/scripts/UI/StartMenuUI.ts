import type { Vec2 } from 'cc'
import { Color, Component, Graphics, UITransform, _decorator, v2 } from 'cc'

const { ccclass, property } = _decorator

@ccclass('StartMenuUI')
export class StartMenuUI extends Component {
  @property({
    type: Graphics,
    tooltip: 'Background Graphics',
  })
  bgGraphics: Graphics = null

  @property({
    type: Color,
    tooltip: 'Start Line Color',
  })
  startLineColor = new Color(0, 0, 0, 1)

  center: Vec2

  orbits = []
  planets = []

  start() {
    const height = this.bgGraphics.node.getComponent(UITransform).height
    this.center = v2(200, height / 2)
    this.init()
    this.drawOrbitPlanet()
    this.drawStarLine()
  }

  init() {
    this.generateRandomOrbitPlanet(8)
    this.startLineColor = new Color(0, 0, 0, 50 + 150 * Math.random())
  }

  generateRandomOrbitPlanet(num: number) {
    this.orbits = []
    this.planets = []
    for (let i = 0; i < num; i++) {
      const radius = 100 + Math.random() * 20 + i * 80
      const strokeColor = new Color(0, 0, 0, 50 + 100 * Math.random())
      const orbit = {
        radius,
        strokeColor,
      }
      this.orbits.push(orbit)
    }

    for (let i = 0; i < num; i++) {
      const maxAngle = -80 + i * 10
      const minAngle = 80 - i * 10
      const radian = (minAngle + Math.random() * (maxAngle - minAngle))
        * (Math.PI / 180)
      const radius = 10 + Math.random() * 20
      const hasRing = Math.random() > 0.5
      const speed = Math.random() * 0.5
      const fillColor = new Color(0, 0, 0, 200 + 55 * Math.random())
      const strokeColor = new Color(0, 0, 0, 50 + 150 * Math.random())
      const ringRadius = radius + 10 + 5 * Math.random()
      const lineWidth = 6 + 4 * Math.random()
      const planet = {
        radian,
        radius,
        fillColor,
        strokeColor,
        hasRing,
        speed,
        ringRadius,
        lineWidth,
      }
      this.planets.push(planet)
    }
  }

  drawOrbitPlanet() {
    const ctx = this.bgGraphics

    // draw orbit
    for (let i = 0; i < this.orbits.length; i++) {
      ctx.lineWidth = 2
      ctx.strokeColor = this.orbits[i].strokeColor
      ctx.circle(this.center.x, this.center.y, this.orbits[i].radius)
      ctx.stroke()
    }

    // draw planet
    for (let i = 0; i < this.planets.length; i++) {
      const x = Math.cos(this.planets[i].radian)
        * this.orbits[i].radius + this.center.x
      const y = Math.sin(this.planets[i].radian)
        * this.orbits[i].radius + this.center.y
      ctx.fillColor = this.planets[i].fillColor
      ctx.circle(x, y, this.planets[i].radius)
      // ctx.fill()
      ctx.lineWidth = 3
      ctx.strokeColor = this.planets[i].fillColor
      ctx.stroke()
      if (this.planets[i].hasRing) {
        ctx.circle(
          this.planets[i].x,
          this.planets[i].y,
          this.planets[i].ringRadius,
        )
        ctx.lineWidth = this.planets[i].lineWidth
        ctx.strokeColor = this.planets[i].strokeColor
        ctx.stroke()
      }
    }
  }

  drawStarLine() {
    const ctx = this.bgGraphics

    ctx.lineWidth = 3
    // ctx.moveTo(this.center.x, this.center.y)
    const firstPlanet = v2(
      Math.cos(this.planets[0].radian) * this.orbits[0].radius
      + this.center.x,
      Math.sin(this.planets[0].radian) * this.orbits[0].radius
      + this.center.y,
    )
    ctx.moveTo(firstPlanet.x, firstPlanet.y)
    ctx.strokeColor = this.startLineColor
    for (let i = 1; i < this.planets.length; i++) {
      const x = Math.cos(this.planets[i].radian)
        * this.orbits[i].radius + this.center.x
      const y = Math.sin(this.planets[i].radian)
        * this.orbits[i].radius + this.center.y
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  update(_deltaTime: number) {
    for (let i = 0; i < this.planets.length; i++) {
      // this.planets[i].radian -= this.planets[i].speed * Math.PI / 180
      this.planets[i].radian -= this.planets[i].speed * Math.PI / 180
    }
    this.bgGraphics.clear()
    this.drawOrbitPlanet()
    this.drawStarLine()
  }
}
