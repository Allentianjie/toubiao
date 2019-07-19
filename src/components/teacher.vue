<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox" class-name="vertical-center-modal" v-model="PrincipalData.state" width="70%"
           :mask-closable="false" @on-cancel="closeModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>负责人管理</span>
      </p>
      <div style="height: 100%">
        <Tabs v-model="activeName" type="card" style="height:100%" @on-click="changeTabs">
          <TabPane name="one" label="部门筛选">
            <div style="height:100%" id="changeTeacher">
              <Row style="height:100%">
                <Col span="6" class="department">
                  <Tree
                    style="text-align:left;"
                    :baseData="baseData"
                    @fSelectTreeData="setUserDept"
                    :showBox="false"
                  ></Tree>
                </Col>
                <Col span="18" class="role">
                  <Input placeholder="姓名" v-model="searchName.searchDeptUser" style="width: auto"/>
                  <Button type="primary" icon="ios-search" @click="searchPrincipalUser">搜 索</Button>
                  <!--<el-scrollbar style="height:calc(100% - 90px)">-->
                  <Scroll style="height:calc(100% - 90px)">
                    <Table
                      ref="purchaseTable"
                      @on-select="handleSelectRow" @on-select-cancel="handleCancelRow"
                      @on-select-all="handleSelectAll" @on-select-all-cancel="handleSelectAll"
                      highlight-row
                      style="margin-top:5px;height: 100%"
                      :data="departmentData.data"
                      :columns="departmentData.columns"
                    ></Table>
                  </Scroll>
                  <!--</el-scrollbar>-->
                  <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                      <Page
                        :total="departmentData.total"
                        :current="departmentData.page"
                        @on-change="changePagedepartment"
                      ></Page>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane name="two" label="角色筛选">
            <div style="height:100%">
              <Row style="height:100%">
                <Col span="7" class="department">
                  <ul>
                    <li
                      v-for="(item,index) in BaseData2"
                      :class="{active : active == item.name}"
                      :key="index"
                      @click="setUserRole(item)"
                    >{{item.name}}
                    </li>
                  </ul>
                </Col>
                <Col span="17" class="role">
                  <Input
                    placeholder="姓名"
                    v-model="searchName.searchRoleUser"
                    style="width: auto"
                  />
                  <Button type="primary" icon="ios-search" @click="searchRole">搜 索</Button>
                  <Scroll style="height:calc(100% - 90px)">
                    <Table
                      ref="purchaseTableTwo"
                      @on-select="handleSelectRow" @on-select-cancel="handleCancelRow"
                      @on-select-all="handleSelectAll" @on-select-all-cancel="handleSelectAll"
                      highlight-row
                      style="margin-top:5px;height: 100%"
                      :data="roleData.data"
                      :columns="roleData.columns"
                    ></Table>
                  </Scroll>
                  <div style="margin: 10px;overflow: hidden;text-align:right">
                    <Page
                      :total="roleData.total"
                      :current="roleData.page"
                      @on-change="changePageroleData"
                    ></Page>
                  </div>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="handleSubmit()">保存</Button>
        <!--<Button type="warning" size="large" @click="handleReset()">重置</Button>-->
      </div>
    </Modal>
  </div>
</template>

<script>
  import Tree from "@/components/tree";
  import store from "@/store";
  import {NeizhenUtil, datarouters} from "../util/datarouters";

  export default {
    components: {Tree},
    props: {
      PrincipalData: {
        type: Object,
        required: true
      }
    },
    mounted() {
      // console.log(1, this.selectReset)
    },
    data() {
      return {
        activeName: "one",
        selectedIds: new Set(),//选中的合并项的id
        selectedSum: 0, //选中的总数量
        active: "",
        searchName: {
          searchDeptUser: "",
          searchRoleUser: ""
        },
        selections: [], //选中人。
        userInitpage: {current: 1, pageSize: 10}, // 初始化页面
        departmentData: {
          //部门人员list
          columns: [
            {
              type: "selection",
              width: 60,
              align: "center"
            },

            {
              title: "姓名",
              key: "name",
              align: "center"
            },
            {
              title: "类型",
              key: "type",
              align: "center",

              render: (h, params) => {
                let state = params.row.type;
                if (state == "0") {
                  return h("div", ["学生"]);
                } else if (state == "1") {
                  return h("div", ["教师"]);
                } else if (state == "2") {
                  return h("div", ["教职工"]);
                }
              }
            }
          ],
          data: [],
          total: 5,
          page: 1,
          pageSize: 10
        },
        roleData: {
          //角色人员list
          columns: [
            {
              type: "selection",
              width: 60,
              align: "center"
            },

            {
              title: "姓名",
              key: "name",
              align: "center"
            },
            {
              title: "类型",
              key: "type",
              align: "center",

              render: (h, params) => {
                let state = params.row.type;
                if (state == "0") {
                  return h("div", ["学生"]);
                } else if (state == "1") {
                  return h("div", ["教师"]);
                } else if (state == "2") {
                  return h("div", ["教职工"]);
                }
              }
            }
          ],
          data: [],
          total: 5,
          page: 1,
          pageSize: 10
        },
        treeSelect: null, //tree选择的数据
        roleSelect: [], //角色选择的数据
        baseData: [],
        BaseData2: []
      };
    },
    watch: {
      activeName(newVal, oldVal) {
        if (newVal == "one") {
          this.changePagedepartment(this.departmentData.page)
        } else {
          this.changePageroleData(this.roleData.page)
        }
      }
    },

    created() {
    },
    methods: {
      changeTabs(tab) {
        this.activeName = tab
      },
      handleSelectAll(selection) {
        // 取消全选 数组为空
        if (selection.length === 0) {
          // cy 若取消全选，删除保存在selectedIds里和当前table数据的id一致的数据，达到，当前页取消全选的效果
          // 当前页的table数据
          let data = this.$refs.purchaseTable.data
          data.forEach((item) => {
            if (this.selectedIds.has(item.userId)) {
              this.selectedIds.delete(item.userId);
              this.selections.splice(item);
            }
          })

        } else {
          selection.forEach(item => {
            this.selectedIds.add(item.userId);
            this.selections.push(item)
          })
        }
        //同步
        this.selectedSum = this.selectedIds.size
      },
      //  选中某一行
      handleSelectRow(selection, row) {
        this.selectedIds.add(row.userId);
        this.selections.push(row);
      },
      //  取消某一行
      handleCancelRow(selection, row) {
        this.selectedIds.delete(row.userId);
        this.selections.splice(row);
      },
      //  这个函数就放在你点击翻页的函数里就行了（需要注意要在table将数据渲染完毕后执行，否则报错），
      //  达到每次翻页加载时将以前选中的row勾选上的效果
      // cy 给跨页丢失的选中行重新添加选中状态
      setChecked() {
        // 找到绑定的table的ref对应的dom，找到table的objData对象，objData保存的是当前页的数据
        let objData = this.$refs.purchaseTable.objData;
        for (let index in objData) {
          // cy 设置审批状态为拒绝的采购单的默认勾选状态为 禁止
          // if (objData[index].groupAuditStatus === '4') {
          //   objData[index]._isDisabled = true
          // }
          if (this.selectedIds.has(objData[index].userId)) {
            // cy 弊端 每次切换select都会触发table的on-select事件
            // this.$refs.purchaseTable.toggleSelect(index) // 在保存选中的ids的set合集里找与当前页数据id一样的行，使用toggleSelect（index），将这一行选中
            // cy 改进
            objData[index]._isChecked = true
          }
        }
      },
      setCheckedTwo() {
        let objData = this.$refs.purchaseTableTwo.objData;
        for (let index in objData) {
          // cy 设置审批状态为拒绝的采购单的默认勾选状态为 禁止
          // if (objData[index].groupAuditStatus === '4') {
          //   objData[index]._isDisabled = true
          // }
          if (this.selectedIds.has(objData[index].userId)) {
            // cy 弊端 每次切换select都会触发table的on-select事件
            // this.$refs.purchaseTable.toggleSelect(index) // 在保存选中的ids的set合集里找与当前页数据id一样的行，使用toggleSelect（index），将这一行选中
            // cy 改进
            objData[index]._isChecked = true
          }
        }
      },

      //第一次加载
      loadData() {
        this.selections = [];
        var that = this;
        var treeData = NeizhenUtil.treeDataToStandardTreeData(
          store.state.chooseDept,
          {
            id: "id",
            name: "name",
            pid: "parentId",
            children: "children"
          }
        );
        this.baseData = treeData;
        this.searchPrincipalUser();
        // 初始化角色
        var page = {};
        page.current = 1;
        page.size = 500;
        this.BaseData2 = [];
        this.roleData.data = [];
        this.$AsyncDealData(
          datarouters.SystemManage.role.page,
          page,
          function (data) {
            if (data) {
              var sdata = data.data.records;
              var rolelist = [];
              sdata.forEach(e => {
                var kdata = {id: e.roleId, name: e.roleName};
                rolelist.push(kdata);
              });
              that.BaseData2 = rolelist;
              that.setUserRole(that.BaseData2[0]);
              that.roleUserSearch(
                that.userInitpage.current,
                that.userInitpage.pageSize
              );
            }
          }
        );
      },
      searchPrincipalUser() {
        var deptId = "";
        if (this.treeSelect) {
          deptId = this.treeSelect.id;
        }
        this.refreshUserData(
          this.userInitpage.current,
          this.userInitpage.pageSize,
          deptId,
          this.searchName.searchDeptUser
        );
      },

      searchRole() {
        this.roleUserSearch(
          this.userInitpage.current,
          this.userInitpage.pageSize
        );
      },

      roleUserSearch(pageindex, pagesize) {
        let deptId = '';
        this.$Get("/admin/user/getUsersPagesForAssign?deptId=" + deptId
          + "&identId=" + this.PrincipalData.data.data.identId
          + "&current=" + pageindex
          + "&size=" + pagesize
          + "&name=" + this.searchName.searchRoleUser
          + "&roleId=" + this.roleSelect.id, null, res => {
          this.roleData.data = res.data.records;
          this.roleData.total = res.data.total;
          setTimeout(() => {
            this.setCheckedTwo()
          }, 500)
        })
      },
      getTree(tree) {
        let arr = [];
        if (!!tree && tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
            obj.id = item.id;
            obj.title = item.name;
            obj.expand = item.expand;
            obj.children = this.getTree(item.children); // 递归调用
            arr.push(obj);
          });
        }
        return arr;
      },

      refreshUserData(pageindex, pagesize, deptId, name) {
        this.$Get("/admin/user/getUsersPagesForAssign?deptId=" + deptId
          + "&identId=" + this.PrincipalData.data.data.identId
          + "&current=" + pageindex
          + "&size=" + pagesize
          + "&name=" + name, null, res => {
          this.departmentData.data = res.data.records;
          this.departmentData.total = res.data.total;
          setTimeout(() => {
            this.setChecked()
          }, 500)

        })
        // var queryobj = {};
        //
        // queryobj.current = pageindex;
        // queryobj.size = pagesize;
        //
        // NeizhenUtil.isEmpty(deptId) ? {} : (queryobj.deptId = deptId);
        // NeizhenUtil.isEmpty(name) ? {} : (queryobj.name = name);
        //
        // var that = this;
        //
        // this.$AsyncDealData(
        //   datarouters.SystemManage.user.page,
        //   queryobj,
        //   function(data) {
        //     //console.log(data.data);
        //
        //     that.departmentData.data = data.data.records;
        //     that.departmentData.total = data.data.total;
        //   }
        // );
      },
      // 分页查看
      changePagedepartment(val) {
        //console.log("page",val);
        this.departmentData.page = val;
        //this.getDepartmenList();
        var deptId = "";
        if (this.treeSelect) {
          deptId = this.treeSelect.id;
        }

        this.refreshUserData(
          val,
          this.userInitpage.pageSize,
          deptId,
          this.searchName.searchDeptUser
        );
      },
      // 分页查看
      changePageroleData(val) {
        this.roleData.page = val;
        //this.getRoleList();
        this.roleUserSearch(val, this.userInitpage.pageSize);
      },
      //选中行
      selectRow(selection) {
        console.log(selection)
        this.selections = selection;
      },
      fTablePage(pageData) {
        // 分页
        this.tableSearch = {...this.tableSearch, ...pageData};
      },
      fTablePage2(pageData) {
        // 分页
        this.tableSearch = {...this.tableSearch, ...pageData};
      },
      //请求部门树结构
      getBaseData() {
        //   接口请求回来赋值=====>this.baseData={}
      },
      //请求校色list
      getBaseData2() {
        //   接口请求回来赋值=====>this.baseData2={}
      },
      //tree组件传过来的
      setUserDept(data) {
        this.treeSelect = data[0];

        if (this.treeSelect.length < 1) {
          this.$Message.error("请先选择一个部门！");
          return;
        }
        this.searchPrincipalUser();
        /*var deptId = this.treeSelect.extdata.id;
        var search_name = this.searchName.username;
        var search_username = this.searchName.name;

        this.refreshUserData(this.initpage.current, this.initpage.size,deptId,search_username, search_name);
*/

        //根据选择的哪一个去请求-渲染table数据===>this.departmentData部门数据
      },
      setUserRole(data) {
        this.active = data.name;
        this.roleSelect = data;
        //根据选择的哪一个去请求-渲染table数据===>this.roleData角色数据
        this.roleUserSearch(
          this.userInitpage.current,
          this.userInitpage.pageSize
        );
      },
      //关闭添加文件
      closeModal() {
        //把选中的传过去 顺便关闭modal
        let data = this.selections;
        this.$emit("closePrincipal", data);
        this.selections = [];
        this.selectedIds = new Set();//选中的合并项的id
        this.selectedSum = 0//选中的总数量
      },
      //保存
      handleSubmit() {
        // 上面选中了文件  存在 this.selections里

        //把选中的传过去 顺便关闭modal
        let data = this.selections;
        this.$emit("closePrincipal", data);
        this.selections = [];
        this.selectedIds = new Set();//选中的合并项的id
        this.selectedSum = 0//选中的总数量
      },
      //重置
      handleReset() {
      }
    }
  };
</script>
<style lang="less" scoped>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  ::-webkit-scrollbar {
    width: 6px;
    height: 16px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/

  ::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.63);
    border-radius: 6px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  /*定义滑块 内阴影+圆角*/

  ::-webkit-scrollbar-thumb {
    background-color: #719ad8;
    border-radius: 6px;

    -webkit-box-shadow: inset 0 0 6px rgba(113, 154, 216, 0.3);
  }

  .role {
    height: 100%;
    text-align: left;
    padding-left: 20px;
  }

  .active {
    color: #fff;
    background: #719ad8;
  }

  .department {
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    // border-radius: 3px;
    // -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -o-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    > ul {
      height: 100%;
      padding: 10px;
      // max-height: 400px;
      // overflow: hidden;
      // overflow-y: auto;
      // background: #719ad8;
      > li:hover {
        color: #fff;
        background: #719ad8;
        cursor: pointer;
      }

      > li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        text-decoration: none;
        list-style: none;
        border: 1px solid #ddd;
      }
    }
  }

</style>
