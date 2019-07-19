<template>
    <div class="echart-dom getJobTabs">
        <Tabs value="major" class="tabs"  @on-click="fCollegeTab">
            <TabPane label="就业率专业TOP6" name="major">
                <div class="echart-dom" :id="majorData.chartId"></div>
            </TabPane>
            <TabPane label="就业薪酬专业TOP6" name="pay">
                <div class="echart-dom" :id="payData.chartId"></div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
/* eslint-disable */
import echart from '@/components/mixins/echart'

export default {
    mixins: [echart],
    data () {
        return {
            majorData: {
                chartId: 'curriculumId',
                yAxisData: ['海洋学院', '海洋学院', '海洋学院', '机械与船舶海洋工程学院', '海运学院', '海洋学院'],
                seriesData: [10, 23, 45, 63, 75, 85],
                unit: '%'
            },
            payData: {
                chartId: 'payId',
                yAxisData: ['海运学院', '海运学院', '海运学院', '机械与船舶海洋工程学院', '海洋学院', '海运学院'],
                seriesData: [32, 45, 65, 69, 73, 90],
                unit: '%'
            }
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.curriculumChart(this.majorData)
        })
    },
    methods: {
        curriculumChart (chartData) {
            let {chartId, yAxisData, seriesData, unit} = chartData
            let myChart = this.echartInit(chartId)
            let datas = seriesData
            let max = Math.max.apply(null, datas) / 0.85
            let filCurriculum = []
            seriesData.forEach((val) => {
                filCurriculum.push(max)
            })

            let option = {
                grid: {
                    left: 30,
                    top: 10,
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
                        padding: [0, 0, 10, 0],
                        formatter: (val, index) => {
                            let len = yAxisData.length
                            if (index < 3) {
                                return '{bg|Top' + (len - index) + '}' + '{title| ' + val + '}'
                            } else {
                                return '{og|Top' + (len - index) + '}' + '{title| ' + val + '}'
                            }
                        },
                        rich: {
                            og: {
                                backgroundColor: '#9F7D27',
                                color: '#fff',
                                align: 'center',
                                borderRadius: 3,
                                padding: [3, 8],
                                fontSize: 12
                            },
                            bg: {
                                backgroundColor: '#479DEA',
                                color: '#fff',
                                align: 'center',
                                borderRadius: 3,
                                padding: [3, 8],
                                fontSize: 12
                            }
                        }
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
                            color: '#000',
                            align: 'right'
                        },
                        formatter: (val) => {
                            return val + unit
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
                    data: filCurriculum,
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
        },
        fCollegeTab (name) {
            if (name === 'major') {
                this.curriculumChart(this.majorData)
            } else if (name === 'pay') {
                this.curriculumChart(this.payData)
            }
        }
    }
}
</script>

<style lang="less">
.getJobTabs{
    .tabs{
        height: 100%;
        >.ivu-tabs-bar{
            border-bottom: none;
            >.ivu-tabs-nav-container{
                width: 310px;
                margin-left: calc((100% - 290px)/2);
                margin-top: 15px;
                .ivu-tabs-nav .ivu-tabs-tab{
                    width: 50%;
                    margin-right: 0;
                    border: 1px solid #C9C9C9;
                    border-right: none;
                    border-radius: 5px 0 0 5px;
                    color: #000;
                }
                .ivu-tabs-nav .ivu-tabs-tab:last-child{
                    border: 1px solid #C9C9C9;
                    border-left: none;
                    border-radius: 0 5px 5px 0;
                }
                .ivu-tabs-nav .ivu-tabs-tab:active,
                .ivu-tabs-nav .ivu-tabs-tab:hover,
                .ivu-tabs-nav .ivu-tabs-tab:focus{
                    color: #000;
                    border-color: #C9C9C9;
                }
                .ivu-tabs-nav .ivu-tabs-tab-active{
                    color: #6C68E9;
                    background: #DCEDFB;
                    border-color: #8986ED !important;
                    border-right: none;
                }
                .ivu-tabs-nav .ivu-tabs-tab-active:active,
                .ivu-tabs-nav .ivu-tabs-tab-active:hover,
                .ivu-tabs-nav .ivu-tabs-tab-active:focus,{
                    color: #6C68E9;
                    background: #DCEDFB;
                    border-color: #8986ED !important;
                }
                .ivu-tabs-nav-wrap{
                    margin-bottom: 0;
                }
                .ivu-tabs-ink-bar{
                    height: 0;
                }
            }
        }
        .ivu-tabs-content{
            height: ~'calc(100% - 70px)';
        }
    }
}
</style>
