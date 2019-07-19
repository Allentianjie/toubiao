<template>
  <div style="width:100%;height:100%;" id="flowImg">
    <div class="pieChart" style="width:100%;height: 100%;" :id="flowChartData.id"></div>
    <!--<img src="../../assets/" alt="">-->
  </div>
</template>

<script>
  import echart from "@/mixins/echart";
export default {
  props: ["flowChartData"],
  mixins: [echart],
  mounted() {
    this.$nextTick(() => {
      this.flowChart();
    });
  },
  watch: {
    flowChartData: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.flowChart();
        });
      },
      deep: true
    }
  },
  methods: {
    flowChart() {
      let {id, seriesData,} = this.flowChartData;
      let myChart = this.echartInit(id);
      myChart.setOption(
        {
          title: {
            text: '',
            left: 'center',
            textStyle: {
              color: '#fff'
            },
            padding: [50, 50]
          },
          // renderAsImage:"<%=basePath%>../../assets/images/beijing.jpg",
          grid: {
            x: 30,
            y: 50,
            x2: 10,
            y2: 50
          },
          xAxis: {
            show: false,
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8]
          },
          yAxis: {
            show: false,
            data: [0, 1, 2]
          },
          series: [
            {
            //连线
            "name": '',
            "type": "lines",
            "coordinateSystem": "cartesian2d",
            "zlevel": 2,
            //symbol: ['none', 'arrow'],
            "effect": {
              "show": true,
              "period": 6,
              "trailLength": 0.7,
              "symbolSize": 3
            },
            "data": [{
              "coords": [
                [0, 2],
                [1, 2]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#ffa022",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [1, 2],
                [2, 2]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#ffa022",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [2, 2],
                [3, 2]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#ffa022",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [3, 2],
                [3, 1]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#ffa022",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [3, 1],
                [3, 0]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#ffa022",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [3, 0],
                [2, 0]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#ffa022",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [2, 0],
                [1, 0]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#ffa022",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [1, 0],
                [0, 0]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#ffa022",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [0, 0],
                [0, 1]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#00BFFF",
                  "width": 0,
                  "curveness": 0
                }
              }
            }, {
              "coords": [
                [0, 1],
                [3, 1]
              ],
              "lineStyle": {
                "normal": {
                  "color": "#00BFFF",
                  "width": 0,
                  "curveness": 0
                }
              }
            },
              //指标内循环
              {
                "coords": [
                  [3, 1],
                  [5, 1]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#00BFFF",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [5, 1],
                  [6, 1]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#00BFFF",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [6, 1],
                  [7, 1]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#00BFFF",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [7, 1],
                  [8, 1]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#ffa022",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [8, 1],
                  [8, 2]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#00BFFF",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [8, 2],
                  [7, 2]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#00BFFF",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [7, 2],
                  [6, 2]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#00BFFF",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [6, 2],
                  [5, 2]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#00BFFF",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [5, 2],
                  [4, 2]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#ffa022",
                    "width": 0,
                    "curveness": 0
                  }
                }
              },
              //任务指标
              {
                "coords": [
                  [3, 0],
                  [4, 0]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#ffa022",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [4, 0],
                  [5, 0]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#ffa022",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [5, 0],
                  [6, 0]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#ffa022",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }, {
                "coords": [
                  [6, 0],
                  [7, 0]
                ],
                "lineStyle": {
                  "normal": {
                    "color": "#ffa022",
                    "width": 0,
                    "curveness": 0
                  }
                }
              }]
          },
            {
              "name": 'vm.title',
              "type": "effectScatter",
              "coordinateSystem": "cartesian2d",
              "zlevel": 1,
              'symbolSize': 20,
              "rippleEffect": {
                "brushType": "stroke"
              },
              "data": [
                {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "【诊改体系】 \n\n2019-01-29\n-\n2019-06-29\n\n 未上传支撑文件"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffa022" //无支撑文件：ffa022；未质控：FFFF33；都缺：ffffff；正常：46bee9
                  }
                },
                "value": [0, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "【诊改层面】\n\n2019-01-29\n-\n2019-06-29\n\n 未质控"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#FFFF33" //无支撑文件：ffa022；未质控：FFFF33；都缺：ffffff；正常：46bee9
                  }
                },
                "value": [1, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "【诊改维度】\n\n2019-01-29\n-\n2019-06-29\n\n 未配置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //无支撑文件：ffa022；未质控：FFFF33；都缺：ffffff；正常：46bee9
                  }
                },
                "value": [2, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "【诊改质控点】\n\n2019-01-29\n-\n2019-06-29\n\n 未质控"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#FFFF33" //无支撑文件：ffa022；未质控：FFFF33；都缺：ffffff；正常：46bee9
                  }
                },
                "value": [3, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "【诊改指标】\n\n2019-01-29\n-\n2019-06-29\n\n 质控中"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffa022" //基础数据未配置、权重未设置、
                  }
                },
                "value": [3, 1, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "指标权重\n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [5, 1, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "基础数据关联\n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [6, 1, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "目标权重 \n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [7, 1, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "目标支撑文件 \n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [8, 1, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "标准权重 \n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [8, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "标准支撑文件 \n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [7, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "预警策略 \n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [6, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "预警值 \n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [5, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "质控状态 \n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff" //基础数据未配置、权重未设置、
                  }
                },
                "value": [4, 2, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "【诊改任务】\n\n2019-01-29\n-\n2019-06-29\n\n 未质控"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffa022"
                  }
                },
                "value": [3, 0, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "关联基础数据\n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff"
                  }
                },
                "value": [4, 0, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "数据维度\n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff"
                  }
                },
                "value": [5, 0, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "支撑文件\n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff"
                  }
                },
                "value": [6, 0, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "填报数值\n\n未设置"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffffff"
                  }
                },
                "value": [7, 0, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "【诊改质控】\n\n2019-01-29\n-\n2019-06-29\n\n运行中"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffa022"
                  }
                },
                "value": [2, 0, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "【诊改结果】\n\n2019-01-29\n-\n2019-06-29\n\n未达标"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffa022"
                  }
                },
                "value": [1, 0, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "bottom",
                    "formatter": "【螺旋诊改】\n\n2019-01-29\n-\n2019-06-29\n\n未开始"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffa022"
                  }
                },
                "value": [0, 0, 99]
              }, {
                "label": {
                  "normal": {
                    "show": true,
                    "padding": 15,
                    "position": "top",
                    "formatter": "【调整指标】\n\n2019-01-29\n-\n2019-06-29\n\n未开始"
                  }
                },
                "itemStyle": {
                  "normal": {
                    "color": "#ffa022"
                  }
                },
                "value": [0, 1, 99]
              }]
            }]
        },
        true
      );
      this.$nextTick(() => {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      });
      // window.onresize = function() {
      //     myChart.resize();
      //     //myChart1.resize();    //若有多个图表变动，可多写
      // };
    }
  }
}
</script>

<style scoped>
  #flowImg{
    /*background: url("../../assets/images/beijing.jpg");*/
    /*background: url("../../assets/images/beijing.jpg");*/
    background-image: url('../../assets/images/beijing.jpg');
    background-size:100% 100% ;

  }
</style>
