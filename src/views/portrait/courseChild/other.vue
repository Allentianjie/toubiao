<template>
  <div class="portrait-content">
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ baselist.circle1 }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="课程设计标准（有/否）">
            <p>课程设计标准（有/否）</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ baselist.circle2 }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="课程教学标准（有/否）">
            <p>课程教学标准（有/否）</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ baselist.circle1 }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="上课学生数">
            <p>上课学生数</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ baselist.circle1 }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="学生出勤率">
            <p>学生出勤率</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ baselist.circle1 }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="课堂活动数">
            <p>课堂活动数</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ baselist.circle1 }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="课后活动数">
            <p>课后活动数</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ baselist.circle1 }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="作业完成率">
            <p>作业完成率</p>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="item bg-color">
      <div class="item-con">
        <div class="item-body">
          <h3>{{ baselist.circle1 }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" content="已授课次数">
            <p>已授课次数</p>
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
        return {
          baselist: {
            circle1:"暂无",
            circle2: "暂无",
            circle3: "暂无",
            circle4: "暂无",
            circle5: "暂无",
            circle6: "暂无",
            circle7: "暂无",
          }
        }
      },
      mounted() { },
      methods: { }
    }
</script>
