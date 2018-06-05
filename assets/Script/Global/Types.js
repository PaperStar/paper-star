const PlanetType = cc.Enum({
    Simple: -1,
    Other: -1,
})

const BossType = cc.Enum({
    Carrier: -1,
    BlackBomber: -1,
})

const FoeType = cc.Enum({
    Foe0: -1,
    Foe1: -1,
    Foe2: -1,
    Foe3: -1,
    Boss1: -1,
    Boss2: -1
})

const AttackType = cc.Enum({
    Melee: -1,
    Range: -1
})

const BulletType = cc.Enum({
    Line: -1,
    Chain: -1,
    FireBall: -1,
    None: 999
})

const PropType = cc.Enum({
    Chain: -1,
    FireBall: -1,
    Star: -1,
    Fast: -1,
    Slow: -1,
    Life: -1,
})

export {
    PlanetType,
    BossType,
    FoeType,
    AttackType,
    BulletType,
    PropType
}