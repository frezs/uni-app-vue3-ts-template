import CryptoJS from 'crypto-js'

const key = 'xxxxx' // 定义的 key
const keyHex = CryptoJS.enc.Utf8.parse(key)

export const des = {
  en: (message: string) => {
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.ZeroPadding,
    })
    return encrypted.ciphertext.toString()
  },
}

export default {
  des,
}
