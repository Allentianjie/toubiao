<template>
  <div class="portrait-content">
    <div class="item bg-color" v-for="item in propData" :key="item.name">
      <div class="item-con">
        <div class="item-body">
          <h3 v-if="item.value === '暂无'">{{ item.value }}</h3>
          <h3 v-else>{{ item.value }} {{ item.unit }}</h3>
        </div>
        <div class="item-foot">
          <el-tooltip effect="dark" :content="item.name">
            <p>{{ item.name }}</p>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 整改代码：
   *   Evua Huang 
   *   2019-05-09
   */
    export default {
      props: ['propData'],
      data() {
        return {};
      }
    };
</script>
