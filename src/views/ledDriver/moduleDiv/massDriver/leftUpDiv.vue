<template>
  <div class="moduleDiv">
    <div class="titleDiv">
      <router-link tag="h3" to="/analysisTeachers" style="cursor: pointer">
        {{LeftUpData.name}}
      </router-link>
    </div>
    <div class="leftUpList">
      <div>
        <div class="list" v-for="(item,index) in LeftUpData.data" :key="index" @click="substratum(item)">
          <p class="name">{{item.name}}</p>
          <p class="val">{{item.val}}{{item.unit}}</p>
        </div>
        <div class="list" @click="honor('办学荣誉')">
          <p class="name">办学荣誉</p>
          <p class="val">10个</p>
        </div>
        <div class="list" @click="honor('实训基地')">
          <p class="name">重点实验实训基地</p>
          <p class="val">6个</p>
        </div>
        <div class="list"  @click="schoolFeature()">
          <p class="name">办学特色</p>
        </div>
        <div class="list"  @click="majorSet()">
          <p class="name">专业设置</p>
        </div>
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
        // console.log(row.name);
        // console.log(row);
        if (row.ident == 18 || row.ident == 343) { //馆藏图书资料和馆藏图书资料 暂无明细
          this.$message({
            message: '暂无明细',
            type: 'warning'
          });
          return
        }
        if (row.name === '教职工') {
          let titleName = {
            name: "2019年教职工",
            val: row.val,
            url: '/ledDriver'
          }
          let queryData = {
            name: "2019年教职工",
            // titleName: titleName,
            titleName:JSON.stringify(titleName),
            chartFlag: true,
            type: 0,
            parentId: 114,
            teacher: 0
          }
          this.$router.push({path: '/twoChart', query: queryData})
        } else if (row.name === "教室数量" ) {
          this.$router.push({path: '/floor', query: {titleName: row.name}});
        } else if ( row.name === "学费收入" ) {
          const objToStr = JSON.stringify(row);
          this.$router.push({path: '/sdeptTuition', query: {obj: objToStr}});

        } else if(row.name === "全校资产"){
          this.$router.push({path: '/propertyTwoChar', query: {obj: JSON.stringify(row)}})
        }
        else {
          this.$router.push({path: '/award', query: {ident: row.ident}})
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
