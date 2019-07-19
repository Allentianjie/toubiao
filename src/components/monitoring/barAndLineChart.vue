<template>
  <div  style="width:100%;height:87%">
    <div style="width:100%;height:100%" :id="barLineData.pieChartId"></div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";
  export default {
    props: ["barLineData"],
    data() {
      return{
      }
    },
    mixins: [echart],
    mounted () {
      this.$nextTick(() => {
        this.pieChart();
      });
    },
    watch: {
      barLineData: {
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
        let {pieChartId,seriesData} = this.barLineData;
        let myChart = this.echartInit(pieChartId);
        myChart.setOption(
          {
            // backgroundColor: "#05224d",
            tooltip: {
              trigger: 'axis',
            },
            grid: {
              // top: '8%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true,
            },
            legend: {
              itemGap: 50,
              data: ['注册总量' ,'最新注册量'],
            },
            xAxis: [{
              type: 'category',
              boundaryGap: true,
              axisLine: { //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                  color: '#f0f0f0'
                },
              },
              axisLabel: { //坐标轴刻度标签的相关设置
                textStyle: {
                  color: '#B7D6DE',
                  margin: 15,
                },
              },
              axisTick: {
                // show: false,
              },
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', ],
            }],
            yAxis: [{
              type: 'value',
              min: 0,
              // max: 140,
              splitNumber: 7,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#f0f0f0'
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#f0f0f0'
                },
              },
              axisLabel: {
                margin: 20,
                textStyle: {
                  color: '#B7D6DE',

                },
              },
              // axisTick: {
              //   show: false,
              // },
            }],
            series: [
              {
              name: '注册总量',
              type: 'line',
              showAllSymbol: true,
              symbol: 'emptyCircle',
              symbolSize: 6,
              lineStyle: {
                normal: {
                  color: "#28ffb3", // 线条颜色
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                 color: '#B7D6DE',
                }
              },
              itemStyle: {
                normal: {
                  color: "#28ffb3",
                }
              },
              tooltip: {
                show: true
              },
              areaStyle: { //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#5BDBDC' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(255,255,255, 0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                  // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                  // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
              },
              data: [393, 438, 485, 631, 689, 824, 987]
            },
              {
              name: '最新注册量',
              type: 'bar',
              barWidth: 20,
              tooltip: {
                show: true
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#9a91de',
                }
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    let colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
                    return colorList[params.dataIndex];
                  }
                }
              },
              data: [200, 382, 102, 267, 186, 315, 316]
            }]
          },
          true
        )
        this.$nextTick(() => {
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        })
      }
    }
  };
</script>
