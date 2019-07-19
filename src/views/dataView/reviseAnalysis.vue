<template>
  <div id="reviseBox">
    <div ref="reviseBox" style="height: 100%">
      <div class="summaryEchart newSum">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="诊改趋势数据" name="first">
            <div class="M_search">
              <div class="search-one">
                <span>当前组织机构维度：{{changeDeptData.name}}</span>
                <Icon class="empty" @click="emptyBtn1" type="md-refresh"/>
              </div>
              <el-button
                @click="openDept"
                class="screen"
                type="primary"
                icon="el-icon-search"
              >组织机构筛选
              </el-button>
            </div>
            <div :style="tableHeight">
              <el-table
                      v-show="tableState=='1'"
                      class="M-table"
                      height="100%"
                      :data="tableData"
                      :span-method="objectSpanMethod"
                      border
                      style="width: 100%;min-height:100%"
              >
                <el-table-column
                        align="center"
                        prop="setup"
                        label="体系"
                        width="200"
                        fixed
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
                <el-table-column fixed align="center" prop="level" label="层面">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.levelId)"
                    >
                      <p>{{scope.row.level}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed align="center" prop="dimension" label="维度">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.dimId)"
                    >
                      <p>{{scope.row.dimension}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed align="center" prop="point" label="质控点">
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
                        fixed
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
                <el-table-column fixed align="center" prop="dept" label="单位">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.targetId)"
                    >
                      <p>{{scope.row.dept}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="thisYear.dataValue" label="今年"></el-table-column>
                <el-table-column align="center" prop="beforeYear.dataValue" label="去年"></el-table-column>
                <el-table-column align="center" prop="lastYear.dataValue" label="前年"></el-table-column>
              </el-table>
              <el-table
                      v-show="tableState==2"
                      class="M-table"
                      height="100%"
                      :data="tableData"
                      :span-method="objectSpanMethod"
                      border
                      style="width: 100%;min-height:100%"
              >
                <el-table-column
                        align="center"
                        prop="setup"
                        label="体系"
                        width="200"
                        fixed
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
                <el-table-column fixed align="center" prop="level" label="层面">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.levelId)"
                    >
                      <p>{{scope.row.level}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed align="center" prop="dimension" label="维度">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.dimId)"
                    >
                      <p>{{scope.row.dimension}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed align="center" prop="point" label="质控点">
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
                        fixed
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
                <el-table-column fixed align="center" prop="dept" label="单位">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.targetId)"
                    >
                      <p>{{scope.row.dept}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="今年">
                  <el-table-column
                          prop="thisYear.dataValue"
                          label="值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="thisYear.schAvg"
                          label="学校均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="thisYear.schRank"
                          label="排名"
                          width="80">
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="去年">
                  <el-table-column
                          prop="beforeYear.dataValue"
                          label="值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="beforeYear.schAvg"
                          label="学校均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="beforeYear.schRank"
                          label="排名"
                          width="80">
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="前年">
                  <el-table-column
                          prop="lastYear.dataValue"
                          label="值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="lastYear.schAvg"
                          label="学校均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="lastYear.schRank"
                          label="排名"
                          width="80">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-table
                      v-show="tableState==3"
                      class="M-table"
                      height="100%"
                      :data="tableData"
                      :span-method="objectSpanMethod"
                      border
                      style="width: 100%;min-height:100%"
              >
                <el-table-column
                        align="center"
                        prop="setup"
                        label="体系"
                        width="200"
                        fixed
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
                <el-table-column fixed align="center" prop="level" label="层面">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.levelId)"
                    >
                      <p>{{scope.row.level}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed align="center" prop="dimension" label="维度">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.dimId)"
                    >
                      <p>{{scope.row.dimension}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed align="center" prop="point" label="质控点">
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
                        fixed
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
                <el-table-column fixed align="center" prop="dept" label="单位">
                  <template slot-scope="scope">
                    <div
                            style="color:#2d8cf0;cursor: pointer"
                            @click="openDetails(scope.row,scope.row.targetId)"
                    >
                      <p>{{scope.row.dept}}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="今年">
                  <el-table-column
                          prop="thisYear.dataValue"
                          label="值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="thisYear.avg"
                          label="学院均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="thisYear.rank"
                          label="学院排名"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="thisYear.schAvg"
                          label="学校均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="thisYear.schRank"
                          label="学校排名"
                          width="80">
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="去年">
                  <el-table-column
                          prop="beforeYear.dataValue"
                          label="值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="beforeYear.avg"
                          label="学院均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="beforeYear.rank"
                          label="学院排名"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="beforeYear.schAvg"
                          label="学校均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="beforeYear.schRank"
                          label="排名"
                          width="80">
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="前年">
                  <el-table-column
                          prop="lastYear.dataValue"
                          label="值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="lastYear.avg"
                          label="学院均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="lastYear.rank"
                          label="学院排名"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="lastYear.schAvg"
                          label="学校均值"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="lastYear.schRank"
                          label="排名"
                          width="80">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>

          </el-tab-pane>
        </el-tabs>
        <div style=" text-align: right;width: 100%; padding: 20px;height: 50px;" >
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
    <!--部门树形弹框-->
    <deptModal ref="changedept" :deptState="deptState" @closeDeptModal="closeDeptModal"></deptModal>
  </div>
</template>

<script>
  import deptModal from "@/components/dataChangeDept";
  import NormPieChart from "@/components/dataView/normPieChart";
  import NormBarChart from "@/components/dataView/normBarChart";
  import SumPieChart from "@/components/dataView/sumPieChart.vue";
  import ArealineChart from "@/components/dataView/arealineChart";
  import store from "@/store";
  import {NeizhenUtil, datarouters} from "@/util/datarouters";
  import util from "@/api/utils";

  export default {
    components: {
      deptModal,
      NormPieChart,
      NormBarChart,
      SumPieChart,
      ArealineChart
    },
    name: "reviseAnalysis",
    watch: {

    },
    data() {
      return {
        tableHeight: null,
        tableState: 1,
        activeName: 'first',
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
          size: 10, //每页条数
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
          size: 12, //每页条数
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
          }
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
        changeDeptData: {name: "全校", id: ""}, //选择的机构==默认全部
        searchForm: {hieId: ""},
        treeIdHeight: null
      };
    },

    created() {
      // this.getDept()
      this.getTableData1();
      this.getDiagnosisData();
    },
    mounted() {
      //控制左边tree的高度
      this.$nextTick(() => {
        this.tableHeight ="height:" +
                (this.$refs.reviseBox.clientHeight - 170) +
                "px";
      });


    },
    methods: {
      //请求院系部门
      getDept() {
        let param = {
          // deptId: this.changeDeptData.id,
          // hieId: this.searchForm.hieId,
          // size: this.page.size,
          // current: this.page.current
        };
        this.$Get("/admin/dept/treeForRank", param, res => {
          console.log(res)
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
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
        this.getIndexTableData();
      },
      clearSearchIndexForm() {
        this.searchIndexForm.hieId = "";
        this.getIndexTableData();
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
        this.$emit("nameSelect", 'indexName')
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
        // this.$router.push({ path: "/indexdetails", query: {obj:obj} });
        this.$router.push({path: "/indexName", query: {obj: obj}});
      },
      //清空维度筛选
      emptyBtn1() {
        this.changeDeptData.id = "";
        this.changeDeptData.name = "全校";
        this.tableState = '1';
        this.getTableData1();

      },
      //点击查看详情===修改取消掉了
      getDetail(row) {
        if (row.id == 1) {
          this.firstActive = true;
          this.searchIndexForm.dataState = 5;
          this.getIndexTableData();
          this.echartNameone = "诊改层面指标分布";
          this.echartNametwo = "诊改层面质控点数量占比";
          this.getTaskMonitor(this.allData);
          this.getTaskEducation(this.allData);
        } else if (row.id == 2) {
          this.firstActive = false;
          (this.istargetState = true),
            (this.isspiralState = false),
            (this.iswarnState = false),
            (this.searchIndexForm.dataState = 1);
          this.getIndexTableData();
          this.echartNameone = "诊改指标达标层面分布";
          this.echartNametwo = "诊改指标达标数量占比";
          this.getTaskMonitor(this.allData);
          this.getTaskEducation(this.allData);
        } else if (row.id == 3) {
          this.firstActive = false;
          (this.istargetState = true),
            (this.isspiralState = false),
            (this.iswarnState = false),
            (this.searchIndexForm.dataState = 2);
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

      //打开下砖详情
      openDetails(row, id) {
        this.$emit("nameSelect", 'indexName');
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
        // this.$router.push({ path: "/indexdetails", query: { obj:obj }});
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

            if (res.data.records[i].lastYear.rank == null) {
              res.data.records[i].lastYear.rank = "/";
            }
            if (res.data.records[i].thisYear.rank == null) {
              res.data.records[i].thisYear.rank = "/";
            }
            if (res.data.records[i].beforeLast.rank == null) {
              res.data.records[i].beforeLast.rank = "/";
            }
            if (res.data.records[i].lastYear.avg == null) {
              res.data.records[i].lastYear.avg = "/";
            }
            if (res.data.records[i].thisYear.avg == null) {
              res.data.records[i].thisYear.avg = "/";
            }
            if (res.data.records[i].beforeLast.avg == null) {
              res.data.records[i].beforeLast.avg = "/";
            }

            if (res.data.records[i].lastYear.schAvg == null) {
              res.data.records[i].lastYear.schAvg = "/";
            }
            if (res.data.records[i].thisYear.schAvg == null) {
              res.data.records[i].thisYear.schAvg = "/";
            }
            if (res.data.records[i].beforeLast.schAvg == null) {
              res.data.records[i].beforeLast.schAvg = "/";
            }
            if (res.data.records[i].lastYear.schRank == null) {
              res.data.records[i].lastYear.schRank = "/";
            }
            if (res.data.records[i].thisYear.schRank == null) {
              res.data.records[i].thisYear.schRank = "/";
            }
            if (res.data.records[i].beforeLast.schRank == null) {
              res.data.records[i].beforeLast.schRank = "/";
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
              thisYear: res.data.records[i].thisYear,
              lastYear: res.data.records[i].lastYear,
              beforeYear: res.data.records[i].beforeLast
            });
          }
          this.tableData = arr;
          this.page.total = res.data.total;
          this.getTableTree();
        });
      },
      //获取诊改指标
      getIndexTableData() {
        let param = {
          deptId: this.searchIndexForm.deptId,
          hieId: this.searchIndexForm.hieId,
          targetName: this.searchIndexForm.name,
          userName: this.searchIndexForm.personName,
          dataState: this.searchIndexForm.dataState,
          size: this.indexPage.size,
          current: this.indexPage.current,
          total: this.indexPage.total
        };
        this.$Get("/admin/target/current/page", param, res => {
          console.info(res);
          this.indexPage.current = res.data.current;
          this.indexPage.total = res.data.total;
          this.indexTableData = res.data.records;
          if (res.data.records.length) {
            res.data.records.forEach(function (item, index) {
              if (item.runState === "0") {// 未开始
                if (item.targetState === '1') {
                  item.cellHtml = '<span style="color:#4ac056">达标</span>'
                } else {
                  item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                }
              } else if (item.runState === '1') { // 运行中
                if (item.warnState === '1') {
                  item.cellHtml = '<span style="color:#ff1c1e">预警部门</span>'
                } else if (item.targetState === '0') {
                  item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                } else if (item.targetState === '1') {
                  item.cellHtml = '<span style="color:#4ac056">达标</span>'
                }
              } else if (item.runState === '2') { // 已结束
                if (item.targetOvertime === '1') {
                  item.cellHtml = '<span  style="color: #ff7f13">逾期(未达标)</span>'
                } else if (item.targetState === '1') {
                  item.cellHtml = '<span style="color:#4ac056">达标</span>'
                }
              }
            });
          }
        });
      },
      // 分页指标查看
      changeindexPage(val) {
        this.indexPage.current = val;
        this.getIndexTableData();
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
            // if (
            //   this.tableData[i].amount1 ===
            //   this.tableData[i - 1].amount1
            // ) {
            //   this.amount1Arr[this.amount1Pos] += 1;
            //   this.amount1Arr.push(0);
            // } else {
            //   this.amount1Arr.push(1);
            //   this.amount1Pos = i;
            // }
            //
            // // 判断当前元素与上一个元素是否相同(第6列)
            // if (
            //   this.tableData[i].amount2 ===
            //   this.tableData[i - 1].amount2
            // ) {
            //   this.amount2Arr[this.amount2Pos] += 1;
            //   this.amount2Arr.push(0);
            // } else {
            //   this.amount2Arr.push(1);
            //   this.amount2Pos = i;
            // }
            //
            // // 判断当前元素与上一个元素是否相同(第6列)
            // if (
            //   this.tableData[i].amount3 ===
            //   this.tableData[i - 1].amount3
            // ) {
            //   this.amount3Arr[this.amount3Pos] += 1;
            //   this.amount3Arr.push(0);
            // } else {
            //   this.amount3Arr.push(1);
            //   this.amount3Pos = i;
            // }
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
          this.getTableData1();
        } else {
          this.tableState = data.level;
          if (this.firstActive == true) {
            this.changeDeptData = data;
            this.getTableData1();
          } else {
            this.searchIndexForm.deptName = data.name;
            this.searchIndexForm.deptId = data.id;
            this.getIndexTableData();
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
            totalData: [{value: data.total, name: "指标总数"}],
            pieChartId: "taskEducationId",
            legendData: ["指标总数", "未开始", "已结束", "进行中"],
            seriesData: [
              {value: data.notStarted, name: "未开始"},
              {value: data.finished, name: "已结束"},
              {value: data.inProgress, name: "进行中"}
            ]
          };
        } else {
          this.TaskreportsData = {
            totalData: [{value: data.total, name: "指标总数"}],
            pieChartId: "taskEducationId",
            legendData: ["指标总数", "未开始", "已结束", "进行中"],
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
        // this.TaskMonitorData = {
        //     id: "tasksummary",
        //     xAxisData: ["学校", "专业", "课程", "老师", "学生"],
        //     seriesData: [42, 63, 66, 69, 68]
        // };
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
  }
</script>

<style lang="less" scoped>
  @import url("./index.less");

  #reviseBox {
    width: 100%;
    height: 100%;
  }

  .M_search {
    /*background: #4f5155;*/
    width: 100%;
    text-align: left;
    padding: 20px;
    /*margin-bottom: 15px;*/
    height: 50px;
    display: flex;
    align-items: center;
    /*justify-content: stretch;*/
  }

  .search-one {
    flex: 1;

    > span {
      font-size: 14px;
      padding-right: 20px;
    }
  }

  .summaryEchart {
    height: 100%;
  }
  .newSum{
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 1px;
    position: relative;
    padding: 10px 20px;
  }
  .empty{
    cursor: pointer;
    color: #347ce8;
    font-size: 18px
  }
</style>
