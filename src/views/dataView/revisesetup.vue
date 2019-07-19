<template>
    <div style="width:100%;height:100%;" 
         v-loading="loading" 
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <object v-bind:data="perviewUrl" type="application/pdf" width="100%" height="100%">  
            <iframe v-bind:src="perviewUrl" width="100%" height="100%">  
                <p>抱歉，您的浏览器不支持PDF预览，请点击链接下载PDF文件<a v-bind:href="perviewUrl">下载</a></p>  
            </iframe>  
        </object>  
    </div>
</template>
<script>
import * as http from '@/api/dataview/revisesetup'
import { setTimeout } from 'timers';
export default {
    name: "index",
    data() {
        return {
            perviewUrl:'',
            loading:false
        };
    },
    created() {
        this.down();
    },
    methods: {
       down(){
           var that = this
           that.loading = true;
           http.getStructure({}).then(response => {
                var blob = new Blob([response.data],{'type':'application/pdf'});
                var url = window.URL.createObjectURL(blob); //链接
                that.perviewUrl = url;
                that.$nextTick(function(){
                    that.loading = false
                });
                //延迟4s释放掉blob对象 
                setTimeout(function(){
                    window.URL.revokeObjectURL(url); 
                },4000);
           }).catch(function (error) {
                that.loading = false
                that.$message({
                    showClose: true,
                    duration:0,
                    message: '操作异常，请联系管理员~',
                    type: 'error'
                });

           }); 
       },
    }
};
</script>
<style lang='less' scoped>
</style>
