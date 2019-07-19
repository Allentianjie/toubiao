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
                {
                  legend: {
                    data: ['学生' , '老师'],
                  },
                  grid: {
                    containLabel: true,
                    left: "1%",
                    right: "1%",
                    bottom: '0%',
                    top: '11%'
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
                  },
                  yAxis: [{
                    data: seriesData.yData,
                    axisLabel: {
                      fontSize: 14,
                      color: '#333'
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
                      data: seriesData.student,
                    },
                    {
                      type: 'bar',
                      name: '老师',
                      stack: '2',
                      legendHoverLink: false,
                      barWidth: 14,
                      label: _label,
                      data: seriesData.teacher,
                    }
                  ],
                  color: ["#eea941", "#30c4ae"]
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
