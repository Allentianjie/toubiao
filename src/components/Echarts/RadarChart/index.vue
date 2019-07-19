<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="radarData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'
/** 雷达图
 * radarData: {
        chartId: '',
        titleText: '资产用途价值占比',
        indicatorData: [{text: '教学', max: 100}],
        seriesData: [65, 75, 60, 40, 30, 30, 33, 55]
    }
 */
export default {
    mixins: [echart],
    props: {
        radarData: {
            type: Object,
            required: true
        }
    },
    watch: {
        radarData: {
            handler (newValue, oldValue) {
                this.radarChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.radarChart()
        })
    },
    methods: {
        radarChart () {
            let {chartId, titleText, indicatorData, seriesData} = this.radarData
            let myChart = this.echartInit(chartId)
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
                radar: {
                    indicator: indicatorData,
                    radius: 100,
                    center: ['53%', '55%'],
                    splitNumber: 4,
                    name: {
                        textStyle: {
                            color: '#201E1F'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#A4D6F3',
                            width: 1
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#A4D6F3', 'transparent', 'transparent', 'transparent'],
                            width: 1
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#B3DBF5', '#FAFAFA']
                        }
                    }
                },
                series: [{
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    symbol: 'circle',
                    symbolSize: 3,
                    lineStyle: {
                        width: 1
                    },
                    itemStyle: {
                        normal: {
                            color: '#3D68E4',
                            borderColor: '#3D68E4'
                        }
                    },
                    data: [{
                        value: seriesData
                    }]
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
