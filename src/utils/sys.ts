import { index } from "@/theme";

let timer: any = null
const timeout = 5 * 1000

export const showToast = (title: string = '') => uni.showToast({ title, icon: 'none' })
export const showToastSuccess = (title: string = '成功') =>
  uni.showToast({ title, icon: 'success' })
export const showToastLoading = (title: string = '加载中...') =>
  uni.showToast({ title, icon: 'loading' })
export const showToastError = (title: string = '出错啦!') => uni.showToast({ title, icon: 'error' })

export const showModal = (opt: UniApp.ShowModalOptions) => uni.showModal({
  ...opt,
  confirmColor: index.primary,
  cancelColor: index['grey-darken-2']
})

export const showModalInput = (opt: UniApp.ShowModalOptions) => showModal({
  title: '请输入内容',
  placeholderText: '请输入',
  ...opt,
  editable: true,
})

export const showModalScan = () => showModal({
  title: '请输入扫码识别后内容',
  placeholderText: '请输入',
  editable: true,
})

export const showLoading = (title: string = '') => {
  uni.showLoading({ title })
  timer = setTimeout(() => {
    uni.hideLoading()
    timer && clearTimeout(timer)
  }, timeout)
}
export const hideLoading = () => {
  uni.hideLoading()
  timer && clearTimeout(timer)
}

export const navigateTo = (opt: UniApp.NavigateToOptions) => {
  uni.navigateTo(opt)
}

function onClickDebug(val) {
  console.log('===================onClickDebug', val)
}

/** 下载封装 */
export const downloadFile = (url: string) => {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url,
      success: ({ tempFilePath }) => {
        resolve(tempFilePath)
      },
      fail: err => {
        reject(err)
      },
    })
  })
}

/** 批量下载 */
export const batchDownloadFile = (filesUrl: string[]): Promise<any[]> => {
  const ret = filesUrl.map(url => downloadFile(url))
  return Promise.all(ret)
}

/** 保存图片到相册 */
export const saveImageToPhotosAlbum = (filePath: string) => {
  return new Promise((resolve, reject) => {
    uni.saveImageToPhotosAlbum({
      filePath,
      success: () => {
        resolve(true)
      },
      fail: err => {
        reject(err)
      },
    })
  })
}

/** 批量保存图片到相册 */
export const batchSaveImageToPhotosAlbum = (filesPath: string[]): Promise<any[]> => {
  const ret = filesPath.map(path => saveImageToPhotosAlbum(path))
  return Promise.all(ret)
}

/** 保存视频到相册 */
export const SaveVideoToPhotosAlbum = (filePath: string) => {
  return new Promise((resolve, reject) => {
    uni.saveVideoToPhotosAlbum({
      filePath,
      success: () => {
        resolve(true)
      },
      fail: err => {
        reject(err)
      },
    })
  })
}

/** 批量保存图片到相册 */
export const batchSaveVideoToPhotosAlbum = (filesPath: string[]): Promise<any[]> => {
  const ret = filesPath.map(path => SaveVideoToPhotosAlbum(path))
  return Promise.all(ret)
}

/** 获取元素对象 */
export const createSelectorQuery = (self: any, selector: string, all?: any): Promise<any> => {
  return new Promise(resolve => {
    uni.createSelectorQuery()
      .in(self)
      [all ? 'selectAll' : 'select'](selector)
      .boundingClientRect(rect => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect)
        }
      })
      .exec()
  })
}

export const getRect = createSelectorQuery

/** 获取多个元素 */
export const getRectList = (self: any, list: string[]): Promise<any[]> => {
  const eList = [] as any
  for (const key of list) {
    eList.push(getRect(self, key))
  }
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Promise.all(eList)
      resolve(res)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

/** 跳转页面位置 */
export const pageScrollTo = (val: number, duration = 0) => {
  // 一键回到顶部
  if (uni.pageScrollTo) {
    uni.pageScrollTo({
      scrollTop: val,
      duration,
    })
  } else {
    sys.showModal({
      title: '提示',
      content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
    })
  }
}

/** 提示消息 */
export const showModalDebug = (obj: any, title = '提示') => {
  return new Promise((resolve, reject) => {
    sys.showModal({
      title,
      content: JSON.stringify(obj),
      success: () => {
        resolve(true)
      },
      fail: err => {
        reject(err)
      },
    })
  })
}


/**
 *  扫码
 */
export const scanCode = () => {
  return new Promise<UniApp.ScanCodeSuccessRes>((resolve, reject) => {
    uni.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: (res) => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
    })
  })
}
export const sys = {
  showToast,
  showToastSuccess,
  showToastLoading,
  showToastError,
  showLoading,
  hideLoading,
  navigateTo,
  onClickDebug,
  showModal,
  scanCode,
  showModalInput,
  showModalScan,
}

export default sys
