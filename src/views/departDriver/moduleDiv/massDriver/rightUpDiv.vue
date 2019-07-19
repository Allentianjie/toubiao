<template>
  <div class="moduleDiv">
    <div class="titleDiv"><h3>{{RightUpData.title}}</h3></div>
    <div class="rightUpList" style="cursor: pointer;">
      <div class="list">
        <div class="OneDiv" v-for="(item,index) in RightUpData.dataOne">
          <div class="listOne">
            <p class="up">{{item.name}}</p>
            <p class="center">{{item.value}}{{item.unit}}</p>
            <p class="bottom">  校内排名第{{item.rank}}位 </p>
          </div>
        </div>
      </div>
      <div class="list listCenter">
        <div class="TwoDiv" v-for="(item,index) in RightUpData.dataTwo">
          <div class="listTwo ">
            <p class="up">{{item.name}}</p>
            <p class="center">{{item.value}}{{item.unit}}</p>
            <p class="bottom">  校内排名第{{item.rank}}位 </p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="ThreeDiv" v-for="(item,index) in RightUpData.dataThree">
          <div class="listThree">
            <p class="up">{{item.name}}</p>
            <p class="center">{{item.value}}{{item.unit}}</p>
            <p class="bottom">  校内排名第{{item.rank}}位 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import RightUpDiv from "./Echarts/barEchanrts.vue";

export default {
  // components: {RightUpDiv},
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
</style>
