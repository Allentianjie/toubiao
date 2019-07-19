<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox" class-name="vertical-center-modal" v-model="addTaskData.state" width="50%"
           :mask-closable="false"
           @on-cancel="closeAssignmentModal2"
    >
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>分派部门诊改</span>
      </p>
      <Form :label-width="100">
        <div class="fileManage">
          <Divider orientation="left">分派信息</Divider>
          <div v-show="noData" class="fileBox" v-for="(taskForm,taskIndex) in targetForm" :key="taskIndex" id="norm">
              <Form
                :ref="'taskForm' + taskIndex"
                :model="taskForm"
                :rules="ruleValidate"
                :label-width="80"
              >
                <Row>
                  <Col span="12">
                    <FormItem label="选择部门" prop="deptId">
                      <Select @on-change="changeDeptdata(taskIndex, $event)" :disabled="taskForm.updateModal" filterable
                              v-model="taskForm.deptId">
                        <Option v-for="item in deptData" :value="item.deptId" :key="item.deptId">{{ item.name }}
                        </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="数据类型" prop="dataType">
                      <Select disabled v-model="taskForm.dataType" placeholder="请选择类型">
                        <Option value="0">整数</Option>
                        <Option value="1">小数</Option>
                        <Option value="2">百分比</Option>
                        <Option value="3">千分比</Option>
                        <Option value="4">比列</Option>
                        <Option value="5">布尔</Option>
                      </Select>
                    </FormItem>
                    <FormItem v-if="!taskForm.updateModal" label="开始时间" prop="startTime">
                      <DatePicker
                        @on-change="changeDatestart"
                        v-model="taskForm.startTime"
                        :disabled="taskForm.updateModal"
                        :options="pickerOptions"
                        style="width: 100%"
                        type="date"
                        placeholder
                      ></DatePicker>
                    </FormItem>
                    <FormItem v-else label="开始时间">
                      <DatePicker
                        @on-change="changeDatestart"
                        v-model="taskForm.startTime"
                        :disabled="taskForm.updateModal"
                        :options="pickerOptions"
                        style="width: 100%"
                        type="date"
                        placeholder
                      ></DatePicker>
                    </FormItem>
                    <FormItem v-if="!taskForm.updateModal" label="结束时间" prop="endTime">
                      <DatePicker
                        @on-change="changeDateend"
                        v-model="taskForm.endTime"
                        :disabled="taskForm.updateModal"
                        :options="pickerOptions"
                        style="width: 100%"
                        type="date"
                        placeholder
                      ></DatePicker>
                    </FormItem>
                    <FormItem v-else label="结束时间">
                      <DatePicker
                        @on-change="changeDateend"
                        v-model="taskForm.startTime"
                        :disabled="taskForm.updateModal"
                        :options="pickerOptions"
                        style="width: 100%"
                        type="date"
                        placeholder
                      ></DatePicker>
                    </FormItem>
                    <FormItem label="目标策略">
                      <Select
                        v-model="taskForm.targetStrategy"
                        :disabled="taskForm.updateModal"
                        filterable
                      >
                        <Option
                          v-for="(item,index) in operator"
                          :value="item.label"
                          :key="index"
                        >{{item.value}}
                        </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="目标值" prop="targetValue">
                      <Row v-if="taskForm.dataType != 5">
                        <Col :span="12">
                          <Input
                            v-model="taskForm.targetValue"
                            :disabled="taskForm.updateModal"
                            placeholder
                          />
                        </Col>
                        <Col :span="12">&nbsp;
                          <span>{{taskForm.targetValue | fulltargetValue(taskForm.dataType)}}</span>
                        </Col>
                      </Row>
                      <Row v-if="taskForm.dataType == 5">
                        <el-radio v-model="taskForm.targetValue" label="0">否</el-radio>
                        <el-radio v-model="taskForm.targetValue" label="1">是</el-radio>
                      </Row>
                    </FormItem>
                    <FormItem label="目标权重">
                      <InputNumber style="width: 100%" v-model="taskForm.targetWeight" :min="0" :max="100"/>
                    </FormItem>
                    <FormItem label="预警策略">
                      <Select
                        v-model="taskForm.warnStrategy"
                        :disabled="taskForm.updateModal"
                        filterable
                      >
                        <Option
                          v-for="(item,index) in operator"
                          :value="item.label"
                          :key="index"
                        >{{item.value}}
                        </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="预警值" prop="warnValue">
                      <Row v-if="taskForm.dataType !== 5">
                        <Col :span="12">
                          <Input
                            v-model="taskForm.warnValue"
                            :disabled="taskForm.updateModal"
                            placeholder
                          />
                        </Col>
                        <Col :span="12">
                          &nbsp; &nbsp;
                          <span>{{taskForm.warnValue | fullwarnValue(taskForm.dataType)}}</span>
                        </Col>
                      </Row>
                      <Row v-else>
                        <el-radio v-model="taskForm.warnValue" label="0">否</el-radio>
                        <el-radio v-model="taskForm.warnValue" label="1">是</el-radio>
                      </Row>
                    </FormItem>
                    <FormItem label="当前值">
                      <Row v-if="taskForm.dataType !== 5">
                        <Col :span="24">
                          <Input
                            v-model="taskForm.disValue"
                            disabled
                            placeholder
                          />
                        </Col>
                      </Row>
                      <Row v-else>
                        <el-radio disabled v-model="taskForm.disValue" label="0">否</el-radio>
                        <el-radio disabled v-model="taskForm.disValue" label="1">是</el-radio>
                      </Row>
                    </FormItem>
                  </Col>
                  <Col span="12" style="padding-left: 30px">
                    <FormItem label="诊改名称" prop="taskName">
                      <Input v-model="taskForm.taskName" placeholder/>
                    </FormItem>
                    <FormItem label="负责人" prop="directorVos">
                      <Button
                        @click="openPrincipal(taskForm,taskIndex)"
                        class="add-doc"
                        ghost
                        type="success"
                        size="small"
                        icon="ios-add-circle-outline"
                      >添加负责人
                      </Button>
                      <div class="personData">
                        <Tag
                          v-for="(item,index) in taskForm.directorVos"
                          :key="item.directorId"
                          :name="item.directorName"
                          closable
                          @on-close="handleClosePerson(taskIndex,item,index)"
                        >{{ item.directorName}}
                        </Tag>
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
                      >添加文件
                      </Button>
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
                            >预览
                            </Button>
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

                    <FormItem label="标准策略">
                      <Select
                        v-model="taskForm.standardStrategy"
                        :disabled="taskForm.updateModal"
                        filterable
                      >
                        <Option
                          v-for="(item,index) in operator"
                          :value="item.label"
                          :key="index"
                        >{{item.value}}
                        </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="标准值" prop="standardValue">
                      <Row v-if="taskForm.dataType != '5'">
                        <Col :span="12">
                          <Input
                            v-model="taskForm.standardValue"
                            :disabled="taskForm.updateModal"
                            placeholder
                          />
                        </Col>
                        <Col :span="12">
                          <span>{{taskForm.standardValue | fullstandardValue(taskForm.dataType)}}</span>
                        </Col>
                      </Row>
                      <Row v-else>
                        <Select v-model="taskForm.standardValue" placeholder="请选择标准值">
                          <Option value="0">否</Option>
                          <Option value="1">是</Option>
                        </Select>
                      </Row>
                    </FormItem>
                    <FormItem label="标准权重">
                      <InputNumber style="width: 100%" v-model="taskForm.standardWeight" :min="0" :max="100"/>
                    </FormItem>
                  </Col>

                </Row>
              </Form>
          </div>
        </div>
      </Form>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="saveAllocateTaskItem(targetForm[0],0)">保存</Button>
        <Button type="warning" size="large" @click="closeAssignmentModal2('targetForm')">关闭</Button>
      </div>
      <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
      <AddFileModal ref="addFile" :addFileState="addFileState" @closeMains="closeMains"></AddFileModal>
      <Principal
        ref="principal"
        :PrincipalData="PrincipalData"
        @closePrincipal="closePrincipal"
      ></Principal>
      <BasicData ref="basicdata" :basicData="basicData" @closeBasicData="closeBasicData"></BasicData>
    </Modal>
  </div>
</template>

<script>
  import Principal from "@/components/principal";
  import BasicData from "@/components/basicdata";
  import AddFileModal from "@/views/diagnosis/modal/addFile";
  import df from "@/api/utils";
  import Preview from "@/components/preview";
  import store from "@/store";
  import {
    fetchList,
    fetchValueList,
    fetchValueLists,
    getObj,
    addObj,
    putObj,
    delObj,
    getTree
  } from "@/api/database/database";
  import {remote} from '@/api/admin/dict'

  export default {
    props: {
      addTaskData: {
        type: Object,
        required: true
      }
    },
    components: {AddFileModal, Principal, BasicData, Preview},
    data() {
      return {
        noData: true,
        deptData: [],
        itemIndex: 0,
        btnState: false,
        loading: false,
        options4: [],
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
          directorVos: [
            {
              required: true,
              type: "array",
              message: "请选择负责人",
              trigger: "change"
            }
          ],
          deptId: [
            {
              required: true,
              message: "部门不能为空",
              trigger: "blur"
            },
          ],
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
          summaryMode: [
            {
              required: true,
              message: "请选择汇总方式",
              trigger: "blur"
            }
          ],
          calculateMode: [
            {
              required: true,
              message: "请选择计算方式",
              trigger: "blur"
            }
          ],
          dataType: [
            {
              required: true,
              message: "请选择数据类型",
              trigger: "blur"
            }
          ],
          dataName: [
            {
              required: true,
              message: "关联数据不能为空",
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

            // {
            //   type: "string",
            //   max: 20,
            //   message: "目标值不能大于20字符",
            //   trigger: "blur"
            // }
          ],
          standardValue:[
            {
              required: true,
              message: "标准值不能为空",
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
            // {
            //   type: "string",
            //   max: 20,
            //   message: "预警值不能大于20字符",
            //   trigger: "blur"
            // }
          ]
        },
        BasIndex: 0,
        PrincipalIndex: 0,
        fileIndex: 0,
        addDataState: false,
        reloadTaskTable: false, //是否需要刷新任务列表，分派任务有变动是否需要刷新任务列表
        targetForm: [
          {
            deptId: "",
            identName: "",
            summaryMode: '',
            calculateMode: '',
            dataType: "",
            taskName: "",
            startTime: "",
            endTime: "",
            dataName: "",
            dataId: 0,
            targetStrategy: 21,
            targetValue: "",
            warnStrategy: 22,
            warnValue: "",
            standardStrategy: 22,
            standardValue: "",
            standardWeight: 1,
            targetWeight: 1,
            dataValue: "",
            directorVos: [],
            targetFileVos: [],
            unEndTask: true, //是否为结束的任务
            updateModal: false
          }
        ],
        addFileState: {
          //添加文件传过去的数据
          data: [],
          state: false
        },
        basicData: {
          parentId: null,
          identId: null,
          state: false,
          data: []
        }, // 基础数据关联
        PrincipalData: {
          state: false,
          data: []
        }, //添加负责人弹框
        PersonData: [], //负责人
        operator: [
          {label: 21, value: ">"},
          {label: 22, value: "<"},
          {label: 23, value: "="},
          {label: 24, value: "≥"},
          {label: 25, value: "≤"}
          // {label: 26, value: "无"}
        ] //策略的运算符
      };
    },
    computed: {
      hierarchyName: function () {
        let task = this.addTaskData.data;
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
      taskTarget: function () {
        let task = this.addTaskData.data;
        return (
          this.getStrategySymbol(task.targetStrategy) +
          " " +
          task.disTargetValue
        );
      }
    },
    filters: {
      fulltargetValue: function (value, first) {
        if (first == "0") {
          //整数
          return Math.round(value);
        } else if (first == "1") {
          //小数
          return parseFloat(value).toFixed(2);
        } else if (first == "2") {
          //百分比
          return (value * 100 / 100).toFixed(2) + "%";
        } else if (first == "3") {
          //千分比
          return (value * 1000 / 1000).toFixed(2) + "‰";
        } else if (first == "4") {
          //比例
          return value + " ：1";
        }
      },
      fullwarnValue: function (value, first) {
        if (first == "0") {
          //整数
          return Math.round(value);
        } else if (first == "1") {
          //小数
          return parseFloat(value).toFixed(2);
        } else if (first == "2") {
          //百分比
          return (value * 100 / 100).toFixed(2) + "%";
        } else if (first == "3") {
          //千分比
          return (value * 1000 / 1000).toFixed(2) + "‰";
        } else if (first == "4") {
          //比例
          return value + " ：1";
        }
      },
      fullstandardValue: function (value, first) {
        if (first == "0") {
          //整数
          return Math.round(value);
        } else if (first == "1") {
          //小数
          return parseFloat(value).toFixed(2);
        } else if (first == "2") {
          //百分比
          return (value * 100 / 100).toFixed(2) + "%";
        } else if (first == "3") {
          //千分比
          return (value * 1000 / 1000).toFixed(2) + "‰";
        } else if (first == "4") {
          //比例
          return value + " ：1";
        }
      }
    },
    methods: {
      //时间选择判断
      changeDatestart(val, data) {
        if (this.targetForm[this.itemIndex].endTime) {
          if (this.targetForm[this.itemIndex].startTime.valueOf() > this.targetForm[this.itemIndex].endTime.valueOf()) {
            this.$Message.warning("开始时间不能晚于结束时间");
            this.targetForm[this.itemIndex].startTime = '';
            return;
          }
        }
      },
      changeDateend(val, data) {
        if (this.targetForm[this.itemIndex].startTime) {
          if (this.targetForm[this.itemIndex].startTime.valueOf() > this.targetForm[this.itemIndex].endTime.valueOf()) {
            this.$Message.warning("结束时间不能早于开始时间");
            this.targetForm[this.itemIndex].endTime = '';
            return;
          }
        }
      },
      //选择部门下拉框
      changeDeptdata(index, val) {
        this.itemIndex = index;
        this.options4 = [];
        // console.log(val);
        if (val != undefined) {
          this.addDataState = false;
          this.$Get('admin/database/getByIdentIdAndDeptId?identId=' + this.addTaskData.data.identId + '&deptId=' + val, null, (res) => {
            if (res.data != null) {
              this.targetForm[this.itemIndex].dataName = res.data.dataName;
              this.targetForm[this.itemIndex].dataId = res.data.dataId;
              this.targetForm[this.itemIndex].taskName=this.addTaskData.data.targetName
              // this.options4.push({
              //   dataName: res.data.dataName,
              //   dataId: res.data.dataId
              // })
            } else {
              this.addDataState = true;
              let deptName="";
              for(let i=0;i<this.deptData.length;i++){
                if(this.deptData[i].deptId==val){
                  deptName=this.deptData[i].name
                }
              }

              this.targetForm[this.itemIndex].dataName=this.addTaskData.data.taskName+deptName;
              // this.targetForm[this.itemIndex].taskName=deptName+this.addTaskData.data.targetName
              this.targetForm[this.itemIndex].taskName=this.addTaskData.data.targetName
              // this.$Message.error("暂无数据，请输入添加数据");
              // this.targetForm[this.itemIndex].dataName =
            }
          })
        }else {

        }

      },
      //搜索数据搜索框
      searchData() {
        this.options4 = [];
        let params = {
          deptId: this.addTaskData.deptId,
          parentId: this.addTaskData.dataId,
          dataName: this.targetForm[this.itemIndex].dataName, // 名称
          layType: this.addTaskData.hieId
        };
        fetchValueLists(
          Object.assign(
            {
              current: 1,
              size: 100
            },
            params
          )
        ).then(response => {

          if (response.data.data.length > 0) {
            this.options4 = response.data.data;
            this.remoteMethod(this.targetForm[this.itemIndex].dataName);
            this.$Message.success("请选择数据关联")
          } else {
            this.$Message.error("暂无数据,请新增");
          }
        });
      },
      // 输入基础数据关键词
      remoteMethod(query) {
        if (this.targetForm[this.itemIndex].deptId == '') {
          query = "";
          this.$Modal.confirm({
            title: '提示',
            content: '<p>请先选择部门再关联基础数据？</p>',
            onOk: () => {
              // this.$Message.info('Clicked ok');
            },
            onCancel: () => {
              // this.$Message.info('Clicked cancel');
            }
          });
        }
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let params = {
              deptId: this.targetForm[this.itemIndex].deptId,
              parentId: this.addTaskData.dataId,
              dataName: query, // 名称
              layType: this.addTaskData.hieId
            };
            fetchValueLists(
              Object.assign(
                {
                  current: 1,
                  size: 100
                },
                params
              )
            ).then(response => {
              if (response.data.data.length > 0) {
                this.options4 = response.data.data;
                this.addDataState = false
              } else {
                // this.$Message.error("暂无数据")
                this.addDataState = true;
                this.targetForm[this.itemIndex].dataName = query
              }
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      },
      changeData(name) {

        setTimeout(() => {

          this.targetForm[this.itemIndex].dataName = name;
          this.addDataState = false;
          // this.updatedataModal = false;
          if (this.options4.length > 0) {

            // dataId: 128
            // dataName: "测试党委的"
            // this.
            for (let i = 0; i < this.options4.length; i++) {
              if (this.options4[i].dataName == name) {
                this.targetForm[this.itemIndex].dataName = name;
                this.targetForm[this.itemIndex].dataId = this.options4[i].dataId;
                //     console.log(this.options4[i])
                //     // this.updatedataModal = true;
                //     this.targetForm.dataUnit = this.options4[i].dataUnit;
                //     this.targetForm.deptId = 1;
                //     this.targetForm.deptName = "全校";
                //     this.targetForm.dataType = this.options4[i].dataType.toString();
                //     this.targetForm.identName = this.options4[i].identName;
                //     // this.$set(this.targetForm, 'summaryMode', this.options4[i].summaryMode.toString());
                //     // console.log(this.targetForm.summaryMode)
                //     this.targetForm.summaryMode = this.options4[i].summaryMode.toString();
                //     if (this.options4[i].calculateMode != null) {
                //       this.targetForm.calculateMode = this.options4[i].calculateMode.toString();
                //     } else {
                //       this.targetForm.calculateMode = '0'
                //     }
                //     this.targetData.dataId = this.options4[i].dataId
                //
                //   } else {
                //
              }
            }
          }
        }, 500)
      },
      //关闭预览
      closePreview(val) {
        this.previews.state = val;
      },
      onClickDiv(row) {
        // console.log(row);
        this.itemIndex = row.path[0].id;
      },
      //打开预览
      openPreviewModal(row) {
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
      //获取部门
      getDeptData() {
        this.$Get("/admin/dept/getByPid?parentId=" + this.addTaskData.data.deptId, null, res => {

            for (let i = 0; i < res.data.length; i++) {
              res.data[i].deptId = (res.data[i].deptId).toString()
            }
            this.deptData = res.data
          }
        );
      },
      //获取当前任务的分派任务
      getAllocateTaskss() {

        // this.noData = true;
        this.getDeptData();
        let startTime = this.addTaskData.data.startTime;
        let endTime = this.addTaskData.data.endTime;
        this.modalParam.minTime = new Date(startTime.replace("-", "/"));
        this.modalParam.maxTime = new Date(endTime.replace("-", "/"));
        // let allocateTasks = this.addTaskData.data.allocateTasks;
        // //清空分派集合
        // console.log(allocateTasks);
        // this.targetForm.splice(0, this.targetForm.length);
        // if (allocateTasks.length > 0) {
        //   allocateTasks.forEach(task => {
        //     if (this.addTaskData.data.dataType == 2) {
        //       task.warnValue = task.warnValue * 100;
        //       task.targetValue = task.targetValue * 100;
        //       task.standardValue = task.standardValue * 100
        //     }
        //     if (this.addTaskData.data.dataType == 3) {
        //       task.warnValue = task.warnValue * 1000;
        //       task.targetValue = task.targetValue * 1000;
        //       task.standardValue = task.standardValue * 1000
        //     }
        //     // console.log(task.startTime)
        //     this.targetForm.push({
        //       deptId: (task.deptId).toString(),
        //       dataId: task.dataId,
        //       dataType: (this.addTaskData.data.dataType).toString(),
        //       taskId: task.taskId,
        //       taskName: task.taskName,
        //       startTime: task.startTime,
        //       endTime: task.endTime,
        //       dataName: task.dataName,
        //       targetStrategy: task.targetStrategy,
        //       targetValue: (task.targetValue).toString(),
        //       standardStrategy: task.standardStrategy,
        //       standardValue: (task.standardValue).toString(),
        //       standardWeight: task.standardWeight,
        //       targetWeight: task.targetWeight,
        //       warnStrategy: task.warnStrategy,
        //       warnValue: (task.warnValue).toString(),
        //       dataValue: task.dataValue,
        //       disValue: task.disValue,
        //       directorVos: task.directors,
        //       targetFileVos: task.targetFiles,
        //       unEndTask: task.runState !== "2",
        //       updateModal: true
        //     });
        //     // console.log(this.targetForm)
        //   });
        // } else {
          //初始化一条待分派数据
          this.additem();
        // }
      },
      //保存单行的数据
      saveAllocateTaskItem(row, ind) {
        let that = this;
        let formName = "taskForm" + ind;
        // console.log(this.targetForm[ind]);
        that.$refs[formName][0].validate(valid => {
          if (valid) {
            // this.$confirm("请确认操作？", "提示", {
            //   type: "warning"
            // })
            //   .then(() => {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>请确认操作？</p>',
              onOk: () => {
                // 处理日期
                let form = that.targetForm[ind];
                // console.log(form);
                if (form.startTime.valueOf() < that.modalParam.minTime.valueOf()) {
                  that.$Message.warning("分派诊改的开始时间不能早于当前诊改的开始时间");
                  return;
                }
                if (form.startTime.valueOf() > form.endTime.valueOf()) {
                  that.$Message.warning("开始时间不能晚于结束时间");
                  return;
                }
                if (form.endTime.valueOf() > that.modalParam.maxTime.valueOf()) {
                  that.$Message.warning("分派诊改的结束时间不能晚于当前诊改的结束时间");
                  return;
                }


                if (that.targetForm[that.itemIndex].dataType == '2') {
                  form.targetValue = form.targetValue / 100;
                  form.warnValue = form.warnValue / 100;
                  form.standardValue = form.standardValue / 100;

                } else if (that.targetForm[that.itemIndex].dataType == '3') {
                  form.targetValue = form.targetValue / 1000;
                  form.warnValue = form.warnValue / 1000;
                  form.standardValue = form.standardValue / 1000;
                } else {
                }
                let formData = {
                  taskName: form.taskName,
                  startTime: df.dateFormat(form.startTime).substr(0, 10),
                  endTime: df.dateFormat(form.endTime).substr(0, 10),
                  dataId: form.dataId,
                  parentId: that.addTaskData.data.taskId,
                  targetStrategy: form.targetStrategy,
                  targetValue: form.targetValue,
                  warnStrategy: form.warnStrategy,
                  warnValue: form.warnValue,
                  standardStrategy: form.standardStrategy,
                  standardValue: form.standardValue,
                  standardWeight: form.standardWeight,
                  targetWeight: form.targetWeight,
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

                if (that.addDataState == false) {

                  let taskId = form.taskId;
                  if (Number.isInteger(taskId)) {
                    let taskData = {
                      taskId: taskId
                    };
                    let param = Object.assign(formData, taskData);
                    that.$Put("/admin/task", param, function (data) {

                      that.$Message.success("更新分派成功");
                      that.reloadTaskTable = true;
                      that.$emit("closeAssignmentModal2", {
                        state: false,
                      });
                    });
                  } else {
                    that.$Post("/admin/task", formData, function (
                      data
                    ) {
                      // console.info(data);
                      that.$Message.success("分派成功");
                      that.reloadTaskTable = true;
                      that.targetForm[ind].updateModal = true;
                      that.$emit("closeAssignmentModal2", {
                        state: false,
                      });
                    });
                  }
                } else {
                  let params = {
                    deptId: that.targetForm[that.itemIndex].deptId,
                    parentId: that.addTaskData.data.dataId,
                    dataName: that.targetForm[that.itemIndex].dataName, // 名称
                  };
                  that.$Post("/admin/database/saveSubData", params, function (data) {

                    if (data.code == 0) {
                      let taskId = form.taskId;
                      if (Number.isInteger(taskId)) {
                        let taskData = {
                          taskId: taskId
                        };
                        let param = Object.assign(formData, taskData);

                        that.$Put("/admin/task", param, function (data) {

                          that.$Message.success("更新分派成功");
                          that.reloadTaskTable = true;
                          that.$emit("closeAssignmentModal2", {
                            state: false,
                          });
                        });
                      } else {
                        formData.dataId = data.data;
                        that.$Post("/admin/task", formData, function (data) {
                          that.$Message.success("分派成功");
                          that.$emit("closeAssignmentModal2", {
                            state: false,
                          });
                          that.reloadTaskTable = true;
                          that.targetForm[ind].updateModal = true;
                          that.addDataState == false
                        });
                      }
                    } else {
                      that.$Message.error(data.msg)
                    }
                    // that.$Message.success("更新分派成功");
                  });
                }
              },
              onCancel: () => {
                // this.$Message.info('Clicked cancel');
              }
            });




          }
        });
      },
      //删除分派
      removeAllocateTaskItem(row, ind) {
        let taskId = row.taskId;
        let that = this;
        if (Number.isInteger(taskId)) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>执行该操作将同时删除下级所有已经分派并执行的子诊改，确认删除吗？</p>',
            onOk: () => {
              that.$Delete("/admin/task/" + taskId, {}, function (
                data
              ) {

                that.$Message.success("删除成功");

                if (that.targetForm.length == 1) {
                  // that.$Message.error("没有了！")
                  that.noData = false;
                } else {
                  that.targetForm.splice(ind, 1);
                }
                that.reloadTaskTable = true;
              });
            },
            onCancel: () => {

            }
          });
        } else {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确认删除该分派诊改吗？</p>',
            onOk: () => {
              if (that.targetForm.length == 1) {
                // that.$Message.error("没有了！");
                that.noData = false;
              } else {
                that.targetForm.splice(ind, 1);
              }
            },
            onCancel: () => {

            }
          });
        }
      },
      //添加分派
      additem() {
        this.targetForm=[];
        if (this.noData == false) {
          this.noData = true
        } else {
          this.changeVlue(this.addTaskData.data.dataType);

          this.targetForm.push({
            deptId: "",
            dataType: (this.addTaskData.data.dataType).toString(),
            taskName: "",
            startTime: this.modalParam.minTime,
            endTime: this.modalParam.maxTime,
            dataName: "",
            dataId: this.addTaskData.data.dataId,
            targetStrategy: this.addTaskData.data.targetStrategy,
            targetValue: this.addTaskData.data.targetValue,
            standardStrategy: this.addTaskData.data.standardStrategy,
            standardValue:this.addTaskData.data.standardValue,
            standardWeight: this.addTaskData.data.standardWeight,
            targetWeight: this.addTaskData.data.targetWeight,
            warnStrategy: this.addTaskData.data.warnStrategy,
            warnValue: this.addTaskData.data.warnValue,
            disValue: this.addTaskData.data.disValue,
            dataValue: this.addTaskData.data.dataValue,
            directorVos: [],
            targetFileVos: [],
            unEndTask: true,
            updateModal: false
          });
        }

      },
      //返回的值回显成要求的格式
      changeVlue(val) {
        //编辑
        if (val == '2') {
          this.addTaskData.data.targetValue = (this.addTaskData.data.targetValue * 100).toFixed(2);
          this.addTaskData.data.warnValue = (this.addTaskData.data.warnValue * 100).toFixed(2);
          this.addTaskData.data.standardValue = (this.addTaskData.data.standardValue * 100).toFixed(2);
        } else if (val == '3') {
          this.addTaskData.data.targetValue = (this.addTaskData.data.targetValue * 1000).toFixed(2);
          this.addTaskData.data.warnValue = (this.addTaskData.data.warnValue * 1000).toFixed(2);
          this.addTaskData.data.standardValue = (this.addTaskData.data.standardValue * 1000).toFixed(2);
        }

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
        this.basicData.identId = this.addTaskData.data.identId; //最外层传的id
        this.BasIndex = ind; //保存点击基础数据的下标，方便返回数据赋值====this.targetForm[this.BasIndex][0]
        this.basicData.state = true;
        this.$refs.basicdata.loadingData();
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
        let obj = {};
        this.targetForm[this.PrincipalIndex].directorVos = this.targetForm[this.PrincipalIndex].directorVos.reduce(function (item, next) {
          obj[next.directorId] ? '' : obj[next.directorId] = true && item.push(next);
          return item;
        }, []);
      },
      //打开添加负责人
      openPrincipal(row, ind) {
        this.PrincipalIndex = ind; //保存点击负责人的下标，方便上面 closePrincipal方法里返回数据赋值====this.targetForm[this.PrincipalIndex]
        this.$refs.principal.loadData();
        this.PrincipalData.state = true;
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
      handleSubmit(name) {
      },
      // 重置
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      // 关闭添加文件框
      closeMains(val, sence, data) {
        this.addFileState.state = val;
        if (data && data.length > 0) {
          data.forEach(e => {
            this.targetForm[this.fileIndex].targetFileVos.push(e);
          });
        }
        let obj = {};
        this.targetForm[this.fileIndex].targetFileVos = this.targetForm[this.fileIndex].targetFileVos.reduce(function (item, next) {
          obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
          return item;
        }, []);

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
      closeAssignmentModal2() {
        this.$emit("closeAssignmentModal2", {
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
  .name {
    color: #347ce8;
  }

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
    text-align: left;

    .content {
      overflow: hidden;
      overflow-y: auto;
      width: 100%;
      height: 80px;
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
