<template>
  <div id="flowPage" ref="flowPage">
    <div class="taskSummaryBreadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="el-icon-location" style="float: left;margin-right: 5px;"></i>
        <el-breadcrumb-item>诊改大厅</el-breadcrumb-item>
        <el-breadcrumb-item>我的诊改</el-breadcrumb-item>
        <el-breadcrumb-item>诊改分派</el-breadcrumb-item>
      </el-breadcrumb>
      <Button @click="goback" class="screen" type="text" icon="ios-undo">返回</Button>
    </div>
    <div class="taskSummaryItem">
      <el-row>
        <el-col :span="24" ref="NineHeight" id="rightHeight" style=" padding-top: 0;">
          <div class="summaryEchart">
                <div class="M_search">
                  <Row>
                    <Col :span="6">
                      指标名称：
                      <Input
                        clearable
                        v-model="searchIndexForm.name"
                        placeholder="请输入指标名称"
                        style="width: 60%"
                        @on-change="firstsClear"
                      />
                    </Col>
                    <Col :span="6">
                      组织机构：
                      <Input
                        clearable
                        v-model="searchIndexForm.deptName"
                        @on-focus="openDept('index')"
                        @on-change="firstsClear('dept',searchIndexForm.deptName)"
                        placeholder="请选择组织机构"
                        style="width: 60%"
                      />
                    </Col>
                    <Col :span="6">
                      <!--<span style="letter-spacing: 4px">负责人：</span>-->
                      负责人:
                      <Input
                        clearable
                        v-model="searchIndexForm.userName"
                        placeholder="请输入负责人"
                        style="width: 60%"
                        @on-change="firstsClear"
                      />
                    </Col>
                    <Col :span="3">
                      <Button
                        @click="getIndexTableData"
                        type="primary"
                        icon="ios-search"
                      >搜 索</Button>
                      <Button icon="ios-trash" @click="emptyIndexTableBtn">清 空</Button>
                    </Col>
                  </Row>
                </div>
                <div :style="tableHeight">
                  <el-table
                    :data="indexTableData"
                    stripe
                    height="100%"
                    :cell-style = "paddingMy"
                    style="width: 100%;"
                  >
                    <el-table-column
                      min-width="150"
                      align="center"
                      prop="pointName"
                      label="指标"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                                            <span @click="clickName('name',scope.row)" style="color:#2d8cf0;cursor: pointer">
                                              {{scope.row.targetName}}
                                            </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      label="指标状态"
                      min-width="100"
                    >
                      <template slot-scope="scope">
                        <div v-html="scope.row.cellHtml"></div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="targetValue"
                      label="目标值"
                      min-width="100"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="standardValue"
                      label="标准值"
                      min-width="100"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="disValue"
                      label="当前值"
                      min-width="100"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="warnValue"
                      label="预警值"
                      min-width="100"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="startTime"
                      label="开始时间"
                      min-width="120"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="endTime"
                      label="结束时间"
                      min-width="120"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="deptName"
                      label="部门"
                      min-width="120"
                    >
                      <template slot-scope="scope">
                        <div style="color:#2d8cf0;cursor: pointer">
                          <p
                            @click="clickName('dept',scope.row)"
                          >{{scope.row.deptName}}</p>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="负责人"  show-overflow-tooltip min-width="140">
                      <template slot-scope="scope">
                                          <span
                                            @click="clickName('person',item)"
                                            v-for="(item,index) in scope.row.directors"
                                            :key="index"
                                            style="color:#2d8cf0;cursor: pointer;padding-right:5px"
                                            type="info"
                                          >
                                            {{item.directorName}}
                                            <i v-if="index!==scope.row.directors.length-1">,</i>
                                          </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="runState"
                      label="运行状态"
                      min-width="100"
                    >
                      <template slot-scope="scope">
                        <div v-show="scope.row.runState=='0'" class="cellHtml"
                             @click="clickName('runState',scope.row)" style="color:#ff7f13">
                          <p>未开始</p>
                        </div>
                        <div v-show="scope.row.runState=='1'" class="cellHtml"
                             @click="clickName('runState',scope.row)" style="color:#4ac056">
                          <p>运行中</p>
                        </div>
                        <div v-show="scope.row.runState=='2'" class="cellHtml"
                             @click="clickName('runState',scope.row)" style="color:#f04409">
                          <p>已结束</p>
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column
                      align="center"
                      prop="taskCount"
                      label="关联诊改"
                      min-width="90"
                    >
                      <template slot-scope="scope">
                        <div @click="clickRelevance(scope.row)" style="cursor: pointer;color:#2d8cf0 ">
                          <p>{{scope.row.taskCount}}</p>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      label="操作"
                      min-width="120"
                    >
                      <template slot-scope="scope">
                        <div style="padding-left:10px;color:#2d8cf0;text-align:left">
                          <p @click="showNorm(scope.row)" style="cursor: pointer;">
                            <Icon type="ios-eye-outline" />
                            查看</p>
                          <p @click="showTrack(scope.row,'targetId')" style="cursor: pointer;margin-top: 5px"><Icon type="ios-navigate-outline" />诊改轨迹</p>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="M_search" style="text-align:right;padding: 5px 15px">
                  <Page
                    :total="indexPage.total"
                    :showTotal="indexPage.showTotal"
                    :current="indexPage.current"
                    :page-size="indexPage.size"
                    @on-change="changeindexPage"
                  ></Page>
                </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--部门树形弹框-->
    <deptModal ref="changedept" :deptState="deptState" @closeDeptModal="closeDeptModal"></deptModal>
  </div>
</template>
<script>
  import store from "@/store";
  import { NeizhenUtil } from "../../../util/datarouters";
  import deptModal from "@/components/changeDept";

  export default {
    name: "index",
    components: { deptModal,},
    data() {
      return {
        taskId:"",
        paddingMy: {
          'padding':'5px 0'
        },

        tableHeight: null,
        options: [
          {
            value: "11",
            label: "学校办学经费各来源经费占比"
          },
          {
            value: "22",
            label: "学校办学经费自筹经费占比"
          },
          {
            value: "33",
            label: "学校办学经费社会捐赠经费占比"
          },
          {
            value: "44",
            label: "学校办学经费国家拨款经费占比"
          },
          {
            value: "55",
            label: "学校办学经费各来源经费占比2"
          }
        ],
        deptState: {
          //机构弹框
          state: false,
          data: []
        },
        trackState:{
          state: false,
          dataMessage:{},// 诊改信息 top
          amend: {},// 修改记录 up
          period: {},  // 周期记录 centre
          relevance: {}, // 关联指标 bottom
          id: null,
          type: '',
        },
        searchIndexForm: {
          name: "",
          deptName: "",
          deptId: "",
          hieId: "",
          userName: "",
          dataState:'',
          runState: ''
        },
        indexList: [
          {
            value: '1',
            label: '已达标'
          },
          {
            value: '2',
            label: '未达标'
          },
          {
            value: '3',
            label: '逾期'
          },
          {
            value: '4',
            label: '预警'
          },
        ],
        searchTaskForm: {
          deptId: "",//
          deptName: "",//
          hieId: "",
          targetName: "",
          taskName: "",//
          userName: "",//
          userId: "",//
          keyWord: "",
          dataState:'',
          runState: ''
        },
        taskList: [
          {
            value: '1',
            label: '已达标'
          },
          {
            value: '2',
            label: '未达标'
          },
          {
            value: '3',
            label: '逾期'
          },
          {
            value: '4',
            label: '预警'
          },
        ],
        indexPage: {
          total: 20, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        indexTableData: [],
        taskPage: {
          total: 10, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        taskTableData: [],
        activeName: "firsts",
        taskHeight: "",
        activeName2: "first",
        screenTree: "", // 筛选树形
        treeData: [],
        flowChartData: {},
        normData: {
          id:"",
          //查看指标要传过去的数据
          data: {},
          state: false //modal层
        },
        assignmentData: {
          identId: null,//
          state: false, //分派状态
          data: [] //需传的数据
        },
        defaultProps: {
          children: "children",
          label: "title",
          isLeaf: "leaf"
        } // 维度树形
      };
    },
    created() {
      this.taskId=this.$route.query.id;
      this.$Get("/admin/task/" + this.taskId, {}, res=> {
        console.log(res.data);
        this.indexTableData=res.data.allocateTasks
      });

    },
    mounted() {
      //控制左边tree的高度
      this.$nextTick(() => {
        this.taskHeight =
          "height:" +
          (this.$refs.flowPage.clientHeight - 105) +
          "px";

        this.tableHeight ="height:" +
          (this.$refs.flowPage.clientHeight - 190) +
          "px";
      });
    },
    watch: {
      screenTree(val) {
        this.$refs.tree.filter(val);
      },
    },
    methods: {
      //   关闭诊改轨迹弹框
      closeTrackModal(val) {
        this.trackState.state = val;
      },
      // 点击诊改轨迹弹框
      showTrack(row,type){
        console.log('---=====',row,type)
        this.trackState.state = true;
        if(type === 'targetId'){
          this.trackState.id = row.targetId;
          this.trackState.type = type
        }else {
          this.trackState.id = row.taskId;
          this.trackState.type = type
        }


        // console.log(1,row)
        // this.$Get("/admin/task/current/page", param, res => {
        //   console.log(res)
        // this.trackState.dataMessage = true;
        // this.trackState.amend = true;
        // this.trackState.period = true;
        // this.trackState.relevance = true;
        // })
      },
      // 点击诊改指标-关联任务 -跳转到诊改任务
      clickRelevance(row){
        this.activeName = 'second'
        this.searchTaskForm.targetName = row.targetName
        this.getTaskTableData()
      },
      // 诊改指标名称筛选
      clickName(type,row){
        if(type === 'name'){
          this.searchIndexForm.name = row.targetName
        }else if(type === 'dept'){
          this.searchIndexForm.deptId = row.deptId;
          this.searchIndexForm.deptName = row.deptName;
        }else if(type ==='person'){
          this.searchIndexForm.userName = row.directorName;
        }else if(type ==='index'){
          this.searchIndexForm.dataState = row.dataState
        }else if(type ==='runState'){
          this.searchIndexForm.runState = row.runState
        }
        this.getIndexTableData()
      },
      // 诊改指标-----输入框--清除按钮
      firstsClear(type,name){
        if(type === 'dept'){
          this.searchIndexForm.deptId = '';
        }else if(type === 'clearState'){ // 指标状态
          this.searchIndexForm .dataState = ''
        }else if(type === 'clearRun'){
          this.searchIndexForm.runState = ''
        }

        this.getIndexTableData()
      },
      // 任务点击名称筛选
      clickTaskName(type,row){
        if(type === 'name'){
          this.searchTaskForm.taskName = row.taskName
        }else if(type === 'dept'){
          this.searchTaskForm.deptId = row.deptId;
          this.searchTaskForm.deptName = row.deptName;
        }else if(type ==='person'){
          this.searchTaskForm.userId = row.directorId;
          this.searchTaskForm.userName = row.directorName;
        }else if(type === 'indexName'){
          this.searchTaskForm.targetName = row.targetName
        }else if(type === 'runState'){
          this.searchTaskForm.runState = row.runState
        }else if(type === 'index'){
          this.searchTaskForm.dataState = row.dataState
        }
        this.getTaskTableData();
      },
      // 诊改任务 ---输入框--清除按钮
      taskClear(type,name){
        if(type === 'dept'&& name === '' ){
          this.searchTaskForm.deptId = '';
        }else if(type ==='person' && name === ''){
          this.searchTaskForm.userId = '';
        }else if(type === 'clearState'){
          this.searchTaskForm.dataState = ''
        }
        this.getTaskTableData();
      },
      emptyIndexTableBtn() {
        //清空指标
        this.searchIndexForm = {
          name: "",
          deptName: "",
          deptId: "",
          hieId: "",
          userName: "",
          condition: "",
          dataState: "",
          runState: "",
        };
        this.getIndexTableData();
      },
      emptyTaskTableBtn() {
        //清空任务
        this.searchTaskForm = {
          taskName: "",
          deptName: "",
          deptId: "",
          hieId: "",
          userName: "",
          userId: "",
          targetName: "",
          dataState:  "",
          runState: ""
        };
        this.getTaskTableData();
      },

      change2directors(row) {
        this.searchTaskForm.userId = row.directorId;
        this.searchTaskForm.userName = row.directorName;
        this.getTaskTableData();
      },
      //获取诊改指标
      getIndexTableData() {

      },
      //获取诊改任务
      getTaskTableData() {
        let param = {
          dataState:this.searchTaskForm.dataState,
          runState: this.searchTaskForm.runState,
          deptId: this.searchTaskForm.deptId,
          hieId: this.searchIndexForm.hieId,
          targetName: this.searchTaskForm.targetName,
          taskName: this.searchTaskForm.taskName,
          userName: this.searchTaskForm.userName,
          userId: this.searchTaskForm.userId,
          keyWord: this.searchTaskForm.keyWord,
          size: this.taskPage.size,
          current: this.taskPage.current,
          total: this.taskPage.total
        };
        this.$Get("/admin/task/current/page", param, res => {
          this.taskPage.current = res.data.current;
          this.taskPage.total = res.data.total;
          this.taskTableData = res.data.records;
          if(res.data.records.length){
            res.data.records.forEach(function(item,index) {
              if(item.runState == "0") {// 未开始
                // item.cellState = '达标';
                if(item.targetState == '1'){
                  item.dataState = '1'
                  item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                }else{
                  item.dataState = '2'
                  item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                }
              }else if(item.runState == '1'){ // 运行中
                if(item.warnState == '1'){
                  item.dataState = '4'
                  item.cellHtml = '<span style="color:#ff1c1e">预警</span>'
                }else if(item.targetState == 0){
                  item.dataState = '2'
                  item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                }else if(item.targetState == 1){
                  item.dataState = '1'
                  item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                }
              }else if(item.runState == '2'){ // 已结束
                if(item.targetOvertime == '1'){
                  item.dataState = '3'
                  item.cellHtml = '<span  style="color: #ff7f13">逾期(未达标)</span>'
                }else if(item.targetState == '1'){
                  item.dataState = '1'
                  item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                }
              }
            });
          }
        });
      },
      //tree加载数据
      loadHierachyTreeData(node, resolve) {
        var searchNodeData = function(searchdata, id, resovle) {
          searchdata.forEach(e => {
            if (e.id == id) {
              var children = e.children;
              resolve(children);
            }
            if (!e.isLeaf) {
              searchNodeData(e.children, id, resolve);
            }
          });
        };
        if (node.level === 0) {
          if (this.asyncSearchData != null) {
            resolve(this.asyncSearchData);
          } else {
            this.doubleStandClass.asyncLoadTree(0, resolve);
          }
        }
        if (node.level >= 1) {
          if (this.asyncSearchData != null) {
            searchNodeData(this.asyncSearchData, node.data.id, resolve);
          } else {
            this.doubleStandClass.asyncLoadTree(node.data.id, resolve);
          }
        }

        if(node.data){
          let index = this.defaultExpandIds.length - 1
          if(node.data.id === this.defaultExpandIds[index]){
            this.getIndexTableData()
          }
          setTimeout(()=>{
            this.$refs.tree.setCurrentKey(this.treeId);
          },1000)
        }
      },
      //关闭任务明细
      closeAssignmentModal(obj) {
        this.assignmentData.state = obj.state;
      },
      //打开任务明细
      openTaskDetails(row) {
        this.assignmentData.identId = row.identId;
        //this.assignmentData.identId = 1//id传过去
        let that = this;
        that.$Get("/admin/task/" + row.taskId, {}, function (data) {
          that.assignmentData.state = true;
          that.assignmentData.data = data.data;
          that.$refs.assignModal.getAllocateTasks();
        });
      },
      //关闭指标修改框
      closeNormModal() {
        this.normData.state = false;
      },
      // 打开指标详情
      showNorm(data) {
        let row = Object.assign(
          {
            pointName: data.pointName,
            pointId: data.pointId,
            minTime: data.startTime,
            maxTime: data.endTime,
            targetId:data.targetId
          },

        );
        this.normData.data = row;
        this.normData.state = true;
        this.$refs.indicatorModal.getNormList();
      },
      //关闭选择机构
      closeDeptModal(data) {
        this.deptState.state = false;
        if (data.length == 0) {
        } else {
          if (this.depttab == "index") {
            this.searchIndexForm.deptName = data.name;
            this.searchIndexForm.deptId = data.id;
            this.getIndexTableData()
          } else if (this.depttab == "task") {
            this.searchTaskForm.deptName = data.name;
            this.searchTaskForm.deptId = data.id;
            this.getTaskTableData()
          }
        }
      },
      //打开选择机构
      openDept(name) {
        this.depttab = name;
        this.deptState.state = true;
        this.deptState.data={type:0};
        this.$refs.changedept.getDeptTree();
      },
      // 返回
      goback() {
        this.$router.push({ path: "/mytask" });
      },
      // 分页指标查看
      changeindexPage(val) {
        this.indexPage.current = val;
        this.getIndexTableData();
        //这里请求表格接口
      },
      // 分页任务查看
      changetaskPage(val) {
        this.taskPage.current = val;
        this.getTaskTableData();
        //这里请求表格接口
      },
      handleClicktable(tab, event) {
        if (tab.name == "firsts") {
          this.searchTaskForm.targetName = '' // 每次切换tab也的时候清空任务指标
          this.getIndexTableData();

        } else {
          this.getTaskTableData();
        }

      },
      //筛选树
      searchHimTree(event) {
        if (event.keyCode == 13) {
          if (NeizhenUtil.isEmpty(this.screenTree)) {
            this.doubleStandClass.loadInitTree();
          } else {
            this.doubleStandClass.searchHieracyTree(this.screenTree);
          }
        }
      },

      // 树形选择a
      handleNodeClick(data, node,e) {
        // if (data.children && data.children.length > 0) return;
        this.searchIndexForm.hieId = data.id;
        this.treeId = data.id;
        this.getIndexTableData();
        this.getTaskTableData();
      },
      // 维度筛选树
      filterNode(value, data) {
        if (!value) return true;
        return data.title.indexOf(value) !== -1;
      },
    }
  };
</script>

<style lang='less' scoped>
  #flowPage {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    padding: 0 1%;
    .taskSummaryItem {
      width: 100%;
      height: auto;
      padding-top: 10px;
      margin: 0 auto;
      .el-row {
        width: 100%;
        /*height: 10px;*/
        background: #fff;
        border-radius: 6px;
        .el-tabs {
          width: 100%;
          border-radius: 6px;

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
            .cellHtml{
              cursor: pointer;
              display: inline-block;
            }
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
    border-radius: 2px;
    height: 34px;
    .screen {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .M_search {
    padding: 13px 15px;
    text-align: left;
    > div {
      margin-right: 2%;
    }
    .ivu-btn-primary {
      margin-right: 10px;
    }
  }
</style>
