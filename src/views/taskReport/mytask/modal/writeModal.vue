<template>
  <Modal v-model="taskWrite.state" width="40%" :mask-closable="false" @on-cancel="closeTaskWrite">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>任务填报</span>
    </p>
    <div id="write">
      <Row>
        <Col span="24">
          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="100"
          >
            <FormItem label="所属体系:">
              <span class="name">{{hierarchyName}}</span>
            </FormItem>
            <FormItem label="指标名称:">
              <span>{{task.targetName}}</span>
            </FormItem>
            <FormItem label="所属机构:">
              <span>{{task.deptName}}</span>
            </FormItem>
            <FormItem label="基础数据:">
              <span>{{task.dataName}}</span>
            </FormItem>
            <FormItem label="任务名称:">
              <span>{{task.taskName}}</span>
            </FormItem>
            <FormItem label="数据类型:">
              <span>{{dataType}}</span>
            </FormItem>
            <FormItem label="当前数据维度:">
              <span>{{task.dataDim}}</span>
            </FormItem>
            <FormItem label="当前值:">
              <span>{{task.dataValue}}</span>
            </FormItem>
            <FormItem label="佐证材料">
              <!--目标文件 默认为1-->
              <Button
                @click="openAddFile()"
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
                  v-for="(item,index) in targetFileVos"
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
                    <Icon
                      @click="deleteTargetFile(item,index)"
                      type="md-close"
                    />
                  </div>
                </div>
              </div>
            </FormItem>
            <!-- <FormItem label="填报数据维度" v-if="dimCount>0">
              <Row v-if="task.dimType ==='1'">
                <DateSelect v-on:dateSelected="dateSelected"></DateSelect>
              </Row>
              <Row v-if="task.dimType ==='2'">
                <Col span="12">
                  <Select v-model="formValidate.dimAcyear" placeholder="学年">
                    <Option v-for="(item,index) in academicYear" :key="index" :value="item">{{item}}</Option>
                  </Select>
                </Col>
                <Col span="12">
                  <Select v-model="formValidate.dimSemester" placeholder="学期">
                    <Option value="1">第一学期</Option>
                    <Option value="2">第二学期</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>-->

            <FormItem label="选择时间类型:" v-if="dimCount === 0">
              <Row>
                <RadioGroup v-model="dimType">
                  <Radio label="1">自然年</Radio>
                  <Radio label="2">学年</Radio>
                </RadioGroup>
              </Row>
            </FormItem>

            <FormItem label="填报数据维度:">
              <Row v-show="dimType==='1'">
                <DateSelect ref="dateSelect" v-on:dateSelected="dateSelected"></DateSelect>
              </Row>
              <Row v-show="dimType==='2'">
                <Col span="12">
                  <el-select v-model="formValidate.dimAcyear" placeholder="学年">
                    <el-option
                      v-for="(item,index) in academicYear"
                      :key="index"
                      :value="item"
                    >{{item}}
                    </el-option>
                  </el-select>
                </Col>
                <Col span="12">
                  <el-select v-model="formValidate.dimSemester" placeholder="学期">
                    <el-option value="1">第一学期</el-option>
                    <el-option value="2">第二学期</el-option>
                  </el-select>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="填报数值:" prop="dataValue">
              <!-- <Input v-model="formValidate.dataValue" placeholder="请输入数据值"/> -->
              <Row v-if="dataTypes !== 5">
                <Col :span="12">
                  <Input v-model="formValidate.dataValue" placeholder="请输入数据值"/>
                </Col>
                <Col :span="12">
                  <Input v-model="fulltargetValue" disabled placeholder/>
                </Col>
              </Row>
              <Row v-if="dataTypes === 5">
                <!-- <el-radio v-model="formValidate.dataValue" label="0">否</el-radio>
                <el-radio v-model="formValidate.dataValue" label="1">是</el-radio>-->
                <Col :span="12">
                  <Select v-model="formValidate.dataValue" placeholder="请选择填报数值">
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <BasicData ref="basicdata" :basicData="basicData" @closeBasicData="closeBasicData"></BasicData>
    <div slot="footer" style="text-align: center">
      <Button type="primary" size="large" @click="TaskWriteSubmit('formValidate')">保存</Button>
      <Button type="warning" size="large" @click="TaskWriteReset()">重置</Button>
    </div>
    <AddFileModal :addFileState="addFileState" ref="addFile" @closeMains="closeMains"></AddFileModal>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
  </Modal>
</template>

<script>
  import Preview from "@/components/preview"; // 加入这个报错先联调成功再改
  import AddFileModal from "@/components/evidenceFile";
  import BasicData from "@/components/basicdata";
  import DateSelect from "@/components/dateselect";
  import {writeTask} from "@/api/task/mytask";
  import {setTimeout} from "core-js";
  import {getDimType} from "@/api/database/dimension";

  export default {
    components: {BasicData, DateSelect, Preview, AddFileModal},
    props: {
      taskWrite: {
        type: Object,
        required: true
      }
    },
    watch: {
      dimType(val) {
        if (val == 1) {
          this.formValidate.dimAcyear = "";
          this.formValidate.dimSemester = "";
        } else {
          this.formValidate.dimDay = "";
          this.formValidate.dimMonth = "";
          this.formValidate.dimYear = "";
        }
      }
    },
    computed: {
      fulltargetValue: function () {
        //根据不同的数据类型展示不同类型的值
        if (this.formValidate.dataValue == undefined) {
          return "";
        } else {
          if (this.dataTypes == "0") {
            //整数
            return Math.round(this.formValidate.dataValue);
          } else if (this.dataTypes == "1") {
            //小数
            return parseFloat(this.formValidate.dataValue).toFixed(2);
          } else if (this.dataTypes == "2") {
            //百分比
            // console.log
            return this.formValidate.dataValue + "%";
          } else if (this.dataTypes == "3") {
            //千分比
            return this.formValidate.dataValue + "‰";
          } else if (this.dataTypes == "4") {
            //比例
            return this.formValidate.dataValue + " ：1";
          } else {
            return this.formValidate.dataValue;
          }
        }
      },
      hierarchyName: function () {
        return (
          this.task.hieName +
          " / " +
          this.task.levelName +
          " / " +
          this.task.dimName +
          " / " +
          this.task.pointName +
          " / " +
          this.task.targetName
        );
      },
      dataType: function () {
        var dataType = "";
        switch (this.task.dataType) {
          case 0:
            dataType = "整数";
            break;
          case 1:
            dataType = "小数";
            break;
          case 2:
            dataType = "百分比";
            break;
          case 3:
            dataType = "千分比";
            break;
          case 4:
            dataType = "比例";
            break;
          case 5:
            dataType = "布尔值";
            break;
        }
        return dataType;
      },
      dimLength: function () {
        if (this.task.dataDim != "") {
          return this.task.dataDim.length;
        } else {
          return 0;
        }
      }
    },
    data() {
      return {
        previews: {//预览文件数据
          data: [],
          state: false,
          name: ""
        },
        addFileState: {
          //添加文件传过去的数据
          data: [],
          state: false
        },
        targetFileVos: [],//佐证材料
        dataTypes: "",
        basicData: {
          state: false,
          data: []
        },
        formValidate: {},
        ruleValidate: {
          dataValue: [
            {
              required: true,
              message: "不能为空",
              trigger: "blur"
            },
          ]
        },
        academicYear: [],
        dataDim: "",
        dimType: "1",
        dimCount: 0, //同identId标识下所有维度数据值数量
        task: {}
      };
    },
    methods: {
      //关闭预览
      closePreview(val) {
        this.previews.state = val;
      },

      // 预览
      openPreviewModal(p) {

        this.previews.name = p.fileSuffix
        this.previews.data = '/mngfile/chunkfile/previewStream/' + p.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      //删除文件
      deleteTargetFile(row, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认该操作？</p>',
          onOk: () => {
            this.targetFileVos.splice(index, 1);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      // 关闭添加文件框
      closeMains(data) {
        if (data) {
          this.targetFileVos.push(data);
        }
        let obj = {};
        this.targetFileVos = this.targetFileVos.reduce(function (item, next) {
          obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
          return item;
        }, []);
        this.addFileState.state = false;
      },
      // 打开添加文件框
      openAddFile() {
        this.addFileState.state = true;
        this.$refs.addFile.loadsData();
      },
      acYear() {
        this.dataTypes = this.taskWrite.data.dataType;
        this.academicYear = [];
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month > 6) {
          year += 1;
        }
        for (var i = 0; i < 5; i++) {
          var ac = year - i - 1 + "-" + (year - i);
          this.academicYear.push(ac);
        }
        this.task = this.taskWrite.data;
        if (this.task.dimType == null) {
          this.getDimTypes();
        } else {
          this.dimType = this.task.dimType;
          this.dimCount = 1;
        }
      },
      dateSelected(childValue) {
        this.dataDim = childValue;
        // console.log(11, this.dataDim)
      },
      getDimTypes() {
        getDimType(this.task.dataId).then(response => {
          console.log(response.data.data);
          this.dimType = response.data.data.dimType;
          this.dimCount = response.data.data.dimCount;
        });
      },
      //关闭基础数据
      closeBasicData(data) {
        console.log(data);
        this.basicData.state = false;
        //TODO 需要优化
      },
      //打开基础数据
      openBasicData() {
        this.$refs.basicdata.loadingData();
        this.basicData.state = true;
      },
      //关闭添加文件
      closeTaskWrite() {
        this.$emit("closeTaskWrite", {
          state: false,
          reload: false
        });
        this.dataDim = "";
        this.dimType = "";
        this.formValidate.dimDay = "";
        this.formValidate.dimMonth = "";
        this.formValidate.dimYear = "";
        this.formValidate.dimAcyear = "";
        this.formValidate.dimSemester = "";
        this.formValidate.dataFiles = [];
      },
      //保存
      TaskWriteSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.formValidate.dataId = this.taskWrite.data.dataId;
            this.formValidate.deptId = this.taskWrite.data.deptId;
            this.formValidate.dimType = this.dimType;
            this.formValidate.dataSource = "0";
            if (this.targetFileVos.length > 0) {
              let data = [];
              this.targetFileVos.forEach(e => {
                data.push(e.fileId);
              });
              this.formValidate.dataFiles = data;
            }
            if (this.dataTypes === 2) {
              this.formValidate.dataValue = (this.formValidate.dataValue / 100).toFixed(2);
            } else if (this.dataTypes === 3) {
              this.formValidate.dataValue = (this.formValidate.dataValue / 1000).toFixed(3);
            } else {
              this.formValidate.dataValue = this.formValidate.dataValue;
            }
            if (this.formValidate.dimType == "1") {
              this.getDimDate();
              setTimeout(() => {
                this.subTaskWrite();
                this.$refs.dateSelect.deleteData();
              }, 500);
            } else {
              this.subTaskWrite();
            }
          }
        })
      },
      subTaskWrite() {
        writeTask(this.formValidate, this.taskWrite.data.taskId).then(
          data => {
            if (data.data.code == 0) {
              this.$Message.success("填报成功");
              this.dataDim = "";
              this.dimType = "";
              this.formValidate.dimDay = "";
              this.formValidate.dimMonth = "";
              this.formValidate.dimYear = "";
              this.formValidate.dimAcyear = "";
              this.formValidate.dimSemester = "";
              this.formValidate.dataValue = "";
              this.formValidate.dataFiles = [];
              this.targetFileVos = [];
              this.$emit("closeTaskWrite", {
                state: false,
                reload: true
              });
            } else {
              this.$message.error(
                "保存失败，失败原因：" + data.data.msg
              );
            }
          }
        );
      },
      //重置
      TaskWriteReset() {
        this.formValidate.dimAcyear = "";
        this.formValidate.dimSemester = "";
        this.formValidate.dimDay = "";
        this.formValidate.dimMonth = "";
        this.formValidate.dimYear = "";
        this.formValidate.dataValue = "";
        this.targetFileVos = [];
        this.$refs.dateSelect.deleteData();
      },
      getDimDate() {
        if (this.dataDim != null) {
          var d = this.dataDim.split("-");
          if (d.length == 3) {
            this.formValidate.dimYear = d[0];
            this.formValidate.dimMonth = d[1];
            this.formValidate.dimDay = d[2];
          }
          if (d.length == 2) {
            this.formValidate.dimYear = d[0];
            this.formValidate.dimMonth = d[1];
          }
          if (d.length == 1) {
            this.formValidate.dimYear = d[0];
          }
        }
        return;
      }
    }
  };
</script>
<style lang="less" scoped>
  .name {
    color: #347ce8;
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

  .role {
    // padding: 10px;
    // overflow: hidden;
    // overflow-y: auto;
    // height: 250px;
  }

  .department {
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
    padding: 10px;
    // border-radius: 3px;
    // -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -o-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    > ul {
      height: 100%;
      background: #719ad8;

      > li {
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        text-decoration: none;
        list-style: none;
        border: 1px solid #ddd;
      }
    }
  }

  .content {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    min-height: 55px;
    max-height: 80px;
    padding: 0 10px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;

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
  }
</style>
