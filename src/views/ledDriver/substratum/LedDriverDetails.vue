<template>
    <div id="flowPage" ref="flowPage">
        <div class="taskSummaryBreadcrumb">
            <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
                <!--<i class="el-icon-location" style="float: left;margin-right: 5px;"></i>-->
                <!--<el-breadcrumb-item>数据看板</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item v-show="breadShow">-->
                  <!--<span @click="goback"  style="cursor: pointer;color: #409EFF">趋势分析</span>-->
                <!--</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item  v-show="breadShow">诊改数据集</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item  v-show="!breadShow">五纵五横</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
            <!--<Button @click="goback" class="screen" type="text" icon="ios-undo">返回</Button>-->
          <Button type="primary" ghost @click="$router.go(-1)">返回上级</Button>
        </div>
        <div class="taskSummaryItem">
            <el-row>
                <el-col :span="5" id="reviseProcessTree">
                    <el-tabs v-model="activeName2" type="card">
                        <el-tab-pane label="诊改维度选择" name="first">
                            <div :style="taskHeight" class="flowTreeDiv">
                                <!--@blur="screenInput"-->
                              <!--<i class="el-icon-folder-opened"></i>-->
                              <!--<i class="el-icon-edit"></i>-->
                              <el-input
                                    v-model="screenTree"
                                    size="small"
                                    @keyup.native="searchHimTree($event)"
                                    placeholder="请输入关键字"
                                    suffix-icon="el-icon-search"
                                ></el-input>
                                <!--   树配置参数及方法说明
                                       defaultExpandIds:默认展开的节点的 key 的数组
                                       loadHierachyTreeData:加载请求的tree数据
                                       defaultProps:配置选项
                                       filterNode:筛选树
                                       handleNodeClick:点击tree节点
                                       accordion:对于同一级的节点，每次只能展开一个
                                       lazy:懒加载
                                -->
                                <el-tree
                                     id="taskTreeL"
                                    style="height:calc(100% - 40px)"
                                    :default-expanded-keys="defaultExpandIds"
                                    accordion
                                    :load="loadHierachyTreeData"
                                    lazy
                                    highlight-current
                                    :props="defaultProps"
                                    :filter-node-method="filterNode"
                                    node-key="id"
                                    @node-click="handleNodeClick"
                                    ref="tree"
                                >
                                   <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
                                     <!--<span>{{ node.label }}</span>-->
                                   <!--</span>-->
                                </el-tree>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="19" ref="NineHeight" id="rightHeight" style=" padding-top: 0;">
                    <div class="summaryEchart">
                        <el-tabs v-model="activeName" @tab-click="handleClicktable">
                            <el-tab-pane label="诊改指标" name="firsts">
                                <div class="M_search">
                                    <Row>
                                        <Col :span="8">
                                            指标名称：
                                            <Input
                                              clearable
                                              v-model="searchIndexForm.name"
                                              placeholder="请输入指标名称"
                                              style="width: 60%"
                                              @on-change="firstsClear"
                                            />
                                        </Col>
                                        <Col :span="8">
                                            组织机构：
                                            <Input
                                              clearable
                                                v-model="searchIndexForm.deptName"
                                                @on-focus="openDept('index')"
                                                @on-change="firstsClear('dept',searchIndexForm.deptName)"
                                              placeholder="请选择组织机构"
                                                style="width: 60%"
                                            />
                                        </Col>
                                        <Col :span="8">
                                        <!--<span style="letter-spacing: 4px">负责人：</span>-->
                                        负责人:
                                        <Input
                                          clearable
                                          v-model="searchIndexForm.userName"
                                          placeholder="请输入负责人"
                                          style="width: 60%"
                                          @on-change="firstsClear"
                                        />
                                      </Col>
                                    </Row>
                                    <Row style="margin-top: 10px;">
                                      <!--暂时关闭搜索-->
                                      <!--<Col :span="8">
                                        指标状态：
                                        <Select v-model="searchIndexForm.dataState" @on-change="firstsClear"
                                                clearable
                                                placeholder="请选择指标状态" style="width:60%">
                                          <Option v-for="item in indexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                      </Col>-->
                                      <Col :span="8">
                                        运行状态：
                                        <Select v-model="searchIndexForm.runState" placeholder="请选择运行状态"
                                                clearable @on-change="firstsClear" style="width:60%" >
                                          <Option value="0">未开始</Option>
                                          <Option value="1">运行中</Option>
                                          <Option value="2">已结束</Option>
                                        </Select>
                                      </Col>
                                      <Col :span="2">
                                        <Button
                                          @click="getIndexTableData"
                                          type="primary"
                                          icon="ios-search"
                                        >搜 索</Button>
                                      </Col>
                                      <Col :span="2">
                                        <Button icon="ios-trash" @click="emptyIndexTableBtn">清 空</Button>
                                      </Col>
                                    </Row>
                                </div>
                                <div :style="tableHeight">
                                    <el-table
                                      :data="indexTableData"
                                      stripe
                                      height="100%"
                                      :cell-style = "paddingMy"
                                      style="min-width: 100%; min-height: 100%"
                                    >
                                      <el-table-column
                                        width="80"
                                        align="center"
                                        prop="pointName"
                                        label=""
                                        show-overflow-tooltip
                                      >
                                        <template slot="header" slot-scope="scope">
                                          <span><Icon type="ios-eye-outline"  style="font-size:20px"/></span>
                                        </template>
                                        <template slot-scope="scope">
                                          <p @click="showNorm(scope.row)" style="cursor: pointer;color:#2d8cf0">
                                           查看
                                          </p>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        min-width="150"
                                        align="center"
                                        prop="pointName"
                                        label="指标"
                                        show-overflow-tooltip
                                      >
                                        <template slot-scope="scope">
                                            <span @click="clickRelevance(scope.row)" style="color:#2d8cf0;cursor: pointer">
                                              {{scope.row.targetName}}
                                            </span>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="deptName"
                                        label="部门"
                                        min-width="120"
                                      >
                                        <template slot-scope="scope">
                                          <div style="color:#2d8cf0;cursor: pointer">
                                            <p
                                              @click="clickName('dept',scope.row)"
                                            >{{scope.row.deptName}}</p>
                                          </div>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        label="指标状态"
                                        min-width="100"
                                      >
                                        <template slot-scope="scope">
                                          <div v-html="scope.row.cellHtml"></div>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="disTargetValue"
                                        label="目标值"
                                        min-width="100"
                                      >
                                        <template slot-scope="scope">
                                          <span>{{getStrategySymbol(scope.row.targetStrategy)}}{{scope.row.disTargetValue ? scope.row.disTargetValue:'-'}}</span>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="disStandardValue"
                                        label="标准值"
                                        min-width="100"
                                      >
                                        <template slot-scope="scope">
                                          <span>{{getStrategySymbol(scope.row.standardStrategy)}}{{scope.row.disStandardValue ? scope.row.disStandardValue:'-'}}</span>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="disValue"
                                        label="当前值"
                                        min-width="100"
                                      >
                                        <template slot-scope="scope">
                                          <span>{{scope.row.disValue ? scope.row.disValue:'-'}}</span>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="disWarnValue"
                                        label="预警值"
                                        min-width="100"
                                      >
                                        <template slot-scope="scope">
                                          <span>{{getStrategySymbol(scope.row.warnStrategy)}}{{scope.row.disWarnValue ? scope.row.disWarnValue:'-'}}</span>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="startTime"
                                        label="开始时间"
                                        min-width="120"
                                      ></el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="endTime"
                                        label="结束时间"
                                        min-width="120"
                                      ></el-table-column>
                                      <el-table-column align="center" label="负责人"  show-overflow-tooltip min-width="140">
                                        <template slot-scope="scope">
                                          <span
                                            @click="clickName('person',item)"
                                            v-for="(item,index) in scope.row.directors"
                                            :key="index"
                                            style="color:#2d8cf0;cursor: pointer;padding-right:5px"
                                            type="info"
                                          >
                                            {{item.directorName}}
                                            <i v-if="index!==scope.row.directors.length-1">,</i>
                                          </span>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="runState"
                                        label="运行状态"
                                        min-width="100"
                                      >
                                        <template slot-scope="scope">
                                          <div v-show="scope.row.runState=='0'" class="cellHtml"
                                               @click="clickName('runState',scope.row)" style="color:#ff7f13">
                                            <p>未开始</p>
                                          </div>
                                          <div v-show="scope.row.runState=='1'" class="cellHtml"
                                               @click="clickName('runState',scope.row)" style="color:#4ac056">
                                            <p>运行中</p>
                                          </div>
                                          <div v-show="scope.row.runState=='2'" class="cellHtml"
                                               @click="clickName('runState',scope.row)" style="color:#f04409">
                                            <p>已结束</p>
                                          </div>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        prop="taskCount"
                                        label="关联任务"
                                        min-width="90"
                                      >
                                        <template slot-scope="scope">
                                          <div @click="clickRelevance(scope.row)" style="cursor: pointer;color:#2d8cf0 ">
                                            <p>{{scope.row.taskCount}}</p>
                                          </div>
                                        </template>
                                      </el-table-column>
                                      <el-table-column
                                        align="center"
                                        label="操作"
                                        min-width="260"
                                      >
                                        <template slot-scope="scope">
                                          <div style="padding-left:10px;color:#2d8cf0;text-align:left">
                                            <el-button type="text" @click="collectClick(scope.row,'SC')">收藏</el-button>
                                            <el-button type="text" @click="collectClick(scope.row,'GZ')">关注</el-button>
                                            <el-button type="text" @click="collectClick(scope.row,'FX')">分享</el-button>
                                            <!--<span @click="showTrack(scope.row,'targetId')" style="cursor: pointer;margin-top: 5px"><Icon type="ios-navigate-outline" />诊改轨迹</span>-->
                                            <el-button type="text" @click="showTrack(scope.row,'targetId')" style="margin-top: 5px">指标诊断报告</el-button>
                                          </div>
                                        </template>
                                      </el-table-column>
                                    </el-table>
                                  </div>
                                <div class="M_search" style="text-align:right;padding: 5px 15px">
                                    <Page
                                        :total="indexPage.total"
                                        :showTotal="indexPage.showTotal"
                                        :current="indexPage.current"
                                        :page-size="indexPage.size"
                                        @on-change="changeindexPage"
                                    ></Page>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="诊改任务" name="second">
                                <div class="M_search">
                                    <Row>
                                      <Col :span="8">
                                          任务名称：
                                          <Input
                                              clearable
                                              v-model="searchTaskForm.taskName"
                                              placeholder="请输入指标名称"
                                              style="width: 60%"
                                              @on-change="taskClear"
                                          />
                                      </Col>
                                      <Col :span="8">
                                            组织机构：
                                            <Input
                                                clearable
                                                v-model="searchTaskForm.deptName"
                                                @on-focus="openDept('task')"
                                                @on-change="taskClear('dept',searchTaskForm.deptName)"                                                placeholder="请选择组织机构"
                                                style="width: 60%"
                                            />
                                        </Col>
                                      <Col :span="8">
                                        <span style="letter-spacing: 4px">负责人：</span>
                                        <Input
                                          clearable
                                          v-model="searchTaskForm.userName"
                                          placeholder="请输入负责人"
                                          style="width: 60%"
                                          @on-change="taskClear('person',searchTaskForm.userName)"
                                        />
                                      </Col>

                                    </Row>
                                    <Row style="margin-top: 10px;">
                                      <!--暂关闭任务状态搜索，待向谷哥讨论展现方式-->
                                     <!-- <Col :span="7">
                                        任务状态：
                                        <Select v-model="searchTaskForm.dataState" @on-change="taskClear"
                                                clearable
                                                placeholder="请选择指标状态" style="width:60%">
                                          <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                      </Col>-->
                                      <Col :span="8">
                                      运行状态：
                                      <Select v-model="searchTaskForm.runState" placeholder="请选择运行状态"
                                              clearable @on-change="taskClear" style="width:60%" >
                                        <Option value="0">未开始</Option>
                                        <Option value="1">运行中</Option>
                                        <Option value="2">已结束</Option>
                                      </Select>
                                    </Col>
                                      <Col :span="8">
                                        所属指标：
                                        <Input
                                          clearable
                                          v-model="searchTaskForm.targetName"
                                          placeholder="请输入指标名称"
                                          style="width: 60%"
                                          @on-change="taskClear"
                                        />
                                      </Col>
                                      <Col :span="2">
                                        <Button
                                          @click="getTaskTableData"
                                          type="primary"
                                          icon="ios-search"
                                        >搜 索</Button>
                                      </Col>
                                      <Col :span="2">
                                        <Button icon="ios-trash" @click="emptyTaskTableBtn">清 空</Button>
                                      </Col>
                                      <Col :span="2" v-if="showBtn">
                                        <Button type="primary" ghost @click="returnSuperior">{{taskBtnUp}}</Button>
                                      </Col>

                                  </Row>
                                </div>
                                <div :style="tableHeight">
                                  <el-table
                                    :data="taskTableData"
                                    stripe
                                    height="100%"
                                    :cell-style = "paddingMy"
                                    style="min-width: 100%; min-height: 100%"
                                  >
                                    <el-table-column
                                      width="80"
                                      align="center"
                                      prop="pointName"
                                      show-overflow-tooltip
                                    >
                                      <template slot="header" slot-scope="scope">
                                        <span><Icon type="ios-eye-outline"  style="font-size:20px" /></span>
                                      </template>
                                      <template slot-scope="scope">
                                        <p @click="openTaskDetails(scope.row)" style="cursor: pointer;color:#2d8cf0">
                                          <!--<Icon type="ios-eye-outline" />--> 查看
                                        </p>
                                      </template>
                                    </el-table-column>
                                    <el-table-column  width="150" show-overflow-tooltip align="center" prop="taskName" label="任务">
                                      <template slot-scope="scope">
                                          <span @click="clickTaskUp(scope.row)" style="color:#2d8cf0;cursor: pointer">
                                            {{scope.row.taskName}}
                                          </span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="dept"
                                      label="部门"
                                      width="110"
                                    >
                                      <template slot-scope="scope">
                                        <div style="color:#2d8cf0;cursor: pointer">
                                          <p @click="clickTaskName('dept',scope.row)">
                                            {{scope.row.deptName}}
                                          </p>
                                        </div>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="disTargetValue"
                                      label="目标值"
                                      min-width="100"
                                    >
                                      <template slot-scope="scope">
                                        <span>{{getStrategySymbol(scope.row.targetStrategy)}}{{scope.row.disTargetValue ? scope.row.disTargetValue:'-'}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="disStandardValue"
                                      label="标准值"
                                      min-width="100"
                                    >
                                      <template slot-scope="scope">
                                        <span>{{getStrategySymbol(scope.row.standardStrategy)}}{{scope.row.disStandardValue ? scope.row.disStandardValue:'-'}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="disValue"
                                      label="当前值"
                                      min-width="100"
                                    >
                                      <template slot-scope="scope">
                                        <span>{{scope.row.disValue ? scope.row.disValue:'-'}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="disWarnValue"
                                      label="预警值"
                                      min-width="100"
                                    >
                                      <template slot-scope="scope">
                                        <span>{{getStrategySymbol(scope.row.warnStrategy)}}{{scope.row.disWarnValue ? scope.row.disWarnValue:'-'}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="startTime"
                                      label="开始时间"
                                      width="120"
                                    ></el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="endTime"
                                      label="结束时间"
                                      width="120"
                                    ></el-table-column>
                                    <el-table-column align="center" label="所属指标" min-width="150" show-overflow-tooltip >
                                      <template slot-scope="scope">
                                          <span @click="clickTaskName('indexName',scope.row)" style="color:#2d8cf0;cursor: pointer">
                                            {{scope.row.targetName}}
                                          </span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="负责人"  show-overflow-tooltip min-width="140">
                                      <template slot-scope="scope">
                                        <!--change2directors-->
                                              <span
                                                @click="clickTaskName('person', item)"
                                                v-for="(item,index) in scope.row.directors"
                                                :key="index"
                                                style="color:#2d8cf0;cursor: pointer;padding-right:5px"
                                                type="info"
                                              >
                                                {{item.directorName}}
                                                <i v-if="index!==scope.row.directors.length-1">,</i>
                                              </span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="runState"
                                      label="运行状态"
                                      min-width="100"
                                    >
                                      <template slot-scope="scope">

                                        <div v-show="scope.row.runState=='0'" class="cellHtml"
                                             @click="clickTaskName('runState',scope.row)" style="color:#ff7f13">
                                          <p>未开始</p>
                                        </div>
                                        <div v-show="scope.row.runState=='1'" class="cellHtml"
                                             @click="clickTaskName('runState',scope.row)" style="color:#4ac056">
                                          <p>运行中</p>
                                        </div>
                                        <div v-show="scope.row.runState=='2'" class="cellHtml"
                                             @click="clickTaskName('runState',scope.row)" style="color:#f04409">
                                          <p>已结束</p>
                                        </div>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      label="任务状态"
                                      min-width="100"
                                    >
                                      <template slot-scope="scope">
                                        <!--暂时关闭点击事件-->
                                       <!-- <div class="cellHtml"  @click="clickTaskName('index',scope.row)"
                                         v-html="scope.row.cellHtml"></div>-->
                                        <div v-html="scope.row.cellHtml"></div>
                                      </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="操作" min-width="100">
                                      <template slot-scope="scope">
                                        <div style="color:#2d8cf0;padding-right: 5px">
                                          <!--<p @click="openTaskDetails(scope.row)" style="cursor: pointer;margin-right: 20px">
                                            <Icon type="ios-eye-outline" /> 查看
                                          </p>-->
                                          <p @click="showNorm(scope.row)" style="cursor: pointer;">
                                            <Icon type="ios-eye-outline" /> 查看指标
                                          </p>
                                          <p @click="showTrack(scope.row,'taskId')" style="cursor: pointer;margin-top: 5px"><Icon type="ios-navigate-outline" />诊改轨迹</p>

                                        </div>
                                        <!--@click="showNorm(scope.row)"-->
                                        <!--searchTaskForm.targetName-->
                                      </template>
                                    </el-table-column>


                                  </el-table>
                                </div>
                                <div class="M_search" style="text-align:right;padding: 5px 15px">
                                    <Page
                                        :total="taskPage.total"
                                        :showTotal="taskPage.showTotal"
                                        :current="taskPage.current"
                                        :page-size="taskPage.size"
                                        @on-change="changetaskPage"
                                    ></Page>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--部门树形弹框-->
        <deptModal ref="changedept" :deptState="deptState" @closeDeptModal="closeDeptModal"></deptModal>
        <indicatorModal ref="indicatorModal" :normData="normData" @closeNormModal="closeNormModal"></indicatorModal>
        <taskdetailModal
            ref="assignModal"
            :assignmentData="assignmentData"
            @closeAssignmentModal="closeAssignmentModal"
        ></taskdetailModal>
        <TrackModal :trackState="trackState" @closeTrackModal="closeTrackModal"></TrackModal>
    </div>
</template>
<script>
import { DoubleStandard } from "../../doubleStrand/doubleStandard";
import store from "@/store";
import { NeizhenUtil } from "../../../util/datarouters";
import deptModal from "@/components/changeDept";
import indicatorModal from "./../../dataView/modal/indicatorModal";
import taskdetailModal from "./../../dataView/modal/taskdetailModal"; //引入支撑文件管理Modal
import TrackModal from "./../../dataView/modal/TrackModal.vue"; //引入支撑文件管理Modal
export default {
    name: "index",
    components: { deptModal, indicatorModal, taskdetailModal, TrackModal},
    data() {
        return {
            taskBtnUp: '',
            breadShow: true,
            superior: [],
            param2: {},
            param: {},
            showBtn: false,
            parentId: 0,
            paddingMy: {
              'padding':'5px 0'
            },
            treeId: null,
            tableHeight: null,
            doubleStandClass: null,
            selectTreeData: null,
            asyncSearchData: null,
            defaultExpandIds: [], //维度tree默认展开的节点的 key 的数组
            depttab: "", //判断是从哪一个tab点击的组织
            options: [
                {
                    value: "11",
                    label: "学校办学经费各来源经费占比"
                },
                {
                    value: "22",
                    label: "学校办学经费自筹经费占比"
                },
                {
                    value: "33",
                    label: "学校办学经费社会捐赠经费占比"
                },
                {
                    value: "44",
                    label: "学校办学经费国家拨款经费占比"
                },
                {
                    value: "55",
                    label: "学校办学经费各来源经费占比2"
                }
            ],
            deptState: {
                //机构弹框
                state: false,
                data: []
            },
            trackState:{
              state: false,
              dataMessage:{},// 诊改信息 top
              amend: {},// 修改记录 up
              period: {},  // 周期记录 centre
              relevance: {}, // 关联指标 bottom
              id: null,
              type: '',
            },
            searchIndexForm: {
                name: "",
                deptName: "",
                deptId: "",
                hieId: "",
                userName: "",
                dataState:'',
                runState: ''
            },
            indexList: [
            {
              value: '1',
              label: '已达标'
            },
            {
              value: '2',
              label: '未达标'
            },
            {
              value: '3',
              label: '逾期'
            },
            {
              value: '4',
              label: '预警'
            },
          ],
            searchTaskForm: {
                deptId: "",//
                deptName: "",//
                hieId: "",
                targetName: "",
                taskName: "",//
                userName: "",//
                userId: "",//
                keyWord: "",
                dataState:'',
                runState: ''
            },
            taskList: [
            {
              value: '1',
              label: '已达标'
            },
            {
              value: '2',
              label: '未达标'
            },
            {
              value: '3',
              label: '逾期'
            },
            {
              value: '4',
              label: '预警'
            },
          ],
            indexPage: {
                total: 0, //数据总数
                current: 1, // 当前页码
                size: 10, //每页条数
                showTotal: true
            },
            indexTableData: [],
            taskPage: {
                total: 0, //数据总数
                current: 1, // 当前页码
                size: 10, //每页条数
                showTotal: true
            },
            taskTableData: [],
            activeName: "firsts",
            taskHeight: "",
            activeName2: "first",
            screenTree: "", // 筛选树形
            treeData: [],
            flowChartData: {},
            normData: {
                id:"",
                //查看指标要传过去的数据
                data: {},
                state: false //modal层
            },
            assignmentData: {
          identId: null,//
          state: false, //分派状态
          data: [], //需传的数据
        },
            defaultProps: {
                children: "children",
                label: "title",
                isLeaf: "leaf"
            } // 维度树形
        };
    },
    created() {
      this.doubleStandClass = new DoubleStandard(this, store);
      if(this.$route.query.obj){
        let obj = this.$route.query.obj;
        if(obj){
          // this.breadShow = true
          let arrId = obj.arrId
          this.treeId = obj.id
          this.searchIndexForm.hieId = obj.id
          this.searchIndexForm.name = obj.name ? obj.name: ''
          this.searchIndexForm.deptName = obj.deptName ? obj.deptName: ''
          this.searchIndexForm.deptId = obj.deptId ?obj.deptId:''
          this.searchIndexForm.userName = obj.userName ? obj.userName: ''
          this.defaultExpandIds = [].concat(arrId)
        }else {
          // this.breadShow = false
          this.treeId =1
          this.searchIndexForm.hieId = 1
        }
      }else if(this.$route.query.id) {
        this.searchIndexForm.dataState = this.$route.query.id;
        // this.breadShow = false
        // this.$emit("activeNameL", this.$route.query.type);
        this.treeId =1;
        this.searchIndexForm.hieId = 1

      }
    },
    mounted() {
        //控制左边tree的高度
        this.$nextTick(() => {
            this.taskHeight =
                "height:" +
                (this.$refs.flowPage.clientHeight - 105 -18) +
                "px";

          this.tableHeight ="height:" +
            (this.$refs.flowPage.clientHeight - 244 - 18) +
            "px";
        });


    },
    watch: {
        screenTree(val) {
        this.$refs.tree.filter(val);
      },
    },
    methods: {
      // 收藏、关注、分享
      collectClick(row,o){
        let that = this
        let pathA = o ==='SC' ? '/admin/targetshare/collect/' : // 收藏
          o ==='GZ' ? '/admin/targetshare/follow/' : // 关注
            o ==='FX' ? '/admin/targetshare/share/' : '' // 分享
        that.$Put(pathA + row.targetId, {}, function(data) {
          if(data.code === 0){
            let massageA = o ==='SC' ? '收藏成功' : // 收藏
              o ==='GZ' ? '关注成功' : // 关注
                o ==='FX' ? '分享成功' : '' // 分享

            that.$Message.success(massageA);
          }
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
      },
      // 返回上级
      returnSuperior(){
        let lengthA = this.superior.length
        let param = this.superior[lengthA - 1]


        // 同步参数
        if(this.superior.length > 1){
          this.parentId = param.parentId,
            this.searchTaskForm.dataState = param.dataState,
            this.searchTaskForm.runState = param.runState,
            this.searchTaskForm.deptId = param.deptId,
            this.searchIndexForm.hieId = param.hieId,
            this.searchTaskForm.targetName = param.targetName,
            this.searchTaskForm.taskName = param.taskName,
            this.searchTaskForm.userName = param.userName,
            this.searchTaskForm.userId = param.userId,
            this.searchTaskForm.keyWord = param.keyWord,
            this.taskPage.size = param.size,
            this.taskPage.current = param.current,
            this.taskPage.total = param.total
          this.getTaskTableData()
        }else {
          this.activeName = 'firsts'
          this.getIndexTableData()
        }
        this.superior.splice(lengthA - 1,1)
        this.showBtn  = this.superior.length > 0 ? true : false
        this.taskBtnUp = this.superior.length == 1 ? '返回指标' :'返回上级'

      },
      // 点击任务名称穿clickTaskUp
      clickTaskUp(row){
        this.parentId = row.taskId
        this.superior.push(this.param2)
        this.taskBtnUp = '返回上级'
        this.showBtn = true
        this.getTaskTableData();

      },
      //   关闭诊改轨迹弹框
        closeTrackModal(val) {
          this.trackState.state = val;
        },
      // 点击诊改轨迹弹框
        showTrack(row,type){
          this.trackState.state = true;
          if(type === 'targetId'){
            this.trackState.id = row.targetId;
            this.trackState.type = type
          }else {
            this.trackState.id = row.taskId;
            this.trackState.type = type
          }
        },
      // 点击诊改指标-关联任务 -跳转到诊改任务
        clickRelevance(row){
          this.activeName = 'second'
          this.searchTaskForm.targetName = row.targetName
          this.superior.push(this.param)
          this.taskBtnUp = '返回指标'
          this.showBtn  = true
          this.getTaskTableData()
        },
      // 诊改指标名称筛选
        clickName(type,row){
          // if(type === 'name'){
          //   this.searchIndexForm.name = row.targetName
          // }else
            if(type === 'dept'){
            this.searchIndexForm.deptId = row.deptId;
            this.searchIndexForm.deptName = row.deptName;
          }else if(type ==='person'){
            this.searchIndexForm.userName = row.directorName;
          }else if(type ==='index'){
            this.searchIndexForm.dataState = row.dataState
          }else if(type ==='runState'){
            this.searchIndexForm.runState = row.runState
          }
          this.getIndexTableData()
        },
        // 诊改指标-----输入框--清除按钮
        firstsClear(type,name){
          if(type === 'dept'){
            this.searchIndexForm.deptId = '';
          }else if(type === 'clearState'){ // 指标状态
            this.searchIndexForm .dataState = ''
          }else if(type === 'clearRun'){
            this.searchIndexForm.runState = ''
          }

        this.getIndexTableData()
      },
        // 任务点击名称筛选
        clickTaskName(type,row){
          // if(type === 'name'){
          //   this.searchTaskForm.taskName = row.taskName
          // }else
            if(type === 'dept'){
            this.searchTaskForm.deptId = row.deptId;
            this.searchTaskForm.deptName = row.deptName;
          }else if(type ==='person'){
            this.searchTaskForm.userId = row.directorId;
            this.searchTaskForm.userName = row.directorName;
          }else if(type === 'indexName'){
            this.searchTaskForm.targetName = row.targetName
          }else if(type === 'runState'){
            this.searchTaskForm.runState = row.runState
          }else if(type === 'index'){
            this.searchTaskForm.dataState = row.dataState
          }
          this.getTaskTableData();
        },
       // 诊改任务 ---输入框--清除按钮
        taskClear(type,name){
          if(type === 'dept'&& name === '' ){
            this.searchTaskForm.deptId = '';
          }else if(type ==='person' && name === ''){
            this.searchTaskForm.userId = '';
          }else if(type === 'clearState'){
            this.searchTaskForm.dataState = ''
          }
        this.getTaskTableData();
      },
        emptyIndexTableBtn() {
            //清空指标
            this.searchIndexForm = {
                name: "",
                deptName: "",
                deptId: "",
                hieId: "",
                userName: "",
                condition: "",
                dataState: "",
                runState: "",
            };
            this.getIndexTableData();
        },
        emptyTaskTableBtn() {
            //清空任务
            this.searchTaskForm = {
                taskName: "",
                deptName: "",
                deptId: "",
                hieId: "",
                userName: "",
                userId: "",
                targetName: "",
                dataState:  "",
                runState: ""
            };
            this.getTaskTableData();
        },

        change2directors(row) {
            this.searchTaskForm.userId = row.directorId;
            this.searchTaskForm.userName = row.directorName;
            this.getTaskTableData();
        },
        //获取诊改指标
        getIndexTableData() {
            this.param = {
                dataState:this.searchIndexForm.dataState,
                runState: this.searchIndexForm.runState,
                deptId: this.searchIndexForm.deptId,
                hieId: this.searchIndexForm.hieId,
                targetName: this.searchIndexForm.name,
                userName: this.searchIndexForm.userName,
                size: this.indexPage.size,
                current: this.indexPage.current,
                total: this.indexPage.total,
            };
            this.$Get("/admin/target/current/page", this.param, res => {
                this.indexPage.current = res.data.current;
                this.indexPage.total = res.data.total;
                this.indexTableData = res.data.records;
                if(res.data.records.length){
                  res.data.records.forEach(function(item,index) {
                  if(item.runState == "0") {// 未开始
                    // item.cellState = '达标';
                    if(item.targetState == '1'){
                      item.dataState = '1'
                      item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                    }else{
                      item.dataState = '2'
                      item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                    }
                  }else if(item.runState == '1'){ // 运行中
                    if(item.warnState == '1'){
                      item.dataState = '4'
                      item.cellHtml = '<span style="color:#ff1c1e">预警</span>'
                    }else if(item.targetState == '0'){
                      item.dataState = '2'
                      item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                    }else if(item.targetState == '1'){
                      item.dataState = '1'
                      item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                    }
                  }else if(item.runState == '2'){ // 已结束
                    if(item.targetOvertime == '1'){
                      item.dataState = '3'
                      item.cellHtml = '<span  style="color: #ff7f13">逾期(未达标)</span>'
                    }else if(item.targetState == '1'){
                      item.dataState = '1'
                      item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                    }
                  }
                });
              }
            });
        },
        //获取诊改任务
        getTaskTableData(data) {
            this.param2 = {
                parentId: this.parentId,
                dataState:this.searchTaskForm.dataState,
                runState: this.searchTaskForm.runState,
                deptId: this.searchTaskForm.deptId,
                hieId: this.searchIndexForm.hieId,
                targetName: this.searchTaskForm.targetName,
                taskName: this.searchTaskForm.taskName,
                userName: this.searchTaskForm.userName,
                userId: this.searchTaskForm.userId,
                keyWord: this.searchTaskForm.keyWord,
                size: this.taskPage.size,
                current: this.taskPage.current,
                total: this.taskPage.total
            };
            this.$Get("/admin/task/current/page", this.param2, res => {
                this.taskPage.current = res.data.current;
                this.taskPage.total = res.data.total;
                this.taskTableData = res.data.records;
                if(res.data.records.length){
                  res.data.records.forEach(function(item,index) {
                    if(item.runState == "0") {// 未开始
                      // item.cellState = '达标';
                      if(item.targetState == '1'){
                        item.dataState = '1'
                        item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                      }else{
                        item.dataState = '2'
                        item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                      }
                    }else if(item.runState == '1'){ // 运行中
                      if(item.warnState == '1'){
                        item.dataState = '4'
                        item.cellHtml = '<span style="color:#ff1c1e">预警</span>'
                      }else if(item.targetState == 0){
                        item.dataState = '2'
                        item.cellHtml = '<span style="color:#ff7f13">未达标</span>'
                      }else if(item.targetState == 1){
                        item.dataState = '1'
                        item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                      }
                    }else if(item.runState == '2'){ // 已结束
                      if(item.targetOvertime == '1'){
                        item.dataState = '3'
                        item.cellHtml = '<span  style="color: #ff7f13">逾期(未达标)</span>'
                      }else if(item.targetState == '1'){
                        item.dataState = '1'
                        item.cellHtml = '<span style="color:#4ac056">已达标</span>'
                      }
                    }
                  });
              }
            });
        },
        //tree加载数据
        loadHierachyTreeData(node, resolve) {
            var searchNodeData = function(searchdata, id, resovle) {
                searchdata.forEach(e => {
                    if (e.id == id) {
                        var children = e.children;
                        resolve(children);
                    }
                    if (!e.isLeaf) {
                        searchNodeData(e.children, id, resolve);
                    }
                });
            };
            if (node.level === 0) {
                if (this.asyncSearchData != null) {
                    resolve(this.asyncSearchData);
                } else {
                    this.doubleStandClass.asyncLoadTree(0, resolve);
                }
            }
            if (node.level >= 1) {
                if (this.asyncSearchData != null) {
                    searchNodeData(this.asyncSearchData, node.data.id, resolve);
                } else {
                    this.doubleStandClass.asyncLoadTree(node.data.id, resolve);
                }
            }

          if(node.data){
            let index = this.defaultExpandIds.length - 1
            if(node.data.id === this.defaultExpandIds[index]){
              this.getIndexTableData()
            }
            setTimeout(()=>{
              this.$refs.tree.setCurrentKey(this.treeId);
            },1000)
          }
        },
        //关闭任务明细
        closeAssignmentModal(obj) {
             this.assignmentData.state = obj.state;
        },
        //打开任务明细
        openTaskDetails(row) {
        this.assignmentData.identId = row.identId;
        //this.assignmentData.identId = 1//id传过去
        let that = this;
        that.$Get("/admin/task/" + row.taskId, {}, function (data) {
          that.assignmentData.state = true;
          that.assignmentData.data = data.data;
          that.$refs.assignModal.getAllocateTasks();
        });
        },
        //关闭指标修改框
        closeNormModal() {
            this.normData.state = false;
        },
        // 打开指标详情
        showNorm(data) {
            let row = Object.assign(
                {
                    pointName: data.pointName,
                    pointId: data.pointId,
                    minTime: data.startTime,
                    maxTime: data.endTime,
                    targetId:data.targetId
                },

            );
            this.normData.data = row;
            this.normData.state = true;
            this.$refs.indicatorModal.getNormList();
        },
        //关闭选择机构
        closeDeptModal(data) {
            this.deptState.state = false;
            if (data.length == 0) {
            } else {
                if (this.depttab == "index") {
                    this.searchIndexForm.deptName = data.name;
                    this.searchIndexForm.deptId = data.id;
                    this.getIndexTableData()
                } else if (this.depttab == "task") {
                    this.searchTaskForm.deptName = data.name;
                    this.searchTaskForm.deptId = data.id;
                    this.getTaskTableData()
                }
            }
        },
        //打开选择机构
        openDept(name) {
            this.depttab = name;
            this.deptState.state = true;
            this.deptState.data={type:0};
            this.$refs.changedept.getDeptTree();
        },
        // 返回
        goback() {
            this.$router.push({ path: "/trend" });
        },
        // 分页指标查看
        changeindexPage(val) {
            this.indexPage.current = val;
            this.getIndexTableData();
            //这里请求表格接口
        },
        // 分页任务查看
        changetaskPage(val) {
            this.taskPage.current = val;
            this.getTaskTableData();
            //这里请求表格接口
        },
        handleClicktable(tab, event) {
            if (tab.name == "firsts") {
                this.searchTaskForm.targetName = '' // 每次切换tab也的时候清空任务指标
                this.superior = [];
                this.parentId = 0;
                this.getIndexTableData();

            } else {
                this.getTaskTableData();
            }

        },
        //筛选树
        searchHimTree(event) {
            if (event.keyCode == 13) {
                if (NeizhenUtil.isEmpty(this.screenTree)) {
                    this.doubleStandClass.loadInitTree();
                } else {
                    this.doubleStandClass.searchHieracyTree(this.screenTree);
                }
            }
        },

        // 树形选择a
        handleNodeClick(data, node,e) {
            // if (data.children && data.children.length > 0) return;
            this.showBtn  = false
            this.parentId = 0
            this.searchIndexForm.hieId = data.id;
            this.treeId = data.id;
            this.superior = [] // 清空任务的返回上级按钮储存框
            this.getIndexTableData();
            this.getTaskTableData();
        },
          // 维度筛选树
      filterNode(value, data) {
        if (!value) return true;
        return data.title.indexOf(value) !== -1;
      },
    }
};
</script>

<style lang='less' scoped>
#flowPage {
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 0 1%;
  .taskSummaryItem {
    width: 100%;
    height: auto;
    padding-top: 10px;
    margin: 0 auto;
    .el-row {
      width: 100%;
      /*height: 10px;*/
      background: #fff;
      border-radius: 6px;
      .el-tabs {
        width: 100%;
        border-radius: 6px;

        .el-tabs__content {
          width: 100%;
          height: 100%;

          .el-tab-pane {
            width: 100%;
            .flowTreeDiv {
              padding: 3% 2% 2%;
              .el-input {
                margin-bottom: 3%;
              }
            }
          }
        }
      }
      .el-col-19 {
        height: 100%;
        .summaryEchart {
          width: 100%;
          height: 100%;
          padding-left: 1.5%;
          .cellHtml{
            cursor: pointer;
            display: inline-block;
          }
        }
      }
    }
  }
}

.taskSummaryBreadcrumb {
  position: relative;
  padding: 10px 15px;
  margin-top: 10px;
  font-size: 14px;
  /*text-align: left;*/
  background: #fff;
  border-radius: 2px;
  height: 52px;
  text-align: right;
  .screen {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.M_search {
  padding: 13px 15px;
  text-align: left;
   > div {
    margin-right: 2%;
  }
  .ivu-btn-primary {
    margin-right: 10px;
  }
}
</style>
