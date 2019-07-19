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
              <p>班级：{{ detail.deptName }}</p>
            </div>
            <div class="con-item">
              <div class="item" v-for="item in info.data" :key="item.id">
              <div class="item-con">
                  <div v-for="v in item.child" :key="v.id">
                    <p>{{ v.name }}</p>
                    <p v-if="v.value !== '' && v.value !== '0'"><span>{{ v.value }}</span>{{ v.unit }}</p>
                    <p v-else><span>暂无数据</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layer">
          <div class="title"><i></i><span>学习情况</span></div>
          <div class="con">
            <div class="item" v-for="item in study.data" :key="item.id">
              <div class="item-con">
                <div v-for="v in item.child" :key="v.id">
                  <p>{{ v.name }}</p>
                  <p v-if="v.value !== ''"><span>{{ v.value }}</span>{{ v.unit }}</p>
                  <p v-else><span>暂无数据</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layer">
          <div class="title"><i></i><span>其他</span></div>
          <div class="con">
            <div class="item" v-for="item in other.data" :key="item.id">
              <div class="item-con">
                <div v-for="v in item.child" :key="v.id">
                  <p>{{ v.name }}</p>
                  <p v-if="v.value !== ''"><span>{{ v.value }}</span>{{ v.unit }}</p>
                  <p v-else><span>暂无数据</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        userInfo: null, // 账户信息
        detail: { // 账户明细
          name: "",
          deptName: "",
          sex: ""
        },
        info: {  // 顶部item项
          data: []
        },
        study: {  // 学习情况
          data: []
        },
        other: {  // 其他
          data: []
        },
        list: {
          data: []
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

        // 顶部项
        this.info.data = [
          { id: "1", child: 
            [ { id: "11", name: "总成绩", value: "正在请求中...", unit: "" } ]
          },
          { id: "2", child: 
            [ { id: "21", name: "课程平均分", value: "正在请求中...", unit: "" } ]
          },
          { id: "3", child: 
            [ { id: "31", name: "累计学分", value: "正在请求中...", unit: "" } ]
          },
          { id: "4", child: 
            [ { id: "41", name: "重修次数", value: "正在请求中...", unit: "" } ]
          }
        ];

        this.study.data = [
          { id: "5", child: 
            [
              { id: "51", name: "学生对教学质量评价平均分", value: "正在请求中...", unit: "" }
            ]
          },
          { id: "6", child: 
            [
              { id: "61", name: "图书借阅次数", value: "正在请求中...", unit: "" }
            ]
          },
          { id: "7", child: 
            [
              { id: "71", name: "迟到早退次数", value: "正在请求中...", unit: "" }
            ]
          },
          { id: "8", child: 
            [
              { id: "81", name: "学生晚归未归次数", value: "正在请求中...", unit: "" }
            ]
          }
        ];
        this.other.data = [
          { id: "1", child: 
            [
              { id: "11", name: "获奖学金金额", value: "正在请求中...", unit: "" }
            ]
          },
          { id: "2", child: 
            [
              { id: "21", name: "获奖学金次数", value: "正在请求中...", unit: "" }
            ]
          },
          { id: "3", child: 
            [
              { id: "31", name: "一卡通充值累计金额", value: "正在请求中...", unit: "" }
            ]
          },
          { id: "4", child: 
            [
              { id: "41", name: "一卡通消费次数", value: "正在请求中...", unit: "" }
            ]
          },
          { id: "5", child: 
            [
              { id: "51", name: "学生获得助学金次数", value: "正在请求中...", unit: "" }
            ]
          },
          { id: "6", child: 
            [
              { id: "61", name: "学生获得助学金累计金额", value: "正在请求中...", unit: "" }
            ]
          }
        ];

        this.getStudentInfo(this.userInfo.username);

        this.getStudentAverageScore(this.userInfo.username);  // 1
        this.getStudentRebuild(this.userInfo.username);  // 3
        this.getStudentTotalScore(this.userInfo.username);  // 6
        this.getStudentCredit(this.userInfo.username);  // 7

        this.getStudentAvgPGDF(this.userInfo.username);  // 10
        this.getStudentLoanCount(this.userInfo.username);  // 11
        this.getStudentLateEarly(this.userInfo.username);  // 2
        this.getStudentPenaltyCount(this.userInfo.username);  // 12

        this.getStudentScholarshipMoney(this.userInfo.username);  // 4
        this.getStudentScholarshipCount(this.userInfo.username);  // 5
        this.getStudentCardTotalMoney(this.userInfo.username);  // 8
        this.getStudentCardBuyCount(this.userInfo.username);  // 9
        this.getStudentSidyCount(this.userInfo.username);  // 13
        this.getStudentSidyPrice(this.userInfo.username);  // 14
      },

      // 0、 查询学生信息
      getStudentInfo(param) {
        let that = this;
        that.$Get("/portrait/teacherPicture/getUserInfo/" + param, {}, function(res) {
          let data = res.data;
          that.detail.name = data.name;
          that.detail.deptName = data.deptName;
          that.detail.sex = data.sex;
        });
      },

      // 1、 查询学生 --- 成绩平均分
      getStudentAverageScore(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectAvgScore/" + param, {}, function(res) {
          let data = res.data;
          that.info.data[1].child[0].value = data.value;
          that.info.data[1].child[0].unit = data.unit;
        });
      },

      // 2、 查询学生 --- 迟到早退次数
      getStudentLateEarly(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectLateCount/" + param, {}, function(res) {
          let data = res.data;
          that.study.data[2].child[0].value = data.value;
          that.study.data[2].child[0].unit = data.unit;
        });
      },

      // 3、 查询学生 --- 重修次数
      getStudentRebuild(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectRetakeCount/" + param, {}, function(res) {
          let data = res.data;
          that.info.data[3].child[0].value = data.value;
          that.info.data[3].child[0].unit = data.unit;
        });
      },

      // 4、 查询学生 --- 获奖学金金额
      getStudentScholarshipMoney(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectScholarshipAmount/" + param, {}, function(res) {
          let data = res.data;
          that.other.data[0].child[0].value = data.value;
          that.other.data[0].child[0].unit = data.unit;
        });
      },

      // 5、 查询学生 --- 获奖学金次数
      getStudentScholarshipCount(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectScholarshipCount/" + param, {}, function(res) {
          let data = res.data;
          that.other.data[1].child[0].value = data.value;
          that.other.data[1].child[0].unit = data.unit;
        });
      },

      // 6、 查询学生 --- 考试总成绩
      getStudentTotalScore(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectTermScore/" + param, {}, function(res) {
          let data = res.data;
          that.info.data[0].child[0].value = data.value;
          that.info.data[0].child[0].unit = data.unit;
        });
      },

      // 7、 查询学生 --- 累计学分
      getStudentCredit(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectTotalXf/" + param, {}, function(res) {
          let data = res.data;
          that.info.data[2].child[0].value = data.value;
          that.info.data[2].child[0].unit = data.unit;
        });
      },

      // 8、 查询学生 --- 一卡通充值累计金额
      getStudentCardTotalMoney(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectYKTRCHRGAmount/" + param, {}, function(res) {
          let data = res.data;
          that.other.data[2].child[0].value = data.value;
          that.other.data[2].child[0].unit = data.unit;
        });
      },

      // 9、 查询学生 --- 一卡通消费次数
      getStudentCardBuyCount(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectYKTTRSCTCount/" + param, {}, function(res) {
          let data = res.data;
          that.other.data[3].child[0].value = data.value;
          that.other.data[3].child[0].unit = data.unit;
        });
      },

      // 10、 查询学生 --- 学生对教学质量评价平均分
      getStudentAvgPGDF(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectAvgPGDF/" + param, {}, function(res) {
          let data = res.data;
          that.study.data[0].child[0].value = data.value;
          that.study.data[0].child[0].unit = data.unit;
        });
      },

      // 11、 查询学生 --- 借阅次数
      getStudentLoanCount(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectLoanCount/" + param, {}, function(res) {
          let data = res.data;
          that.study.data[1].child[0].value = data.value;
          that.study.data[1].child[0].unit = data.unit;
        });
      },

      // 12、 查询学生 --- 学生晚归未归次数
      getStudentPenaltyCount(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectPenaltyCount/" + param, {}, function(res) {
          let data = res.data;
          that.study.data[3].child[0].value = data.value;
          that.study.data[3].child[0].unit = data.unit;
        });
      },

      // 13、 查询学生 --- 学生获得助学金次数
      getStudentSidyCount(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectSubsidyCount/" + param, {}, function(res) {
          let data = res.data;
          that.other.data[4].child[0].value = data.value;
          that.other.data[4].child[0].unit = data.unit;
        });
      },

      // 14、 查询学生 --- 学生获得助学金累计金额
      getStudentSidyPrice(param) {
        let that = this;
        that.$Get("/portrait/studentPicture/selectSubsidyPrice/" + param, {}, function(res) {
          let data = res.data;
          that.other.data[5].child[0].value = data.value;
          that.other.data[5].child[0].unit = data.unit;
        });
      }

    }
  };
</script>
