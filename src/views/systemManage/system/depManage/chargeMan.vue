<template>
  <!--部门树形弹框-->
  <Modal v-model="choiceMan.state" class-name="depModal" width="80"
         :mask-closable="false" @on-cancel="choiceMan.state = false">
    <p slot="header">
      <span>【{{ choiceMan.deptName }}】 负责人选择 </span>
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
                ref="chargeManTable"
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
        deptName : '选择负责人',
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
      this.parentData = this.choiceMan.data;

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


        this.chooseMans = ids;

        // 设置用户
        this.refreshUserData(1, 10);
      },
      rowSelection(selections, row) {

        var found = false;
        for(var i = 0; i < this.chooseMans.length; i++) {
          if (row.userId == this.chooseMans[i]) {
            this.chooseMans.splice(i, 1);
            found = true;
            break;
          }
        }

        if (!found) {
          this.chooseMans.push(row.userId);
        }

        console.log("afterselection", this.chooseMans);



      },

      refreshUserData(pageindex, pagesize,deptId, name) {

        var queryobj = {};

        queryobj.current = pageindex;
        queryobj.size = pagesize;

        NeizhenUtil.isEmpty(deptId) ?  {} : (queryobj.deptId = deptId);
        NeizhenUtil.isEmpty(name) ? {} : (queryobj.name = name);

        var that = this;
        this.$AsyncDealData(datarouters.SystemManage.user.page, queryobj, function(data){


          that.usertableData = data.data.records;
          that.pageTotal = data.data.total;

          //that.setUserSelect(that.parentData, that.usertableData, that.$refs.chargeManTable);

          that.$refs.chargeManTable.clearSelection();
          that.$nextTick(() => {
            var userids = that.chooseMans;
            console.log("choosemans", userids);

            if (userids.length > 0) {
              var ids = userids;
              if (ids.length > 0) {
                ids.forEach(e => {
                  that.usertableData.forEach((me, index) => {

                    if (me.userId == e) {

                      that.$refs.chargeManTable.toggleRowSelection(that.usertableData[index]);
                    }
                  });

                });

              }



            }

          });
          // 选择用户




        });

      },
      handleNodeClick(data) {

        this.selectedTree = data;
        this.refreshUserData(1, 10, data.id);

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


        this.$emit("closeMain", this.choiceMan.data, this.chooseMans, this.chooseAll);

        console.log("关闭");
        //this.closeChoiceManModal(this.choiceMan.data, this.chooseMans, this.chooseAll);


      },
      //关闭
      closeModal() {

        this.$emit("closeMain", this.choiceMan.data, null, false);

      },

    }
  }
</script>
