<template>
  <div id="taskSummaryPage">
    <!--<div class="taskmenu">
      <div class="menu">
        <el-menu
          style="width:100%;height:100%"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item v-if="task_report_menu" index="taskreports">任务报表</el-menu-item>
          <el-menu-item v-if="task_detail_menu" index="taskdetail">任务明细</el-menu-item>
          <el-menu-item v-if="task_my_menu" index="mytask">我的任务</el-menu-item>
          <el-menu-item v-if="task_teacher_dev_standard" index="teacherDevStandard">教师发展标准</el-menu-item>
          <el-menu-item v-if="task_major_dev_standard" index="majorDevStandard">专业建设标准</el-menu-item>
          <el-menu-item v-if="task_course_standard" index="courseStandard">课程标准</el-menu-item>
          <el-menu-item v-if="task_dept_jop_menu" index="obligation">部门岗位职责</el-menu-item>
          <el-menu-item v-if="task_user_jop_menu" index="userPost">个人岗位职责</el-menu-item>
          <el-menu-item v-if="task_duty_standard" index="standard">个人工作标准</el-menu-item>
          <el-menu-item v-if="task_plan_menu" index="taskplanning">个人规划</el-menu-item>
          <el-menu-item v-if="task_reform_menu" index="reform">诊改措施</el-menu-item>
          <el-menu-item v-if="task_rules_regulate" index="ruleRegulate">规章制度</el-menu-item>
        </el-menu>
      </div>
      &lt;!&ndash; <div class="menuDate">
          <span>距下一次诊改时间还有：</span>
          <span class="date">8888小时6分58秒</span>
      </div> &ndash;&gt;
    </div>-->
    <div class="taskContent">
      <router-view/>
    </div>
  </div>
</template>
<script>

  export default {
    name: "index",
    data() {
      return {
        activeIndex: "",
        task_report_menu: false,
        task_detail_menu: false,
        task_my_menu: false,
        task_plan_menu: false,
        task_dept_jop_menu: false,
        task_duty_standard: false,
        task_user_jop_menu: false,
        task_teacher_dev_standard: false,
        task_major_dev_standard: false,
        task_course_standard: false,
        task_reform_menu: false,
        task_rules_regulate: false,
        menuNwe: '',
      }
    },
    watch: {
      $route(to, from) {
        if (to.name === this.menuNwe ) {
          this.handleSelect(to.name)
        }
      }
    },
    created() {
      this.task_report_menu = this.$store.state.permissions['task_report_menu']
      this.task_detail_menu = this.$store.state.permissions['task_detail_menu']
      this.task_my_menu = this.$store.state.permissions['task_my_menu']
      this.task_plan_menu = this.$store.state.permissions['task_plan_menu']//
      this.task_dept_jop_menu = this.$store.state.permissions['task_dept_jop_menu']
      this.task_duty_standard = this.$store.state.permissions['task_duty_standard']
      this.task_user_jop_menu = this.$store.state.permissions['task_user_jop_menu']
      this.task_teacher_dev_standard = this.$store.state.permissions['task_teacher_dev_standard']
      this.task_major_dev_standard = this.$store.state.permissions['task_major_dev_standard']
      this.task_course_standard = this.$store.state.permissions['task_course_standard']
      this.task_reform_menu = this.$store.state.permissions['task_reform_menu']
      this.task_rules_regulate = this.$store.state.permissions['task_rules_regulate']
      this.menuNwe = this.task_report_menu ? 'taskreports':
                      this.task_detail_menu ? 'taskdetail':
                      this.task_my_menu ? 'mytask':
                      this.task_teacher_dev_standard ? 'teacherDevStandard':
                      this.task_major_dev_standard ? 'majorDevStandard':
                      this.task_course_standard ? 'courseStandard':
                      this.task_dept_jop_menu ? 'obligation':
                      this.task_user_jop_menu ? 'userPost':
                      this.task_duty_standard ? 'standard':
                        this.task_plan_menu ? 'taskplanning':
                        this.task_reform_menu ? 'reform':
                      this.task_rules_regulate ? 'ruleRegulate': ''
      // this.$router.push("/" + this.menuNwe);
      // this.activeIndex = this.menuNwe
      // console.info(this.$store.state.permissions, this.task_report_menu, this.task_detail_menu,this.task_my_menu,this.task_plan_menu)
    },
    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex = key
        this.$router.push("/" + key);
      }
    }
  };
</script>

<style lang='less' scoped>

</style>
