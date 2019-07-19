<template>
  <Modal v-model="princiBack.state" width="50%" :mask-closable="false" @on-cancel="closefeedBack">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>负责人列表</span>
    </p>
    <div style="width: 100%;height: 90%">
      <el-table
        stripe
        border
        :cell-style="heightGg"
        :header-cell-style="backHeader"
        :data="princiBack.data"
        style="width: 100%;min-height: 350px">
        <el-table-column prop="directorName" align="center" label="姓名"></el-table-column>
        <el-table-column prop="deptName" align="center" label="部门"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <p style="color:#2d8cf0;cursor: pointer"  @click="principalClick(scope.row)">查看</p>
          </template>

        </el-table-column>
      </el-table>
      <!--<Table :columns="columns1" :data="data1"></Table>-->
    </div>
    <div slot="footer" style="text-align: right">
      <Button type="primary" size="large" @click="closefeedBack">关闭</Button>
        <!--<Page :total="total" :current="page" @on-change="changePage" show-total></Page>-->
    </div>
  </Modal>
</template>

<script>
  export default {
    components: { },
    props: {
      princiBack: {
        type: Object,
        required: true
      }
    },
    mounted() {
    },
    data() {
      return {
        heightGg:{
          'padding': '6px'
        },
        backHeader:{
          'background': '#f8f8f9'
        },
      }
    },
    created() {
      // this.getTabledata() //获取echart任务数据
    },
    watch: {
      // princiBack: {
      //   handler(newValue, oldValue) {
      //     this.$nextTick(() => {
      //       this.getTabledata();
      //     });
      //   },
      //   deep: true
      // }
    },
    methods: {
      // 点击操作--查看
      principalClick (row) {
        // console.log(99,row)
        this.$router.push({path: '/tasksFull',query: {id:row.directorId,breadcrumb:this.princiBack.breadcrumb}})
      },
      //关闭弹窗
      closefeedBack() {
        // console.log("关闭了");
        let flag = false;
        this.$emit("closePrincipal", flag);
      },

    }
  }
</script>
<style lang="less" scoped>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  ::-webkit-scrollbar {
    width: 6px;
    height: 16px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.63);
  }

</style>
