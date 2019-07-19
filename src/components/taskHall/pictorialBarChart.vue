<template>
  <div id="chartpictorial"  :class="nodata" style="width: 100%;height:calc(100% - 50px);">
    <div class="pieChart" style="width:100%;height:100%" :id="TaskPieChartData.id"></div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";
  export default {
    props: ["TaskPieChartData"],
    mixins: [echart],
    mounted() {
      // this.$nextTick(() => {
      //   this.pieChart();
      // });
    },
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    watch: {
      TaskPieChartData: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.pieChart();
          });
        },
        deep: true
      }
    },
    methods: {
      pieChart() {
        let {
          id,
          seriesData
        } = this.TaskPieChartData;
        let doc = document.querySelector("#chartpictorial");
        for(let i = 0; i<seriesData.yData.length; i++) {
          if (seriesData.yData[i] > 0) {
            this.nodata = "";
            doc.getElementsByTagName("div")[0].setAttribute("id", id);
            let myChart = this.echartInit(id);
            myChart.setOption(
              {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'none'
                  },
                  formatter: function (params) {
                    return params[0].name + ': ' + params[0].value;
                  }
                },
                grid: {
                  left: '4%',
                  right: '4%',
                  top: '9%',
                  bottom: '8%',
                  containLabel: true
                },
                xAxis: {
                  data: seriesData.xData,
                  axisTick: {show: false},
                  axisLine: {show: false},
                  axisLabel: {
                    textStyle: {
                      color: '#e54035'
                    }
                  }
                },
                yAxis: {
                  // axisLine: {show: false},
                  // axisLabel: {show: false},
                  // splitLine: {show: false},
                  // axisTick: {show: false},
                  axisLabel: {
                    textStyle: {
                      color: '#e54035'
                    }
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#ccc'
                    }
                  }
                },
                color: ['#11dada'], //移入的颜色
                series: [{
                  name: 'hill',
                  type: 'pictorialBar',
                  barCategoryGap: '-130%',
                  // barWidth:'100%',
                  symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                  itemStyle: {
                    normal: {
                      opacity: 0.5
                    },
                    emphasis: {
                      opacity: 1
                    }
                  },
                  data: seriesData.yData,
                  z: 10
                },
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
          }else {
            this.nodata = "divMy";
            doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
          }
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .divMy{
      background-image: url("../../assets/images/wushuju.png");
      background-repeat:no-repeat;
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
