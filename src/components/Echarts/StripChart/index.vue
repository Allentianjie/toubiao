<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="stripData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
/**
 * 条图参数
 * majorData: {
    chartId: 'majorId',
    titleText: '特色专业',
    yAxisData: [],
    seriesData: [],
    unit: '个'
}
 */
import echart from '@/components/mixins/echart'
export default {
    mixins: [echart],
    props: {
        stripData: {
            type: Object,
            required: true
        }
    },
    watch: {
        stripData: {
            handler (newValue, oldValue) {
                this.stripChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.stripChart()
        })
    },
    methods: {
        stripChart () {
            let {chartId, titleText, yAxisData, seriesData, unit} = this.stripData
            let myChart = this.echartInit(chartId)
            let datas = seriesData
            let max = Math.max.apply(null, datas) / 0.85
            let filStrip = []
            seriesData.forEach((val) => {
                filStrip.push(max)
            })

            let maxVal = seriesData.reduce((num1, num2) => {
                return num1 > num2 ? num1 : num2
            })

            let option = {
                title: {
                    text: titleText,
                    textStyle: {
                        color: '#1D83DD',
                        fontWeight: 500,
                        fontSize: 20
                    },
                    padding: 15
                },
                grid: {
                    left: 18,
                    top: 55,
                    bottom: 10
                },
                xAxis: {
                    type: 'value',
                    max: max,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: [{
                    type: 'category',
                    data: yAxisData,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        margin: 0,
                        align: 'left',
                        verticalAlign: 'bottom',
                        padding: [0, 0, 10, 0]
                    }
                },
                {
                    data: datas,
                    axisLabel: {
                        show: true,
                        margin: 0,
                        verticalAlign: 'bottom',
                        padding: [0, 0, 10, 0],
                        textStyle: {
                            fontSize: 12,
                            color: '#0061B7',
                            align: 'right'
                        },
                        formatter: (parms) => {
                            if (maxVal == parms) {
                                return '{orange|' + parms + unit + '}'
                            } else {
                                return parms + unit
                            }
                        },
                        rich: {
                            orange: {
                                color: '#C48416'
                            }
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                    type: 'bar',
                    data: datas,
                    barWidth: 5,
                    z: 30,
                    itemStyle: {
                        normal: {
                            color: {
                                colorStops: [{
                                    offset: 0,
                                    color: '#4AA3F2'
                                }, {
                                    offset: 1,
                                    color: '#BED2FE'
                                }]
                            }
                        }
                    }
                }, {
                    type: 'bar',
                    data: filStrip,
                    barWidth: 5,
                    barGap: '-100%',
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#EBEBEB'
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#EBEBEB'
                        }
                    }
                }]
            }
            myChart.setOption(option, true)
            this.$nextTick(() => {
                window.addEventListener('resize', () => { myChart.resize() })
            })
        }
    }
}
</script>
