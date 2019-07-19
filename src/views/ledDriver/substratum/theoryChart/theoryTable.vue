1<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath">
        <el-input size="small"
                  v-model="indexPage.keywords"
                  placeholder="请输入搜索内容"
                  style="width: 200px;"
                  clearable
        ></el-input>
        <!-- <el-input size="small"
                  v-model="indexPage.keywords"
                  placeholder="请输入内容"
                  style="width: 200px;"
                  clearable
                  @change="getListData"
        ></el-input> -->
        <el-button type="primary" @click="searchFn()" size="small">查找</el-button>
      </div>
      <div class="btnReturn">
        <Button type="primary" ghost  @click="$router.back(-1)">返回上级</Button>
      </div>
    </div>
    <div class="tableDiv">
      <el-table
        :data="tableList"
        stripe
        height="100%"
        :cell-style = "paddingMy"
        :header-cell-style="backHeader"
        style="min-width: 100%; min-height: 100%">

        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="coursecode"
          label="课程编号"
          min-width="110"
        >
        </el-table-column>
        <el-table-column  min-width="150" show-overflow-tooltip align="center" prop="name" label="课程名">
          <template slot-scope="scope">
            <span @click="coursePortrayal(scope.row)" style="color:#2d8cf0;cursor: pointer">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="period"
          label="课时"
          min-width="110"
        >
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align:right;padding: 5px 15px;background: #fff">
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
    data(){
      return{
        paddingMy: {
        },
        backHeader:{
          'background': '#f8f8f9',
        },
        majorId: '',
        indexPage: {
          keywords: '',
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        tableList: [],
        seriseId: "",
        type: ''
      }
    },
    mounted(){
      // this.type = this.$route.query.type;
      // // if(this.$route.query.seriseId){
      // //   this.seriseId=this.$route.query.seriseId;
      // // }
      this.getListData()
    },
    methods:{
      getListData() {
        let that = this;
        let data = JSON.parse(this.$route.query.obj)
        let obj ={
          majorid: data.majorid,
          current: this.indexPage.current,
          size: this.indexPage.size,
          coursename: this.indexPage.keywords
        }
        // dmin/schoolpartrait/course/pag
        that.$Get("/admin/schoolpartrait/course/page", obj, data => {
          that.indexPage.total=Number(data.data.total)
          that.tableList = data.data.records
            // /schoolpartrait/course/page  majorid
        })
      },

      // 搜索
      searchFn () {
        this.indexPage.current = 1;
        this.getListData();
      },
      // 分页任务查看
      changetaskPage(val) {
        this.indexPage.current = val;
        this.getListData();
        //这里请求表格接口
      },
      // 点击专业名字跳转画像
      coursePortrayal(row){
        // this.$router.push({path: '/course', query: {coursecode: row.coursecode,type:'course'}})
        let  obj={
          code:row.coursecode,
          type:'course',
        }
        this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}})
      },
      // 返回上级按钮
      returnSuperior(){
        // let pathArr = this.$store.state.drillingData
        this.$router.push({path: 'theoryTwoChar', query: {obj: '返回跳转'}});
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./../school/school.less");
</style>
