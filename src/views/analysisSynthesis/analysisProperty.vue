<template>
  <div class="gc-capital">
    <!-- left -->
    <div class="gc-capital__hd">
      <div class="gc-capital__hd--block gc-capital__hd--normal">
        <mStripChart v-if="data1.chartId" :strip-data="data1"></mStripChart>
      </div>
      <div class="gc-capital__hd--block gc-capital__hd--normal">
        <mFixedRing v-if="data2.chartId" :fixed-ring-data="data2"></mFixedRing>
      </div>
    </div>
    <!-- middle -->
    <div class="gc-capital__bd">
      <div class="gc-capital__hd--block gc-capital__hd--total">
        <mAssetsSituation v-if="data3" :datas="data3"></mAssetsSituation>
      </div>
      <div class="gc-capital__hd--flex">
        <div class="flex-item gc-capital__hd--block">
          <mBorderBottomList v-if="data4" :borderBottomData="data4"></mBorderBottomList>
        </div>
        <div class="flex-item gc-capital__hd--block">
          <mColumnarChart v-if="data5.chartId" :columnarData="data5"></mColumnarChart>
        </div>
      </div>
    </div>
    <!-- right -->
    <div class="gc-capital__ft">
      <div class="gc-capital__hd--block gc-capital__hd--normal">
        <mHighLight v-if="data6" :highLightData="data6"></mHighLight>
      </div>
      <div class="gc-capital__hd--block gc-capital__hd--normal">
        <mRadarChart v-if="data7.chartId" :radarData="data7"></mRadarChart>
      </div>
    </div>
  </div>
</template>

<script>
  import mStripChart from '@/components/Echarts/StripChart'
  import mFixedRing from '@/components/Echarts/FixedRing'
  import mHighLight from '@/components/Echarts/Highlight'
  import mRadarChart from '@/components/Echarts/RadarChart'
  import mColumnarChart from '@/components/Echarts/ColumnarChart'
  import mBorderBottomList from '@/components/Echarts/BorderBottomList'
  import mAssetsSituation from '@/components/Echarts/AssetsSituation'
  export default {
    name: 'analysisProperty',
    props: {
      stautsMask: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        data1:{},
        data2:{},
        data3:{},
        data4:{},
        data5:{},
        data6:{},
        data7:{},
      }
    },
    components: {
      mStripChart, mFixedRing, mHighLight, mRadarChart, mColumnarChart, mBorderBottomList, mAssetsSituation
    },
    methods:{

    },
    created() {
      let that = this
      that.$Get("/bd/assets/getAcreage", {}, function(data) {
        that.data1 = data.data
      })
      that.$Get("/bd/assets/getInstrument", {}, function(data) {
        that.data2 = data.data
      })
      that.$Get("/bd/assets/getSituation", {}, function(data) {
        that.data3 = data.data
      })
      that.$Get("/bd/assets/getLaboratory", {}, function(data) {
        that.data4 = data.data
      })
      that.$Get("/bd/assets/getRegulation", {}, function(data) {
        that.data5 = data.data
      })
      that.$Get("/bd/assets/getResources", {}, function(data) {
        that.data6 = data.data
      })
      that.$Get("/bd/assets/getProportion", {}, function(data) {
        that.data7 = data.data
      })
    }
  }
</script>

<style lang="less" scoped>
  // Transition -------------------------- */
  @--all-transition: all .3s cubic-bezier(.645, .045, .355, 1);
  @--fade-transition: opacity .3s cubic-bezier(0.23, 1, 0.32, 1);
  @--fade-linear-transition: opacity .2s linear;

  // Colors -------------------------- */
  @--color-white: #fff;
  @--color-black: #000;
  @--color-primary: #409EFF;
  @--color-danger: #f56c6c;
  @--color-success: #67c23a;
  @--color-warning: #e6a23c;
  @--color-info: #999;

  @--color-border: #fabf00;       //标签边框色
  @--color-hover: #58aafd;        //标签辅助色
  @--color-desc: #eead22;         //标签文本颜色
  @--color-label: #fef3ba;        //标签背景色

  // Size -------------------------- */
  @--size-base: 14px;
  // CSS3 "栅格化"(flexbox)
  .display-flex() {
    display: -webkit-box;
    /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -ms-flexbox;
    /* IE 10 */
    display: flex;
    // -webkit-box-align: center;
    // -webkit-align-items: center;
    // align-items: center;
    // -webkit-box-pack: center;
    // -ms-flex-pack: center;
    // justify-content: center;
  }

  .box-flex(@a) {
    -webkit-flex: @a;
    -ms-flex: @a;
    flex: @a;
  }
  .gc-capital {
    position: relative;
    padding: 15px 1% 0;
    width: 100%;
    height: ~'calc(100vh - 110px)';
    .display-flex();
    font-size: @--size-base - 2;
    overflow: hidden;
    &__hd {
      width: 25%;
      height: 100%;
      margin-right: 20px;
      /*background:rgba(255,255,255,1);*/
      &--block {
        position: relative;
        margin-bottom: 20px;
        background:rgba(255,255,255,1);
        box-shadow: 0 0 9px 0 rgba(153,153,153,0.75);
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: -8px;
          width: 140px;
          height: 8px;
          pointer-events: none;
          background: url(~@/assets/img/home-line.png) center no-repeat;
          background-size: cover;
        }

      }
      &--normal {
        height: ~'calc((100% - 20px) / 2)';
      }
      &--total {
        height: ~'calc(100% - 240px)';
      }
      &--flex {
        .display-flex();
        align-items: center;
        justify-content: space-between;
        height: 220px;
        .flex-item {
          width: ~'calc((100% - 20px) / 2)';
          height: 100%;
        }
        .gc-capital__hd--block {
          margin-bottom: 0;
        }
      }
      &--mask {
        position: absolute;
        width: 100%;
        height: 100%;
        .display-flex();
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        &:hover{
          background: rgba(0, 0, 0, 0.6);
        }
      }
    }
    &__bd {
      width: ~'calc(50% - 40px)';
    }
    &__ft {
      width: 25%;
      margin-left: 20px;
      /*background:rgba(255,255,255,1);*/
    }
  }
</style>
