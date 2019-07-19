1<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath">
        <!--<el-input size="small"-->
                  <!--v-model="indexPage.keywords"-->
                  <!--placeholder="请输入内容"-->
                  <!--style="width: 200px;"-->
                  <!--clearable-->
                  <!--@change="getListData(deptCode)"-->
        <!--&gt;</el-input>-->
        <!--<el-button type="primary" @click="getListData(deptCode)" size="small">查找</el-button>-->
        教室明细表
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
          prop="correId"
          label="建筑物编号"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="correName"
          label="建筑物"
          min-width="100"
        >
        </el-table-column>
        <el-table-column  min-width="110" show-overflow-tooltip align="center" prop="fieId1" label="教室名称">
          <template slot-scope="scope">
              <span style="color:#2d8cf0;cursor: pointer">
                {{scope.row.field1}}
              </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="field2"
          label="座位数"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="field3"
          label="楼层编号"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="field4"
          label="教室类型代码"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="field5"
          label="教室类型"
          min-width="100"
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
        strToObj:{}
      }
    },
    created(){

    },
    mounted(){
      this.strToObj = JSON.parse(this.$route.query.obj);
      if (this.strToObj) {
        this.name = this.strToObj.titleName;
        this.getListData(this.strToObj)
      }
    },
    methods:{
      getListData(strToObj) {
        let that = this;
        let obj ={
          correId:strToObj.correId,
          field3:strToObj.field3,
          field4:strToObj.field4,
          current: this.indexPage.current,
          size: this.indexPage.size,
        };
        that.$Get("/admin/subDrillClasses/getClassesDetailPageList", obj, data => {
          that.indexPage.total= data.data.total;
          that.tableList = data.data.records;
        })
      },
      // 分页任务查看
      changetaskPage(val) {
        this.indexPage.current = val;
        this.getListData(this.strToObj);
        //这里请求表格接口
      },
      // 点击专业名字跳转画像
      majorPortrayal(row){
        let  obj={
          code:row.username,
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


