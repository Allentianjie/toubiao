<template>
  <Modal
    v-model="newPlanningData.state"
    width="40%"
    :mask-closable="false"
    @on-cancel="closePlanning('ownPlanForm')"
  >
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>新增个人规划</span>
    </p>
    <div>
      <Form ref="ownPlanForm" :model="ownPlanForm" :rules="ruleValidate" :label-width="100">
        <Divider orientation="left">规划信息</Divider>
        <div class="fileBox">
          <Row>
            <Col span="11">
              <FormItem label="规划名称" prop="planName">
                <Input v-model="ownPlanForm.planName" placeholder/>
              </FormItem>
              <FormItem label="开始时间" prop="startTime">
                <DatePicker
                  @on-change="changeDatestart"
                  v-model="ownPlanForm.startTime"
                  style="width: 100%"
                  type="date"
                  placeholder
                ></DatePicker>
              </FormItem>
              <FormItem label="结束时间" prop="endTime">
                <DatePicker
                  @on-change="changeDateend"
                  v-model="ownPlanForm.endTime"
                  style="width: 100%"
                  type="date"
                  placeholder
                ></DatePicker>
              </FormItem>
              <FormItem label="规划备注" prop="remark">
                <Input
                  v-model="ownPlanForm.remark"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder
                />
              </FormItem>
            </Col>
            <Col span="12" style>
              <FormItem label="相关材料">
                <Button
                  @click="openAddFile"
                  class="add-doc"
                  ghost
                  type="success"
                  size="small"
                  icon="ios-add-circle-outline"
                >添加文件
                </Button>
                <div class="content">
                  <div
                    class="docList"
                    v-for="(item,index) in ownPlanForm.fileVos"
                    :key="index"
                  >
                    <Icon class="listItem" type="ios-paper"/>
                    <div class="listContent">{{item.fileName}}</div>
                    <div class="deleteIcon">
                      <Icon
                        @click="deleteOwnPlanFile(item,index)"
                        type="md-close"
                      />
                    </div>
                  </div>
                </div>
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
    <div slot="footer" style="text-align: center">
      <Button type="primary" size="large" @click="planningSubmit('ownPlanForm')">保存</Button>
      <Button type="warning" size="large" @click="planningReset('ownPlanForm')">重置</Button>
    </div>
    <AddFileModal ref="addFile" :addFileState="addFileState" @closeMains="closeMains"></AddFileModal>
  </Modal>
</template>

<script>
  import AddFileModal from "@/views/diagnosis/modal/addFile";
  import df from "@/api/utils";

  export default {
    components: {AddFileModal},
    props: {
      newPlanningData: {
        type: Object,
        required: true
      }
    },
    mounted() {
      // console.log(1, this.selectReset)
    },
    data() {
      return {
        addFileState: {
          //添加文件传过去的数据
          data: [],
          state: false
        },
        ownPlanForm: {
          //表单里面的数据
          planName: "",
          startTime: "",
          endTime: "",
          remark: "",
          fileVos: []
        },
        ruleValidate: {
          planName: [
            {
              required: true,
              message: "名称不能为空",
              trigger: "blur"
            },
            {
              type: "string",
              max: 200,
              message: "名称不能大于200字符",
              trigger: "blur"
            }
          ],
          startTime: [
            {
              required: true,
              type: "date",
              message: "请输入开始时间",
              trigger: "change"
            }
          ],
          endTime: [
            {
              required: true,
              type: "date",
              message: "请输入结束时间",
              trigger: "change"
            }
          ],
          remark: [
            {
              type: "string",
              max: 2000,
              message: "备注不能大于2000字符",
              trigger: "blur"
            }
          ],
        }
      };
    },
    methods: {
      //时间选择判断
      changeDatestart(val, data) {
        if (this.ownPlanForm.endTime) {
          if (this.ownPlanForm.startTime.valueOf() > this.ownPlanForm.endTime.valueOf()) {
            this.$Message.warning("开始时间不能晚于结束时间");
            this.ownPlanForm.startTime = '';
            return;
          }
        }
      },
      changeDateend(val, data) {
        if (this.ownPlanForm.startTime) {
          if (this.ownPlanForm.startTime.valueOf() > this.ownPlanForm.endTime.valueOf()) {
            this.$Message.warning("结束时间不能早于开始时间");
            this.ownPlanForm.endTime = '';
            return;
          }
        }
      },
      //打开个人你规划文件管理
      openFile(row, index) {

        //  var index=row.findIndex('id')
        //  console.log(index)
      },

      // 删除文件
      deleteOwnPlanFile(row, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除该文件？</p>',
          onOk: () => {
            this.ownPlanForm.fileVos.splice(index, 1);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      // 关闭添加文件框
      closeMains(val, sence, data) {
        this.addFileState.state = val;
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.ownPlanForm.fileVos.push({
              fileId: data[i].fileId,
              fileName: data[i].fileName
            });
          }
        }
        let obj = {};
        this.ownPlanForm.fileVos = this.ownPlanForm.fileVos.reduce(function (item, next) {
          obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
          return item;
        }, []);
      },
      // 打开添加文件框
      openAddFile() {
        this.addFileState.data = []; //传是哪个场景下的id
        this.addFileState.state = true;
        this.$refs.addFile.loadData();
      },
      //关闭modal
      closePlanning(name) {
        this.$refs[name].resetFields();
        this.$emit("closePlanning", {
          state: false,
          reload: false
        });
      },
      //保存
      planningSubmit(name) {
        let that = this;
        that.$refs[name].validate(valid => {
          if (valid) {
            let formData = {
              planName: that.ownPlanForm.planName,
              startTime: df.dateFormat(that.ownPlanForm.startTime).substr(0, 10),
              endTime: df.dateFormat(that.ownPlanForm.endTime).substr(0, 10),
              remark: that.ownPlanForm.remark
            };
            //处理支撑文件
            let fileData = that.ownPlanForm.fileVos;
            let files = [];
            if (fileData && fileData.length > 0) {
              fileData.forEach(o => {
                files.push(o.fileId);
              });
            }
            formData.files = files;
            that.$Post("/admin/ownplan", formData, function (data) {

              that.$Message.success("添加成功");
              that.$refs[name].resetFields();
              that.$emit("closePlanning", {
                state: false,
                reload: true
              });
            });
          }
        });
      },
      //重置
      planningReset(name) {
        this.$refs[name].resetFields();
      },
      resetOwnPlanForm() {
        this.ownPlanForm.fileVos.slice(0, this.ownPlanForm.fileVos.length)
        this.ownPlanForm = {
          //表单里面的数据
          planName: "",
          startTime: "",
          endTime: "",
          remark: "",
          fileVos: []
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  @import url("./newPlanningModal.less");
</style>
