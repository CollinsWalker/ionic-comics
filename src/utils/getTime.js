export const getTimeNow = () => {
  let nowDate = new Date()
  let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
    hours: nowDate.getHours(),
    minutes: nowDate.getMinutes(),
    seconds: nowDate.getSeconds()
  }
  let newmonth = date.month > 10 ? date.month : '0' + date.month
  let newday = date.date > 10 ? date.date : '0' + date.date
  let newminutes = date.minutes < 10 ? '0' + date.minutes : date.minutes
  let newseconds = date.seconds < 10 ? '0' + date.seconds : date.seconds
  // 我需要的时间格式为 "yyyy-MM-dd HH:mm:ss" 有不一样的自己拼别的，都是字符串拼接
  return (
    date.year +
    '-' +
    newmonth +
    '-' +
    newday +
    ' ' +
    date.hours +
    ':' +
    newminutes +
    ':' +
    newseconds
  )
}
