<template>
  <div id="ganter" style="width:100%;height:100%" :class="nodata">
    <div class="pieChart" style="width:100%;height: 100%" :id="ganttChar.id"></div>
  </div>

</template>

<script>
  import echart from "@/mixins/echart";
  export default {
    props: ["ganttChar"],
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
      ganttChar: {
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
        // let colorData = require("../../../static/chartColor.json");
        let {id, legendData,seriesData,} = this.ganttChar;
        let doc = document.querySelector("#ganter");
        this.nodata = "";
        doc.getElementsByTagName("div")[0].setAttribute("id", id);
        let myChart = this.echartInit(id);
        let symbolSize = 20;
        myChart.setOption(
          {
            title: {
              text: '个人任务时序图',
              left: 10,
              top: 10
            },
            legend: {
              data: ['任务未完成', '任务已结束']
            },
            tooltip: {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              // formatter: function(params) {
              //   var arrKey = new Array();
              //   var arrVale = new Array();
              //   var res = params[0].name + "</br>"
              //   for (var i = 0; i < params.length; i++) {
              //     if (i == 0) continue;
              //     var date0 = params[i - 1].data;
              //     var date1 = params[i].data;
              //     var name = params[i].seriesName;
              //     if (arrKey.length <= 0) {
              //       arrKey.push(name);
              //       var html = name + ":</br>" + date0 + "~" + date1 + "</br>";
              //       arrVale[0] = html;
              //     }
              //     var add = true;
              //     for (var j = 0; j < arrKey.length; j++) {
              //       if (name.indexOf(arrKey[j]) >= 0) {
              //         add = false;
              //         break;
              //       }
              //     }
              //     if (add) {
              //       var index = arrKey.push(name);
              //       var html = name + ":</br>" + date0 + "~" + date1 + "</br>";
              //       arrVale[index - 1] = html;
              //     }
              //     for (var j = 0; j < arrKey.length; j++) {
              //       if (name != arrKey[j] && name.indexOf(arrKey[j]) >= 0) {
              //         var html = "    " + date0 + "~" + date1 + "</br>";
              //         arrVale[j] += html;
              //         break;
              //       }
              //     }
              //   }
              //   for (var k = 0; k < arrVale.length; k++) {
              //     res += arrVale[k];
              //   }
              //   return res;
              //
              // }

              formatter: function (params) {
                let tar;
                if (params[1].value !== '-'){
                  tar = params[1];
                  tar['title'] = '任务未完成'
                }
                else {
                  tar = params[2];
                  tar['title'] = '任务已完成'
                }
                return tar.title+ '<br/>' +
                  params[0].seriesName + ' : ' + params[0].value + '<br/>' +
                  tar.seriesName + ' : ' + tar.value
              }
            },
            // color: ['#36A9FE','#16D970'],
            grid: {
              containLabel: true,
              left: 20,
              top:50,
              right:20,
              bottom:50
            },
            xAxis: {
              type: 'time'
            },
            yAxis: [{
              type : 'category',
              data: legendData
            }],

            series: [
              {
                name: '任务开始时间',
                type: 'bar',
                stack: 'test',
                // itemStyle: {
                //   normal: {
                //     color: 'transparent'
                //   }
                // },
                itemStyle: {
                  normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  }
                },
                data: seriesData.begin
                // data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
              },
              {
                name: '任务预计结束时间',
                type: 'bar',
                stack: 'test',
                itemStyle: {
                  normal: {
                    // barBorderColor: '#284BFF',
                    color: 'rgba(54,169,254,0.8)'
                  },
                  emphasis: {
                    // barBorderColor: '#36CEFF',
                    color: 'rgba(237,214,56,0.8)'
                  }
                },
                // barWidth: 20,
                data: seriesData.finish
                // data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
              },
              {
                name: '任务完成时间',
                type: 'bar',
                stack: 'test',
                // color: ['#36CEFF'],
                itemStyle: {
                  normal: {
                    // barBorderColor: '#284BFF',
                    color: 'rgb(22,217,112)'
                  },
                  emphasis: {
                    // barBorderColor: '#36CEFF',
                    color: 'rgb(237,214,56)'
                  }
                },
                // barWidth: 20,
                data: seriesData.complete
                // data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
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

      }
    }
  }
</script>

<style scoped>
  .loadingBox {
    background-image: url("../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
