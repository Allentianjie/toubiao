<template>
  <div class="twoChart">
    <div class="topPath">
      <div class="myPath">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <i class="el-icon-location" style="float: left;margin-right: 5px;color: #129B7F"></i>
          <el-breadcrumb-item>{{title.name}}课时</el-breadcrumb-item>
          <!--<el-breadcrumb-item >{{title.name}}</el-breadcrumb-item>-->
        </el-breadcrumb>
      </div>
      <div class="btnReturn">
        <Button type="primary" ghost @click="$router.back(-1)">返回上级</Button>
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
          <h4>{{title.val}}</h4>
        </div>
        <div  class="char">
          <LineChar :lineChartData="lineChartData"></LineChar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChar from '../../Echarts/courseLineChar.vue'
  import BarChar from '../../Echarts/courseBarChar.vue'
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
          val: ''
        },
        path: {},
        pathArr: [],
        num: 0
      }
    },
    mounted(){
      let data = JSON.parse(this.$route.query.obj)
      this.getData(data)
      this.title.name = data.name
      this.title.val = data.val
    },
    methods:{
      getData(o){
        let that = this
        let obj={
          action: o.type,
        }
        that.$Get("/admin/teachDrilling/getTheoryClassCountMapList", obj, function (data) {
          that.getBarData(data.data.data,o)
          that.getLineData(data.data.data2)
        })
      },
      // 柱状图
      getBarData(data,o){
        let that = this
        let xDataBar = []
        let yDataBar = []
        let idBar = []
        if(data.length>0){
          data.forEach(e => {
            xDataBar.push(e.name)
            yDataBar.push(e.count)
            idBar.push(e.seriseId ||e.majorId)
          })
        }
        that.barChartData = {
          id: "barChar",
          seriesData: {
            xData: xDataBar,
            yData: yDataBar,
            id: idBar,
            parms: o
          }
        }
      },
      // 线性图
      getLineData(data){
        let that = this
        let xDataLine = []
        let yDataLine = []
        // if(data.length>0 || data.yDataBar.teachers>0){
        if(data.length>0){
          data.forEach(e => {
            xDataLine.push(e.name)
            yDataLine.push(e.count)
          })
        }
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
    }
  }
</script>

<style lang="less" scoped>
  @import url("../school/school.less");
</style>
