<template>
  <!--部门树形弹框-->
  <Modal v-model="choiceMan.state" class-name="depModal" width="80"
         :mask-closable="false" @on-cancel="choiceMan.state = false">
    <p slot="header">
      <span>【{{ choiceMan.roleName }}】选择用户</span>
    </p>
    <div style="width: 100%">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="userTree">
            <el-input placeholder="输入关键字进行过滤" v-model="searchDeptTree"></el-input>
            <el-tree
              class="filter-tree"
              :data="deptData"
              :props="defaultProps"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              :default-expanded-keys="[1]" node-key="id"
              ref="deptTreeChoice"
            ></el-tree>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="M_search">
            姓名：<Input placeholder="姓名" v-model="searchName" style="width: auto"  />

            <el-button icon="el-icon-search" @click="searchusers(1)" type="primary" size="small">搜 索</el-button>


          </div>
              <el-table
                ref="multipleTable"
                :data="usertableData"
                tooltip-effect="dark"
                style="width: 100%"
                @select="rowSelection"
                @select-all="allselectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>

                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
                </el-table-column>
                <el-table-column

                  label="类型"
                >
                  <template slot-scope="scope">

                    {{ transfer(scope.row.type) }}
                  </template>

                </el-table-column>
              </el-table>

              <div style="margin: 10px;text-align:center;overflow: hidden">
                <el-pagination

                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :hide-on-single-page = "true"
                  :total="pageTotal">
                </el-pagination>
              </div>







        </el-col>
      </el-row>
    </div>

    <div slot="footer" class="basisFooter">
      <div class="btn">
        <Button type="primary" @click="subDeptData">{{ btnText }}</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
  import store from "@/store";
  import {globalData} from "../../../../util/globaldata";
  import {NeizhenUtil, datarouters} from "../../../../util/datarouters";


  export default {

    components: {},
    props: {
      choiceMan: {
        state : false,
        data : [],
        roleName : '',
        type: Object
      }
    },
    watch: {
      searchDeptTree(val) {
        this.$refs.deptTreeChoice.filter(val);
        this.selectedTree = null;
      }

    },
    created() {



    },
    mounted() {


    },

    data() {
      return {
        titleText : "选择人员",
        btnText : "确定",
        parentData : null,
        searchName : '',
        defaultProps: {
          children: "children",
          label: "name"
        },
        state : false,
        selectedTree : null,
        currentPage : 1,
        pageTotal : 0,

        usertableData : [],
        searchDeptTree: "", // 部门搜索框绑定值
        deptData: [], // 部门树形数据赋值
        depModel: false,
        treeSelect: null, //tree选择的数据
        changeDeptData:[],
        chooseMans : [],
        chooseAll : false

      };
    },
    methods: {
      transfer(value) {
        return globalData.transfer(globalData.System.userTypes, value);
      },
      // 用户搜索
      searchusers(pageindex) {
        this.refreshUserData(pageindex ? pageindex : 1, 10, this.selectedTree == null ? null : this.selectedTree.id, this.searchName);


      },
      allselectionChange(selection) {


        if (selection.length > 0) {
          this.chooseAll = true;
        } else {

          this.chooseAll = false;
        }
      },
      // 初始化数据
      loaddata(ids) {
        // 设置部门
        this.deptData = store.state.chooseDept;

        // 设置用户
        var that = this;
        that.chooseMans = ids;
        that.refreshUserData(1, 10, 1);

      },
      rowSelection(selections, row) {
        var found = false;
        for(var i = 0; i < this.chooseMans.length; i++) {
          if (row.userId == this.chooseMans[i]) {
            this.chooseMans.splice(i, 1);
            // 后台触发删除角色用户信息
            this.$AsyncDealData(datarouters.SystemManage.role.removeRoleUsers,
              {userId : row.userId,
                roleId : this.choiceMan.data[0].roleId}, function (data) {

              });

            found = true;
            break;
          }
        }

        if (!found) {
          this.chooseMans.push(row.userId);
        }


      },

      getAllRoleUsers(roleId, deptId, pageindex, pagesize, name) {
        var that = this;

        this.$AsyncDealData(datarouters.SystemManage.role.roleUsers, {roleId : roleId, deptId : deptId}, function (data) {

          that.refreshUserData(pageindex, pagesize, deptId, name);

        });

      },


      refreshUserData(pageindex, pagesize,deptId, name) {

        var queryobj = {};

        queryobj.current = pageindex;
        queryobj.size = pagesize;

        NeizhenUtil.isEmpty(deptId) ?  {} : (queryobj.deptId = deptId);
        NeizhenUtil.isEmpty(name) ? {} : (queryobj.name = name);

        var that = this;
        this.$AsyncDealData(datarouters.SystemManage.user.page, queryobj, function(data){
          console.log("userdata", data);

          that.usertableData = data.data.records;
          that.pageTotal = data.data.total;

          //that.setUserSelect(that.parentData, that.usertableData, that.$refs.multipleTable);

          // 选择用户

          that.$refs.multipleTable.clearSelection();
          that.$nextTick(() => {
            var userids = that.chooseMans;
            if (userids.length > 0) {
              userids.forEach(e => {
                that.usertableData.forEach((me, index) => {
                  if (me.userId == e) {
                    that.$refs.multipleTable.toggleRowSelection(that.usertableData[index]);
                  }

                });
              });
            }

          });



        });

      },
      handleNodeClick(data) {
        console.log("tree click", data);
        this.selectedTree = data;
        this.refreshUserData(1, 10, data.id, this.searchName);


      },
      //过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      handleCurrentChange(page) {
        this.searchusers(page);
      },
      //确定选择
      subDeptData(){
        if (this.selectedTree != null) {

          this.$emit("closeRoleUserMain", this.choiceMan.data, this.selectedTree.id, this.chooseMans, this.chooseAll, false);

        } else {
          this.closeModal();
        }


      },
      //关闭
      closeModal() {
        this.$emit("closeRoleUserMain", this.choiceMan.data, [], false, true);



      },

    }
  }
</script>
