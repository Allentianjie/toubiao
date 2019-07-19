<template>
  <div class="theme" id="preView" style="width:100%">
    <Modal  id="preViewBox"
           class-name="vertical-center-modal" v-show="isOpen" v-model="normData.state" width="50%"
           :mask-closable="false" @on-cancel="closeModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>{{title}}</span>
      </p>
      <div class="fileManage" id="norm">
        <Form ref="targetForm" :model="targetForm" :rules="ruleValidate" :label-width="100">
          <Divider orientation="left">指标</Divider>
          <div class="fileBox">
            <Row>
              <Col span="12" style="padding-right: 30px">
                <FormItem label="所属质控点">
                  <Input v-model="targetData.pointName" disabled placeholder/>
                </FormItem>
                <FormItem label="开始时间" prop="startTime">
                  <DatePicker
                    @on-change="changeDatestart"
                    v-model="targetForm.startTime"
                    :options="pickerOptions"
                    style="width: 100%"
                    type="date"
                    placeholder
                  ></DatePicker>
                </FormItem>
                <FormItem label="数据关联" prop="dataName" id="dataName">
                  <el-row>
                    <el-col :span="24">
                      <Input v-if="spiralModal" :disabled="spiralModal" @input="seClickDiv(targetForm.dataName)"
                             @on-focus="inClickDiv" @on-blur="onClickDiv" v-model="targetForm.dataName" placeholder/>
                      <Input v-if="!spiralModal" :disabled="updateModal" @input="seClickDiv(targetForm.dataName)"
                             @on-focus="inClickDiv" @on-blur="onClickDiv" v-model="targetForm.dataName" placeholder/>
                      <div class="contents" v-show="newState">
                        <!--<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">-->
                        <!--<el-button>右边</el-button>-->
                        <!--</el-tooltip>-->
                        <Poptip style="width: 100%;padding: 0;height: 35px" v-show="options4.length>0"
                                v-for="(item,index) in options4" :key="index" trigger="hover" placement="right"
                                :content="item.dataName">
                          <div class="items" @click="changeData(item)"> {{item.dataName}}</div>
                        </Poptip>
                        <!--<div v-show="options4.length>0" @click="changeData(item)" class="items"-->
                        <!--v-for="(item,index) in options4">-->
                        <!--{{item.dataName}}-->
                        <!--</div>-->
                        <span v-show="options4.length<1" style="width: 100%;height:40px;text-align: center">暂无数据</span>
                      </div>
                      <!--<el-select-->
                      <!--@focus="onClickDiv"-->
                      <!--v-if="spiralModal"-->
                      <!--:disabled="spiralModal"-->
                      <!--class="ivu-input"-->
                      <!--style="width: 100%;"-->
                      <!--@change="changeData"-->
                      <!--v-model="targetForm['dataName']"-->
                      <!--filterable-->
                      <!--remote-->
                      <!--reserve-keyword-->
                      <!--placeholder="请输入关键词"-->
                      <!--:remote-method="remoteMethod"-->
                      <!--:loading="loading"-->
                      <!--ref='select'>-->
                      <!--<el-option-->
                      <!--v-for="item in options4"-->
                      <!--:key="item.dataId"-->
                      <!--:label="item.dataName"-->
                      <!--:value="item.dataName">-->
                      <!--</el-option>-->
                      <!--</el-select>-->
                      <!--<el-select-->
                      <!--@focus="onClickDiv"-->
                      <!--v-if="!spiralModal"-->
                      <!--:disabled="updateModal"-->
                      <!--class="ivu-input"-->
                      <!--style="width: 100%;"-->
                      <!--@change="changeData"-->
                      <!--v-model="targetForm['dataName']"-->
                      <!--filterable-->
                      <!--remote-->
                      <!--reserve-keyword-->
                      <!--placeholder="请输入关键词"-->
                      <!--:remote-method="remoteMethod"-->
                      <!--:loading="loading">-->
                      <!--<el-option-->
                      <!--v-for="item in options4"-->
                      <!--:key="item.dataId"-->
                      <!--:label="item.dataName"-->
                      <!--:value="item.dataName">-->
                      <!--</el-option>-->
                      <!--</el-select>-->
                    </el-col>
                    <!--<el-col :span="2">-->
                    <!--<Button-->
                    <!--:disabled="updateModal"-->
                    <!--@click="searchData"-->
                    <!--type="primary"-->
                    <!--icon="ios-search"-->
                    <!--&gt;</Button>-->
                    <!--</el-col>-->
                  </el-row>

                </FormItem>
                <FormItem label="数据类型" prop="dataType">
                  <Select :disabled="updatedataModal" v-model="targetForm.dataType" placeholder="请选择类型">
                    <Option value="0">整数</Option>
                    <Option value="1">小数</Option>
                    <Option value="2">百分比</Option>
                    <Option value="3">千分比</Option>
                    <Option value="4">比列</Option>
                    <Option value="5">布尔</Option>
                  </Select>
                </FormItem>
                <FormItem label="计算方式" prop="calculateMode">
                  <Select :disabled="updatedataModal" v-model="targetForm.calculateMode" placeholder="请选择计算方式">
                    <Option value="0">累加</Option>
                    <Option value="1">求平均</Option>
                    <Option value="2">其他</Option>
                  </Select>
                </FormItem>
                <FormItem label="数据单位">
                  <Input :disabled="updatedataModal" v-model="targetForm.dataUnit" placeholder/>
                </FormItem>
                <FormItem label="负责人" prop="directorVos">
                  <Button @click="openPrincipal" class="add-doc" ghost type="success" size="small"
                          icon="ios-add-circle-outline">
                    添加负责人
                  </Button>
                  <div class="personData">
                    <Tag
                      v-for="(item,index) in targetForm.directorVos"
                      :key="item.directorId"
                      :name="item.directorName"
                      closable
                      @on-close="handleClosePerson(item,index)"
                    >{{ item.directorName}}
                    </Tag>
                  </div>
                </FormItem>
                <FormItem label="预警策略">
                  <Select
                    v-model="targetForm.warnStrategy"
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
                <Principal ref="principal" :PrincipalData="PrincipalData" @closePrincipal="closePrincipal"></Principal>
              </Col>
              <Col span="12" style="padding-left: 30px">
                <FormItem label="指标名称" prop="targetName">
                  <Input :disabled="spiralModal" v-model="targetForm.targetName" placeholder/>
                </FormItem>
                <FormItem label="结束时间" prop="endTime">
                  <DatePicker
                    @on-change="changeDateend"
                    v-model="targetForm.endTime"
                    :options="pickerOptions"
                    style="width: 100%"
                    type="date"
                    placeholder
                  ></DatePicker>
                </FormItem>
                <!--<FormItem label="所属部门" prop="deptName">-->
                <!--<Input :disabled="updatedataModal" @on-focus="showDepFocus" placeholder="选择所属部门" v-model="targetForm.deptName"/>-->
                <!--</FormItem>-->
                <FormItem label="汇总方式" prop="summaryMode">
                  <Select :disabled="updatedataModal" v-model="targetForm.summaryMode" placeholder="请选择类型">
                    <Option value="0">自动</Option>
                    <Option value="1">其他</Option>
                  </Select>
                </FormItem>
                <FormItem label="检索标识" prop="identName">
                  <Input :disabled="updatedataModal" v-model="targetForm.identName" placeholder="请输入标识"></Input>
                </FormItem>
                <BasicData ref="basicdata" :basicData="basicData" @closeBasicData="closeBasicData"></BasicData>
                <FormItem label="指标权重">
                  <InputNumber style="width: 100%" v-model="targetForm.weight" :min="0" :max="100"/>
                </FormItem>
                <FormItem label="质控状态">
                  <i-switch
                    v-model="targetForm.enableFlag"
                    :disabled="updateModal"
                    size="large"
                    trueValue="0"
                    falseValue="1"
                  >
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </i-switch>
                </FormItem>
                <FormItem label="当前值">
                  <Row v-if="targetForm.dataType != '5'">
                    <Col :span="12">
                      <Input
                        v-model="targetForm.disValue"
                        disabled
                        placeholder
                      />
                    </Col>
                  </Row>
                  <Row v-else>
                    <Select disabled v-model="targetForm.disValue" placeholder="">
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  </Row>
                </FormItem>
                <FormItem label="预警值" prop="warnValue">
                  <Row v-if="targetForm.dataType != '5'">
                    <Col :span="12">
                      <Input
                        v-model="targetForm.warnValue"
                        placeholder
                      />
                    </Col>
                    <Col :span="12">
                      <Input v-model="fullwarnValue" disabled placeholder/>
                    </Col>
                  </Row>
                  <Row v-else>
                    <Select v-model="targetForm.warnValue" placeholder="请选择预警值">
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  </Row>
                </FormItem>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span="12">
              <Divider orientation="left">目标</Divider>
              <div class="fileBox">
                <Row>
                  <Col>
                    <FormItem label="目标策略">
                      <Select
                        v-model="targetForm.targetStrategy"
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
                      <Row v-if="targetForm.dataType != '5'">
                        <Col :span="12">
                          <Input
                            v-model="targetForm.targetValue"
                            placeholder
                          />
                        </Col>
                        <Col :span="12">
                          <Input v-model="fulltargetValue" disabled placeholder/>
                        </Col>
                      </Row>
                      <Row v-if="targetForm.dataType == '5'">
                        <Select v-model="targetForm.targetValue" placeholder="请选择标准值">
                          <Option value="0">否</Option>
                          <Option value="1">是</Option>
                        </Select>
                      </Row>
                    </FormItem>
                    <FormItem label="目标权重">
                      <InputNumber style="width: 100%" v-model="targetForm.targetWeight" :min="0" :max="100"/>
                    </FormItem>
                    <FormItem label="支撑文件">
                      <!--目标文件 默认为1-->
                      <Button
                        @click="openAddFile(1)"
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
                          v-for="(item,index) in targetForm.targetFileVos"
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
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span="12">
              <Divider orientation="left">标准</Divider>
              <div class="fileBox">
                <Row>
                  <Col>
                    <FormItem label="标准策略">
                      <Select
                        v-model="targetForm.standardStrategy"
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
                      <Row v-if="targetForm.dataType != '5'">
                        <Col :span="12">
                          <Input
                            v-model="targetForm.standardValue"
                            placeholder
                          />
                        </Col>
                        <Col :span="12">
                          <Input v-model="fullstandardValue" disabled placeholder/>
                        </Col>
                      </Row>
                      <Row v-else>
                        <Select v-model="targetForm.standardValue" placeholder="请选择标准值">
                          <Option value="0">否</Option>
                          <Option value="1">是</Option>
                        </Select>
                      </Row>
                    </FormItem>
                    <FormItem label="标准权重">
                      <InputNumber style="width: 100%" v-model="targetForm.standardWeight" :min="0" :max="100"/>
                    </FormItem>
                    <FormItem label="支撑文件">
                      <!--标准文件 默认为2-->
                      <Button
                        @click="openAddFile(2)"
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
                          v-for="(item,index) in targetForm.standardFileVos"
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
                              @click="deleteStandardFile(item,index)"
                              type="md-close"
                            />
                          </div>
                        </div>
                      </div>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Divider orientation="left">其他</Divider>
          <div class="fileBox">
            <Row>
              <Col>
                <FormItem label="备注说明" prop="remark">
                  <Input v-model="targetForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder/>
                </FormItem>
              </Col>
            </Row>
          </div>
          <AddFileModal :addFileState="addFileState" ref="addFile" @closeMains="closeMains"></AddFileModal>
        </Form>
      </div>
      <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
      <div class="theme" slot="footer" style="text-align: center">
        <Button class="newBtn" :disabled="subState" type="primary" size="large" @click="handleSubmit('targetForm')">保存</Button>
        <Button type="warning" size="large" @click="handleReset('targetForm')">重置</Button>
        <!-- <Button type="primary" size="large" @click="closeModal">关闭</Button> -->
      </div>
    </Modal>
    <!--部门树形弹框-->
    <Modal v-model="depModel" class-name="depModal" width="30">
      <p slot="header">
        <span>请选择部门</span>
      </p>
      <div class="userTree">
        <!--<Input v-model="searchDeptTree"  placeholder="请输入需要搜索的内容" style="width: 100%" />
        <Tree :baseData="deptData" @fSelectTreeData="setDept" :showBox="false"></Tree>-->
        <el-input placeholder="输入关键字进行过滤" v-model="searchDeptTree"></el-input>
        <el-tree
          class="filter-tree"
          :data="deptData"
          :props="defaultProps"
          :filter-node-method="filterNode1"
          :default-expanded-keys="[1]"
          node-key="id"
          @node-click="handleNodeClick"
          ref="deptTree"
        ></el-tree>
      </div>
      <div slot="footer" class="basisFooter">
        <div class="btn">
          <Button  type="primary" @click="depModel = false">确定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Principal from "@/components/principal";
  import BasicData from "@/components/basicdata";
  import AddFileModal from "./addFile";
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
      normData: {
        type: Object,
        required: true
      }
    },
    components: {AddFileModal, Principal, BasicData, Preview},
    watch: {
      searchDeptTree(val) {
        this.$refs.deptTree.filter(val);
      },
      "targetForm.dataType"(newValue, oldValue) {
        if (newValue == 5) {
          this.targetForm.targetStrategy = 23;
          this.targetForm.standardStrategy = 23;
          this.targetForm.warnStrategy = 23;
        } else {
          this.targetForm.targetStrategy = 24;
          this.targetForm.standardStrategy = 24;
          this.targetForm.warnStrategy = 22;
        }
      },
      "targetForm.summaryMode"(newValue, oldValue) {

      },
      "targetForm.dataName"(newValue, oldValue) {

      }

    },
    data() {
      return {
        subState:false,
        newState: false,
        btnState: false,
        options4: [],
        value9: [],
        list: [],
        loading: false,
        defaultProps: {
          children: "children",
          label: "name"
        },
        searchDeptTree: "", // 部门搜索框绑定值
        depModel: false,
        deptData: [],
        isOpen: true,
        previews: {
          name: "",
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
        updatedataModal: false,
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
          dataId: "",
          targetFiles: [],
          standardFiles: [],
          directors: []
        },
        operator: [
          {label: 21, value: ">"},
          {label: 22, value: "<"},
          {label: 23, value: "="},
          {label: 24, value: "≥"},
          {label: 25, value: "≤"}
          // {label: 26, value: "无"}
        ], //策略的运算符
        targetForm: {
          calculateMode: "0",
          dataId: "",
          //表单里面的数据
          dataUnit: "",
          identName: "",
          summaryMode: '',
          dataType: null,
          pointName: "",
          startTime: "",
          dataName: "",
          deptName: "全校",
          deptId: 1,
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
        ruleValidate: {
          directorVos: [
            {
              required: true,
              type: "array",
              message: "请选择负责人",
              trigger: "change"
            }
          ],
          calculateMode: [
            {
              required: true,
              message: "不能为空",
              trigger: "change"
            },
          ],
          summaryMode: [
            {
              required: true,
              message: "方式不能为空",
              trigger: "change"
            },
          ],
          deptName: [
            {
              required: true,
              message: "部门不能为空",
              trigger: "change"
            },
          ],
          targetName: [
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
          dataType: [
            {
              required: true,
              message: "请选择数据类型",
              trigger: "change"
            }
          ],
          dataName: [
            {
              required: true,
              message: "请选择关联数据",
              trigger: "change"
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
              pattern: /^([+-]?)\d*\.?\d+$/,
              message: "请输入数字！",
              trigger: "blur"
            },
            {
              type: "string",
              max: 20,
              message: "目标值不能大于20字符",
              trigger: "blur"
            }
          ],
          standardStrategy: [
            {
              required: true,
              message: "请选择标准策略",
              trigger: "change"
            }
          ],
          standardValue: [
            {
              required: true,
              message: "标准值不能为空",
              trigger: "blur"
            },
            {
              pattern: /^([+-]?)\d*\.?\d+$/,
              message: "请输入数字！",
              trigger: "blur"
            },
            {
              type: "string",
              max: 20,
              message: "标准值不能大于20字符",
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
              pattern: /^([+-]?)\d*\.?\d+$/,
              message: "请输入数字！",
              trigger: "blur"
            },
            {
              type: "string",
              max: 20,
              message: "预警值不能大于20字符",
              trigger: "blur"
            }
          ],

        }
      };
    },
    mounted() {
    },
    computed: {
      fulltargetValue: function () {
        //根据不同的数据类型展示不同类型的值
        if (this.targetForm.dataType == "0") {
          //整数
          return Math.round(this.targetForm.targetValue);
        } else if (this.targetForm.dataType == "1") {
          //小数
          return parseFloat(this.targetForm.targetValue).toFixed(2);
        } else if (this.targetForm.dataType == "2") {
          //百分比
          // console.log
          return this.targetForm.targetValue + "%";
        } else if (this.targetForm.dataType == "3") {
          //千分比
          return this.targetForm.targetValue + "‰";
        } else if (this.targetForm.dataType == "4") {
          //比例
          return this.targetForm.targetValue + " ：1";
        } else {
          return this.targetForm.targetValue;
        }
      },
      fullstandardValue: function () {
        //根据不同的数据类型展示不同类型的值
        if (this.targetForm.dataType == "0") {
          //整数
          return Math.round(this.targetForm.standardValue);
        } else if (this.targetForm.dataType == "1") {
          //小数
          return parseFloat(this.targetForm.standardValue).toFixed(2);
        } else if (this.targetForm.dataType == "2") {
          //百分比
          return this.targetForm.standardValue + "%";
        } else if (this.targetForm.dataType == "3") {
          //千分比
          return this.targetForm.standardValue + "‰";
        } else if (this.targetForm.dataType == "4") {
          //比例
          return this.targetForm.standardValue + " ：1";
        } else {
          return this.targetForm.standardValue;
        }
      },

      fullwarnValue: function () {
        //根据不同的数据类型展示不同类型的值
        if (this.targetForm.dataType == "0") {
          //整数
          return Math.round(this.targetForm.warnValue);
        } else if (this.targetForm.dataType == "1") {
          //小数
          return parseFloat(this.targetForm.warnValue).toFixed(2);
        } else if (this.targetForm.dataType == "2") {
          //百分比
          return this.targetForm.warnValue + "%";
        } else if (this.targetForm.dataType == "3") {
          //千分比
          // return (this.targetForm.warnValue/1000).toFixed(2) + "‰";
          return this.targetForm.warnValue + "‰";
        } else if (this.targetForm.dataType == "4") {
          //比例
          return this.targetForm.warnValue + " ：1";
        } else {
          return this.targetForm.warnValue;
        }
      }
    },
    filters: {},
    methods: {
      //时间选择判断
      changeDatestart(val, data) {
        if (this.targetForm.endTime) {
          if (this.targetForm.startTime.valueOf() > this.targetForm.endTime.valueOf()) {
            this.$Message.warning("开始时间不能晚于结束时间");
            this.targetForm.startTime = '';
            return;
          }
        }
      },
      changeDateend(val, data) {
        if (this.targetForm.startTime) {
          if (this.targetForm.startTime.valueOf() > this.targetForm.endTime.valueOf()) {
            this.$Message.warning("结束时间不能早于开始时间");
            this.targetForm.endTime = '';
            return;
          }
        }
      },
      seClickDiv(name) {
        this.remoteMethod(name);
      },
      inClickDiv() {
        this.newState = true;
      },
      onClickDiv() {
        if (this.options4.length > 0) {
          for (let i = 0; i < this.options4.length; i++) {
            if (this.targetForm.dataName == this.options4[i].dataName) {
              this.targetForm.dataName = this.options4[i].dataName;
              this.targetForm.dataId = this.options4[i].dataId;
              this.updatedataModal = true;
              this.targetForm.dataUnit = name.dataUnit;
              this.targetForm.deptId = 1;
              this.targetForm.deptName = "全校";
              this.targetForm.dataType = this.options4[i].dataType.toString();
              this.targetForm.identName = this.options4[i].identName;
              // this.$set(this.targetForm, 'summaryMode', this.options4[i].summaryMode.toString());
              // console.log(this.targetForm.summaryMode)
              this.targetForm.summaryMode = this.options4[i].summaryMode.toString();
              if (this.options4[i].calculateMode != null) {
                this.targetForm.calculateMode = this.options4[i].calculateMode.toString();
              } else {
                this.targetForm.calculateMode = '0'
              }
            }
          }
        }
        setTimeout(() => {
          this.newState = false
        }, 200);


        // this.remoteMethod(this.targetForm.dataName);
        // console.log(this.targetForm.dataName);
      },
      //搜索数据搜索框
      searchData() {
        this.options4 = [];
        let params = {
          parentId: this.basicData.parentId,
          identId: this.basicData.identId,
          dataName: this.targetForm.dataName, // 名称
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
            this.remoteMethod(this.targetForm.dataName);
            this.$Message.success("请选择数据关联")
          } else {
            this.$Message.error("暂无数据,请新增");
            this.updatedataModal = false;
            this.targetForm.dataUnit = "";
            this.targetForm.summaryMode = "0";
            this.targetForm.calculateMode = '0';
            this.targetForm.dataType = '';
            this.targetForm.identName = ""
          }
        });
      },

      getDatadetail(id, name) {
        let params = {
          parentId: this.basicData.parentId,
          identId: this.basicData.identId,
          dataName: name, // 名称
          dataId: id
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
          if (response.data.data.records.length > 0) {
            this.options4 = response.data.data.records;
            this.targetForm.deptId = 1;
            this.targetForm.deptName = "全校";
            this.targetForm.dataUnit = response.data.data.records[0].dataUnit;
            this.targetForm.identName = response.data.data.records[0].identName;
            this.targetForm.summaryMode = response.data.data.records[0].summaryMode.toString();
            if (response.data.data.records[0].calculateMode != null) {
              this.targetForm.calculateMode = response.data.data.records[0].calculateMode.toString();
            } else {
              this.targetForm.calculateMode = '0'
            }
          }
        });
      },
      changeData(name) {
        setTimeout(() => {
          // console.log(name)
          this.updatedataModal = false;
          if (this.options4.length > 0) {
            for (let i = 0; i < this.options4.length; i++) {
              if (name.dataName != '' || name.dataName != null) {
                // console.log(this.options4[i])
                this.updatedataModal = true;
                this.targetForm.dataUnit = name.dataUnit;
                this.targetForm.deptId = 1;
                this.targetForm.deptName = "全校";
                this.targetForm.dataType = name.dataType.toString();
                this.targetForm.identName = name.identName;
                // this.$set(this.targetForm, 'summaryMode', this.options4[i].summaryMode.toString());
                // console.log(this.targetForm.summaryMode)
                this.targetForm.summaryMode = name.summaryMode.toString();
                if (name.calculateMode != null) {
                  this.targetForm.calculateMode = name.calculateMode.toString();
                } else {
                  this.targetForm.calculateMode = '0'
                }
                this.targetForm.dataName = name.dataName;
                this.targetData.dataId = name.dataId;
                this.newState = false;
              } else {
                this.targetData.dataId = ''
              }
            }
          }
        }, 100)
      },
      remoteMethod(query) {
        this.targetForm.dataUnit = "";
        this.targetForm.identName = "";
        // this.$set(this.targetForm, 'summaryMode', this.options4[i].summaryMode.toString());
        // console.log(this.targetForm.summaryMode)
        this.targetForm.dataType = "0";
        this.targetForm.summaryMode = "0";
        this.targetForm.calculateMode = '0';
        this.options4 = [];
        this.updatedataModal = false;
        this.newState = true;
        if (query !== '') {
          setTimeout(() => {
            let params = {
              parentId: this.basicData.parentId,
              identId: this.basicData.identId,
              dataName: query, // 名称
            };
            fetchValueLists(
              Object.assign(
                {
                  current: 1,
                  size: 20
                },
                params
              )
            ).then(response => {
              if (response.data.data.records.length > 0) {
                this.options4 = response.data.data.records;
              } else {
                // this.$Message.error("暂无数据")
                this.targetForm.dataName = query;
              }
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      },
      //点击部门
      handleNodeClick(data) {
        this.depModel = false;
        this.targetForm.deptName = data.name;
        this.targetForm.deptId = data.id;
      },
      filterNode1(value, data) {
        // console.log(data);
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //打开部门
      showDepFocus() {
        this.deptData = store.state.chooseDept;
        this.depModel = true;
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
          case 5:
            this.targetForm.dataType = 5; //"比例";
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
        this.isOpen = true;
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
        this.isOpen = false;
        // console.log("打开");
        this.basicData.state = true;
        this.$refs.basicdata.loadingData();
      },
      //关闭添加负责人
      closePrincipal(data) {
        this.isOpen = true;
        this.PrincipalData.state = false;
        if (data && data.length > 0) {
          data.forEach(o => {
            this.targetForm.directorVos.push({
              directorId: o.userId,
              directorName: o.name
            });
          });
        }
        let obj = {};
        this.targetForm.directorVos = this.targetForm.directorVos.reduce(function (item, next) {
          obj[next.directorId] ? '' : obj[next.directorId] = true && item.push(next);
          return item;
        }, []);
      },
      //打开添加负责人
      openPrincipal() {
        this.PrincipalData.state = true;
        this.isOpen = false;
        this.$refs.principal.loadData();
        //this.$refs.principal.getBaseData(); //子组件请求部门tree
        //this.$refs.principal.getBaseData2(); //子组件请求校色列表
      },
      //删除负责人
      handleClosePerson(item, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除该负责人？</p>',
          onOk: () => {
            this.targetForm.directorVos.splice(index, 1);
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
            that.subState=true;
            // 这里写接口添加或修改
            if (that.targetForm.startTime.valueOf() > that.targetForm.endTime.valueOf()) {
              that.$Message.warning("开始时间不能晚于结束时间");
              return;
            }
            //根据数据类型计算
            let targetValueCount, warnStrategyCount, standardValueCount;
            if (that.targetForm.dataType == '2') {
              targetValueCount = (that.targetForm.targetValue / 100).toFixed(2);
              standardValueCount = (that.targetForm.standardValue / 100).toFixed(2);
              warnStrategyCount = (that.targetForm.warnValue / 100).toFixed(2);
            } else if (that.targetForm.dataType == '3') {
              targetValueCount = (that.targetForm.targetValue / 1000).toFixed(3);
              standardValueCount = (that.targetForm.standardValue / 1000).toFixed(3);
              warnStrategyCount = (that.targetForm.warnValue / 1000).toFixed(3);
            } else {
              targetValueCount = that.targetForm.targetValue;
              standardValueCount = that.targetForm.standardValue;
              warnStrategyCount = that.targetForm.warnValue;
            }

            let formData = {
              dataName: that.targetForm.dataName,
              targetName: that.targetForm.targetName,
              weight: that.targetForm.weight,
              remark: that.targetForm.remark,
              targetStrategy: that.targetForm.targetStrategy,
              targetValue: targetValueCount, //
              targetWeight: that.targetForm.targetWeight,
              standardStrategy: that.targetForm.standardStrategy,
              standardValue: standardValueCount,
              standardWeight: that.targetForm.standardWeight,
              warnStrategy: that.targetForm.warnStrategy,
              warnValue: warnStrategyCount,
              enableFlag: that.targetForm.enableFlag,
              startTime: df.dateFormat(that.targetForm.startTime).substr(0, 10),
              endTime: df.dateFormat(that.targetForm.endTime).substr(0, 10)
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
            let params = {
              deptName: that.targetForm.deptName, // 部门N
              deptId: that.targetForm.deptId, // 部门N
              dataName: that.targetForm.dataName, // 名称-
              dataType: that.targetForm.dataType, // 类型-
              dataUnit: that.targetForm.dataUnit, // 单位-
              enableFlag: 0,
              layType: that.normData.hieId,
              parentId: that.basicData.parentId,
              identId: that.basicData.identId,
              identName: that.targetForm.identName, // 标识-
              dataEg: '',// 示例-
              summaryMode: that.targetForm.summaryMode,  //默认自动汇总
              calculateMode: that.targetForm.calculateMode  //默认自动汇总
            };
            if (that.targetData.dataId != '' || that.targetData.dataId != 0) {
              // debugger
              if (that.updateModal) {
                that.$Put("/admin/target", param, function (data) {
                  that.$Message.success("修改成功");
                  that.subState=false;
                  that.$emit("closeNormModal", {
                    state: false,
                    reload: true
                  });
                  that.options4 = [];
                });
              } else if (that.spiralModal) {
                that.$Put("/admin/target/spiral", param, function (data) {
                  that.$Message.success("诊改成功");
                  that.subState=false;
                  that.$emit("closeNormModal", {
                    state: false,
                    reload: true
                  });
                  that.options4 = [];
                });
              } else {
                // that.targetData.dataId = data.data.data;
                param = Object.assign(formData, that.targetData);
                that.$Post("/admin/target", param, function (data) {
                  that.$Message.success("添加成功");
                  that.subState=false;
                  that.$emit("closeNormModal", {
                    state: false,
                    reload: true
                  });
                  that.options4 = [];
                });
              }
            } else {
              addObj(params).then(data => {
                if (data.data.code == 0) {
                  if (that.updateModal) {
                    that.$Put("/admin/target", param, function (data) {
                      that.$Message.success("修改成功");
                      that.subState=false;
                      that.$emit("closeNormModal", {
                        state: false,
                        reload: true
                      });
                      that.options4 = [];
                    });
                  } else if (that.spiralModal) {
                    that.$Put("/admin/target/spiral", param, function (data) {
                      that.$Message.success("诊改成功");
                      that.subState=false;
                      that.$emit("closeNormModal", {
                        state: false,
                        reload: true
                      });
                      that.options4 = [];
                    });
                  } else {
                    that.targetData.dataId = data.data.data;

                    param = Object.assign(formData, that.targetData);
                    that.$Post("/admin/target", param, function (data) {
                      that.$Message.success("添加成功");
                      that.subState=false;
                      that.$emit("closeNormModal", {
                        state: false,
                        reload: true
                      });
                      that.options4 = [];
                    });
                  }
                } else {
                  that.$Message.error('保存失败，失败原因：' + data.data.msg);
                  that.subState=false;
                }
              });
            }
          }
          that.targetData.dataId = "";
        });
      },
      //保存指标
      subTarget(param) {
        let that = this;

      },
      // 重置
      handleReset(name) {
        this.subState=false;
        this.$refs[name].resetFields();
        if (this.updateModal || this.spiralModal) {
          this.getTargetForm();
        } else {
          this.targetForm = {
            calculateMode: '',
            disValue: "",
            dataUnit: "",
            identName: "",
            summaryMode: '',
            deptId: 1,
            deptName: "全校",
            dataType: "",
            dataId: "",
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
        this.isOpen = true;
        this.addFileState.state = val;
        let that = this;
        if (!val) {
          if (sence == 1) {
            if (data.length > 0) {
              data.forEach(e => {
                that.targetForm.targetFileVos.push(e);
              });
            }
            let obj = {};
            that.targetForm.targetFileVos = that.targetForm.targetFileVos.reduce(function (item, next) {
              obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
              return item;
            }, []);
          }
          if (sence == 2) {
            if (data.length > 0) {
              data.forEach(e => {
                that.targetForm.standardFileVos.push(e);
              });
            }
            let obj = {};
            that.targetForm.standardFileVos = that.targetForm.standardFileVos.reduce(function (item, next) {
              obj[next.fileId] ? '' : obj[next.fileId] = true && item.push(next);
              return item;
            }, []);
          }
        }
      },
      // 打开添加文件框
      openAddFile(scene) {
        this.isOpen = false;
        this.addFileState.data = scene; //传是哪个场景下的id
        this.addFileState.state = true;
        this.$refs.addFile.loadData();
      },
      deleteTargetFile(row, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认该操作？</p>',
          onOk: () => {
            this.targetForm.targetFileVos.splice(index, 1);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      // 删除文件
      deleteStandardFile(row, index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认该操作？</p>',
          onOk: () => {
            this.targetForm.standardFileVos.splice(index, 1);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      // 查询该id下的文件
      getNormList() {
        this.targetData.dataId = "";
        this.targetData.targetId = "";
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
        this.updatedataModal = false;
        this.spiralModal = false;
        let keysLength = Object.keys(this.normData.data).length;
        if (keysLength === 4) {
          //新增
          this.title = "新增指标";
        } else if (keysLength === 6) {
          //诊改
          this.title = "诊改指标";
          this.spiralModal = true;
          this.updatedataModal = true;
          this.targetData.targetId = this.normData.data.targetId;
          this.targetData.dataId = this.normData.data.dataId;
        } else {
          //编辑
          this.title = "编辑指标";
          this.updateModal = true;
          this.updatedataModal = true;
          this.targetData.targetId = this.normData.data.targetId;
          this.targetData.dataId = this.normData.data.dataId;
          //这里根据当前点击id请求对应的数据,
        }
        this.handleReset("targetForm");
      },
      //获取指标数据
      getTargetForm() {
        this.subState=false;
        let that = this;
        that.$Get("/admin/target/" + that.targetData.targetId, {}, function (
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
          that.targetForm = {
            disValue: data.data.disValue,
            dataUnit: "",
            identName: "",
            summaryMode: '',
            deptId: 1,
            deptName: "全校",
            dataType: data.data.dataType.toString(),
            //表单的数据
            startTime: data.data.startTime,
            dataName: data.data.dataName,
            dataId: data.data.dataId,
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
          that.getDatadetail(data.data.dataId, data.data.dataName);
          that.targetData.dataId = data.data.dataId;
          that.changeVlue(that.targetForm.dataType);
        });
      },
      //返回的值回显成要求的格式
      changeVlue(val) {
        let keysLength = Object.keys(this.normData.data).length;
        if (keysLength == 4) {
          //新增
        } else {
          //编辑
          if (val == '2') {
            this.targetForm.targetValue = (this.targetForm.targetValue * 100).toFixed(2);
            this.targetForm.standardValue = (this.targetForm.standardValue * 100).toFixed(2);
            this.targetForm.warnValue = (this.targetForm.warnValue * 100).toFixed(2);
          } else if (val == '3') {
            // console.log("千分比");
            this.targetForm.targetValue = (this.targetForm.targetValue * 1000).toFixed(2);
            this.targetForm.standardValue = (this.targetForm.standardValue * 1000).toFixed(2);
            this.targetForm.warnValue = (this.targetForm.warnValue * 1000).toFixed(2);
          }
        }

      },
      //关闭添加文件
      closeModal() {
        this.options4 = [];
        this.$emit("closeNormModal", {state: false, reload: false});
        this.normData.state = false;
        this.targetForm.dataId = "";
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url("./normModal.less");
  @import url("../../../assets/css/theme");
  @import url("../../../assets/css/color");
  .ivu-poptip-rel {
    display: block;
  }

  .ivu-poptip {
    display: block;
  }

  .contents {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    min-height: 55px;
    max-height: 200px;
    padding: 0 10px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;
    -o-box-shadow: 0 1px 6px rgba(0, 0, 0, .3), 0 0 40px rgb(255, 255, 255) inset;

    .items {
      width: 100%;
      overflow: hidden;
      /*overflow-x: auto;*/
      margin: 3px 0;
      height: 30px;
      line-height: 30px;
    }

    .items:hover {
      background: #f3f3f3;
      cursor: pointer;
    }
  }
</style>
