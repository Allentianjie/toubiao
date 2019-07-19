<template>
    <Modal
        v-model="treatmentData.state"
        width="50%"
        :mask-closable="false"
        @on-cancel="closeSpiralModal"
    >
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>诊改</span>
        </p>
        <Form :label-width="100">
            <div>
                <Divider orientation="left">诊改信息</Divider>
                <div class="fileBox">
                    <Row>
                        <Col span="22">
                            <FormItem label="所属体系">
                                <Input disabled v-model="hierarchyName" placeholder/>
                            </FormItem>
                            <FormItem label="诊改名称">
                                <Input disabled v-model="treatmentData.data.taskName" placeholder/>
                            </FormItem>
                            <FormItem label="诊改日期">
                                <Row>
                                    <Col span="11">
                                        <DatePicker
                                            disabled
                                            v-model="treatmentData.data.startTime"
                                            type="date"
                                            show-week-numbers
                                            placeholder="Select date"
                                            style="width: 100%"
                                        ></DatePicker>
                                    </Col>
                                    <Col span="2" style=" text-align: center">到</Col>
                                    <Col span="11">
                                        <DatePicker
                                            disabled
                                            v-model="treatmentData.data.endTime"
                                            type="date"
                                            show-week-numbers
                                            placeholder="Select date"
                                            style="width: 100%"
                                        ></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem label="诊改目标">
                                <Input disabled v-model="taskTarget" placeholder/>
                            </FormItem>

                            <!-- <FormItem label="任务资源">
                                <Button type="text" style="color: #1b4ede">点击查看</Button>
                            </FormItem>-->
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="fileManage">
                <Divider orientation="left">可以诊改的诊改信息</Divider>

                <div class="fileBox" v-for="(taskForm,taskIndex) in targetForm" :key="taskIndex">
                    <Card style="margin: 5px 0 ">
                        <Form
                            :ref="'taskForm' + taskIndex"
                            :model="taskForm"
                            :rules="ruleValidate"
                            :label-width="80"
                        >
                            <Row>
                                <Col span="10">
                                    <FormItem label="数据关联" prop="dataName">
                                        <Row>
                                            <Col span="20">
                                                <Input
                                                    v-model="taskForm.dataName"
                                                    disabled
                                                    placeholder
                                                />
                                            </Col>
                                            <Col span="2">
                                                <Button
                                                    @click="openBasicData(taskForm,taskIndex)"
                                                    disabled
                                                    type="primary"
                                                    icon="ios-search"
                                                ></Button>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem label="开始时间" prop="startTime">
                                        <DatePicker
                                            v-model="taskForm.startTime"
                                            :options="pickerOptions"
                                            style="width: 100%"
                                            type="date"
                                            placeholder
                                        ></DatePicker>
                                    </FormItem>
                                    <FormItem label="结束时间" prop="endTime">
                                        <DatePicker
                                            v-model="taskForm.endTime"
                                            :options="pickerOptions"
                                            style="width: 100%"
                                            type="date"
                                            placeholder
                                        ></DatePicker>
                                    </FormItem>
                                    <FormItem label="目标策略">
                                        <Select v-model="taskForm.targetStrategy" filterable>
                                            <Option
                                                v-for="(item,index) in operator"
                                                :value="item.label"
                                                :key="index"
                                            >{{item.value}}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="目标值" prop="targetValue">
                                        <Row>
                                            <Col :span="12">
                                                <Input v-model="taskForm.targetValue" placeholder/>
                                            </Col>
                                            <Col :span="12">
                                                &nbsp; &nbsp;
                                                <span>{{taskForm.targetValue | fulltargetValue(taskForm.dataType)}}</span>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem label="预警策略">
                                        <Select v-model="taskForm.warnStrategy" filterable>
                                            <Option
                                                v-for="(item,index) in operator"
                                                :value="item.label"
                                                :key="index"
                                            >{{item.value}}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="预警值" prop="warnValue">
                                        <Row>
                                            <Col :span="12">
                                                <Input v-model="taskForm.warnValue" placeholder/>
                                            </Col>
                                            <Col :span="12">
                                                &nbsp; &nbsp;
                                                <span>{{taskForm.warnValue | fullwarnValue(taskForm.dataType)}}</span>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                </Col>
                                <Col span="11" style="padding-left: 30px">
                                    <FormItem label="诊改名称" prop="taskName">
                                        <Input v-model="taskForm.taskName" disabled placeholder/>
                                    </FormItem>
                                    <FormItem label="负责人">
                                        <Button
                                            @click="openPrincipal(taskForm,taskIndex)"
                                            class="add-doc"
                                            ghost
                                            type="success"
                                            size="small"
                                            icon="ios-add-circle-outline"
                                        >添加负责人</Button>
                                        <div class="personData">
                                            <Tag
                                                v-for="(item,index) in taskForm.directorVos"
                                                :key="item.directorId"
                                                :name="item.directorName"
                                                closable
                                                @on-close="handleClosePerson(taskIndex,item,index)"
                                            >{{ item.directorName}}</Tag>
                                        </div>
                                    </FormItem>

                                    <FormItem label="支撑文件">
                                        <Button
                                            @click="openAddFile(taskForm,taskIndex)"
                                            class="add-doc"
                                            ghost
                                            type="success"
                                            size="small"
                                            icon="ios-add-circle-outline"
                                        >添加文件</Button>
                                        <div class="content">
                                            <div
                                                class="docList"
                                                v-for="(item,index) in taskForm.targetFileVos"
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
                                                    >预览</Button>
                                                </div>
                                                <div class="deleteIcon">
                                                    <Icon
                                                        @click="deleteTargetFile(taskIndex,item,index)"
                                                        type="md-close"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </FormItem>
                                    <FormItem label="当前值">
                                        <Row>
                                            <Col :span="12">
                                                <Input
                                                    v-model="taskForm.dataValue"
                                                    disabled
                                                    placeholder
                                                />
                                            </Col>
                                            <Col :span="12">
                                                &nbsp; &nbsp;
                                                <span>{{taskForm.dataValue | fullstandardValue(taskForm.dataType)}}</span>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                </Col>
                                <Col span="3" style=" text-align: right">
                                    <Icon
                                        @click="saveAllocateTaskItem(taskForm,taskIndex)"
                                        style="color: #159f5c"
                                        class="removeItem"
                                        type="md-checkmark-circle"
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>

                <AddFileModal ref="addFile" :addFileState="addFileState" @closeMains="closeMains"></AddFileModal>
                <Principal
                    ref="principal"
                    :PrincipalData="PrincipalData"
                    @closePrincipal="closePrincipal"
                ></Principal>

                <BasicData ref="basicdata" :basicData="basicData" @closeBasicData="closeBasicData"></BasicData>
            </div>
        </Form>
        <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
        <div slot="footer" style="text-align: center">
            <Button type="warning" size="large" @click="closeSpiralModal">关闭</Button>
        </div>
    </Modal>
</template>

<script>
import Principal from "@/components/principal";
import BasicData from "@/components/basicdata";
import AddFileModal from "@/views/diagnosis/modal/addFile";
import df from "@/api/utils";
import Preview from "@/components/preview";
export default {
    name: "treatment",
    props: {
        treatmentData: {
            type: Object,
            required: true
        }
    },
    components: { AddFileModal, Principal, BasicData,Preview },
    data() {
        return {
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
            ruleValidate: {
                taskName: [
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
                dataName: [
                    {
                        required: true,
                        message: "请选择关联数据",
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
                targetStrategy: [
                    {
                        required: true,
                        message: "请选目标择策略",
                        trigger: "change"
                    }
                ],
                targetValue: [
                    {
                        required: true,
                        message: "目标值不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 20,
                        message: "目标值不能大于20字符",
                        trigger: "blur"
                    }
                ],
                warnStrategy: [
                    {
                        required: true,
                        message: "请选择预警策略",
                        trigger: "change"
                    }
                ],
                warnValue: [
                    {
                        required: true,
                        message: "预警值不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 20,
                        message: "预警值不能大于20字符",
                        trigger: "blur"
                    }
                ]
            },
            BasIndex: 0,
            PrincipalIndex: 0,
            fileIndex: 0,
            reloadTaskTable: false, //是否需要刷新任务列表，分派任务有变动是否需要刷新任务列表
            targetForm: [
                {
                    taskName: "",
                    startTime: "",
                    endTime: "",
                    dataName: "",
                    dataId: 0,
                    targetStrategy: 21,
                    targetValue: "",
                    warnStrategy: 22,
                    warnValue: "",
                    dataValue: "",
                    directorVos: [],
                    targetFileVos: []
                }
            ],
            addFileState: {
                //添加文件传过去的数据
                data: [],
                state: false
            },
            basicData: {
                state: false,
                data: []
            }, // 基础数据关联
            PrincipalData: {
                state: false,
                data: []
            }, //添加负责人弹框
            PersonData: [], //负责人
            operator: [
                { label: 21, value: ">" },
                { label: 22, value: "<" },
                { label: 23, value: "=" },
                { label: 24, value: "≥" },
                { label: 25, value: "≤" }
                // { label: 26, value: "无" }
            ] //策略的运算符
        };
    },
    computed: {
        hierarchyName: function() {
            let task = this.treatmentData.data;
            return (
                task.hieName +
                " / " +
                task.levelName +
                " / " +
                task.dimName +
                " / " +
                task.pointName +
                " / " +
                task.targetName
            );
        },
        taskTarget: function() {
            let task = this.treatmentData.data;
            return (
                this.getStrategySymbol(task.targetStrategy) +
                " " +
                task.targetValue
            );
        }
    },
    filters: {
        fulltargetValue: function(value, first) {
            if (first == "0") {
                //整数
                return Math.round(value);
            } else if (first == "1") {
                //小数
                return parseFloat(value).toFixed(2);
            } else if (first == "2") {
                //百分比
                return (value * 100).toFixed(2) + "%";
            } else if (first == "3") {
                //千分比
                return (value * 1000).toFixed(2) + "‰";
            } else if (first == "4") {
                //比例
                return value + " ：1";
            }
        },
        fullwarnValue: function(value, first) {
            if (first == "0") {
                //整数
                return Math.round(value);
            } else if (first == "1") {
                //小数
                return parseFloat(value).toFixed(2);
            } else if (first == "2") {
                //百分比
                return (value * 100).toFixed(2) + "%";
            } else if (first == "3") {
                //千分比
                return (value * 1000).toFixed(2) + "‰";
            } else if (first == "4") {
                //比例
                return value + " ：1";
            }
        },
        fullstandardValue: function(value, first) {
            if (first == "0") {
                //整数
                return Math.round(value);
            } else if (first == "1") {
                //小数
                return parseFloat(value).toFixed(2);
            } else if (first == "2") {
                //百分比
                return (value * 100).toFixed(2) + "%";
            } else if (first == "3") {
                //千分比
                return (value * 1000).toFixed(2) + "‰";
            } else if (first == "4") {
                //比例
                return value + " ：1";
            }
        }
    },
    methods: {
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
        //获取当前任务的可以进行诊断分派任务
        getSpiralTasks() {
            let startTime = this.treatmentData.data.startTime;
            let endTime = this.treatmentData.data.endTime;
            this.modalParam.minTime = new Date(startTime.replace("-", "/"));
            this.modalParam.maxTime = new Date(endTime.replace("-", "/"));
            let allocateTasks = this.treatmentData.data.allocateTasks;
            //清空分派集合
            this.targetForm.splice(0, this.targetForm.length);
            if (allocateTasks.length > 0) {
                allocateTasks.forEach(task => {
                    this.targetForm.push({
                        dataType: task.dataType,
                        taskId: task.taskId,
                        taskName: task.taskName,
                        startTime: task.startTime,
                        endTime: task.endTime,
                        dataName: task.dataName,
                        dataId: task.dataId,
                        targetStrategy: task.targetStrategy,
                        targetValue: task.targetValue,
                        warnStrategy: task.warnStrategy,
                        warnValue: task.warnValue,
                        dataValue: task.dataValue,
                        directorVos: task.directors,
                        targetFileVos: task.targetFiles
                    });
                });
            }
        },
        //保存单行的数据
        saveAllocateTaskItem(row, ind) {
            let that = this;
            let formName = "taskForm" + ind;
            console.info(that.$refs[formName]);
            that.$refs[formName][0].validate(valid => {
                if (valid) {
                    let form = that.targetForm[ind];
                    console.info(form, that.modalParam);
                    if (
                        form.startTime.valueOf() <
                        that.modalParam.minTime.valueOf()
                    ) {
                        that.$Message.warning(
                            "诊改诊改的开始时间不能早于当前诊改的开始时间"
                        );
                        return;
                    }
                    if (form.startTime.valueOf() > form.endTime.valueOf()) {
                        that.$Message.warning("开始时间不能晚于结束时间");
                        return;
                    }
                    if (
                        form.endTime.valueOf() >
                        that.modalParam.maxTime.valueOf()
                    ) {
                        that.$Message.warning(
                            "诊改诊改的结束时间不能晚于当前诊改的结束时间"
                        );
                        return;
                    }
                    // 处理日期
                    let formData = {
                        taskId: form.taskId,
                        taskName: form.taskName,
                        startTime: df.dateFormat(form.startTime).substr(0, 10),
                        endTime: df.dateFormat(form.endTime).substr(0, 10),
                        dataId: form.dataId,
                        parentId: that.treatmentData.data.taskId,
                        targetStrategy: form.targetStrategy,
                        targetValue: form.targetValue,
                        warnStrategy: form.warnStrategy,
                        warnValue: form.warnValue
                    };
                    //处理负责人
                    let directorData = form.directorVos;
                    if (!(directorData && directorData.length > 0)) {
                        this.$Message.error("请选择负责人");
                        return;
                    }
                    let directors = [];
                    directorData.forEach(o => {
                        directors.push(o.directorId);
                    });
                    formData.directors = directors;
                    //处理支撑文件
                    let fileData = form.targetFileVos;
                    let files = [];
                    if (fileData && fileData.length > 0) {
                        fileData.forEach(o => {
                            files.push(o.fileId);
                        });
                    }
                    formData.targetFiles = files;

                    that.$Put("/admin/task/spiral", formData, function(data) {
                        console.info(data);
                        that.$Message.success("成功诊改分派诊改");
                        that.reloadTaskTable = true;
                        that.targetForm.splice(ind, 1);
                    });
                }
            });
        },
        // 关闭基础数据
        closeBasicData(data) {
            if (data) {
                this.targetForm[this.BasIndex].dataId = data.dataId;
                this.targetForm[this.BasIndex].dataType = data.dataType;
                //TODO 需要优化
                this.targetForm[this.BasIndex].dataValue = "";
                this.targetForm[this.BasIndex].dataName = data.dataName;
                this.targetForm[this.BasIndex].taskName = data.dataName;
            }
            this.basicData.state = false;
        },
        // 打开基础数据
        openBasicData(row, ind) {
            this.BasIndex = ind; //保存点击基础数据的下标，方便返回数据赋值====this.targetForm[this.BasIndex][0]
            this.$refs.basicdata.loadingData();
            this.basicData.state = true;
        },
        //关闭添加负责人
        closePrincipal(data) {
            this.PrincipalData.state = false;
            if (data && data.length > 0) {
                data.forEach(o => {
                    this.targetForm[this.PrincipalIndex].directorVos.push({
                        directorId: o.userId,
                        directorName: o.name
                    });
                });
            }
        },
        //打开添加负责人
        openPrincipal(row, ind) {
            this.PrincipalIndex = ind; //保存点击负责人的下标，方便上面 closePrincipal方法里返回数据赋值====this.targetForm[this.PrincipalIndex]
            this.PrincipalData.state = true;
            // this.$refs.principal[ind].getBaseData(); //子组件请求部门tree
            // this.$refs.principal[ind].getBaseData2(); //子组件请求校色列表
            this.$refs.principal.loadData();
        },
        //删除负责人
        handleClosePerson(ind, item, index) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确认删除该负责人？</p>',
            onOk: () => {
              this.targetForm[ind].directorVos.splice(index, 1);
            },
            onCancel: () => {
              // this.$Message.info('Clicked cancel');
            }
          });
        },
        // 保存
        handleSubmit(name) {},
        // 重置
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        // 关闭添加文件框
        closeMains(val, sence, data) {
            // console.log("关闭了");
            //TODO 需要优化
            // this.targetForm[this.fileIndex].targetFileVos = [
            //   {fileId: 2, fileName: "文件2.txt"}
            // ];

            if (data && data.length > 0) {
                data.forEach(e => {
                    this.targetForm[this.fileIndex].targetFileVos.push(e);
                });
            }
            this.addFileState.state = val;
        },
        // 打开添加文件框
        openAddFile(row, ind) {
            this.fileIndex = ind; //保存点击负责人的下标，方便返回数据赋值====this.targetForm[this.PrincipalIndex]
            this.addFileState.data = []; //传是哪个场景下的id
            this.addFileState.state = true;
            this.$refs.addFile.loadData();
        },
        deleteTargetFile(ind, row, index) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确认该操作？</p>',
            onOk: () => {
              this.targetForm[ind].targetFileVos.splice(index, 1);
            },
            onCancel: () => {
              // this.$Message.info('Clicked cancel');
            }
          });
        },

        //关闭
        closeSpiralModal() {
            this.$emit("closeSpiralModal", {
                state: false,
                reload: this.reloadTaskTable
            });
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
.removeItem {
  color: red;
  font-size: 30px;
}

.removeItem:hover {
  cursor: pointer;
}

.fileManage {
  position: relative;
  .addItem {
    position: absolute;
    right: 22px;
    bottom: 40px;
    color: #159f5c;
  }
  .addItem:hover {
    cursor: pointer;
  }
}

.fileBox {
  width: 100%;
  min-height: 100px;
  padding: 5px 5px;
  /*border-bottom: 1px solid #bbbbbb;*/
  .content {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 91px;
    padding: 0 10px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
    border-radius: 3px;

    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
       -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
         -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
    0 0 40px rgb(255, 255, 255) inset;
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
