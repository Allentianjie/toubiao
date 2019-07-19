<template>
    <Modal v-model="basicData.state" width="50%" :mask-closable="false" @on-cancel="closeModal">
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>指标数据管理</span>
        </p>
        <div>
            <div class="M_search">
                <Input placeholder="名称" v-model="search.dataName" style="width: auto"/>
                <!--<Input placeholder="用户名" v-model="search.createName" style="width: auto"/>-->
                <Input
                    placeholder="选择所属部门"
                    @on-focus="showDepFocus('dep')"
                    v-model="search.deptName"
                    style="width: auto"
                />
                <Button type="primary" icon="ios-search" @click="searchBtn">搜 索</Button>
                <Button icon="ios-trash" @click="emptyBtn">清 空</Button>
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

                <Button class="funBtn" type="primary" @click="AddData('add')" icon="ios-add">新增</Button>
            </div>
            <div class="tableHeight">
                <el-table
                    class="table_Box"
                    :data="tableData"
                    :cell-style="heightGg"
                    v-loading="tableData.loading"
                    fit
                    highlight-current-row
                >
                    <el-table-column label width="65">
                        <template slot-scope="scope">
                            <el-radio
                                :label="scope.row.dataId"
                                v-model="templateRadio"
                                @change.native="getTemplateRow(scope.$index,scope.row)"
                            >&nbsp;</el-radio>
                        </template>
                    </el-table-column>

                    <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                    <el-table-column
                        label="名称"
                        show-overflow-tooltip
                        prop="dataName"
                        align="center"
                    ></el-table-column>
                    <!-- <el-table-column label="父级"  show-overflow-tooltip  prop="parentName" align="center"></el-table-column>
            <el-table-column label="类型"  align="center">
              <template slot-scope="scope">
                <span>{{scope.row.dataType | dataTypeFilter}}</span>
              </template>
                    </el-table-column>-->
                    <el-table-column label="类型" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.dataType | dataTypeFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" prop="dataUnit" align="center"></el-table-column>
                    <el-table-column
                        label="部门"
                        show-overflow-tooltip
                        prop="deptName"
                        align="center"
                    ></el-table-column>
                    <!--<el-table-column
                        label="创建人"
                        show-overflow-tooltip
                        prop="createName"
                        align="center"
                    ></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>-->
                    <!-- <el-table-column label="状态" align="center" width="100">
              <template slot-scope="scope">
                <span style="color:#19be6b" v-if="scope.row.enableFlag === '0'">启用</span>
                <span v-else style="color:#ed4014">禁用</span>

              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="text"
                           icon="el-icon-view"
                           size="mini"
                           plain
                           @click="viewData(scope.row)">查看</el-button>
                <el-button type="text"
                           icon="el-icon-edit"
                           size="mini"
                           plain
                           @click="EditData(scope.row)">编辑</el-button>

                <el-button type="text"
                           icon="el-icon-delete"
                           size="mini"
                           style="color:#f04409"
                           plain
                           f04409
                           @click="remove(scope.row)">删除</el-button>
                <el-button type="text"
                           icon="el-icon-plus"
                           size="mini"
                           plain
                           @click="addChild(scope.row)">添加子级</el-button>
                <el-button type="text"
                           icon="el-icon-tickets"
                           size="mini"
                           plain
                           @click="numManage(scope.row)"
                >数值管理</el-button>
              </template>
                    </el-table-column>-->
                </el-table>
            </div>

            <div class="pagination-container">
                <el-pagination
                    background
                    @size-change="changeSize"
                    @current-change="changePage"
                    :current-page="page.currentPage"
                    :page-sizes="[10,20,30,40]"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                ></el-pagination>
            </div>
            <!-- 新增修改基础数据框 -->
            <Modal v-model="showModel" class-name="basisModal" width="30">
                <p slot="header">
                    <span>{{title}}</span>
                </p>
                <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="80"
                >
                    <Row class="addClass">
                        <Col span="12">
                            <FormItem label="名称" prop="dataName">
                                <Input v-model="formValidate.dataName" placeholder="请输入名称"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="父级" prop="parentName">
                                <Input
                                    @on-focus="showDataFocus('parent')"
                                    v-model="formValidate.parentName"
                                    placeholder="请选择父级数据"
                                ></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="部门" prop="deptName">
                                <Input
                                    @on-focus="showDepFocus('Modaldep')"
                                    v-model="formValidate.deptName"
                                    placeholder="请选择所属部门"
                                ></Input>
                            </FormItem>
                        </Col>
                        <Col span="12" v-if="visParent">
                            <FormItem label="层面" prop="layType">
                                <!--<Input v-model="formValidate.lay" placeholder="请选择层面"></Input>-->
                                <Select v-model="formValidate.layType" placeholder="请选择层面">
                                    <Option
                                        v-for="(item,index) in tab.layData"
                                        :label="item.label"
                                        :key="index"
                                        :value="item.value"
                                    ></Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12" v-if="visParent">
                            <FormItem label="标识" prop="identName">
                                <Input v-model="formValidate.identName" placeholder="请输入标识"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12" v-if="visParent">
                            <FormItem label="类型" prop="dataType">
                                <!--<Input v-model="formValidate.lay" placeholder="请选择层面"></Input>-->
                                <Select v-model="formValidate.dataType" placeholder="请选择类型">
                                    <Option value="0">整数</Option>
                                    <Option value="1">小数</Option>
                                    <Option value="2">百分比</Option>
                                    <Option value="3">千分比</Option>
                                    <Option value="4">比列</Option>
                                    <Option value="5">布尔</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12" v-if="visParent">
                            <FormItem label="单位" prop="dataUnit">
                                <Input v-model="formValidate.dataUnit" placeholder="请输入单位"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12" v-if="visParent">
                            <FormItem label="示例" prop="dataEg">
                                <Input v-model="formValidate.dataEg" placeholder="请输入示例"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12" v-if="visParent">
                            <FormItem label="汇总方式" prop="summaryMode">
                                <Select v-model="formValidate.summaryMode" placeholder="请选择类型">
                                    <Option value="0">自动</Option>
                                    <Option value="1">其他</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="状态">
                                <i-switch v-model="switch1" @on-change="change"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer" class="basisFooter">
                    <div class="btn">
                        <!--<Button v-if="title === '查看'" type="primary" @click="handleSubmit('look')">确定1</Button>-->
                        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                        <Button type="warning" size="large" @click="handleResets('formValidate')">重置</Button>
                    </div>
                </div>
            </Modal>
            <!-- 查看对话框 -->
            <Modal v-model="viewModel" class-name="basisModal" width="50">
                <p slot="header">
                    <span>查看基础数据详情</span>
                </p>
                <Form ref="viewForm" :model="viewForm" :label-width="80">
                    <Row class="addClass">
                        <Col span="12">
                            <FormItem label="名称" prop="dataName">
                                <Input disabled="disabled" v-model="viewForm.dataName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="父级" prop="parentName">
                                <Input disabled="disabled" v-model="viewForm.parentName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="部门" prop="deptName">
                                <Input disabled="disabled" v-model="viewForm.deptName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="层面" prop="layType">
                                <Input disabled="disabled" v-model="viewForm.layType"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="标识" prop="identName">
                                <Input disabled="disabled" v-model="viewForm.identName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="类型" prop="dataType">
                                <Input disabled="disabled" v-model="viewForm.dataType"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="单位" prop="dataUnit">
                                <Input disabled="disabled" v-model="viewForm.dataUnit"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="示例" prop="dataEg">
                                <Input disabled="disabled" v-model="viewForm.dataEg"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="创建人">
                                <Input disabled="disabled" v-model="viewForm.createName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="创建时间">
                                <Input disabled="disabled" v-model="viewForm.createTime"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="修改人">
                                <Input disabled="disabled" v-model="viewForm.updateName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="修改时间">
                                <Input disabled="disabled" v-model="viewForm.updateTime"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="状态">
                                <Input disabled="disabled" v-model="viewForm.enableFlag"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer" class="basisFooter">
                    <div class="btn">
                        <Button @click="viewModel=false">返回</Button>
                    </div>
                </div>
            </Modal>
            <!--部门树形弹框-->
            <Modal v-model="depModel" class-name="depModal" width="30">
                <p slot="header">
                    <span>请选择部门</span>
                </p>
                <div class="userTree">
                    <!--<Input v-model="searchDeptTree"  placeholder="请输入需要搜索的内容" style="width: 100%" />
                    <Tree :baseData="deptData" @fSelectTreeData="setDept" :showBox="false"></Tree>-->
                    <el-input placeholder="输入关键字进行过滤" v-model="searchDeptTree"></el-input>
                    <el-tree
                        class="filter-tree"
                        :data="deptData"
                        :props="defaultProps"
                        :filter-node-method="filterNode1"
                        :default-expanded-keys="[1]"
                        node-key="id"
                        @node-click="handleNodeClick"
                        ref="deptTree"
                    ></el-tree>
                </div>
                <div slot="footer" class="basisFooter">
                    <div class="btn">
                        <Button type="primary" @click="depModel = false">确定</Button>
                    </div>
                </div>
            </Modal>
            <!--数据树形弹框-->
            <Modal v-model="dataModel" class-name="depModal" width="30">
                <p slot="header">
                    <span>请选择数据</span>
                </p>
                <div class="userTree">
                    <el-input placeholder="输入关键字进行过滤" v-model="searchDataTree"></el-input>
                    <el-tree
                        class="filter-tree"
                        :data="baseData"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        @node-click="handleDataNodeClick"
                        ref="dataTree"
                    ></el-tree>
                </div>
                <div slot="footer" class="basisFooter">
                    <div class="btn">
                        <Button type="primary" @click="dataModel = false">确定</Button>
                    </div>
                </div>
            </Modal>
            <!--编辑/修改弹窗-->
            <Modal v-model="editModel" class-name="basisModal" width="50">
                <p slot="header">
                    <span>{{title}}</span>
                </p>
                <!--编辑的内容-->
                <Form
                    class="editModal"
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="80"
                >
                    <Row class="addClass">
                        <Col span="12">
                            <FormItem label="名称" prop="dataName">
                                <Input v-model="formValidate.dataName" placeholder="请输入名称"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="部门" prop="deptName">
                                <Input
                                    @on-focus="showDepFocus('Modaldep')"
                                    v-model="formValidate.deptName"
                                    placeholder="请选择所属部门"
                                ></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="状态">
                                <i-switch v-model="switch1" @on-change="change"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer" class="basisFooter">
                    <div class="btn">
                        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                        <Button @click="editModel = false" style="margin-left: 8px">取消</Button>
                    </div>
                </div>
            </Modal>
        </div>
        <div slot="footer" style="text-align: center">
            <Button type="primary" size="large" @click="handleSubmits()">确认选择</Button>
            <Button type="warning" size="large" @click="handleReset()">重置</Button>
        </div>
    </Modal>
</template>

<script>
import Tree from "@/components/tree";
import {
    fetchList,
    fetchValueList,
    getObj,
    addObj,
    putObj,
    delObj,
    getTree
} from "@/api/database/database";
import { remote } from "@/api/admin/dict";
import { fetchDeptTree, fetchTree } from "@/api/admin/dept";
//import Table from '@/components/table'
import store from "@/store";
export default {
    components: { Tree },
    props: {
        basicData: {
            type: Object,
            required: true
        }
    },
    name: "index",
    data() {
        return {
            templateRadio: [],
            selections: [],
            heightGg: {
                padding: "4px 0"
            },
            tab: {
                //tab标签
                active: "1",
                layData: []
            },
            visParent: true, //添加父级数据时显示相关字段，添加子级则隐藏
            switch1: true, // switch开关状态
            editModel: false, // 修改编辑弹窗
            viewModel: false, //查看弹窗
            depModel: false, // 部门树形弹窗
            dataModel: false, // 数据树形弹窗
            searchDeptTree: "", // 部门搜索框绑定值
            searchDataTree: "", // 数据搜索框绑定值
            deptForcsType: "dep",
            TreeModal: "", // 判断是那个的树形弹框
            disabled: false, // 查看输入框不可用
            deptData: [], // 部门树形数据赋值
            baseData: [], //数据树型数据
            tableLoading: false,
            search: {
                dataName: "", // 名称
                createName: "", // 用户名
                deptId: null, // 部门ID
                deptName: "",
                layType: null
            }, // 搜索三个输入框内容绑定
            formValidate: {
                parentId: "", // 父级ID
                deptName: "", // 部门N
                deptId: "", // 部门N
                dataName: "", // 名称-
                dataType: "", // 类型-
                dataUnit: "", // 单位-
                enableFlag: 0,
                layType: null, // 层面 -
                identId: null, //标识id
                identName: "", // 标识-
                dataEg: "" // 示例-
            }, // 新增的绑定值
            viewForm: {
                parentName: "", // 父级name
                depName: "", // 部门N
                dataName: "", // 名称-
                dataType: null, // 类型-
                dataUnit: "", // 单位-
                createName: "", // 创建人-
                createTime: "", // 创建时间-
                enableFlag: "", // 状态-
                layType: null, // 层面 -
                identName: "", // 标识-
                dataEg: "", // 示例-
                updateName: "", // 修改人-
                updateTime: "" // x修改时间-
            },
            ruleValidate: {
              dataName: [
                {
                  required: true,
                  message: "请输入数据名称",
                  trigger: "blur"
                }
              ],
              deptName: [
                {
                  required: true,
                  message: "请选择部门",
                  trigger: "blur"
                }
              ],
              dataType: [
                {
                  required: true,
                  message: "请选择数据类型",
                  trigger: "change"
                }
              ],
              layType: [
                {
                  required: true,
                  message: "请选择所属层面",
                  trigger: "change"
                },
              ],
              summaryMode: [
                {
                  required: true,
                  message: "请选择汇总类型",
                  trigger: "change"
                }
              ]
            }, // form验证
            showModel: false, // 新增、修改的弹窗
            tableData: [],
            title: "新增", // 弹窗的title
            formChildren: {
                name: "",
                depName: "", // 部门N
                depId: "" // 部门N
            }, // 新增子级的绑定值
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10 // 每页显示多少条
            },
            defaultProps: {
                children: "children",
                label: "name"
            }
        };
    },
    created() {},
    methods: {
        loadingData() {
            console.log("基础数据" + JSON.stringify(this.basicData));
            this.getLayType(); //加载层面
            this.getList(this.page, {
                layType: this.tab.active,
                parentId: this.basicData.parentId,
                identId: this.basicData.identId
            }); //获取列表
            //this.getDeptTree();
        },
        //选中哪一行
        getTemplateRow(index, row) {
            //获取选中数据
            this.selections = [];
            this.selections = row;
            console.log(this.selections);
        },
        //关闭
        closeModal() {
            console.log("关闭了");
            //把选中的传过去 顺便关闭modal
            let data = [];
            this.$emit("closeBasicData", data);
            console.log(data);
        },
        //保存
        handleSubmits() {
            // 上面选中了文件  存在 this.selections里
            console.log("关闭了");
            //把选中的传过去 顺便关闭modal
            let data = this.selections;
            console.log(data);
            this.$emit("closeBasicData", data);
            this.templateRadio = [];
        },
        //重置
        handleResets(name) {
            this.selections = [];
            this.$refs[name].resetFields();
        },

        filterNode(value, data) {
            console.log(data);
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        filterNode1(value, data) {
            console.log(data);
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        getLayType() {
            /* let _this = this;
             this.$Get('/admin/dict/type/lay_type', null, function (data) {
               _this.tab.layData = data.data;
             })*/
            remote("lay_type").then(response => {
                this.tab.layData = response.data.data;
            });
        },
        getList(page, params) {
            this.tableLoading = true;
            this.tableData = [];
            fetchValueList(
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
        getDeptTree() {
            /* let _this = this;
             this.$Get('/admin/dept/tree', null, function (data) {
               _this.deptData = data.data;
             })*/
            this.deptData = store.state.chooseDataScopeDept;
            // fetchTree().then(response => {
            //     console.log(response.data.data);
            //     this.deptData = response.data.data;
            // });
        },
        getDataTree() {
            /*let _this = this;
            this.$Get('/admin/database/tree/'+ this.tab.active, null, function (data) {
              console.log(data);
              _this.baseData = data.data;
            })*/
        },
        // 部门树形选择候的数据返回
        setDept(data) {
            if (this.TreeModal === "dep") {
                this.search.deptName = data[0].title;
                this.search.deptId = data[0].id;
            } else if (
                this.TreeModal === "Modaldep" ||
                this.TreeModal === "ModalChild"
            ) {
                this.formChildren.deptName = this.formValidate.deptName =
                    data[0].title;
                this.formChildren.deptId = this.formValidate.deptId =
                    data[0].id;
            }
        },
        // 数据树形选择候的数据返回
        setData(data) {
            console.log(data);
            this.formValidate.parentName = data[0].title;
            this.formValidate.parentId = data[0].id;
        },
        // 输入框获取焦点-树形弹窗
        showDepFocus(type) {
            //this.checkDeptData = {};
            // fetchTree().then(response => {
            //     if (response.data.code == 0) {
            //         this.deptData = response.data.data;
            //         this.depModel = true;
            //         this.TreeModal = type;
            //     } else {
            //         this.$Message.error(
            //             "获取部门组织失败，失败原因：" + response.data.msg
            //         );
            //     }
            // });
            this.deptData = store.state.chooseDataScopeDept;
            this.depModel = true;
            this.TreeModal = type;
            if (type == "dep") {
                //条件查询
                this.deptForcsType = "dep";
            } else {
                //新增操作
                this.deptForcsType = "Modaldep";
            }
        },
        // 输入框获取焦点-树形弹窗
        showDataFocus() {
            getTree(this.tab.active).then(response => {
                if (response.data.code == 0) {
                    this.baseData = response.data.data;
                    this.dataModel = true;
                    this.title = "请选择数据";
                } else {
                    this.$Message.error(
                        "获取数据失败，失败原因：" + response.data.msg
                    );
                }
            });
        },
        // 状态开关
        change(status) {
            this.formValidate.enableFlag = status === false ? 1 : 0;
        },
        // 搜索按钮
        searchBtn() {
            this.search.layType = this.tab.active;
            this.search.parentId = this.basicData.parentId;
            this.search.identId = this.basicData.identId;
            this.getList(this.page, this.search);
        },
        // 清空按钮
        emptyBtn() {
            this.search.dataName = "";
            this.search.createName = "";
            this.search.deptName = "";
            this.search.deptId = null;
            this.search.layType = this.tab.active;
            //this.getList(this.page, { layType: this.tab.active })
            this.getList(this.page, {
                layType: this.tab.active,
                parentId: this.basicData.parentId,
                identId: this.basicData.identId
            }); //获取列表
        },
        // 弹框确认
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$Message.success("数据填写正确，正在存储!");
                    this.showModel = false;
                } else {
                    this.$Message.error("有红色星号标注的为必填项，请输入完整信息!");
                }
            });

            this.formValidate.enableFlag = this.switch1 ? 0 : 1;
            addObj(this.formValidate).then(data => {
                if (data.data.code == 0) {
                    this.$message({
                        showClose: true,
                        message: "保存成功",
                        type: "success"
                    });
                    if (this.title === "新增") {
                        this.showModel = false;
                    } else {
                        this.editModel = false;
                    }

                    this.getList(this.page, {
                        layType: this.tab.active,
                        parentId: this.basicData.parentId,
                        identId: this.basicData.identId
                    });
                } else {
                    this.$Message.error("保存失败，失败原因：" + data.data.msg);
                }
            });
        },
        // 取消新增内容
        handleReset(name) {
            console.log(1, name);
            this.showModel = false;
            if (this.title === "新增") {
                this.$refs[name].resetFields();
            }
        },
        // 新增add
        AddData(params) {
            this.searchDeptTree = ""; // 部门搜索框绑定值
            this.searchDataTree = ""; // 数据搜索框绑定值
            this.visParent = true;
            this.title = "新增";
            this.showModel = true;
            this.switch1 = true;
            this.formValidate.parentId = 0;
            this.formValidate.parentName = "";
            this.formValidate.deptName = "";
            this.formValidate.deptId = null;
            this.formValidate.dataName = "";
            this.formValidate.dataType = null;
            this.formValidate.dataUnit = "";
            this.formValidate.enableFlag = 1;
            this.formValidate.layType = null;
            this.formValidate.identName = "";
            this.formValidate.dataEg = "";
            //this.getDataTree();//加载数据树
        },
        //修改
        EditData(params) {
            this.searchDeptTree = ""; // 部门搜索框绑定值
            this.searchDataTree = ""; // 数据搜索框绑定值
            this.title = "修改";
            this.editModel = true;
            this.switch1 = params.enableFlag == 1 ? false : true;
            (this.formValidate.parentId = null),
                (this.formValidate.parentName = "");
            this.formValidate.deptName = params.deptName;
            this.formValidate.deptId = params.deptId;
            this.formValidate.dataName = params.dataName;
            this.formValidate.dataType = params.dataType;
            this.formValidate.dataUnit = params.dataUnit;
            this.formValidate.enableFlag = params.enableFlag;
            this.formValidate.layType = params.layType;
            this.formValidate.identName = params.identName;
            this.formValidate.dataEg = params.dataEg;
            this.formValidate.dataId = params.dataId;
        },
        viewData(params) {
            this.viewModel = true;
            getObj(params.dataId).then(data => {
                this.viewForm = data.data.data;
                this.tab.layData.forEach(e => {
                    if (this.viewForm.layType == e.value) {
                        this.viewForm.layType = e.label;
                    }
                });
                //this.viewForm.layType = this.tab.layData[data.data.layType-1].label
                this.viewForm.enableFlag =
                    data.data.data.enableFlag === "0" ? "正常" : "禁用";
                this.viewForm.summaryMode =
                    data.data.data.summaryMode === "0" ? "自动" : "其他";
                var output = "";
                switch (data.data.data.dataType) {
                    case 0:
                        output = "整数";
                        break;
                    case 1:
                        output = "小数";
                        break;
                    case 2:
                        output = "百分比";
                        break;
                    case 3:
                        output = "千分比";
                        break;
                    case 4:
                        output = "比例";
                        break;
                    case 5:
                        output = "布尔";
                        break;
                }
                this.viewForm.dataType = output;
            });
        },
        // 删除弹窗
        remove(params) {
            var _this = this;
            this.$confirm(
                "是否确认删除名称为'" + params.dataName + "'的数据吗？",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(function() {
                    return delObj(params.dataId);
                })
                .then(data => {
                    if (data.data.code === 0) {
                        _this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: "success"
                        });
                        _this.getList(this.page, { layType: this.tab.active });
                    } else {
                        _this.$message({
                            showClose: true,
                            message: "删除失败，失败原因：" + data.data.msg,
                            type: "error"
                        });
                    }
                })
                .catch(function(err) {});
        },
        // 添加子级
        addChild(params) {
            this.title = "新增子级数据";
            this.visParent = false;
            this.showModel = true;
            this.formValidate.parentId = params.dataId;
            this.formValidate.deptName = "";
            this.formValidate.deptId = "";
            this.formValidate.dataName = "";
            this.formValidate.dataType = params.dataType;
            this.formValidate.dataUnit = params.dataUnit;
            this.formValidate.enableFlag = 1;
            this.formValidate.layType = params.layType;
            this.formValidate.identId = params.identId;
            this.formValidate.identName = params.identName;
            this.formValidate.dataEg = params.dataEg;
            this.fromValidata.summaryMode = params.summaryMode;
        },
        // 数值管理跳转页面
        numManage(params) {
            this.$router.push({
                path: "/valueIndex",
                query: { dataId: params.dataId, deptId: params.deptId }
            });
        },
        tabClick(tab) {
            this.tab.active = tab;
            this.search.layType = tab;
            this.baseData = [];
            this.page.currentPage = 1;
            this.getList(this.page, {
                layType: this.tab.active,
                parentId: this.basicData.parentId,
                identId: this.basicData.identId
            }); //获取列表
        },
        changePage(num) {
            this.page.currentPage = num;
            this.search.layType = this.tab.active;
            this.search.parentId = this.basicData.parentId;
            this.search.identId = this.basicData.identId;
            this.getList(this.page, this.search);
        },
        changeSize(size) {
            this.page.pageSize = size;
            this.search.layType = this.tab.active;
            this.search.parentId = this.basicData.parentId;
            this.search.identId = this.basicData.identId;
            this.getList(this.page, this.search);
        },
        handleNodeClick(data) {
            if (this.deptForcsType === "dep") {
                this.search.deptId = data.id;
                this.search.deptName = data.name;
            } else {
                this.formValidate.deptName = data.name;
                this.formValidate.deptId = data.id;
            }
        },
        handleDataNodeClick(data) {
            this.formValidate.parentName = data.name;
            this.formValidate.parentId = data.id;
            this.visParent = false;
            this.formValidate.layType = data.layType;
            this.formValidate.dataType = data.dataType;
            this.formValidate.dataUnit = data.dataUnit;
            this.formValidate.dataEg = data.dataEg;
            this.formValidate.identId = data.identId;
            this.formValidate.identName = data.identName;
            this.formValidate.summaryMode = data.summaryMode;
        }
    },
    watch: {
        searchDeptTree(val) {
            this.$refs.deptTree.filter(val);
        },
         searchDataTree(val) {
            this.$refs.dataTree.filter(val);
        }
    },
    filters: {
        // statusFilter(value) {
        //   var output = ''
        //   switch (value) {
        //     case '1':
        //       output = 'danger'
        //       break
        //     case '0':
        //       output = 'success'
        //       break
        //   }
        //   return output
        // },
        // isStatus(value) {
        //   var output = ''
        //   switch (value) {
        //     case '0':
        //       output = '启用'
        //       break
        //     case '1':
        //       output = '禁用'
        //       break
        //   }
        //   return output
        // },
        dataTypeFilter(value) {
            var output = "";
            switch (value) {
                case 0:
                    output = "整数";
                    break;
                case 1:
                    output = "小数";
                    break;
                case 2:
                    output = "百分比";
                    break;
                case 3:
                    output = "千分比";
                    break;
                case 4:
                    output = "比例";
                    break;
                case 5:
                    output = "布尔";
                    break;
            }
            return output;
        }
    }
};
</script>

<style lang="less" scoped>
/*@import url("./basisIndexs.less");*/
.funBtn {
  position: absolute;
  top: 0;
  right: 0;
}
.vasisTabs {
  position: relative;
  height: 50px;
  padding: 0;
  margin-top: 10px;
  .ivu-tabs-bar {
    background: #f3f3f3;
  }
}
.tableHeight {
  height: 400px;
}
.table_Box {
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
}
</style>
