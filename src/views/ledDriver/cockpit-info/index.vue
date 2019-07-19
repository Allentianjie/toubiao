<template>
  <div class="mojorTbale">
    <div class="info">
      <div class="info-head">
        <button type="primary" ghost @click="$router.back(-1)">返回上级</button>
      </div>
      <div class="info-body">
        <el-table
          :data="table.data"
          stripe
          height="100%"
          :cell-style ="paddingMy"
          :header-cell-style="backHeader"
          style="min-width: 100%; min-height: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column v-for="item in table.title" :key="item.name" :label="item.name">
            <template slot-scope="scope">
              <span v-if=" item.boo === '1' "><a @click="goPortrait(item.router,scope.row)" style="width: 100%;">{{ scope.row[item.prop] }}</a></span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info-foot" style="text-align:right;padding: 5px 15px;background: #fff">
        <Page
          :total="param.total"
          :showTotal=true
          :current="param.pageNum"
          :page-size="param.pageSize"
          @on-change="changetaskPage"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "cockpitInfo",
  data(){
    return{
      info: null,
      param: {
        type: "0", // 类型
        name: "", // 模糊搜索
        year: "", // 年份
        pageSize: 10, // 每页多少条
        pageNum: 1, // 第几页
        totlo: 0,  // 总页数
        seriseId: "", // 系部id
        deptCode: "", // 系部id
        url: "" // 接口地址
      },
      table: {
        title: [],
        data: []
      },
      paddingMy: {
      },
      backHeader:{
        'background': '#f8f8f9',
      },
    }
  },
  created(){},
  mounted(){
    this.initFn();
  },
  methods:{
    //
    // 初始化
    initFn() {
      // 获取传过来的信息；tableName: 用来判断定义表头；url:接口地址；id:数据id
      // 根据传过来的参数，请求列表 getListFn();
      this.info = this.$route.query;

      this.param.seriseId = this.info.id;
      this.param.deptCode = this.info.id;
      this.param.url = this.info.url;
      // 判断处理表头
      // boo  1:可点击； 0：不可点击
      if ( this.info.name === "专业数量" ) {
        this.table.title = [
          { name: "专业代码", prop: "code", boo: "0" },
          { name: "专业名称", prop: "name", boo: "1", router: "major" },
          { name: "年制", prop: "year", boo: "0" },
          { name: "学生人数", prop: "value", boo: "0" }
        ];
      } else if ( this.info.name === "系部报到率" ){
        this.table.title = [
          { name: "专业代码", prop: "code", boo: "0" },
          { name: "专业名称", prop: "name", boo: "0" },
          { name: "报到率", prop: "value", boo: "0" }
        ];
      } else if ( this.info.name === "科研成果获奖" ){
        this.table.title = [
          { name: "奖项名称", prop: "name", boo: "0" },
          { name: "用户名", prop: "userId", boo: "0" },
          { name: "用户姓名", prop: "userName", boo: "1", router: "teacher" },
          { name: "年份", prop: "year", boo: "0" }
        ];
      } else if ( this.info.name === "课题申报立项" ){
        this.table.title = [
          { name: "申报、立项名称", prop: "name", boo: "0" },
          { name: "用户名", prop: "userId", boo: "0" },
          { name: "用户姓名", prop: "userName", boo: "1", router: "teacher" },
          { name: "年份", prop: "year", boo: "0" }
        ];
      } else if ( this.info.name === "论文发表数量" ){
        this.table.title = [
          { name: "职工号", prop: "userId", boo: "0" },
          { name: "登记人", prop: "name", boo: "1", router: "teacher"},
          { name: "标题", prop: "title", boo: "0" },
          { name: "级别", prop: "field2", boo: "0" },
          { name: "登记日期", prop: "field4", boo: "0" },
          { name: "成员", prop: "field5", boo: "0" },
          { name: "年份", prop: "year", boo: "0" },
          { name: "其他信息", prop: "field3", boo: "0" }
        ];
      } else if ( this.info.name === "系部就业率" ){
        this.table.title = [
          { name: "专业代码", prop: "code", boo: "0" },
          { name: "专业名称", prop: "name", boo: "0" },
          { name: "就业率", prop: "value", boo: "0" }
        ];
      }

      // 获取列表方法
      this.getListFn();
    },

    // 获取数据列表
    getListFn() {
      let obj = {};
      let { type, year, pageSize, pageNum, seriseId, deptCode } = this.param;

      // 判断 传入的参数
      if ( this.info.name === "专业数量" ) {
        obj = { type, year, pageSize, pageNum, seriseId };
      } else {
        obj = { type, year, pageSize, pageNum, deptCode };
      }

      this.$Get(this.param.url, obj, res => {
        this.table.data = [];
        if (res.code === 0) {
          let data = res.data;
          this.param.total= data.total*1;

          if (data.data && data.data.length > 0) {
            if ( this.info.name === "专业数量" ) {
              for ( let i = 0; i < data.data.length; i++ ) {
                this.table.data.push({ name: data.data[i].name, code: data.data[i].majorcode, year: data.data[i].grade, value: data.data[i].studentnum });
              }
            } else if ( this.info.name === "系部报到率" || this.info.name === "系部就业率" ) {
              for ( let i = 0; i < data.data.length; i++ ) {
                this.table.data.push({ name: data.data[i].dataName, code: data.data[i].deptCode, value: data.data[i].dataValue });
              }
            } else if ( this.info.name === "科研成果获奖" || this.info.name === "课题申报立项" ) {
              for ( let i = 0; i < data.data.length; i++ ) {
                this.table.data.push({ name: data.data[i].field1, userId: data.data[i].correId, userName: data.data[i].correName, year: data.data[i].dimYear });
              }
            } else if ( this.info.name === "论文发表数量" ) {
              for ( let i = 0; i < data.data.length; i++ ) {
                this.table.data.push({ userId: data.data[i].correId, name: data.data[i].correName, title: data.data[i].field1, field2: data.data[i].field2, field3: data.data[i].field3, field4: data.data[i].field4, field5: data.data[i].field5, year: data.data[i].dimYear });
              }
            }
          }

        } else {
          this.table.data = [];
        }
      })
    },

    // 跳转去画像
    goPortrait(router, data) {
      let  obj = { code: data.code,type: router };

      if ( router === "teacher" ) { obj.code = data.userId; };
      this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}});
    },

    // 翻页
    changetaskPage(val) {
      this.param.pageNum = val;
      this.getListFn();
    }

  }
}
</script>

<style lang="less" scoped>
  @import url("../substratum/tableSubordinate.less");
  .mojorTbale {
    overflow: hidden;
    .info {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #fff;

      .info-head, .info-foot {
        height: 48px;
      }

      .info-head {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20px;

        button {
          color: #57a3f3;
          border: 1px solid #57a3f3;
          padding: 4px 15px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 12px;
          height: 32px;
          background: #fff;

          &:hover {
            color: #4a8df3;
          }
        }
      }

      .info-body {
        flex: 1;
      }
    }

  }
</style>
