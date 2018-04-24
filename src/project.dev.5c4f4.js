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
  CameraControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27de7cZsrVH5r/Dk0M8SrVL", "CameraControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        target: {
          default: null,
          type: cc.Node
        },
        camera: cc.Camera,
        anim: cc.Animation,
        jumpZoom: false,
        centerAtStart: false,
        smoothFollow: false,
        followX: {
          default: 0,
          visible: function visible() {
            return this.smoothFollow;
          }
        },
        followY: {
          default: 0,
          visible: function visible() {
            return this.smoothFollow;
          }
        },
        minFollowDist: {
          default: 0,
          visible: function visible() {
            return this.smoothFollow;
          }
        },
        followRatio: {
          default: 0,
          visible: function visible() {
            return this.smoothFollow;
          }
        },
        overview: false,
        overviewTargets: {
          default: [],
          type: [ cc.Node ],
          visible: function visible() {
            return this.overview;
          }
        },
        overviewMargin: {
          default: 0,
          visible: function visible() {
            return this.overview;
          }
        },
        speedZoom: false,
        zoomInSpeed: {
          default: 0,
          visible: function visible() {
            return this.speedZoom;
          }
        },
        zoomOutSpeed: {
          default: 0,
          visible: function visible() {
            return this.speedZoom;
          }
        },
        canShake: false,
        shakeDuration: {
          default: 0,
          visible: function visible() {
            return this.canShake;
          }
        },
        pointerPan: false,
        pointerXMult: {
          default: 0,
          visible: function visible() {
            return this.pointerPan;
          }
        },
        pointerYMult: {
          default: 0,
          visible: function visible() {
            return this.pointerPan;
          }
        },
        useBoundaries: false,
        topBound: {
          default: 0,
          visible: function visible() {
            return this.useBoundaries;
          }
        },
        bottomBound: {
          default: 0,
          visible: function visible() {
            return this.useBoundaries;
          }
        },
        leftBound: {
          default: 0,
          visible: function visible() {
            return this.useBoundaries;
          }
        },
        rightBound: {
          default: 0,
          visible: function visible() {
            return this.useBoundaries;
          }
        }
      },
      onLoad: function onLoad() {
        this.startFollow = false;
        var canvas = cc.find("Canvas").getComponent(cc.Canvas);
        this.visibleSize = cc.view.getVisibleSize();
        this.initZoomRatio = this.camera.zoomRatio;
        this.centerAtStart && (this.node.position = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO));
        this.previousPos = this.node.position;
        if (this.pointerPan) {
          this.overview = false;
          this.speedZoom = false;
          canvas.node.on("mousemove", this.onMouseMove, this);
          canvas.node.on("touchmove", this.onTouchMove, this);
          this.pointerPos = null;
        }
        if (this.overview) {
          this.jumpZoom = false;
          this.speedZoom = false;
        }
        this.speedZoom && (this.jumpZoom = false);
      },
      onEnable: function onEnable() {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
      },
      onDisable: function onDisable() {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
      },
      lateUpdate: function lateUpdate(dt) {
        var targetPos = void 0;
        targetPos = this.overview ? this.target.parent.convertToWorldSpaceAR(this.getOverviewTargetsMidpoint()) : this.target.parent.convertToWorldSpaceAR(this.target.position);
        if (this.pointerPan && this.pointerPos) {
          var xDelta = this.pointerPos.x / (this.visibleSize.width / 2) - 1;
          var yDelta = this.pointerPos.y / (this.visibleSize.height / 2) - 1;
          xDelta *= this.pointerXMult;
          yDelta *= this.pointerYMult;
          targetPos = cc.pAdd(targetPos, cc.p(xDelta, yDelta));
        }
        if (this.smoothFollow) {
          (Math.abs(targetPos.x - this.node.x) >= this.followX || Math.abs(targetPos.y - this.node.y) >= this.followY) && (this.startFollow = true);
          if (this.startFollow) {
            this.node.position = this.node.position.lerp(targetPos, this.followRatio);
            cc.pDistance(targetPos, this.node.position) <= this.minFollowDist && (this.startFollow = false);
          }
        } else this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
        if (this.speedZoom) {
          var curSpeed = Math.abs(this.previousPos.x - targetPos.x) / dt;
          var ratio = 0;
          if (curSpeed > this.zoomOutSpeed) {
            ratio = 1 - (curSpeed - this.zoomOutSpeed) / (this.zoomInSpeed - this.zoomOutSpeed);
            this.camera.zoomRatio = cc.lerp(this.camera.zoomRatio, ratio, .02);
          } else this.camera.zoomRatio = cc.lerp(this.camera.zoomRatio, this.initZoomRatio, .02);
        }
        this.previousPos = targetPos;
        if (this.jumpZoom) {
          var _ratio = targetPos.y / cc.winSize.height;
          this.camera.zoomRatio = 1 + .35 * (.6 - _ratio);
        }
        if (this.useBoundaries) {
          var width = this.visibleSize.width / 2 / this.camera.zoomRatio;
          var height = this.visibleSize.height / 2 / this.camera.zoomRatio;
          var minX = this.node.x - width;
          var maxX = this.node.x + width;
          var minY = this.node.y - height;
          var maxY = this.node.y + height;
          minX < this.leftBound && (this.node.x = this.leftBound + width);
          minY < this.bottomBound && (this.node.y = this.bottomBound + height);
          maxX > this.rightBound && (this.node.x = this.rightBound - width);
          maxY > this.topBound && (this.node.y = this.topBound - height);
        }
      },
      getOverviewTargetsMidpoint: function getOverviewTargetsMidpoint() {
        var midPoint = cc.p(0, 0);
        var minX = 99999, minY = 99999, maxX = -99999, maxY = -99999;
        for (var i = 0; i < this.overviewTargets.length; ++i) {
          var target = this.overviewTargets[i];
          maxX = target.x > maxX ? target.x : maxX;
          minX = target.x < minX ? target.x : minX;
          maxY = target.y > maxY ? target.y : maxY;
          minY = target.y < minY ? target.y : minY;
        }
        maxX += this.overviewMargin;
        minX -= this.overviewMargin;
        maxY += this.overviewMargin;
        minY -= this.overviewMargin;
        var distX = Math.abs(maxX - minX);
        var distY = Math.abs(maxY - minY);
        midPoint = cc.p(minX + distX / 2, minY + distY / 2);
        var ratio = Math.max(distX / this.visibleSize.width, distY / this.visibleSize.height);
        this.camera.zoomRatio = 1 / ratio;
        return midPoint;
      },
      shakeCamera: function shakeCamera() {
        if (!this.canShake) return;
        this.anim.play("shake");
        this.scheduleOnce(this.stopShake.bind(this), this.shakeDuration);
      },
      stopShake: function stopShake() {
        this.anim.stop();
        this.camera.node.position = cc.p(0, 0);
      },
      onMouseMove: function onMouseMove(event) {
        this.pointerPos = event.getLocation();
      },
      onTouchMove: function onTouchMove(event) {
        this.pointerPos = event.getLocation();
      }
    });
    cc._RF.pop();
  }, {} ],
  GameMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "291e4qavSxCuqA3hP7wbLWu", "GameMng");
    "use strict";
    var _CameraControl = require("CameraControl");
    var _CameraControl2 = _interopRequireDefault(_CameraControl);
    var _PlayerControl = require("PlayerControl");
    var _PlayerControl2 = _interopRequireDefault(_PlayerControl);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        camera: _CameraControl2.default
      },
      start: function start() {},
      init: function init() {}
    });
    cc._RF.pop();
  }, {
    CameraControl: "CameraControl",
    PlayerControl: "PlayerControl"
  } ],
  GameOverUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d3d5UevHVMA5QOU5ZD2NF1", "GameOverUI");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      backToStartMenu: function backToStartMenu() {
        cc.director.loadScene("StartMenu");
      }
    });
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c246kvfxpPSZxunu1w8518", "Game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        player: cc.Node,
        map: cc.Node,
        inGameUI: cc.Node
      },
      onLoad: function onLoad() {
        this.player = this.player.getCOmponent("PlayerControl");
        this.player.init(this);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Helpers: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb817NrY35LHK6kURY6HMba", "Helpers");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      ColorList: cc.Enum({
        blue: "#0078E7",
        success: "#21ba45",
        warning: "#f2711c",
        danger: "#db2828",
        info: "#42B8DD",
        purple: "#8e71c1",
        black: "#000000",
        dark: "#303133",
        light: "#eeeeee"
      }),
      getRandom: function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      getRandomColor: function getRandomColor() {
        var RoleColor = [ "blue", "success", "warning", "danger", "info", "purple", "black" ];
        return this.ColorList[RoleColor[this.getRandom(0, RoleColor.length - 1)]];
      }
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  InGameUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac1b0tvti5F4aPaSKmlTJVi", "InGameUI");
    "use strict";
    var PlayerControl = require("PlayerControl");
    cc.Class({
      extends: cc.Component,
      properties: {
        player: {
          default: null,
          type: PlayerControl
        },
        openPanelFlag: true,
        FullScreenIcon: cc.SpriteFrame,
        exitFullScreenIcon: cc.SpriteFrame
      },
      onLoad: function onLoad() {
        var _this = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event) {
          switch (event.keyCode) {
           case cc.KEY.back:
            _this.back();
          }
        });
        this.anim = this.node.getChildByName("panel").getComponent(cc.Animation);
        this.openPanelFlag = true;
        this.HPBar = this.node.getChildByName("HPBar").getComponent(cc.ProgressBar);
        this.bar = this.node.getChildByName("bar");
        this.shootBtn = this.node.getChildByName("shoot");
        this.shootTouchEvent();
        this.toggleFullScreenBtn = this.node.getChildByName("FullScreen");
      },
      shootTouchEvent: function shootTouchEvent() {
        var self = this;
        self.shootBtn.on(cc.Node.EventType.TOUCH_START, function(event) {
          self.player._shootFlag = true;
        }, self.player);
        self.shootBtn.on(cc.Node.EventType.TOUCH_MOVE, function(event) {}, self.player);
        self.shootBtn.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.player._shootFlag = false;
        }, self.player);
        self.shootBtn.on(cc.Node.EventType.TOUCH_END, function(event) {
          self.player._shootFlag = false;
        }, self.player);
      },
      start: function start() {},
      backToModeMenu: function backToModeMenu() {
        confirm("Are you sure?") && cc.director.loadScene("ModeMenu");
      },
      toggleFullScreen: function toggleFullScreen() {
        if (cc.screen.fullScreen()) {
          cc.screen.exitFullScreen();
          this.toggleFullScreenBtn.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.FullScreenIcon;
        } else {
          cc.screen.requestFullScreen();
          this.toggleFullScreenBtn.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.exitFullScreenIcon;
        }
      },
      togglePanel: function togglePanel() {
        if (this.openPanelFlag) {
          this.anim.play("ClosePanel");
          this.openPanelFlag = false;
        } else {
          this.anim.play("OpenPanel");
          this.openPanelFlag = true;
        }
      },
      update: function update(dt) {
        this.HPBar.progress = this.player.HP / this.HPBar.totalLength;
      }
    });
    cc._RF.pop();
  }, {
    PlayerControl: "PlayerControl"
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
    var _JoystickCommon = require("JoystickCommon");
    var _JoystickCommon2 = _interopRequireDefault(_JoystickCommon);
    var _PlayerControl = require("PlayerControl");
    var _PlayerControl2 = _interopRequireDefault(_PlayerControl);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        dot: {
          default: null,
          type: cc.Node,
          displayName: "摇杆操纵点"
        },
        ring: {
          default: null,
          type: cc.Node,
          displayName: "摇杆背景节点"
        },
        player: {
          default: null,
          type: _PlayerControl2.default,
          displayName: "操控的角色"
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
          default: _JoystickCommon2.default.TouchType.DEFAULT,
          type: _JoystickCommon2.default.TouchType,
          displayName: "触摸类型"
        },
        directionType: {
          default: _JoystickCommon2.default.DirectionType.ALL,
          type: _JoystickCommon2.default.DirectionType,
          displayName: "方向类型"
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
        },
        _angle: {
          default: 90,
          displayName: "当前触摸的角度"
        }
      },
      onLoad: function onLoad() {
        this._radius = this.ring.width / 2;
        this._createStickSprite();
        this._initTouchEvent();
        this.touchType == _JoystickCommon2.default.TouchType.FOLLOW && (this.node.opacity = 0);
      },
      _createStickSprite: function _createStickSprite() {
        this.ring.setPosition(this.stickX, this.stickY);
        this.dot.setPosition(this.stickX, this.stickY);
      },
      _initTouchEvent: function _initTouchEvent() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchEndEvent, self);
      },
      _touchStartEvent: function _touchStartEvent(event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        if (this.touchType == _JoystickCommon2.default.TouchType.DEFAULT) {
          this._stickPos = this.ring.getPosition();
          var distance = cc.pDistance(touchPos, cc.p(0, 0));
          var posX = this.ring.getPosition().x + touchPos.x;
          var posY = this.ring.getPosition().y + touchPos.y;
          if (this._radius > distance) {
            this.dot.setPosition(cc.p(posX, posY));
            return true;
          }
          return false;
        }
        if (this.touchType == _JoystickCommon2.default.TouchType.FOLLOW) {
          this._stickPos = touchPos;
          this.node.opacity = 255;
          this._touchLocation = event.getLocation();
          this.ring.setPosition(touchPos);
          this.dot.setPosition(touchPos);
        }
      },
      _touchMoveEvent: function _touchMoveEvent(event) {
        this.player.isStop = false;
        if (this.touchType == _JoystickCommon2.default.TouchType.FOLLOW && this._touchLocation.x == event.getLocation().x && this._touchLocation.y == event.getLocation().y) return false;
        var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        var distance = cc.pDistance(touchPos, cc.p(0, 0));
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        if (this._radius > distance) this.dot.setPosition(cc.p(posX, posY)); else {
          var x = this._stickPos.x + Math.cos(cc.pToAngle(cc.pSub(cc.p(posX, posY), this.ring.getPosition()))) * this._radius;
          var y = this._stickPos.y + Math.sin(cc.pToAngle(cc.pSub(cc.p(posX, posY), this.ring.getPosition()))) * this._radius;
          this.dot.setPosition(cc.p(x, y));
        }
        this._angle = cc.radiansToDegrees(cc.pToAngle(cc.pSub(cc.p(posX, posY), this.ring.getPosition())));
        this.player._moveAngle = this._angle;
        this._setSpeed(cc.p(posX, posY));
        this.player.getComponent(cc.RigidBody).linearDamping = 0;
        this.player.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.player.moveDir.x * this.player.moveSpeed, this.player.moveDir.y * this.player.moveSpeed);
      },
      _touchEndEvent: function _touchEndEvent() {
        this.player.isStop = true;
        this.player.speedUpFlag = false;
        this.dot.setPosition(this.ring.getPosition());
        this.touchType == _JoystickCommon2.default.TouchType.FOLLOW && (this.node.opacity = 0);
        this.player.getComponent(cc.RigidBody).linearDamping = .5;
      },
      _setSpeed: function _setSpeed(point) {
        var distance = cc.pDistance(point, this.ring.getPosition());
        distance < this._radius ? this.player.moveSpeed = this.player.normalSpeed : this.player.speedUpFlag = true;
      },
      update: function update() {
        var rotation = this.player.getComponent(cc.RigidBody).getWorldRotation();
        var radian = cc.degreesToRadians(90 - rotation);
        var dir = cc.pForAngle(radian);
        this.player.moveDir = dir;
      }
    });
    cc._RF.pop();
  }, {
    JoystickCommon: "JoystickCommon",
    PlayerControl: "PlayerControl"
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
  Launch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e86f7h7/ThBVJoTB44r2G7D", "Launch");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        cc.view.enableAutoFullScreen(true);
        cc.director.setDisplayStats(false);
      },
      start: function start() {
        this.displayEgg();
        cc.director.preloadScene("Story", function() {
          cc.log("Story scene preloaded");
        });
        cc.director.preloadScene("Start", function() {
          cc.log("Start scene preloaded");
        });
      },
      displayEgg: function displayEgg() {
        console.log("%c Paper Star - @YunYouJun ", "background:#000;color:#fff;padding:2px;border-radius:2px");
      },
      loadStoryboard: function loadStoryboard() {
        cc.director.loadScene("Story");
      },
      loadStartScene: function loadStartScene() {
        cc.director.loadScene("Start");
      }
    });
    cc._RF.pop();
  }, {} ],
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
  MapControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "616b0xKWLtFY5rUTgK/fQ7K", "MapControl");
    "use strict";
    var Helpers = require("Helpers");
    cc.Class({
      extends: cc.Component,
      properties: {
        map: {
          default: null,
          type: cc.Node
        },
        planet: {
          default: null,
          type: cc.Prefab
        },
        planetNum: 10
      },
      onLoad: function onLoad() {
        this.generatePlanet(this.planetNum);
        this.generateAPlanet(cc.p(300, 0));
      },
      start: function start() {},
      generatePlanet: function generatePlanet(num) {
        var PlanetArray = [];
        for (var i = 0; i < num; i++) {
          var Planet = cc.instantiate(this.planet);
          var PlanetColor = Helpers.getRandomColor();
          var PlanetPosition = cc.p(cc.randomMinus1To1() * (this.map.width - 500) / 2, cc.randomMinus1To1() * (this.map.height - 500) / 2);
          Planet.scale = 1 * Math.random() + .3;
          var PlanetRect = cc.rect(0, 0, Planet.scale * Planet.width, Planet.scale * Planet.height);
          PlanetRect.center = PlanetPosition;
          for (var j = 0; j < i; j++) while (PlanetArray[j].intersects(PlanetRect)) PlanetPosition = cc.p(cc.randomMinus1To1() * (this.map.width - 500) / 2, cc.randomMinus1To1() * (this.map.height - 500) / 2);
          PlanetArray.push(PlanetRect);
          Planet.getComponent(cc.RigidBody).angularVelocity = 200 * cc.randomMinus1To1();
          Planet.parent = this.map;
          Planet.tag = i;
          Planet.color = cc.hexToColor(PlanetColor);
          Planet.rotation = Helpers.getRandom(0, 360);
          Planet.setPosition(PlanetPosition);
        }
      },
      generateAPlanet: function generateAPlanet(position) {
        var Planet = cc.instantiate(this.planet);
        var PlanetColor = Helpers.getRandomColor();
        Planet.getComponent(cc.RigidBody).angularVelocity = 200 * cc.randomMinus1To1();
        Planet.scale = 1.5 * Math.random();
        Planet.parent = this.map;
        Planet.color = cc.hexToColor(PlanetColor);
        Planet.rotation = Helpers.getRandom(0, 360);
        Planet.setPosition(position);
      }
    });
    cc._RF.pop();
  }, {
    Helpers: "Helpers"
  } ],
  Menu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5efdeZeEn9OwIEfWcnmZyG7", "Menu");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        cc.director.setClearColor(cc.Color.GRAY);
      },
      start: function start() {
        cc.director.preloadScene("game", function() {
          cc.log("Game scene preloaded");
        });
      },
      backToStartMenu: function backToStartMenu() {
        this.loadStartMenu();
      },
      loadStartMenu: function loadStartMenu() {
        cc.director.loadScene("StartMenu", function() {
          console.log("StartMenu is loaded.");
        });
      },
      loadModeMenu: function loadModeMenu() {
        cc.director.loadScene("ModeMenu", function() {
          console.log("ModeMenu is loaded.");
        });
      },
      loadSetMenu: function loadSetMenu() {
        cc.director.loadScene("SetMenu", function() {
          console.log("SetMenu is loaded.");
        });
      },
      loadAchieveSystem: function loadAchieveSystem() {
        cc.director.loadScene("AchieveSystem", function() {
          console.log("AchieveSystem is loaded.");
        });
      },
      loadGravityMode: function loadGravityMode() {
        cc.director.loadScene("GravityMode");
      },
      loadFreeMode: function loadFreeMode() {
        cc.director.loadScene("FreeMode");
      }
    });
    cc._RF.pop();
  }, {} ],
  PlayerControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c473ibbBdDGbRMF9G7g8Tv", "PlayerControl");
    "use strict";
    var Helpers = require("Helpers");
    var CameraControl = require("CameraControl");
    var bulletManager = require("bulletManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        camera: CameraControl,
        map: {
          default: null,
          type: cc.Node,
          displayName: "所在地图"
        },
        bulletManager: {
          default: null,
          type: bulletManager
        },
        HP: 100,
        bulletCollisionTime: {
          default: 2,
          displayName: "子弹可碰撞次数"
        },
        curExp: {
          default: 0,
          displayName: "当前经验值"
        },
        curLv: {
          default: 0,
          displayName: "当前等级"
        },
        RoleColor: {
          default: cc.Color.BLACK,
          displayName: "玩家颜色"
        },
        isStop: true,
        moveDir: {
          default: cc.v2(0, 1),
          displayName: "移动方向"
        },
        _moveAngle: {
          default: 90,
          displayName: "移动角度"
        },
        speedUpFlag: {
          default: false,
          displayName: "开启加速"
        },
        moveSpeed: {
          default: 0,
          displayName: "移动速度"
        },
        normalSpeed: {
          default: 100,
          displayName: "正常初始速度"
        },
        accelSpeed: {
          default: 10,
          displayName: "加速度"
        },
        maxSpeed: {
          default: 300,
          displayName: "最大速度"
        },
        _delayFlag: false,
        _shootFlag: false
      },
      onLoad: function onLoad() {
        this.initPlayer();
        this.node.setPosition(cc.p(0, 0));
        cc.director.Player = this;
        cc.director.setClearColor(cc.hexToColor(Helpers.ColorList.dark));
        this.onControl();
      },
      init: function init(game) {
        this.game = game;
      },
      initPlayer: function initPlayer() {
        this.RoleColor = Helpers.getRandomColor();
        this.node.color = cc.hexToColor(this.RoleColor);
        this.emitter = this.node.getChildByName("emitter");
      },
      onControl: function onControl() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.KEY.space:
          this._shootFlag = true;
          break;

         case cc.KEY.up:
          this.moveUp();
          break;

         case cc.KEY.left:
          this.moveLeft();
          break;

         case cc.KEY.right:
          this.moveRight();
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.KEY.space:
          this._shootFlag = false;
          break;

         case cc.KEY.up:
         case cc.KEY.w:
          this.isStop = true;
          this.speedUpFlag = false;
          this.getComponent(cc.RigidBody).linearDamping = .5;
          break;

         case cc.KEY.left:
         case cc.KEY.a:
          this.moveLeftFlag = false;
          break;

         case cc.KEY.right:
         case cc.KEY.d:
          this.moveRightFlag = false;
        }
      },
      moveUp: function moveUp() {
        this.isStop = false;
        this.speedUpFlag = true;
        this.accelSpeed = Math.abs(this.accelSpeed);
        this.getComponent(cc.RigidBody).linearDamping = 0;
      },
      moveLeft: function moveLeft() {
        this.moveLeftFlag = true;
      },
      moveRight: function moveRight() {
        this.moveRightFlag = true;
      },
      shoot: function shoot() {
        if (this._shootFlag && !this._delayFlag) {
          var rotation = this.getComponent(cc.RigidBody).getWorldRotation();
          var radian = cc.degreesToRadians(90 - rotation);
          var dir = cc.pForAngle(radian);
          this.bulletManager.createBullet(this.emitter.getPosition(), dir, this.node.color);
          this._delayFlag = true;
          this.scheduleOnce(function() {
            this._delayFlag = false;
          }, this.bulletManager.delay);
        }
      },
      roleRotate: function roleRotate() {
        this.moveLeftFlag && (this._moveAngle += 2);
        this.moveRightFlag && (this._moveAngle -= 2);
        var degree = 90 - this._moveAngle;
        this.node.rotation = degree;
      },
      speedUp: function speedUp() {
        this.speedUpFlag && this.accelSpeed > 0 && this.moveSpeed < this.maxSpeed && (this.moveSpeed += this.accelSpeed);
      },
      dead: function dead() {},
      getExp: function getExp(enemyLv) {
        if (0 == enemyLv) return 50;
        return 200 ^ enemyLv - 1;
      },
      cal: function cal() {
        var nextExp = 200 ^ this.curLv;
        console.log("经验：", nextExp, this.curExp);
        if (this.curExp >= nextExp) {
          this.curExp = this.curExp - nextExp;
          return true;
        }
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {},
      onEndContact: function onEndContact(contact, selfCollider, otherCollider) {
        switch (otherCollider.node.name) {
         case "planet":
          this.HP -= .1;
        }
      },
      update: function update() {
        this.speedUp();
        this.shoot();
        this.roleRotate();
        this.moveDir = cc.pForAngle(cc.degreesToRadians(this._moveAngle));
        this.isStop || (this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed * this.moveDir.x, this.moveSpeed * this.moveDir.y));
      }
    });
    cc._RF.pop();
  }, {
    CameraControl: "CameraControl",
    Helpers: "Helpers",
    bulletManager: "bulletManager"
  } ],
  SetCommon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61e1e3r1JlIg4jzBa0ZH7lT", "SetCommon");
    "use strict";
    var _JoystickCommon = require("JoystickCommon");
    var _JoystickCommon2 = _interopRequireDefault(_JoystickCommon);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var setting = {
      touchType: _JoystickCommon2.default.TouchType.FOLLOW
    };
    cc._RF.pop();
  }, {
    JoystickCommon: "JoystickCommon"
  } ],
  SetMenu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61ee5T8IIVORqDemqwaecMU", "SetMenu");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        fullScreenIcon: cc.SpriteFrame,
        exitFullScreenIcon: cc.SpriteFrame
      },
      onLoad: function onLoad() {
        this.toggleFullScreenIcon = cc.find("Canvas/menu/ScrollMenu/view/content/FullScreenConfig/item/icon").getComponent(cc.Sprite);
        this.FullScreenToggle = cc.find("Canvas/menu/ScrollMenu/view/content/FullScreenConfig/FullScreenToggle").getComponent(cc.Toggle);
      },
      start: function start() {
        if (cc.screen.fullScreen()) {
          this.FullScreenToggle.isChecked = true;
          this.toggleFullScreenIcon.spriteFrame = this.exitFullScreenIcon;
        } else {
          this.FullScreenToggle.isChecked = false;
          this.toggleFullScreenIcon.spriteFrame = this.fullScreenIcon;
        }
      },
      backToStartMenu: function backToStartMenu() {
        this.loadStartMenu();
      },
      loadStartMenu: function loadStartMenu() {
        cc.director.loadScene("StartMenu", function() {
          console.log("StartMenu is loaded.");
        });
      },
      toggleFullScreen: function toggleFullScreen() {
        if (cc.screen.fullScreen()) {
          cc.screen.exitFullScreen();
          this.FullScreenToggle.isChecked = false;
          this.toggleFullScreenIcon.spriteFrame = this.fullScreenIcon;
        } else {
          cc.screen.requestFullScreen();
          this.FullScreenToggle.isChecked = true;
          this.toggleFullScreenIcon.spriteFrame = this.exitFullScreenIcon;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
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
  StartMenuUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5283cOdPEVAK5O4oI5vbxdm", "StartMenuUI");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        cc.view.enableAutoFullScreen(true);
        cc.director.setDisplayStats(false);
      },
      start: function start() {
        this.ctx = this.getComponent(cc.Graphics);
        var canvas = cc.director.getScene().getChildByName("Canvas");
        this.center = cc.p(200, canvas.height / 2);
        this.init();
        this.drawOrbitPlanet();
        this.drawStarLine();
      },
      init: function init() {
        this.generateRandomOrbitPlanet(8);
        this.StarLineColor = cc.color(0, 0, 0, 50 + 150 * Math.random());
      },
      generateRandomOrbitPlanet: function generateRandomOrbitPlanet(num) {
        this.orbits = [];
        this.planets = [];
        for (var i = 0; i < num; i++) {
          var radius = 100 + 20 * Math.random() + 80 * i;
          var strokeColor = cc.color(0, 0, 0, 50 + 100 * Math.random());
          var orbit = {
            radius: radius,
            strokeColor: strokeColor
          };
          this.orbits.push(orbit);
        }
        for (var _i = 0; _i < num; _i++) {
          var maxAngle = 10 * _i - 80;
          var minAngle = 80 - 10 * _i;
          var radian = (minAngle + Math.random() * (maxAngle - minAngle)) * (Math.PI / 180);
          var _radius = 10 + 20 * Math.random();
          var hasRing = Math.random() > .5;
          var speed = .5 * Math.random();
          var fillColor = cc.color(0, 0, 0, 200 + 55 * Math.random());
          var _strokeColor = cc.color(0, 0, 0, 50 + 150 * Math.random());
          var ringRadius = _radius + 10 + 5 * Math.random();
          var lineWidth = 6 + 4 * Math.random();
          var planet = {
            radian: radian,
            radius: _radius,
            fillColor: fillColor,
            strokeColor: _strokeColor,
            hasRing: hasRing,
            speed: speed,
            ringRadius: ringRadius,
            lineWidth: lineWidth
          };
          this.planets.push(planet);
        }
      },
      drawOrbitPlanet: function drawOrbitPlanet() {
        var ctx = this.ctx;
        for (var i = 0; i < this.orbits.length; i++) {
          ctx.lineWidth = 2;
          ctx.strokeColor = this.orbits[i].strokeColor;
          ctx.circle(this.center.x, this.center.y, this.orbits[i].radius);
          ctx.stroke();
        }
        for (var _i2 = 0; _i2 < this.planets.length; _i2++) {
          var x = Math.cos(this.planets[_i2].radian) * this.orbits[_i2].radius + this.center.x;
          var y = Math.sin(this.planets[_i2].radian) * this.orbits[_i2].radius + this.center.y;
          ctx.fillColor = this.planets[_i2].fillColor;
          ctx.circle(x, y, this.planets[_i2].radius);
          ctx.lineWidth = 3;
          ctx.strokeColor = this.planets[_i2].fillColor;
          ctx.stroke();
          if (this.planets[_i2].hasRing) {
            ctx.circle(this.planets[_i2].x, this.planets[_i2].y, this.planets[_i2].ringRadius);
            ctx.lineWidth = this.planets[_i2].lineWidth;
            ctx.strokeColor = this.planets[_i2].strokeColor;
            ctx.stroke();
          }
        }
      },
      drawStarLine: function drawStarLine() {
        var ctx = this.ctx;
        ctx.lineWidth = 3;
        var firstPlanet = cc.p(Math.cos(this.planets[0].radian) * this.orbits[0].radius + this.center.x, Math.sin(this.planets[0].radian) * this.orbits[0].radius + this.center.y);
        ctx.moveTo(firstPlanet.x, firstPlanet.y);
        ctx.strokeColor = this.StarLineColor;
        for (var i = 1; i < this.planets.length; i++) {
          var x = Math.cos(this.planets[i].radian) * this.orbits[i].radius + this.center.x;
          var y = Math.sin(this.planets[i].radian) * this.orbits[i].radius + this.center.y;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      },
      update: function update(dt) {
        for (var i = 0; i < this.planets.length; i++) this.planets[i].radian -= this.planets[i].speed * Math.PI / 180;
        this.ctx.clear();
        this.drawOrbitPlanet();
        this.drawStarLine();
      }
    });
    cc._RF.pop();
  }, {} ],
  SystemControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f55d8gG6QRIq4CE6g4110Nx", "SystemControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  WaveMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f4a81px0GhIrK+FJh+9A5E+", "WaveMng");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      init: function init(game) {
        this.game = game;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  bulletManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6415b7/Qj9EGpMoPltMn3e8", "bulletManager");
    "use strict";
    var _bullet = require("bullet");
    var _bullet2 = _interopRequireDefault(_bullet);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
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
    var bulletLine = cc.Class({
      name: "bulletLine",
      properties: {
        name: "Line",
        freqTime: 0,
        prefab: cc.Prefab,
        position: {
          default: [],
          type: bPosition,
          tooltip: "每次多少排子弹"
        },
        finiteTime: 0
      }
    });
    var bulletTwoLine = cc.Class({
      name: "bulletTwoLine",
      extends: bulletLine,
      properties: {}
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        bulletLine: {
          default: null,
          type: bulletLine,
          tooltip: "直线子弹"
        },
        delay: {
          default: .3,
          tooltip: "子弹延迟发射时间"
        }
      },
      onLoad: function onLoad() {
        var bulletPool = new cc.NodePool(_bullet2.default);
        this.bulletPool = bulletPool;
      },
      start: function start() {},
      createBullet: function createBullet(pos, dir, color) {
        var bullet = null;
        bullet = this.bulletPool.size() > 0 ? this.bulletPool.get(this) : cc.instantiate(this.bulletLine.prefab);
        bullet.parent = this.node;
        bullet.getComponent("bullet").init(pos, dir, color);
      },
      put: function put(node) {
        this.bulletPool.put(node);
      }
    });
    cc._RF.pop();
  }, {
    bullet: "bullet"
  } ],
  bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd9f4n6ZY5AWaItfDxKgjeO", "bullet");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 500,
        length: 20,
        width: {
          default: 2,
          displayName: "子弹宽度"
        },
        lifeTime: {
          default: 10,
          displayName: "存活时间"
        },
        collisionTime: {
          default: 2,
          displayName: "可碰撞次数"
        },
        damage: {
          default: 10,
          displayName: "伤害值"
        },
        sprite: cc.Sprite,
        canBreak: true
      },
      init: function init(position, dir, color) {
        this.player = this.node.parent.parent.parent.getComponent("PlayerControl");
        this.bulletManager = this.node.parent.getComponent("bulletManager");
        this.anim = this.getComponent(cc.Animation);
        this.node.height = this.length;
        this.node.width = this.width;
        this.getComponent(cc.PhysicsBoxCollider).size.height = this.length;
        this.getComponent(cc.PhysicsBoxCollider).size.width = this.width;
        this.node.getChildByName("sprite").color = color;
        this.node.getChildByName("brokenFX").getChildByName("pieceU").color = color;
        this.node.getChildByName("brokenFX").getChildByName("pieceD").color = color;
        this.node.setPosition(position);
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(dir.x * this.speed, dir.y * this.speed);
        this.scheduleOnce(this.vanish, this.lifeTime);
      },
      reuse: function reuse() {
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this.vanish, this.lifeTime);
        this.node.rotation = 0;
        this.node.getChildByName("sprite").opacity = 255;
        cc.log(this.node.getChildByName("sprite"));
        this.collisionTime = this.player.bulletCollisionTime;
      },
      hit: function hit() {},
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        this.collisionTime--;
        if (this.collisionTime <= 0) {
          this.anim.play("break");
          this.collisionTime = 2;
          this.scheduleOnce(function() {
            this.bulletManager.put(this.node);
          }.bind(this), this.anim.currentClip.duration);
        }
      },
      vanish: function vanish() {
        this.anim.play("vanish");
        this.scheduleOnce(function() {
          this.bulletManager.put(this.node);
        }.bind(this), this.anim.currentClip.duration);
      },
      update: function update(dt) {
        if (false === this.isMoving) return;
      }
    });
    cc._RF.pop();
  }, {} ],
  common: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b605bpAEohD4KevRc8lgwUh", "common");
    "use strict";
    var _SetCommon = require("SetCommon");
    var _SetCommon2 = _interopRequireDefault(_SetCommon);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
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
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    SetCommon: "SetCommon"
  } ],
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
    var physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;
    cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
    window.D = {
      common: null,
      commonInfo: null
    };
    cc._RF.pop();
  }, {} ],
  planet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5a006pbT5FD4YGqs5SittTt", "planet");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        HP: 1e3
      },
      start: function start() {}
    });
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
}, {}, [ "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "Game", "GameMng", "MapControl", "bullet", "bulletManager", "planet", "CameraControl", "SystemControl", "WaveMng", "GameOverUI", "InGameUI", "Joystick", "JoystickCommon", "StartMenuUI", "Helpers", "SetCommon", "common", "global", "Launch", "Menu", "SetMenu", "PlayerControl", "en", "zh" ]);