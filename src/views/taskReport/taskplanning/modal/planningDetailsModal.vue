<template>
  <Modal
    v-model="historyDetails.state"
    width="60%"
    :mask-closable="false"
    @on-cancel="closeOwnPlanDetail"
  >
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>历史规划</span>
    </p>
    <div>
      <Form :model="ownPlanDetailForm" :label-width="100">
        <Divider orientation="left">规划详情</Divider>
        <div class="fileBox">
          <Row>
            <Col span="11">
              <FormItem label="规划名称">
                <Input v-model="ownPlanDetailForm.planName" disabled placeholder/>
              </FormItem>
              <FormItem label="完成进度">
                <el-progress
                  style="margin-top: 10px"
                  :stroke-width="12"
                  :percentage="ownPlanDetailForm.percentage"
                ></el-progress>
              </FormItem>
              <FormItem label="开始时间">
                <DatePicker
                  @on-change="changeDatestart"
                  v-model="ownPlanDetailForm.startTime"
                  style="width: 100%"
                  disabled
                  type="date"
                  placeholder
                ></DatePicker>
              </FormItem>
              <FormItem label="结束时间">
                <DatePicker
                  @on-change="changeDateend"
                  v-model="ownPlanDetailForm.endTime"
                  style="width: 100%"
                  type="date"
                  disabled
                  placeholder
                ></DatePicker>
              </FormItem>
              <FormItem label="规划状态">
                <Input placeholder disabled v-model="ownPlanDetailForm.state"/>
              </FormItem>
            </Col>
            <Col span="12" style>
              <FormItem label="相关材料">
                <div class="content">
                  <div
                    class="docList"
                    v-for="(item,index) in ownPlanDetailForm.planFiles"
                    :key="index"
                  >
                    <Icon class="listItem" type="ios-paper"/>
                    <div class="listContent">{{item.fileName}}</div>
                    <div class="deleteIcon">
                      <Button
                        class="textbtn"
                        size="small"
                        @click="openPreviewModal(item)"
                        type="success"
                        ghost
                      >预览
                      </Button>
                    </div>
                  </div>
                </div>
              </FormItem>
              <FormItem label="规划备注" prop="remark">
                <Input
                  v-model="ownPlanDetailForm.remark"
                  type="textarea"
                  disabled
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder
                />
              </FormItem>
            </Col>
          </Row>
        </div>
        <Divider orientation="left">规划项目</Divider>
        <div>
          <Table
            :columns="currentProjectColumns"
            :data="currentProjectData"
            style="margin-top:5px;min-height:200px"
          >
            <template slot-scope="{ row, index }" slot="projectName">
              <span>{{ row.projectName }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="targetValue">
              <span>{{getStrategySymbol(row.targetStrategy) + row.targetValue }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="warnValue">
              <span>{{getStrategySymbol(row.warnStrategy) + row.warnValue }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="currentValue">
              <span>{{ row.currentValue }}</span>
            </template>
            <template slot-scope="{ row}" slot="targetState">
              <span v-if="row.targetState === '1' ">达标</span>
              <span v-else>未达标</span>
            </template>
            <template slot-scope="{ row, index }" slot="startTime">
              <span>{{ row.startTime }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="endTime">
              <span>{{ row.endTime }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="fileVos">
              <Button type="success" ghost @click=" openFileList(row, index,2) ">查看</Button>
            </template>
          </Table>
          <div style="margin: 10px;overflow: hidden;text-align:right">
            <Page
              :total="projectPage.total"
              :showTotal="projectPage.showTotal"
              :current="projectPage.current"
              :page-size="projectPage.size"
              @on-change="changeHistoryProjectPage"
            ></Page>
          </div>
        </div>
      </Form>
    </div>
    <div slot="footer" style="text-align: center">
      <Button type="warning" size="large" @click="closeOwnPlanDetail">关闭</Button>
    </div>
    <FileManage ref="ownPlanFileManage" :fileList="fileList" @closeFileManage="closeFileManage"></FileManage>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
  </Modal>
</template>

<script>
  import FileManage from "./fileManage"; //引入文件管理Modal
  import Preview from "@/components/preview";

  export default {
    components: {
      FileManage,
      Preview
    },
    props: {
      historyDetails: {
        type: Object,
        required: true
      }
    },
    mounted() {
      // console.log(1, this.selectReset)
    },
    data() {
      return {
        previews: {
          name: "",
          //预览文件数据
          data: [],
          state: false
        },
        ownPlanDetailForm: {
          //表单里面的数据
          planName: "",
          startTime: "",
          endTime: "",
          remark: "",
          percentage: 0,
          planState: "未达标",
          planFiles: []
        },
        projectPage: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        currentProjectColumns: [
          {
            title: "项目名称",
            key: "projectName",
            align: "center",
            slot: "projectName",
            minWidth: 200,
            tooltip: true,

          },
          {
            title: "目标值",
            key: "targetValue",
            width: 100,
            align: "center",
            slot: "targetValue"
          },
          {
            title: "预警值",
            key: "warnValue",
            width: 100,
            align: "center",
            slot: "warnValue"
          },
          {
            title: "当前值",
            key: "currentValue",
            width: 100,
            align: "center",
            slot: "currentValue"
          },
          {
            title: "完成状态",
            key: "targetState",
            width: 100,
            align: "center",
            slot: "targetState"
          },
          {
            title: "开始时间",
            key: "startTime",
            align: "center",
            width: 110,
            slot: "startTime"
          },
          {
            title: "结束时间",
            key: "endTime",
            width: 110,
            align: "center",
            slot: "endTime"
          },
          {
            title: "附件",
            key: "projectId",
            width: 100,
            align: "center",
            slot: "fileVos"
          }
        ],
        currentProjectData: [],
        operator: [
          {label: 21, value: ">"},
          {label: 22, value: "<"},
          {label: 23, value: "="},
          {label: 24, value: "≥"},
          {label: 25, value: "≤"}
          // { label: 26, value: "无" }
        ],
        fileList: {
          //管理文件list
          type: "",
          state: false,
          data: []
        }
      };
    },
    methods: {
      //时间选择判断
      changeDatestart(val, data) {
        if (this.ownPlanDetailForm.endTime) {
          if (this.ownPlanDetailForm.startTime.valueOf() > this.ownPlanDetailForm.endTime.valueOf()) {
            this.$Message.warning("开始时间不能晚于结束时间");
            this.ownPlanDetailForm.startTime = '';
            return;
          }
        }
      },
      changeDateend(val, data) {
        if (this.ownPlanDetailForm.startTime) {
          if (this.ownPlanDetailForm.startTime.valueOf() > this.ownPlanDetailForm.endTime.valueOf()) {
            this.$Message.warning("结束时间不能早于开始时间");
            this.ownPlanDetailForm.endTime = '';
            return;
          }
        }
      },
      //关闭预览
      closePreview(val) {
        this.previews.state = val;
      },

      //打开预览
      openPreviewModal(row) {
        //把选择的文件数据===>previews.data传给子组件
        this.previews.name = row.fileSuffix
        this.previews.data = '/mngfile/chunkfile/previewStream/' + row.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      //关闭文件管理
      closeFileManage(val) {
        this.fileList.state = val;
      },
      // 打开文件管理
      openFileList(row, index, val) {
        //val:当前规划项目文件查看val=1/历史规划项目文件查看val=2
        //当前点击的支持文件行数据传过去
        let that = this;
        let projectId = row.projectId
        that.$Get("/admin/ownplan/project/file/" + projectId, {}, function (data) {
          that.fileList.type = val
          that.fileList.data = {targetFiles: data.data};
          that.fileList.state = true;
          that.$refs.ownPlanFileManage.getFileList(); //触发文件管理页面的获取数据方法
        });
      },

      getPlanState: function () {
        let planState = this.ownPlanDetailForm.planState;
        return planState === "1" ? "已达标" : "未达标";
      },
      //获取项目进度
      getProjectProcess(projectCount) {
        if (!projectCount) return 0;
        let total = projectCount.total;
        let doneTotal = projectCount.doneTotal;
        if (total === 0) {
          return 0;
        }
        let percentage = Math.floor((doneTotal / total) * 100);
        return percentage;
      },
      getProjectHistoryData() {
        this.ownPlanDetailForm = this.historyDetails.data;
        this.ownPlanDetailForm.percentage = this.getProjectProcess(
          this.ownPlanDetailForm.projectCount
        );
        this.ownPlanDetailForm.state = this.getPlanState();
        this.getProjectTableData();
      },
      //获取规划项目表格数据
      getProjectTableData() {
        let that = this;
        that.$Get(
          "/admin/ownplan/project/page",
          Object.assign(that.projectPage, {
            planId: that.ownPlanDetailForm.planId
          }),
          function (data) {
            that.currentProjectData = data.data.records;
            that.projectPage.total = data.data.total;
          }
        );
      },
      changeHistoryProjectPage(val) {
        this.projectPage.current = val;
        //下面调用请求表数据接口
        this.getProjectTableData();
      },
      //关闭modal
      closeOwnPlanDetail() {
        this.$emit("closePlanningDetailModal", false);
      },
      //获取策略符号
      getStrategySymbol(data) {
        if (data === 21) {
          return ">";
        } else if (data === 22) {
          return "<";
        } else if (data === 23) {
          return "=";
        } else if (data === 24) {
          return "≥";
        } else if (data === 25) {
          return "≤";
        } else {
          return "";
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  @import url("./newPlanningModal.less");
</style>
