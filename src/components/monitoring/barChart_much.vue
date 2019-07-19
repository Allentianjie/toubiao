<template>
  <div id="tasksummarysBar" style="width:100%;height:100%;padding: 0 10px" :class="nodata">
    <div style="width:100%;height:100%" :id="barChar.barCharId"></div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";
  export default {
    props: ["barChar"],
    data() {
      return{
        nodata: 'loadingBox'
      }
    },
    mixins: [echart],
    mounted() {
      // this.$nextTick(() => {
        // this.pieChart();
      // });
    },
    watch: {
      barChar: {
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
          barCharId,
          legendData,
          xAxisData,
          seriesData
        } = this.barChar;
        // console.log('bar99-----',this.barChar)
        let doc = document.querySelector("#tasksummarysBar");
        let labelOption = {
          normal: {
            show: true,
            position: 'insideBottom',
            distance: '15',
            align: 'left',
            verticalAlign: 'middle',
            rotate: '90',
            formatter: '{c}  {b}',
            fontSize: 14,
          }
        };
        // if (seriesData.length > 0) {
        for (let i = 0; i < seriesData.length; i++) {
          if (seriesData[i] > 0) {
            this.$nextTick(() => {
              this.nodata = "";
              doc.getElementsByTagName("div")[0].setAttribute("id", barCharId);
              let myChart = this.echartInit(barCharId);
              myChart.setOption(
                {
                  color: ["#b7d9fe"],
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
                  //  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                  },
                  grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '5%',
                    top: '10%',
                    containLabel: true
                  },
                  xAxis: [
                    {
                      // show: false,
                      type: 'category',
                      data: xAxisData,
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
                      symbol: "circle", //标记的图形为实心圆
                      symbolSize: 7,
                      name: '数量',
                      type: 'bar',
                      barWidth: '45%',
                      // label: labelOption,
                      data: seriesData,
                      // areaStyle: { }, //区域填充样式},
                      /*   areaStyle: { //区域填充样式
                         normal: {
                           //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                           color: {
                             type: 'linear',
                             x: 0,
                             y: 0,
                             x2: 0,
                             y2: 1,
                             colorStops: [{
                               offset: 0, color: 'rgba(81,0,235,1)' // 0% 处的颜色
                             }, {
                               offset: 1, color: 'rgba(0,0,0, 0)' // 100% 处的颜色
                             }],
                             global: false // 缺省为 false
                           },
                           // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                           // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                         }
                       },*/
                      itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
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
                        },
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
            this.nodata = "divMy";
            doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
          }
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
