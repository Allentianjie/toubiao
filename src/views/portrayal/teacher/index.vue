<template>
  <div class="portrayal">
    <div class="main-roll">
      <div class="main-body">
        <div class="user-info">
          <div class="user-img">
            <img v-if=" detail.sex === '女' " src="../../../assets/images/portrayal/woman.png">
            <img v-else src="../../../assets/images/portrayal/man.png">
            <span>{{ detail.name }}</span>
          </div>
          <div class="user-con">
            <div class="con-info">
              <p>系部：{{ detail.deptName }}</p>
            </div>
            <div class="con-item">
              <div class="item" v-for="item in result.data" :key="item.id">
              <div class="item-con">
                  <div>
                    <p>{{ item.name }}</p>
                    <p v-if="item.value !== '' && item.value !== '0' && item.value !== null"><span @click="showBox(item)">{{ item.value }}</span>{{ item.unit }}</p>
                    <p v-else><span>暂无数据</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layer" v-if="item.data.length > '4'">
          <div class="title"><i></i><span>其他信息</span></div>
          <div class="con">
            <div class="item" v-for="item in giveClass.data" :key="item.id">
              <div class="item-con">
                <div>
                  <p>{{ item.name }}</p>
                  <p v-if="item.value !== '' && item.value !== '0' && item.value !== null"><span @click="showBox(item)">{{ item.value }}</span>{{ item.unit }}</p>
                  <p v-else><span>暂无数据</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 项目明细弹框 -->
    <el-dialog
      class="jianzhi-dialog-box"
      :title="box.title"
      :visible.sync="box.show"
      :close-on-click-modal="false"
      :custom-class="box.size"
      :append-to-body="true"
      :lock-scroll="false"
      :fullscreen="true"
      :center="true">
      <div class="box-body" v-loading="box.loading" element-loading-background="#fff" element-loading-text="数据正在请求中...">
        <div class="box-con">
          <el-table
            :data="box.data"
            style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column :label="v.label" width="" v-for="v in box.titleArr" :key="v.key">
              <template slot-scope="scope">
                 {{ box.data[scope.$index][v.key] }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="box-foor">
          <el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="box.pageNum"
            :page-sizes="[10]" :page-size="box.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="box.total">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang='less' scoped>
  @import url("./../portrayal.less");
</style>

<script>
  export default {
    data() {
      return{
        loading:false,
        userInfo: null,
        detail: { // 账户明细
          name: "",
          deptName: "",
          sex: ""
        },
        giveClass: {  // 剩余数据做内容项
          data: []
        },
        result: {  // 4个数据做顶部项
          data: []
        },
        item: { // 所有项
          data: []
        },
        box: {
          loading: false,
          show: false,
          size: "",
          pageNum: 1,
          pageSize: 10,
          title: "",
          total: 0,
          data: [],
          titleArr: []
        }
      }
    },
    watch: {
    },
    created() {
    },
    mounted() {
      this.initFn();
    },
    methods: {
      // 初始化
      initFn() {
        // 获取用户信息
        this.userInfo = this.$store.state.userInfo

        this.getTeacherInfo(this.userInfo.username);  // 用户明细
        this.getTeacherPayoffTotal(this.userInfo.username); // 统计
      },

      // 通过用户编号获取基本信息
      getTeacherInfo(userCode) {
        let that = this;
        that.$Get("/portrait/teacherPicture/getUserInfo/" + userCode, {}, function(res) {
          let data = res.data;
          that.detail.name = data.name;
          that.detail.deptName = data.deptName;
          that.detail.sex = data.sex;
        });
      },

      // 通过用户编号当前教师的统计数据
      getTeacherPayoffTotal(userCode) {
        let that = this;
        that.$Get("/portrait/teacherPicture/getScientificPayoffTotal/", { userCode: userCode }, function(res) {
          let data = res.data;

          that.item.data = data;
          for (let i in data) {
            if ( data[i].title !== "" ) {
              if ( i < "4") { // 前面4条做 顶部展示
                that.result.data.push({ id: i, name: data[i].title, value: data[i].field1, unit: data[i].field2 });
              } else {  // 其他做内容展示
                that.giveClass.data.push({ id: i, name: data[i].title, value: data[i].field1, unit: data[i].field2 });
              }
            }
          }
        });
      },

      // 通过用户编号和点击的统计数据对应的title查询该统计数据的明细
      getTeacherPayoffs(titleName) {
        let that = this;
        let data = {
          pageNum: that.box.pageNum,
          pageSize: that.box.pageSize,
          title: titleName,
          userCode: that.userInfo.username
        };

        that.$Get("/portrait/teacherPicture/getScientificPayoffs", data, function(res) {
          let data = res.data;
          let listData = data.records;

          // 每次请求的时候,都清除上次的数据
          that.box.titleArr = [];
          that.box.data = [];
          // console.log(data);

          // 总页数
          that.box.total = data.total;
          // 大佬说根据 参数的 title, 判断是否包含下面字段，每个字段是一个模板
          // 1.学生评价得分（分）；2.教学工作量（课时）；3.一卡通教职工充值；4.一卡通教职工消费; 5.其他
          // box.titleArr: 设置动态表格 表头
          // box.data: 动态表格数据
          if ( titleName.indexOf("学生评价得分（分）") != -1 ) {
            // console.log("学生评价得分（分）");
            that.box.titleArr = [ { label: "课程编码", key: "courseId" }, { label: "课程名称", key: "courseName" }, { label: "studentName", key: "studentName" }, { label: "学期", key: "dimTime" }, { label: "评估得分", key: "pgdf" } ];
            for (let i in listData) {
              that.box.data.push({ id: listData[i].id, courseId: listData[i].courseId, courseName: listData[i].courseName, studentName: listData[i].studentName, dimTime: listData[i].dimTime, pgdf: listData[i].pgdf });
            }

          } else if ( titleName.indexOf("教学工作量（课时）") != -1 ) {

            that.box.titleArr = [ { label: "课程名称", key: "courseName" }, { label: "课程学分", key: "courseCrenit" }, { label: "课程学时", key: "courseHour" }, { label: "教室", key: "room" }, { label: "班级人数", key: "classSize" }, { label: "开课学年", key: "schoolYear" }, { label: "开课学期", key: "semester" }];
            for (let i in listData) {
              that.box.data.push({ id: listData[i].id, courseName: listData[i].courseName, courseCrenit: listData[i].courseCrenit, courseHour: listData[i].courseHour, room: listData[i].room, classSize: listData[i].classSize, schoolYear: listData[i].schoolYear, semester: listData[i].semester });
            }

          } else if ( titleName.indexOf("一卡通教职工充值") != -1 ) {
            // console.log("一卡通教职工充值");

            that.box.titleArr = [ { label: "卡号", key: "kh" }, { label: "用户编码", key: "userId" }, { label: "用户标识", key: "userIdent" }, { label: "充值日期", key: "jyrq" }, { label: "充值时间", key: "jysj" }, { label: "充值金额", key: "jyje" } ];
            for (let i in listData) {
              that.box.data.push({ id: listData[i].id, kh: listData[i].kh, userId: listData[i].userId, userIdent: listData[i].userIdent, jyrq: listData[i].jyrq, jysj: listData[i].jysj, jyje: listData[i].jyje });
            }

          } else if ( titleName.indexOf("一卡通教职工消费") != -1 ) {
            // console.log("一卡通教职工消费");

            that.box.titleArr = [ { label: "卡号", key: "kh" }, { label: "用户编码", key: "userId" }, { label: "用户标识", key: "userIdent" }, { label: "消费日期", key: "jyrq" }, { label: "消费时间", key: "jysj" }, { label: "消费金额", key: "jyje" } ];
            for (let i in listData) {
              that.box.data.push({ id: listData[i].id, kh: listData[i].kh, userId: listData[i].userId, userIdent: listData[i].userIdent, jyrq: listData[i].jyrq, jysj: listData[i].jysj, jyje: listData[i].jyje });
            }

          } else {
            // console.log("其他");

            that.box.titleArr = [ { label: "标题", key: "title" }, { label: "数值", key: "field1" }, { label: "所属资源人", key: "correName" }, { label: "明细类型", key: "correType" } ];
            for (let i in listData) {
              that.box.data.push({ id: listData[i].id, title: listData[i].title, field1: listData[i].field1, correName: listData[i].correName, correType: listData[i].correType });
            }
          }

          that.box.loading = false;
        });
      },

      // 显示弹框
      showBox(data) {
        // 设置弹框
        this.box.loading = true;
        this.box.show = true;
        this.box.title = data.name;
        this.box.size = "w80 h90";

        // 每次新弹框初始化值
        // 每当点击一个新的项,都初始化的数据
        this.box.pageNum = 1;
        this.box.pageSize = 10;

        this.getTeacherPayoffs(this.box.title);
      },

      // 翻页
      changePage(num) {
        this.box.pageNum = num;
        this.getTeacherPayoffs(this.box.title);
      },
      changeSize(size) {
        this.box.pageSize = size;
        this.getTeacherPayoffs(this.box.title);
      }

    }
  };
</script>
