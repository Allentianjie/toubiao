<template>
  <div class="base">
    <el-row>
      <el-col :span="5">
        <div class="headerImg">
          <img src="../../../assets/images/shu.jpg" alt="">
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3>{{propData.name}}</h3>
          <div class="content-row">            
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">教程</span><span class="text">{{propData.educational}}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">级别</span><span class="text">{{propData.level}}</span>
          </div>
          <div class="content-row">
            <el-button type="primary" @click="choiceMajorFn" size="small">
              <!-- {{majorName}} -->
              +选择专业
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3></h3>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">学科</span><span class="text">{{propData.subject}}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">专业人数</span><span class="text">{{propData.studentnum}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="content">
          <h3></h3>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">招生</span><span class="text">{{propData.enroll}}</span>
          </div>
          <div class="content-row">
            <img src="../../../assets/images/img/xuehao.png" alt="">
            <span class="title">负责人</span><span class="text">{{propData.charge}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <choice-major v-if="propChoiceMajor.visible" :propVisible.sync="propChoiceMajor.visible" :propCheckedData.sync="propChoiceMajor.checkedData"></choice-major>
  </div>
</template>

<script>
  /**
   * Evua Huang 
   * 2019-05-08
   * 
   * 逻辑：
   * 1、选择专业
   * 2、监听
   */
  import choiceMajor from './choiceMajor.vue';
  export default {
    props: ['propData'],
    components: {choiceMajor},
    data() {
      return {
        majorcode: null,
        majorName: '+选择专业',
        propChoiceMajor: {
          visible: false,
          checkedData: null
        }
      }
    },
    computed: {
      /**
       * 用于监听分配角色所选中的数据
       */
      checkedData (){
        return this.propChoiceMajor.checkedData;
      }
    },
    watch: {
      /**
       * 监听分配角色所选中数据，监听到变化，则调用接口，更新用户的角色
       */
      checkedData: {
        handler (){ 
          //console.log('checkedData:',this.checkedData);
          this.majorName = this.checkedData.name;
          this.majorcode = this.checkedData.majorcode;
        },
        deep: true
      },
      majorcode: {
        handler (){
          this.$emit('monitorFn',{year:2018,majorcode: this.majorcode});
        },
        deep: true
      }
    },
    methods: {  
      /**
       * 选择专业
       */
      choiceMajorFn() {
        this.propChoiceMajor.visible = true;
      },
    }
  };
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
