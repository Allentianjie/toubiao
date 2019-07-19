<template>
  <div id="topTen" style="width:100%;height:100%" :class="nodata">
    <div style="width:100%;height:100%" :id="topTenData.id"></div>
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
    props: ["topTenData"],
    mixins: [echart],
    mounted() {
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
      topTenData: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.radarChart();
          });
        },
        deep: true
      }
    },
    methods: {
      radarChart() {
        // let colorData = require("../../../static/chartColor.json");
        // console.log(this.TaskMonitorData)
        let {
          id,
          data,
        } = this.topTenData;
        let doc = document.querySelector("#topTen");
        if (data.length > 0 ) {
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              color: ['#4bcd9d'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },

              },
              legend: {
                data: ['2016年']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                "axisLabel": {
                  "interval": 0,
                  formatter: '{value}',
                }
              },
              yAxis: {
                type: 'category',
                data: ['康体健身与休闲娱乐',
                  '酒店IT与安防设备',
                  '酒店建筑',
                  '酒店布草及纺织用品',
                  '酒店家具',
                  '酒店工程',
                  '酒店设计',
                  '葡萄酒与烈酒',
                  '客房易耗品及电器',
                  '桌面用品',
                  '酒店与清洁',
                ]
              },
              series: [{
                name: '2016年占比',
                type: 'bar',
                data: [2.00, 3.00, 5.00, 5.50, 6.50, 6.50, 7.50, 8.50, 8.50, 9.50, 10.0]
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
        } else {
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
    background-size: auto 80%
  }

  .loadingBox {
    background-image: url("../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
