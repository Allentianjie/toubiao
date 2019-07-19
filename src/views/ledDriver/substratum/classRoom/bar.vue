<!--
author: tianj
time: 2019年5月24日10:19:12
remark: 学校概况 -- （教室）下钻
-->
<template>
  <div id="bar-e" class="bar" :class="nodata">
    <div :id="barData.id"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";

  export default {
    name: "",
    props: ["barData"],
    mixins: [echart],
    data() {
      return {
        nodata: "loadingBox"
      }
    },
    watch: {
      "barData": {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.pieChart();
          });
        },
        deep: true
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      pieChart() {
        this.nodata = "";
        let doc = document.querySelector("#bar-e");
        let {
          obj,
          id,
          index,
          xAxis,
          seriesData
        } = this.barData;
        if (seriesData) {
          this.$nextTick(() => {
            doc.getElementsByTagName("div")[0].setAttribute("id", id);
            let myChart = this.echartInit(id);
            myChart.setOption(
              {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  },
                  formatter: function (params) {
                    var tar = params[0];
                    return tar.name + '<br/>' + '教室数量' + ' : ' + tar.value + ' 个';
                  }
                },
                toolbox: {
                  feature: {
                    saveAsImage: {}
                  },
                  right: '2%'
                },
                calculable: true,
                xAxis: [
                  {
                    type: "category",
                    data: xAxis,
                    axisLine: {
                      lineStyle: {
                        color: "#555"
                      }
                    },
                    axisTick: {
                      lineStyle: {
                        color: "#555"
                      }
                    },
                    splitLine: {
                      lineStyle: {
                        color: "#555"
                      }
                    },
                    axisLabel: {
                      textStyle: {
                        color: "#333"
                      },
                      rotate: 35
                    }
                  }
                ],
                yAxis: [
                  {
                    type: "value",
                    axisLine: {
                      lineStyle: {
                        color: "#555"
                      }
                    },
                    axisTick: {
                      lineStyle: {
                        color: "#555"
                      }
                    },
                    splitLine: {
                      lineStyle: {
                        color: "#ccc"
                      }
                    },
                    axisLabel: {
                      textStyle: {
                        color: "#333"
                      }
                    }
                  }
                ],
                series: [
                  {
                    type: "bar",
                    barWidth: 40,
                    data: seriesData
                  }
                ],
                color: ["#4bcd9d"],
                grid: {x: 50, y: 10, x2: 10, y2: 80}
              },
              true
            );
            myChart.on('click', (params) => {
              if (index == 1) { //楼层跳楼层明细
                let arr = {
                  name: params.name,
                  correId: obj[params.dataIndex].correId
                };

                this.$router.push({path: '/classType', query: {obj: JSON.stringify(arr) }});
              } else if (index == "2") {  //楼层跳楼层明细
                let arr = {};
                for (let i = 0; i < obj.length; i++) {
                  if (params.name == obj[i].field3) {
                    arr = {
                      titleName: params.name,
                      dataId: obj[i].field3,
                      correId: obj[i].correId
                    };
                  }
                }
                let objToStr = JSON.stringify(arr);
                this.$router.push({path: '/roomType', query: {obj: objToStr}});
              } else if (index == "3") {//专业钻班级
                let arr = {};
                for (let i = 0; i < obj.length; i++) {
                  if (params.name == obj[i].field5) {
                    arr = {
                      titleName: params.name,
                      correId: obj[i].correId,
                      correName: obj[i].correName,
                      field3:obj[i].field3,
                      field4: obj[i].field4,
                    };
                  }
                }
                let objToStr = JSON.stringify(arr);
                this.$router.push({path: '/listDeails', query: {obj: objToStr}});
              }

              // if (index == 1) {//楼层跳楼层明细
              //   let arr = {};
              //   for (let i = 0; i < obj.length; i++) {
              //     if (params.name == obj[i].field3) {
              //       arr = {
              //         titleName: params.name,
              //         dataId: obj[i].field3,
              //         correId: obj[i].correId
              //       };
              //     }
              //   }
              //   let objToStr = JSON.stringify(arr);
              //   this.$router.push({path: '/roomType', query: {obj: objToStr}});
              // } else if (index == 2) {//专业钻班级
              //   let arr = {};
              //   for (let i = 0; i < obj.length; i++) {
              //     if (params.name == obj[i].field4) {
              //       arr = {
              //         titleName: params.name,
              //         correId: obj[i].correId,
              //         correName: obj[i].correName,
              //         field3:obj[i].field3,
              //         field4: obj[i].field4,
              //       };
              //     }
              //   }
              //   let objToStr = JSON.stringify(arr);
              //   this.$router.push({path: '/listDeails', query: {obj: objToStr}});
              // }
              // else if (index == 3) {//班级钻列表
              //   let deptCode = "";
              //   for (let i = 0; i < obj.length; i++) {
              //     if (params.name == obj[i].deptName) {
              //       // console.log(obj[i].deptCode);
              //       deptCode= obj[i].deptCode;
              //     }
              //   }
              //   this.$router.push({path: '/listDeails', query: {deptCode: deptCode}});
              // }
            });
            this.$nextTick(() => {
              window.addEventListener("resize", () => {
                myChart.resize();
              });
            });
          });
        } else {
          this.nodata = "divMy";
        }
      }

    }
  }
</script>

<style lang='less' scoped>
  #app > div {
    div.bar {
      width: 100%;
      height: 100%;

      div {
        width: 100%;
        height: 100%;
      }
    }

    .divMy {
      background-image: url("../../../../assets/images/wushuju.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 80%;
    }

    .loadingBox {
      background-image: url("../../../../assets/images/timg1.gif");
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 80%;
    }
  }
</style>
