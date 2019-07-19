<template>
  <div id="petalChar" style="width:100%;height:100%" :class="nodata">
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
        let doc = document.querySelector("#petalChar");
        if(seriesData.length > 0){
          let data =JSON.parse(JSON.stringify(seriesData))
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          myChart.setOption(
            {
              // taitle
              // title: {
              //   text: 'Customized Pie',
              //   left: 'center',
              //   top: 20,
              //   textStyle: {
              //     color: '#ccc'
              //   }
              // },
              legend:{
                orient:'horizontal',
                x:'center',
                bottom: '15',
                padding: 2,
                // left:'30%',
                width:'200',
                textStyle:{
                  color:'#000000',
                  fontSize:'12',
                },
                // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                data: legendData,

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
                  radius : '65%',
                  center: ['50%', '35%'],
                  data: data
                    .sort(function (a, b) {
                      // console.log(777,a,b)
                      return a.value - b.value;
                    }),
                  roseType: 'radius',
                  // label: {
                    // show:false,
                    // normal: {
                    //     textStyle: {
                    //         color: 'red'
                    //     }
                    // }
                  // },

                  // labelLine: {
                  //   show:false,
                    // normal: {
                    //     lineStyle: {
                    //         color: 'red'
                    //     },
                    //     smooth: 0.2,
                    //     length: 10,
                    //     length2: 20
                    // }
                  // },
                  label: {
                    normal: {
                      show: false,
                      // position: 'center'
                    },
                    emphasis: {
                      show: false,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },

                  // itemStyle: {
                  //     //  show:false,
                  //     normal: {
                  //         //   color: ['#ffd781','#ffac62','#56ddff','#90d1ff','#31fed5',],
                  //         color: ['#ffd781',],
                  //     }
                  // },

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
