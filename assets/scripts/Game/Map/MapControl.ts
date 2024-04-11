import type { Rect } from 'cc'
import { CCInteger, Component, Node, NodePool, Prefab, Size, _decorator, find, instantiate, rect, v2, v3 } from 'cc'
import { PlanetType } from '../../types'
import { Planet } from '../objects/planet/Planet'

const { ccclass, property } = _decorator

@ccclass('MapControl')
export class MapControl extends Component {
  planetPools: Record<PlanetType, NodePool> = {
    [PlanetType.Simple]: new NodePool(),
    [PlanetType.Other]: new NodePool(),
  }

  @property({
    type: Size,
    tooltip: '地图大小',
  })
  mapSize = new Size(2000, 2000)

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

  /**
   * 用于检测星球是否重叠
   */
  planetRectArray: Rect[] = []

  curPlanet: Planet
  curPlanetRect: Rect
  /**
   * 当前星球大小(random)
   */
  curPlanetSize: number

  @property({
    type: Node,
    tooltip: '星星动画容器',
  })
  starAnimContainer: Node

  protected onLoad(): void {
    this.starAnimContainer = find('Canvas/map/bg/star-anim-container')
  }

  init() {
    this.generatePlanet(this.planetNum)
    this.generateManyStarAnim(30)
  }

  generatePlanet(num: number) {
    for (let i = 0; i < num; i++) {
      const planetNode = instantiate(this.planetPrefab)
      this.planetPools[PlanetType.Simple].put(planetNode)

      this.curPlanet = planetNode.getComponent(Planet)
      // 随机位置，不要靠近边缘
      const margin = 500

      const rectHalfSize = this.curPlanet.radius + this.planetMargin
      const pos = v3(
        (Math.random() - 0.5) * 2 * (this.mapSize.width - margin) / 2 - rectHalfSize,
        (Math.random() - 0.5) * 2 * (this.mapSize.height - margin) / 2 - rectHalfSize,
        0,
      )
      this.curPlanet.initRadius()

      this.curPlanetRect = rect(
        pos.x,
        pos.y,
        rectHalfSize,
        rectHalfSize,
      )

      // 检验当前位置是否已有 planet，并更新新的位置
      this.checkIntersectPlanet()
      this.planetRectArray.push(this.curPlanetRect)

      const terrainNode = find('Canvas/map/terrain')
      terrainNode.addChild(this.curPlanet.node)

      this.curPlanet.node.setPosition(pos)
      this.curPlanet.init(this)
    }
  }

  /**
   * 检测星球是否重叠
   */
  checkIntersectPlanet() {
    const rectHalfSize = this.curPlanet.radius + this.planetMargin

    for (let i = 0; i < this.planetRectArray.length; i++) {
      const planetRect = this.planetRectArray[i]
      if (this.curPlanetRect.intersects(planetRect)) {
        // 创建新位置
        const pos = v2(
          (Math.random() - 0.5) * 2 * (this.mapSize.width - 500) / 2 - rectHalfSize,
          (Math.random() - 0.5) * 2 * (this.mapSize.height - 500) / 2 - rectHalfSize,
        )
        this.curPlanetRect = rect(
          pos.x,
          pos.y,
          rectHalfSize,
          rectHalfSize,
        )
        // this.checkIntersectPlanet()
        break
      }
    }
  }

  /**
   * 生成多个星星动画
   */
  generateManyStarAnim(num: number) {
    for (let i = 0; i < num; i++) {
      this.generateStarAnim(this.fiveStarAnim)
      this.generateStarAnim(this.fourStarAnim)
      this.generateStarAnim(this.twoStarAnim)
    }
  }

  generateStarAnim(StarPrefab: Prefab) {
    if (!StarPrefab)
      return

    const star = instantiate(StarPrefab)
    star.parent = this.starAnimContainer
    const randomPosition = v3(
      (Math.random() - 0.5) * 2 * this.mapSize.width / 2,
      (Math.random() - 0.5) * 2 * this.mapSize.height / 2,
      0,
    )
    star.setPosition(randomPosition)
    // Star.scale = Math.random() + 0.1
    const scale = Math.random() + 0.1
    star.setScale(scale, scale, 1)
  }
}
