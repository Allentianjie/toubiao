<template>
    <div class="execution">
        <div class="M_search">
          名称：<Input placeholder="请输入数据名称" v-model="params.multiName" style="width: auto"  />
          <el-button icon="el-icon-search"  @click.stop="searchChange()" type="primary" size="small">搜 索</el-button>
          <el-button icon="el-icon-delete" @click.stop="refreshChange()" size="small">清 空</el-button>
           <el-button  class="funaddBtn" icon="el-icon-plus" @click="handleAdd" type="primary" size="small">新增</el-button>
        </div>
        <div class="vasisTabs">
            <Tabs type="card" @on-click="tabClick" v-model="tab.active">
                <TabPane
                    v-for="(item,index) in tab.layData"
                    :key="index"
                    :label="item.label"
                    :name="item.value"
                ></TabPane>
            </Tabs>
        </div>
        <div class="tableHeight" style="height: calc(100% - 160px);">
            <el-table
                :data="tableData"
                height="100%"
                v-loading="tableData.loading"
                fit
                :header-cell-style="backHeader"
                highlight-current-row
                style="min-width: 100%;min-height: 100%">
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                <el-table-column label="名称" show-overflow-tooltip prop="multiName" align="left"></el-table-column>
                <el-table-column label="备注" show-overflow-tooltip prop="remark" align="left"></el-table-column>
                <el-table-column label="创建人" prop="createName" align="center" width="100"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center" width="180"></el-table-column>
                <el-table-column label="状态" align="center" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.enableFlag | isStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200"
                    align="center"
                    class-name="small-padding fixed-width"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            size="mini"
                            plain
                            @click="handleEdit(scope.row,scope.index)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            size="mini"
                            plain
                            @click="handleDel(scope.row,scope.index)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination-container" style="text-align: right">
            <el-pagination
                background
                @size-change="changeSize"
                @current-change="changePage"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                layout="total, prev, pager, next"
                :total="page.total"
            ></el-pagination>
        </div>
        <el-dialog  :visible.sync="dialogFormVisible" width="80%" :close-on-click-modal="false">
          <p slot="title">
            <span>{{title}}</span>
          </p>
            <el-row>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-tree
                            node-key="id"
                            :load="loadNode"
                            :props="tree.props"
                            @check-change="checkChange"
                            :check-strictly="true"
                            lazy
                            show-checkbox
                            ref="dataTree"
                        ></el-tree>
                        <!--
                      <el-tabs v-model="treeTab.active" type="card">
                        <el-tab-pane v-for="item in treeTab.data" :label="item.label" :key='item.value' :name="item.value">
                          <el-tree node-key="id" :load="loadNode" :props="tree.props" @check-change="checkChange" :check-strictly="true"
                                   lazy show-checkbox ref="dataTree">
                          </el-tree>
                        </el-tab-pane>
                      </el-tabs>
                    -->

                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="grid-content bg-purple-light">
                        <el-form
                            ref="form"
                            :model="dataMultiForm"
                            :rules="rules"
                            label-width="130px"
                            label-position="right"
                            size="small"
                        >
                            <el-form-item label="数据名称" prop="multiName">
                                <el-input
                                    style="max-width: 560px;"
                                    v-model="dataMultiForm.multiName"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="所属层面" prop="layType">
                                <el-select v-model="dataMultiForm.layType" placeholder="请选择">
                                    <el-option
                                        v-for="(item,index) in layData"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-switch
                                    v-model="dataMultiForm.enableFlag"
                                    active-color="#2d8cf0"
                                    inactive-color="#eee"
                                    active-value="0"
                                    inactive-value="1"
                                ></el-switch>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input
                                    style="max-width: 450px;"
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="dataMultiForm.remark"
                                ></el-input>
                            </el-form-item>
                            <!--
                            <el-form-item>
                              <el-alert title="提示 : 创建图表数据不能同时选择基础数据和算法数据,只能选择其中一种" type="warning" style="max-width: 560px;">
                              </el-alert>
                            </el-form-item>
                            -->
                            <el-form-item label="已选数据" prop="selectData">
                                <el-card
                                    class="box-card"
                                    style="max-width: 450px;"
                                    v-if="tree.checkData.length!==0"
                                >
                                    <div
                                        v-for="(item,index) in tree.checkData"
                                        :key="index"
                                        style="display: flex;justify-content: space-between;"
                                    >
                                        <el-tag
                                            style="cursor: pointer;margin-bottom: 20px;"
                                            closable
                                            @close="closeData(index,item.id)"
                                        >{{item.name}}</el-tag>
                                        <el-badge
                                            :value="item.yearInfo"
                                            :title="item.yearInfo"
                                            class="item"
                                            type="primary"
                                            style="margin-right: 100px;"
                                        >
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                @click.stop="setLevelFn(item.id)"
                                                style="width: 80px;height: 28px;"
                                            >设置维度</el-button>
                                        </el-badge>
                                    </div>
                                </el-card>
                            </el-form-item>
                            <el-form-item label="查询条件取值">
                                <el-radio v-model="dataMultiForm.queryValue" @change="previewChart()" label="0">交集</el-radio>
                                <el-radio v-model="dataMultiForm.queryValue" @change="previewChart()" label="1">并集</el-radio>
                            </el-form-item>
                            <el-form-item label="选择模式(可选)">
                                <el-radio v-model="dataMultiForm.radio" @change="previewChart()" label="10">
                                    默认模式
                                    <span style="color:#fff; margin-left: 12px;">默认模式0000000000000000</span>
                                </el-radio>
                                <el-radio v-model="dataMultiForm.radio" @change="previewChart()" label="1">
                                    图例反转模式
                                </el-radio>
                                <el-radio v-model="dataMultiForm.radio" @change="previewChart()" label="2">
                                    标签聚合模式
                                    <span style="color: #e6a23c; margin-left: 12px;">（提示：同一类标签才可聚合）</span>
                                </el-radio>
                                <el-radio v-model="dataMultiForm.radio" label="3">
                                    聚合函数图例模式
                                    <span style="color: #e6a23c; margin-left: 12px;">（提示：只能选择一条数据）</span>
                                </el-radio>
                            </el-form-item>
                            <el-form-item label="聚合函数图例属性" v-if="dataMultiForm.radio==='3'">
                                <div>
                                    <span>限制参数：</span>
                                    <el-input
                                        style="max-width: 200px;margin-left: 8px;"
                                        type="number"
                                        :min="1"
                                        v-model="dataMultiForm.aggrParams"
                                        placeholder="请输入大于0的数字"
                                    ></el-input>
                                </div>
                                <div style="margin-top: 30px;">
                                    <span>图例类型：</span>
                                    <el-select
                                        style="max-width: 200px;margin-left: 8px;"
                                        v-model="dataMultiForm.aggrType"
                                        @change="previewChart()"
                                        placeholder="请选择"
                                    >
                                        <el-option label="升序" value="0"></el-option>
                                        <el-option label="降序" value="1"></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-form-item style="margin-top: 50px;">
                                <el-button type="primary" @click="createFn">{{ submitInfo }}</el-button>
                                <el-button type="warning" @click="cancelFn">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div v-if="previewUrl" class="grid-content bg-purple-light" style="margin:5px;height:480px;margin-top:-7px;">
                        <object type="text/html" ref="iframe" v-bind:data="previewUrl" scrolling="no" width="100%" height="100%" frameborder="0">
                            <iframe ref="iframe" scrolling="no" v-bind:src="previewUrl" width="100%" height="100%" frameborder="0">
                                您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(急速模式)、火狐等主流浏览器。
                            </iframe>
                        </object>
                    </div>
                    <div v-if="!previewUrl">
                        <el-alert type="warning" closable="false" description="无数据" show-icon></el-alert>
                    </div>
                </el-col>
            </el-row>


            <div>
            <el-dialog
                    :close-on-click-modal="false"
                    title="选择时间"
                    :visible.sync="dimDialog.visible"
                    append-to-body>
                    <el-form
                        ref="dimDialog.form"
                        :model="dimDialog.form"
                        label-position="right"
                        label-width="130px"
                        size="small">
                        <el-form-item label="选择时间">
                            <el-select
                                multiple
                                collapse-tags
                                v-model="dimDialog.form.yearIds"
                                style="width: 100%;max-width: 300px;">
                                <el-option
                                    v-for="(item,index) in dimDialog.yearData"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="warning" @click="dimDialog.visible=false">取消</el-button>
                        <el-button type="primary" @click="keepFn">保存</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-dialog>




    </div>
</template>

<script>
import {
    fetchList,
    getObj,
    addMulti,
    putObj,
    delObj
} from "@/api/database/datamulti";
import { lazyloadDataBase } from "@/api/database/database";
import { getDims } from "@/api/database/dimension";
import { remote } from "@/api/admin/dict";
export default {
    name: "datamulti",
    data() {
        return {
          previewUrl:'',
          backHeader:{
            'background': '#f8f8f9'
          },
            submitInfo: "创建",
            title: "新增图表数据",
            isEdit: 0,
            tab: {
                active: "-1",
                layData: []
            },
            treeTab: {
              data: [{
                label: '基础数据',
                value: 0
              },
                {
                  label: '复式数据',
                  value: 1
                }
              ],
              active: 0
            },
            tableData: [],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10 // 每页显示多少条
            },
            tableLoading: false,
            params: {
                multiName: null
            },
            dialogFormVisible: false,
            tree: {
                props: {
                    label: "name",
                    children: "children",
                    isLeaf: true
                },
                layData: [],
                checkData: [] // 勾选的数据
            },
            dataMultiForm: {
                name: "",
                status: "0",
                remark: "",
                layType: "",
                queryValue: "0",
                radio: "10",
                aggrParams: "1", // 聚合函数图例限制参数
                aggrType: "0" // 聚合函数图例类型
            },
            dimDialog: {
                visible: false,
                form: {
                    yearIds: [],
                    dataId: "" // 当前点击设置维度数据的id
                },
                yearData: [],
                selectedData: []
            },
            multiId: null,
            layData:[],
            rules: {
                multiName: [
                    {
                        required: true,
                        message: "请输入数据名称"
                    }
                ],
                selectData: [
                    {
                        required: true,
                        message: "请选择数据"
                    }
                ],
                layType: [
                    {
                        required: true,
                        message: "请选择所属层面",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.getList(this.page, { layType: this.tab.active }); //获取列表
        this.getLayType(); //加载层面
    },
    mounted: function() {

    },
    computed: {},
    watch: {
        "tree.checkData": {
            handler(val) {
                var arr = [];
                this.$nextTick(() => {
                    for (var i in val) {
                        arr.push(val[i].id);
                    }
                    if (this.$refs.hasOwnProperty("dataTree")) {
                        this.$refs.dataTree.setCheckedKeys(arr, true);
                    }
                });
            },
            immediate: true
        } /*
      'tree.checkData': {
        handler(val) {
          var arr = []
          this.$nextTick(() => {
            for (var i in val) {
              arr.push(val[i].id)
            }
            this.$refs.dataTree[this.treeTab.active - 1].setCheckedKeys(arr)
          })
        },
        immediate: true
      }
        */

    },
    methods: {
        getList(page, params) {
            this.tableLoading = true;
            fetchList(
                Object.assign(
                    {
                        current: page.currentPage,
                        size: page.pageSize
                    },
                    params
                )
            ).then(response => {
                this.tableData = response.data.data.records;
                this.page.total = response.data.data.total;
                this.tableLoading = false;
            });
        },
        // 懒加载
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve(this.tree.layData);
            }
            if (node.level === 1) {
                var lays = node.data.id.split("-");
                var layType = lays[1];
                lazyloadDataBase(
                    Object.assign({
                        layType: layType,
                        parentId: 0,
                       // dataCategory: this.treeTab.active
                    })
                ).then(response => {
                    resolve(response.data.data);
                });
            }
            if (node.level > 1) {
                lazyloadDataBase(
                    Object.assign({
                        layType: node.data.layType,
                        parentId: node.data.id,
                        //dataCategory: this.treeTab.active
                    })
                ).then(response => {
                    resolve(response.data.data);
                });
            }
        },
        /**
         * @title 打开新增窗口
         * @detail 调用crud的handleadd方法即可
         *
         **/
        handleAdd: function() {
            let _this = this;
             _this.previewUrl = "";
            _this.dialogFormVisible = true;
            _this.submitInfo = "创建";
            _this.title = "新增图表数据";
            _this.isEdit = 0;
            _this.tree.checkData = []; //初始化左侧树型结构选择的数据
            _this.layData.forEach(e => {
                var lay = { id: "", name: "", disabled: true };
                lay.id = e.id + "-" + e.value;
                lay.name = e.label;
                lay.disabled = true;
                _this.tree.layData.push(lay);
            });
            _this.dataMultiForm = {
                name: "",
                status: "0",
                remark: "",
                layType: "",
                queryValue: "0",
                radio: "10", //默认
                aggrParams: "1",
                aggrType: "0",
                enableFlag: "0"
            }; //初始化dataMultiForm
            _this.dimDialog.selectedData = []
        },
        handleEdit(row, index) {
            this.submitInfo = "保存";
            this.title = "修改图表数据";
            this.isEdit = 1;
            this.multiId = row.multiId;
            getObj(row.multiId).then(res => {
                var data = res.data.data;

                this.dataMultiForm.multiName = data.multiName;
                this.dataMultiForm.layType = data.layType;
                this.dataMultiForm.remark = data.remark;
                this.dataMultiForm.enableFlag = data.enableFlag;
                this.dataMultiForm.queryValue = String(data.condUnion);

                this.dataMultiForm.aggrParams = data.aggrParams; // 聚合函数图例限制参数
                this.dataMultiForm.aggrType = data.aggrType; // 聚合函数图例类型

                this.tree.checkData = []; //初始化左侧树型结构选择的数据
                this.tab.layData.forEach(e => {
                    var lay = { id: "", name: "", disabled: true };
                    lay.id = e.id + "-" + e.value;
                    lay.name = e.label;
                    lay.disabled = true;
                    this.tree.layData.push(lay);
                });

                // 判断选择模式
                if (data.combinaeOrg === 1) {
                    // 标签聚合模式
                    this.dataMultiForm.radio = "2";
                } else if (data.legendInv === 1) {
                    // 图例反转模式
                    this.dataMultiForm.radio = "1";
                } else if (data.aggrFunc === 1) {
                    // 聚合函数图例模式
                    this.dataMultiForm.radio = "3";
                }
                var dataIds = [];
                var selectedData = [];
                if (data.details.length) {
                    for (var i = 0; i < data.details.length; i++) {
                        dataIds.push({
                            id: data.details[i].dataId,
                            name: data.details[i].dataName,
                            yearInfo: data.details[i].params
                        });
                        selectedData.push({
                            id: data.details[i].dataId,
                            params: data.details[i].params
                        });
                    }
                }
                this.tree.checkData = dataIds;
                this.dimDialog.selectedData = selectedData;
                this.dialogFormVisible = true;
                this.previewChart();
            });
        },
        previewChart:function(){
            var editObj = {
                details: this.dimDialog.selectedData,
                legendInv: this.dataMultiForm.radio === "1" ? 1 : 0, // 图例反转模式
                combinaeOrg: this.dataMultiForm.radio === "2" ? 1 : 0, // 标签聚合模式
                aggrFunc: this.dataMultiForm.radio === "3" ? 1 : 0, // 聚合函数图例
                aggrParams: this.dataMultiForm.radio === "3" ? this.dataMultiForm.aggrParams : "1", // 聚合函数图例限制参数
                aggrType:this.dataMultiForm.radio === "3"? this.dataMultiForm.aggrType: 0, // 聚合函数图例类型
                condUnion: this.dataMultiForm.queryValue // 查询条件取值
            };
            if(this.dimDialog.selectedData.length != 0){
                this.previewUrl = '/static/dragging/editView.html?from=' + JSON.stringify(editObj);
            }
        },
        handleDel: function(row, index) {
            var _this = this;
            this.$confirm(
                "是否确认删除名称为'" + row.multiName + "'的图表数据吗",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(function() {
                    return delObj(row.multiId);
                })
                .then(data => {
                    _this.tableData.splice(index, 1);
                    _this.$message({
                        showClose: true,
                        message: "删除成功",
                        type: "success"
                    });
                    this.getList(this.page);
                })
                .catch(function(err) {});
        },
        closeData(index, id) {
            this.tree.checkData[index].yearInfo = "";
            this.tree.checkData.splice(index, 1);
            for (var u in this.dimDialog.selectedData) {
                // 如果移除了该数据则变更设置的维度数据
                if (id === this.dimDialog.selectedData[u].id) {
                    this.dimDialog.selectedData.splice(u, 1);
                }
            }
            //预览
            this.previewChart();
        },
        keepFn() {
            for (var item of this.dimDialog.selectedData) {
                if (item.id === this.dimDialog.form.dataId) {
                    item.params = this.dimDialog.form.yearIds.join(",");
                    break;
                }
            }
            for (var items of this.tree.checkData) {
                if (this.dimDialog.form.dataId === items.id) {
                    items.yearInfo = this.dimDialog.form.yearIds.join(",");
                }
            }
            this.dimDialog.form.yearIds = [];
            this.dimDialog.visible = false;
            //预览
            this.previewChart();
        },
        judgePass(v) {
            if (v.length === 0) {
                return true;
            }
            if (this.dataMultiForm.multiName === "") {
                return true;
            }
            if (this.dataMultiForm.layType === "") {
                return true;
            }
            if (/^\s*$/g.test(this.dataMultiForm.multiName)) {
                return true;
            }
            return false;
        },
        // 创建或者保存按钮
        createFn() {
            var idData = [];
            for (var i in this.tree.checkData) {
                idData.push(this.tree.checkData[i].id);
            }
            if (this.judgePass(idData)) {
                this.$message({ type: "info", message: "有红色星号标注的为必填项，请输入完整信息" });
            } else {
                if ( idData.length === 1 && this.dimDialog.selectedData[0].params === "" ) {
                    this.$message({type: "info",message: "请为该条图表数据选择维度数据"});
                } else {
                    if (this.isEdit === 1) {
                        /*
                      var baseData = []
                      var countData = []
                      var selData = this.dimDialog.selectedData;
                      if(selData){
                            for (var item2 in selData) {
                                if (selData[item2].active === '1') {
                                    baseData.push(selData[item2].active)
                                } else {
                                    countData.push(selData[item2].active)
                                }
                            }
                      }
                      if (baseData.length && countData.length) {
                        this.$message({
                          type: 'info',
                          message: '创建图表数据不能同时选择基础数据和算法数据,只能选择其中一种'
                        })
                      } else { */

                        // 编辑
                        var editObj = {
                            multiId: this.multiId,
                            multiName: this.dataMultiForm.multiName.replace(/\s/g,""),
                            remark: this.dataMultiForm.remark,
                            enableFlag: Number(this.dataMultiForm.status),
                            ids: idData.join(","),
                            details: JSON.stringify(
                                this.dimDialog.selectedData
                            ),
                            layType: this.dataMultiForm.layType,
                            legendInv: this.dataMultiForm.radio === "1" ? 1 : 0, // 图例反转模式
                            combinaeOrg:this.dataMultiForm.radio === "2" ? 1 : 0, // 标签聚合模式
                            aggrFunc: this.dataMultiForm.radio === "3" ? 1 : 0, // 聚合函数图例
                            aggrParams:this.dataMultiForm.radio === "3"? this.dataMultiForm.aggrParams: "1", // 聚合函数图例限制参数
                            aggrType:this.dataMultiForm.radio === "3"? this.dataMultiForm.aggrType: 0, // 聚合函数图例类型
                            condUnion: this.dataMultiForm.queryValue // 查询条件取值
                        };
                        //console.log(JSON.stringify(editObj))
                        if (this.dataMultiForm.radio === "3" && idData.length === 1 ) {
                            // 选择聚合函数图例模式且数据为一条时
                            addMulti(editObj).then(data => {
                                if (data.data.code === 0) {
                                this.$message({ type: "success",message: "编辑图表数据成功"});
                                } else {
                                this.$message({ type: "info",message: "编辑图表数据失败"});
                                }
                                this.dialogFormVisible = false;
                                this.getList(this.page, {
                                layType: this.tab.active
                                }); //获取列表
                            });
                        } else if ( this.dataMultiForm.radio === "1" || this.dataMultiForm.radio === "2" || this.dataMultiForm.radio === "10") {
                            addMulti(editObj).then(data => {
                                //console.log(data.data.code)
                                if (data.data.code === 0) {
                                this.$message({ type: "success", message: "编辑图表数据成功" });
                                } else {
                                this.$message({ type: "info", message: "编辑图表数据失败" });
                                }
                                this.dialogFormVisible = false;
                                this.getList(this.page, { layType: this.tab.active }); //获取列表
                            });
                        } else {
                            this.$message({type: "info",message: "聚合函数图例模式只能选择一条数据"});
                        }
                    //  }
                    } else if (this.isEdit === 0) {
                        /*
                      var baseData2 = []
                      var countData2 = []
                      var selData = this.dimDialog.selectedData;
                      if(selData){
                            for (var item2 in selData) {
                                if (selData[item2].active === '1') {
                                    baseData2.push(selData[item2].active)
                                } else {
                                    countData2.push(selData[item2].active)
                                }
                            }
                      }
                      if (baseData2.length && countData2.length) {
                        this.$message({
                          type: 'info',
                          message: '创建图表数据不能同时选择基础数据和算法数据,只能选择其中一种'
                        })
                      } else {
                          */
                        // 新增
                        var addObj = {
                            multiName: this.dataMultiForm.multiName.replace(/\s/g,""),
                            remark: this.dataMultiForm.remark,
                            enableFlag: Number(this.dataMultiForm.status),
                            ids: idData.join(","),
                            details: JSON.stringify(
                                this.dimDialog.selectedData
                            ),
                            layType: this.dataMultiForm.layType,
                            legendInv: this.dataMultiForm.radio === "1" ? 1 : 0, // 图例反转模式
                            combinaeOrg:this.dataMultiForm.radio === "2" ? 1 : 0, // 标签聚合模式
                            aggrFunc: this.dataMultiForm.radio === "3" ? 1 : 0, // 聚合函数图例
                            aggrParams:this.dataMultiForm.radio === "3" ? this.dataMultiForm.aggrParams: 1, // 聚合函数图例限制参数
                            aggrType:this.dataMultiForm.radio === "3" ? this.dataMultiForm.aggrType: 0, // 聚合函数图例类型
                            condUnion: this.dataMultiForm.queryValue // 查询条件取值
                        };
                        //console.log(JSON.stringify(addObj))
                        if (this.dataMultiForm.radio === "3" && idData.length === 1) {
                            // 选择聚合函数图例模式且数据为一条时
                            addMulti(addObj).then(data => {
                                if (data.data.code === 0) {
                                this.$message({type: "success", message: "新增图表数据成功" });
                                } else {
                                this.$message({ type: "info", message: "新增图表数据失败"});
                                }
                                this.dialogFormVisible = false;
                                this.getList(this.page, {layType: this.tab.active}); //获取列表
                            });
                        } else if (this.dataMultiForm.radio === "1" ||this.dataMultiForm.radio === "2" || this.dataMultiForm.radio === "10" ) {
                            addMulti(addObj).then(data => {
                                if (data.data.code === 0) {
                                this.$message({type: "success",message: "新增图表数据成功" });
                                } else {
                                this.$message({type: "info",message: "新增图表数据失败"});
                                }
                                this.dialogFormVisible = false;
                                this.getList(this.page, { layType: this.tab.active }); //获取列表
                            });
                        } else {
                            this.$message({type: "info", message: "聚合函数图例模式只能选择一条数据"});
                        }
                      //}

                    }
                }
            }
        },
        cancelFn() {
            this.$confirm("执行此操作将不会保存页面的内容, 是否继续?", "提示", {
                confirmButtonText: "确 定",
                cancelButtonText: "取 消",
                type: "warning",
                closeOnClickModal: false
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "取消成功"
                    });
                    this.dialogFormVisible = false;
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消操作"
                    });
                });
        },
        /**
         * 刷新回调
         */
        refreshChange() {
            this.params.multiName = '';
            this.getList(this.page);
        },
        getLayType() {
            remote("lay_type").then(response => {
                this.tab.layData.push({label:'全部',value:'-1'});
                response.data.data.forEach(e=>{
                  this.tab.layData.push(e);
                  var lay = {label:'',value: null};
                  lay.label = e.label;
                  lay.value = parseInt(e.value);
                  this.layData.push(lay);
                });
            });
        },
        tabClick(tab) {
            this.page.currentPage = 1;
            this.params.layType = tab;
            this.getList(this.page, this.params);
        },
        changePage(num) {
            this.page.currentPage = num;
            this.search.layType = this.tab.active;
            this.getList(this.page, this.search);
        },
        changeSize(size) {
            this.page.pageSize = size;
            this.search.layType = this.tab.active;
            this.getList(this.page, this.search);
        },
        searchChange() {
            this.params.layType = this.tab.active;
            this.getList(this.page, this.params);
        },
        // 勾选树节点
        checkChange(data, isCheck) {
            if (isCheck) {
                // 如果是勾选状态则添加数据
                this.tree.checkData.push(data); // 显示已选数据
                this.dimDialog.selectedData.push({
                    id: data.id,
                    params: ""
                });
                //数据预览
                this.previewChart();

            } else {
                // 不是勾选状态则删除数据
                for (var i in this.tree.checkData) {
                    if (data.id === this.tree.checkData[i].id) {
                        this.tree.checkData[i].yearInfo = "";
                        this.tree.checkData.splice(i, 1);
                    }
                }
                for (var j in this.dimDialog.selectedData) {
                    if (this.dimDialog.selectedData[j].id === data.id) {
                        this.dimDialog.selectedData.splice(j, 1);
                    }
                }
            }
        },
        setLevelFn(id) {
            this.dimDialog.form.dataId = id; // 点击某条数据获取赋值id
            getDims(id).then(res => {
                //console.log(res.data);
                if (res.data.data.length) {
                    this.dimDialog.yearData = res.data.data; // 维度数据
                    this.dimDialog.visible = true;
                } else {
                    this.$message({
                        type: "info",
                        message: "该数据没有包含相关维度信息"
                    });
                }
            });
            if (this.dimDialog.selectedData.length) {
                // 点击数据回显维度信息
                for (var item of this.dimDialog.selectedData) {
                    if (id === item.id) {
                        if (item.params === "") {
                            this.dimDialog.form.yearIds = [];
                        } else {
                            this.dimDialog.form.yearIds = item.params.split(
                                ","
                            );
                        }
                    }
                }
            }
        }
    },
    filters: {
        statusFilter(value) {
            var output = "";
            switch (value) {
                case "1":
                    output = "danger";
                    break;
                case "0":
                    output = "success";
                    break;
            }
            return output;
        },
        isStatus(value) {
            var output = "";
            switch (value) {
                case "0":
                    output = "启用";
                    break;
                case "1":
                    output = "禁用";
                    break;
            }
            return output;
        }
    }
};
</script>

<style scoped>

</style>
