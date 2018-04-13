require = function() {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n || e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = "function" == typeof require && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }
  return e;
}()({
  JoystickBG: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0ce7WST1RFf7Sj+l6jGZ6V", "JoystickBG");
    "use strict";
    var Common = require("JoystickCommon");
    cc.Class({
      extends: cc.Component,
      properties: {
        dot: {
          default: null,
          type: cc.Node,
          displayName: "摇杆节点"
        },
        _joyCom: {
          default: null,
          displayName: "joy Node"
        },
        _playerNode: {
          default: null,
          displayName: "被操作的目标Node"
        },
        _angle: {
          default: null,
          displayName: "当前触摸的角度"
        },
        _radian: {
          default: null,
          displayName: "弧度"
        },
        speed: {
          default: 0,
          displayName: "Move Speed"
        },
        speed1: {
          default: 1,
          displayName: "一级速度"
        },
        speed2: {
          default: 2,
          displayName: "二级速度"
        },
        opacity: {
          default: 255,
          displayName: "opacity"
        }
      },
      onLoad: function onLoad() {
        this.node.opacity = this.opacity;
        this._joyCom = this.node.parent.getComponent("Joystick");
        this._playerNode = this._joyCom.sprite;
        this._joyCom.touchType == Common.TouchType.DEFAULT && this._initTouchEvent();
      },
      _initTouchEvent: function _initTouchEvent() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, self);
      },
      update: function update(dt) {
        switch (this._joyCom.directionType) {
         case Common.DirectionType.ALL:
          this._allDirectionsMove();
        }
      },
      _allDirectionsMove: function _allDirectionsMove() {
        this._playerNode.x += Math.cos(this._angle * (Math.PI / 180)) * this.speed;
        this._playerNode.y += Math.sin(this._angle * (Math.PI / 180)) * this.speed;
      },
      _getDistance: function _getDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
      },
      _getRadian: function _getRadian(point) {
        this._radian = Math.PI / 180 * this._getAngle(point);
        return this._radian;
      },
      _getAngle: function _getAngle(point) {
        var pos = this.node.getPosition();
        this._angle = Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);
        return this._angle;
      },
      _setSpeed: function _setSpeed(point) {
        var distance = this._getDistance(point, this.node.getPosition());
        this.radius = this.node.width / 2;
        console.log("radius:" + this.radius);
        distance < this.radius ? this.speed = this.speed1 : this.speed = this.speed2;
      },
      _touchStartEvent: function _touchStartEvent(event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.p(0, 0));
        var radius = this.node.width / 2;
        this._stickPos = touchPos;
        var posX = this.node.getPosition().x + touchPos.x;
        var posY = this.node.getPosition().y + touchPos.y;
        if (radius > distance) {
          this.dot.setPosition(cc.p(posX, posY));
          return true;
        }
        return false;
      },
      _touchMoveEvent: function _touchMoveEvent(event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.p(0, 0));
        var radius = this.node.width / 2;
        var posX = this.node.getPosition().x + touchPos.x;
        var posY = this.node.getPosition().y + touchPos.y;
        if (radius > distance) this.dot.setPosition(cc.p(posX, posY)); else {
          var x = this.node.getPosition().x + Math.cos(this._getRadian(cc.p(posX, posY))) * radius;
          var y = this.node.getPosition().y + Math.sin(this._getRadian(cc.p(posX, posY))) * radius;
          this.dot.setPosition(cc.p(x, y));
        }
        this._getAngle(cc.p(posX, posY));
        this._setSpeed(cc.p(posX, posY));
      },
      _touchEndEvent: function _touchEndEvent() {
        this.dot.setPosition(this.node.getPosition());
        this.speed = 0;
      }
    });
    cc._RF.pop();
  }, {
    JoystickCommon: "JoystickCommon"
  } ],
  JoystickCommon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e230VOCwtGvYBEdKGvM2XS", "JoystickCommon");
    "use strict";
    module.exports = {
      TouchType: cc.Enum({
        DEFAULT: 0,
        FOLLOW: 1
      }),
      DirectionType: cc.Enum({
        FOUR: 4,
        EIGHT: 8,
        ALL: 0
      })
    };
    cc._RF.pop();
  }, {} ],
  Joystick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aab48BGt3tCj4s1/vilD88M", "Joystick");
    "use strict";
    var Common = require("./JoystickCommon");
    var JoystickBG = require("./JoystickBG");
    cc.Class({
      extends: cc.Component,
      properties: {
        dot: {
          default: null,
          type: cc.Node,
          displayName: "摇杆节点"
        },
        dot_opacity: {
          default: 255,
          displayName: "dot_opacity"
        },
        ring: {
          default: null,
          type: JoystickBG,
          displayName: "摇杆背景节点"
        },
        ring_opacity: {
          default: 255,
          displayName: "ring_opacity"
        },
        stickX: {
          default: 0,
          displayName: "摇杆 X 位置"
        },
        stickY: {
          default: 0,
          displayName: "摇杆 Y 位置"
        },
        touchType: {
          default: Common.TouchType.DEFAULT,
          type: Common.TouchType,
          displayName: "触摸类型"
        },
        directionType: {
          default: Common.DirectionType.ALL,
          type: Common.DirectionType,
          displayName: "方向类型"
        },
        sprite: {
          default: null,
          type: cc.Node,
          displayName: "操控的目标"
        },
        _stickPos: {
          default: null,
          type: cc.Node,
          displayName: "摇杆当前位置"
        },
        _touchLocation: {
          default: null,
          type: cc.Node,
          displayName: "摇杆当前位置"
        }
      },
      onLoad: function onLoad() {
        this._createStickSprite();
        this.touchType == Common.TouchType.FOLLOW && this._initTouchEvent();
      },
      _createStickSprite: function _createStickSprite() {
        this.ring.node.setPosition(this.stickX, this.stickY);
        this.dot.setPosition(this.stickX, this.stickY);
        this.ring.opacity = this.ring_opacity;
        this.dot.opacity = this.dot_opacity;
      },
      _initTouchEvent: function _initTouchEvent() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchEndEvent, self);
      },
      _touchStartEvent: function _touchStartEvent(event) {
        this._touchLocation = event.getLocation();
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.ring.node.setPosition(touchPos);
        this.dot.setPosition(touchPos);
        this._stickPos = touchPos;
      },
      _touchMoveEvent: function _touchMoveEvent(event) {
        if (this._touchLocation.x == event.getLocation().x && this._touchLocation.y == event.getLocation().y) return false;
        var touchPos = this.ring.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this.ring._getDistance(touchPos, cc.p(0, 0));
        var radius = this.ring.node.width / 2;
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        if (radius > distance) this.dot.setPosition(cc.p(posX, posY)); else {
          var x = this._stickPos.x + Math.cos(this.ring._getRadian(cc.p(posX, posY))) * radius;
          var y = this._stickPos.y + Math.sin(this.ring._getRadian(cc.p(posX, posY))) * radius;
          this.dot.setPosition(cc.p(x, y));
        }
        this.ring._getAngle(cc.p(posX, posY));
        this.ring._setSpeed(cc.p(posX, posY));
      },
      _touchEndEvent: function _touchEndEvent() {
        this.dot.setPosition(this.ring.node.getPosition());
        this.ring._speed = 0;
      }
    });
    cc._RF.pop();
  }, {
    "./JoystickBG": "JoystickBG",
    "./JoystickCommon": "JoystickCommon"
  } ],
  LanguageData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
    "use strict";
    var Polyglot = require("polyglot.min");
    var polyInst = null;
    window.i18n || (window.i18n = {
      languages: {},
      curLang: ""
    });
    false;
    function loadLanguageData(language) {
      return window.i18n.languages[language];
    }
    function initPolyglot(data) {
      data && (polyInst ? polyInst.replace(data) : polyInst = new Polyglot({
        phrases: data,
        allowMissing: true
      }));
    }
    module.exports = {
      init: function init(language) {
        if (language === window.i18n.curLang) return;
        var data = loadLanguageData(language) || {};
        window.i18n.curLang = language;
        initPolyglot(data);
        this.inst = polyInst;
      },
      t: function t(key, opt) {
        if (polyInst) return polyInst.t(key, opt);
      },
      inst: polyInst,
      updateSceneRenderers: function updateSceneRenderers() {
        var rootNodes = cc.director.getScene().children;
        var allLocalizedLabels = [];
        for (var i = 0; i < rootNodes.length; ++i) {
          var labels = rootNodes[i].getComponentsInChildren("LocalizedLabel");
          Array.prototype.push.apply(allLocalizedLabels, labels);
        }
        for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
          var label = allLocalizedLabels[_i];
          label.updateLabel();
        }
        var allLocalizedSprites = [];
        for (var _i2 = 0; _i2 < rootNodes.length; ++_i2) {
          var sprites = rootNodes[_i2].getComponentsInChildren("LocalizedSprite");
          Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (var _i3 = 0; _i3 < allLocalizedSprites.length; ++_i3) {
          var sprite = allLocalizedSprites[_i3];
          sprite.updateSprite(window.i18n.curLang);
        }
      }
    };
    cc._RF.pop();
  }, {
    "polyglot.min": "polyglot.min"
  } ],
  LocalizedLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
    "use strict";
    var i18n = require("LanguageData");
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function later() {
          timeout = null;
          immediate || func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(context, args);
      };
    }
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        menu: "i18n/LocalizedLabel"
      },
      properties: {
        dataID: {
          get: function get() {
            return this._dataID;
          },
          set: function set(val) {
            if (this._dataID !== val) {
              this._dataID = val;
              false;
              this.updateLabel();
            }
          }
        },
        _dataID: ""
      },
      onLoad: function onLoad() {
        false;
        i18n.inst || i18n.init();
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var label = this.getComponent(cc.Label);
        if (label) {
          this.label = label;
          this.updateLabel();
          return;
        }
      },
      updateLabel: function updateLabel() {
        if (!this.label) {
          cc.error("Failed to update localized label, label component is invalid!");
          return;
        }
        var localizedString = i18n.t(this.dataID);
        localizedString && (this.label.string = i18n.t(this.dataID));
      }
    });
    cc._RF.pop();
  }, {
    LanguageData: "LanguageData"
  } ],
  LocalizedSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
    "use strict";
    var SpriteFrameSet = require("SpriteFrameSet");
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        inspector: "packages://i18n/inspector/localized-sprite.js",
        menu: "i18n/LocalizedSprite"
      },
      properties: {
        spriteFrameSet: {
          default: [],
          type: SpriteFrameSet
        }
      },
      onLoad: function onLoad() {
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var sprite = this.getComponent(cc.Sprite);
        if (sprite) {
          this.sprite = sprite;
          this.updateSprite(window.i18n.curLang);
          return;
        }
      },
      getSpriteFrameByLang: function getSpriteFrameByLang(lang) {
        for (var i = 0; i < this.spriteFrameSet.length; ++i) if (this.spriteFrameSet[i].language === lang) return this.spriteFrameSet[i].spriteFrame;
      },
      updateSprite: function updateSprite(language) {
        if (!this.sprite) {
          cc.error("Failed to update localized sprite, sprite component is invalid!");
          return;
        }
        var spriteFrame = this.getSpriteFrameByLang(language);
        !spriteFrame && this.spriteFrameSet[0] && (spriteFrame = this.spriteFrameSet[0].spriteFrame);
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    cc._RF.pop();
  }, {
    SpriteFrameSet: "SpriteFrameSet"
  } ],
  SpriteFrameSet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
    "use strict";
    var SpriteFrameSet = cc.Class({
      name: "SpriteFrameSet",
      properties: {
        language: "",
        spriteFrame: cc.SpriteFrame
      }
    });
    module.exports = SpriteFrameSet;
    cc._RF.pop();
  }, {} ],
  bulletGroup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c6b5dm2gcBO4aDTJ3kweMLw", "bulletGroup");
    "use strict";
    var bPosition = cc.Class({
      name: "bPosition",
      properties: {
        xAxis: {
          default: "",
          tooltip: "初始x轴，相对 Player"
        },
        yAxis: {
          default: "",
          tooltip: "初始y轴，相对 Player"
        }
      }
    });
    var bulletInfinite = cc.Class({
      name: "bulletInfinite",
      properties: {
        name: "",
        freqTime: 0,
        initPollCount: 0,
        prefab: cc.Prefab,
        position: {
          default: [],
          type: bPosition,
          tooltip: "每次多少排子弹"
        }
      }
    });
    var bulletFinite = cc.Class({
      name: "bulletFinite",
      extends: bulletInfinite,
      properties: {
        finiteTime: 0,
        orginName: ""
      }
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        bulletInfinite: {
          default: null,
          type: bulletInfinite,
          tooltip: "无限时长子弹组"
        },
        bulletFinite: {
          default: [],
          type: bulletFinite,
          tooltip: "有限时长子弹组"
        },
        player: cc.Node
      },
      onLoad: function onLoad() {
        this.eState = D.commonInfo.gameState.none;
        D.common.initObjPool(this, this.bulletInfinite);
        D.common.batchInitObjPool(this, this.bulletFinite);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  common: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "381cfiH+jtH+IyTA1pfsFyL", "common");
    "use strict";
    var gameState = cc.Enum({
      none: 0,
      start: 1,
      stop: 2
    });
    var common = cc.Class({
      extends: cc.Component,
      properties: {},
      statics: {
        gameState: gameState
      },
      onLoad: function onLoad() {
        D.commonInfo = common;
        D.common = this;
      },
      start: function start() {},
      batchInitObjPool: function batchInitObjPool(thisO, objArray) {
        for (var i = 0; i < objArray.length; i++) {
          var objinfo = objArray[i];
          this.initObjPool(thisO, objinfo);
        }
      },
      initObjPool: function initObjPool(thisO, objInfo) {
        var name = objInfo.name;
        var poolName = name + "Pool";
        thisO[poolName] = new cc.NodePool();
        var initPollCount = objInfo.initPollCount;
        for (var i = 0; i < initPollCount; i++) {
          var nodeO = cc.instantiate(objInfo.prefab);
          thisO[poolName].put(nodeO);
        }
      },
      genNewNode: function genNewNode(pool, prefab, nodeParent) {
        var newNode = null;
        newNode = pool.size() > 0 ? pool.get() : cc.instantiate(prefab);
        nodeParent.addChild(newNode);
        return newNode;
      }
    });
    cc._RF.pop();
  }, {} ],
  control: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4a27+g379LP5Pxdic+/uU7", "control");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        canvas: cc.Node,
        player: {
          default: null,
          type: cc.Node
        },
        touchLocationDisplay: {
          default: null,
          type: cc.Label
        },
        isMoving: false,
        enableGravity: false,
        moveToPos: cc.Vec2.ZERO,
        moveSpeed: {
          default: 200,
          type: cc.Integer
        },
        _time: 0,
        _range: cc.p(0, 0),
        _acc: cc.p(0, 0)
      },
      onLoad: function onLoad() {
        var screenSize = cc.view.getVisibleSize();
        this._range.x = screenSize.width / 2 - this.player.width / 2;
        this._range.y = screenSize.height / 2 - this.player.height / 2;
        this.isMoving = true;
        if (this.enableGravity) {
          cc.systemEvent.setAccelerometerEnabled(true);
          cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
        } else {
          var self = this;
          self.canvas.on(cc.Node.EventType.TOUCH_START, function(event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            self.moveToPos = self.player.parent.convertToNodeSpaceAR(touchLoc);
            self.touchLocationDisplay.string = "(" + Math.floor(touchLoc.x) + ", " + Math.floor(touchLoc.y) + ")(" + Math.floor(self.moveToPos.x) + ", " + Math.floor(self.moveToPos.y) + ")";
          }, self.node);
          self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = self.player.parent.convertToNodeSpaceAR(touchLoc);
            self.touchLocationDisplay.string = "(" + Math.floor(touchLoc.x) + ", " + Math.floor(touchLoc.y) + ")(" + Math.floor(self.moveToPos.x) + ", " + Math.floor(self.moveToPos.y) + ")";
          }, self.node);
          self.canvas.on(cc.Node.EventType.TOUCH_END, function(event) {
            self.isMoving = false;
          }, self.node);
        }
      },
      start: function start() {},
      movePlayer: function movePlayer(dt) {
        if (!this.isMoving) return;
        var oldPos = this.player.position;
        var newPos = cc.p();
        var direction = cc.p();
        if (this.enableGravity) {
          this._time += 5;
          newPos.x = oldPos.x + this._acc.x * dt * (this.moveSpeed + this._time);
          newPos.y = oldPos.y + this._acc.y * dt * (this.moveSpeed + this._time);
          var dist = cc.pSub(newPos, oldPos);
          var len = cc.pLength(dist);
          if (len < 3) return;
          direction = cc.pNormalize(dist);
        } else {
          var _dist = cc.pSub(this.moveToPos, oldPos);
          var _len = cc.pLength(_dist);
          if (_len < 3) return;
          direction = cc.pNormalize(_dist);
          newPos = cc.pAdd(oldPos, cc.pMult(direction, this.moveSpeed * dt));
        }
        var r = Math.atan2(direction.x, direction.y);
        var degree = 180 * r / Math.PI;
        this.player.rotation = degree;
        var range = this._range;
        newPos.x = cc.clampf(newPos.x, -range.x, range.x);
        newPos.y = cc.clampf(newPos.y, -range.y, range.y);
        (newPos.x <= -range.x || newPos.x >= range.x || newPos.y <= -range.y || newPos.y >= range.y) && (this._time = 0);
        this.player.setPosition(newPos);
      },
      onDeviceMotionEvent: function onDeviceMotionEvent(event) {
        this._acc.x = event.acc.x;
        this._acc.y = event.acc.y;
      },
      update: function update(dt) {
        this.movePlayer(dt);
      },
      onDestroy: function onDestroy() {
        this.enableGravity && cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  en: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4ddc8a/vVFwY6n9VQQvxiE", "en");
    "use strict";
    window.i18n || (window.i18n = {});
    window.i18n.languages || (window.i18n.languages = {});
    window.i18n.languages["en"] = {};
    cc._RF.pop();
  }, {} ],
  global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2acbeFK/3FIM6/79MJsQG7X", "global");
    "use strict";
    window.D = {
      common: null,
      commonInfo: null
    };
    cc._RF.pop();
  }, {} ],
  main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb5c1p9H9JP7bT+ApPoK9v5", "main");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainClass = function(_super) {
      __extends(MainClass, _super);
      function MainClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
      }
      MainClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], MainClass.prototype, "label", void 0);
      MainClass = __decorate([ ccclass ], MainClass);
      return MainClass;
    }(cc.Component);
    exports.default = MainClass;
    cc._RF.pop();
  }, {} ],
  menu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbbefM2udNPX7Kb4wj50Spl", "menu");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {
        cc.director.preloadScene("game", function() {
          cc.log("Game scene preloaded");
        });
      };
      NewClass.prototype.gravity = function() {
        cc.director.loadScene("game");
      };
      NewClass.prototype.joystick = function() {
        cc.director.loadScene("joystick");
      };
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c13fc1C+ahOU7xSEeNzlCVF", "player");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlayerClass = function(_super) {
      __extends(PlayerClass, _super);
      function PlayerClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
      }
      PlayerClass.prototype.onLoad = function() {
        cc.director.getCollisionManager().enabled = true;
      };
      PlayerClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], PlayerClass.prototype, "label", void 0);
      PlayerClass = __decorate([ ccclass ], PlayerClass);
      return PlayerClass;
    }(cc.Component);
    exports.default = PlayerClass;
    cc._RF.pop();
  }, {} ],
  "polyglot.min": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
        return t(e);
      }) : "object" == ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.Polyglot = t(e);
    })(void 0, function(e) {
      function t(e) {
        e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
        this.allowMissing = !!e.allowMissing, this.warn = e.warn || c;
      }
      function s(e) {
        var t, n, r, i = {};
        for (t in e) if (e.hasOwnProperty(t)) {
          n = e[t];
          for (r in n) i[n[r]] = t;
        }
        return i;
      }
      function o(e) {
        var t = /^\s+|\s+$/g;
        return e.replace(t, "");
      }
      function u(e, t, r) {
        var i, s, u;
        return null != r && e ? (s = e.split(n), u = s[f(t, r)] || s[0], i = o(u)) : i = e, 
        i;
      }
      function a(e) {
        var t = s(i);
        return t[e] || t.en;
      }
      function f(e, t) {
        return r[a(e)](t);
      }
      function l(e, t) {
        for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
        return e;
      }
      function c(t) {
        e.console && e.console.warn && e.console.warn("WARNING: " + t);
      }
      function h(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t;
      }
      t.VERSION = "0.4.3", t.prototype.locale = function(e) {
        return e && (this.currentLocale = e), this.currentLocale;
      }, t.prototype.extend = function(e, t) {
        var n;
        for (var r in e) e.hasOwnProperty(r) && (n = e[r], t && (r = t + "." + r), "object" == ("undefined" === typeof n ? "undefined" : _typeof(n)) ? this.extend(n, r) : this.phrases[r] = n);
      }, t.prototype.clear = function() {
        this.phrases = {};
      }, t.prototype.replace = function(e) {
        this.clear(), this.extend(e);
      }, t.prototype.t = function(e, t) {
        var n, r;
        return t = null == t ? {} : t, "number" == typeof t && (t = {
          smart_count: t
        }), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
        r = e), "string" == typeof n && (t = h(t), r = u(n, this.currentLocale, t.smart_count), 
        r = l(r, t)), r;
      }, t.prototype.has = function(e) {
        return e in this.phrases;
      };
      var n = "||||", r = {
        chinese: function chinese(e) {
          return 0;
        },
        german: function german(e) {
          return 1 !== e ? 1 : 0;
        },
        french: function french(e) {
          return e > 1 ? 1 : 0;
        },
        russian: function russian(e) {
          return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        czech: function czech(e) {
          return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
        },
        polish: function polish(e) {
          return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        icelandic: function icelandic(e) {
          return e % 10 !== 1 || e % 100 === 11 ? 1 : 0;
        }
      }, i = {
        chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
        german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
        french: [ "fr", "tl", "pt-br" ],
        russian: [ "hr", "ru" ],
        czech: [ "cs" ],
        polish: [ "pl" ],
        icelandic: [ "is" ]
      };
      return t;
    });
    cc._RF.pop();
  }, {} ],
  setting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61ee5T8IIVORqDemqwaecMU", "setting");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        canvas: {
          type: cc.Node,
          default: null
        }
      },
      start: function start() {},
      setScreen: function setScreen() {
        cc.screen.fullScreen() ? this.exitFullScreen() : this.requestFullScreen();
      },
      requestFullScreen: function requestFullScreen() {
        cc.screen.requestFullScreen(this.canvas.getComponent("canvas"));
      },
      exitFullScreen: function exitFullScreen() {
        cc.screen.exitFullScreen();
      },
      backStart: function backStart() {
        cc.director.loadScene("start", function() {
          console.log("Start menu is loaded.");
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  start: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "69862RCK4lIOakuWgV4sGm0", "start");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.onLoad = function() {
        cc.view.enableAutoFullScreen(true);
      };
      NewClass.prototype.onFullScreenChange = function() {
        console.log("Request Full Screen success!");
      };
      NewClass.prototype.startGame = function() {
        cc.director.loadScene("menu", function() {
          console.log("Menu is loaded.");
        });
      };
      NewClass.prototype.settingMenu = function() {
        cc.director.loadScene("setting", function() {
          console.log("Setting menu is loaded.");
        });
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  zh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec922g5eNBOwqDl8nSECXnf", "zh");
    "use strict";
    window.i18n || (window.i18n = {});
    window.i18n.languages || (window.i18n.languages = {});
    window.i18n.languages["zh"] = {
      label_text: {
        hello: "你好！",
        bye: "再见！"
      }
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "bulletGroup", "common", "control", "Joystick", "JoystickBG", "JoystickCommon", "global", "main", "menu", "player", "setting", "start", "en", "zh" ]);