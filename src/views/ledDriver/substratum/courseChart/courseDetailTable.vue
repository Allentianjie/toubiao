1<template>
  <div class="fourTable">
    <div class="M_search" style="justify-content: space-between;">
      <span></span>
      <!-- <div class="myPath">
        <el-input size="small"
                  v-model="indexPage.keywords"
                  placeholder="请输入内容"
                  style="width: 200px;"
                  clearable
                  @change="getListData"
        ></el-input>
        <el-button type="primary" @click="getListData()" size="small">查找</el-button>
      </div> -->
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
        <el-table-column  min-width="110" show-overflow-tooltip align="center" prop="majorName" label="课程名字">
          <template slot-scope="scope">
              <span @click="majorPortrayal(scope.row)" style="color:#2d8cf0;cursor: pointer">
                {{scope.row.majorName}}
              </span>
          </template>
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
    name: "studentTable",
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
      this.getListData(data);
    },
    methods:{

      // 课程总数 -- 明细 下钻
      getListData(str) {
        let that = this;
        let obj ={
          seriseId: str.id,
          current: this.indexPage.current,
          size: this.indexPage.size,
        };

        that.$Get("/admin/subDrillCourse/getCourseSumPageListBySeriseId", obj, data => {
          that.indexPage.total= data.data.total
          that.tableList = data.data.records
        })
      },
      // 分页任务查看
      changetaskPage(val) {
        this.indexPage.current = val;
        this.getListData(this.queryData);
        //这里请求表格接口
      },
      // 点击专业名字跳转课程
      majorPortrayal(row){
        let obj={
          code: row.majorCode,
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


