export const charReplace = (str: string, find: string, ret: string) => str && str.replace(find, ret)
export const pathConvert = charReplace
export const undefinedToStr = (s: undefined) => (s === undefined || s == 'undefined' ? '' : s)

export const char = {
  replace: charReplace,
  pathConvert,
  undefinedToStr,
}

export default char
