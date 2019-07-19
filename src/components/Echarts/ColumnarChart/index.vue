<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="columnarData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
/** 上下分布柱状图
 * columnarData: {
        chartId: 'assetsNumId',
        titleText: '资产数量/价值增减趋势',
        xAxisData: ['教学', '科研', '行政', '生产', '生活与后勤', '技术开发', '社会服务', '其他'],
        seriesData: [0.1, 0.2, -0.4, 0.7, 0.4, 0.1, 0.2, -0.7]
 * }
 */
import echart from '@/components/mixins/echart'

export default {
    mixins: [echart],
    props: {
        columnarData: {
            type: Object,
            required: true
        }
    },
    watch: {
        columnarData: {
            handler (newValue, oldValue) {
                this.columnarChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.columnarChart()
        })
    },
    methods: {
        columnarChart () {
            let {chartId, titleText, xAxisData, seriesData} = this.columnarData
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
                grid: {
                    left: 50
                },
                xAxis: [{
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 35,
                        show: true,
                        splitNumber: 15,
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    data: xAxisData
                }],
                yAxis: [{
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    }
                }],
                series: [{
                    type: 'bar',
                    barMaxWidth: 20,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            color: '#00B7EE'
                        }
                    },
                    data: seriesData
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
