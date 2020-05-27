import moment from 'dayjs'

// 年月日格式化
const formatYMD = value => {
  return moment(value).format('YYYY/MM/DD')
}
// 年月日格式化
const formatYMDG = value => {
  return moment(value).format('YYYY-MM-DD')
}

// 年月日时分 格式化
const formatYMDHM = value => {
  return moment(value).format('YYYY/MM/DD HH:mm')
}

// 年月日时分秒 格式化
const formatYMDHMS = value => {
  return moment(value).format('YYYY/MM/DD HH:mm:ss')
}

// 新的年月日转换
const formatArrDateYMD = value => {
  if (value) {
    if (value.length >= 3) {
      return `${value[0]}-${value[1] >= 10 ? value[1] : "0" + value[1]}-${
        value[2] >= 10 ? value[2] : "0" + value[2]
        }`;
    }

    return values.join(".");
  }

  return value;
}

// 时间戳转换
export function fromadate(row) {
  let date = new Date(row.createTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y+M+D+h+m+s;
}

const formatArrDateYMDHMS = value => {
  if (value) {
    if (value.length >= 5) {
      return `${value[0]}-${value[1] >= 10 ? value[1] : "0" + value[1]}-${
        value[2] >= 10 ? value[2] : "0" + value[2]
        } ${
        value[3] >= 10 ? value[3] : "0" + value[3]
        }:${
        value[4] >= 10 ? value[4] : "0" + value[4]
        }:${
          value[5] ? (value[5] >= 10 ? value[5] : "0" + value[5]) : 
          "00"
        }`;
    }

    return values.join(".");
  }

  return value;
}

// 过滤所有HTML标签
const removeHTMLTag = str => {
  if (str) {
    str = str.replace(/<\/?[^>]*>/g, '') //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n') //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/ /gi, '') //去掉
    return str
  } else {
    return str
  }
}

// 秒转时分秒
const formatSeconds = value => {
  // 秒
  let secondTime = parseInt(value)
  // 分
  let minuteTime = 0
  // 小时
  let hourTime = 0
  if (secondTime > 60) {
    // 如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60)
    // 获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60)
    // 如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60)
      // 获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60)
    }
  }
  let result = '' + (parseInt(secondTime) >= 10 ? parseInt(secondTime) : '0' + parseInt(secondTime))

  if (minuteTime > 0) {
    result = '' + (parseInt(minuteTime) >= 10 ? parseInt(minuteTime) : '0' + parseInt(minuteTime)) + ':' + result
  } else {
    result = '00:' + result
  }

  if (hourTime > 0) {
    result = '' + (parseInt(hourTime) >= 10 ? parseInt(hourTime) : '0' + parseInt(hourTime)) + ':' + result
  }

  return result
}

const filterSqlStr = value => {
  var sqlStr = sql_str().split(',')
  var flag = false

  for (var i = 0; i < sqlStr.length; i++) {
    if (value.toLowerCase().indexOf(sqlStr[i]) != -1) {
      flag = true
      break
    }
  }
  return flag
}

/* eslint-enable */

export {
  formatYMD, formatYMDG, formatYMDHM, formatYMDHMS, formatArrDateYMD,
  formatArrDateYMDHMS, removeHTMLTag, formatSeconds, filterSqlStr
}
