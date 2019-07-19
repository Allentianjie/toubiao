<template>
  <div class="moduleDiv">
    <div class="titleDiv"><h3>课程概况</h3></div>
    <div class="rightBottomList">
      <div class="top">
        <div class="bigDiv"
             v-for="(item,index) in RightBottomData.top"
             :key="index"
             @click="topDel(item,index)">
          <div class="bigDiv_Div" >
            <div class="circle">
              <p class="topName">{{item.name}}</p>
              <p class="topVal">{{(item.val * 100).toFixed(2)}}{{item.unit}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottomDiv"
             v-for="(item,index) in RightBottomData.bottom"
             :key="index"
             @click="bottomDel(item,index)"
             :style="{cursor:(index==0 ? 'pointer' : 'default')}"
        >
          <div class="bottomList">
            <p class="BottomName">{{item.name}}</p>
            <p class="BottomVal">
              {{item.val}}  <span> {{item.unit}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      RightBottomData: {
        type: Object,
        required: true
      }
    },
    name: "rightBottomDiv",
    mounted(){

    },
    methods: {
      topDel: function (row,index) {
        // console.log('row',row)
        if(index === 0){
          // console.log('0')
          let obj = {
            name: row.name,
            symbol: '出勤率',
            val: (row.val * 100).toFixed(2),
          }
          this.$router.push({path: '/courseTwoChart', query: {obj: JSON.stringify(obj)}})
        }else if(index ===1){
          let obj = {
            name: row.name,
            symbol: '活跃度',
            val: (row.val * 100).toFixed(2),
          }
          this.$router.push({path: '/courseTwoChart', query: {obj: JSON.stringify(obj)}})
        }else if(index === 2){
          let obj = {
            name: row.name,
            symbol: '完成率',
            val: (row.val * 100).toFixed(2),
          }
          this.$router.push({path: '/courseTwoChart', query: {obj: JSON.stringify(obj)}})
        }
      },
      bottomDel: function (row, index) {
        // console.log(55,row)
        if (index === 0) {
          let obj = {
            name: row.name,
            val: row.val,
            nuit: row.unit,
            symbol: '',
            dataId: row.dataId
          }
          this.$router.push({path: '/courseTwoChart', query: {obj: JSON.stringify(obj)}})
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("./moduleDivCss.less");
</style>

