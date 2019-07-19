1<template>
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
    name: "studentTable",
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
        source: '',
        seriseId: "",
        type: "",
        majorId: ''
      }
    },
    mounted(){
      // this.source = this.$route.query.source;
      // this.seriseId = this.$route.query.seriseId;
      // this.majorId =
      this.type = this.$route.query.type;
      console.log('---',this.$route.query.parame)
      this.getListData()
    },
    methods:{
      getListData() {
        let that = this;
        let parame = this.$route.query.parame
        let obj ={
          seriseId: parame.seriseId,
          type:this.type,
          source: parame.source ,
          majorId: parame.majorId ,
          classes: parame.classes,
          pageNum: this.indexPage.current,
          pageSize: this.indexPage.size,

        };
        //  teachDrilling/getStudenPageList
        that.$Get("/portrait/teachDrilling/getStudenPageList", obj, data => {
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
         this.$router.push({path: '/portrait', query: {obj:obj}})

      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./../tableSubordinate.less");
</style>

