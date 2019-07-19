<template>
  <!--trackModal  FeatureData-->
  <Modal v-model="FeatureData" class="schoolModal" width="90%"
         :mask-closable="false" @on-cancel="closetrendData">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>办学特色</span>
    </p>
    <div class="divCentre">
        <div class="divfour">
          <div class="backImg">
            <div>
              <p><span></span>广西唯一一所建设类公办高等学校</p>
              <p><span></span>广西建设行业高技能人才培养的门户学府</p>
            </div>
          </div>
        </div>
        <div class="divfour">
          <div class="backImg">
            <div>
              <p><span></span>为建设行业培养高技能人才的全日制高职学 历教育</p>
              <p><span></span>面向建设行业开展继续教育、职业培训和技 能鉴定</p>
            </div>
          </div>
        </div>
        <div class="divfour">
          <div class="backImg">
            <div>
              <p><span></span>主管部门、行业企业和学校“三元”合作办 学模式</p>
              <p><span></span>行业专家顾问、企业能工巧匠、学校专职教 师“三元”师资组合模式</p>
              <p><span></span>素质教育、专业实训和岗位实习“三元”工 学结合人才培养模式</p>
            </div>
          </div>
        </div>
        <div class="divfour">
          <div class="backImg">
            <div>
              <p><span></span>教学内容与行业标准融合  </p>
              <p><span></span>校内师资与企业技术力量融合</p>
              <p><span></span>实训场所与企业项目现场融合</p>
              <p><span></span>校园文化与企业文化融合</p>
            </div>
          </div>
        </div>

    </div>
    <div slot="footer" style="text-align: right">
      <Button type="primary" size="large" @click="closetrendData">关闭</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "schoolFeatureModal",
  props: ['FeatureData'],
  mounted(){

  },
  methods: {
    closetrendData() {
      // let flag = false;
      this.$emit("closeFeatureModal", false);
    }
  }
}
</script>

<style lang="less" scoped>
.divCentre{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .divfour{
    flex: 0 0 50%;
    padding-top:0.2rem ;
    padding-bottom:0.2rem ;
    display: flex;
    justify-content:center;
    align-items: center;
    /*border: 1px solid red;*/
    .backImg{
      /*border: 1px solid blue;*/
      width: 8rem;
      height: 2.5rem;
      display: flex;
      align-items:center;
      padding-left:3.8rem;
      padding-top: 0.1rem;
      >div{
        >p{
          font-size: 0.1rem;
          line-height: 0.3rem;
          display: flex;
          span{
            width: 5px;
            height: 5px;
            border: 1px solid red;
            border-radius: 3px;
            background: red;
            margin-right: 8px;
            margin-top: 0.09rem;
          }
        }

      }
    }
  }
  .divfour:nth-of-type(1){
    .backImg{
      background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/schoolOne.png");
      background-size:100% 100%;
      background-repeat: no-repeat;
    }
  }
  .divfour:nth-of-type(2){
    .backImg{
      background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/schoolTwo.png");
      background-size:100% 100%;
      background-repeat: no-repeat;
    }
  }
  .divfour:nth-of-type(3){
    .backImg{
      background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/schoolThree.png");
      background-size:100% 100%;
      background-repeat: no-repeat;
    }
  }
  .divfour:nth-of-type(4){
    .backImg{
      background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/schoolFour.png");
      background-size:100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
