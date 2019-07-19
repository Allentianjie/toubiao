import axios from 'axios'
import API from '@/server' // 发起请求的地址
export const ajaxConfig = ({ commit, state }) => {
  return new Promise(function (resolve, reject) {
    console.log(99,state.config.VERSION)
    axios.get(API.CONFIG + '?version=' + state.config.VERSION)
      .then(function (response) {
        if (response.data.status === 1) {
          commit('setToken', response.data.config)
        }
        resolve()
      })
      .catch(function (response) {
        reject(response)
      })
  })
}

// export const initConfig = ({ dispatch, commit }) => {
//     dispatch('ajaxConfig').then((config) => {
//         // commit(types.SET_CONFIG, localStorage.valueOf())
//     })
// }
// // 面包屑导航
// export const breadcrumb = ({ commit }, breadcrumb) => {
//     commit(types.BREADCRUMB, breadcrumb)
// }
