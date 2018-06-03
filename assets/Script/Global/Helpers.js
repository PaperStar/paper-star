const ColorList = cc.Enum({
    blue: '#0078E7',
    success: '#21ba45',
    warning: '#f2711c',
    danger: '#db2828',
    info: '#42B8DD',
    purple: '#8e71c1',
    black: '#000000',
    dark: '#303133',
    light: '#eeeeee'
})

export default {
    ColorList,

    // Returns a random integer between min (included) and max (excluded)
    getRandom (min, max){
        return Math.floor(Math.random()*(max - min + 1) + min)
    },

    getRandomColor() {
        let RoleColor = [
            'blue',
            'success',
            'warning',
            'danger',
            'info',
            'purple',
            'black',
        ]
        return this.ColorList[RoleColor[this.getRandom(0, RoleColor.length - 1)]]
    },

    //  Paper Star - @YunYouJun 
    displayEgg () {
        console.log('%c Paper Star - @YunYouJun ','background:#000;color:#fff;padding:2px;border-radius:2px')
    },

    // loadScene
    loadStartMenu () {
        cc.director.loadScene('StartMenu', function() {
            console.log('StartMenu is loaded.')
        })
    },

    loadStoryBoard () {
        cc.director.loadScene("StoryBoard")
    },
}