import { createStore } from 'vuex'
import ModuleUser from './user.js'

export default createStore({
  // 存储静态数据
  state: {
  },
  // 对获取state的计算数据，不允许修改 getters(访问)
  getters: {
  },
  // 对state数据进行修改，不支持异步操作 mutations(改变)
  mutations: {
  },
  // 对state的各种操作
  actions: {
  },
  // 对state进行
  modules: {
    user: ModuleUser
  }
})
