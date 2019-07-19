<template>
  <div class="moduleDiv">
    <div class="titleDiv"><h3>{{CenterBottomData.title}}</h3></div>
    <div class="centerBottomDiv">
      <div class="listDiv" @click="openTarget(item)" v-for="(item,index) in CenterBottomData.data" :key="index">
        <div class="top">
          <div>
            <p class="topVal">{{item.val}}</p>
            <p class="bottomName">{{item.name}}</p>
          </div>
        </div>

      </div>
    </div>
    <!--!&ndash;任务下钻;-->
    <!--<taskModal ref="taskModal" :taskData="taskData" @closeTaskModal="closeTaskModal"></taskModal>-->
  </div>
</template>

<script>
  // import taskModal from "@/views/dataView/modal/taskModal";

  export default {
    components: {
      // taskModal,
    },
    props: {
      CenterBottomData: {
        type: Object,
        required: true
      }
    },
    name: "centerBottomDiv",
    data() {
      return {
        taskData: {
          data: [],
          state: false,
        },
      }
    },
    methods: {
      //关闭任务下钻
      closeTaskModal(data) {
        // console.log(data);
        this.taskData.state = false;
      },
      //打开指标下钻
      openTarget(row) {
        let name = row.name;
        let val = name === '指标项' ? '0' :
          name === '达标项' ? '1' :
            name === '未达标指标数量' ? '2' :
              name === '逾期指标数量' ? '3' :
                name === '预警项' ? '4' : ''
        // this.$router.push({path: "/indexdetails", query: {id: val,type:'indexdetails'}});
         let obj={
          id: val,
          type:'indexdetails'
        }
        this.$router.push({path: "/LedDriverDetails", query: {id: obj.id}});
        // this.$router.push({path: "/dataView", query: {obj:obj}});

        //  this.$router.push("/dataView");

      },
    }
  }
</script>

<style lang="less" scoped>
  @import url("./moduleDivCss.less");

</style>
