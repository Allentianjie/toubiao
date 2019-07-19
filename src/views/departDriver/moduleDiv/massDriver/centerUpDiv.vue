<template>
  <!--<router-link tag="div"  to="/studentTable" class="mapUpDiv" >-->
  <div class="moduleDiv" >
    <div class="titleDiv"><h3>{{CenterUpData.title}}</h3></div>
    <div class="mapSign">
      <div class="list">
          <div class="OneDiv" v-for="(item,index) in CenterUpData.dataOne">
             <div class="listOne">
               <p class="up">{{item.k_name}}</p>
               <p class="center">{{item.value}}</p>
               <p class="bottom"> 校内排名第{{item.rank}}位 </p>
             </div>
        </div>
      </div>
      <div class="list listCenter">
        <div class="TwoDiv" v-for="(item,index) in CenterUpData.dataTwo">
          <div class="listTwo ">
            <p class="up">{{item.k_name}}</p>
            <p class="center">{{item.value}}</p>
            <p class="bottom"> 校内排名第{{item.rank}}位 </p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="ThreeDiv" v-for="(item,index) in CenterUpData.dataThree">
           <div class="listThree">
             <p class="up">{{item.k_name}}</p>
             <p class="center">{{item.value}}</p>
             <p class="bottom"> 校内排名第{{item.rank}}位 </p>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import MapEchart from "./../../Echarts/mapEchart.vue";
export default {
  // components: {MapEchart},
  props: {
    CenterUpData: {
      type: Object,
      required: true
    }
  },
  name: "centerUpDiv",
  data(){
    return{
      echartData: {
        id:'mapEchartId',
        seriesData:{
          xData:[88,21]
        }
      }
    }
  },
  mounted(){
    // this.getdata()
  },
  methods:{
    // liao
    // 2019年5月24日14:46:17
    // 学生人数下钻


    getdata(){
      let that = this
      that.$Get("/admin/teachDrilling/getStudenMapList", {}, function (data){
        // console.log(11111,data.data.data)
      })
    }
  }
}
</script>

<style lang="less" scoped >
  @import url("./moduleDivCss.less");
</style>
