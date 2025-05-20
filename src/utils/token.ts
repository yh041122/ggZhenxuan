export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN') || ''
}
//清除存储的token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
