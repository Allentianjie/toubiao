<template>
  <div class="gc-college">
    <!-- left -->
    <div class="gc-college__hd">
      <div class="gc-college__hd--block gc-college__hd--normal">
        <mStripChart v-if="data1.chartId" :strip-data="data1"></mStripChart>
      </div>
      <div class="gc-college__hd--block gc-college__hd--normal">
        <mRadarSolid v-if="data2.chartId" :radar-solid-data="data2"></mRadarSolid>
      </div>
    </div>
    <!-- middle -->
    <div class="gc-college__bd">
      <div class="gc-college__hd--block gc-college__hd--total">
        <mEarlyWarningSurvey v-if="data3" :survey-data="data3"></mEarlyWarningSurvey>
      </div>
      <div class="gc-college__hd--block gc-college__hd--min">
        <mCircleMore v-if="data4" :circle-data="data4"></mCircleMore>
      </div>
    </div>
    <!-- right -->
    <div class="gc-college__ft">
      <div class="gc-college__hd--block gc-college__hd--normal">
        <!-- TODO : 这里应该要提供两个传参的地方展示两个不同请求的图表-->
        <mCollegeTabs></mCollegeTabs>
      </div>
      <div class="gc-college__hd--block gc-college__hd--normal">
        <!-- TODO : 这里应该要提供两个传参的地方展示两个不同请求的图表 就业学校不做，所以现有的接口不用提供解析-->
        <mGetJobTabs></mGetJobTabs>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import mStripChart from '@/components/Echarts/StripChart'
  import mRadarSolid from '@/components/Echarts/RadarSolid'
  import mEarlyWarningSurvey from '@/components/Echarts/EarlyWarningSurvey'
  import mCircleMore from '@/components/Echarts/CircleMore'
  import mCollegeTabs from '@/components/Echarts/CollegeTabs'
  import mGetJobTabs from '@/components/Echarts/GetJobTabs'

  export default {
    name: 'analysisCollege.vue',
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
        defaultNav: [],     // 导航数据处理
        majorList: {
          title: '全校专业情况'
        }
      }
    },
    components: {
      mStripChart, mGetJobTabs, mRadarSolid, mEarlyWarningSurvey, mCircleMore, mCollegeTabs
    },
    computed:{
      chartValue: {
        get() {
          return this.charts
        },
        set(val) {
          this.charts = val
        }
      }
    },
    methods:{

    },
    created() {
      let that = this
      that.$Get("/bd/college/getSpecialProfession", {}, function(data) {
        that.data1 = data.data
      })

      that.$Get("/bd/college/subjectsAndMajorDistribution", {}, function(data) {
        that.data2 = data.data
      })

      that.$Get("/bd/college/getWarningDeptNum", {}, function(data) {
        that.data3 = data.data
      })

      that.$Get("/bd/college/getProfessionDist", {}, function(data) {
        that.data4 = data.data
      })

      that.$Get("/bd/college/getProfessionNum", {}, function(data) {
        console.log("学院专业数",data)
      })

      that.$Get("/bd/college/getCourseNum", {}, function(data) {
        console.log("学院课程数",data)
      })

      that.$Get("/bd/college/getEmpRateTop", {}, function(data) {
        console.log("就业率",data)
      })

      that.$Get("/bd/college/getEmpSalaryTop", {}, function(data) {
        console.log("就业工资",data)
      })
    },
  }
</script>



<style  lang="less" scoped>
  @import '~@/assets/css/home.less';
</style>
