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
            var dataStyle = {
                    normal: {
                        label: {
                            show: true,
                            color: '#000',
                            fontSize: 12,
                        },
                        labelLine: {
                            // smooth: 0.2,
                            length: 24,
                            length2: 24
                        },
                    }
                };

                var labelShow = {
                    show: true,
                    color: '#fff',
                    fontSize: 15,
                    formatter: [
                        '{d| {d}% }',
                        '{b| {b} }'
                    ].join('\n'),
                    rich: {
                        d: {
                            fontSize: 12,
                            color: '#000'
                        },
                        b: {
                            fontSize: 12,
                            color: '#000'
                        },
                    }
                };

                var placeHolderStyle = {
                    normal: {
                        color: 'rgba(0,0,0,0)',
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        color: 'rgba(0,0,0,0)'
                    }
                };
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
                color: ['#2078d1', '#8a00ec', '#ff00f3', '#fb0065', '#ff941b'],
                tooltip: {
                    show: true,
                    formatter: "{b} <br/> {c} ({d}%)"
                },
                angleAxis: {
                    type: 'category',
                    z: 10,
                    axisLine: {
                        color: '#fff',
                        lineStyle: {
                            width: 3,
                            color: '#fff',
                        }
                    },
                },
                radiusAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        color: '#fff'
                    },
                    axisLine: {
                        show: false,
                        color: '#fff',
                        lineStyle: {
                            color: '#fff',
                        }
                    },
                    splitLine: {
                        color: '#000',
                        lineStyle: {
                            type: 'dotted',
                            color: 'rgba(170,170,170,.5)',
                        }
                    },
                },
                polar: {
                    center: ['50%', '50%'],
                    radius: 80,
                },
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: false,
                    radius: [40, 45],
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    data: [{
                            value: 160,
                            name: '',
                            itemStyle: placeHolderStyle
                        },
                        {
                            value: 100,
                            name: '辅导员',
                            label: labelShow,
                        },
                        {
                            value: 0,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: 'Line 2',
                    type: 'pie',
                    clockWise: false,
                    radius: [25, 40],
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    data: [{
                            value: 190,
                            name: '',
                            itemStyle: placeHolderStyle
                        },
                        {
                            value: 70,
                            name: '院系负责人',
                            label: labelShow,
                        },
                        {
                            value: 100,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: 'Line 3',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: [60, 65],
                    itemStyle: dataStyle,

                    data: [{
                            value: 130,
                            name: '',
                            itemStyle: placeHolderStyle
                        },
                        {
                            value: 60,
                            name: '主任',
                            label: labelShow,
                        },
                        {
                            value: 170,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: 'Line 4',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: [50, 65],
                    itemStyle: dataStyle,

                    data: [{
                            value: 40,
                            name: '',
                            itemStyle: placeHolderStyle
                        },
                        {
                            value: 90,
                            name: '学校负责人',
                            label: labelShow,
                        },
                        {
                            value: 230,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: 'Line 5',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: [30, 40],
                    itemStyle: dataStyle,

                    data: [{
                            value: 0,
                            name: '',
                            itemStyle: placeHolderStyle
                        },
                        {
                            value: 40,
                            name: '其他',
                            label: labelShow,
                        },
                        {
                            value: 320,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    type: 'bar',
                    data: [0],
                    coordinateSystem: 'polar',
                    name: '06a',
                    stack: 'a'
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
