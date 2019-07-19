<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="lineData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'
/**
 * lineData: {
        chartId: '',
        titleText: '',
        xAxisData: [],
        seriesData: []
    }
 */

export default {
    mixins: [echart],
    props: {
        lineData: {
            type: Object,
            required: true
        }
    },
    watch: {
        lineData: {
            handler (newValue, oldValue) {
                this.lineChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.lineChart()
        })
    },
    methods: {
        lineChart () {
            let {chartId, titleText, xAxisData, seriesData} = this.lineData
            let myChart = this.echartInit(chartId)
            let colorArr = ['#0BBDFF', '#7F48E4']
            let seriesArr = []
            seriesData.forEach((item, index) => {
                seriesArr.push({
                    name: item.name,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: colorArr[index]
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: colorArr[index]
                                }, {
                                    offset: 1, color: colorArr[index + 1]
                                }],
                                global: false
                            },
                            width: 4,
                            shadowBlur: 20,
                            shadowOffsetY: 15,
                            shadowOffsetX: 0
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: [10, -35],
                            formatter: function (parms) {
                                return '{num|' + parms.value + item.unit + '}'
                            },
                            rich: {
                                num: {
                                    fontSize: 14,
                                    align: 'center',
                                    padding: [5, 10],
                                    backgroundColor: '#3493F5',
                                    color: '#fff',
                                    borderRadius: 5
                                }
                            }
                        }
                    },
                    data: item.data
                })
            })
            let option = {
                color: colorArr,
                title: {
                    text: titleText,
                    textStyle: {
                        color: '#1D83DD',
                        fontWeight: 500,
                        fontSize: 20
                    },
                    padding: 15
                },
                tooltip: {
                    trigger: 'axis',
                    showContent: false,
                    axisPointer: {
                        type: 'none'
                    }
                },
                grid: {
                    top: '23%',
                    bottom: '6%',
                    left: '5%',
                    right: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#525252'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#525252'
                    },
                    data: xAxisData
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function (val) {
                            return val + ''
                        }
                    }
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
