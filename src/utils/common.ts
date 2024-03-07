// num为传入的值，n为保留的小数位
export const formatFloat = (num: number | string, n: number) => {
  let f = parseFloat(num as string)
  if (Number.isNaN(f)) {
    return false
  }
  f = Math.round((num as number) * Math.pow(10, n)) / Math.pow(10, n) // n 幂
  return f
}

let timerId: any = NaN
export function debounce(func: Function, wait = 500, immediate = false) {
  // 清除定时器
  if (!isNaN(timerId)) clearTimeout(timerId)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timerId
    timerId = setTimeout(() => {
      timerId = NaN
    }, wait)
    if (callNow) typeof func === 'function' && func()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timerId = setTimeout(() => {
      typeof func === 'function' && func()
    }, wait)
  }
}
