1<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath">
      <!--  <el-input size="small"
                  v-model="indexPage.keywords"
                  placeholder="请输入内容"
                  style="width: 200px;"
                  clearable
                  @change="getListData"
        &gt;</el-input>
        <el-button type="primary" @click="getListData()" size="small">查找</el-button>-->
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
        style="min-width: 100%; min-height: 100%">

        <el-table-column
          type="index"
          width="50">
        </el-table-column>

        <el-table-column
          align="center"
          prop="name"
          label="名字"
          min-width="110"
        >
        </el-table-column>
      </el-table>
    </div>
    <!--<div style="text-align:right;padding: 5px 15px;background: #fff">
        <Page
          :total="indexPage.total"
          :showTotal="indexPage.showTotal"
          :current="indexPage.current"
          :page-size="indexPage.size"
          @on-change="changetaskPage"
        ></Page>
      </div>-->
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

      }
    },
    mounted(){
      let name = this.$route.query.name;

      this.getListData(name)
    },
    methods:{
      getListData(name) {
        console.log(55,name)
        let that = this;
        // dmin/schoolpartrait/course/pag
        if(name === '办学荣誉'){
          that.$Get("/admin/subDrillSchcool/getSchoolHornor", {}, data => {
            that.tableList = data.data
          })
        }else {
          that.$Get("/admin/subDrillSchcool/getSchoolPracticeBase", {}, data => {
            that.tableList = data.data
          })
        }

      },
      // 分页任务查看
      changetaskPage(val) {
        this.indexPage.current = val;
        this.getListData();
        //这里请求表格接口
      },
    }
  }
</script>

<style lang="less" scoped>
  @import url("./school/school.less");
</style>
