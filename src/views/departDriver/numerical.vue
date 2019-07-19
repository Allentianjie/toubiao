<template>
  <div id="num">
    <div class="top-left">
      <div class="left-img">
        <h2>{{name}}</h2>
      </div>
    </div>
    <div class="top-right">
      <div class="right-one">
        <div class="tab-item" @click="teachersClick">
          <p class="item-title">教师数量</p>
          <p v-if="departData.teachers" class="item-nun">{{parseInt(departData.teachers)}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.teachers_rank" class="item-ranking">校内排名 {{departData.teachers_rank}}</p>
          <p v-else class="item-ranking">无</p>
          <!--<p class="item-ranking">校内排名 3</p>-->
        </div>
        <div class="tab-item" @click="studentsClick(parseInt(departData.students))">
          <p class="item-title">学生数量</p>
          <p v-if="departData.students" class="item-nun">{{parseInt(departData.students)}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.students_rank" class="item-ranking">校内排名 {{departData.students_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
        <div class="tab-item" @click="openTeacher(3)">
          <p class="item-title">专业数量</p>
          <p v-if="departData.majors" class="item-nun">{{parseInt(departData.majors)}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.course_rank" class="item-ranking">校内排名 {{departData.course_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
        <div class="tab-item" @click="bottomDel(parseInt(departData.course))">
          <p class="item-title">课程数量</p>
          <p v-if="departData.course" class="item-nun">{{parseInt(departData.course)}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.majors_rank" class="item-ranking">校内排名 {{departData.majors_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
        <div class="tab-item" @click="openTeacher(5)">
          <p class="item-title">论文发表数量</p>
          <p v-if="departData.thesisCount" class="item-nun">{{departData.thesisCount}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.thesisCount_rank" class="item-ranking">校内排名 {{departData.thesisCount_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
      </div>
      <div class="right-two">
        <div class="tab-item" @click="theoryClick(departData.theoryperiod)">
          <p class="item-title">理论课课时</p>
          <p v-if="departData.theoryperiod" class="item-nun">{{departData.theoryperiod}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.theoryperiod_rank" class="item-ranking">校内排名 {{departData.theoryperiod_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
        <div class="tab-item" @click="openTeacher(7)">
          <p class="item-title">课题申报立项数</p>
          <p v-if="departData.projects" class="item-nun">{{parseInt(departData.projects)}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.projects_rank" class="item-ranking">校内排名 {{departData.projects_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
        <div class="tab-item" @click="openTeacher(8)">
          <p class="item-title">科研成果获奖数</p>
          <p v-if="departData.achievements" class="item-nun">{{departData.achievements}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.achievements_rank" class="item-ranking">校内排名 {{departData.achievements_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
        <div class="tab-item" @click="openTeacher(9)">
          <p class="item-title">系部报到率</p>
          <p v-if="departData.reachrate" class="item-nun">{{departData.reachrate}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.reachrate_rank" class="item-ranking">校内排名 {{departData.reachrate_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
        <div class="tab-item" @click="openTeacher(10)">
          <p class="item-title">系部就业率</p>
          <p v-if="departData.workrate" class="item-nun">{{departData.workrate}}</p>
          <p v-else class="item-nun">暂无数据</p>
          <p v-if="departData.workrate_rank" class="item-ranking">校内排名 {{departData.workrate_rank}}</p>
          <p v-else class="item-ranking">无</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "numerical",
    data() {
      return {
        code: "",
        name: "",
        targetData: [],
        departData: [],
        seriseId: ''
      }
    },
    mounted() {
      // this.getTargetData();

    },
    created() {
    },
    watch: {},
    methods: {
      //  理论课时 - 钻页面
      theoryClick(val){
        let obj ={
          name: this.name,
          val: val,
          seriseId: this.seriseId,
          type: 'major'
        }
        this.$router.push({path: '/theoryThreeChar', query: {obj: JSON.stringify(obj)}})

      },
      // 教师下钻
      teachersClick(){
        let obj = {
          id: this.code,
          type: 0,
          name:this.name
      }
        this.$router.push({path: "/fourTable", query: {obj: obj}});
      },
      // 学生下钻
      studentsClick(val){
        let  obj ={
          name: this.name,
          val: val,
          id: this.code,
          typeName: '',
          source: ''
        }
        this.$router.push({path: '/stdentThreeChart', query: {obj:  JSON.stringify(obj)}})
      },
      // 课程下钻页面
      bottomDel(val){
        let obj = {
          name: this.name + '课程数量',
          val: val,
          nuit: '门',
          symbol: '',
          id: this.code,
        }
        this.$router.push({path: '/courseThreeChart', query: {obj: JSON.stringify(obj)}})

      },
      openTeacher(val) {
          if (val == 3) {
            let obj = {
              seriseId: this.code,
              type: '0',
            }
            this.$router.push({path: "/majorThreeTable", query: {obj: JSON.stringify(obj)}});
        } else if (val == 5) {
          this.$router.push({path: '/cockpitInfo', query:{id: this.code, name: "论文发表数量", url: "/portrait/deptCockpitDetail/getThesisPageList"}});
        } else if (val == 6) {
          this.$router.push({path: '/courseTable', query: {type: "0", seriseId: this.code}})
        } else if (val == 7) {
          this.$router.push({path: '/cockpitInfo', query:{id: this.code, name: "课题申报立项", url: "/portrait/deptCockpitDetail/getProjectPageList"}});
        } else if (val == 8) {
          this.$router.push({path: '/cockpitInfo', query:{id: this.code, name: "科研成果获奖", url: "/portrait/deptCockpitDetail/getAchievementPageList"}});
        } else if (val == 9) {
          this.$router.push({path: '/cockpitInfo', query:{id: this.code, name: "系部报到率", url: "/portrait/deptCockpitDetail/getReachratePageList"}});
        } else if (val == 10) {
          this.$router.push({path: '/cockpitInfo', query:{id: this.code, name: "系部就业率", url: "/portrait/deptCockpitDetail/getWorkratePageList"}});
        }
      },
      //查询教务处顶部明细
      getDepartData(data) {
        if (data.code) {
          this.code = data.code;
          this.name = data.name;
          this.seriseId = data.id;
          this.$Get("/portrait/serisedepartment/top?deptcode=" + data.code, null, res => {
            if (res.code == 0) {
              this.departData = res.data
            }
          })
        }
      },
      // getTargetData() {
      //   this.$Get("/portrait/statistic/task?deptCode=1060", null, res => {
      //     console.log(res)
      //     if (res.code == 0) {
      //       // this.targetData = res.data
      //     }
      //   })
      // },

    }
  }
</script>

<style lang="less" scoped>
  #num {
    flex: 1;
    display: flex;
    height: 100%;

    .top-left {
      flex: 0 0 20%;
      height: 100%;
      padding: 20px 0 20px 20px;

      .left-img {
        width: 100%;
        height: 100%;
        //padding-top: 10px;
        background: url("../../assets/images/ledDriver/zuo.png");
        background-size: 100% 100%;

        > h2 {
          color: #7490c6;
          font-size: 0.22rem;
        }
      }
    }

    .top-right {
      flex: 1;
      height: 100%;
      padding: 20px 20px 20px 0;
      //background: rgba(255, 0, 0, 0.24);
      .item-title {
        display: inline-block;
        height: 25%;
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
        color: #fff;
        font-size: .18rem;
        justify-content: left;
      }

      .item-nun {
        display: inline-block;
        height: 50%;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: .3rem;
        color: #fff;
        justify-content: center;
      }

      .item-ranking {
        display: inline-block;
        height: 25%;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: .16rem;
        justify-content: center;
      }

      .right-one {
        height: 50%;
        width: 100%;
        padding: 0 5px 5px 5px;

        .tab-item:hover {
          cursor: pointer;
          transform: scale(1.08, 1.08);
        }

        .tab-item {
          transition: all .2s linear;
          width: 19%;
          margin-left: 1%;
          height: 100%;
          float: left;
        }

        .tab-item:nth-child(1) {
          background-image: url("../../assets/images/ledDriver/top1.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #4a88eb;
          }
        }

        .tab-item:nth-child(2) {
          background-image: url("../../assets/images/ledDriver/top2.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #eea941;
          }
        }

        .tab-item:nth-child(3) {
          background-image: url("../../assets/images/ledDriver/top3.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #ed806c;
          }
        }

        .tab-item:nth-child(4) {
          background-image: url("../../assets/images/ledDriver/top4.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #6396e9;
          }
        }

        .tab-item:nth-child(5) {
          background-image: url("../../assets/images/ledDriver/top5.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #2cbecd;
          }
        }
      }

      .right-two {
        height: 50%;
        width: 100%;
        padding: 5px 5px 0 5px;

        .tab-item:hover {
          cursor: pointer;
          transform: scale(1.08, 1.08);
        }

        .tab-item {
          transition: all .2s linear;
          width: 19%;
          margin-left: 1%;
          height: 100%;
          float: left;
        }

        .tab-item:nth-child(1) {
          background-image: url("../../assets/images/ledDriver/top6.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #ed806c;
          }
        }

        .tab-item:nth-child(2) {
          background-image: url("../../assets/images/ledDriver/top7.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #6396e9;
          }
        }

        .tab-item:nth-child(3) {
          background-image: url("../../assets/images/ledDriver/top8.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #4a88eb;
          }
        }

        .tab-item:nth-child(4) {
          background-image: url("../../assets/images/ledDriver/top9.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #7fbf69;
          }
        }

        .tab-item:nth-child(5) {
          background-image: url("../../assets/images/ledDriver/top10.png");
          background-size: 100% 100%;

          .item-ranking {
            color: #eea941;
          }
        }
      }

    }


  }
</style>
