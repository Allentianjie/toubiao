Vue.component('chartView', {
	props: ['item','theme','themeName'],
	template:'<div style="width:100%;height:80%;"><ve-chart\
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
				height="100%">\
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
				
	        }.bind(this)
	    },
		}
	},
	watch:{
		
	},
	created:function(){
		this.ff();
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
					center: [(i*35+15)+'%', (i%2>0?'55%':'65%')],
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
						fontSize: 20,
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