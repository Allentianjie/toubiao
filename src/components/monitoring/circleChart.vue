<template>
  <div id="circls" style="width:100%;height: calc(100% - 40px)" :class="nodata">
    <div style="width: 100%;height:100%;" :id="CircleData.id"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";
  // import echartsLiquidfill from 'echarts-liquidfill'
  export default {
    props: ["CircleData"],
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    mixins: [echart],
    mounted() {
    },
    watch: {
      CircleData: {
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
        let {id, seriesData} = this.CircleData;

        let doc = document.querySelector("#circls");
        if (seriesData.achieving || seriesData.achieving) {
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              // graphic: {
              //   elements: [{
              //     type: 'image',
              //     style: {
              //       image: giftImageUrl,
              //       width: 30,
              //       height: 30
              //     },
              //     left: 'center',
              //     top: 'center'
              //   }]
              // },
              tooltip: {
                trigger: "item",
                formatter: "{b} : {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                left: "15",
                bottom: "20",
                // itemGap: 50,
                selectedMode: true,
                data: ["达标", "运行中"],
                borderColor: "red"
              },
              // legend: {
              //   orient: 'vertical',
              //   left: "10",
              //   top: "20",
              //   data: legendData
              // },
              grid: {
                left: "5%",
                right: "5%",
                bottom: "3%",
                top: "0",
                containLabel: true
              },
              series: [
                {
                  type: "pie",
                  radius: ["45%", "65%"],
                  center: ["55%", "50%"],
                  // roseType: "radius",
                  color: ["#46daff", "#60b8f6"],
                  data: [
                    {
                      value: seriesData.achieving,
                      name: "达标"
                    },
                    {
                      value: seriesData.spiral,
                      name: "运行中"
                    }
                  ],
                  label: {
                    normal: {
                      textStyle: {
                        fontSize: 14
                      },
                      formatter: function (param) {
                        return (
                          // param.name +
                          // ":\n" +
                          Math.round(param.percent) +
                          "%"
                        );
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      // smooth: true,
                      lineStyle: {
                        width: 2
                      }
                    }
                  },
                  itemStyle: {
                    // normal: {
                    //   shadowBlur: 30,
                    //   shadowColor: "rgba(0, 0, 0, 0.4)"
                    // }
                  },

                  // animationType: "scale",
                  // animationEasing: "elasticOut"
                  // animationDelay: function(idx) {
                  //   return Math.random() * 200;
                  // }
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
        }else {
          this.nodata = "divMy";
          doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
        }
      }
    }
  };
</script>
<style lang='less' scoped>
  #circls{
    height: 100%;
    >div{
      height: 100%;
    }
  }
  .divMy {
      background-image: url("../../assets/images/wushuju.png");
      background-repeat: no-repeat;
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
