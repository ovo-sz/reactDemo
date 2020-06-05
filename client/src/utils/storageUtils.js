/*
进行local数据存储管理的工具模块
 */
import store from 'store'
export default {
  /*保存user*/
  setUser (user,type) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(user,type)
  },

  
  /*读取user*/
  getUser (user) {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(user);
  },

  /*删除user*/
  removeUser (user) {
    // localStorage.removeItem(USER_KEY)
    store.remove(user)
  }
}