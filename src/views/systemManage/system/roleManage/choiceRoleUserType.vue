<template>

    <!--部门树形弹框-->
    <Modal v-model="choiceDefRoleUserType.state" class-name="depModal" width="50"
           :mask-closable="false" @on-cancel="choiceDefRoleUserType.state = false">
      <p slot="header">
        <span>【{{ choiceDefRoleUserType.roleName }}】选择用户类型</span>
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
                show-checkbox
                check-strictly
                @check-change="checkchange"
                @node-click="handleNodeClick"
                :default-expanded-keys="[1]" node-key="id"
                ref="deptTreeChoice"
              ></el-tree>
            </div>
          </el-col>
          <el-col :span="14">
            <el-table
              ref="multipleTable"
              :data="userTypeData"
              tooltip-effect="dark"
              style="width: 100%"
              @select="rowSelection"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <el-table-column
                prop="label"
                label="用户类型"
                width="120">
              </el-table-column>

            </el-table>
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

  import {globalData} from "../../../../util/globaldata";
  import {datarouters, NeizhenUtil} from "../../../../util/datarouters";
  import store from "@/store";

  export default {

    components: {},
    props: {
      choiceDefRoleUserType: {
        state: false,
        roleName : '',
        data: [],
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

      //this.parentData = this.choiceDefRoleUserType.data;
    },

    data() {
      return {
        titleText: "选择用户类型",
        btnText: "确定",
        parentData: null,
        deptData : [],
        searchName: '',
        defaultProps: {
          children: "children",
          label: "name"
        },
        searchDeptTree: "", // 部门搜索框绑定值
        userTypeData : globalData.System.userTypes,
        chooseType : [],
        selectedTree : null
      };
    },
    methods : {
      //过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      loaddata() {
        var that = this;
        this.deptData = store.state.chooseDept;
        this.$refs.multipleTable.clearSelection();
        that.$refs.deptTreeChoice.setCheckedKeys([]);
        this.$nextTick(function(){
          that.$AsyncDealData(datarouters.SystemManage.role.roleUserTypes, {
            roleId : that.choiceDefRoleUserType.data[0].roleId
          }, function (data) {
            // 清空

            var deptIds = data.data.depIds;
            var utypes = data.data.utypes;

            deptIds.forEach(e => {
              that.$refs.deptTreeChoice.setChecked(e, true, false);
            });
            // 设置用户类型
            utypes.forEach(e => {
              that.$refs.multipleTable.toggleRowSelection(that.userTypeData[e]);
            });

          })

        });
      },

      checkchange(node, choose, child) {
        console.log("node", node);
        console.log("choose", choose);
        console.log("child", child);


      },

      refreshUserTypes(deptId) {
        var roleId = this.choiceDefRoleUserType.data[0].roleId;
        var that = this;
        that.$refs.multipleTable.clearSelection();
        this.$AsyncDealData(datarouters.SystemManage.role.roleUserTypes, {roleId : roleId, deptId : deptId}, function (data) {

          if (data.data.length > 0) {

            data.data.forEach(e => {
              that.userTypeData.forEach((me, index) => {
                if (e.userType == me.value) {
                  that.$refs.multipleTable.toggleRowSelection(that.userTypeData[index]);
                }
              });
            });


          }

        });

      },

      rowSelection(selections, row) {
        this.chooseType = [];
        selections.forEach(e => {
          this.chooseType.push(e.value);
        });
        /*var roleId = this.choiceDefRoleUserType.data[0].roleId;
        if (this.selectedTree == null) {
          return;
        }
        var deptId = this.selectedTree.id;
        var ojoin = NeizhenUtil.ojoin(selections, ",", function (e) {
          return e.value;
        });
        this.$AsyncDealData(datarouters.SystemManage.role.saveRoleUserTypes,
          {roleId : roleId,
            deptId : deptId,
            usertypes : ojoin}, function (data) {

        });*/

      },

      handleNodeClick(data) {
        /*console.log("tree click", data);
        this.selectedTree = data;
        this.refreshUserTypes(data.id);*/
      },

      //确定选择
      subDeptData(){
        var nodes = this.$refs.deptTreeChoice.getCheckedNodes(false, false);
        var deptIds = NeizhenUtil.ojoin(nodes, ",", function (e) {
          return e.id;
        });


        this.$emit("closeRoleUserTypeMain", this.choiceDefRoleUserType.data, this.chooseType, deptIds, false);


      },


      //关闭
      closeModal() {

        this.$emit("closeRoleUserTypeMain", this.choiceDefRoleUserType.data, [], null, false);


      },

    }
  }

</script>
