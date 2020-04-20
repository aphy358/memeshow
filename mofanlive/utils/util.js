
function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const timeCountDown = (timeStamp = 0) => {
  let res = ''

  // 过期时间与当前时间戳的差额
  let timeDistance = timeStamp - (+new Date);

  // 毫秒转换成秒
  timeDistance = Math.floor(timeDistance / 1000)

  let days = Math.floor(timeDistance / (24 * 60 * 60))
  timeDistance -= days * (24 * 60 * 60)

  let hours = Math.floor(timeDistance / (60 * 60))
  timeDistance -= hours * (60 * 60)

  let minutes = Math.floor(timeDistance / 60)
  timeDistance -= minutes * 60

  let seconds = timeDistance

  if (days) {
    res = days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'

  } else {
    if (hours) {
      res = hours + '小时' + minutes + '分钟' + seconds + '秒'

    } else {
      if (minutes) {
        res = minutes + '分钟' + seconds + '秒'

      } else {
        res = seconds + '秒'
      }
    }
  }

  return res
}


module.exports = {
  formatDate,
  formatTime,
  timeCountDown,
}
