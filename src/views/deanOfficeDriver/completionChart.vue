<template>
  <div id="comChar" style="width:100%;height:100%" :class="nodata">
    <div style="width:100%;height:100%" :id="comData.id"></div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";

  export default {
    props: ["comData"],
    mixins: [echart],
    mounted() {
      // this.$nextTick(() => {
      //     this.radarChart();
      // });
    },
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    watch: {
      comData: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.radarChart();
          });
        },
        deep: true
      }
    },
    methods: {
      radarChart() {
        // let colorData = require("../../../static/chartColor.json");
        // console.log(this.TaskMonitorData)
        let {
          id,
          data,
        } = this.comData;
        let doc = document.querySelector("#comChar");
        if (data.dataimportant && data.dataimportant.length > 0 && data.datatotal && data.datatotal.length > 0 && data.names && data.names.length > 0) {
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              color: ['#3398DB'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: data.names,
                  axisTick: {
                    alignWithLabel: true
                  },
                  axisLabel: {
                    color: '#262626',
                    fontSize: 12,
                    rotate: '35',
                    boundaryGap: 0,
                  },
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '占比数',
                  type: 'bar',
                  color: ['#64a1f2'],
                  barWidth: '30%',
                  data: data.dataimportant
                },
                {
                  name: '总数',
                  type: 'bar',
                  color: ['#4bcd9d'],
                  barWidth: '30%',
                  data: data.datatotal
                }
              ]
            },
            true
          );
          this.$nextTick(() => {
            window.addEventListener("resize", () => {
              myChart.resize();
            });
          });
          return
        } else {
          this.nodata = "divMy";
          doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
        }
      }
    }
  };
</script>
<style lang='less' scoped>
  .divMy {
    background-image: url("../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%
  }

  .loadingBox {
    background-image: url("../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
