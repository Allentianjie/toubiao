<template>
  <Modal v-model="feedBack.state" width="60%" :mask-closable="false" @on-cancel="closefeedBack">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>诊改数据变化走势图</span>
    </p>
    <div style="width: 100%;height: 90%">
      <LineChart :lineChartData="LineData"></LineChart>
    </div>
    <div slot="footer" style="text-align: right">
      <Button type="primary" size="large" @click="closefeedBack">关闭</Button>
    </div>
  </Modal>
</template>

<script>

  import LineChart from "@/components/taskHall/lineChart";
  export default {
    components: {LineChart },
    props: {
      feedBack: {
        type: Object,
        required: true
      }
    },
    mounted() {
    },
    data() {
      return {
        LineData:{
          pieChartId: '',
          seriesData: {},
        },
      }
    },
    created() {
      this.getTaskEducation(); //获取echart任务数据
    },
    watch: {
      feedBack: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.getTaskEducation();
          });
        },
        deep: true
      }
    },
    methods: {
      //   获取任务数据
      getTaskEducation() {
        this.LineData = {
          pieChartId: "lineEducationId",
          seriesData: this.feedBack.data
        };
      },
      //关闭弹窗
      closefeedBack() {
        console.log("关闭了");
        let flag = false;
        this.$emit("closefeedBack", flag);
      },

    }
  }
</script>
<style lang="less" scoped>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  ::-webkit-scrollbar {
    width: 6px;
    height: 16px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.63);
  }

  /*定义滑块 内阴影+圆角*/

  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 6px rgba(113, 154, 216, 0.3);
    background-color: #719ad8;
  }
  .role {
    // padding: 10px;
    // overflow: hidden;
    // overflow-y: auto;
    // height: 250px;
  }  .department {
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
    // border-radius: 3px;
    // -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -o-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    > ul {
      height: 100%;
      background: #719ad8;
      > li {
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid #ddd;
        text-decoration: none;
        list-style: none;
      }
    }
  }
</style>
