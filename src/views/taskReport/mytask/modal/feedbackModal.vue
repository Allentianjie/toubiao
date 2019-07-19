<template>
    <Modal v-model="feedBack.state" width="40%" :mask-closable="false" @on-cancel="closeModal">
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>诊改反馈</span>
        </p>
        <div>
            <Row>
                <Col span="24">
                    <Form
                        ref="taskFeedbackForm"
                        :model="taskFeedbackForm"
                        :rules="ruleValidate"
                        :label-width="100"
                    >
                        <FormItem label="负责人">
                            <div class="personData">
                                <Tag
                                    v-for="(item,index) in taskFeedbackForm.directorVos"
                                    :key="item.directorId"
                                    :name="item.directorName"
                                >{{ item.directorName}}</Tag>
                            </div>
                        </FormItem>
                        <FormItem label="反馈内容" prop="remark">
                            <Input
                                v-model="taskFeedbackForm.remark"
                                type="textarea"
                                :autosize="{minRows: 2,maxRows: 5}"
                                placeholder
                            />
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
        <div slot="footer" style="text-align: center">
            <Button type="primary" size="large" @click="feedBackSubmit('taskFeedbackForm')">发送</Button>
            <Button type="warning" size="large" @click="feedBackReset('taskFeedbackForm')">重置</Button>
        </div>
    </Modal>
</template>
<script>

export default {
    props: {
        feedBack: {
            type: Object,
            required: true
        }
    },
    mounted () {

    },
    data () {
        return {
            taskFeedbackForm: {
                directorVos: [],
                taskId: 0,
                remark: ""
            },
            ruleValidate: {
                remark: [
                    {
                        required: true,
                        message: "反馈内容不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 200,
                        message: "反馈内容不能大于200字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        //获取任务反馈表单
        getTaskFeedbackForm () {
            this.taskFeedbackForm.directorVos = this.feedBack.data
            this.taskFeedbackForm.taskId = this.feedBack.taskId
            this.taskFeedbackForm.remark = ""
        },
        //保存
        feedBackSubmit (name) {
            let that = this;
            that.$refs[name].validate(valid => {
                if (valid) {
                    let param = {
                        taskId: that.taskFeedbackForm.taskId,
                        remark: that.taskFeedbackForm.remark
                    }
                    //处理负责人
                    let directorData = that.taskFeedbackForm.directorVos;
                    if (!(directorData && directorData.length > 0)) {
                        this.$Message.error("没有反馈的负责人！");
                        return;
                    }
                    let directors = [];
                    directorData.forEach(o => {
                        directors.push(o.directorId);
                    });
                    param.recipients = directors;
                    that.$Post("/admin/task/feedback", param, function (data) {
                        if (data.data) {
                            that.$Message.success("反馈成功");
                            that.$emit("closefeedBack", false);
                        }
                    });
                }
            });
        },
        //重置
        feedBackReset (name) {
            this.$refs[name].resetFields();
            this.getTaskDirectors();
        },
        //关闭添加文件
        closeModal () {
            this.$emit("closefeedBack", false);
        }
    }
};
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

/*定义滑块 内阴影+圆角*/

::-webkit-scrollbar-thumb {
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 6px rgba(113, 154, 216, 0.3);
    background-color: #719ad8;
}

.role {
    // padding: 10px;
    // overflow: hidden;
    // overflow-y: auto;
    // height: 250px;
}

.department {
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
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
            border: 1px solid #ddd;
            text-decoration: none;
            list-style: none;
        }
    }
}
</style>
