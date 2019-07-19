<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">诊断与改进平台</div>
            <el-form ref="formInline" :model="formInline" :rules="ruleValidate" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="formInline.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-user"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="formInline.password"
                              @keyup.enter.native="handleSubmit('formInline')">
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @keyup.enter="handleSubmit('formInline')"
                               @click.native.prevent="handleSubmit('formInline')" :loading="logining">{{loginName}}
                    </el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
        <div v-if="Loutstate">
            <iframe  ref="iframe" src="http://172.20.14.59:8220/logout" width="0" height="0" >
                您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(急速模式)、火狐等主流浏览器。
            </iframe>
        </div>

    </div>
</template>

<script>
    import {randomLenNum, encryption} from "@/api/utils";
    import {NeizhenUtil, datarouters} from "@/util/datarouters";
    import sso from "@/server/cassso";

    export default {
        data() {
            return {
                Loutstate:true,
                loginName: "登 录",
                logining: false,
                code: {
                    src: "/code",
                    value: "",
                    len: 4,
                    type: "image"
                },
                formInline: {
                    username: "",
                    password: "",
                    code: "",
                    redomStr: ""
                },
                ruleValidate: {
                    username: [
                        {
                            required: true,
                            message: "账号不能为空！",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "密码不能为空！",
                            trigger: "blur"
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: "验证码不能为空！",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        created() {
            //清空缓存
            this.$store.commit("setToken", null);
            this.$store.commit("setUserMenu", []);
            this.$store.commit("setUserPermissions", []);
            this.$store.commit("setChooseDept", []);
            this.$store.commit("setChooseDataScopeDept", []);
            this.$store.commit("setLogMsg", null);
            this.$store.commit("setActives", null);
            this.$store.commit("setActiveTag", null);
            window.sessionStorage.setItem("nz_access_token", null);
            //单点登录
            sso.ajaxLogin();
        },
        mounted() {
            this.refreshCode();
            setTimeout(()=>{
                this.Loutstate=false
            },500)
        },
        methods: {
            /**
             * @description: 获取验证码及产生随机数
             * @param {type}
             * @return:
             */
            refreshCode() {
                this.formInline.code = "";
                this.formInline.randomStr = randomLenNum(this.code.len, true);
                this.code.type === "text" ? (this.code.value = randomLenNum(this.code.len))
                    : (this.code.src = `${"/code"}?randomStr=${this.formInline.randomStr}`);
            },
            /**
             * @description: 登录及验证
             * @param: name:验证节点
             * @return: name 所对应的表单
             */
            handleSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        this.logining = true;
                        this.loginName = "登 录 中";
                        let user = encryption({
                            //密码加密
                            data: this.formInline,
                            key: "1234567812345678",
                            param: ["password"]
                        });
                        this.$store.commit("setToken", "");
                        let password = user.password.replace(/=/g, "%3D");//所有=号替换"%3D"
                        this.$Post(
                            "/auth/oauth/token?" +
                            "username=" +
                            user.username +
                            "&password=" +
                            password +
                            "&randomStr=" +
                            user.randomStr +
                            // "&code=" +
                            // user.code +
                            "&grant_type=password&scope=server",
                            null,
                            res => {
                                if ("access_token" in res) {
                                    this.$store.commit("setLogMsg", res);
                                    this.$store.commit("setToken", res.access_token);
                                    window.sessionStorage.setItem(
                                        "nz_access_token",
                                        "Bearer " + res.access_token
                                    );
                                    // localStorage.setItem("token",res.access_token);
                                    // 获取完整部门tree的接口
                                    this.getDeptData();
                                    // 获取用户管辖部门
                                    this.getDeptDataScopeData();
                                    //获取用户权限
                                    this.getUserPermissions();

                                } else {
                                    this.refreshCode();
                                    this.logining = false;
                                    this.loginName = "登 录"
                                }

                            }
                        );
                    }
                });
            },
            /**
             * @description: 加载菜单
             * @param {type}
             * @return:
             */
            getMenu() {

                this.logining = false;
                this.loginName = "登 录 成 功";
                this.$AsyncDealData(datarouters.SystemManage.menu.usermenu,null,data => {
                        if(data.data.length>0){
                            if(data.data[0].pathType === '0'){
                                if(data.data[0].hasChildren==true){
                                    this.$store.commit("setActiveTag", data.data[0].children[0]);
                                    this.$router.push(data.data[0].children[0].path);
                                }else {
                                    this.$store.commit("setActiveTag", data.data[0]);
                                    this.$router.push(data.data[0].path);

                                }
                            }else {
                                if(data.data[0].openWith === '1'){ // 新窗口
                                    window.open(data.data[0].url,'','')
                                }else if(data.data[0].openWith === '0'){ // 当前窗口
                                    this.$store.commit("setActiveTag", data.data[0]);
                                    this.$router.push({path: "/menuCustom", query: {url: data.data[0].url}});
                                }else if(data.data[0].openWith === '2'){
                                    let width =  (window.screen.availWidth)*0.8
                                    let heigth =(window.screen.availHeight)*0.8
                                    window.open(data.data[0].url,'','height='+heigth+',width='+width+',scrollbars=yes,status=yes')
                                }
                            }
                            // if(data.data[0].hasChildren==true){
                            //     this.$router.push(data.data[0].children[0].path);
                            // }else {
                            //     this.$router.push(data.data[0].path);
                            // }

                            this.menustore(data.data);
                        }else {
                            this.$Message.error('此账号暂无权限数据');
                            this.$router.push('/wuData');
                        }
                    }
                );

            },
            /**
             * @description: 保存菜单到vuex
             * @param {type}
             * @return:
             */
            menustore(data) {
                this.$store.commit("setUserMenu", data);
            },
            /**
             * @description: 获取部门组织结构tree
             * @param {type}
             * @return:
             */
            getDeptData() {
                this.$AsyncDealData(
                    datarouters.SystemManage.department.treemenu,
                    null,
                    res => {
                        this.$store.commit("setChooseDept", res.data);
                    }
                );
            },
            getUserPermissions(){
                this.$store.commit("setUserPermissions", []);
                this.$AsyncDealData(
                    datarouters.SystemManage.user.info,
                    null,
                    res => {
                        this.$store.commit("setUserPermissions", res.data.permissions || []);
                        //获取个人菜单;
                        this.getMenu();
                    }
                );
            },
            /**
             * 获取用户管辖部门
             */
            getDeptDataScopeData() {
                this.$AsyncDealData(
                    datarouters.SystemManage.department.usertreemenu,
                    null,
                    res => {
                        this.$store.commit("setChooseDataScopeDept", res.data);
                    }
                );
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
