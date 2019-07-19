<template>
  <div id="barchars" style="width:100%;height:80%" :class="nodata">
    <div class="pieChart" style="width:100%;height: 100%;" :id="BarData.pieChartId"></div>
  </div>

</template>

<script>
  import echart from "@/mixins/echart";
  export default {
    props: ["BarData"],
    mixins: [echart],
    mounted() {
      // this.$nextTick(() => {
      //   this.barChart();
      // });
    },
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    watch: {
      BarData: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.barChart();
          });
        },
        deep: true
      }
    },
    methods: {
      barChart() {
        let {pieChartId, seriesData,} = this.BarData;
        let doc = document.querySelector("#barchars");
        for(let i = 0; i<seriesData.yData.length; i++){
          if(seriesData.yData[i] > 0){
            this.nodata = "";
            doc.getElementsByTagName("div")[0].setAttribute("id", pieChartId);
            let myChart = this.echartInit(pieChartId);
            myChart.setOption(
              {
                // color: {
                //   type: 'linear',
                //   x: 0,
                //   y: 0,
                //   x2: 0,
                //   y2: 1,
                //   colorStops: [{
                //     offset: 0, color: '#b3f2f0' // 0% 处的颜色
                //   }, {
                //     offset: 1, color: '#337ac7' // 100% 处的颜色
                //   }],
                //   global: false // 缺省为 false
                // },
                // color: ["#6abefe"],
                tooltip: {
                  trigger: 'axis',
                  // formatter: function (params) {
                  //   // return params[0].name + ' : ' + params[0].value
                  //
                  // }
                  // formatter: '{b} : {c}'
                },
                grid: {
                  left: '5%',
                  right: '9%',
                  bottom: '3%',
                  top: '20%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: seriesData.xData,
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value'
                  }
                ],
                series: [
                  {
                    name: '数量',
                    type: 'bar',
                    barWidth: '25%',
                    markPoint: {
                      data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                      ]
                    },
                    markLine: {
                      data: [
                        {type: 'max', name: '平均值'}
                      ]
                    },

                    data: seriesData.yData,
                    areaStyle: {}, //区域填充样式},
                    color: ["#5fc4ff"],

                    itemStyle: {
                      /*     normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                        type: 'bar',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: '#438DF6' // 0% 处的颜色
                        }, {
                          offset: 1, color: '#5EC3FF' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                      },*/
                      // lineStyle: {        // 系列级个性化折线样式
                      //   width: 3,
                      //   type: 'solid',
                      //   color: "#76e2ff" //折线的颜色
                      // }
                    },

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
          }else {
            this.nodata = "divMy";
            doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
          }
        }
      }
    }
}
</script>

<style lang='less' scoped>
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
