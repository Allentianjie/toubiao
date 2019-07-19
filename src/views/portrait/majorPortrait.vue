<template>
  <div id="taskSummaryPage">
    <div class="taskSummaryItem">
      <div class="summaryEchart" id=" portraitTop">
        <Base v-if="!!baseData" :propData.sync="baseData" @monitorFn="getDataFn"></Base>
      </div>
    </div>
    <div class="taskSummaryItemTop">
      <div class="summaryEchart">
        <div class="left">
          <div>
            <h3 class="taskbefore">综合概况</h3>
          </div>
          <Statistic v-if="!!statisticData" :propData.sync="statisticData" style="height: calc(100% - 50px)"></Statistic>
        </div>
        <div class="right">
          <div>
            <h3 class="taskbefore">任务指标</h3>
          </div>
          <Other v-if="!!otherData" :propData.sync="otherData" style="height: calc(100% - 50px)"></Other>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 整改代码：
   *   Evua Huang
   *   2019-05-09
   *
   * 逻辑：
   * 1、获取数据
   * 2、监听
   */
  import Other from "./majorChild/other";
  import Base from "./majorChild/baseData";
  import Statistic from "./majorChild/statistics";

  export default {
    components: {
      Base,
      Statistic,
      Other
    },
    data() {
      return {
        baseData: null,
        statisticData: null, //左侧指标数据量
        otherData: null //右侧统计
      };
    },
    mounted() {
      let code = this.$route.query.code ? this.$route.query.code : null
      // if(this.$route.query.code){
      //   // let type= this.$route.query.type
      //   // console.log(3,type)
      //   // this.$emit("menuName", type);
      // }
    
      this.getDataFn({year:2018,majorcode: code});
    },
    methods: {
      /**
       * 逻辑1：
       *   请求指标数据
       */
      getDataFn(params) {
        this.$Get("/portrait/majorPortrait/major", params, res => {
          if(res.code==0) {
            this.baseData = res.data;
            this.statisticData = res.data.left;
            this.otherData = res.data.right;
          }
        });
      },
    }
  };
</script>

<style lang='less' scoped>
  @import url("./index.less");

  .statistics {
    height: calc(100% - 40px);
  }
</style>
