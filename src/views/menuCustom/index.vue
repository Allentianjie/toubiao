<template>
  <div class="table" style="height:100%">
    <object type="text/html" ref="iframe" :data=url  width="100%" height="100%">
      <iframe  id="iframe" ref="iframe" src="" width="100%" height="100%" >
        您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(极速模式)、火狐等主流浏览器。
      </iframe>
    </object>
  </div>
</template>

<script>

export default {
   data(){
      return{

      }
   },

  computed: {
    url() {
       // let token = this.$store.state.token
       //  console.log(11,token)
      return this.$store.state.menuUrl+"?message="+sessionStorage.getItem('nz_access_token');
    }
  },
  watch: {
      // '$route': function (to, from) {
      //     // 拿到目标参数 to.query.id 去再次请求数据接口
      //     // console.log(1,to)
      //     // console.log(2,from)
      //     // this.loadPageData(to.query.id)
      // }
      // '$route': 'url'
      // url(newval, oldval) {
      //   console.log(newval)
      // },
  },

    created() {
        // let token = this.$store.state.token
        // let token2 = window.sessionStorage.getItem("nz_access_token")
        // let a = token2.split(' ')
        //
        // console.log('内诊---',token2)
       // console.log( localStorage.getItem('url'))
      // let obj = localStorage.getItem('url');
      // this.url = obj;
      // console.log( this.url )
  },
  mounted () {
    var iFrame = document.getElementById('iframe')
    iFrame.onload = function(){
      iFrame.contentWindow.postMessage(sessionStorage.getItem('nz_access_token'),'http://localhost:3000');
    }
  },
  methods:{

  },


}
</script>

<style scoped>

</style>
