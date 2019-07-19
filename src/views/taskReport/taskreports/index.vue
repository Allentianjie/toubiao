<template>
  <div id="taskSummaryPage">
    <div class="taskSummaryItemTop">
      <div class="summaryEchart">
        <div class="left">
          <!--<Badge v-show="WarnTotal>0" style="margin-top:10px" class="imgs" :count=WarnTotal>-->
            <!--<Avatar style="color: red" shape="square" icon="md-bulb"/>-->
          <!--</Badge>-->
          <Badge v-show="WarnTotal>0" style="margin-top:10px" class="imgs" :count=WarnTotal overflow-count="2000000">
            <Tooltip content="预警项" placement="bottom">
              <Avatar style="color: red" shape="square" icon="md-bulb"/>
            </Tooltip>
          </Badge>

          <h3 class="taskbefore">诊改汇总</h3>
          <PieChart :TaskreportsData="TaskreportsData"></PieChart>
        </div>
        <div class="right">
          <h3 class="taskbefore">执行汇总</h3>
          <BarChart :BarData="BarData"></BarChart>
        </div>
      </div>
    </div>
    <div class="taskSummaryItem">
      <div class="summaryEchart">
        <LineChart :LineData="LineData"></LineChart>
      </div>
    </div>
    <!--以下暂时不做-->
    <div class="taskSummaryBottom" v-if="bottomShow">
      <div class="barEchart">
        <!--<BarChartMuch :BarLeftData="BarLeftData"></BarChartMuch>-->
      </div>
      <div class="barEchart">
        <!--<BarChartMuch :BarLeftData="BarCentreData"></BarChartMuch>-->
      </div>
      <div class="barEchart">
        <!--<BarChartMuch :BarLeftData="BarRightData"></BarChartMuch>-->
      </div>
    </div>
  </div>
</template>
<script>
  import PieChart from "@/components/taskHall/pieCharts_three.vue";
  import BarChart from "@/components/taskHall/barChart.vue";
  import LineChart from "@/components/taskHall/lineChart_much.vue";
  // import BarChartMuch from "@/components/monitoring/barChart_much.vue";

  export default {
    name: "index",
    // components: { PieChart, BarChart, LineChart, BarChartMuch },
    components: {PieChart, BarChart, LineChart},
    data() {
      return {
        WarnTotal: 0,
        bottomShow: false,
        TaskreportsData: {},
        BarData: {},
        LineData: {},
        BarLeftData: {},
        BarCentreData: {},
        BarRightData: {},
        taskParam: {
          type: "1",
          keyword: "",
          hieId: "",
        },
      };
    },
    /*watch:{
      $route (to, from){
      }
    },*/
    mounted() {
      // this.getWarnData();//查询报警指标
      this.getData();
      // this.getLinChartData();
    },
    methods: {
      //获取报警指标条数
      // getWarnData() {
      //   let that = this;
      //   that.$Get(
      //     "/admin/task/page",
      //     Object.assign(1, that.taskParam),
      //     function (data) {
      //       that.WarnTotal = data.data.total;
      //     }
      //   );
      // },
      /**
       * @description: 获取任务报表数据
       * @param {type}
       * @return:
       */
      getData() {
        let that = this;
        that.$Get("/admin/task/report/summary", {}, function (data) {
          that.getTeacherEducation(data.data);
          that.getBarChartData(data.data);
          that.WarnTotal = data.data.warning
        });
        that.$Get("/admin/task/report/monthTrend", {}, function (data) {
          that.getLinChartData(data.data);
        });
      },
      /**
       * @description: 获取任务汇总
       * @param {type}
       * @return:
       */
      getTeacherEducation(data) {
        this.TaskreportsData = {
          totalData: [
            {value: data.total, name: data.total + " \n诊改总数"}
          ],
          // totalData: [{ value: data.total, name: "任务总数" }],
          pieChartId: "teacherEducationId",
          legendData: ["诊改总数", "未开始", "已结束", "进行中"],
          seriesData: [
            {value: data.notStarted, name: "未开始"},
            {value: data.finished, name: "已结束"},
            {value: data.inProgress, name: "进行中"}
          ]
        };
      },
      /**
       * @description: 获取执行汇总
       * @param {type}
       * @return:
       */
      getBarChartData(data) {
        this.BarData = {
          pieChartId: "barChartId",
          seriesData: {
            xData: ["逾期", "达标", "未达标", "诊改", "预警"],
            yData: [
              data.overtime,
              data.achieving,
              data.notAchieving,
              data.spiral,
              data.warning
            ]
          }
        };
      },
      /**
       * @description: 获取任务状态
       * @param {type}
       * @return:
       */
      getLinChartData(data) {
        let dateArr = [];
        let total = []; // 任务总数
        let overtime = []; // 逾期
        let warning = []; // 预警
        let achieving = []; // 达标
        data.map(o => {
          dateArr.push(o.trendTime);
          total.push(o.taskSummary.total);
          overtime.push(o.taskSummary.overtime);
          warning.push(o.taskSummary.warning);
          achieving.push(o.taskSummary.achieving);
        });

        this.LineData = {
          pieChartId: "LineChartId",
          seriesData: {
            //       xData: ['1月','2月','3月'],
            // tasksNum: [null, 0,0], // 任务数量1-7个月的量
            // tasksOverdue:[0, 0,null], // 任务逾期
            // tasksPolice:[0, 0, null,], // 任务报警
            // tasksAccomplish:[0, 0, null], // 任务达标1-7个月的量
            xData: dateArr,
            tasksNum: total, // 任务数量1-7个月的量
            tasksOverdue: overtime, // 任务逾期
            tasksPolice: warning, // 任务报警
            tasksAccomplish: achieving // 任务达标1-7个月的量
          }
        };

      },
      getBar_LeftChartData() {
        this.BarLeftData = {
          pieChartId: "barMuchLeftId",
          typeChart: "完成率最高的5各部门",
          seriesData: {
            xData: [
              "XXX学校",
              "YYY学校",
              "HHH学校",
              "VVV学校",
              "UUU学校"
            ],
            yData: [390, 300, 280, 220, 150]
          }
        };
        this.BarCentreData = {
          pieChartId: "barMuchCentreId",
          typeChart: "达标率最高的5各部门",
          seriesData: {
            xData: [
              "QQQ学校",
              "WWW学校",
              "EEE学校",
              "RRR学校",
              "TTT学校"
            ],
            yData: [290, 260, 210, 120, 50]
          }
        };
        this.BarRightData = {
          pieChartId: "barMuchRightId",
          typeChart: "逾期率最高的5各部门",
          seriesData: {
            xData: [
              "AAA学校",
              "SSS学校",
              "DDD学校",
              "NNN学校",
              "CCC学校"
            ],
            yData: [320, 280, 240, 200, 150]
          }
        };
      }
    }
  };
</script>

<style lang='less' scoped>
  @import url("./index.less");
</style>
