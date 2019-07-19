<template>
  <div id="mapUpChart" style="width:100%;height:100%" :class="nodata">
    <div class="pieChart" style="width:100%;height: 100%;" :id="MapEchartData.id"></div>
  </div>
</template>

<script>
  import echart from "@/mixins/echart";
  import 'echarts/map/js/china.js'
  export default {
    props: ["MapEchartData"],
    mixins: [echart],
    mounted() {
      // this.$nextTick(() => {
      //   this.barChart();
      // });
    },
    data() {
      return {
        nodata: "loadingBox",
        mapName:'china'
      };
    },
    watch: {
      MapEchartData: {
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
        let {id, seriesData,} = this.MapEchartData;
        // console.log(1,seriesData.xData)
        // console.log(2,seriesData.yData)
        let doc = document.querySelector("#mapUpChart");
        if(seriesData.xData.length > 0){
          this.nodata = "";
          doc.getElementsByTagName("div")[0].setAttribute("id", id);
          let myChart = this.echartInit(id);
          var geoCoordMap = {
            '黑龙江': [127.9688, 45.368],
            '内蒙古': [110.3467, 41.4899],
            "吉林": [125.8154, 44.2584],
            '北京市': [116.4551, 40.2539],
            "辽宁": [123.1238, 42.1216],
            "河北": [114.4995, 38.1006],
            "天津": [117.4219, 39.4189],
            "山西": [112.3352, 37.9413],
            "陕西": [109.1162, 34.2004],
            "甘肃": [103.5901, 36.3043],
            "宁夏": [106.3586, 38.1775],
            "青海": [101.4038, 36.8207],
            "新疆": [87.9236, 43.5883],
            "西藏": [91.11, 29.97],
            "四川": [103.9526, 30.7617],
            "重庆": [108.384366, 30.439702],
            "山东": [117.1582, 36.8701],
            "河南": [113.4668, 34.6234],
            "江苏": [118.8062, 31.9208],
            "安徽": [117.29, 32.0581],
            "湖北": [114.3896, 30.6628],
            "浙江": [119.5313, 29.8773],
            "福建": [119.4543, 25.9222],
            "江西": [116.0046, 28.6633],
            "湖南": [113.0823, 28.2568],
            "贵州": [106.6992, 26.7682],
            "云南": [102.9199, 25.4663],
            "广东": [113.12244, 23.009505],
            "广西": [108.479, 23.1152],
            "海南": [110.3893, 19.8516],
            '上海': [121.4648, 31.2891],
            "南宁": [108.297234, 22.806493],
            "香港": [114.186124, 22.293586],
            "澳门": [113.557519, 22.204118],
            "台湾": [120.961454, 23.80406],
          };
          var area =function(name, color) {
            var a = {
              name: name,
              selected: true,
              itemStyle: {
                emphasis: {
                  areaColor: color,
                  borderColor: '#f47920',
                  borderWidth: 1
                }
              }
            };
            return a;
          }
          var XAData = seriesData.xData
          var convertData = function(data) {
            var res = [];
            for(var i = 0; i < data.length; i++) {
              var dataItem = data[i];
              for (var key in geoCoordMap) {
                if (dataItem[0].name.indexOf(key) !== -1) {
                  var toCoord = geoCoordMap[key];
                  var fromCoord = [108.297234, 22.806493];
                  if (fromCoord && toCoord) {
                    res.push([{
                      coord: toCoord,
                      value: dataItem[0].value,
                      toName: dataItem[0].name,
                    }, {
                      coord: fromCoord,
                    }]);
                  }
                }
              }
            }
            return res;
          };
          var color = ['#ffa022']; //航线的颜色
          var series = [];
          [['南宁', XAData]].forEach(function(item, i) {
            series.push(
              {
                name: item[0],
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 1,
                effect: {
                  show: true,
                  period: 4, //箭头指向速度，值越小速度越快
                  trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: 'arrow', //箭头图标
                  symbolSize: 5, //图标大小
                },
                lineStyle: {
                  normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                  }
                },
                data: convertData(item[1])
              },
              {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                  brushType: 'stroke'
                },
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                  }
                },
                symbolSize: function(val) {
                  return 5; //圆环大小
                },
                itemStyle: {
                  normal: {
                    color: color[i],
                  },
                  emphasis: {
                    areaColor: '#2B91B7'
                  }
                },
                data: item[1].map(function(dataItem) {
                  for (var key in geoCoordMap) {
                    if(dataItem[0].name.indexOf(key) !== -1) {
                      // dataItem[0].name = key
                      return {
                        name: key,
                        value: geoCoordMap[key].concat([dataItem[0].value])
                      };
                    }
                  }
                }),
              },
              /*{
                type: 'map',
                mapType: 'china',
                top:'10%',
                zoom: 1.1,
                tooltip:{
                  show:false
                },
                itemStyle: {
                  normal: {
                    areaColor: '#6BCDDA',
                    borderColor: '#299EEB',
                  },
                  emphasis: {
                    areaColor: '#299EEB',
                    borderColor: '#FF8E30',
                  }
                },
              }*/
            );
          })
          myChart.setOption(
            {
              tooltip: {
                trigger: 'item',
                formatter: function(params, ticket, callback) {
                  if (params.seriesType == "effectScatter") {
                    return params.name + "-" + params.seriesName +'人数：'+ params.value[2] +'人';
                  } else if (params.seriesType == "lines") {
                    return  params.data.toName + "-" + params.seriesName +'人数：' + params.value+'人';
                  }
                }
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                },
                right: '2%'
              },
              legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                // data: ['西安 Top3', '西宁 Top3', '银川 Top3'],
                textStyle: {
                  color: '#fff'
                },
                selectedMode: 'multiple'
              },
              geo: {
                map: 'china',
                zoom: 1.1,
                label: {
                  emphasis: {
                    show: true,
                    color: '#fff'
                  }
                },
                roam: true,
                top: '10%',
                /* itemStyle: {
                   normal: {
                     shadowColor: 'rgba(0, 0, 0, 1)', // 阴影
                     shadowBlur: 10 // 阴影
                   },
                 },*/
                itemStyle: {
                  normal: {
                    areaColor: '#6BCDDA',
                    borderColor: '#299EEB',
                  },
                  emphasis: {
                    areaColor: '#299EEB'
                  }
                },
                // regions: [area('重庆', '#694d9f'),
                //   area('丽水', '#45224a'),
                //   area('南宁', '#45224a'),
                //   area('廊坊', '#45224a'),
                //   area('重庆', '#45224a'),
                //   area('北京', '#45224a'),
                // ]
              },
              series: series
            },
            true
          );
          myChart.on('click', function (params) {
            // console.log('点击地图',params,params.name)
            // 给后台传参数为name
            // seriesType."effectScatter"."lines"
            let objMap={
              source: '',
              name: '',
              val: null,
              typeName: ''
            }
            if(params.seriesType === 'effectScatter'){
              objMap = {
                source:params.name,
                name: params.name,
                val: params.value[2],
                typeName: '6'
              }
            }else {
              objMap = {
                source: params.data.toName,
                name: params.data.toName,
                val: params.data.value,
                typeName: '6',
              }
            }
            that.$router.push({path: '/studentTwoChart', query: {obj: JSON.stringify(objMap)}})
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
          // }
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
