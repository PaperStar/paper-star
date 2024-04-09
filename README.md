# Paper Star

《纸飞机的星际冒险》

> A web game about paper plane. Let's start!

[Design Docs](docs/PaperStar-design.md)

## Function

## Intend

- [ ] Upgrade to Cocos Creator v2.0
- Battle Logic
- Prop
- Foe Damage
- generate Random Planet
- Enemy
  - Floating Air Carrier (release simple black paper plane)
  - Black Bomber
- [ ] Analytics
  - [ ] Add Cocos Analytics
- [ ] Move game design docs to [GDD](https://github.com/PaperStar/GDD)

### Wechat Game

- [ ] Wechat API ([wx-sub](https://github.com/PaperStar/wx-sub))

### UI

- [ ] Planet style button with glow fx
- [ ] Custom draw paper plane

## BUG

- [ ] Use `cc.director.pause()` to pause, button can respond, but scale effect disabled.
- [ ] Upgrade to 2.x: Wrong coordinate system

## Dev

### Download

Install `git-lfs`

#### Windows

```sh
git lfs install
```

#### macOS

```sh
brew install git-lfs
```

---

```sh
git clone https://github.com/PaperStar/paper-star.git
```

### Lint

```sh
pnpm i
# lint
# eslint assets/scripts
npm run lint --fix
```

## Reference

- [cocos-tutorial-airplane](https://github.com/cocos/cocos-tutorial-airplane/)
- [tutorial-dark-slash](https://github.com/cocos-creator/tutorial-dark-slash)
- [aircraft_war](https://github.com/A123asdo11/aircraft_war)
