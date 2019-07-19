<template>
  <div id="chartmuch"  :class="nodata" style="width:100%;height:100%">
    <div style="width:100%;height:100%" :id="LineData.pieChartId"></div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";
  export default {
    props: ["LineData"],
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    mixins: [echart],
    mounted() {
      // this.$nextTick(() => {
      //   this.pieChart();
      // });
    },
    watch: {
      LineData: {
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
        let {pieChartId,seriesData} = this.LineData;
        let doc = document.querySelector("#chartmuch");
        if(seriesData.tasksNum.length>0 || seriesData.tasksOverdue.length > 0 || seriesData.tasksPolice.length > 0 || seriesData.tasksAccomplish.length > 0){
          for(let i = 0; i<seriesData.xData.length; i++){
            if(seriesData.tasksNum[i] > 0 || seriesData.tasksOverdue[i] > 0 || seriesData.tasksPolice[i] > 0|| seriesData.tasksAccomplish[i] > 0) {
              this.nodata = "";
              doc.getElementsByTagName("div")[0].setAttribute("id", pieChartId);
              let myChart = this.echartInit(pieChartId);
              myChart.setOption(
                {
                  tooltip: {
                    trigger: 'axis',
                    // position: 'right',
                    // axisPointer: {
                    //   type: 'cross',
                    //   label: {
                    //     backgroundColor: '#6a7985'
                    //   }
                    // }
                  },
                  legend: {
                    top: '10',
                    selectedMode: true,
                    data:['任务数量', '任务逾期', '任务报警', '任务达标']
                  },
                  color: ['#3DA7FA', '#E5DB12', '#EA696A', '#38D048'],
                  grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    top: '19%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.LineData.seriesData.xData
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      name:'任务数量',
                      type:'line',
                      symbol: "circle", //标记的图形为实心圆
                      symbolSize: 10,
                      lineStyle: {
                        width: 1,
                      },
                      data:this.LineData.seriesData.tasksNum
                    },
                    {
                      name:'任务逾期',
                      type:'line',
                      symbol: "circle", //标记的图形为实心圆
                      symbolSize: 10,
                      lineStyle: {
                        width: 1,
                      },
                      data: this.LineData.seriesData.tasksOverdue
                    },
                    {
                      name:'任务报警',
                      type:'line',
                      symbol: "circle", //标记的图形为实心圆
                      lineStyle: {
                        width: 1,
                      },
                      symbolSize: 10,
                      data:this.LineData.seriesData.tasksPolice
                    },
                    {
                      name:'任务达标',
                      type:'line',
                      symbol: "circle", //标记的图形为实心圆
                      lineStyle: {
                        width: 1,
                      },
                      symbolSize: 10,
                      data:this.LineData.seriesData.tasksAccomplish
                    }
                  ]
                },
                true
              )
              this.$nextTick(() => {
                window.addEventListener("resize", () => {
                  myChart.resize();
                });
              })
              return
            }else {
              this.nodata = "divMy";
              doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
            }
          }
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
