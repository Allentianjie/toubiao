//polyfill();

var util = {
  tonkenKey: 'nz_access_token',
  apiUrl: '/admin/',
  urlStr: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  jsonSort: function (a, b) {

  },
  createLayer: function () {
    var Num = 'layer'
    for (var i = 0; i < 10; i++) {
      Num += Math.floor(Math.random() * 10)
    }
    return {
      id: '',
      name: '',
      titleFont:'17',
      description: '',
      loading: true,
      children: [],
      x: 0,
      y: 0,
      w: 2,
      h: 1,
      i: Num,
      type: this.url != '' ? 'ifarme':'default',
      url: '' ,
      skin: 'bro2'
    }
  },
  layerOptions: function () {
    return {
      legend: {
        show: true,
        textStyle:{
          fontSize:13,
        }
      },
      grid: {
        top: '30px',
        left: '10px',
        right: '10px',
        bottom: '10px',
        containLabel: true
      },
      xAxis: {
        show: true,
        nameTextStyle:{
           fontStyle:'italic',
           fontSize:13,
        },
        axisLabel: {
           interval: 0,
           fontSize:13,
           rotate: 20
        }
      },
      yAxis: {
        show: true,
        axisLabel: {
          interval: 0,
          fontSize:13,
          rotate: 0
        }
      }
    }
  },
  activeData: function (id, name, type) {
    return {
      id: id,
      title:'',
      name: name,
      size: 0,
      rank: 'default',
      dataType: type,
      markLine: false,
      markPoint: false,
      content:'',
      stack: false,
      options: {
        legend: {
          show: true,
          textStyle:{
            fontSize:13,
          }
        },
        grid: {
          top: '30px',
          left: '10px',
          right: '10px',
          bottom: '10px',
          containLabel: true
        },
        xAxis: {
          show: true,
          nameTextStyle:{
             fontStyle:'italic',
             fontSize:13,
          },
          axisLabel: {
            interval: 0,
            fontSize:13,
            rotate: 20
          }
        },
        yAxis: {
          show: true,
          axisLabel: {
            interval: 0,
            fontSize:13,
            rotate: 0
          }
        }
      },
      chartData: {},
      chartSettings: {
          stack: {},
          area: true,
          radius: 100,
          offsetY: '50%',
          type: (type === 'base_data' || type === 'target_data' ||   type === 'iframe_data') ? 'target' : 'line'
      },
      toolbox: {},
      legendShow: true,
      theme: 'dark'
    }
  },
  formatDate: function (dateTime, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    var o = {
      'M+': dateTime.getMonth() + 1,
      'd+': dateTime.getDate(),
      'h+': dateTime.getHours(),
      'm+': dateTime.getMinutes(),
      's+': dateTime.getSeconds()
    }
    for (var k in o) {
      if (new RegExp('(' + o[k] + ')').test(fmt)) {
        var str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
      }
    }
    return fmt
  }
}

// 初始化
// eslint-disable-next-line no-undef
var axiosInit = axios.create()
// 现在所有的请求都要等60S之后才会发出
axiosInit.defaults.timeout = 60000
// 跨域请求，允许保存cookie
axiosInit.defaults.withCredentials = true
// 基本路径
axiosInit.defaults.baseURL = util.apiUrl
// 请求设置
axiosInit.interceptors.request.use(function (config) {
    var token = window.sessionStorage.getItem(util.tonkenKey)
    config.withCredentials = true
    config.headers['TENANT_ID'] = 1 // 租户ID
    if (token) { // 不是登录
      config.headers['Authorization'] = token
    } else { // 登录
      config.headers['Authorization'] = ''
      location.href = '/#/'
    }
    return config
}, function (err) {
    return err
})
// 拦截设置
axiosInit.interceptors.response.use(function (res) {
    return res
}, function (err) {
    return err
})
