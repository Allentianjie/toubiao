<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath" >
        <div>
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
      </div>
      <div class="btnReturn">
        <Button type="primary" ghost @click="$router.go(-1)">返回上级</Button>
      </div>
    </div>
    <div class="tableDiv">
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
    name: "fourTable",
    data(){
      return{
        paddingMy: {
          // 'padding':'0.08rem 0',
        },
        backHeader:{
          'background': '#f8f8f9',
          // 'color': '#fff',
          // 'padding':'0.15rem 0'
        },
        title:{
          year: '2019',
          val: '789',
          name: 'xx系',
        },
        indexPage: {
          keywords: '',
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        tableList:[],
        id: '',
        typeNmae: '',
        path: {},
        ageFlag: false
      }
    },
    mounted(){
      this.id = this.$route.query.obj.id
      this.ageFlag = this.$route.query.obj.urlFlag
      if (this.ageFlag) {
        this.getAgeData()
      } else {
        this.getListData()
      }
    },
    methods:{
      getAgeData() {
        let that = this
        let obj ={
          current: this.indexPage.current,
          size: this.indexPage.size,
          type: this.$route.query.obj.type,
          teacher: this.$route.query.obj.teacher
        }
       /* let obj ={}
        if(this.indexPage.keywords){
          obj ={
            current: this.indexPage.current,
            size: this.indexPage.size,
            type: this.$route.query.obj.type,
            teacher: this.$route.query.obj.teacher
          };
        }else {
          obj ={
            current: this.indexPage.current,
            size: this.indexPage.size,
            type: this.$route.query.obj.type,
            teacher: this.$route.query.obj.teacher
          };
        }*/
        let url;
        if (this.ageFlag == "age") {  //age年龄  degree学位
          url = "/teachDrilling/getTeacherAgeDataDetailList"
        } else {
          url = "/teachDrilling/getTeacherDegreeDataDetailList"
        }
        that.$Get("/admin" + url, obj, data => {
          that.indexPage.total= parseInt(data.data.total)
          that.tableList = data.data.records
        })
      },
      getListData() {
        let that = this

       /* let obj ={
          seriseId: this.id,
          keywords:this.indexPage.keywords,
          pageNum: this.indexPage.current,
          pageSize: this.indexPage.size,
          type: this.$route.query.obj.type
        }*/
         let obj ={}
     if(this.indexPage.keywords){
       obj ={
         seriseId: '',
         keywords:this.indexPage.keywords,
         pageNum: this.indexPage.current,
         pageSize: this.indexPage.size,
         type: this.$route.query.obj.type
       };
     }else {
       obj ={
         seriseId: this.id,
         keywords:this.indexPage.keywords,
         pageNum: this.indexPage.current,
         pageSize: this.indexPage.size,
         type: this.$route.query.obj.type
       };
     }
        that.$Get("/admin/teachDrilling/getTeacherDataDetailList", obj, data => {
          that.indexPage.total= parseInt(data.data.total)
          that.tableList = data.data.records
        })
      },

      // 搜索
      searchFn () {
        this.indexPage.current = 1;
        if (this.ageFlag) {
          this.getAgeData();
        } else {
          this.getListData();
        }
      },

      // 分页任务查看
      changetaskPage(val) {
        this.indexPage.current = val;
        if (this.ageFlag) {
          this.getAgeData()
        } else {
          this.getListData()
        }
        //这里请求表格接口
      },
      // 点击教师名字跳转画像
      teacherPortrayal(row){
        // username
        console.log(9999,row.username)
        // this.$router.push({path: '/teacher', query: {username: row.username,type:'teacher'}})
        let  obj={
          code:row.username,
          type:'teacher',
        }
        this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}})
      },
    }
  }
</script>

<style lang="less" scoped>
  @import url("./school.less");
</style>
