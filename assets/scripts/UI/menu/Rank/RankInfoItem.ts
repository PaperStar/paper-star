import type { Label, Sprite } from 'cc'
import { Component, _decorator } from 'cc'
const { ccclass, property } = _decorator

@ccclass('RankInfoItem')
export class RankInfoItem extends Component {
  avatar: Sprite
  rank: Label
  nickName: Label

  @property({
    tooltip: '得分',
  })
  score: Label
}
