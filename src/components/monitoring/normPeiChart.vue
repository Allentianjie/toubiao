<template>
  <div id="nPeiChar" style="width:100%;height:80%" :class="nodata">
    <div class="pieChart" style="width:100%;height:100%" :id="pieChartData.id"></div>
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
    props: ["pieChartData"],
    mixins: [echart],
    mounted () {
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
      pieChartData: {
        handler (newValue, oldValue) {
          this.$nextTick(() => {
            this.pieChart();
          });
        },
        deep: true
      }
    },
    methods: {
      pieChart () {
        let colorData = require("../../../public/static/chartColor.json");
        let {
          id,
          legendData,
          seriesData,
          totalData
        } = this.pieChartData;
        let doc = document.querySelector("#nPeiChar");
        if(seriesData.length>0) {
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
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
              grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                // top: '20%',
                containLabel: true
              },
              color: colorData,
              legend: {
                orient: 'vertical',
                left: "15",
                top: "20",
                data: legendData
              },
              series: [

                {
                  name: "占比",
                  type: "pie",
                  radius: ["40%", "60%"],
                  label: {
                    normal: {
                      formatter://{a|{a}}{abg|}\n{hr|}\n
                        " {b|{b}：}{c} \n {per|{d}%}  ",
                      // backgroundColor: "#eee",
                      // borderColor: "#aaa",
                      // borderWidth: 1,
                      // borderRadius: 4,
                      // shadowBlur: 3,
                      // shadowOffsetX: 1,
                      // shadowOffsetY: 1,
                      // shadowColor: "#eee",
                      // padding: [0, 7],
                      rich: {
                        a: {
                          color: "#999",
                          lineHeight: 22,
                          align: "center"
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        // hr: {
                        //   borderColor: "#aaa",
                        //   width: "100%",
                        //   borderWidth: 0.5,
                        //   height: 0
                        // },
                        // b: {
                        //   fontSize: 16,
                        //   lineHeight: 33
                        // },
                        per: {
                          color: "#eee",
                          backgroundColor: "#334455",
                          padding: [2, 4],
                          borderRadius: 2
                        }
                      }
                    }
                  },
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
<style lang="less" scoped>
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
