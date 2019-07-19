<template>
	<div class="c-choiceMajor">
		<!-- 专业画像 - 选择专业 - 弹窗组件 -->
		<el-dialog :visible.sync="visible" title="选择专业" :modal-append-to-body="true" :append-to-body="true" width="750px" @close="dialogCloseFn">
			<!-- 表格数据 -->
			<div class="crud-content">
				<el-table ref="table" :data="tableData" :row-class-name="'trClass'" :fit="true" size="small" border height="100%" style="min-width: 100%;min-height: 100%" @row-click="rowClickFn">
					<el-table-column class="trClass" align="left" prop="name" label="专业名称" width="350"></el-table-column>
					<el-table-column align="center" prop="majorcode" label="专业代码"></el-table-column>
					<el-table-column align="center" prop="educational" label="年   制"></el-table-column>
					<el-table-column align="center" prop="grade" label="年   级"></el-table-column>
				</el-table>
			</div>
			<!-- 表格数据 end -->
			<!-- 翻页 -->
			<div class="crud-pagination clearfix">
				<el-pagination
	        		@size-change="sizeChangeFn"
	        		@current-change="currentChangeFn"
			        :current-page="currentPage"
			        :page-size="pageSize"
			        :page-sizes="pageSizes"
			        :total="pageTotal"
			        layout="total, sizes, prev, pager, next, jumper">
			    </el-pagination>
			</div>
			<!-- 翻页 end -->
		</el-dialog>
	</div>
</template>

<script>
	/**
	 * Evua Huang
	 * 2019/04/16
	 *
	 * 专业画像 - 选择专业 - 弹窗组件
	 *
	 * 需求：
	 * 		单选
	 *
	 * 入参：
	 * 		propVisible: 弹窗是否可见
	 * 		propCheckedData： 选中的数据
	 *
	 * 逻辑：
	 * 1、弹窗的显示/关闭与否 跟据父组件的入参 propVisible 决定，而弹窗的显示/关闭也关联父组件的 propVisible 值
	 * 2、给弹窗绑定关闭弹窗事件 @close="dialogCloseFn"
	 * 3、布局DOM，获取列表数据
	 * 4、点击某一行
	 */
	export default {
		props: ['propVisible','propCheckedData'],
		data (){
			return {
				tableData: [
					/*{
						name: '计算机科学1', //专业名称
						majorcode: '097908', //专业代码
						educational: 9988, //学生数据
					},
					{
						name: '计算机科学2', //专业名称
						majorcode: '097906', //专业代码
						educational: 9988, //学生数据
					},
					{
						name: '计算机科学3', //专业名称
						majorcode: '097903', //专业代码
						educational: 9988, //学生数据
					}*/
				],
				currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50],
                pageTotal: 0,
			};
		},
		computed: {
			visible: {//逻辑1
				get (){
					return this.propVisible;
				},
				set (newVal){
					//console.log('1、newVal:',newVal);
					this.$emit('update:propVisible',newVal);
				}
			}
		},
		mounted (){
			this.initTableDataFn();
		},
		methods: {
			/**
			 * 逻辑2
			 * 弹窗 - 关闭
			 */
			dialogCloseFn (){
				this.$emit('update:propVisible',false);
				//console.log('2、关闭弹窗，重置相应的值！');
			},
			/**
			 * 逻辑3
			 * 获取表格数据
			 */
			getTableDataFn (params){
				this.$Get("/portrait/majorPortrait/majors", params, res => {
		          if(res.code==0) {
		            this.tableData = res.data.data;
		            this.pageTotal = res.data.total;
		          }
		        });
			},
			/**
			 * 逻辑3
             * 初始化表格数据
             */
            initTableDataFn (){
                this.getTableDataFn({pageNum:this.currentPage,pageSize:this.pageSize});
            },
            /**
             * 逻辑4
			 * 翻页 - 页码pageSize变化
			 */
			sizeChangeFn (val){
				this.currentPage = 1;
				this.pageSize = val;
				this.getTableDataFn({pageNum:this.currentPage,pageSize:this.pageSize});
			},
			/**
			 * 逻辑4
			 * 翻页 - 当前页currentPage变化
			 */
			currentChangeFn (val){
				this.currentPage = val;
				this.getTableDataFn({pageNum:this.currentPage,pageSize:this.pageSize});
			},
			/**
			 * 逻辑5
			 * 点击某一行
			 */
			rowClickFn (row){
				// console.log('row:',row);
				this.$emit('update:propCheckedData',row);
				this.dialogCloseFn();
			}
		}
	};
</script>

<style lang="less">
	.clearfix:before,.clearfix:after{content:"";display:table;} .clearfix:after{clear:both;} .clearfix{zoom:1;}
	.crud{
		&-queryForm{ padding: 10px 0; }
		&-content{}
		&-pagination{ text-align: right; padding: 20px 0;}
		&-dialog{ padding: 10px 35px 15px 0; }
	}
	.trClass{
		&:hover{color: blue !important; cursor: pointer !important;}
	}
</style>

