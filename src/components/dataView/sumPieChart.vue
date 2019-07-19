<template>
  <div id="sumPie" style="width:100%;height:80%" :class="nodata">
    <div class="pieChart" style="width:100%;height: 100%" :id="TaskreportsData.pieChartId"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";

  export default {
    props: ["TaskreportsData"],
    mixins: [echart],
    mounted() {
      //   this.$nextTick(() => {
      //     this.pieChart();
      //   });
    },
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    watch: {
      TaskreportsData: {
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
        let colorData = require("../../../public/static/chartColor.json");
        let {
          pieChartId,
          legendData,
          seriesData,
          totalData,
        } = this.TaskreportsData;
        let doc = document.querySelector("#sumPie");
        if (seriesData.length > 0) {
          this.$nextTick(() => {
            this.nodata = "";
            doc.getElementsByTagName("div")[0].setAttribute("id", pieChartId);
            let myChart = this.echartInit(pieChartId);
            myChart.setOption(
              {
                title: {
                  text: "",
                  x: "center"
                },
                tooltip: {
                  trigger: "item",
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ['#36A9FE', '#16D970', '#EDD638'],
                legend: {
                  // orient: 'vertical',
                  x: "bottom",
                  data: legendData
                },
                series: [
                  {
                    name: "总数",
                    type: "pie",
                    // selectedMode: "single",
                    center: ["45%", "60%"],
                    radius: [0, "35%"],
                    label: {
                      normal: {
                        show: true,
                        position: "center",
                        color: ['#eee'],
                        // position: "top"
                      },

                    },
                    color: ['#7E94F3'],
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: totalData,
                  },
                  {
                    name: "任务状态",
                    type: "pie",
                    center: ["45%", "60%"],
                    radius: ["45%", "65%"],
                    /*label: {
                            normal: {
                              formatter:
                                "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                              backgroundColor: "#eee",
                              borderColor: "#aaa",
                              borderWidth: 1,
                              borderRadius: 4,
                              shadowBlur: 3,
                              shadowOffsetX: 1,
                              shadowOffsetY: 1,
                              shadowColor: "#eee",
                              padding: [0, 2],
                              rich: {
                                a: {
                                  color: "#999",
                                  lineHeight: 22,
                                  align: "center"
                                },
                                hr: {
                                  borderColor: "#aaa",
                                  width: "100%",
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 16,
                                  lineHeight: 33
                                },
                                per: {
                                  color: "#eee",
                                  backgroundColor: "#334455",
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              }
                            }
                          },*/
                    data: seriesData
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
            // window.onresize = function() {
            //     myChart.resize();
            //     //myChart1.resize();    //若有多个图表变动，可多写
            // };
          })
        }else {
          this.nodata = "divMy";
          doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .divMy {
      background-image: url("../../assets/images/wushuju.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 80%;
  }
  .loadingBox {
    background-image: url("../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
