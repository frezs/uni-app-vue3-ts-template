const json = require('../src/pages.json')
const fs = require('fs')
const path = require('path')

function ensureLeading(inputString, comparison = '/') {
  if (inputString.charAt(0) !== comparison) {
    return comparison + inputString
  }
  return inputString
}

const generateData = (list, key) => {
  let tmp = {}
  list.forEach(page => {
    if (!page) return
    const k = page.path.split('/')
    k.shift()
    tmp[k.join('.')] = ensureLeading(page.path)
  })
  return `const ${key} = ${JSON.stringify(tmp, null, 2)} \n`
}

const attr = {
  pages: 'mainPackage',
  subPackage: 'subPackage',
}

// 生成数组
const arr = Object.keys(attr).map(k => generateData(json[k], attr[k]))

// 将生成的数据转换为字符串
const content = arr.join('') + `
export const pages = {
  ...mainPackage,
  ...subPackage,
}

export default pages`

// 将数据写入到指定的文件中
const filePath = path.join(__dirname, '../src/router/pages.ts')

fs.writeFileSync(filePath, content, 'utf8')
