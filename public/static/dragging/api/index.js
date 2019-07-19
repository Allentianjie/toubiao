var api = {

	/**
	 *  获取图形数据
	 * */
	getMyCockpit:function(param){
		return axiosInit.get("/cockpit/view/my",{params:param});
	},

	/**
	 *  获取图形数据
	 * */
	getChartDataFormat:function(param){
		return axiosInit.get("/cockpit/chart/data",{params:param});
	},
	
	
	/**
	 *  获取基础数据列表
	 */
	getSelectDataList:function(param){
		return axiosInit.get("/cockpit/select/data",{params:param}) ;
	},

	/**
	 * @method
	 * @param object
	 * @returns function 执行回调
	 * @desc 保存菜单页面配置
	 */
	saveLayers:function(param){
		return axiosInit.post("/function/layer/save",param) ;
	},
	
	/**
	 * @method
	 * @param object
	 * @returns function 执行回调
	 * @desc 保存菜单页面配置
	 */
	findByFuncId:function(id){
		return axiosInit.get("/function/find/" + id) ;
	},

	/**
	 * @method
	 * @param object
	 * @returns function 执行回调
	 * @desc 根据模块ID查询自定义布局及相关资源
	 */
	getLayerRecursion:function(id){
		return axiosInit.get("/function/layer/" + id) ;
	},

	/**
	 * @method
	 * @param params
	 * @returns function 执行回调
	 * @desc 根据模块ID查询自定义布局及相关资源
	 */
	getRecursions:function(params){
		return axiosInit.get("/function/layer/find",{params:params}) ;
	},

	/**
	 * 获取驾驶舱所有授权角色基本信息
	 */
	getCockpitAuthorizeRoleList:function(id){
		return axiosInit.get("/cockpit/getRoles/" + id) ;
	},

	/**
	 * 获取驾驶舱功能模块信息
	 */
	getFuncList:function(id){
		return axiosInit.get('/cockpit/getFunc/' + id )
	},

	/**
	 * 获取驾驶舱功能模块信息
	 */
	getEditViewChartData:function(params){
		return axiosInit.post('/cockpit/preview/data',params)
	},

	/**
	 *  下钻数据接口
	 */
	getDrillData:function(params){
		return axiosInit.post('/cockpit/drill/data',params)
	},

}
