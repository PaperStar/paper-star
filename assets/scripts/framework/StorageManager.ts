import { _decorator, log, sys } from 'cc'
import type { ConfigData, GlobalData } from '../types'

const { ccclass } = _decorator

@ccclass('StorageManager')
export class StorageManager {
  private static _instance: StorageManager

  public static get instance() {
    if (this._instance)
      return this._instance

    this._instance = new StorageManager()
    this._instance.start()
    return this._instance
  }

  /**
   * 全局数据
   */
  private _jsonData: GlobalData = {
    userId: '',
  }

  private KEY_CONFIG: string = 'coindfo'
  private _markSave: boolean = false
  /**
   * 定时器 id
   */
  private _saveTimerId: number = -1

  start() {
    clearInterval(this._saveTimerId)
    // 每隔5秒保存一次数据，主要是为了保存最新在线时间，方便离线奖励时间判定
    this._saveTimerId = setInterval(() => {
      this.scheduleSave()
    }, 5000)
  }

  /**
   * 根据关键字获取数值，不同账号不同数据
   * @param {string} key 关键字
   */
  getConfigData(key: string) {
    const account: string = this._jsonData.userId
    const config = this._jsonData[account] as ConfigData

    if (config) {
      const value = config[key]
      return value || ''
    }
    else {
      log('no account can not load')
      return ''
    }
  }

  /**
   * 设置全局数据
   * @param {string} key 关键字
   * @param {any}value  存储值
   */
  public setGlobalData(key: string, value: any) {
    this._jsonData[key] = value
    this.save()
  }

  /**
   * 获取全局数据
   * @param {string} key 关键字
   */
  public getGlobalData(key: string) {
    return this._jsonData[key]
  }

  /**
   * 设置用户唯一标示符
   * @param {string} userId 用户唯一标示符
   * @param {any}value  存储值
   */
  public setUserId(userId: string) {
    this._jsonData.userId = userId
    if (!this._jsonData[userId])
      this._jsonData[userId] = {}

    this.save()
  }

  /**
   * 获取用户唯一标示符
   */
  public getUserId() {
    return this._jsonData.userId
  }

  /**
   * 定时存储
   */
  public scheduleSave() {
    if (!this._markSave)
      return

    this.save()
  }

  /**
   * 标记为已修改
   */
  public markModified() {
    this._markSave = true
  }

  /**
   * 保存配置文件
   */
  public save() {
    // 写入文件
    const str = JSON.stringify(this._jsonData)

    // // 加密代码
    // if (cc.game.config["encript"]) {
    //     str = new Xxtea("upgradeHeroAbility").xxteaEncrypt(str);
    // }

    // let zipStr = str;

    this._markSave = false

    if (!sys.isNative) {
      const ls = sys.localStorage
      ls.setItem(this.KEY_CONFIG, str)
      return
    }

    const valueObj: any = {}
    valueObj[this.KEY_CONFIG] = str
  }
}
