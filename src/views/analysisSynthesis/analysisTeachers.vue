<template>
  <div class="collegeLq">
    <div class="gc-teams">
    <!-- left -->
    <div class="gc-teams__hd">
      <div class="gc-teams__hd--block gc-teams__hd--normal">
        <mAnnularChart :annularData="annularData"></mAnnularChart>
        <!-- 遮罩层 -->
        <!--<div class="gc-teams__hd&#45;&#45;mask" v-show="stautsMask"></div>-->
      </div>
      <div class="gc-teams__hd--block gc-teams__hd--normal">
        <mPyramidChart :pyramid="pyramid"></mPyramidChart>
        <!--<div class="gc-teams__hd&#45;&#45;mask" v-show="stautsMask"></div>-->
      </div>
    </div>
    <!-- middle -->
    <div class="gc-teams__bd">
      <div class="gc-teams__hd--flex">
        <div class="flex-item">
          <div class="flex-item__line"></div>
          <mDataDisplay :dataDisplayData="dataDisplayData1"></mDataDisplay>
          <!--<div class="gc-teams__hd&#45;&#45;mask" v-show="stautsMask"></div>-->
        </div>
        <div class="flex-item">
          <div class="flex-item__line"></div>
          <mDataDisplay :dataDisplayData="dataDisplayData2"></mDataDisplay>
          <!--<div class="gc-teams__hd&#45;&#45;mask" v-show="stautsMask"></div>-->
        </div>
        <div class="flex-item">
          <div class="flex-item__line"></div>
          <mDataDisplay :dataDisplayData="dataDisplayData3"></mDataDisplay>
          <!--<div class="gc-teams__hd&#45;&#45;mask" v-show="stautsMask"></div>-->
        </div>
      </div>
      <div class="gc-teams__hd--block gc-teams__hd--total">
        <mGuangXiMap :mapData="mapData"></mGuangXiMap>
        <!-- 遮罩层 -->
        <!--<div class="gc-teams__hd&#45;&#45;mask" v-show="stautsMask"></div>-->
      </div>
    </div>
    <!-- right -->
    <div class="gc-teams__ft">
      <div class="gc-teams__hd--block gc-teams__hd--normal">
        <mSemiringChart :semiringData="semiringData"></mSemiringChart>
        <!-- 遮罩层 -->
        <!--<div class="gc-teams__hd&#45;&#45;mask gc-teams__hd&#45;&#45;normal" v-show="stautsMask"></div>-->
      </div>
      <div class="gc-teams__hd--block gc-teams__hd--normal">
        <mTeacherAge :teacherAgeData="teacherAgeData"></mTeacherAge>
        <!--<div class="gc-teams__hd&#45;&#45;mask" v-show="stautsMask"></div>-->
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import mAnnularChart from '@/components/Echarts/AnnularChart'
  import mSemiringChart from '@/components/Echarts/SemiringChart'
  import mDataDisplay from '@/components/Echarts/DataDisplay'
  import mGuangXiMap from '@/components/Echarts/GuangXiMap'
  import mPyramidChart from '@/components/Echarts/PyramidChart'
  import mTeacherAge from '@/components/Echarts/TeacherAge'
export default {
  name: "analysisTeachers",
  data () {
    return {
      annularData: {
        titleText: '教师学历分布',
        chartId: 'educationId',
        legendData: ['其他', '本科', '硕士学位', '博士学位'],
        seriesData: [{showVal: 70, hideVal: 30}, {showVal: 40, hideVal: 10}, {showVal: 46, hideVal: 12}, {showVal: 6, hideVal: 2}],
        describe: {
          value: 209,
          unit: '人',
          word: '专任教师'
        }
      },
      pyramid:{
        chartId: 'personnelId',
        titleText: '高级人才情况',
        markData: [
          [{x: '53%', y: '25%'}, {x: '86%', y: '25%', value: '10个', lineStyle: {color: '#000'}}],
          [{x: '60%', y: '40%'}, {x: '86%', y: '40%', value: '50个', lineStyle: {color: '#000'}}],
          [{x: '68%', y: '55%'}, {x: '86%', y: '55%', value: '102个', lineStyle: {color: '#000'}}],
          [{x: '76%', y: '70%'}, {x: '86%', y: '70%', value: '171个', lineStyle: {color: '#000'}}],
          [{x: '84%', y: '85%'}, {x: '86%', y: '85%', value: '81个', lineStyle: {color: '#000'}}]
        ],
        seriesData: [
          {value: 1, name: '省部级\n教学团队'},
          {value: 2, name: '国家千人\n计划特聘专家'},
          {value: 3, name: '自治区特聘专家'},
          {value: 4, name: '创新团队'},
          {value: 5, name: '省部级高层次人才'}
        ]
      },
      dataDisplayData1:{
        title: '教师总数（折合）',
        numerical: '0',
        up: true,
        describe: '“双师型”教师0人',
        word: '占比',
        num: '0%',
        bgColor: '#CC9B32'
      },
      dataDisplayData2:{
        title: '师生比',
        numerical: '0:0',
        up: false,
        describe: '',
        word: '低于教育部要求',
        num: '0：0',
        bgColor: '#6E99FA'
      },
      dataDisplayData3:{
        title: '在校生总数',
        numerical: '0',
        up: true,
        describe: '函授学生0人',
        word: '占比',
        num: '0%',
        bgColor: '#63B64D'
      },
      mapData:{
        value: '0',
        ratio: '0',
        list: [
        ]
      },
      semiringData:{
        titleText: '在校生培养分布',
        chartId: 'cultureId',
        legendData: ['本科生', '高职生', '研究生', '留学生'],
        seriesData: [{showVal: 0, hideVal: 0}, {showVal: 0, hideVal: 0}, {showVal: 0, hideVal: 0}, {showVal: 0, hideVal: 0}],
        describe: {
          value: 0,
          unit: '人',
          word: '在校生'
        }
      },
      teacherAgeData: {
        chartId: 'teacherAge',
        titleText: '教师年龄分布',
        yAxisData: ['25-30岁', '31-40岁', '41-50岁', '51-60岁'],
        seriesData: [0, 0, 0, 0],
        woman: 0,
        man: 0
      }
    }
  },
  components: {
    mAnnularChart, mSemiringChart, mDataDisplay, mGuangXiMap, mPyramidChart, mTeacherAge
  },
  mounted() {
    let that = this
    that.$Get("/bd/tas/getTeacherEducation", {}, function(data) {
      that.annularData = data.data
    })
    that.$Get("/bd/tas/getPersonnel", {}, function(data) {
      that.pyramid = data.data
    })
    that.$Get("/bd/tas/getTeacherData", {}, function(data) {
      data.data.bgColor= '#CC9B32'
      that.dataDisplayData1 = data.data
    })
    that.$Get("/bd/tas/getTeacherStudentData", {}, function(data) {
      data.data.bgColor= '#6E99FA'
      data.data.title= '生师比'
      that.dataDisplayData2 = data.data
    })
    that.$Get("/bd/tas/getAreaInfo", {}, function(data) {
      that.mapData = data.data
    })
    that.$Get("/bd/tas/getStudentsCultureType", {}, function(data) {
      that.semiringData = data.data
    })
    that.$Get("/bd/tas/getAgeLevels", {}, function(data) {
      that.teacherAgeData = data.data
    })
    that.$Get("/bd/tas/getStudentsData", {}, function(data) {
      data.data.bgColor= '#63B64D'
      that.dataDisplayData3 = data.data
    })
  }
}
</script>

<style  lang="less" scoped>
  @import '~@/assets/css/home.less';
</style>
