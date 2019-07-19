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
      <div class="divCentre">
        <div class="right-content" @click="substratum('教师总计',matterData.teachersDataId, 0)">
          <p class="title">教职工数量</p>
          <div class="center-box">
            <div class="center-img">
              <div class="img"></div>
            </div>
            <div v-if="matterData.teachers" class="center-text">{{matterData.teachers}}</div>
            <div v-else class="center-text">暂无数据</div>

          </div>
          <div class="center-bottom">
            <p class="tiao"></p>
            <!--<p class="text">同比上升</p>-->
          </div>
        </div>
        <div class="right-content" @click="substratum('双师型教师',matterData.doubleteachersDataId, 2)">
          <p class="title">双师型教师数量</p>
          <div class="center-box">
            <div class="center-img">
              <div class="img"></div>
            </div>
            <div v-if="matterData.doubleteachers" class="center-text">{{matterData.doubleteachers}}</div>
            <div v-else class="center-text">暂无数据</div>

          </div>
          <div class="center-bottom">
            <p class="tiao"></p>
            <!--<p class="text">同比上升</p>-->
          </div>
        </div>
        <div class="right-content" @click="substratum('高级职称教师',matterData.advdutyDataId, 3)">
          <p class="title">高级职称教师数量</p>
          <div class="center-box">
            <div class="center-img">
              <div class="img"></div>
            </div>
            <div v-if="matterData.advduty" class="center-text">{{matterData.advduty}}</div>
            <div v-else class="center-text">暂无数据</div>

          </div>
          <div class="center-bottom">
            <p class="tiao"></p>
            <!--<p class="text">同比上升</p>-->
          </div>
        </div>
        <div class="right-content" @click="substratum('中级职称教师',matterData.normarldutyDataId, 4)">
          <p class="title">中级职称教师</p>
          <div class="center-box">
            <div class="center-img">
              <div class="img"></div>
            </div>
            <div v-if="matterData.normarlduty" class="center-text">{{matterData.normarlduty}}</div>
            <div v-else class="center-text">暂无数据</div>
          </div>
          <div class="center-bottom">
            <p class="tiao"></p>
            <!--<p class="text">同比上升</p>-->
          </div>
        </div>
        <div class="right-content" @click="substratum('初级职称教师',matterData.primarydutyDataId, 5)">
          <p class="title">初级职称教师</p>
          <div class="center-box">
            <div class="center-img">
              <div class="img"></div>
            </div>
            <div v-if="matterData.primaryduty" class="center-text">{{matterData.primaryduty}}</div>
            <div v-else class="center-text">暂无数据</div>
          </div>
          <div class="center-bottom">
            <p class="tiao"></p>
            <!--<p class="text">同比上升</p>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // /portrait/teachOffice/target
  // admin/persondivision/top
  // admin/persondivision/teachereducation
  export default {
    name: "numerical",
    data() {
      return {
        target: "0",
        targetFinish: "0",
        targetTotal: "0",
        matterData: [],
      }
    },
    mounted() {
      this.getMatterData();
      this.getMatterTotal();
    },
    created() {
    },
    watch: {},
    methods: {
      // 教师下钻
      substratum(name, parentId, type){
        let titleName = {
          name: name,
          url: '/matters'
        }
        let queryData = {
          name: name,
          titleName: titleName,
          chartFlag: true,
          type: type,
          parentId: parentId,
          teacher: type
        }
        this.$router.push({path: '/twoChart', query: queryData})
      },
      //诊改指标数量 跳转
      indicatorsDel() {
        this.$router.push({path: '/indicatorsNum', query: {levelId: 6}})
      },
      //打开教职工
      openTeacher(){
        this.$router.push({path: '/teacherTable', query: {name: ""}})
      },
      openNotData() {
        this.$message({
          message: '暂无明细',
          type: 'warning'
        });
      },
      openTeacherDeaile(name){
        // console.log(name);
        this.$router.push({path: '/teacherTable', query: {name: name}})
      },
      TeacherChar(){
        // this.$router.push({path: '/twoChart', query: {name: params.name}})
        this.$router.push('/twoChart')
      },
      //查询人事处数量统计
      getMatterTotal() {
        this.$Get("/portrait/statistic/task?levelId=6", null, res => {
          if (res.code == 0) {
            this.targetFinish = res.data.taskRate;
            this.targetTotal = res.data.taskTotal;
          }
        })
      },
      //查询人事顶部明细that.$router.push({path: '/teacherTable', query: {name: params.name}})
      getMatterData() {
        this.$Get("/portrait/persondivision/top", null, res => {
          if (res.code == 0) {
            this.matterData = res.data
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
      padding: 20px;
      /*background: rgba(255, 0, 0, 0.24);*/

      .divCentre {
        height: 100%;
        width: 100%;
        padding: 2% 0;
        background: rgb(245, 248, 253);
        box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
        -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
        -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;

        .right-content {
          width: 20%;
          height: 100%;
          float: left;
          padding: 0 .15rem;
          cursor: pointer;
          .title {
            width: 100%;
            height: 20%;
            font-size: .18rem;
            display: flex;
            align-items: center;
            justify-content: left;
          }

          .center-box {
            width: 100%;
            height: 55%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .center-bottom {
            width: 100%;
            height: 25%;
            text-align: left;

            .tiao {
              display: inline-block;
              width: 100%;
              height: 10%;
              background: url("../../assets/images/ledDriver/shangshen.png");
              background-size: 100% 100%;
            }

            .text {
              font-size: .14rem;
            }
          }

        }

        .right-content:nth-child(1) {
          .center-img {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .img {
              width: 1rem;
              height: 1rem;
              background: url("../../assets/images/ledDriver/01.png");
              background-size: 100% 100%;
            }
          }

          .center-text {
            flex: 1;
            color: #f7ba66;
            text-align: left;
            font-size: .25rem;
          }
        }

        .right-content:nth-child(2) {
          border-left: 2px solid rgba(149, 152, 150, 0.21);
          border-right: 2px solid rgba(149, 152, 150, 0.21);

          .center-img {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .img {
              width: 1rem;
              height: 1rem;
              background: url("../../assets/images/ledDriver/02.png");
              background-size: 100% 100%;
            }
          }

          .center-text {
            flex: 1;
            color: #769bec;
            text-align: left;
            font-size: .25rem;
          }
        }

        .right-content:nth-child(3) {
          .center-img {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .img {
              width: 1rem;
              height: 1rem;
              background: url("../../assets/images/ledDriver/03.png");
              background-size: 100% 100%;
            }
          }

          .center-text {
            flex: 1;
            color: #f27071;
            text-align: left;
            font-size: .25rem;
          }
        }

        .right-content:nth-child(4) {
          border-left: 2px solid rgba(149, 152, 150, 0.21);
          border-right: 2px solid rgba(149, 152, 150, 0.21);

          .center-img {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .img {
              width: 1rem;
              height: 1rem;
              background: url("../../assets/images/ledDriver/04.png");
              background-size: 100% 100%;
            }
          }

          .center-text {
            flex: 1;
            color: #26d0ac;
            text-align: left;
            font-size: .25rem;
          }
        }

        .right-content:nth-child(5) {
          .center-img {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .img {
              width: 1rem;
              height: 1rem;
              background: url("../../assets/images/ledDriver/05.png");
              background-size: 100% 100%;
            }
          }

          .center-text {
            flex: 1;
            color: #cfbe19;
            text-align: left;
            font-size: .25rem;
          }
        }
      }
    }

  }
</style>
