import type { Node, Vec2 } from 'cc'
import { Animation, Color, Component, Graphics, UITransform, _decorator, find, v2 } from 'cc'
import { Logo } from '../begin/Logo'

const { ccclass, property } = _decorator

@ccclass('StartMenuUI')
export class StartMenuUI extends Component {
  @property({
    type: Graphics,
    tooltip: 'Background Graphics',
  })
  bgGraphics: Graphics = null

  center: Vec2

  orbits = []
  planets = []

  @property({
    type: Logo,
    tooltip: 'Logo Display',
  })
  Logo: Logo

  @property({
    type: Color,
    tooltip: 'Start Line Color',
  })
  startLineColor = new Color(255, 255, 255, 1)

  /**
   * Start Menu Background
   */
  startMenuBg: Node

  onLoad(): void {
    // TODO: Loading
  }

  start() {
    this.startMenuBg = find('Canvas/start-menu-bg')

    this.Logo.node.active = true
    this.Logo.fadeInOut(() => {
      this.Logo.bgAnim.on(Animation.EventType.FINISHED, () => {
        this.Logo.node.destroy()
      })
      this.Logo.bgAnim.play()
    })

    const height = this.bgGraphics.node.getComponent(UITransform).height
    this.center = v2(200, height / 2)
    this.showStartMenuBg()
  }

  /**
   * Show Start Menu Background
   */
  showStartMenuBg() {
    this.startMenuBg.active = true
    this.generateRandomOrbitPlanet(8)
    this.startLineColor = this.getRandomColor()
    this.drawOrbitPlanet()
    this.drawStarLine()
  }

  getRandomColor() {
    return new Color(
      255,
      255,
      255,
      50 + 150 * Math.random(),
    )
  }

  generateRandomOrbitPlanet(num: number) {
    this.orbits = []
    this.planets = []
    for (let i = 0; i < num; i++) {
      const radius = 100 + Math.random() * 20 + i * 80
      const strokeColor = this.getRandomColor()
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

      const fillColor = this.getRandomColor()
      const strokeColor = this.getRandomColor()

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
    if (this.startMenuBg.active === false)
      return

    for (let i = 0; i < this.planets.length; i++) {
      // this.planets[i].radian -= this.planets[i].speed * Math.PI / 180
      this.planets[i].radian -= this.planets[i].speed * Math.PI / 180
    }
    this.bgGraphics.clear()
    this.drawOrbitPlanet()
    this.drawStarLine()
  }
}
