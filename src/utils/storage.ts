import { APP } from '@/config/constant'
import { dateFormat } from '@/utils/date'

const APP_VERSION = APP.VERSION
const APP_ID = APP.ID

/**
 * 设置缓存
 * @param key 键名
 * @param data 数据
 * @param expired 持续时间（可选） 秒
 */
function set(key: string, data: any, expired: number = 10 * 60) {
  uni.setStorageSync(
    key + APP_VERSION + APP_ID,
    JSON.stringify({ data, time: +new Date(), expired: expired * 1000 })
  )
}

/**
 * 获取缓存
 * @param key 键名
 */
function get(key: string): any | null {
  try {
    const {
      data,
      time = 0,
      expired = 0,
    } = JSON.parse(uni.getStorageSync(key + APP_VERSION + APP_ID))

    if (!expired) return null

    if (time + expired > +new Date()) return data

    uni.removeStorageSync(key)
    return null
  } catch {
    return null
  }
}

/**
 * 清除缓存
 * @param key 键名
 */
function remove(key: string) {
  return uni.removeStorageSync(key + APP_VERSION + APP_ID)
}

/**
 * 日常清空老缓存，一日一次
 */
function clear() {
  const lastClearTime = uni.getStorageSync('clearDate')
  const toady = dateFormat()

  if (lastClearTime === toady) return

  uni.clearStorageSync()
  uni.setStorageSync('clearDate', toady)
}

export const storage = {
  get,
  set,
  clear,
  remove
}

export default storage
