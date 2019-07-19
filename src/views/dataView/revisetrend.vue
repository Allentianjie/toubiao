<template>
  <div id="taskSummaryPage">
    <div class="taskSummaryItemTop">
      <el-row>
        <el-col class="topLeft" :span="4" >
          <div class="titleL s-ranking">指标执行情况</div>
          <div  class="topLeftDiv">
            <div  class="top3">
                <div
                  class="topCard"
                  v-for="(item,index) in alltotalData"
                  :key="index">
                  <div class="cardDiv" @click="getDetail(item)">
                    <div class="icon">
                      <div class="circle">
                        <!--<i :class="item.icon"></i>-->
                      </div>
                    </div>
                    <div class="contentotal">
                      <p>{{item.name}}</p>
                      <!--light-->
                      <el-tooltip class="item" effect="dark" content="点击数字查看指标" placement="top">
                      <div class="ValSpan">
                        <!--<span>{{item.value ? item.value : '0'}}</span>-->
                        <!--<span>个</span>-->
                        <span @click="openTarget(item)">{{item.value ? item.value : '0'}}</span>
                        <span @click="openTarget(item)">个</span>
                      </div>
                      </el-tooltip>
                    </div>
                  </div>
                  <!--<div class="detailsSpan" @click="openTarget">-->
                  <!--<span>更多</span>-->
                  <!--</div>-->
                </div>
            </div>
          </div>
        </el-col>
        <el-col class="topCenter" :span="16" style="height: 100%;">
          <div class="topTable">
            <div class="tatleL">
              <img src="../../assets/images/dataView/biaoti.png" alt="">
            </div>
            <div class="tableHeight">

              <!--:data="indexTableDataCenter"-->
              <el-table
                :data="indexTableData"
                stripe
                height="100%"
                :cell-style = "paddingMy"
                :header-cell-style="backHeader"
                style="min-width: 100%;min-height: 100%"
              >
                <el-table-column
                  align="center"
                  prop="targetName"
                  label="指标名称"
                  min-width="210"
                >
                  <template slot-scope="scope">
                    <span @click="showNorm(scope.row,'name')" style="color:#2d8cf0;cursor: pointer">
                      {{scope.row.targetName}}
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
                  prop="runState"
                  label="运行状态"
                  min-width="100"
                >
                  <template slot-scope="scope">
                    <div v-show="scope.row.runState=='0'" class="cellHtml"
                         @click="clickTaskName('runState',scope.row)" style="color:#ff7f13">
                      <!--<p>未开始</p>-->
                      <el-tooltip class="item" effect="light" content="未开始" placement="top-start">
                        <i style="color: #999999;" class="iconfont iconweikaishi_"></i>
                      </el-tooltip>
                    </div>
                    <div v-show="scope.row.runState=='1'" class="cellHtml" style="color:#4ac056">
                      <!--<p>运行中</p>-->
                      <el-tooltip class="item" effect="light" content="运行中" placement="top-start">
                        <i style="color: #32c763;" class="iconfont iconjinhangzhong"></i>
                      </el-tooltip>
                    </div>
                    <div v-show="scope.row.runState=='2'" class="cellHtml" style="color:#f04409">
                      <!--<p>已结束</p>-->
                      <el-tooltip class="item" effect="light" content="已结束" placement="top-start">
                        <i style="color: #f68a4f;" class="iconfont iconyiwancheng"></i>
                      </el-tooltip>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>


        </el-col>
        <el-col class="topBottom" :span="4" style="height: 100%;">
          <div class="topRigth">
            <divModal></divModal>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="taskSummaryItem">
      <el-row>
        <el-col :span="9"  class="left" style="height: 100%;">
          <div class="summaryTop">
            <div class="topLeft">
              <el-row  style="height: 100%;">
                <el-col :span="2" class="LeftTatle ">
                  <div class="divLeft s-ranking">
                    基本情况
                  </div>
                </el-col>
                <el-col :span="22">
                  <div class="top2">
                    <div tag="div" class="topCard" @click="openetails"  v-for="(item,index) in insystemData" v-if="index < 4" :key="index">
                      <div class="contentotal">
                        <p class="valueT">{{item.value}}</p>
                        <p class="tatle">{{item.name}}</p>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>


            </div>
          </div>
        </el-col>
        <el-col :span="7"  class="rigth"  style="height: 100%;">
          <div>
            <div class="h3Header s-ranking">
              <p>诊改层面</p>
            </div>
            <NormPieChart :pieChartData="TaskSummaryData"></NormPieChart>
          </div>
        </el-col>
        <el-col :span="8"  class="rigth" style="height: 100%;">
          <div>
            <div class="h3Header s-ranking">
              <p>指标分布</p>
            </div>
            <NormBarChart ref="taskMonitor" :TaskMonitorData="TaskMonitorData"></NormBarChart>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--表格隐藏-->
    <!--<div v-show="firstActive" class="taskSummaryItem" style="height:auto!important">
      <div class="summaryEchart">
        <div class="taskSummaryBreadcrumb">
          <el-button
            @click="openDept"
            class="screen"
            type="primary"
            icon="el-icon-search"
          >组织机构筛选
          </el-button>
          <el-select
            @clear="clearSearchForm"
            @change="changeSearchForm"
            class="screen2"
            v-model="searchForm.hieId"
            clearable
            placeholder="体系层面筛选"
          >
            <el-option
              v-show="item.enableFlag=='0'"
              v-for="item in options"
              :key="item.id"
              :label="item.hieName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <i
              class="el-icon-location"
              style="float: left;margin-right: 5px;color:#6195f3"
            ></i>
            <el-breadcrumb-item>当前组织机构维度：{{changeDeptData.name}}</el-breadcrumb-item>
            <Icon class="empty" @click="emptyBtn1" type="md-refresh"/>
          </el-breadcrumb>
        </div>
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px;min-height:450px"
        >
          <el-table-column
            align="center"
            prop="setup"
            label="体系"
            width="200"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div
                style="color:#2d8cf0;cursor: pointer"
                @click="openDetails(scope.row,scope.row.hieId)"
              >
                <p>{{scope.row.setup}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="level" label="层面">
            <template slot-scope="scope">
              <div
                style="color:#2d8cf0;cursor: pointer"
                @click="openDetails(scope.row,scope.row.levelId)"
              >
                <p>{{scope.row.level}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="dimension" label="维度">
            <template slot-scope="scope">
              <div
                style="color:#2d8cf0;cursor: pointer"
                @click="openDetails(scope.row,scope.row.dimId)"
              >
                <p>{{scope.row.dimension}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="point" label="质控点">
            <template slot-scope="scope">
              <div
                style="color:#2d8cf0;cursor: pointer"
                @click="openDetails(scope.row,scope.row.pointId)"
              >
                <p>{{scope.row.point}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="index"
            label="指标"
            width="220"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div
                style="color:#2d8cf0;cursor: pointer"
                @click="openDetails(scope.row,scope.row.targetId)"
              >
                <p>{{scope.row.index}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="dept" label="单位">
            <template slot-scope="scope">
              <div
                style="color:#2d8cf0;cursor: pointer"
                @click="openDetails(scope.row,scope.row.targetId)"
              >
                <p>{{scope.row.dept}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="amount1" label="今年"></el-table-column>
          <el-table-column align="center" prop="amount2" label="去年"></el-table-column>
          <el-table-column align="center" prop="amount3" label="前年"></el-table-column>
        </el-table>
        <div style="margin: 10px;overflow: hidden; text-align: right">
          <Page
            :total="page.total"
            :showTotal="page.showTotal"
            :current="page.current"
            :page-size="page.size"
            @on-change="changePageTable1"
          ></Page>
        </div>
      </div>
    </div>
    <div v-show="!firstActive" class="taskSummaryItem" style="height:auto!important">
      <div class="summaryEchart trendTable">
        <div class="taskSummaryBreadcrumb">
          <el-button
            @click="openDept"
            class="screen"
            type="primary"
            icon="el-icon-search"
          >组织机构筛选
          </el-button>
          <el-select
            @clear="clearSearchIndexForm"
            @change="changeSearchIndexForm"
            class="screen2"
            v-model="searchIndexForm.hieId"
            clearable
            placeholder="体系层面筛选"
          >
            <el-option
              v-show="item.enableFlag=='0'"
              v-for="item in options"
              :key="item.id"
              :label="item.hieName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <i
              class="el-icon-location"
              style="float: left;margin-right: 5px;color:#6195f3"
            ></i>
            <el-breadcrumb-item>当前组织机构维度：{{searchIndexForm.deptName}}</el-breadcrumb-item>
            <Icon class="empty" @click="emptyBtn2" type="md-refresh"/>
          </el-breadcrumb>
        </div>
        <el-table
          :data="indexTableData"
          stripe
          height="400px"
          style="width: 100%; margin-top: 20px;min-height:450px"
        >
          <el-table-column min-width="140" align="center" prop="pointName" label="指标">
            <template slot-scope="scope">
              <div @click="showNorm(scope.row,'name')" style="color:#2d8cf0;cursor: pointer">
                <p>{{scope.row.targetName}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column  min-width="70" align="center" label="目标值">
            <template slot-scope="scope">
              <span>{{getStrategySymbol(scope.row.targetStrategy)}}{{scope.row.disTargetValue}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="70" align="center" label="标准值">
            <template slot-scope="scope">
              <span>{{getStrategySymbol(scope.row.standardStrategy)}}{{scope.row.disStandardValue}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="70" align="center" label="预警值">
            <template slot-scope="scope">
              <span>{{getStrategySymbol(scope.row.warnStrategy)}}{{scope.row.disWarnValue}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="disValue" min-width="70" align="center" label="当前值"></el-table-column>
          <el-table-column align="center" prop="startTime" label="开始时间" min-width="120"></el-table-column>
          <el-table-column align="center" prop="endTime" label="结束时间" min-width="120"></el-table-column>
          <el-table-column align="center" prop="deptName" label="部门" min-width="120">
            <template slot-scope="scope">
              <div style="color:#2d8cf0;cursor: pointer">
                <p @click="showNorm(scope.row,'dept')">{{scope.row.deptName}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="负责人" min-width="200">
            <template slot-scope="scope">
                            <span
                              @click="showNorm(scope.row,'directors',item.directorName)"
                              v-for="(item,index) in scope.row.directors"
                              :key="index"
                              style="color:#2d8cf0;cursor: pointer;padding-right:5px"
                            >{{item.directorName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="runState"
            label="运行状态"
            min-width="100"
          >
            <template slot-scope="scope">
              <div v-show="scope.row.runState ==='0'" style="color:#ff7f13">
                <p>未开始</p>
              </div>
              <div v-show="scope.row.runState==='1'" style="color:#4ac056">
                <p>运行中</p>
              </div>
              <div v-show="scope.row.runState==='2'" style="color:#f04409">
                <p>已结束</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="指标状态" min-width="100">
            <template slot-scope="scope">
              <div v-html="scope.row.cellHtml"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="taskCount" label="关联任务" min-width="90">
            <template slot-scope="scope">
              <div style="cursor: pointer">
                <p>{{scope.row.taskCount}}</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="M_search" style="text-align:right">
          <Page
            :total="indexPage.total"
            :showTotal="indexPage.showTotal"
            :current="indexPage.current"
            :page-size="indexPage.size"
            @on-change="changeindexPage"
          ></Page>
        </div>
      </div>
    </div>-->
    <!--层面下钻-->
    <levelModal ref="levelModal" :levelData="levelData" @closeLevelModal="closeLevelModal"></levelModal>
    <!--!&ndash;任务下钻;-->
    <taskModal ref="taskModal" :taskData="taskData" @closeTaskModal="closeTaskModal"></taskModal>
    <!--        &lt;!&ndash;部门树形弹框&ndash;&gt;
    <deptModal ref="changedept" :deptState="deptState" @closeDeptModal="closeDeptModal"></deptModal>
    &lt;!&ndash;任务下钻&ndash;&gt;
    <taskModal ref="taskModal" :taskData="taskData" @closeTaskModal="closeTaskModal"></taskModal>
    &lt;!&ndash;诊改参与下钻&ndash;&gt;
    <partakeModal ref="partakeModal" :partakeData="partakeData" @closePartakeModal="closePartakeModal"></partakeModal>

    &lt;!&ndash;体系下钻&ndash;&gt;
    <setupModal ref="setupModal" :setupData="setupData" @closeSetupModal="closeSetupModal"></setupModal>
    &lt;!&ndash;维度下钻&ndash;&gt;
    <dimModal ref="dimModal" :dimData="dimData" @closeDimModal="closeDimModal"></dimModal>
    &lt;!&ndash;质控点下钻&ndash;&gt;
    <controlModal ref="controlModal" :controlData="controlData" @closeControlModal="closeControlModal"></controlModal>-->
  </div>
</template>
<script>
  import controlModal from "./modal/controlModal";
  import dimModal from "./modal/dimModal";
  import setupModal from "./modal/setupModal";
  import levelModal from "./modal/levelModal";
  import partakeModal from "./modal/partakeModal";
  import taskModal from "./modal/taskModal";
  import targetModal from "./modal/targetModal";
  import deptModal from "@/components/changeDept";
  import NormPieChart from "@/components/dataView/normPieChart";
  import NormBarChart from "@/components/dataView/normBarChart";
  import SumPieChart from "@/components/dataView/sumPieChart.vue";
  import ArealineChart from "@/components/dataView/arealineChart";
  import LineAndBarMuch from "@/components/dataView/lineAndBarMuch";
  import store from "@/store";
  import {NeizhenUtil, datarouters} from "@/util/datarouters";
  import util from "@/api/utils";
  import divModal from "./modal/divModal.vue";

  export default {
    components: {
      controlModal,
      dimModal,
      setupModal,
      levelModal,
      partakeModal,
      taskModal,
      targetModal,
      deptModal,
      NormPieChart,
      NormBarChart,
      SumPieChart,
      ArealineChart,
      LineAndBarMuch,
      divModal
    },
    watch: {
      searchDeptTree(val) {
        this.$refs.deptTree2.filter(val);
      },
      screenWidth(val) {
      }
    },
    data() {
      return {
        paddingMy: {
          'padding':'0.08rem 0',
        },
        backHeader:{
          'background': '#639FD5',
          'color': '#fff',
          'padding':'0.15rem 0'
        },
        indexTableDataCenter:[],
        taskTableData: [],
        insystemData: [//指标数量数据
              {name : "诊改体系", value : '0', proportion:'2.14%',},
              {name : "诊改体系", value : '0', proportion:'2.14%',},
              {name : "诊改体系", value : '0', proportion:'2.14%',},
              {name : "诊改体系", value : '0', proportion:'2.14%',},
              {name : "诊改体系", value : '0', proportion:'2.14%',}
          ],
        controlData:{
          data: [],
          state: false,
        },
        dimData:{
          data: [],
          state: false,
        },
        setupData:{
          data: [],
          state: false,
        },
        levelData:{
          data: [],
          state: false,
        },
        partakeData: {
          data: [],
          state: false,
        },
        taskData: {
          data: [],
          state: false,
        },
        targetData: {
          data: [],
          state: false,
          id:null
        },
        lineAndBarTwo: {},
        lineAndBar: [
          {
            objData:{
              idDiv: '',
              id: '',
              xAxisData: [],
              seriesData: [],
            },
            targetId: '',
            name:'',
          }
        ],
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        changeHierarchyone: "",
        changeHierarchyTwo: "",
        deptValue: 0,
        staffValue: 0,
        studentValue: 0,
        teacherValue: 0,
        progressData: {
          dept: {participate: "", total: ""},
          staff: {participate: "", total: ""},
          student: {participate: "", total: ""},
          teacher: {participate: "", total: ""}
        },
        scoreData: [],
        istargetState: false,
        isspiralState: false,
        iswarnState: false,
        indexPage: {
          total: 20, //数据总数
          current: 1, // 当前页码
          size: 12, //每页条数
          showTotal: true
        },
        indexTableData: [],
        searchIndexForm: {
          //指标
          name: "",
          deptName: "全部",
          deptId: "",
          hieId: "",
          userName: "",
          dataState: 0
        },
        firstActive: true,
        echartNameone: "诊改层面指标分布",
        echartNametwo: "诊改层面质控点数量占比",
        warning: "", //预警指标数
        allData: "", //请求的所有数据
        page: {
          total: 20, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        deptState: {
          //机构弹框
          state: false,
          data: []
        },
        changeDept: {}, //选择的机构
        treeSelect: null, //tree选择的数据
        tableData: [],
        departmentData: {},
        progressSyate: 0, //进度条class类名状态
        classSyate: 0, //计时class类名状态
        LineData: {
          //面积图数据
          pieChartId: "",
          seriesData: {}
        },
        TaskreportsData: {}, //饼图数据
        alltotalData: [
          //指标数量数据
          {
            id: 5,
            name: "预警指标数量",
            value: 0,
            icon: "iconfont iconjishiben"
          },
          {
            id: 1,
            name: "诊改指标数量",
            value: 0,
            icon: "iconfont iconicon--"
          },
          {
            id: 2,
            name: "达标指标数量",
            value: 0,
            icon: "iconfont icontianchongxing-"
          },
          {
            id: 3,
            name: "未达标指标数量",
            value: 0,
            icon: "iconfont iconweiwancheng"
          },
          {
            id: 4,
            name: "逾期指标数量",
            value: 0,
            icon: "iconfont iconjishiben"
          },

        ],

        TaskSummaryData: {}, //任务监控
        TaskMonitorData: {}, //总任务
        screenWidth: "", //宽度
        setupArr: [],
        setupPos: 0,
        levelArr: [],
        levelPos: 0,
        dimArr: [],
        dimPos: 0,
        pointArr: [],
        pointPos: 0,
        indexArr: [],
        indexPos: 0,
        deptArr: [],
        deptPos: 0,
        amount1Arr: [],
        amount1Pos: 0,
        amount2Arr: [],
        amount2Pos: 0,

        changeDeptData: {name: "全部", id: ""}, //选择的机构==默认全部
        searchForm: {hieId: ""},
        treeIdHeight: null
      };
    },

    created() {
      this.getInsystemData();
      this.getIndexTableData();
      this.getDiagnosisData();
      this.loadData();
      // this.getDataTable();
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
        })();
      };
      this.getHeight(); //获取top的高度
    },
    methods: {
      // 12项指标
      getDataTable(){
        // /target/datapanel/target?
        let that = this;
        let targetIds= '425,406,120,402,427,403,408,476,479,218,410,100'
        that.$Get("/admin/target/datapanel/target", {targetIds}, function (data) {
          that.indexTableDataCenter = data.data
        })
      },
      getIndexTableData() {
        this.param = {
          dataState:this.searchIndexForm.dataState,
          runState: this.searchIndexForm.runState,
          deptId: this.searchIndexForm.deptId,
          hieId: this.searchIndexForm.hieId,
          targetName: this.searchIndexForm.name,
          userName: this.searchIndexForm.userName,
          size: this.indexPage.size,
          // size: '12',
          current: this.indexPage.current,
          total: this.indexPage.total,
        };
        this.$Get("/admin/target/current/page", this.param, res => {
          this.indexTableData = res.data.records;
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
                }else if(item.targetState == '0'){
                  item.dataState = '2'
                  item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                }else if(item.targetState == '1'){
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
      // 点击跳转五纵五横
      openetails(){
        this.$router.push('/indexdetails')
        let flag = 'indexdetails';
        this.$emit("activeNameL", flag);
      },
      openAllDeail(val){
        if(val==0){
          this.openSetup()
        }else if(val==1){
          this.openLevel()
        }
        else if(val==2){
          this.openDim()
        }
        else if(val==3){
          this.openControl()
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
        // 顶部请求
        getInsystemData(){
            let that = this
            that.$AsyncDealData(datarouters.SystemManage.hierarchy.monitorySummary, null, function(data) {
                let totalData = [];
                totalData.push({name : "诊改体系", value : data.data.himcount, proportion:'2.14%'});
                totalData.push({name : "诊改层面", value : data.data.levelcount, proportion:'7.27%'});
                totalData.push({name : "诊改维度", value : data.data.dimcount, proportion:'6.42%'});
                totalData.push({name : "诊改质控点", value : data.data.pointcount, proportion:'1.36%'});
                that.insystemData = totalData;
            });
        },
      //关闭质控点下钻
      closeControlModal(data){
        // console.log(data);
        this.controlData.state = false;
      },
      //关闭维度下钻
      closeDimModal(data){
        // console.log(data);
        this.dimData.state = false;
      },
      //关闭体系下钻
      closeSetupModal(data){
        // console.log(data);
        this.setupData.state = false;
      },
      //关闭诊层面下钻
      closeLevelModal(data){
        // console.log(data);
        this.levelData.state = false;
      },
      //关闭诊改参与下钻
      closePartakeModal(data){
        // console.log(data);
        this.partakeData.state = false;
      },
      //关闭任务下钻
      closeTaskModal(data) {
        // console.log(data);
        this.taskData.state = false;
      },
      //关闭指标下钻
      closeTargetModal(data) {
        // console.log(data);
        this.targetData.state = false;
      },
      //打开质控点下钻
      openControl(){
        this.dimData.data = [];
        this.$refs.dimModal.loaddata("质控点下钻", 1);
        this.dimData.state = true;


      },
      //打开维度下钻
      openDim(){
        this.dimData.data = [];
        this.$refs.dimModal.loaddata("维度下钻", 0);
        this.dimData.state = true;


      },
      //打开体系下钻
      openSetup(){
        this.setupData.data = [];
        this.$refs.setupModal.loaddata();
        this.setupData.state = true;
      },
      //打开层面下钻
      openLevel() {
        this.levelData.data = [];
        this.$refs.levelModal.loaddata();
        this.levelData.state = true;
      },
      //打开诊改参与下钻
      openPartake(val) {
        this.partakeData.data = val;
        this.partakeData.state = true;
        this.$refs.partakeModal.getName()
      },
      openTaskModal(){
        this.taskData.data = [];
        this.taskData.state = true;
        this.$refs.taskModal.loaddata()
      },
      //打开任务下钻
      openTask() {
        this.taskData.data = [];
        this.taskData.state = true;
        this.$refs.taskModal.loaddata("2")
      },
      //打开指标下钻
      openTarget(row) {
        let name = row.name
        let val = name === '诊改指标数量' ? '0' :
                  name === '达标指标数量' ? '1' :
                  name === '未达标指标数量' ? '2' :
                  name === '逾期指标数量' ? '3' :
                  name === '预警指标数量' ? '4' : ''
        this.taskData.data = [];
        this.taskData.state = true;
        this.$refs.taskModal.loaddata("1",val)
      },

      openPdf() {
        this.$router.push("/HelloWorld");
      },
      //选择体系事件
      changeSearchForm(val) {
        this.searchForm.hieId = val;
        this.getTableData1();
      },
      clearSearchForm() {
        this.searchForm.hieId = "";
        this.getTableData1();
      },
      //选择体系事件
      changeSearchIndexForm(val) {
        this.searchIndexForm.hieId = val;
        // this.getIndexTableData();
      },
      clearSearchIndexForm() {
        this.searchIndexForm.hieId = "";
        // this.getIndexTableData();
      },
      // 请求体系数据
      getDiagnosisData() {
        let that = this;
        that.$Get("/admin/hierarchy", {}, function (data) {
          that.options = data.data;
        });
      },
      // 打开指标详情
      showNorm(row, type, directorsName) {
        // this.$router.push('/indexdetails')

        let flag = 'indexdetails';
        this.$emit("activeNameL", flag);
        let arrID = [row.hieId, row.levelId, row.dimId, row.pointId]
        let obj = {
          name: type === 'name' ? row.targetName : '',
          deptName: type === 'dept' ? row.deptName : '',
          deptId: type === 'dept' ? row.deptId : '',
          userName: type === 'directors' ? directorsName : '',
          arrId: arrID,
          id: row.pointId,
          // type : type,
        }
        // this.$router.push({path: "/indexdetails", query: {obj: obj}});
        this.$router.push({path: "/indexdetails", query: {obj: obj}});
      },
      //清空维度筛选
      emptyBtn1() {
        this.changeDeptData.id = "";
        this.changeDeptData.name = "全部";
        this.getTableData1();
      },
      //清空维度筛选
      emptyBtn2() {
        this.searchIndexForm.deptId = "";
        this.searchIndexForm.deptName = "全部";
        // this.getIndexTableData();
      },
      //点击查看详情
      getDetail(row) {
        if (row.id == 1) {
          this.firstActive = true;
          this.searchIndexForm.dataState = 0;
          this.getIndexTableData();
          this.echartNameone = "诊改层面指标分布";
          this.echartNametwo = "诊改层面质控点数量占比";
          this.getTaskMonitor(this.allData);
          this.getTaskEducation(this.allData);
        } else if (row.id == 2) {
          this.firstActive = false;
          this.istargetState = true,
          this.isspiralState = false,
          this.iswarnState = false,
          this.searchIndexForm.dataState = 1;
          this.getIndexTableData();
          this.echartNameone = "诊改指标达标层面分布";
          this.echartNametwo = "诊改指标达标数量占比";
          this.getTaskMonitor(this.allData);
          this.getTaskEducation(this.allData);
        } else if (row.id == 3) {
          this.firstActive = false;
          this.istargetState = true,
           this.isspiralState = false,
           this.iswarnState = false,
           this.searchIndexForm.dataState = 2;
          this.getIndexTableData();
          this.echartNameone = "诊改指标未达标层面分布";
          this.echartNametwo = "诊改指标未达标数量占比";
          this.getTaskMonitor(this.allData);
          this.getTaskEducation(this.allData);
        } else if (row.id == 4) {
          this.firstActive = false;
          (this.istargetState = false),
            (this.isspiralState = true),
            (this.iswarnState = false),
            (this.searchIndexForm.dataState = 3);
          this.getIndexTableData();
          this.echartNameone = "诊改指标逾期层面分布";
          this.echartNametwo = "诊改指标逾期数量占比";
          this.getTaskMonitor(this.allData);
          this.getTaskEducation(this.allData);
        } else if (row.id == 5) {
          this.firstActive = false;
          (this.istargetState = false),
            (this.isspiralState = false),
            (this.iswarnState = true),
            (this.searchIndexForm.dataState = 4);
          this.getIndexTableData();
          this.echartNameone = "诊改指标预警层面分布";
          this.echartNametwo = "诊改指标预警数量占比";
          this.getTaskMonitor(this.allData);
          this.getTaskEducation(this.allData);
        }
      },
      //页面加载请求数据
      loadData() {
        let that = this;
        that.$Get("/admin/target/current/summary", {}, function (data) {
          that.allData = data.data;
          that.alltotalData[1].value = data.data.total; //诊改指标数量
          that.alltotalData[2].value = data.data.achieving; //达标指标数量
          that.alltotalData[3].value = data.data.notAchieving; //未达标指标数量
          that.alltotalData[4].value = data.data.overtime; //逾期未达标数量
          that.alltotalData[0].value = data.data.warning; //预警指标数量
          // that.getTaskline(data.data); //面积图数据
          that.getTaskEducation(data.data); //获取echart占比
          that.getTaskMonitor(data.data); //   获取echart分布
          // that.getTaskreport(data.data); //   获取总任务
          // that.getDeptData(data.data); //获取部门数量
        });
      },
      //打开下砖详情
      openDetails(row, id) {
        //把点击的行数据row与点击的哪一层级name传过去
        let arrID = [row.hieId, row.levelId, row.dimId, row.pointId]
        for (let i = 0; i < arrID.length; i++) {
          if (id === arrID[i]) {
            arrID.splice(i)
          }
        }
        let Qid = id === row.targetId ? row.pointId : id
        let name = id === row.targetId ? row.index : ''
        let obj = {
          name: name,
          arrId: arrID,
          id: Qid,
          // type : 'name',
          // deptId: ''
        }
        //   this.$router.push({ path: "/indexdetails", query: { name: name,arrId:arrID,id : Qid } });
        this.$router.push({path: "/indexdetails", query: {obj: obj}});
      },
      //查询按年份表格1
      getTableData1() {
        let param = {
          deptId: this.changeDeptData.id,
          hieId: this.searchForm.hieId,
          size: this.page.size,
          current: this.page.current
        };
        this.$Get("/admin/datapanel/rank", param, res => {
          let arr = [];
          for (let i = 0; i < res.data.records.length; i++) {
            if (res.data.records[i].lastYear.dataValue == null) {
              res.data.records[i].lastYear.dataValue = "/";
            }
            if (res.data.records[i].thisYear.dataValue == null) {
              res.data.records[i].thisYear.dataValue = "/";
            }
            if (res.data.records[i].beforeLast.dataValue == null) {
              res.data.records[i].beforeLast.dataValue = "/";
            }
            arr.push({
              hieId: res.data.records[i].hieId,
              levelId: res.data.records[i].levelId,
              dimId: res.data.records[i].dimId,
              pointId: res.data.records[i].pointId,
              targetId: res.data.records[i].targetId,
              setup: res.data.records[i].hieName,
              level: res.data.records[i].levelName,
              dimension: res.data.records[i].dimName,
              point: res.data.records[i].pointName,
              index: res.data.records[i].targetName,
              dept: res.data.records[i].dataUnit,
              deptId: res.data.records[i].deptId,
              amount1: res.data.records[i].thisYear.dataValue,
              amount2: res.data.records[i].lastYear.dataValue,
              amount3: res.data.records[i].beforeLast.dataValue
            });
          }
          this.tableData = arr;
          this.page.total = res.data.total;
          this.getTableTree();
        });
      },
      // 分页指标查看
      changeindexPage(val) {
        this.indexPage.current = val;
        // this.getIndexTableData();
        //这里请求表格接口
      },
      //该表格的字段名与表格的布局关联的==>注：如果修改字段名，都要改变，不然表格样式会错乱
      getTableTree() {
        this.setupArr = [];
        this.levelArr = [];
        this.dimArr = [];
        this.pointArr = [];
        this.indexArr = [];
        this.deptArr = [];
        this.amount1Arr = [];
        this.amount2Arr = [];
        this.amount3Arr = [];
        for (var i = 0; i < this.tableData.length; i++) {
          if (i === 0) {
            this.setupArr.push(1);
            this.setupPos = 0;
            this.levelArr.push(1);
            this.levelPos = 0;
            this.dimArr.push(1);
            this.dimPos = 0;
            this.pointArr.push(1);
            this.pointPos = 0;
            this.indexArr.push(1);
            this.indexPos = 0;
            this.deptArr.push(1);
            this.deptPos = 0;
            this.amount1Arr.push(1);
            this.amount1Pos = 0;
            this.amount2Arr.push(1);
            this.amount2Pos = 0;
            this.amount3Arr.push(1);
            this.amount3Pos = 0;
          } else {
            // 判断当前元素与上一个元素是否相同(第1列)
            if (
              this.tableData[i].setup === this.tableData[i - 1].setup
            ) {
              this.setupArr[this.setupPos] += 1;
              this.setupArr.push(0);
            } else {
              this.setupArr.push(1);
              this.setupPos = i;
            }
            // 判断当前元素与上一个元素是否相同(第2列)
            if (
              this.tableData[i].level === this.tableData[i - 1].level
            ) {
              this.levelArr[this.levelPos] += 1;
              this.levelArr.push(0);
            } else {
              this.levelArr.push(1);
              this.levelPos = i;
            }

            // 判断当前元素与上一个元素是否相同(第3列)
            if (
              this.tableData[i].dimension ===
              this.tableData[i - 1].dimension
            ) {
              this.dimArr[this.dimPos] += 1;
              this.dimArr.push(0);
            } else {
              this.dimArr.push(1);
              this.dimPos = i;
            }

            // 判断当前元素与上一个元素是否相同(第4列)
            if (
              this.tableData[i].point === this.tableData[i - 1].point
            ) {
              this.pointArr[this.pointPos] += 1;
              this.pointArr.push(0);
            } else {
              this.pointArr.push(1);
              this.pointPos = i;
            }
            // 判断当前元素与上一个元素是否相同(第5列)
            if (
              this.tableData[i].index === this.tableData[i - 1].index
            ) {
              this.indexArr[this.indexPos] += 1;
              this.indexArr.push(0);
            } else {
              this.indexArr.push(1);
              this.indexPos = i;
            }

            // 判断当前元素与上一个元素是否相同(第6列)
            if (this.tableData[i].dept === this.tableData[i - 1].dept) {
              this.deptArr[this.deptPos] += 1;
              this.deptArr.push(0);
            } else {
              this.deptArr.push(1);
              this.deptPos = i;
            }

            // 判断当前元素与上一个元素是否相同(第6列)
            if (
              this.tableData[i].amount1 ===
              this.tableData[i - 1].amount1
            ) {
              this.amount1Arr[this.amount1Pos] += 1;
              this.amount1Arr.push(0);
            } else {
              this.amount1Arr.push(1);
              this.amount1Pos = i;
            }

            // 判断当前元素与上一个元素是否相同(第6列)
            if (
              this.tableData[i].amount2 ===
              this.tableData[i - 1].amount2
            ) {
              this.amount2Arr[this.amount2Pos] += 1;
              this.amount2Arr.push(0);
            } else {
              this.amount2Arr.push(1);
              this.amount2Pos = i;
            }

            // 判断当前元素与上一个元素是否相同(第6列)
            if (
              this.tableData[i].amount3 ===
              this.tableData[i - 1].amount3
            ) {
              this.amount3Arr[this.amount3Pos] += 1;
              this.amount3Arr.push(0);
            } else {
              this.amount3Arr.push(1);
              this.amount3Pos = i;
            }
          }
        }
      },
      changePageTable1(val) {
        this.page.current = val;
        this.getTableData1();
      },
      // 分页查看
      changePage(val) {
        //这里请求表格接口
      },
      //关闭选择机构
      closeDeptModal(data) {
        this.deptState.state = false;
        if (data.length == 0) {
          // console.log("空");
        } else {
          if (this.firstActive == true) {
            this.changeDeptData = data;
            this.getTableData1();
          } else {
            this.searchIndexForm.deptName = data.name;
            this.searchIndexForm.deptId = data.id;
            // this.getIndexTableData();
          }
        }
      },
      //打开选择机构
      openDept() {
        this.deptState.state = true;
        this.deptState.data = {type: 0};
        this.$refs.changedept.getDeptTree();
      },
      //表格的配置
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          const _row = this.setupArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          };
        } else if (columnIndex === 1) {
          const _row = this.levelArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          };
        } else if (columnIndex === 2) {
          const _row = this.dimArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          };
        } else if (columnIndex === 3) {
          const _row = this.pointArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          };
        } else if (columnIndex === 4) {
          const _row = this.indexArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          };
        }
        //  else if (columnIndex === 5) {
        //     const _row = this.deptArr[rowIndex];
        //     const _col = _row > 0 ? 1 : 0;
        //     return {
        //         rowspan: _row,
        //         colspan: _col
        //     };
        // }
        // else if (columnIndex === 6) {
        //     const _row = this.amount1Arr[rowIndex];
        //     const _col = _row > 0 ? 1 : 0;
        //     return {
        //         rowspan: _row,
        //         colspan: _col
        //     };
        // } else if (columnIndex === 7) {
        //     const _row = this.amount2Arr[rowIndex];
        //     const _col = _row > 0 ? 1 : 0;
        //     return {
        //         rowspan: _row,
        //         colspan: _col
        //     };
        // } else if (columnIndex === 8) {
        //     const _row = this.amount3Arr[rowIndex];
        //     const _col = _row > 0 ? 1 : 0;
        //     return {
        //         rowspan: _row,
        //         colspan: _col
        //     };
        // }
      },
      //移入计时框
      enter() {
        this.classSyate = 1;
      },
      //移出计时框
      leave() {
        this.classSyate = 0;
      },
      //获取高度值
      getHeight() {
        // console.log(this.$refs.element);
        // let h = this.$refs.element.offsetHeight; //100
        // let h1 = this.$refs.elementOne.offsetHeight; //100
        // let h2 = this.$refs.elementTwo.offsetHeight; //100
        // let n = h1 / h;
        // // console.log(n);
        // document.getElementById("element-two").style.height =
        //   (1 - n) * 100 + "%";
      },
      //获取部门信息
      getDeptData() {
        this.departmentData = {
          //数据结构还未清楚==后续完善
          allSum: 600
        };
      },
      //   获取面积图数据
      getTaskline(data) {
        let obj = data.levelTotal;
        let arr = [];
        let arr2 = [];
        for (let i in obj) {
          arr.push(i); //属性
          arr2.push(obj[i]); //值
        }
        this.LineData = {
          id: "tasklineIds",
          seriesData: {
            xData: arr, //需传的数据
            yData: arr2 //需传的数据
          }
        };
        // this.LineData = {
        //     id: "tasklineId",
        //     seriesData: {
        //         xData: ["学校", "专业", "课程", "教师", "学生"], //需传的数据
        //         yData: [420, 532, 901, 634, 890] //需传的数据
        //     }
        // };
      },
      //获取总任务数
      getTaskreport(data) {
        if (data.notStarted != null && data.finished != null && data.inProgress != null) {
          this.TaskreportsData = {
            totalData: [{value: data.total, name: "任务总数"}],
            pieChartId: "taskEducationId",
            legendData: ["任务总数", "未开始", "已结束", "进行中"],
            seriesData: [
              {value: data.notStarted, name: "未开始"},
              {value: data.finished, name: "已结束"},
              {value: data.inProgress, name: "进行中"}
            ]
          };
        } else {
          this.TaskreportsData = {
            totalData: [{value: data.total, name: "任务总数"}],
            pieChartId: "taskEducationId",
            legendData: ["任务总数", "未开始", "已结束", "进行中"],
            seriesData: []
          };
        }

      },
      //   获取分布
      getTaskMonitor(data) {
        // console.log(data)
        let obj = [];
        if (this.echartNameone == "诊改层面指标分布") {
          obj = data.levelTotal;
        } else if (this.echartNameone == "诊改指标达标层面分布") {
          obj = data.levelAchieving;
        } else if (this.echartNameone == "诊改指标未达标层面分布") {
          obj = data.levelNotAchieving;
        } else if (this.echartNameone == "诊改指标逾期层面分布") {
          obj = data.levelOvertime;
        } else if (this.echartNameone == "诊改指标预警层面分布") {
          obj = data.levelWarning;
        }
        let arr = [];
        let arr2 = [];
        for (let i in obj) {
          arr.push(i); //属性
          arr2.push(obj[i]); //值
        }
        this.TaskMonitorData = {
          id: "tasksummary",
          xAxisData: arr,
          seriesData: arr2
        };
      },
      //   获取占比
      getTaskEducation(data) {
        if (this.echartNameone == "诊改层面指标分布") {
          let obj = data.levelTotal;
          let arr = [];
          let arr2 = [];
          for (let i in obj) {
            arr.push({value: obj[i], name: i});
            arr2.push(i);
          }
          this.TaskSummaryData = {
            id: "monitor",
            legendData: arr2,
            seriesData: arr
          };
        } else if (this.echartNameone == "诊改指标达标层面分布") {
          this.TaskSummaryData = {
            id: "monitor",
            legendData: ["未达标指数数量", "达标指数数量"],
            seriesData: [
              {value: data.notAchieving, name: "未达标指数数量"},
              {value: data.achieving, name: "达标指数数量"}
            ]
          };
        } else if (this.echartNameone == "诊改指标未达标层面分布") {
          this.TaskSummaryData = {
            id: "monitor",
            legendData: ["未达标指数数量", "达标指数数量"],
            seriesData: [
              {value: data.notAchieving, name: "未达标指数数量"},
              {value: data.achieving, name: "达标指数数量"}
            ]
          };
        } else if (this.echartNameone == "诊改指标逾期层面分布") {
          this.TaskSummaryData = {
            id: "monitor",
            legendData: ["未逾期指数数量", "逾期指数数量"],
            seriesData: [
              {
                value: data.total - data.overtime,
                name: "未逾期指数数量"
              },
              {value: data.overtime, name: "逾期指数数量"}
            ]
          };
        } else if (this.echartNameone == "诊改指标预警层面分布") {
          this.TaskSummaryData = {
            id: "monitor",
            legendData: ["未预警指数数量", "预警指数数量"],
            seriesData: [
              {
                value: data.total - data.warning,
                name: "未预警指数数量"
              },
              {value: data.warning, name: "预警指数数量"}
            ]
          };
        }
      }
    }
  };
</script>

<style lang='less' scoped>
  @import url("./index.less");
</style>
