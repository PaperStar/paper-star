import Helpers from 'Helpers'

let physicsManager = cc.director.getPhysicsManager();
physicsManager.enabled = true;

// 调试
// let debugFlag = true
let debugFlag = false
if (debugFlag) {
    cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_pairBit |
        cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit
}

window.Global = {
    Helpers: Helpers,
    wxGame: null,
    userInfo: null,
    config: null,
    rank: null,
    curSceneName: 'StartMenu',
    common: null, //公共方法
    commonInfo: null, //定义的一些常量
}