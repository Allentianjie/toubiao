<template>
  <div style="width:100%;height:87%">
    <div class="pieChart" style="width:100%;height: 100%" :id="pieData.pieChartId"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";
  export default {
    props: ["pieData"],
    mixins: [echart],
    mounted() {
      this.$nextTick(() => {
        this.pieChart();
      });
    },
    watch: {
      pieData: {
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
        } = this.pieData;
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
            color: ['#36A9FE','#16D970','#EDD638'],
            legend: {
              orient: 'vertical',
              x: "right",
              data: legendData
            },
            series: [
              {
                name: "总数",
                type: "pie",
                // selectedMode: "single",
                radius: [0, "35%"],
                label: {
                  normal: {
                    show:true,
                    position: "center",
                    color:['#eee'],
                    // position: "top"
                  },

                },
                color:['#7E94F3'],
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
      }
    }
  };
</script>
<style lang="less" scoped>
</style>
