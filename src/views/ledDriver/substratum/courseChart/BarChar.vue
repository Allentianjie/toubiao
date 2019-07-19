<template>
  <div id="strdentBarChar" style="width:100%;height:100%" :class="nodata">
    <!--<div class="pieChart" style="width:100%;height: 100%;" :id="barChartData.id"></div>-->
  </div>
</template>

<script>
  import echart from "@/mixins/echart";
  export default {
    name: "barCharTwo",
    props: ["barChartData"],
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
      barChartData: {
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
        let {id, backData, seriesData,} = this.barChartData;
        let doc = document.querySelector("#strdentBarChar");
        doc.innerHTML = `<div style="width: 100%;height:100%;"></div>`
        if(seriesData.yData.length>0){
          for(let i = 0; i<seriesData.yData.length; i++){
            if(seriesData.yData[i] > 0){
              this.nodata = "";
              doc.getElementsByTagName("div")[0].setAttribute("id", id);
              let myChart = this.echartInit(id);
              myChart.setOption(
                {

                  color: ["#4BCD9D"],
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                      var tar = params[0];
                      if(seriesData.symbol === '出勤率'){
                        return tar.name + '<br/>' + '平均出勤率' + ' : ' + tar.value + '%';
                      }else if(seriesData.symbol === '活跃度'){
                        return tar.name + '<br/>' + '课堂活跃度' + ' : ' + tar.value + '%';
                      }else if(seriesData.symbol === '完成率'){
                        return tar.name + '<br/>' + '作业完成率' + ' : ' + tar.value + '%';
                      } else {
                        return tar.name + '<br/>' + '课程数量' + ' : ' + tar.value + '门';
                      }
                    }
                  },
                  grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '4%',
                    top: '5%',
                    containLabel: true
                  },
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    },
                    right: '2%'
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: seriesData.xData,
                      axisLabel: {
                        rotate: '35',
                        fontSize: 12,
                        boundaryGap: 0,
                      },
                      axisTick: {
                        alignWithLabel: true
                      }
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value'
                    }
                  ],
                  series: [
                    {
                      symbol: "circle", //标记的图形为实心圆
                      symbolSize: 7,
                      name: '数量',
                      type: 'bar',
                      barWidth: '25%',
                      data: seriesData.yData,
                      itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                          type: 'bar',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 0, color: '#438DF6' // 0% 处的颜色
                          }, {
                            offset: 1, color: '#5EC3FF' // 100% 处的颜色
                          }],
                          global: false // 缺省为 false
                        },
                      },
                    }
                  ]
                },
                true
              );
              myChart.on('click', function (params) {
                // 优先判断 数据是否有 obj 属性，如果有
                // 在判断是否 有下钻数据，isTeach    0：下钻明细； 1：下钻数据
                if ( backData ) {
                  if ( backData[params.dataIndex].isTeach === 0 ) {
                    let obj = {
                      id: backData[params.dataIndex].seriseId,
                      symbol: ""
                    }
                    that.$router.push({path: '/courseDetailTable', query: {obj: JSON.stringify(obj)}})
                    return;
                  }
                }

                seriesData.xData.map((item,index)=>{
                  if(item === params.name) {
                    let seriseId = seriesData.id[index]
                    if (seriesData.type === 'three') {
                      let obj = {
                        name: params.name,
                        val: params.value,
                        nuit: seriesData.symbol ? '': '门',
                        id: seriseId,
                        symbol: seriesData.symbol
                      }
                      that.$router.push({path: '/courseThreeChart', query: {obj: JSON.stringify(obj)}})

                    } else if (seriesData.type === 'four') {
                      let obj = {
                        name: params.name,
                        id: seriseId,
                        nuit: seriesData.symbol ? '': '门',
                        val: params.value,
                        symbol: seriesData.symbol
                      }
                      that.$router.push({path: '/courseFourChart', query: {obj: JSON.stringify(obj)}})

                    } else if (seriesData.type === 'table') {
                      let obj = {
                        id: seriseId,
                        symbol: seriesData.symbol
                      }
                      that.$router.push({path: '/courseFiveTable', query: {obj: JSON.stringify(obj)}})

                    }
                  }
              })
         })
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
        }else {
          this.nodata = "divMy";
          doc.innerHTML = `<div style="width: 100%;height:100%"></div>`;
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .divMy {
    //    > div {
    background-image: url("../../../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
    //   }
  }
  .loadingBox {
    background-image: url("../../../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
