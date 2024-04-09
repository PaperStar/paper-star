import type { Node, NodePool } from 'cc'
import { Color, Component, SpriteFrame, _decorator, sys } from 'cc'

const { ccclass, property } = _decorator

@ccclass('Rank')
export class Rank extends Component {
  @property({
    type: SpriteFrame,
    tooltip: 'King crown',
  })
  king: SpriteFrame

  rankInfoItem: NodePool
  content: Node

  init() {
    this.rankInfoItem.init()
    this.fresh()
  }

  fresh() {
    this.putItems()

    const records = JSON.parse(sys.localStorage.getItem('records'))
    this.records = records.sort(this.compareScore)
    if (this.records)
      this.generateItems()
  }

  open() {
    this.node.active = true
  }

  close() {
    this.node.active = false
  }

  generateItems() {
    for (let i = 0; i < this.records.length; i++) {
      let RankInfoItem = this.rankInfoItem.get()
      this.content.addChild(RankInfoItem)
      RankInfoItem = RankInfoItem.getComponent('RankInfoItem')

      this.records[i].rank = i + 1
      this.setRankInfo(RankInfoItem, i)
    }

    sys.localStorage.setItem('records', JSON.stringify(this.records))
  }

  putItems() {
    const { length } = this.content.children
    // after put | children.length 动态变化
    for (let i = length - 1; i >= 0; i--)
      this.rankInfoItem.put(this.content.children[i])
  }

  setRankInfo(item, i) {
    if (i === 0)
      item.avatar.spriteFrame = this.king

    // color
    if (i % 2 === 0)
      item.node.color = new Color(51, 51, 51)

    else
      item.node.color = new Color(34, 34, 34)

    item.rank.string = this.records[i].rank
    item.nickName.string = this.records[i].nickName
    item.score.string = this.records[i].wxgame.score
  }

  // sort descending
  compareScore(record1, record2) {
    const s1 = record1.wxgame.score
    const s2 = record2.wxgame.score
    if (s1 > s2)
      return -1
    if (s1 < s2)
      return 1

    return 0
  }
}
