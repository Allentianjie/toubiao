<template>
    <div class="roleManage">
        <div class="funBtn">
            <!--<Button type="primary" @click="EditData('add')" icon="ios-brush-outline">添加</Button>-->
            角色名：<el-input style="margin-left: 5px;width: auto" placeholder="角色名搜索" v-model="searchRoleName"/>
            <el-button style="margin-left: 5px" icon="el-icon-search" @click="searchroles" type="primary" size="small">搜 索</el-button>
            <el-button style="margin-left: 5px" type="primary" icon="el-icon-plus" @click="EditData('add')" size="small">添加</el-button>
            <i-button style="margin-left: 5px" type="primary" @click="jurisdiction(selectionArr[0])">权限
            </i-button>
            <i-button style="margin-left: 5px" type="primary" @click="setRoleUsers(selectionArr[0])">用户</i-button>
            <i-button style="margin-left: 5px" type="primary" @click="setRoleUserTypes(selectionArr[0])">用户类型</i-button>
            <i-button style="margin-left: 5px" type="error" @click="remove(selectionArr[0])">删除</i-button>
        </div>
        <div ref="tableHeight" class="tableHeight2">
            <el-tabs class="fileTabs" v-model="activeName" type="card" @tab-click="roleTabsClick">
                <el-tab-pane label="教师" name="0"></el-tab-pane>
                <el-tab-pane label="学生" name="1"></el-tab-pane>
            </el-tabs>
            <Table style="height: 90%;overflow: auto" highlight-row :tableData="userData" @ftablePage="fTablePage"></Table>
        </div>
        <div>
            <!-- 新增修改用户框 -->
            <Modal v-model="showModel" class-name="editUserModal" width="50"
                   :mask-closable="false" @on-cancel="handleReset('formValidate')">
                <p slot="header">
                    <span>{{title}}</span>
                </p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="角色名称" prop="roleName">
                        <Input :disabled="editdisabled" v-model="formValidate.roleName"></Input>
                    </FormItem>
                    <FormItem label="角色标识" prop="roleCode">
                        <Input :disabled="editdisabled" v-model="formValidate.roleCode"></Input>
                    </FormItem>
                    <FormItem label="角色类型" prop="roleType">

                        <Select :disabled="editdisabled" v-model="formValidate.roleType" style="width:200px"
                                placeholder="请选择角色类型">
                            <Option v-for="item in roleTypeData" :value="item.value" :key="item.value">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="角色描述" prop="roleDesc">
                        <Input :disabled="editdisabled" v-model="formValidate.roleDesc"></Input>
                    </FormItem>
                    <!--<FormItem label="数据权限"  prop="dsType">
                      &lt;!&ndash;<Input  v-model="formValidate.state"></Input>&ndash;&gt;
                      <Select :disabled="editdisabled" v-model="formValidate.dsType" placeholder="请选择状态">
                        <Option v-for="item in dsTypeData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>-->
                    <FormItem label="创建时间" prop="createTime" v-if="title === '编辑' || title==='查看' ">
                        <Input disabled v-model="formValidate.createTime"></Input>
                    </FormItem>
                </Form>
                <div slot="footer" v-show="lookshow">
                    <el-button type="primary" @click="handleSubmit('formValidate')" size="small">确定</el-button>
                    <el-button @click="handleReset('formValidate')" style="margin-left: 8px" size="small">取消</el-button>
                </div>
            </Modal>

            <Modal v-model="treeModel" class-name="editUserModal" width="50"
                   :mask-closable="false" @on-cancel="treeModel = false">
                <p slot="header">
                    <span>分配权限</span>
                </p>
                <div class="userTree">
                    <Tree :baseData="baseData"
                          @fCheckTreeData="setUserDept"
                          :showBox="true"
                          :parentBox="true"
                    >
                    </Tree>
                </div>
                <div slot="footer">
                    <el-button type="primary" @click="treeSubmit" size="small">更新</el-button>
                </div>
            </Modal>


            <ChoiceRoleUser ref="chargeManModal" :choiceMan="choiceMan"
                            @closeRoleUserMain="closeChoiceManModal"></ChoiceRoleUser>

            <ChoiceRoleUserType ref="choiceRoleUserType" :choiceDefRoleUserType="choiceDefRoleUserType"
                                @closeRoleUserTypeMain="closeChoiceUserTypeModal"></ChoiceRoleUserType>
        </div>
    </div>
</template>

<script>
    import Tree from '@/components/tree'
    import Table from '@/components/table'
    import {NeizhenUtil, datarouters} from "../../../../util/datarouters"
    import ChoiceRoleUser from "./choiceRoleUser"
    import ChoiceRoleUserType from "./choiceRoleUserType"

    export default {
        components: {Table, Tree, ChoiceRoleUser, ChoiceRoleUserType},
        name: 'index',

        data() {
            return {
                searchRoleName: '',
                treeSelect: [], // 储存选中的树形
                baseData: [], // 树形传参
                deptData: [], // 部门树
                treeModel: false, // 树形弹框
                roleUserModal: false, // 角色弹出框
                editdisabled: true,
                lookshow: true,
                oper: true,
                defalutMenuData: null, // 默认的参数菜单, 从此克隆
                rightsTreeSelected: [], //选中的树选择
                changemenuselectedrole: -1,  // 改变权限时选中的menuid
                choiceMan: {
                    state: false,
                    data: []
                },
                choiceDefRoleUserType: {
                    state: false,
                    roleName: '',
                    data: []
                },
                formValidate: {
                    roleName: '',
                    roleCode: '',
                    roleDesc: '',
                    dsType: '',
                    createTime: '',
                    roleType: '0',
                    roleId: ''
                }, // 弹框的绑定数据

                selecttab: '0',  // 教师
                roleTypeData: [
                    {value: '0', label: '教师'},
                    {value: '1', label: '学生'}

                ],
                dsTypeData: [
                    {value: '0', label: '全部'},
                    {value: '1', label: '自定义'},
                    {value: '2', label: '本级及子级'},
                    {value: '3', label: '本级'}
                ],
                ruleValidate: {
                    roleName: [
                        {required: true, message: '角色名称不能为空', trigger: 'blur'}
                    ],
                    roleCode: [
                        {required: true, message: '角色标识不能为空', trigger: 'blur'}
                    ]
                }, // 弹框新增和修改的验证
                showModel: false, // 表格的弹框
                selectionArr: [],
                currentid: "",
                userData: {
                    columns: [
                        {
                            title: "单选",
                            width: 90,
                            align: 'center',
                            key: "checkRadio",
                            render: (h, params) => {
//                 console.log(params,'----------------params------------------') //为data中的值
                                let id = params.row.roleId;
                                let defaultS = false;
                                // console.log(this.currentid)
                                if (this.currentid == id) {
                                    defaultS = true;
                                } else {
                                    defaultS = false
                                }
                                let self = this;
                                return h('Radio', {
                                    props: {
                                        value: defaultS  //判断单选框状态
                                    },
                                    on: {
                                        'on-change': () => {
                                            self.currentid = id; //赋值单选框id。对比id判断状态
                                            self.selectionArr = [].concat(params.row)
//                      console.log('----------------selectionArr------------------',self.selectionArr)
                                        }
                                    }
                                }, params.row.cname)
                            },
                        },
                        {
                            title: '序号',
                            type: 'index',
                            width: 70,
                            align: 'center'
                        },
                        {
                            title: '角色名称',
                            width: 200,
                            key: 'roleName',
                            tooltip: true,
                        },
                        {
                            title: '角色标识',
                            key: 'roleCode',
                            tooltip: true,
                            // width: 90
                        },
                        {
                            title: '角色描述',
                            key: 'roleDesc',
                            // width: 90,
                            tooltip: true,
                        },

                        {
                            title: '创建时间',
                            key: 'createTime',
                            width: 150,
                            tooltip: true
                        },
                        {
                            title: '操作',
                            key: 'action',
                            width: 300,
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            icon: "ios-eye-outline",
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            // marginRight: '5px'
                                            color: "#3f7ae6",
                                            fontSize: '14px'
                                        },
                                        on: {
                                            click: () => {
                                                this.EditData('look', params)
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            icon: "ios-create-outline",
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            // marginRight: '5px'
                                            color: "#3f7ae6",
                                            fontSize: '14px'
                                        },
                                        on: {
                                            click: () => {
                                                this.EditData('edit', params)
                                            }
                                        }
                                    }, '编辑'),
//                  h('Button', {
//                    props: {
//                      icon:"ios-trash-outline",
//                      type: 'text',
//                      size: 'small'
//                    },
//                    style: {
//                      // marginRight: '5px'
//                      color:"#f04409",
//                      fontSize:'14px'
//                    },
//                    on: {
//                      click: () => {
//                        this.remove(params.index, params.row)
//                      }
//                    }
//
//                  }, '删除'),
//                  h('Button', {
//                    props: {
//                      icon:"ios-add",
//                      type: 'text',
//                      size: 'small'
//                    },
//                    style: {
//                      // marginRight: '5px'
//                      color:"#3f7ae6",
//                      fontSize:'14px'
//                    },
//                    on: {
//                      click: () => {
//                        this.jurisdiction(params)
//                      }
//                    }
//                  }, '权限'),
//                  h('Button', {
//                    props: {
//                      icon:"ios-add",
//                      type: 'text',
//                      size: 'small'
//                    },
//                    style: {
//                      // marginRight: '5px'
//                      color:"#3f7ae6",
//                      fontSize:'14px'
//                    },
//                    on: {
//                      click: () => {
//                        this.setRoleUsers(params)
//                      }
//                    }
//                  }, '用户'),
//
//                  h('Button', {
//                    props: {
//                      icon:"ios-add",
//                      type: 'text',
//                      size: 'small'
//                    },
//                    style: {
//                      // marginRight: '5px'
//                      color:"#3f7ae6",
//                      fontSize:'14px'
//                    },
//                    on: {
//                      click: () => {
//                        this.setRoleUserTypes(params)
//                      }
//                    }
//                  }, '用户类型'),
                                ]);
                            }
                        }

                    ],
                    data: [],
                    total: 100,
                    pageSize: ''
                }, //表格的表头和表格内容
                title: '新增', // 表格弹框的title
                initpage: {current: 1, pageSize: 10},
            }
        },
        created() {
            var that = this;

            this.setTableData(this.initpage);

            //设置basedata
            this.$AsyncDealData(datarouters.SystemManage.menu.treemenu, null, function (data) {
                var m = NeizhenUtil.treeDataToStandardTreeData(data.data, {
                    "id": "id",
                    "name": "name",
                    "pid": "parentId",
                    "children": "children"
                });

                that.defalutMenuData = m;
                that.setBaseData(m);

            });
        },
        watch: {
            treeModel(Val, oldVal) {
                if (Val === false) {
                    this.treeReset()
                }
            }
        },
        methods: {
//      getTableChosedValue(selection, row) {
//
//      },
//      selctionChange(selection) {
//        (selection.length > 1) && selection.splice(0, selection.length - 1);
//        console.log(111, selection);
//        this.selectionArr = [].concat(selection)
//      },
            closeChargeMan() {


            },

            searchroles() {
                this.setTableData({current: 1, size: 10}, this.searchRoleName);


            },

            // 关闭后选项
            closeChoiceManModal(pdata, choicemans, selecttreeid, selectall) {


                var that = this;
                if (selectall) {
                    // 全选
                    this.$AsyncDealData(datarouters.SystemManage.role.saveRoleUsers,
                        {
                            roleId: roleId,
                            deptId: selecttreeid,
                            all: true,

                        },
                        function (data) {
                            that.$Message.info("保存成功！");

                        });

                } else {
                    if (choicemans.length > 0) {
                        let roleId = pdata[0].roleId;


                        if (choicemans.length > 0) {

                            let userids = NeizhenUtil.ojoin(choicemans, ",", null);

                            // 当两个不一样的时候

                            this.$AsyncDealData(datarouters.SystemManage.role.saveRoleUsers,
                                {
                                    roleId: roleId,
                                    deptId: selecttreeid,
                                    users: choicemans,
                                    all: false,

                                },
                                function (data) {
                                    that.$Message.info("保存成功！");

                                });

                        } else {
                            // 选择人数据为空的情况下，删除
                            this.$AsyncDealData(datarouters.SystemManage.department.savedepartcharge,
                                {
                                    deptId: deptId,
                                    charges: null
                                },
                                function (data) {
                                    that.$Message.info("保存成功！");

                                });


                        }
                    }
                }
                this.choiceMan.state = false;
            },


            setRoleUsers(params) {
                if (this.selectionArr.length > 0) {
                    var that = this;
                    this.$AsyncDealData(datarouters.SystemManage.role.roleUsers, {roleId: params.roleId}, function (data) {
                        var uids = [];
                        that.choiceMan.data = [];
                        that.choiceMan.data.push({roleId: params.roleId, "selectids": data.data});
                        that.choiceMan.roleName = params.roleName;

                        that.choiceMan.state = true;
                        that.$refs.chargeManModal.loaddata(data.data);
                    });
                } else {
                    this.$Message.destroy()
                    this.$Message.warning('请选择目标项');
                }
            },

            closeChoiceManModal(oldData, depId, chooseMans, chooseAll, onlyclose) {
                if (!onlyclose) {
                    var that = this;
                    let roleId = oldData[0].roleId;
                    let paramdata = {roleId: roleId, deptId: depId, all: chooseAll};
                    if (!chooseAll) {
                        var joins = NeizhenUtil.ojoin(chooseMans, ",", function (e) {
                            return e.userId;
                        });
                        paramdata.users = joins.split(",");


                    }

                    this.$AsyncDealData(datarouters.SystemManage.role.saveRoleUsers, paramdata, function (data) {
                        that.choiceMan.state = false;
                    }, true);
                } else {
                    that.choiceMan.state = false;
                }

            },

            setRoleUserTypes(param) {
                if (this.selectionArr.length > 0) {
                    var roleId = param.roleId;
                    var that = this;

                    that.choiceDefRoleUserType.data = [];
                    that.choiceDefRoleUserType.data.push({roleId: roleId});
                    that.choiceDefRoleUserType.roleName = param.roleName;
                    that.choiceDefRoleUserType.state = true;
                    that.$refs.choiceRoleUserType.loaddata();
                } else {
                    this.$Message.destroy()
                    this.$Message.warning('请选择目标项');
                }
            },

            // 关闭选择用户类型框
            closeChoiceUserTypeModal(olddata, choicedata, depids, onlyclose) {

                var that = this;
                if (onlyclose) {
                    this.choiceDefRoleUserType.state = false;
                } else {
                    var ojoin = NeizhenUtil.ojoin(choicedata, ",", null);

                    this.$AsyncDealData(datarouters.SystemManage.role.saveRoleUserTypes, {
                        roleId: olddata[0].roleId,
                        deptIds: depids,
                        usertypes: ojoin
                    }, function (data) {
                        that.choiceDefRoleUserType.state = false;
                    });


                }

            },
            getrolerights(roleId) {
                var that = this;
                var rdata = NeizhenUtil.deepClone(this.defalutMenuData);

                this.$AsyncDealData(datarouters.SystemManage.menu.rolemenu, {"roleId": roleId}, function (data) {
                    var setTreeChecked = (sourcedata, selectdata) => {
                        sourcedata.forEach(e => {
                            if (e.id == selectdata) {
                                e.checked = true;
                                e.indeterminate = false;
                                that.rightsTreeSelected.push(e.id);
                            } else if (e.children.length > 0) {
                                setTreeChecked(e.children, selectdata);
                            }
                        });
                    };
                    data.data.forEach(e => {
                        setTreeChecked(rdata, e);
                    });
                    that.setBaseData(rdata);
                    that.treeModel = true;
                });
            },
            setBaseData(data) {
                this.baseData = data;
            },
            setTableData(page, searchname) {

                var that = this;
                page.size = page.pageSize;
                if (!NeizhenUtil.isEmpty(searchname)) {
                    page.searchName = this.searchRoleName;
                }

                page.roleType = this.selecttab;
                this.$AsyncDealData(datarouters.SystemManage.role.page, page, function (data) {
                    that.setUserData(data.data);
                });
            },

            setUserData(data) {
                this.userData.total = data.total;
                this.userData.data = data.records;
                this.userData.pageSize = this.initpage.pageSize;
            },
            setUserDept(data) {
                // console.log('选择树形节点后的data--id--', data)
                this.rightsTreeSelected = [];
                data.forEach(e => {
                    this.rightsTreeSelected.push(e.id);
                })
                // console.log('选择树形节点后的push.id-',this.rightsTreeSelected)
            },
            // 树形取消
            treeReset() {
                this.treeModel = false;
                //this.baseData = NeizhenUtil.deepClone(this.defalutMenuData);
                // this.treeSelect = []
                /*this.treeModel = true;

                this.baseData.map(o => {
                  o.checked = false
                  //o.indeterminate = false
                  o.children.map(j =>{
                    j.checked = false
                    //j.indeterminate = false
                    j.children.map(y => {
                      y.checked = false
                      //y.indeterminate = false
                    })
                  })
                })*/
            },
            // 树形确认
            treeSubmit() {

                var that = this;
                if (this.rightsTreeSelected.length < 1) {
                    this.$Message.error("未选择权限不能进行保存！");
                    return;
                }
                // console.log('点击保存---1--',this.changemenuselectedrole)
                // console.log('点击保存---2--',this.rightsTreeSelected)
                this.$AsyncDealData(datarouters.SystemManage.role.roleMenu,
                    {
                        "roleId": this.changemenuselectedrole,
                        "menuIds": this.rightsTreeSelected
                    },
                    function (data) {
                        if (data) {
                            that.$Message.destroy();
                            that.handleReset("formValidate");
                            that.treeModel = false;
                        }
                    }, true);
            },
            // 点击权限权限
            jurisdiction(row) {
                // console.log("点击权限弹出框", row);
                console.log("点击权限弹出框", this.selectionArr);
                if (this.selectionArr.length > 0) {
                    this.treeReset();
                    this.changemenuselectedrole = row.roleId;
                    this.getrolerights(row.roleId);
                } else {
                    this.$Message.destroy()
                    this.$Message.warning('请选择目标项');
                }
            },
            // 新增确认
            handleSubmit(name) {
                var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.info('正在存储!');
                        if (this.oper == "add") {
                            this.$AsyncDealData(datarouters.SystemManage.role.insert,
                                {
                                    "roleName": this.formValidate.roleName,
                                    "roleCode": this.formValidate.roleCode,
                                    "roleDesc": this.formValidate.roleDesc,
                                    "roleType": this.formValidate.roleType
                                },
                                function (data) {
                                    if (data) {
                                        that.$Message.destroy();
                                        that.handleReset("formValidate");
                                        that.showModel = false;
                                        that.setTableData(that.initpage);
                                    }
                                });
                        } else {
                            this.$AsyncDealData(datarouters.SystemManage.role.update,
                                {
                                    "roleName": this.formValidate.roleName,
                                    "roleId": this.formValidate.roleId,
                                    "roleCode": this.formValidate.roleCode,
                                    "roleDesc": this.formValidate.roleDesc,
                                    "roleType": this.formValidate.roleType
                                },
                                function (data) {
                                    if (data) {
                                        that.$Message.destroy();
                                        that.setTableData(that.initpage);
                                        that.handleReset("formValidate");
                                        that.showModel = false;
                                    }
                                });
                        }

                        // this.showModel = false
                    } else {
                        this.$Message.error('请按照要求填写!');
                    }
                })
            },
            // 取消新增内容
            handleReset(name) {
                this.showModel = false;
                if (this.title === '新增') {
                    this.$refs[name].resetFields();
                }
            },
            selectOptionValue(optiondatas, moudle, selectvalue) {
                for (var i = 0; i < optiondatas.length; i++) {
                    if (optiondatas[i].value == selectvalue) {
                        moudle = optiondatas[i].value;
                        break;
                    }
                }


            },
            // 新增、修改
            EditData(type, params) {
                let that = this;
                if (type === "add") { //
                    // edit
                    this.title = "新增";
                } else if (type === "edit") {
                    this.title = "编辑";
                } else if (type === "look") {
                    this.title = "查看";
                }

                this.oper = type;
                if (type === 'edit' || type === 'look') {
                    this.formValidate.roleName = params.row.roleName;
                    this.formValidate.roleCode = params.row.roleCode;
                    this.formValidate.roleDesc = params.row.roleDesc;


                    this.formValidate.roleType = this.roleTypeData[NeizhenUtil.selectOptionValue(this.roleTypeData, params.row.roleType)].value;
                    this.formValidate.createTime = params.row.createTime;
                    this.formValidate.roleId = params.row.roleId;
                    if (type === 'edit') {
                        this.editdisabled = false;
                        this.lookshow = true;
                    } else {
                        this.editdisabled = true;
                        this.lookshow = false;
                    }

                } else {
                    this.formValidate.roleName = '';
                    this.formValidate.roleCode = '';
                    this.formValidate.roleDesc = '';
                    //this.formValidate.dsType = this.dsTypeData[0].value;
                    this.formValidate.createTime = '';
                    this.formValidate.roleType = this.roleTypeData[0].value;
                    this.formValidate.roleId = '';
                    this.editdisabled = false;
                    this.lookshow = true;
                }
                this.showModel = true

            },
            // 删除
            remove(row) {
                var that = this;
                if (this.selectionArr.length > 0) {
                    this.$confirm("确定要删除角色么？", "提示", {
                        type: "warning"
                    }).then(() => {
                        that.$AsyncDealData(datarouters.SystemManage.role.delete,
                            {"id": row.roleId},
                            function (data) {
                                if (data) {
                                    that.setTableData({current: 1, pageSize: 10});
                                }
                            });
                    }).catch(() => {

                    });
                } else {
                    this.$Message.destroy()
                    this.$Message.warning('请选择目标项');
                }
            },
            fTablePage(pageData) { // 分页
                this.initpage.current = pageData.current
                this.setTableData(pageData, this.searchRoleName);
                //this.tableSearch = {...this.tableSearch, ...pageData}
            },

            roleTabsClick(tab, event) {
                this.selecttab = tab.name;
                this.setTableData({current: 1, pageSize: 10}, this.searchRoleName)


            }
        }
    }
</script>

<style lang="less" scoped>
    .roleManage {
        height: 100%;
        background: #fff;

        .funBtn {
            height: 70px;
            text-align: left;
        }
        .tableHeight2 {
            height: calc(100% - 70px);
        }

    }
</style>

