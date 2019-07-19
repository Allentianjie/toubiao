<template>
  <div style="width:100%;height:100%">
    <div style="width:100%;height:100%" :id="treeChartData.pieChartId"></div>
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
    props: ["treeChartData"],
    mixins: [echart],
    mounted() {
      this.$nextTick(() => {
        this.treeChart();
      });
    },
    watch: {
      treeChartData: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.treeChart();
          });
        },
        deep: true
      }
    },
    methods: {
      treeChart() {
        let colorData = require("../../../public/static/chartColor.json");
        let {pieChartId,legendData,seriesData,total} = this.treeChartData;
        let myChart = this.echartInit(pieChartId);
        myChart.setOption(
          {
            title: {
              text: "",
              x: "center"
            },
            tooltip: {
              // show：'true',//默认：true；是否显示提示框组件，包括提示框浮层和 axisPointer。
              trigger: 'item', // 默认：item；触发类型。item：数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
              // triggerOn: 'mousemove',
              formatter: "{b} : {c}%"
            },
            // color: colorData,
            grid: {
              left: '1%',
              right: '1%',
              bottom: '1%',
              top: '0',
              containLabel: true
            },
            series: [
              {
                type: 'tree',
                data: seriesData,
                itemStyle: {
                  normal: {
                    borderColor: '#2586ef', // 方框的线条颜色
                    borderWidth: 1, // 方框的线条宽度
                    // opacity: 0.8,// 图形透明度
                    lineStyle: {
                      color: '#2586ef', // 线条的颜色
                      width: 1,
                      type: 'solid' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                    }
                  },
                  emphasis: {
                  }
                },
                symbolSize: [10, 10],
                // symbol: 'rect', // 方形显示框
                label: {
                  normal: {
                    position: 'right',
                    verticalAlign: 'bottom',
                    // align: 'right',
                    fontSize: 12
                  }
                },
                initialTreeDepth: 2, // 展开的叶子节点
                expandAndCollapse: true, // 是否收起节点 !!!可以自定义图片表示树节点是展开还是收起
                animationDuration: 550,
                animationDurationUpdate: 750
              }
            ]
          },
        true
      )
        this.$nextTick(() => {
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        });
      }
    }
  };
</script>
