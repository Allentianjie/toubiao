<!--
author: tianj
time: 2019年5月25日10:19:12
remark: 学校概况 -- （教室）下钻
-->
<template>
  <div class="left-body">
    <div class="head">
      <span><i class="el-icon-location" style="color: #129B7F; padding-right: 8px;"></i>建筑物-{{name}}</span>
      <button type="primary" ghost @click="$router.back(-1)">返回上级</button>
    </div>
    <div class="main">
      <div class="layer">
        <div class="layer-body">
          <div class="title">下级数据</div>
          <div class="con">
            <barEchart ref="bar" :barData="bar.echart"></barEchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import barEchart from "./bar.vue";

  export default {
    name: "",
    components: {
      barEchart,
    },
    data() {
      return {
        name: "",
        bar: {
          echart: {
            id: "bar-one",
            index: "1",
            name: [],
            yAxis: [],
            seriesData: []
          }
        },
      }
    },
    mounted() {
      this.name = this.$route.query.titleName;
      this.initFn();
    },
    methods: {
      // 初始化
      initFn() {
          this.$Get("/admin/subDrillClasses/getBuildingList", null, res => {
            let barArry = res.data;
            let bar_xAxis = [];
            let bar_seriesData = [];
            for (let i = 0; i < barArry.length; i++) {
              bar_xAxis.push(barArry[i].correName);
              bar_seriesData.push(barArry[i].classroomCount)
            }
            this.bar.echart = {
              obj: barArry,
              id: "bar-one",
              index: "1",
              xAxis: bar_xAxis,
              seriesData: bar_seriesData
            };
          });
      },
    }
  }
</script>

<style lang="less" scoped>

  .left-body {
    background: #f0f0f0;
    padding: 1.3% 1.2%;
    display: flex;
    flex-direction: column;

    .head {
      height: 9%;
      background: #fff;
      border-radius: 6px;
      overflow: hidden;
      padding: 0 4% 0 1.5%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      span {
        color: #555;
        font-size: 16px;
        font-weight: 600;
      }

      button {
        color: #57a3f3;
        border: 1px solid #57a3f3;
        padding: 4px 15px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 12px;
        height: 32px;
        background: #fff;

        &:hover {
          color: #4a8df3;
        }
      }
    }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;

      .layer {
        flex: 1;
        padding-top: 1%;

        .layer-body {
          height: 100%;
          background: #fff;
          display: flex;
          flex-direction: column;
          border-radius: 6px;
          overflow: hidden;

          .title {
            color: #555;
            height: 40px;
            font-size: 16px;
            font-weight: 600;
            line-height: 40px;
            text-align: left;
            padding-left: 1.5%;
          }

          .con {
            flex: 1;
            padding: 16px;
          }
        }
      }
    }
  }

</style>

