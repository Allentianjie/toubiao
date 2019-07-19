<template>
  <div class="portrait-content">
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.openclass }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="讲授公开课或示范课">
            <p>讲授公开课或示范课</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.guideprize }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="指导或参与指导学生竞赛获奖">
            <p>指导或参与指导学生竞赛获奖</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.teachgain }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="主持或参与教学成果奖项目">
            <p>主持或参与教学成果奖项目</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.continueedu }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="继续教育">
            <p>继续教育</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.industrymeeting }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="参与行业会议">
            <p>参与行业会议</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.enteruse }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="企业顶岗">
            <p>企业顶岗</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.chargeteacher }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="担任班主任">
            <p>担任班主任</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ otherData.yearexam }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="年度考核">
            <p>年度考核</p>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "other",
      props: { otherData: Object },
      data() {
        return { }
      },
      mounted() { },
      methods: { }
    }
</script>
