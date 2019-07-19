<template>
  <div class="mojorTbale">
    <div class="TableDivTwo">
      <el-table
        :data="tableList"
        stripe
        height="100%"
        :cell-style = "paddingMy"
        :header-cell-style="backHeader"
        style="min-width: 100%; min-height: 100%"
      >
        <el-table-column  min-width="150" show-overflow-tooltip align="center" prop="username" label="用户名">
          <template slot-scope="scope">
            <span @click="teacherPortrayal(scope.row)" style="color:#2d8cf0;cursor: pointer">
              {{scope.row.username}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="deptname"
          label="所属部门"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- <el-table-column
           align="center"
           prop="phone"
           label="电话"
           min-width="120"
         >
         </el-table-column>-->
        <el-table-column
          align="center"
          prop="title"
          label="类型"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="education"
          label="学历"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="nativePlace"
          label="籍贯"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="createDate"
          label="创建时间"
          min-width="140"
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
    name: "teacherTable",
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
        seriseId: "",
        name: ''
      }
    },
    mounted(){
      this.name = this.$route.query.name;
      if(this.$route.query.seriseId){
        this.seriseId=this.$route.query.seriseId;
      }
      this.getListData()
    },
    methods:{
      getListData() {
        let that = this
        let obj ={
          pageNum: this.indexPage.current,
          pageSize: this.indexPage.size,
          year: '2019',
          seriseId:this.seriseId,
          type: this.name,
        }
        that.$Get("/admin/teachDrilling/getTeacherPageList", obj, data => {
          that.indexPage.total= data.data.total
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
      teacherPortrayal(row){
        // this.$router.push({path: '/teacher', query: {username: row.username,type:'teacher'}})
        let  obj={
          code:row.username,
          type:'teacher',
        }
        this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./tableSubordinate.less");
</style>
