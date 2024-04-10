import type { Node, Rect } from 'cc'
import { CCInteger, Component, NodePool, Prefab, UITransform, _decorator, instantiate, rect, v2, v3 } from 'cc'
import { PlanetType } from '../../types'

const { ccclass, property } = _decorator

@ccclass('MapControl')
export class MapControl extends Component {
  planetPools: Record<PlanetType, NodePool> = {
    [PlanetType.Simple]: new NodePool(),
    [PlanetType.Other]: new NodePool(),
  }

  @property({
    type: CCInteger,
    tooltip: '星球数量',
  })
  planetNum = 10

  @property({
    type: Prefab,
    tooltip: '星球预制体',
  })
  planetPrefab: Prefab

  @property({
    type: Prefab,
    tooltip: '五角星动画',
  })
  fiveStarAnim: Prefab

  @property({
    type: Prefab,
    tooltip: '四角星动画',
  })
  fourStarAnim: Prefab

  @property({
    type: Prefab,
    tooltip: '十字星动画',
  })
  twoStarAnim: Prefab

  @property({
    type: CCInteger,
    tooltip: '星球最小间距',
  })
  planetMargin = 100

  PlanetRectArray = []

  curPlanet: Node
  curPlanetRect: Rect

  StarAnim: Node

  init() {
    this.StarAnim = this.node.getChildByName('bg').getChildByName('StarAnim')
    this.generatePlanet(this.planetNum)
    this.generateManyStarAnim(30)
  }

  getPlanet(planetType: PlanetType) {
    let planet = this.planetPools[planetType].get()
    if (!planet) {
      planet = instantiate(this.planetPrefab)
      this.planetPools[planetType].put(planet)
    }
    return this.planetPools[planetType].get()
  }

  putPlanet(planetType: PlanetType, obj) {
    return this.planetPools[planetType].put(obj)
  }

  generatePlanet(num: number) {
    for (let i = 0; i < num; i++) {
      this.curPlanet = this.getPlanet(PlanetType.Simple)
      const curPlanetSize = this.curPlanet.getComponent(UITransform).contentSize
      const mapSize = this.getComponent(UITransform).contentSize
      const pos = v3(
        (Math.random() - 0.5) * 2 * (mapSize.width - 500) / 2,
        (Math.random() - 0.5) * 2 * (mapSize.height - 500) / 2,
        0,
      )
      this.curPlanetRect = rect(
        pos.x,
        pos.y,
        curPlanetSize.width + this.planetMargin,
        curPlanetSize.height + this.planetMargin,
      )

      // 检验当前位置是否已有 planet
      for (let j = 0; j < i; j++) {
        this.oldPlanetRect = this.PlanetRectArray[j]
        this.checkIntersectPlanet()
      }
      this.PlanetRectArray.push(this.curPlanetRect)
      this.node.addChild(this.curPlanet)
      this.curPlanet.setPosition(pos)
      this.curPlanet.getComponent('Planet').init(this)
    }
  }

  checkIntersectPlanet() {
    const planetSize = this.curPlanet.getComponent(UITransform).contentSize
    const mapSize = this.getComponent(UITransform).contentSize
    if (this.oldPlanetRect.intersects(this.curPlanetRect)) {
      const pos = v2(
        (Math.random() - 0.5) * 2 * (mapSize.width - 500) / 2,
        (Math.random() - 0.5) * 2 * (mapSize.height - 500) / 2,
      )
      this.curPlanetRect = rect(
        pos.x,
        pos.y,
        planetSize.width + this.planetMargin,
        planetSize.height + this.planetMargin,
      )
      this.checkIntersectPlanet()
    }
  }

  generateManyStarAnim(num) {
    for (let i = 0; i < num; i++) {
      this.generateStarAnim(this.fiveStarAnim)
      this.generateStarAnim(this.fourStarAnim)
      this.generateStarAnim(this.twoStarAnim)
    }
  }

  generateStarAnim(StarPrefab: Prefab) {
    const Star = instantiate(StarPrefab)
    Star.parent = this.StarAnim
    const mapSize = this.getComponent(UITransform).contentSize
    const randomPosition = v3(
      (Math.random() - 0.5) * 2 * mapSize.width / 2,
      (Math.random() - 0.5) * 2 * mapSize.height / 2,
      0,
    )
    Star.setPosition(randomPosition)
    // Star.scale = Math.random() + 0.1
    const scale = Math.random() + 0.1
    Star.setScale(scale, scale, 1)
  }
}
