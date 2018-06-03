const BossType = require('Types').BossType;
const Spawn = require('Spawn');

cc.Class({
    extends: cc.Component,
    properties: {
        demonSpawn: Spawn,
    },

    init (game) {
        this.game = game;
        this.waveMng = game.waveMng;
        this.bossIdx = 0;
    },

    startBoss () {
        if (this.bossIdx === BossType.Carrier) {
            this.waveMng.startBossSpawn(this.demonSpawn);
        }
    },

    endBoss () {
        this.bossIdx++;
    }
});