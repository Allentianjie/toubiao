<template>
  <div style="width:100%;height:80%" id="piepetal"  :class="nodata">
    <div class="pieChart" style="width:100%;height:100%" :id="pieChartData.id"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";
  export default {
    props: ["pieChartData"],
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
      pieChartData: {
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
        let {
          id,
          legendData,
          seriesData,
          total
        } = this.pieChartData;
        let doc = document.querySelector("#piepetal");
          if (seriesData[0].value > 0 || seriesData[1].value > 0 ||seriesData[2].value > 0 ) {
            this.nodata = "";
            doc.getElementsByTagName("div")[0].setAttribute("id", id);
            let myChart = this.echartInit(id);
            myChart.setOption(
              {
                title: {
                  text: '任务总数：' + total,
                  grid: {
                    right: '20',
                  },
                  right: '20',
                  textStyle: {
                    color: '#7E94F3',
                    fontSize: '14',
                  },
                },
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  orient: 'vertical',
                  x: "left",
                  bottom: '20',
                  left: '10',
                  data: legendData
                },
                color: ['#36A9FE', '#16D970', '#EDD638'],
                calculable: true,
                series: [
                  {
                    name: '面积模式',
                    type: 'pie',
                    radius: [30, 110],
                    roseType: 'area',
                    data: seriesData
                  }
                ]
              },
              true
            )
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
