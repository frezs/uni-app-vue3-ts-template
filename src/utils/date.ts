
/**
 * 格式化时间，默认格式"YYYY-mm-dd"
 * @param val 
 * @param fmt 
 * @returns 
 */
export const dateFormat = (val: number | string = +new Date(), fmt = "YYYY-mm-dd HH:SS") => {
  let ret;
  const date = new Date(val);
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (const k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"),
      );
    }
  }
  return fmt;
};

export const getDateTimes = val => {
  return +new Date(val);
};

export const getTodayTimes = () => {
  // 斜线分割解决ISO获取时间为0的问题
  const val = dateFormat(+new Date(), "YYYY/mm/dd");
  return +new Date(`${val} 00:00:00`);
};

export const getAfterAnyDayTimes = (day = 1) => {
  // 斜线分割解决ISO获取时间为0的问题
  const val = dateFormat(+new Date(), "YYYY/mm/dd");
  return +new Date(`${val} 00:00:00`) + day * 24 * 60 * 60 * 1000;
};

export const getAfterAnyYearDate = (date, year = 1) => {
  const DAY_MS = 1000 * 60 * 60 * 24;
  const currentTimes = date ? getDateTimes(date) : +new Date();
  const yearOfTimes = DAY_MS * year * 365;
  return dateFormat(currentTimes + yearOfTimes);
};

export const date = {
  format: dateFormat,
  getDateTimes,
  getTodayTimes,
  getAfterAnyDayTimes,
  getAfterAnyYearDate
}

export default date;