<template>
  <div id="depart">
    <div class="top">
      <div class="top-content">
        <el-select @change="changeCode" class="selectbox" v-model="code" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <Numerical ref="codeData"></Numerical>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="left-chart">
          <div class="ranking newBtn">
            各系诊改指标完成率排名
          </div>
          <div class="chart-box">
            <CompletionChart :comData="comData"></CompletionChart>
          </div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="right-chart">
          <div class="score newBtn">
            系部诊改各维度得分
          </div>
          <div class="chart-box">
            <DimensionChart :dimensionData="dimensionData"></DimensionChart>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="bottom">
    <div class="bottom-left">
    <div class="left-chart">
    <div class="ranking">
    专业诊改指标完成率排名前十
    </div>
    <div class="chart-box">
    <TopTen :topTenData="topTenData"></TopTen>
    </div>
    </div>
    </div>
    <div class="bottom-right">
    <div class="right-chart">
    <div class="score">
    专业诊改指标完成率排名后十
    </div>
    <div class="chart-box">
    <LaterTen :laterTenData="laterTenData"></LaterTen>
    </div>
    </div>
    </div>
    </div>-->
  </div>
</template>

<script>
  import Numerical from "./numerical.vue";
  import DimensionChart from "./dimensionChart.vue";
  import CompletionChart from "./completionChart.vue";
  import TopTen from "./topTenChart.vue";
  import LaterTen from "./laterTenChart";

  export default {
    components: {
      Numerical, CompletionChart, DimensionChart, TopTen, LaterTen
    },
    name: "index",
    data() {
      return {
        userInfo: "",
        codeData:{
          name: "",
          code: '',
          id: ''
        },
        name: "",
        options: [],
        code: '',
        allData: {},
        laterTenData: {},
        topTenData: {},
        comData: {},
        dimensionData: {}
      }
    },
    mounted() {
      // this.getTopTenData();//原型上没有，需确认
      // 获取用户信息
      this.userInfo = this.$store.state.userInfo;
      this.getdeptCode()
    },
    methods: {
      changeCode(val) {
        // console.log(55,1,val)
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].id == val) {
            this.name = this.options[i].name;
            this.code = this.options[i].id;
            this.codeData={
              name: this.options[i].name,
              code: this.options[i].id
            };
          }
        }
        // this.$refs.codeData.getDepartData(this.codeData);
        this.getDepartDatas(this.code);
        this.getDimensionData(this.code)
      },
      //查询系部雷达图
      getDimensionData(val) {
        this.$Get("/portrait/statistic/radar?deptCode="+val, null, res => {
          if (res.code == 0) {
            this.dimensionData = {
              id: "dimensions",
              data: res.data
            }
          }
        })
      },
      //查询系部顶部明细
      getDepartDatas(val) {
        this.$Get("/portrait/serisedepartment/top?deptcode="+val, null, res => {
          if (res.code == 0) {
            this.allData = res.data;
            this.codeData.id =  res.data.majorseriseid
            this.$refs.codeData.getDepartData(this.codeData);
            this.comData = {
              id: "CompletionRate",
              data: res.data.taskEchart
            };
          }
        })
      },
      //查询该角色管辖部门
      getdeptCode() {
        this.$Get("/portrait/deptCockpitDetail/depts", { username: this.userInfo.username }, res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.options = res.data;
            }
            if(this.options.length>0){
              if(this.$route.query.name){
                this.options.forEach(e =>{
                  if(e.name === this.$route.query.name){
                    this.name = e.name;
                    this.code = e.id;
                  }
                })
              }else {
                this.name = this.options[0].name;
                this.code = this.options[0].id;
              }

              this.codeData={
                name: this.name,
                code:  this.code,
              };
              // console.log(this.codeData)

              this.getDepartDatas(this.code);
              this.getDimensionData(this.code)
            }else {
              this.$Message.error("你没有管辖部门！")
            }
          }
        });
        // this.laterTenData={
        //   id: "LaterTen",
        //   data:[1,2,3]
        // }
      },
      //查询topten
      getTopTenData() {
        this.topTenData = {
          id: "TopTen",
          data: [1, 2, 3]
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  @import url("./index.less");
</style>
