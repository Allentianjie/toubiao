<template>
  <div class="twoChart">
    <div class="topPath">
      <div class="myPath">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <i class="el-icon-location" style="float: left;margin-right: 5px;color: #129B7F"></i>
          <el-breadcrumb-item>{{title.name}}</el-breadcrumb-item>
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
          val: ''
        },
        path: {},
        pathArr: [],
        num: 0
      }
    },
    mounted(){
      // 校领导驾驶舱-全校资产页面
      let data = JSON.parse(this.$route.query.obj)
      this.getData(data)
      this.title.name = data.name
      this.title.val = data.val + data.unit
      this.getLineListFn();
    },
    methods:{
      getData(o){
        // console.log(11,o)
        let that = this
        that.$Get("/admin/subDrillSchcool/getAssetsUseTypeList", {}, function (data) {
          // console.log(1,data)
          that.getBarData(data.data)
          // that.getLineData(data.data)
        })
      },

      // 线性图表接口
      getLineListFn(){
        let that = this
        that.$Get("/admin/subDrillSchcool/getAssetsAmountByYearList", {}, function (data) {
          // console.log(data)
          // that.getBarData(data.data)
          that.getLineData(data.data)
        })
      },

      // 柱状图
      getBarData(data){
        let that = this
        let xDataBar = []
        let yDataBar = []
        if(data.length>0){
          data.forEach(e => {
            xDataBar.push(e.amoutType)
            yDataBar.push(e.amout)
          })
        }
        that.barChartData = {
          id: "barChar",
          obj: data,
          seriesData: {
            xData: xDataBar,
            yData: yDataBar,
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
            let atr = e.dimYear
            xDataLine.push(atr)
            yDataLine.push(e.dataValue)
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
