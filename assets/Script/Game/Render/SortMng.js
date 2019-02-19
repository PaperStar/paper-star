cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  init() {
    this.frameCount = 0;
  },

  // called every frame, uncomment this function to activate update callback
  update(dt) {
    if (++this.frameCount % 6 === 0) {
      this.sortChildrenByY();
    }
  },

  sortChildrenByY() {
    const listToSort = this.node.children.slice();
    listToSort.sort((a, b) => b.y - a.y);
    for (let i = 0; i < listToSort.length; ++i) {
      const node = listToSort[i];
      if (node.active) {
        node.setSiblingIndex(i);
      }
    }
  },
});
