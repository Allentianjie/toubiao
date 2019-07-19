<template>
<div class="cassso"></div>
</template>
<script>
import {randomLenNum, encryption} from "@/api/utils";
import {NeizhenUtil, datarouters} from "@/util/datarouters";
import querystring from "querystring";
import axios from "axios";
import {log, Object, setTimeout} from "core-js";
import store from "@/store";
import sso from "@/server/cassso";

export default {
    name: 'cassso',
    components: {
    },
    data() {
        return {
            formInline: {
                username: "",
                password: "111111",
                code: "",
                redomStr: ""
            },
        }
    },
    created(){
        //uid=admin&ssoaoth=true
        var username = this.getUrlStr('uid');
        var ssoaoth = this.getUrlStr('ssoaoth');
        if(this.isNotEmpty(username) && ssoaoth ){
            this.formInline.username = username;
            this.handleSubmit();//登录
        }else{
            let token = store.state.token;
            if(!token){
                sso.ajaxLogin();
            }
        }
    },
    methods: {
        //获取消息头
        isNotEmpty(obj){
            if(typeof obj == "undefined" || obj == null || obj == ""){
                return false;
            }else{
                return true;
            }
        },
       //获取参数
       getUrlStr(name) {
           var url = document.location.toString();
    　　　　var arrObj = url.split("?");
    　　　　if (arrObj.length > 1) {
    　　　　　　var arrPara = arrObj[1].split("&");
    　　　　　　var arr;
    　　　　　　for (var i = 0; i < arrPara.length; i++) {
    　　　　　　　　arr = arrPara[i].split("=");
    　　　　　　　　if (arr != null && arr[0] == name) {
    　　　　　　　　　　return arr[1];
    　　　　　　　　}
    　　　　　　}
    　　　　　　return "";
    　　　　}else {
    　　　　　　return "";
    　　　　}
       },
       
       /**
       * @description: 登录及验证
       * @param: name:验证节点
       * @return: name 所对应的表单
       */
       handleSubmit() {
            //密码加密
            let user = encryption({ data: this.formInline, key: "1234567812345678", param: ["password"]});
            this.$store.commit("setToken", "");
            let password = user.password.replace(/=/g, "%3D");//所有=号替换"%3D"
            this.$Post("/auth/oauth/token?" + "username=" + user.username + "&password=" + password + "&randomStr=" + user.randomStr + "&grant_type=password&scope=server",null,
                res => {
                if ("access_token" in res) {
                    this.$store.commit("setLogMsg", res);
                    this.$store.commit("setToken", res.access_token);
                    window.sessionStorage.setItem("nz_access_token","Bearer " + res.access_token);
                    // 获取完整部门tree的接口
                    this.getDeptData();
                    // 获取用户管辖部门
                    this.getDeptDataScopeData()
                    //获取用户权限
                    this.getUserPermissions()
                    //获取个人菜单;
                    this.getMenu();
                    /*
                    setTimeout(function(){
                        window.location.href = sso.successUrl; 
                    },450);
                    */
                } else {
                    console.error('oauth 认证失败,请确认密码是否是初始密码。')
                }
            });
      },
      /**
       * @description: 加载菜单
       * @param {type}
       * @return:
       */
       getMenu() {
        this.$AsyncDealData(datarouters.SystemManage.menu.usermenu,null,data => {
                if(data.data.length>0){
                    this.$router.push(data.data[0].path);
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
        this.$AsyncDealData(datarouters.SystemManage.department.treemenu,null,
            res => {
                this.$store.commit("setChooseDept", res.data);
            }
         );
       },
       getUserPermissions(){
         this.$AsyncDealData(datarouters.SystemManage.user.info,null,
            res => {
                this.$store.commit("setUserPermissions", res.data.permissions || []);
            }
         );
       },
      /**
       * 获取用户管辖部门
       */
       getDeptDataScopeData() {
         this.$AsyncDealData(datarouters.SystemManage.department.usertreemenu,null,
            res => {
                this.$store.commit("setChooseDataScopeDept", res.data);
            }
         );
       },
     }
}
</script>
