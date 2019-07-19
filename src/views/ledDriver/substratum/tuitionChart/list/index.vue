1<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath">
        <el-input size="small"
                  v-model="indexPage.keywords"
                  placeholder="请输入姓名进行搜索"
                  style="width: 200px;"
                  clearable
        ></el-input>
        <!-- <el-input size="small"
                  v-model="indexPage.keywords"
                  placeholder="请输入内容"
                  style="width: 200px;"
                  clearable
                  @change="getListData(deptCode)"
        ></el-input> -->
        <el-button type="primary" @click="searchFn(deptCode)" size="small">查找</el-button>
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
        style="min-width: 100%; min-height: 100%;"
      >
        <el-table-column
          align="center"
          prop="userId"
          label="学号"
          min-width="100"
        >
        </el-table-column>
        <el-table-column  min-width="110" show-overflow-tooltip align="center" prop="userName" label="学生姓名">
          <template slot-scope="scope">
              <span @click="majorPortrayal(scope.row)" style="color:#2d8cf0;cursor: pointer">
                {{scope.row.userName}}
              </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="deptId"
          label="班号"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="本年应收"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name2"
          label="本年已交"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name3"
          label="本年欠款"
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
    name: "",
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
        tableList:[],
        source: '',
        seriseId: "",
        type: "",
        deptCode:"",
      }
    },
    created(){

    },
    mounted(){
      this.deptCode = this.$route.query.deptCode;
      if (this.deptCode) {
        this.getListData(this.deptCode)
      }
    },
    methods:{
      getListData(deptCode) {
        let that = this;
        let obj ={
          deptCode:deptCode,
          keywords: this.indexPage.keywords,
          current: this.indexPage.current,
          size: this.indexPage.size,
        };
        that.$Get("/admin/subDrillSchcool/getStudentPaymentPageListByDeptCode", obj, data => {
          that.indexPage.total= data.data.total;
          that.tableList = data.data.records;
        })
      },
      // 分页任务查看
      changetaskPage(val) {
        this.indexPage.current = val;
        this.getListData(this.deptCode);
        //这里请求表格接口
      },

      // 搜索
      searchFn (data) {
        this.indexPage.current = 1;
        this.getListData(data);
      },

      // 点击专业名字跳转画像
      majorPortrayal(row){
        let  obj={
          code:row.userId,
          type:'student',
        };
        this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}})
      },
    }
  }
</script>

<style lang="less" scoped>
  html,body {
    overflow: hidden;
  }
  .twoChart{
    background: #F0F0F0;
    padding:1.3% 1.2%;
    overflow-x: hidden;
    overflow-y: auto;
    .topPath{
      display: flex;
      background: #fff;
      border-radius: 6px;
      height: 9%;
      padding-right: 4%;
      //border-bottom: 1px solid rgba(220, 220, 220, 0.7);
      .myPath{
        //border: 1px solid blue;
        font-size: 0.2rem;
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 3%;
      }
      .btnReturn{
        //border: 1px solid blue;
        //flex: 0 0 20%;
        display: flex;
        align-items: center;
        //justify-content:flex-start ;
        text-align: right;

      }
    }
    .bottomChar{
      height: 500px;
      margin-bottom: 30px;
      .topChar,.bottomChar{
        height:calc(80%);
        background: #fff;
        margin-top: 1%;
        border-radius: 6px;
        >.char{
          height:calc(100% - 30px);
          display: flex;
          .charCon {
            flex: 5;
            height: 400px;
            p {
              line-height: 40px;
              padding: 0 10px;
              color: #ed8d04;
              color: #09eceb;
              color: #00d802;
            }
          }
          .charL {
            margin-right: 20px;
          }
          .charR {

          }

        }
      }
      .titleDiv{
        height: 30px;
        display: flex;
        align-items: flex-end;
        color: #555;
        padding-left: 1.5%;
        h3{
          text-align: left;
          font-size: 0.21rem;
        }
        h4{
          font-size: 0.21rem;
          margin-left: 20px;

        }
      }

      //.bottomChar{
      //  height: 50%;
      //  border: 1px solid blue;
      //}
    }
  }
  .fourTable{
    height: 100%;
    padding: 10px;
    .M_search{
      background: #fff;
      height: 48px;
      padding-top: 8px;
      padding-left: 20px;
      border-left: 1px solid #dcdcc2;
      border-right: 1px solid #dcdcc2;
      display: flex;
      padding-right: 4%;
      .myPath{
        text-align: left;
        flex: 1;
      }
    }
    .tableDiv{
      //margin-top: 1%;
      height: calc(100% - 48px - 44px);
    }
  }



</style>


