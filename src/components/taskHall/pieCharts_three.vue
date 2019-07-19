<template>
  <div id="chartThree" style="width:100%;height:80%" :class="nodata">
    <div class="pieChart" style="width:100%;height: 100%" :id="TaskreportsData.pieChartId"></div>
  </div>
</template>

<script>
  /** 使用饼图需要传递的参数
   pieChartData: {
    pieChartId: 'pieChartId',   //渲染的盒子ID  不能重复
    legendData: ['正常', '常宅', '晚归', '未归'],  // legendData
    pieTitle: '测试标题', // 标题
    seriesName: '人数（人）' // 系列名
    seriesRadius: ['30%', '50%'] // 饼图的半径 ['30%', '50%']空心环形  50%实心饼型
    seriesRoseType: 'area', // 是否展示成南丁格尔图，通过半径区分数据大小 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。有扇区圆心角相同，仅通过半径展现数据大小。
    seriesData: [
                    {value: 335, name: '机械学院'},
                    {value: 310, name: '电气学院'}
                ],  // seriesData
}
   */
  import echart from "@/mixins/echart";
  export default {
    props: ["TaskreportsData"],
    mixins: [echart],
    mounted() {
      // this.$nextTick(() => {
      //   this.pieChart();
      // });
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
        let doc = document.querySelector("#chartThree");
        if(totalData[0].value || seriesData[0].value || seriesData[1].value || seriesData[1].value ) {
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
                // formatter:function (paroms) {
                //   consoel.log()
                // }
              },
              //

              color: ['#38b0ec', '#57dc93', '#ffb448'],// 蓝绿黄
              legend: {
                orient: 'vertical',
                x: "right",
                // data: ['任务总数', '未开始', '已结束', '进行中']
                data: legendData
              },
              series: [
                {
                  name: '任务总数',
                  type: "pie",
                  // selectedMode: "single",
                  radius: [0, "35%"],
                  label: {
                    normal: {
                      show: true,
                      position: "center",
                      color: ['#eee'],
                      // position: "top"
                    },
                  },
                  color: ['#D15FEE'],
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
        }else {
          this.nodata = "divMy";
          doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
        }
      }
    }
  };
</script>
<style lang='less' scoped>
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
