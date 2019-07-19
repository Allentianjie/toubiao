<!--
author: liao
time: 2019年5月24日15:19:12
remark: 学校概况 -- （学费收入、教室数量、全校资产）下钻
-->
<template>
  <div id="line-e" class="bar" :class="nodata">
    <div :id="lineData.id"></div>
  </div>
</template>

<script>
import echart from "@/mixins/echart";

export default {
  name: "",
  props: ["lineData"],
  mixins: [echart],
  data() {
    return {
      nodata: "loadingBox"
    }
  },
  watch: {
    "lineData":{
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.pieChart();
        });
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    pieChart() {
      this.nodata = "";
      let doc = document.querySelector("#line-e");
      let {
        id,
        obj,
        name,
        xAxis,
        seriesData
      } = this.lineData;

      if (this.lineData.seriesData) {
        this.$nextTick(() => {

          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              tooltip : {
                trigger: 'axis',
                axisPointer : {
                  type : 'shadow'
                },
                formatter: function (params) {
                  var tar = params[0];
                  return tar.name + '<br/>' + tar.seriesName +' : ' + tar.value +' '+ obj[tar.dataIndex].dataUnit;
                }
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                },
                right: '2%'
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  data: xAxis,
                  axisLine: {
                    lineStyle: {
                      color: "#555"
                    }
                  },
                  axisTick: {
                    lineStyle: {
                      color: "#555"
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: "#555"
                    }
                  },
                  axisLabel: {
                    textStyle: {
                      color: "#333"
                    },
                    rotate: 35
                  },
                  boundaryGap: false
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLine: {
                    lineStyle: {
                      color: "#555"
                    }
                  },
                  axisTick: {
                    lineStyle: {
                      color: "#555"
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: "#ccc"
                    }
                  },
                  axisLabel: {
                    textStyle: {
                      color: "#333"
                    }
                  }
                }
              ],
              series: [
                {
                  name: name,
                  type: "line",
                  data: seriesData
                }
              ],
              color: ["#4bcd9d"],
              grid: { x: 50, y: 10, x2: 10, y2: 80 }
            },
            true
          );
          myChart.on('click', function (params) {
            // console.log(199991,params)
          });
          this.$nextTick(() => {
            window.addEventListener("resize", () => {
              myChart.resize();
            });
          });
        });
      } else {
        this.nodata = "divMy";
      }
    }

  }
}
</script>

<style lang='less' scoped>
#app > div {
  div.bar {
    width: 100%;
    height: 100%;

    div {
      width: 100%;
      height: 100%;
    }
  }
  .divMy {
    background-image: url("../../../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
  .loadingBox {
    background-image: url("../../../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
}
</style>
