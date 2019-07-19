<template>
    <div class="mojorTbale">
      <div class="searchBox">
        <el-input size="small"
                  v-model="searchData"
                  placeholder="请输入内容"
                  style="width: 200px;"
                  @keyup.enter.native="getListData(1)"
                  @ch></el-input>
        <el-button type="primary" @click="getListData(1)" size="small">查找</el-button>
        <span class="return" @click="$router.go(-1)">返回</span>
      </div>
      <div class="TableDivTwo" style="height: calc(100% - 96px)">
        <el-table
          :data="tableList"
          stripe
          height="100%"
          :cell-style = "paddingMy"
          :header-cell-style="backHeader"
          style="width: 100%;"
        >
          <el-table-column show-overflow-tooltip align="center" prop="targetName" label="指标名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="targetState" label="目标达标状态">
            <template slot-scope="scope">
              <span style="color:#ff1c1e" v-if="scope.row.warnState == 1">预警</span>
              <span style="color:#4ac056" v-else-if="scope.row.warnState == 0 && scope.row.targetState == 1">已达标</span>
              <span style="color:#ff7f13" v-else-if="scope.row.warnState == 0 && scope.row.targetState == 0">未达标</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="targetValue" label="目标值">
            <template slot-scope="scope">
              <span>{{getStrategySymbol(scope.row.targetStrategy)}}{{scope.row.targetValue ? scope.row.targetValue:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="standardValue" label="标准值">
            <template slot-scope="scope">
              <span>{{getStrategySymbol(scope.row.standardStrategy)}}{{scope.row.standardValue ? scope.row.standardValue:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="warnValue" label="预警值">
            <template slot-scope="scope">
              <span>{{getStrategySymbol(scope.row.warnStrategy)}}{{scope.row.warnValue ? scope.row.warnValue:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="startTime" label="开始时间"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="endTime" label="结束时间"></el-table-column>
        </el-table>
      </div>
      <div class="M_search" style="text-align:right;padding: 5px 15px;background: #fff">
          <Page
            :total="indexPage.total"
            :showTotal="indexPage.showTotal"
            :current="indexPage.current"
            :page-size="indexPage.size"
            @on-change="changetaskPage"
          ></Page>
        </div>
    </div>
</template>

<script>
export default {
  name: "majorTable",
  data(){
    return{
      paddingMy: {
      },
      backHeader:{
        'background': '#f8f8f9',
      },
      majorId: '',
      indexPage: {
        total: 0, //数据总数
        current: 1, // 当前页码
        size: 10, //每页条数
        showTotal: true
      },
      searchData: "",
      tableList:[],
      seriseId: "",
      type: ''
    }
  },
  mounted(){
    this.type = this.$route.query.type;
    if(this.$route.query.seriseId){
      this.seriseId=this.$route.query.seriseId;
    }
    this.getListData()
  },
  methods:{
    getListData(tip) {
      let that = this
      let obj ={
        targetName: this.searchData,
        levelId: this.$route.query.levelId,
        current: this.indexPage.current,
        size: this.indexPage.size,
      }
      if (tip == 1) {
        obj.current = 1;
      }
      that.$Get("/portrait/teachOffice/DiagnoseTarget/page", obj, data => {
        console.log(data);
        that.indexPage.total= parseInt(data.data.total);
        that.tableList = data.data.records
      })
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
    // 分页任务查看
    changetaskPage(val) {
      this.indexPage.current = val;
      this.getListData();
      //这里请求表格接口
    },
    // 点击专业名字跳转画像
    majorPortrayal(row){
      let  obj={
        code:row.majorcode,
        type:'major',
      }

 this.$router.push({path: '/portrait', query: {obj:obj}})
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("./../tableSubordinate.less");
</style>
