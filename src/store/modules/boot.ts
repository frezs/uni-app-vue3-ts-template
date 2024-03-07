import { useUserStore } from '@/store'
import { defineStore } from 'pinia'
import router from '@/router'
import storage from '@/utils/storage'
import { BOOT } from '@/config/constant'

export const useAppStore = defineStore('__app__', {
  state: () => {
    return {
      params: {} as any,
      timeout: 1000,
      bootInfo: {},
      firstStartup: false,
      logs: []
    }
  },
  getters: {},
  actions: {
    init(data: any = null) {
      console.log('app init...')
      if (data != null) this.params = router.parse(data)
      this.firstStartup = true
      // 初始化
      this.bootInfo = storage.get(BOOT.Info)
      useUserStore().init()
    },
    async bootstrap() {
      if (this.timeout) {
        this.delayStart()
        return
      }
      console.log('app bootstrap...')
      const userStore = useUserStore()
      try {
        // await userStore.refresh()
        router.redirectTo('index.home')
      } catch {
        router.redirectTo('index.login')
      }
    },
    delayStart(num: number = 0) {
      console.log('app delayStart...')
      setTimeout(this.bootstrap, num || this.timeout)
      // 立即将延时置零
      this.timeout = 0
    },
    syncBoot(arg: any) {
      if (!useUserStore().token) {
        const { path, opts: options } = arg
        const redirect = path.charAt(0) == '/' ? path : `/${path}`
        if (router.whitelist.includes(redirect)) return
        router.redirectTo('index.login', { redirect, options })
      }
    }
  }
})
