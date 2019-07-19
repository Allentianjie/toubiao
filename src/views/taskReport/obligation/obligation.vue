<template>
  <div id="flowPage">
    <div class="taskSummaryItem">
      <el-row>
        <el-col :span="5" id="reviseProcessTree">
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="部门选择" name="first">
              <div :style="taskHeight" class="flowTreeDiv" >
                <el-input  v-model="screenTree"  size="small" placeholder="请输入关键字" suffix-icon="el-icon-search">
                </el-input>
                <el-tree class="filter-tree" id="taskTreeL" :default-expanded-keys="[1]"
                         node-key="id" highlight-current
                         :props="defaultProps" :style="taskHeight"
                         :data="treeData"
                         :filter-node-method="filterNode"
                         @node-click="handleNodeClick"
                         ref="tree">
                </el-tree>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="19" ref="NineHeight" id="rightHeight" >
          <div class="summaryEchart" >
            <div class="M_search">
              <!--用户名：<Input placeholder="请输入用户名" @on-change="searchData" v-model="search.userName"  style="width: 15%" />-->
              姓名：<Input placeholder="请输入姓名" @on-change="searchData" v-model="search.name" clearable style="width: 15%" />
              <el-button icon="el-icon-search" @click="searchData" type="primary" size="small">搜 索</el-button>
              <el-button icon="el-icon-delete" @click="emptyBtn" size="small">清 空</el-button>
            </div>
            <div class="tableHeight">
              <el-table
                :data="tableData"
                :header-cell-style="backHeader"
                height="100%"
                :cell-style = "paddingMy"
                style="width: 100%">
                <el-table-column label="姓名" prop="userName" key="1"  min-width="150" align="center" ></el-table-column>
                <el-table-column label="所属部门" prop="deptName" key="2"  min-width="150" align="center" ></el-table-column>

                <el-table-column prop="action" key="3" align="center" label="关联文件" >
                  <template slot-scope="scope">
                    <el-button size="small" style="color: #3A8EE6" plain @click="fileClick(scope.row,scope.row.targetFiles,scope.row.standardFiles)">支撑文件</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="text-align: right;margin-top: 7px">
                <Page :total="page.total"
                      :current="page.current"
                      :page-size="page.size"
                      @on-change="changePage"
                      show-total></Page>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
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
        <div v-else style="height: 300px;text-align: center;">
          <!--暂无支撑文件～-->
          <img src="@/assets/images/wushuju.png" alt="" style="width: 40%;margin-top: 50px">
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="closeModal">关闭</Button>
      </div>
    </Modal>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>

  </div>
</template>
<script>
  import Preview from "@/components/preview";
  export default {
    components: {Preview},
    data() {
      return {
        previews: {//预览文件数据
          data: [],
          state: false,
          name: ""
        },
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf: 'leaf'
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
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        deptId: null,
        taskHeight:'', // ----
        activeName2: 'first',
        screenTree: '', // 树组件查询
        treeData: [], // 树形
        search: {
          orgName: '',// 树形名称
          orgId: '',// 树形ID
          userName: '',
          name: '',
        },
        tableData: [],
      }
    },
    created() {

    },
    mounted () {
      this.gettableData();
      this.treeData = this.$store.state.chooseDataScopeDept
      // 部门树设置
      this.$nextTick(() => {
        // setTimeout(()=>{
          this.$refs.tree.setCurrentKey(1);
        // },1000)
        this.taskHeight = 'height:'+ (this.$refs.NineHeight.$el.offsetHeight - 71) + 'px'
      });
    },
    watch: {
      screenTree(val) {
        this.$refs.tree.filter(val);
      },
    },

    methods: {
        // 过滤树-筛选
      filterNode(value, data) {
        let that = this
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 表格
      gettableData() {
        let that = this;
        that.$Get(
          "admin/filemanage/taskUserFile",
          Object.assign(that.page, that.search,{fileType : 33, deptId : that.deptId}),
          function (data) {
            that.page.total = data.data.total;
            that.tableData = data.data.records
          });
      },
      // 关闭支撑文件通知
      closeModal(){
        this.fileList.state = false
      },
      // 点击支撑文件
      fileClick(row,targetFiles,standardFiles){
        let that = this
        this.$Get("/admin/filemanage/belonguserfiles", {
          fileType : 33, // 34
          userId : row.userId
        }, function(data) {
          that.fileList.state = true
          that.fileList.data = data.data === null ? [] : data.data
        })
      },
      //关闭预览
      closePreview (val) {
        this.previews.state = val;
      },
      // 预览getPreviewData
      preview (row) {
        this.previews.name = row.fileSuffix
        this.previews.data = '/mngfile/chunkfile/previewStream/' + row.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      // 清空按钮
      emptyBtn(){
        this.search.userName = ''
        this.search.name = ''
        this.page.current = 1;
        this.gettableData()

      },
      // 树形选择
      handleNodeClick(data,node){
        this.breadcrumb = data.name;
        this.deptId = data.id;
        this.searchData()
      },
      // 搜索
      searchData() {
        this.page.current = 1;
        this.gettableData()
      },
      // 分页
      changePage(val) {
        this.page.current = val;
        this.gettableData()
      },

    }
  };
</script>

<style lang='less' scoped>
  @import url("obligation.less");
</style>
