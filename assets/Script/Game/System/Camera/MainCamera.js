cc.Class({
  extends: cc.Component,

  properties: {
    camera: cc.Camera,
  },

  init(target) {
    this.target = target;
  },

  lateUpdate(dt) {
    if (this.target) {
      this.camera.x = this.target.x;
      this.camera.y = this.target.y;

      const targetPos = this.target.parent
          .convertToWorldSpaceAR(this.target.position);
      this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
    }
  },
});
