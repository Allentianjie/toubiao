<template>
  <div class="gc-cost">
    <!-- top -->
    <div class="gc-cost__hd">
      <div class="gc-cost__hd--block">
        <mFundsCount v-if="data1" :funsCountData="data1"></mFundsCount>
      </div>
      <div class="gc-cost__hd--block">
        <mFundsCount v-if="data2" :funsCountData="data2"></mFundsCount>
      </div>
      <div class="gc-cost__hd--block">
        <mFundsCount v-if="data3" :funsCountData="data3"></mFundsCount>
      </div>
      <div class="gc-cost__hd--block">
        <mFundsCount v-if="data4" :funsCountData="data4"></mFundsCount>
      </div>
    </div>
    <div class="gc-cost__bd">
      <div class="item-block">
        <mBarDataZoom v-if="budgetData.chartId" :barZoomData="budgetData"></mBarDataZoom>
      </div>
      <div class="item-block">
        <mRoseChart v-if="fundsData.chartId" :roseData="fundsData"></mRoseChart>
      </div>
    </div>
    <div class="gc-cost__ft">
      <div class="item-block">
        <mAreaStackingChart v-if="fundsIncome.chartId" :areaStackingData="fundsIncome"></mAreaStackingChart>
      </div>
      <div class="item-block">
        <mLineChart v-if="fundsPay.chartId" :lineData="fundsPay"></mLineChart>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */

  import mBarDataZoom from '@/components/Echarts/BarDataZoom'
  import mRoseChart from '@/components/Echarts/RoseChart'
  import mAreaStackingChart from '@/components/Echarts/AreaStackingChart'
  import mLineChart from '@/components/Echarts/LineChart'
  import mFundsCount from '@/components/Echarts/FundsCount'

  export default {
    name: 'analysisExpenditure',
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
        budgetData: {
          // chartId: 'budgetId',
          // titleText: '各部门当年预算及执行情况',
          // legendData: ['预算', '支出'],
          // xAxisData: ['海洋学院', '海运学院', '机械与船舶海洋工程学院、工程训练中心', '石油与化工学院', '食品工程学院'
          //   , '电子与信息工程学院', '资源与环境学院', '人文学院', '经济管理学院', '教育学院','陶瓷与设计学院',
          //   '理学院', '建筑工程学院', '马克思主义学院', '继续教育学院', '创新创业学院', '国际教育与外国语学院'],
          // seriesData: [
          //   {
          //     name: '预算',
          //     data: [100, 183, 413, 375, 502, 485,
          //       100, 183, 413, 375, 502, 485,
          //       502, 485, 376, 321, 300, 364]
          //   },
          //   {
          //     name: '支出',
          //     data: [120, 203, 433, 395, 522, 505,
          //       120, 203, 433, 395, 522, 505,
          //       522, 505, 396, 341, 319, 375]
          //   }
          // ]
        },
        fundsData: {
          // chartId: 'fundsId',
          // titleText: '各类科研项目经费比例',
          // legendData: ['全国教育科学规划课题', '863计划', '省科技厅科技计划-重大专项', '国家其他部委项目', '校级科研项目',
          //   '国家自然科学基金', '省部级其他类别项目', '省科技厅科技计划-重点研发计划', '市科学研究与技术开发计划项目'],
          // seriesData: [{value: 14.4, name: '全国教育科学规划课题'},
          //   {value: 10.4, name: '863计划'},
          //   {value: 17.5, name: '省科技厅科技计划-重大专项'},
          //   {value: 11.8, name: '国家其他部委项目'},
          //   {value: 17.1, name: '校级科研项目'},
          //   {value: 14.5, name: '国家自然科学基金'},
          //   {value: 12.7, name: '省部级其他类别项目'},
          //   {value: 10.2, name: '省科技厅科技计划-重点研发计划'},
          //   {value: 14.7, name: '市科学研究与技术开发计划项目'}]
        },
        fundsIncome: {
          // chartId: 'fundsIncomeId',
          // titleText: '各类经费收入趋势',
          // xAxisData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
          // seriesData: [
          //   {
          //     name: '经费类型一',
          //     data: [13, 20, 45, 32, 56, 78, 53, 26, 90, 20],
          //     unit: '万元'
          //   },
          //   {
          //     name: '经费类型二',
          //     data: [15, 23, 36, 38, 42, 57, 59, 24, 83, 17],
          //     unit: '万元'
          //   }
          // ]
        },
        fundsPay: {
          // chartId: 'fundsPayId',
          // titleText: '教学经费支出趋势',
          // xAxisData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
          // seriesData: [
          //   {
          //     name: '经费类型一',
          //     data: [13, 20, 45, 32, 56, 78, 53, 26, 90, 20],
          //     unit: '万元'
          //   }
          // ]
        }
      }
    },
    components: {
      mBarDataZoom, mRoseChart, mAreaStackingChart, mLineChart, mFundsCount
    },
    methods:{

    },
    created() {
      let that = this
      that.$Get("/bd/funding/getGeneralBudget", {}, function(data) {
        that.data1 = data.data
      })
      that.$Get("/bd/funding/getSpecificSpending", {}, function(data) {
        that.data2 = data.data
      })
      that.$Get("/bd/funding/getResearchBudgets", {}, function(data) {
        that.data3 = data.data
      })
      that.$Get("/bd/funding/getTeachingBudget", {}, function(data) {
        that.data4 = data.data
      })

      that.$Get("/bd/funding/getDepartmentBudgetImplementation", {}, function(data) {
        that.data4 = data.data
      })

      that.$Get("/bd/funding/getScale/scientificResearch", {}, function(data) {
        that.budgetData = data.data
      })

      that.$Get("/bd/funding/getSpendingTrend/teaching", {}, function(data) {
        that.fundsPay = data.data
      })

      that.$Get("/bd/funding/getRevenueTrend", {}, function(data) {
        that.fundsIncome = data.data
      })
    }
  }
</script>

<style  lang="less" scoped>
  @import '~@/assets/css/home.less';
</style>
