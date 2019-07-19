<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="barZoomData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'
/** barZoomData: {
    chartId: '',
    titleText: '',
    legendData: [],
    xAxisData: [],
    seriesData: []
} */

export default {
    mixins: [echart],
    props: {
        barZoomData: {
            type: Object,
            required: true
        }
    },
    watch: {
        barZoomData: {
            handler (newValue, oldValue) {
                this.barZoomChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.barZoomChart()
        })
    },
    methods: {
        barZoomChart () {
            let {chartId, titleText, legendData, xAxisData, seriesData} = this.barZoomData
            let seriesArr = []
            seriesData.forEach(item => {
                seriesArr.push({
                    name: item.name,
                    type: 'bar',
                    data: item.data
                })
            })
            let myChart = this.echartInit(chartId)
            let option = {
                color: ['#3AA0FF', '#4ECB73'],
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
                    data: legendData,
                    right: 20,
                    top: 14
                },
                grid: {
                    left: 50,
                    right: 20
                },
                dataZoom: [{
                    type: 'slider',
                    xAxisIndex: 0,
                    filterMode: 'empty',
                    start: 0,
                    end: 100
                }],
                calculable: true,
                xAxis: [{
                    data: xAxisData
                }],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
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
