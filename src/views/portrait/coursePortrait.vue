<template>
  <div id="taskSummaryPage">
    <div class="taskSummaryItem">
      <div class="summaryEchart" id=" portraitTop">
        <Base :baselist.sync="baseData"></Base>
      </div>
    </div>
    <div class="taskSummaryItemTop">
      <div class="summaryEchart">
        <div class="left">
          <div>
            <h3 class="taskbefore">综合概况</h3>
          </div>
          <Statistic :statisticData.sync="leftData" style="height: calc(100% - 50px)"></Statistic>
        </div>
        <div class="right">
          <div>
            <h3 class="taskbefore">任务指标</h3>
          </div>
          <Other style="height: calc(100% - 50px)" :otherData.sync="rightData"></Other>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Other from "./courseChild/other";
  import Stable from "./courseChild/table";
  import Base from "./courseChild/baseData";
  import Statistic from "./courseChild/statistics";

  export default {
    name: "index",
    components: {Base, Statistic, Other,Stable},
    data() {
      return {
        userInfo: null,
        baseData: {}, // 基础信息
        leftData: [], // 左边数据
        rightData: {}, // 右边数据
        list: {
          data: [],
          current: 1,
          size: 10,
          total: 0,
          coursename: ""  // 搜索关键字
        },
        bottomShow: false,
        TaskreportsData: {},
        BarData: {},
        LineData: {},
        BarLeftData: {},
        BarCentreData: {},
        BarRightData: {}
      };
    },
    /*watch:{
      $route (to, from){
      }
    },*/
    mounted() {
      this.initFn();
      // this.getLinChartData();
    },
    methods: {
      // 初始化
      initFn() {
        // 默认的课程信息
        this.baseData = {
          credit:"",    //学分
          period:"",    //学时
          coursecode:"", //课程代码
          success: "",
          name:""  //课程名
        };

        // 获取用户信息
        this.userInfo = this.$store.state.userInfo; // 用户信息
        let code = this.$route.query.code;
        if(this.$route.query.code){
          let param = { coursecode: code, year: "" };
          // let type= this.$route.query.type
          // this.$emit("menuName", type);
          this.getData(param)
        }else {
          let param = { coursecode: "", year: "" };
          this.getData(param)
        }

      },

      /**
       * @description: 请求课程列表数据
       * @param {type}
       * @return:
       */

      /**
       * @description: 获取任务报表数据
       * @param {type}
       * @return:
       */
      getData(param) {
        let that = this; //  coursecode: code, year: ""
        that.$Get("/portrait/schoolPortrait/coursepartrait", param, function (res) {
          if (res.code === 0) {
            that.baseData = res.data;
            that.leftData = res.data.left;
            that.rightData = res.data.right;
          }
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
            {value: data.total, name: data.total + " \n任务总数"}
          ],
          // totalData: [{ value: data.total, name: "任务总数" }],
          pieChartId: "teacherEducationId",
          legendData: ["任务总数", "未开始", "已结束", "进行中"],
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
            /*xData: ['1月','2月','3月'],
      tasksNum: [null, 0,0], // 任务数量1-7个月的量
      tasksOverdue:[0, 0,null], // 任务逾期
      tasksPolice:[0, 0, null,], // 任务报警
      tasksAccomplish:[0, 0, null], // 任务达标1-7个月的量*/
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

  .statistics {
    height: calc(100% - 40px);
  }
</style>
