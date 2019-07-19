<template>
  <div id="dimensChar" style="width:100%;height:100%;" :class="nodata">
    <div style="width:100%;height:100%" :id="dimensionData.id"></div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";

  export default {
    props: ["dimensionData"],
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
      dimensionData: {
        handler (newValue, oldValue) {
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
        } = this.dimensionData;
        let doc = document.querySelector("#dimensChar");
        if (data.dims && data.dims.length > 0 && data.dims && data.scores.length > 0) {
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              // backgroundColor: "#2E3444",
              color: ['#3D91F7', '#efa941'],
              tooltip: {},
              legend: {
                show: true,
                icon: "circle",
                bottom: 30,
                center: 0,
                itemWidth: 14,
                itemHeight: 14,
                itemGap: 21,
                orient: "horizontal",
                data: ['a', 'b'],
                textStyle: {
                  fontSize: 14,
                  color: '#8C8C8C'
                },
              },
              radar: {
                // shape: 'circle',
                name: {
                  textStyle: {
                    color: '#000000',
                    borderRadius: 3,
                    padding: [3, 5]
                  }
                },
                indicator:  data.dims,
                splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                  show: true,
                  areaStyle: { // 分隔区域的样式设置。
                    color: ['#baccc0',"#bedecf","#cee4d8","#e9ece3","#bedecf",], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                  }

                },
                // axisLabel:{//展示刻度
                //     show: true
                // },
                axisLine: { //指向外圈文本的分隔线样式
                  lineStyle: {
                    color: '#64a1f2'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#64a1f2', // 分隔线颜色
                    width: 1, // 分隔线线宽
                  }
                }

              },

              series: [{
                name: '',
                type: 'radar',
                //areaStyle: {normal: {}},

                data: [
                  {
                    value: data.scores,
                    name: '诊改维度',
                    areaStyle: {
                      normal: {
                        color: '#efa941'
                      },
                    },
                  }
                ]
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
