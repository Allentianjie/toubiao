<template>
  <div id="depart">
    <div class="top">
      <div class="top-content">
        <Numerical></Numerical>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="left-chart">
          <div class="ranking newBtn">
            优秀学生在各系分布情况
          </div>
          <div class="chart-box">
            <CompletionChart :comData="comData"></CompletionChart>
          </div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="right-chart">
          <div class="score newBtn">
            诊改各维度得分
          </div>
          <div class="chart-box">
            <DimensionChart :dimensionData="dimensionData"></DimensionChart>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="left-chart">
          <div class="ranking newBtn">
            行政部门诊改指标数量排名前十
          </div>
          <div class="chart-box">
            <TopTen :topTenData="topTenData"></TopTen>
          </div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="right-chart">
          <div class="score newBtn">
            行政部门诊改指标完成率排名前十
          </div>
          <div class="chart-box">
            <LaterTen :laterTenData="laterTenData"></LaterTen>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Numerical from "./numerical.vue";
  import DimensionChart from "./dimensionChart.vue";
  import CompletionChart from "./completionChart.vue";
  import TopTen from "./topTenChart.vue";
  import LaterTen from "./laterTenChart";

  export default {
    components: {
      Numerical, CompletionChart, DimensionChart, TopTen, LaterTen
    },
    name: "index",
    data() {
      return {
        laterTenData: {},
        topTenData: {},
        comData: {},
        dimensionData: {}
      }
    },
    mounted() {
      this.getCompletionData();
      this.getDimensionData();
      this.getTopTenData();
    },
    methods: {
      getLaterTenData() {
        this.laterTenData = {
          id: "LaterTen",
          data: [1, 2, 3]
        }
      },
      //查询topten
      getTopTenData() {
        this.$Get("/portrait/statistic/taskRank", null, res => {
          if (res.code == 0) {
            let deptCode = [];
            let deptName = [];
            let disRate = [];
            let rate = [];
            let rsCount = [];
            let total = [];
            let n = 0;  // 行政部门诊改指标数量排名前十
            let m = 0;  // 行政部门诊改指标完成率排名前十

            // 判断数据个数
            if (res.data.taskRanks.length > 9) { n = 9;
            } else { n = res.data.taskRanks.length; }

            if (res.data.rateRanks.length > 9) { m = 9;
            } else { m = res.data.rateRanks.length; }
            // 超过10个，取前面10个否则全部取
            for (let i = n; i >= 0; i--) {
              // for (let i = res.data.taskRanks.length - 1; i >= res.data.taskRanks.length - 10; i--) {
              deptCode.push(res.data.taskRanks[i].deptCode);
              deptName.push(res.data.taskRanks[i].deptName);
              disRate.push(res.data.taskRanks[i].disRate);
              rate.push(res.data.taskRanks[i].rate);
              rsCount.push(res.data.taskRanks[i].rsCount);
              total.push(res.data.taskRanks[i].total);
            }
            this.topTenData = {
              id: "TopTen",
              deptCode: deptCode,
              deptName: deptName,
              disRate: disRate,
              rate: rate,
              rsCount: rsCount,
              total: total
            };
            let deptCode2 = [];
            let deptName2 = [];
            let disRate2 = [];
            let rate2 = [];
            let rsCount2 = [];
            let total2 = [];
            // 超过10个，取前面10个否则全部取
            for (let i = m; i >= 0; i--) {
              // for (let i = 0; i < res.data.rateRanks.length; i++) {
              deptCode2.push(res.data.rateRanks[i].deptCode);
              deptName2.push(res.data.rateRanks[i].deptName);
              disRate2.push(res.data.rateRanks[i].disRate);
              rate2.push(res.data.rateRanks[i].rate);
              rsCount2.push(res.data.rateRanks[i].rsCount);
              total2.push(res.data.rateRanks[i].total);
            }
            this.laterTenData = {
              id: "LaterTen",
              deptCode: deptCode2,
              deptName: deptName2,
              disRate: disRate2,
              rate: rate2,
              rsCount: rsCount2,
              total: total2
            }
          }
        });
      },
      getCompletionData() {
        this.$Get("/portrait/teachEmploy/wellstusperate", null, res => {
          if (res.code == 0) {
            this.comData = {
              id: "CompletionRate",
              data: res.data
            }
          }
        })
      },
      getDimensionData() {
        this.$Get("/portrait/statistic/radar?deptCode=1060", null, res => {
          if (res.code == 0) {
            this.dimensionData = {
              id: "dimensions",
              data: res.data
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./index.less");
</style>
