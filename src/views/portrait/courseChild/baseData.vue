<template>
  <div class="base">
    <el-row>
      <el-col :span="5">
        <div class="headerImg">
          <img src="../../../assets/images/kecheng2.jpg" alt="">
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3>{{ baselist.name }}</h3>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">名称</span><span class="text">{{ baselist.name }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">课程代码</span><span class="text">{{ baselist.coursecode }}</span>
          </div>
          <div class="content-row">
            <el-button type="primary" @click="boxShowFn()" size="small">{{ name }}</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3></h3>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">学分</span><span class="text">{{ baselist.credit }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">学时</span><span class="text">{{ baselist.period }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3></h3>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">地址</span><span class="text">{{ baselist.nation }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">时间</span><span class="text">{{ baselist.dormitory }}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 课程列表切换 -->
    <el-dialog
      title="课程列表"
      width="800px"
      class="jianzhi-dialog-box"
      :custom-class="box.size"
      :append-to-body="true"
      :fullscreen="true"
      :lock-scroll="false"
      :visible.sync="box.show">
      <div class="box-body">
        <div class="box-title">
          <el-input size="small" v-model="table.coursename" placeholder="请输入内容" style="width: 200px;"></el-input>
          <el-button type="primary" @click="getListFn()" size="small">查找</el-button>
        </div>
        <div class="box-con">
          <el-table
          :data="table.data"
          height="100%"
          style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column prop="coursecode" label="课程编号">
            </el-table-column>
            <el-table-column label="课程名">
              <template slot-scope="scope">
                <a @click="getNewInfo(scope.row)">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="box-foot">
          <el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="table.current"
          :page-size="table.size" layout="total, prev, pager, next, jumper" :total="table.total">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "baseData",
    props:  { baselist: Object },
    data() {
      return {
        name: "+ 选择课程",
        box: {
          show: false,
          data: [],
          size: "w50 h80"
        },
        value: '',
        table: {
          data: [],
          size: 10,
          current: 1,
          total: 0,
          coursename: null,
        }
      }
    },
    mounted() { },
    methods: {
      // 显示弹框
      boxShowFn() {
        this.table.current = 1;
        this.box.show = true;
        this.getListFn();
      },

      // 获取表格数据 
      getListFn() {
        let param = {
          current: this.table.current,
          size: this.table.size,
          coursename: this.table.coursename
        };
        let that = this;
        that.table.data = [];
        that.$Get("/portrait/schoolPortrait/course/page", param, function (res) {
          if (res.code === 0) {
            that.table.data = res.data.records;
            that.table.total = res.data.total*1;
          }
        });
      },

      // 选中某个专业,请求新数据详情
      getNewInfo(data) {
        this.$parent.getData({ coursecode: data.coursecode, year: "" });
        this.box.show = false;
      },

      // 翻页
      changePage(num) {
        this.table.current = num;
        this.getListFn();
      },
      changeSize(size) {
        this.table.size = size;
        this.getListFn();
      }
    }

  }
</script>

<style lang="less" scoped>
  .base {
    width: 100%;
    height: 100%;
  }

  .el-row {
    height: 100%;
  }

  .el-col {
    height: 100%;
  }

  .content {
    text-align: left;
    margin: 0 5%;
    width: 90%;
    height: 100%;
    /*background: #acd1d8;*/
    padding: 10% 0;
    >h3{
      display: inline-block;
      height: 50px;
      font-weight: bold;
      font-size: 25px;
    }
  }

  .content-row {
    display: flex;
    align-items: center;
    vertical-align: center;
    padding: 10px 0;
    >img{
      width: 16px;
      height: 18px;
    }
    .title {
      padding-left: 10px;
      font-size: 16px;
    }

    .text {
      padding-left: 10px;
      font-size: 14px;
      color: #a8a8a8;
    }
  }

  .headerImg {
    width: 100%;
    height: 100%;
    /*background: #347ce8;*/
    padding: 12% 22%;

    > img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;


      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
      -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
      -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;

    }
  }
</style>
