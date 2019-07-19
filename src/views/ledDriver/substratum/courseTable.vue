1<template>
  <div class="mojorTbale">
    <div class="M_search">
      <el-input size="small" v-model="coursename" placeholder="请输入内容" style="width: 200px;"></el-input>
      <el-button type="primary" @click="getListData()" size="small">查找</el-button>
      <div class="btnReturn" style="float:right;">
        <Button type="primary" ghost @click="$router.go(-1)">返回上级</Button>
      </div>
    </div>
    <div class="TableCourseTwo">
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
          label="课时字段"
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
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        tableList: [],
        coursename: '',
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
        let that = this;
        let obj ={
          type: this.type,
          seriseid:this.seriseId,
          current: this.indexPage.current,
          size: this.indexPage.size,
          coursename: this.coursename
        }
        // dmin/schoolpartrait/course/pag
        that.$Get("/admin/schoolpartrait/course/page", obj, data => {
          that.indexPage.total=Number(data.data.total)
          that.tableList = data.data.records
        })
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
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./tableSubordinate.less");
</style>
