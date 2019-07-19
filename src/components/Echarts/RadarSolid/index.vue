<template>
    <div class="echart-dom">
        <div class="echart-dom" v-if="radarSolidData.chartId" :id="radarSolidData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'
export default {
    mixins: [echart],
    props: {
        radarSolidData: {
            type: Object,
            required: true
        }
    },
    watch: {
        radarSolidData: {
            handler (newValue, oldValue) {
                this.radarSolidChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.radarSolidChart()
        })
    },
    methods: {
        radarSolidChart () {
            let {chartId, titleText, indicatorData, seriesData} = this.radarSolidData
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
                    name: {
                        textStyle: {
                            color: '#000'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#fff', '#fff', '#fff', '#fff']
                        }
                    },
                    indicator: indicatorData,
                    radius: 100,
                    splitNumber: 6
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: seriesData,
                        itemStyle: {
                            normal: {
                                color: 'rgba(80, 169, 248, 0.3)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#50A9F8'
                            }
                        }
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
