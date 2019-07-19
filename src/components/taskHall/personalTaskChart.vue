<template>
    <div id="personalChar" style="width:100%;height:80%" :class="nodata">
        <div class="pieChart" style="width:100%;height:100%" :id="personaTaskData.id"></div>
    </div>
</template>

<script>
/** 使用饼图需要传递的参数
 */
import echart from "@/mixins/echart";
export default {
    props: ["personaTaskData"],
    mixins: [echart],
  data() {
    return {
      nodata: "loadingBox"
    };
  },
    mounted () {
        // this.$nextTick(() => {
        //     this.pieChart();
        // });
    },
    watch: {
        personaTaskData: {
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
                total
            } = this.personaTaskData;
          let doc = document.querySelector("#personalChar");
          if(seriesData[0].value || seriesData[1].value || seriesData[2].value ) {
            this.nodata = "";
            doc.getElementsByTagName("div")[0].setAttribute("id", id);
            let myChart = this.echartInit(id);
            myChart.setOption(
              {

                tooltip: {
                  trigger: "item",
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: colorData,
                legend: {
                  x: "center",
                  y: "bottom",
                  data: legendData
                },

                calculable: true,
                series: [
                  {
                    name: "规划统计",
                    type: "pie",
                    radius: [30, 80],
                    center: ["50%", "45%"],
                    roseType: "area",
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
