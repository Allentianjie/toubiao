let sso = {
    isOpenCassso: false, // 是否开启单点登录
    loginUrl: 'http://172.16.5.24:4000/cassso/login', //单点登录地址
    logoutUrl: 'http://172.16.5.24:4000/cassso/logout', //单点退出地址
    successUrl: '/#/cockpit', //重定向地址
    ajaxLogin: function() {
        if (this.isOpenCassso) {
            window.location.href = this.loginUrl;
        } else {
            console.log('is not open sso ...');
        }
    },
    ajaxLogout: function() {
        if (this.isOpenCassso) {
            window.location.href = this.logoutUrl;
        } else {
            console.log('is not open sso ...');
        }
    },
}
export default sso