<template>
  <div id="topTen" style="width:100%;height:100%" :class="nodata">
    <div style="width:100%;height:100%" :id="topTenData.id"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";

  export default {
    props: ["topTenData"],
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
      topTenData: {
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
          deptCode,
          deptName,
          disRate,
          rate,
          rsCount,
          total
        } = this.topTenData;
        let doc = document.querySelector("#topTen");
        if (disRate.length > 0) {
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              color: ['#4bcd9d'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },

              },
              legend: {
                data: ['2016年']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                "axisLabel": {
                  "interval": 0,
                  formatter: '{value}',
                }
              },
              yAxis: {
                type: 'category',
                data: deptName
              },
              series: [{
                name: '诊改指标完成率',
                type: 'bar',
                data: rate
              }]
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
