import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from './util/http'
import echarts from 'echarts'
import * as orignAxios from 'axios'
import ElementUI from 'element-ui';
import {Loading} from 'element-ui';
import CryptoJS from "crypto-js";
import iView from 'iview'
import qs from "qs"
import VueI18n from 'vue-i18n';
import {messages} from './components/common/i18n';
import AsyncComputed from "vue-async-computed"
Vue.use(AsyncComputed)
import '@/assets/css/color.less'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.less'
import '@/assets/css/main_t.less'
import '@/assets/css/index.less'
import '@/assets/css/theme.less'
// import './assets/css/icon.css'; // 刘倩注销
import './assets/css/font.css';
import './components/common/directives';
import "babel-polyfill";
import {NeizhenUtil, chunkSize} from "./util/datarouters";

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

// 添加全局事件监控方法
Vue.prototype.resetSetItem = function (key, newVal) {
    if (key === 'url') {
        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
            setItem: function (k, val) {
                localStorage.setItem(k, val);

                // 初始化创建的事件
                newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
                // 派发对象
                window.dispatchEvent(newStorageEvent)
            }
        };
        return storage.setItem(key, newVal);
    }
};

Vue.prototype.$Get = function (_url, _params, _successFunction, dom) {
    let color = "rgba(0, 0, 0, 0.1)";
    if (typeof (dom) == "undefined") {
        dom = "body";
        color = "rgba(0, 0, 0, 0.1)";
    }
    let loadingInstance = Loading.service({
        lock: true,
        background: color,
        target: document.querySelector(dom)
    });
    axios.get(_url, {params: _params})
        .then((response) => {
            loadingInstance.close();
            return _successFunction(response.data);
        }).catch(error => {
        console.log(error);
        loadingInstance.close()
    })
};
Vue.prototype.$Put = function (_url, _params, _successFunction, dom, stringfy) {
    let color = "rgba(0, 0, 0, 0.1)";
    if (typeof (dom) == "undefined") {
        dom = "body";
        color = "rgba(0, 0, 0, 0.1)";
    }
    let loadingInstance = Loading.service({
        lock: true,
        background: color,
        target: document.querySelector(dom)
    });
    var mparams = stringfy ? qs.stringify(_params, {indices: false}) : _params;
    axios.put(_url, mparams)
        .then((response) => {
            loadingInstance.close()
            return _successFunction(response.data)
        }).catch(error => {
        console.log("put error", error);
        loadingInstance.close()
    })
};
Vue.prototype.$Delete = function (_url, _params, _successFunction, dom) {
    let color = "rgba(0, 0, 0, 0.1)";
    if (typeof (dom) == "undefined") {
        dom = "body";
        color = "rgba(0, 0, 0, 0.1)";
    }
    let loadingInstance = Loading.service({
        lock: true,
        background: color,
        target: document.querySelector(dom)
    });
    axios.delete(_url, {params: _params})
        .then((response) => {
            loadingInstance.close()
            return _successFunction(response.data)
        }).catch(error => {
        loadingInstance.close()

    })

};
Vue.prototype.$DeleteData = function (_url, _params, _successFunction, dom) {
    let color = "rgba(0, 0, 0, 0.1)";
    if (typeof (dom) == "undefined") {
        dom = "body";
        color = "rgba(0, 0, 0, 0.1)";
    }
    let loadingInstance = Loading.service({
        lock: true,
        background: color,
        target: document.querySelector(dom)
    });
    axios.delete(_url, {data: _params})
        .then((response) => {
            loadingInstance.close()
            return _successFunction(response.data)
        }).catch(error => {
        loadingInstance.close()

    })

};
Vue.prototype.$Post = function (_url, _params, _successFunction, dom, stringfy) {
    let color = "rgba(0, 0, 0, 0.1)";
    if (typeof (dom) == "undefined") {
        dom = "body";
        color = "rgba(0, 0, 0, 0.1)";
    }
    let loadingInstance = Loading.service({
        lock: true,
        background: color,
        target: document.querySelector(dom)
    });
    var mparams = stringfy ? qs.stringify(_params, {indices: false}) : _params;
    axios.post(_url, mparams)
        .then((response) => {
            loadingInstance.close();
            return _successFunction(response.data);
        }).catch(error => {
        loadingInstance.close()
        return _successFunction(error)
    })
};

// 文件上传, 整个文件上传
Vue.prototype.$Upload = function (_url, _params, _files, _successfunction, dom) {
    let color = "rgba(0, 0, 0, 0.1)";
    if (typeof (dom) == "undefined") {
        dom = "body";
        color = "rgba(0, 0, 0, 0.1)";
    }
    let loadingInstance = Loading.service({
        lock: true,
        background: color,
        target: document.querySelector(dom)
    });
    // debugger
    let formData = new FormData();

    let config = {
        headers: {
            //'Content-Type': 'multipart/form-data;boundary=---------------' + new Date().getTime(),
            'Authorization': `Bearer ${store.state.token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    if (_params) {
        for (var x in _params) {
            formData.append(x, _params[x]);
        }
    }
    if (_files) {
        _files.forEach((e, index) => {
            formData.append("file[" + (index + 1) + "]", e);
        })
    }

    orignAxios.post(_url, formData, config).then(resp => {
        loadingInstance.close();
        return _successfunction(resp.data);
    }).catch(error => {
        loadingInstance.close()
        return _successfunction(error)
    });

};


// 文件切片上传
/**
 * 文件切片上传
 * @param _url 上传地址
 * @param _params  上传参数
 * @param _file    上传文件
 * @param _fileid  上传文件id
 * @param _startindex 开始切片
 * @param _progress    进度方法function(total, current)
 * @param _successfinish 成功后回调
 * @param _fail          失败后回调
 *
 * */

Vue.prototype.$ChunkUpload = function (_url, _params, _file, _fileid, _startindex, _progress, _successfinish, _fail) {

    var fileslice = [];

    var rejectFlag = false;

    var uploadindex = 0;

    // debugger
    if (_file.size > chunkSize) {
        var chunk = _file.size % chunkSize > 0 ? Math.ceil(_file.size / chunkSize) : Math.floor(_file.size / chunkSize);
        var readchunksize = 0;
        for (let i = 0; i < chunk; i++) {
            if (readchunksize + chunkSize > _file.size) {
                fileslice.push(_file.slice(readchunksize, _file.size));
            } else {
                fileslice.push(_file.slice(readchunksize, readchunksize + chunkSize));
            }

            readchunksize += chunkSize;

        }


    } else {
        fileslice.push(_file);
    }


    var chunkupload = (chunkslice, index) => {

        let config = {
            headers: {
                //'Content-Type': 'multipart/form-data;boundary=---------------' + new Date().getTime(),
                'Authorization': `Bearer ${store.state.token}`,
                'Content-Type': 'multipart/form-data'
            },
            timeout: 1000 * 60 * 2
        };

        let formData = new FormData();
        if (!NeizhenUtil.isEmpty(_params)) {
            for (var x in _params) {
                formData.append(x, _params[x]);
            }
        }
        formData.append("randomName", _fileid);
        formData.append("chunk", index);
        formData.append("file", chunkslice);
        return new Promise((resolve, reject) => {

            orignAxios.post(_url, formData, config).then(resp => {
                console.log("finishIndex", index);
                if (resp.data) {
                    uploadindex++;
                    if (NeizhenUtil.isFunction(_progress)) {
                        _progress.call(this, fileslice.length, uploadindex);
                    }

                    resolve(resp.data);
                } else {
                    _fail.call(this, _fileid, index);
                    reject(resp.data);
                }

            }).catch(error => {
                _fail.call(this, _fileid, index);
                reject(error);

            });

        });

    };

    // debugger

    var mall = [];
    var finishchunk = false;
    for (let i = _startindex; i < fileslice.length; i++) {

        finishchunk = false;
        var p = chunkupload(fileslice[i], i);
        mall.push(p);

    }

    orignAxios.all(mall).then((resolve) => {
        _successfinish.call(this, _fileid);
    }).catch((error) => {
        console.log(error);

    });
};

Vue.prototype.$ChunkUploadGet = function (_url, _params) {


    let config = {
        headers: {
            //'Content-Type': 'multipart/form-data;boundary=---------------' + new Date().getTime(),
            'Authorization': `Bearer ${store.state.token}`,
            'Content-Type': 'multipart/form-data'
        },
        timeout: 1000 * 60 * 5
    };


    return orignAxios.get(_url, {params: _params}, config);

};
Vue.prototype.$ChunkDownload = function (_url, _params, _fileid, _startindex, _total, _progress, _successfinish, _fail) {

    var chunkdownload = (chunkslice, index) => {

        let config = {
            headers: {
                //'Content-Type': 'multipart/form-data;boundary=---------------' + new Date().getTime(),
                'Authorization': `Bearer ${store.state.token}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        return new Promise((resolve, reject) => {
            let param = NeizhenUtil.isEmpty(_params) ? {} : NeizhenUtil.deepClone(_params);
            param.fileid = _fileid;
            param.index = index;
            orignAxios.post(_url, param, config).then(resp => {
                if (resp.data) {
                    resolve(resp.data);
                } else {
                    reject(resp.data);
                }

            }).catch(error => {
                reject(error);
            });

        })

    };

};

Vue.prototype.$DownLoad = function (_url, _param) {
    let config = {
        headers: {
            //'Content-Type': 'multipart/form-data;boundary=---------------' + new Date().getTime(),
            'Authorization': `Bearer ${store.state.token}`,
            'Content-Type': 'application/octet-stream;charset=utf-8'

        },
        'responseType': 'blob'
    };

    orignAxios
        .post(_url, _param, config)
        .then(function (response) {
            console.log("download", response);

            var headers = response.headers;
            var disposition = headers["content-disposition"];
            var fname = disposition.substr(disposition.indexOf("=") + 1, disposition.length - 1);

            var blob = new Blob([response.data], {type: headers['content-type']});
            var downloadElement = document.createElement('a');
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = decodeURIComponent(fname); //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象


        })
        .catch(function (error) {
            console.log(error);
        });

};

Vue.prototype.$mask = function (dom) {
    // debugger
    let color = "rgba(0, 0, 0, 0.1)";
    if (typeof (dom) == "undefined") {
        dom = document.querySelector("body");
        color = "rgba(0, 0, 0, 0.1)";
    }
    let loadingInstance = Loading.service({
        lock: true,
        background: color,
        target: dom//document.querySelector(dom)
    });

    return loadingInstance;
};

Vue.prototype.$Promise = function (metadata, _params, stringfy) {
    var lasturl = "/admin";
    if (metadata.restful == null || metadata.restful == false) {
        lasturl += metadata.url;
    } else {

        let restfulparams = metadata.restfulparams;
        lasturl += metadata.url;
        restfulparams.forEach((value, index) => {
            lasturl += "/" + params[value];
        });
    }

    let config = {
        headers: {
            //'Content-Type': 'multipart/form-data;boundary=---------------' + new Date().getTime(),
            'Authorization': `Bearer ${store.state.token}`
        }
    };

    return new Promise((resolve, reject) => {
        orignAxios({
            url: lasturl,
            method: metadata.type,
            data: stringfy ? qs.stringify(_params, {indices: false}) : _params,
            config: config
        }).then((resp) => {
            resolve(resp);
        }).catch((error) => {
            reject(error);
        })
    });

};

// 异步处理数据
Vue.prototype.$AsyncDealData = function (metadata, params, successfunction, stringfy) {
    var lasturl = "/admin";
    if (metadata.restful == null || metadata.restful == false) {
        lasturl += metadata.url;
    } else {

        let restfulparams = metadata.restfulparams;
        lasturl += metadata.url;
        restfulparams.forEach((value, index) => {
            lasturl += "/" + params[value];
        });
    }

    if (metadata.type == "post") {
        this.$Post(lasturl, params, successfunction, null, stringfy);
    } else if (metadata.type == "get") {
        this.$Get(lasturl, params, successfunction);
    } else if (metadata.type == "put") {
        this.$Put(lasturl, params, successfunction, null, stringfy);
    } else if (metadata.type == "delete") {
        this.$Delete(lasturl, params, successfunction);
    }
};

// 同步取数据，经测试xmlhttprequest来处理
Vue.prototype.$SyncAskData = function (metadata, _params, _stringfy) {


    var xhr = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject("Microsoft.XMLHTTP");
    // 超时10秒
    //xhr.timeout = 10000;
    /*xhr.ontimeout = function (event) {
      if (NeizhenUtil.isFunction(_timeout)) {
        _timeout.call(this, event);
      }
    };*/
    var lasturl = "/admin";
    if (metadata.restful == null || metadata.restful == false) {
        lasturl += metadata.url;
    } else {

        let restfulparams = metadata.restfulparams;
        lasturl += metadata.url;
        restfulparams.forEach((value, index) => {
            lasturl += "/" + _params[value];
        });
    }

    if (metadata.type == "get") {
        lasturl = lasturl + "?" + qs.stringify(_params, {indices: false});
    }

    // 同步阻塞
    xhr.open(metadata.type.toUpperCase(), lasturl, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", `Bearer ${store.state.token}`);
    let formData = new FormData();

    for (var x in _params) {
        formData.append(x, _params[x]);
    }

    var stringfystr = qs.stringify(_params, {indices: false});

    if (metadata.type == "get") {
        xhr.send(null);
    } else {
        xhr.send(_stringfy ? stringfystr : formData);
    }
    let respdata = xhr.responseText;


    return JSON.parse(respdata);
};

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(iView);
// Vue.use(ElementUI);


const i18n = new VueI18n({
    locale: 'zh',
    messages
})

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     } else {
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         } else {
//             next();
//         }
//     }
// })


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
