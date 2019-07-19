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
        let {id, seriesData,} = this.barChartData;
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
                      return tar.name + '<br/>' + '值' + ' : ' + tar.value;
                    }
                  },
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    },
                    right: '2%'
                  },
                  grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '4%',
                    top: '5%',
                    containLabel: true
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
                // console.log('点击柱状图-2-',seriesData)
                // 判断 -- isDrillDown属性是接口新增字段，用来判断是否可下钻
                // 1：不可下钻；0：可以下钻
                if (seriesData.isDrillDown && seriesData.isDrillDown === "1") return;

                seriesData.xData.map((item,index)=>{
                  if(item === params.name) {
                    let seriseId = seriesData.id[index]
                    if (seriesData.type === 'seriseId') {
                      let obj = {
                        name: params.name,
                        val: params.value,
                        id: seriseId,
                        source:seriesData.parms.source,
                        typeName:seriesData.parms.typeName
                      }
                      that.$router.push({path: '/stdentThreeChart', query: {obj: JSON.stringify(obj)}})
                    } else if (seriesData.type === 'majorId') {
                      let obj = {
                        name: params.name,
                        id: seriseId,
                        val: params.value,
                        source:seriesData.parms.source,
                        typeName:seriesData.parms.typeName,
                        seriseId:seriesData.parms.seriseId
                      }
                      that.$router.push({path: '/studentfourChart', query: {obj: JSON.stringify(obj)}})
                    } else if (seriesData.type === 'table') {
                      let obj = {
                        name: params.name,
                        val: params.value,
                        source: seriesData.parms.source,
                        typeName: seriesData.parms.typeName,
                        seriseId: seriesData.parms.seriseId,
                        majorId: seriesData.parms.majorId
                      }
                      that.$router.push({path: '/studentFiveTable', query: {obj: JSON.stringify(obj)}})
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
