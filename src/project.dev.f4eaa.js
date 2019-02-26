window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  About: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "396a4yO9/tOUaxE1hWIsU2E", "About");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        function callback(event) {
          event.stopPropagation();
        }
        this.node.on(cc.Node.EventType.TOUCH_START, callback, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, callback, this);
        this.node.on(cc.Node.EventType.TOUCH_END, callback, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, callback, this);
      },
      open: function open() {
        this.node.active = true;
      },
      close: function close() {
        this.node.active = false;
      },
      test: function test() {
        cc.log("test");
      },
      show: function show(title, content) {
        switch (cc.sys.platform) {
         case cc.sys.WECHAT_GAME:
          var info = {
            title: title,
            content: content,
            showCancel: false,
            cancelText: "\u6211\u77e5\u9053\u5566"
          };
          wx.showModal(info);
          break;

         default:
          window.open(content);
        }
      },
      openProjectShow: function openProjectShow() {
        var title = "\u6e38\u620f\u6f14\u793a";
        var projectShowUrl = "https://yunle.fun/show/";
        this.show(title, projectShowUrl);
      },
      openProjectGitHub: function openProjectGitHub() {
        var title = "GitHub \u9879\u76ee\u5730\u5740";
        var projectGitHubUrl = "https://github.com/PaperStar/";
        this.show(title, projectGitHubUrl);
      },
      openAuthorGitHub: function openAuthorGitHub() {
        var title = "\u4f5c\u8005 GitHub \u5730\u5740";
        var myGitHubUrl = "https://github.com/YunYouJun/";
        this.show(title, myGitHubUrl);
      },
      openAuthorWeibo: function openAuthorWeibo() {
        var title = "\u4f5c\u8005\u5fae\u535a";
        var myWeiboUrl = "https://weibo.com/jizhideyunyoujun";
        this.show(title, myWeiboUrl);
      },
      openGameWeb: function openGameWeb() {
        var title = "\u6e38\u620f\u5b98\u7f51";
        var gameWebUrl = "https://yunle.fun/";
        this.show(title, gameWebUrl);
      },
      sendEmail: function sendEmail() {
        var title = "\u4f5c\u8005\u90ae\u7bb1";
        var EmailUrl = "me@yunyoujun.cn";
        this.show(title, EmailUrl);
      }
    });
    cc._RF.pop();
  }, {} ],
  AchieveSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c56e24/nZJC44XO5j/Cqw3O", "AchieveSystem");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        Global.userInfo && Global.userInfo.hide();
      }
    });
    cc._RF.pop();
  }, {} ],
  AnimHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d6ff4kVMSdOh7u6WwhErR6E", "AnimHelper");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        particleToPlay: cc.ParticleSystem,
        finishHandler: cc.Component.EventHandler,
        fireHandler: cc.Component.EventHandler
      },
      playParticle: function playParticle() {
        this.particleToPlay && this.particleToPlay.resetSystem();
      },
      fire: function fire() {
        cc.Component.EventHandler.emitEvents([ this.fireHandler ]);
      },
      finish: function finish() {
        cc.Component.EventHandler.emitEvents([ this.finishHandler ]);
      }
    });
    cc._RF.pop();
  }, {} ],
  Back: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb190g9Ec9LGbupRFl1xyQR", "Back");
    "use strict";
    var menu = [ {
      parent: "StartMenu",
      children: [ "StartMenu", "ModeMenu", "AchieveSystem" ]
    }, {
      parent: "ModeMenu",
      children: [ "FreeMode", "GravityMode", "MissionMode", "PropsMode" ]
    } ];
    function getParentMenu(SceneName) {
      for (var i = 0; i < menu.length; i++) if (menu[i].children) for (var j = 0; j < menu[i].children.length; j++) if (SceneName == menu[i].children[j]) return menu[i].parent;
      return "StartMenu";
    }
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      start: function start() {
        Global.curSceneName = cc.director.getScene().name;
      },
      back: function back() {
        var parentScene = getParentMenu(Global.curSceneName);
        cc.director.loadScene(parentScene, function() {
          cc.log("Back To " + parentScene);
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  BossMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aafd1IYFHlCCptDl2l2Kl82", "BossMng");
    "use strict";
    var _Types = require("Types");
    var _Spawn = require("Spawn");
    var _Spawn2 = _interopRequireDefault(_Spawn);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        demonSpawn: _Spawn2.default
      },
      init: function init(game) {
        this.game = game;
        this.waveMng = game.waveMng;
        this.bossIdx = 0;
      },
      startBoss: function startBoss() {
        this.bossIdx === _Types.BossType.Carrier && this.waveMng.startBossSpawn(this.demonSpawn);
      },
      endBoss: function endBoss() {
        this.bossIdx++;
      }
    });
    cc._RF.pop();
  }, {
    Spawn: "Spawn",
    Types: "Types"
  } ],
  BulletMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3deesv55pG64fS6/vFOUR/", "BulletMng");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      init: function init(game) {
        this.game = game;
      },
      spawnBullet: function spawnBullet(bulletType, dir, role) {
        var newBullet = this.game.poolMng.getBullet(bulletType);
        newBullet ? newBullet.getComponent("Bullet").init(this, dir, role) : cc.log("Too Many Bullets!");
      },
      despawnBullet: function despawnBullet(bullet) {
        var type = bullet.bulletType;
        this.game.poolMng.putBullet(type, bullet.node);
      }
    });
    cc._RF.pop();
  }, {} ],
  Bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd9f4n6ZY5AWaItfDxKgjeO", "Bullet");
    "use strict";
    var _Types = require("Types");
    cc.Class({
      extends: cc.Component,
      properties: {
        bulletType: {
          default: _Types.BulletType.Line,
          type: _Types.BulletType
        },
        length: 20,
        moveSpeed: 500,
        delay: {
          default: .3,
          tooltip: "\u5b50\u5f39\u5ef6\u8fdf\u53d1\u5c04\u65f6\u95f4"
        },
        width: {
          default: 2,
          displayName: "\u5b50\u5f39\u5bbd\u5ea6"
        },
        lifeTime: {
          default: 10,
          displayName: "\u5b58\u6d3b\u65f6\u95f4"
        },
        collisionTime: {
          default: 2,
          displayName: "\u53ef\u78b0\u649e\u6b21\u6570"
        },
        damage: {
          default: 10,
          displayName: "\u4f24\u5bb3\u503c"
        },
        sprite: cc.Sprite,
        canBreak: true,
        brokenFX: cc.Node,
        isVisible: false
      },
      init: function init(bulletMng, dir, role) {
        this.bulletMng = bulletMng;
        this.isVisible = true;
        this.node.rotation = 0;
        this.sprite.enabled = true;
        this.sprite.node.opacity = 255;
        this.role = role;
        this.scheduleOnce(function() {
          role._delayFlag = false;
        }, this.delay);
        var pos = cc.v2(0, 0);
        role.node.getChildByName("BulletGroup").addChild(this.node);
        role.node.getChildByName("emitter") && (pos = role.node.getChildByName("emitter").getPosition());
        var roleName = role.node.name.toLowerCase();
        if ("player" == roleName) {
          var color = role.node.color;
          this.sprite.node.color = color;
          this.brokenFX.getChildByName("pieceU").color = color;
          this.brokenFX.getChildByName("pieceD").color = color;
        } else -1 !== roleName.indexOf("foe") && (pos = cc.v2(0, role.sprite.node.height));
        this.node.setPosition(pos);
        roleName.indexOf("foe");
        this.collisionTime = role.bulletCollisionTime;
        this.anim = this.getComponent(cc.Animation);
        this.anim.stop();
        this.node.height = this.length;
        this.node.width = this.width;
        this.getComponent(cc.PhysicsBoxCollider).size.height = this.length;
        this.getComponent(cc.PhysicsBoxCollider).size.width = this.width;
        this.getComponent(cc.RigidBody).linearVelocity = dir.mul(this.moveSpeed);
        this.brokenFX.active = false;
      },
      broke: function broke() {
        this.isMoving = false;
        this.sprite.enabled = false;
        this.brokenFX.active = true;
        this.anim.play("break");
        this.scheduleOnce(this.recycle, this.anim.currentClip.duration);
      },
      hit: function hit() {},
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        switch (otherCollider.node.name) {
         case "gravity-radial":
          break;

         default:
          this.collisionTime--;
        }
        if (this.isVisible && this.collisionTime <= 0) {
          this.isVisible = false;
          this.broke();
        }
      },
      vanish: function vanish() {
        this.anim.play("vanish");
        this.scheduleOnce(this.recycle, this.anim.currentClip.duration);
      },
      recycle: function recycle() {
        this.bulletMng.despawnBullet(this);
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    Types: "Types"
  } ],
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
      lateUpdate: function lateUpdate(dt) {
        this.camera.x = this.target.x;
        this.camera.y = this.target.y;
        var targetPos = void 0;
        targetPos = this.overview ? this.target.parent.convertToWorldSpaceAR(this.getOverviewTargetsMidpoint()) : this.target.parent.convertToWorldSpaceAR(this.target.position);
        if (this.pointerPan && this.pointerPos) {
          var xDelta = this.pointerPos.x / (this.visibleSize.width / 2) - 1;
          var yDelta = this.pointerPos.y / (this.visibleSize.height / 2) - 1;
          xDelta *= this.pointerXMult;
          yDelta *= this.pointerYMult;
          targetPos = cc.pAdd(targetPos, cc.v2(xDelta, yDelta));
        }
        if (this.smoothFollow) {
          (Math.abs(targetPos.x - this.node.x) >= this.followX || Math.abs(targetPos.y - this.node.y) >= this.followY) && (this.startFollow = true);
          if (this.startFollow) {
            this.node.position = this.node.position.lerp(targetPos, this.followRatio);
            targetPos.sub(this.node.position).mag() <= this.minFollowDist && (this.startFollow = false);
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
        var midPoint = cc.v2(0, 0);
        var minX = 99999;
        var minY = 99999;
        var maxX = -99999;
        var maxY = -99999;
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
        midPoint = cc.v2(minX + distX / 2, minY + distY / 2);
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
        this.camera.node.position = cc.v2(0, 0);
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
  ComboDisplay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6aba2qqDZNNHap/96kjAACd", "ComboDisplay");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        labelCombo: cc.Label,
        spFlare: cc.Sprite,
        comboColors: [ cc.Color ],
        showDuration: 0
      },
      onLoad: function onLoad() {
        this.anim = this.getComponent(cc.Animation);
      },
      init: function init() {
        this.comboCount = 0;
        this.node.active = false;
        this.showTimer = 0;
      },
      playCombo: function playCombo() {
        this.comboCount++;
        this.node.active = true;
        var colorIdx = Math.min(Math.floor(this.comboCount / 10), this.comboColors.length - 1);
        this.spFlare.node.color = this.comboColors[colorIdx];
        this.labelCombo.node.color = this.comboColors[colorIdx];
        this.labelCombo.string = this.comboCount;
        this.anim.play("combo-pop");
        this.showTimer = 0;
      },
      hide: function hide() {
        this.comboCount = 0;
        this.node.active = false;
      },
      update: function update(dt) {
        if (!this.node.active) return;
        this.showTimer += dt;
        this.showTimer >= this.showDuration && this.hide();
      }
    });
    cc._RF.pop();
  }, {} ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61ee5T8IIVORqDemqwaecMU", "Config");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        about: cc.Node
      },
      onLoad: function onLoad() {
        this.about = this.about.getComponent("About");
      },
      init: function init() {},
      backToStartMenu: function backToStartMenu() {
        this.close();
        Global.Helpers.loadStartMenu();
      },
      loadStoryBoard: function loadStoryBoard() {
        this.close();
        cc.director.loadScene("StoryBoard", function() {
          cc.log("StoryBoard is loaded.");
        });
      },
      openAbout: function openAbout() {
        this.about.open();
      },
      open: function open() {
        Global.userInfo && Global.userInfo.hide();
        cc.sys.platform == cc.sys.WECHAT_GAME && Global.wxGame.gameClubButton.hide();
        this.about.active && this.about.close();
        this.node.active = true;
      },
      close: function close() {
        Global.userInfo && "StartMenu" === cc.director.getScene().name && Global.userInfo.show();
        cc.sys.platform == cc.sys.WECHAT_GAME && Global.wxGame.gameClubButton.show();
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  DeathUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6cd0aWOhd9M2pK4lZ/s5SXf", "DeathUI");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      init: function init(game) {
        this.game = game;
        this.hide();
      },
      show: function show() {
        this.node.active = true;
      },
      hide: function hide() {
        this.node.active = false;
      },
      revive: function revive() {
        this.game.revive();
      },
      giveUp: function giveUp() {
        this.gameOver();
      },
      gameOver: function gameOver() {
        this.game.gameOver();
      }
    });
    cc._RF.pop();
  }, {} ],
  Foe: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f4ee95gSANDb5KSvEMM3orA", "Foe");
    "use strict";
    var _Helpers = require("Helpers");
    var _Helpers2 = _interopRequireDefault(_Helpers);
    var _Types = require("Types");
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        foeType: {
          default: _Types.FoeType.Foe1,
          type: _Types.FoeType
        },
        atkType: {
          default: _Types.AttackType.Melee,
          type: _Types.AttackType
        },
        bulletType: {
          default: _Types.BulletType.Line,
          type: _Types.BulletType
        },
        bulletCollisionTime: {
          default: 2,
          displayName: "\u5b50\u5f39\u53ef\u78b0\u649e\u6b21\u6570"
        },
        hp: 0,
        curHp: 0,
        score: 0,
        crashDamage: 0,
        moveSpeed: 0,
        turnSpeed: 0,
        moveDir: cc.v2(0, 1),
        atkDir: cc.v2(),
        atkRange: 0,
        atkDuration: 0,
        atkPrepTime: 0,
        fxSmoke: cc.ParticleSystem,
        sprite: cc.Sprite,
        hpBarPrefab: cc.Prefab,
        _delayFlag: false,
        _shootFlag: false
      },
      start: function start() {},
      init: function init(waveMng) {
        this.waveMng = waveMng;
        this.player = waveMng.player;
        this.isAttacking = false;
        this.isAlive = false;
        this.isInvincible = false;
        this.isMoving = false;
        this.curHp = this.hp;
        this.anim = this.node.getChildByName("sprite").getComponent(cc.Animation);
        this.anim.play("fadeIn");
        this.readyToMove();
        this.body = this.getComponent(cc.RigidBody);
        this.initHpBar();
        this.node.rotation = 360 * Math.random();
      },
      initHpBar: function initHpBar() {
        if (this.hpBarPrefab) {
          var HpBar = cc.instantiate(this.hpBarPrefab);
          this.node.addChild(HpBar);
          this.hpBar = HpBar.getComponent("HpBar");
          this.hpBar.init();
          this.hpBar.setDisplayPosition(cc.v2(0, this.sprite.node.height));
        }
      },
      readyToMove: function readyToMove() {
        this.isAlive = true;
        this.isMoving = true;
        this.fxSmoke.resetSystem();
      },
      prepAttack: function prepAttack() {
        this.isAttacking = true;
        this.scheduleOnce(this.attack, this.atkPrepTime);
      },
      attack: function attack() {
        if (false === this.isAlive) return;
        this.atkDir = cc.pNormalize(this.player.node.position.sub(this.node.position));
        this.isAttacking = false;
        this.isMoving = true;
      },
      rotate: function rotate() {
        var sepAngle = cc.radiansToDegrees(cc.pAngleSigned(this.moveDir, this.atkDir));
        sepAngle > 10 ? this.node.rotation -= this.turnSpeed : sepAngle < -10 && (this.node.rotation += this.turnSpeed);
        var radian = cc.misc.degreesToRadians(90 - this.node.rotation);
        this.moveDir = cc.v2(Math.cos(radian), Math.sin(radian));
      },
      attackOnTarget: function attackOnTarget() {
        this.shoot();
      },
      dead: function dead() {
        this.isMoving = false;
        this.isAttacking = false;
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        if (this.player && this.player.isAlive) {
          this.player.addKills();
          this.waveMng.killFoe(this.score);
        }
        this.anim.play("dead");
        this.scheduleOnce(this.recycle, this.anim.currentClip.duration);
      },
      recycle: function recycle() {
        this.waveMng.despawnFoe(this);
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        this.curHp -= _Helpers2.default.inflictDamage(otherCollider);
        this.hpBar.display(this.curHp, this.hp);
        if (this.curHp <= 0 && this.isAlive) {
          this.isAlive = false;
          this.dead();
        }
        this.turnSpeed = -this.turnSpeed;
      },
      update: function update(dt) {
        if (false === this.isAlive) return;
        this.isAttacking ? this._shootFlag && !this._delayFlag && this.shoot() : this.prepAttack();
        if (this.isMoving) {
          this.move();
          this.rotate();
        }
      },
      shoot: function shoot() {
        var radian = cc.misc.degreesToRadians(90 - this.node.rotation);
        var dir = cc.v2(Math.cos(radian), Math.sin(radian));
        this._delayFlag = true;
        this.waveMng.spawnBullet(this.bulletType, dir, this);
      },
      move: function move() {
        switch (this.atkType) {
         case _Types.AttackType.Melee:
          this.body.linearVelocity = this.moveDir.mul(this.moveSpeed);
          break;

         case _Types.AttackType.Range:
          var distance = this.player.node.position.sub(this.node.position).mag();
          if (distance < this.atkRange) {
            this.isMoving = false;
            this._shootFlag = true;
          } else {
            this._shootFlag = false;
            this.body.linearVelocity = this.moveDir.mul(this.moveSpeed);
          }
        }
      }
    });
    cc._RF.pop();
  }, {
    Helpers: "Helpers",
    Types: "Types"
  } ],
  GameOverUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d3d5UevHVMA5QOU5ZD2NF1", "GameOverUI");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        score: cc.Label,
        cost_time: cc.Label
      },
      start: function start() {
        var curRecord = JSON.parse(cc.sys.localStorage.getItem("curRecord"));
        this.score.string = curRecord.wxgame.score;
        this.cost_time.string = this.formatTime(curRecord.cost_ms);
      },
      init: function init(game) {
        this.game = game;
        this.hide();
      },
      hide: function hide() {
        this.node.active = false;
      },
      show: function show() {
        this.node.active = true;
      },
      backToStartMenu: function backToStartMenu() {
        cc.director.loadScene("StartMenu");
      },
      restart: function restart() {
        this.game.restart();
      },
      openRank: function openRank() {
        Global.rank.open();
      },
      share: function share() {
        cc.sys.platform === cc.sys.WECHAT_GAME && wx.shareAppMessage({
          title: "\u5feb\u6765\u8fdb\u884c\u4f60\u7684\u5192\u9669\u5427\uff01"
        });
      },
      formatTime: function formatTime(ms) {
        var time = Math.floor(ms / 1e3);
        var seconds = time % 60;
        var minutes = Math.floor(time / 60);
        var timeString = minutes + " ' " + seconds;
        return timeString;
      }
    });
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c246kvfxpPSZxunu1w8518", "Game");
    "use strict";
    var _BulletMng = require("BulletMng");
    var _BulletMng2 = _interopRequireDefault(_BulletMng);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        map: cc.Node,
        player: cc.Node,
        inGameUI: cc.Node,
        playerFX: cc.Node,
        waveMng: cc.Node,
        bossMng: cc.Node,
        poolMng: cc.Node,
        foeGroup: cc.Node,
        deathUI: cc.Node,
        gameOverUI: cc.Node,
        mainCamera: cc.Animation
      },
      onLoad: function onLoad() {
        this.map = this.map.getComponent("MapControl");
        this.map.init(this);
        this.playerFX = this.playerFX.getComponent("PlayerFX");
        this.playerFX.init(this);
        this.player = this.player.getComponent("Player");
        this.player.init(this);
        this.player.node.active = false;
        this.poolMng = this.poolMng.getComponent("PoolMng");
        this.poolMng.init();
        this.sortMng = this.foeGroup.getComponent("SortMng");
        this.sortMng.init();
        this.initMng();
        cc.Camera.main.backgroundColor = cc.Color.GRAY;
      },
      start: function start() {
        this.playerFX.playIntro();
        this.inGameUI = this.inGameUI.getComponent("InGameUI");
        this.inGameUI.init(this);
        this.deathUI = this.deathUI.getComponent("DeathUI");
        this.deathUI.init(this);
        this.gameOverUI = this.gameOverUI.getComponent("GameOverUI");
        this.gameOverUI.init(this);
      },
      initMng: function initMng() {
        this.bulletMng = new _BulletMng2.default();
        this.bulletMng.init(this);
      },
      pause: function pause() {
        cc.director.pause();
      },
      resume: function resume() {
        cc.director.resume();
      },
      cameraShake: function cameraShake() {
        this.mainCamera.play("shake");
      },
      death: function death() {
        this.deathUI.show();
      },
      revive: function revive() {
        this.deathUI.hide();
        this.playerFX.playRevive();
        this.player.revive();
      },
      clearAllFoes: function clearAllFoes() {
        var nodeList = this.foeGroup.children;
        for (var i = 0; i < nodeList.length; ++i) {
          var foe = nodeList[i].getComponent("Foe");
          if (foe) foe.dead(); else {
            var bullet = nodeList[i].getComponent("bullet");
            bullet && bullet.broke();
          }
        }
      },
      playerReady: function playerReady() {
        this.player.node.active = true;
        this.player.ready();
        this.startTime = new Date();
      },
      gameOver: function gameOver() {
        this.endTime = new Date();
        this.player.cost_ms = this.endTime - this.startTime;
        this.player.storeUserGameData();
        this.deathUI.hide();
        this.gameOverUI.show();
      },
      restart: function restart() {
        cc.director.loadScene("FreeMode");
      }
    });
    cc._RF.pop();
  }, {
    BulletMng: "BulletMng"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2acbeFK/3FIM6/79MJsQG7X", "Global");
    "use strict";
    var _Helpers = require("Helpers");
    var _Helpers2 = _interopRequireDefault(_Helpers);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
      debug();
    });
    function debug() {
      cc.director.getPhysicsManager().enabled = true;
      var debugFlag = false;
      debugFlag && (cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit);
      window.Global = {
        Helpers: _Helpers2.default,
        wxGame: null,
        userInfo: null,
        config: null,
        rank: null,
        curSceneName: "StartMenu",
        common: null,
        commonInfo: null,
        game: null
      };
    }
    cc._RF.pop();
  }, {
    Helpers: "Helpers"
  } ],
  Helpers: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb817NrY35LHK6kURY6HMba", "Helpers");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ColorList = cc.Enum({
      blue: "#0078E7",
      success: "#21ba45",
      warning: "#f2711c",
      danger: "#db2828",
      info: "#42B8DD",
      purple: "#8e71c1",
      black: "#000000",
      dark: "#303133",
      light: "#eeeeee"
    });
    exports.default = {
      ColorList: ColorList,
      getRandom: function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      getRandomColor: function getRandomColor() {
        var RoleColor = [ "blue", "success", "warning", "danger", "info", "purple", "black" ];
        return this.ColorList[RoleColor[this.getRandom(0, RoleColor.length - 1)]];
      },
      displayEgg: function displayEgg() {
        cc.log("%c Paper Star - @YunYouJun ", "background:#000;color:#fff;padding:2px;border-radius:2px");
      },
      loadStartMenu: function loadStartMenu() {
        cc.director.loadScene("StartMenu", function() {
          cc.log("StartMenu is loaded.");
        });
      },
      loadStoryBoard: function loadStoryBoard() {
        cc.director.loadScene("StoryBoard");
      },
      inflictDamage: function inflictDamage(otherCollider) {
        var name = otherCollider.node.name.toLowerCase();
        if (-1 !== name.indexOf("bullet")) return otherCollider.node.getComponent("Bullet").damage;
        if (-1 !== name.indexOf("foe")) return 1;
        return 1;
      }
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  HpBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64038tAXZZM7r7vPwAjCmm1", "HpBar");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bar: cc.Node,
        anim: cc.Animation
      },
      init: function init() {
        this.node.opacity = 0;
        this.progressBar = this.getComponent(cc.ProgressBar);
      },
      setDisplayPosition: function setDisplayPosition(pos) {
        var percent = pos.y / (this.node.height * this.node.scale);
        this.node.setAnchorPoint(.5, -percent);
        this.bar.setAnchorPoint(0, -percent);
      },
      show: function show() {
        this.node.opacity = 255;
      },
      display: function display(curHp, hp) {
        var percent = curHp / hp;
        this.progressBar.progress = percent;
        this.bar.color = percent > .7 ? cc.Color.GREEN : percent > .3 ? cc.Color.YELLOW : cc.Color.RED;
        this.anim && this.anim.play("hpBarFade");
      },
      update: function update() {
        this.node.rotation = -this.node.parent.rotation;
      }
    });
    cc._RF.pop();
  }, {} ],
  InGameUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac1b0tvti5F4aPaSKmlTJVi", "InGameUI");
    "use strict";
    var _Player = require("Player");
    var _Player2 = _interopRequireDefault(_Player);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        waveUI: cc.Node,
        killDisplay: cc.Node,
        comboDisplay: cc.Node,
        player: {
          default: null,
          type: _Player2.default
        },
        openPanelFlag: true,
        hpBar: cc.Node
      },
      start: function start() {
        cc.Camera.main.backgroundColor = cc.Color.GRAY;
        Global.userInfo && (Global.userInfo.node.active = false);
        this.scheduleOnce(this.togglePanel, 3);
      },
      init: function init(game) {
        this.waveUI = this.waveUI.getComponent("WaveUI");
        this.waveUI.node.active = false;
        this.killDisplay = this.killDisplay.getComponent("KillDisplay");
        this.killDisplay.node.active = false;
        this.comboDisplay = this.comboDisplay.getComponent("ComboDisplay");
        this.comboDisplay.init();
        this.anim = this.node.getChildByName("panel").getComponent(cc.Animation);
        this.shootBtn = this.node.getChildByName("shoot");
        this.shootTouchEvent();
        this.Info = this.node.getChildByName("Info");
        this.hpBar = this.hpBar.getComponent("HpBar");
        this.hpBar.init();
        this.hpBar.show();
        this.lifeLabel = this.Info.getChildByName("Life").getChildByName("num").getComponent(cc.Label);
        this.lifeLabel.string = this.player.life;
        this.scoreLabel = this.Info.getChildByName("Score").getComponent(cc.Label);
      },
      showWave: function showWave(num) {
        this.waveUI.node.active = true;
        this.waveUI.show(num);
      },
      showKills: function showKills(num) {
        this.killDisplay.playKill(num);
      },
      showLife: function showLife() {
        this.lifeLabel.string = this.player.life;
      },
      showHp: function showHp() {
        this.hpBar.display(this.player.curHp, this.player.hp);
      },
      showScore: function showScore(num) {
        this.scoreLabel.string = num;
      },
      addCombo: function addCombo() {
        this.comboDisplay.playCombo();
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
      togglePanel: function togglePanel() {
        if (this.openPanelFlag) {
          this.anim.play("ClosePanel");
          this.openPanelFlag = false;
        } else {
          this.anim.play("OpenPanel");
          this.openPanelFlag = true;
        }
      },
      loadConfigMenu: function loadConfigMenu() {
        Global.config.open();
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    Player: "Player"
  } ],
  JoystickCommon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e230VOCwtGvYBEdKGvM2XS", "JoystickCommon");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
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
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  Joystick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aab48BGt3tCj4s1/vilD88M", "Joystick");
    "use strict";
    var _JoystickCommon = require("JoystickCommon");
    var _JoystickCommon2 = _interopRequireDefault(_JoystickCommon);
    var _Player = require("Player");
    var _Player2 = _interopRequireDefault(_Player);
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
          displayName: "\u6447\u6746\u64cd\u7eb5\u70b9"
        },
        ring: {
          default: null,
          type: cc.Node,
          displayName: "\u6447\u6746\u80cc\u666f\u8282\u70b9"
        },
        player: {
          default: null,
          type: _Player2.default,
          displayName: "\u64cd\u63a7\u7684\u89d2\u8272"
        },
        stickX: {
          default: 0,
          displayName: "\u6447\u6746 X \u4f4d\u7f6e"
        },
        stickY: {
          default: 0,
          displayName: "\u6447\u6746 Y \u4f4d\u7f6e"
        },
        touchType: {
          default: _JoystickCommon2.default.TouchType.DEFAULT,
          type: _JoystickCommon2.default.TouchType,
          displayName: "\u89e6\u6478\u7c7b\u578b"
        },
        directionType: {
          default: _JoystickCommon2.default.DirectionType.ALL,
          type: _JoystickCommon2.default.DirectionType,
          displayName: "\u65b9\u5411\u7c7b\u578b"
        },
        _stickPos: {
          default: null,
          type: cc.Node,
          displayName: "\u6447\u6746\u5f53\u524d\u4f4d\u7f6e"
        },
        _touchLocation: {
          default: null,
          type: cc.Node,
          displayName: "\u6447\u6746\u5f53\u524d\u4f4d\u7f6e"
        },
        _angle: {
          default: 0,
          displayName: "\u5f53\u524d\u89e6\u6478\u7684\u89d2\u5ea6"
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
          var distance = touchPos.mag();
          var posX = this.ring.getPosition().x + touchPos.x;
          var posY = this.ring.getPosition().y + touchPos.y;
          if (this._radius > distance) {
            this.dot.setPosition(cc.v2(posX, posY));
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
        if (this.touchType == _JoystickCommon2.default.TouchType.FOLLOW && this._touchLocation.x == event.getLocation().x && this._touchLocation.y == event.getLocation().y) return false;
        var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        var distance = touchPos.mag();
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        var p = cc.v2(posX, posY).sub(this.ring.getPosition());
        var r = Math.atan2(p.y, p.x);
        if (this._radius > distance) this.dot.setPosition(cc.v2(posX, posY)); else {
          var x = this._stickPos.x + Math.cos(r) * this._radius;
          var y = this._stickPos.y + Math.sin(r) * this._radius;
          this.dot.setPosition(cc.v2(x, y));
        }
        this._angle = cc.misc.radiansToDegrees(r);
        this.player.moveAngle = this._angle;
        this._setSpeed(cc.v2(posX, posY));
        this.player.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.player.moveDir.x * this.player.moveSpeed, this.player.moveDir.y * this.player.moveSpeed);
        this.player.startMove();
      },
      _touchEndEvent: function _touchEndEvent() {
        this.dot.setPosition(this.ring.getPosition());
        this.touchType == _JoystickCommon2.default.TouchType.FOLLOW && (this.node.opacity = 0);
        this.player.stopMove();
      },
      _setSpeed: function _setSpeed(point) {
        var distance = point.sub(this.ring.getPosition()).mag();
        distance < this._radius ? this.player.moveSpeed = this.player.normalSpeed : this.player.speedUpFlag = true;
      },
      update: function update() {
        var rotation = this.player.getComponent(cc.RigidBody).getWorldRotation();
        var radian = cc.misc.degreesToRadians(90 - rotation);
        var dir = cc.v2(Math.cos(radian), Math.sin(radian));
        this.player.moveDir = dir;
      }
    });
    cc._RF.pop();
  }, {
    JoystickCommon: "JoystickCommon",
    Player: "Player"
  } ],
  KillDisplay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed35dnDgl5NC7VXaT3o1oM+", "KillDisplay");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        labelKills: cc.Label
      },
      onLoad: function onLoad() {
        this.anim = this.getComponent(cc.Animation);
      },
      playKill: function playKill(kills) {
        this.node.active = true;
        this.labelKills.string = kills;
        this.anim.play("kill-pop");
      },
      hide: function hide() {
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  Logo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e86f7h7/ThBVJoTB44r2G7D", "Logo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        logoAnim: cc.Animation
      },
      onLoad: function onLoad() {
        cc.log("os:" + cc.sys.os);
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        cc.director.setDisplayStats(false);
      },
      start: function start() {
        Global.Helpers.displayEgg();
        this.scheduleOnce(this.next, this.logoAnim.defaultClip.duration);
      },
      next: function next() {
        Global.Helpers.loadStartMenu();
      }
    });
    cc._RF.pop();
  }, {} ],
  MapControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "616b0xKWLtFY5rUTgK/fQ7K", "MapControl");
    "use strict";
    var _NodePool = require("NodePool");
    var _NodePool2 = _interopRequireDefault(_NodePool);
    var _Types = require("Types");
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        map: {
          default: null,
          type: cc.Node
        },
        planetPools: {
          default: [],
          type: _NodePool2.default
        },
        planetNum: 10,
        fiveStarAnim: cc.Prefab,
        fourStarAnim: cc.Prefab,
        twoStarAnim: cc.Prefab
      },
      init: function init() {
        for (var i = 0; i < this.planetPools.length; ++i) this.planetPools[i].init();
        this.StarAnim = this.node.getChildByName("bg").getChildByName("StarAnim");
        this.generatePlanet(this.planetNum);
        this.generateManyStarAnim(30);
      },
      getPlanet: function getPlanet(planetType) {
        return this.planetPools[planetType].get();
      },
      putPlanet: function putPlanet(planetType, obj) {
        return this.planetPools[planetType].put(obj);
      },
      generatePlanet: function generatePlanet(num) {
        this.PlanetRectArray = [];
        this.PlanetMargin = 100;
        for (var i = 0; i < num; i++) {
          this.curPlanet = this.getPlanet(_Types.PlanetType.Simple);
          this.curPlanetPos = cc.v2(2 * (Math.random() - .5) * (this.map.width - 500) / 2, 2 * (Math.random() - .5) * (this.map.height - 500) / 2);
          this.curPlanetRect = cc.rect(this.curPlanetPos.x, this.curPlanetPos.y, this.curPlanet.width + this.PlanetMargin, this.curPlanet.height + this.PlanetMargin);
          for (var j = 0; j < i; j++) {
            this.oldPlanetRect = this.PlanetRectArray[j];
            this.checkIntersectPlanet();
          }
          this.PlanetRectArray.push(this.curPlanetRect);
          this.curPlanet.parent = this.map;
          this.curPlanet.setPosition(this.curPlanetPos);
          this.curPlanet.getComponent("Planet").init(this);
        }
      },
      checkIntersectPlanet: function checkIntersectPlanet() {
        if (this.oldPlanetRect.intersects(this.curPlanetRect)) {
          this.curPlanetPos = cc.v2(2 * (Math.random() - .5) * (this.map.width - 500) / 2, 2 * (Math.random() - .5) * (this.map.height - 500) / 2);
          this.curPlanetRect = cc.rect(this.curPlanetPos.x, this.curPlanetPos.y, this.curPlanet.width + this.PlanetMargin, this.curPlanet.height + this.PlanetMargin);
          this.checkIntersectPlanet();
        }
      },
      generateManyStarAnim: function generateManyStarAnim(num) {
        for (var i = 0; i < num; i++) {
          this.generateStarAnim(this.fiveStarAnim);
          this.generateStarAnim(this.fourStarAnim);
          this.generateStarAnim(this.twoStarAnim);
        }
      },
      generateStarAnim: function generateStarAnim(StarPrefab) {
        var Star = cc.instantiate(StarPrefab);
        Star.parent = this.StarAnim;
        var randomPosition = cc.v2(2 * (Math.random() - .5) * this.map.width / 2, 2 * (Math.random() - .5) * this.map.height / 2);
        Star.setPosition(randomPosition);
        Star.scale = Math.random() + .1;
      }
    });
    cc._RF.pop();
  }, {
    NodePool: "NodePool",
    Types: "Types"
  } ],
  Menu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5efdeZeEn9OwIEfWcnmZyG7", "Menu");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        config: cc.Node,
        rank: cc.Node
      },
      onLoad: function onLoad() {
        Global.userInfo && Global.userInfo.show();
        cc.sys.platform == cc.sys.WECHAT_GAME && Global.wxGame.gameClubButton.show();
      },
      start: function start() {
        this.initConfig();
        this.initRank();
      },
      initConfig: function initConfig() {
        if (!Global.config) {
          cc.game.addPersistRootNode(this.config);
          Global.config = this.config.getComponent("Config");
        }
        Global.config.close();
      },
      initRank: function initRank() {
        if (!Global.rank) {
          cc.game.addPersistRootNode(this.rank);
          Global.rank = this.rank.getComponent("Rank");
          Global.rank.init();
        }
        Global.rank.close();
      },
      loadModeMenu: function loadModeMenu() {
        cc.director.loadScene("ModeMenu", function() {
          cc.log("ModeMenu is loaded.");
        });
      },
      openConfigMenu: function openConfigMenu() {
        Global.config.open();
      },
      toggleRankList: function toggleRankList() {
        Global.rank.node.active ? Global.rank.close() : Global.rank.open();
      },
      loadAchieveSystem: function loadAchieveSystem() {
        cc.director.loadScene("AchieveSystem", function() {
          cc.log("AchieveSystem is loaded.");
        });
      },
      loadRankSystem: function loadRankSystem() {
        cc.director.loadScene("RankSystem", function() {
          cc.log("RankSystem is loaded.");
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  Mode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f62ebileutIe5SXL6zfmW76", "Mode");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        Global.userInfo && (Global.userInfo.node.active = false);
        cc.sys.platform == cc.sys.WECHAT_GAME && Global.wxGame.gameClubButton.hide();
      },
      start: function start() {},
      loadFreeMode: function loadFreeMode() {
        cc.director.loadScene("FreeMode");
      },
      loadGravityMode: function loadGravityMode() {
        cc.director.loadScene("GravityMode");
      },
      loadMissionMode: function loadMissionMode() {
        cc.director.loadScene("MissionMode");
      },
      loadPropsMode: function loadPropsMode() {
        cc.director.loadScene("PropsMode");
      }
    });
    cc._RF.pop();
  }, {} ],
  NodePool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d2c9yXFAFHD741J+bbrJcq", "NodePool");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NodePool = cc.Class({
      name: "NodePool",
      properties: {
        prefab: cc.Prefab,
        size: {
          default: 0,
          type: cc.Integer
        }
      },
      init: function init() {
        this.NodePool = new cc.NodePool();
        for (var i = 0; i < this.size; i++) {
          var obj = cc.instantiate(this.prefab);
          this.NodePool.put(obj);
        }
      },
      get: function get() {
        return this.NodePool.get();
      },
      put: function put(obj) {
        return this.NodePool.put(obj);
      }
    });
    exports.default = NodePool;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  Planet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "145a7pTkw5GhpyDJ/4S12Dy", "Planet");
    "use strict";
    var _Types = require("Types");
    var _Helpers = require("Helpers");
    var _Helpers2 = _interopRequireDefault(_Helpers);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        planetType: {
          default: _Types.PlanetType.Simple,
          type: _Types.PlanetType
        },
        hp: 1e3,
        curHp: 1e3,
        radius: 100,
        gravityRadial: cc.Prefab,
        gravityRadius: 200,
        gravityForce: 300,
        breakSpriteFrame: cc.SpriteFrame,
        breakAnim: cc.Animation,
        hpBarPrefab: cc.Prefab
      },
      init: function init(map) {
        this.map = map;
        this.curHp = this.hp;
        var color = cc.Color.BLACK;
        this.node.color = color.fromHEX(_Helpers2.default.getRandomColor());
        this.getComponent(cc.RigidBody).angularVelocity = 2 * (Math.random() - .5) * 200;
        this.node.scale = 1 * Math.random() + .3;
        this.node.rotation = _Helpers2.default.getRandom(0, 360);
        this.initGravity();
        this.initHpBar();
      },
      initHpBar: function initHpBar() {
        if (this.hpBarPrefab) {
          var HpBar = cc.instantiate(this.hpBarPrefab);
          this.node.addChild(HpBar);
          this.hpBar = HpBar.getComponent("HpBar");
          this.hpBar.init();
          this.hpBar.setDisplayPosition(cc.v2(0, 0));
        }
      },
      initGravity: function initGravity() {
        var planeGravityRadial = "";
        planeGravityRadial = this.node.getChildByName("gravity-radial") ? this.node.getChildByName("gravity-radial") : cc.instantiate(this.gravityRadial);
        planeGravityRadial.parent = this.node;
        planeGravityRadial.getComponent(cc.PhysicsCircleCollider).radius = this.node.width + 200 * Math.random();
        this.gravityForce = 100 + 200 * Math.random();
        planeGravityRadial.getComponent("gravity-radial").gravityForce = this.gravityForce;
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        this.curHp -= this.inflictDamage(otherCollider);
        if (500 === this.curHp) this.getComponent(cc.Sprite).spriteFrame = this.breakSpriteFrame; else if (this.curHp <= 0) {
          this.breakAnim.play("break");
          this.map.putPlanet(_Types.PlanetType.Simple, this.node);
        }
        this.hpBar.display(this.curHp, this.hp);
      },
      inflictDamage: function inflictDamage(otherCollider) {
        var name = otherCollider.node.name.toLowerCase();
        if (-1 !== name.indexOf("bullet")) return otherCollider.node.getComponent("Bullet").damage;
        return 1;
      }
    });
    cc._RF.pop();
  }, {
    Helpers: "Helpers",
    Types: "Types"
  } ],
  PlayerFX: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "67537hukOtAsKfLb9paloAh", "PlayerFX");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        introAnim: cc.Animation,
        deadAnim: cc.Animation,
        reviveAnim: cc.Animation
      },
      init: function init(game) {
        this.game = game;
        this.introAnim.node.active = false;
        this.deadAnim.node.active = false;
        this.reviveAnim.node.active = false;
      },
      playIntro: function playIntro() {
        this.introAnim.node.active = true;
        this.introAnim.play("start");
      },
      playDead: function playDead() {
        this.deadAnim.node.active = true;
        this.deadAnim.node.rotation = this.game.player.node.rotation;
        this.game.player.node.active = false;
        this.deadAnim.play("dead");
      },
      playRevive: function playRevive() {
        this.reviveAnim.node.active = true;
        this.reviveAnim.play("revive");
      },
      introFinish: function introFinish() {
        this.game.playerReady();
        this.introAnim.node.active = false;
      },
      deadFinish: function deadFinish() {
        this.deadAnim.node.active = false;
      },
      reviveFinish: function reviveFinish() {
        this.game.playerReady();
        this.reviveAnim.node.active = false;
      },
      reviveKill: function reviveKill() {}
    });
    cc._RF.pop();
  }, {} ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c473ibbBdDGbRMF9G7g8Tv", "Player");
    "use strict";
    var _Helpers = require("Helpers");
    var _Helpers2 = _interopRequireDefault(_Helpers);
    var _Types = require("Types");
    var _CameraControl = require("CameraControl");
    var _CameraControl2 = _interopRequireDefault(_CameraControl);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        fxTrail: cc.ParticleSystem,
        camera: _CameraControl2.default,
        bulletType: {
          default: _Types.BulletType.Line,
          type: _Types.BulletType
        },
        hp: 100,
        curHp: 100,
        score: 0,
        cost_ms: 0,
        bulletCollisionTime: {
          default: 2,
          displayName: "\u5b50\u5f39\u53ef\u78b0\u649e\u6b21\u6570"
        },
        life: {
          default: 3,
          displayName: "\u751f\u547d\u6570"
        },
        curExp: {
          default: 0,
          displayName: "\u5f53\u524d\u7ecf\u9a8c\u503c"
        },
        curLv: {
          default: 0,
          displayName: "\u5f53\u524d\u7b49\u7ea7"
        },
        RoleColor: {
          default: cc.Color.BLACK,
          displayName: "\u73a9\u5bb6\u989c\u8272"
        },
        isStop: true,
        moveDir: {
          default: cc.v2(0, 1),
          displayName: "\u79fb\u52a8\u65b9\u5411"
        },
        moveAngle: {
          default: 90,
          displayName: "\u79fb\u52a8\u89d2\u5ea6"
        },
        speedUpFlag: {
          default: false,
          displayName: "\u5f00\u542f\u52a0\u901f"
        },
        moveSpeed: {
          default: 0,
          displayName: "\u79fb\u52a8\u901f\u5ea6"
        },
        normalSpeed: {
          default: 100,
          displayName: "\u6b63\u5e38\u521d\u59cb\u901f\u5ea6"
        },
        accelSpeed: {
          default: 10,
          displayName: "\u52a0\u901f\u5ea6"
        },
        maxSpeed: {
          default: 300,
          displayName: "\u6700\u5927\u901f\u5ea6"
        },
        _delayFlag: false,
        _shootFlag: false
      },
      init: function init(game) {
        this.game = game;
        this.curHp = this.hp;
        this.score = 0;
        this.initPlayer();
        this.onControl();
        this.node.setPosition(cc.v2(0, 0));
        this.oneShootKills = 0;
      },
      ready: function ready() {
        this.inputEnabled = true;
        this.isAlive = true;
      },
      initPlayer: function initPlayer() {
        var color = cc.Color.BLACK;
        this.RoleColor = color.fromHEX(_Helpers2.default.getRandomColor());
        this.node.color = this.RoleColor;
        this.jet = this.node.getChildByName("jet");
        this.jet.getChildByName("triangle").color = this.RoleColor;
        this.emitter = this.node.getChildByName("emitter");
      },
      onControl: function onControl() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.space:
          this._shootFlag = true;
          break;

         case cc.macro.KEY.up:
         case cc.macro.KEY.w:
          this.moveUp();
          break;

         case cc.macro.KEY.left:
         case cc.macro.KEY.a:
          this.moveLeft();
          break;

         case cc.macro.KEY.right:
         case cc.macro.KEY.d:
          this.moveRight();
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.space:
          this._shootFlag = false;
          break;

         case cc.macro.KEY.up:
         case cc.macro.KEY.w:
          this.stopMove();
          break;

         case cc.macro.KEY.left:
         case cc.macro.KEY.a:
          this.moveLeftFlag = false;
          break;

         case cc.macro.KEY.right:
         case cc.macro.KEY.d:
          this.moveRightFlag = false;
        }
      },
      moveUp: function moveUp() {
        this.speedUpFlag = true;
        this.startMove();
      },
      moveLeft: function moveLeft() {
        this.moveLeftFlag = true;
      },
      moveRight: function moveRight() {
        this.moveRightFlag = true;
      },
      startMove: function startMove() {
        this.isStop = false;
        this.getComponent(cc.RigidBody).linearDamping = 0;
        this.node.getChildByName("jet").opacity = 255;
        this.fxTrail.resetSystem();
      },
      stopMove: function stopMove() {
        this.isStop = true;
        this.speedUpFlag = false;
        this.getComponent(cc.RigidBody).linearDamping = .5;
        this.node.getChildByName("jet").opacity = 0;
        this.fxTrail.stopSystem();
      },
      shoot: function shoot() {
        var radian = cc.misc.degreesToRadians(90 - this.node.rotation);
        var dir = cc.v2(Math.cos(radian), Math.sin(radian));
        this._delayFlag = true;
        this.game.bulletMng.spawnBullet(this.bulletType, dir, this);
      },
      roleRotate: function roleRotate() {
        this.moveLeftFlag && (this.moveAngle += 2);
        this.moveRightFlag && (this.moveAngle -= 2);
        var degree = 90 - this.moveAngle;
        this.node.rotation = degree;
      },
      speedUp: function speedUp() {
        this.accelSpeed > 0 && this.moveSpeed < this.maxSpeed && (this.moveSpeed += this.accelSpeed);
      },
      getExp: function getExp(enemyLv) {
        if (0 == enemyLv) return 50;
        return 200 ^ enemyLv - 1;
      },
      cal: function cal() {
        var nextExp = 200 ^ this.curLv;
        cc.log("\u7ecf\u9a8c\uff1a", nextExp, this.curExp);
        if (this.curExp >= nextExp) {
          this.curExp = this.curExp - nextExp;
          return true;
        }
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        this.curHp -= _Helpers2.default.inflictDamage(otherCollider);
        this.game.inGameUI.showHp();
        if (this.curHp <= 0 && this.isAlive) {
          this.isAlive = false;
          this.dead();
        }
      },
      onEndContact: function onEndContact(contact, selfCollider, otherCollider) {},
      dead: function dead() {
        this.isAlive = false;
        this.life--;
        this.game.playerFX.playDead();
        this.game.inGameUI.showLife();
        var self = this;
        this.life > 0 ? this.scheduleOnce(function() {
          self.game.death();
        }, this.game.playerFX.deadAnim.currentClip.duration) : this.game.gameOver();
      },
      revive: function revive() {
        this.isAlive = true;
        this.curHp = this.hp;
      },
      update: function update() {
        this.speedUpFlag && this.speedUp();
        this._shootFlag && !this._delayFlag && this.shoot();
        var radian = cc.misc.degreesToRadians(this.moveAngle);
        this.moveDir = cc.v2(Math.cos(radian), Math.sin(radian));
        this.roleRotate();
        this.isStop || (this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed * this.moveDir.x, this.moveSpeed * this.moveDir.y));
      },
      addKills: function addKills() {
        this.oneShootKills++;
        this.game.inGameUI.addCombo();
      },
      addScore: function addScore(score) {
        this.score += score;
        this.game.inGameUI.showScore(this.score);
      },
      onAtkFinished: function onAtkFinished() {
        this.oneShootKills >= 3 && this.game.inGameUI.showKills(this.oneShootKills);
      },
      storeUserGameData: function storeUserGameData() {
        var KVData = {
          nickName: Global.userInfo ? Global.userInfo.nickName.string : "\u533f\u540d",
          wxgame: {
            score: this.score,
            update_time: Date.parse(new Date())
          },
          cost_ms: this.cost_ms
        };
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
          var KVDataList = [];
          KVDataList.push(JSON.stringify(KVData));
          wx.setUserCloudStorage({
            KVDataList: KVDataList
          });
        }
        var records = cc.sys.localStorage.getItem("records");
        if (records) {
          records = JSON.parse(records);
          records instanceof Array ? records.length >= 20 && cc.log(records.pop()) : records = [];
          records.unshift(KVData);
        }
        cc.sys.localStorage.setItem("curRecord", JSON.stringify(KVData));
        cc.sys.localStorage.setItem("records", JSON.stringify(records));
        Global.rank.fresh();
      }
    });
    cc._RF.pop();
  }, {
    CameraControl: "CameraControl",
    Helpers: "Helpers",
    Types: "Types"
  } ],
  PoolMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49a35rLb+xNSZQOV6A6JXvY", "PoolMng");
    "use strict";
    var _NodePool = require("NodePool");
    var _NodePool2 = _interopRequireDefault(_NodePool);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        foePools: {
          default: [],
          type: _NodePool2.default
        },
        bulletPools: {
          default: [],
          type: _NodePool2.default
        }
      },
      init: function init() {
        for (var i = 0; i < this.foePools.length; ++i) this.foePools[i].init();
        for (var _i = 0; _i < this.bulletPools.length; ++_i) this.bulletPools[_i].init();
      },
      getFoe: function getFoe(foeType) {
        return this.foePools[foeType].get();
      },
      putFoe: function putFoe(foeType, obj) {
        return this.foePools[foeType].put(obj);
      },
      getBullet: function getBullet(type) {
        return this.bulletPools[type].get();
      },
      putBullet: function putBullet(type, obj) {
        return this.bulletPools[type].put(obj);
      }
    });
    cc._RF.pop();
  }, {
    NodePool: "NodePool"
  } ],
  RankInfoItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "24635ZGe61NNYEQdqqpxTw+", "RankInfoItem");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        avatar: cc.Sprite,
        rank: cc.Label,
        nickName: cc.Label,
        score: cc.Label
      },
      init: function init() {}
    });
    cc._RF.pop();
  }, {} ],
  Rank: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27c21trsLNHJ7XjJKQo3ljU", "Rank");
    "use strict";
    var _NodePool = require("NodePool");
    var _NodePool2 = _interopRequireDefault(_NodePool);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        king: cc.SpriteFrame,
        rankInfoItem: _NodePool2.default,
        content: cc.Node
      },
      init: function init() {
        this.rankInfoItem.init();
        this.fresh();
      },
      fresh: function fresh() {
        this.putItems();
        var records = JSON.parse(cc.sys.localStorage.getItem("records"));
        this.records = records.sort(this.compareScore);
        this.records && this.generateItems();
      },
      open: function open() {
        this.node.active = true;
      },
      close: function close() {
        this.node.active = false;
      },
      generateItems: function generateItems() {
        for (var i = 0; i < this.records.length; i++) {
          var RankInfoItem = this.rankInfoItem.get();
          this.content.addChild(RankInfoItem);
          RankInfoItem = RankInfoItem.getComponent("RankInfoItem");
          this.records[i].rank = i + 1;
          this.setRankInfo(RankInfoItem, i);
        }
        cc.sys.localStorage.setItem("records", JSON.stringify(this.records));
      },
      putItems: function putItems() {
        var length = this.content.children.length;
        for (var i = length - 1; i >= 0; i--) this.rankInfoItem.put(this.content.children[i]);
      },
      setRankInfo: function setRankInfo(item, i) {
        0 === i && (item.avatar.spriteFrame = this.king);
        item.node.color = i % 2 === 0 ? new cc.Color(51, 51, 51) : new cc.Color(34, 34, 34);
        item.rank.string = this.records[i].rank;
        item.nickName.string = this.records[i].nickName;
        item.score.string = this.records[i].wxgame.score;
      },
      compareScore: function compareScore(record1, record2) {
        var s1 = record1.wxgame.score;
        var s2 = record2.wxgame.score;
        if (s1 > s2) return -1;
        if (s1 < s2) return 1;
        return 0;
      }
    });
    cc._RF.pop();
  }, {
    NodePool: "NodePool"
  } ],
  SkillProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8bb70TI24ZB7Z8nyeck/jOk", "SkillProgress");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        fxParticle: cc.ParticleSystem
      },
      start: function start() {},
      init: function init(waveMng) {
        this.waveMng = waveMng;
      },
      show: function show() {
        this.node.active = true;
      },
      hide: function hide() {
        this.node.active = false;
      },
      showParticle: function showParticle() {
        this.fxParticle.resetSystem();
      }
    });
    cc._RF.pop();
  }, {} ],
  SortMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3e91aBYGRKKY4TCDL+AaAJ", "SortMng");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      init: function init() {
        this.frameCount = 0;
      },
      update: function update(dt) {
        ++this.frameCount % 6 === 0 && this.sortChildrenByY();
      },
      sortChildrenByY: function sortChildrenByY() {
        var listToSort = this.node.children.slice();
        listToSort.sort(function(a, b) {
          return b.y - a.y;
        });
        for (var i = 0; i < listToSort.length; ++i) {
          var node = listToSort[i];
          node.active && node.setSiblingIndex(i);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Spawn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "835d805LV9CWa4TzDm6cgfT", "Spawn");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _Types = require("Types");
    var Spawn = cc.Class({
      name: "Spawn",
      properties: {
        foeType: {
          default: _Types.FoeType.Foe1,
          type: _Types.FoeType
        },
        total: 0,
        spawnInterval: 0,
        isCompany: false
      },
      ctor: function ctor() {
        this.spawned = 0;
        this.finished = false;
      },
      spawn: function spawn(poolMng) {
        if (this.spawned >= this.total) return;
        var newFoe = poolMng.getFoe(this.foeType);
        if (newFoe) {
          this.spawned++;
          this.spawned === this.total && (this.finished = true);
          return newFoe;
        }
        cc.log("Max foe count reached, will delay spawn!");
        return null;
      }
    });
    exports.default = Spawn;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    Types: "Types"
  } ],
  StartMenuUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5283cOdPEVAK5O4oI5vbxdm", "StartMenuUI");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bgCanvas: cc.Graphics
      },
      onLoad: function onLoad() {},
      start: function start() {
        this.ctx = this.bgCanvas;
        this.height = this.bgCanvas.node.height;
        this.center = cc.v2(200, this.height / 2);
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
        var firstPlanet = cc.v2(Math.cos(this.planets[0].radian) * this.orbits[0].radius + this.center.x, Math.sin(this.planets[0].radian) * this.orbits[0].radius + this.center.y);
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
  Start: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f03eBkAqRHkIZNcomXHSOj", "Start");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        wxGame: cc.Node,
        userInfo: cc.Node
      },
      start: function start() {
        Global.userInfo || this.initUserInfo();
        Global.userInfo.show();
        switch (cc.sys.platform) {
         case cc.sys.WECHAT_GAME:
          Global.wxGame || this.initWxGame();
          break;

         default:
          cc.view.enableAutoFullScreen(true);
        }
        this.next();
      },
      initUserInfo: function initUserInfo() {
        cc.game.addPersistRootNode(this.userInfo);
        this.userInfo = this.userInfo.getComponent("UserInfo");
        this.userInfo.init();
        Global.userInfo = this.userInfo;
      },
      initWxGame: function initWxGame() {
        cc.game.addPersistRootNode(this.wxGame);
        this.wxGame = this.wxGame.getComponent("wxGame");
        this.wxGame.init(Global.userInfo);
        Global.wxGame = this.wxGame;
      },
      next: function next() {
        if (Global.userInfo.getUserInfo()) {
          Global.userInfo.displayUserInfo();
          Global.userInfo.show();
        } else {
          var userInfo = {
            nickName: "\u533f\u540d",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYS5cD3BZMvoJe6LSC6jOyuKIYnMlibuqAxiaz586GoTuXXm6VEO4W85zqnxrUicWYh6KO83yunhHlw/132"
          };
          Global.userInfo.storeUserInfo(userInfo);
          Global.Helpers.loadStoryBoard();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  StoryBoard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2b98ScZvFL2J1NmuEOC2EE", "StoryBoard");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bgAnim: cc.Animation,
        storyBoardAnim: cc.Animation
      },
      onLoad: function onLoad() {},
      start: function start() {
        this.scheduleOnce(this.bgFadeIn, this.storyBoardAnim.defaultClip.duration);
      },
      bgFadeIn: function bgFadeIn() {
        this.bgAnim.play("bgFadeIn");
        this.scheduleOnce(Global.Helpers.loadStartMenu, this.bgAnim.currentClip.duration);
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
  Types: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "605b332mE9PaLX7haEovCNV", "Types");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlanetType = cc.Enum({
      Simple: -1,
      Other: -1
    });
    var BossType = cc.Enum({
      Carrier: -1,
      BlackBomber: -1
    });
    var FoeType = cc.Enum({
      Foe0: -1,
      Foe1: -1,
      Foe2: -1,
      Foe3: -1,
      Boss1: -1,
      Boss2: -1
    });
    var AttackType = cc.Enum({
      Melee: -1,
      Range: -1
    });
    var BulletType = cc.Enum({
      Line: -1,
      Chain: -1,
      FireBall: -1,
      None: 999
    });
    var PropType = cc.Enum({
      Chain: -1,
      FireBall: -1,
      Star: -1,
      Fast: -1,
      Slow: -1,
      Life: -1
    });
    exports.PlanetType = PlanetType;
    exports.BossType = BossType;
    exports.FoeType = FoeType;
    exports.AttackType = AttackType;
    exports.BulletType = BulletType;
    exports.PropType = PropType;
    cc._RF.pop();
  }, {} ],
  UserInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23a05v7EZZIaZ8xxZ9pA9ut", "UserInfo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        nickName: cc.Label,
        avatarSprite: cc.Sprite
      },
      init: function init() {
        this.avatarSize = 46;
      },
      show: function show() {
        this.node.active = true;
      },
      hide: function hide() {
        this.node.active = false;
      },
      getUserInfo: function getUserInfo() {
        if (cc.sys.localStorage.getItem("userInfo")) {
          this.userInfo = JSON.parse(cc.sys.localStorage.getItem("userInfo"));
          return this.userInfo;
        }
        return false;
      },
      storeUserInfo: function storeUserInfo(userInfo) {
        this.userInfo = userInfo;
        cc.sys.localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      },
      displayUserInfo: function displayUserInfo() {
        var self = this;
        this.nickName.string = this.userInfo.nickName;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
          var image = wx.createImage();
          image.onload = function() {
            var texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            self.avatarSprite.spriteFrame = new cc.SpriteFrame(texture);
          };
          image.src = this.userInfo.avatarUrl;
        } else {
          var WechatAvatar = {
            url: "https://yunyoujun.cn/images/avatar.jpg",
            type: "jpg"
          };
          cc.loader.load(WechatAvatar, function(err, texture) {
            texture.height = self.avatarSize;
            texture.width = self.avatarSize;
            self.avatarSprite.spriteFrame.setTexture(texture);
          });
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  WaveMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f4a81px0GhIrK+FJh+9A5E+", "WaveMng");
    "use strict";
    var _Types = require("Types");
    var _Spawn = require("Spawn");
    var _Spawn2 = _interopRequireDefault(_Spawn);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var Wave = cc.Class({
      name: "Wave",
      properties: {
        spawns: {
          default: [],
          type: _Spawn2.default
        },
        bossType: {
          default: _Types.BossType.Carrier,
          type: _Types.BossType
        }
      },
      init: function init() {
        this.totalFoes = 0;
        this.spawnIdx = 0;
        for (var i = 0; i < this.spawns.length; ++i) false === this.spawns[i].isCompany && (this.totalFoes += this.spawns[i].total);
      },
      getNextSpawn: function getNextSpawn() {
        this.spawnIdx++;
        if (this.spawnIdx < this.spawns.length) return this.spawns[this.spawnIdx];
        return null;
      }
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        waves: {
          default: [],
          type: Wave
        },
        startWaveIdx: 0,
        spawnMargin: 0,
        killedFoe: {
          visible: false,
          default: 0,
          notify: function notify() {
            if (!this.currentWave || !this.waveTotalFoes) return;
            this.waveTotalFoes && this.killedFoe >= this.waveTotalFoes;
            this.waveProgress && this.waveTotalFoes;
          }
        },
        waveProgress: cc.Node,
        bossProgress: cc.Node
      },
      init: function init(game) {
        this.game = game;
        this.map = game.map;
        this.player = game.player;
        this.foeGroup = game.foeGroup;
        this.waveIdx = this.startWaveIdx;
        this.spawnIdx = 0;
        this.currentWave = this.waves[this.waveIdx];
        this.foeGroup.setContentSize(this.map.node.getContentSize());
        this.waveProgress = this.waveProgress.getComponent("WaveProgress");
        this.waveProgress.init(this);
        this.bossProgress = this.bossProgress.getComponent("BossProgress");
        this.bossProgress.init(this);
        this.testPos = cc.v2(0, 0);
      },
      startSpawn: function startSpawn() {
        this.schedule(this.spawnFoe, this.currentSpawn.spawnInterval);
      },
      startBossSpawn: function startBossSpawn(bossSpawn) {
        this.bossSpawn = bossSpawn;
        this.waveTotalFoes = bossSpawn.total;
        this.killedFoe = 0;
        this.schedule(this.spawnBossFoe, bossSpawn.spawnInterval);
      },
      endSpawn: function endSpawn() {
        this.unschedule(this.spawnFoe);
        var nextSpawn = this.currentWave.getNextSpawn();
        if (nextSpawn) {
          this.currentSpawn = nextSpawn;
          this.startSpawn();
          nextSpawn.isCompany && this.startBoss();
        }
      },
      startWave: function startWave() {
        this.unschedule(this.spawnFoe);
        this.currentWave.init();
        this.waveTotalFoes = this.currentWave.totalFoes;
        this.killedFoe = 0;
        this.currentSpawn = this.currentWave.spawns[this.currentWave.spawnIdx];
        this.startSpawn();
        this.game.inGameUI.showWave(this.waveIdx + 1);
      },
      startBoss: function startBoss() {
        this.bossProgress.show();
        this.game.bossMng.startBoss();
      },
      endWave: function endWave() {
        this.bossProgress.hide();
        this.game.bossMng.endBoss();
        if (this.waveIdx < this.waves.length - 1) {
          this.waveIdx++;
          this.currentWave = this.waves[this.waveIdx];
          this.startWave();
        } else cc.log("all waves spawned!");
      },
      spawnFoe: function spawnFoe() {
        if (this.currentSpawn.finished) {
          this.endSpawn();
          return;
        }
        var newFoe = this.currentSpawn.spawn(this.game.poolMng);
        if (newFoe) {
          this.foeGroup.addChild(newFoe);
          newFoe.setPosition(this.getNewFoePosition());
          newFoe.getComponent("Foe").init(this);
        }
      },
      spawnBossFoe: function spawnBossFoe() {
        this.bossSpawn.finished && this.unschedule(this.spawnBossFoe);
        var newFoe = this.bossSpawn.spawn(this.game.poolMng);
        if (newFoe) {
          this.foeGroup.addChild(newFoe);
          newFoe.setPosition(this.getNewFoePosition());
          newFoe.getComponent("Foe").init(this);
        }
      },
      killFoe: function killFoe(score) {
        this.killedFoe++;
        this.player.addScore(score);
      },
      hitFoe: function hitFoe() {
        this.game.cameraShake();
      },
      despawnFoe: function despawnFoe(foe) {
        var foeType = foe.foeType;
        this.game.poolMng.putFoe(foeType, foe.node);
      },
      getNewFoePosition: function getNewFoePosition() {
        var randX = 2 * (Math.random() - .5) * (this.foeGroup.width - this.spawnMargin) / 2;
        var randY = 2 * (Math.random() - .5) * (this.foeGroup.height - this.spawnMargin) / 2;
        return cc.v2(randX, randY);
      }
    });
    cc._RF.pop();
  }, {
    Spawn: "Spawn",
    Types: "Types"
  } ],
  WaveUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3065bQPWyJH1p6JzRjWAhhQ", "WaveUI");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        labelWave: cc.Label
      },
      onLoad: function onLoad() {
        this.anim = this.getComponent(cc.Animation);
      },
      start: function start() {},
      show: function show(num) {
        this.labelWave.string = num;
        this.anim.play("wave-pop");
      },
      hide: function hide() {
        this.node.active = false;
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
  "gravity-radial": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4410bRTQAVK5KwT44wKlIBI", "gravity-radial");
    "use strict";
    var _gravity = require("gravity");
    var _gravity2 = _interopRequireDefault(_gravity);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: _gravity2.default,
      properties: {
        gravityForce: 500
      },
      onLoad: function onLoad() {
        this._position = cc.v2();
        this._center = cc.v2();
      },
      _applyForce: function _applyForce(body) {
        var position = this._position;
        var center = this._center;
        body.getWorldPosition(position);
        this.body.getWorldPosition(center);
        var dir = center.sub(position);
        if (0 != dir.x && 0 != dir.y) {
          var f = center.subSelf(position).normalizeSelf().mulSelf(this.gravityForce * body.getMass());
          body.applyForce(f, position, false);
        }
      }
    });
    cc._RF.pop();
  }, {
    gravity: "gravity"
  } ],
  gravity: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8fd9b25QPBGm5s57qWUlbm0", "gravity");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onEnable: function onEnable() {
        var manager = cc.director.getPhysicsManager();
        this.bodies = [];
        this.body = this.getComponent(cc.RigidBody);
        this.originGravity = manager.gravity;
        manager.gravity = cc.v2();
      },
      onDisable: function onDisable() {
        cc.director.getPhysicsManager().gravity = this.originGravity;
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        this.bodies.push(otherCollider.body);
      },
      onEndContact: function onEndContact(contact, selfCollider, otherCollider) {
        var index = this.bodies.indexOf(otherCollider.body);
        -1 !== index && this.bodies.splice(index, 1);
      },
      update: function update(dt) {
        if (!this.body) return;
        var bodies = this.bodies;
        for (var i = 0; i < bodies.length; i++) this._applyForce(bodies[i]);
      },
      _applyForce: function _applyForce(body) {}
    });
    cc._RF.pop();
  }, {} ],
  wxGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "172d2Sf/xdKkaY+P+K+XpSh", "wxGame");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      init: function init(userInfo) {
        this.userInfo = userInfo;
        var self = this;
        wx.showShareMenu({
          success: function success(res) {
            wx.onShareAppMessage(function() {
              return {
                title: "\u5feb\u6765\u8fdb\u884c\u4f60\u7684\u5192\u9669\u5427~"
              };
            });
          },
          fail: function fail(res) {
            cc.log("fail");
            cc.log(res);
          }
        });
        wx.setMenuStyle({
          style: "dark"
        });
        wx.login({
          success: function success() {
            if (!userInfo.node.active) {
              var userInfoButton = wx.createUserInfoButton({
                type: "text",
                text: "\u6388\u6743\u4e2a\u4eba\u4fe1\u606f",
                style: {
                  left: 10,
                  top: 10,
                  width: 140,
                  height: 50,
                  lineHeight: 50,
                  borderColor: "#000000",
                  borderWidth: 1,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  textAlign: "center",
                  fontSize: 16,
                  borderRadius: 4
                }
              });
              userInfoButton.onTap(function(res) {
                userInfoButton.text = res.userInfo.nickName;
                self.userInfo.storeUserInfo(res.userInfo);
                self.userInfo.getUserInfo();
                self.userInfo.displayUserInfo();
                userInfoButton.hide();
                userInfo.node.active = true;
              });
            }
          }
        });
        this.createGameClub();
      },
      createGameClub: function createGameClub() {
        this.gameClubButton = wx.createGameClubButton({
          icon: "dark",
          style: {
            left: 20,
            top: 80,
            width: 40,
            height: 40
          }
        });
        this.gameClubButton.onTap(function(res) {
          cc.log(res);
        });
      }
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
        hello: "\u4f60\u597d\uff01",
        bye: "\u518d\u89c1\uff01"
      }
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "Logo", "Start", "StoryBoard", "UserInfo", "wxGame", "BossMng", "Foe", "Spawn", "Game", "MapControl", "BulletMng", "Bullet", "Planet", "gravity-radial", "gravity", "PlayerFX", "SortMng", "CameraControl", "SystemControl", "WaveMng", "GameOverUI", "HpBar", "ComboDisplay", "DeathUI", "InGameUI", "KillDisplay", "WaveUI", "Joystick", "JoystickCommon", "StartMenuUI", "AnimHelper", "Global", "Helpers", "NodePool", "PoolMng", "Types", "About", "Back", "Config", "Menu", "Mode", "Rank", "RankInfoItem", "Player", "SkillProgress", "AchieveSystem", "en", "zh" ]);