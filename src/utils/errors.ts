export const toast = title => uni.showToast({ title, duration: 2000, icon: 'error' })

export const showToast = ({ code, msg } = {} as any) => {
  // 有消息
  if (msg) {
    toast(msg)
    return
  }
  // 根据code匹配
  if (typeof code == 'string') code = Number(code)
  switch (code) {
    case 0:
      uni.showLoading()
      uni.hideLoading()
      toast('登录失败')
      break
    default:
      return Promise.reject(msg)
  }
}

const netFailed = () => toast('网络加载失败')

export const errors = {
  showToast,
  netFailed,
}

export default errors
