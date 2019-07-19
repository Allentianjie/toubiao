<template>
  <div id="barchars" style="width:100%;height:100%;" :class="nodata">
    <div class="pieChart" style="width:100%;height: 100%;" :id="barChartData.id"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";
  export default {
    props: ["barChartData"],
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
      barChartData: {
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
        let that = this
        let {id, seriesData,} = this.barChartData;
        let doc = document.querySelector("#barchars");
        for (let i = 0; i < seriesData.yData.length; i++) {
          if (seriesData.yData[i] > 0) {
            this.nodata = "";
            doc.getElementsByTagName("div")[0].setAttribute("id", id);
            let myChart = this.echartInit(id);
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
                  left: '3%',
                  right: '4%',
                  bottom: '1%',
                  top: '5%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: seriesData.xData,
                    axisTick: {
                      alignWithLabel: true
                    },
                    axisLabel: {
                      color: '#333',
                      fontSize: 12,
                      rotate: '35',
                      boundaryGap: 0,
                    },
                    axisLine: {
                      lineStyle: {
                        color: '#333'
                      }
                    },
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    splitLine: {
                      show: true,
                      lineStyle: {
                        color: '#eee'
                      }
                    },
                    axisLine: {
                      lineStyle: {
                        color: '#333'
                      }
                    },
                    axisLabel: {
                      color: '#333',
                      fontSize: 14
                    }
                  }
                ],
                series: [
                  {
                    name: '数量',
                    type: 'bar',
                    barWidth: '60%',
                    data: seriesData.yData,
                    areaStyle: {}, //区域填充样式},
                    label: {
                      normal: {
                        show: true,
                        position: 'outside',
                        formatter: '{c}'
                      }
                    },
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
                ],
                color: ["#4bcd9d"]
              },
              true
            );
            myChart.on('click', function (params) {
              // console.log('点击柱状图', params)
              // 给后台传参数为name
              let titleName = {
                name: params.name,
                val: params.val,
                url: '/ledDriver'
              }
              let queryData = {
                name: params.name,
                // titleName: titleName,
                titleName:JSON.stringify(titleName),
                chartFlag: true,
                type: params.dataIndex,
                parentId: seriesData.zData[params.dataIndex],
                teacher: params.dataIndex
              }
              that.$router.push({path: '/twoChart', query: queryData})
            })

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
    }
  }
</script>

<style lang="less" scoped>
  .divMy {
    //    > div {
    background-image: url("./../../../../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
    //   }
  }

  .loadingBox {
    background-image: url("./../../../../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
