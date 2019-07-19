<template>
  <div>

    <!-- 表格 -->
    <div class="tableHeight tableHeight5">
      <Tabs type="card" :animated="false"  @on-click="tabClick" v-model="tab.active">
        <TabPane v-for="(item,i) in tab.layData" :name="item" :label="item" :key="i"></TabPane>
      </Tabs>
      <Table v-loading="tableLoading" :border="false" height="100%" stripe="false" :tableData="userData"  @ftablePage="fTablePage"></Table>
    </div>

    <!-- 编辑基本信息 start -->
    <el-dialog  :visible.sync="dialogSaveVisible" :close-on-click-modal="false">
      <p slot="title">
        <span>编辑</span>
      </p>
      <el-form ref="inForm"  :rules="ruleValidate" :model="formValidate">
        <el-form-item label="报告名称" prop="reportName">
          <el-input v-model="formValidate.reportName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="enableFlag">
          <el-radio-group v-model="formValidate.enableFlag">
            <el-radio border label="0">正常</el-radio>
            <el-radio border label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <Tabs :animated="false"  @on-click="tempTabClick" v-model="temTab.active">
            <TabPane v-for="(item,i) in temTab.layData" :name="item.value" :label="item.label" :key="i"></TabPane>
          </Tabs>
          <i-table :border="false" height="260" size="small"
                   :show-header="true"
                   :columns="templateData.columns"
                   :data="templateData.data"></i-table>
          <small>关联模版才能展示！当前选中模版:
            <strong style="color: #16dc26;font-size: 16px;">
            {{selectTempName}}
            </strong>
          </small>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSaveVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 预览 -->
    <Modal v-model="dialogPreviewVisible" class-name="perModal"  width="80%" :mask-closable="false" @on-cancel="closefeedBack">
      <p slot="header" style="color:#fff;text-align:left;font-size: 16px">
        <span>查看并下载</span>
      </p>
      <div style="height:700px">
        <object type="text/x-scriptlet" ref="iframe" v-bind:data="previewUrl" scrolling="no" width="100%" height="100%" frameborder="0">
            <iframe ref="iframe" v-bind:src="previewUrl" scrolling="no" width="100%" height="100%" frameborder="0">
                您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(急速模式)、火狐等主流浏览器。
            </iframe>
        </object>
      </div>
      <div slot="footer" style="text-align: right">
        <Button type="primary" size="large" @click="closeDownload">下载或打印</Button>
        <Button type="primary" size="large" @click="closefeedBack">关闭</Button>
      </div>
    </Modal>


</div>
</template>
<style>
.el-transfer-panel{
    width:270px;
}
.perModal .ivu-modal{
    top:60px;
}
</style>
<script>
import Table from '@/components/table'
import * as http from '@/api/analysis/report'
import * as tempHttp from '@/api/analysis/template'
import * as api from '@/api/analyze/index'
import { remote } from '@/api/admin/dict'

export default {
  components: {Table},
  name: 'index',
  data () {
    return {
      loading:false,
      tableLoading:false,
      dialogPreviewVisible:false,
      dialogSaveVisible:false,
      previewUrl:"",
      tab: {
         active: '',
         layData: []
      },
      temTab: {
         active: '',
         layData: []
      },
      formValidate: {
        reportId:'',
        reportName: '',
        templateId: '',
        hieId:'',
        levelId:'',
        enableFlag: '' // 状态
      },
      ruleValidate: {
        reportName: [
            { required: true, message: '报告名称不能为空', trigger: 'blur' }
        ]
      },
      showModel: false,
      selectTempId:'',
      selectTempName:'',
      templateData: {
        columns: [
          {
            title: '序号',
            align: 'center',
            width:65,
            render: (h, params) => {
              let flag = false;
              let that = this
              if (that.selectTempId === params.row.templateId) {
                  that.selectTempName = params.row.templateName
                  flag = true
              }else{
                  flag = false
              }
              return h('div', [
                h('Radio', {
                  props:{ value: flag},
                  on: {
                      'on-change': () => {
                            that.selectTempId = params.row.templateId
                            that.selectTempName = params.row.templateName
                        }
                      }
                  })
              ])
            }
          },{
            title: '名称',
            key: 'templateName',
            ellipsis:true,
            align: 'left'
          },{
            title: '说明',
            key: 'remark',
            ellipsis:true,
            align: 'left',
          }
        ],
        data: [] ,
      },
      userData: {
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 60,
            align: 'center'
          },{
            title: '名称',
            key: 'name',
            ellipsis:true,
            tooltip: true,
            minWidth: 250,
            align: 'left',
            render: (h, params) =>{
              //不等于空，取 reportName
              if(params.row.reportName){
                  return h('span',[h('span',{},params.row.reportName)])
              }else{
                  let hieName = params.row.hieName;
                  let levelName = params.row.levelName;
                  let startTime = params.row.startTime;
                  let endTime = params.row.endTime;
                  var name = (hieName + levelName + '层面' + startTime + '~' + endTime + '质量分析报告');
                  return h('span',[h('span',{},name)])
              }
            }
          },{
            title: '开始时间',
            key: 'startTime',
            ellipsis:true,
            tooltip: true,
            align: 'center',
            width: 80,
          },{
            title: '结束时间',
            key: 'endTime',
            tooltip: true,
             width: 80,
            align: 'center'
          },{
            title: '关联模版',
            key: 'hasTemplate',
            ellipsis:true,
            tooltip: true,
            align: 'center',
            render: (h, params) =>{
              let hasTemplate = params.row.hasTemplate;
              if (hasTemplate) {
                return h('div',[h('span',{style:{color:"#19be6b"}},'查看')])
              }else{
                return h('div',[h('span',{style:{color:"#ed4014"}},"无")])
              }
            }
          },{
            title: '状态',
            key: 'enableFlag',
            align: 'center',
            width: 60,
            render: (h, params) =>{
              let state = params.row.enableFlag;
              if (state == '0') {
                return h('div',[h('span',{style:{color:"#19be6b"}},'正常')])
              }else if(state == '1'){
                return h('div',[h('span',{style:{color:"#ed4014"}},"禁用")])
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [

                h('Button', {
                  props: {icon:"ios-create-outline",type: 'text',size: 'small'},
                  style: {color:"#3f7ae6", fontSize:'14px'},
                  on: { click: () => { this.dialogSaveShow(params); }}
                }, '编辑'),

                h('Button', {
                  props: {
                    icon:"ios-search-strong",
                    type: 'text',
                    size: 'small'
                  },
                  style: { color:"#3f7ae6", fontSize:'14px' },
                  on: {
                    click: () => { this.preview(params) }
                  }
                }, '预览'),

              ]);
            }
          }
        ],
        data: [] ,
        total: 0
      },
      title: '新增',
    }
  },
  created(){
      //this.getList({current:1,size:10}, null);
      this.getTabsData();
      this.getTempTabs();
  },
  methods: {
    //关闭弹窗
    closefeedBack() {
      this.dialogPreviewVisible = false
    },
    //下载或打印
    closeDownload(){
      this.$refs.iframe.contentWindow.downloadPdf();
    },
    //获取tab数据
    getTabsData(){
      var that = this;
      api.getLevels().then(response => {
          that.tab.layData = response.data.data;
          that.tab.active = response.data.data[0];
          that.$nextTick(function(){
              that.getList({current:1,size:10}, that.tab.active)
          });
      });
    },

    //获取层面
    getTempTabs(){
      var _this = this;
      remote('lay_type').then(response => {
          _this.temTab.layData = response.data.data;
          _this.temTab.active = response.data.data[0].value;
          _this.getTemlList(_this.temTab.active);
      });
    },

    // 获取模版列表
    getTemlList(params) {
        var that = this
        tempHttp.fetchList(Object.assign({current:1,size:500}, {layType:params})).then(response => {
          if(response.data.data.records.length > 0){
              response.data.data.records.forEach(element => {
                if(element.enableFlag == 0){
                  that.templateData.data.push(element);
                }
              });
          }
        })
    },

    // 获取列表
    getList(page, levelName) {
        this.tableLoading = true
        http.fetchList(Object.assign({
          current: page.current,
          size: page.size
        },{'levelName':levelName})).then(response => {
          this.userData.total = response.data.data.total
          this.userData.data = response.data.data.records
          this.tableLoading = false
        })
    },

    //tab点击事件
    tabClick(tabs) {
        var that = this
        that.userData.total = 0
        that.userData.data = []
        that.getList({current:1,size:10}, that.tab.active ) ;
    },
    //模版切换
    tempTabClick(){
        this.templateData.data = [];
        this.getTemlList(this.temTab.active)
    },
    //显示编辑弹框
    dialogSaveShow(params){
        var reportName = params.row.reportName;
        if(this.isEmpty(reportName)){
          let hieName = params.row.hieName;
          let levelName = params.row.levelName;
          let startTime = params.row.startTime;
          let endTime = params.row.endTime;
          reportName = (hieName + levelName + '层面' + startTime + '~' + endTime + '质量分析报告');
        }
        this.formValidate.reportId = params.row.reportId;
        this.formValidate.reportName = reportName;
        this.formValidate.templateId = params.row.templateId;
        this.formValidate.enableFlag = params.row.enableFlag;
        this.formValidate.hieId = params.row.hieId;
        this.formValidate.levelId = params.row.levelId;
        this.selectTempId = params.row.templateId;
        this.selectTempName = params.row.templateName;
        this.dialogSaveVisible = true
    },

    // 新增编辑确认
    handleSubmit () {
      this.$refs['inForm'].validate((valid) => {
        var that = this;
        if (valid) {
            if(that.isEmpty(that.selectTempId)){
                that.$Message.error('请选择模版~');
                return
            }
            that.formValidate.templateId = that.selectTempId;
            http.saveBase(that.formValidate).then(response => {
                if(response.data.code == 0){
                    that.$Message.success('编辑成功~');
                }else{
                    that.$Message.error(response.data.msg);
                }
                that.dialogSaveVisible = false
                that.getList({current:1,size:10}, that.tab.active ) ;
            });


        }
      })
    },

    fTablePage (pageData) { // 分页
      //this.tableSearch = {...this.tableSearch, ...pageData}
       //分页查询
      var pageParam = {current:pageData.current,size:pageData.pageSize}

      this.getList(pageParam, this.tab.active )
    },
    /**
     * 编辑预览
     */
    preview(params){
        var that = this
        var reportId =  params.row.reportId;
        var templateId = params.row.templateId;
        if(that.isEmpty(reportId) || that.isEmpty(templateId)){
          that.$Message.error('请先关联模版~');
          return false;
        }
        this.dialogPreviewVisible = true
        this.previewUrl= '/static/template/reportView.html?reportId='+ reportId;
    },

    //判断是否为空
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
          return true;
      }else{
          return false;
      }
    },

  }
}
</script>

<style lang="less">
  .editUserModal{
    .ivu-modal-body{
      padding-right: 5%;
    }
    .ivu-modal-footer{
      padding-right: 5%;
    }
  }
</style>
