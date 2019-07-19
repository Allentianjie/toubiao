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
          <Other :otherData.sync="rightData" style="height: calc(100% - 50px)"></Other>
        </div>
      </div>
    </div>
    <div class="taskSummaryItemtwo">
      <div class="summaryEchart" id="port">
        <Stable :username ='username'></Stable>
      </div>
    </div>
  </div>
</template>
<script>
  import Other from "./stutentChild/other";
  import Stable from "./stutentChild/table";
  import Base from "./stutentChild/baseData";
  import Statistic from "./stutentChild/statistics";

  export default {
    name: "index",
    components: {Base, Statistic, Other,Stable},
    data() {
      return {
        userInfo: null,
        baseData: {}, // 基础信息
        leftData: [], // 左边数据
        rightData: {}, // 右边数据
        bottomShow: false,
        TaskreportsData: {},
        BarData: {},
        LineData: {},
        BarLeftData: {},
        BarCentreData: {},
        BarRightData: {},
        username: ''
      };
    },
    /*watch:{
      $route (to, from){
      }
    },*/
    mounted() {
      this.initFn();
    },
    methods: {
      // 初始化
      initFn() {
        // 默认的学生信息
        this.baseData = {
          name: "",
          college: "暂无",  // 系部
          no: "暂无",   // 学号
          national: "暂无", // 民族
          phone: "暂无",  // 电话
          sex: "暂无",   // 性别
          professional: "暂无",  //专业
          room: "暂无",   // 宿舍
          grade: "暂无",  // 年级
          class: "暂无",  // 班级
          source: "暂无"  // 来源
        };

        this.rightData = {
          actives: "暂无", // 参与思政教育主题活动开展次数
          behavior: "暂无", // 操行评定合格分数
          certificate: "暂无", //  参与易班认证
          absent: "暂无", // 缺课次数
          commentrate: "暂无", // 评教率
          profcompetition: "暂无", // 参与专业技能活动或竞赛（次）
          noprofcompetition: "暂无", // 参与非专业技能活动或竞赛（次）
          skillcertificate: "暂无" // 获取技能证书情况（本）
        };

        // 获取用户信息
        this.userInfo = this.$store.state.userInfo; // 用户信息
        if(this.$route.query.code){
          let routerParam ={username: this.$route.query.code};
          this.username = routerParam.username;
          // let type= this.$route.query.type
          // this.$emit("menuName", type);
          this.getData(routerParam);

        }else if(this.userInfo.username) {
          let param = { username: this.userInfo.username };
          this.username = param.username;
          this.getData(param);
        }
      },

      /**
       * @description: 获取任务报表数据
       * @param {type}
       * @return:
       */
      getData(param) {
        let that = this;
        that.$Get("/portrait/schoolPortrait/studentpartrait", param, function (res) {
          if (res.code === 0) {
            that.leftData = res.data.left;
            that.rightData = res.data.right;
            that.baseData = res.data;
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
