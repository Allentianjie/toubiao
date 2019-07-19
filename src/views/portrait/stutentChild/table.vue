<template>
  <div class="base">
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="待完成的诊改任务" name="0">
        <Table style="margin-top:5px;min-height:300px" :data="tableDatas" :columns="myTaskColumns">
          <!--建职-->
          <template slot-scope="{row, index }" slot="taskName">
            <span v-if="row.taskId !== -1 " style="color:#3862b3">{{row.taskName}}</span>
            <span v-else style="color:#3862b3">【重要任务】{{row.taskName}}</span>
          </template>
          <template slot-scope="{row, index }" slot="runState">
            <span v-if="row.runState !== 1 " style="color:#3862b3">运行中</span>
            <span v-else style="color:#b31a28">已结束</span>
          </template>
          <!-- <template v-show='row.dataType=="5"' slot-scope="{row, index }" slot="targetValue">
            <span v-if="row.targetValue == '1'">是</span>
            <span v-else>否</span>
          </template> -->
          <template slot-scope="{row, index }" slot="disTargetValue">
            <div v-show='row.dataType == "5"'>
              <span v-if="row.disTargetValue == 1">是</span>
              <span v-else>否</span>
            </div>
            <div v-show='row.dataType != "5"'>
              <span v-if="row.taskId !== -1">{{getStrategySymbol(row.targetStrategy)}}{{row.disTargetValue}}</span>
              <span v-else>-</span>
            </div>
          </template>
          <template slot-scope="{row, index }" slot="disStandardValue">
            <div v-show='row.dataType == "5"'>
              <span v-if="row.disTargetValue == 1">是</span>
              <span v-else>否</span>
            </div>
            <div v-show='row.dataType != "5"'>
              <span v-if="row.taskId !== -1">{{row.disStandardValue}}</span>
              <span v-else>-</span>
            </div>
          </template>
          <template slot-scope="{row, index }" slot="disWarnValue">
            <div v-show='row.dataType == "5"'>
              <span v-if="row.disWarnValue == 1">是</span>
              <span v-else>否</span>
            </div>
            <div v-show='row.dataType != "5"'>
              <span v-if="row.taskId !== -1">{{getStrategySymbol(row.warnStrategy)}}{{row.disWarnValue}}</span>
              <span v-else>-</span>
            </div>
          </template>
          <template slot-scope="{row, index }" slot="disValue">
            <span v-if="row.taskId !== -1">{{row.disValue}}</span>
            <span v-else>-</span>
          </template>

        </Table>
        <div class="M_search" style="text-align:right">
          <Page
            :total="page.total"
            :showTotal="page.showTotal"
            :current="page.current"
            :page-size="page.size"
            @on-change="changeindexPage"
          ></Page>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成的诊改任务" name="5">
        <Table style="margin-top:5px;min-height:300px" :data="tableDatas" :columns="myTaskColumns">
          <!--建职-->
          <template slot-scope="{row, index }" slot="taskName">
            <span v-if="row.taskId !== -1 " style="color:#3862b3">{{row.taskName}}</span>
            <span v-else style="color:#3862b3">【重要任务】{{row.taskName}}</span>
          </template>
          <template slot-scope="{row, index }" slot="runState">
            <span v-if="row.runState !== 1 " style="color:#3862b3">运行中</span>
            <span v-else style="color:#b31a28">已结束</span>
          </template>
          <!-- <template v-show='row.dataType=="5"' slot-scope="{row, index }" slot="targetValue">
            <span v-if="row.targetValue == '1'">是</span>
            <span v-else>否</span>
          </template> -->
          <template slot-scope="{row, index }" slot="disTargetValue">
            <div v-show='row.dataType == "5"'>
              <span v-if="row.disTargetValue == 1">是</span>
              <span v-else>否</span>
            </div>
            <div v-show='row.dataType != "5"'>
              <span v-if="row.taskId !== -1">{{getStrategySymbol(row.targetStrategy)}}{{row.disTargetValue}}</span>
              <span v-else>-</span>
            </div>
          </template>
          <template slot-scope="{row, index }" slot="disStandardValue">
            <div v-show='row.dataType == "5"'>
              <span v-if="row.disTargetValue == 1">是</span>
              <span v-else>否</span>
            </div>
            <div v-show='row.dataType != "5"'>
              <span v-if="row.taskId !== -1">{{row.disStandardValue}}</span>
              <span v-else>-</span>
            </div>
          </template>
          <template slot-scope="{row, index }" slot="disWarnValue">
            <div v-show='row.dataType == "5"'>
              <span v-if="row.disWarnValue == 1">是</span>
              <span v-else>否</span>
            </div>
            <div v-show='row.dataType != "5"'>
              <span v-if="row.taskId !== -1">{{getStrategySymbol(row.warnStrategy)}}{{row.disWarnValue}}</span>
              <span v-else>-</span>
            </div>
          </template>
          <template slot-scope="{row, index }" slot="disValue">
            <span v-if="row.taskId !== -1">{{row.disValue}}</span>
            <span v-else>-</span>
          </template>

        </Table>
        <div class="M_search" style="text-align:right">
          <Page
            :total="page.total"
            :showTotal="page.showTotal"
            :current="page.current"
            :page-size="page.size"
            @on-change="changeindexPage"
          ></Page>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import {MyTask} from "@/views/taskReport/mytask/js/myTask";
  import store from '@/store';
  export default {
    props: ['username'],
    name: "table",
    data() {
      return {
        report: {
          reportFlag: '0',
          reportLockFlag: '0',
          himId: null,
          startTime: null,
          endTime: null
        },
        reportTaskFlag: false,//
        activeTab: "0",
        tableDatas: [],
        taskParam: {
          type: "0",
          keyword: "",
          hieId:"",
        },
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 6, //每页条数
          showTotal: true
        },
        activeName2: 'first',
        myTaskColumns: [

          {
            title: "任务名称",
            key: "taskName",
            align: "left",
            tooltip: true,
            minWidth:200,
            // tooltip: true,
          },
          {
            title: "部门",
            key: "deptName",
            align: "left",
            minWidth:200,
            tooltip: true,
            // slot: "deptName"
          },
          {
            title: "远行状态",
            key: "runState",
            align: "center",
            width: 100,
            slot: "runState"
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
        ],
      }
    },
    watch:{
      username (val, old){
        this.username = val;
        this.gettableData()
      }
    },
    created() {
      // this.getCurrentTaskSummary();
      //this.gettableData(); //获取表格数据===默认先显示我的任务
      this.myTaskClass = new MyTask(this, store);
    },
    methods: {
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
      // 点击table====tag
      handleClick(tab, event) {
        this.page.current = 1;
        this.taskParam.type = this.activeTab;
        this.gettableData();
      },
      //获取表格数据
      gettableData() {
        let that = this;
        that.taskParam.userId = this.$store.state.userInfo.user_id;
        that.$Get(
          "/admin/task/page",
          Object.assign(that.page, that.taskParam,),
          function (data) {
            that.tableDatas = data.data.records;
            that.page.total = data.data.total;
          }
        );
      },
      // 分页指标查看
      changeindexPage(val) {
        this.page.current = val;
        this.gettableData();
        //这里请求表格接口
      },
    }
  }
</script>

<style scoped>
  .base {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .M_search {
    height: 50px;
    padding: 10px;
  }
</style>
