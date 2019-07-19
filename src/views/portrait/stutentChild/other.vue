<template>
  <div class="portrait-content">
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.actives }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="参与思政教育主题活动开展次数">
            <p>参与思政教育主题活动开展次数</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.behavior }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="操行评定合格分数">
            <p>操行评定合格分数</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.certificate }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="参与易班认证">
            <p>参与易班认证</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.absent }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="缺课次数">
            <p>缺课次数</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.commentrate }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="评教率">
            <p>评教率</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.profcompetition }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="参与专业技能活动或竞赛（次）">
            <p>参与专业技能活动或竞赛（次）</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.noprofcompetition }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="参与非专业技能活动或竞赛（次）">
            <p>参与非专业技能活动或竞赛（次）</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.skillcertificate }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="获取技能证书情况（本）">
            <p>获取技能证书情况（本）</p>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "other",
      props:  { otherData: Object },
      data() {
        return { }
      },
      mounted() { },
      methods: {
        //请求指标数据
      }
    }
</script>
