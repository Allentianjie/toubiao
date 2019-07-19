<template>
  <div id="taskSummaryPage">
    <div v-show="currentPlanState" class="taskSummaryItemTop">
      <div class="summaryEchart">
        <div class="left">
          <h3 class="taskbefore">规划项目总数</h3>
          <PersonalChart :personaTaskData="currentOwnPlanSummaryData"></PersonalChart>
        </div>
        <div class="right">
          <!--<Badge v-show="WarnTotal>0" style="margin-top:10px" class="imgs" :count=WarnTotal>-->
          <!--<Avatar style="color: red" shape="square" icon="md-bulb"/>-->
          <!--</Badge>-->
          <h3 class="taskbefore">规划检查</h3>
          <PieChart :pieChartData="currentOwnPlanCheckData"></PieChart>
        </div>
      </div>
    </div>
    <div class="taskSummaryItemTwo" style="min-height: 55%;">
      <Button
        @click="openNewPlanning"
        v-show="btnState"
        class="addBtn"
        type="primary"
        icon="ios-add-circle-outline"
      >新增
      </Button>
      <Button
        v-show="btnState"
        class="removeBtn"
        type="error"
        @click="removeCurrentPlan"
        v-if="currentPlanState"
        ghost
        icon="md-remove-circle"
      >删除
      </Button>
      <div class="summaryEchart">
        <el-tabs
          type="card"
          style="height:100%;"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="当前规划"
            name="first"
            style="padding-bottom:20px;min-height:800px"
          >
            <Form
              :label-width="70"
              ref="currentPlanForm"
              :model="currentPlanForm"
              v-if="currentPlanState"
              :rules="currentPlanRuleValidate"
            >
              <Row>
                <Col :span="8" style="padding:20px ">
                  <FormItem label="规划名称" prop="planName">
                    <Input placeholder v-model="currentPlanForm.planName"/>
                  </FormItem>
                  <FormItem label="完成进度">
                    <el-progress
                      style="margin-top: 10px"
                      :stroke-width="12"
                      :percentage="projectProcess"
                    ></el-progress>
                  </FormItem>

                  <FormItem label="规划状态">
                    <Input placeholder disabled v-model="planState"/>
                  </FormItem>
                  <div class="subBtn">
                    <Button
                      type="primary"
                      @click="saveCurrentOwnPlan('currentPlanForm')"
                    >更新
                    </Button>
                  </div>
                </Col>
                <Col :span="8" style="text-align:left;padding:20px ">
                  <FormItem label="规划日期" prop="startTime">
                    <Row>
                      <Col span="11">
                        <DatePicker
                          @on-change="changeDatestart"
                          type="date"
                          show-week-numbers
                          v-model="currentPlanForm.startTime"
                          placeholder="请选择开始日期"
                          style="width: 100%"
                        ></DatePicker>
                      </Col>
                      <Col span="2" style=" text-align: center">到</Col>
                      <Col span="11">
                        <DatePicker
                          @on-change="changeDateend"
                          type="date"
                          show-week-numbers
                          v-model="currentPlanForm.endTime"
                          placeholder="请选择结束日期"
                          style="width: 100%"
                        ></DatePicker>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem label="备注说明" prop="remark">
                    <Input
                      type="textarea"
                      v-model="currentPlanForm.remark"
                      :autosize="{minRows: 4,maxRows: 5}"
                      placeholder
                    />
                  </FormItem>
                </Col>
                <Col :span="8" style="text-align:left;padding:20px ">
                  <h4 class="title" style="padding: 0 0 10px 0">支撑材料：</h4>
                  <Button
                    @click="openAddFile"
                    class="add-doc"
                    ghost
                    type="success"
                    size="small"
                    icon="ios-add-circle-outline"
                  >添加文件
                  </Button>
                  <AddFileModal
                    ref="addFile"
                    :addFileState="addFileState"
                    @closeMains="closeMains"
                  ></AddFileModal>
                  <div class="content">
                    <div
                      class="docList"
                      v-for="(item,index) in currentPlanForm.planFiles"
                      :key="index"
                    >
                      <Icon class="listItem" type="ios-paper"/>
                      <div class="listContent">{{item.fileName}}</div>
                      <div class="deleteIcon1">
                        <Button
                          class="textbtn"
                          size="small"
                          @click="openPreviewModal(item)"
                          type="success"
                          ghost
                        >预览
                        </Button>
                      </div>
                      <div class="deleteIcon">
                        <Icon
                          @click="deleteFile(item,index)"
                          type="md-close"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
            <div class="tableList" v-if="currentPlanState">
              <h3 class="taskbefore">规划项目:({{projectPage.total}})</h3>
              <Button
                @click="openNewTaskItem"
                class="addTable"
                type="primary"
                icon="ios-add-circle-outline"
              >新增
              </Button>
              <Table
                :columns="currentProjectColumns"
                :data="currentProjectData"
                style="margin-top:5px;min-height:350px"
              >
                <template slot-scope="{ row, index }" slot="projectName">
                  <Input
                    type="text"
                    v-model="editName"
                    v-if="editIndex === index"
                  />
                  <span v-else>{{ row.projectName }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="targetValue">
                  <InputNumber
                    v-model="editWarnValue"
                    v-if="editIndex === index"
                    :max="100"
                    :min="0"
                  ></InputNumber>
                  <span
                    v-else
                  >{{getStrategySymbol(row.targetStrategy) + row.targetValue }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="warnValue">
                  <InputNumber
                    v-model="editTargetValue"
                    v-if="editIndex === index"
                    :max="100"
                    :min="0"
                  ></InputNumber>
                  <span
                    v-else
                  >{{getStrategySymbol(row.warnStrategy) + row.warnValue }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="currentValue">
                  <InputNumber
                    v-model="editValue"
                    v-if="editIndex === index"
                    :max="100"
                    :min="0"
                  ></InputNumber>
                  <span v-else>{{ row.currentValue }}</span>
                </template>
                <template slot-scope="{ row}" slot="targetState">
                  <span v-if="row.targetState === '1' ">达标</span>
                  <span v-else>未达标</span>
                </template>
                <template slot-scope="{ row, index }" slot="startTime">
                  <DatePicker
                    v-model="editStartTime"
                    v-if="editIndex === index"
                    type="date"
                    placeholder="Select date"
                    style="width: 120px"
                  ></DatePicker>
                  <span v-else>{{ row.startTime }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="endTime">
                  <DatePicker
                    v-model="editEndTime"
                    v-if="editIndex === index"
                    type="date"
                    placeholder="Select date"
                    style="width: 120px"
                  ></DatePicker>
                  <span v-else>{{ row.endTime }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="FileVos">
                  <Button
                    type="success"
                    ghost
                    @click="openFileList(row,index,1)"
                  >查看
                  </Button>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <div v-if="editIndex === index">
                    <Button type="success" ghost @click="handleSave(index)">保存</Button>
                    <Button type="warning" ghost @click="editIndex = -1">取消</Button>
                  </div>
                  <div v-else>
                    <Button
                      type="primary"
                      ghost
                      @click="handleEdit(row, index)"
                    >编辑
                    </Button>
                    <Button
                      type="error"
                      ghost
                      @click="handleRemove(row, index)"
                    >删除
                    </Button>
                  </div>
                </template>
              </Table>
              <div style="margin: 10px;overflow: hidden;text-align:right">
                <Page
                  :total="projectPage.total"
                  :showTotal="projectPage.showTotal"
                  :current="projectPage.current"
                  :page-size="projectPage.size"
                  @on-change="changeProjectPage"
                ></Page>
              </div>
            </div>
            <div v-if="currentPlanState === false" style="width: 100%;">
                            <span
                              style="text-align: center;float: left;width: 100%;margin-top: 100px;"
                            >暂未发现执行中的规划</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史规划" name="second" style="padding:20px;">
            <Table
              :columns="historyColumns"
              :data="historyData"
              style="margin-top:5px;min-height:550px;"
            >
              <template slot-scope="{ row, index }" slot="planName">
                <Button
                  type="text"
                  style="color:#3bb4f2"
                  @click="openDetails(row, index)"
                >{{ row.planName }}
                </Button>
              </template>
              <template slot-scope="{ row}" slot="projectCount">
                <span>{{row.projectCount.total}}</span>
              </template>
              <template slot-scope="{ row, index }" slot="process">
                <el-progress
                  :stroke-width="12"
                  :percentage="getProjectProcess(row.projectCount)"
                ></el-progress>
              </template>
              <template slot-scope="{ row}" slot="planState">
                <span v-if="row.planState === '1' ">达标</span>
                <span v-else>未达标</span>
              </template>
            </Table>
            <div style="margin: 10px;overflow: hidden;text-align:right">
              <Page
                :total="historyPage.total"
                :showTotal="historyPage.showTotal"
                :current="historyPage.current"
                :page-size="historyPage.size"
                @on-change="changePageHistory"
              ></Page>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <NewPlanningModal
      ref="newOwnPlanModal"
      :newPlanningData="newPlanningData"
      @closePlanning="closePlanning"
    ></NewPlanningModal>
    <NewTaskItemModal
      ref="newTaskItemModal"
      :newTaskData="newTaskData"
      @closeTaskModal="closeTaskModal"
    ></NewTaskItemModal>
    <PlanningDetailsModal
      ref="planningDetailsModal"
      :historyDetails="historyDetails"
      @closePlanningDetailModal="closePlanningDetailModal"
    ></PlanningDetailsModal>
    <FileManage ref="ownPlanFileManage" :fileList="fileList" @closeFileManage="closeFileManage"></FileManage>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
  </div>
</template>
<script>
  import FileManage from "./modal/fileManage"; //引入文件管理Modal
  import PieChart from "@/components/taskHall/inspectChart"; //任务检查 --
  import PersonalChart from "@/components/taskHall/personalTaskChart"; //个人任务汇总 --
  import AddFileModal from "@/views/diagnosis/modal/addFile"; //添加文件
  import NewPlanningModal from "./modal/newPlanningModal"; //新增个人规划
  import NewTaskItemModal from "./modal/newTaskItemModal"; //新增规划項目
  import PlanningDetailsModal from "./modal/planningDetailsModal"; //历史规划详情
  import df from "@/api/utils";
  import {setTimeout} from "core-js";
  import Preview from "@/components/preview";

  export default {
    name: "index",
    components: {
      FileManage,
      PieChart,
      AddFileModal,
      PersonalChart,
      NewPlanningModal,
      NewTaskItemModal,
      PlanningDetailsModal,
      Preview
    },
    data() {
      return {
        WarnTotal: 0,
        previews: {
          name: "",
          //预览文件数据
          data: [],
          state: false
        },
        historyDetails: {
          state: false,
          date: {}
        },
        newPlanningData: {
          //新增个人规划数据
          state: false,
          data: []
        },
        newTaskData: {
          //新增项目数据
          state: false,
          data: {}
        },
        btnState: true,
        historyPage: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        historyColumns: [
          {
            title: "规划名称",
            key: "planName",
            align: "center",
            slot: "planName"
          },
          {
            title: "包含子项",
            key: "projectCount",
            align: "center",
            width: 200,
            slot: "projectCount"
          },
          {
            title: "完成进度",
            key: "projectCount",
            align: "center",
            width: 300,
            slot: "process"
          },
          {
            title: "完成状态",
            key: "planState",
            align: "center",
            width: 200,
            slot: "planState"
          }
        ],
        historyData: [],
        projectPage: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        currentProjectColumns: [
          {
            title: "项目名称",
            key: "projectName",
            align: "center",
            slot: "projectName"
          },
          {
            title: "目标值",
            key: "targetValue",
            width: 100,
            align: "center",
            slot: "targetValue"
          },
          {
            title: "预警值",
            key: "warnValue",
            width: 100,
            align: "center",
            slot: "warnValue"
          },
          {
            title: "当前值",
            key: "currentValue",
            width: 100,
            align: "center",
            slot: "currentValue"
          },
          {
            title: "完成状态",
            key: "targetState",
            width: 100,
            align: "center",
            slot: "targetState"
          },
          {
            title: "开始时间",
            key: "startTime",
            align: "center",
            width: 110,
            slot: "startTime"
          },
          {
            title: "结束时间",
            key: "endTime",
            width: 110,
            align: "center",
            slot: "endTime"
          },
          {
            title: "附件",
            key: "projectId",
            width: 100,
            align: "center",
            slot: "FileVos"
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            width: 160,
            slot: "action"
          }
        ],
        currentProjectData: [
          {
            projectId: 0,
            planId: 0,
            projectName: "",
            targetStrategy: 21,
            targetValue: "",
            targetState: "0",
            warnStrategy: 21,
            warnValue: "",
            startTime: "",
            endTime: "",
            currentValue: ""
          }
        ],
        fileList: {
          //管理文件list
          type: "",
          state: false,
          data: []
        },
        editIndex: -1, // 当前聚焦的输入框的行数
        editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editWarnValue: "", // 第二列输入框
        editTargetValue: "", // 第三列输入框
        editValue: "", // 第四列输入框
        editStartTime: "", // 第六列输入框
        editEndTime: "", // 第七列输入框
        currentPlanState: false, //是否存在当前规划
        currentPlanRuleValidate: {
          planName: [
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
          remark: [
            {
              type: "string",
              max: 2000,
              message: "备注不能大于2000字符",
              trigger: "blur"
            }
          ]
        },
        currentPlanForm: {
          planId: 2,
          planName: "",
          remark: "",
          startTime: "",
          endTime: "",
          planState: "0",
          planFiles: [],
          projectCount: {
            total: 0,
            doneTotal: 0
          }
        },
        addFileState: {
          //添加文件传过去的数据
          data: [],
          state: false
        },
        activeName: "first",
        currentOwnPlanSummaryData: {},
        currentOwnPlanCheckData: {},
        taskParam: {
          type: "1",
          keyword: "",
          hieId: "",
        },
      };
    },
    computed: {
      projectProcess: function () {
        return this.getProjectProcess(this.currentPlanForm.projectCount);
      },
      planState: function () {
        let planState = this.currentPlanForm.planState;
        return planState === "1" ? "已达标" : "未达标";
      }
    },
    mounted() {
      this.getWarnData();
      this.getCurrentOwnPlan();
    },
    methods: {
      //时间选择判断
      changeDatestart(val, data) {
        if (this.currentPlanForm.endTime) {
          if (this.currentPlanForm.startTime.valueOf() > this.currentPlanForm.endTime.valueOf()) {
            this.$Message.warning("开始时间不能晚于结束时间");
            this.currentPlanForm.startTime = '';
            return;
          }
        }
      },
      changeDateend(val, data) {
        if (this.currentPlanForm.startTime) {
          if (this.currentPlanForm.startTime.valueOf() > this.currentPlanForm.endTime.valueOf()) {
            this.$Message.warning("结束时间不能早于开始时间");
            this.currentPlanForm.endTime = '';
            return;
          }
        }
      },
      //获取报警指标条数
      getWarnData() {
        let that = this;
        that.$Get(
          "/admin/task/page",
          Object.assign(1, that.taskParam),
          function (data) {
            that.WarnTotal = data.data.total;
          }
        );
      },
      //关闭预览
      closePreview(val) {
        this.previews.state = val;
      },

      //打开预览
      openPreviewModal(row) {
        //把选择的文件数据===>previews.data传给子组件
        this.previews.name = row.fileSuffix;
        this.previews.data = "/mngfile/chunkfile/previewStream/" + row.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      //关闭文件管理
      closeFileManage(val) {
        this.fileList.state = val;
      },
      // 打开文件管理
      openFileList(row, index, val) {
        //val:当前规划项目文件查看val=1/历史规划项目文件查看val=2
        //当前点击的支持文件行数据传过去
        let that = this;
        let projectId = row.projectId;
        that.$Get("/admin/ownplan/project/file/" + projectId, {}, function (
          data
        ) {
          that.fileList.type = val;
          that.fileList.data = {targetFiles: data.data};
          that.fileList.state = true;
          that.$refs.ownPlanFileManage.getFileList(); //触发文件管理页面的获取数据方法
        });
      },
      //获取项目进度
      getProjectProcess(projectCount) {
        let total = projectCount.total;
        let doneTotal = projectCount.doneTotal;
        if (total === 0) {
          return 0;
        }
        let percentage = Math.floor((doneTotal / total) * 100);
        return percentage;
      },
      //删除当前个人规划
      removeCurrentPlan() {
        let that = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除当前个人规划吗？</p>',
          onOk: () => {
            that.$Delete(
              "/admin/ownplan/" + that.currentPlanForm.planId,
              {},
              function (data) {
                that.$Message.success("删除成功");
                //刷新当前个人规划
                that.getCurrentOwnPlan();
              }
            );
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });

      },
      //保存当前个人规划
      saveCurrentOwnPlan(name) {
        let that = this;
        that.$refs[name].validate(valid => {
          if (valid) {
            let formData = {
              planName: that.currentPlanForm.planName,
              startTime: df
                .dateFormat(that.currentPlanForm.startTime)
                .substr(0, 10),
              endTime: df
                .dateFormat(that.currentPlanForm.endTime)
                .substr(0, 10),
              planId: that.currentPlanForm.planId,
              remark: that.currentPlanForm.remark
            };
            that.$Put("/admin/ownplan", formData, function (data) {
              that.$Message.success("更新成功");
            });
          }
        });
      },
      //获取当前个人规划
      getCurrentOwnPlan() {
        let that = this;
        that.$Get("/admin/ownplan", {}, function (data) {
          if (data.data) {
            that.currentPlanForm = data.data;
            that.getProjectTableData();
            that.getCurrentOwnPlanSummary();
            that.currentPlanState = true;
          } else {
            that.currentPlanState = false;
          }
        });
      },
      //关闭新增项目
      closeTaskModal(obj) {
        this.newTaskData.state = obj.state;
        if (obj.reload) {
          //刷新当前个人规划项目
          this.getWarnData();
          this.getCurrentOwnPlan();
        }
      },
      //打开新增项目
      openNewTaskItem() {
        let param = {
          updateModal: false,
          minTime: this.currentPlanForm.startTime,
          maxTime: this.currentPlanForm.endTime
        };
        this.newTaskData.data = {planId: this.currentPlanForm.planId};
        this.newTaskData.state = true;
        this.$refs.newTaskItemModal.getProjectFormData(param);
      },
      //关闭新增个人规划
      closePlanning(obj) {
        this.newPlanningData.state = obj.state;
        if (obj.reload) {
          //刷新当前个人规划
          this.getCurrentOwnPlan();
        }
      },
      //打开新增个人规划
      openNewPlanning() {
        this.$refs.newOwnPlanModal.resetOwnPlanForm();
        if (this.currentPlanState) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>您确定停止当前规划，创建新的个人规划吗？</p>',
            onOk: () => {
              this.newPlanningData.state = true;
            },
            onCancel: () => {
              // this.$Message.info('Clicked cancel');
            }
          });
        } else {
          this.newPlanningData.state = true;
        }
      },
      //关闭规划详情
      closePlanningDetailModal(val) {
        this.historyDetails.state = val;
      },
      //查看规划详情
      openDetails(row, index) {
        let that = this;
        that.$Get("/admin/ownplan/" + row.planId, {}, function (data) {
          that.historyDetails.state = true;
          that.historyDetails.data = data.data;
          that.$refs.planningDetailsModal.getProjectHistoryData();
        });
      },
      //打开文件
      openFile(row, index) {
      },
      //删除规划项目
      handleRemove(row, index) {
        let that = this;
        let projectId = row.projectId;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认该操作？</p>',
          onOk: () => {
            that.$Delete(
              "/admin/ownplan/project/" + projectId,
              {},
              function (data) {
                that.$Message.success("删除成功");
                //重新请求指标数据
                that.getWarnData();
                that.getCurrentOwnPlan();
              }
            );
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });

      },
      //操作修改(修改规划项目)
      handleEdit(row, index) {
        // this.editName = row.name;
        // this.editWarnValue = row.warnValue;
        // this.editTargetValue = row.targetValue;
        // this.editValue = row.value;
        // this.editStartTime = row.startTime;
        // this.editEndTime = row.endTime;
        // this.editIndex = index;
        let that = this;
        that.$Get("/admin/ownplan/project/" + row.projectId, {}, function (
          data
        ) {
          that.newTaskData.state = true;
          that.newTaskData.data = data.data;
          let param = {
            updateModal: true,
            minTime: that.currentPlanForm.startTime,
            maxTime: that.currentPlanForm.endTime
          };
          that.$refs.newTaskItemModal.getProjectFormData(param);
        });
      },
      //保存修改
      handleSave(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认保存该条数据？</p>',
          onOk: () => {
            this.currentData[index].name = this.editName;
            this.currentData[index].warnValue = this.editWarnValue;
            this.currentData[index].targetValue = this.editTargetValue;
            this.currentData[index].value = this.editValue;
            this.currentData[index].startTime = df
              .dateFormat(this.editStartTime)
              .substr(0, 10);
            this.currentData[index].endTime = df
              .dateFormat(this.editEndTime)
              .substr(0, 10);
            this.editIndex = -1;
            this.$Message.success("保存成功");
          },
          onCancel: () => {
            this.editIndex = -1;
          }
        });

      },
      // 删除文件
      deleteFile(row, index) {
        let that = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除该文件？</p>',
          onOk: () => {
            that.$Delete("/admin/ownplan/file/" + row.id, {}, function (
              data
            ) {
              that.$Message.success("删除成功");
              that.currentPlanForm.planFiles.splice(index, 1);
              that.getWarnData();
              that.getCurrentOwnPlan();
            });
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });

      },
      // 关闭添加文件框
      closeMains(val, sence, data) {
        let that = this;
        this.addFileState.state = val;
        if (data && data.length > 0) {
          if (this.currentPlanForm.planFiles.length > 0) {
            for (let i = 0; i < data.length; i++) {
              this.currentPlanForm.planFiles.push({
                id: data[i].fileId,
                fileId: data[i].fileId,
                fileName: data[i].fileName
              });
            }
            let obj = {};
            this.currentPlanForm.planFiles = this.currentPlanForm.planFiles.reduce(function (item, next) {
              obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
              return item;
            }, []);
          } else {
            for (let i = 0; i < data.length; i++) {
              this.currentPlanForm.planFiles.push({
                id: data[i].fileId,
                fileId: data[i].fileId,
                fileName: data[i].fileName
              });
            }
            let obj = {};
            this.currentPlanForm.planFiles = this.currentPlanForm.planFiles.reduce(function (item, next) {
              obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
              return item;
            }, []);
          }
          for (let i = 0; i < this.currentPlanForm.planFiles.length; i++) {
            let param = {
              id: this.currentPlanForm.planId,
              fileId: this.currentPlanForm.planFiles[i].fileId
            };
            this.$Post("/admin/ownplan/file", param, function (data) {
              if (data.code == 0) {
                that.getWarnData();
                that.getCurrentOwnPlan();
              }
            });
          }

        }
      },
      //去重
      unique(arr) {
        //定义常量 res,值为一个Map对象实例
        const res = new Map();
        //返回arr数组过滤后的结果，结果为一个数组
        //过滤条件是，如果res中没有某个键，就设置这个键的值为1
        return arr.filter((fileId) => !res.has(fileId) && res.set(fileId, 1))
      },
      // 打开添加文件框
      openAddFile() {
        this.addFileState.data = []; //传是哪个场景下的id
        this.addFileState.state = true;
        this.$refs.addFile.loadData();
      },
      //选中tab
      handleClick(tab, event) {
        if (this.activeName == "second") {
          this.currentPlanState = false;
          this.btnState = false;
          this.historyPage.current = 1;
          this.getHistoryTableData();
        } else {
          this.btnState = true;
          this.getCurrentOwnPlan();
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
      //获取规划项目表格数据
      getProjectTableData() {
        let that = this;
        that.$Get(
          "/admin/ownplan/project/page",
          Object.assign(that.projectPage, {
            planId: that.currentPlanForm.planId
          }),
          function (data) {
            that.currentProjectData = data.data.records;
            that.projectPage.total = data.data.total;
          }
        );
      },
      changeProjectPage(val) {
        this.projectPage.current = val;
        //下面调用请求表数据接口
        this.getProjectTableData();
      },
      //获取历史规划表格数据
      getHistoryTableData() {
        let that = this;
        that.$Get("/admin/ownplan/page", that.historyPage, function (data) {
          that.historyData = data.data.records;
          that.historyPage.total = data.data.total;
        });
      },
      changePageHistory(val) {
        this.historyPage.current = val;
        //下面调用请求表数据接口
        this.getHistoryTableData();
      },
      //获取任务检查和个人任务总数数据
      getCurrentOwnPlanSummary() {
        let that = this;
        that.$Get("/admin/ownplan/summary/current", {}, function (data) {
          that.getCurrentOwnPlanCheckData(data.data); //   获取echart任务监控
          that.getCurrentOwnPlanSummaryData(data.data); //获取echart任务数据
        });
      },
      //   获取任务监控
      getCurrentOwnPlanCheckData(data) {
        this.currentOwnPlanCheckData = {
          id: "currentOwnPlanProjectCheckChart",
          legendData: ["规划检查"],
          seriesData: [
            {
              value: [data.notStart,data.makeIt, data.overtime, data.warn],
              name: "规划检查"
            }
          ],
          indicatorData: [
            {text: "未达标", max: data.total},
            {text: "达标", max: data.total},
            {text: "逾期", max: data.total},
            {text: "报警", max: data.total}
          ]
        };
      },
      //   获取任务数据
      getCurrentOwnPlanSummaryData(data) {

        this.currentOwnPlanSummaryData = {
          id: "currentOwnPlanProjectSummaryChart",
          legendData: ["未开始", "已结束", "进行中"],
          seriesData: [
            {value: data.notStart, name: "未开始"},
            {value: data.ended, name: "已结束"},
            {value: data.ongoing, name: "进行中"}
          ]
        };
      }
    }
  };
</script>

<style lang='less' scoped>
  @import url("./index.less");

  .addBtn {
    position: absolute;
    top: 45px;
    right: 110px;
    z-index: 1000;
  }

  .removeBtn {
    position: absolute;
    top: 45px;
    right: 30px;
    z-index: 1000;
  }
</style>
