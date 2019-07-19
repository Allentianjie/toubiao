<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath" >
        研究生以上学历人数
        <!--<div>-->
          <!--<el-input size="small"-->
                    <!--v-model="indexPage.keywords"-->
                    <!--placeholder="请输入内容"-->
                    <!--style="width: 200px;"-->
                    <!--clearable-->
                    <!--@change="getListData"-->
          <!--&gt;</el-input>-->
          <!--<el-button type="primary" @click="getListData()" size="small">查找</el-button>-->
        <!--</div>-->
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
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="用户编号"
          min-width="110"
        >
        </el-table-column>
        <el-table-column  min-width="150" show-overflow-tooltip align="center" label="姓名">
          <template slot-scope="scope">
            <span @click="goPortrayalFn(scope.row)" style="color:#2d8cf0;cursor: pointer">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="nation"
          label="民族"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="deptname"
          label="部门名称"
          min-width="180"
        >
        </el-table-column>
       <el-table-column
          align="center"
          prop="sex"
          label="性别"
          min-width="60"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="title"
          label="职称"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="native_place"
          label="籍贯"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="politics"
          label="政治面貌"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="degree"
          label="学位"
          min-width="140"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="role"
          label="职位"
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
    name: "educationDetail",
    data(){
      return{
        id: null,  // 保存传过来的数据
        paddingMy: {
          // 'padding':'0.08rem 0',
        },
        backHeader:{
          'background': '#f8f8f9',
          // 'color': '#fff',
          // 'padding':'0.15rem 0'
        },
        indexPage: {
          keywords: '',
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        tableList: [],
      }
    },
    mounted(){
      this.intiFn();
    },
    methods:{
      // 初始化
      intiFn () {
        this.id = this.$route.query.id;
        this.getListDataFn(this.id);
      },

      // 请求列表数据
      getListDataFn (id) {
        let params = {
          seriseid: id,
          current: this.indexPage.current,
          size: this.indexPage.size,
        };
        this.$Get("/portrait/persondivision/getDegreeDetailInfoBySeriseid", params, res => {
          if (res.code === 0) {
            let data = res.data;
            this.indexPage.total = data.total*1;
            this.tableList = data.records;
          } else {
            this.tableList = [];
          }
        });
      },

      // 跳转画像
      goPortrayalFn (data) {
        let obj={
          code: data.username,
          type: 'teacher',
        };
        this.$router.push({path: '/portrait', query: {obj:obj}});
      },

      // 翻页
      changetaskPage(val) {
        this.indexPage.current = val;
        this.getListDataFn (this.id);
      },
    }
  }
</script>

<style lang="less" scoped>
  @import url("../ledDriver/substratum/school/school.less");
</style>
