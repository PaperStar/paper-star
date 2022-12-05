import type NodePool from 'NodePool'
import type { Node, Prefab } from 'cc'
import { Component, _decorator, instantiate } from 'cc'
import { PlanetType } from '../../types'

const { ccclass, property } = _decorator

@ccclass('MapControl')
export class MapControl extends Component {
  @property()
  map: Node

  planetPools: NodePool = []

  planetNum = 10
  fiveStarAnim: Prefab
  fourStarAnim: Prefab
  twoStarAnim: Prefab

  init() {
    for (let i = 0; i < this.planetPools.length; ++i)
      this.planetPools[i].init()

    this.StarAnim = this.node.getChildByName('bg').getChildByName('StarAnim')
    this.generatePlanet(this.planetNum)
    this.generateManyStarAnim(30)
  }

  getPlanet(planetType) {
    return this.planetPools[planetType].get()
  }

  putPlanet(planetType, obj) {
    return this.planetPools[planetType].put(obj)
  }

  generatePlanet(num) {
    this.PlanetRectArray = []
    this.PlanetMargin = 100
    for (let i = 0; i < num; i++) {
      this.curPlanet = this.getPlanet(PlanetType.Simple)
      this.curPlanetPos = cc.v2(
        (Math.random() - 0.5) * 2 * (this.map.width - 500) / 2,
        (Math.random() - 0.5) * 2 * (this.map.height - 500) / 2,
      )
      this.curPlanetRect = cc.rect(
        this.curPlanetPos.x,
        this.curPlanetPos.y,
        this.curPlanet.width + this.PlanetMargin,
        this.curPlanet.height + this.PlanetMargin,
      )

      // 检验当前位置是否已有 planet
      for (let j = 0; j < i; j++) {
        this.oldPlanetRect = this.PlanetRectArray[j]
        this.checkIntersectPlanet()
      }
      this.PlanetRectArray.push(this.curPlanetRect)
      this.curPlanet.parent = this.map
      this.curPlanet.setPosition(this.curPlanetPos)
      this.curPlanet.getComponent('Planet').init(this)
    }
  }

  checkIntersectPlanet() {
    if (this.oldPlanetRect.intersects(this.curPlanetRect)) {
      this.curPlanetPos = cc.v2(
        (Math.random() - 0.5) * 2 * (this.map.width - 500) / 2,
        (Math.random() - 0.5) * 2 * (this.map.height - 500) / 2,
      )
      this.curPlanetRect = cc.rect(
        this.curPlanetPos.x,
        this.curPlanetPos.y,
        this.curPlanet.width + this.PlanetMargin,
        this.curPlanet.height + this.PlanetMargin,
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

  generateStarAnim(StarPrefab) {
    const Star = instantiate(StarPrefab)
    Star.parent = this.StarAnim
    const randomPosition = cc.v2(
      (Math.random() - 0.5) * 2 * this.map.width / 2,
      (Math.random() - 0.5) * 2 * this.map.height / 2,
    )
    Star.setPosition(randomPosition)
    Star.scale = Math.random() + 0.1
  }
}
