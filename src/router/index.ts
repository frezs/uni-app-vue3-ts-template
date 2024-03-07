// import { DeepReadonly, readonly } from 'vue'
import pages from './pages'
import Base64 from '@/utils/base64'
import { isEmptyObject, isString } from '@/utils'

export * from '@/hooks/usePage'

// 白名单
export const whitelist = [ pages['index.index'], pages['index.login'], pages['index.scan'] ]

export type PageNames = keyof typeof pages

export type Params<T> = {
  type?: any
  data?: ObjectType<T>
  to?: keyof typeof pages
  from?: keyof typeof pages
  redirect?: string
  options?: Object
  [x: string]: any
}

export type ObjectType<T> = T extends PageNames ? Params<T> : never

const routeStore = {} as Record<PageNames, unknown>

export const getRouteParams = <T extends PageNames>(page: T) => {
  return (routeStore[page] || {}) as ObjectType<T>
  // return readonly(p) as DeepReadonly<ObjectType<T>>
}

export function getCurrentParams() {
  let pages = getCurrentPages().pop()
  const route =  pages?.route ?? ""
  if (!route) return
  return getRouteParams(getPageName(route) as PageNames)
}

let navigateLock = false
const navigateTo = <T extends PageNames>(
  page: T,
  params?: ObjectType<T>
): Promise<any> | undefined => {
  console.log('===============navigateTo', page, params)
  if (navigateLock) return
  const event = `${ Math.floor(Math.random() * 1000) + new Date().getTime() }` // 生成唯一事件名
  navigateLock = true
  routeStore[page] = params
  uni.navigateTo({
    url: `${ pages[page] }?event=${ event }`,
    complete() {
      navigateLock = false
    },
    fail(err) {
      throw Promise.reject(err)
    }
  })

  return new Promise<any>(
    (resolve, reject) => (uni.$once(event, resolve), uni.$once(event, reject))
  )
}

const redirectTo = <T extends PageNames>(page: T, params?: ObjectType<T>) => {
  routeStore[page] = params
  let query = ''
  if (params && !isEmptyObject(params)) {
    query = Object.keys(params)
      .map(k => `${ k }=${ params[k] }`)
      .join('&')
    query && (query = `?${ query }`)
  }
  uni.redirectTo({ url: `${ pages[page] }${ query }` })
}

const reLaunch = <T extends PageNames>(page: T, params?: ObjectType<T>) => {
  routeStore[page] = params
  uni.reLaunch({ url: pages[page] })
}

const switchTab = <T extends PageNames>(page: T, params?: ObjectType<T>) => {
  routeStore[page] = params
  uni.switchTab({ url: pages[page] })
}

interface BackParams {
  /** 返回页面层级 */
  delta?: number
  /** 返回携带的数据 */
  data?: any
}

const navigateBack = ({ delta, data }: BackParams = { delta: 1, data: null }) => {
  if (navigateLock) return
  const currentRoute = getCurrentPages<any>().pop()
  const { event } = currentRoute.$page?.options || {}
  console.log('===========navigateBack', event)
  event && uni.$emit(event, data)
  navigateLock = true
  uni.navigateBack({
    delta,
    complete() {
      navigateLock = false
    }
  })
}

export const getPageName = (value: string): PageNames | undefined => {
  const keys = Object.keys(pages) as PageNames[]
  return keys.find(key => pages[key].includes(value));
}

/**
 * 解析Base64编码的参数
 * @param params
 * @return any
 */
const parse = (params: any) => {
  if (isString(params)) return JSON.parse(Base64.decode(params))
  console.log(!isEmptyObject(params))
  // return JSON.parse(Base64.encode(params.params))
}

/**
 * 参数编码为Base64
 * @param object
 * @return string
 */
const stringify = (obj: any) => {
  return Base64.encode(JSON.stringify(obj))
}

const authorized = () => {
  const { redirect, options } = router.getRouteParams('index.login')
  const pageName = redirect && router.getPageName(redirect)
  if (redirect && pageName) {
    router.redirectTo(pageName, options)
    return
  }
  router.redirectTo('index.home')
}

const goHome = () => router.redirectTo('index.home')
const goLogin = () => router.redirectTo('index.login')

const router = {
  navigateTo,
  redirectTo,
  reLaunch,
  switchTab,
  navigateBack,
  getRouteParams,
  getCurrentParams,
  getPageName,
  parse,
  stringify,
  goHome,
  goLogin,
  authorized,
  whitelist,
  routeStore
}

export default router
