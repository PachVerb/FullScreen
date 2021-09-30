export function fileToBase64(file) {
  return new Promise((reslove, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
          reslove(reader.result)
      }
      reader.onerror = function(e) {
          reject(e)
      }
  })

}
//格式化时间
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
      return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
      date = time
  } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
  }
  const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
          value = '0' + value
      }
      return value || 0
  })
  return time_str
}
//设置距今时间
export function etLastOrNextFewDateBy(time,num){
  let date
  if (typeof time === 'object') {
      date = time
  } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
  }
  const format =  '{y}-{m}-{d} {h}:{i}:{s}'
  const formatNextObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate()-num,
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
  }
  const time_strNext = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatNextObj[key]
      if (result.length > 0 && value < 10) {
          value = '0' + value
      }
      return value || 0
  })
  return time_strNext

}
//周一至今的时间范围展示
// export function etLastOrNextFewDateBy() {
//     var nowTemp = new Date(); //当前时间
//     var oneDayLong = 24 * 60 * 60 * 1000; //一天的毫秒数
//     var c_time = nowTemp.getTime(); //当前时间的毫秒时间
//     var c_day = nowTemp.getDay() || 7; //当前时间的星期几
//     var m_time = c_time - (c_day - 1) * oneDayLong; //当前周一的毫秒时间
//     var monday = new Date(m_time); //设置周一时间对象
//     var m_year = monday.getFullYear();
//     var m_month = monday.getMonth() + 1;
//     var m_date = monday.getDate();
//     return m_year + "-" + m_month + "-" + m_date + " 06:00:00"
//     //console.log(timetotal); //周一的年月日
// }
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp

      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last)
      } else {
          timeout = null
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
              result = func.apply(context, args)
              if (!timeout) context = args = null
          }
      }
  }

  return function(...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
          result = func.apply(context, args)
          context = args = null
      }

      return result
  }
}


/**
 * 使用vw设置尺寸
 * @size number vw尺寸
 * @usePx boolean 是否拼接“px” 
*/
export function vwSize(size, usePx) {
    const w_width = window.innerWidth;
    return usePx ? w_width / 100 * size + 'px' : w_width / 100 * size;
}
