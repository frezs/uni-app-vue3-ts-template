import { ComponentPublicInstance } from 'vue'
import { useAppStore, usePageStore } from "@/store";

interface routerOpts {
  path: string //当前页面路径，不含前缀 /
  opts?: any //页面参数
  context: ComponentPublicInstance | null
}

/**
 * 路由访问前执行的函数
 * @param _arg
 */
export const useAppRouterBefore = (_arg: routerOpts): void => {
  // 每一个页面在初化前都会执行
  useAppStore().init()
  usePageStore().init()
  console.log('useTmRouterBefore')
}
/**
 * 路由访问后执行的函数
 * @param _arg
 */
export const useAppRouterAfter = (_arg: routerOpts): void => {
  //每一个页面初始后都会执行
}

