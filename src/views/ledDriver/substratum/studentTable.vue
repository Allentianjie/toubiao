1<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath">
        <el-input size="small"
                  v-model="indexPage.keywords"
                  placeholder="请输入内容"
                  style="width: 200px;"
                  clearable
                  @change="getListData"
        ></el-input>
        <el-button type="primary" @click="getListData()" size="small">查找</el-button>
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
        style="min-width: 100%; min-height: 100%"
      >
        <el-table-column
          align="center"
          prop="username"
          label="用户名"
          min-width="100"
        >
        </el-table-column>
        <el-table-column  min-width="110" show-overflow-tooltip align="center" prop="name" label="学生姓名">
          <template slot-scope="scope">
              <span @click="majorPortrayal(scope.row)" style="color:#2d8cf0;cursor: pointer">
                {{scope.row.name}}
              </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="college"
          label="院系"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="major"
          label="专业"
          min-width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          label="性别"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="source"
          label="籍贯"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="联系电话"
        >
          <template slot-scope="scope">
              <span>
                {{scope.row.phone ? scope.row.phone : '-'}}
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
        paddingMy: {
        },
        backHeader:{
          'background': '#f8f8f9',
        },

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
        majorId: '',
        type: "",
        classes: ''
      }
    },
    mounted(){

      // if(parame){
      //   this.source = parame.source
      //   this.seriseId = parame.seriseId
      //   this.majorId = parame.majorId
      //   this.classes = parame.classes
      // }else {
      //   this.seriseId = this.$route.query.seriseId;
      // }
      this.seriseId = this.$route.query.seriseId;
      this.type = this.$route.query.type;
      this.getListData()
    },
    methods:{
      getListData() {
        let that = this;
        let parame = JSON.parse(this.$route.query.parame)
        // console.log(44,parame);
        let obj ={
          keywords: '',
          seriseId: parame.seriseId,
          majorId: parame.majorId,
          pageNum: this.indexPage.current,
          pageSize: this.indexPage.size,

        };
        // 如果有type: 表示从其他明细 跳转学生画像；
        if (parame.type) { obj.type = parame.type};

        that.$Get("/admin/teachDrilling/getStudenPageList", obj, data => {
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
      majorPortrayal(row){
        // console.log(11,row)
        // this.$router.push({path: '/student', query: {username: row.username,type:'student'}})
        let  obj={
          code:row.username,
          type:'student',
          // type:'ledDriver',
        }
         this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}})

      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./school/school.less");
</style>

