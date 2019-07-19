<template>
  <div class="diaBox">
    <div id="diagnosis">
      <div class="dadaCard">
        <div class="treeMenu">
          <div class="modifySystem">
            <div class="title">
              <h3>诊改体系</h3>
              <Icon
                v-if="hie_add"
                @click="openEditModal({pid:hie_pid},{hieLevel:11})"
                class="t-icon"
                type="ios-add-circle-outline"
              />
            </div>
            <div class="modifyItem">
              <div
                v-show="modifyData.length>0"
                :id="'modify'+index"
                class="itemList"
                :class="{'itemActive': item.active }"
                :key="index"
                v-for="(item,index) in modifyData"
              >
                <el-tooltip placement="left-start">
                  <div v-show="item.enableFlag=='0'" slot="content">已启用</div>
                  <div v-show="item.enableFlag!='0'" slot="content">已关闭</div>
                  <i
                    class="iconfont iconqiyong"
                    :style="{'color':item.enableFlag=='0' ? '#2d8cf0':'#bbb'}"
                  ></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content=item.hieName placement="right">
                  <span @click="acModify(item,index)">{{item.hieName}}</span>
                </el-tooltip>
                <i
                  v-if="hie_add"
                  class="iconfont iconxiugai"
                  @click="openEditModal({pid:hie_pid,id:item.id},{hieLevel:11})"
                ></i>
              </div>
              <div v-show="modifyData.length==0" class="noData">暂无数据</div>
            </div>
            <MeditModal
              ref="modifyEdit"
              :modifyEdits="modifyEdits"
              @closeMain="closeMain"
            ></MeditModal>
          </div>


          <div class="iconSystem">
            <i class="iconfont iconjiantou"></i>
          </div>
          <div class="levelSystem">
            <div class="title">
              <h3>诊改层面</h3>
              <Icon
                v-if="level_add"
                @click="openEditModal({pid:level_pid},{
                  hieLevel:12,
                  minTime:selectModifyData.startTime,
                  maxTime:selectModifyData.endTime})"
                class="t-icon"
                type="ios-add-circle-outline"
              />
            </div>
            <div class="modifyItem">
              <div
                v-show="levelData.length>0"
                :id="'level'+index"
                class="itemList"
                :class="{'itemActive': item.active }"
                :key="index"
                v-for="(item,index) in levelData"
              >
                <el-tooltip placement="left-start">
                  <div v-show="item.enableFlag=='0'" slot="content">已启用</div>
                  <div v-show="item.enableFlag!='0'" slot="content">已关闭</div>
                  <i
                    class="iconfont iconqiyong"
                    :style="{'color':item.enableFlag=='0' ? '#2d8cf0':'#bbb'}"
                  ></i>
                </el-tooltip>
                <span @click="acLevel(item,index)">{{item.hieName}}</span>
                <i
                  v-if="level_add"
                  class="iconfont iconxiugai"
                  @click="openEditModal({pid:level_pid,id:item.id},{
                  hieLevel:12,
                  minTime:selectModifyData.startTime,
                  maxTime:selectModifyData.endTime})"
                ></i>
              </div>
              <div v-show="levelData.length==0" class="noData">暂无数据</div>
            </div>
          </div>
          <div class="iconSystem">
            <i class="iconfont iconjiantou"></i>
          </div>
          <div class="dimensionSystem">
            <div class="title">
              <h3>诊改维度</h3>
              <Icon
                v-if="dim_add"
                @click="openEditModal({pid:dim_pid},{
                  hieLevel:13,
                  minTime:selectLevelData.startTime,
                  maxTime:selectLevelData.endTime})"
                class="t-icon"
                type="ios-add-circle-outline"
              />
            </div>
            <div class="modifyItem">
              <div
                v-show="dimensionData.length>0"
                :id="'dimension'+index"
                class="itemList"
                :class="{'itemActive': item.active }"
                :key="index"
                v-for="(item,index) in dimensionData"
              >
                <el-tooltip placement="left-start">
                  <div v-show="item.enableFlag=='0'" slot="content">已启用</div>
                  <div v-show="item.enableFlag!='0'" slot="content">已关闭</div>
                  <i
                    class="iconfont iconqiyong"
                    :style="{'color':item.enableFlag=='0' ? '#2d8cf0':'#bbb'}"
                  ></i>
                </el-tooltip>
                <span @click="acDmension(item,index)">{{item.hieName}}</span>
                <i
                  v-if="dim_add"
                  class="iconfont iconxiugai"
                  @click="openEditModal({pid:dim_pid,id:item.id},{
                  hieLevel:13,
                  minTime:selectLevelData.startTime,
                  maxTime:selectLevelData.endTime})"
                ></i>
              </div>
              <div v-show="dimensionData.length==0" class="noData">暂无数据</div>
            </div>
          </div>
          <div class="iconSystem">
            <i class="iconfont iconjiantou"></i>
          </div>
          <div class="spotSystem">
            <div class="title">
              <h3>诊改质控点</h3>
              <Icon
                v-if="point_add"
                @click="openEditModal({pid:point_pid},{
                  hieLevel:14,
                  minTime:selectDimensionData.startTime,
                  maxTime:selectDimensionData.endTime})"
                class="t-icon"
                type="ios-add-circle-outline"
              />
            </div>
            <div class="modifyItem">
              <div
                v-show="spotData.length>0"
                :id="'spot'+index"
                class="itemList"
                :class="{'itemActive': item.active }"
                :key="index"
                v-for="(item,index) in spotData"
              >
                <el-tooltip placement="left-start">
                  <div v-show="item.enableFlag=='0'" slot="content">已启用</div>
                  <div v-show="item.enableFlag!='0'" slot="content">已关闭</div>
                  <i
                    class="iconfont iconqiyong"
                    :style="{'color':item.enableFlag=='0' ? '#2d8cf0':'#bbb'}"
                  ></i>
                </el-tooltip>
                <span @click="acSpot(item,index)">{{item.hieName}}</span>
                <i
                  v-if="point_add"
                  class="iconfont iconxiugai"
                  @click="openEditModal({pid:point_pid,id:item.id},{
                  hieLevel:14,
                  minTime:selectDimensionData.startTime,
                  maxTime:selectDimensionData.endTime})"
                ></i>
              </div>
              <div v-show="spotData.length==0" class="noData">暂无数据</div>
            </div>
          </div>
        </div>

        <FileManage ref="filemanage" :fileList="fileList" @closeMains="closeMains"></FileManage>
        <NormModal ref="normModal" :normData="normData" @closeNormModal="closeNormModal"></NormModal>
      </div>
    </div>
    <div class="tableBox">
      <div class="tableData" style="font-size: 14px">
        <div class="btnBox" v-if="showTable === false">
          <el-button
            v-if="hierarchy_report_read"
            type="primary"
            size="small"
            icon="el-icon-view"
            @click="openDiaDetails"
          >查看诊断结果
          </el-button>
          <el-button
            v-if="hierarchy_report_enable"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="writeDownDianogsis"
          >填写诊断报告
          </el-button>
          <el-button
            @click="showNorm({})"
            v-if="target_add"
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
          >新增指标
          </el-button>
        </div>
        <!--<div class="btnBox" v-if="showTable === true">-->
          <!--<Button type="primary" size="large" icon="ios-undo" @click="showTable = false"></Button>-->
          <!--<Button type="primary" size="large">锁定</Button>-->
          <!--<Button size="large">解锁</Button>-->
        <!--</div>-->
        <div v-if="showTable === false">
          <Table
            id="targetTable"
            style="min-height: 270px"
            :columns="columns"
            :data="tableData"
            width="100%"
          >
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="text"
                size="small"
                :disabled="row.enableFlag === '0' || row.runState === '2' "
                style="color:#3f7ae6;fontSize:14px"
                @click="showNorm({targetId:row.targetId})"
              >编辑
              </Button>
              <Button
                type="text"
                size="small"
                :disabled="row.enableFlag === '0'"
                style="color:#f04409;fontSize:14px"
                @click="remove(row,index)"
              >删除
              </Button>
              <Button
                type="text"
                size="small"
                :disabled="row.runState !== '2'"
                style="color:#3f7ae6;fontSize:14px"
                @click="spiralTarget({targetId:row.targetId,dataId:row.dataId,dataName:row.dataName})"
              >诊改
              </Button>
            </template>
          </Table>
        </div>
        <!--<div v-if="showTable === true">-->
          <!--<el-breadcrumb separator="/" style="padding-bottom:10px">-->
            <!--<el-breadcrumb-item>诊改管理</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>诊断结果</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>学校</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>教学经费</el-breadcrumb-item>-->
          <!--</el-breadcrumb>-->
          <!--<div>-->
            <!--<el-table :data="diagnoseTable" style="min-height: 270px">-->
              <!--<el-table-column prop="Mindex" label="指标" width="180"></el-table-column>-->
              <!--<el-table-column prop="result" label="诊断结果" width="180"></el-table-column>-->
              <!--<el-table-column prop="conclusion" show-overflow-tooltip label="诊断结论"></el-table-column>-->
              <!--<el-table-column prop="measure" show-overflow-tooltip label="拟改进措施"></el-table-column>-->
            <!--</el-table>-->
          <!--</div>-->
        <!--</div>-->

        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page v-if="!showTable"
              @on-change="changePage"
              :showTotal="page.showTotal"
              :total="page.total"
              :current="page.currentPage"
              :page-size="page.pageSize"
            ></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MeditModal from "./modal/editModal"; //引入修改或添加诊改项目Modal
  import FileManage from "./modal/fileManage"; //引入支撑文件管理Modal
  import NormModal from "./modal/normModal"; //引入支撑文件管理Modal
  import {NeizhenUtil, datarouters} from "../../util/datarouters";
  import { remote } from '@/api/admin/dict'
  export default {
    components: {MeditModal, FileManage, NormModal},
    data() {
      return {
        showTable: false, // 显示诊断结果与否
        diagnoseTable: [
          {
            Mindex: "学校办学经费各来源经费占比",
            result: "达标",
            conclusion:
              "校级体系层面的诊改是处于统筹地位的存在。学校领导实际站在整个学校层面的制高点把握本校发展的大格局与发展战略，校级体系诊改的重要性不言而喻。校级体系部分有学校教学经费、教研科研、就业服务、师资队伍、实践条件、体制机制、投资信息、图书资源、校外评估、学习产出、学生信息、学校信息、招生服务、专业设置、资源保障15个一级维度，从学校的目标规划、资源保障、过程管理、分析与改进、外界声望、毕业生就业等方向进行诊断，结合相应的数据指标，尽所能的做到全面的从多角度监测，测评出学校的实际发展状况，并由大方向入手，追根寻源，找到问题所在，通过一些相关性方法的分析手段并进一步改善、解决问题，使本校可以持续不断的健康良好发展，具体角度细节如表3-2所示。过程管理、分析与改进、外界声望、毕业生就业等方向进行诊断，结合相应的数据指标，尽所能的做到全面的从多角度监测，测评出学校的实际发展状况，并由大方向入手，追根寻源，找到问题所在，通过一些相关性方法的分析手段并进一步改善、解决问题，使本校可以持续不断的健康良好发展，具体角度细节如表3-2所示。过程管理、分析与改进、外界声望、毕业生就业等方向进行诊断，结合相应的数据指标管理。",
            measure:
              "校级体系层面的诊改是处于统筹地位的存在。学校领导实际站在整个学校层面的制高点把握本校发展的大格局与发展战略，校级体系诊改的重要性不言而喻。校级体系部分有学校教学经费、教研科研、就业服务、师资队伍、实践条件、体制机制、投资信息、图书资源、校外评估、学习产出、学生信息、学校信息、招生服务、专业设置、资源保障15个一级维度，从学校的目标规划、资源保障、过程管理、分析与改进、外界声望、毕业生就业等方向进行诊。"
          }
        ], // 诊断结果table
        normData: {
          hieId:"",
          //编辑/新增指标要传过去的数据
          data: {},
          state: false //modal层
        },
        fileList: {
          //支撑文件要传过去的数据
          data: [],
          state: false //modal层
        },
        modifyEdits: {
          //修改体系框要传过去的数据
          data: {},
          state: false //modal层
        },

        page: {
          showTotal: true,
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 5, // 每页显示多少条,
          isAsc: false //是否倒序
        },
        hierarchyTreeData: [], //体系树
        modifyData: [], //体系数据
        levelData: [], //层面数据
        dimensionData: [], //维度数据
        spotData: [], //质控点数据
        selectModifyData: {}, //选择的体系
        selectLevelData: {}, //选择的层面
        selectDimensionData: {}, //选择的维度
        selectSpotData: {}, //选择的质控点
        columns: [
          {
            title: "指标名称",
            key: "targetName",
            align: "left",
            minWidth: 200,
            tooltip: true,
          },

          {
            title: "目标值",
            // key: "targetValue",
            key: "disTargetValue",
            align: "center",
            width: 100,
            tooltip: true,

            render: (h, params) => {
              let targetValue =
                this.getStrategySymbol(params.row.targetStrategy) +
                params.row.disTargetValue;
              return h("span", targetValue);
            }
          },
          {
            title: "标准值",
            key: "disStandardValue",
            align: "center",
            width: 100,
            tooltip: true,
            render: (h, params) => {
              let standardValue =
                this.getStrategySymbol(params.row.standardStrategy) +
                params.row.disStandardValue;
              return h("span", standardValue);
            }
          },
          {
            title: "预警值",
            // key: "warnValue",
            key: "disWarnValue",
            align: "center",
            width: 100,
            tooltip: true,

            render: (h, params) => {
              let warnValue =
                this.getStrategySymbol(params.row.warnStrategy) +
                params.row.disWarnValue;
              return h("span", warnValue);
            }
          },
          {
            title: "开始时间",
            key: "startTime",
            align: "center",
            width: 150,
            tooltip: true,
          },
          {
            title: "截止时间",
            key: "endTime",
            align: "center",
            width: 150,
            tooltip: true,
          },
          {
            title: "支撑文件",
            key: "supportDoc",
            align: "center",
            width: 120,
            tooltip: true,

            render: (h, params) => {
              return h(
                "Button",
                {
                  props: {
                    type: "default"
                  },
                  style: {
                    // marginLeft: '-5px',
                    color: "#719ad8"
                  },
                  on: {
                    click: () => {
                      this.openFileList(
                        params.row,
                        params.index
                      );
                    }
                  }
                },
                "支撑文件"
              );
            }
          },
          {
            title: "权重",
            key: "weight",
            align: "center",
            width: 90,
            tooltip: true,
          },

          {
            title: "运行状态",
            key: "runState",
            align: "center",
            width: 120,
            tooltip: true,
            render: (h, params) => {
              let state = params.row.runState;
              if (state == "0") {
                return h("div", [
                  h(
                    "span",
                    {
                      style: {
                        color: "#4ac056"
                      }
                    },
                    "未开始"
                  )
                ]);
              } else if (state == "1") {
                return h("div", [
                  h(
                    "span",
                    {
                      style: {
                        color: "#ff7f13"
                      }
                    },
                    "运行中"
                  )
                ]);
              } else if (state == "2") {
                return h("div", [
                  h(
                    "span",
                    {
                      style: {
                        color: "#f04409"
                      }
                    },
                    "已结束"
                  )
                ]);
              }
            }
          },
          {
            title: "质控状态",
            key: "enableFlag",
            align: "center",
            width: 100,
            tooltip: true,
            render: (h, params) => {
              return h("i-switch", {
                //数据库1是已处理，0是未处理
                props: {
                  size: "small",
                  type: "primary",
                  trueValue: "0",
                  falseValue: "1",
                  value: params.row.enableFlag
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  "on-change": value => {
                    //触发事件是on-change,用双引号括起来，
                    //参数value是回调值，并没有使用到
                    this.switch(params.index, params.row); //params.index是拿到table的行序列，可以取到对应的表格值
                  }
                }
              });
            }
          },
          {
            title: "操作",
            key: "action",
            slot: "action",
            align: "center",
            width: 190,
            tooltip: true,
          }
        ], //指标table头
        tableData: [], //指标table
        hie_add:false,
        hierarchy_report_enable:false,
        hierarchy_report_read:false
      };
    },
    created() {
      this.hie_add = this.$store.state.permissions['hierarchy_add']
      this.hierarchy_report_enable = this.$store.state.permissions['hierarchy_report_enable']
      this.hierarchy_report_read = this.$store.state.permissions['hierarchy_report_read']
      this.level_add = false;
      this.dim_add = false;
      this.point_add = false;
      this.target_add = false;
      this.hie_pid = 0;
      this.level_pid = 0;
      this.dim_pid = 0;
      this.point_pid = 0;
      this.hie_select_index = 0;
      this.level_select_index = 0;
      this.dim_select_index = 0;
      this.point_select_index = 0;
    },
    mounted() {
      this.getDiagnosisData();
    },
    watch: {
      hierarchyTreeData() {
        this.modifyData = this.hierarchyTreeData;
        if (this.modifyData.length > 0) {
          let pos =
            this.hie_select_index >= this.modifyData.length
              ? 0
              : this.hie_select_index;
          this.acModify(this.modifyData[pos], pos);
        }
      }
    },
    computed: {},
    methods: {
      // 查看诊断结果
      openDiaDetails(){
        this.$router.push('/diagnosdetails');
      },
      // 填写诊断报告
      writeDownDianogsis() {
        var that = this;
        if (this.selectModifyData.id) {
          if (this.selectModifyData.reportFlag == 1) {
            this.$Message.info(
              "已开启诊断报告的填写，请在我的任务中填写相关任务的诊断报告!"
            );
          } else {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>要开始诊断报告的填写么 ？</p>',
              onOk: () => {
                that.$AsyncDealData(
                  datarouters.SystemManage.hierarchy.updateReport,
                  {himId: that.selectModifyData.id},
                  function (data) {
                    that.$Message.info("请填写诊断报告！");
                    that.selectModifyData.reportFlag = 1;
                  }
                );
              },
              onCancel: () => {
                // this.$Message.info('Clicked cancel');
              }
            });
          }
        }
      },
      //分页查询
      changePage(num) {
        this.page.currentPage = num;
        this.getTargetData(this.selectSpotData);
      },
      // 打开支持文件
      openFileList(row, index) {
        //当前点击的支持文件行数据传过去
        this.fileList.data = row;
        this.fileList.state = true;
        this.$refs.filemanage.getFileList(); //触发文件管理页面的获取数据方法
      },
      //关闭文件管理
      closeMains(val) {
        this.fileList.state = val;
      },

      //关闭体系修改框
      closeMain(obj) {
        this.modifyEdits.state = obj.state;
        if (obj.reload) {
          //重新请求体系数据
          this.getDiagnosisData();
        }
      },
      //关闭指标修改框
      closeNormModal(obj) {
        this.normData.state = obj.state;
        if (obj.reload) {
          //重新请求指标数据
          this.getTargetData(this.selectSpotData);
        }
      },
      //修改或新增诊改
      openEditModal(data, obj) {
        //当前点击的体系数据this.modifyEdits.data传过去
        this.modifyEdits.data = data;
        this.modifyEdits.state = true;
        this.$refs.modifyEdit.getModifyEdits(obj);
      },
      //更新质控状态
      switch(index, row) {
        let that = this;
        let targetId = row.targetId;
        let enableFlag = row.enableFlag === "0" ? "1" : "0";
        that.$Put(
          "/admin/target/enableFlag",
          Object.assign({
            targetId: targetId,
            enableFlag: enableFlag
          }),
          function (data) {
            if (data.data) {
              that.tableData[index].enableFlag = enableFlag;
            }
          },
          "#targetTable"
        );
      },
      // 打开编辑指标
      showNorm(row) {
        let hieId;
        remote('lay_type').then(response => {
          for(let i=0;i<response.data.data.length;i++){
            if(response.data.data[i].label==this.selectLevelData.hieName){
              hieId=response.data.data[i].value;
              let data = Object.assign(
                {
                  pointName: this.selectSpotData.hieName,
                  pointId: this.selectSpotData.id,
                  minTime: this.selectSpotData.startTime,
                  maxTime: this.selectSpotData.endTime,
                },
                row,
              );
              this.normData.hieId = hieId;
              this.normData.data = data;
              this.normData.state = true;
              this.$refs.normModal.getNormList();
            }
          }
        });

      },
      //诊改指标
      spiralTarget(row) {
        console.log(row)
        let data = Object.assign(
          {
            pointName: this.selectSpotData.hieName,
            pointId: this.selectSpotData.id,
            name:"诊改"
          },
          row
        );
        this.normData.data = data;
        this.normData.state = true;
        this.$refs.normModal.getNormList();
      },
      remove(row, index) {
        let that = this;
        let targetId = row.targetId;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除该指标？</p>',
          onOk: () => {
            that.$Delete("/admin/target/" + targetId, {}, function (
              data
            ) {
              // console.info(data);
              // that.tableData.splice(index, 1);
              that.$Message.success("删除成功");
              //重新请求指标数据
              that.getTargetData(that.selectSpotData);
            });
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      //请求指标数据
      getTargetData(row) {
        let that = this;
        that.$Get(
          "/admin/target/page",
          Object.assign(
            {
              current: that.page.currentPage,
              size: that.page.pageSize
            },
            {pointId: row.id}
          ),
          function (data) {
            console.log(data.data.records);
            that.tableData = data.data.records;
            that.page.total = data.data.total;
          }
        );
      },
      // 请求体系数据
      getDiagnosisData() {
        let that = this;
        that.$Get("/admin/hierarchy", {}, function (data) {
          that.hierarchyTreeData = data.data;
        });
      },
      // 点击体系
      acModify(row, index) {
        this.hie_select_index = index;
        this.selectModifyData = row;
        this.changeColor(this.modifyData, index);
        // 下面接口    应请求体系下面的层面
        this.level_add = row.director;
        this.level_pid = row.id;
        this.levelData = row.children;
        if (this.levelData.length > 0) {
          let pos =
            this.level_select_index >= this.levelData.length
              ? 0
              : this.level_select_index;
          this.acLevel(this.levelData[pos], pos);
        } else {
          this.dimensionData = [];
          this.spotData = [];
          this.tableData = [];
          this.dim_add = false;
          this.point_add = false;
          this.target_add = false;
        }
      },
      // 点击层面
      acLevel(row, index) {
        this.level_select_index = index;
        this.selectLevelData = row;
        this.changeColor(this.levelData, index);
        // 下面接口    应请求层面下面的维度
        this.dim_add = row.director;
        this.dim_pid = row.id;
        this.dimensionData = row.children;
        if (this.dimensionData.length > 0) {
          let pos =
            this.dim_select_index >= this.dimensionData.length
              ? 0
              : this.dim_select_index;
          this.acDmension(this.dimensionData[pos], pos);
        } else {
          this.spotData = [];
          this.tableData = [];
          this.point_add = false;
          this.target_add = false;
        }
      },
      // 点击维度
      acDmension(row, index) {
        this.dim_select_index = index;
        this.selectDimensionData = row;
        this.changeColor(this.dimensionData, index);
        // 下面接口    应请求维度下面的质控点
        this.point_add = row.director;
        this.point_pid = row.id;
        this.spotData = row.children;
        if (this.spotData.length > 0) {
          let pos =
            this.point_select_index >= this.spotData.length
              ? 0
              : this.point_select_index;
          this.acSpot(this.spotData[pos], pos);
        } else {
          this.tableData = [];
          this.target_add = false;
        }
      },
      // 点击质控点
      acSpot(row, index) {
        this.point_select_index = index;
        this.selectSpotData = row;
        this.changeColor(this.spotData, index);
        // 下面接口    应请求质控点下面的table数据
        this.target_add = row.director;
        this.getTargetData(row);
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
      // 点击改变颜色
      changeColor(list, index) {
        for (let i = 0; i < list.length; i++) {
          if (i == index) {
            list[i].active = true;
          } else {
            list[i].active = false;
          }
        }
      }
    }
  };
</script>

<style scoped lang="less">
  @import url("./index.less");
</style>

