<template>
  <div id="lineChar" style="width:100%;height:100%" :class="nodata">
    <div style="width:100%;height:100%;" :id="LineDataNum.pieChartId">
      <!--<img src="../../assets/images/wushuju.png" alt="" >-->
    </div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";
  export default {
    props: ["LineDataNum"],
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    mixins: [echart],
    mounted () {
      // this.$nextTick(() => {
      //   this.pieChart();
      // });
    },
    watch: {
      LineDataNum: {
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
        let {pieChartId,seriesData} = this.LineDataNum;
        let doc = document.querySelector("#lineChar");
        if(seriesData.xData.length>0 || seriesData.tasksNum.length>0 || seriesData.tasksAccomplish.length>0){
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", pieChartId);
          let myChart = this.echartInit(pieChartId);
          myChart.setOption(
            {
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                top: '0',
                itemGap: 50,
                selectedMode: true,
                data:['任务数量', '任务达标'],
                borderColor:'red',
              },

              color: ['#ec6d2d', '#3742d1'],
              grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '13%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: seriesData.xData
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name:'任务达标',
                  type:'line',
                  smooth: true,
                  // symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3,
                  lineStyle: {
                    width: 1,
                  },
                 /* areaStyle: { //区域填充样式
                    normal: {
                      //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(236,215,96, 0.8)' // 0% 处的颜色
                        }, {
                          offset: 1, color: 'rgba(255,255,255, 0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                      },
                      // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                      // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    }
                  },*/
                  areaStyle: {
                    normal: {
                      // type: 'default',
                      color: '#bfe1ff',
                    }
                  },
                  itemStyle: {
                    normal: {color: "rgba(191,225,225, 0)" } // 线条颜色}
                  },
                  /*itemStyle: {
                    normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      borderColor: '#ec6d2d',
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: 'rgba(236,215,96, 0.8)' // 0% 处的颜色
                        }, {
                          offset: 1, color: 'rgba(255,255,255, 0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                      },
                      lineStyle: {        // 系列级个性化折线样式
                        width: 1,
                        type: 'solid',
                        color: "#ec6d2d" //折线的颜色
                      }
                    },
                  },*/
                  data: seriesData.tasksAccomplish
                },
                {
                  name:'任务数量',
                  type:'line',
                  // symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3,
                  lineStyle: {
                    width: 1,
                  },
                  smooth: true,
                  /*areaStyle: { //区域填充样式
                    normal: {
                      //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: '#53c6dc' // 0% 处的颜色
                        }, {
                          offset: 1, color: 'rgba(255,255,255, 0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                      },
                      // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                      // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    }
                  },*/
                  areaStyle: {
                    normal: {
                      // type: 'default',
                      color: '#b4f5fa',
                    }
                  },
                  itemStyle: {
                    normal: {color: "rgba(61,234,255, 0)" } // 线条颜色}
                  },
                  data: seriesData.tasksNum
                },
              ]
            },
            true
          )
          this.$nextTick(() => {
            window.addEventListener("resize", () => {
              myChart.resize();
            });
          })
        }else {
          this.nodata = "divMy";
          doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
        }

      }
    }
  };
</script>

<style lang='less' scoped>
  #lineChar{
    height: 100%;
    >div{
      height: 100%;
    }
  }
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
