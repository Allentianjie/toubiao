<template>
  <div class="fixedRingBox echart-dom">
    <p class="titleText">{{fixedRingData.title}}</p>
    <div class="fixedRing">
      <div class="echart-dom" :id="fixedRingData.chartId"></div>
    </div>
    <ul class="describe">
      <li v-for="(item, index) in fixedRingData.equipment" :key="index">
        <span>{{item.value}}</span>
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  /* eslint-disable */
  import echart from '@/components/mixins/echart'

  /** 固定未封口圈图
   * fixedRingData: {
   *      chartId: 'equipmentId',
        title: '教学科研仪器设备',
        describe: {
            num: '25388.28',
            unit: '万元',
            word: '教学科研仪器设备\n资产总值'
        },
        equipment: [
            {
                value: '17524台(套)',
                name: '本科教学实验仪器'
            },
            {
                value: '426台(套)',
                name: '10万元以上的实验仪器'
            }
        ]
   *  }
   */
  export default {
    mixins: [echart],
    props: {
      fixedRingData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    watch: {
      fixedRingData: {
        handler(newValue, oldValue) {
          this.fixedRingChart()
        },
        deep: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.fixedRingChart()
      })
    },
    methods: {
      fixedRingChart() {
        let {chartId, describe} = this.fixedRingData
        let myChart = this.echartInit(chartId)

        let option = {
          series: [{
            name: '图',
            type: 'pie',
            radius: [90, 100],
            startAngle: 225,
            color: [new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#8D8DF1'
            }, {
              offset: 1,
              color: '#D7D7FA'
            }]), 'transparent'],
            hoverAnimation: false,
            legendHoverLink: false,
            z: 10,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 76
            }, {
              value: 24
            }]
          },
            {
              name: '文字描述',
              type: 'pie',
              clockWise: false,
              hoverAnimation: false,
              radius: [90, 100],
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                label: {
                  normal: {
                    formatter: (params) => {
                      return '{num|' + describe.num + '}\n{unit|' + describe.unit + '}'
                    },
                    textStyle: {
                      color: '#F1A630'
                    },
                    rich: {
                      num: {
                        color: '#F1A630',
                        fontSize: 20,
                        fontWeight: 'bold',
                        padding: [0, 0, 20, 0]
                      },
                      unit: {
                        color: '#F1A630',
                        fontSize: 20,
                        verticalAlign: 'bottom'
                      }
                    }
                  }
                }
              },
                {
                  label: {
                    normal: {
                      formatter: describe.word,
                      textStyle: {
                        color: '#4C4C4C',
                        fontSize: 14,
                        padding: [100, 0, 0, 0]
                      }
                    }
                  }
                }]
            }]
        }
        myChart.setOption(option, true)
        this.$nextTick(() => {
          window.addEventListener('resize', () => {
            myChart.resize()
          })
        })
      }
    }
  }
</script>

<style lang="less">
  .fixedRingBox {
    > .titleText {
      height: 20px;
      text-align: left;
      padding: 10px 0 40px 15px;
      font-size: 20px;
      font-weight: 500;
      color: #1D83DD
    }

    .fixedRing {
      height: ~'calc(100% - 120px)';
      width: 100%;
    }

    .describe {
      height: 70px;
      width: 100%;
      list-style: none;
      display: flex;
      text-align: left;

      li {
        margin: 10px 0 10px 20px;
        height: 40px;
        width: calc(100% / 2);
        line-height: 20px;
        text-align: center;
        border-left: 1px solid rgba(201, 201, 201, 1);;

        > span {
          padding-left: 5px;
          color: #0061B7;
          font-size: 18px;
          font-weight: 500;
        }

        > p {
          padding-left: 5px;
          color: #333;
        }
      }
    }
  }

</style>
