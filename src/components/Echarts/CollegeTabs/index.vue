<template>
    <div class="collegeTabs echart-dom">
        <Tabs value="major" class="tabs" @on-click="fCollegeTab">
            <TabPane label="各学院专业数量" name="major">
                <div class="echart-dom" :id="majorData.chartId"></div>
            </TabPane>
            <TabPane label="各学院课程数量" name="curriculum">
                <div class="echart-dom" :id="curriculumData.chartId"></div>
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
                chartId: 'collegeMajor',
                legendData: ['海运学院6', '海洋学院6', '机械与船舶学院6',
                    '海运学院1', '海洋学院1', '机械与船舶学院1',
                    '海运学院2', '海洋学院2', '机械与船舶学院2',
                    '海运学院3', '海洋学院3', '机械与船舶学院3',
                    '海运学院4', '海洋学院4', '机械与船舶学院4',
                    '海运学院5', '海洋学院5', '机械与船舶学院5'],
                seriesData: [
                    {value: 1, name: '海运学院1'},
                    {value: 2, name: '海洋学院1'},
                    {value: 3, name: '机械与船舶学院1'},
                    {value: 2, name: '海运学院2'},
                    {value: 4, name: '海洋学院2'},
                    {value: 1, name: '机械与船舶学院2'},
                    {value: 3, name: '海运学院3'},
                    {value: 2, name: '海洋学院3'},
                    {value: 4, name: '机械与船舶学院3'},
                    {value: 2, name: '海运学院4'},
                    {value: 1, name: '海洋学院4'},
                    {value: 4, name: '机械与船舶学院4'},
                    {value: 3, name: '海运学院5'},
                    {value: 2, name: '海洋学院5'},
                    {value: 1, name: '机械与船舶学院5'},
                    {value: 4, name: '海运学院6'},
                    {value: 1, name: '海洋学院6'},
                    {value: 2, name: '机械与船舶学院6'}
                ],
                describe: {
                    num: 144,
                    unit: '个',
                    word: '全校专业数量'
                }
            },
            curriculumData: {
                chartId: 'collegeCurriculum',
                legendData: ['海运学院1', '海洋学院1', '机械与船舶学院1',
                    '海运学院2', '海洋学院2', '机械与船舶学院2',
                    '海运学院3', '海洋学院3', '机械与船舶学院3',
                    '海运学院4', '海洋学院4', '机械与船舶学院4'],
                seriesData: [
                    {value: 1, name: '海运学院1'},
                    {value: 2, name: '海洋学院1'},
                    {value: 3, name: '机械与船舶学院1'},
                    {value: 2, name: '海运学院2'},
                    {value: 4, name: '海洋学院2'},
                    {value: 1, name: '机械与船舶学院2'},
                    {value: 3, name: '海运学院3'},
                    {value: 2, name: '海洋学院3'},
                    {value: 4, name: '机械与船舶学院3'},
                    {value: 2, name: '海运学院4'},
                    {value: 1, name: '海洋学院4'},
                    {value: 4, name: '机械与船舶学院4'}
                ],
                describe: {
                    num: 244,
                    unit: '个',
                    word: '全校课程数量'
                }
            }
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.collegeMajorChart(this.majorData)
        })
    },
    methods: {
        collegeMajorChart (chartData) {
            let {chartId, legendData, seriesData, describe} = chartData
            let colorArr = ['#FFB46F', '#5D4240', '#46ABEF', '#C6A300', '#BD2F7A',
                '#B098DD', '#46547D', '#8E6ED0', '#22C4C6', '#BC3D3D', '#DB56A1', '#BD2F7A',
                '#F68E3C', '#DB56A1', '#5D4240', '#457FD4', '#8BAF40']
            let myChart = this.echartInit(chartId)
            let option = {
                legend: {
                    show: false,
                    data: legendData
                },
                color: colorArr,
                tooltip: {
                    trigger: 'item',
                    show: true,
                    formatter: '{b}: {c}',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: [10, 15],
                    extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4)'
                },
                series: [{
                    name: '告警统计',
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['70%', '85%'],
                    startAngle: 360,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: seriesData
                },
                {
                    name: '文字描述',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    center: ['50%', '50%'],
                    radius: ['70%', '85%'],
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [
                        {
                            label: {
                                normal: {
                                    formatter: (params) => {
                                        return '{num|' + describe.num + '}{unit|' + describe.unit + '}'
                                    },
                                    textStyle: {
                                        color: '#F1A630',
                                        padding: [0, 0, 20, 0]
                                    },
                                    rich: {
                                        num: {
                                            color: '#F1A630',
                                            fontSize: 30,
                                            fontWeight: 'bold'
                                        },
                                        unit: {
                                            color: '#F1A630',
                                            fontSize: 14,
                                            verticalAlign: 'bottom'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            label: {
                                normal: {
                                    formatter: '\n' + describe.word,
                                    textStyle: {
                                        color: '#4C4C4C',
                                        fontSize: 16
                                    }
                                }
                            }
                        }
                    ]
                }]
            }

            myChart.setOption(option, true)
            this.$nextTick(() => {
                window.addEventListener('resize', () => { myChart.resize() })
            })
        },
        fCollegeTab (name) {
            if (name === 'major') {
                this.collegeMajorChart(this.majorData)
            } else if (name === 'curriculum') {
                this.collegeMajorChart(this.curriculumData)
            }
        }
    }
}
</script>

<style lang="less">
.collegeTabs{
    .tabs{
        height: 100%;
        >.ivu-tabs-bar{
            border-bottom: none;
            >.ivu-tabs-nav-container{
                width: 286px;
                margin-left: calc((100% - 260px)/2);
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
