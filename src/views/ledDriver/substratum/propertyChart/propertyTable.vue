1<template>
  <div class="fourTable">
    <div class="M_search">
      <div class="myPath">
        <el-input size="small"
                  v-model="indexPage.keywords"
                  placeholder="请输入资产名称"
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
        style="min-width: 100%; min-height: 100%">

        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="correId"
          label="资产编号"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="field1"
          label="资产名称"
          show-overflow-tooltip
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="field2"
          label="分类名称"
          show-overflow-tooltip
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="field3"
          label="总价"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="field5"
          label="入账日期"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="correName"
          label="领用人"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="deptName"
          label="领用部门"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="field4"
          label="使用方向"
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
        tableList: [],
        seriseId: "",
        type: ''
      }
    },
    mounted(){
      // let data = this.$route.query.obj
      this.getListData()
    },
    methods:{
      getListData() {
        let data = this.$route.query.obj
        let that = this;
        let obj ={
          field4: data,
          current: this.indexPage.current,
          size: this.indexPage.size,
          keywords: this.indexPage.keywords
        }
        // dmin/schoolpartrait/course/pag
        that.$Get("/admin/subDrillSchcool/getAssetsUseDetailPageList", obj, data => {
          // console.log(2, data)
          that.indexPage.total=Number(data.data.total)
          that.tableList = data.data.records
            // /schoolpartrait/course/page  majorid
        })
      },

      // 搜索
      searchFn () {
        this.indexPage.current = 1;
        this.getListData();
      },

      // 分页任务查看
      changetaskPage(val) {
        this.indexPage.current = val;
        this.getListData();
        //这里请求表格接口
      },
      // 点击专业名字跳转画像
      coursePortrayal(row){
        // this.$router.push({path: '/course', query: {coursecode: row.coursecode,type:'course'}})
        let  obj={
          code:row.coursecode,
          type:'course',
        }
        this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}})
      },
      // 返回上级按钮
      returnSuperior(){
        // let pathArr = this.$store.state.drillingData
        this.$router.push({path: 'theoryTwoChar', query: {obj: '返回跳转'}});
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./../school/school.less");
</style>
