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
    props: ['propData'],
    props:  { statisticData: Array },
    data() {
      return {
        indicatorItem: {
          flag: 4, // 1学生 2老师 3专业 4课程
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
          flag: 4,
          item: item,
          show: true
        }
        this.indicatorItem = indicator
      }
    }

  }
</script>

<style scoped lang="less">
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;

  .no-data {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .item {
    width: 25%;
    height: 185px;
    padding: 10px;

    .item-con {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .item-body {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: url("../../../assets/images/img/circle1.png");
        background-position: center center;
        background-repeat: no-repeat;

        h3 {
          color: #fff;
        }
      }

      .item-foot {
        width: 100%;
        height: 50px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        p {
          height: 100%;
          font-size: 16px;
          line-height: 50px;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .item.w20 {
    width: 20%;
  }

  .item:nth-child(2) {
    .item-body {
      background-image: url("../../../assets/images/img/circle2.png");
    }
  }
  .item:nth-child(3) {
    .item-body {
      background-image: url("../../../assets/images/img/circle3.png");
    }
  }
  .item:nth-child(4) {
    .item-body {
      background-image: url("../../../assets/images/img/circle4.png");
    }
  }
  .item:nth-child(5) {
    .item-body {
      background-image: url("../../../assets/images/img/circle5.png");
    }
  }
  .item:nth-child(6) {
    .item-body {
      background-image: url("../../../assets/images/img/circle6.png");
    }
  }
  .item:nth-child(7) {
    .item-body {
      background-image: url("../../../assets/images/img/circle7.png");
    }
  }
  .item:nth-child(8) {
    .item-body {
      background-image: url("../../../assets/images/img/circle8.png");
    }
  }
  .item:nth-child(9) {
    .item-body {
      background-image: url("../../../assets/images/img/circle5.png");
    }
  }
  .item:nth-child(10) {
    .item-body {
      background-image: url("../../../assets/images/img/circle1.png");
    }
  }
}
</style>
