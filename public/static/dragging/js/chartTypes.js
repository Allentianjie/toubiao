
var ChartType = {
    get : function(type){
        if(type === 'line'){
            return types.line;
        }
        if(type === 'histogram'){
          return types.histogram;
        }
        if(type === 'bar'){
            return types.bar;
        }
        if(type === 'pie'){
          return types.pie;
        }
        if(type === 'ring'){
          return types.ring;
        }
        if(type === 'waterfall'){
          return types.waterfall;
        }
        if(type === 'funnel'){
          return types.funnel;
        }
        if(type === 'radar'){
          return types.radar;
        }
    },
}; 

/**
 * 类型
 */
var types = {
    line : {
        name: '折线图',
        icon: '',
        settings: {
          type: 'line',
          area: true,
        },
        options: {
          legend: {
            show: true
          },
          tooltip: {
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 15
            }
          },
          yAxis: {
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 15
            }
          },
          series: {
            label: {
              show: true,
              position: "top"
            },
            symbolSize: 10
          }
        }
    },
    histogram :  {
        name: '柱状图',
        icon: '',
        settings: {
          type: 'histogram',
          stack: {},
        },
        options: {
          legend: {
            show: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 15
            }
          },
          yAxis: {
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 15
            }
          },
          series: {
            label: {
              show: true,
              position: "top"
            },
            barMaxWidth: '30px',
            itemStyle: {
              shadowBlur: 5,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 1,
              shadowOffsetY: 1,
              normal: {
                barBorderRadius: [4, 4, 0, 0]
              }
            },
          }
        }
    },
    bar :  {
        name: '条形图',
        icon: '',
        settings: {
          type: 'bar',
          stack: {},
        },
        options: {
          legend: {
            show: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 15
            }
          },
          yAxis: {
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 15
            }
          },
          series: {
            label: {
              show: true,
              position: "top"
            },
            barMaxWidth: '30px',
            itemStyle: {
              shadowBlur: 5,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 1,
              shadowOffsetY: 1,
              normal: {
                barBorderRadius: [4, 4, 0, 0]
              }
            },
          }
        }
    },
    pie : {
        name: '饼图',
        icon: '',
        settings: {
          type: 'pie',
          offsetY: '50%',
        },
        options: {
          legend: {
            show: true
          }
        }
    },
    ring : {
        name: '环图',
        icon: '',
        settings: {
          type: 'ring',
          offsetY: '50%',
        },
        options: {
          legend: {
            show: true
          }
        }
    },
    waterfall : {
        name: '瀑布图',
        icon: '',
        settings: {
          type: 'waterfall',
          stack: {},
        },
        options: {
          legend: {
            show: true
          },
          xAxis: {
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 15
            }
          },
          yAxis: {
            show: true,
            axisLabel: {
              interval: 0,
              rotate: 15
            }
          }
        }
    },
    funnel : {
        name: '漏斗图',
        icon: '',
        settings: {
          type: 'funnel',
          stack: {},
        },
        options: {
          legend: {
            show: true
          }
        }
    },
    radar : {
        name: '雷达图',
        icon: '',
        settings: {
          type: 'radar',
          stack: {},
        },
        options: {
          legend: {
            show: true
          }
        }
    }
}