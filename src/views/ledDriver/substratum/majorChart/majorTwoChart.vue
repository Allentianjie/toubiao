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
          <h4>{{title.val}}个</h4>
        </div>
        <div  class="char">
          <LineChar :lineChartData="lineChartData"></LineChar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChar from '../../Echarts/majorLineChar.vue'
  import BarChar from '../../Echarts/majorBarChar.vue'
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
      path: {}
    }
  },
  mounted(){
    let data = JSON.parse(this.$route.query.titleName)
    this.getData(data)
    this.title.name = data.name
    this.title.val = data.val
    this.title.unit = data.unit
  },
  methods:{
    getData(titleName){
      let that = this
      let obj={
        type:titleName.type
      }
      that.$Get("/admin/teachDrilling/getMajorCountMapList", obj, function (data) {
        that.getBarData('1',data.data.data,titleName)
        that.getLineData('2',data.data.data2)
      })
    },
    // 柱状图
    getBarData(v,data,title){
      // console.log(33,data)
      // console.log(44,title)
      let that = this
      let xDataBar = []
      let yDataBar = []
      let idBar = []
      if(data.length>0){
        data.forEach(e => {
          xDataBar.push(e.name)
          yDataBar.push(e.count)
          idBar.push(e.seriseId)
        })
      }
      that.barChartData = {
        id: "barChar",
        seriesData: {
          // xData: ['机械工程', '电气自动化', '化学工程', '学科教育', '信息工程', '工业分析', '电子科学'],
          // yData: [150, 252, 200, 334, 390, 330, 220],
          // id: []
          xData: xDataBar,
          yData: yDataBar,
          id: idBar,
          type: title
        }
      }
    },
    // 线性图
    getLineData(v,data,type){
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
