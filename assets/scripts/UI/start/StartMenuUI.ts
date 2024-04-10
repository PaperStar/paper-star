import type { Node, Vec2 } from 'cc'
import { Animation, Color, Component, Graphics, Prefab, SpriteFrame, _decorator, find, instantiate, v2 } from 'cc'
import { Logo } from '../../begin/Logo'
import { Orbit, UIPlanet } from '../start/UIPlanet'

const { ccclass, property } = _decorator

@ccclass('StartMenuUI')
export class StartMenuUI extends Component {
  @property({
    type: Graphics,
    tooltip: 'Background Graphics',
  })
  bgGraphics: Graphics = null

  center: Vec2

  orbits: Orbit[] = []
  planets: UIPlanet[] = []

  @property({
    type: Logo,
    tooltip: 'Logo Display',
  })
  Logo: Logo

  /**
   * Planet Particle Prefab
   */
  @property({
    type: Prefab,
    tooltip: 'Planet Trail Particle Prefab',
  })
  planetTrailParticlePrefab: Prefab

  @property({
    type: Color,
    tooltip: 'Start Line Color',
  })
  startLineColor = new Color(255, 255, 255, 1)

  /**
   * Start Menu Background
   */
  startMenuBg: Node
  bgContainer: Node

  @property({
    type: Prefab,
    tooltip: 'UI Planet Prefab',
  })
  uiPlanetPrefab: Prefab

  @property({
    type: SpriteFrame,
    tooltip: 'Test Sprite Frame',
  })
  testSpriteFrame: SpriteFrame

  onLoad(): void {
    // TODO: Loading
  }

  start() {
    this.startMenuBg = find('Canvas/start-menu-bg')
    this.bgContainer = find('Canvas/start-menu-bg/bg-container')

    this.Logo.node.active = true
    this.Logo.fadeInOut(() => {
      this.Logo.bgAnim.on(Animation.EventType.FINISHED, () => {
        this.Logo.node.destroy()
      })
      this.Logo.bgAnim.play()
    })

    this.center = v2(-200, 0)
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
      const orbit = new Orbit({
        center: this.center,
        radius,
        strokeColor: new Color(
          255,
          255,
          255,
          50 + 50 * Math.random(),
        ),
      })
      this.orbits.push(orbit)
      this.bgContainer.addChild(orbit.node)
    }

    for (let i = 0; i < num; i++) {
      const maxAngle = -80 + i * 10
      const minAngle = 80 - i * 10
      const radian = (minAngle + Math.random() * (maxAngle - minAngle))
        * (Math.PI / 180)
      const radius = 10 + Math.random() * 20
      const hasRing = Math.random() > 0.5
      const speed = Math.random() * 0.5

      const ringRadius = radius + 10 + 5 * Math.random()
      const lineWidth = 6 + 4 * Math.random()
      const planetNode = instantiate(this.uiPlanetPrefab)
      const uiPlanet = planetNode.getComponent(UIPlanet)
      uiPlanet.init({
        radian,
        radius,
        fillColor: new Color(255, 255, 255, 255),
        strokeColor: this.getRandomColor(),
        hasRing,
        speed,
        ringRadius,
        lineWidth,

        hasParticle: true,
      })
      uiPlanet.setOrbit(this.orbits[i])

      this.planets.push(uiPlanet)
      this.bgContainer.addChild(planetNode)
    }
  }

  /**
   * Draw Orbit and Planet
   */
  drawOrbitPlanet() {
    this.orbits.forEach((orbit) => {
      orbit.draw()
    })
    this.planets.forEach((planet) => {
      planet.draw()
    })
  }

  drawStarLine() {
    const ctx = this.bgGraphics
    ctx.lineWidth = 3
    // ctx.moveTo(this.center.x, this.center.y)
    const firstPlanet = v2(
      Math.cos(this.planets[0].options.radian) * this.orbits[0].options.radius
      + this.center.x,
      Math.sin(this.planets[0].options.radian) * this.orbits[0].options.radius
      + this.center.y,
    )
    ctx.moveTo(firstPlanet.x, firstPlanet.y)
    ctx.strokeColor = this.startLineColor
    for (let i = 1; i < this.planets.length; i++) {
      const planet = this.planets[i]
      const orbit = this.orbits[i]
      const x = Math.cos(planet.options.radian)
        * orbit.options.radius + this.center.x
      const y = Math.sin(planet.options.radian)
        * orbit.options.radius + this.center.y
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  update(_deltaTime: number) {
    if (this.startMenuBg.active === false)
      return

    for (let i = 0; i < this.planets.length; i++) {
      const planet = this.planets[i]
      // this.planets[i].radian -= this.planets[i].speed * Math.PI / 180
      planet.options.radian -= planet.options.speed * Math.PI / 180
    }
    this.bgGraphics.clear()
    this.drawStarLine()
  }
}
