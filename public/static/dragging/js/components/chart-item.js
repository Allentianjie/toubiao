Vue.component('chartItem', {
	props: ['item','mid','theme','themeName'],
	template: '<div class="base-data" v-if="item.chartSettings.type==\'target\'">\
		<template v-for="(value,index) in item.chartData.rows" >\
			<div v-if="!reqFalg"><div class="text" style="color:red;padding-top: 60px;font-size: 20px;">{{reqErrMsg}}</div></div>\
			<div v-if="reqFalg">\
				<div class="text">\
				  <el-dropdown v-if="item.chartData.conditions.length > 1">\
						<el-tag size="medium" type="danger">{{item.chartData.currentQuery}}</el-tag>\
						<el-dropdown-menu slot="dropdown">\
							<el-dropdown-item v-for="(item,index) in item.chartData.conditions" :key="index">\
								<span class="block" @click="dropdownEvent(item)">{{item}}</span>\
							</el-dropdown-item>\
						</el-dropdown-menu>\
					</el-dropdown>\
					{{item.chartData.rows[0][\'名称\']}}\
					<el-tooltip v-if="item.chartData.conditions.length == 1" class="item" effect="dark" placement="top-start">\
					  <div slot="content">当前维度:{{item.chartData.currentQuery}}</div>\
						<i class="el-icon-question"></i>\
					</el-tooltip>\
				</div>\
				<div class="value">\
					<span @click="goUrl(item.chartData.rows[0].id[0],mid,item.chartData.rows[0].currQuery[0])">\
						{{item.chartData.rows[0][item.chartData.columns[1]]}}\
					</span>\
				</div>\
			</div>\
		</template>\
	</div>\
	<div class="mulit-data" v-else>\
		<div style="padding-bottom:10px">\
			<el-dropdown v-if="item.chartData.conditions.length > 1">\
				<el-button size="small" type="primary" plain>\
				   {{item.chartData.currentQuery}} <i class="el-icon-arrow-down el-icon--right"></i>\
				</el-button>\
			  <el-dropdown-menu slot="dropdown">\
			    <el-dropdown-item v-for="(item,index) in item.chartData.conditions">\
			    	<span class="block" @click="dropdownEvent(item)">{{item}}</span>\
			    </el-dropdown-item>\
			  </el-dropdown-menu>\
			</el-dropdown>\
			{{item.name}}\
			<el-tooltip v-if="item.chartData.conditions.length == 1" class="item" effect="dark" placement="top-start">\
				<div slot="content">当前维度:{{item.chartData.currentQuery}}</div>\
				<i class="el-icon-question"></i>\
			</el-tooltip>\
		</div>\
		<div v-if="!reqFalg"><div class="text" style="color:red;padding-top: 60px;font-size: 20px;">{{reqErrMsg}}</div></div>\
		<div class="chart-box" v-loading="loading">\
			<ve-chart\
				v-if="!item.loading && item.chartSettings.type!=\'gauge\'"\
				:name="item"\
				:ref="item.id"\
				:extend="item.options"\
				:data="item.chartData" \
				:settings="item.chartSettings" \
				:toolbox="item.toolbox"\
				:mark-line="item.markLine?markLine:{}"\
				:mark-point="item.markPoint?markPoint:{}"\
				:theme="theme" \
				:events="chartEvents"\
				width="100%" \
				height="100%">\
			</ve-chart>\
			<template v-if="!item.loading && item.chartSettings.type==\'gauge\'">\
				<ve-gauge\
					:name="item"\
					:ref="item.id"\
					:extend="item.options"\
					:data="item.chartData" \
					:settings="item.chartSettings" \
					:toolbox="item.toolbox"\
					:mark-line="item.markLine?markLine:{}"\
					:mark-point="item.markPoint?markPoint:{}"\
					:theme="theme" \
					:theme-name="themeName"\
					:events="chartEvents"\
					width="100%" \
					height="100%">\
				</ve-gauge>\
			</template>\
		</div>\
	</div>',
	data:function(){
		return {
			loading:false,
			reqFalg:true, //请求正确
			reqErrMsg:'数据已删除',
			queryWord:'',
			drillDownVisible:false,
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
						var mutiId = this.item.id //图表数据ID
						var baseId = this.item.chartData.rows[e.dataIndex].id[e.seriesIndex] //基础数据ID
						var type = this.item.chartData.idType;
						var moduleId = this.mid //布局ID
						var queryWord = this.queryWord;
						//var urlstr = 'noUrl'
						vm.goUrl(mutiId,baseId,moduleId,queryWord,type)
	        }.bind(this)
	    },
		}
	},
	watch:{

	},
	created:function(){
		this.getChartData()
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
		dropdownEvent:function(item){
			this.item.chartData.currentQuery = item
			this.queryWord = item;
			this.getChartData()
		},
		//获取图表数据
		getChartData:function(){
					var _this = this
					_this.loading = true;
					_this.item.loading = true
					//参数
					var params = {
							id:_this.item.id,
							query:_this.queryWord,
							type:_this.item.dataType,
							rank:_this.item.rank,
							size:_this.item.size,
      		}
					//request -》 start
					api.getChartDataFormat(params).then(function(res ) {
							//请求异常
							if(!res.data.data){
									_this.reqFalg = false;
									_this.reqErrMsg = res.data.msg;
									_this.loading = false;
									return
							}
							if(Object.keys(res.data.data.conditions).length > 0){
								 _this.item.chartData.currentQuery = res.data.data.conditions[0];
								 _this.queryWord = res.data.data.conditions[0];
							}
							_this.item.chartData = res.data.data
							_this.item.loading = false
							// if start 仪表盘
							if(_this.item.chartSettings.type =='gauge'){
									var seriesMap = {}
									var dataName = {}
									for(var i = 0;i<_this.item.chartData.rows.length;i++){
										dataName[_this.item.chartData.rows[i][_this.item.chartData.columns[0]]] = _this.item.chartData.rows[i][_this.item.chartData.columns[0]]
										seriesMap[_this.item.chartData.rows[i][_this.item.chartData.columns[0]]] = {
											radius: (i%2>0?'85%':'55%'),
											center: [(i*35+15)+'%', (i%2>0?'55%':'65%')],
											min: 0,
											max: _Number(this.item.chartData.rows[i][_this.item.chartData.columns[1]])+1000,
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
									_this.item.chartSettings.dataName = dataName
									_this.item.chartSettings.seriesMap = seriesMap
							}
							// if end
							//堆积
							if(_this.item.stack){
									_this.item.chartSettings.stack = {'名称':_this.item.chartData.columns}
							}
							//排序
							if(_this.item.chartData.rank!='default'){
								_this.item.chartData.rows.sort(function(a,b){
										if(_this.item.chartData.rank=='asc'){
												return a[_this.item.chartData.columns[1]]-b[_this.item.chartData.columns[1]]
										}else if(_this.item.chartData.rank=='desc'){
												return b[_this.item.chartData.columns[1]]-a[_this.item.chartData.columns[1]]
										}
								})
							}
							//限制显示数量
							if(_this.item.chartData.size>0){
									var arr = []
									for(var i=0;i<_this.item.chartData.size&&i<_this.item.chartData.rows.length;i++){
											arr.push(_this.item.chartData.rows[i])
									}
									_this.item.chartData.rows = arr
							}
						_this.loading = false;
			});//requset -> end

		},
		//指标点击事件
    goUrl:function(id,moduleId,currQuery){
					var queryWord = this.queryWord;
					var type = this.item.chartData.idType;
					vm.goUrl('',id,moduleId,queryWord,type);
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
