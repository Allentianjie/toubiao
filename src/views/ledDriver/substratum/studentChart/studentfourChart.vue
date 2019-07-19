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
          <h4>{{title.val}} <span v-if="title.name !=='到课率'">人</span></h4>
        </div>
        <div  class="char">
          <LineChar :lineChartData="lineChartData"></LineChar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChar from '../../Echarts/strdentLineChar.vue'
  import BarChar from '../../Echarts/strdentBarChar.vue'
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
      }
    },
    mounted(){
      let data = JSON.parse(this.$route.query.obj)
      this.getData(data)
      this.title.name = data.name
      this.title.val = data.val
    },
    methods:{
      getData(data){
        // console.log(33,data)
        let that = this
        let obj = {
          year: '',
          source: data.source? data.source:'',
          // source: '',
          type: data.typeName,
          seriseId: data.seriseId,
          majorId: data.id,
        }
        that.$Get("/admin/teachDrilling/getStudenPeopleClassesMapList", obj, function (data) {
          let parms={
            source: obj.source,
            typeName: obj.type,
            seriseId: obj.seriseId,
            majorId: obj.majorId,
          }
          that.getBarData(data.data.data,parms,'table')
          that.getLineData(data.data.data2)
        })
      },
      // 柱状图
      getBarData(data,parms,type){
        let that = this
        let xDataBar = []
        let yDataBar = []
        let idBar = []
        if(data.length>0){
          data.forEach(e => {
            xDataBar.push(e.name)
            yDataBar.push(e.count)
            idBar.push(e.seriseId || e.majorId)
          })
        }
        that.barChartData = {
          id: "barChar",
          seriesData: {
            xData: xDataBar,
            yData: yDataBar,
            id: idBar,
            type: type,
            parms:parms,
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
