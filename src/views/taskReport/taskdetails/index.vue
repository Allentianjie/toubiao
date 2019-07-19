<template>
  <div id="taskSummaryPage">
    <div class="taskSummaryItem">
      <el-tabs v-model="activeName2" type="card" ref="tabsHeight">
        <el-tab-pane label="部门统计" name="first">
          <el-row style="width: 100%;padding-top: 25px;">
            <el-col :span="5">
              <el-tree class="filter-tree" id="taskTreeL" :default-expanded-keys="[1]"
                       node-key="id" highlight-current
                       :props="defaultProps" :style="taskHeight"
                       :data="data"
                       @node-click="handleNodeClick"
                       ref="tree">
              </el-tree>
            </el-col>
            <el-col :span="19" ref="NineHeight" id="abcHei" style="padding:0 10px">
              <div style="text-align: left">
                    <span>
                      当前展示：{{breadcrumb}}
                    </span>
              </div>
              <div class="summaryEchart" ref="chartHeight">
                <div class="left">
                  <h3 class="taskbefore">诊改前8排名</h3>
                  <div :class="nodeimg" style="padding:10px; height: 296px">
                    <div v-for="item in scheduleData">
                      <el-row style="padding: 8px 0">
                        <el-col :span="5">
                          <span>{{item.name}}</span>
                        </el-col>
                        <el-col :span="16" style="padding-top: 2px;margin-top: 3px;padding-right: 5px">
                          <el-progress :stroke-width="12" :percentage="item.schedule" :show-text="false"></el-progress>
                        </el-col>
                        <el-col :span="3" style="padding-left:6px;">
                          <span>{{item.num}}条</span>
                        </el-col>
                      </el-row>
                    </div>
                  </div>

                </div>
                <div class="right">
                  <h3 class="taskbefore">诊改监控图</h3>
                  <PictorialBarChart :TaskPieChartData="TaskPieChartData"></PictorialBarChart>
                </div>
              </div>
              <div class="taskDetailTable">
                <div class="inputM">
                  <h3 class="taskbefore">诊改明细</h3>
                  <div style="flex:1;text-align: right">
                    <el-button v-if="showBtn" type="primary" ghost @click="returnSuperior">返回上级</el-button>
                    <el-input placeholder="关键字搜索" v-model="taskParam.keyWord" style="width: auto"/>
                    <el-button @click="searchData()" icon="el-icon-search" type="primary" size="small">搜 索</el-button>
                  </div>
                </div>
                <div :style="tableHeight">
                  <el-table
                    :data="tableData"
                    height="400"
                    :header-cell-style="backHeader"
                    style="width: 100%;">
                    <!--<el-table-column label="任务名称" width="150" fixed align="center" show-overflow-tooltip>-->
                    <!--<template slot-scope="scope">-->
                    <!--&lt;!&ndash;<div style="color:#2d8cf0;cursor: pointer" @click="taskNameClick(scope.row)">&ndash;&gt;-->
                    <!--&lt;!&ndash;<div style="color:#2d8cf0;cursor: pointer">&ndash;&gt;-->
                    <!--<div>-->
                    <!--<p>{{scope.row.taskName}}</p>-->
                    <!--</div>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column width="150" fixed show-overflow-tooltip align="center" prop="taskName" label="诊改名称">
                      <template slot-scope="scope">
                                          <span @click="clickTaskUp(scope.row)" style="color:#2d8cf0;cursor: pointer">
                                            {{scope.row.taskName}}
                                          </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="部门" width="150" fixed align="center" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <!--<div style="color:#2d8cf0;cursor: pointer" @click="taskNameClick(scope.row)">-->
                        <!--<div style="color:#2d8cf0;cursor: pointer">-->
                        <div>
                          <p>{{scope.row.deptName}}</p>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="startTime" min-width="90" align="center" label="开始日期"></el-table-column>
                    <el-table-column prop="endTime" min-width="90" align="center" label="结束日期"></el-table-column>
                    <el-table-column prop="directors" min-width="80" align="center" label="负责人">
                      <template slot-scope="scope">
                        <p style="color:#2d8cf0;cursor: pointer" @click="principalClick(scope.row)">查看</p>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="70" align="center" label="目标值">
                      <template slot-scope="scope">
                        <span>{{getStrategySymbol(scope.row.targetStrategy)}}{{scope.row.disTargetValue}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="70" align="center" label="标准值">
                      <template slot-scope="scope">
                        <span>{{getStrategySymbol(scope.row.standardStrategy)}}{{scope.row.disStandardValue}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="70" align="center" label="预警值">
                      <template slot-scope="scope">
                        <span>{{getStrategySymbol(scope.row.warnStrategy)}}{{scope.row.disWarnValue}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="disValue" min-width="70" align="center" label="当前值"></el-table-column>
                    <el-table-column prop="QualityStatus" min-width="90" align="center" label="质控状态">
                      <template slot-scope="scope">
                        <span>{{scope.row.runState==='0' ? '未开始' : scope.row.runState==='1' ? '进行中' : '已结束'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" min-width="60" align="center" label="诊改">
                      <template slot-scope="scope">
                        <p style="color:#2d8cf0;cursor: pointer" @click="clinicalClick(scope.row)">PDCA</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" min-width="80" align="center" label="佐证文件">
                      <template slot-scope="scope">
                        <p style="color:#2d8cf0;cursor: pointer" @click="openEvidenceFile(scope.row)" v-if="scope.row.taskState === '1' && scope.row.taskId !== -1 ">查看</p>
                        <p style="cursor: pointer"  v-else>-</p>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div style="text-align: right;margin-top: 7px">
                <Page :total="page.total"
                      :current="page.current"
                      :page-size="page.size"
                      @on-change="changePage"
                      show-total></Page>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <TaskModal :feedBack="feedBack" @closefeedBack="closefeedBack"></TaskModal>
      <PrincipalModal :princiBack="princiFeedBack" @closePrincipal="closePrincipal"></PrincipalModal>
      <PADCModal :PADCBack="PADCBack" @closePADC="closePADC"></PADCModal>
      <evdenceModal ref="evidence" :evidenceData="evidenceData" @closeEvdence="closeEvdence"></evdenceModal>
    </div>
  </div>
</template>
<script>
  import TreeChart from "@/components/taskHall/treeChart";
  import PictorialBarChart from "@/components/taskHall/pictorialBarChart";
  import TaskModal from "./modal/taskNameModal"
  import PrincipalModal from "./modal/principalModal"
  import PADCModal from "./modal/PADCModal"
  import evdenceModal from "@/components/evdenceModal";
  export default {
    name: "index",
    components: {TreeChart, TaskModal, PrincipalModal, PADCModal, PictorialBarChart,evdenceModal},
    data() {
      return {
        evidenceData:{
          data:"",
          state:false
        },
        searchIndexForm: {
          name: "",
          deptName: "",
          deptId: "",
          hieId: "",
          hieName: "",
          userName: "",
          dataState: '',
          runState: ''
        },
        searchTaskForm: {
          deptId: "",//
          deptName: "",//
          hieId: "",
          targetName: "",
          taskName: "",//
          userName: "",//
          userId: "",//
          keyWord: "",
          dataState: '',
          runState: ''
        },
        showBtn: false,
        nodeimg: '',
        message: '3333',
        feedBack: {
          state: false, //反馈状态
          data: {},
        },
        breadcrumb: '', // 面包屑
        backHeader: {
          'background': '#f8f8f9'
        },
        TaskPieChartData: {},
        scheduleData: [],
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf: 'leaf'
        },
        activeName2: 'first',
        tableData: [],
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 7, //每页条数
          showTotal: true
        },
        taskParam: {
          deptId: 1, // 组织部门
          keyword: "" // 关键字
        },
        princiFeedBack: {
          state: false, //反馈状态
          data: [],
          breadcrumb: ''
        },
        PADCBack: {
          state: false, //反馈状态
          id: null,
          data: {},
        },
        taskHeight: '',
        tableHeight: '',
        deptId: 1,// 树形选择的部门id
        parentId: 0,
        superior: [],
      }
    },
    created() {

    },
    mounted() {
      this.getData();
      this.getTaskTableData();
      this.data = this.$store.state.chooseDataScopeDept;// 从store里面获取管辖部门树
      this.breadcrumb = this.data[0].name;
      this.$nextTick(() => {
        // 计算高度
        let charHeight = this.$refs.chartHeight.offsetHeight;
        console.log(2, this.$refs.tabsHeight.$el.offsetHeight)
        setTimeout(() => {
          this.taskHeight = 'height:' + (this.$refs.tabsHeight.$el.offsetHeight - 150) + 'px' //270
          this.$refs.tree.setCurrentKey(1);
        }, 1000)
      });
    },
    methods: {
      closeEvdence(){
        this.evidenceData.state=false;
      },
      //打开佐证文件
      openEvidenceFile(row){
        this.evidenceData.data=row.taskId;
        this.evidenceData.state=true;
        this.$refs.evidence.getData()
      },
      // 返回上级
      returnSuperior() {
        let lengthA = this.superior.length;
        let param = this.superior[lengthA - 1];
        this.superior.splice(lengthA - 1, 1);
        this.superior.length > 0 ? this.showBtn = true : this.showBtn = false;
        // 同步参数
        this.parentId = param.parentId,
          this.searchTaskForm.dataState = param.dataState,
          this.searchTaskForm.runState = param.runState,
          this.searchTaskForm.deptId = param.deptId,
          this.searchIndexForm.hieId = param.hieId,
          this.searchTaskForm.targetName = param.targetName,
          this.searchTaskForm.taskName = param.taskName,
          this.searchTaskForm.userName = param.userName,
          this.searchTaskForm.userId = param.userId,
          this.searchTaskForm.keyWord = param.keyWord,
          this.page.size = param.size,
          this.page.current = param.current,
          this.page.total = param.total;
        this.getTaskTableData()
      },
      // 点击任务名称穿clickTaskUp
      clickTaskUp(row) {
        this.parentId = row.taskId;
        this.superior.push(this.param2);
        this.showBtn = true;
        this.searchTaskForm.deptId = ''
        this.getTaskTableData();
      },
      //获取策略符号
      getStrategySymbol(data) {
        if (data === 21) {
          return ">";
        } else if (data === 22) {
          return "<";
        } else if (data === 23) {
          return "=";
        } else if (data === 24) {
          return "≥";
        } else if (data === 25) {
          return "≤";
        } else {
          return "";
        }
      },
      /**
       * @description: 搜索
       * @param {type}
       * @return:
       */
      searchData() {
        this.page.current = 1;
        this.getTaskTableData()
      },
      /**
       * @description: 获取echarts和百分比的data
       * @param {type}
       * @return:
       */
      getData() {
        let that = this;//this.searchTaskForm.deptId
        that.$Get("/admin/task/detail/summary", {deptId: this.searchTaskForm.deptId}, function (data) {
          that.getTeacherEducation(data.data);
          let obj = data.data.userTop;
          that.scheduleData = []
          let arr = [];
          let max;
          // 获取最大数
          if (obj) {
            that.nodeimg = ''
            obj.map(o => {
              for (let i in o) {
                arr.push(o[i]);
                max = arr.reduce(function (a, b) {
                  return b > a ? b : a;
                });
              }
            });
            // 取值
            obj.map(o => {
              for (let i in o) {
                arr.push(o[i]);
                let obj = {
                  'name': i,
                  'schedule': parseFloat((o[i] / max * 100).toFixed(2)),
                  'num': o[i]
                };
                that.scheduleData.push(obj)
              }
            })
          } else {
            that.nodeimg = 'divMy'
          }

        })
      },
      /**
       * @description: 分页查看
       * @param {type}
       * @return:
       */
      changePage(val) {
        this.page.current = val;
        this.getTaskTableData()
      },
      /**
       * @description: 获取数据
       * @param {type}
       * @return:
       */
      // gettableData() {
      //   let that = this;
      //   that.$Get(
      //     "admin/task/detail/page",
      //     Object.assign(that.page, that.taskParam), function (data) {
      //       console.log(data.data.records);
      //       that.page.total = data.data.total;
      //       that.tableData = data.data.records
      //     })
      // },
      //获取诊改任务
      getTaskTableData(data) {
        this.param2 = {
          parentId: this.parentId,
          dataState: this.searchTaskForm.dataState,
          runState: this.searchTaskForm.runState,
          deptId: this.searchTaskForm.deptId,
          hieId: this.searchIndexForm.hieId,
          targetName: this.searchTaskForm.targetName,
          taskName: this.searchTaskForm.taskName,
          userName: this.searchTaskForm.userName,
          userId: this.searchTaskForm.userId,
          keyword: this.taskParam.keyWord,
          size: this.page.size,
          current: this.page.current,
          total: this.page.total
        };
        this.$Get("/admin/task/current/page", this.param2, res => {
          // console.log(res)
          this.page.current = res.data.current;
          this.page.total = res.data.total;
          this.tableData = res.data.records;
          if (res.data.records.length) {
            res.data.records.forEach(function (item, index) {
              if (item.runState == "0") {// 未开始
                // item.cellState = '达标';
                if (item.targetState == '1') {
                  item.dataState = '1'
                  item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                } else {
                  item.dataState = '2'
                  item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                }
              } else if (item.runState == '1') { // 运行中
                if (item.warnState == '1') {
                  item.dataState = '4'
                  item.cellHtml = '<span style="color:#ff1c1e">预警</span>'
                } else if (item.targetState == 0) {
                  item.dataState = '2'
                  item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                } else if (item.targetState == 1) {
                  item.dataState = '1'
                  item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                }
              } else if (item.runState == '2') { // 已结束
                if (item.targetOvertime == '1') {
                  item.dataState = '3'
                  item.cellHtml = '<span  style="color: #ff7f13">逾期(未达标)</span>'
                } else if (item.targetState == '1') {
                  item.dataState = '1'
                  item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                }
              }
            });
          }
        });
      },
      /**
       * @description: 关闭反馈
       * @param {type}
       * @return:
       */
      closePADC(val) {
        // console.log(val,'--------------')
        this.PADCBack.state = val;
      },
      closePrincipal(val) {
        // console.log(val,'--------------')
        this.princiFeedBack.state = val;
      },
      closefeedBack(val) {
        // console.log(val,'--------------')
        this.feedBack.state = val;
      },
      // 点击名字
      taskNameClick(row) {
        this.feedBack.state = true;
        this.feedBack.data = {
          xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],//需传的数据
          yData: [420, 532, 901, 634, 1290, 1330, 1320], //需传的数据
        }
      },
      /**
       * @description: 点击负责人查看
       * @param: row:当前点击的该条数据
       * @return:
       */
      principalClick(row) {
        this.princiFeedBack.state = true;
        this.princiFeedBack.data = row.directors;
        this.princiFeedBack.breadcrumb = this.breadcrumb
      },
      /**
       * @description: 点击PDCA
       * @param: row:当前点击的该条数据
       * @return:
       */
      clinicalClick(row) {
        this.PADCBack.state = true;
        let P = row.targetStrategy; // P的符号
        let D = row.runState;// D的状态
        let operation = P === 21 ? '<' : P === 22 ? '<' : P === 23 ? '=' : P === 24 ? '>=' : P === 25 ? '<=' : ''
        let stateNum = D === '0' ? '未执行' : D === '1' ? '执行中' : D === '2' ? '执行结束' : ''
        let warnState = D === '0' ? '未开始' : D === '1' ? '监控中' : D === '2' ? '监控结束' : ''

        this.PADCBack.data = {
          pData: row.dataName + ' ' + operation + ' ' + row.disTargetValue,
          dData: stateNum,
          cData: warnState + (D === '1' ? row.warnState === '0' ? ' 未预警' : ' 预警' : ''),
          aData: row.identityState === '0' ? '未诊改' : '已经诊改'
        }
      },
      /**
       * @description: 树形选择
       * @param: data:当前点击的该条数据，node，v
       * @return:
       */
      handleNodeClick(data, node, v) {
        // if(data.children && data.children.length >0) return
        this.parentId = 0
        this.showBtn = false
        // this.showBtn = falsegetTaskTableData
        this.breadcrumb = data.name;
        this.searchTaskForm.deptId = data.id;
        this.getData()
        this.searchData()
      },//ruleRegulate
      getTeacherEducation(data) {
        this.TaskPieChartData = {
          id: "pieChartId",
          seriesData: {
            xData: ['逾期', '达标', '未达标', '诊改', '预警'],
            yData: [data.overtime, data.achieving, data.notAchieving, data.spiral, data.warning]
          },
        }
      }
    }
  };
</script>

<style lang='less' scoped>
  @import url("./index.less");
</style>
