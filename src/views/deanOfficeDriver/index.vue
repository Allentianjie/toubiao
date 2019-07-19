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
            重点专业在各系分布情况
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
            专业诊改指标完成率排名前十
          </div>
          <div class="chart-box">
            <TopTen :topTenData="topTenData"></TopTen>
          </div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="right-chart">
          <div class="score newBtn">
            专业诊改指标完成率排名后十
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
      this.getImportantData();
      this.getDimensionData();
      this.getTopTenData();
      // this.getLaterTenData()
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
        this.$Get("/portrait/statistic/majorTaskRank", null, res => {
          if (res.code == 0) {
            let deptCode = [];
            let deptName = [];
            let disRate = [];
            let rate = [];
            let rsCount = [];
            let total = [];
            for (let i= res.data.topTen.length-1;i>=0;i--) {
              deptCode.push(res.data.topTen[i].deptCode);
              deptName.push(res.data.topTen[i].deptName);
              disRate.push(res.data.topTen[i].disRate);
              rate.push(res.data.topTen[i].rate);
              rsCount.push(res.data.topTen[i].rsCount);
              total.push(res.data.topTen[i].total);
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
            for (let i= res.data.laterTen.length-1;i>=0;i--) {
              deptCode2.push(res.data.laterTen[i].deptCode);
              deptName2.push(res.data.laterTen[i].deptName);
              disRate2.push(res.data.laterTen[i].disRate);
              rate2.push(res.data.laterTen[i].rate);
              rsCount2.push(res.data.laterTen[i].rsCount);
              total2.push(res.data.laterTen[i].total);
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
      //查询教务处重点专业在各系分布情况
      getImportantData() {
        this.$Get("/portrait/teachOffice/importantmajorrate", null, res => {
          if (res.code == 0) {
            this.comData = {
              id: "CompletionRate",
              data: res.data
            }
          }
        })
      },
      getDimensionData() {
        this.$Get("/portrait/statistic/radar?deptCode=1050", null, res => {
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
