require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  About: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "396a4yO9/tOUaxE1hWIsU2E", "About");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        cc.director.setClearColor(cc.Color.BLACK);
      },
      show: function show(title, content) {
        switch (cc.sys.platform) {
         case cc.sys.WECHAT_GAME:
          var info = {
            title: title,
            content: content,
            showCancel: false,
            cancelText: "我知道啦"
          };
          wx.showModal(info);
          break;

         default:
          window.open(url);
        }
      },
      openProjectShow: function openProjectShow() {
        var title = "游戏演示";
        var projectShowUrl = "https://yunle.fun/show/";
        this.show(title, projectShowUrl);
      },
      openProjectGitHub: function openProjectGitHub() {
        var title = "GitHub 项目地址";
        var projectGitHubUrl = "https://github.com/PaperStar/";
        this.show(title, projectGitHubUrl);
      },
      openAuthorGitHub: function openAuthorGitHub() {
        var title = "作者 GitHub 地址";
        var myGitHubUrl = "https://github.com/YunYouJun/";
        this.show(title, myGitHubUrl);
      },
      openAuthorWeibo: function openAuthorWeibo() {
        var title = "作者微博";
        var myWeiboUrl = "https://weibo.com/jizhideyunyoujun";
        this.show(title, myWeiboUrl);
      },
      openGameWeb: function openGameWeb() {
        var title = "游戏官网";
        var gameWebUrl = "https://yunle.fun/";
        this.show(title, gameWebUrl);
      },
      sendEmail: function sendEmail() {
        var title = "作者邮箱";
        var EmailUrl = "me@yunyoujun.cn";
        this.show(title, EmailUrl);
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
      children: [ "StartMenu", "ModeMenu", "ConfigMenu", "AchieveSystem" ]
    }, {
      parent: "ModeMenu",
      children: [ "FreeMode", "GravityMode" ]
    }, {
      parent: "ConfigMenu",
      children: [ "About" ]
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
        cc.director.loadScene(getParentMenu(Global.curSceneName), function() {
          console.log("Back To " + getParentMenu(Global.curSceneName));
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  BossMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aafd1IYFHlCCptDl2l2Kl82", "BossMng");
    "use strict";
    var BossType = require("Types").BossType;
    var Spawn = require("Spawn");
    cc.Class({
      extends: cc.Component,
      properties: {
        demonSpawn: Spawn
      },
      init: function init(game) {
        this.game = game;
        this.waveMng = game.waveMng;
        this.bossIdx = 0;
      },
      startBoss: function startBoss() {
        this.bossIdx === BossType.Carrier && this.waveMng.startBossSpawn(this.demonSpawn);
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
  BossProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "178aaufFWBMjKEMUnBNqyHl", "BossProgress");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        fxParticle: cc.ParticleSystem,
        anim: cc.Animation
      },
      init: function init(waveMng) {
        this.waveMng = waveMng;
      },
      show: function show() {
        this.node.active = true;
        this.anim.play("turn-red");
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
          tooltip: "子弹延迟发射时间"
        },
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
        canBreak: true,
        brokenFX: cc.Node,
        isVisible: false
      },
      init: function init(waveMng, dir, role) {
        this.waveMng = waveMng;
        this.isVisible = true;
        this.node.rotation = 0;
        this.sprite.enabled = true;
        this.sprite.node.opacity = 255;
        this.role = role;
        if ("player" == role.node.name) {
          this.scheduleOnce(function() {
            role._delayFlag = false;
          }, this.delay);
          var color = role.node.color;
          this.sprite.node.color = color;
          this.brokenFX.getChildByName("pieceU").color = color;
          this.brokenFX.getChildByName("pieceD").color = color;
        }
        this.collisionTime = role.bulletCollisionTime;
        this.anim = this.getComponent(cc.Animation);
        this.anim.stop();
        this.node.height = this.length;
        this.node.width = this.width;
        this.getComponent(cc.PhysicsBoxCollider).size.height = this.length;
        this.getComponent(cc.PhysicsBoxCollider).size.width = this.width;
        this.getComponent(cc.RigidBody).linearVelocity = cc.pMult(dir, this.moveSpeed);
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
        this.waveMng.despawnBullet(this);
      },
      update: function update(dt) {
        if (false === this.isMoving) return;
      }
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
      properties: {},
      onLoad: function onLoad() {
        Global.userInfo.node.active = false;
        cc.sys.platform == cc.sys.WECHAT_GAME && Global.wxGame.gameClubButton.hide();
      },
      loadStoryBoard: function loadStoryBoard() {
        cc.director.loadScene("StoryBoard", function() {
          console.log("StoryBoard is loaded.");
        });
      },
      loadAboutScene: function loadAboutScene() {
        cc.director.loadScene("About", function() {
          Global.Helpers.displayEgg();
        });
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
    var _Types = require("Types");
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
          default: _Types.BulletType.Arrow,
          type: _Types.BulletType
        },
        bulletCollisionTime: {
          default: 2,
          displayName: "子弹可碰撞次数"
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
        fxSmoke: cc.ParticleSystem
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
        this.node.rotation = 360 * Math.random();
        this.anim = this.node.getChildByName("sprite").getComponent(cc.Animation);
        this.anim.play("fadeIn");
        this.readyToMove();
        this.body = this.getComponent(cc.RigidBody);
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
        this.atkDir = cc.pNormalize(cc.pSub(this.player.node.position, this.node.position));
        this.isAttacking = false;
        this.isMoving = true;
      },
      rotate: function rotate() {
        var sepAngle = cc.radiansToDegrees(cc.pAngleSigned(this.moveDir, this.atkDir));
        sepAngle > 2 ? this.node.rotation -= this.turnSpeed : sepAngle < -1 && (this.node.rotation += this.turnSpeed);
        this.moveDir = cc.pForAngle(cc.degreesToRadians(90 - this.node.rotation));
      },
      attackOnTarget: function attackOnTarget() {},
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
        switch (otherCollider.node.name) {
         case "bullet":
          this.hp -= 10;
          break;

         default:
          this.hp--;
        }
        if (this.hp <= 0 && this.isAlive) {
          this.isAlive = false;
          this.dead();
        }
      },
      update: function update(dt) {
        if (false === this.isAlive) return;
        this.isAttacking || this.prepAttack();
        if (this.isMoving) {
          this.atkType === _Types.AttackType.Melee && (this.body.linearVelocity = cc.pMult(this.moveDir, this.moveSpeed));
          this.rotate();
        } else this.body.linearVelocity = cc.v2(0, 0);
      }
    });
    cc._RF.pop();
  }, {
    Types: "Types"
  } ],
  GameOverUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d3d5UevHVMA5QOU5ZD2NF1", "GameOverUI");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        score: cc.Label
      },
      start: function start() {
        var app = "paper-star";
        var curRecord = JSON.parse(cc.sys.localStorage.getItem(app + "-curRecord"));
        var records = JSON.parse(cc.sys.localStorage.getItem(app + "-records"));
        this.score.string = curRecord.score;
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
      share: function share() {
        cc.sys.platform === cc.sys.WECHAT_GAME && wx.shareAppMessage({
          title: "快来进行你的冒险吧！"
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c246kvfxpPSZxunu1w8518", "Game");
    "use strict";
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
        cameraRoot: cc.Animation
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
        this.waveMng = this.waveMng.getComponent("WaveMng");
        this.waveMng.init(this);
        this.bossMng = this.bossMng.getComponent("BossMng");
        this.bossMng.init(this);
        this.sortMng = this.foeGroup.getComponent("SortMng");
        this.sortMng.init();
        cc.director.setClearColor(cc.hexToColor(_Helpers2.default.ColorList.dark));
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
      pause: function pause() {
        cc.director.pause();
      },
      resume: function resume() {
        cc.director.resume();
      },
      cameraShake: function cameraShake() {
        this.cameraRoot.play("shake");
      },
      death: function death() {
        this.deathUI.show();
      },
      revive: function revive() {
        this.resume();
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
        this.resume();
        this.waveMng.startWave();
        this.player.node.active = true;
        this.player.ready();
      },
      gameOver: function gameOver() {
        this.resume();
        this.deathUI.hide();
        this.gameOverUI.show();
        var app = "paper-star";
        var curRecord = {
          score: this.player.score,
          time: new Date(),
          life: this.player.life
        };
        var records = cc.sys.localStorage.getItem(app + "-records");
        if (records) {
          records = JSON.parse(records);
          records instanceof Array || (records = []);
          records.unshift(curRecord);
        }
        cc.sys.localStorage.setItem(app + "-curRecord", JSON.stringify(curRecord));
        cc.sys.localStorage.setItem(app + "-records", JSON.stringify(records));
      },
      restart: function restart() {
        cc.director.loadScene("FreeMode");
      }
    });
    cc._RF.pop();
  }, {
    Helpers: "Helpers"
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
    var physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;
    var debugFlag = false;
    debugFlag && (cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit);
    window.Global = {
      Helpers: _Helpers2.default,
      wxGame: null,
      userInfo: null,
      curSceneName: "StartMenu",
      common: null,
      commonInfo: null
    };
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
        console.log("%c Paper Star - @YunYouJun ", "background:#000;color:#fff;padding:2px;border-radius:2px");
      },
      loadStartMenu: function loadStartMenu() {
        cc.director.loadScene("StartMenu", function() {
          console.log("StartMenu is loaded.");
        });
      },
      loadStoryBoard: function loadStoryBoard() {
        cc.director.loadScene("StoryBoard");
      },
      loadConfigMenu: function loadConfigMenu() {
        cc.director.loadScene("ConfigMenu", function() {
          console.log("Config is loaded.");
        });
      }
    };
    module.exports = exports["default"];
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
        openPanelFlag: true
      },
      start: function start() {
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
        this.HPBar = this.Info.getChildByName("HPBar").getComponent(cc.ProgressBar);
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
        this.HPBar.progress = this.player.curHp / this.HPBar.totalLength;
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
        Global.Helpers.loadConfigMenu();
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
          displayName: "摇杆操纵点"
        },
        ring: {
          default: null,
          type: cc.Node,
          displayName: "摇杆背景节点"
        },
        player: {
          default: null,
          type: _Player2.default,
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
          default: 0,
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
        this.player.moveAngle = this._angle;
        this._setSpeed(cc.p(posX, posY));
        this.player.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.player.moveDir.x * this.player.moveSpeed, this.player.moveDir.y * this.player.moveSpeed);
        this.player.startMove();
      },
      _touchEndEvent: function _touchEndEvent() {
        this.dot.setPosition(this.ring.getPosition());
        this.touchType == _JoystickCommon2.default.TouchType.FOLLOW && (this.node.opacity = 0);
        this.player.stopMove();
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
  Logo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e86f7h7/ThBVJoTB44r2G7D", "Logo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        wxGame: cc.Node,
        userInfo: cc.Node,
        logoAnim: cc.Animation
      },
      onLoad: function onLoad() {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        cc.director.setDisplayStats(false);
        this.userInfo = this.userInfo.getComponent("UserInfo");
        this.userInfo.init();
        Global.userInfo = this.userInfo;
      },
      start: function start() {
        Global.Helpers.displayEgg();
        cc.game.addPersistRootNode(this.userInfo.node);
        this.userInfo.node.active = false;
        switch (cc.sys.platform) {
         case cc.sys.WECHAT_GAME:
          this.wxGame = this.wxGame.getComponent("wxGame");
          this.wxGame.init(this.userInfo);
          Global.wxGame = this.wxGame;
          cc.game.addPersistRootNode(this.wxGame.node);
          break;

         default:
          cc.view.enableAutoFullScreen(true);
        }
        this.scheduleOnce(this.next, this.logoAnim.defaultClip.duration);
      },
      next: function next() {
        if (this.userInfo.getUserInfo()) {
          this.userInfo.node.active = true;
          this.userInfo.displayUserInfo();
          Global.Helpers.loadStartMenu();
        } else Global.Helpers.loadStoryBoard();
      }
    });
    cc._RF.pop();
  }, {} ],
  MapControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "616b0xKWLtFY5rUTgK/fQ7K", "MapControl");
    "use strict";
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
        map: {
          default: null,
          type: cc.Node
        },
        planet: cc.Prefab,
        planetNum: 10,
        fiveStarAnim: cc.Prefab,
        fourStarAnim: cc.Prefab,
        twoStarAnim: cc.Prefab
      },
      init: function init() {
        this.StarAnim = this.node.getChildByName("bg").getChildByName("StarAnim");
        this.generatePlanet(this.planetNum);
        this.generateManyStarAnim(30);
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
        var randomPosition = cc.p(cc.randomMinus1To1() * this.map.width / 2, cc.randomMinus1To1() * this.map.height / 2);
        Star.setPosition(randomPosition);
        Star.scale = Math.random() + .1;
      },
      generatePlanet: function generatePlanet(num) {
        this.PlanetRectArray = [];
        this.PlanetMargin = 100;
        for (var i = 0; i < num; i++) {
          this.curPlanet = cc.instantiate(this.planet);
          this.curPlanetPos = cc.p(cc.randomMinus1To1() * (this.map.width - 500) / 2, cc.randomMinus1To1() * (this.map.height - 500) / 2);
          this.curPlanetRect = cc.rect(this.curPlanetPos.x, this.curPlanetPos.y, this.curPlanet.width + this.PlanetMargin, this.curPlanet.height + this.PlanetMargin);
          for (var j = 0; j < i; j++) {
            this.oldPlanetRect = this.PlanetRectArray[j];
            this.checkIntersectPlanet();
          }
          this.PlanetRectArray.push(this.curPlanetRect);
          this.curPlanet.parent = this.map;
          this.curPlanet.tag = i;
          this.curPlanet.setPosition(this.curPlanetPos);
          this.curPlanet.getComponent("planet").init();
        }
      },
      checkIntersectPlanet: function checkIntersectPlanet() {
        if (cc.rectIntersectsRect(this.oldPlanetRect, this.curPlanetRect)) {
          this.curPlanetPos = cc.p(cc.randomMinus1To1() * (this.map.width - 500) / 2, cc.randomMinus1To1() * (this.map.height - 500) / 2);
          this.curPlanetRect = cc.rect(this.curPlanetPos.x, this.curPlanetPos.y, this.curPlanet.width + this.PlanetMargin, this.curPlanet.height + this.PlanetMargin);
          this.checkIntersectPlanet();
        }
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
        Global.userInfo.node.active = true;
        cc.sys.platform == cc.sys.WECHAT_GAME && Global.wxGame.gameClubButton.show();
      },
      loadModeMenu: function loadModeMenu() {
        cc.director.loadScene("ModeMenu", function() {
          console.log("ModeMenu is loaded.");
        });
      },
      loadConfigMenu: function loadConfigMenu() {
        Global.Helpers.loadConfigMenu();
      },
      loadAchieveSystem: function loadAchieveSystem() {
        cc.director.loadScene("AchieveSystem", function() {
          console.log("AchieveSystem is loaded.");
        });
      },
      loadRankSystem: function loadRankSystem() {
        cc.director.loadScene("RankSystem", function() {
          console.log("RankSystem is loaded.");
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
        Global.userInfo.node.active = false;
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
        for (var i = 0; i < this.size; ++i) {
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
        bulletCollisionTime: {
          default: 2,
          displayName: "子弹可碰撞次数"
        },
        life: {
          default: 3,
          displayName: "生命数"
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
        moveAngle: {
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
      init: function init(game) {
        this.game = game;
        this.curHp = this.hp;
        this.score = 0;
        this.initPlayer();
        this.onControl();
        this.node.setPosition(cc.p(0, 0));
        this.oneShootKills = 0;
      },
      ready: function ready() {
        this.inputEnabled = true;
        this.isAlive = true;
      },
      initPlayer: function initPlayer() {
        this.RoleColor = cc.hexToColor(_Helpers2.default.getRandomColor());
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
         case cc.KEY.space:
          this._shootFlag = true;
          break;

         case cc.KEY.up:
         case cc.KEY.w:
          this.moveUp();
          break;

         case cc.KEY.left:
         case cc.KEY.a:
          this.moveLeft();
          break;

         case cc.KEY.right:
         case cc.KEY.d:
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
          this.stopMove();
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
        var rotation = this.getComponent(cc.RigidBody).getWorldRotation();
        var radian = cc.degreesToRadians(90 - rotation);
        var dir = cc.pForAngle(radian);
        this._delayFlag = true;
        this.game.waveMng.spawnBullet(this.bulletType, dir, this);
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
        console.log("经验：", nextExp, this.curExp);
        if (this.curExp >= nextExp) {
          this.curExp = this.curExp - nextExp;
          return true;
        }
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        switch (otherCollider.node.name) {
         case "planet":
          this.curHp--;
          break;

         case "bullet":
          this.curHp -= otherCollider.node.getComponent("bullet").damage;
          cc.log(otherCollider.node.getComponent("bullet").damage);
          break;

         default:
          this.curHp--;
        }
        this.game.inGameUI.showHp();
        this.curHp <= 0 && this.isAlive && this.dead();
      },
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
      onEndContact: function onEndContact(contact, selfCollider, otherCollider) {},
      update: function update() {
        this.speedUpFlag && this.speedUp();
        this._shootFlag && !this._delayFlag && this.shoot();
        this.moveDir = cc.pForAngle(cc.degreesToRadians(this.moveAngle));
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
    var _Types = require("Types");
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
    NodePool: "NodePool",
    Types: "Types"
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
        cc.log("max foe count reached, will delay spawn");
        return null;
      }
    });
    exports.default = Spawn;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    Types: "Types"
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
        this.center = cc.p(200, this.height / 2);
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
        console.log(this.bgAnim.currentClip.duration);
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
      start: function start() {},
      init: function init() {
        this.avatarSize = 46;
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
        var avatarUrl = this.userInfo.avatarUrl.split("/");
        avatarUrl[avatarUrl.length - 1] = this.avatarSize;
        avatarUrl = avatarUrl.join("/");
        this.userInfo.avatarUrl = avatarUrl;
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
    var _Foe = require("Foe");
    var _Foe2 = _interopRequireDefault(_Foe);
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
        return this.spawnIdx < this.spawns.length ? this.spawns[this.spawnIdx] : null;
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
            if (this.waveProgress && this.waveTotalFoes) var ratio = Math.min(this.killedFoe / this.waveTotalFoes, 1);
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
        this.testPos = cc.p(0, 0);
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
          newFoe.setPosition(this.testPos.addSelf(cc.p(100, 100)));
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
      spawnBullet: function spawnBullet(bulletType, dir, role) {
        var newBullet = this.game.poolMng.getBullet(bulletType);
        if (newBullet) {
          role.node.getChildByName("BulletGroup").addChild(newBullet);
          if (role.node.getChildByName("emitter")) {
            var pos = role.node.getChildByName("emitter").getPosition();
            newBullet.setPosition(pos);
          }
          newBullet.getComponent("Bullet").init(this, dir, role);
        } else cc.log("Too many Bullets!");
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
      despawnBullet: function despawnBullet(bullet) {
        var type = bullet.bulletType;
        this.game.poolMng.putBullet(type, bullet.node);
      },
      getNewFoePosition: function getNewFoePosition() {
        var randX = cc.randomMinus1To1() * (this.foeGroup.width - this.spawnMargin) / 2;
        var randY = cc.randomMinus1To1() * (this.foeGroup.height - this.spawnMargin) / 2;
        return cc.p(randX, randY);
      }
    });
    cc._RF.pop();
  }, {
    Foe: "Foe",
    Spawn: "Spawn",
    Types: "Types"
  } ],
  WaveProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a90aa7G1q5ANJGKlnUcA6SL", "WaveProgress");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bar: cc.ProgressBar,
        head: cc.Node,
        lerpDuration: 0
      },
      onLoad: function onLoad() {},
      init: function init(waveMng) {
        this.waveMng = waveMng;
        this.bar.progress = 0;
        this.curProgress = 0;
        this.destProgress = 0;
        this.timer = 0;
        this.isLerping = false;
      },
      updateProgress: function updateProgress(progress) {
        this.curProgress = this.bar.progress;
        this.destProgress = progress;
        this.timer = 0;
        this.isLerping = true;
      },
      update: function update(dt) {
        if (false === this.isLerping) return;
        this.timer += dt;
        if (this.timer >= this.lerpDuration) {
          this.timer = this.lerpDuration;
          this.isLerping = false;
        }
        this.bar.progress = cc.lerp(this.curProgress, this.destProgress, this.timer / this.lerpDuration);
        var headPosX = this.bar.barSprite.node.width * this.bar.progress;
        this.head.x = headPosX;
      }
    });
    cc._RF.pop();
  }, {} ],
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
    var Gravity = require("gravity");
    cc.Class({
      extends: Gravity,
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
        var dir = cc.pSub(center, position);
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
  planet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5a006pbT5FD4YGqs5SittTt", "planet");
    "use strict";
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
        hp: 1e3,
        curHp: 1e3,
        gravityRadial: cc.Prefab,
        radius: 100,
        gravityRadius: 200,
        gravityForce: 300
      },
      init: function init() {
        this.curHp = this.hp;
        this.node.color = cc.hexToColor(_Helpers2.default.getRandomColor());
        this.getComponent(cc.RigidBody).angularVelocity = 200 * cc.randomMinus1To1();
        this.node.scale = 1 * Math.random() + .3;
        this.node.rotation = _Helpers2.default.getRandom(0, 360);
        var planeGravityRadial = cc.instantiate(this.gravityRadial);
        planeGravityRadial.parent = this.node;
        planeGravityRadial.getComponent(cc.PhysicsCircleCollider).radius = this.node.width + 200 * Math.random();
        this.gravityForce = 100 + 200 * Math.random();
        planeGravityRadial.getComponent("gravity-radial").gravityForce = this.gravityForce;
      }
    });
    cc._RF.pop();
  }, {
    Helpers: "Helpers"
  } ],
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
                title: "快来进行你的冒险吧~"
              };
            });
          },
          fail: function fail(res) {
            console.log("fail");
            console.log(res);
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
                text: "授权个人信息",
                style: {
                  left: 66,
                  top: 10,
                  width: 140,
                  height: 40,
                  lineHeight: 40,
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
          console.log(res);
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
        hello: "你好！",
        bye: "再见！"
      }
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "Logo", "StoryBoard", "UserInfo", "wxGame", "BossMng", "Foe", "Spawn", "Game", "MapControl", "Bullet", "gravity-radial", "gravity", "planet", "PlayerFX", "SortMng", "CameraControl", "SystemControl", "WaveMng", "GameOverUI", "ComboDisplay", "DeathUI", "InGameUI", "KillDisplay", "WaveUI", "Joystick", "JoystickCommon", "StartMenuUI", "AnimHelper", "Global", "Helpers", "NodePool", "PoolMng", "Types", "About", "Back", "Config", "Menu", "Mode", "Player", "SkillProgress", "en", "zh", "BossProgress", "WaveProgress" ]);