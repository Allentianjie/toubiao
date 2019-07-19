<template>
  <div class="portrayal">
    <div class="main-roll">
      <div class="main-body">
        <div class="user-info">
          <div class="user-img">
            <img src="../../../assets/images/portrayal/course.png">
            <span style="width:100%;">电子信息工程</span>
          </div>
          <div class="user-con">
            <div class="con-info">
              <p>系部：电子信息工程系</p>
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
          <div class="title"><i></i><span>课程基本情况</span></div>
          <div class="con">
            <div class="item" v-for="item in course.data" :key="item.id">
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
        userInfo: null,
        info: {  // 顶部item项
          data: []
        },
        course: {  // 课程基本情况
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
      initFn() {
        // 获取用户信息
        this.userInfo = this.$store.state.userInfo
        // console.log(this.userInfo);

        this.info.data = [
          { id: "1", child:
            [
              { id: "11", name: "教师数量", value: "56", unit: "人" },
              { id: "12", name: "校内排名", value: "2", unit: "" }
            ]
          },
          { id: "2", child:
            [
              { id: "21", name: "学生数量", value: "2360", unit: "人" },
              { id: "22", name: "校内排名", value: "3", unit: "" }
            ]
          },
          { id: "3", child:
            [
              { id: "31", name: "课程成绩大于90分的人数", value: "20", unit: "人" },
              { id: "32", name: "校内排名", value: "3", unit: "" }
            ]
          },
          { id: "4", child:
            [
              { id: "41", name: "课程优秀率", value: "85", unit: "%" },
              { id: "42", name: "校内排名", value: "2", unit: "" }
            ]
          }
        ];

        this.course.data = [
          { id: "5", child:
            [
              { id: "51", name: "课程课时", value: "7100", unit: "时" },
              { id: "52", name: "校内排名", value: "2", unit: "" }
            ]
          },
          { id: "6", child:
            [
              { id: "61", name: "课程好评率", value: "76", unit: "%" },
              { id: "62", name: "校内排名", value: "1", unit: "" }
            ]
          },
          { id: "7", child:
            [
              { id: "71", name: "课程挂科人数", value: "20", unit: "人" },
              { id: "72", name: "校内排名", value: "3", unit: "" }
            ]
          },
          { id: "8", child:
            [
              { id: "81", name: "课程到课率", value: "80", unit: "%" },
              { id: "82", name: "校内排名", value: "5", unit: "" }
            ]
          },
          { id: "9", child:
            [
              { id: "91", name: "课程诊改指标数量", value: "78", unit: "个" },
              { id: "92", name: "校内排名", value: "2", unit: "" }
            ]
          },
          { id: "10", child:
            [
              { id: "101", name: "课程诊改指标完成率", value: "62", unit: "%" },
              { id: "102", name: "校内排名", value: "2", unit: "" }
            ]
          }
        ];
      }
    }
  };
</script>
