<template>
  <div id="taskSummaryPage">
    <!--<div class="taskmenu">-->
      <!--<div class="menu">-->
        <!--<el-menu-->
          <!--style="width:100%;height:100%"-->
          <!--:default-active="activeIndex"-->
          <!--class="el-menu-demo"-->
          <!--mode="horizontal"-->
          <!--@select="handleSelect"-->
        <!--&gt;-->
          <!--<el-menu-item index="analysisProperty">资产分析</el-menu-item>-->
          <!--<el-menu-item index="analysisTeachers">师生分析</el-menu-item>-->
          <!--<el-menu-item index="analysisCollege">学院分析</el-menu-item>-->
          <!--<el-menu-item index="analysisExpenditure">经费分析</el-menu-item>-->
        <!--</el-menu>-->
      <!--</div>-->
    <!--</div>-->
    <div class="taskContent" style="overflow: hidden">
      <router-view/>
    </div>
  </div>
</template>
<script>

  export default {
    name: "index",
    data() {
      return {
        activeIndex: "analysisTeachers",
        analysisCcollege: false,
        analysisTeachers: false,
        menuNwe: '',
      }
    },
    watch: {
      $route(to, from) {
        if (to.name === this.menuNwe) {
          this.handleSelect(to.name)
        }
      }
    },
    created() {
      // this.analysisProperty = this.$store.state.permissions['analysis_faculty_menu']
      // this.analysisTeachers = this.$store.state.permissions['analysis_ts_menu']
      // this.menuNwe = this.analysisTeachers ? 'analysisTeachers': 'analysisProperty'
      // this.$router.push("/" + this.menuNwe);
      // this.activeIndex = this.menuNwe
      // this.$router.push("/analysisTeachers");
      // console.info(this.$store.state.permissions, this.task_report_menu, this.task_detail_menu,this.task_my_menu,this.task_plan_menu)
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(111,key,keyPath)
        // this.activeIndex = key
        this.$router.push("/" + key);
      }
    }
  };
</script>

<style lang='less' scoped>

</style>
