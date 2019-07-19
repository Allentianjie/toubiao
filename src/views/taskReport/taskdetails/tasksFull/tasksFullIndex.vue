<template>
  <div id="taskSummaryPage">
    <div class="taskSummaryBreadcrumb">
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
           <i class="el-icon-location" style="float: left;margin-right: 5px;"></i>
           <el-breadcrumb-item :to="{ path: '/' }">一级</el-breadcrumb-item>
           <el-breadcrumb-item>二级</el-breadcrumb-item>
           <el-breadcrumb-item>三级</el-breadcrumb-item>
       </el-breadcrumb>-->
      <div style="text-align: left">
                    <span>
                      当前展示：{{breadcrumb}}
                    </span>
        <Button style="float: right" @click="goback" type="text" icon="ios-undo">返回</Button>
      </div>
    </div>
    <div class="taskSummaryItemTop">
      <div class="summaryEchart">
        <div class="left">
          <div class="imgs"></div>
          <h3 class="taskbefore">诊改规划监控</h3>
          <RadarChart :TaskMonitorData="TaskMonitorData"></RadarChart>
        </div>
        <div class="right">
          <h3 class="taskbefore">诊改规划统计</h3>
          <piePetalChart :pieChartData="TaskSummaryData"></piePetalChart>
        </div>
      </div>
    </div>
    <div class="taskSummaryItem">
      <div class="summaryEchart">
        <GanttChar :ganttChar="ganttChar"></GanttChar>
      </div>
    </div>
  </div>
</template>

<script>

  import piePetalChart from "@/components/taskHall/piePetalChart";
  import RadarChart from "@/components/taskHall/radarChart_two";
  import GanttChar from "@/components/taskHall/GanttChar";

  export default {
    components: {RadarChart, piePetalChart, GanttChar},
    data() {
      return {
        TaskSummaryData: {},
        TaskMonitorData: {},
        ganttChar: {},
        breadcrumb: '',
        directorId: null,
      };
    },
    created() {
      // 显示我的任务
    },
    mounted() {
      console.log(66, this.$route.query)
      this.breadcrumb = this.$route.query.breadcrumb // 面包屑
      this.directorId = this.$route.query.id // id
      this.getData()
    },
    methods: {
      // 返回
      goback() {
        this.$router.push({path: '/taskdetail',query: {id:this.directorId,breadcrumb:this.breadcrumb}});
      },
      getData() {
        let that = this
        that.$Get("/admin/task/detail/summary/" + this.directorId, {}, function (res) {
          that.getGanttData(res.data.taskList)
          that.getTaskEducation(res.data.summary)
          that.getTaskMonitorData(res.data.summary)
        });

      },
      //   获取任务监控
      getTaskMonitorData(data) {
        this.TaskMonitorData = {
          //任务监控
          id: "taskMonitorId",
          legendData: ["诊改监控"],
          seriesData: [
            {
              value: [data.makeIt, data.overtime, data.warn, data.spiral],
              // value: [0, 0, 0, 0],
              name: "诊改检查"
            }
          ],
          indicatorData: [
            {text: "达标", max: data.total},
            {text: "逾期", max: data.total},
            {text: "报警", max: data.total},
            {text: "诊改", max: data.total}
          ]
        };
      },
      //  获取任务规划统计
      getTaskEducation(data) {
        this.TaskSummaryData = {
          total: data.total,
          id: "teacherEducationId",
          legendData: ["未开始", "已结束", "进行中"],
          seriesData: [
            {value: data.notStart, name: "未开始"},
            {value: data.ended, name: "已结束"},
            {value: data.ongoing, name: "进行中"}
          ]
        };
      },
      // 甘特图
      getGanttData(data) {
        let name = []
        let startTime = [] // 开始
        let endTime = [] // 结束时间，未完成
        let complete = [] // 已完成
        let date = new Date
        let currentDate = date.getFullYear() + '-' + (date.getMonth() + 2) + '-' + date.getDate()
        data.map(o => {
          name.push(o.taskName)
          startTime.push(o.startTime)// 开始时间
          if ((new Date(o.endTime).getTime()) < (new Date(currentDate).getTime())) {
            complete.push(o.endTime)
            endTime.push('-')
          } else if ((new Date(o.endTime).getTime()) > (new Date(currentDate).getTime())) {
            endTime.push(o.endTime)// 结束时间
            complete.push('-')
          }
        })
        this.ganttChar = {
          //任务监控
          id: "ganttChartId",
          legendData: name,
          seriesData: {
            begin: startTime, // 开始
            finish: endTime, // 未完成
            complete: complete // 完成
          }
        };
      },
    }
  };
</script>

<style lang='less' scoped>
  @import url("tasksFull.less");
</style>
