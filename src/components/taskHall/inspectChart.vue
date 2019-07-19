<template>
    <div id="inspectChar" style="width:100%;height:80%" :class="nodata">
        <div style="width:100%;height:100%" :id="pieChartData.id"></div>
    </div>
</template>

<script>
/** 使用饼图需要传递的参数

 */
import echart from "@/mixins/echart";
export default {
    props: ["pieChartData"],
    mixins: [echart],
    mounted () {
        // this.$nextTick(() => {
        //     this.pieChart();
        // });
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
            // console.log(this.TaskMonitorData)
            let {
                id,
                legendData,
                seriesData,
                indicatorData,
            } = this.pieChartData;
          let doc = document.querySelector("#inspectChar");
            for(let i = 0;i<seriesData[0].value.length;i++){
              if(seriesData[0].value[i] > 0) {
                this.nodata = "";
                doc.getElementsByTagName("div")[0].setAttribute("id", id);
                let myChart = this.echartInit(id);
                myChart.setOption(
                  {
                    tooltip: {
                      trigger: 'axis'
                    },
                    radar: [
                      {
                        indicator: indicatorData,
                        center: ['50%', '45%'],
                        radius: 80
                      },

                    ],
                    series: [
                      {
                        type: 'radar',
                        tooltip: {
                          trigger: 'item'
                        },
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: seriesData
                      },

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
