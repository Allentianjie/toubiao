<template>
  <div class="portrait-content">
    <div class="no-data" v-if="!statisticData.length">暂无数据</div>
    <div v-else class="item bg-img"
         :class="statisticData.length > 8 ? 'w20': '' "
         v-for="item in statisticData"
         :key="item.name"
         @click="detailsClick(item)">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ item.value }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" :content="item.name">
            <p>{{ item.name }}</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <PortraitDetails :indicatorItem="indicatorItem"></PortraitDetails>
  </div>
</template>

<script>
  import PortraitDetails from "./../component/portraitDetails.vue";
  export default {
    name: "statistics",
    components: {PortraitDetails},
    props: { statisticData: Array },
    data() {
      return {
        indicatorItem: {
          flag: 1, // 1学生 2老师 3专业 4课程
          item: "",
          show: false
        }
      }
    },
    mounted() { },
    methods: {
      //详情点击
      detailsClick(item) {
        if ( item.id == "") {
          this.$message({
            message: '暂无详情数据',
            type: 'warning'
          });
          return
        }
        let indicator = {
          flag: 1,
          item: item,
          show: true
        }
        this.indicatorItem = indicator
      }
    }
  }
</script>
