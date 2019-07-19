<template>
  <!--<div>-->
    <!--<Heard></Heard>-->
      <!--<router-view/>-->
    <!--&lt;!&ndash;<Footer></Footer>&ndash;&gt;-->
  <!--</div>-->
  <div class="wrapper">
    <Heard></Heard>
    <Sidebar></Sidebar>
    <div id="contentBox" class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <transition name="move" mode="out-in">
            <router-view style="height: 100%"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '@/components/bus';
  import Sidebar from '@/components/sidebar';
import Heard from '@/components/heard'
import Footer from '@/components/footer'
export default {
  components: {Heard,Footer,Sidebar},
  name: 'index',
  data () {
    return {
      collapse: false,
      task_detail_copy: true,
    }
  },
  methods: {
    handleSubmit () {

    }
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg;
    });
  },
  mounted () {
    this.task_detail_copy = this.$store.state.permissions['all_copy']
    // 没有复制权限
    if(!this.task_detail_copy){
      this.$nextTick(()=>{
        document.oncontextmenu = new Function("event.returnValue=false");
        document.onselectstart = new Function("event.returnValue=false");
      })

    }

  }
}
</script>

<style lang="less" scoped >
  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 60px;
    bottom: 0;
    padding-bottom:0;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }
  .content {
    width: auto;
    height: 100%;
    /*padding: 10px;*/
    /*overflow-y: scroll;*/
    box-sizing: border-box;
  }

  .content-collapse {
    left: 65px;
  }
</style>
