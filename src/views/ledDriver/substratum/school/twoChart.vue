<template>
  <div class="twoChart">
    <div class="topPath">
      <div class="myPath">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <i class="el-icon-location" style="float: left;margin-right: 5px;color: #129B7F"></i>
          <!--<el-breadcrumb-item>全校</el-breadcrumb-item>-->
          <el-breadcrumb-item>{{title.name === '' ? '2019年教职工' : title.name}}</el-breadcrumb-item>
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
      <div class="bottomChar">
        <div class="titleDiv" v-if="!chartFlag">
          <h3>{{title.name}}人数</h3>
          <h4>{{title.val}}人</h4>
        </div>
        <div class="char">
          <LineChar :lineChartData="lineChartData" v-if="!chartFlag"></LineChar>
          <div class="charCon charL" v-if="chartFlag">
            <PetalChart :petalCharData="cakeChartData"></PetalChart>
          </div>
          <div class="charCon charR" v-if="chartFlag">
            <DegreeChart :petalCharData="degreeChartData"></DegreeChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChar from '../../Echarts/lineCharTwo.vue'
  import BarChar from '../../Echarts/barCharTwo.vue'
  import PetalChart from '../../Echarts/petalChart.vue';
  import DegreeChart from '../../Echarts/degreeChart.vue';
  export default {
    components: {BarChar, LineChar, PetalChart,DegreeChart},
    // name: "twoChart",
    data(){
      return {
        barChartData: {
          id: "barTwoChar",
          seriesData: {
            xData: [],
            yData: [],
          }
        },
        lineChartData: {
          id: "lineTwoChar",
          seriesData: {
            xData: [],
            yData: [],
          }
        },
        cakeChartData: {
          id: "cakeChartData",
          legendData: [],
          seriesData: {}
        },
        degreeChartData: {
          id: "degreeChartData",
          legendData: [],
          seriesData: {}
        },
        title: {
          name: '',
          val: ''
        },
        path: {},
        chartFlag: false,
        queryData: {},
        titleName: {}
      }
    },
    mounted(){
      this.queryData = this.$route.query
      this.titleName = JSON.parse(this.queryData.titleName)
      if (this.titleName) {
        this.title = this.titleName
      }
      this.chartFlag = this.queryData.chartFlag
      if (this.chartFlag) {
        this.getMoreData()
      } else {
        this.getData()
      }
//      this.getData()
    },
    methods: {
      //获取三个图表的数据
      getMoreData(){
        let that = this
        let obj = {
          year: this.queryData.year,
          parentId: this.queryData.parentId,
          type: this.queryData.type,
        }
        that.$Get("/admin/teachDrilling/getDrillTeacherInfo", obj, function (data) {
          that.getBarData('1', data.data.drillData, that.title)
        })
        that.$Get("/admin/teachDrilling/getTeacherAgetaList", obj, function (data) {
          that.getCakepData('1', data.data.ageData, that.title)
          that.getDegreeData('1', data.data.degreeData, that.title)
        })
      },
      //获取上下分布图表的数据
      getData(){
        let that = this
        let nameCode = this.titleName.name
        nameCode = nameCode === '2019年教职工' ? '' : nameCode
        // if(nameCode !=='教务处驾驶舱' || !nameCode){
        let obj = {
          year: '',
          type: nameCode ? nameCode : '',
        }
        that.$Get("/admin/teachDrilling/getTeacherPeople", obj, function (data) {
          that.getBarData('1', data.data.serisePeopleList, that.title)
          that.getLineData('1', data.data.teacherPeopleList)
        })
        // }
        // else {
        //   that.$Get("/admin/teachOffice/seriseTeachers",{}, function (data) {
        //     console.log(766,data.data)
        // that.getBarData('2',data.data,that.title)
        // that.getLineData('2',data.data)
        // })
        // }
      },
      // 学位分布饼图
      getDegreeData(v, data, title){
        let that = this;
        let xDataBar = [];
        let yDataBar = [];
        let idBar = [];
        let newDataArr = [];
        if (data.length > 0) {
          data.forEach(e => {
            xDataBar.push(e.name)
            yDataBar.push(e.count)
            idBar.push(e.seriseId)
            newDataArr.push({
              name: e.name,
              value: e.count,
            })
          })
        }
        that.degreeChartData = {
          idTip: "degreeChartData",
          legendData: xDataBar,
          seriesData: newDataArr,
          id: idBar,
          teacher: this.$route.query.teacher
        }
      },
      // 年龄分布饼图
      getCakepData(v, data, title){
        let that = this;
        let xDataBar = [];
        let yDataBar = [];
        let idBar = [];
        let newDataArr = [];
        if (data.length > 0) {
          data.forEach(e => {
            xDataBar.push(e.name)
            yDataBar.push(e.count)
            idBar.push(e.seriseId)
            newDataArr.push({
              name: e.name,
              value: e.count,
            })
          })
        }
        that.cakeChartData = {
          idTip: "cakeChartData",
          legendData: xDataBar,
          seriesData: newDataArr,
          id: idBar,
          teacher: this.$route.query.teacher
        }
      },
      // 柱状图
      getBarData(v, data, title){
        // console.log(33,title)
        let that = this
        let xDataBar = []
        let yDataBar = []
        let idBar = []
        // if(data.length>0 || data.yDataBar.teachers>0){
        if (data.length > 0) {
          // if(v === '1'){
          data.forEach(e => {
            xDataBar.push(e.name)
            yDataBar.push(e.count)
            idBar.push(e.seriseId)
          })
          // }else if(v === '2'){
          //   data.forEach(e => {
          //     xDataBar.push(e.name)
          //     yDataBar.push(e.teachers)
          //     idBar.push(e.id)
          //   })
          // }
        }
        // console.log(666,yDataBar)
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
      getLineData(v, data, type){
        let that = this
        let xDataLine = []
        let yDataLine = []
        // if(data.length>0 || data.yDataBar.teachers>0){
        if (data.length > 0) {
          if (v == '1') {
            data.forEach(e => {
              xDataLine.push(e.year)
              yDataLine.push(e.count)
            })
          } else if (v == '2') {
            data.forEach(e => {
              xDataLine.push(e.name)
              yDataLine.push(e.teachers)
            })
          }
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
        // console.log(that.lineChartData);
      },
      // 返回上级按钮
      returnSuperior(){
        // console.log(11, this.title.url)
        this.$router.push(this.title.url)
        // this.$router.push('/ledDriver')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./school.less");
</style>
