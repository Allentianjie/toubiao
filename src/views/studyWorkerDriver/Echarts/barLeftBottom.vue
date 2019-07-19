<template>
  <div id="barLeftBottom" style="width:100%;height:100%" :class="nodata">
    <div class="pieChart" style="width:100%;height: 100%;" :id="barRightData.id"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";
  export default {
    props: ["barRightData"],
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
      barRightData: {
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
        let {id, seriesData,} = this.barRightData;
        let doc = document.querySelector("#barLeftBottom");
        if(seriesData.yData.length>0){
          for(let i = 0; i<seriesData.yData.length; i++){
            if(seriesData.student[i] > 0 || seriesData.teacher[i] > 0 ){
              this.nodata = "";
              doc.getElementsByTagName("div")[0].setAttribute("id", id);
              let myChart = this.echartInit(id);
              var _label = {
                normal: {
                  show: true,
                  position: 'inside',
                  // formatter: fomatter_fn,
                  textStyle: {
                    color: '#fff',
                    fontSize: 13
                  }
                }
              };
              myChart.setOption(
                // {
                //   // color: {
                //   //   type: 'linear',
                //   //   x: 0,
                //   //   y: 0,
                //   //   x2: 0,
                //   //   y2: 1,
                //   //   colorStops: [{
                //   //     offset: 0, color: '#b3f2f0' // 0% 处的颜色
                //   //   }, {
                //   //     offset: 1, color: '#337ac7' // 100% 处的颜色
                //   //   }],
                //   //   global: false // 缺省为 false
                //   // },
                //   // color: ["#6abefe"],
                //   tooltip: {
                //     trigger: 'axis',
                //     // formatter: function (params) {
                //     //   // return params[0].name + ' : ' + params[0].value
                //     //
                //     // }
                //     // formatter: '{b} : {c}'
                //   },
                //   grid: {
                //     left: '3%',
                //     right: '4%',
                //     bottom: '1%',
                //     top: '5%',
                //     containLabel: true
                //   },
                //   xAxis: [
                //     {
                //       type: 'category',
                //       data: seriesData.xData,
                //       axisTick: {
                //         alignWithLabel: true
                //       },
                //       axisLabel: {
                //         color: '#fff',
                //         fontSize: 12,
                //         rotate: '35',
                //         boundaryGap: 0,
                //       },
                //       axisLine: {
                //         lineStyle:{
                //           color: '#74EAB2'
                //         }
                //       },
                //     }
                //   ],
                //   yAxis: [
                //     {
                //       type: 'value',
                //       splitLine: {
                //         show: true,
                //         lineStyle: {
                //           color: '#74EAB2'
                //         }
                //       },
                //       axisLine: {
                //         lineStyle:{
                //           color: '#74EAB2'
                //         }
                //       },
                //       axisLabel: {
                //         color: '#fff',
                //         fontSize: 14
                //       }
                //     }
                //   ],
                //   series: [
                //     {
                //       name: '数量',
                //       type: 'bar',
                //       barWidth: '60%',
                //       data: seriesData.yData,
                //       areaStyle: {}, //区域填充样式},
                //       color: ["#10F6D9"],
                //       label: {
                //         normal: {
                //           show: true,
                //           position: 'outside',
                //           formatter: '{c}'
                //         },
                //         emphasis: {
                //           show: true,
                //           textStyle: {
                //             fontSize: '20',
                //             fontWeight: 'normal',
                //             color: '#fff'
                //           }
                //         }
                //       },
                //       itemStyle: {
                //         /*     normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                //           type: 'bar',
                //           x: 0,
                //           y: 0,
                //           x2: 0,
                //           y2: 1,
                //           colorStops: [{
                //             offset: 0, color: '#438DF6' // 0% 处的颜色
                //           }, {
                //             offset: 1, color: '#5EC3FF' // 100% 处的颜色
                //           }],
                //           global: false // 缺省为 false
                //         },*/
                //         // lineStyle: {        // 系列级个性化折线样式
                //         //   width: 3,
                //         //   type: 'solid',
                //         //   color: "#76e2ff" //折线的颜色
                //         // }
                //       },
                //
                //     }
                //   ]
                // },
                {
                  legend: {
                    data: ['学生' , '老师'],
                    textStyle: {
                      color: '#fff'
                    }
                  },
                  grid: {
                    containLabel: true,
                    left: "1%",
                    right: "1%",
                    bottom: '0%',
                    top: '11%'
                  },
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    },
                    right: '2%'
                  },
                  tooltip: {
                    show: true,
                    backgroundColor: '#fff',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    textStyle: {
                      color: '#3c3c3c',
                      fontSize: 12
                    },
                  },
                  xAxis: {
                    show:false
                    // axisLine: {
                    //   show: false
                    // },
                    // axisTick: {
                    //   show: false
                    // },
                    // splitLine: {
                    //   show: false
                    // }
                  },
                  yAxis: [{
                    data: seriesData.yData,
                    axisLabel: {
                      fontSize: 14,
                      color: '#fff'
                    },
                    axisLine: {
                      show: false
                    },
                    axisTick: {
                      show: false
                    },
                    splitLine: {
                      show: false
                    }
                  }],
                  series: [
                    {
                      type: 'bar',
                      name: '学生',
                      stack: '2',
                      label: _label,
                      legendHoverLink: false,
                      barWidth: 14,
                      itemStyle: {
                        normal: {
                          color: '#FD5916'
                        },
                        emphasis: {
                          color: '#FD5916'
                        }
                      },
                      data: seriesData.student,
                    },
                    {
                      type: 'bar',
                      name: '老师',
                      stack: '2',
                      legendHoverLink: false,
                      barWidth: 14,
                      label: _label,
                      itemStyle: {
                        normal: {
                          color: '#29A5FF'
                        },
                        emphasis: {
                          color: '#29A5FF'
                        }
                      },
                      data: seriesData.teacher,
                    }]
                },
                true
              );
              myChart.on('click',function (params) {
                // console.log('横向柱状图',params)
                that.$router.push({path: '/departDriver', query:{name:params.name}})
              })
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
        }else {
          this.nodata = "divMy";
          doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .divMy {
    //    > div {
    background-image: url("../../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
    //   }
  }
  .loadingBox {
    background-image: url("../../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
