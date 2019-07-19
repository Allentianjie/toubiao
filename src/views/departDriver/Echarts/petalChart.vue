<template>
  <div id="cakeChartData" style="width:100%;height:100%" :class="nodata">
    <div style="width:100%;height:100%;" :id="petalCharData.id">
      <!--<img src="../../assets/images/wushuju.png" alt="" >-->
    </div>
  </div>
</template>

<script>

  import echart from "@/mixins/echart";
  export default {
    props: ["petalCharData"],
    data() {
      return {
        nodata: "loadingBox"
      };
    },
    mixins: [echart],
    mounted () {
      // this.$nextTick(() => {
      //   this.pieChart();
      // });

    },
    watch: {
      petalCharData: {
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
        let {id,seriesData,legendData} = this.petalCharData;
        let doc = document.querySelector("#cakeChartData");
        let that = this;
        if(seriesData.length > 0){
          let data =JSON.parse(JSON.stringify(seriesData))
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              // taitle
               title: {
                 text: '年龄分布',
                 left: 'center',
                 top: 20,
                 textStyle: {
                   color: '#333'
                 }
               },
              legend:{
                orient:'horizontal',
                x:'center',
                bottom: '15',
                padding: 2,
                // left:'30%',
//                width:'200',
                textStyle:{
                  color:'#000000',
                  fontSize:'12',
                },
                data: legendData,
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                },
                right: '2%'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              color: ['#31fed5','#90d1ff','#56ddff','#ffac62','#ffd781',],

              // visualMap: {
              //     show: false,
              //     min: 80,
              //     max: 600,
              //     inRange: {
              //         colorLightness: [0, 1]
              //     }
              // },
              series : [
                {
                  name:'',
                  type:'pie',
                  radius : [40, 110],
                  center: ['50%', '48%'],
                  data: data
                    .sort(function (a, b) {
                      // console.log(777,a,b)
                      return a.count - b.count;
                    }),
                  roseType: 'area',
                  label: {
                    normal: {
                      show: true,
                      // position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: true
                    }
                  },
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                    return Math.random() * 200;
                  }
                }
              ]
            },
            true
          )
          myChart.on('click', function (params) {
             // console.log('点击柱状图',params)
            let obj = {
              type: params.dataIndex,
              urlFlag: "age",
              teacher: that.$route.query.teacher
            }
            that.$router.push({path: "/fourTable", query: {obj: obj}});
          })
          this.$nextTick(() => {
            window.addEventListener("resize", () => {
              myChart.resize();
            });
          })
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
    background-image: url("../../../assets/images/wushuju.png");
    background-repeat:no-repeat;
    background-position: center;
    background-size: auto 80%
  }
  .loadingBox {
    background-image: url("../../../assets/images/timg1.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
