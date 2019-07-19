<template>
  <div class="portrait">

    <!-- 课程列表切换 -->
    <el-dialog
      :title="indicatorItem.item.name"
      width="800px"
      class="jianzhi-dialog-box"
      :custom-class="box.size"
      :append-to-body="true"
      :fullscreen="true"
      :lock-scroll="false"
      :visible.sync="indicatorItem.show">
      <div class="box-body">
        <div class="box-title" v-if="detaulsData.data">
          <el-input size="small"
                    v-model="search"
                    placeholder="请输入内容"
                    style="width: 200px;"
                    @keyup.enter.native="searchFun"
                    @ch></el-input>
          <el-button type="primary" @click="searchFun" size="small">查找</el-button>
        </div>
        <div class="box-con">

          <el-table
            v-if="detaulsData.data"
            :data="searchData.data"
            height="100%"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50"
              label="序号">
            </el-table-column>
            <el-table-column v-for="(item,index) in detaulsData.title"
                             :prop="item.prop"
                             :label="item.title"
                             :key="item.title"
                             :show-overflow-tooltip="true">

            </el-table-column>
          </el-table>
          <div class="divMy" v-else></div>
        </div>

        <!--<div class="box-foot">-->
        <!--<el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="table.current"-->
        <!--:page-size="table.size" layout="total, prev, pager, next, jumper" :total="table.total">-->
        <!--</el-pagination>-->
        <!--</div>-->
      </div>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "portraitDetails",
    props: ["indicatorItem"],
    data() {
      return {
        name: "画像详情",
        search: "",
        searchData: '',
        detaulsData: {},
        box: {
          show: true,
          data: [],
          size: "w80 h80"
        },
        value: '',
        table: {
          data: [],
          size: 10,
          current: 1,
          total: 0,
          coursename: null,
        },
      }
    },
    watch: {
      //监控父组件传入值变化
      indicatorItem: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            this.getDetaulList();
          });
        },
        deep: true
      },
      //监控搜索框空值
      search: {
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            if (newValue == "") {
              this.searchData.data = this.detaulsData.data
            }
          });
        },
        deep: true
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      //搜索
      searchFun: function () {
        var search = this.search;
        if (search) {
          this.searchData.data = this.detaulsData.data.filter(function (product) {
            return Object.keys(product).some(function (key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        } else {
          this.searchData.data = this.detaulsData.data
        }
      },
      // 获取表格数据
      getDetaulList() {
        let that = this;
        this.detaulsData = [];
        this.searchData = [];
        this.search = "";
        let url = "";
        if (this.indicatorItem.flag == 1) {
          url = "portraitDetail/studentPortraitDetail"
        } else if (this.indicatorItem.flag == 2) {
          url = "portraitDetail/teacherPortraitDetail"
        } else if (this.indicatorItem.flag == 3) {
          url = "portraitDetail/majorPortraitDetail"
        } else if (this.indicatorItem.flag == 4) {
          url = "portraitDetail/coursePortraitDetail"
        }
        that.$Get("/portrait/" + url, {id: this.indicatorItem.item.id}, function (res) {
          if (res.code == 0) {
            for (let k in res.data.title) {
              let oldTip = res.data.title[k]
              res.data.title[k] = {
                title: oldTip,
                prop: k
              }
            }


            that.detaulsData =  JSON.parse(JSON.stringify(res.data));
            that.searchData = res.data;
          }
        });
      },
      // 显示弹框
      boxShowFn() {
        this.table.current = 1;
        this.box.show = true;
//        this.getListFn();
      },
      // 选中某个专业,请求新数据详情
      getNewInfo(data) {
        this.$parent.getData(data.coursecode);
        this.box.show = false;
      },

      // 翻页
      changePage(num) {
        this.table.current = num;
//        this.getListFn();
      },
      changeSize(size) {
        this.table.size = size;
//        this.getListFn();
      }
    }

  }
</script>

<style lang="less" scoped>
  .divMy {
    background-image: url("../../../assets/images/wushuju.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 170px;
    height: 100%;
  }

  .portrait {
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
    > h3 {
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
    > img {
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
