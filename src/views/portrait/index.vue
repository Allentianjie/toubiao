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
          <!--<el-menu-item v-if="student"  index="student">学生画像</el-menu-item>-->
          <!--<el-menu-item v-if="teacher" index="teacher">教师画像</el-menu-item>-->
          <!--<el-menu-item v-if="major" index="major">专业画像</el-menu-item>-->
          <!--<el-menu-item v-if="course" index="course">课程画像</el-menu-item>-->
        <!--</el-menu>-->
      <!--</div>-->
      <!--&lt;!&ndash; <div class="menuDate">-->
          <!--<span>距下一次诊改时间还有：</span>-->
          <!--<span class="date">8888小时6分58秒</span>-->
      <!--</div> &ndash;&gt;-->
    <!--</div>-->
    <div class="taskContent">
      <router-view @menuName="menuName" :namecode='namecode'/>
    </div>
  </div>
</template>
<script>

  export default {
    name: "index",
    data() {
      return {
        activeIndex: "",
        student:false,
        teacher:false,
        major:false,
        course:false,
        menuNwe: '',
        namecode:''
      }
    },
    watch: {
      $route(to, from) {
        if (to.name === this.menuNwe ) {
          // this.handleSelect(to.name)
        }
      }
    },
    created() {
      this.student = this.$store.state.permissions['portrait_student_menu']
      this.teacher = this.$store.state.permissions['portrait_teacher_menu']
      this.major = this.$store.state.permissions['portrait_major_menu']
      this.course = this.$store.state.permissions['portrait_course_menu']
      this.menuNwe = this.student ? 'student':
        this.teacher ? 'teacher':
        this.major ? 'major':
        this.course ? 'course': ''
        //  console.log(55,this.student)


    },
    mounted() {
       if(this.$route.query.obj){
        let obj = this.$route.query.obj
        this.activeIndex = obj.type
        this.$router.push({path: '/'+obj.type, query: {code: obj.code}});
        // this.$router.push({path: '/portrait', query: {obj:obj}})
      }else{
        // this.activeIndex = this.menuNwe
         this.$router.push("/" + this.menuNwe);
      }
    },
    methods: {
      menuName(val){
        this.activeIndex = val
         this.$router.push("/" + val);
      },
      handleSelect(key, keyPath) {
        this.activeIndex = key;
        this.$router.push("/" + key);
      }
    }
  };
</script>

<style lang='less' scoped>

</style>
