<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath">
        <el-row>
          <el-col :span="9" class="myTotal">
             <h2>我的收藏总条数：<span>{{totalSum}}</span> <span>次</span></h2>
          </el-col>
          <el-col :span="6" :offset="9">
            指标名称:
            <el-input size="small"
                      v-model="searchIndexForm.name"
                      placeholder="请输入指标名称"
                      style="width: 60%;"
                      clearable
                      @change="changetaskPage(1)"
            ></el-input>
            <el-button type="primary" @click="changetaskPage(1)" size="small">查找</el-button>
          </el-col>
        </el-row>
      </div>
     <!-- <div class="btnReturn">
        <Button type="primary" ghost  @click="$router.back(-1)">返回上级</Button>
      </div>-->
    </div>
    <div class="tableDiv">
      <el-table
        :data="tableList"
        stripe
        height= "100%"
        style="min-width: 100%; min-height: 100%"
      >
        <el-table-column
          width="80"
          align="center"
          prop="pointName"
          label=""
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span><Icon type="ios-eye-outline"  style="font-size:20px"/></span>
          </template>
          <template slot-scope="scope">
            <p @click="showNorm(scope.row)" style="cursor: pointer;color:#2d8cf0">
              查看
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          align="center"
          prop="targetName"
          label="指标"
          show-overflow-tooltip
        >
          <!--<template slot-scope="scope">
              <span @click="clickRelevance(scope.row)" style="color:#2d8cf0;cursor: pointer">
                {{scope.row.targetName}}
              </span>
          </template>-->
        </el-table-column>
        <el-table-column
          align="center"
          prop="deptName"
          label="部门"
          min-width="120"
        >
          <!--<template slot-scope="scope">
            <div style="color:#2d8cf0;cursor: pointer">
              <p
                @click="clickName('dept',scope.row)"
              >{{scope.row.deptName}}</p>
            </div>
          </template>-->
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
        <el-table-column align="center" label="负责人"  show-overflow-tooltip min-width="140">
          <template slot-scope="scope">
            <!--style="color:#2d8cf0;cursor: pointer;padding-right:5px"-->
              <span
                @click="clickName('person',item)"
                v-for="(item,index) in scope.row.directors"
                :key="index"
                style="padding-right:5px"
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
                 @click="clickName('runState',scope.row)" style="color:#ff7f13">
              <p>未开始</p>
            </div>
            <div v-show="scope.row.runState=='1'" class="cellHtml"
                 @click="clickName('runState',scope.row)" style="color:#4ac056">
              <p>运行中</p>
            </div>
            <div v-show="scope.row.runState=='2'" class="cellHtml"
                 @click="clickName('runState',scope.row)" style="color:#f04409">
              <p>已结束</p>
            </div>
          </template>
        </el-table-column>
       <!-- <el-table-column
          align="center"
          prop="taskCount"
          label="关联任务"
          min-width="90"
        >
          <template slot-scope="scope">
            <div @click="clickRelevance(scope.row)" style="cursor: pointer;color:#2d8cf0 ">
              <p>{{scope.row.taskCount}}</p>
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
              &lt;!&ndash;<p @click="showNorm(scope.row)" style="cursor: pointer;">
                <Icon type="ios-eye-outline" />查看
              </p>&ndash;&gt;
              <p @click="showTrack(scope.row,'targetId')" style="cursor: pointer;margin-top: 5px"><Icon type="ios-navigate-outline" />诊改轨迹</p>
            </div>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
    <div style="text-align:right;padding: 8px 15px;background: #fff">
      <Page
        :total="indexPage.total"
        :showTotal="indexPage.showTotal"
        :current="indexPage.current"
        :page-size="indexPage.size"
        @on-change="changetaskPage"
      ></Page>
    </div>
    <indicatorModal ref="indicatorModal" :normData="normData" @closeNormModal="closeNormModal"></indicatorModal>
  </div>
</template>

<script>
  import indicatorModal from "./modal/indicatorModal";
export default {
  name: "collectTabel",
  components: {indicatorModal},
    data(){
    return{
      searchIndexForm: {
        name: "",
      },
      indexPage: {
        total: 0, //数据总数
        current: 1, // 当前页码
        size: 10, //每页条数
        showTotal: true
      },
      tableList:[],
      totalSum: 0,
      normData: {
        id:"",
        //查看指标要传过去的数据
        data: {},
        state: false //modal层
      },
    }
  },
  created(){

  },
  mounted(){
    this.getListData()
  },
  methods:{
    getListData() {
      // let data = JSON.parse(this.$route.query.obj)
      let that = this;
      this.tableList =[]
      let  param = {
        shareType : 2 ,
        targetName: this.searchIndexForm.name,
        size: this.indexPage.size,
        current: this.indexPage.current,
        total: this.indexPage.total,
      };
      this.$Get("/admin/targetshare/page", param, res => {
        if(!this.searchIndexForm.name){
          this.totalSum = res.data.total
        }
        this.indexPage.current = res.data.current;
        this.indexPage.total = res.data.total;
        this.tableList = res.data.records;
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
      })
    },
    // 分页任务查看
    changetaskPage(val) {
      this.indexPage.current = val;
      this.getListData();
      //这里请求表格接口
    },
    // 打开指标详情
    showNorm(data) {
      let that = this
      let row = Object.assign(
        {
          pointName: data.pointName,
          pointId: data.pointId,
          minTime: data.startTime,
          maxTime: data.endTime,
          targetId:data.targetId
        },
      );
      this.normData.data = row;
      this.normData.state = true;
      this.$refs.indicatorModal.getNormList();
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
    //关闭指标详情
    closeNormModal() {
      this.normData.state = false;
    },
  }
}
</script>

<style lang='less' scoped>
 @import "./collctIndex.less";
</style>
