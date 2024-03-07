import { defineStore } from 'pinia'
import router, { Params } from '@/router'
import Auth, { any, getAuth } from '@/config/auth'

export type PageStore = {
  opt: Omit<Params<any>, 'data' | 'type'>
  data: any
  type?: any
  path: string
  authorized: object
}
export const usePageStore = defineStore('__page__', {
  state: (): PageStore => {
    return {
      opt: {},
      data: {},
      type: '' as any,
      path: '',
      authorized: {}
    }
  },
  getters: {},
  actions: {
    init() {
      console.log('page init...')
      const { type, data, ...opt } = router.getCurrentParams() || {}
      this.data = data
      type && (this.type = type as any)
      this.opt = opt
      console.log('page done..')
    },
    getAuth(k: any) {
      const cache = this.getAuthorized(this.type, k)
      if (cache != undefined) return cache
      if (!this.type) this.init()
      const auth = Auth.get(this.type, k) || false
      this.setAuthorized(this.type, k, auth)
      return auth
    },
    getAuthorized(t, r) {
      return this.authorized[`${t}_${r}`]
    },
    setAuthorized(t, r, a) {
      this.authorized[`${t}_${r}`] = a
    }
  }
})
