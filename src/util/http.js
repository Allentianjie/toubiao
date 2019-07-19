import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import { Message } from 'iview'

let http = new Vue()
    // axios 配置
    // axios.defaults.timeout = 300000
axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
    //axios.defaults.headers =  'Content-Type','application/json;charset=UTF-8'
let flag = false
    // http request 拦截器
axios.interceptors.request.use(
    config => {

        if (store.state.token) {
            config.headers.Authorization = `Bearer ${store.state.token}`
                //可视化需要
            window.sessionStorage.setItem('nz_access_token', `Bearer ${store.state.token}`);
        } else {
            config.headers = {
                'Accept': "application/json, text/plain, */*",
                'isToken': false,
                'TENANT_ID': '1',
                'Authorization': 'Basic bmVpemhlbjpuZWl6aGVu',
            }
        }

        return config
    },
    err => {
        return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            const status = Number(error.response.status) || 200
            const message = error.response.data.msg
            if (status === 401) {
                store.commit("setToken", null);
                store.commit("setUserPermissions", []);
                Message.error("登录失效！");
                setTimeout(() => {
                    router.push("/");
                }, 500);
                return
            }

            if (status !== 200 || res.data.code === 1) {
                Message.error(message);
                return Promise.reject(new Error(message))
            }
            if (status == 500 || res.data.code === 1) {
                router.push("/");
                Message.error(message);
            }
        }
        return Promise.reject((error.response && error.response.data) || error)
    }
)

export default axios

// axios.create({
//   baseURL: '基础路径',
//   timeout: '连接超时时间(单位毫秒)',
//   heards: {}, // 设置请求头
//   responseType: 'json', // 返回的数据类型
//   params: {}, // 放地址栏后面，作为查询字符串出现
//   transformRequest: [function (data) {
//     console.log(data)
//     // 需要return 数据回去
//   }], // 转换请求数据，只适合PUT POST PATCH
//   transformResponse: [function (data) {
//     console.log(data)
//     // 需要return 数据回去
//   }], // 对请求回来的数据进行处理
//   validateStatus (status) {
//     console.log(status)
//     // return true 能返回
//   }, // 根据状态200，500，404等确定是返回true还是false
//   cancelToken: '配合取消请求使用'
// })
