<template>
    <div style="height: 100%">
      <el-container class="system">
        <!--<el-aside class="myNav" style="width: 240px;height:100%">-->
          <!--<SystemNav style="height:100%"></SystemNav>-->
        <!--</el-aside>-->
        <el-main class="my_main" >
          <router-view/>
        </el-main>
      </el-container>
    </div>
</template>

<script>
import SystemNav from './my_nav/index'
export default {
  components: {SystemNav},
  name: 'index'
}
</script>

<style lang="less" scoped>
  @import url('systemIndex.less');
  .el-main{
      padding: 0!important;
  }
</style>

