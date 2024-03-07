import { useUserStore } from '@/store'
import router from '@/router'
import { getConf, IConf } from '@/config/index'

const AuthConf: IConf = {}
let userType: number[] | null = null

export function getAuth(t: any, r: any) {
  console.log('===================getAuth')
  if (userType == null) userType = useUserStore().userInfo?.type ?? null as any
  if (!t && !r && userType == null) return false
  const authConf = getConf(AuthConf, t as any)
  const getOne = (e: any) => authConf[r]?.includes(String(e))
  return userType?.some(getOne)
}

export function getCurrentAuth(r: any) {
  console.log('===================getCurrentAuth')
  return getAuth(router.getCurrentParams()?.type || undefined, r)
}

export const Auth = {
  get: getAuth,
  cur: getCurrentAuth
}

export default Auth
