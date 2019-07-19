<template>
    <div class="echart-dom">
        <div class="echart-dom" :id="pyramidData.chartId"></div>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'

export default {
    mixins: [echart],
    data () {
        return {
            pyramidData: {
                chartId: 'personnelId',
                titleText: '高级人才情况',
                markData: [
                    [{x: '53%', y: '25%'}, {x: '86%', y: '25%', value: '10个', lineStyle: {color: '#000'}}],
                    [{x: '60%', y: '40%'}, {x: '86%', y: '40%', value: '50个', lineStyle: {color: '#000'}}],
                    [{x: '68%', y: '55%'}, {x: '86%', y: '55%', value: '102个', lineStyle: {color: '#000'}}],
                    [{x: '76%', y: '70%'}, {x: '86%', y: '70%', value: '171个', lineStyle: {color: '#000'}}],
                    [{x: '84%', y: '85%'}, {x: '86%', y: '85%', value: '81个', lineStyle: {color: '#000'}}]
                ],
                seriesData: [
                    {value: 1, name: '省部级\n教学团队'},
                    {value: 2, name: '国家千人\n计划特聘专家'},
                    {value: 3, name: '自治区特聘专家'},
                    {value: 4, name: '创新团队'},
                    {value: 5, name: '省部级高层次人才'}
                ]
            }
        }
    },
    props: {
        pyramid: {
            type: Object,
            required: true
        }
    },
    watch: {
        pyramid: {
            handler (newValue, oldValue) {
                if (this.pyramid.data && this.pyramid.data.length) {
                    for (let i = 0; i < this.pyramid.data.length; i++) {
                        this.pyramidData.markData[i][1].value = this.pyramid.data[i].value
                        this.pyramidData.seriesData[i].name = this.pyramid.data[i].name
                    }
                }
                this.pyramidChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.pyramidChart()
        })
    },
    methods: {
        pyramidChart () {
            let {chartId, titleText, markData, seriesData} = this.pyramidData
            let colorArr = ['#5279E6', '#AEC2FA']
            let myChart = this.echartInit(chartId)
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
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c}%"
                },
                calculable: true,
                color: colorArr,
                series: [
                    {
                        name: '高级人才情况',
                        type: 'funnel',
                        left: '15%',
                        right: '20%',
                        top: '15%',
                        bottom: '5%',
                        minSize: '0%',
                        maxSize: '130%',
                        sort: 'ascending',
                        gap: 2,
                        label: {
                          normal:{
                            show: true,
                            position: 'inside',
                            padding: [15, 0, 0, 0]
                          }
                        },
                        labelLine: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        },
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        markLine: {
                          symbol: 'none',
                          lineStyle: {type: 'solid'},
                          data: markData
                      },
                        data: seriesData
                    }
                ]
            }
            myChart.setOption(option, true)
            this.$nextTick(() => {
                window.addEventListener('resize', () => { myChart.resize() })
            })
        }
    }
}
</script>
