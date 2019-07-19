<template>
  <div id="flowPage" ref="flowPage">
    <div class="taskSummaryItem">
      <el-row>
        <el-col :span="5" id="reviseProcessTree">
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="部门选择" name="first">
              <div :style="taskHeight" class="flowTreeDiv">
                <el-input
                  v-model="screenTree"
                  size="small"
                  placeholder="请输入关键字"
                  suffix-icon="el-icon-search"
                ></el-input>
                <el-tree class="filter-tree" id="taskTreeL" :default-expanded-keys="[1]"
                         node-key="id"
                         accordion
                         highlight-current
                         :props="defaultProps"
                         style="height:100%"
                         :data="data"
                         :filter-node-method="filterNode"
                         @node-click="handleNodeClick"
                         ref="tree">
                </el-tree>
               <!-- <el-tree
                  id="taskTreeL"

                  :default-expanded-keys="defaultExpandIds"
                  accordion
                  :load="loadHierachyTreeData"
                  lazy
                  highlight-current
                  :props="defaultProps"
                  :filter-node-method="filterNode"
                  node-key="id"
                  @node-click="handleNodeClick"
                  ref="tree"
                ></el-tree>-->
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="19" ref="NineHeight" id="rightHeight" style=" padding-top: 0;">
          <div class="summaryEchart">
            <div class="M_search">
              <el-row>
                <el-col :span="4">
                  <el-input size="small"
                            v-model.trim="searchTaskForm.userName"
                            placeholder="请输入用户名称"
                            style="width: 90%;"
                            clearable
                            maxlength="20"
                            @change="changetaskPage(1)"
                  ></el-input>
                </el-col>
                <el-col :span="4">
                  <el-input size="small"
                            v-model.trim="searchTaskForm.taskName"
                            placeholder="请输入任务名称"
                            style="width: 90%;"
                            clearable
                            maxlength="20"
                            @change="changetaskPage(1)"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-select size="small" @change="changetaskPage(1)" style="width:  90%;"
                             class="selectbox" v-model="searchTaskForm.reportState"
                             placeholder="请选择断报告状态">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-select size="small" @change="changetaskPage(1)" style="width:  90%;"
                             class="selectbox" v-model="searchTaskForm.joinState"
                             placeholder="是否参与诊改任务">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <Button
                    @click="changetaskPage(1)"
                    type="primary"
                    icon="ios-search"
                  >搜 索
                  </Button>
                  <Button icon="ios-trash" @click="emptyTaskTableBtn">清 空</Button>
                </el-col>
              </el-row>
            </div>
            <div :style="tableHeight" class="M_content">
              <el-table
                :data="tableData"
                height="100%"
                style="min-width: 100%;min-height: 100%">
                <el-table-column
                  label="序号"
                  type="index"
                  align="center"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="userName"
                  align="center"
                  label="用户姓名">
                </el-table-column>
                <el-table-column
                  prop="deptName"
                  align="center"
                  label="所属部门名称">
                </el-table-column>
                <el-table-column
                  prop="taskNum"
                  align="center"
                  label="拥有任务数量">
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center">
                  <template slot-scope="scope">
                    <span @click="clickDetails(scope.row)" style="color:#2d8cf0;cursor: pointer">查看</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="M_search" style="text-align:right;padding: 10px 15px">
              <Page
                :total="indexPage.total"
                :showTotal="indexPage.showTotal"
                :current="indexPage.current"
                :page-size="indexPage.size"
                @on-change="changetaskPage"
              ></Page>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {
        data: [],
        tableHeight: null,
        tableData: [],
        // defaultExpandIds: [], //维度tree默认展开的节点的 key 的数组
        options: [
          {
            value: "0",
            label: "未填写报告"
          },
          {
            value: "1",
            label: "已填写报告"
          },
        ],
        options2: [
          {
            value: "1",
            label: "参与"
          },
          {
            value: "0",
            label: "未参与"
          },
        ],
        searchTaskForm: {
          userName: "",
          taskName: '',
          reportState: '',// 填写诊断报告状态
          joinState: '',// 是否参与诊改任务
          deptId: '',
        },
        indexPage: {
          total:0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        taskHeight: "",
        activeName2: "first",
        screenTree: "", // 筛选树形
        deptId: 1,
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf: 'leaf'
        }, // 维度树形
        queryData: {},

      };
    },
    created() {
      this.data = this.$store.state.chooseDataScopeDept;// 从store里面获取管辖部门树
    },
    mounted() {
      //控制左边tree的高度
      this.queryData = this.$route.query.data
      if(this.queryData){
        this.deptId = this.queryData.deptId
        this.searchTaskForm.userName = this.queryData.userName
        this.searchTaskForm.taskName = this.queryData.taskName
        this.searchTaskForm.reportState = this.queryData.reportState
        this.searchTaskForm.joinState = this.queryData.joinState
      }
      this.$nextTick(() => {
        this.taskHeight = "height:" + (this.$refs.flowPage.clientHeight - 70) + "px";
        this.tableHeight = "height:" + (this.$refs.flowPage.clientHeight - 135) + "px";
        this.$refs.tree.setCurrentKey(this.deptId);
      });
      this.getTaskTableData()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 点击查看详情
      clickDetails(row){
        // console.log(44,row)
        this.searchTaskForm.deptId = this.deptId
        this.$router.push({path: 'indexAnalysis',query: {data:this.searchTaskForm,id:row.userId}})
      },
      // 清空按钮
      emptyTaskTableBtn(){
        this.searchTaskForm = {
            userName: "",
            taskName: '',
            reportState: '',// 填写诊断报告状态
            joinState: '',// 是否参与诊改任务
        }
        this.changetaskPage(1)
      },
      // 请求表格列表
      getTaskTableData(){
        let that = this;
        let obj ={
          deptId: this.deptId,
          userName:this.searchTaskForm.userName,
          taskName:this.searchTaskForm.taskName,
          reportState:this.searchTaskForm.reportState,
          usjoinStateerName:this.searchTaskForm.joinState,
          current: this.indexPage.current,
          size: this.indexPage.size,
          showTotal: this.indexPage.showTotal
        };
        that.$Get("/admin/task/report/user/page", obj, data => {
          that.indexPage.total= data.data.total
          that.tableData = data.data.records
        })
        /*that.indexPage.total = 50
        that.tableData = [
          {
            userName: '小明',
            userId: 1,
            deptName: '计算机专业',
            deptId: 2,
            taskNum: 40,
          },

        ]*/
      },
      // 分页任务查看
      changetaskPage(val) {
        // console.log(55,this.searchTaskForm)
        this.indexPage.current = val;
        this.getTaskTableData();
      },
      // 树形选择
      handleNodeClick(data, node, v) {
        this.deptId = data.id
        this.changetaskPage(1)
      },
    }
  };
</script>

<style lang='less' scoped>
  #flowPage {
    width: 100%;
    height: 100%;
    .taskSummaryItem {
      width: 100%;
      height: auto;
      margin: 0 auto;
      .el-row {
        width: 100%;
        /*height: 10px;*/
        padding-left: 10px;
        padding-top: 10px;
        background: #fff;
        border-radius: 1px;
        .el-tabs {
          width: 100%;
          border-radius: 1px;

          .el-tabs__content {
            width: 100%;
            height: 100%;

            .el-tab-pane {
              width: 100%;

              .flowTreeDiv {
                padding: 3% 2% 2%;

                .el-input {
                  margin-bottom: 3%;
                }
              }
            }
          }
        }

        .el-col-19 {
          height: 100%;

          .summaryEchart {
            width: 100%;
            height: 100%;
            padding-left: 1.5%;
          }
        }
      }
    }
  }

  .taskSummaryBreadcrumb {
    position: relative;
    padding: 10px 15px;
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
    background: #f2f5fc;
    border-radius: 1px;
    height: 34px;

    .screen {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .M_search {
    /*padding: 20px 15px 5px;*/
    text-align: left;
    height: 60px;
    .el-col{
      padding-bottom: 10px;
    }
    > div {
      margin-right: 2%;
    }

    .ivu-btn-primary {
      margin-right: 10px;
    }
  }
</style>
