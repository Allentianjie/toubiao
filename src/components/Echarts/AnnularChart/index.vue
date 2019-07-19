<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="annularData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'
/** 圈图传递参数
 * annularData: {
 *  titleText: ''
 *  chartId: 'chartId'
 *  legendData: ['博士学位', '硕士学位', '本科', '其他']
 *  seriesData: [{showVal: 40, hideVal: 30}]
 *  describe: {
 *      num: 10,
 *      unit: ‘人’,
 *      word: '专任教师'
 *  }
 * }
 */

export default {
    mixins: [echart],
    props: {
        annularData: {
            type: Object,
            required: true
        }
    },
    watch: {
        annularData: {
            handler (newValue, oldValue) {
                this.annularChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.annularChart()
        })
    },
    methods: {
        annularChart () {
            let {chartId, titleText, legendData, seriesData, describe} = this.annularData
            let colorArr = ['#F1A630', '#95B7FA', '#E17CF0', '#F3ADAD']
            let myChart = this.echartInit(chartId)
            let circleSize = 50
            let dataStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
            let placeHolderStyle = {
                normal: {
                    color: '#E2E2E2',
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5
                },
                emphasis: {
                    color: '#E2E2E2'
                }
            }
            let seriesArr = []
            seriesData.forEach((item, index) => {
                seriesArr.push({
                    name: legendData[index],
                    type: 'pie',
                    clockWise: false,
                    // radius: [circleSize + index * 20, (circleSize + index * 20 + 5)],
                    radius: [circleSize + index * 10, (circleSize + index * 10 +5)],
                    center: ['50%', '47%'],
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    data: [
                        {
                            value: item.showVal,
                            name: legendData[index]
                        },
                        {
                            value: item.hideVal,
                            name: '',
                            tooltip: {
                                show: false
                            },
                            itemStyle: placeHolderStyle
                        }
                    ]
                })
            })
            seriesArr.push({
                name: '文字描述',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                radius: [circleSize, circleSize],
                // center: ['50%', '47%'],
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [
                    {
                        label: {
                            normal: {
                                formatter: (params) => {
                                    return '{value|' + describe.value + '}{unit|' + describe.unit + '}'
                                },
                                textStyle: {
                                    color: '#F1A630',
                                    fontSize: 26
                                },
                                rich: {
                                    value: {
                                        color: '#F1A630',
                                        fontSize: 28,
                                        fontWeight: 'bold'
                                    },
                                    unit: {
                                        color: '#F1A630',
                                        fontSize: 14,
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }
                        }
                    },
                    {
                        label: {
                            normal: {
                                formatter: '\n' + describe.word,
                                textStyle: {
                                    color: '#4C4C4C',
                                    fontSize: 16
                                }
                            }
                        }
                    }
                ]
            })
            let option = {
                title: {
                    text: titleText,
                    textStyle: {
                        color: '#1D83DD',
                        fontWeight: 500,
                        fontSize: 16
                    },
                    padding: 15
                },
                color: colorArr,
                tooltip: {
                    trigger: 'item',
                    show: true,
                    formatter: '{b}<br/>{d}%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: [10, 15],
                    extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4)'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '10',
                    data: legendData,
                    width:'400',
                },
                series: seriesArr
            }
            myChart.setOption(option, true)
            this.$nextTick(() => {
                window.addEventListener('resize', () => { myChart.resize() })
            })
        }
    }
}
</script>
