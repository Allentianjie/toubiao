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
        <Button type="primary" ghost  @click="$router.go(-1)">返回上级</Button>
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
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="majorCode"
          label="课程编号"
          min-width="110"
        >
        </el-table-column>
        <el-table-column  min-width="110" show-overflow-tooltip align="center" prop="majorName" label="课程名称">
          <template slot-scope="scope">
              <span @click="majorPortrayal(scope.row)" style="color:#2d8cf0;cursor: pointer">
                {{scope.row.majorName}}
              </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="classNo"
          label="班级编号"
          v-if="percentage !== ''"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="rate"
          v-if="percentage !== ''"
          :label=percentage
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="teacherName"
          v-if="percentage !== ''"
          label="上课教师"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="correId"
          label="教职工编号"
          v-if="percentage !== ''"
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
    name: "courseDetailTable",
    data(){
      return{
        queryData: null, // 地址参数
        paddingMy: {
        },
        backHeader:{
          'background': '#f8f8f9',
        },
        percentage: '课堂活跃度',
        majorId: '',
        indexPage: {
          keywords: '',
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        tableList:[],
        source: '',
        seriseId: "",
        type: "",
      }
    },
    mounted(){
      let data = JSON.parse(this.$route.query.obj);

      this.queryData = data;

      if(data.symbol === '出勤率'){
        this.percentage= '出勤率'
        this.getTopOne(data)
      }else if(data.symbol ==='活跃度'){
        this.percentage= '活跃度'
        this.getTopTwo(data)
      }else if(data.symbol ==='完成率'){
        this.percentage= '作业完成率'
        this.getTopThree(data)
      }else{
        this.percentage = ''
        this.getListData(data)
      }
    },
    methods:{
      // 出勤率
      getTopOne(str){
        // console.log('00--44',str)
        let that = this;
        let obj ={
          dimYear: '',
          classesId: str.id,
          keywords: this.indexPage.keywords,
          pageNum: this.indexPage.current,
          pageSize: this.indexPage.size,
        };
        that.$Get("/admin/subDrillCourse/getCourseSumClassGradeDetailAttendanceRate", obj, data => {
          that.indexPage.total= data.data.total
          that.tableList = data.data.records //records
        })
      },
      // 活跃度
      getTopTwo(str){
        // console.log('00--44',str)
        let that = this;
        let obj ={
          dimYear: '',
          classesId: str.id,
          keywords: this.indexPage.keywords,
          pageNum: this.indexPage.current,
          pageSize: this.indexPage.size,
        };
        that.$Get("/admin/subDrillCourse/getCourseSumClassGradeDetailClassAcivity", obj, data => {
          that.indexPage.total= data.data.total
          that.tableList = data.data.records //records
        })
      },
      // 完成率
      getTopThree(str){
        let that = this;
        let obj ={
          dimYear: '',
          classesId: str.id,
          keywords: this.indexPage.keywords,
          pageNum: this.indexPage.current,
          pageSize: this.indexPage.size,
        };
        that.$Get("/admin/subDrillCourse/getCourseSumClassGradeDetailHomeWorkFinish", obj, data => {
          // console.log(444,data.data)
          that.indexPage.total= data.data.total
          that.tableList = data.data.records //records
        })
      },
      // 校领导 -- 总课程下钻
      getListData(str) {
        let that = this;
        let obj ={
          classesId: str.id,
          keywords: this.indexPage.keywords,
          current: this.indexPage.current,
          size: this.indexPage.size,
        };

        that.$Get("/admin/subDrillCourse/getCourseSumCoursePageListByClassesId", obj, data => {
          that.indexPage.total= data.data.total
          that.tableList = data.data.records
        })
      },
      // 分页任务查看
      changetaskPage(val) {
        let data = this.queryData;
        this.indexPage.current = val;

        if(data.symbol === '出勤率'){
          this.getTopOne(data);
        }else if(data.symbol ==='活跃度'){
          this.percentage= '活跃度'
          this.getTopTwo(data);
        }else if(data.symbol ==='完成率'){
          this.getTopThree(data);
        }else{
          this.getListData(data);
        }
        //这里请求表格接口
      },

      // 搜索
      searchFn () {
        let data = this.queryData;
        this.indexPage.current = 1;

        if(data.symbol === '出勤率'){
          this.getTopOne(data);
        }else if(data.symbol ==='活跃度'){
          this.percentage= '活跃度'
          this.getTopTwo(data);
        }else if(data.symbol ==='完成率'){
          this.getTopThree(data);
        }else{
          this.getListData(data);
        }
      },

      // 点击专业名字跳转课程
      majorPortrayal(row){
        // this.$router.push({path: '/student', query: {username: row.username,type:'student'}})
        let  obj={
          code:row.majorCode,
          type:'course',
          // type:'ledDriver',
        }
        this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}})
      },

    }
  }
</script>

<style lang="less" scoped>
  @import url("./../school/school.less");
</style>


