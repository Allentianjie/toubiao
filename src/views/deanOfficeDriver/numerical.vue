<template>
  <div id="num">
    <div class="top-left">
      <div class="left-img">
        <!--<h2>土木工程系</h2>-->
        <div class="left-num">
          <div class="num-one" @click="indicatorsDel">
            <div class="num-left">
              <img src="../../assets/images/ledDriver/zhenai.png" alt="">
            </div>
            <div class="num-right">
              <div class="right-box">
                <p>诊改指标数量</p>
                <p v-if="targetTotal">{{targetTotal}}</p>
                <p v-else>暂无数据</p>
              </div>
            </div>
          </div>
        </div>
        <div class="left-num">
          <div class="num-two">
            <div class="num-left">
              <img src="../../assets/images/ledDriver/zhengaizhibiao.png" alt="">
            </div>
            <div class="num-right">
              <div class="right-box">
                <p>诊改指标完成率</p>
                <p v-if="targetFinish">{{targetFinish}}</p>
                <p v-else>暂无数据</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-right">
      <div class="right-one">
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="TeacherEchar(officeData.teachers)">
            <!--<p class="uplow">同比<span>上升</span></p>-->
            <p class="uplow"><span></span></p>
            <p v-if="officeData.teachers" class="numbers">{{officeData.teachers}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">教师数量</p>
          </div>
        </div>
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="studentsClick('全校学生',officeData.students)">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.students" class="numbers">{{officeData.students}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">学生数量</p>
          </div>
        </div>
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="majorClick('专业总数',officeData.major,'0')">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.major" class="numbers">{{officeData.major}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">专业数量</p>
          </div>
        </div>
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="bottomDel(officeData.course)">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.course" class="numbers">{{officeData.course}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">课程数量</p>
          </div>
        </div>
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="theoryClick('全部',officeData.theoryperiod)">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.theoryperiod" class="numbers">{{officeData.theoryperiod}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">理论课课时</p>
          </div>
        </div>
      </div>
      <div class="right-two">
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="openTeacher(6, '论文发表数量',officeData.factperiod)">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.factperiod" class="numbers">{{officeData.factperiod}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">论文发表数量</p>
          </div>
        </div>
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right"  @click="majorClick('国家重点',officeData.importantmajor,'2')">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.importantmajor" class="numbers">{{officeData.importantmajor}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">重点专业数量</p>
          </div>
        </div>
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="openTeacher(8)">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.specialmajor" class="numbers">{{officeData.specialmajor}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">骨干专业</p>
          </div>
        </div>
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="studentsClick('到课率',officeData.reachrate)">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.reachrate" class="numbers">{{officeData.reachrate}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">到课率</p>
          </div>
        </div>
        <div class="tab-item">
          <div class="item-left">
            <div class="imgs"></div>
          </div>
          <div class="item-right" @click="openTeacher(10,'科研成果获奖数',officeData.projectmajor)">
            <p class="uplow">同比<span>上升</span></p>
            <p v-if="officeData.projectmajor" class="numbers">{{officeData.projectmajor}}</p>
            <p v-else class="numbers">暂无数据</p>
            <p class="numname">科研成果获奖数</p>
          </div>
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
        target: "0",
        targetFinish: "0",
        targetTotal: "0",
        officeData: [],
        ImportantData: []
      }
    },
    mounted() {
      this.getOfficeTarget();
      this.getOfficeData();
    },
    created() {
    },
    watch: {},
    methods: {
      //诊改指标数量 跳转
      indicatorsDel() {
        this.$router.push({path: '/indicatorsNum', query: {levelId: 4}})
      },
      //  理论课时 - 钻页面
      theoryClick(name,val){
        let obj ={
          name: name,
          val: val,
          seriseId: '',
          type: 'serise'
        }
       this.$router.push({path: '/theoryTwoChar', query: {obj: JSON.stringify(obj)}})
      },
      //  专业钻页面
      majorClick(name,val,v){
        let obj ={
          name: name,
          val: val,
          type: v,
          unit: '门'
        }
        this.$router.push({path: '/majorTwoChart', query: {titleName: JSON.stringify(obj)}})
      },
      //  学生钻页面studentFiveTable
      studentsClick(name,val){
        let  obj ={
          typeName: name,
          name: name,
          val: val,
          source: ''
        }
        this.$router.push({path: '/studentTwoChart', query: {obj: JSON.stringify(obj)}})
      },
      //  教师下钻页面
      TeacherEchar(val){
        let titleName = {
          name: "教师数量",
          val: val,
          url: '/deanOffice'
        }
        let queryData = {
          name: "2019年教职工",
          titleName: titleName,
          chartFlag: true,
          type: 0,
          parentId: 114,
          teacher: 0
        }
        this.$router.push({path: '/twoChart', query: queryData})
      },
      // 课程下钻页面
      bottomDel(val){
        let obj = {
          name: '课程数量',
          val: val,
          nuit: '门',
          symbol: '',
          dataId: '38263'
        }
        this.$router.push({path: '/courseTwoChart', query: {obj: JSON.stringify(obj)}})

      },
      //打开下钻页面
      openTeacher(val,name,num) {
       if (val == 6) {
         let obj = {
           symbol:'论文',
           name: name,
           val:num
         }
          this.$router.push({path: '/awardTwoChart', query: {obj: JSON.stringify(obj) }})
        } else if (val == 8) {
          this.$message({
            message: '暂无明细',
            type: 'warning'
          });
        } else if (val == 9) {
          this.$message({
            message: '暂无数据页面',
            type: 'warning'
          });
        } else if (val == 10) {
          // this.$router.push({path: '/award', query: {ident: 263}})
         let obj = {
           symbol: '科研',
           name: name,
           val: num
         }
         this.$router.push({path: '/awardTwoChart', query: {obj: JSON.stringify(obj) }})
        }
      },
      //查询教务处指标
      getOfficeTarget() {
        this.$Get("/portrait/statistic/task?levelId=4", null, res => {
          if (res.code == 0) {
            this.targetFinish = res.data.taskRate;
            this.targetTotal = res.data.taskTotal;
          }
        })
      },
      //查询教务处顶部明细
      getOfficeData() {
        this.$Get("/portrait/teachOffice/top", null, res => {
          if (res.code == 0) {
            this.officeData = res.data
          }
        })
      },

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
        background: rgb(245, 248, 253);
        box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
        -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
        -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
        //padding-top: 10px;
        /*background: url("../../assets/images/ledDriver/zuo.png");*/
        /*background-size: 100% 100%;*/

        .left-num {
          width: 100%;
          height: 50%;
          padding: 10px 20px;

          .num-one {
            width: 100%;
            height: 100%;
            background: #f1ad64;
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
              transform: scale(1.08);
            }
            .num-left {
              width: 35%;
              height: 100%;
              float: left;
              display: flex;
              align-items: center;
              justify-content: center;

              > img {
                width: .5rem;
                height: .5rem;
              }
            }

            .num-right {
              width: 65%;
              height: 100%;
              float: left;
              position: relative;

              .right-box {
                color: #fff;
                width: 100%;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);

                > p:nth-child(1) {
                  font-size: .2rem;
                }

                > p:nth-child(2) {
                  font-size: .22rem;
                }
              }
            }

          }

          .num-two {
            width: 100%;
            height: 100%;
            background: #ee6a78;

            .num-left {
              width: 35%;
              height: 100%;
              float: left;
              display: flex;
              align-items: center;
              justify-content: center;

              > img {
                width: .5rem;
                height: .5rem;
              }
            }

            .num-right {
              width: 65%;
              height: 100%;
              float: left;
              position: relative;

              .right-box {
                color: #fff;
                width: 100%;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);

                > p:nth-child(1) {
                  font-size: .2rem;
                }

                > p:nth-child(2) {
                  font-size: .22rem;
                }
              }
            }
          }
        }

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

      .right-one {
        height: 50%;
        width: 100%;
        padding: 0 5px 10px 5px;
        .tab-item:nth-child(1) {
          .imgs {
            background: url("../../assets/images/ledDriver/jiaoshi.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #7fd5ef;
          }
        }

        .tab-item:nth-child(2) {
          .imgs {
            background: url("../../assets/images/ledDriver/xuesheng.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #93d766;
          }
        }

        .tab-item:nth-child(3) {
          .imgs {
            background: url("../../assets/images/ledDriver/zuanye.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #e9b271;
          }
        }

        .tab-item:nth-child(4) {
          .imgs {
            background: url("../../assets/images/ledDriver/kecheng.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #80a7f6;
          }
        }

        .tab-item:nth-child(5) {
          .imgs {
            background: url("../../assets/images/ledDriver/lilun.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #a6c96f;
          }
        }

        .tab-item:hover {
          cursor: pointer;
          transform: scale(1.08, 1.08);
        }

        .tab-item {
          transition: all .2s linear;
          padding: 1% 0;
          width: 19%;
          margin-left: 1%;
          height: 100%;
          float: left;
          background: rgb(245, 248, 253);
          box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
          border-radius: 3px;
          -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
          -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
          -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;

          .item-left {
            width: 33%;
            height: 100%;
            float: left;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .imgs {
              width: .7rem;
              height: .7rem;
            }
          }

          .item-right {
            width: 67%;
            height: 100%;
            float: left;

            .uplow {
              height: 30%;
              width: 100%;
              font-size: .12rem;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding-right: 10px;
            }

            .numbers {
              height: 40%;
              width: 100%;
              font-size: .2rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .numname {
              height: 30%;
              width: 100%;
              font-size: .16rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

        }
      }

      .right-two {
        height: 50%;
        width: 100%;
        padding: 10px 5px 0 5px;

        .tab-item:nth-child(1) {
          .imgs {
            background: url("../../assets/images/ledDriver/shixun.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #fa8464;
          }
        }

        .tab-item:nth-child(2) {
          .imgs {
            background: url("../../assets/images/ledDriver/zhongdian.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #80a7f6;
          }
        }

        .tab-item:nth-child(3) {
          .imgs {
            background: url("../../assets/images/ledDriver/teshe.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #1cc5f1;
          }
        }

        .tab-item:nth-child(4) {
          .imgs {
            background: url("../../assets/images/ledDriver/daoke.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #a6c96f;
          }
        }

        .tab-item:nth-child(5) {
          .imgs {
            background: url("../../assets/images/ledDriver/jiaogai.png");
            background-size: 100% 100%;
          }

          .numbers {
            color: #e8b270;
          }
        }

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
          background: rgb(245, 248, 253);
          box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
          border-radius: 3px;
          -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
          -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
          -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;

          .item-left {
            width: 33%;
            height: 100%;
            float: left;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .imgs {
              width: .7rem;
              height: .7rem;
            }
          }

          .item-right {
            width: 67%;
            height: 100%;
            float: left;

            .uplow {
              height: 30%;
              width: 100%;
              font-size: .12rem;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding-right: 10px;
            }

            .numbers {
              height: 40%;
              width: 100%;
              font-size: .2rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .numname {
              height: 30%;
              width: 100%;
              font-size: .16rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

        }
      }

    }

  }
</style>
