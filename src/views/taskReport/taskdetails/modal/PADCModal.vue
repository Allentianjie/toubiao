<template>
  <Modal v-model="PADCBack.state" width="50%" :mask-closable="false" @on-cancel="closefeedBack">
    <p slot="header" style="color:#fff;text-align:left;font-size: 16px">
      <span>PDCA流程</span>
    </p>
    <div style="width: 100%;height: 90%">
      <PDCAChart :PDCAChartData="PDCAData"></PDCAChart>
    </div>
    <div slot="footer" style="text-align: right">
      <Button type="primary" size="large" @click="closefeedBack">关闭</Button>
    </div>
  </Modal>
</template>

<script>
  import PDCAChart from "@/components/taskHall/PDCA_Chart.vue";

  export default {
    components: {PDCAChart},
    props: {
      PADCBack: {
        type: Object,
        required: true
      }
    },
    mounted() {
    },
    data() {
      return {
        PDCAData: {
          pieChartId: '',
          seriesData: {},
        }

      }
    },
    created() {
      this.getTaskEducation() //获取echart任务数据
    },
    watch: {
      PADCBack: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.getTaskEducation();
          });
        },
        deep: true
      }
    },
    methods: {
      getTaskEducation() {
        this.PDCAData = {
          pieChartId: "PDCAEducationId",
          seriesData: this.PADCBack.data
        };
      },
      //关闭弹窗
      closefeedBack() {
        // console.log("关闭了");
        let flag = false;
        this.$emit("closePADC", flag);
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

</style>
