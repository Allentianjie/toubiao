<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox"
           class-name="vertical-center-modal" v-model="taskData.state" width="80%"
           :mask-closable="false" @on-cancel="closeTaskModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>指标任务下钻</span>
      </p>
      <div class="fileManage">
        <div class="selectDiv">
          <span>选择体系：</span>
          <el-select size="small" v-model="value" placeholder="请选择" @change="changeHierary">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="lineA"></div>

        <!--部门表格-->
        <div v-show="taskState">
          <div class="tableHeight2">
            <div class="M_search">
              <Row>
                <Col :span="8">
                  任务名称：
                  <Input
                    clearable
                    v-model="searchTaskForm.taskName"
                    placeholder="请输入指标名称"
                    style="width: 60%"
                    @on-change="taskClear"
                  />
                </Col>
                <Col :span="8">
                  组织机构：
                  <Input
                    clearable
                    v-model="searchTaskForm.deptName"
                    @on-focus="openDept('task')"
                    @on-change="taskClear('dept',searchTaskForm.deptName)" placeholder="请选择组织机构"
                    style="width: 60%"
                  />
                </Col>
                <Col :span="8">
                  <span style="letter-spacing: 4px">负责人：</span>
                  <Input
                    clearable
                    v-model="searchTaskForm.userName"
                    placeholder="请输入负责人"
                    style="width: 60%"
                    @on-change="taskClear('person',searchTaskForm.userName)"
                  />
                </Col>

              </Row>
              <Row style="margin-top: 10px;">
                <!--暂关闭任务状态搜索，待向谷哥讨论展现方式-->

                <!-- <Col :span="7">
                   任务状态：
                   <Select v-model="searchTaskForm.dataState" @on-change="taskClear"
                           clearable
                           placeholder="请选择指标状态" style="width:60%">
                     <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                   </Select>
                 </Col>-->
                <Col :span="8">
                  运行状态：
                  <Select v-model="searchTaskForm.runState" placeholder="请选择运行状态"
                          clearable @on-change="taskClear" style="width:60%">
                    <Option value="0">未开始</Option>
                    <Option value="1">运行中</Option>
                    <Option value="2">已结束</Option>
                  </Select>
                </Col>
                <Col :span="2">
                  <Button
                    @click="getTaskTableData"
                    type="primary"
                    icon="ios-search"
                  >搜 索
                  </Button>
                </Col>
                <Col :span="2">
                  <Button icon="ios-trash" @click="emptyTaskTableBtn">清 空</Button>
                </Col>
                <Col :span="2" v-if="openState == 1&&!showBtn">
                  <Button type="primary" ghost @click="returnSuperior2">返回上级</Button>
                </Col>
                <Col :span="2" v-if="showBtn">
                  <Button type="primary" ghost @click="returnSuperior">返回上级</Button>
                </Col>

              </Row>
            </div>
            <el-table
              :data="taskTableData"
              stripe
              :header-cell-style="backHeader"
              :cell-style="paddingMy"
            >
            <!--  <el-table-column
              width="80"
              align="center"
              prop="pointName"
              show-overflow-tooltip
              >
              <template slot="header" slot-scope="scope">
              <span><Icon type="ios-eye-outline" style="font-size:20px"/></span>
              </template>
              <template slot-scope="scope">
              <p @click="openTaskDetails(scope.row)" style="cursor: pointer;color:#2d8cf0">
              &lt;!&ndash;<Icon type="ios-eye-outline" />&ndash;&gt; 查看
              </p>
              </template>
              </el-table-column>-->
              <el-table-column width="150" show-overflow-tooltip align="center" prop="taskName" label="任务">
                <template slot-scope="scope">
                  <span @click="clickTaskUp(scope.row)" style="color:#2d8cf0;cursor: pointer">
                    {{scope.row.taskName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="dept"
                label="部门"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span @click="clickTaskName('dept',scope.row)" style="color:#2d8cf0;cursor: pointer">
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
                width="120"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="endTime"
                label="结束时间"
                width="120"
              ></el-table-column>
              <!--<el-table-column align="center" label="所属指标" min-width="150" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
              <!--<span @click="clickTaskName('indexName',scope.row)"-->
              <!--style="color:#2d8cf0;cursor: pointer">-->
              <!--{{scope.row.targetName}}-->
              <!--</span>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column align="center" label="负责人" show-overflow-tooltip min-width="140">
                <template slot-scope="scope">
                  <!--change2directors-->
                  <span
                    @click="clickTaskName('person', item)"
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
                       @click="clickTaskName('runState',scope.row)" style="color:#ff7f13">
                    <p>未开始</p>
                  </div>
                  <div v-show="scope.row.runState=='1'" class="cellHtml"
                       @click="clickTaskName('runState',scope.row)" style="color:#4ac056">
                    <p>运行中</p>
                  </div>
                  <div v-show="scope.row.runState=='2'" class="cellHtml"
                       @click="clickTaskName('runState',scope.row)" style="color:#f04409">
                    <p>已结束</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="任务状态"
                min-width="100"
              >
                <template slot-scope="scope">
                  <!--暂时关闭点击事件-->
                  <!-- <div class="cellHtml"  @click="clickTaskName('index',scope.row)"
                    v-html="scope.row.cellHtml"></div>-->
                  <div v-html="scope.row.cellHtml"></div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="100">
                <template slot-scope="scope">
                  <div style="color:#2d8cf0;padding-right: 5px">
                    <!--<p @click="openTaskDetails(scope.row)" style="cursor: pointer;margin-right: 20px">
                      <Icon type="ios-eye-outline" /> 查看
                    </p>-->
                    <!--<p @click="showNorm(scope.row)" style="cursor: pointer;">-->
                    <!--<Icon type="ios-eye-outline"/>-->
                    <!--查看指标-->
                    <!--</p>-->
                    <p @click="showTrack(scope.row,'taskId')" style="cursor: pointer;margin-top: 5px">
                      <Icon type="ios-navigate-outline"/>
                      诊改轨迹
                    </p>
                    <p style="color:#2d8cf0;cursor: pointer;;margin-top: 5px" @click="openEvidenceFile(scope.row)" v-if="scope.row.taskState === '1' && scope.row.taskId !== -1 ">
                      <Icon type="ios-eye-outline"/>佐证材料</p>

                  </div>
                  <!--@click="showNorm(scope.row)"-->
                  <!--searchTaskForm.targetName-->
                </template>
              </el-table-column>


            </el-table>
          </div>
          <div class="pageDiv">
            <Page
              :total="taskPage.total"
              :showTotal="taskPage.showTotal"
              :current="taskPage.current"
              :page-size="taskPage.size"
              @on-change="changetaskPage"
            ></Page>
          </div>
        </div>
        <div v-show="!taskState">
          <div class="tableHeight2">
            <div class="M_search">
              <Row>
                <Col :span="8">
                  指标名称：
                  <Input
                    clearable
                    v-model="searchIndexForm.name"
                    placeholder="请输入指标名称"
                    style="width: 60%"
                    @on-change="firstsClear"
                  />
                </Col>
                <Col :span="8">
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
                <Col :span="8">
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
              </Row>
              <Row style="margin-top: 10px;">
                <!--暂时关闭搜索-->
                <!--<Col :span="8">
                  指标状态：
                  <Select v-model="searchIndexForm.dataState" @on-change="firstsClear"
                          clearable
                          placeholder="请选择指标状态" style="width:60%">
                    <Option v-for="item in indexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>-->
                <Col :span="8">
                  运行状态：
                  <Select v-model="searchIndexForm.runState" placeholder="请选择运行状态"
                          clearable @on-change="firstsClear" style="width:60%">
                    <Option value="0">未开始</Option>
                    <Option value="1">运行中</Option>
                    <Option value="2">已结束</Option>
                  </Select>
                </Col>
                <Col :span="2">
                  <Button
                    @click="getIndexTableData"
                    type="primary"
                    icon="ios-search"
                  >搜 索
                  </Button>
                </Col>
                <Col :span="2">
                  <Button icon="ios-trash" @click="emptyIndexTableBtn">清 空</Button>
                </Col>
              </Row>
            </div>
            <el-table
              :data="indexTableData"
              stripe
              :header-cell-style="backHeader"
              :cell-style="paddingMy"
            >
              <el-table-column
                min-width="150"
                align="center"
                prop="pointName"
                label="指标"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span @click="clickRelevance(scope.row)"  style="color:#2d8cf0;cursor: pointer">
                    {{scope.row.targetName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="deptName"
                label="部门"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                    <span @click="clickName('dept',scope.row)" style="color:#2d8cf0;cursor: pointer">
                      {{scope.row.deptName}}
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
            <!--  <el-table-column
                align="center"
                prop="taskCount"
                label="关联任务"
                min-width="90"
              &gt;
                <template slot-scope="scope">
                  <div @click="clickRelevance(scope.row)" style="cursor: pointer;color:#2d8cf0 ">
                    <p>{{scope.row.taskCount}}</p>
                  </div>
                </template>
              </el-table-column>-->
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
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                align="center"
                prop="endTime"
                label="结束时间"
                min-width="120"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column align="center" label="负责人" show-overflow-tooltip min-width="140">
                <template slot-scope="scope">
                  <span
                    @click="clickName('person',item)"
                    v-for="(item,index) in scope.row.directors"
                    :key="index"
                    style="color:#2d8cf0;cursor: pointer;padding-right:5px"
                    type="info">
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
                       @click="clickName('runState',scope.row)" style="color:#ff7f13;cursor: pointer;">
                    <p>未开始</p>
                  </div>
                  <div v-show="scope.row.runState=='1'" class="cellHtml"
                       @click="clickName('runState',scope.row)" style="color:#4ac056;cursor: pointer;">
                    <p>运行中</p>
                  </div>
                  <div v-show="scope.row.runState=='2'" class="cellHtml"
                       @click="clickName('runState',scope.row)" style="color:#f04409;cursor: pointer;">
                    <p>已结束</p>
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
                    <!--<p @click="showNorm(scope.row)" style="cursor: pointer;">
                      <Icon type="ios-eye-outline" />查看
                    </p>-->
                    <p @click="showTrack(scope.row,'targetId')" style="cursor: pointer;margin-top: 5px">
                      <Icon type="ios-navigate-outline"/>
                      诊改轨迹
                    </p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pageDiv">
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
      <!--部门树形弹框-->
      <deptModal ref="changedept" :deptState="deptState" @closeDeptModal="closeDeptModal"></deptModal>
      <TrackModal :trackState="trackState" @closeTrackModal="closeTrackModal"></TrackModal>
      <div slot="footer" style="text-align: center">
        <Button type="warning" size="large" @click="closeTaskModal">关闭</Button>
        <!-- <Button type="primary" size="large" @click="closeModal">关闭</Button> -->
      </div>
      <evdenceModal ref="evidence" :evidenceData="evidenceData" @closeEvdence="closeEvdence"></evdenceModal>

    </Modal>
  </div>
</template>

<script>
  import deptModal from "@/components/changeDept";
  import TrackModal from "./TrackModal.vue";
  import df from "@/api/utils";
  import store from "@/store";
  import evdenceModal from "@/components/evdenceModal";
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
      taskData: {
        type: Object,
        required: true
      }
    },
    components: {deptModal, TrackModal,evdenceModal},
    watch: {

      "targetForm.summaryMode"(newValue, oldValue) {

      },
      "targetForm.dataName"(newValue, oldValue) {

      }

    },
    data() {
      return {
        evidenceData:{
          data:"",
          state:false
        },
        openState: "",
        taskState: false,
        trackState: {
          state: false,
          dataMessage: {},// 诊改信息 top
          amend: {},// 修改记录 up
          period: {},  // 周期记录 centre
          relevance: {}, // 关联指标 bottom
          id: null,
          type: '',
        },
        hieDatas: [],
        tableHeight: null,
        parentId: 0,
        depttab: "", //判断是从哪一个tab点击的组织
        showBtn: false,
        superior: [],
        deptState: {
          //机构弹框
          state: false,
          data: []
        },
        indexPage: {
          total: 20, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        taskPage: {
          total: 10, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
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
        indexTableData: [],
        taskTableData: [],
        paddingMy: {
          'padding': '5px 0'
        },
        backHeader: {
          'background': '#f8f8f9'
        },
        level: {
          name: '学校',
          number: '123',
        },
        options: [],
        value: '',
        value2: "",
      }
    },
    mounted() {
      // this.getTaskTableData();
      this.searchIndexForm.hieId = "";
      this.searchIndexForm.name = "";
      this.searchIndexForm.deptName = "";
      this.searchIndexForm.deptId = "";
      this.searchIndexForm.userName = "";
    },
    computed: {},
    filters: {},
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
      // 点击诊改指标-关联任务 -跳转到诊改任务
      clickRelevance(row) {
        // this.activeName = 'second'
        this.taskState = true;
        this.searchTaskForm.targetName = row.targetName;
        this.getTaskTableData()
      },
      // 分页指标查看
      changeindexPage(val) {
        this.indexPage.current = val;
        this.getIndexTableData();
        //这里请求表格接口
      },
      // 诊改指标名称筛选
      clickName(type, row) {
        if (type === 'name') {
          this.searchIndexForm.name = row.targetName
        } else if (type === 'dept') {
          this.searchIndexForm.deptId = row.deptId;
          this.searchIndexForm.deptName = row.deptName;
        } else if (type === 'person') {
          this.searchIndexForm.userName = row.directorName;
        } else if (type === 'index') {
          this.searchIndexForm.dataState = row.dataState
        } else if (type === 'runState') {
          this.searchIndexForm.runState = row.runState
        }
        this.getIndexTableData()
      },
      //获取诊改指标
      getIndexTableData() {
        this.indexTableData = []
        let param = {
          dataState: this.searchIndexForm.dataState,
          runState: this.searchIndexForm.runState,
          deptId: this.searchIndexForm.deptId,
          hieId: this.searchIndexForm.hieId,
          targetName: this.searchIndexForm.name,
          userName: this.searchIndexForm.userName,
          size: this.indexPage.size,
          current: this.indexPage.current,
          total: this.indexPage.total,

        };
        this.$Get("/admin/target/current/page", param, res => {
          // console.log(res);
          this.indexPage.current = res.data.current;
          this.indexPage.total = res.data.total;
          this.indexTableData = res.data.records;
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
                } else if (item.targetState == '0') {
                  item.dataState = '2'
                  item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                } else if (item.targetState == '1') {
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
      //   关闭诊改轨迹弹框
      closeTrackModal(val) {
        this.trackState.state = val;
      },
      // 点击诊改轨迹弹框
      showTrack(row, type) {
        this.trackState.state = true;
        if (type === 'targetId') {
          this.trackState.id = row.targetId;
          this.trackState.type = type
        } else {
          this.trackState.id = row.taskId;
          this.trackState.type = type
        }
      },
      // 点击任务名称穿clickTaskUp
      clickTaskUp(row) {
        this.parentId = row.taskId
        this.superior.push(this.param2)
        this.showBtn = true
        this.getTaskTableData();
      },
      // 任务点击名称筛选
      clickTaskName(type, row) {
        // if(type === 'name'){
        //   this.searchTaskForm.taskName = row.taskName
        // }else
        if (type === 'dept') {
          this.searchTaskForm.deptId = row.deptId;
          this.searchTaskForm.deptName = row.deptName;
        } else if (type === 'person') {
          this.searchTaskForm.userId = row.directorId;
          this.searchTaskForm.userName = row.directorName;
        } else if (type === 'indexName') {
          this.searchTaskForm.targetName = row.targetName
        } else if (type === 'runState') {
          this.searchTaskForm.runState = row.runState
        } else if (type === 'index') {
          this.searchTaskForm.dataState = row.dataState
        }
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

      loaddata(val,state) {
        this.openState = val;
        this.searchIndexForm.dataState = state
        console.log('911------', this.searchIndexForm.dataState)

        var that = this;
        this.$Get("/admin/hierarchy/getHierarchys", null, function (data) {
          // console.log("pdata", data);
          if (data.code == '0') {
            if (data.data.length > 0) {
              var opts = [];
              data.data.forEach(e => {
                var option = {
                  value: e.id,
                  label: e.hieName
                };
                opts.push(option);
              });
              that.options = opts;
              that.value = that.options[0].value;
              // console.log(that.options);
              that.searchIndexForm.hieId = that.options[0].value;
              that.searchIndexForm.hieName = that.options[0].label;
              that.getIndexTableData();
              that.getTaskTableData();
              if (that.openState == 1) {
                that.taskState = false
              } else {
                that.taskState = true
              }
            }
          }

        });

      },
      //选择体系
      changeHierary(val) {
        this.searchIndexForm.hieId = val;
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value == val) {
            this.searchIndexForm.hieName = this.options[i].label;
          }
        }
        this.getTaskTableData()
        // var that = this;
        // this.$Get("/admin/hierarchy/getHierarchys", {hieId: val}, function (data) {
        //   if (data.data.length > 0) {
        //     console.log(data.data)
        //   }
        //
        // });
      },
      changeHierary2(val) {
        this.parentId = val;
        this.value2 = val;
        for (let i = 0; i < this.hieDatas.length; i++) {
          if (this.hieDatas[i].hieId == val) {
            this.searchIndexForm.hieName = this.hieDatas[i].hieName;
          }
        }
        this.getTaskTableData()
      },
      //关闭添加文件
      closeTaskModal() {
        this.indexPage.current = 1,
        this.$emit("closeTaskModal", {state: false});
        this.taskData.state = false;
        this.searchIndexForm = {
          name: "",
          deptName: "",
          deptId: "",
          hieId: "",
          hieName: "",
          userName: "",
          dataState: '',
          runState: ''
        }
        this.searchTaskForm = {
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
        }
      },
      // 分页任务查看
      changetaskPage(val) {
        this.taskPage.current = val;
        this.getTaskTableData();
        //这里请求表格接口
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
          dataState: "",
          runState: ""
        };
        this.getTaskTableData();
      },
      // 诊改任务 ---输入框--清除按钮
      taskClear(type, name) {
        if (type === 'dept' && name === '') {
          this.searchTaskForm.deptId = '';
        } else if (type === 'person' && name === '') {
          this.searchTaskForm.userId = '';
        } else if (type === 'clearState') {
          this.searchTaskForm.dataState = ''
        }
        this.getTaskTableData();
      },
      // 返回指标
      returnSuperior2() {
        this.taskState = false
      },
      // 返回上级
      returnSuperior() {
        let lengthA = this.superior.length
        let param = this.superior[lengthA - 1]
        this.superior.splice(lengthA - 1, 1)
        this.superior.length > 0 ? this.showBtn = true : this.showBtn = false
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
          this.taskPage.size = param.size,
          this.taskPage.current = param.current,
          this.taskPage.total = param.total
        this.getTaskTableData()
      },
      //打开选择机构
      openDept(name) {
        this.depttab = name;
        this.deptState.state = true;
        this.deptState.data = {type: 0};
        this.$refs.changedept.getDeptTree();
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
          keyWord: this.searchTaskForm.keyWord,
          size: this.taskPage.size,
          current: this.taskPage.current,
          total: this.taskPage.total
        };
        this.$Get("/admin/task/current/page", this.param2, res => {
          // console.log(res)
          this.taskPage.current = res.data.current;
          this.taskPage.total = res.data.total;
          this.taskTableData = res.data.records;
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
    }
  };
</script>

<style lang="less" scoped>
  @import url("../../diagnosis/modal/normModal.less");
  @import url("./setupModal.less");

  #flowPage {
    min-height: 75%;
    max-height: 80%;
  }

  .tableHeight2 {
    min-height: 75%;
    max-height: 80%;
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
