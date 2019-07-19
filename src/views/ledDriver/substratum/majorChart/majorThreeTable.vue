<template>
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
        <Button type="primary" ghost @click="$router.back(-1)">返回上级</Button>
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
        <el-table-column  min-width="150" show-overflow-tooltip align="center" prop="name" label="专业名字">
          <template slot-scope="scope">
              <span @click="majorPortrayal(scope.row)" style="color:#2d8cf0;cursor: pointer">
                {{scope.row.name}}
              </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="majorcode"
          label="专业代码"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="educational"
          label="年制"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="studentnum"
          label="学生人数"
          min-width="120"
        >
          <template slot-scope="scope">
              <span @click="studentClick(scope.row)"  style="color:#2d8cf0;cursor: pointer">
                {{scope.row.studentnum}} 人
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
          showTotal: true,
        },
        tableList:[],
        seriseId: "",
        type: ''
      }
    },
    mounted(){
      let data =JSON.parse(this.$route.query.obj)
      this.getListData(data)
    },
    methods:{
      // 点击学生下钻
      studentClick(row){
        let obj ={
          majorId: row.majorcode,
          seriseId: row.seriseid,
          type: "0"
        }
        this.$router.push({path: '/studentTable', query: {parame: JSON.stringify(obj)}})
      },
      getListData(o) {
        // console.log(55,o)
        let that = this
        let obj ={
          type: o.type,
          seriseId: o.seriseId,
          pageNum: this.indexPage.current,
          pageSize: this.indexPage.size,
          keywords: this.indexPage.keywords
        }
        that.$Get("/admin/teachDrilling/getMajorPageList", obj, data => {
          that.indexPage.total= data.data.total;
          that.tableList = data.data.data
        })
      },

      // 搜索
      searchFn () {
        let data =JSON.parse(this.$route.query.obj);
        this.indexPage.current = 1;
        this.getListData(data);
      },

      // 分页任务查看
      changetaskPage(val) {
        let data =JSON.parse(this.$route.query.obj);
        this.indexPage.current = val;
        this.getListData(data);
        //这里请求表格接口
      },
      // 点击名字跳转画像
      majorPortrayal(row){
        let  obj={
          code:row.majorcode,
          type:'major',
        }
        this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}})
      },

    }

  }
</script>

<style lang="less" scoped>
  @import url("./../school/school.less");
</style>
