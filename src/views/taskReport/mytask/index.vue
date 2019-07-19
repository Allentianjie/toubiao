<template>
  <div id="taskSummaryPage">
    <div class="taskSummaryItemTop">
      <div class="summaryEchart">
        <div class="left">
          <!--<div class="imgs" style="margin-top:10px;color:#fff;font-size: .16rem;text-align: right"> {{WarnTotal}}</div>-->
          <Badge v-show="WarnTotal>0" style="margin-top:10px" class="imgs" :count=WarnTotal>
            <Avatar style="color: red" shape="square" icon="md-bulb"/>
          </Badge>
          <h3 class="taskbefore">诊改检查</h3>
          <RadarChart ref="taskMonitors1" :TaskMonitorData="TaskMonitorData"></RadarChart>
        </div>
        <div class="right">
          <h3 class="taskbefore">个人诊改总数</h3>
          <PieChart ref="tasksummarys1" :pieChartData="TaskSummaryData"></PieChart>
        </div>
      </div>
    </div>
    <div class="taskSummaryItem">
      <div class="summaryEchart">
        <div class="searchBox">
          <Row>
            <!--<Col span="8" style="padding-right: 5px">-->
              <!--<Button @click="searchreport()" type="primary" icon="ios-search">诊断报告</Button>-->
            <!--</Col>-->
            <Col span="10" style="padding-right: 5px"><Input v-model="taskParam.keyword" placeholder="关键字搜索" style="width: 100%"/></Col>
            <Col span="5">
              <Button @click="searchData()" type="primary" icon="ios-search">搜 索</Button>
            </Col>
            <Col span="8">
              <Button @click="openTaskLastReport()" v-if="reportTaskFlag===true && activeTab === '0'" type="primary">
                填写诊断报告
              </Button>
            </Col>
          </Row>
        </div>
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane label="我的诊改" name="0">
            <el-row>
              <el-col :span="4" style="padding: 10px">
                <div :style="taskHeight" class="flowTreeDiv">
                  <el-input v-model="screenTree" size="small" @keyup.native="searchHimTree($event)" placeholder="请输入关键字"
                            suffix-icon="el-icon-search">
                  </el-input>
                  <el-tree :data="treeData"
                           :default-expanded-keys="defaultExpandIds" accordion
                           :load="loadHierachyTreeData" lazy highlight-current :props="defaultProps"
                           :filter-node-method="filterNode"
                           node-key="id" @node-click="handleNodeClick" ref="tree"></el-tree>
                </div>
              </el-col>
              <el-col :span="20" ref="NineHeight">
                <Table style="margin-top:5px;min-height:300px" :data="tableDatas" :columns="myTaskColumns">
                  <!--建职-->
                  <template slot-scope="{row, index }" slot="taskName">
                    <span v-if="row.taskId !== -1 " style="color:#3862b3">{{row.taskName}}</span>
                    <span v-else style="color:#3862b3">【重要诊改】{{row.taskName}}</span>
                  </template>

                  <!-- <template v-show='row.dataType=="5"' slot-scope="{row, index }" slot="targetValue">
                    <span v-if="row.targetValue == '1'">是</span>
                    <span v-else>否</span>
                  </template> -->
                  <template slot-scope="{row, index }" slot="disTargetValue">
                    <span
                      v-if="row.taskId !== -1">{{getStrategySymbol(row.targetStrategy)}}{{row.disTargetValue}}</span>
                    <span v-else>-</span>
                  </template>
                  <template slot-scope="{row, index }" slot="disStandardValue">
                    <span
                      v-if="row.taskId !== -1">{{getStrategySymbol(row.standardStrategy)}}{{row.disStandardValue}}</span>
                    <span v-else>-</span>
                  </template>
                  <template slot-scope="{row, index }" slot="disWarnValue">
                    <span v-if="row.taskId !== -1">{{getStrategySymbol(row.warnStrategy)}}{{row.disWarnValue}}</span>
                    <span v-else>-</span>
                  </template>
                  <template slot-scope="{row, index }" slot="disValue">
                    <span v-if="row.disValue">{{row.disValue}}</span>
                    <span v-else>-</span>
                  </template>
                  <template slot-scope="{row, index }" slot="action">
                    <Button @click="openTaskWrite(row,index)" v-if="row.taskState === '0' && row.taskId !== -1 "
                            type="text"
                            size="small" style="color:#3f7ae6;fontSize:14px">
                      填报
                    </Button>
                    <Button @click="openTaskWrite(row,index)" v-if="row.taskState === '1' && row.taskId !== -1 "
                            type="text"
                            size="small" style="color:#3f7ae6;fontSize:14px">
                      维护
                    </Button>


                    <!--<Button @click="openAssignment(row,index)"-->
                    <!--v-if="(row.taskState === '0' || row.taskState === '2') && row.taskId !== -1 " type="text"-->
                    <!--size="small" style="color:#3f7ae6;fontSize:14px">-->
                    <!--分派-->
                    <!--</Button>-->
                    <Button @click="openAssignmentDetail(row,index)"
                            v-if="(row.taskState === '0' || row.taskState === '2') && row.taskId !== -1  && task_my_menu_allocate " type="text"
                            size="small" style="color:#3f7ae6;fontSize:14px">
                      分派
                    </Button>
                    <Button
                      @click="updateTask(row,index)"
                      v-if="row.parentId != '0' && row.taskId !== -1  && task_my_menu_edit" type="text"
                      size="small" style="color:#3f7ae6;fontSize:14px">
                      编辑
                    </Button>
                    <Button
                      @click="openSpiralModal(row,index)"
                      v-if="row.countEndTask > 0 && row.taskId !== -1  && task_my_menu_allocate "
                      type="text"
                      size="small"
                      style="color:#3f7ae6;fontSize:14px"
                    >诊改
                    </Button>
                    <Button
                      @click="openFeedBack(row,index)"
                      v-if="row.parentId !== 0 && row.taskId !== -1"
                      type="text"
                      size="small"
                      style="color:#3f7ae6;fontSize:14px"
                    >反馈
                    </Button>
                    <Button @click="openEvidenceFile(row,index)" v-if="row.taskState === '1' && row.taskId !== -1 "
                            type="text"
                            size="small" style="color:#3f7ae6;fontSize:14px">
                      佐证文件
                    </Button>
                  </template>
                </Table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="报警诊改" name="1">
            <Table
              style="margin-top:5px;min-height:300px"
              :data="tableDatas"
              :columns="myTaskColumns"
            >
              <template slot-scope="{row, index }" slot="taskName">
                <span style="color:#3862b3">{{row.taskName}}</span>
              </template>
              <template slot-scope="{row, index }" slot="disTargetValue">
                <span v-if="row.taskId !== -1">{{getStrategySymbol(row.targetStrategy)}}{{row.disTargetValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disStandardValue">
                <span
                  v-if="row.taskId !== -1">{{getStrategySymbol(row.standardStrategy)}}{{row.disStandardValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disWarnValue">
                <span  v-if="row.taskId !== -1">{{getStrategySymbol(row.warnStrategy)}}{{row.disWarnValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disValue">
                <span v-if="row.disValue">{{row.disValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="action">
                <Button
                  @click="openTaskWrite(row,index)"
                  v-if="row.taskState === '0' "
                  type="text"
                  size="small"
                  style="color:#3f7ae6;fontSize:14px"
                >填报
                </Button>
                <Button
                  @click="openTaskWrite(row,index)"
                  v-if="row.taskState === '1' "
                  type="text"
                  size="small"
                  style="color:#3f7ae6;fontSize:14px"
                >维护
                </Button>
                <Button
                  @click="openAssignmentDetail(row,index)"
                  v-if="row.taskState === '0' || row.taskState === '2' && task_my_menu_allocate "
                  type="text"
                  size="small"
                  style="color:#3f7ae6;fontSize:14px"
                >分派
                </Button>
                <Button
                  @click="openSpiralModal(row,index)"
                  v-if="row.countEndTask > 0 && task_my_menu_allocate "
                  type="text"
                  size="small"
                  style="color:#3f7ae6;fontSize:14px"
                >诊改
                </Button>
                <Button
                  @click="openFeedBack(row,index)"
                  v-if="row.parentId !== 0"
                  type="text"
                  size="small"
                  style="color:#3f7ae6;fontSize:14px"
                >反馈
                </Button>
                <Button @click="openEvidenceFile(row,index)" v-if="row.taskState === '1' && row.taskId !== -1 "
                        type="text"
                        size="small" style="color:#3f7ae6;fontSize:14px">
                  佐证文件
                </Button>
              </template>
            </Table>
          </el-tab-pane>
          <el-tab-pane label="逾期诊改" name="2">
            <Table
              style="margin-top:5px;min-height:300px"
              :data="tableDatas"
              :columns="doneTaskColumns"
            >
              <template slot-scope="{row, index }" slot="taskName">
                <span style="color:#3862b3">{{row.taskName}}</span>
              </template>
              <template slot-scope="{row, index }" slot="disTargetValue">
                <span v-if="row.taskId !== -1">{{getStrategySymbol(row.targetStrategy)}}{{row.disTargetValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disStandardValue">
                <span
                  v-if="row.taskId !== -1">{{getStrategySymbol(row.standardStrategy)}}{{row.disStandardValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disWarnValue">
                <span v-if="row.taskId !== -1">{{getStrategySymbol(row.warnStrategy)}}{{row.disWarnValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disValue">
                <span v-if="row.disValue">{{row.disValue}}</span>
                <span v-else>-</span>
              </template>
            </Table>
          </el-tab-pane>
          <el-tab-pane label="达标诊改" name="3">
            <Table
              style="margin-top:5px;min-height:300px"
              :data="tableDatas"
              :columns="doneTaskColumns"
            >
              <template slot-scope="{row, index }" slot="taskName">
                <span style="color:#3862b3">{{row.taskName}}</span>
              </template>
              <template slot-scope="{row, index }" slot="disTargetValue">
                <span v-if="row.taskId !== -1">{{getStrategySymbol(row.targetStrategy)}}{{row.disTargetValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disStandardValue">
                <span
                  v-if="row.taskId !== -1">{{getStrategySymbol(row.standardStrategy)}}{{row.disStandardValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disWarnValue">
                <span v-if="row.taskId !== -1">{{getStrategySymbol(row.warnStrategy)}}{{row.disWarnValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disValue">
                <span v-if="row.disValue">{{row.disValue}}</span>
                <span v-else>-</span>
              </template>
            </Table>
          </el-tab-pane>
          <el-tab-pane label="已分派诊改" name="4">
            <Table
              style="margin-top:5px;min-height:300px"
              :data="tableDatas"
              :columns="myTaskColumns"
            >
              <template slot-scope="{row, index }" slot="taskName">
                <span style="color:#3862b3">{{row.taskName}}</span>
              </template>
              <template slot-scope="{row, index }" slot="disTargetValue">
                <span v-if="row.taskId !== -1">{{getStrategySymbol(row.targetStrategy)}}{{row.disTargetValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disStandardValue">
                <span
                  v-if="row.taskId !== -1">{{getStrategySymbol(row.standardStrategy)}}{{row.disStandardValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disWarnValue">
                <span v-if="row.taskId !== -1">{{getStrategySymbol(row.warnStrategy)}}{{row.disWarnValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="disValue">
                <span v-if="row.disValue">{{row.disValue}}</span>
                <span v-else>-</span>
              </template>
              <template slot-scope="{row, index }" slot="action">
                <Button
                  @click="openAssignmentDetail(row,index)"
                  v-if="row.runState !== '2' && task_my_menu_allocate "
                  type="text"
                  size="small"
                  style="color:#3f7ae6;fontSize:14px"
                >分派
                </Button>
                <!--<Button @click="openAssignmentDetail(row,index)"-->
                <!--v-if="(row.taskState === '0' || row.taskState === '2') && row.taskId !== -1 " type="text"-->
                <!--size="small" style="color:#3f7ae6;fontSize:14px">-->
                <!--分派2-->
                <!--</Button>-->
                <Button
                  @click="openSpiralModal(row,index)"
                  v-if="row.countEndTask > 0 && task_my_menu_allocate "
                  type="text"
                  size="small"
                  style="color:#3f7ae6;fontSize:14px"
                >诊改
                </Button>
                <Button @click="openEvidenceFile(row,index)" v-if="row.taskState === '1' && row.taskId !== -1 "
                        type="text"
                        size="small" style="color:#3f7ae6;fontSize:14px">
                  佐证文件
                </Button>
              </template>
            </Table>
          </el-tab-pane>
        </el-tabs>
        <div style="margin: 10px;overflow: hidden; text-align: right">
          <Page
            :total="page.total"
            :showTotal="page.showTotal"
            :current="page.current"
            :page-size="page.size"
            @on-change="changePage"
          ></Page>
        </div>

      </div>
    </div>
    <div v-if="isTask">
      <writeModal ref='taskwrite' :taskWrite="taskWrite" @closeTaskWrite="closeTaskWrite"></writeModal>
      <ReportedModal ref="repotModal" :taskWriteIndex="taskWriteIndex" @closeWriteIndex="closeWriteIndex"></ReportedModal>
      <backModal
              ref="taskFeedbackModal"
              :feedBack="feedBack"
              @closefeedBack="closeTaskFeedback"></backModal>
      <assignmentModal ref="assignModal" :assignmentData="assignmentData"
                       @closeAssignmentModal="closeAssignmentModal"></assignmentModal>
      <treatmentModal
              ref="spiralTaskModal"
              :treatmentData="treatmentData"
              @closeSpiralModal="closeSpiralModal"
      ></treatmentModal>
      <!--@on-cancel="closeAssignmentModal"-->
      <Modal v-model="upTaskState" width="40%" :mask-closable="false">
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
          <span>修改诊改信息</span>
        </p>
        <div class="fileManage">
          <Divider orientation="left">诊改信息</Divider>
          <div class="fileBox">
            <Form ref="updateTaskData" :rules="ruleValidate" :model="updateTaskData" :label-width="80">
              <Row>
                <Col span="12">
                  <FormItem label="所属部门">
                    <Input v-model="updateTaskData.deptName" disabled placeholder/>
                  </FormItem>
                  <FormItem label="数据关联">
                    <Input v-model="updateTaskData.dataName" disabled placeholder/>
                  </FormItem>
                  <FormItem label="数据类型">
                    <Select v-model="updateTaskData.dataType" disabled placeholder="请选择类型">
                      <Option value="0">整数</Option>
                      <Option value="1">小数</Option>
                      <Option value="2">百分比</Option>
                      <Option value="3">千分比</Option>
                      <Option value="4">比列</Option>
                      <Option value="5">布尔</Option>
                    </Select>
                  </FormItem>
                  <FormItem prop="startTime" label="开始时间">
                    <DatePicker
                            v-model="updateTaskData.startTime"
                            :options="pickerOptions"
                            style="width: 100%"
                            type="date"
                            placeholder
                    ></DatePicker>
                  </FormItem>

                  <FormItem prop="endTime" label="结束时间">
                    <DatePicker
                            v-model="updateTaskData.endTime"
                            :options="pickerOptions"
                            style="width: 100%"
                            type="date"
                            placeholder
                    ></DatePicker>
                  </FormItem>
                  <FormItem label="目标策略">
                    <Select filterable v-model="updateTaskData.targetStrategy">
                      <Option
                              v-for="(item,index) in operator"
                              :value="item.label"
                              :key="index"
                      >{{item.value}}
                      </Option>
                    </Select>
                  </FormItem>
                  <FormItem label="标准策略">
                    <Select filterable v-model="updateTaskData.standardStrategy">
                      <Option
                              v-for="(item,index) in operator"
                              :value="item.label"
                              :key="index"
                      >{{item.value}}
                      </Option>
                    </Select>
                  </FormItem>
                  <FormItem label="预警策略">
                    <Select filterable v-model="updateTaskData.warnStrategy">
                      <Option
                              v-for="(item,index) in operator"
                              :value="item.label"
                              :key="index"
                      >{{item.value}}
                      </Option>
                    </Select>
                  </FormItem>
                  <FormItem label="标准权重">
                    <InputNumber style="width: 100%" v-model="updateTaskData.standardWeight" :min="0" :max="100"/>
                  </FormItem>
                </Col>
                <Col span="12" style="padding-left: 30px">
                  <FormItem prop="taskName" label="诊改名称">
                    <Input v-model="updateTaskData.taskName" placeholder/>
                  </FormItem>
                  <FormItem label="支撑文件">
                    <Button @click="openAddFile()" class="add-doc" ghost type="success" size="small"
                            icon="ios-add-circle-outline">
                      添加文件
                    </Button>
                    <div class="content">
                      <div class="docList" v-for="(item,index) in updateTaskData.targetFiles" :key="index">
                        <Icon class="listItem" type="ios-paper"/>
                        <div class="listContent">{{item.fileName}}</div>
                        <div class="deleteIcon1">
                          <Button @click="openPreviewModal(item)" class="textbtn" size="small" type="success" ghost>
                            预览
                          </Button>
                        </div>
                        <div class="deleteIcon">
                          <Icon @click="deleteFile(item,index)" type="md-close"/>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem label="当前值">
                    <Input v-model="updateTaskData.disValue" disabled placeholder/>
                  </FormItem>
                  <FormItem prop="targetValue" label="目标值">
                    <Row v-show="updateTaskData.dataType != '5'">
                      <Col :span="12">
                        <Input
                                v-model="updateTaskData.targetValue"
                                placeholder
                        />
                      </Col>
                      <Col :span="12">
                        <Input v-model="fulltargetValue" disabled placeholder/>
                      </Col>
                    </Row>
                    <Row v-show="updateTaskData.dataType == '5'">
                      <Select v-model="updateTaskData.targetValue" placeholder="请选择标准值">
                        <Option value="0">否</Option>
                        <Option value="1">是</Option>
                      </Select>
                    </Row>
                  </FormItem>
                  <FormItem prop="targetValue" label="标准值">
                    <Row v-show="updateTaskData.dataType != '5'">
                      <Col :span="12">
                        <Input
                                v-model="updateTaskData.standardValue"
                                placeholder
                        />
                      </Col>
                      <Col :span="12">
                        <Input v-model="fullstandardValue" disabled placeholder/>
                      </Col>
                    </Row>
                    <Row v-show="updateTaskData.dataType == '5'">
                      <Select v-model="updateTaskData.standardValue" placeholder="请选择标准值">
                        <Option value="0">否</Option>
                        <Option value="1">是</Option>
                      </Select>
                    </Row>
                  </FormItem>
                  <FormItem prop="warnValue" label="预警值">
                    <Row v-show="updateTaskData.dataType != '5'">
                      <Col :span="12">
                        <Input v-model="updateTaskData.warnValue" placeholder/>
                      </Col>
                      <Col :span="12">
                        <Input v-model="fullwarnValue" disabled placeholder/>
                      </Col>
                    </Row>
                    <Row v-show="updateTaskData.dataType == '5'">
                      <Select v-model="updateTaskData.warnValue" placeholder="请选择预警值">
                        <Option value="0">否</Option>
                        <Option value="1">是</Option>
                      </Select>
                    </Row>
                  </FormItem>
                  <FormItem label="目标权重">
                    <InputNumber style="width: 100%" v-model="updateTaskData.targetWeight" :min="0" :max="100"/>
                  </FormItem>
                </Col>
              </Row>
            </Form>

          </div>
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="warning" size="large" @click="subUpdateTask('updateTaskData')">确认修改</Button>
        </div>
      </Modal>
      <AddFileModal :addFileState="addFileState" ref="addFile" @closeMains="closeMains"></AddFileModal>
      <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
      <addAssignModal ref="addAssignModal" :assignmentData="assignmentData"
                      @closeAssignmentModal="closeAssignmentModal"></addAssignModal>
      <evdenceModal ref="evidence" :evidenceData="evidenceData" @closeEvdence="closeEvdence"></evdenceModal>
    </div>

  </div>
</template>
<script>
  import evdenceModal from "@/components/evdenceModal";
  import PieChart from "@/components/taskHall/pieChart";
  import RadarChart from "@/components/taskHall/radarChart";
  import writeModal from "./modal/writeModal";
  import backModal from "./modal/feedbackModal";
  import addAssignModal from "./modal/addAssignModal";
  import assignmentModal from "./modal/assignmentModal";
  import treatmentModal from "./modal/treatmentModal";
  import ReportedModal from "./modal/reportedModal";
  import {MyTask} from "./js/myTask";
  import AddFileModal from "@/views/diagnosis/modal/addFile";
  import df from "@/api/utils";
  import Preview from "@/components/preview";
  import {DoubleStandard} from "@/views/doubleStrand/doubleStandard";
  import store from '@/store';
  import {NeizhenUtil} from "@/util/datarouters";

  export default {
    components: {
      evdenceModal,
      addAssignModal,
      Preview,
      AddFileModal,
      PieChart,
      RadarChart,
      writeModal,
      backModal,
      assignmentModal,
      treatmentModal,
      ReportedModal
    },
    computed: {
      // this.$Modal.confirm({
      //   title: 'Title',
      //   content: '<p>Content of dialog</p><p>Content of dialog</p>',
      //   onOk: () => {
      //     this.$Message.info('Clicked ok');
      //   },
      //   onCancel: () => {
      //     this.$Message.info('Clicked cancel');
      //   }
      // });
      fullstandardValue: function () {
        //根据不同的数据类型展示不同类型的值
        if (this.updateTaskData.dataType == "0") {
          //整数
          return Math.round(this.updateTaskData.standardValue);
        } else if (this.updateTaskData.dataType == "1") {
          //小数
          return parseFloat(this.updateTaskData.standardValue).toFixed(4);
        } else if (this.updateTaskData.dataType == "2") {
          //百分比
          // console.log
          return this.updateTaskData.standardValue + "%";
        } else if (this.updateTaskData.dataType == "3") {
          //千分比
          return this.updateTaskData.standardValue + "‰";
        } else if (this.updateTaskData.dataType == "4") {
          //比例
          return this.updateTaskData.standardValue + " ：1";
        } else {
          return this.updateTaskData.standardValue;
        }
      },
      fulltargetValue: function () {
        //根据不同的数据类型展示不同类型的值
        if (this.updateTaskData.dataType == "0") {
          //整数
          return Math.round(this.updateTaskData.targetValue);
        } else if (this.updateTaskData.dataType == "1") {
          //小数
          return parseFloat(this.updateTaskData.targetValue).toFixed(4);
        } else if (this.updateTaskData.dataType == "2") {
          //百分比
          // console.log
          return this.updateTaskData.targetValue + "%";
        } else if (this.updateTaskData.dataType == "3") {
          //千分比
          return this.updateTaskData.targetValue + "‰";
        } else if (this.updateTaskData.dataType == "4") {
          //比例
          return this.updateTaskData.targetValue + " ：1";
        } else {
          return this.updateTaskData.targetValue;
        }
      },
      fullwarnValue: function () {
        //根据不同的数据类型展示不同类型的值
        if (this.updateTaskData.dataType == "0") {
          //整数
          return Math.round(this.updateTaskData.warnValue);
        } else if (this.updateTaskData.dataType == "1") {
          //小数
          return parseFloat(this.updateTaskData.warnValue).toFixed(4);
        } else if (this.updateTaskData.dataType == "2") {
          //百分比
          return this.updateTaskData.warnValue + "%";
        } else if (this.updateTaskData.dataType == "3") {
          //千分比
          // return (this.targetForm.warnValue/1000).toFixed(2) + "‰";
          return this.updateTaskData.warnValue + "‰";
        } else if (this.updateTaskData.dataType == "4") {
          //比例
          return this.updateTaskData.warnValue + " ：1";
        } else {
          return this.updateTaskData.warnValue;
        }
      }
    },

    data() {
      return {
        isTask:false,
        evidenceData:{
          data:"",
          state:false
        },
        WarnTotal: 0,
        defaultExpandIds: [],
        treeData: [
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [
              {
                id: 5,
                label: '二级 2-1'
              }, {
                id: 6,
                label: '二级 2-2'
              },
              {
                id: 71,
                label: '二级 2-1'
              }, {
                id: 82,
                label: '二级 2-2'
              },
              {
                id: 92,
                label: '二级 2-1'
              }, {
                id: 62,
                label: '二级 2-2'
              },
              {
                id: 711,
                label: '二级 2-1'
              }, {
                id: 812,
                label: '二级 2-2'
              },
              {
                id: 912,
                label: '二级 2-1'
              }, {
                id: 612,
                label: '二级 2-2'
              }
            ]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }
        ], // 维度树形
        screenTree: '', // 筛选维度树形
        taskHeight: '',
        previews: {
          name: "",
          //预览文件数据
          data: [],
          state: false
        },
        addFileState: {
          //添加文件传过去的数据
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
        operator: [
          {label: 21, value: ">"},
          {label: 22, value: "<"},
          {label: 23, value: "="},
          {label: 24, value: "≥"},
          {label: 25, value: "≤"}
          // {label: 26, value: "无"}
        ], //策略的运算符
        upTaskState: false,
        myTaskClass: null,
        report: {
          reportFlag: '0',
          reportLockFlag: '0',
          himId: null,
          startTime: null,
          endTime: null
        },
        reportTaskFlag: false,//
        treatmentData: {
          state: false, //诊改状态
          data: [] //需传的数据
        },
        assignmentData: {
          startTime: "",
          endTime: "",
          runState: null,
          parentId: null,
          taskId: null,
          dataId: null,
          hieId: null,
          identId: null,//
          state: false, //分派状态
          data: [] //需传的数据
        },
        feedBack: {
          state: false, //反馈状态
          taskId: 0,
          data: [] //需传的数据
        },
        taskWrite: {
          state: false, //填报窗口
          data: [] //需传的数据
        },
        taskWriteIndex: {
          state: false, //填报index ===0 窗口
          data: [] //需传的数据
        },
        TaskSummaryData: {},
        TaskMonitorData: {},
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 6, //每页条数
          showTotal: true
        },
        taskParam: {
          type: "0",
          keyword: "",
          hieId: "",
        },
        activeTab: "0",
        tableDatas: [],
        myTaskColumns: [

          {
            title: "诊改名称",
            key: "taskName",
            align: "center",
            tooltip: true,
            minWidth: 200,
            // tooltip: true,
          },
          {
            title: "部门",
            key: "deptName",
            align: "center",
            minWidth: 200,
            tooltip: true,
            // slot: "deptName"
          },
          {
            title: "目标值",
            key: "disTargetValue",
            align: "center",
            width: 100,
            slot: "disTargetValue"
          },
          {
            title: "标准值",
            key: "disStandardValue",
            align: "center",
            width: 100,
            slot: "disStandardValue"
          },
          {
            title: "预警值",
            key: "disWarnValue",
            align: "center",
            width: 100,
            slot: "disWarnValue"
          },
          {
            title: "当前值",
            key: "disValue",
            width: 100,
            align: "center",
            slot: "disValue"
          },
          {
            title: "开始时间",
            key: "startTime",
            width: 120,
            align: "center"
          },
          {
            title: "结束时间",
            align: "center",
            width: 120,
            key: "endTime"
          },
          {
            title: "操作",
            align: "center",
            width: 240,
            slot: "action"
          }
        ],
        doneTaskColumns: [
          {
            title: "诊改名称",
            key: "taskName",
            align: "center",
            minWidth: 200,
            tooltip: true,
            slot: "taskName"
          },
          {
            title: "目标值",
            key: "disTargetValue",
            align: "center",
            width: 100,
            slot: "disTargetValue"
          },
          {
            title: "标准值",
            key: "disStandardValue",
            align: "center",
            width: 100,
            slot: "disStandardValue"
          },
          {
            title: "预警值",
            key: "disWarnValue",
            align: "center",
            width: 100,
            slot: "disWarnValue"
          },
          {
            title: "当前值",
            key: "disValue",
            width: 100,
            align: "center",
            slot: "disValue"
          },
          {
            title: "开始时间",
            key: "startTime",
            width: 140,
            align: "center"
          },
          {
            title: "结束时间",
            align: "center",
            width: 140,
            key: "endTime"
          }
        ],
        updateTaskData: {},
        ruleValidate: {
          taskName: [
            {
              required: true,
              message: "名称不能为空",
              trigger: "blur"
            },
          ],
          targetStrategy: [
            {
              required: true,
              message: "名称不能为空",
              trigger: "blur"
            },
          ],
          targetValue: [
            {
              required: true,
              message: "值不能为空",
              trigger: "blur"
            },
          ], //
          warnStrategy: [
            {
              required: true,
              message: "名称不能为空",
              trigger: "blur"
            },
          ],
          warnValue: [
            {
              required: true,
              message: "值不能为空",
              trigger: "blur"
            },
          ],
          startTime: [
            {
              type: "date",
              required: true,
              message: "时间不能为空",
              trigger: "change"
            },
          ],
          endTime: [
            {
              type: "date",
              required: true,
              message: "时间不能为空",
              trigger: "change"
            },
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'title',
          isLeaf: 'leaf'
        }, // 维度树形
        task_my_menu_edit: false,
        task_my_menu_allocate: false,
      };
    },
    created() {
      this.task_my_menu_edit = this.$store.state.permissions['task_my_menu_edit']
      this.task_my_menu_allocate = this.$store.state.permissions['task_my_menu_allocate']
      this.doubleStandClass = new DoubleStandard(this, store);
      // this.getCurrentTaskSummary();
      // this.gettableData(); //获取表格数据===默认先显示我的任务
      this.myTaskClass = new MyTask(this, store);
    },
    mounted() {
      setTimeout(()=>{
        this.isTask=true
      },300);
      this.$nextTick(() => {
        this.taskHeight = 'height:' + (this.$refs.NineHeight.$el.offsetHeight - 71) + 'px'
      });
      this.gettableData(); //获取表格数据===默认先显示我的任务
      this.getCurrentTaskSummary();
    },
    watch: {
      screenTree(val) {
        this.$refs.tree.filter(val);
      },
      reportTaskFlag(val) {
        if (val == true) {
          this.addReportTaskData()
        }
      }
    },
    methods: {
      searchreport(){
        console.log(11)
      },
      // 维度筛选树
      filterNode(value, data) {
        if (!value) return true;
        return data.title.indexOf(value) !== -1;
      },
      // 维度树形选择
      handleNodeClick(data, node) {
        this.taskParam.hieId = data.id;
        this.gettableData()
      },
      // 维度树类型
      getDimType() {
        if (this.selectTreeData.hasChildren) {
          return 'hie';
        } else {
          return 'target';
        }
      },
      //tree
      searchHimTree(event) {
        if (event.keyCode == 13) {
          if (NeizhenUtil.isEmpty(this.screenTree)) {
            this.doubleStandClass.loadInitTree();
          } else {
            this.doubleStandClass.searchHieracyTree(this.screenTree);
          }
        }

      },
      //tree
      loadHierachyTreeData(node, resolve) {
        var searchNodeData = function (searchdata, id, resovle) {

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
          //return resolve([{ name: 'region' }]);
        }
        if (node.level >= 1) {

          if (this.asyncSearchData != null) {
            searchNodeData(this.asyncSearchData, node.data.id, resolve);
          } else {
            this.doubleStandClass.asyncLoadTree(node.data.id, resolve);
          }


          //return resolve([]);
        }


      },
      // 删除文件
      deleteFile(row, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除该文件？</p>',
          onOk: () => {
            this.updateTaskData.targetFiles.splice(index, 1);
          },
          onCancel: () => {

          }
        });
      },
      //关闭预览
      closePreview(val) {
        this.previews.state = val;
      },
      //打开预览
      openPreviewModal(row) {
        // console.log(row);
        //把选择的文件数据===>previews.data传给子组件
        this.previews.name = row.fileSuffix;
        this.previews.data = "/mngfile/chunkfile/previewStream/" + row.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      // 关闭添加文件框
      closeMains(val, sence, data) {
        this.addFileState.state = val;
        //TODO 需要优化,去重复
        let that = this;
        if (!val) {
          if (data.length > 0) {
            data.forEach(e => {
              that.updateTaskData.targetFiles.push(e);
            });
          }
        }
      },
      // 打开添加文件框
      openAddFile() {
        this.addFileState.data = []; //传是哪个场景下的id
        this.addFileState.state = true;
        this.$refs.addFile.loadData();
      },
      //确认修改任务信息
      subUpdateTask(name) {
        // console.log(this.updateTaskData);
        this.$refs[name].validate(valid => {
          if (valid) {
            //处理负责人
            let directorData = this.updateTaskData.directors;
            if (!(directorData && directorData.length > 0)) {
              this.$Message.error("请选择负责人");
              return;
            }
            let directors = [];
            directorData.forEach(o => {
              directors.push(o.directorId);
            });
            this.updateTaskData.directors = directors;
            //处理目标支撑文件
            let targetFileVos = this.updateTaskData.targetFiles;
            let targetFiles = [];
            if (targetFileVos && targetFileVos.length > 0) {
              targetFileVos.forEach(o => {
                targetFiles.push(o.fileId);
              });
            }
            this.updateTaskData.targetFiles = targetFiles;
            //处理数据
            if (this.updateTaskData.dataType == '2') {
              this.updateTaskData.targetValue = this.updateTaskData.targetValue / 100;
              this.updateTaskData.warnValue = this.updateTaskData.warnValue / 100;
              this.updateTaskData.standardValue = this.updateTaskData.standardValue / 100;
            } else if (this.updateTaskData.dataType == '3') {
              this.updateTaskData.targetValue = this.updateTaskData.targetValue / 1000;
              this.updateTaskData.warnValue = this.updateTaskData.warnValue / 1000;
              this.updateTaskData.standardValue = this.updateTaskData.standardValue / 1000;
            } else {

            }
            let param = {
              directors: this.updateTaskData.directors,
              targetFiles: this.updateTaskData.targetFiles,
              dataId: this.updateTaskData.dataId,
              dataName: this.updateTaskData.dataName,
              dataType: this.updateTaskData.dataType,
              deptId: this.updateTaskData.deptId,
              deptName: this.updateTaskData.deptName,
              taskId: this.updateTaskData.taskId,
              taskName: this.updateTaskData.taskName,
              targetStrategy: this.updateTaskData.targetStrategy,
              targetValue: this.updateTaskData.targetValue, //
              standardStrategy: this.updateTaskData.standardStrategy,
              standardValue: this.updateTaskData.standardValue, //
              standardWeight: this.updateTaskData.standardWeight, //
              targetWeight: this.updateTaskData.targetWeight, //
              warnStrategy: this.updateTaskData.warnStrategy,
              warnValue: this.updateTaskData.warnValue,
              startTime: df.dateFormat(this.updateTaskData.startTime).substr(0, 10),
              endTime: df.dateFormat(this.updateTaskData.endTime).substr(0, 10)
            };
            // console.log(param.startTime);
            this.$Put("/admin/task/update", param, res => {
              if (res.code == 0) {
                this.$Message.success("修改成功");
                this.upTaskState = false;
                this.updateTaskData = {};
                this.gettableData(); //获取表格数据===默认先显示我的任务
                this.getCurrentTaskSummary();
              } else {
                this.$Message.error(res.msg)
              }
            })
          }
        })

      },
      //修改默认时间
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
      //修改任务
      updateTask(row, index) {
        console.log(row)
        this.upTaskState = true;
        this.$Get("/admin/task/" + row.taskId, {}, res => {
          this.updateTaskData = res.data;
          this.updateTaskData.dataType = (this.updateTaskData.dataType).toString();
          if (this.updateTaskData.dataType == 2) {
            this.updateTaskData.warnValue = this.updateTaskData.warnValue * 100;
            this.updateTaskData.targetValue = this.updateTaskData.targetValue * 100;
            this.updateTaskData.standardValue = this.updateTaskData.standardValue * 100;
          }
          if (this.updateTaskData.dataType == 3) {
            this.updateTaskData.warnValue = this.updateTaskData.warnValue * 1000;
            this.updateTaskData.targetValue = this.updateTaskData.targetValue * 1000;
            this.updateTaskData.standardValue = this.updateTaskData.standardValue * 1000;
          }
        });
      },
      addReportTaskData() {
        let reportTask = {
          taskName: "填写诊断报告",
          startTime: this.report.startTime,
          endTime: this.report.endTime,
          taskId: -1,
          targetValue: null,
          targetStrategy: null,
          warnValue: null,
          warnStrategy: null,
          disValue: null
        };
        // 建职要求干掉
          console.log(11,this.tableData)
          // if()
        // this.tableData.splice(0, 0, reportTask)
      },
      //关闭诊改
      closeSpiralModal(obj) {
        this.treatmentData.state = obj.state;
        if (obj.reload) {
          //重新请求任务数据
          this.gettableData();
        }
      },
      //打开诊改
      openSpiralModal(row, index) {
        if (row.deptId < 0) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>已经是最下层诊改分派，不能再往下分派</p>',
            onOk: () => {
            },
            onCancel: () => {
            }
          });
        } else {
          this.assignmentData.startTime = row.startTime;
          this.assignmentData.endTime = row.endTime;
          this.assignmentData.runState = row.runState;
          this.assignmentData.parentId = row.taskId;
          this.assignmentData.identId = row.identId;
          this.assignmentData.hieId = row.hieId;
          this.assignmentData.dataId = row.dataId;
          this.assignmentData.taskId = row.taskId;
          this.assignmentData.deptLevel = row.deptLevel;
          //this.assignmentData.identId = 1//id传过去
          let that = this;
          that.$Get("/admin/task/spiral/" + row.taskId, {}, function (data) {
            that.assignmentData.state = true;
            that.assignmentData.data = data.data;
            that.$refs.addAssignModal.getAllocateTasks("2");
          });
        }

      },
      //关闭分派
      closeAssignmentModal(obj) {
        this.assignmentData.state = obj.state;
        if (obj.reload) {
          //重新请求任务数据
        }
        this.gettableData(); //获取表格数据===默认先显示我的任务
        this.getCurrentTaskSummary();
      },
      //打开分派2
      openAssignmentDetail(row, index) {
        if (row.deptId < 0) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>已经是最下层诊改分派，不能再往下分派</p>',
            onOk: () => {
            },
            onCancel: () => {
            }
          });
        } else {
          this.assignmentData.startTime = row.startTime;
          this.assignmentData.endTime = row.endTime;
          this.assignmentData.runState = row.runState;
          this.assignmentData.parentId = row.taskId;
          this.assignmentData.identId = row.identId;
          this.assignmentData.hieId = row.hieId;
          this.assignmentData.dataId = row.dataId;
          this.assignmentData.taskId = row.taskId;
          this.assignmentData.deptLevel = row.deptLevel;
          let that = this;
          that.$Get("/admin/task/" + row.taskId, {}, function (data) {
            that.assignmentData.state = true;
            that.assignmentData.data = data.data;
            that.$refs.addAssignModal.getAllocateTasks("1");
          });
        }
      },
      //打开分派
      openAssignment(row, index) {
        this.assignmentData.identId = row.identId;
        this.assignmentData.hieId = row.hieId;
        this.assignmentData.dataId = row.dataId;
        //this.assignmentData.identId = 1//id传过去
        let that = this;
        that.$Get("/admin/task/" + row.taskId, {}, function (data) {
          that.assignmentData.state = true;
          that.assignmentData.data = data.data;
          that.$refs.assignModal.getAllocateTasks();
        });
      },
      // 关闭反馈
      closeTaskFeedback(val) {
        // console.log(555,val)
        this.feedBack.state = val;
      },
      // 打开反馈
      openFeedBack(row, index) {
        let that = this;
        that.$Get("/admin/task/director/" + row.parentId, {}, function (data) {
          that.feedBack.state = true;
          that.feedBack.data = data.data;
          that.feedBack.taskId = row.taskId;
          that.$refs.taskFeedbackModal.getTaskFeedbackForm();
        });
      },
      // 关闭任务填报
      closeTaskWrite(obj) {
        this.taskWrite.state = obj.state;
        if (obj.reload) {
          //重新请求任务数据
          this.gettableData();
        }
      },
      closeEvdence(){
        this.evidenceData.state=false;
      },
      //打开佐证文件
      openEvidenceFile(row, index){
        this.evidenceData.data=row.taskId;
        this.evidenceData.state=true;
        this.$refs.evidence.getData()
      },
      // 打开任务填报
      openTaskWrite(row, index) {
        // console.log(row)
        let that = this
        that.$Get("/admin/task/" + row.taskId, {}, function (data) {
          // console.log(data)
          that.taskWrite.state = true;
          that.taskWrite.data = data.data;
          that.$refs.taskwrite.acYear();
        });
      },
      closeWriteIndex(val) {
        this.taskWriteIndex.state = val;

      },
      openTaskLastReport(row) {
        // console.log(row)
        this.$refs.repotModal.loadData();
        this.taskWriteIndex.state = true;
      },
      //获取表格数据
      gettableData() {
        let that = this;
        that.$Get(
          "/admin/task/page",
          Object.assign(that.page, that.taskParam),
          function (data) {
            that.tableDatas = data.data.records;
            // console.log( that.tableDatas)
            that.page.total = data.data.total;
            if (data.data.records.length > 0 && that.taskParam.type === '0') {
              if (that.reportTaskFlag == false) {
                let himId = data.data.records[0].hieId;
                that.myTaskClass.getHimReportFlag(himId)
              } else {
                that.addReportTaskData()
              }
            }

          }
        );
      },
      // 分页查看
      changePage(val) {
        this.page.current = val;
        this.gettableData();
      },
      //搜索
      searchData() {
        this.page.current = 1;
        this.gettableData();
      },

      // 点击table====tag
      handleClick(tab, event) {
        this.page.current = 1;
        this.taskParam.type = this.activeTab;
        this.gettableData();
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
      //获取任务检查和个人任务总数数据
      getCurrentTaskSummary() {
        let that = this;
        that.$Get("/admin/task/summary/current", {}, function (data) {
          // console.info(data.data);
          that.getTaskMonitorData(data.data); //   获取echart任务监控
          that.getTaskEducation(data.data); //获取echart任务数据
        });
      },
      //   获取任务监控
      getTaskMonitorData(data) {
        // console.info(data);
        this.WarnTotal = data.warn,
          this.TaskMonitorData = {
            id: "taskMonitorss",
            legendData: ["诊改检查"],
            seriesData: [
              {
                value: [
                  data.makeIt,
                  data.overtime,
                  data.spiral,
                  data.warn,

                ],
                name: "诊改检查"
              }
            ],
            indicatorData: [
              {text: "达标", max: data.total},
              {text: "逾期", max: data.total},
              {text: "诊改", max: data.total},
              {text: "报警", max: data.total},

            ]
          };
        // this.$refs.taskMonitors1.radarChart();
      },
      //   获取任务数据
      getTaskEducation(data) {
        this.TaskSummaryData = {
          id: "tasksummaryss",
          totalData: [
            {value: data.total, name: data.total + " \n诊改总数"}
          ],
          legendData: ["诊改总数", "未开始", "已结束", "进行中"],
          seriesData: [
            {value: data.notStart, name: "未开始"},
            {value: data.ended, name: "已结束"},
            {value: data.ongoing, name: "进行中"}
          ]
        };
        // this.$refs.tasksummarys1.pieChart();
      }
    }
  };
</script>

<style lang='less' scoped>
  @import url("./index.less");
</style>
