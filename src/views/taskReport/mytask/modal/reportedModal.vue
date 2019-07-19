<template>
  <Modal v-model="taskWriteIndex.state" width="60%" :mask-closable="false" @on-cancel="closefeedBack">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>诊断报告</span>
    </p>
    <div>
      <el-table
        :data="tableData"
        :header-cell-style="backHeader"
        height="500px" stripe
        style="width: 100%">
        <el-table-column prop="taskName" min-width="100" align="center" label="诊改名称"></el-table-column>
        <el-table-column min-width="100"  align="center" label="体系 / 层级 / 维度 / 质控点 / 指标">
          <template slot-scope="scope">
            <p style="color: rgb(63, 122, 230)" >
              {{ scope.row.hieName }} / {{ scope.row.levelName }} / {{ scope.row.dimName }} / {{ scope.row.pointName }} / {{ scope.row.targetName }}
            </p>
          </template>
        </el-table-column>

          <!--<el-table-column  prop="hieName"  label="体系" width="150" align="center" show-overflow-tooltip ></el-table-column>
        <el-table-column prop="levelName" min-width="100" align="center" label="层面"></el-table-column>
        <el-table-column prop="dimName" align="center" label="维度"></el-table-column>
        <el-table-column prop="pointName"  align="center" label="质控点"></el-table-column>
        <el-table-column prop="targetName"  align="center" label="指标"></el-table-column>-->
        <el-table-column   align="center" label="操作">
          <template slot-scope="scope">
            <p v-if="insertShow(scope.row)" style="cursor: pointer;color: rgb(63, 122, 230)" @click="operationInsertClick(scope.row)">填报</p>
            <p v-if="updateShow(scope.row)" style="cursor: pointer;color: rgb(63, 122, 230)" @click="operationUpdateClick(scope.row)">修改</p>
            <p v-if="browseShow(scope.row)" style="cursor: pointer;color: rgb(63, 122, 230)" @click="operationBrowseClick(scope.row)">浏览</p>


          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top: 7px">
        <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
      </div>
    </div>
    <div slot="footer" style="text-align: right">
      <Button type="primary" size="large" @click="closefeedBack">关闭</Button>
    </div>

    <Modal v-model="writeContent.state" width="60%" :mask-closable="false" @on-cancel="writeContent.state = false">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>诊断报告</span>
      </p>
      <div class="writeFrom">
        <Form :model="amend" :label-width="80">
          <FormItem label="诊改名称">
            <Input v-model="amend.systemIndex" disabled placeholder=""  style="width: 65%"></Input>
          </FormItem>
          <FormItem label="诊断结果">
            <Input v-model="amend.result" disabled placeholder=""  style="width: 65%"></Input>
            <div class="fromRight" style="vertical-align: center">
              <p>根据诊改诊改自动填写</p>
            </div>
          </FormItem>
          <FormItem label="诊断结论">
            <Input v-model="amend.conclusion" :disabled="browse" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="请填写" style="width: 65%;"></Input>
            <div class="fromRight">
              <p>填报说明：</p>
              <p>“诊断结论”需阐明目标达成情况，尚存在的问题及原因分析，建议在 500 字左右</p>
            </div>
          </FormItem>

          <FormItem label="拟改进措施">
            <Input v-model="amend.improve" :disabled="browse" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="请填写" style="width: 65%;"></Input>
            <div class="fromRight">
              <p>填报说明：</p>
              <p>“拟改进措施”需突出针对性、注重可行性，建议在 200 字左右。</p>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" v-if="!browse" @click="TaskWriteSubmit()">保存</Button>
        <Button type="warning" size="large" v-if="!browse" @click="TaskWriteReset()">重置</Button>
      </div>

    </Modal>
  </Modal>
</template>

<script>
  import {NeizhenUtil, datarouters} from "../../../../util/datarouters";
  export default {
   props: {
    taskWriteIndex: {
      type: Object,
      required: true
    }
  },
   data () {
     return{
       total: 30,
       page: 1,
       pageSize: 8,
       backHeader:{
         'background': '#f8f8f9'
       },
       tableData: [],
       targetMapper : [],  // target和task的映射关系
       reportLockFlag : 0,
       browse : false,     //浏览
       writeContent: {
         state: false, //填报index ===0 窗口
       },
       oper : 'add',

       amend: {
         id: '',
         result: '',
         systemIndex: '', // 指标
         conclusion: '', // 诊断结论
         improve: '', // 改进措施
         hieId : '',
         levelId : '',
         dimId :'',
         pointId : '',
         targetId : '',
         taskId : ''
       }
     }
   },
  mounted () {

  },
  methods: {
    insertShow(row) {
      var m = this.fromMappergetTaskId(row.targetId);
      if (m != null) {
        if (NeizhenUtil.isEmpty(m.reportId) && !m.locked) {
          return true;
        }
      }

      return false;

    } ,
    updateShow(row) {

      var m = this.fromMappergetTaskId(row.targetId);
      if (m != null) {
        if (!NeizhenUtil.isEmpty(m.reportId) && !m.locked) {
          return true;
        }
      }

      return false;

    } ,
    browseShow(row) {
      var m = this.fromMappergetTaskId(row.targetId);
      if (m != null) {
        if (m.locked) return true;
      }
      return false;


    } ,

    loadData() {
      this.getTableData(this.page, this.pagesize);

    },
    // 分页查看
    changePage(val) {
      this.page = val;
      console.log(8, val)
      this.getTableData(this.page, this.pagesize);
    },
    // 点击填写
    operationInsertClick (row) {
      console.log(66, row)
      var data = this.fromMappergetTaskId(row.targetId);
      this.amend.id = '';
      this.amend.result = data.result;
      this.amend.conclusion = '';
      this.amend.systemIndex = row.taskName;
      this.amend.improve = '';
      this.amend.hieId = row.hieId;
      this.amend.levelId = row.levelId;
      this.amend.dimId = row.dimId;
      this.amend.pointId = row.pointId;
      this.amend.targetId = row.targetId;
      this.amend.taskId = data.taskId;
      this.oper = 'add';
      this.browse = false;
      this.writeContent.state = true
    },
    operationUpdateClick(row) {
      var data = this.fromMappergetTaskId(row.targetId);
      this.amend.id = data.reportId;
      this.amend.result = data.result;
      this.amend.conclusion = data.diagnose;
      this.amend.improve = data.improve;
      this.amend.systemIndex = row.taskName;
      this.amend.hieId = row.hieId;
      this.amend.levelId = row.levelId;
      this.amend.dimId = row.dimId;
      this.amend.pointId = row.pointId;
      this.amend.targetId = row.targetId;
      this.amend.taskId = data.taskId;
      this.oper = 'update';
      this.browse = false;
      this.writeContent.state = true
    },
    operationBrowseClick(row) {
      var data = this.fromMappergetTaskId(row.targetId);
      this.amend.id = data.reportId;
      this.amend.result = data.result;
      this.amend.conclusion = data.diagnose;
      this.amend.improve = data.improve;
      this.amend.systemIndex = row.taskName;
      this.amend.hieId = row.hieId;
      this.amend.levelId = row.levelId;
      this.amend.dimId = row.dimId;
      this.amend.pointId = row.pointId;
      this.amend.targetId = row.targetId;
      this.amend.taskId = data.taskId;
      this.browse = true;
      this.writeContent.state = true
    },
    //列表关闭弹窗
    closefeedBack() {
      console.log("关闭了");
      let flag = false;
      this.$emit("closeWriteIndex", flag);
    },
    //保存
    TaskWriteSubmit () {
      let flag = false;
      let that = this;
      if (this.oper == 'add') {
        this.$AsyncDealData(datarouters.SystemManage.taskreport.insert, {
          hieId: this.amend.hieId,
          levelId: this.amend.levelId,
          dimId: this.amend.dimId,
          pointId: this.amend.pointId,
          targetId: this.amend.targetId,
          taskId: this.amend.taskId,
          diagnose: this.amend.conclusion,
          improve: this.amend.improve

        }, function (data) {
          that.getTableData(that.page, that.pagesize);
          that.writeContent.state = false;
        });
      } else {
        this.$AsyncDealData(datarouters.SystemManage.taskreport.update, {
          reportId : this.amend.id,
          diagnose: this.amend.conclusion,
          improve: this.amend.improve

        }, function (data) {
          that.getTableData(that.page, that.pagesize);
          that.writeContent.state = false;
        });

      }

      console.log(3, this.amend)
    },
    //重置
    TaskWriteReset () {
      this.amend.conclusion = ''
      this.amend.improve = ''
    },
    getTableData (pageindex, pagesize) {
      var that = this;
      this.$AsyncDealData(datarouters.SystemManage.taskreport.taskMapTarget, {
        current : pageindex,
        size : pagesize
        }, function(data) {
          console.log(data);
          if (data.code == '0') {
            that.targetMapper = data.data.targetMapper;
            var fdata = [];
            data.data.page.records.forEach(e => {
              var kdata = that.fromMappergetTaskId(e.targetId);
              e.taskName = kdata == null ? '' : kdata.taskName;
              fdata.push(e);
            });

            that.tableData = fdata;
            that.total = data.data.page.total;

          }
        }, true
      );

    },
    fromMappergetTaskId (targetId) {

      for (var i = 0 ; i < this.targetMapper.length; i++) {
        if (this.targetMapper[i].targetId == targetId) {

          return {
            taskId : this.targetMapper[i].taskId,
            taskName : this.targetMapper[i].taskName,
            reportId : this.targetMapper[i].reportId,
            result : this.targetMapper[i].taskResult,
            diagnose : this.targetMapper[i].reportDiagnose,
            improve : this.targetMapper[i].reportImprove,
            locked : this.targetMapper[i].locked == "1" ? true : false

          }
        }
      }

      return null;

    },
    getTaskReport(taskId) {
      this.$AsyncDealData(datarouters.SystemManage.taskreport.getTask, {
        taskId : taskId
      }, function(data) {

      });
    }

  }
}
</script>

<style scoped lang="less">
  .writeFrom{
    .fromRight{
      width: 32%;
      display: inline-block;
      vertical-align: top;
      p{
        height: 25px;
        line-height: 25px;
        color: #777;
      }
    }
  }
</style>
