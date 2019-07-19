<template>
  <div class="table" style="height:100%">
    <!--<object type="text/html"  ref="mapFrame" :data=url  width="100%" height="100%" class="mapFrame" >-->

    <!--<iframe  ref="mapFrame" :src=url  width="100%" height="100%" class="mapFrame" id="iframetest">-->
    <iframe  ref="mapFrame" :src=url  width="100%" height="100%" class="mapFrame" id="iframetest" style="border: none">
      <!--<iframe  ref="iframe" id="Test123" src="" width="100%" height="100%" >-->
        <!--您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(极速模式)、火狐等主流浏览器。-->
      </iframe>
    <!--</object>-->
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
       let token = this.$store.state.token
        let tokenSum = token.split(' ')
        // console.log(11,tokenSum)
        let url = this.$store.state.menuUrl
        // console.log(2,url)
        let urlToken = url + '?' + token
        console.log(33,urlToken)
        // console.log(444,localStorage.getItem("token"))
      return urlToken;
      // return url;
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
  mounted() {



    }, created() {
        // let token = this.$store.state.token
        // let token2 = window.sessionStorage.getItem("nz_access_token")
        // let a = token2.split(' ')

        // console.log('wechat---',token2)
       // console.log( localStorage.getItem('url'))
      // let obj = localStorage.getItem('url');
      // this.url = obj;
      // console.log( this.url )
  },
  methods:{

  }


}
</script>


<style scoped>

</style>
