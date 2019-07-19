<template>
  <div id="ceshi">
    <Modal v-model="normData.state" width="50%" :mask-closable="false" @on-cancel="closeModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>{{title}}</span>
      </p>
      <div class="fileManage">
        <Form ref="targetForm" :model="targetForm"  :label-width="100">
          <Divider orientation="left">指标</Divider>
          <div class="fileBox">
            <Row>
              <Col span="11">
                <FormItem label="所属质控点">
                  <span>{{targetData.pointName}}</span>
                  <!--<Input v-model="targetData.pointName" disabled placeholder/>-->
                </FormItem>
                <FormItem label="指标名称" disabled prop="targetName">
                  <span>{{targetForm.targetName}}</span>
                  <!--<Input disabled v-model="targetForm.targetName" placeholder/>-->
                </FormItem>
                <FormItem label="开始时间" prop="startTime">
                  <span>{{targetForm.startTime}}</span>
                  <!--<DatePicker-->
                  <!--v-model="targetForm.startTime"-->
                  <!--disabled-->
                  <!--:options="pickerOptions"-->
                  <!--style="width: 100%"-->
                  <!--type="date"-->
                  <!--placeholder-->
                  <!--&gt;</DatePicker>-->
                </FormItem>
                <FormItem label="负责人">
                    <Tag
                      v-for="(item,index) in targetForm.directorVos"
                      :key="item.directorId"
                      :name="item.directorName"
                    >{{ item.directorName}}</Tag>
                </FormItem>
                <Principal
                  ref="principal"
                  :PrincipalData="PrincipalData"
                  @closePrincipal="closePrincipal"
                ></Principal>
              </Col>
              <Col span="12" style="padding-left: 30px">
                <FormItem label="数据关联" prop="dataName">
                  <Row>
                    <Col span="24">
                      <span>{{targetForm.dataName}}</span>
                      <!--<Input v-model="targetForm.dataName" disabled placeholder/>-->
                    </Col>
                    <!--<Col span="2">-->
                    <!--<Button-->
                    <!--v-if="spiralModal"-->
                    <!--@click="openBasicData"-->
                    <!--disabled-->
                    <!--type="primary"-->
                    <!--icon="ios-search"-->
                    <!--&gt;</Button>-->
                    <!--<Button-->
                    <!--v-if="!spiralModal"-->
                    <!--@click="openBasicData"-->
                    <!--disabled-->
                    <!--type="primary"-->
                    <!--icon="ios-search"-->
                    <!--&gt;</Button>-->
                    <!--</Col>-->
                  </Row>
                </FormItem>
                <BasicData
                  ref="basicdata"
                  :basicData="basicData"
                  @closeBasicData="closeBasicData"
                ></BasicData>
                <FormItem label="指标权重">
                  <span>{{targetForm.weight}}</span>
                  <!--<InputNumber disabled v-model="targetForm.weight" :min="0" :max="100"/>-->
                </FormItem>
                <FormItem label="结束时间" prop="endTime">
                  <span>{{targetForm.endTime}}</span>
                  <!--<DatePicker-->
                  <!--v-model="targetForm.endTime"-->
                  <!--disabled-->
                  <!--:options="pickerOptions"-->
                  <!--style="width: 100%"-->
                  <!--type="date"-->
                  <!--placeholder-->
                  <!--&gt;</DatePicker>-->
                </FormItem>
                <FormItem label="备注说明" prop="remark">
                  <Input
                    v-model="targetForm.remark"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    placeholder
                  />
                </FormItem>
                <FormItem label="质控状态">
                  <i-switch
                    v-model="targetForm.enableFlag"
                    disabled
                    size="large"
                    trueValue="0"
                    falseValue="1"
                  >
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                </FormItem>
              </Col>
            </Row>
          </div>
          <Divider orientation="left">目标</Divider>

          <div class="fileBox">
            <Row>
              <Col span="11">
                <FormItem label="目标策略">
                  <span>{{getStrategySymbol(targetForm.targetStrategy)}}</span>
                  <!--<Select-->
                  <!--v-model="targetForm.targetStrategy"-->
                  <!--disabled-->
                  <!--filterable-->
                  <!--&gt;-->
                  <!--<Option-->
                  <!--v-for="(item,index) in operator"-->
                  <!--:value="item.label"-->
                  <!--:key="index"-->
                  <!--&gt;{{item.value}}</Option>-->
                  <!--</Select>-->
                </FormItem>
                <FormItem label="支撑文件">
                  <div class="content">
                    <div
                      class="docList"
                      v-for="(item,index) in targetForm.targetFileVos"
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
                        >预览</Button>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </Col>
              <Col span="12" style="padding-left: 30px">
                <FormItem label="目标值" prop="targetValue">
                  <Row>
                    <Col :span="24">
                      <span>{{targetForm.targetValue}}</span>
                      <!--<Input-->
                      <!--v-model="targetForm.targetValue"-->
                      <!--disabled-->
                      <!--placeholder-->
                      <!--/>-->
                    </Col>
                    <!--<Col :span="12">-->
                    <!--<Input v-model="fulltargetValue" disabled placeholder/>-->
                    <!--</Col>-->
                  </Row>
                </FormItem>

                <FormItem label="目标权重">
                  <span>{{targetForm.targetWeight}}</span>
                  <!--<InputNumber disabled v-model="targetForm.targetWeight" :min="0" :max="100"/>-->
                </FormItem>
              </Col>
            </Row>
          </div>
          <Divider orientation="left">标准</Divider>
          <div class="fileBox">
            <Row>
              <Col span="11">
                <FormItem label="标准策略">
                  <span>{{getStrategySymbol(targetForm.standardStrategy)}}</span>
                  <!--<Select-->
                  <!--v-model="targetForm.standardStrategy"-->
                  <!--disabled-->
                  <!--filterable-->
                  <!--&gt;-->
                  <!--<Option-->
                  <!--v-for="(item,index) in operator"-->
                  <!--:value="item.label"-->
                  <!--:key="index"-->
                  <!--&gt;{{item.value}}</Option>-->
                  <!--</Select>-->
                </FormItem>
                <FormItem label="支撑文件">
                  <div class="content">
                    <div
                      class="docList"
                      v-for="(item,index) in targetForm.standardFileVos"
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
                        >预览</Button>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </Col>
              <Col span="12" style="padding-left: 30px">
                <FormItem label="标准值" prop="standardValue">
                  <Row>
                    <Col :span="24">
                      <span>{{targetForm.standardValue}}</span>
                      <!--<Input-->
                      <!--v-model="targetForm.standardValue"-->
                      <!--disabled-->
                      <!--placeholder-->
                      <!--/>-->
                    </Col>
                    <!--<Col :span="12">-->
                    <!--<Input v-model="fullstandardValue" disabled placeholder/>-->
                    <!--</Col>-->
                  </Row>
                </FormItem>
                <FormItem label="标准权重">
                  <span>{{targetForm.standardWeight}}</span>
                  <!--<InputNumber disabled-->
                  <!--v-model="targetForm.standardWeight"-->
                  <!--:min="0"-->
                  <!--:max="100"-->
                  <!--/>-->
                </FormItem>
              </Col>
            </Row>
          </div>
          <Divider orientation="left">预警</Divider>
          <div class="fileBox">
            <Row>
              <Col span="11">
                <FormItem label="预警策略">
                  <span>{{getStrategySymbol(targetForm.warnStrategy)}}</span>
                  <!--<Select-->
                  <!--v-model="targetForm.warnStrategy"-->
                  <!--disabled-->
                  <!--filterable-->
                  <!--&gt;-->
                  <!--<Option-->
                  <!--v-for="(item,index) in operator"-->
                  <!--:value="item.label"-->
                  <!--:key="index"-->
                  <!--&gt;{{item.value}}</Option>-->
                  <!--</Select>-->
                </FormItem>
              </Col>
              <Col span="12" style="padding-left: 30px">
                <FormItem label="预警值" prop="warnValue">
                  <Row>
                    <Col :span="24">
                      <span>{{targetForm.warnValue}}</span>
                      <!--<Input-->
                      <!--v-model="targetForm.warnValue"-->
                      <!--disabled-->
                      <!--placeholder-->
                      <!--/>-->
                    </Col>
                    <!--<Col :span="12">-->
                    <!--<Input v-model="fullwarnValue" disabled placeholder/>-->
                    <!--</Col>-->
                  </Row>
                </FormItem>
              </Col>
            </Row>
          </div>
          <AddFileModal :addFileState="addFileState" ref="addFile" @closeMains="closeMains"></AddFileModal>
          <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <!-- <Button type="primary" size="large" @click="handleSubmit('targetForm')">保存</Button>
        <Button type="warning" size="large" @click="handleReset('targetForm')">重置</Button> -->
        <Button type="warning" size="large" @click="closeModal">关闭</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
import Principal from "@/components/principal";
import BasicData from "@/components/basicdata";
import AddFileModal from "../../diagnosis/modal/addFile";
import df from "@/api/utils";
import Preview from "@/components/preview";

export default {
    props: {
        normData: {
            type: Object,
            required: true
        }
    },
    components: { AddFileModal, Principal, BasicData ,Preview},
    data() {
        return {
             previews: {
                nameL: "",
                //预览文件数据
                data: [],
                state: false
            },
            output: "整数",
            modalParam: {
                minTime: "",
                maxTime: ""
            },
            pickerOptions: {
                disabledDate: time => {
                    return this.dealDisabledDate(time);
                }
            },
            basicData: {
                state: false,
                data: [],
                parentId: 0
            }, // 基础数据关联
            PrincipalData: {
                state: false,
                data: []
            }, //添加负责人弹框
            title: "", //标题
            updateModal: false, //更新模式
            spiralModal: false, //诊改模式
            association: [], //基础数据关联
            spotArr: [], //所有质控点list
            PersonData: [], //负责人
            addFileState: {
                //添加文件传过去的数据
                data: [],
                state: false
            },
            targetData: {
                pointId: 0,
                pointName: "",
                dataId: 0,
                targetFiles: [],
                standardFiles: [],
                directors: []
            },
            operator: [
                { label: 21, value: ">" },
                { label: 22, value: "<" },
                { label: 23, value: "=" },
                { label: 24, value: "≥" },
                { label: 25, value: "≤" }
                // { label: 26, value: "无" }
            ], //策略的运算符
            targetForm: {
                //表单里面的数据
                dataType: "",
                pointName: "",
                startTime: "",
                dataName: "",
                directorVos: [],
                targetName: "",
                endTime: "",
                weight: 1,
                remark: "",
                enableFlag: "0",
                targetStrategy: 24,
                targetFileVos: [],
                targetValue: "",
                targetWeight: 1,
                standardStrategy: 24,
                standardFileVos: [],
                standardValue: "",
                standardWeight: 1,
                warnStrategy: 22,
                warnValue: ""
            },
        };
    },
    computed: {
        fulltargetValue: function() {
            //根据不同的数据类型展示不同类型的值
            if (this.targetForm.dataType == "0") {
                //整数
                return Math.round(this.targetForm.targetValue);
            } else if (this.targetForm.dataType == "1") {
                //小数
                return parseFloat(this.targetForm.targetValue).toFixed(2);
            } else if (this.targetForm.dataType == "2") {
                //百分比
                return (this.targetForm.targetValue * 100).toFixed(2) + "%";
            } else if (this.targetForm.dataType == "3") {
                //千分比
                return (this.targetForm.targetValue * 1000).toFixed(2) + "‰";
            } else if (this.targetForm.dataType == "4") {
                //比例
                return this.targetForm.targetValue + " ：1";
            }else{
                return this.targetForm.targetValue
            }
        },
        fullstandardValue: function() {
            //根据不同的数据类型展示不同类型的值
            if (this.targetForm.dataType == "0") {
                //整数
                return Math.round(this.targetForm.standardValue);
            } else if (this.targetForm.dataType == "1") {
                //小数
                return parseFloat(this.targetForm.standardValue).toFixed(2);
            } else if (this.targetForm.dataType == "2") {
                //百分比
                return (this.targetForm.standardValue * 100).toFixed(2) + "%";
            } else if (this.targetForm.dataType == "3") {
                //千分比
                return (this.targetForm.standardValue * 1000).toFixed(2) + "‰";
            } else if (this.targetForm.dataType == "4") {
                //比例
                return this.targetForm.standardValue + " ：1";
            }else{
                return this.targetForm.targetValue
            }
        },
        fullwarnValue: function() {
            //根据不同的数据类型展示不同类型的值
            if (this.targetForm.dataType == "0") {
                //整数
                return Math.round(this.targetForm.warnValue);
            } else if (this.targetForm.dataType == "1") {
                //小数
                return parseFloat(this.targetForm.warnValue).toFixed(2);
            } else if (this.targetForm.dataType == "2") {
                //百分比
                return (this.targetForm.warnValue * 100).toFixed(2) + "%";
            } else if (this.targetForm.dataType == "3") {
                //千分比
                return (this.targetForm.warnValue * 1000).toFixed(2) + "‰";
            } else if (this.targetForm.dataType == "4") {
                //比例
                return this.targetForm.warnValue + " ：1";
            }else{
                return this.targetForm.targetValue
            }
        }
    },
    filters: {},
    methods: {
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
      },
               //关闭预览
        closePreview (val) {
            this.previews.state = val;
        },

        //打开预览
        openPreviewModal (row) {
            //把选择的文件数据===>previews.data传给子组件
            this.previews.name = row.fileSuffix
            this.previews.data = '/mngfile/chunkfile/previewStream/' + row.fileId;
            this.previews.state = true;
            this.$refs.preview.getPreviewData();
        },
        //查看基础数据是什么类型
        dataTypeFilter(value) {
            switch (value) {
                case 0:
                    this.targetForm.dataType = 0; //整数
                    break;
                case 1:
                    this.targetForm.dataType = 1; //"小数";
                    break;
                case 2:
                    this.targetForm.dataType = 2; //"百分比";
                    break;
                case 3:
                    this.targetForm.dataType = 3; //"千分比";
                    break;
                case 4:
                    this.targetForm.dataType = 4; //"比例";
                    break;
            }
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
        // 关闭基础数据
        closeBasicData(data) {
            console.log(data);
            if (data.length > 0) {
                this.association = data;
                if (data.length > 0) {
                    //返回的数据默认显示第一个 ：：：：
                    // this.allData.norm.association = this.association[0].id;
                }
            }
            this.dataTypeFilter(data.dataType);
            this.basicData.state = false;
            //TODO 需要优化
            let selectData = {
                dataName: data.dataName,
                dataId: data.dataId
            };
            this.targetForm.dataName = selectData.dataName;
            this.targetForm.targetName = selectData.dataName;
            this.targetData.dataId = selectData.dataId;
        },
        // 打开基础数据
        openBasicData() {
            console.log("打开");
            console.log(this.$refs.basicdata);
            this.basicData.state = true;
            this.$refs.basicdata.loadingData();
        },
        //关闭添加负责人
        closePrincipal(data) {
            this.PrincipalData.state = false;
            //todo 需要优化，去重复
            // this.targetForm.directorVos = []
            if (data && data.length > 0) {
                data.forEach(o => {
                    this.targetForm.directorVos.push({
                        directorId: o.userId,
                        directorName: o.name
                    });
                });
            }
        },
        //打开添加负责人
        openPrincipal() {
            this.PrincipalData.state = true;
            this.$refs.principal.loadData();
            //this.$refs.principal.getBaseData(); //子组件请求部门tree
            //this.$refs.principal.getBaseData2(); //子组件请求校色列表
        },
        //删除负责人
        handleClosePerson(item, index) {
            this.$confirm("确认删除该负责人？", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.targetForm.directorVos.splice(index, 1);
                })
                .catch(() => {});
        },
        // 保存
        handleSubmit(name) {
            let that = this;
            that.$refs[name].validate(valid => {
                if (valid) {
                    // 这里写接口添加或修改
                    if (
                        that.targetForm.startTime.valueOf() >
                        that.targetForm.endTime.valueOf()
                    ) {
                        that.$Message.warning("开始时间不能晚于结束时间");
                        return;
                    }

                    let formData = {
                        targetName: that.targetForm.targetName,
                        weight: that.targetForm.weight,
                        remark: that.targetForm.remark,
                        targetStrategy: that.targetForm.targetStrategy,
                        targetValue: that.targetForm.targetValue,
                        targetWeight: that.targetForm.targetWeight,
                        standardStrategy: that.targetForm.standardStrategy,
                        standardValue: that.targetForm.standardValue,
                        standardWeight: that.targetForm.standardWeight,
                        warnStrategy: that.targetForm.warnStrategy,
                        warnValue: that.targetForm.warnValue,
                        enableFlag: that.targetForm.enableFlag,
                        startTime: df
                            .dateFormat(that.targetForm.startTime)
                            .substr(0, 10),
                        endTime: df
                            .dateFormat(that.targetForm.endTime)
                            .substr(0, 10)
                    };
                    //处理负责人
                    let directorData = that.targetForm.directorVos;
                    if (!(directorData && directorData.length > 0)) {
                        this.$Message.error("请选择负责人");
                        return;
                    }
                    let directors = [];
                    directorData.forEach(o => {
                        directors.push(o.directorId);
                    });
                    that.targetData.directors = directors;
                    //处理目标支撑文件
                    let targetFileVos = that.targetForm.targetFileVos;
                    let targetFiles = [];
                    if (targetFileVos && targetFileVos.length > 0) {
                        targetFileVos.forEach(o => {
                            targetFiles.push(o.fileId);
                        });
                    }
                    that.targetData.targetFiles = targetFiles;
                    //处理标准支撑文件
                    let standardFileVos = that.targetForm.standardFileVos;
                    let standardFiles = [];
                    if (standardFileVos && standardFileVos.length > 0) {
                        standardFileVos.forEach(o => {
                            standardFiles.push(o.fileId);
                        });
                    }
                    that.targetData.standardFiles = standardFiles;

                    let param = Object.assign(formData, that.targetData);
                    if (that.updateModal) {
                        that.$Put("/admin/target", param, function(data) {
                            console.info(data);
                            that.$Message.success("修改成功");
                            that.$emit("closeNormModal", {
                                state: false,
                                reload: true
                            });
                        });
                    } else if (that.spiralModal) {
                        that.$Put("/admin/target/spiral", param, function(
                            data
                        ) {
                            console.info(data);
                            that.$Message.success("诊改成功");
                            that.$emit("closeNormModal", {
                                state: false,
                                reload: true
                            });
                        });
                    } else {
                        that.$Post("/admin/target", param, function(data) {
                            console.info(data);
                            that.$Message.success("添加成功");
                            that.$emit("closeNormModal", {
                                state: false,
                                reload: true
                            });
                        });
                    }
                }
            });
        },
        // 重置
        handleReset(name) {
            this.$refs[name].resetFields();
            if (this.updateModal || this.spiralModal) {
                this.getTargetForm();
            } else {
                this.targetForm = {
                    dataType: "",
                    startTime: this.modalParam.minTime,
                    dataName: "",
                    directorVos: [],
                    targetName: "",
                    endTime: this.modalParam.maxTime,
                    weight: 1,
                    remark: "",
                    enableFlag: "0",
                    targetStrategy: 24,
                    targetFileVos: [],
                    targetValue: "",
                    targetWeight: 1,
                    standardStrategy: 24,
                    standardFileVos: [],
                    standardValue: "",
                    standardWeight: 1,
                    warnStrategy: 22,
                    warnValue: ""
                };
            }
        },
        // 关闭添加文件框
        closeMains(val, sence, data) {
            console.log("关闭了");
            this.addFileState.state = val;
            //TODO 需要优化,去重复

            var that = this;
            if (!val) {
                if (sence == 1) {
                    if (data.length > 0) {
                        data.forEach(e => {
                            that.targetForm.targetFileVos.push(e);
                        });
                    }
                    /*this.targetForm.targetFileVos = [
                      {fileId: 2, fileName: "文件2.txt"}
                    ];*/
                }
                if (sence == 2) {
                    data.forEach(e => {
                        that.targetForm.standardFileVos.push(e);
                    });
                }
            }
        },
        // 打开添加文件框
        openAddFile(scene) {
            this.addFileState.data = scene; //传是哪个场景下的id
            this.addFileState.state = true;
            this.$refs.addFile.loadData();
        },
        deleteTargetFile(row, index) {
            this.$confirm("确认删除该文件？", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.targetForm.targetFileVos.splice(index, 1);
                })
                .catch(() => {});
        },
        // 删除文件
        deleteStandardFile(row, index) {
            this.$confirm("确认删除该文件？", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.targetForm.standardFileVos.splice(index, 1);
                })
                .catch(() => {});
        },
        // 查询该id下的文件
        getNormList() {
            let data = this.normData.data;
            let minTime = data.minTime;
            let maxTime = data.maxTime;
            if (minTime && maxTime) {
                this.modalParam.minTime = new Date(minTime.replace("-", "/"));
                this.modalParam.maxTime = new Date(maxTime.replace("-", "/"));
            }
            this.targetData.pointId = data.pointId;
            this.targetData.pointName = data.pointName;
            this.updateModal = false;
            this.spiralModal = false;
            let keysLength = Object.keys(this.normData.data).length;
            if (keysLength === 4) {
                //新增
                this.title = "新增指标";
            } else if (keysLength === 7) {
                //诊改
                this.title = "诊改指标";
                this.spiralModal = true;
                this.targetData.targetId = this.normData.data.targetId;
                this.targetData.dataId = this.normData.data.dataId;
            } else {
                //编辑
                this.title = "指标详情";
                this.updateModal = true;
                this.targetData.targetId = this.normData.data.targetId;
                //这里根据当前点击id请求对应的数据,
            }
            this.handleReset("targetForm");
        },
        //获取指标数据
        getTargetForm() {
            let that = this;
            that.$Get("/admin/target/" + that.targetData.targetId, {}, function(
                data
            ) {
                let targetFileVos = data.data.targetFiles;
                if (!targetFileVos) {
                    targetFileVos = [];
                }
                let standardFileVos = data.data.standardFiles;
                if (!standardFileVos) {
                    standardFileVos = [];
                }

                console.log(data.data);
                that.targetForm = {
                    dataType: data.data.dataType,
                    //表单的数据
                    startTime: data.data.startTime,
                    dataName: data.data.dataName,
                    directorVos: data.data.directors,
                    targetName: data.data.targetName,
                    endTime: data.data.endTime,
                    weight: data.data.weight,
                    remark: data.data.remark,
                    enableFlag: data.data.enableFlag,
                    targetStrategy: data.data.targetStrategy,
                    targetFileVos: targetFileVos,
                    targetValue: data.data.targetValue,
                    targetWeight: data.data.targetWeight,
                    standardStrategy: data.data.standardStrategy,
                    standardFileVos: standardFileVos,
                    standardValue: data.data.standardValue,
                    standardWeight: data.data.standardWeight,
                    warnStrategy: data.data.warnStrategy,
                    warnValue: data.data.warnValue
                };
                that.targetData.dataId = data.data.dataId;
            });
        },
        //关闭添加文件
        closeModal() {
            this.$emit("closeNormModal", { state: false, reload: false });
            this.normData.state = false;
        }
    }
};
</script>

<style lang="less">
@import url("./indicatorModal.less");
@import url("../../../assets/css/theme");
@import url("../../../assets/css/color");
</style>
