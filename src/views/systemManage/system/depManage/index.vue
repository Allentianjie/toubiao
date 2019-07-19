<template>
  <div class="depManage">
    <Row style="height:100%">
      <Col style="height:100%" span="6" class="depBtn">
      <div class="funBtn">
        <!-- <Button type="primary" :disabled="treedisabled" @click="EditData('add')">添加</Button>
         <Button type="primary" :disabled="treedisabled" @click="EditData('edit')">编辑</Button>
         <Button type="primary" :disabled="treedisabled" @click="remove">删除</Button>-->
        <!--<el-button  type="primary" :disabled="treedisabled" @click="EditData('add')" size="small">添加</el-button>
        <el-button  type="primary" :disabled="treedisabled" @click="EditData('edit')" size="small">编辑</el-button>
        <el-button  type="primary" :disabled="treedisabled" @click="remove" size="small">删除</el-button>-->
      </div>
      <div class="userTree">
        <Tree id='taskTreeL' ref="deptTree" :baseData="baseData" @fSelectTreeData="setUserDept" :showBox="false"></Tree>
      </div>
      </Col>
      <Col span="18" style="height:100%">
      <div class="funBtn">
        <el-button class="funaddBtn" type="primary" @click="EditData('add')" size="small">添加</el-button>
      </div>
      <div class="fromTable">
        <Table style="overflow: auto" :tableData="deptData" ref="deptTable" @ftablePage="fDeptTablePage"></Table>
      </div>
      </Col>
    </Row>

    <!-- 用户部门 -->
    <Modal v-model="showDeptModal" class-name="editUserModal" width="50"
           :mask-closable="false" @on-cancel="showDeptModal = false">
      <p slot="header">
        <span>部门管理</span>
      </p>


      <div class="fromTable">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="上级部门" prop="parenNode">
            <Input :disabled="true" v-model="formValidate.parenNode" placeholder="请输入父级节点"></Input>

          </FormItem>
          <FormItem label="节点编号" prop="nodeNum" v-if="showNode">
            <Input :disabled="dcodedisable" v-model="formValidate.nodeNum" placeholder="请输入节点编号"></Input>
          </FormItem>
          <FormItem label="部门名称" prop="depName">
            <Input :disabled="disabled" v-model="formValidate.depName" placeholder="请输入部门名称"></Input>

          </FormItem>
          <FormItem label="教学单位" prop="teachUnit">
            <Select v-model="formValidate.teachUnit" :disabled="disabled">
              <Option v-for="item in teachUnit" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="机构层级" prop="orgLevel">
            <Select v-model="formValidate.orgLevel" :disabled="disabled">
              <Option v-for="item in orgLevel" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否诊改" prop="orgLevel">
            <el-radio-group v-model="formValidate.joinHie" :disabled="disabled">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </FormItem>
        </Form>
      </div>


      <div slot="footer" v-show="!disabled">
        <el-button @click="handleSubmit('formValidate')" type="primary" size="small">保存</el-button>
        <el-button @click="handleReset('formValidate')" style="margin-left: 8px" size="small">取消</el-button>
      </div>
    </Modal>

    <ChoiceMan ref="chargeManModal" :choiceMan="choiceMan" @closeMain="closeChoiceManModal"></ChoiceMan>


  </div>


</template>

<script>
  import Tree from '@/components/tree'
  import Table from '@/components/table'
  import Vue from 'vue'
  import {NeizhenUtil, datarouters} from "../../../../util/datarouters"
  import ChoiceMan from "./chargeMan"


  import store from "@/store";

  export default {
    components: {Tree, Table, ChoiceMan},
    name: 'index',
    data() {


      return {
        isClinical: "",//是否参与诊改
        showNode: true, // 是否显示节点编号
        disabled: true, // 表格禁用
        showDeptModal: false, // 展现部门模块
        dcodedisable: true,
        treedisabled: false, //树禁用
        maskel: null,    // 遮罩层
        spinShow: false,
        initPage: {current: 1, pageSize: 10},
        baseData: [], // 树形数据
        treeDefaultData: [], // 默认部门树
        choiceMan: {
          state: false,
          data: [],
          deptName: ''
        },
        deptData: {
          columns: [

            {
              title: '部门名称',
              align:"center",
              key: 'name',
              tooltip: true,
            },
            {
              title: '上级部门',
               align: 'center',
              ellipsis: true,
//              tooltip: true,
              render: (h, params) => {
                var that = this;
                var pid = params.row.parentId;
                return h('div', [
                  h(
                    'span',
                    {
                      style: {},
                      //就是这里加的属性
                      domProps: {
                        title: that.searchparentName(pid)
                      }
                    },
                    that.searchparentName(pid)
                  )
                ])
              },
//              render: (h, params) => {
//                var that = this;
//                var pid = params.row.parentId;
//                return h("div", [that.searchparentName(pid)]);
//              }
              // width: 90
            },
            {
              title: '教学单位',
              align:"center",
              tooltip: true,
              render: (h, params) => {


                let state = params.row.organType;
                return NeizhenUtil.tableValueReplace(h, params.row, "organType", this.teachUnit);

              }

            },
            {
              title: '机构层级',
              align:"center",
              // width: 100,
              tooltip: true,
              render: (h, params) => {


                let state = params.row.organLevel;
                return NeizhenUtil.tableValueReplace(h, params.row, "organLevel", this.orgLevel);


              }
            },
            {
              title: '是否诊改',

              // width: 100,
              tooltip: true,
              align:"center",
              render: (h, params) => {
                if (Object.keys(params.row).includes('joinHie')) {
                  const text = params.row.joinHie == 1 ? '是' : params.row.joinHie == 0 ? '否' : '--';
                  return h("div", [h('span',text)]);
                } else {
                  return h("div", [h('span','--')]);
                }
              }
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
                        this.EditData('look', params.row)
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
                        this.EditData('edit', params.row)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      icon: "ios-trash-outline",
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      // marginRight: '5px'
                      color: "#f04409",
                      fontSize: '14px'
                    },
                    on: {
                      click: () => {
                        this.remove(params.index, params.row)
                      }
                    }

                  }, '删除'),
                  h('Button', {
                    props: {
                      icon: "ios-trash-outline",
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      // marginRight: '5px'
                      color: "#f04409",
                      fontSize: '14px'
                    },
                    on: {
                      click: () => {
                        this.choiceChargeMan(params.row)
                      }
                    }

                  }, '负责人'),

                ])
              }
            }

          ],
          data: [],
          total: 100

        },

        orgLevel: [{
          value: '1',
          label: '校级'
        },
          {
            value: '2',
            label: '院系'
          },
          {
            value: '3',
            label: '专业'
          },
          {
            value: '4',
            label: '班级'
          }],
        teachUnit: [{
          value: '1',
          label: '是'
        },
          {
            value: '0',
            label: '否'
          }],
        formValidate: {
          parenNode: '',
          nodeNum: '',
          depName: '',
          detId: '',
          teachUnit: 1,
          orgLevel: 1,
          sort: 1,
          joinHie: 1
        }, // 表单数据绑定
        ruleValidate: {

          nodeNum: [
            {required: true, message: '节点编号不能为空', trigger: 'blur'}
          ],
          depName: [
            {required: true, message: '部门名称不能为空', trigger: 'blur'}
          ]
        }, // 表单验证
        treeSelect: []
      }
    },
    created() {
      var that = this;
      this.loaddeptTree();

      //显示所有部门
      this.refreshDepartment();
    },

    methods: {
      closeChargeMan(data) {
        console.log("deptChargeMan Close", data);
      },
      fDeptTablePage(pageval) {


        this.refreshDepartment(null, pageval.current, this.treeSelect != null ? this.treeSelect.id : null);

      },

      loaddeptTree() {
        var that = this;
        //let data=store.state.chooseDept
        this.$AsyncDealData(datarouters.SystemManage.department.treemenu, null, function (data) {

          var m = NeizhenUtil.treeDataToStandardTreeData(data.data, {
            "id": "id",
            "name": "name",
            "pid": "parentId",
            "children": "children"
          });
          that.treeDefaultData = m;
          that.setBaseData(that.treeDefaultData);

        });
      },

      setenabledtree() {
        var mdata = NeizhenUtil.deepClone(this.treeDefaultData);
        var diabletree = function (bdata) {
          bdata.forEach(e => {
            e.disabled = false;
            if (e.children != null && e.children.length > 0) {
              diabletree(e.children);

            }
          });
        };
        if (this.treedisabled) {
          diabletree(mdata);

        }

        this.setBaseData(mdata);
      },
      setBaseData(data) {

        this.baseData = data;

      },
      // 选择部门负责人
      choiceChargeMan(row) {


        var that = this;
        this.$AsyncDealData(datarouters.SystemManage.department.getdepartcharge, {deptId: row.deptId}, function (data) {

          var uids = [];


          that.choiceMan.data = [];
          that.choiceMan.data.push({deptId: row.deptId, "selectids": data.data});
          that.choiceMan.deptName = row.name;

          that.choiceMan.state = true;

          that.$refs.chargeManModal.loaddata(NeizhenUtil.isEmpty(data.data) ? [] : data.data.split(","));

        });

      },


      closeChoiceManModal(pdata, choicemans, selectall) {


        var that = this;
        if (selectall) {
          // 全选

        } else {
          if (choicemans == null) {
            this.choiceMan.state = false;
            return;
          }
          if (choicemans.length > 0) {
            let deptId = pdata[0].deptId;
            let oldids = pdata[0].selectids;

            if (choicemans.length > 0) {

              let userids = NeizhenUtil.ojoin(choicemans, ",", null);
              console.log("userids", userids);

              // 当两个不一样的时候

              this.$AsyncDealData(datarouters.SystemManage.department.savedepartcharge,
                {
                  deptId: deptId,
                  charges: userids
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

      // 保存按钮
      handleSubmit(name) {
        var that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.info('数据填写正确，正在存储!');
            if (this.operator == "add") {
              // 新增
              this.$AsyncDealData(datarouters.SystemManage.department.insert,
                {
                  "name": this.formValidate.depName,
                  "sort": this.formValidate.sort,
                  "deptCode": this.formValidate.nodeNum,
                  "parentId": this.formValidate.parenNodeId,
                  "organType": this.formValidate.teachUnit,
                  "joinHie": this.formValidate.joinHie,
                  "organLevel": this.formValidate.orgLevel
                },
                function (data) {
                  if (data) {
                    // console.log(data)

                    if (data.code == 0) {
                      //获得部门树
                      that.$AsyncDealData(
                        datarouters.SystemManage.department.treemenu,
                        null,
                        res => {
                          that.$store.commit("setChooseDept", res.data);
                          that.$Message.destroy();
                          that.handleReset("formValidate");
                          that.loaddeptTree();
                        }
                      );

                    }

                  }
                });
            } else {
              // 修改
              this.$AsyncDealData(datarouters.SystemManage.department.update,
                {
                  "name": this.formValidate.depName,
                  "sort": this.formValidate.sort,
                  "deptCode": this.formValidate.nodeNum,
                  "parentId": this.formValidate.parenNodeId,
                  "organType": this.formValidate.teachUnit,
                  "organLevel": this.formValidate.orgLevel,
                  "deptId": this.formValidate.deptId
                },
                function (data) {
                  if (data) {

                    that.$Message.destroy();
                    that.handleReset("formValidate");
                    that.loaddeptTree();
                  }
                });
            }
          } else {
            this.$Message.error('请按照要求填写!');
          }
        })
      },
      // 取消新增内容
      handleReset(name) {
        this.$refs[name].resetFields();
        this.operator = '';
        this.dcodedisable = true;
        this.disabled = true;
        this.showNode = true;
        this.treedisabled = false;
        this.spinShow = false;
        /*if (this.maskel != null) {
          this.maskel.close();
        }*/
        this.showDeptModal = false;


      },
      // 添加、编辑按钮
      EditData(type, row) {
        this.operator = type;
        if (type === 'add') {

          if (this.treeSelect.length < 1) {

            this.$Message.warning("请先选择一个部门作为上级部门！");
            return;

          } else {

            this.formValidate.parenNode = this.treeSelect.extdata.orignData.name;
            this.formValidate.depName = '';
            this.formValidate.parenNodeId = this.treeSelect.extdata.id;
            this.formValidate.sort = 1;
            this.formValidate.nodeNum = '';
            this.formValidate.depId = '';
            this.formValidate.teachUnit = 1;
            this.formValidate.orgLevel = 1;
            this.dcodedisable = false;
            this.formValidate.teachUnit = this.teachUnit[0].value;
            this.formValidate.orgLevel = this.orgLevel[0].value;
            this.disabled = false;
            this.showNode = false;
            this.treedisabled = true;
            this.spinShow = true;
            //this.maskel = this.$mask(this.$refs.deptTree.$el);

          }

        } else {

          console.log("row", row);

          this.formValidate.parenNode = this.searchparentName(row.parentId);
          this.formValidate.depName = row.name;
          this.formValidate.parenNodeId = row.parentId;
          this.formValidate.sort = row.sort;
          this.formValidate.nodeNum = row.deptCode;
          this.formValidate.depId = row.deptId;
          this.formValidate.teachUnit = this.teachUnit[NeizhenUtil.selectOptionValue(this.teachUnit, row.organType)].value;
          this.formValidate.orgLevel = this.orgLevel[NeizhenUtil.selectOptionValue(this.orgLevel, row.organLevel)].value;


          this.treedisabled = true;
          this.disabled = false;
          this.showNode = false;
          if (type == 'look') {
            this.disabled = true;
          }


        }

        this.showDeptModal = true;


      },
      // 删除按钮
      remove(id) {

        //
        if (this.treeSelect.children.length > 0) {
          this.$Message.error("还存在着子部门，请先删除子部门！");
          return;
        }


        var that = this;

        this.$confirm("确定要删除部门么？", "提示", {
          type: "warning"
        }).then(() => {
          that.$AsyncDealData(datarouters.SystemManage.department.delete, {id: id}, function (data) {

            //that.deleteByTreeId(that.treeSelect.id);
            that.loaddeptTree();

          });

        }).catch(() => {

        });


      },

      deleteByTreeId(treeId) {
        let data = store.state.chooseDept;
        console.log("delete from store", data);
        var searchtree = function (searchdata, id) {
          for (let i = 0; i < searchdata.length; i++) {
            if (searchdata[i].id == id) {
              searchdata.splice(i, 1);
              store.setChooseDept(data);
              return;
            }

            if (searchdata[i].children.length > 0) {
              searchtree(searchdata[i].children, id);
            }
          }
        }


        searchtree(data, treeId);

      },
      searchparentName(parentId) {
        let parentName;

        var searchParentName = function (searchdata, searchpid) {
          searchdata.forEach(e => {
            if (e.id == searchpid) {
              parentName = e.extdata.name;
              return;

            } else {
              if (e.children.length > 0) {
                searchParentName(e.children, searchpid);
              }
            }
          });
        };
        searchParentName(this.baseData, parentId);

        return parentName;
      },

      refreshDepartment(pagesize, pageindex, deptId) {
        var queryObj = {
          current: pageindex ? pageindex : this.initPage.current,
          size: pagesize ? pagesize : this.initPage.pageSize,
          pid: deptId ? deptId : "1"

        };
        var that = this;

        this.$AsyncDealData(datarouters.SystemManage.department.page, queryObj, function (data) {
          that.deptData.data = data.data.records;
          that.deptData.total = data.data.total;
        });

      },
      // 树形选择候的数据返回
      setUserDept(data) {

        console.log(222, data)

        if (data.length < 1) {
          this.handleReset("formValidate");
          return;

        }


        this.treeSelect = data[0];

        this.refreshDepartment(null, null, data[0].id);


      },


    }
  }
</script>

<style lang="less" scoped>
  .depManage {
    height: 100%;
    background: #fff;
    // padding: 0 10%;
    .depBtn {
      > .funBtn {
        font-size: 0;
        > .el-button {
          border-radius: 0;
        }
        > .el-button:nth-of-type(1) {
          border-radius: 4px 0 0 4px;
        }
        > .el-button:nth-of-type(2) {
          margin: 0 1px;
        }
        > .el-button:nth-of-type(3) {
          margin-left: 0;
          border-radius: 0 4px 4px 0;
        }
      }
      > .userTree {
        overflow: hidden;
        overflow-y: auto;
        height: calc(100% - 60px);
        padding: 5px 15px;
        .ivu-tree {
          text-align: left;
        }
      }
    }
    .fromTable {
      padding-top: 30px;
      padding-right: 15px;
      padding-left: 15px;
      height: calc(100% - 60px);

    }
    .footer {
      margin-left: 80px;
      text-align: left;
    }
  }
</style>
