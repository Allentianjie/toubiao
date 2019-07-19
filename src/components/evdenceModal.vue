<template>
  <Modal v-model="evidenceData.state" width="50%" :mask-closable="false" @on-cancel="closefeedBack">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>佐证文件列表</span>
    </p>
    <div style="width: 100%;height: 90%">
      <el-table
        stripe
        border
        :cell-style="heightGg"
        :header-cell-style="backHeader"
        :data="data"
        style="width: 100%;min-height: 350px">
        <el-table-column prop="fileName" align="center" label="文件名"></el-table-column>
        <el-table-column prop="createByName" align="center" label="填报人"></el-table-column>
        <el-table-column prop="createTime" align="center" label="填报时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <Button @click="openPreviewModal(scope.row)" type="text" size="small" style="color:#3f7ae6;fontSize:14px">
              预览
            </Button>
            <Button @click="download(scope.row)" type="text" size="small" style="color:#3f7ae6;fontSize:14px">
              下载
            </Button>
          </template>
        </el-table-column>
      </el-table>
      <div class="M_search" style="text-align:right">
        <Page
          :total="total"
          :showTotal="true"
          :current="current"
          :page-size="size"
          @on-change="changeindexPage"
        ></Page>
      </div>
      <!--<Table :columns="columns1" :data="data1"></Table>-->
    </div>
    <div slot="footer" style="text-align: right">
      <Button type="primary" size="large" @click="closefeedBack">关闭</Button>
      <!--<Page :total="total" :current="page" @on-change="changePage" show-total></Page>-->
    </div>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
  </Modal>
</template>

<script>
  import Preview from "@/components/preview";
  export default {
    components: {Preview},
    props: {
      evidenceData: {
        type: Object,
        required: true
      }
    },
    mounted() {
    },
    data() {
      return {
        previews: {
          name: "",
          //预览文件数据
          data: [],
          state: false
        },
        total: 0,
        current: 1,
        size: 10,
        data: null,
        heightGg: {
          'padding': '6px'
        },
        backHeader: {
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
      changeindexPage(val) {
        this.current = val;
        this.getData()
      },
      getData() {
        this.taskId = this.evidenceData.data;
        let parms = {
          current: this.current,
          size: this.size,
          taskId: this.taskId
        };
        this.$Get("/admin/task/dataFile/page", parms, res => {
          if (res.code == 0) {
            this.data = res.data.records;
            this.total = res.data.total
          }
        })

      },
      //关闭预览
      closePreview(val) {
        this.previews.state = val;
      },

      //打开预览
      openPreviewModal(row) {
        // console.log(row);
        //把选择的文件数据===>previews.data传给子组件
        this.previews.name = row.fileSuffix;
        this.previews.data = "/mngfile/chunkfile/previewStream/" + row.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      // 下载
      download (row) {
        let that = this;
        let id = row.fileId;
        that.$DownLoad("/mngfile/chunkfile/download/" + id, null);
      },
      //关闭弹窗
      closefeedBack() {
        // console.log("关闭了");
        let flag = false;
        this.$emit("closeEvdence", flag);
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
