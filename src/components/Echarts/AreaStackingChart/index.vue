<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="areaStackingData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'
/**
 * areaStackingData: {
        chartId: '',
        titleText: '',
        xAxisData: [],
        seriesData: []
    }
 */

export default {
    mixins: [echart],
    props: {
        areaStackingData: {
            type: Object,
            required: true
        }
    },
    watch: {
        areaStackingData: {
            handler (newValue, oldValue) {
                this.areaStackingChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.areaStackingChart()
        })
    },
    methods: {
        areaStackingChart () {
            let {chartId, titleText, xAxisData, seriesData} = this.areaStackingData
            let myChart = this.echartInit(chartId)
            let colorArr = ['#4FABE5', '#F5B175']
            let seriesArr = []
            seriesData.forEach((item, index) => {
                seriesArr.push({
                    name: item.name,
                    type: 'line',
                    stack: '总数',
                    smooth: true,
                    areaStyle: {
                        color: {
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: '#fff'
                            }, {
                                offset: 1, color: colorArr[index]
                            }]
                        },
                        opacity: 0.5
                    },
                    itemStyle: {
                        normal: {
                            color: colorArr[index]
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            formatter: function (parms) {
                                return '{num|' + parms.value + '}{unit|\n' + item.unit + '}'
                            },
                            rich: {
                                num: {
                                    fontSize: 20,
                                    align: 'center'
                                },
                                unit: {
                                    fontSize: 12,
                                    color: '#000',
                                    align: 'center'
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
                        type: 'shadow',
                        shadowStyle: {
                            opacity: '0.5'
                        }
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
                            return val + '万'
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
