import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'
import origanization from './modules/origanization'
import getters from './getters'

Vue.use(Vuex)

let store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    token: '',
    permissions: {},
    userInfo: null,//用户信息
    chooseDept:null,//部门树数据
    chooseDataScopeDept:null,//管辖部门树数据
    userMenus : null, //用户菜单,
    menuUrl : null, //用户菜单
    activeIndex:null,//菜单id
    actives : null, //菜单点击高亮值
    MenuType : null, //currMenuType 去判断要跳转到的 菜单
    activeTags : null, //currMenuType 去判断要跳转到的 菜单
    // 包含所有应用级别状态的对象 （在组件内通过this.$store.state.key值 获取）
  },
  mutations,
  actions,
  modules: {
  // 模块
  origanization
  },
  getters
})

export default store

// 组件中使用vuex的辅助函数 mapState mapGetters mapMutations mapActions
// mutations: {
//   // 唯一改变store状态的事件回调函数 (在组件内通过this.$store.commit("函数名字", {参数})或this.$store.commit({type:'函数名字',参数key:参数Val})触发)
//   // 函数的第一个参数是 state
// },
// actions: {
//   // 包含异步操作的函数，提交mutation改变状态 (在组件内通过this.$store.dispatch("函数名",{参数}) 触发)
//   // 函数的第一个参数是context
// },
// getters: {
//   // 在组件内部获取 store 中状态的函数  第一个参数state 可对state的内容进行处理 (在组件内通过this.$store.getters.函数名获取处理后的返回值)
// }
