<template>
  <div id="flowPage">
    <div class="taskSummaryItem">
      <el-row>
        <el-col :span="5" id="reviseProcessTree">
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="诊改维度选择" name="first">
              <div :style="taskHeight" class="flowTreeDiv" >
                <el-input  v-model="screenTree"  size="small" @keyup.native="searchHimTree($event)" placeholder="请输入关键字" suffix-icon="el-icon-search">
                </el-input>
                <el-tree  id="taskTreeL"
                         :data="treeData"
                         :default-expanded-keys="defaultExpandIds" accordion
                         :load="loadHierachyTreeData" lazy  highlight-current :props="defaultProps" :filter-node-method="filterNode"
                         node-key="id" @node-click="handleNodeClick" ref="tree"></el-tree>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="19" ref="NineHeight" id="rightHeight" >
          <div class="summaryEchart" >
            <Tabs value="target" @on-click="handleClick">
              <TabPane  v-for="item in tabsData" :key="item.id" :label="item.label" :name="item.name"></TabPane>
            </Tabs>
            <div class="M_search">
              <!--组织机构：<Input placeholder="请选择组织机构" @on-focus="showDepFocus('dep')" v-model="search.orgName"  style="width: 15%" />-->
              <!--负责人姓名：<Input placeholder="请输入负责人姓名" v-model="search.principal"  style="width: 15%" />-->
              <!--指标名称：<Input placeholder="请输入指标名称" v-model="search.target"  style="width: 15%" />-->
              关键字：<Input placeholder="请输入指标名称" v-model="keyword"  style="width: 15%" />
              <!--<Button type="primary" icon="ios-search"  @click="searchBtn">搜 索</Button>
              <Button icon="ios-trash"  @click="emptyBtn">清 空</Button>-->
              <el-button icon="el-icon-search" @click="searchBtn" type="primary" size="small">搜 索</el-button>
              <el-button icon="el-icon-delete" @click="emptyBtn" size="small">清 空</el-button>
              <el-button v-if="showBtn" @click="btnUp" size="small">返回上级</el-button>
            </div>
            <div class="tableHeight">
              <el-table
                :data="tableData"
                :header-cell-style="backHeader"
                height="100%"
                :cell-style = "paddingMy"
                style="min-width: 100%;min-height: 100%">
                <el-table-column label="名称" prop="name" key="1"  min-width="150" align="center" show-overflow-tooltip >
                  <template slot-scope="scope">
                    <span @click="subdata(scope.row)" style="cursor:pointer;color:#2d8cf0">
                      {{scope.row.name}}
                    </span>
                  </template>
                </el-table-column>
                <!--<el-table-column prop="target" key="2" v-if="showtarget" align="center" label="标准值"></el-table-column>-->
                <el-table-column prop="target" key="2" v-if="showtarget" align="center" label="目标值">
                  <template slot-scope="scope">
                    <span>
                      {{scope.row.target ? scope.row.target : '-'}}
                    </span>
                  </template>
                </el-table-column>
                <!--<el-table-column prop="standard" key="3" v-if="showstand"  align="center" label="标准值"></el-table-column>-->
                <el-table-column prop="standard" key="3" align="center" label="标准值">
                  <template slot-scope="scope">
                    <span>
                      {{scope.row.standard ? scope.row.standard : '-'}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="current" key="4" align="center" label="当前值">
                  <template slot-scope="scope">
                    <span>
                      {{scope.row.current ? scope.row.current : '-'}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="startTime" key="5" label="开始时间" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="endTime" key="6" align="center" label="结束时间" ></el-table-column>
                <el-table-column prop="action" key="7" align="center" label="关联文件" >
                  <template slot-scope="scope">
                   <el-button size="small" style="color: #3A8EE6" plain @click="fileClick(scope.row,scope.row.targetFiles,scope.row.standardFiles)">支撑文件</el-button>

                    <!--<div v-if="showtarget">
                      <p @click='preview(item)'  v-for="item in scope.row.targetFiles" style="color:#2d8cf0;cursor: pointer" ><i class="el-icon-tickets"></i>{{item.fileName }}&#45;&#45;&#45;&#45;1</p>
                    </div>
                    <div v-if="showstand">
                      <p @click='preview(item)'  v-for="item in scope.row.standardFiles" style="color:#2d8cf0;cursor: pointer" ><i class="el-icon-tickets"></i>{{item.fileName }}&#45;&#45;&#45;&#45;2</p>
                    </div>-->
                  </template>
                </el-table-column>
              </el-table>
              <div style="text-align: right;margin-top: 7px">
                <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--支撑文件弹框-->
    <Modal v-model="fileList.state" width="40%" :mask-closable="false" @on-cancel="closeModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>查看支撑文件</span>
      </p>
      <div class="fileManage">
        <!-- <div v-if="fileList.data.length >0" style="height: 300px">
           <p @click='preview(item)'  v-for="(item,index) in fileList.data" :key="index" style="" class="fileType">
             <span>{{index+1}}、 </span>
             <i class="el-icon-tickets"></i>
             {{item.fileName }}
           </p>
         </div>-->
         <div class="fileBox"  v-if="fileList.data.length >0"  style="height: 240px">
          <Poptip
            trigger="hover"
            v-for="(item,index) in fileList.data"
            :key="index"
            placement="top"
          >
            <div class="fileItem"  @click="preview(item)" style="cursor: pointer">
              <Icon class="listItem" type="ios-paper"/>
              <div class="listText">{{item.fileName + '.' + item.fileSuffix}}</div>
            </div>
            <div slot="content"  @click="preview(item)" style="cursor: pointer">
              <div class="text">{{item.fileName + '.' + item.fileSuffix}}</div>
              <div  class="btn" >
                <Button
                  size="small"
                  @click="preview(item)"
                  type="success"
                  ghost
                >预览</Button>
              </div>

            </div>
          </Poptip>
        </div>
        <!--<div v-else style="height: 300px;text-align: center;line-height: 300px;color: grey;font-size: 30px;letter-spacing: 3px">-->
        <div v-else style="height: 300px;text-align: center;">
          <!--暂无支撑文件～-->
          <img src="@/assets/images/wushuju.png" alt="" style="width: 40%;margin-top: 50px">
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="closeModal">关闭</Button>
      </div>
    </Modal>

    <Modal v-model="depModel" class-name="depModal" width="35">
      <p slot="header">
        <span>请选择部门</span>
      </p>
      <div class="userTree">
        <el-input placeholder="输入关键字进行过滤" v-model="searchDeptTree"></el-input>
        <el-tree class="filter-tree" :default-expanded-keys="[1]" node-key="id"
                 :props="orgTreeProps"
                 :data="orgtData"
                 :filter-node-method="orgFilterNode"
                 @node-click="orgNodeClick"
                 ref="orgTree">
        </el-tree>
      </div>
      <div slot="footer" class="basisFooter">
        <div class="btn">
        <!--  <Button type="primary" @click="depModel = false">确定</Button>-->
          <el-button @click="depModel = false" type="primary" size="small">确定</el-button>

        </div>
      </div>
    </Modal>
     <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
  </div>
</template>
<script>
  import Table from '@/components/table'
  import {DoubleStandard} from "./doubleStandard";
  import store from '@/store';
  import {NeizhenUtil} from "../../util/datarouters";
  import Preview from "@/components/preview";
  export default {
    name: "index",
    components: {Table,Preview},
    data() {
      return {
        parentId: 0,
        arrPath:[],
        keyword:'',
        treeId: 1,
        previews: {//预览文件数据
                data: [],
                state: false,
                name: ""
            },
        fileList: {
          //支撑文件要传过去的数据
          data: [],
          state: false //modal层
        },
        paddingMy: {
          'padding':'5px 0'
        },
        backHeader:{
          'background': '#f8f8f9'
        },
        doubleStandClass : null,
        selectTreeData : null,
        asyncSearchData : null,
        total: 30,
        page: 1,
        pageSize: 10,
        selecttab : 'target',
        showtarget : true,
        showstand : false,
        defaultExpandIds : [],
        searchDeptTree: '', // 机构搜索框绑定值
        orgtData: [], // 机构树形数据赋值
        depModel: false, // 机构树形弹窗
        activeName: 'target',
        taskHeight:'',
        activeName2: 'first',
        screenTree: '', // 筛选维度树形
        defaultProps: {
          children: 'children',
          label: 'title',
          isLeaf: 'leaf'
        }, // 维度树形
        orgTreeProps : {
          children : 'children',
          label : 'name',
          isLeaf : 'leaf'
        },
        treeData: [
          {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [
            {
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          },
            {
              id: 71,
              label: '二级 2-1'
            }, {
              id: 82,
              label: '二级 2-2'
            },
            {
              id: 92,
              label: '二级 2-1'
            }, {
              id: 62,
              label: '二级 2-2'
            },
            {
              id: 711,
              label: '二级 2-1'
            }, {
              id: 812,
              label: '二级 2-2'
            },
            {
              id: 912,
              label: '二级 2-1'
            }, {
              id: 612,
              label: '二级 2-2'
            }
          ]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }
        ], // 维度树形
        tabsData:[
          {label:'目标链', name:'target', id:1},
          {label:'标准链', name:'standard', id:2},
        ],
        search: {
          orgName: '',
          principal: '',
          target: '',
          orgId: null
        },
        tableData: [],
        param:{},
        showBtn: false,
        pushPath: true,
        param2:{        }
      }
    },
    created() {
      this.doubleStandClass = new DoubleStandard(this, store);
      this.doubleStandClass.deptTreeSet();
    },
    mounted () {
      // 部门树设置
      this.handleClick('target')
      // this.doubleStandClass.searchHierarchy(this.treeId)
      // let dataId = 1
      this.getDataTwo(this.parentId)
      this.$nextTick(() => {
        this.taskHeight = 'height:'+ (this.$refs.NineHeight.$el.offsetHeight - 71) + 'px'
      });
    },
    watch: {
      screenTree(val) {
        this.$refs.tree.filter(val);
      },
      searchDeptTree(val) {
        this.$refs.orgTree.filter(val);
      }
    },

    methods: {
        getDataTwo(id){
          let that = this
          this.pushPath= true
          that.param = {
            current: this.page,
            size: this.pageSize,
            parentId:id,
            keyword:this.keyword
          };
          that.$Get("/admin/hierarchy/page",that.param, res => {
            that.tableData = that.tableHierarchyTransfer(res.data.records);
            // that.tableData = res.data.records
            that.total = res.data.total;
          })
        },
        getDataOne(){
          this.pushPath= false
          // this.arrPath.push(this.param2)
          // if (this.getDimType() == 'target') {
            this.doubleStandClass.searchTargets(this.page,
              this.pageSize,
              this.parentId,
              this.search.orgId,
              this.keyword);
          // } else {
          //   this.doubleStandClass.searchHierarchy(this.parentId);
          // }
        },
        subdata(row){
          if(!this.pushPath)return
          this.showBtn = true
          this.parentId = row.id
          if(row.hieLevel === 14){
            this.getDataOne()
          }else {
            this.getDataTwo(row.id)
            this.arrPath.push(this.param)
          }

        },
      // 返回上级
        btnUp(){
          console.log(344,this.arrPath)
          let lengthA = this.arrPath.length
          let param = this.arrPath[lengthA - 1]
          let id = param.parentId
            this.getDataTwo(id)
          this.arrPath.splice(lengthA - 1,1)
          this.showBtn  = this.arrPath.length > 0 ? true : false
        },
      // 关闭支撑文件通知
        closeModal(){
          this.fileList.state = false
        },
        fileClick(row,targetFiles,standardFiles){
          let data = this.showtarget ? targetFiles : this.showstand ? standardFiles :''
          this.fileList.state = true
          this.fileList.data = data === null ? [] : data
        },
              //关闭预览
        closePreview (val) {
            this.previews.state = val;
        },
        // 预览
        preview (p) {
            // console.log(p)
            this.previews.name = p.fileSuffix
            this.previews.data = '/mngfile/chunkfile/previewStream/' + p.fileId;
            this.previews.state = true;
            this.$refs.preview.getPreviewData();
        },
      searchHimTree(event) {
        if (event.keyCode == 13) {
          if (NeizhenUtil.isEmpty(this.screenTree)) {
            this.doubleStandClass.loadInitTree();
          } else {
            this.doubleStandClass.searchHieracyTree(this.screenTree);
          }
        }

      },

      loadHierachyTreeData(node, resolve) {
        var searchNodeData = function(searchdata,id, resovle) {

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
          //return resolve([{ name: 'region' }]);
        }
        if (node.level >= 1) {
          if (this.asyncSearchData != null) {
            searchNodeData(this.asyncSearchData, node.data.id, resolve);
          }else{
            this.doubleStandClass.asyncLoadTree(node.data.id, resolve);
          }
        }
        // setTimeout(()=>{
        //   this.$refs.tree.setCurrentKey(this.treeId);
        // },500)
      },
      // 分页查看
      changePage(val) {
        this.page = val;
      },
      // 搜索按钮
      searchBtn(){
        if (this.getDimType() == 'target') {
          this.doubleStandClass.searchTargets(this.page,
            this.pageSize,
            this.selectTreeData.id,
            this.search.orgId,
            this.keyword
            );
        }

      },
      // 清空按钮
      emptyBtn(){
        this.search.orgName = ''
        // this.search.principal = ''
        // this.search.target = ''
        // this.search.orgId = null
      },
      // 输入框获取焦点-树形弹窗
      showDepFocus (type) {
        // debugger
        this.depModel = true
        this.search.orgName = '';
        this.search.orgId = '';
      },
      // 机构筛选树
      orgFilterNode (value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 维度树形选择
      orgNodeClick(data,node){
        if(data.children && data.children.length >0) return
        this.search.orgName = data.name;
        this.search.orgId = data.id;
      },
      // 维度筛选树
      filterNode(value, data) {
        if (!value) return true;
        return data.title.indexOf(value) !== -1;
      },
      // 维度树形选择
      handleNodeClick(data,node){
        let that = this
        this.arrPath = []
        this.selectTreeData = data;
        this.parentId = data.id;
        if(data.hasChildren){
          this.getDataTwo(data.id)
        }else {
          this.pushPath= false
          this.getDataOne()
        }
      },

      tableHierarchyTransfer(origndata) {
        var outdata = [];
        // var e = origndata;
        origndata.forEach(e => {
          outdata.push({
            name : e.target,
            target : '',
            standard : '',
            current : '',
            startTime : e.startTime,
            endTime : e.endTime,
            targetFiles : e.files,
            standardFiles : e.files,
            id: e.id,
            hieLevel: e.hieLevel
          });
        })
        return outdata;
      },
      // 维度树类型
      getDimType() {
        if (this.selectTreeData.hasChildren) {
          return 'hie';
        } else {
          return 'target';
        }
      },
      // tabs点击
      handleClick(name) {
        console.log(88, name);
        this.selecttab = name;
        if (name == 'target') {
          this.showtarget = true;
          this.showstand = false;
        } else {
          this.showtarget = false;
          this.showstand = true;
        }
        /*this.tableData = []

        // target  standard
        if (name === 'target') {
          //this.tableData.push(...res)
        }else if(name === 'standard'){
          //this.tableData.push(...res2)
        }*/
      },

    }
  };
</script>

<style lang='less' scoped>
@import url("./doubleStrand.less");
</style>
