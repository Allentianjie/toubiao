<template>
  <div class="portrayal">
    <div class="main-roll">
      <div class="main-body">
        <div class="user-info">
          <div class="user-img">
            <img src="../../../assets/images/portrayal/major.png">
            <span style="width:100%;">电子信息技术</span>
          </div>
          <div class="user-con">
            <div class="con-info">
              <p>课程名称：电子信息技术</p>
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
          <div class="title"><i></i><span>专业基本情况</span></div>
          <div class="con">
            <div class="item" v-for="item in major.data" :key="item.id">
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
        major: {  // 专业基本情况
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
              { id: "31", name: "课程数量", value: "290", unit: "人" },
              { id: "32", name: "校内排名", value: "3", unit: "" }
            ]
          },
          { id: "4", child:
            [
              { id: "41", name: "专业到课率", value: "85", unit: "%" },
              { id: "42", name: "校内排名", value: "2", unit: "" }
            ]
          }
        ];
        this.major.data = [
          { id: "5", child:
            [
              { id: "51", name: "理论课课时", value: "7100", unit: "时" },
              { id: "52", name: "校内排名", value: "2", unit: "" }
            ]
          },
          { id: "6", child:
            [
              { id: "61", name: "实训课课时", value: "8900", unit: "时" },
              { id: "62", name: "校内排名", value: "1", unit: "" }
            ]
          },
          { id: "7", child:
            [
              { id: "71", name: "专业报到率", value: "70", unit: "人" },
              { id: "72", name: "校内排名", value: "6", unit: "" }
            ]
          },
          { id: "8", child:
            [
              { id: "81", name: "专业就业率", value: "80", unit: "%" },
              { id: "82", name: "校内排名", value: "2", unit: "" }
            ]
          },
          { id: "9", child:
            [
              { id: "91", name: "专业诊改指标数量", value: "78", unit: "个" },
              { id: "92", name: "校内排名", value: "2", unit: "" }
            ]
          },
          { id: "10", child:
            [
              { id: "101", name: "专业诊改指标完成率", value: "62", unit: "%" },
              { id: "102", name: "校内排名", value: "2", unit: "" }
            ]
          }
        ];
      }
    }
  };
</script>
