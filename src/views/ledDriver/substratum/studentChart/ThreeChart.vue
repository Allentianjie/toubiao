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
        <Button type="primary" ghost @click="returnSuperior">返回上级</Button>
      </div>
    </div>
    <div class="bottomChar">
      <div class="topChar">
        <div class="titleDiv">
          <h3>下级数据</h3>
        </div>
        <div class="char">
          <BarChar :barChartData="barChartData" @clickBar = "clickBar"></BarChar>
        </div>
      </div>
      <div  class="bottomChar">
        <div class="titleDiv">
          <h3>{{title.name}}人数</h3>
          <h4>{{title.val}}人</h4>
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
        source: '',
        seriseId: null,
        majorId: null,

      }
    },
    mounted(){
      if(this.$route.query.objMap.titleName){
        // 教务处驾驶舱的title暂时未穿，南宁在用哪个页面
        this.title = this.$route.query.objMap.titleName
      }
      this.source = this.$route.query.objMap.source
      let type = this.$route.query.objMap.type
      this.getData(type)
    },
    methods:{
      clickBar(obj){
        if(obj.type ==='seriseId'){
          this.title.name = obj.name
          this.title.val = obj.val
          this.seriseId = obj.id
          this.getData(obj.type)

        }else if(obj.type ==='majorId'){
          this.title.name = obj.name
          this.title.val = obj.val
          this.majorId =obj.id
          this.getData(obj.type)

        }else if(obj.type ==='table'){
          let parame={
            year: '',
            source: this.source,
            seriseId : this.seriseId,
            majorId : this.majorId,
            classes : obj.name,
          }
          this.$router.push({path: '/studentTable', query: {parame: parame}})
        }

      },
      getData(type){
        let that = this
        let parame = this.$route.query.objMap

        if(type === 'One') {
          let obj = {
            year: '',
            source: this.source,
          }
          that.$Get("/portrait/teachDrilling/getStudenPeopleSeriseMapList", obj, function (data) {
            that.getBarData('1', data.data.data, 'seriseId')
            that.getLineData('1', data.data.data)
          })
        }else if(type === 'seriseId'){
          let obj = {
            year: '',
            source: this.source,
            seriseId: this.seriseId
          }
          that.$Get("/portrait/teachDrilling/getStudenPeopleMajorMapList", obj, function (data) {
            that.getBarData('2', data.data.data, 'majorId')
            that.getLineData('2', data.data.data)
          })
          // getStudenPeopleMajorMapList
        }else if(type === 'majorId') {
          let obj = {
            year: '',
            source: this.source,
            seriseId: this.seriseId,
            majorId: this.majorId
          }
          that.$Get("/portrait/teachDrilling/getStudenPeopleClassesMapList", obj, function (data) {
            that.getBarData('1', data.data.data,'table')
            that.getLineData('1', data.data.data)
          })
        }
      },
      // 柱状图
      getBarData(v,data,type){
        let that = this
        let xDataBar = []
        let yDataBar = []
        let idBar = []
        // console.log(7,v,data)
        if(data.length>0){
            data.forEach(e => {
              xDataBar.push(e.name)
              yDataBar.push(e.count)
              if(v === '1'){
                idBar.push(e.seriseId || e.majorId)
              }else if(v === '2'){
                idBar.push(e.majorId)
              }
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
            type: type
          }
        }
      },
      // 线性图
      getLineData(v,data,type){
        // console.log(8,v,data)
        let that = this
        let xDataLine = []
        let yDataLine = []
        if(v==='1'){
          data.forEach(e => {
            xDataLine.push(e.name)
            yDataLine.push(e.count)
          })
        }else if(v === '2'){
          data.forEach(e => {
            xDataLine.push(e.name)
            yDataLine.push(e.teachers)
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
      // 返回上级按钮
      returnSuperior(){
        this.$router.push('/ledDriver')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./../school/school.less");
</style>
