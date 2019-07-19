<template>
  <div  :id="lineAndBar.idDiv" class="idDivClass" style="width:100%;height:80%" :class="nodata">
    <div style="width:100%;height:100%" :id="lineAndBar.id"></div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";
  export default {
    props: ["lineAndBar"],
    data() {
      return{
        nodata: 'loadingBox'
      }
    },
    mixins: [echart],
    mounted() {
      this.$nextTick(() => {
        this.pieChart();
      });
      // console.log(88,this.lineAndBar)
    },
    watch: {
      lineAndBar: {
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
          idDiv,
          legendData,
          xAxisData,
          seriesData
        } = this.lineAndBar;
        // console.log(55,this.lineAndBar)
        if(idDiv){
          if (xAxisData.length > 0 && seriesData.length > 0) {
            this.$nextTick(() => {
              this.nodata = "";
              // let doc = document.querySelector(idDiv);
              // doc.getElementsByTagName("div")[0].setAttribute("id", id);
              let myChart = this.echartInit(id);
              myChart.setOption(
                // {
                //   color: ['#e82715', '#4386DB', '#24C1D1', '#6CCE5F'],
                //    xAxis: {
                //      splitLine: {
                //        show: false,
                //      },
                //      axisLabel: {
                //        // color: 'red',
                //        color: ['#e82715', '#4386DB', '#24C1D1', '#6CCE5F'],
                //        rotate: '35',
                //        fontSize: 12,
                //      },
                //      data: ['0', '标准值', '预警值','当前值'],
                //      boundaryGap: 0,
                //    },
                //    yAxis: {
                //      // name: '（单位/km）',
                //      // splitLine: {
                //      //   show: false,
                //      // },
                //      // axisLabel: {
                //      //   color: '#fff',
                //      // },
                //      // axisPointer: {
                //      //   lineStyle: {
                //      //     color: '#fff',
                //      //   },
                //      //   value: '140',
                //      // },
                //      type: 'value'
                //    },
                //    grid: {
                //      top: '10%',
                //      bottom: '20%',
                //      left: '18%',
                //    },
                //    series: [{
                //      data:[160,200,130,140],
                //      type: 'bar',
                //      barWidth: '30%',
                //      symbolSize: function (parmas) {
                //        return Math.ceil(parmas[2] / 1000);
                //      },
                //      label: {
                //        emphasis: {
                //          show: true,
                //          formatter: function (param) {
                //            return param.data[3] + param.data[4];
                //          },
                //          position: 'top',
                //        },
                //      },
                //      markLine: {
                //        data: [
                //          [
                //            { name: '标线1起点', xAxis: 0, yAxis: 140 },
                //            { name: '标线1终点', xAxis: '当前值', yAxis: 140 },
                //          ],
                //        ],
                //        label: {
                //          normal: {
                //            show: true,
                //            position: 'middle',
                //            formatter: '当前目标值',
                //          },
                //        },
                //        lineStyle: {
                //          normal: {
                //            // type: 'solid',
                //            color: '#39CB7A',
                //          },
                //        },
                //      },
                //      itemStyle: {
                //        normal: {
                //          color: '#4386DB',
                //          // color: ['#e82715', '#4386DB', '#24C1D1', '#6CCE5F'],
                //        },
                //      },
                //    }],
                //  },
                {
                  color: ['#3398DB'],
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                  },
                  grid: {
                    left: '10%',
                    right: '8%',
                    bottom: '5%',
                    top: '8%',
                    containLabel: true
                  },
                  xAxis : [
                    {
                      type : 'category',
                      data : xAxisData,
                      splitLine: {
                        show: false,
                      },
                      axisLabel: {
                        rotate: '35',
                        fontSize: 12,
                        boundaryGap: 0,
                      },
                      axisTick: {
                        alignWithLabel: true
                      }
                    }
                  ],
                  yAxis : [
                    {
                      type : 'value'
                    }
                  ],
                  series : [
                    {
                      type:'bar',
                      barWidth: '40%',
                      data:seriesData
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
            });
          }
          // if (seriesData.length > 0) {
          //     this.$nextTick(() => {
          //
          //         let myChart = this.echartInit(id);
          //         myChart.setOption(
          //             {
          //                 color: ["#fec321"],
          //                 tooltip: {
          //                     trigger: "axis",
          //                     axisPointer: {
          //                         // 坐标轴指示器，坐标轴触发有效
          //                         type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          //                     }
          //                 },
          //                 grid: {
          //                     left: "3%",
          //                     right: "4%",
          //                     bottom: "3%",
          //                     top: "19%",
          //                     containLabel: true
          //                 },
          //                 xAxis: [
          //                     {
          //                         type: "category",
          //                         data: xAxisData,
          //                         axisTick: {
          //                             alignWithLabel: true
          //                         }
          //                     }
          //                 ],
          //                 yAxis: [
          //                     {
          //                         type: "value"
          //                     }
          //                 ],
          //                 series: [
          //                     {
          //                         name: "指标分布",
          //                         type: "bar",
          //                         barWidth: "35%",
          //                         data: seriesData
          //                     }
          //                 ]
          //             },
          //             true
          //         );
          //         this.$nextTick(() => {
          //             window.addEventListener("resize", () => {
          //                 myChart.resize();
          //             });
          //         });
          //     });
          else {
            let doc = document.querySelector(idDiv);
            this.nodata = "divMy";
            doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
          }
        }else{
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .divMy {
    //    > div {
    background-image: url("../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
    //   }
  }
  .loadingBox {
    background-image: url("../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
