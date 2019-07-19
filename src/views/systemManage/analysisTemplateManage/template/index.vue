<template>
  <div>
    <div class="M_search">
      名 称：<Input placeholder="名称" v-model="search.templateName"  style="width: auto" />
      <el-button icon="el-icon-search" @click="searchBtn" type="primary" size="small">搜 索</el-button>
      <el-button icon="el-icon-delete" @click="emptyBtn" size="small">清 空</el-button>
      <el-button class="funaddBtn" icon="el-icon-plus" @click="addData()" type="primary" size="small">新增</el-button>
    </div>

    <!-- start -->
    <div class="tableHeight tableHeight4">
      <!-- 层面 v-model="tab.active" -->
      <Tabs type="card" :animated="false"  @on-click="tabClick" v-model="tab.active">
        <TabPane v-for="(item,i) in tab.layData" :name="item.value" :label="item.label" :key="i">
        </TabPane>
      </Tabs>
      <Table v-loading="tableLoading" :border="false" height="100%" stripe="false" :tableData="userData"  @ftablePage="fTablePage"></Table>
    </div>
    <!-- end -->

    <!-- 新增基本信息 start -->
    <el-dialog :visible.sync="dialogInsertVisible" :close-on-click-modal="false">
      <p slot="title">
        <span>{{title}}</span>
      </p>
      <el-form ref="inForm"  :rules="insertRules" :model="saveBase">
        <el-form-item label="模版名称" prop="templateName">
          <el-input v-model="saveBase.templateName"></el-input>
        </el-form-item>
        <el-form-item label="模板说明">
          <el-input type="textarea" row="5" v-model="saveBase.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="enableFlag">
          <el-radio-group v-model="saveBase.enableFlag">
            <el-radio border label="0">正常</el-radio>
            <el-radio border label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInsertVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增基本信息 end -->

    <!-- 预览 -->
    <Modal v-model="dialogPreviewVisible" class-name="perModal" style="top:60px;" width="80%" :mask-closable="false" @on-cancel="closefeedBack">
      <p slot="header" style="color:#fff;text-align:left;font-size: 16px">
        <span>{{modalTitle}}</span>
      </p>
      <div v-bind:style="dialogPreviewStyle">
        <object ref="iframe" type="text/html" v-bind:data="previewUrl" v-bind:style="dialogPreviewStyle" scrolling="no" width="100%" height="100%" frameborder="0">
            <iframe ref="iframe" v-bind:src="previewUrl" v-bind:style="dialogPreviewStyle" scrolling="no" width="100%" height="100%" frameborder="0">
                您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(急速模式)、火狐等主流浏览器。
            </iframe>
        </object>
      </div>
      <div slot="footer" style="text-align: right">
        <Button type="primary" size="large" v-if="modalTitle == '编辑内容'" @click="closeUpdate">更新</Button>
        <Button type="primary" size="large" @click="closefeedBack">关闭</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import Table from '@/components/table'
import * as http from '@/api/analysis/template'
import { remote } from '@/api/admin/dict'
export default {
  components: {Table},
  name: 'index',
  data () {
    return {
      loading:false,
      tableLoading:false,
      modalTitle:'编辑内容',
      search:{
         templateName: ''
      },
      tab: {
        active: '',
        layData: []
      },
      showModel: false,
      dialogPreviewStyle:'',
      dialogInsertVisible:false,
      dialogPreviewVisible:false,
      previewUrl:'',
      saveBase:{
          templateName:'',
          templateId:'',
          remark:'',
          enableFlag:'0',
          layType:'',
      },
      insertRules:{
          templateName: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
      },
      userData: {
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 55,
            align: 'center'
          },{
            title: '名称',
            key: 'templateName',
            ellipsis:true,
            tooltip: true,
            width: 120,
            align: 'center'
          },{
            title: '说明',
            key: 'remark',
            ellipsis:true,
            tooltip: true,
            align: 'center',
            width: 120,
          },{
            title: '创建时间',
            key: 'createTime',
            ellipsis:true,
            tooltip: true,
            align: 'center'
          },{
            title: '修改时间',
            key: 'updateTime',
            ellipsis:true,
            tooltip: true,
            align: 'center'
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
            width: 340,
            align: 'center',
            render: (h, params) => {
              return h('div', [

                h('Button', {
                  props: { icon:"ios-create-outline",type: 'text', size: 'small'},
                  style: {color:"#3f7ae6", fontSize:'14px'},
                  on: { click: () => { this.editData('info', params) }}
                }, '编辑内容'),

                h('span', { style: { color:"#7a7a7a", fontSize:'14px'},},"|"),

                h('Button', {
                  props: { icon:"ios-create-outline",type: 'text', size: 'small'},
                  style: {color:"#3f7ae6", fontSize:'14px'},
                  on: { click: () => { this.editData('base', params) }}
                }, '编辑基本信息'),

                h('span', { style: { color:"#7a7a7a", fontSize:'14px'},},"|"),


                h('Button', {
                  props: {
                    icon:"ios-trash-outline",
                    type: 'text',
                    size: 'small'
                  },
                  style: { color:"#f04409", fontSize:'14px' },
                  on: {
                    click: () => { this.remove(params) }
                  }
                }, '删除'),
                // h('span', { style: { color:"#7a7a7a", fontSize:'14px'},},"|"),

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
      this.getLayType();
      this.dialogPreviewStyle = 'min-height:' + (window.screen.availHeight - 220) + 'px;height:100%;';
  },
  methods: {
      //关闭弹窗
      closefeedBack() {
          this.dialogPreviewVisible = false
      },
      //更新内容
      closeUpdate(){
          this.$refs.iframe.contentWindow.apiSave();
      },
      //获取层面
      getLayType(){
          var _this = this;
          remote('lay_type').then(response => {
              _this.tab.layData = response.data.data;
              _this.tab.active = response.data.data[0].value;
              _this.getList({current:1,size:10},{layType:_this.tab.active});
          });
      },
      // 获取列表
      getList(page, params) {
          var that = this
          that.tableLoading = true;
          http.fetchList(Object.assign({
            current: page.current,
            size: page.size
          }, params)).then(response => {
            this.userData.total = response.data.data.total
            this.userData.data = response.data.data.records
            that.tableLoading = false;
          })
      },
      //tab点击事件
      tabClick(tabs) {
          this.search.layType = tabs;
          this.baseData = [];
          this.getList({current:1,size:10},{layType:tabs})
      },
      //新增
      addData(){
          this.dialogInsertVisible = true;
          this.title = '新增信息'
          this.saveBase.templateId = '';
          this.saveBase.templateName = ''
          this.saveBase.remark=''
          this.saveBase.enableFlag  = '0'
          this.saveBase.layType =  this.tab.active
      },
      //编辑
      editData(type,params){
          if(type == 'base'){
            this.title = '编辑信息'
            this.saveBase.templateId = params.row.templateId;
            this.saveBase.templateName = params.row.templateName
            this.saveBase.remark= params.row.remark
            this.saveBase.enableFlag  =  params.row.enableFlag
            this.saveBase.layType =  this.tab.active
            this.dialogInsertVisible = true;
          }else{
            this.dialogPreviewVisible = true
            this.modalTitle = '编辑内容'
            this.previewUrl= '/static/template/index.html?templateId='+ params.row.templateId +
                              '&templateName=' + escape(params.row.templateName) +
                              '&layType=' + this.tab.active +
                              '&enableFlag=' + params.row.enableFlag;
          }
      },
      //提交数据
      submitForm() {
          var that = this;
          this.$refs['inForm'].validate((valid) => {
              if(valid) {
                http.addBase(that.saveBase).then(response => {
                    that.dialogInsertVisible = false;
                    if(response.data.code == 0){
                        that.$Message.success('新增成功~');
                        that.getList({current:1,size:10},{layType:that.tab.active})
                    }else{
                        that.$Message.error(response.data.msg);
                    }
                });
              } else {
                return false;
              }
          });
      },
      //删除
      remove(params){
          var that = this;
          this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
              confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
            }).then(() => {
              http.delObj( params.row.templateId).then(response =>{
                  if(response.data.code == 0){
                      that.$message({type: 'success',message: '删除成功!'});
                      that.userData.data.splice(params.index, 1);
                  }else{
                      that.$message({type: 'error',message: response.data.msg});
                  }
              })
            }).catch(() => {
              this.$message({type: 'info',message: '已取消删除'});
          });
      },
      // 搜索按钮
      searchBtn(){
          var params = {
            layType:this.tab.active,
            templateName: this.search.templateName
          };
          this.getList({current:1,size:10},params);
      },
      // 清空按钮
      emptyBtn(){
          this.search.templateName=''
          var params = {
            layType:this.tab.active,
          };
          this.getList({current:1,size:10}, params);
      },
      // 预览
      preview(data){
          this.dialogPreviewVisible = true
          this.modalTitle = '预览模版';
          this.previewUrl= '/static/template/view.html?templateId='+ data.row.templateId;
      },
      fTablePage (pageData) { // 分页
          //分页查询
          var pageParam = {current:pageData.current,size:pageData.pageSize}
          var params = {
            layType:this.tab.active,
            templateName: this.search.templateName
          };
          this.getList(pageParam, params)
      },
  }
}
</script>
<style lang="less">
  @import url('index.less');
</style>
