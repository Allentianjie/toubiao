<template>
  <div class="branch">
    <div class="title">
      诊断得分
    </div>
    <div class="content">
      <div class="center">
        <span class="number">{{scoreData.targetScore? scoreData.targetScore:'0' }}</span><span class="text">分</span>
      </div>
      <div class="timeZD" v-show="scoreData.createTime">
        <p>上次评分时间：</p>
        <p>{{scoreData.createTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "divModal",
    data() {
      return {
        scoreData: [],
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      //页面加载请求数据
      loadData() {
        let that = this;
        that.$Get("/admin/target/current/score", {}, function (data) {
          that.scoreData = data.data;
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  .branch {
    width: 100%;
    height: 100%;

    .title {
      padding: 0.15rem;
      background: #37bb8a;
      line-height: 23px;
      color: #fff;
      font-size: 0.22rem;
    }

    .content {
      height: calc(100% - 0.31rem - 23px);
      background-image: url("../../../assets/images/defenbeijing.png");
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: Center;
      position: relative;
      .center{
        width: 2rem;
        height: 2rem;
        background-image: url("../../../assets/images/yuan.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: Center;
        .number {
          font-size: 0.3rem;
          color: #fff;
        }

        .text {
          color: #fff;
          font-size: 0.2rem;
        }
      }
      .timeZD{
        width: 100%;
        text-align: center;
        color: #acacac;
        position: absolute;
        padding-top: 0.1rem;
        top:0;
        left: 0;
      }

    }
  }
</style>
