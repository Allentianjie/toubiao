<template>
  <div id="lineTwoChar" style="width:100%;height:100%" :class="nodata">
    <!--<div class="pieChart" style="width:100%;height: 100%;" :id="lineChartData.id"></div>-->
  </div>
</template>

<script>
import echart from "@/mixins/echart";
export default {
  name: "lineChar",
  props: ["lineChartData"],
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
    lineChartData: {
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
      let {id, seriesData,} = this.lineChartData;
      let doc = document.querySelector("#lineTwoChar");
      doc.innerHTML = `<div style="width: 100%;height:100%;"></div>`
      for(let i = 0; i<seriesData.yData.length; i++){
        if(seriesData.yData[i] > 0){
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              tooltip : {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                },
                right: '2%'
              },
              color: ["#40A0F9"],
              grid: {
                left: '4%',
                right: '4%',
                bottom: '4%',
                top: '5%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: seriesData.xData
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: seriesData.yData,
                type: 'line',
                smooth: true,
                itemStyle:{
                  normal:{
                    color: "#40A0F9",
                    borderWidth: 2,
                  }
                }
              }]
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
}
</script>

<style lang="less" scoped>
  .divMy {
    //    > div {
    background-image: url("../../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
    //   }
  }
  .loadingBox {
    background-image: url("../../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
