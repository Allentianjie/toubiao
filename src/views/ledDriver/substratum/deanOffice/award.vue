<template>
  <div class="mojorTbale">
    <!--搜索-->
    <div class="searchBox" style="min-height: 46px;">
      <el-input size="small"
                v-model="indexPage.keywords"
                placeholder="请输入内容"
                style="width: 200px;"
                clearable
                @change="getListData"
      ></el-input>
      <span class="goBack" @click="$router.go(-1)">返回上级</span>
    </div>
    <!--表格数据-->
    <div class="TableDivTwo" style="height: calc(100% - 96px)">
      <el-table
        :data="table.dataList"
        stripe
        height="100%"
        :cell-style="paddingMy"
        :header-cell-style="backHeader"
        style="min-width: 100%; min-height: 100%"
      >
        <el-table-column
          show-overflow-tooltip
          v-for="item in table.title"
          :key="item.name"
          :label="item.name"
          :min-width="item.width"
          :align="item.align"
        >
          <template slot-scope="scope">
            <a v-if="item.clickTip === '1'" @click="jumpPortrait(item,scope.row)">
              {{ scope.row[item.clickTip] }}{{ scope.row[item.prop] }}
            </a>
            <span v-else>{{ scope.row[item.prop] }}</span>
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
    name: "majorTable",
    data(){
      return {
        paddingMy: {},
        backHeader: {
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
        coursename: "",
        teacherName: "",
        ident: {
          id: '',
          seriseId: '',
          type: ''
        },
        table: {
          title: [],
          dataList: [],
          year: ""
        },
        tableList: [],
        seriseId: "",
        type: ''
      }
    },
    mounted(){
      this.ident =JSON.parse(this.$route.query.obj)
      // console.log(333,this.ident)
      this.initFn();
      this.getListData();
    },
    methods: {
      /*
      * 根据ident值定义表头和定义年份传参 教务处驾驶舱/校领导驾驶舱中
      * name=>表格label值 prop=>表格prop clickTip=>是否点击0否1是 width=>表列宽度 align=>表列对齐方式
      * jumpType=>跳转类型:teacher老师画像/course课程画像/student学生画像/major专业画像
      * */
      initFn() {
        if (this.ident.type === '科研') {//教务处驾驶舱=>科研成果获奖数
          this.ident.id = '263 '
          this.table.title = [
            {name: "用户名", prop: "userId", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
            {name: "姓名", prop: "userName", clickTip: "1", width: "", align: "center", jumpType: "teacher"},
            {name: "科研成果获奖", prop: "name", clickTip: "0", width: "230", align: "center", jumpType: "teacher"}
          ];
          this.table.year = "2018"
        } else if (this.ident.type === '论文') { //教务处驾驶舱=>论文发表量
          this.ident.id = '90'
          this.table.title = [
            {name: "用户名", prop: "userId", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
            {name: "姓名", prop: "userName", clickTip: "1", width: "", align: "center", jumpType: "teacher"},
            {name: "发表论文", prop: "name", clickTip: "0", width: "230", align: "center", jumpType: "teacher"}
          ];
          this.table.year = "2018"
        }else if (this.ident == 23) {//校领导驾驶舱=>学校概况=>固定资产
          this.table.title = [
            {name: "固定资产", prop: "name", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
            {name: "金额", prop: "name3", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
          ];
          this.table.year = ""
        } else if (this.ident == 24) {//校领导驾驶舱=>学校概况=>教学、科研仪器设备资产
          this.table.title = [
            {name: "资产", prop: "name", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
            {name: "金额", prop: "name3", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
          ];
          this.table.year = ""
        }else if (this.ident == 18) {//校领导驾驶舱=>学校概况=>馆藏图书资料
//          this.table.title = [
//            {name: "教室", prop: "name", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
//            {name: "座位数", prop: "name2", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
//          ];
          this.table.year = ""
        } else if (this.ident == 22) {//校领导驾驶舱=>学校概况=>计算机数量
          this.table.title = [
            {name: "计算机品牌", prop: "name", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
            {name: "计算机类型", prop: "name2", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
            {name: "计算机金额", prop: "name3", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
          ];
          this.table.year = ""
        } else if (this.ident == 343) {//校领导驾驶舱=>学校概况=>学校面积
//          this.table.title = [
//            {name: "资产", prop: "name", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
//            {name: "金额", prop: "name3", clickTip: "0", width: "", align: "center", jumpType: "teacher"},
//          ];
          this.table.year = ""
        }
      },
      //获取详情列表
      getListData() {
        let that = this
        let obj = {
          // coursename: this.coursename,
          // teacherName: this.teacherName,
          ident: this.ident.id,
          ident: this.ident.id,
          keywords: this.indexPage.keywords,
          seriseId: this.ident.seriseId,
          current: this.indexPage.current,
          size: this.indexPage.size,
          year: this.table.year
        }
        that.$Get("/admin/teachOffice/theoryperiod/page", obj, data => {
          // console.log(999,data)
          that.indexPage.total = parseInt(data.data.total);
          that.table.dataList = data.data.records
        })
      },
      //跳转对应画像
      jumpPortrait(item, scope) {
        let obj = {
          code: scope.userId,
          type: item.jumpType,
        }
        //校领导驾驶舱课堂活跃度和作业完成率的判断,因为它们学生画像和课程画像都要跳转
        if (this.ident == 365 || this.ident == 371) {
          if (item.jumpType == "course") {
            obj.code = scope.name
          }
        }
        this.$router.push({path: '/portrait', query: {obj: obj}})
      },
      // 分页任务查看
      changetaskPage(val) {
        this.indexPage.current = val;
        this.getListData();
        //这里请求表格接口
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./../tableSubordinate.less");
</style>
