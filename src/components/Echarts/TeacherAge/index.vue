<template>
    <div style="width:100%;height:100%" class="teacherAge">
        <p>男女教师年龄分布</p>
        <div class="img">
            <div>
                <div>男</div>
                <img src="~@/assets/img/home-man.png" alt="男">
            </div>
            <img src="~@/assets/img/home-vs.png" alt="vs" class="vs">
            <div>
                <div>女</div>
                <img src="~@/assets/img/home-woman.png" alt="女">
            </div>
        </div>
        <div class="percentage">
            <span class="leftTop"></span><span  class="rightTop"></span>
            <p><label>{{teacherAgeData.woman}}%</label><label>{{teacherAgeData.man}}%</label></p>
            <span class="leftBottom"></span><span class="rightBottom"></span>
        </div>
        <div class="chart">
            <div style="width:100%;height:100%" :id="teacherAgeData.chartId"></div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
/** 条状图
 * teacherAgeData: {
        chartId: '',
        titleText: '教师年龄分布',
        yAxisData: ['25-30岁', '31-40岁', '41-50岁', '51-60岁'],
        seriesData: [321, 457, 789, 1244]
    }
 */
import echart from '@/components/mixins/echart'
export default {
    mixins: [echart],
    props: {
        teacherAgeData: {
            type: Object,
            required: true
        }
    },
    watch: {
        teacherAgeData: {
            handler (newValue, oldValue) {
                this.teacherAgeChart()
            },
            deep: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.teacherAgeChart()
        })
    },
    methods: {
        teacherAgeChart () {
            let {chartId, titleText, yAxisData, seriesData} = this.teacherAgeData
            let myChart = this.echartInit(chartId)
            let option = {
                title: {
                    text: titleText,
                    textStyle: {
                        color: '#6C68E9',
                        fontWeight: 500,
                        fontSize: 14
                    },
                    padding: 15
                },
                grid: {
                    left: '20%',
                    top: 40,
                    bottom: 10
                },
                yAxis: [{
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#3e4956',
                        fontSize: 13
                    },
                    type: 'category',
                    position: 'left',
                    data: yAxisData

                }],
                xAxis: [{
                    show: false,
                    type: 'value'
                }],
                series: [{
                    name: '教师年龄',
                    align: 'left',
                    type: 'bar',
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
                    },
                    barWidth: '10',
                    label: {
                        normal: {
                            show: false
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

<style lang="less">
.teacherAge{
    >p{
        font-size:16px;
        font-weight:500;
        color:rgba(29,131,221,1);
        text-align: left;
        padding: 10px 0 0 15px;
    }
    >.img{
        display: flex;
        justify-content: center;
        position: relative;
        margin-top: 15px;
        >div{
            width: 40px;
            height: 60px;
            text-align: center;
            >img {
                height: 30px;
                margin-top: 5px;
            }
        }
        >.vs{
            margin: 0 70px;
            height: 15px;
            position: relative;
            bottom: -30px;
        }
    }
    >.percentage{
        position: relative;
        width: 220px;
        margin-left: calc((100% - 220px)/2);
        >p{
            margin-top: 10px;
            >label{
                display: inline-block;
                height: 30px;
                width: 110px;
                line-height: 30px;
                text-align: center;
                background: #E87BB7;
                font-size:18px;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            >label:first-child{
                background: #0679C6;
            }
        }
        >span{
            display: inline-block;
            width: 15px;
            height: 15px;
            position: absolute;
        }
        .leftTop{
            border-top: 2px solid rgba(191,191,191,1);
            border-left: 2px solid rgba(191,191,191,1);
            top: -6px;
            left: -6px;
        }
        .rightTop{
            border-top: 2px solid rgba(191,191,191,1);
            border-right: 2px solid rgba(191,191,191,1);
            top: -6px;
            right: -6px;
        }
        .leftBottom{
            border-bottom: 2px solid rgba(191,191,191,1);
            border-left: 2px solid rgba(191,191,191,1);
            bottom: -6px;
            left: -6px;
        }
        .rightBottom{
            border-bottom: 2px solid rgba(191,191,191,1);
            border-right: 2px solid rgba(191,191,191,1);
            bottom: -6px;
            right: -6px;
        }
    }
    >.chart{
        width: 100%;
        height: calc(100% - 170px);
        margin-top: 10px;
    }
}
</style>
