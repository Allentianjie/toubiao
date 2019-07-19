<template>
  <div class="moduleDiv">
    <div class="titleDiv">
      <router-link tag="h3" to="/analysisTeachers" style="cursor: pointer">
        {{LeftUpData.title}}
      </router-link>
    </div>
    <div class="leftUpList">
      <div>
        <div class="list" v-for="(item,index) in LeftUpData.data" :key="index" @click="substratum(item)">
          <p class="name">{{item.name}}</p>
          <p class="val">{{item.val}}{{item.unit}}</p>
        </div>
        <!--<div class="list" @click="substratum('系部资产')">
          <p class="name">系部资产</p>
          <p class="val">10000万元</p>
        </div>
        <div class="list" @click="substratum('学费收入')">
          <p class="name">学费收入</p>
          <p class="val">10000万元</p>
        </div>
        <div class="list" @click="substratum('生师比')">
          <p class="name">生师比(学生数量/专人教师数量)</p>
          <p class="val">18:1</p>
        </div>
        <div class="list" @click="substratum('教职工')">
          <p class="name">教职工</p>
          <p class="val">766人</p>
        </div>
        <div class="list" @click="honor('办学荣誉')">
          <p class="name">办学荣誉</p>
          <p class="val">10个</p>
        </div>-->
      </div>
    </div>
    <schoolFeatureModal :FeatureData="FeatureData" @closeFeatureModal="closeFeatureModal"></schoolFeatureModal>
    <majorSetModal :majorData="majorData" @closemajorModal="closemajorModal"></majorSetModal>

  </div>
</template>

<script>
  import schoolFeatureModal from './../Modal/schoolFeatureModal.vue'
  import majorSetModal from './../Modal/majorModal.vue'
  export default {
    components: {schoolFeatureModal,majorSetModal},
    props: {
      LeftUpData: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        listData: {},
        FeatureData: false,
        majorData: false
      }
    },
    mounted(){

    },
    methods: {
      //跳转明细组件
      substratum(row){
        if (row.name === '教师数量') { // 已经调好
          let titleName = {
            name: "某系",
            val: '111',
            url: '/departDriver'

          }
          let obj = {
            id: this.LeftUpData.id,
            name: this.LeftUpData.name,
            type: this.$route.query.titleName,
          }
          this.$router.push({path: '/fourTable', query:{obj: obj}})

        } else if (name === "教室数量" ) {
          this.$router.push({path: '/floor', query: {titleName: name}});
        } else if ( name === "学费收入" ) {
          const objToStr = JSON.stringify('');
          this.$router.push({path: '/sdeptTuition', query: {obj: objToStr}});

        } else if(name === "全校资产"){
          this.$router.push({path: '/propertyTwoChar', query: {obj: JSON.stringify('')}})
        }
      },
      // 办学特色
      schoolFeature(){
        console.log(111)
        this.FeatureData= true
      },
      // 专业特色
      majorSet(){
        this.majorData =true
      },
      // 关闭学校特色
      closeFeatureModal(val){

        this.FeatureData= val;
      },
      // 关闭专业设置
      closemajorModal(val){
        this.majorData = val;
      },
      // 办学荣誉
      honor(name){
        this.$router.push({path: '/leftUphonor', query: {name: name}})
      }

    }
  }
</script>

<style lang="less" scoped>
  @import url("./moduleDivCss.less");
</style>
