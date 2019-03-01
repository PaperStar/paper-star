import Gravity from 'gravity';

cc.Class({
  extends: Gravity,

  properties: {
    gravityForce: 500,
  },

  onLoad() {
    this._position = cc.v2();
    this._center = cc.v2();
  },

  _applyForce(body) {
    const position = this._position;
    const center = this._center;

    body.getWorldPosition(position);
    this.body.getWorldPosition(center);

    const dir = center.sub(position);
    if (dir.x != 0 && dir.y != 0) {
      const f = center.subSelf(position).normalizeSelf().mulSelf(
          this.gravityForce * body.getMass()
      );
      body.applyForce(f, position, false);
    }
  },
});
