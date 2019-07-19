<template>
  <div class="userManage">

    <Row style="height:100%">
      <Col span="5" style="height:100%">
      <div class="M_search">
        <Input @input="filtration" v-model="treeSearch" placeholder="输入关键字进行过滤" style="width: auto">
        <Icon type="ios-search" slot="suffix"/>
        </Input>
      </div>
      <div class="userTree">
        <Tree id='taskTreeL' :baseData="baseData" ref="deptTree" @fSelectTreeData="selectDeptTree"
              :showBox="false"></Tree>
      </div>
      </Col>
      <Col span="19">
      <div class="M_search">
        用户名：<Input placeholder="用户名" v-model="searchName.username" style="width: auto"/>
        姓名：<Input placeholder="姓名" v-model="searchName.name" style="width: auto"/>
        <!--类型：<Select v-model="searchName.userType" style="width:100px" placeholder="请选择角色类型">-->
        <!--<Option v-for="item in options.roleDatas" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        <!--</Select>-->
        <el-button icon="el-icon-search" @click="searchusers" type="primary" size="small">搜 索</el-button>
        <el-button icon="el-icon-delete" @click="clearquery" size="small">清 空</el-button>
      </div>
      <div class="button-group">
        <Row style="height:100%" type="flex" justify="start">
            <el-button class="funaddBtn" icon="el-icon-plus" @click="EditData('add')" type="primary" size="small">添加</el-button>
              <i-button type="primary" @click="showUserRoles({current: 1, pageSize: 10}, selectionArr[0], true, true)">
              用户角色
            </i-button>
            <i-button type="primary" @click="showUserManageDepartMent(selectionArr[0])">管辖部门</i-button>
            <i-button type="error" @click="resetPwd(selectionArr[0])">密码重置</i-button>
            <i-button type="error" @click="remove(selectionArr[0])">删除</i-button>

        </Row>
      </div>
      <div class="tableHeight">
        <Table :tableData="userData" @ftablePage="fTablePage"></Table>
      </div>
      </Col>
    </Row>
    <div>
      <!-- 新增修改用户框 -->
      <Modal v-model="showModel" class-name="editUserModal" width="30"
             @on-cancel="handleReset('formValidate')" :mask-closable="false">
        <p slot="header">
          <span>{{title}}</span>
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="编号" prop="userCode">
            <Input :disabled="oper != 'add'" v-model="formValidate.userCode"></Input>
          </FormItem>
          <FormItem label="用户名" prop="username">
            <Input :disabled="oper != 'add'" v-model="formValidate.username"></Input>
          </FormItem>
          <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name"></Input>
          </FormItem>
          <FormItem label="密码" prop="password" v-if="title === '新增' ">
            <Input type="password" v-model="formValidate.password"></Input>
          </FormItem>
          <FormItem label="验证密码" prop="vpassowrd" v-if="title === '新增'">
            <Input type="password" v-model="formValidate.vpassword"></Input>
          </FormItem>
          <FormItem label="部门" prop="deptName">
            <Col span="20">
            <Input disabled v-model="formValidate.deptName"></Input></Col>
            <Col span="4">
            <Button @click="changeUserDept">
              <Icon type="md-reorder"/>
            </Button>
            </Col>

          </FormItem>
          <FormItem label="负责部门" prop="charge">
            <div style="width: 100%">
              {{ formValidate.chargeDepartment }}
              <Tooltip content="设置负责部门">
                <Button @click="chargeChangeDept">选择部门</Button>
              </Tooltip>
            </div>
            <!--<Checkbox v-model="formValidate.charge"></Checkbox>
            <div v-if="formValidate.chargeman !== ''" >
              负责人：{{ formValidate.chargeman }}
            </div>-->
          </FormItem>
          <FormItem label="类型" prop="type">
            <!--<Input  v-model="formValidate.role"></Input>-->
            <Select disabled v-model="formValidate.type" placeholder="请选择类型">
              <Option v-for="item in options.roleDatas" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <!--<FormItem  label="状态"  prop="state">
            &lt;!&ndash;<Input  v-model="formValidate.state"></Input>&ndash;&gt;
            <Select v-model="formValidate.state" placeholder="请选择状态">
              <Option v-for="item in options.stateDatas" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>-->
          <!--<FormItem label="排序"  >
            <Input v-model="formValidate.sort"></Input>
          </FormItem>-->
          <FormItem label="创建时间" v-if="title === '编辑' ">
            <Input disabled v-model="formValidate.createTime"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <el-button type="primary" @click="handleSubmit('formValidate')" size="small">确定</el-button>
          <el-button @click="handleReset('formValidate')" style="margin-left: 8px" size="small">取消</el-button>
        </div>
      </Modal>
    </div>
    <!--用户部门-->
    <div>
      <!-- 新增修改用户框 -->
      <Modal v-model="showUserDepartmentModel" class-name="editUserModal" width="50"
             :mask-closable="false">
        <p slot="header">
          <span>设置用户管辖部门</span>
        </p>
        <div class="userTree">
          <!--<Tree :baseData="userManageDepartTree" ref="userManageTree"  :parentBox="true" :showBox="true" @fCheckTreeData="fnusermngdeptcheck"></Tree>-->
          <el-input v-model="screenTree" size="small" placeholder="请输入关键字" suffix-icon="el-icon-search">
          </el-input>
          <el-tree :data="userManageDepartTree" :props="defaultProps" show-checkbox highlight-current check-strictly
                   :filter-node-method="filterNode"
                   :default-checked-keys="defaultDeptCheckedKeys" :default-expanded-keys="[1]" node-key="id"
                   @check="handleNodeClick" ref="tree"></el-tree>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="setUserManageDept" size="small">更新</el-button>
        </div>
      </Modal>
    </div>

    <!-- 用户角色 -->
    <div>
      <Modal v-model="showUserRoleModel" class-name="editUserModal" width="50"
             :mask-closable="false" @on-cancel="showUserRoleModel = false">
        <p slot="header">
          <span>设置用户角色</span>
        </p>
        <div class="userTree">

          <div class="M_search">
            角色名：<Input placeholder="角色名" v-model="searchName.roleName" style="width: auto"/>

            <!-- <Button type="primary" icon="ios-search" @click="searchroles">搜 索</Button>
             <Button icon="ios-trash" @click="clearqueryrole">清 空</Button>-->
            <el-button icon="el-icon-search" @click="searchroles" type="primary" size="small">搜 索</el-button>
            <el-button icon="el-icon-delete" @click="clearqueryrole" size="small">清 空</el-button>
          </div>
          <div class="table">
            <Table :tableData="userRoleData" ref="userRoleTable" @ftablePage="fTablePage2" @frowchecked="frolechecked"
                   @frowunchecked="froleunchecked"></Table>
          </div>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="submitUserRoles" size="small">更新用户角色</el-button>
        </div>
      </Modal>
    </div>
    <ChooseDepartMent ref="chooseDepartmentModal" :choiceDept="chooseDepartment"
                      @closeSelectTreeMain="closeChoiceDeptModal"></ChooseDepartMent>

  </div>
</template>

<script>
  import store from "@/store";
  import Tree from '@/components/tree'
  import Table from '@/components/table'
  import {NeizhenUtil, datarouters} from "../../../../util/datarouters"
  import ChooseDepartMent from './choiceDepartment'

  export default {
    components: {Tree, Table, ChooseDepartMent},
    name: 'index',

    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        screenTree: '', // 管辖部门弹框里面的树形筛选框
        treeSearch: '',
        userRoleSelect: '',
        defaultDeptCheckedKeys: [],

        chooseDepartment: {
          state: false,
          chooseBox: false,
          data: []
        },

        selectGroup: {
          roleIds: [],
          deptIds: []
        },
        manageDeptTreeUser: '',
        searchName: {
          username: '',
          name: '',
          roleName: '',
          userType: '0'
        },
        initpage: {current: 1, size: 10},
        deptTreeSelect: [],
        defaultDeptTreeData: null,
        options: {
          roleDatas: [
            {label: "学生", value: "0"},
            {label: "教师", value: "1"},
            {label: "教职工", value: "2"},
            {label: "管理员", value: "3"}
          ],
          stateDatas: [
            {label: "有效", value: "0"},
            {label: "无效", value: "1"}
          ]

        },
        baseData: [],
        userManageDepartTree: [],
        oper: '',
        formValidate: {
          userId: '',
          name: '',
          username: '',
          userCode: '',
          deptName: '',
          deptId: '',
          sort: '',
          creator: '', // 创建者
          password: '',
          vpassword: '',
          createTime: '', // 创建时间
          updateTime: '', // 修改时间
          type: '',   // 类型
          charge: false,
          chargeman: '',  //负责人列表
          state: '', // 状态
          chargeDepartment: '',  // 负责部门，逗号隔开
          chargeDeptIds: []      // 负责部门id
        },
        ruleValidate: {
          userCode: [
            //{ required: true, message: '用户名不能为空', trigger: 'blur' },
            {
              type: "string",
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (this.oper == "add") {
                  if (value == '') {
                    callback("用户编号不能为空！");
                  } else {
                    this.$AsyncDealData(datarouters.SystemManage.user.validateCode, {
                      usercode: value
                    }, function (data) {
                      if (data.data) {
                        callback("用户编号已存在！");
                      } else {
                        callback();
                      }
                    });
                  }
                } else {
                  callback();
                }
              }
            }
          ],
          username: [
            //{ required: true, message: '用户名不能为空', trigger: 'blur' }

            {
              type: "string",
              required: true,
              trigger: 'blur',

              validator: (rule, value, callback) => {
                if (this.oper == "add") {
                  if (value == '') {
                    callback("用户名不能为空！");
                  } else {
                    this.$AsyncDealData(datarouters.SystemManage.user.validateName, {
                      username: value
                    }, function (data) {
                      if (data.data) {
                        callback("用户名已存在！");
                      } else {
                        callback();
                      }
                    });

                  }
                } else {
                  callback();
                }


              }
            }

          ],
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],

          role: [
            {required: true, message: '角色不能为空', trigger: 'blur'}
          ],

          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          vpassowrd: [
            {
              type: "string",
              required: true,
              trigger: 'blur',

              validator: (rule, value, callback) => {

                if (this.formValidate.vpassword == this.formValidate.password) {
                  callback();
                } else {
                  callback("验证密码与密码不一致");
                }
              }
            }
          ]
        },
        showModel: false,
        showUserDepartmentModel: false,
        showUserRoleModel: false,
        userRoleData: {
          columns: [
            {

              type: 'selection',
              width: 60,
              align: 'center',
              key: 'selection'

            },
            {
              title: '角色名',
              key: 'roleName',
              tooltip: true,
            },
            {
              title: '角色标识',
              key: 'roleCode',
              // align: 'center',
              tooltip: true,
              // width: 90
            },
            {
              title: '角色描述',
              key: 'roleDesc',

            },
            // {
            //   title: '数据权限',
            //   key: 'dsType',
            //   // width: 100,
            //   tooltip: true,
            //   render: (h, params) =>{
            //
            //     let state = params.row.dsType;
            //     if (state == '0') {
            //       return h ('div', ['全部'])
            //     }else if(state == '1'){
            //       return h ('div', ['自定义'])
            //     }else if(state == '2'){
            //       return h ('div', ['本级及子级'])
            //     }else if(state == '3'){
            //       return h ('div', ['本级'])
            //     }
            //   }
            // },
            {
              title: '创建时间',
              key: 'createTime',
              width: 150,
              tooltip: true
            }

          ],
          data: [],
          total: 100
        },
        selectionArr: [],
        currentid: "",
        userData: {
          columns: [
            {
              title: "单选",
              width: 60,
              align: 'center',
              key: "checkRadio",
              render: (h, params) => {
//                 console.log(params,'----------------params------------------') //为data中的值
                let id = params.row.userId;
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
              title: '用户名',
              key: 'username',
              align: 'center',
              minWidth: 120,
              tooltip: true
            },
            {
              title: '姓名',
              key: 'name',
              align: 'center',
              minWidth: 120,
              tooltip: true

            },
            {
              title: '所属部门',
              key: 'deptName',
              align: 'center',
              minWidth: 200,
              tooltip: true
            },
            {
              title: '类型',
              align: 'center',
              key: 'type',
              minWidth: 150,
              render: (h, params) => {
                let state = params.row.type;
                if (state == '0') {
                  return h('div', ['学生'])
                } else if (state == '1') {
                  return h('div', ['教师'])
                } else if (state == '2') {
                  return h('div', ['教职工'])
                }
              }
            },
            // {
            //   title: '状态',
            //   key: 'state',
            //   width: 60,
            //   render: (h, params) =>{
            //     let state = params.row.state;
            //     if (state == '0') {
            //       return h('div',
            //         [h('span',{style:{color:"#19be6b"}},'正常')])
            //     }else if(state == '1'){
            //       return h('div',[h('span',{style:{color:"#ed4014"}},"禁用")])}
            //   }
            // },
            {
              title: '创建时间',
              align: 'center',
              key: 'createTime',
              minWidth: 150,
              tooltip: true
            },
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              // fixed: 'right',
              render: (h, params) => {
                return h('div', [
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
//                      icon: "ios-trash-outline",
//                      type: 'text',
//                      size: 'small'
//                    },
//                    style: {
//                      // marginRight: '5px'
//                      color: "#f04409",
//                      fontSize: '14px'
//                    },
//                    on: {
//                      click: () => {
//                        this.remove(params.index, params.row)
//                      }
//                    }
//                  }, '删除'),
//                  h('Button', {
//                    props: {
//                      icon: "ios-trash-outline",
//                      type: 'text',
//                      size: 'small'
//                    },
//                    style: {
//                      // marginRight: '5px'
//                      color: "#3f7ae6",
//                      fontSize: '14px'
//                    },
//                    on: {
//                      click: () => {
//                        this.showUserManageDepartMent(params.row)
//                      }
//                    }
//
//                  }, '管辖部门'),
//                  /* h('span', {
//                     style: {
//                       color:"#7a7a7a",
//                       fontSize:'14px'
//                     },
//                   },"|"),*/
//                  h('Button', {
//                    props: {
//                      icon: "ios-trash-outline",
//                      type: 'text',
//                      size: 'small'
//                    },
//                    style: {
//                      // marginRight: '5px'
//                      color: "#3f7ae6",
//                      fontSize: '14px'
//                    },
//                    on: {
//                      click: () => {
//
//                        this.showUserRoles({current: 1, pageSize: 10}, params.row, true, true)
//                      }
//                    }
//
//                  }, '用户角色'),
//                  /*h('span', {
//                    style: {
//                      color:"#7a7a7a",
//                      fontSize:'14px'
//                    },
//                  },"|"),*/
//                  h('Button', {
//                    props: {
//                      icon: "ios-trash-outline",
//                      type: 'text',
//                      size: 'small'
//                    },
//                    style: {
//                      // marginRight: '5px'
//                      color: "#f04409",
//                      fontSize: '14px'
//                    },
//                    on: {
//                      click: () => {
//                        this.resetPwd(params.row)
//                      }
//                    }
//
//                  }, '密码重置')

                ]);
              }
            }

          ],
          data: [],
          total: 100
        },
        title: '新增',
      }
    },
    created() {
      var that = this;
      // this.$AsyncDealData(datarouters.SystemManage.department.treemenu, null, function(data){
      //   console.log(data.data);
      // });
      let data = store.state.chooseDept
      var m = NeizhenUtil.treeDataToStandardTreeData(data, {
        "id": "id",
        "name": "name",
        "pid": "parentId",
        "children": "children"
      });
      that.defaultDeptTreeData = m;
      // that.userManageDepartTree = n;
      that.userManageDepartTree = [],
        that.setBaseData(that.defaultDeptTreeData);
      this.searchusers();
    },
    watch: {
      screenTree(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      //改变部门
      changeUserDept() {
        this.chooseDepartment.data = [];
        this.chooseDepartment.chooseBox = false;
        // type = 1 选择
        this.chooseDepartment.data.push({type: "1", userId: this.formValidate.userId});
        this.chooseDepartment.state = true;
        this.$refs.chooseDepartmentModal.loadchargedata();
      },
      // 选择负责人
      chargeChangeDept() {
        this.chooseDepartment.data = [];
        this.chooseDepartment.chooseBox = true;
        // type = 1 选择
        this.chooseDepartment.data.push({type: "2", userId: this.formValidate.userId});
        this.chooseDepartment.state = true;
        this.$refs.chooseDepartmentModal.loadchargedata();

      },


      filterNode(value, data) {
        if (!value) return true;
        return data.title.indexOf(value) !== -1;
      },
      //管辖部门弹框里面的树形选择
      handleNodeClick(data, node) {
        let checked = [].concat(node.checkedKeys.reverse())
        this.selectGroup.deptIds = [].concat(checked)
      },
      setBaseData(data) {
        this.baseData = data;
      },
      clearquery() {
        this.searchName.username = '';
        this.searchName.name = '';
        this.searchusers();
      },

      searchusers() {
        this.refreshUserData(this.initpage.current,
          this.initpage.size,
          this.deptTreeSelect.id,
          this.searchName.username,
          this.searchName.name);

      },

      refreshUserData(pageindex, pagesize, deptId, username, name) {

        var queryobj = {};

        queryobj.current = pageindex;
        queryobj.size = pagesize;

        NeizhenUtil.isEmpty(deptId) ? {} : (queryobj.deptId = deptId);
        NeizhenUtil.isEmpty(username) ? {} : (queryobj.username = username);
        NeizhenUtil.isEmpty(name) ? {} : (queryobj.name = name);
        queryobj.type = this.searchName.userType;

        var that = this;
        this.$AsyncDealData(datarouters.SystemManage.user.page, queryobj, function (data) {

          that.userData.data = data.data.records;
          that.userData.total = data.data.total;

        });

      },
      setUserManageDept() {
        // debugger
        if (this.selectGroup.deptIds.length < 1) {
          this.$Message.error("未选择管辖部门，请先选择管辖部门！");
          return;
        }
        // debugger
        var that = this;
        var upobj = {};
        upobj.userId = this.manageDeptTreeUser;
        upobj.deptMultId = this.selectGroup.deptIds.join(",");
        this.$AsyncDealData(datarouters.SystemManage.user.saveUserManageDepts, upobj, function (data) {
          that.$Message.destroy();
          that.showUserDepartmentModel = false;
          that.searchusers();
        }, true);
      },
      showUserManageDepartMent(row) {
        if (this.selectionArr.length > 0) {
          var managedepts = NeizhenUtil.isEmpty(row.deptMultId) ? [] : row.deptMultId.split(",");
          this.manageDeptTreeUser = row.userId;
          // 设置管理树的选中
          this.setManageDeptSelected(row.userId, managedepts);
          this.showUserDepartmentModel = true;
        } else {
          this.$Message.destroy()
          this.$Message.warning('请选择目标项');
        }
      },
      setManageDeptSelected(userId, managedepts) {
        var that = this;
        var defaultdata = NeizhenUtil.deepClone(this.defaultDeptTreeData);
        this.userManageDepartTree = defaultdata;
        this.defaultDeptCheckedKeys = [];
        managedepts.forEach(e => {
          that.defaultDeptCheckedKeys.push(e);
          that.selectGroup.deptIds.push(e);
        });
      },
      selectDeptTree(data) {
        if (data.length < 1) {
          this.$Message.error("请先选择一个部门！");
          return;
        } else {
          this.deptTreeSelect = data[0];
        }

        var deptId = this.deptTreeSelect.extdata.id;
        var search_name = this.searchName.name;
        var search_username = this.searchName.username;
        this.refreshUserData(this.initpage.current, this.initpage.size, deptId, search_username, search_name);
      },
      filtration() {
        if (this.treeSearch === "") {
          this.baseData = this.defaultDeptTreeData;
          return;
        }
        var topparentid = 0;
        var mapdata = {"id": "id", "name": "name", "pid": "parentId", "children": "children"};
        var deptreeclone = NeizhenUtil.deepClone(this.defaultDeptTreeData);
        var rlist = NeizhenUtil.searchTreeDataByTxt(this.treeSearch, deptreeclone, "name");
        var completetreelist = NeizhenUtil.getTreeListFromSearchResult(deptreeclone, rlist, mapdata);
        var searchtree = NeizhenUtil.listToTreeData(completetreelist, mapdata);
        this.baseData = searchtree;
      },
      getSelectedDept() {
        if (this.deptTreeSelect.length > 0) {
          return {
            id: this.deptTreeSelect.id,
            name: this.deptTreeSelect.title,
            data: this.deptTreeSelect.extdata
          };
        }
        return null;
      },
      // 新增确认
      handleSubmit(name) {
        var that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            that.$Message.info('数据填写正确，正在存储!');
            var insertobj = {};
            insertobj.name = this.formValidate.name;
            insertobj.username = this.formValidate.username;
            insertobj.userCode = this.formValidate.userCode;
            insertobj.deptId = this.formValidate.deptId;
            insertobj.type = this.formValidate.type;
            insertobj.sort = this.formValidate.sort;
            insertobj.deptMultId = this.formValidate.deptId;
            insertobj.charge = this.formValidate.charge;

            insertobj.chargeDepts = NeizhenUtil.ojoin(this.formValidate.chargeDeptIds, ",", null);
            if (that.oper == "add") {
              insertobj.password = this.formValidate.password;
              that.$AsyncDealData(datarouters.SystemManage.user.insert, insertobj, function (data) {
                if (data) {
                  that.$Message.destroy();
                  that.showModel = false;
                  var deptId = that.getSelectedDept() != null ? that.getSelectedDept().id : null;
                  that.refreshUserData(that.initpage.current, that.initpage.size, deptId, that.searchName.username, that.searchName.name);
                }
              });


            } else {
              insertobj.userId = this.formValidate.userId;
              that.$AsyncDealData(datarouters.SystemManage.user.update, insertobj, function (data) {
                if (data) {
                  that.$Message.destroy();
                  that.showModel = false;
                  var deptId = that.getSelectedDept() != null ? that.getSelectedDept().id : null;
                  that.refreshUserData(that.initpage.current, that.initpage.size, deptId, that.searchName.username, that.searchName.name);
                }
              });
            }
          } else {
            that.$Message.error('请按照要求填写!');
          }
        })
      },
      // 取消新增内容
      handleReset(name) {
        this.showModel = false
        if (this.title === '新增') {
          this.$refs[name].resetFields();
        }
      },
      // 更新用户角色
      submitUserRoles() {
        // console.log("selected", this.$refs.userRoleTable);
        //获取选中项
        var roleIds = [];
        var savedata = {};
        savedata.userId = this.userRoleSelect.userId;
        savedata.roleIds = this.selectGroup.roleIds;
        var that = this;
        this.$AsyncDealData(datarouters.SystemManage.role.saveUserRoles, savedata, function (data) {
          if (data) {
            // console.log("save userRole" ,data.data);

            that.showUserRoleModel = false;
          }
        }, true);


      },
      clearqueryrole() {
        this.searchName.roleName = '';
      },
      searchroles() {
        //根据名称搜索角色
        this.showUserRoles({current: 1, size: 10}, null, false, false);

      },
      showUserRoles(page, data, search, show) {


        var that = this;

        if (search) {
          if (this.selectionArr.length > 0) {
            this.userRoleSelect = data;
          } else {
            this.$Message.destroy()
            this.$Message.warning('请选择目标项');
            return
          }
        }
        if (show) {
          if (this.selectionArr.length > 0) {
            that.selectGroup.roleIds = [];
            that.searchName.roleName = '';
            that.showUserRoleModel = true;
            // console.log(this.userRoleSelect);
            var userroleids = this.$SyncAskData(datarouters.SystemManage.role.arrangeUserRoles, {userId: this.userRoleSelect.userId}, true);
            // console.log(userroleids);
            if (userroleids.data.length > 0) {
              userroleids.data.forEach(e => {
                that.selectGroup.roleIds.push(e.roleId);
              });

            }
          }
        }
        var pagedata = {};
        pagedata.current = page.current;
        pagedata.size = page.pageSize;
        pagedata.userId = this.userRoleSelect.userId;
        if (!NeizhenUtil.isEmpty(this.searchName.roleName)) {
          pagedata.roleName = this.searchName.roleName;
        }
        that.$AsyncDealData(datarouters.SystemManage.role.userRoles, pagedata, function (data) {
          if (data) {
            // console.log(data.data);
            that.$Message.destroy();
            var mdata = data.data.records;

            // console.log("roleIds", that.selectGroup);

            mdata.forEach(e => {
              that.selectGroup.roleIds.forEach(mrole => {
                if (e.roleId == mrole) {
                  e._checked = true;
                }
              });

              /*if (e.userSelection == 1) {
                that.selectGroup.roleIds.push(e.roleId);
                e._checked = true;
              }*/
            });

            that.userRoleData.data = mdata;
            that.userRoleData.total = data.data.total;
            // 设置选中

            //that.userRoleData.data[0].selection._checked = true;
            /*data.data.records.forEach((e,index) => {
              if (e.userSelection == 1) {
                that.$refs.userRoleTable.$refs.tbody.objData[index]._isChecked = true;
              }
            });*/

          }

        });

      },

      // 新增、修改
      EditData(type, params) {
        let that = this
        this.title = type === 'add' ? '新增' : '编辑';
        this.oper = type;


        // console.log(params);
        if (type === 'edit') {

          this.$AsyncDealData(datarouters.SystemManage.user.userdeptCharge, {userId: params.row.userId}, function (data) {
            if (data.data) {
              var ids = [];
              data.data.depts.forEach(e => {
                ids.push(e.deptId);
              });
              that.formValidate.chargeDeptIds = ids;
              that.formValidate.chargeDepartment = data.data.deptnames;
            }

          });
          this.formValidate.userId = params.row.userId;
          this.formValidate.userCode = params.row.userCode;
          this.formValidate.username = params.row.username;
          this.formValidate.name = params.row.name;
          this.formValidate.deptName = params.row.deptName;
          this.formValidate.deptId = params.row.deptId;
          //this.formValidate.charge = NeizhenUtil.isEmpty(params.row.charge) ? false : params.row.charge;

          this.formValidate.type = this.options.roleDatas[NeizhenUtil.selectOptionValue(this.options.roleDatas, params.row.type)].value;
          this.formValidate.state = this.options.stateDatas[NeizhenUtil.selectOptionValue(this.options.stateDatas, params.row.state)].value;
          this.formValidate.createTime = params.row.createTime
        } else {


          if (this.deptTreeSelect.length < 1) {
            this.$Message.warning("请先选择一个机构再增加用户！");
            return;

          }


          this.formValidate.userCode = '';
          this.formValidate.username = '';
          this.formValidate.name = '';
          this.formValidate.charge = false;
          this.formValidate.deptName = this.deptTreeSelect.title;
          this.formValidate.deptId = this.deptTreeSelect.id;
          this.formValidate.type = this.options.roleDatas[0].value;
          this.formValidate.state = this.options.stateDatas[0].value;
          this.formValidate.createTime = '';
        }
        this.showModel = true

      },
      // 删除
      remove(index, row) {
        var _this = this;
        if (this.selectionArr.length > 0) {
          if (row.sysFlag == 0) {
            this.$Message.info("此为系统管理员，不允许删除！");
            return;
          }
          this.$confirm('是否确认删除用户' + row.name + "？", '提示', {
            // confirmButtonText: '确定',
            // cancelButtonText: '取消',
            type: 'warning'
          }).then(data => {
            _this.$AsyncDealData(datarouters.SystemManage.user.delete,
              {id: row.userId}, function (data) {
                _this.searchusers();

              });

          }).catch(function (err) {
          })
        } else {
          this.$Message.destroy()
          this.$Message.warning('请选择目标项');
        }
      },
      fTablePage(pageData) { // 分页
        var deptId;
        if (this.deptTreeSelect != null) {
          deptId = this.deptTreeSelect.id;
        }
        this.initpage.current = pageData.current;
        this.refreshUserData(pageData.current,
          pageData.pageSize,
          deptId,
          this.searchName.username,
          this.searchName.name);
        //this.tableSearch = {...this.tableSearch, ...pageData}
      },

      // 角色表刷新
      fTablePage2(pageData) {


        this.showUserRoles(pageData, this.userRoleSelect, false, false)


      },


      frolechecked(selection, checkrow) {
        this.selectGroup.roleIds.push(checkrow.roleId);

      },

      froleunchecked(selection, uncheckrow) {

        for (var i = 0; i < this.selectGroup.roleIds.length; i++) {
          if (this.selectGroup.roleIds[i] == uncheckrow.roleId) {
            this.selectGroup.roleIds.splice(i, 1);
            break;
          }
        }
      },

      fnusermngdeptcheck(selection) {
        this.selectGroup.deptIds = [];
        selection.forEach(e => {
          this.selectGroup.deptIds.push(e.id);
        });
      },

      closeChoiceDeptModal(olddata, selectdept, close) {

        console.log(olddata);
        console.log(selectdept);
        if (close) {
          this.chooseDepartment.state = false;
          return;

        }

        if (selectdept != null) {
          // 改变部门
          if (olddata[0].type == "1") {

            this.formValidate.deptId = selectdept[0].id;
            this.formValidate.deptName = selectdept[0].name;


          } else {
            var that = this;
            this.formValidate.chargeDeptIds = [];
            selectdept.forEach(e => {
              this.formValidate.chargeDeptIds.push(e.id);
              this.formValidate.chargeDepartment += this.formValidate.chargeDepartment == '' ? e.name : ("," + e.name);
            });

          }
        }

        this.chooseDepartment.state = false;

      },

      resetPwd(row) {
        var _this = this;
        if (this.selectionArr.length > 0) {
          this.$confirm("此操作将重置用户密码，确定要继续么？", '提示', {
            // confirmButtonText: '确定',
            // cancelButtonText: '取消',
            type: 'warning'
          }).then(data => {
            _this.$AsyncDealData(datarouters.SystemManage.user.resetpwd,
              {userId: row.userId}, function (data) {
                //_this.searchusers();
                _this.$Message.info("重置密码成功，密码重置为六个1！");

              });

          }).catch(function (err) {
          })
        } else {
          this.$Message.destroy()
          this.$Message.warning('请选择目标项');
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .userManage {
    height: 100%;
    background: #fff;

    .ivu-btn {
      margin-left: 10px;
    }

    .ivu-row {
      height: 100%;

      .userTree {
        overflow: hidden;
        overflow-y: auto;
        height: calc(100% - 60px);
        padding: 15px 15px;

        .ivu-tree {
          text-align: left;
        }
      }

      .ivu-col-span-19 {
        height: 100%;

        .tableHeight {
          height: calc(100% - 120px);
          padding: 0 15px;
        }
      }
    }

    .button-group {
      padding: 15px 15px 10px;
    }
  }

</style>


