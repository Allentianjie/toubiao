<template>
    <div id="echartsM" style="width:100%;height:100%">
        <!--<div style="width:100%;height:100%" :id="lineChartData.pieChartId"></div>-->
    </div>
</template>

<script>
/** 使用饼图需要传递的参数
 pieChartData: {
  pieChartId: 'pieChartId',   //渲染的盒子ID  不能重复
  legendData: ['正常', '常宅', '晚归', '未归'],  // legendData
  pieTitle: '测试标题', // 标题
  seriesName: '人数（人）' // 系列名
  seriesRadius: ['30%', '50%'] // 饼图的半径 ['30%', '50%']空心环形  50%实心饼型
  seriesRoseType: 'area', // 是否展示成南丁格尔图，通过半径区分数据大小 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。有扇区圆心角相同，仅通过半径展现数据大小。
  seriesData: [
                  {value: 335, name: '机械学院'},
                  {value: 310, name: '电气学院'}
              ],  // seriesData
}
 */
import echart from "@/mixins/echart";
export default {
    props: ["lineChartData"],
    data() {
        return {};
    },
    mixins: [echart],
    mounted() {
        this.$nextTick(() => {
            this.pieChart();
        });
    },
    watch: {
        lineChartData: {
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
            let { id, seriesData } = this.lineChartData;
            let doc = document.querySelector("#echartsM");
            doc.innerHTML = `<div class="divMy" style="width: 100%;height:300px;"></div>`;
            this.$nextTick(() => {
                doc.getElementsByTagName("div")[0].setAttribute("id", id);
                let myChart = this.echartInit(id);
                myChart.setOption(
                    {
                        tooltip: {
                            trigger: "axis"
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: seriesData.xData
                        },
                        yAxis: {
                            type: "value"
                        },
                        series: [
                            {
                                data: seriesData.yData,
                                type: "line",
                                smooth: true,
                                areaStyle: {
                                    //区域填充样式
                                    normal: {
                                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                        color: {
                                            type: "linear",
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops:[{
                        offset: 0, color: 'rgba(96, 152, 236, 0.8)' // 0% 处的颜色
                      }, {
                        offset: 1, color: 'rgba(96, 152, 236, 0)' // 100% 处的颜色
                      }],
                                            global: false // 缺省为 false
                                        }
                                        // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                                        // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                        color: "#dbebfd",
                                        lineStyle: {
                                            // 系列级个性化折线样式
                                            width: 2,
                                            type: "solid",
                                            color: "#229df5" //折线的颜色
                                        }
                                    },
                                    emphasis: {
                                        color: "#6595ef"
                                    }
                                }
                            }
                        ]
                    },
                    true
                );
                window.addEventListener("resize", () => {
                    myChart.resize();
                });
            });
        }
    }
};
</script>
<style lang="less" scoped>
  .divMy {
    background-image: url("../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 80%;
  }
</style>
