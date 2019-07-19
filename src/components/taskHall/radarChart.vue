<template>
    <div id="rChar" style="width:100%;height:80%"  :class="nodata">
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
    props: ["TaskMonitorData"],
    mixins: [echart],
    mounted () {
        // this.$nextTick(() => {
        //     this.radarChart();
        // });
    },
  data() {
    return {
      nodata: "loadingBox"
    };
  },
    watch: {
        TaskMonitorData: {
            handler (newValue, oldValue) {
                this.$nextTick(() => {
                    this.radarChart();
                });
            },
            deep: true
        }
    },
    methods: {
        radarChart () {
           // let colorData = require("../../../static/chartColor.json");
            // console.log(this.TaskMonitorData)
            let {
                id,
                legendData,
                seriesData,
                indicatorData,
            } = this.TaskMonitorData;
          let doc = document.querySelector("#rChar");
          for(let i = 0; i<seriesData[0].value.length; i++){
            if(seriesData[0].value[i] > 0) {
              this.nodata = "";
              doc.getElementsByTagName("div")[0].setAttribute("id", id);
              let myChart = this.echartInit(id);
              myChart.setOption(
                {
                  tooltip: {
                    trigger: "item"
                    // formatter: "{a} <br/>{b} : {c}"
                  },
                  color: "rgb(86,199,60)",
                  radar: [
                    {
                      indicator: indicatorData,
                      center: ["50%", "50%"],
                      radius: 80
                    }
                  ],
                  series: [
                    {
                      type: "radar",
                      tooltip: {
                        trigger: "item"
                      },
                      // symbol: "circle",
                      symbolSize: 10,
                      areaStyle: {
                        normal: {
                          type: 'default',
                          color: "rgba(86,199,60, 0.5)"
                        }
                      },
                      itemStyle: {
                        normal: {
                          color: 'rgb(229,104,255)',
                          borderColor: 'rgb(229,104,255)',
                          borderWidth: 2,
                        }
                      },
                      lineStyle: {
                        normal: {
                          color: "rgba(229,104,255, 0.9)",
                          width: 2
                        }
                      },
                      /* itemStyle: {
                        normal: {
                          areaStyle: {
                            type: 'default',
                            color:'#19be6b'
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
              return
            }else {
              this.nodata = "divMy";
              doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
            }
          }
        }
    }
};
</script>
<style lang='less' scoped>
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
