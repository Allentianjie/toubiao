<template>
    <div>
        <header id="heardBox" class="heardBox">
            <div class="logo" id="logo">
                <div class="left" id="logoBox"></div>
            </div>
            <div v-show="!Switch" class="my_nav">
                <div class="collapse-btn">
                    <i v-if="collapses" @click="collapseChage" class="el-icon-s-fold" style="cursor: pointer"></i>
                    <i v-else @click="collapseChage" class="el-icon-s-unfold" style="cursor: pointer"></i>
                </div>
                <div class="nav-title">
                    诊断与改进平台
                </div>
                <div class="title-right">
                    <div class="menuDate">
                        <span>距下一次诊改时间还有：</span>
                        <strong id="DD">{{DD}}</strong>天 <strong id="HH">{{HH}}</strong>时 <strong id="MM">{{MM}}</strong>分 <strong
                            id="SS">{{SS}}</strong>秒
                        <!--<span class="date" id="timer">{{time}}</span>-->
                    </div>
                </div>
            </div>
            <div id="myNav" @scroll=handleScroll ref="myNav" v-show="Switch" class="my_nav">
                <div id="roll">
                    <!--<i class="iconfont iconcs-xx-1"></i>-->
                    <div v-if="is_down">
                        <el-tooltip v-if="smallState" effect="dark" content="下拉菜单" placement="bottom">
                            <i @click="downMenu" style="cursor: pointer" class="iconfont iconcs-xx-1"></i>

                        </el-tooltip>
                        <el-tooltip v-else effect="dark" content="上拉菜单" placement="bottom">
                            <i @click="downMenu" style="cursor: pointer" class="iconfont iconcs-xs-1"></i>
                        </el-tooltip>
                    </div>
                </div>
                <!--新菜单-->
                <div ref="topInfo" id="topInfo">
                    <el-menu mode="horizontal" :default-active="activeIndex" :collapse="collapse"
                             class="el-menu-demo"
                             text-color="#fff" active-text-color="#719ad8" background-color="#545c64" unique-opened>
                        <!-- 一级菜单 -->
                        <template v-for="item in items">
                            <el-submenu v-if="item.children && item.children.length" :index=(item.id).toString() :key="item.id">
                                <template class="el-title" slot="title">
                                    <i :class="item.icon"></i><span>{{item.name}}</span>
                                </template>
                                <!-- 二级菜单 -->
                                <template v-for="itemChild in item.children">
                                    <el-submenu v-if="itemChild.children && itemChild.children.length" :index=(itemChild.id).toString()
                                                @click="abc(itemChild)" :key="itemChild.id">
                                        <template class="el-title" slot="title"><i :class="itemChild.icon"></i><span
                                                @click="abc(itemChild.pathType)">{{itemChild.name}}</span></template>
                                        <!-- 三级菜单 -->
                                        <template v-for="itemChild_Child in itemChild.children">
                                            <el-submenu v-if="itemChild_Child.children && itemChild_Child.children.length"
                                                        @click="abc(itemChild_Child )" :index=(itemChild_Child.id).toString()
                                                        :key="itemChild_Child.id">
                                                <template class="el-title" slot="title"><i :class="itemChild_Child.icon"></i><span>{{itemChild_Child.name}}</span>
                                                </template>
                                                <!-- 三级菜单 -->
                                                <el-menu-item v-for="itemChild_Child in itemChild.children"
                                                              :index="(itemChild_Child .id).toString()" :key="itemChild_Child.id">
                                                    <i :class="itemChild_Child.icon"></i><span slot="title">{{itemChild_Child.name}}</span>
                                                </el-menu-item>
                                            </el-submenu>
                                            <el-menu-item v-else :index="(itemChild_Child.id).toString()" @click="abc(itemChild_Child )"
                                                          :key="itemChild_Child.id"><i :class="itemChild_Child.icon"></i><span slot="title">{{itemChild_Child.name}}</span>
                                            </el-menu-item>
                                        </template>
                                    </el-submenu>
                                    <el-menu-item v-else @click="abc(itemChild)" :index=(itemChild.id).toString() :key="itemChild.id"><i
                                            :class="itemChild.icon"></i><span slot="title">{{itemChild.name}}</span></el-menu-item>
                                </template>
                            </el-submenu>
                            <el-menu-item @click="abc(item)" v-else :index=(item.id).toString() :key="item.id"><i
                                    :class="item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </div>
            </div>
            <div class="header-right">
                <div class="header-user-con">
                    <!-- 全屏显示 -->
                    <div class="user-avator" @click="handleFullScreen">
                        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                            <i style="cursor: pointer" class="iconfont iconquanping1"></i>
                        </el-tooltip>
                    </div>
                    <div class="user-avator" @click="handleSwitch">
                        <el-tooltip effect="dark" :content="Switch?`侧边导航`:`顶部导航`" placement="bottom">
                            <i style="cursor: pointer" class="iconfont iconqiehuanzuzhi"></i>
                        </el-tooltip>
                    </div>
                    <el-dropdown class="colorBtn " trigger="hover" @command="changeColor">
                        <!--<span class="el-dropdown-link ">更换主题</span>-->
                        <i style="cursor: pointer;color: #fff; font-size: 20px;" class="iconfont icontheme"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a" @click="change_type(a)">梦幻绿</el-dropdown-item>
                            <el-dropdown-item divided command="b" @click="change_type(b)">天空蓝</el-dropdown-item>
                            <el-dropdown-item divided command="c" @click="change_type(c)">雾霾灰</el-dropdown-item>
                            <el-dropdown-item divided command="d" @click="change_type(d)">清新绿</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 消息中心 -->
                    <!-- <div class="btn-bell">
                        <el-tooltip
                            effect="dark"
                            :content="messageCount?`有${messageCount}条未读消息`:`消息中心`"
                            placement="bottom"
                        >
                            <router-link to="#">
                                <i class="el-icon-bell"></i>
                            </router-link>
                        </el-tooltip>
                        <span class="btn-bell-badge" v-if="messageCount"></span>
                    </div> -->
                    <!-- 用户名下拉菜单 -->
                    <div class="name">
                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" placement="top" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{user.name}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                            <el-dropdown-menu slot="dropdown">
                                <!--<a href target="_blank">-->
                                <!--<el-dropdown-item>关于单位</el-dropdown-item>-->
                                <!--</a>-->
                                <el-dropdown-item divided command="fullScreen">{{fullscreen ? '取消全屏':'全屏'}}</el-dropdown-item>
                                <el-dropdown-item divided command="personalCenter">个人中心</el-dropdown-item>
                                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
            <Modal v-model="changePassword" width="40%" :mask-closable="false" @on-cancel="closefeedBack">
                <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
                    <span>修改个人信息</span>
                </p>
                <div style="padding: 0 10%">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                        <FormItem label="输入旧密码" prop="formerPasswd">
                            <Input type="password" v-model="formCustom.formerPasswd"></Input>
                        </FormItem>
                        <FormItem label="输入新密码" prop="newPasswd">
                            <Input type="password" v-model="formCustom.newPasswd"></Input>
                        </FormItem>
                        <FormItem label="确认新密码" prop="passwdCheck">
                            <Input type="password" v-model="formCustom.passwdCheck"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" style="text-align: right">
                    <el-button @click="handleSubmit('formCustom')" type="primary" size="small">保存</el-button>
                    <el-button @click="handleReset('formCustom')" style="margin-left: 8px" size="small">取消</el-button>
                </div>
            </Modal>
        </header>
    </div>
</template>

<script>
    import bus from './bus';
    // import store from '@/store';
    import {NeizhenUtil, datarouters} from "@/util/datarouters";
    import sso from "@/server/cassso";

    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else if (value !== this.formCustom.newPasswd) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                smallState: true,
                fullHeight: "",
                DD: "0",
                HH: "00",
                MM: "00",
                SS: "00",
                EndTimeMsg: "",
                time: "00天00小时00分00秒",
                collapses: true,
                formCustom: {
                    formerPasswd: '',
                    newPasswd: '',
                    passwdCheck: ''
                },
                ruleCustom: {
                    formerPasswd: [
                        {message: '请输入旧密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码不能小于6位数', trigger: 'blur'},
                        {type: 'string', max: 10, message: '密码不能大于10位数', trigger: 'blur'},
                        {
                            type: "string",
                            trigger: 'blur',

                            validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback("旧密码不能为空！")
                                    return;
                                }
                                this.$AsyncDealData(datarouters.SystemManage.user.validateOldPwd, {
                                    password: value
                                }, function (data) {
                                    if (!data.data) {
                                        callback("密码验证失败，请重新输入密码！");
                                    } else {
                                        callback();
                                    }
                                });

                            }
                        }
                    ],
                    newPasswd: [
                        {validator: validatePass, trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位数', trigger: 'blur'},
                        {type: 'string', max: 10, message: '密码大于10位数', trigger: 'blur'}
                    ],
                    passwdCheck: [
                        {validator: validatePassCheck, trigger: 'blur'}
                    ],

                },
                changePassword: false,
                fullscreen: false,
                Switch: false,
                messageCount: "10", //条数
                user: {
                    name: "",
                    job: ""
                },
                // nowDate: this.time(),
                menu: [],
                // activeIndex: "",
                collapse: false,
                items: [],
                pathRouter: '',
                is_down: false,
                val:null
            };
        },
        computed: {
            activeIndex:{
                get: function () {
                    if(this.$store.state.activeTags.id){
                        return this.$store.state.activeTags.id.toString()
                    }else {

                    }

                },
                // setter
                set: function (newValue) {
                    this.val = newValue
                }
                // return this.$store.state.activeTags.id.toString()
            },
        },
        watch: {
            fullHeight(newval, oldval) {
                if (newval > 60) {
                    this.is_down = true
                } else {
                    this.is_down = false
                }
            },
            $route(to, from) {
                // console.log(to)
            },
        },
        created() {
            let item = this.$store.state.userMenus;
            this.items = item;
            this.checkUser();
        },
        mounted() {
            // 通过 Event Bus 进行组件间通信，来高亮导航
            bus.$on('newActive', data => {
                this.activeIndex = data;
            });
            // 默认显示第一个菜单
            let data = this.$store.state.userMenus;
            let actives = this.$store.state.actives;
            if (actives == null) {
                if (data[0].hasChildren == true) {
                    this.$store.commit("setActiveTag", data[0].children[0]);
                    this.resetSetItem('url', data[0].children[0].url);
                    this.$store.commit("setmenuUrl", data[0].children[0].url);
                    if (data[0].children[0].pathType === '0') {
                        this.$router.push({path: data[0].children[0].path});
                        this.activeIndex = (this.$store.state.userMenus[0].children[0].id).toString()
                    } else {
                        if (data[0].children[0].openWith === '1') { // 新窗口
                            window.open(data[0].children[0].url, '', '')
                        } else if (data[0].children[0].openWith === '0') { // 当前窗口
                            this.$router.push({path: "/menuCustom", query: {url: data[0].children[0].url}});
                            this.activeIndex = (this.$store.state.userMenus[0].children[0].id).toString()
                        } else if (data[0].children[0].openWith === '2') {
                            let width = (window.screen.availWidth) * 0.8;
                            let heigth = (window.screen.availHeight) * 0.8;
                            window.open(data[0].children[0].url, '', 'height=' + heigth + ',width=' + width + ',scrollbars=yes,status=yes');
                        }
                    }
                } else {
                    this.$store.commit("setActiveTag", data[0]);
                    this.resetSetItem('url', data[0].url);
                    this.$store.commit("setmenuUrl", data[0].url);
                    if (data[0].pathType === '0') {
                        this.$router.push({path: data[0].path});
                        this.activeIndex = (this.$store.state.userMenus[0].id).toString()
                    } else {
                        if (data[0].openWith === '1') { // 新窗口
                            window.open(data[0].url, '', '')
                        } else if (data[0].openWith === '0') { // 当前窗口
                            this.$router.push({path: "/menuCustom", query: {url: data[0].url}});
                            this.$store.commit("setActiveTag", data[0]);
                            this.activeIndex = (this.$store.state.userMenus[0].id).toString()
                        } else if (data[0].openWith === '2') {
                            let width = (window.screen.availWidth) * 0.8;
                            let heigth = (window.screen.availHeight) * 0.8;
                            window.open(data[0].url, '', 'height=' + heigth + ',width=' + width + ',scrollbars=yes,status=yes')
                        }
                    }
                }
            }else {
                this.activeIndex = actives.id;
                this.$router.push(actives.path);
            }
            bus.$emit("newActive", this.activeIndex);
            window.addEventListener('scroll', this.handleScroll);
            this.DD = "0";
            this.HH = "00";
            this.MM = "00";
            this.SS = "00";
            this.getTime();//先隐藏
            let command = localStorage.command;
            if (command != "" && command != null && command != undefined && command != "undefined") {
                this.changeColor(command)
            } else {
                this.changeColor("d");
            }

        },
        methods: {
            //菜单滚动事件
            handleScroll() {
                let scroll = this.$refs.myNav.scrollTop;
                if (this.fullHeight == 120) {
                    if (scroll == 60) {
                        this.smallState = false;
                    } else if (scroll == 0) {
                        this.smallState = true
                    }
                }
            },
            //菜单下拉
            downMenu() {
                let scroll = this.$refs.myNav.scrollTop;
                if (this.fullHeight == 120) {
                    if (scroll == 0) {
                        this.smallState = false;
                        this.$refs.myNav.scrollTop = 60;
                    } else {
                        this.$refs.myNav.scrollTop = 0;
                        this.smallState = true
                    }
                }
            },
            //菜单点击
            abc(row) {
                this.$store.commit("setActiveTag", row);
                if (row.pathType === '0') {
                    this.activeIndex = (row.id).toString();
                    this.$router.push({path: row.path});
                    let obj = {
                        path: {path: row.path},
                        id: (row.id).toString()
                    };
                    this.$store.commit("setActives", obj);
                } else {
                    this.activeIndex = (row.id).toString();
                    if (row.openWith === '1') { // 新窗口
                        window.open(row.url, '', '')
                    } else if (row.openWith === '0') { // 当前窗口
                        this.$router.push({path: "/menuCustom", query: {url: row.url}});
                        this.resetSetItem('url', row.url);
                        this.$store.commit("setmenuUrl", row.url);
                        let obj = {
                            path: {path: "/menuCustom", query: {url: row.url}},
                            id: (row.id).toString()
                        };
                        this.$store.commit("setActives", obj);
                    } else if (row.openWith === '2') {
                        let width = (window.screen.availWidth) * 0.8;
                        let heigth = (window.screen.availHeight) * 0.8;
                        window.open(row.url, '', 'height=' + heigth + ',width=' + width + ',scrollbars=yes,status=yes')
                    }
                }
                bus.$emit("newActive", this.activeIndex)
            },
            //更换颜色主题
            changeColor(command) {
                localStorage.command = command;
                document.getElementById('app').className = 'theme' + command;
                document.getElementsByTagName("body")[0].className = 'theme' + command;
            },
            //时间转换
            show() {
                this.EndTimeMsg--;
                let h = Math.floor(this.EndTimeMsg / 60 / 60);
                let h1 = Math.floor((h / 24 - parseInt(h / 24)) * 24);
                let m = Math.floor((this.EndTimeMsg - h * 60 * 60) / 60);
                let s = Math.floor((this.EndTimeMsg - h * 60 * 60 - m * 60));
                this.DD = parseInt(h / 24);
                this.HH = h1;
                this.MM = m;
                this.SS = s;
                if (this.EndTimeMsg < 0) {
                    this.DD = "0";
                    this.HH = "00";
                    this.MM = "00";
                    this.SS = "00";
                }
            },
            //获得整改时间
            getTime() {
                this.$Get("/admin/hierarchy/cutdown", null, res => {
                    this.EndTimeMsg = res.data;
                    setInterval(() => {
                        this.show()
                    }, 1000);
                });
            },

            // 侧边栏折叠
            collapseChage() {
                this.collapses = !this.collapses;
                this.collapse = !this.collapse;
                if (this.collapse == false) {
                    document.getElementById('contentBox').style.left = "250" + "px";
                    document.getElementById("logo").style.marginLeft = 0 + 'px';
                    document.getElementById("logo").style.opacity = '1'
                } else {
                    document.getElementById('contentBox').style.left = "65" + "px";
                    document.getElementById("logo").style.marginLeft = -250 + 'px';
                    document.getElementById("logo").style.opacity = '0'
                }
                bus.$emit('collapse', this.collapse);
            },
            //打开下拉列表
            handleCommand(command) {
                if (command === "loginout") {
                    this.$Message.success("退出成功！");
                    sso.ajaxLogout();
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 500);
                } else if (command === "personalCenter") {
                    this.changePassword = true
                } else if (command === 'fullScreen') {
                    this.handleFullScreen()
                }
            },

            // 个人中心修改
            handleSubmit(name) {
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        that.$AsyncDealData(datarouters.SystemManage.user.changeOldPwd, {
                            password: that.formCustom.newPasswd
                        }, (data) => {
                            that.$Message.success('修改成功!');
                            that.changePassword = false
                        });

                    } else {
                        this.$Message.error('请根据提示重新输入!');
                    }
                })
            },
            //取消关闭个人中心
            handleReset(name) {
                this.$refs[name].resetFields();
                this.changePassword = false
            },
            //关闭弹窗
            closefeedBack() {
                this.changePassword = false
            },
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            //切换导航事件
            handleSwitch() {
                // this.activeIndex = this.$store.activeIndex;
                this.collapse = false;
                this.collapses = true;
                if (this.collapse == false) {
                    document.getElementById('contentBox').style.left = "250" + "px";
                    document.getElementById("logo").style.marginLeft = 0 + 'px';
                    document.getElementById("logo").style.opacity = '1'
                } else {
                    document.getElementById('contentBox').style.left = "65" + "px";
                    document.getElementById("logo").style.marginLeft = -250 + 'px';
                    document.getElementById("logo").style.opacity = '0';
                }
                bus.$emit('collapse', this.collapse);
                this.Switch = !this.Switch;
                if (this.Switch) {
                    document.getElementById('contentBox').style.left = "0" + "px"
                } else {
                    document.getElementById('contentBox').style.left = "250" + "px"
                }
                setTimeout(() => {
                    let topH = this.$refs.topInfo.offsetHeight;
                    this.fullHeight = topH;
                }, 400)
            },
            //判断用户是否登录
            checkUser() {
                let user = this.$store.state.userInfo;
                if (user) {
                    this.user.name = user.name;
                    this.user.job = user.job;
                } else {
                    this.$Message.error("当前用户未登陆！");
                    this.$router.push("/");
                }
            },
        }
    };
</script>

<style lang="less">
    #myNav > ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #f5f5f5;
        display: none !important;
    }

    #logoBox {
        margin-left: 0;
    }

    .heardBox {
        display: flex;
        min-width: 1366px;
        padding-right: 0.1rem;
        /*padding-left: 0.1rem;*/
        color: #fff;
        background: #2a84dc;
        /*background: #129b7f;*/

        > .logo {
            /*padding-left: 20px;*/
            /*padding: 7px 0 5px;*/
            transition: all .3s linear;
            width: 250px;
            height: 60px;
            border-right: 3px solid rgba(241, 243, 244, 0.49);


            .left {
                overflow: hidden;
                transition: all .3s linear;
                float: left;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 60px;
                width: 100%;
                /*background-image: url("../assets/images/title-logo.png");*/
                background-image: url("../../assets/images/title-logo02.png");
                padding-left: 10px;
                background-size: 100% 100%;

                > p:nth-of-type(1) {
                    font-size: 20px;
                    /*letter-spacing: 12px;*/
                    font-weight: 700;
                }

                > p:nth-of-type(2) {
                    font-size: 12px;
                    /*letter-spacing: 12px;*/
                }

                > p {
                    text-align: justify;
                    text-justify: distribute-all-lines; /*ie6-8*/

                    -webkit-text-align-last: justify; /*chrome 20+*/
                    -moz-text-align-last: justify; /*ff*/
                    text-align-last: justify; /* ie9*/
                }
            }
        }

        > .my_nav {
            -webkit-transition: left .3s ease-in-out;
            transition: left .3s ease-in-out;
            flex: 1;
            text-align: left;
            /*padding-left: 2%;*/
            float: left;
            height: 60px;
            overflow: auto;
            position: relative;

            #roll:hover {
                cursor: pointer;
            }

            #roll {
                position: fixed;
                right: 185px;
                top: 0;
                /*background: #ffe738;*/
                width: 30px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1111;
            }

            #topInfo {
                height: auto;
            }

            .nav-title {
                float: left;
                width: auto;
                height: 60px;
                font-size: 20px;
                font-weight: bold;
                line-height: 60px;
                /*background-image: url("../assets/images/biaoti.png");*/
                /*background-size: 100% 100%;*/
            }

            .collapse-btn {
                /*padding-left: 5px;*/
                float: left;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 62px;
                height: 60px;

                > i {
                    font-size: 25px;
                }
            }

            .title-right {
                float: right;
                line-height: 60px;
                padding-right: 10px;
            }

            .title-right span:nth-child(2) {
                font-size: 16px;
            }

            > .ivu-menu-dark.ivu-menu-horizontal {
                line-height: 25px;
                background: rgba(0, 0, 0, 0);

                .ivu-menu-item:nth-of-type(1) {
                    padding: 5px 1.1% 5px;
                }

                .ivu-menu-item {
                    float: none;
                    display: inline-block;
                    padding: 5px 1.1%;
                    color: #fff;
                    text-align: center;

                    i {
                        display: block;
                        font-size: 22px;

                        .ivu-badge-count {
                            padding: 0 2px;
                        }
                    }
                }

                .ivu-menu-item-active {
                    background: #1f4586;
                }
            }
        }

        > .msg {
            border: 1px solid #fffab7;
            padding: 10px 0;
            text-align: right;

            div {
                vertical-align: middle;
            }

            .ivu-badge {
                vertical-align: bottom;
            }

            div {
                display: inline-block;
                padding: 0 5px;
                font-weight: 600;
                /*vertical-align:middle;*/

                > .heardImg {
                    width: 36px;
                    height: 36px;
                    border-radius: 18px;
                }

                > a {
                    color: #fff;
                }
            }

            img {
                height: 18px;
                margin-left: 10px;
                vertical-align: middle;
            }
        }
    }

    .header-right {
        float: right;
        padding-right: 0.01rem;
    }

    .header-user-con {
        display: flex;
        align-items: center;
        height: 60px;
        line-height: 30px;

        > div {
            /*display: inline-block;*/
            width: auto;
            padding: 0 5px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            /*vertical-align:middle;*/

            > .heardImg {
                width: 36px;
                height: 36px;
                border-radius: 18px;
            }

            > a {
                color: #fff;
            }
        }
    }

    .btn-fullscreen {
        /*margin-top: -5px;*/
        margin-right: 5px;
        font-size: 30px;
        vertical-align: center;

        > i {
            font-size: 20px;
        }

        // transform: rotate(45deg);
    }

    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-bell-badge {
        position: absolute;
        top: 0;
        right: 0;
        width: 8px;
        height: 8px;
        color: #fff;
        background: #f56c6c;
        border-radius: 4px;
    }

    .btn-bell {
        top: 2px;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
        font-size: 20px;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 5px;
        font-size: 30px;
        vertical-align: bottom;

        > i {
            font-size: 20px;
        }
    }

    .name {
        padding-left: 0 !important;
    }

    /*.user-avator {*/
    /*width: 40px;*/
    /*}*/

    /*.user-avator img {*/
    /*display: block;*/
    /*width: 40px;*/
    /*height: 40px;*/
    /*!*margin-top: 40px;*!*/
    /*border-radius: 50%;*/
    /*}*/

    .user-info {
        /*display: flex;*/
        /*align-items: center;*/
        /*padding-bottom: 20px;*/
        /*border-bottom: 2px solid #ccc;*/
        /*margin-bottom: 20px;*/
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .menuDate {
        font-size: 14px;
    }
</style>
