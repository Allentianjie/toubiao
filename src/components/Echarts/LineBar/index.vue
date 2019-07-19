<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="chartData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'

export default {
    mixins: [echart],
    props: {
        chartData: Object
    },
    watch: {

    },
    mounted() {
        this.$nextTick(() => {
            this.lineChart()
        })
    },
    methods: {
        lineChart() {
            let {chartId, titleText, legendData, xAxisData, seriesData} = this.chartData
            let myChart = this.echartInit(chartId)
            let seriesArr = []
            seriesData.forEach((item) => {
                seriesArr.push({
                    name: item.name,
                    type: 'bar',
                    data: item.data
                })
            })
            let option = {
                color: ['#3aa0ff', '#eea989'],
                title: {
                    text: titleText,
                    textStyle: {
                        color: '#1D83DD',
                        fontWeight: 500,
                        fontSize: 20
                    },
                    padding: 15
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: legendData,
                    align: 'right',
                    right: 15,
                    top: 15
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: xAxisData
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
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
