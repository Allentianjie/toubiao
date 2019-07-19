<template>
    <div class="mojorTbale">
      <div class="TableDivTwo">
        <el-table
          :data="tableList"
          stripe
          height="100%"
          :cell-style = "paddingMy"
          :header-cell-style="backHeader"
          style="width: 100%;"
        >
          <el-table-column  min-width="150" show-overflow-tooltip align="center" prop="name" label="专业名字">
            <template slot-scope="scope">
              <span @click="majorPortrayal(scope.row)" style="color:#2d8cf0;cursor: pointer">
                {{scope.row.name}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="majorcode"
            label="专业代码"
            min-width="110"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="educational"
            label="年制"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="studentnum"
            label="学生人数"
            min-width="120"
          >
            <template slot-scope="scope">
              <span>
                {{scope.row.studentnum}} 人
              </span>
            </template>
          </el-table-column>
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
    getListData() {
      let that = this
      let obj ={
        type: this.type,
        seriseId:this.seriseId,
        pageNum: this.indexPage.current,
        pageSize: this.indexPage.size,
      }
      that.$Get("/portrait/teachDrilling/getMajorPageList", obj, data => {
        that.indexPage.total= data.data.total;
        that.tableList = data.data.data
      })
    },
    // 分页任务查看
    changetaskPage(val) {
      this.indexPage.current = val;
      this.getListData();
      //这里请求表格接口
    },
    // 点击专业名字跳转画像
    majorPortrayal(row){
      this.$router.push({path: '/major', query: {majorcode: row.majorcode}})

    }
  }
}
</script>

<style lang="less" scoped>
  @import url("./tableSubordinate.less");
</style>
