<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox"
           class-name="vertical-center-modal" v-model="targetData.state" width="80%"
           :mask-closable="false" @on-cancel="closeTargetModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>指标下钻</span>
      </p>
      <div class="fileManage">
        <el-row>
          <el-col :span="8">
            指标名称：
            <Input
              clearable
              v-model="searchIndexForm.name"
              placeholder="请输入指标名称"
              style="width: 60%"
              @on-change="firstsClear"
            />
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="2">
            <Button
              @click="getIndexTableData"
              type="primary"
              icon="ios-search"
            >搜 索
            </Button>
          </el-col>
          <el-col :span="2">
            <Button icon="ios-trash" @click="emptyIndexTableBtn">清 空</Button>
          </el-col>
          <el-col :span="2" v-if="showBtn">
            <Button type="primary" ghost @click="returnSuperior">返回上级</Button>
          </el-col>

        </el-row>
        <div class="tableHeight">
          <el-table
            :data="indexTableData"
            stripe
            :header-cell-style="backHeader"
            :cell-style="paddingMy"
            style="width: 100%;"
          >
            <el-table-column show-overflow-tooltip min-width="180" align="center" prop="pointName" label="指标名称">
              <template slot-scope="scope">
                <span style="color:#2d8cf0;cursor: pointer">{{scope.row.targetName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="taskCount" label="子任务数" min-width="90">
              <template slot-scope="scope">
                <span style="color:#2d8cf0;cursor: pointer">{{scope.row.taskCount}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="240" align="center" label="质控周期">
              <template slot-scope="scope">
                <!--开始时间和结束时间-->
                <span style="color:#2d8cf0;cursor: pointer">{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
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
            <el-table-column align="center" label="指标状态" min-width="100">
              <template slot-scope="scope">
                <div v-html="scope.row.cellHtml">{{ scope.row.disValue}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="deptName" label="所属部门" min-width="120">
              <template slot-scope="scope">
                <span style="color:#2d8cf0;cursor: pointer">{{scope.row.deptName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip label="负责人" min-width="200">
              <template slot-scope="scope">
                            <span
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
            <el-table-column
              align="center"
              label="指标明细"
              min-width="100"
            >
              <template slot-scope="scope">
                <!--显示指标详情页；-->
                <!--<span>{{// scope.row}}</span>-->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="诊改轨迹"
              min-width="100"
            >
              <template slot-scope="scope">
                <p @click="showTrack(scope.row,'taskId')" style="cursor: pointer;margin-top: 5px">
                  <Icon type="ios-navigate-outline"/>
                  诊改轨迹
                </p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="基础数据"
              min-width="100"
            >
              <template slot-scope="scope">
                <!--显示指标详情页；-->
                <span>{{ scope.row.dataName}}</span>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <div class="pageDiv">
          <Page
            :total="page.total"
            :showTotal="page.showTotal"
            :current="page.current"
            :page-size="page.size"
            @on-change="changePageTable1"
          ></Page>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="closeTargetModal">关闭</Button>
        <!-- <Button type="primary" size="large" @click="closeModal">关闭</Button> -->
      </div>
      <TrackModal :trackState="trackState" @closeTrackModal="closeTrackModal"></TrackModal>
    </Modal>
  </div>
</template>

<script>
  import TrackModal from "./TrackModal.vue";

  export default {
    props: {
      targetData: {
        type: Object,
        required: true
      }
    },
    components: {TrackModal},
    watch: {
      targetData: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.getIndexTableData()
          });
        },
        deep: true
      }
    },
    data() {
      return {
        showBtn: false,
        searchIndexForm: {
          name: "",
          deptName: "",
          deptId: "",
          hieId: "",
          userName: "",
          dataState: '',
          runState: ''
        },
        paddingMy: {
          'padding': '5px 0'
        },
        backHeader: {
          'background': '#f8f8f9'
        },
        indexTableData: [],
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        dataState: null,
        trackState: {
          state: false,
          dataMessage: {},// 诊改信息 top
          amend: {},// 修改记录 up
          period: {},  // 周期记录 centre
          relevance: {}, // 关联指标 bottom
          id: null,
          type: '',
        },
      }
    },
    mounted() {
      this.dataState = this.targetData.id
      console.log(this.targetData.id)
    },
    computed: {},
    methods: {
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
      getTaskTableData() {

      },
      //获取诊改指标
      getIndexTableData() {
        let param = {
          dataState: this.searchIndexForm.dataState,
          runState: this.searchIndexForm.runState,
          deptId: this.searchIndexForm.deptId,
          hieId: this.searchIndexForm.hieId,
          targetName: this.searchIndexForm.name,
          userName: this.searchIndexForm.userName,
          size: this.page.size,
          current: this.page.current,
          total: this.page.total
        };
        this.$Get("/admin/target/current/page", param, res => {
          // console.info(res);
          this.page.current = res.data.current;
          this.page.total = res.data.total;
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
      //清空指标
      emptyIndexTableBtn() {
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
      //   关闭诊改轨迹弹框
      closeTrackModal(val) {
        this.trackState.state = val;
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
      //关闭查看弹框
      closeTargetModal() {
        this.$emit("closeTargetModal", {state: false});
        this.targetData.state = false;
      },
      // 分页
      changePageTable1(val) {
        this.page.current = val;
        this.getIndexTableData();
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
    }
  };
</script>

<style lang="less" scoped>
  @import url("../../diagnosis/modal/normModal.less");
  .tableHeight {
    min-height: 75%;
    max-height: 80%;
  }
</style>
