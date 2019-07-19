<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="roseData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'
/**
 * roseData: {
        chartId: '',
        titleText: '',
        legendData: [],
        seriesData: []
    }
 */

export default {
    mixins: [echart],
    props: {
        roseData: {
            type: Object,
            required: true
        }
    },
    watch: {
        roseData: {
            handler (newValue, oldValue) {
                this.roseChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.roseChart()
        })
    },
    methods: {
        roseChart () {
            let {chartId, titleText, legendData, seriesData} = this.roseData
            let myChart = this.echartInit(chartId)
            let colorArr = ['#F15351', '#E99B53', '#E9CF57', '#53D0EA', '#51A9E3', '#547AE8', '#5E52E9', '#AD53E6', '#EA52E1']
            let seriesArr = [...seriesData]
            seriesData.forEach(item => {
                seriesArr.push({
                    value: 0,
                    name: '',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                })
            })
            let option = {
                color: colorArr,
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}:{c}%'
                },
                title: {
                    text: titleText,
                    textStyle: {
                        color: '#1D83DD',
                        fontWeight: 500,
                        fontSize: 20
                    },
                    padding: 15
                },
                legend: {
                    orient: 'vertical',
                    icon: 'circle',
                    right: '10%',
                    y: '3%',
                    data: legendData
                },
                series: [{
                    type: 'pie',
                    radius: [37, 155],
                    avoidLabelOverlap: false,
                    startAngle: 0,
                    center: ['38%', '28%'],
                    roseType: 'area',
                    selectedMode: 'single',
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: seriesArr
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
