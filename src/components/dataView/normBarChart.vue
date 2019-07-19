<template>
  <div id="tasksummarys" style="width:100%;height:calc(100% - 0.35rem);margin-top: 5px;padding: 0 10px;" :class="nodata">
    <div style="width:100%;height:100%" :id="TaskMonitorData.id"></div>
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
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    props: ["TaskMonitorData"],
    mixins: [echart],
    mounted() {
      // this.$nextTick(() => {
      //     this.pieChart();
      // });
    },
    watch: {
      TaskMonitorData: {
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
        // console.log(this.TaskMonitorData)
        let {
          id,
          legendData,
          xAxisData,
          seriesData
        } = this.TaskMonitorData;
        let doc = document.querySelector("#tasksummarys");
        if (seriesData.length > 0 && xAxisData.length > 0) {
          this.$nextTick(() => {
            this.nodata = "";
            doc.getElementsByTagName("div")[0].setAttribute("id", id);
            let myChart = this.echartInit(id);
            myChart.setOption(
              {
                color: ["#fec321"],
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "10%",
                  top: "10%",
                  containLabel: true
                },
                xAxis: [
                  {
                    type: "category",
                    data: xAxisData,
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: "value"
                  }
                ],
                series: [
                  {
                    name: "指标分布",
                    type: "bar",
                    barWidth: "35%",
                    data: seriesData
                  }
                ]
              },
              true
            );
			      myChart.on('click', function (params) {
            console.log(199991,params)
            })
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
