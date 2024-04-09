import { CCInteger, Component, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('SortMng')
export class SortMng extends Component {
  @property(CCInteger)
  frameCount = 0

  update() {
    if (++this.frameCount % 6 === 0)
      this.sortChildrenByY()
  }

  sortChildrenByY() {
    const listToSort = this.node.children.slice()
    listToSort.sort((a, b) => b.y - a.y)
    for (let i = 0; i < listToSort.length; ++i) {
      const node = listToSort[i]
      if (node.active)
        node.setSiblingIndex(i)
    }
  }
}
