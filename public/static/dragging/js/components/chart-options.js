Vue.component('chartOptions', {
	props: ['item','module'],
	template: '<el-tabs v-model="activeChartConfig" type="card">\
	    <el-tab-pane label="基 础" name="first">\
	    	<el-form ref="form" label-width="90px" >\
  				<el-form-item label="模块标题">\
				    <el-input v-model="module.name"></el-input>\
				</el-form-item>\
				<el-form-item label="字体大小">\
				    <el-input v-model="module.titleFont" placeholder="只能是数字,单位 px"></el-input>\
				</el-form-item>\
				<el-form-item label="数据名称">\
				    <el-input v-model="item.name"></el-input>\
				</el-form-item>\
				<el-form-item label="图形类型" v-if="item.dataType==\'mulit_data\'">\
				    <el-select v-model="item.chartSettings.type" placeholder="请选择图形" @change="chartsSelectEvents">\
				    	<el-option v-for="val in chartTypes" :label="val.label" :value="val.value">\
				    	</el-option>\
				    </el-select>\
				</el-form-item>\
				<el-form-item label="排序数量" v-if="item.dataType==\'mulit_data\'">\
                    <el-input v-model="item.size"></el-input>\
                </el-form-item>\
                <el-form-item label="排序" v-if="item.dataType==\'mulit_data\'">\
                    <el-select v-model="item.rank" placeholder="请选择排序">\
                        <el-option label="默认" value="default"></el-option>\
                          <el-option label="倒序" value="desc"></el-option>\
                          <el-option label="升序" value="asc"></el-option>\
                    </el-select>\
                </el-form-item>\
			</el-form>\
	    </el-tab-pane>\
	    <el-tab-pane label="高 级" name="second" v-if="!(item.chartData.idType==\'base_data\'||item.chartData.idType==\'senior_data\')">\
	    	<el-form ref="form" label-width="90px" size="mini" >\
  				<el-form-item label="显示图例">\
				    <el-switch v-model="item.options.legend.show"></el-switch>\
				</el-form-item>\
				<el-form-item label="饼图半径">\
				    <el-input v-model="item.chartSettings.radius"></el-input>\
				</el-form-item>\
				<el-form-item label="上边距">\
				    <el-input v-model="item.options.grid.top"></el-input>\
				</el-form-item>\
				<el-form-item label="下边距">\
				    <el-input v-model="item.options.grid.bottom"></el-input>\
				</el-form-item>\
				<el-form-item label="左边距">\
				    <el-input v-model="item.options.grid.left"></el-input>\
				</el-form-item>\
				<el-form-item label="右边距">\
				    <el-input v-model="item.options.grid.right"></el-input>\
				</el-form-item>\
			</el-form>\
	    </el-tab-pane>\
	    <el-tab-pane label="X 轴" name="third" v-if="!(item.chartData.idType==\'base_data\'||item.chartData.idType==\'senior_data\')">\
	    	<el-form ref="form" label-width="90px" >\
		    	<el-form-item label="是否显示">\
				    <el-switch v-model="item.options.xAxis.show"></el-switch>\
				</el-form-item>\
				<el-form-item label="文字倾斜">\
				    <el-input v-model="item.options.xAxis.axisLabel.rotate"></el-input>\
				</el-form-item>\
			</el-form>\
	    </el-tab-pane>\
	    <el-tab-pane label="Y 轴" name="four" v-if="!(item.chartData.idType==\'base_data\'||item.chartData.idType==\'senior_data\')">\
	    	<el-form ref="form" label-width="90px" >\
		    	<el-form-item label="是否显示">\
				    <el-switch v-model="item.options.yAxis.show"></el-switch>\
				</el-form-item>\
				<el-form-item label="文字倾斜">\
				    <el-input v-model="item.options.yAxis.axisLabel.rotate"></el-input>\
				</el-form-item>\
			</el-form>\
	    </el-tab-pane>\
	    <el-tab-pane label="数 据" name="five" v-if="!(item.chartData.idType==\'base_data\'||item.chartData.idType==\'senior_data\')">\
	    	<el-form ref="form" label-width="90px" >\
	    		<el-form-item label="数据堆积">\
				    <el-switch v-model="item.stack" @change="stackChange"></el-switch>\
				</el-form-item>\
		    	<el-form-item label="最大值">\
				    <el-switch v-model="item.markPoint"></el-switch>\
				</el-form-item>\
				<el-form-item label="平均线">\
				    <el-switch v-model="item.markLine"></el-switch>\
				</el-form-item>\
			</el-form>\
		</el-tab-pane>\
		<el-tab-pane label="样 式" name="six" >\
            <el-form ref="form" label-width="90px" >\
                <el-form-item label="图层皮肤">\
                    <el-select v-model="item.skin" placeholder="请选择皮肤">\
                        <el-option label="无皮肤" value=""></el-option>\
                          <el-option label="皮肤1" value="bro1"></el-option>\
                          <el-option label="皮肤2" value="bro2"></el-option>\
                          <el-option label="皮肤3" value="bro3"></el-option>\
                    </el-select>\
				</el-form-item>\
				<el-form-item label="字体大小">\
					<el-input v-model="item.fontSize"></el-input>\
				</el-form-item>\
				<el-form-item label="边距">\
					<el-input v-model="item.fontSize"></el-input>\
				</el-form-item>\
            </el-form>\
        </el-tab-pane>\
	</el-tabs>',
	data:function(){
		return {
			activeChartConfig:'first',
			data:{},
			options:{},
			chartTypes:[
				{label:'折线图',value:'line'},
				{label:'柱状图',value:'histogram'},
				{label:'条形图',value:'bar'},
				{label:'饼图',value:'pie'},
				{label:'环图',value:'ring'},
				{label:'瀑布图',value:'waterfall'},
				{label:'漏斗图',value:'funnel'},
				{label:'雷达图',value:'radar'},
				{label:'仪表盘',value:'gauge'}
			]
		}
	},
	mounted:function(){
		if(this.item.chartSettings.type=='line'||this.item.chartSettings.type=='histogram'||this.item.chartSettings.type=='bar'||this.item.chartSettings.type=='waterfall'){
    		this.item.options.xAxis.show = true
    		this.item.options.yAxis.show = true
    	}else{
    		this.item.options.xAxis.show = false
    		this.item.options.yAxis.show = false
    	}
	},
	watch:{
		item:function(newVal,oldVal){
			this.data = newVal
		}
	},
	methods: {
		stackChange:function(e){
			if(e){
				this.item.chartSettings.stack = {'名称':this.item.chartData.columns}
			}else{
				this.item.chartSettings.stack = {}
			}
		},
		chartsSelectEvents:function(e){
        	if(e=='line'||e=='histogram'||e=='bar'||e=='waterfall'){
        		this.item.options.xAxis.show = true
        		this.item.options.yAxis.show = true
        	}else{
        		this.item.options.xAxis.show = false
        		this.item.options.yAxis.show = false
        	}
        	if(this.item.chartSettings.type =='gauge'){
        		var seriesMap = {}
        		var dataName = {}
  				for(var i = 0;i<this.item.chartData.rows.length;i++){
  					dataName[this.item.chartData.rows[i][this.item.chartData.columns[0]]] = this.item.chartData.rows[i][this.item.chartData.columns[0]]
  					seriesMap[this.item.chartData.rows[i][this.item.chartData.columns[0]]] = {
  						radius: (i%2>0?'85%':'55%'),
				        center: [(i*35+15)+'%', (i%2>0?'55%':'65%')],
				        min: 0,
				        max: Number(this.item.chartData.rows[i][this.item.chartData.columns[1]])+1000,
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
  				this.item.chartSettings.dataName = dataName
  				this.item.chartSettings.seriesMap = seriesMap
  			}
        },
	},
})