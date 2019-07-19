<template>
  <div class="moduleDiv">
    <div class="titleDiv"><h3>{{LeftBottomData.title}}</h3></div>
    <div class="leftBottomList">
      <div class="top">

        <!--<router-link tag="div"  :to="{path: '/majorTable', query:{type:item.type}}" class="topDiv" v-for="(item,index) in LeftBottomData.top" :key="index">-->
        <div  @click="majorClick(item.name, item.val, item.type)" class="topDiv"  v-for="(item,index) in LeftBottomData.top" :key="index">
          <div class="topList">
            <p class="topName">{{item.name}}</p>
            <p class="topVal">
              {{item.val}}  <span> {{item.unit}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <BarLeftBottom :barRightData="LeftBottomData.echartData"></BarLeftBottom>
      </div>
    </div>
  </div>
</template>

<script>

import BarLeftBottom from "./Echarts/barLeftBottom.vue";
export default {
  components: {BarLeftBottom},
  props: {
    LeftBottomData: {
      type: Object,
      required: true
    }
  },
  mounted(){
  },
  methods:{
    majorClick(name,val,v) {
      let obj = {
        name: name,
        val: val,
        type: v,
        unit: '门'
      }
      this.$router.push({path: '/majorTwoChart', query: {titleName: JSON.stringify(obj)}})
    },
    substratum(type){

    }
  }
}
</script>

<style scoped lang="less">
  @import url("./moduleDivCss.less");
</style>
