<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox" class-name="vertical-center-modal" v-model="assignmentData.state" width="70%"
           :mask-closable="false"
           @on-cancel="closeAssignmentModal"
    >
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>分派诊改</span>
      </p>
      <Form :label-width="100">
        <div style="text-align: left">
          <Divider orientation="left">诊改信息</Divider>
          <div class="fileBox">
            <Row>
              <Col span="22">
                <FormItem label="所属体系">
                  <span class="name">{{hierarchyName}}</span>
                </FormItem>
                <FormItem label="诊改名称">
                  <span>{{assignmentData.data.taskName}}</span>
                </FormItem>
                <FormItem label="诊改日期">
                  <Row>
                    <span>{{assignmentData.data.startTime}}</span>
                    <span style=" text-align: center">~</span>
                    <span>{{assignmentData.data.endTime}}</span>
                  </Row>
                </FormItem>
                <FormItem label="诊改目标">
                  <span>{{taskTarget}}</span>
                </FormItem>

                <!-- <FormItem label="任务资源">
                    <Button type="text" style="color: #1b4ede">点击查看</Button>
                </FormItem>-->
              </Col>
            </Row>
          </div>
        </div>
        <div class="fileManage">
          <Divider orientation="left">分派信息</Divider>
          <div class="contentItem" ref="flowPage">
            <div class="M_search" style="padding-right: 0">
              <Row>
                <Col :span="24" style="text-align: right;">
                  <Button v-show="openIndex=='1'" icon="ios-add-circle-outline" type="primary" @click="addTask">新 增
                  </Button>
                </Col>
              </Row>
            </div>
            <div>
              <el-table
                :data="indexTableData"
                stripe
                :cell-style="paddingMy"
                style="width: 100%;min-height:300px;"
              >
                <el-table-column
                  min-width="100"
                  align="center"
                  prop="taskName"
                  label="诊改名称"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                     <span style="color:#2d8cf0;cursor: pointer">
                        {{scope.row.taskName}}
                     </span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="deptName"
                  label="部门"
                  min-width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span style="cursor: pointer">
                        {{scope.row.deptName}}
                     </span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="disTargetValue"
                  label="目标值"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span>{{getStrategySymbol(scope.row.targetStrategy)}}{{scope.row.disTargetValue ? scope.row.disTargetValue:'-'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="disStandardValue"
                  label="标准值"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span>{{getStrategySymbol(scope.row.standardStrategy)}}{{scope.row.disStandardValue ? scope.row.disStandardValue:'-'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="disValue"
                  label="当前值"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.disValue ? scope.row.disValue:'-'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="disWarnValue"
                  label="预警值"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <span>{{getStrategySymbol(scope.row.warnStrategy)}}{{scope.row.disWarnValue ? scope.row.disWarnValue:'-'}}</span>
                  </template>
                </el-table-column>
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
                <el-table-column align="center" label="负责人" show-overflow-tooltip min-width="100">
                  <template slot-scope="scope">
                      <span
                        v-if="scope.row.directors.length>0&&scope.row.directors[0].directorName!=null"
                        v-for="(item,index) in scope.row.directors"
                        :key="index"
                        style="color:#2d8cf0;cursor: pointer;padding-right:5px"
                        type="info"
                      >
                            {{item.directorName}}
                            <i v-if="index!==scope.row.directors.length-1">,</i>
                      </span>
                    <span style="color:#2d8cf0;cursor: pointer;padding-right:5px" v-else>{{scope.row.deptName}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="runState"
                  label="运行状态"
                  min-width="90"
                >
                  <template slot-scope="scope">
                    <div v-show="scope.row.runState=='0'" class="cellHtml"
                         style="color:#ff7f13">
                      <p>未开始</p>
                    </div>
                    <div v-show="scope.row.runState=='1'" class="cellHtml"
                         style="color:#4ac056">
                      <p>运行中</p>
                    </div>
                    <div v-show="scope.row.runState=='2'" class="cellHtml"
                         style="color:#f04409">
                      <p>已结束</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <div style="padding-left:10px;color:#2d8cf0;text-align:left">
                      <p v-show="scope.row.runState!='2'" @click="showNorm(scope.row)" style="cursor: pointer;">
                        <Icon type="ios-eye-outline"/>
                        编辑
                      </p>
                      <p v-show="scope.row.runState=='2'" @click="showNorm(scope.row)" style="cursor: pointer;">
                        <Icon type="ios-eye-outline"/>
                        诊改
                      </p>
                      <p @click="removeAllocateTaskItem(scope.row)"
                         style="  ;cursor: pointer;margin-top: 5px;color: red">
                        <Icon type="ios-navigate-outline"/>
                        删除
                      </p>
                      <p @click="openEvidenceFile(scope.row)" v-show="scope.row.taskState === '1' && scope.row.taskId !== -1 "
                         style="cursor: pointer;">
                        <Icon type="ios-eye-outline"/>
                        佐证文件
                      </p>
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
        </div>
      </Form>
      <div slot="footer" style="text-align: center">
        <Button type="warning" size="large" @click="closeAssignmentModal('targetForm')">关闭</Button>
      </div>
      <addTaskModal ref="addTask" :addTaskData="addTaskData"
                    @closeAssignmentModal2="closeAssignmentModal2"></addTaskModal>
      <assignDetailModal ref="assignDetailModal" :assignDetailData="assignDetailData"
                         @closeAssignmentModal3="closeAssignmentModal3"></assignDetailModal>
      <addStudentTaskModal ref="addStudent" :addStudentData="addStudentData"
                           @closeStudentModal="closeStudentModal"></addStudentTaskModal>

      <studentDetailModal ref="studentDetailModal" :studentDetailData="studentDetailData"
                          @closeAssignmentModal4="closeAssignmentModal4"></studentDetailModal>
      <evdenceModal ref="evidence" :evidenceData="evidenceData" @closeEvdence="closeEvdence"></evdenceModal>
    </Modal>
  </div>
</template>

<script>
  import evdenceModal from "@/components/evdenceModal";
  import studentDetailModal from "./studentDetailModal";
  import assignDetailModal from "./assignDetailModal";
  import addTaskModal from "./addTaskModal";
  import addStudentTaskModal from "./addStudentTaskModal";
  import Principal from "@/components/principal";
  import BasicData from "@/components/basicdata";
  import AddFileModal from "@/views/diagnosis/modal/addFile";
  import df from "@/api/utils";
  import Preview from "@/components/preview";
  import store from "@/store";
  import {
    fetchList,
    fetchValueList,
    fetchValueLists,
    getObj,
    addObj,
    putObj,
    delObj,
    getTree
  } from "@/api/database/database";
  import {remote} from '@/api/admin/dict'

  export default {
    props: {
      assignmentData: {
        type: Object,
        required: true
      }
    },
    mounted() {
      //控制左边tree的高度
      this.$nextTick(() => {
        this.taskHeight =
          "height:" +
          (this.$refs.flowPage.clientHeight - 105) +
          "px";

        this.tableHeight = "height:" +
          (this.$refs.flowPage.clientHeight - 190) +
          "px";
      });
      this.taskId = this.assignmentData.taskId;
    },
    components: {
      evdenceModal,
      studentDetailModal,
      AddFileModal,
      Principal,
      BasicData,
      Preview,
      addTaskModal,
      assignDetailModal,
      addStudentTaskModal
    },
    data() {
      return {
        evidenceData:{
          data:"",
          state:false
        },
        radioState: "",
        addStudentData: {
          taskPid:"",
          deptId: "",
          startTime: "",
          endTime: "",
          openIndex: "",
          data: [],
          state: false
        },
        assignDetailData: {
          deptId: "",
          startTime: "",
          endTime: "",
          openIndex: "",
          data: [],
          state: false
        },
        studentDetailData: {
          deptId: "",
          startTime: "",
          endTime: "",
          openIndex: "",
          data: [],
          state: false
        },
        addTaskData: {
          taskPid:"",
          data: [],
          state: false
        },
        openIndex: "",
        searchIndexForm: {
          name: "",
          deptName: "",
          deptId: "",
          hieId: "",
          userName: "",
          dataState: '',
          runState: ''
        },
        taskId: "",
        paddingMy: {
          'padding': '5px 0'
        },
        indexPage: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 5, //每页条数
          showTotal: true
        },
        indexTableData: [],
        tableHeight: null,
        noData: true,
        deptData: [],
        itemIndex: 0,
        btnState: false,
        loading: false,
        options4: [],
        previews: {
          name: "",
          //预览文件数据
          data: [],
          state: false
        },
        modalParam: {
          minTime: "",
          maxTime: ""
        },
        pickerOptions: {
          disabledDate: time => {
            return this.dealDisabledDate(time);
          }
        },
        ruleValidate: {
          deptId: [
            {
              required: true,
              message: "部门不能为空",
              trigger: "blur"
            },
          ],
          taskName: [
            {
              required: true,
              message: "名称不能为空",
              trigger: "blur"
            },
            {
              type: "string",
              max: 200,
              message: "名称不能大于200字符",
              trigger: "blur"
            }
          ],
          summaryMode: [
            {
              required: true,
              message: "请选择汇总方式",
              trigger: "blur"
            }
          ],
          calculateMode: [
            {
              required: true,
              message: "请选择计算方式",
              trigger: "blur"
            }
          ],
          dataType: [
            {
              required: true,
              message: "请选择数据类型",
              trigger: "blur"
            }
          ],
          dataName: [
            {
              required: true,
              message: "请选择关联数据",
              trigger: "blur"
            }
          ],
          startTime: [
            {
              required: true,
              type: "date",
              message: "请输入开始时间",
              trigger: "change"
            }
          ],
          endTime: [
            {
              required: true,
              type: "date",
              message: "请输入结束时间",
              trigger: "change"
            }
          ],
          targetStrategy: [
            {
              required: true,
              message: "请选目标择策略",
              trigger: "change"
            }
          ],
          targetValue: [
            {
              required: true,
              message: "目标值不能为空",
              trigger: "blur"
            },

            // {
            //   type: "string",
            //   max: 20,
            //   message: "目标值不能大于20字符",
            //   trigger: "blur"
            // }
          ],
          standardValue: [
            {
              required: true,
              message: "标准值不能为空",
              trigger: "blur"
            }
          ],
          warnStrategy: [
            {
              required: true,
              message: "请选择预警策略",
              trigger: "change"
            }
          ],
          warnValue: [
            {
              required: true,
              message: "预警值不能为空",
              trigger: "blur"
            },
            // {
            //   type: "string",
            //   max: 20,
            //   message: "预警值不能大于20字符",
            //   trigger: "blur"
            // }
          ]
        },
        BasIndex: 0,
        PrincipalIndex: 0,
        fileIndex: 0,
        addDataState: false,
        reloadTaskTable: false, //是否需要刷新任务列表，分派任务有变动是否需要刷新任务列表
        targetForm: [
          {
            deptId: "",
            identName: "",
            summaryMode: '',
            calculateMode: '',
            dataType: "",
            taskName: "",
            startTime: "",
            endTime: "",
            dataName: "",
            dataId: 0,
            targetStrategy: 21,
            targetValue: "",
            warnStrategy: 22,
            warnValue: "",
            standardStrategy: 22,
            standardValue: "",
            standardWeight: 1,
            targetWeight: 1,
            dataValue: "",
            directorVos: [],
            targetFileVos: [],
            unEndTask: true, //是否为结束的任务
            updateModal: false
          }
        ],
        addFileState: {
          //添加文件传过去的数据
          data: [],
          state: false
        },
        basicData: {
          parentId: null,
          identId: null,
          state: false,
          data: []
        }, // 基础数据关联
        PrincipalData: {
          state: false,
          data: []
        }, //添加负责人弹框
        PersonData: [], //负责人
        operator: [
          {label: 21, value: ">"},
          {label: 22, value: "<"},
          {label: 23, value: "="},
          {label: 24, value: "≥"},
          {label: 25, value: "≤"}
          // {label: 26, value: "无"}
        ] //策略的运算符
      };
    },
    computed: {
      hierarchyName: function () {
        let task = this.assignmentData.data;
        return (
          task.hieName +
          " / " +
          task.levelName +
          " / " +
          task.dimName +
          " / " +
          task.pointName +
          " / " +
          task.targetName
        );
      },
      taskTarget: function () {
        let task = this.assignmentData.data;
        return (
          this.getStrategySymbol(task.targetStrategy) +
          " " +
          task.disTargetValue
        );
      }
    },
    filters: {
      fulltargetValue: function (value, first) {
        if (first == "0") {
          //整数
          return Math.round(value);
        } else if (first == "1") {
          //小数
          return parseFloat(value).toFixed(2);
        } else if (first == "2") {
          //百分比
          return (value * 100 / 100).toFixed(2) + "%";
        } else if (first == "3") {
          //千分比
          return (value * 1000 / 1000).toFixed(2) + "‰";
        } else if (first == "4") {
          //比例
          return value + " ：1";
        }
      },
      fullwarnValue: function (value, first) {
        if (first == "0") {
          //整数
          return Math.round(value);
        } else if (first == "1") {
          //小数
          return parseFloat(value).toFixed(2);
        } else if (first == "2") {
          //百分比
          return (value * 100 / 100).toFixed(2) + "%";
        } else if (first == "3") {
          //千分比
          return (value * 1000 / 1000).toFixed(2) + "‰";
        } else if (first == "4") {
          //比例
          return value + " ：1";
        }
      },
      fullstandardValue: function (value, first) {
        if (first == "0") {
          //整数
          return Math.round(value);
        } else if (first == "1") {
          //小数
          return parseFloat(value).toFixed(2);
        } else if (first == "2") {
          //百分比
          return (value * 100 / 100).toFixed(2) + "%";
        } else if (first == "3") {
          //千分比
          return (value * 1000 / 1000).toFixed(2) + "‰";
        } else if (first == "4") {
          //比例
          return value + " ：1";
        }
      }
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
      //删除分派
      removeAllocateTaskItem(row) {
        let taskId = row.taskId;
        let that = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>执行该操作将同时删除下级所有已经分派并执行的子诊改，确认删除吗？</p>',
          onOk: () => {
            that.$Delete("/admin/task/" + taskId, {}, function (data) {
              that.$Message.success("删除成功");
              that.getIndexTableData()
            });
          },
          onCancel: () => {

          }
        });
      },
      //打开任务分派详情
      showNorm(row) {
        let that = this;
        if (row.deptId >= 0) {
          that.$Get("/admin/task/" + row.taskId, {}, function (data) {
            that.assignDetailData.startTime = that.assignmentData.startTime;
            that.assignDetailData.endTime = that.assignmentData.endTime;
            that.assignDetailData.openIndex = that.openIndex;
            that.assignDetailData.data = data.data;
            that.assignDetailData.deptId = data.data.deptId;
            that.$Get("/admin/task/" + that.assignmentData.taskId, {}, function (data) {
              that.assignDetailData.data.deptId = data.data.deptId;
              that.assignDetailData.state = true;
              that.$refs.assignDetailModal.getAllDetail();
            });
          });
        } else {
          that.$Get("/admin/task/" + row.taskId, {}, function (data) {
            that.studentDetailData.startTime = that.assignmentData.startTime;
            that.studentDetailData.endTime = that.assignmentData.endTime;
            that.studentDetailData.openIndex = that.openIndex;
            that.studentDetailData.data = data.data;
            that.studentDetailData.deptId = data.data.deptId;
            that.$Get("/admin/task/" + that.assignmentData.taskId, {}, function (data) {
              that.studentDetailData.data.deptId = data.data.deptId;
              that.studentDetailData.state = true;
              that.$refs.studentDetailModal.getAllDetail();
            });
          });
        }


      },
      //添加任务分派
      addTask() {
        let that = this;
        // console.log(that.assignmentData.deptLevel);
        if (that.assignmentData.deptLevel != 4) {
          // console.log("不分派学生");
          this.$Modal.confirm({
            title: '请选择分派部门诊改或个人诊改',
            render: (h, params) => {
              return h('RadioGroup', [
                h('Radio', {
                  style: {
                    margin: "15px 0px 10px",
                    display: "block"
                  },
                  props: {
                    "label": "部门诊改",
                    "value": "1"
                  },
                  on: {
                    input: function () {
                      that.radioState = 1;
                    }
                  }

                }, '部门诊改'),
                h('Radio', {
                  style: {
                    margin: "10px 0px 15px",
                    display: "block"
                  },
                  props: {
                    "label": "个人诊改",
                    "value": "2"
                  },
                  on: {
                    input: function () {
                      that.radioState = 2;
                    }
                  }

                }, '个人诊改')
              ]);
            },
            onOk: () => {
              if (that.radioState == 1) {
                that.$Get("/admin/task/" + that.assignmentData.taskId, {}, function (data) {
                  that.addTaskData.state = true;
                  that.addTaskData.data = data.data;
                  that.addTaskData.taskPid = that.assignmentData.parentId;
                  that.$refs.addTask.getAllocateTaskss();
                });
              } else if (that.radioState == 2) {
                that.$Get("/admin/task/" + that.assignmentData.taskId, {}, function (data) {
                  that.addStudentData.state = true;
                  that.addStudentData.data = data.data;
                  that.addStudentData.taskPid = that.assignmentData.parentId;
                  that.$refs.addStudent.getAllocateTaskss("1");
                });
              }
            }
          });

        } else {
          // console.log("分派学生");
          that.$Get("/admin/task/" + that.assignmentData.taskId, {}, function (data) {
            that.addStudentData.state = true;
            that.addStudentData.data = data.data;
            that.addStudentData.taskPid = that.assignmentData.parentId;
            that.$refs.addStudent.getAllocateTaskss("2");
          });
        }

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
      // 分页指标查看
      changeindexPage(val) {
        this.indexPage.current = val;
        this.getIndexTableData();
        //这里请求表格接口
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
      //获取诊改指标
      getIndexTableData() {
        if (this.openIndex == 1) {
          let parms = {
            current: this.indexPage.current,
            size: this.indexPage.size,
            parentId: this.assignmentData.parentId,
            runState: "",
          };
          this.$Get("/admin/task/allocate/page", parms, res => {
            this.indexTableData = res.data.records;
            this.indexPage.total = res.data.total;
          })
        } else if (this.openIndex == 2) {
          let parms = {
            current: this.indexPage.current,
            size: this.indexPage.size,
            parentId: this.assignmentData.parentId,
            runState: "2",
          };
          this.$Get("/admin//task/allocate/page", parms, res => {
            // console.log(res);
            this.indexTableData = res.data.records;
            this.indexPage.total = res.data.total;
          })
        }
      },
      // 诊改指标-----输入框--清除按钮
      firstsClear(type, name) {
        if (type === 'dept') {
          this.searchIndexForm.deptId = '';
        } else if (type === 'clearState') { // 指标状态
          this.searchIndexForm.dataState = ''
        } else if (type === 'clearRun') {
          this.searchIndexForm.runState = ''
        }

        this.getIndexTableData()
      },
      //选择部门下拉框
      changeDeptdata(index, val) {
        this.itemIndex = index;
        this.options4 = [];
        if (val != undefined) {
          this.$Get('admin/database/getByIdentIdAndDeptId?identId=' + this.assignmentData.identId + '&deptId=' + val, null, (res) => {
            if (res.data != null) {
              this.targetForm[this.itemIndex].dataName = res.data.dataName;
              this.targetForm[this.itemIndex].dataId = res.data.dataId;
              this.options4.push({
                dataName: res.data.dataName,
                dataId: res.data.dataId
              })
            } else {
              this.$Message.error("暂无数据，请输入添加数据")
            }
          })
        }

      },
      //搜索数据搜索框
      searchData() {
        this.options4 = [];
        let params = {
          deptId: this.assignmentData.deptId,
          parentId: this.assignmentData.dataId,
          dataName: this.targetForm[this.itemIndex].dataName, // 名称
          layType: this.assignmentData.hieId
        };
        fetchValueLists(
          Object.assign(
            {
              current: 1,
              size: 100
            },
            params
          )
        ).then(response => {

          if (response.data.data.length > 0) {
            this.options4 = response.data.data;
            this.remoteMethod(this.targetForm[this.itemIndex].dataName);
            this.$Message.success("请选择数据关联")
          } else {
            this.$Message.error("暂无数据,请新增");
          }
        });
      },
      // 输入基础数据关键词
      remoteMethod(query) {
        if (this.targetForm[this.itemIndex].deptId == '') {
          query = "";
          this.$Modal.confirm({
            title: '提示',
            content: '<p>请先选择部门再关联基础数据？</p>',
            onOk: () => {
              // this.$Message.info('Clicked ok');
            },
            onCancel: () => {
              // this.$Message.info('Clicked cancel');
            }
          });
        }
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let params = {
              deptId: this.targetForm[this.itemIndex].deptId,
              parentId: this.assignmentData.dataId,
              dataName: query, // 名称
              layType: this.assignmentData.hieId
            };
            fetchValueLists(
              Object.assign(
                {
                  current: 1,
                  size: 100
                },
                params
              )
            ).then(response => {
              if (response.data.data.length > 0) {
                this.options4 = response.data.data;
                this.addDataState = false
              } else {
                // this.$Message.error("暂无数据")
                this.addDataState = true;
                this.targetForm[this.itemIndex].dataName = query
              }
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      },
      changeData(name) {
        setTimeout(() => {
          this.targetForm[this.itemIndex].dataName = name;
          this.addDataState = false;
          if (this.options4.length > 0) {
            for (let i = 0; i < this.options4.length; i++) {
              if (this.options4[i].dataName == name) {
                this.targetForm[this.itemIndex].dataName = name;
                this.targetForm[this.itemIndex].dataId = this.options4[i].dataId;
              }
            }
          }
        }, 500)
      },
      //关闭预览
      closePreview(val) {
        this.previews.state = val;
      },
      onClickDiv(row) {
        // console.log(row);
        this.itemIndex = row.path[0].id;
      },
      //打开预览
      openPreviewModal(row) {
        //把选择的文件数据===>previews.data传给子组件
        this.previews.name = row.fileSuffix;
        this.previews.data = "/mngfile/chunkfile/previewStream/" + row.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      dealDisabledDate(date) {
        return (
          (date &&
            this.modalParam.minTime &&
            date.valueOf() < this.modalParam.minTime.valueOf()) ||
          (date &&
            this.modalParam.maxTime &&
            date.valueOf() > this.modalParam.maxTime.valueOf())
        );
      },
      //获取部门
      getDeptData() {
        this.$Get("/admin/dept/getByPid?parentId=" + this.assignmentData.data.deptId, null, res => {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].deptId = (res.data[i].deptId).toString()
            }
            this.deptData = res.data
          }
        );
      },
      //获取当前任务的分派任务
      getAllocateTasks(val) {
        this.openIndex = val;
        this.getIndexTableData()
      },
      //保存单行的数据
      saveAllocateTaskItem(row, ind) {
        let that = this;
        let formName = "taskForm" + ind;
        // console.log(this.targetForm[ind]);
        that.$refs[formName][0].validate(valid => {
          if (valid) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>确认该操作？</p>',
              onOk: () => {
                // 处理日期
                let form = that.targetForm[ind];
                // console.log(form);
                if (form.startTime.valueOf() < that.modalParam.minTime.valueOf()) {
                  that.$Message.warning("分派诊改的开始时间不能早于当前诊改的开始时间");
                  return;
                }
                if (form.startTime.valueOf() > form.endTime.valueOf()) {
                  that.$Message.warning("开始时间不能晚于结束时间");
                  return;
                }
                if (form.endTime.valueOf() > that.modalParam.maxTime.valueOf()) {
                  that.$Message.warning("分派诊改的结束时间不能晚于当前诊改的结束时间");
                  return;
                }


                if (that.targetForm[that.itemIndex].dataType == '2') {
                  form.targetValue = form.targetValue / 100;
                  form.warnValue = form.warnValue / 100;
                  form.standardValue = form.standardValue / 100;

                } else if (that.targetForm[that.itemIndex].dataType == '3') {
                  form.targetValue = form.targetValue / 1000;
                  form.warnValue = form.warnValue / 1000;
                  form.standardValue = form.standardValue / 1000;
                } else {
                }
                let formData = {
                  taskName: form.taskName,
                  startTime: df.dateFormat(form.startTime).substr(0, 10),
                  endTime: df.dateFormat(form.endTime).substr(0, 10),
                  dataId: form.dataId,
                  parentId: that.assignmentData.data.taskId,
                  targetStrategy: form.targetStrategy,
                  targetValue: form.targetValue,
                  warnStrategy: form.warnStrategy,
                  warnValue: form.warnValue,
                  standardStrategy: form.standardStrategy,
                  standardValue: form.standardValue,
                  standardWeight: form.standardWeight,
                  targetWeight: form.targetWeight,
                };


                //处理负责人
                let directorData = form.directorVos;
                if (!(directorData && directorData.length > 0)) {
                  this.$Message.error("请选择负责人");
                  return;
                }
                let directors = [];
                directorData.forEach(o => {
                  directors.push(o.directorId);
                });
                formData.directors = directors;
                //处理支撑文件
                let fileData = form.targetFileVos;
                let files = [];
                if (fileData && fileData.length > 0) {
                  fileData.forEach(o => {
                    files.push(o.fileId);
                  });
                }
                formData.targetFiles = files;

                if (that.addDataState == false) {

                  let taskId = form.taskId;
                  if (Number.isInteger(taskId)) {
                    let taskData = {
                      taskId: taskId
                    };
                    let param = Object.assign(formData, taskData);
                    that.$Put("/admin/task", param, function (data) {

                      that.$Message.success("更新分派成功");
                      that.reloadTaskTable = true;
                    });
                  } else {
                    that.$Post("/admin/task", formData, function (
                      data
                    ) {
                      // console.info(data);
                      that.$Message.success("分派成功");
                      that.reloadTaskTable = true;
                      that.targetForm[ind].updateModal = true;
                    });
                  }
                } else {
                  let params = {
                    deptId: that.targetForm[that.itemIndex].deptId,
                    parentId: that.assignmentData.dataId,
                    dataName: that.targetForm[that.itemIndex].dataName, // 名称
                  };
                  that.$Post("/admin/database/saveSubData", params, function (data) {

                    if (data.code == 0) {
                      let taskId = form.taskId;
                      if (Number.isInteger(taskId)) {
                        let taskData = {
                          taskId: taskId
                        };
                        let param = Object.assign(formData, taskData);

                        that.$Put("/admin/task", param, function (data) {

                          that.$Message.success("更新分派成功");
                          that.reloadTaskTable = true;
                        });
                      } else {
                        formData.dataId = data.data;
                        that.$Post("/admin/task", formData, function (data) {
                          that.$Message.success("分派成功");
                          that.reloadTaskTable = true;
                          that.targetForm[ind].updateModal = true;
                          that.addDataState == false
                        });
                      }
                    } else {
                      that.$Message.error(data.msg)
                    }
                    // that.$Message.success("更新分派成功");
                  });
                }
              },
              onCancel: () => {

              }
            });
          }
        });
      },

      //添加分派
      additem() {
        if (this.noData == false) {
          this.noData = true
        } else {
          this.changeVlue(this.assignmentData.data.dataType);
          this.targetForm.push({
            deptId: "",
            dataType: (this.assignmentData.data.dataType).toString(),
            taskName: "",
            startTime: this.modalParam.minTime,
            endTime: this.modalParam.maxTime,
            dataName: "",
            dataId: this.assignmentData.data.dataId,
            targetStrategy: this.assignmentData.data.targetStrategy,
            targetValue: this.assignmentData.data.targetValue,
            standardStrategy: this.assignmentData.data.standardStrategy,
            standardValue: this.assignmentData.data.standardValue,
            standardWeight: this.assignmentData.data.standardWeight,
            targetWeight: this.assignmentData.data.targetWeight,
            warnStrategy: this.assignmentData.data.warnStrategy,
            warnValue: this.assignmentData.data.warnValue,
            disValue: this.assignmentData.data.disValue,
            dataValue: this.assignmentData.data.dataValue,
            directorVos: [],
            targetFileVos: [],
            unEndTask: true,
            updateModal: false
          });
        }

      },
      //返回的值回显成要求的格式
      changeVlue(val) {
        //编辑
        if (val == '2') {
          this.assignmentData.data.targetValue = this.assignmentData.data.targetValue * 100;
          this.assignmentData.data.warnValue = this.assignmentData.data.warnValue * 100;
          this.assignmentData.data.standardValue = this.assignmentData.data.standardValue * 100;
        } else if (val == '3') {
          this.assignmentData.data.targetValue = this.assignmentData.data.targetValue * 1000;
          this.assignmentData.data.warnValue = this.assignmentData.data.warnValue * 1000;
          this.assignmentData.data.standardValue = this.assignmentData.data.standardValue * 1000;
        }

      },
      // 关闭基础数据
      closeBasicData(data) {
        if (data) {
          this.targetForm[this.BasIndex].dataId = data.dataId;
          this.targetForm[this.BasIndex].dataType = data.dataType;
          //TODO 需要优化
          this.targetForm[this.BasIndex].dataValue = "";
          this.targetForm[this.BasIndex].dataName = data.dataName;
          this.targetForm[this.BasIndex].taskName = data.dataName;
        }
        this.basicData.state = false;
      },
      // 打开基础数据
      openBasicData(row, ind) {
        this.basicData.identId = this.assignmentData.identId; //最外层传的id
        this.BasIndex = ind; //保存点击基础数据的下标，方便返回数据赋值====this.targetForm[this.BasIndex][0]
        // this.$refs.basicdata.openModal()
        this.basicData.state = true;
        this.$refs.basicdata.loadingData();
      },
      //关闭添加负责人
      closePrincipal(data) {
        this.PrincipalData.state = false;
        // this.targetForm[this.PrincipalIndex].directorVos = data;

        if (data && data.length > 0) {
          data.forEach(o => {
            this.targetForm[this.PrincipalIndex].directorVos.push({
              directorId: o.userId,
              directorName: o.name
            });
          });
        }
      },
      //打开添加负责人
      openPrincipal(row, ind) {
        this.PrincipalIndex = ind; //保存点击负责人的下标，方便上面 closePrincipal方法里返回数据赋值====this.targetForm[this.PrincipalIndex]
        this.$refs.principal.loadData();
        // this.PrincipalData.deptId,
        // this.PrincipalData.identId,
        this.PrincipalData.state = true;
        // this.$refs.principal[ind].getBaseData(); //子组件请求部门tree
        // this.$refs.principal[ind].getBaseData2(); //子组件请求校色列表
      },
      //删除负责人
      handleClosePerson(ind, item, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除该负责人？</p>',
          onOk: () => {
            this.targetForm[ind].directorVos.splice(index, 1);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      // 保存
      handleSubmit(name) {
      },
      // 重置
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      // 关闭添加文件框
      closeMains(val, sence, data) {

        //TODO 需要优化
        // this.targetForm[this.fileIndex].targetFileVos = [
        //     { fileId: 2, fileName: "文件2.txt" }
        // ];
        if (data && data.length > 0) {
          data.forEach(e => {
            this.targetForm[this.fileIndex].targetFileVos.push(e);
          });
        }
        this.addFileState.state = val;
      },
      // 打开添加文件框
      openAddFile(row, ind) {
        this.fileIndex = ind; //保存点击负责人的下标，方便返回数据赋值====this.targetForm[this.PrincipalIndex]
        this.addFileState.data = []; //传是哪个场景下的id
        this.addFileState.state = true;
        this.$refs.addFile.loadData();
      },
      deleteTargetFile(ind, row, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认该操作？</p>',
          onOk: () => {
            this.targetForm[ind].targetFileVos.splice(index, 1);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      //关闭分派任务编辑
      closeAssignmentModal3() {
        this.assignDetailData.state = false;
        this.getIndexTableData()
      },
      //关闭分派学生
      closeStudentModal() {
        this.addStudentData.state = false;
        this.getIndexTableData()
      },
      //关闭学生详情
      closeAssignmentModal4() {
        console.log("关闭");
        this.studentDetailData.state = false;
        this.getIndexTableData()
      },
      //关闭分派任务
      closeAssignmentModal2() {
        this.addTaskData.state = false;
        this.getIndexTableData()
      },
      //关闭
      closeAssignmentModal() {
        this.$emit("closeAssignmentModal", {
          state: false,
          reload: this.reloadTaskTable
        });
        this.indexPage = {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 5, //每页条数
          showTotal: true
        }
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
      }
    }
  };
</script>

<style lang="less" scoped>
  .name {
    color: #347ce8;
  }

  .removeItem {
    color: red;
    font-size: 30px;
  }

  .removeItem:hover {
    cursor: pointer;
  }

  .fileManage {
    position: relative;

    .addItem {
      position: absolute;
      right: 22px;
      bottom: 40px;
      color: #159f5c;
    }

    .addItem:hover {
      cursor: pointer;
    }
  }

  .fileBox {
    width: 100%;
    min-height: 100px;
    padding: 5px 5px;
    /*border-bottom: 1px solid #bbbbbb;*/
    text-align: left;

    .content {
      overflow: hidden;
      overflow-y: auto;
      width: 100%;
      height: 80px;
      padding: 0 10px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
      0 0 40px rgb(255, 255, 255) inset;
      border-radius: 3px;

      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
      0 0 40px rgb(255, 255, 255) inset;
      -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
      0 0 40px rgb(255, 255, 255) inset;
      -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
      0 0 40px rgb(255, 255, 255) inset;

      .docList {
        width: 100%;
        height: 35px;
        margin-top: 5px;
        background: #f6f9ff;
        border-radius: 3px;

        .listItem {
          float: left;
          display: inline-block;
          width: 10%;
          height: 35px;
          color: #94c6e7;
          font-size: 30px;
          line-height: 35px;
        }

        .listContent {
          float: left;
          overflow: hidden;
          width: 55%;
          height: 35px;
          margin-left: 5%;
          line-height: 35px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .deleteIcon {
          float: right;
          width: 10%;
          height: 35px;
          margin-left: 5%;
          color: red;
          font-size: 15px;
          line-height: 35px;
          text-align: center;
        }

        .deleteIcon1 {
          float: left;
          width: 10%;
          height: 35px;
          margin-left: 5%;
          color: red;
          font-size: 15px;
          line-height: 35px;
          text-align: center;
        }
      }
    }
  }

  .addCircle {
    color: #159f5c;
    font-size: 20px;
  }

  .personData {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 80px;
    padding: 0 10px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    border-radius: 3px;

    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
    -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
    -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  ::-webkit-scrollbar {
    width: 6px;
    height: 16px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/

  ::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, .63);
    border-radius: 6px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  }

  /*定义滑块 内阴影+圆角*/

  ::-webkit-scrollbar-thumb {
    background-color: #719ad8;
    border-radius: 6px;

    -webkit-box-shadow: inset 0 0 6px rgba(113, 154, 216, .3);
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

  .contentItem {
    /*height: 100%;*/
  }
</style>
