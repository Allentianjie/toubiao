<template>
    <Modal
        v-model="newTaskData.state"
        width="40%"
        :mask-closable="false"
        @on-cancel="closeTask('ownPlanProjectForm')"
    >
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>{{title}}</span>
        </p>
        <div>
            <Form
                ref="ownPlanProjectForm"
                :model="ownPlanProjectForm"
                :rules="ruleValidate"
                :label-width="100"
            >
                <Divider orientation="left">项目信息</Divider>
                <div class="fileBox">
                    <Row>
                        <Col span="11">
                            <FormItem label="项目名称" prop="projectName">
                                <Input v-model="ownPlanProjectForm.projectName" placeholder/>
                            </FormItem>
                            <FormItem label="目标策略">
                                <Select v-model="ownPlanProjectForm.targetStrategy" filterable>
                                    <Option
                                        v-for="(item,index) in operator"
                                        :value="item.label"
                                        :key="index"
                                    >{{item.value}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="目标值" prop="targetValue">
                                <Input v-model="ownPlanProjectForm.targetValue" placeholder/>
                            </FormItem>
                            <FormItem label="预警策略">
                                <Select v-model="ownPlanProjectForm.warnStrategy" filterable>
                                    <Option
                                        v-for="(item,index) in operator"
                                        :value="item.label"
                                        :key="index"
                                    >{{item.value}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="预警值" prop="warnValue">
                                <Input v-model="ownPlanProjectForm.warnValue" placeholder/>
                            </FormItem>
                            <FormItem label="当前值" prop="currentValue">
                                <Input v-model="ownPlanProjectForm.currentValue" placeholder/>
                            </FormItem>

                            <!--<FormItem label="项目备注" >-->
                            <!--<Input-->
                            <!--v-model="ownPlanProjectForm.remark"-->
                            <!--type="textarea"-->
                            <!--:autosize="{minRows: 2,maxRows: 5}"-->
                            <!--placeholder-->
                            <!--/>-->
                            <!--</FormItem>-->
                        </Col>
                        <Col span="12" style>
                            <FormItem label="开始时间" prop="startTime">
                                <DatePicker
                                  @on-change="changeDatestart"
                                    v-model="ownPlanProjectForm.startTime"
                                    :options="pickerOptions"
                                    style="width: 100%"
                                    type="date"
                                    placeholder
                                ></DatePicker>
                            </FormItem>
                            <FormItem label="结束时间" prop="endTime">
                                <DatePicker
                                  @on-change="changeDateend"
                                    v-model="ownPlanProjectForm.endTime"
                                    :options="pickerOptions"
                                    style="width: 100%"
                                    type="date"
                                    placeholder
                                ></DatePicker>
                            </FormItem>
                            <FormItem label="相关材料">
                                <Button
                                    @click="openAddFile"
                                    class="add-doc"
                                    ghost
                                    type="success"
                                    size="small"
                                    icon="ios-add-circle-outline"
                                >添加文件</Button>
                                <div class="content">
                                    <div
                                        class="docList"
                                        v-for="(item,index) in ownPlanProjectForm.projectFiles"
                                        :key="index"
                                    >
                                        <Icon class="listItem" type="ios-paper"/>
                                        <div class="listContent">{{item.fileName}}</div>
                                        <div class="deleteIcon">
                                            <Icon
                                                @click="deleteTargetFile(item,index)"
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
            <Button type="primary" size="large" @click="taskSubmit('ownPlanProjectForm')">保存</Button>
            <Button type="warning" size="large" @click="taskReset('ownPlanProjectForm')">重置</Button>
        </div>
        <AddFileModal ref="addFile" :addFileState="addFileState" @closeMains="closeMains"></AddFileModal>
    </Modal>
</template>

<script>
import AddFileModal from "@/views/diagnosis/modal/addFile";
import df from "@/api/utils";

export default {
    components: { AddFileModal },
    props: {
        newTaskData: {
            type: Object,
            required: true
        }
    },
    mounted () {
        // console.log(1, this.selectReset)
    },
    data () {
        return {
            modalParam: {
                minTime: "",
                maxTime: "",
                updateModal: false//是否
            },
            pickerOptions: {
                disabledDate: (time) => {
                    return this.dealDisabledDate(time)
                }
            },
            addFileState: {
                //添加文件传过去的数据
                data: [],
                state: false
            },
            operator: [
                { label: 21, value: ">" },
                { label: 22, value: "<" },
                { label: 23, value: "=" },
                { label: 24, value: "≥" },
                { label: 25, value: "≤" }
                // { label: 26, value: "无" }
            ], //策略的运算符
            ownPlanProjectForm: {
                //表单里面的数据
                projectName: "",
                targetStrategy: 21,
                targetValue: "",
                warnStrategy: 21,
                warnValue: "",
                currentValue: "",
                startTime: "",
                endTime: "",
                remark: "",
                projectFiles: []
            },
            projectData: {
                planId: 0,
                files: []
            },
            ruleValidate: {
                projectName: [
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
                ],
                currentValue: [
                    {
                        required: true,
                        message: "当前值不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 20,
                        message: "当前值不能大于20字符",
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
                        max: 500,
                        message: "备注不能大于500字符",
                        trigger: "blur"
                    }
                ]
            },
            title: ""
        };
    },
    methods: {
      //时间选择判断
      changeDatestart(val, data) {
        if (this.ownPlanProjectForm.endTime) {
          if (this.ownPlanProjectForm.startTime.valueOf() > this.ownPlanProjectForm.endTime.valueOf()) {
            this.$Message.warning("开始时间不能晚于结束时间");
            this.ownPlanProjectForm.startTime = '';
            return;
          }
        }
      },
      changeDateend(val, data) {
        if (this.ownPlanProjectForm.startTime) {
          if (this.ownPlanProjectForm.startTime.valueOf() > this.ownPlanProjectForm.endTime.valueOf()) {
            this.$Message.warning("结束时间不能早于开始时间");
            this.ownPlanProjectForm.endTime = '';
            return;
          }
        }
      },
        dealDisabledDate (date) {
            return (date && this.modalParam.minTime && date.valueOf() < this.modalParam.minTime.valueOf())
                || (date && this.modalParam.maxTime && date.valueOf() > this.modalParam.maxTime.valueOf());
        },
        //获取表单数据
        getProjectFormData (param) {
            this.modalParam.updateModal = param.updateModal
            this.modalParam.minTime = param.minTime
            this.modalParam.maxTime = param.maxTime

            this.updateModal = param.updateModal
            this.projectData.planId = this.newTaskData.data.planId
            if (param.updateModal) {
                this.title = "编辑规划项目"
                this.projectData.projectId = this.newTaskData.data.projectId
                this.ownPlanProjectForm.projectName = this.newTaskData.data.projectName
                this.ownPlanProjectForm.targetStrategy = this.newTaskData.data.targetStrategy
                this.ownPlanProjectForm.targetValue = this.newTaskData.data.targetValue
                this.ownPlanProjectForm.warnStrategy = this.newTaskData.data.warnStrategy
                this.ownPlanProjectForm.warnValue = this.newTaskData.data.warnValue
                this.ownPlanProjectForm.currentValue = this.newTaskData.data.currentValue
                this.ownPlanProjectForm.startTime = this.newTaskData.data.startTime
                this.ownPlanProjectForm.endTime = this.newTaskData.data.endTime
                this.ownPlanProjectForm.remark = this.newTaskData.data.remark
                this.ownPlanProjectForm.projectFiles = this.newTaskData.data.projectFiles
            } else {
                this.title = "新增规划项目"
                this.ownPlanProjectForm = {
                    //表单里面的数据
                    projectName: "",
                    targetStrategy: 21,
                    targetValue: "",
                    warnStrategy: 21,
                    warnValue: "",
                    currentValue: "",
                    startTime: param.minTime,
                    endTime: param.maxTime,
                    remark: "",
                    projectFiles: []
                }
            }
        },
        //打开个人你规划文件管理
        openFile (row, index) {

        },

        // 删除文件
        deleteTargetFile (row, index) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确认删除该文件？</p>',
            onOk: () => {
              this.ownPlanProjectForm.projectFiles.splice(index, 1);
            },
            onCancel: () => {
              // this.$Message.info('Clicked cancel');
            }
          });
        },
        // 关闭添加文件框
        closeMains (val, sence, data) {
            this.addFileState.state = val;
            //TODO 需要优化
            // this.ownPlanProjectForm.projectFiles = [
            //     { fileId: 2, fileName: "文件2.txt" }
            // ];
            if (data && data.length > 0) {
                data.forEach(e => {
                    this.ownPlanProjectForm.projectFiles.push(e);
                });
            }
          let obj = {};
          this.ownPlanProjectForm.projectFiles = this.ownPlanProjectForm.projectFiles.reduce(function (item, next) {
            obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
            return item;
          }, []);

        },
        // 打开添加文件框
        openAddFile () {
            this.addFileState.data = []; //传是哪个场景下的id
            this.addFileState.state = true;
            this.$refs.addFile.loadData();
        },
        //关闭modal
        closeTask (name) {
            this.$emit("closeTaskModal", {
                state: false,
                reload: false
            });
            this.$refs[name].resetFields();
        },

        //保存
        taskSubmit (name) {
            let that = this
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (that.ownPlanProjectForm.startTime.valueOf() < that.modalParam.minTime.valueOf()) {
                        that.$Message.warning("开始时间不能早于规划的开始时间");
                        return
                    }
                    if (that.ownPlanProjectForm.startTime.valueOf() > that.ownPlanProjectForm.endTime.valueOf()) {
                        that.$Message.warning("开始时间不能晚于结束时间");
                        return
                    }
                    if (that.ownPlanProjectForm.endTime.valueOf() > that.modalParam.maxTime.valueOf()) {
                        that.$Message.warning("结束时间不能晚于规划的结束时间");
                        return
                    }
                    let formData = {
                        projectName: that.ownPlanProjectForm.projectName,
                        currentValue: that.ownPlanProjectForm.currentValue,
                        remark: that.ownPlanProjectForm.remark,
                        targetStrategy: that.ownPlanProjectForm.targetStrategy,
                        targetValue: that.ownPlanProjectForm.targetValue,
                        warnStrategy: that.ownPlanProjectForm.warnStrategy,
                        warnValue: that.ownPlanProjectForm.warnValue,
                        startTime: df
                            .dateFormat(that.ownPlanProjectForm.startTime)
                            .substr(0, 10),
                        endTime: df
                            .dateFormat(that.ownPlanProjectForm.endTime)
                            .substr(0, 10)
                    };
                    //处理文件
                    let fileVos = that.ownPlanProjectForm.projectFiles;
                    let files = [];
                    if (fileVos && fileVos.length > 0) {
                        fileVos.forEach(o => {
                            files.push(o.fileId);
                        });
                    }
                    that.projectData.files = files;

                    let param = Object.assign(formData, that.projectData);
                    if (that.modalParam.updateModal) {
                        that.$Put("/admin/ownplan/project", param, function (data) {
                            that.$Message.success("修改成功");
                            that.$emit("closeTaskModal", {
                                state: false,
                                reload: true
                            });
                            that.$refs[name].resetFields();
                        });
                    } else {
                        that.$Post("/admin/ownplan/project", param, function (data) {
                            that.$Message.success("添加成功");
                            that.$emit("closeTaskModal", {
                                state: false,
                                reload: true
                            });
                            that.$refs[name].resetFields();
                        });
                    }
                }
            });
        },
        //重置
        taskReset (name) {
            this.$refs[name].resetFields();
            this.getProjectFormData(this.modalParam)
        }
    }
};
</script>
<style lang="less" scoped>
@import url("./newTaskItemModal.less");
</style>
