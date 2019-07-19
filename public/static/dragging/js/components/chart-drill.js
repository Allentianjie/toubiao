Vue.component('chartDrill', {
	props: ['item','theme','themeName'],
	template:'<div style="width:100%;min-height:450px;"><ve-chart\
				:name="item"\
				:ref="item.chartRefId"\
				:data="item.chartData"\
				:extend="item.options"\
				:settings="item.settings"\
				:toolbox="item.toolbox"\
				:mark-line="item.markLine?markLine:{}"\
				:mark-point="item.markPoint?markPoint:{}"\
				:theme="theme"\
				:events="chartEvents"\
				width="100%" \
				height="400px">\
			</ve-chart></div>',
	data:function(){
		return {
			isloading:false,
			markLine:{
				data: [
				  	{
				    	name: '平均线',
				    	type: 'average'
				  	}
		      ]
			},
			markPoint:{
		      data: [
		        	{
			            name: '最大值',
			            type: 'max'
		        	}
		      ]
	    },
		chartEvents:{
	        click:function(e){
						var baseId = this.item.chartData.rows[e.dataIndex].id[e.seriesIndex] //基础数据ID
						vm.goUrl(baseId);
	        }.bind(this)
	    },
		}
	},
	watch:{
		
	},
	created:function(){
		this.ff();
		this.item.options.series = {
			label: {
			  show: true,
				position: "top",
				textStyle:{
						fontSize:13,
				}
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
			}
		}
	},
	methods: {
		ff:function(){
			var seriesMap = {}
			var dataName = {}
			var rowsData = this.item.chartData.rows;
			var columns = this.item.chartData.columns;
			for(var i = 0 ;i < rowsData.length ; i++){
				dataName[rowsData[i][columns[0]]] = rowsData[i][columns[0]]
				seriesMap[rowsData[i][columns[0]]] = {
					radius: (i%2>0?'85%':'55%'),
					center: [(i*40+15)+'%', (i%2>0?'55%':'65%')],
					min: 0,
					max: 9527007,
					axisLine: {
						lineStyle: {
								color: [[0.29, 'lime'],[0.86, '#fff'],[1, '#ff4500']],
								width: 2,
								shadowColor: '#fff',
								shadowBlur: 10
						}
					},
					title: {
						offsetCenter: [0, '90%'],
						textStyle: {
								fontWeight: 'bolder',
								fontSize: 16,
								color: '#fff',
								shadowColor: '#fff',
								shadowBlur: 10
						}
					},
				}
			}
			this.item.settings.dataName = dataName;
			this.item.settings.seriesMap = seriesMap
			//堆积图
			if(this.item.chartStack){
				this.item.settings.stack = {'名称': columns}
			}
		},
		//重置图表尺寸
		resizeEvent:function(id){
			this.$nextTick(function(){
				if(this.$refs[id]){
				   this.$refs[id].resize()
				}
			})
		},
	},
})