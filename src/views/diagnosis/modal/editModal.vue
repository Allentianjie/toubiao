<template>
  <Modal v-model="modifyEdits.state" width="40%" :mask-closable="false" @on-cancel="closeModal()">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>{{title}}</span>
    </p>
    <div>
      <Row>
        <Col span="12">
          <h3 style="padding: 0 0 20px 20px">基本信息：</h3>
          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80"
          >
            <FormItem v-if="!isChange" label="名称" prop="hieName">
              <Input v-model="formValidate.hieName" placeholder="请输入名称"/>
            </FormItem>
            <FormItem v-if="isChange" label="名称" prop="hieName">
              <Select v-model="formValidate.hieName">
                <Option
                  v-for="item in nameList"
                  :value="item.label"
                  :key="item.value"
                >{{ item.label }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="目标" prop="target">
              <Input v-model="formValidate.target" placeholder="请输入目标"/>
            </FormItem>
            <FormItem label="开始时间" prop="startTime">
              <DatePicker
                @on-change="changeDatestart"
                style="width: 100%"
                type="date"
                :options="pickerOptions"
                placeholder
                v-model="formValidate.startTime"
              ></DatePicker>
            </FormItem>
            <FormItem label="结束时间" prop="endTime">
              <DatePicker
                @on-change="changeDateend"
                style="width: 100%"
                type="date"
                :options="pickerOptions"
                placeholder
                v-model="formValidate.endTime"
              ></DatePicker>
            </FormItem>
            <FormItem label="负责人" prop="directorData">
              <Button
                @click="openPrincipal"
                class="add-doc"
                ghost
                type="success"
                size="small"
                icon="ios-add-circle-outline"
              >添加负责人
              </Button>
              <div class="personData">
                <Tag
                  v-for="(item,index) in formValidate.directorData"
                  :key="item.directorId"
                  :name="item.directorName"
                  closable
                  @on-close="handleClosePerson(item,index)"
                >{{ item.directorName}}
                </Tag>
              </div>
            </FormItem>
            <Principal
              ref="principal"
              :PrincipalData="PrincipalData"
              @closePrincipal="closePrincipal"
            ></Principal>
            <FormItem label="启用">
              <i-switch
                size="large"
                v-model="formValidate.enableFlag"
                trueValue="0"
                falseValue="1"
              >
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </FormItem>
            <FormItem label="权重">
              <InputNumber v-model="formValidate.weight" :min="0" :max="100"/>
            </FormItem>
            <FormItem label="备注说明" prop="remark">
              <Input
                v-model="formValidate.remark"
                type="textarea"
                :autosize="{minRows: 2.5,maxRows: 3}"
                placeholder="备注说明..."
              />
            </FormItem>
          </Form>
        </Col>
        <Col span="12" style="padding-left: 30px">
          <h3 class="title" style="padding: 0 0 20px 0">支撑材料：</h3>
          <Button
            @click="openAddFile"
            class="add-doc"
            ghost
            type="success"
            size="small"
            icon="ios-add-circle-outline"
          >添加文件
          </Button>
          <AddFileModal
            ref="addFile"
            :addFileState="addFileState"
            @closeMains="closeMains"
          ></AddFileModal>
          <div class="content">
            <div
              class="docList"
              v-for="(item,index) in formValidate.fileData"
              :key="index"
            >
              <Icon class="listItem" type="ios-paper"/>
              <div class="listContent">{{item.fileName}}</div>
              <div class="deleteIcon1">
                <Button
                  class="textbtn"
                  size="small"
                  @click="openPreviewModal(item)"
                  type="success"
                  ghost
                >预览
                </Button>
              </div>
              <div class="deleteIcon">
                <Icon @click="deleteFile(item,index)" type="md-close"/>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div slot="footer" style="text-align: center">
      <Button type="primary" size="large" @click="handleSubmit('formValidate')">保存</Button>
      <Button type="warning" size="large" @click="handleReset('formValidate')">重置</Button>
      <Button v-show="deleteHieState" type="error" size="large" @click="handleDelete('formValidate')">删除</Button>
    </div>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
  </Modal>
</template>

<script>
  import Principal from "@/components/principal";
  import AddFileModal from "./addFile";
  import df from "@/api/utils";
  import Preview from "@/components/preview";

  export default {
    name: "modifyModal",
    props: {
      modifyEdits: {
        type: Object,
        required: true
      }
    },
    components: {AddFileModal, Principal, Preview},
    data() {
      return {
        deleteHieState: false,
        previews: {
          name: "",
          //预览文件数据
          data: [],
          state: false
        },
        modalParam: {
          minTime: "",
          maxTime: ""
        },
        pickerOptions: {
          disabledDate: time => {
            return this.dealDisabledDate(time);
          }
        },
        PrincipalData: {
          data: [],
          state: false
        }, //添加负责人弹框
        isChange: false, //判断是否是层面名称为下拉框
        title: "", //框标题
        updateModal: false,
        addFileState: {
          //添加文件传过去的数据
          data: [],
          state: false
        },
        hieData: {
          id: null,
          hieLevel: 11, //11:体系,12:层面,13:维度,14:质控点
          parentId: 0, //父ID
          directors: [], //负责人ID集合
          files: [] //支撑文件ID集合
        },
        nameList: [
          //层面的选择下拉
          {label: "学校", value: "1"},
          {label: "专业", value: "2"},
          {label: "课程", value: "3"},
          {label: "教师", value: "4"},
          {label: "学生", value: "5"}
        ],
        formValidate: {
          //表单的数据
          hieName: "",
          target: "",
          startTime: "",
          endTime: "",
          directorData: [],
          fileData: [],
          remark: "",
          enableFlag: "0",
          weight: 1
        },
        ruleValidate: {
          hieName: [
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
            },
            {required: true, message: "请选择层面", trigger: "change"}
          ],
          target: [
            {
              required: true,
              message: "目标不能为空",
              trigger: "blur"
            },
            {
              type: "string",
              max: 500,
              message: "目标不能大于500字符",
              trigger: "blur"
            }
          ],
          startTime: [
            {
              required: true,
              type: 'date',
              message: "请输入开始时间",
              trigger: "change"
            }
          ],
          directorData: [
            {
              required: true,
              type: "array",
              message: "请选择负责人",
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
          ]
        }
      };
    },
    methods: {
      //时间选择判断
      changeDatestart(val, data) {
        if (this.formValidate.endTime) {
          if (this.formValidate.startTime.valueOf() > this.formValidate.endTime.valueOf()) {
            this.$Message.warning("开始时间不能晚于结束时间");
            this.formValidate.startTime = '';
            return;
          }
        }
      },
      changeDateend(val, data) {
        if (this.formValidate.startTime) {
          if (this.formValidate.startTime.valueOf() > this.formValidate.endTime.valueOf()) {
            this.$Message.warning("结束时间不能早于开始时间");
            this.formValidate.endTime = '';
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
        // console.log(row);
        //把选择的文件数据===>previews.data传给子组件
        this.previews.name = row.fileSuffix;
        this.previews.data = "/mngfile/chunkfile/previewStream/" + row.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      dealDisabledDate(date) {
        return (
          (date &&
            this.modalParam.minTime &&
            date.valueOf() < this.modalParam.minTime.valueOf()) ||
          (date &&
            this.modalParam.maxTime &&
            date.valueOf() > this.modalParam.maxTime.valueOf())
        );
      },
      //删除负责人
      handleClosePerson(row, index) {
        let that = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除该负责人？</p>',
          onOk: () => {
            that.formValidate.directorData.splice(index, 1);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      //关闭添加负责人
      closePrincipal(data) {
        this.PrincipalData.state = false;
        if (data && data.length > 0) {
          data.forEach(o => {
            this.formValidate.directorData.push({
              directorId: o.userId,
              directorName: o.name
            });
          });
        }
        let obj = {};//数组对象去重
        this.formValidate.directorData = this.formValidate.directorData.reduce(function (item, next) {
          obj[next.directorId] ? '' : obj[next.directorId] = true && item.push(next);
          return item;
        }, []);
      },
      // 判断传过来是否有值
      getModifyEdits(obj) {
        let minTime = obj.minTime;
        let maxTime = obj.maxTime;
        if (minTime && maxTime) {
          this.modalParam.minTime = new Date(minTime.replace("-", "/"));
          this.modalParam.maxTime = new Date(maxTime.replace("-", "/"));
        } else {
          this.modalParam.minTime = "";
          this.modalParam.maxTime = "";
        }
        this.hieData.id = null;
        this.hieData.hieLevel = obj.hieLevel;
        this.hieData.parentId = this.modifyEdits.data.pid;
        if (Object.keys(this.modifyEdits.data).length === 1) {
          //新增
          this.updateModal = false;
          if (obj.hieLevel == 11) {
            this.deleteHieState = false;
            this.isChange = false;
            this.title = "添加诊改体系";
          } else if (obj.hieLevel == 12) {
            this.deleteHieState = false;
            this.isChange = true;
            this.title = "添加诊改层面";
          } else if (obj.hieLevel == 13) {
            this.deleteHieState = false;
            this.isChange = false;
            this.title = "添加诊改维度";
          } else if (obj.hieLevel == 14) {
            this.deleteHieState = false;
            this.isChange = false;
            this.title = "添加诊改质控点";
          }
        } else {
          //修改
          this.updateModal = true;
          this.hieData.id = this.modifyEdits.data.id;
          if (obj.hieLevel == 11) {
            this.deleteHieState = true;
            this.isChange = false;
            this.title = "编辑诊改体系";
          } else if (obj.hieLevel == 12) {
            this.deleteHieState = true;
            this.isChange = true;
            this.title = "编辑诊改层面";
          } else if (obj.hieLevel == 13) {
            this.deleteHieState = true;
            this.isChange = false;
            this.title = "编辑诊改维度";
          } else if (obj.hieLevel == 14) {
            this.deleteHieState = true;
            this.isChange = false;
            this.title = "编辑诊改质控点";
          }
        }
        this.handleReset("formValidate");
      },
      //打开添加负责人
      openPrincipal() {
        this.PrincipalData.state = true;
        this.$refs.principal.loadData();
      },
      //通过传过来的数据id去请求文件
      getFileData(files) {
        let fileData = [];
        if (files && files.length > 0) {
          files.forEach(file => {
            fileData.push({
              fileId: file.fileId,
              fileSuffix: file.fileSuffix,
              fileName: file.fileName
            });
          });
        }
        this.$set(this.formValidate, "fileData", fileData);
      },
      //通过传过来的数据id去请求绑定数据
      getFormValidate() {
        let that = this;
        that.$Get("/admin/hierarchy/" + that.hieData.id, {}, function (
          data
        ) {
          that.formValidate = {
            //表单的数据
            hieName: data.data.hieName,
            target: data.data.target,
            startTime: data.data.startTime,
            endTime: data.data.endTime,
            weight: data.data.weight,
            enableFlag: data.data.enableFlag,
            directorData: data.data.directors,
            fileData: [],
            remark: data.data.remark
          };
          that.hieData.parentId = data.data.parentId;
          //获取支撑文件
          that.getFileData(data.data.files);
        });
      },
      // 关闭添加文件框
      closeMains(val, sence, data) {
        if (data.length > 0) {
          data.forEach(e => {
            this.formValidate.fileData.push(e);
          });
        }
        let obj = {};
        this.formValidate.fileData = this.formValidate.fileData.reduce(function (item, next) {
          obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
          return item;
        }, []);
        this.addFileState.state = val;
      },
      // 关闭修改框
      closeModal() {
        this.$emit("closeMain", {state: false, reload: false});
        this.modifyEdits.state = false;
      },
      // 打开添加文件框
      openAddFile() {
        this.addFileState.data = []; //传是哪个场景下的id
        this.addFileState.state = true;
        this.$refs.addFile.loadData();
      },
      // 删除文件
      deleteFile(row, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认该操作？</p>',
          onOk: () => {
            this.formValidate.fileData.splice(index, 1);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      // 保存
      handleSubmit(name) {
        let that = this;
        that.$refs[name].validate(valid => {
          if (valid) {
            if (
              that.formValidate.startTime.valueOf() >
              that.formValidate.endTime.valueOf()
            ) {
              that.$Message.warning("开始时间不能晚于结束时间");
              return;
            }

            // 处理日期
            let formData = {
              hieName: that.formValidate.hieName,
              target: that.formValidate.target,
              remark: that.formValidate.remark,
              weight: that.formValidate.weight,
              enableFlag: that.formValidate.enableFlag,
              startTime: df
                .dateFormat(that.formValidate.startTime)
                .substr(0, 10),
              endTime: df
                .dateFormat(that.formValidate.endTime)
                .substr(0, 10)
            };
            //处理负责人
            let directorData = that.formValidate.directorData;
            // if (!(directorData && directorData.length > 0)) {
            //     this.$Message.error("请选择负责人");
            //     return;
            // }
            let directors = [];
            directorData.forEach(o => {
              directors.push(o.directorId);
            });
            // debugger
            that.hieData.directors = directors;
            //处理支撑文件
            let fileData = that.formValidate.fileData;
            let files = [];
            if (fileData && fileData.length > 0) {
              fileData.forEach(o => {
                files.push(o.fileId);
              });
            }
            that.hieData.files = files;
            // debugger
            let param = Object.assign(formData, that.hieData);
            if (that.updateModal) {
              that.$Put("/admin/hierarchy", param, function (data) {
                if(data.code != undefined){
                  that.$Message.success("修改成功");
                }
                that.$emit("closeMain", {
                  state: false,
                  reload: true
                });
                that.modifyEdits.state = false;
              });
            } else {
              that.$Post("/admin/hierarchy", param, function (data) {
                if (data.code != undefined) {
                  that.$Message.success("添加成功");
                }
                that.$emit("closeMain", {
                  state: false,
                  reload: true
                });
                that.modifyEdits.state = false;
              });
            }
          }
        });
      },
      // 重置
      handleReset(name) {
        this.$refs[name].resetFields();
        if (this.updateModal) {
          this.getFormValidate();
        } else {
          this.formValidate = {
            hieName: "",
            target: "",
            startTime: this.modalParam.minTime,
            endTime: this.modalParam.maxTime,
            directorData: [],
            fileData: [],
            remark: "",
            enableFlag: "0",
            weight: 1
          };
        }
      },
      /**
       * @description: 删除体系
       * @param {type}
       * @return:
       */
      handleDelete(name) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>删除该层面会同时删除下面所有指标数据？</p>',
          onOk: () => {
            this.$Delete("/admin/hierarchy/" + this.modifyEdits.data.id, {}, res => {
              if (res.code == 0) {
                this.$Message.success("删除成功");
                this.$emit("closeMain", {
                  state: false,
                  reload: true
                });
              } else {
                this.$Message.error(res.msg);
              }
            })
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .title {
    float: left;
    display: inline-block;
  }

  .add-doc {
    float: right;
    display: inline-block;
  }

  .content {
    clear: both;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 350px;
    padding: 10px;
    margin: 0 auto;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    border-radius: 3px;

    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
    -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
    -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
  }

  .docList {
    width: 100%;
    height: 35px;
    margin-top: 5px;
    background: #f6f9ff;
    border-radius: 3px;

    .listItem {
      float: left;
      display: inline-block;
      width: 10%;
      height: 35px;
      color: #94c6e7;
      font-size: 30px;
      line-height: 35px;
    }

    .listContent {
      float: left;
      overflow: hidden;
      width: 55%;
      height: 35px;
      margin-left: 5%;
      line-height: 35px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .deleteIcon {
      float: right;
      width: 10%;
      height: 35px;
      margin-left: 5%;
      color: red;
      font-size: 15px;
      line-height: 35px;
      text-align: center;
    }

    .deleteIcon1 {
      float: left;
      width: 10%;
      height: 35px;
      margin-left: 5%;
      color: red;
      font-size: 15px;
      line-height: 35px;
      text-align: center;
    }
  }

  .addCircle {
    color: #159f5c;
    font-size: 20px;
  }

  .personData {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 80px;
    padding: 0 10px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    border-radius: 3px;

    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
    -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
    -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 6px;
    height: 16px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, .63);
    border-radius: 6px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    background-color: #719ad8;
    border-radius: 6px;

    -webkit-box-shadow: inset 0 0 6px rgba(113, 154, 216, .3);
  }
</style>
