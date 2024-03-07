import { defineStore } from 'pinia'
import sys from '@/utils/sys'
import router from '@/router'

type QRCodeResult = any

type IUseScanStore = {
  result: QRCodeResult
  raw: string
}

export const useScanStore = defineStore('__scan__', {
  state: (): IUseScanStore => {
    return {
      result: {},
      raw: ''
    }
  },
  getters: {},
  actions: {
    init() {
      console.log('scan init...')
    },
    async scan(validate?: (val: any) => Promise<any>) {
      try {
        const res = await this.onScan()
        // 扫码判断逻辑
        validate && await validate(res)
        // 存入结果
        this.setResult(JSON.parse(res))
        return this.result
      } catch (err: any) {
        Promise.reject(err?.message)
        return { errMsg: err?.message, raw: this.raw }
      }
    },
    onScan() {
      return new Promise<string>(async (resolve, reject) => {
        try {
          // 扫码逻辑
          console.log('===========扫码')
          // // #ifdef APP-NVUE
          // router.navigateTo('index.scan')
          // // #endif

          // #ifdef H5
          const { content, confirm, cancel } = await sys.showModalScan()
          console.log('===========模拟扫码', content)
          confirm && (this.setRawData(content))
          if (cancel) {
            sys.showToast('取消扫码操作!')
            reject(false)
          }
          // #endif

          // #ifndef H5
          const { errMsg, result } = await sys.scanCode()
          result && (this.setRawData(result))
          console.log('===========扫码', result)
          if (errMsg?.includes('fail')) {
            sys.showToast(errMsg)
            reject(false)
          }
          // #endif
          resolve(this.getRawData())
        } catch (err) {
          sys.showToast('扫码错误')
          reject(err)
        }
      })
    },
    getResult() {
      return { ...this.result }
    },
    setResult(data: any) {
      this.result = data
    },
    getRawData() {
      return this.raw
    },
    setRawData(data: any) {
      this.raw = data
    },
    sanToEvent(cb?: () => Promise<any>) {
      if (!this.result?.id) {
        sys.showToast('扫码错误')
        return
      }
      return router.navigateTo('index.home', {})?.then(cb)
    }
  }
})
