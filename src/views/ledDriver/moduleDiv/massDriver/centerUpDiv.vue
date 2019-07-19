<template>
  <!--<router-link tag="div"  to="/studentTable" class="mapUpDiv" >-->
  <div class="mapUpDiv" >
    <div class="titleDiv"><h3>{{CenterUpData.title}}</h3></div>
    <div class="mapSign">
      <div class="mapDiv">
        <p class="name">{{CenterUpData.showData.name}}</p>
        <div @click="goDown('全校学生',CenterUpData.showData.data.join(''))" style="cursor: pointer;">
          <p class="val" v-for="(item,index) in CenterUpData.showData.data" :key="index">
            {{item}}
          </p>
          <p class="unit">{{CenterUpData.showData.unit}}</p>
        </div>
      </div>
    </div>
    <div>
      <MapEchart :MapEchartData="echartData"></MapEchart>
    </div>
  </div>
</template>

<script>
  import MapEchart from "./../../Echarts/mapEchart.vue";
export default {
  components: {MapEchart},
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
    this.getdata()
  },
  methods:{
    // liao
    // 2019年5月24日14:46:17
    // 学生人数下钻
    goDown(name,val) {
      let  obj ={
        typeName: name,
        name: name,
        val: val,
        source: ''

      }
      this.$router.push({path: '/studentTwoChart', query: {obj: JSON.stringify(obj)}})
    },

    getdata(){
      let that = this
      that.$Get("/admin/teachDrilling/getStudenMapList", {}, function (data){
        // console.log(11111,data.data.data)
        var XAData = [
          [{
             name: '黑龙江省',
             value: 70
           }],	[{
             name: '内蒙古省',
             value: 70
           }],	[{
             name: '吉林',
             value: 70
           }],	[{
             name: '辽宁',
             value: 70
           }],	[{
             name: '河北',
             value: 70
           }],	[{
             name: '天津',
             value: 70
           }],	[{
             name: '山西',
             value: 70
           }],	[{
             name: '陕西',
             value: 70
           }],	[{
             name: '甘肃',
             value: 70
           }],	[{
             name: '宁夏',
             value: 70
           }],	[{
             name: '青海',
             value: 70
           }],	[{
             name: '新疆',
             value: 70
           }],[{
             name: '西藏',
             value: 70
           }],	[{
             name: '四川',
             value: 70
           }],	[{
             name: '重庆',
             value: 70
           }],	[{
             name: '山东',
             value: 70
           }]
         ];
        // 地图数据只能是省份名字,如上格式
        that.echartData = {
          id:'mapEchartId',
            seriesData:{
              xData: data.data.data,
              yData: XAData
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped >
  @import url("./moduleDivCss.less");
</style>
