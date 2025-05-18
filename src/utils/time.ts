/// 获取当前时间段 早上 |上午 |中午|下午 |晚上
export const getTime = () => {
  let message = ''
  const hour = new Date().getHours()
  if (hour < 7) {
    message = '早上'
  } else if (hour < 11) {
    message = '上午'
  } else if (hour < 13) {
    message = '中午'
  } else if (hour < 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
