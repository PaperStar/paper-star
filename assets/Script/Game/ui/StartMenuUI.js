cc.Class({
    extends: cc.Component,

    properties: {
        bgCanvas: cc.Graphics,
    },

    onLoad () {

    },

    start () {
        this.ctx = this.bgCanvas
        this.height = this.bgCanvas.node.height
        this.center = cc.v2(200, this.height/2)
        this.init()
        this.drawOrbitPlanet()
        this.drawStarLine()
    },

    init () {
        this.generateRandomOrbitPlanet(8)
        this.StarLineColor = cc.color(0, 0, 0, 50 + 150 * Math.random())
    },

    generateRandomOrbitPlanet (num) {
        this.orbits = []
        this.planets = []
        for (let i = 0; i < num; i++) {
            let radius = 100 + Math.random() * 20 + i*80
            let strokeColor = cc.color(0, 0, 0, 50 + 100 * Math.random())
            let orbit = {
                radius,
                strokeColor
            }
            this.orbits.push(orbit)
        }

        for (let i = 0; i < num; i++) {
            let maxAngle = -80 + i*10
            let minAngle = 80 - i*10
            let radian =  (minAngle + Math.random()*(maxAngle - minAngle)) * (Math.PI/180)
            let radius = 10 + Math.random() * 20
            let hasRing = Math.random() > 0.5 ? true : false
            let speed = Math.random() * 0.5
            let fillColor = cc.color(0, 0, 0, 200 + 55 * Math.random())
            let strokeColor = cc.color(0, 0, 0, 50 + 150 * Math.random())
            let ringRadius = radius + 10 + 5 * Math.random()
            let lineWidth = 6 + 4*Math.random()
            let planet = {
                radian,
                radius,
                fillColor,
                strokeColor,
                hasRing,
                speed,
                ringRadius,
                lineWidth
            }
            this.planets.push(planet)
        }
    },

    drawOrbitPlanet () {
        let ctx = this.ctx
        // draw orbit
        for (let i = 0; i < this.orbits.length; i++) {
            ctx.lineWidth = 2
            ctx.strokeColor = this.orbits[i].strokeColor
            ctx.circle(this.center.x, this.center.y, this.orbits[i].radius)
            ctx.stroke()
        }

        // draw planet
        for (let i = 0; i < this.planets.length; i++) {
            let x = Math.cos(this.planets[i].radian) * this.orbits[i].radius + this.center.x
            let y = Math.sin(this.planets[i].radian) * this.orbits[i].radius + this.center.y
            ctx.fillColor = this.planets[i].fillColor
            ctx.circle(x, y, this.planets[i].radius)
            // ctx.fill()
            ctx.lineWidth = 3
            ctx.strokeColor = this.planets[i].fillColor
            ctx.stroke()
            if (this.planets[i].hasRing) {
                ctx.circle(this.planets[i].x, this.planets[i].y, this.planets[i].ringRadius)
                ctx.lineWidth = this.planets[i].lineWidth
                ctx.strokeColor = this.planets[i].strokeColor
                ctx.stroke()
            }
        }
    },

    drawStarLine () {
        let ctx = this.ctx
        ctx.lineWidth = 3
        // ctx.moveTo(this.center.x, this.center.y)
        let firstPlanet = cc.v2(Math.cos(this.planets[0].radian) * this.orbits[0].radius + this.center.x, Math.sin(this.planets[0].radian) * this.orbits[0].radius + this.center.y)
        ctx.moveTo(firstPlanet.x, firstPlanet.y)
        ctx.strokeColor = this.StarLineColor
        for (let i = 1; i < this.planets.length; i++) {
            let x = Math.cos(this.planets[i].radian) * this.orbits[i].radius + this.center.x
            let y = Math.sin(this.planets[i].radian) * this.orbits[i].radius + this.center.y
            ctx.lineTo(x, y)
        }
        ctx.stroke()
    },

    update (dt) {
        for (let i = 0; i < this.planets.length; i++) {
            // this.planets[i].radian -= this.planets[i].speed * Math.PI / 180
            this.planets[i].radian -= this.planets[i].speed * Math.PI/180
        }
        this.ctx.clear()
        this.drawOrbitPlanet()
        this.drawStarLine()
    },
})
