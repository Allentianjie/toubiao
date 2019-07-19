<template>
  <div class="base">
    <el-row>
      <el-col :span="5">
        <div class="headerImg">
          <img src="../../../assets/images/teacher_default.jpg" alt="">
          <p>{{ baselist.name }}</p>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3></h3>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">编号</span><span class="text">{{ baselist.no }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/age.png" alt="">
            <span class="title">性别</span><span class="text">{{ baselist.sex }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/nianji.png" alt="">
            <span class="title">职称</span><span class="text">{{ baselist.duty }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/xueyuan.png" alt="">
            <span class="title">学历</span><span class="text">{{ baselist.education }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3></h3>
          <div class="content-row">
            <img src="../../../assets/images/img/minzu.png" alt="">
            <span class="title">民族</span><span class="text">{{ baselist.national }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/zhuanye.png" alt="">
            <span class="title">所属系部</span><span class="text">{{ baselist.institute }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/banji.png" alt="">
            <span class="title">学科专业</span><span class="text"></span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/dizhi.png" alt="">
            <span class="title">籍贯</span><span class="text">{{ baselist.native }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3></h3>
          <div class="content-row">
            <img src="../../../assets/images/img/dianhua.png" alt="">
            <span class="title">电话</span><span class="text">{{ baselist.phone }}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/youxiang.png" alt="">
            <span class="title">邮箱</span><span class="text"></span>
          </div>
          <div class="content-row">
            <!--<el-button type="primary" @click="goNewWeb" size="small">我的云课堂</el-button>-->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "baseData",
    props:  { baselist: Object },
    data() {
      return { }
    },
    mounted() { },
    methods: {
      // 我的云课堂
      goNewWeb() {
        window.open("http://gxjscas.itolearn.com");
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
    height: 250px;
    display: flex;
    padding-top: 25px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;

      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
      -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
      -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    }

    p {
      width: 100%;
      padding-top: 20px;
      font-size: 24px;
      color: #2c3e50;
    }
  }
</style>
