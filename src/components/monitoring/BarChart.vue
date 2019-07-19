<template>
    <div style="width:100%;height:80%;padding: 0 10px">
        <div style="width:100%;height:100%" :id="rankingBarData.id"></div>
    </div>
</template>

<script>
import echart from "@/mixins/echart";
export default {
    props: ["rankingBarData"],
    mixins: [echart],
    mounted() {
        this.$nextTick(() => {
            this.pieChart();
        });
    },
    watch: {
      rankingBarData: {
            handler(newValue, oldValue) {
                this.$nextTick(() => {
                    this.pieChart();
                });
            },
            deep: true
        }
    },
    methods: {
        pieChart() {
            let {
                id,
                xAxisData,
                seriesData
            } = this.rankingBarData;
            let myChart = this.echartInit(id);
            myChart.setOption(
                {
                    color: ["#fec321"],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data:xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            name: "达标情况",
                            type: "bar",
                            barWidth: "35%",
                            data:seriesData
                        }
                    ]
                },
                true
            );
            this.$nextTick(() => {
                window.addEventListener("resize", () => {
                    myChart.resize();
                });
            });
        }
    }
};
</script>
