import { TIME, USER } from '@/config/constant'
import storage from '@/utils/storage'
import { defineStore } from 'pinia'
import sys from '@/utils/sys'
import { useAppStore, usePageStore } from '@/store'
import router from '@/router'

interface IUser {
  token: string
  type: any[]
}

interface IAccount {
  user: string
  password: string
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      setting: {
        remembered: false
      },
      logging: false,
      userInfo: {} as IUser,
      account: {
        user: '',
        password: ''
      } as IAccount
    }
  },
  getters: {},
  actions: {
    init() {
      console.log('userStore init...')
      this.userInfo = storage.get(USER.Info) || {}
      this.account = storage.get(USER.Account) || { userAcc: '', userPassword: '' }
      this.setting = storage.get(USER.Setting) || { remembered: false }
      this.token = this.userInfo?.token || ''
    },
    setUserInfo(data: IUser) {
      this.userInfo = data
      storage.set(USER.Info, data, 30 * TIME.DAY_SECOND)
    },
    async getUserInfo(): Promise<IUser | undefined> {
      if (this.logging) return
      if (this.userInfo) return this.userInfo
      let ret = storage.get(USER.Info)
      if (ret) {
        this.userInfo = ret
        return this.userInfo
      }
      if (!this.logging && this.setting?.remembered) {
        await this.refresh()
      }
      return this.userInfo
    },
    refresh() {
      return new Promise(async (resolve, rejects) => {
        if (!this.account?.user || !this.account?.password) {
          return rejects(false)
        }
        try {
          await this.login(this.account)
          resolve(true)
        } catch {
          console.log('catch refresh')
          rejects(false)
        }
      })
    },
    login(user: IAccount) {
      this.logging = true
      sys.showLoading()
      this.account = user
      return new Promise(async (resolve, rejects) => {
        try {
          const res: any = {} //= await login({ ...user })
          console.log('login done', res)
          this.setUserInfo(res)
          this.logging = false
          this.cacheAccount()
          sys.hideLoading()
          resolve(res)
        } catch (error) {
          sys.hideLoading()
          rejects(error)
        }
      })
    },
    cacheAccount() {
      if (this.setting?.remembered) {
        storage.set(USER.Account, this.account, 30 * TIME.DAY_SECOND)
        storage.set(USER.Setting, this.setting, 30 * TIME.DAY_SECOND)
      } else {
        this.account = {} as any
        storage.remove(USER.Account)
      }
    },
    clear() {
      this.userInfo = {} as any
      this.token = ''
      storage.remove(USER.Info)
      storage.remove(USER.Account)
      storage.remove(USER.Setting)
    },
    remembered(bol: boolean) {
      this.setting.remembered = bol
    },
    logout() {
      this.clear()
      useAppStore().$reset()
      usePageStore().$reset()
      router.redirectTo('index.index')
    },
    hasType(t: number) {
      return this.userInfo.type.includes(t)
    },
    async getUsesToken() {
      if (this.token) return this.token
      await this.getUserInfo()
      return this.token
    }
  }
})
