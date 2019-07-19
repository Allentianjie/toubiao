<template>
  <div class="moduleDiv">
    <div class="titleDiv"><h3>{{RightUpData.title}}</h3></div>
    <div class="rightUpEchart" style="cursor: pointer;">
      <RightUpDiv :barChartData="RightUpData.echartData"></RightUpDiv>
    </div>
  </div>
</template>

<script>
import RightUpDiv from "./../Echarts/barEchanrts.vue";

export default {
  components: {RightUpDiv},
  props: {
    RightUpData: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
    }
  },
  mounted(){
   // console.log(44,this.RightUpData)
  },
}
</script>

<style lang="less" scoped >
  @import url("./moduleDivCss.less");
  .titleDiv{
    h3{
      background-image: url("../../../assets/images/ledDriver/titleUpbeijing.png");
    }
  }
</style>
