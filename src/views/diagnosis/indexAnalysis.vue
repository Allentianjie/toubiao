<template>
    <div class="analysisIndex">
      <div class="btnReturn" >
        <Button type="primary" ghost @click="upReturn">返回上级</Button>
      </div>
      <div class="top">
        <EchartsBar :analysisData="analysisData"></EchartsBar>
      </div>
      <div class="bottom">
        <el-row style="height: 100%">
          <el-col :span="24" style="height: 100%">
            <div class="tableDiv">
              <el-table
                :data="tableData"
                height="100%"
                style="min-width: 100%;min-height: 100%">
                <el-table-column
                  label="序号"
                  type="index"
                  align="center"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="taskName"
                  label="任务名称"
                  min-width="300"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="targetState"
                  label="任务完成情况"
                  align="center"
                >
                  <template slot-scope = "scope">
                    <span>{{scope.row.targetState==='0' ? '未达标' : '已达标'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="diagnoseState"
                  label="诊断结论填写状态"
                  align="center"
                >
                  <template slot-scope = "scope">
                    <span>{{scope.row.diagnoseState==='0' ? '未填写' : '已填写'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="improveState"
                  label="拟改进措施填写状态"
                  align="center"
                >
                  <template slot-scope = "scope">
                    <span>{{scope.row.improveState==='0' ? '未填写' : '已填写'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="90"
                  label="操作">
                  <template slot-scope="scope">
                    <span @click="clickDetails(scope.row)" style="color:#2d8cf0;cursor: pointer">查看</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="M_search" style="text-align:right;padding: 5px 15px">
              <Page
                :total="taskPage.total"
                :showTotal="taskPage.showTotal"
                :current="taskPage.current"
                :page-size="taskPage.size"
                @on-change="changetaskPage"
              ></Page>
            </div>
          </el-col>
        </el-row>
      </div>
      <analysisModal :analysisDataModal="analysisDataModal" @closeModal="closeModal"></analysisModal>
    </div>
</template>

<script>
import EchartsBar from "@/components/dataView/analysisEchartsBar.vue";
import analysisModal from "./modal/analysisModal.vue";
export default {
  components: {EchartsBar, analysisModal},
  data(){
    return{
      analysisDataModal: {
        //支撑文件要传过去的数据
        data: {},
        state: false, //modal层
        id: ''
      },
      analysisData: {},
      tableData: [],
      taskPage: {
        total: 10, //数据总数
        current: 1, // 当前页码
        size: 15, //每页条数
        showTotal: true
      },
      showLength: false,
      dataRight:{
        diagnose: '', //诊断结论
        improve: '', //拟改进措施
        deptName: '',// 部门
        writeName: '',// 报告人
        targetName: '',// 指标
        targetState: '',// 诊断结果
        lockFlag: ''
      },
      taskTableData: {},
      hierarchy_report_lock:false,
      hierarchy_report_unlock:false,

    }
  },
  mounted() {
    this.hierarchy_report_lock = this.$store.state.permissions['hierarchy_report_lock']
    this.hierarchy_report_unlock = this.$store.state.permissions['hierarchy_report_unlock']
    this.getTaskTableData()
    this.getEcharData()
  },
  methods:{
    closeModal(obj) {
      this.analysisDataModal.state = obj.state;
    },
    upReturn(){
      this.$router.push({path:'diagnosdetails', query: {data:this.$route.query.data}})
    },
    clickDetails(row){
      let taskId =  row.taskId
      this.$Get("/admin/task/report/task/" + taskId, {}, res => {
        if(res.data){
          this.analysisDataModal.data =  res.data
          this.analysisDataModal.state = true
          this.analysisDataModal.id = row.taskId
        }else {
          this.$alert('此任务暂无诊改报告详情', '提示', {
            confirmButtonText: '确定',
          });
        }
      });
    },
    getTaskTableData(){
      let that = this;
      let obj = {
        userId : this.$route.query.id,
        current: this.taskPage.current,
        size: this.taskPage.size,
        showTotal: this.taskPage.showTotal
      }
      this.$Get("/admin/task/report/task/page",obj , res => {
      that.taskPage.total= res.data.total
      that.tableData = res.data.records
      });
      /*this.tableData = [
        {
          taskName: '作业提交情况',
          targetState: '0',
          diagnoseState: '0',
          improveState: '0'
        },
        {
          taskName: '作业提交情况',
          targetState: '1',
          diagnoseState: '1',
          improveState: '1'
        },
        {
          taskName: '作业提交情况',
          targetState: '0',
          diagnoseState: '0',
          improveState: '0'
        },
        {
          taskName: '作业提交情况',
          targetState: '1',
          diagnoseState: '1',
          improveState: '1'
        },
        {
          taskName: '作业提交情况',
          targetState: '0',
          diagnoseState: '0',
          improveState: '0'
        },
        {
          taskName: '作业提交情况',
          targetState: '1',
          diagnoseState: '1',
          improveState: '1'
        },
        {
          taskName: '作业提交情况',
          targetState: '0',
          diagnoseState: '0',
          improveState: '0'
        },
        {
          taskName: '作业提交情况',
          targetState: '1',
          diagnoseState: '1',
          improveState: '1'
        },
        {
          taskName: '作业提交情况',
          targetState: '0',
          diagnoseState: '0',
          improveState: '0'
        },
        {
          taskName: '作业提交情况',
          targetState: '1',
          diagnoseState: '1',
          improveState: '1'
        },
        {
          taskName: '作业提交情况',
          targetState: '0',
          diagnoseState: '0',
          improveState: '0'
        },
        {
          taskName: '作业提交情况',
          targetState: '1',
          diagnoseState: '1',
          improveState: '1'
        },
        {
          taskName: '作业提交情况',
          targetState: '0',
          diagnoseState: '0',
          improveState: '0'
        },
        {
          taskName: '作业提交情况',
          targetState: '1',
          diagnoseState: '1',
          improveState: '1'
        },
        {
          taskName: '作业提交情况',
          targetState: '1',
          diagnoseState: '1',
          improveState: '1'
        },

]*/
    },
    // echarts图
    getEcharData(){
      let obj = {
        userId : this.$route.query.id
      }
      this.$Get("/admin/task/report/task/summary",obj , res => {
        this.getEcharts(res.data)
      })
    },
    getEcharts(res){
      let data = []
      let DataTop = []
      res.series.forEach( e=>{
        e.type = 'bar'
        e.barWidth = '20%'
       data.push(e)
        DataTop.push(e.name)
      })
      this.analysisData = {
        id: "CircleId",
        legendData: DataTop,
        seriesData: data,
        xAxisData: res.data
      }
    },
    // 分页任务查看
    changetaskPage(val) {
      this.taskPage.current = val;
      this.getTaskTableData();
      //这里请求表格接口
    },
  },
  //   获取第1个图标数据

}
</script>

<style lang='less' scoped>
.analysisIndex{
  width: 100%;
  height: 100%;
  .btnReturn{
    background: #fff;
    text-align: right;
    /*margin-bottom: 10px;*/
    padding-top: 10px;
    padding-right: 30px;
  }
  .top{
    width: 100%;
    height: 30%;
    /*border: 1px solid red;*/
    background: #fff;
    border-radius: 1px;
    margin-bottom: 1%;
  }
  .bottom{
    /*height:calc(70% - 0.2rem - 41px) ;*/
    height: 63%;
    border-radius: 1px;
    background: #fff;
    padding: 0.1rem;

    .tableDiv{
      height:calc(100% - 40px)
    }
    .reportDiv{
      height:calc(100% - 40px);
      border: 1px solid #dcdee2;
      padding: 0.1rem;
      overflow-y: auto;
      .noData{
        position: absolute;
        width: 50%;
        height: 80%;
        top:10%;
        right:0;
        /*margin-top: -150px;*/
        /*margin-left: -150px;*/
        background: url("../../assets/images/wushuju.png");
        background-size: 40% 50%;
        background-repeat:no-repeat;
        background-position: center
      }
      .el-col{
        text-align: left;
        padding: 10px 20px 0 20px;
        font-size: 14px;
        >span:first-child{
          display: inline-block;
          /*font-size: 16px;*/
          font-weight: 700;
          border-bottom:2px solid #00b7ee;
        }
      }
    }
    .M_search {
      padding: 13px 15px;
      text-align: left;
      background: #fff;
      > div {
        margin-right: 2%;
      }
      .ivu-btn-primary {
        margin-right: 20px;
      }
    }
  }

}
</style>
