<template>
  <div class="twoChart">
    <div class="topPath">
      <div class="myPath">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <i class="el-icon-location" style="float: left;margin-right: 5px;color: #129B7F"></i>
          <!--<el-breadcrumb-item>全校</el-breadcrumb-item>-->
          <el-breadcrumb-item >{{title.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="btnReturn">
        <Button type="primary" ghost @click="$router.go(-1)">返回上级</Button>
      </div>
    </div>
    <div class="bottomChar">
      <div class="topChar">
        <div class="titleDiv">
          <h3>下级数据</h3>
        </div>
        <div class="char">
          <BarChar :barChartData="barChartData"></BarChar>
        </div>
      </div>
      <div  class="bottomChar">
        <div class="titleDiv">
          <h3>{{title.name}}</h3>
          <h4>{{title.val}}{{title.nuit ? title.nuit : '%'}}</h4>
        </div>
        <div  class="char">
          <LineChar :lineChartData="lineChartData"></LineChar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChar from './LineChar.vue'
  import BarChar from './BarChar.vue'
  export default {
    components: {BarChar,LineChar},
    data(){
      return{
        barChartData: {
          id:"barTwoChar",
          seriesData:{
            xData : [],
            yData:[],
          }
        },
        lineChartData: {
          id:"lineTwoChar",
          seriesData:{
            xData : [],
            yData:[],
          }
        },
        title: {
          name: '',
          val: '',
          nuit: ''
        },
      }
    },
    mounted(){
      let data = JSON.parse(this.$route.query.obj)
      this.title.name = data.name
      this.title.val = data.val
      this.title.nuit = data.nuit

      if(data.symbol === '出勤率'){
        this.getTopOne(data)
      }else if(data.symbol ==='活跃度'){
        this.getTopTwo(data)
      }else if(data.symbol ==='完成率'){
        this.getTopThree(data)
      }else{
        this.getData(data)
      }
    },
    methods:{
      // 出勤率
      getTopOne(str){
        let that = this
        let obj = {
          dimYear: '',
          majorId: str.id,
        }
        that.$Get("/admin/subDrillCourse/getCourseSumClassAttendanceRate", obj, function (data) {
          data.data.forEach(e => {
            e.count = (e.count * 100).toFixed(2)
          })
          that.getBarData(data.data,'table',str.symbol)
          that.getLineData(data.data)
        })

      },
      // 活跃度
      getTopTwo(str){
        let that = this
        let obj = {
          dimYear: '',
          majorId: str.id,
        }
        that.$Get("/admin/subDrillCourse/getCourseSumClassGradeClassAcivity", obj, function (data) {
          data.data.forEach(e => {
            e.count = (e.count * 100).toFixed(2)
          })
          that.getBarData(data.data,'table',str.symbol)
          that.getLineData(data.data)
        })

      },
      // 完成率
      getTopThree(str){
        let that = this
        let obj = {
          dimYear: '',
          majorId: str.id,
        }
        that.$Get("/admin/subDrillCourse/getCourseSumClassGradeHomeWorkFinish", obj, function (data) {
          data.data.forEach(e => {
            e.count = (e.count * 100).toFixed(2)
          })
          that.getBarData(data.data,'table',str.symbol)
          that.getLineData(data.data)
        })
      },
      // 总课程
      getData(data){
        let that = this
        let obj = {
          majorId: data.id,
        }
        that.$Get("/admin/subDrillCourse/getCourseSumClassesListByMajorId", obj, function (data) {
          that.getBarData(data.data,'table')
          that.getLineData(data.data)
        })
      },
      // 柱状图
      getBarData(data,type,symbol){
        let that = this
        let xDataBar = []
        let yDataBar = []
        let idBar = []
        if(data.length>0){
          data.forEach(e => {
            xDataBar.push(e.name)
            yDataBar.push(e.count)
            idBar.push(e.classId)
          })
        }
        that.barChartData = {
          id: "barChar",
          seriesData: {
            xData: xDataBar,
            yData: yDataBar,
            id: idBar,
            type: type,
            symbol: symbol
          }
        }
      },
      // 线性图
      getLineData(data,type){
        let that = this
        let xDataLine = []
        let yDataLine = []
        data.forEach(e => {
          xDataLine.push(e.name)
          yDataLine.push(e.count)
        })
        that.lineChartData = {
          id: "lineChar",
          seriesData: {
            // xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            // yData: [820, 932, 901, 934, 1290, 1330, 1320],
            xData: xDataLine,
            yData: yDataLine,
            // type: type
          }
        }
      },
      // 返回上级按钮
      returnSuperior(){

      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./../school/school.less");
</style>
