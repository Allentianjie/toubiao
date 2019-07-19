<template>
    <div id="queryEchartsP" style="width:100%;height: 100%">
      <!--<div style="width:100%;height:100%" :id="lineChartData.pieChartId"></div>-->
    </div>
</template>

<script>
  import echart from "@/mixins/echart";
  export default {
    props: ["PDCAChartData"],
    mixins: [echart],
    mounted() {
      this.$nextTick(() => {
        this.pieChart();
      });
    },
    watch: {
      PDCAChartData: {
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
        let {pieChartId,seriesData} = this.PDCAChartData;
        let doc = document.querySelector('#queryEchartsP')
        doc.innerHTML = `<div style="width: 100%;height:300px;"></div>`
        this.$nextTick(() => {
          doc.getElementsByTagName('div')[0].setAttribute('id',pieChartId)
          let myChart = this.echartInit(pieChartId);
          myChart.setOption(
         {
            backgroundColor: '#ffffff',
            title: {
              text: 'vm.title',
              left: 'center',
              textStyle: {
                color: '#fff'
              },
              padding: [50, 50]
            },
            grid: {
              x: 40,
              y: 20,
              x2: 40,
              y2: 20
            },
            xAxis: {
              show: false,
              data: [0, 1]
            },
            yAxis: {
              show: false,
              data: [0, 1]
            },
            series: [{
              //连线
              name: 'vm.title',
              type: "lines",
              coordinateSystem: "cartesian2d",
              zlevel: 1,
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                //"color": "#000",
                symbolSize: 3
              },
              data: [{
                coords: [
                  [0, 1],
                  [1, 1]
                ],
                lineStyle: {
                  normal: {
                    color: "#0000FF",
                    width: 0,
                    curveness: 0
                  }
                }
              }, {
                coords: [
                  [1, 1],
                  [1, 0]
                ],
                lineStyle: {
                  normal: {
                    color: "#0000FF",
                    width: 0,
                    curveness: 0
                  }
                }
              }, {
                coords: [
                  [1, 0],
                  [0, 0]
                ],
                lineStyle: {
                  normal: {
                    color: "#FF0000",
                    width: 0,
                    curveness: 0
                  }
                }
              }, {
                coords: [
                  [0, 0],
                  [0, 1]
                ],
                lineStyle: {
                  normal: {
                    color: "#FF0000",
                    width: 0,
                    curveness: 0
                  }
                }
              }]
            }, {
              //图标
              name: 'vm.title',
              type: "lines",
              coordinateSystem: "cartesian2d",
              zlevel: 2,
              symbol: ["arrow", "arrow"],
              symbolSize: 10,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbolSize: 10
              },
              data: [{
                coords: [
                  [0, 1],
                  [1, 1]
                ],
                lineStyle: {
                  normal: {
                    color: "#0000FF",
                    width: 0,
                    curveness: 0
                  }
                }
              },
                {
                  coords: [
                    [1, 1],
                    [1, 0]
                  ],
                  lineStyle: {
                    normal: {
                      color: "#0000FF",
                      width: 0,
                      curveness: 0
                    }
                  }
                }]
            }, {
              name: 'vm.title',
              type: "effectScatter",
              coordinateSystem: "cartesian2d",
              zlevel: 2,
              symbolSize: 20,
              rippleEffect: {
                brushType: "stroke"
              },
              data: [
                {
                label: {
                  normal: {
                    show: true,
                    padding: 15,
                    position: "top",
                    // formatter: "【P 计划】【就业质量 >= 90%】"
                    formatter:"【P 计划】 【" +  seriesData.pData + "】"
                  }
                },
                itemStyle: {
                  normal   : {
                    color    : "#0000FF"
                  }
                },
                value: [0, 1, 99]
              },
                {
                label: {
                  normal: {
                    show: true,
                    padding: 15,
                    position: "top",
                    formatter: "【D 执行】【 " + seriesData.dData + '】'
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#0000FF"
                  }
                },
                value: [1, 1, 99]
              },
                {
                label: {
                  normal: {
                    show: true,
                    padding: 15,
                    position: "bottom",
                    // formatter: "【C 检查】 【诊改监控运行中 预警任务数 5】"
                    formatter: "【C 检查】 【诊改监控" + seriesData.cData + '】'
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#0000FF"
                  }
                },
                value: [1, 0, 99]
              },
                {
                label: {
                  normal: {
                    show: true,
                    padding: 15,
                    position: "bottom",
                    // formatter: "【A 处理】 【还未进行诊改】"
                    formatter: "【A 处理】 【" + seriesData.aData +'】'
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#FF0000"
                  }
                },
                value: [0, 0, 99]
              }]
            }]
          },
            true
          )
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        })
      },
    }
  };
</script>
<style lang='less' scoped>
  .queryEchartsP{
    /*>div{*/
      /*background-image: url("../../assets/images/wushuju.png");*/
      /*background-repeat:no-repeat;*/
      /*background-position: center;*/
      /*background-size: auto 80%*/
    /*}*/
  }
</style>
