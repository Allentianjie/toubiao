<template>
  <div>
    <div class="M_search">
      名 称：<Input placeholder="名称" v-model="search.cockpitName"  style="width: auto" />
      创建者：<Input placeholder="创建者" v-model="search.createName"  style="width: auto" />
      <el-button icon="el-icon-search" @click="searchBtn" type="primary" size="small">搜 索</el-button>
      <el-button icon="el-icon-delete" @click="emptyBtn" size="small">清 空</el-button>
      <el-button  class="funaddBtn" icon="el-icon-plus" @click="EditData('add')" type="primary" size="small">新增</el-button>
    </div>

    <div class="tableHeight tableHeight3">
      <Table :border="false" height="100%" stripe="false" :tableData="userData"  @ftablePage="fTablePage"></Table>
    </div>

    <div>
      <!-- 新增修改用户框 -->
      <Modal v-model="showModel"  class-name="editUserModal" width="50"  :mask-closable="false" @on-cancel="handleReset('formValidate')">
        <p slot="header" style="color:#fff;text-align:left;font-size: 16px">
          <span>{{title}}</span>
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

          <Row class="addClass">
            <Col span="12">
              <FormItem label="名 称" prop="cockpitName">
                <Input v-model="formValidate.cockpitName" placeholder="请输入名称"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="说 明" prop="remark" >
                <Input v-model="formValidate.remark" placeholder="请输入说明"></Input>
              </FormItem>
            </Col>
          </Row>

          <div v-if ="this.title === '编辑'" class="editClass">
            <Row>
              <Col span="12">
                <FormItem label="创建者">
                  <Input disabled v-model="formValidate.createName"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="创建时间" >
                  <Input disabled v-model="formValidate.createTime"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="修改时间">
                  <Input disabled v-model="formValidate.updateTime"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="状态" >
                  <Input disabled v-model="formValidate.delState"></Input>
                </FormItem>
              </Col>
            </Row>
          </div>

        </Form>
        <div slot="footer">
          <el-button type="primary" :loading="loading" @click="handleSubmit('formValidate')" size="small">
            <span v-if="!loading">确定</span>
            <span v-else>上传中...</span>
          </el-button>

          <el-button @click="handleReset('formValidate')" style="margin-left: 8px" size="small">取消</el-button>
        </div>
      </Modal>
    </div>


    <div style="text-align:left;">
      <!-- 角色 弹框 -->
      <el-dialog  :visible.sync="dialogAuthorizVisible" :close-on-click-modal="false">
        <div slot="title">
          <p style="color: #fff;font-size: 16px;font-weight: 700;">分配角色</p>
        </div>
      <el-table ref="multipleTable" height="100%" :data="rolesData"
        style="min-width: 100%;min-height: 100%" max-height="380"
        @select="handleSelection" @select-all="handleSelection">
      <el-table-column type="selection" prop="roleId" width="55"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleCode" label="角色标识" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" ></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateAuthoriz()">
        更 新
      </el-button>
    </div>
  </el-dialog>

  <!-- 功能模块 弹框 -->
      <div>
        <el-dialog  :visible.sync="dialogFunctionVisible" :close-on-click-modal="false" width="745px">
                <div slot="title">
                  <p style="color: #fff;font-size: 16px;font-weight: 700;">分配功能模块</p>
                </div>
              <el-transfer style="margin:auto;margin-left:5%; display: inline-block" v-model="funcValue" filterable :titles="['模块列表', '已选择']" :data="funcsData" :render-content="renderTransfer"
                :props="{ key: 'funcId', label: 'funcName' }" :format="{ noChecked: '${total}', hasChecked: '${checked}/${total}'}" >
              </el-transfer>
              <div slot="footer" class="dialog-footer" style="padding-right: 35px">
                <el-button type="primary" @click="updateFunction()">
                  更 新
                </el-button>
              </div>
        </el-dialog>
      </div>

      <!-- 预览 -->
      <Modal id="preViewBox" class-name="nz-p" v-model="dialogPreviewVisible" width="100%" :mask-closable="false" @on-cancel="closefeedBack">
        <p slot="header" style="color:#fff;text-align:left;font-size: 16px">
          <span>编辑内容</span>
        </p>
        <div v-bind:style="dialogPreviewStyle">
          <object type="text/html" ref="iframe" v-bind:style="dialogPreviewStyle" v-bind:data="previewUrl" scrolling="no" width="100%" height="100%" frameborder="0">
            <iframe scrolling="no" width="100%" ref="iframe" v-bind:src="previewUrl" v-bind:style="dialogPreviewStyle" height="100%" frameborder="0">
                您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(急速模式)、火狐等主流浏览器。
            </iframe>
          </object>
        </div>
        <div slot="footer" style="text-align: right"></div>
      </Modal>

    </div>
  </div>
</template>
<style>
.nz-p div.ivu-modal div.ivu-modal-content div.ivu-modal-body {
    padding:0px;
}
</style>
<script>
import Table from '@/components/table'
import * as http from '@/api/cockpit/cockpitinfo'
import { listFunc } from '@/api/cockpit/funcmodule'

export default {
  components: {Table},
  name: 'index',
  data () {
    return {
      loading:false,
      dialogAuthorizVisible:false,
      dialogFunctionVisible:false,
      dialogPreviewVisible:false,
      dialogPreviewStyle:'',
      previewUrl:"",
      multipleSelection: [],
      echodataSelection: [],
      cockpitIdSelection:'',
      rolesData: [],
      funcsData: [],
      funcValue:[],
      previewSrc:'',
      renderTransfer(h, option) {
          return  <span>{option.funcName }</span>;
      },
      search:{
        createName: '',
        cockpitName: ''
      },
      formValidate: {
        cockpitId:'',
        cockpitName: '',
        remark: '',
        createName: '', // 创建者
        createTime: '', // 创建时间
        updateTime: '', // 修改时间
        delState: '' // 状态
      },
      ruleValidate: {
        cockpitName: [
            { required: true, message: '驾驶舱名称不能为空', trigger: 'blur' }
        ]
      },
      showModel: false,
      userData: {
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 65,
            align: 'center'
          },{
            title: '名称',
            key: 'cockpitName',
            ellipsis:true,
            tooltip: true,
            // width: 150,
            minWidth:120,
            align: 'left'
          },{
            title: '说明',
            key: 'remark',
            ellipsis:true,
            tooltip: true,
            align: 'left',
            minWidth: 120,
          },{
            title: '创建者',
            key: 'createName',
            tooltip: true,
            width: 100,
            align: 'center'
          },{
            title: '创建时间',
            key: 'createTime',
            ellipsis:true,
            tooltip: true,
            minWidth: 130,
            align: 'center'
          },{
            title: '修改时间',
            key: 'updateTime',
            ellipsis:true,
            tooltip: true,
            minWidth: 130,
            align: 'center'
          },{
            title: '状态',
            key: 'delState',
            align: 'center',
            width: 60,
            render: (h, params) =>{
              let state = params.row.delFlag;
              if (state == '0') {
                return h('div',
                  [h('span',{style:{color:"#19be6b"}},'正常')])
              }else if(state == '1'){
                return h('div',[h('span',{style:{color:"#ed4014"}},"删除")])}
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
                  props: {
                    icon:"ios-create-outline",
                    type: 'text',
                    size: 'small'
                  },
                  style: {color:"#3f7ae6", fontSize:'14px'},
                  on: {
                    click: () => { this.EditData('edit', params) }
                  }
                }, '编辑'),
                // h('span', { style: { color:"#7a7a7a", fontSize:'14px'},},"|"),
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
                    icon:"person-stalker",
                    type: 'text',
                    size: 'small'
                  },
                  style: { color:"#3f7ae6", fontSize:'14px' },
                  on: {
                    click: () => { this.handleAuthoriz(params.row,params.index)}
                  }
                }, '授权'),

                // h('span', { style: { color:"#7a7a7a", fontSize:'14px'},},"|"),

                h('Button', {
                  props: {
                    icon: 'ios-plus-empty',
                    type: 'text',
                    size: 'small'
                  },
                  style: { color:"#3f7ae6", fontSize:'14px' },
                  on: {
                    click: () => { this.handleFunc(params.row,params.index)}
                  }
                }, '功能模块'),

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
                }, '编辑内容'),

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
      this.getList({current:1,size:10}, null);
      this.dialogPreviewStyle = 'min-height:' + window.screen.availHeight + 'px;height:100%;';
  },
  methods: {
    //关闭弹窗
    closefeedBack() {
      this.dialogPreviewVisible = false
    },
    // 获取列表
    getList(page, params) {
        http.fetchList(Object.assign({
          current: page.current,
          size: page.size
        }, params)).then(response => {
          this.userData.total = response.data.data.total
          this.userData.data = response.data.data.records
        })
    },
    // 搜索按钮
    searchBtn(){
      this.getList({current:1,size:10},this.search);
    },
    // 清空按钮
    emptyBtn(){
      this.search.createName=''
      this.search.cockpitName=''
      this.getList({current:1,size:10}, this.search);
    },
    // 新增编辑确认
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        var _this = this;
        if (valid) {
          var title = _this.title;
          if( title === '新增'){
                var name = this.formValidate.cockpitName;
                http.checkCockpitName(name).then(response => {
                    let result = response.data.data
                    if (result !== null) {
                      _this.$Message.error('驾驶舱名称已存在,请重新输入!');
                      _this.formValidate.cockpitName = '';
                    } else {
                        _this.loading = true;
                        http.addObj(_this.formValidate).then(data => {
                            _this.$Message.success('新增成功！');
                            _this.showModel = false
                            _this.getList({current:1,size:10}, null);
                            _this.loading = false;
                        })
                    }
                })
          }else{
            _this.loading = true;
            http.putObj(_this.formValidate).then(data => {
                if(data.data.data == false){
                    _this.$Message.error(data.data.msg);
                }else{
                    _this.$Message.success('编辑成功！');
                    _this.showModel = false
                    _this.getList({current:1,size:10}, null);
                }
                _this.loading = false;
            });
          }
        } else {
          this.$Message.error('请按照要求填写!');
        }
      })
    },
    // 取消新增内容
    handleReset (name) {
      this.showModel = false
      if(this.title === '新增'){
        this.$refs[name].resetFields();
      }
    },
    // 新增、修改
    EditData (type, params) {
      this.title = (type === 'add' ? '新增' : '编辑');
      if(type === 'edit') {
        this.formValidate.cockpitId = params.row.cockpitId;
        this.formValidate.cockpitName = params.row.cockpitName
        this.formValidate.remark = params.row.remark
        this.formValidate.createName = params.row.createName
        this.formValidate.createTime = params.row.createTime
        this.formValidate.updateTime = params.row.updateTime
        this.formValidate.delState = params.row.delState
      }else{
        this.formValidate.cockpitName = ''
        this.formValidate.remark = ''
      }
      this.showModel = true
    },
    // 删除
    remove(p) {
		    let cockpitId = p.row.cockpitId;
        if(cockpitId == 1){
            this.$message({message: '抱歉，该驾驶舱不可删除！',type: 'warning'});
            return;
        }
        let _this = this
        this.$confirm('是否确认删除名称为"' + p.row.cockpitName + '"的记录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(function() {
            return http.delObj(p.row.cockpitId);
        }).then(data => {
           _this.userData.total = (_this.userData.total - 1);
           _this.userData.data.splice(p.index, 1);
           _this.$Message.success('删除成功！');
        }).catch(function(err) { })
    },
    fTablePage (pageData) { // 分页
      //this.tableSearch = {...this.tableSearch, ...pageData}
       //分页查询
      var pageParam = {current:pageData.current,size:pageData.pageSize}
      this.getList(pageParam, null)
    },
    /**
      * 驾驶舱授权
      */
    handleAuthoriz(row,index){
      //请求角色列表
      this.echodataSelection = [];
      this.multipleSelection = [];
      this.cockpitIdSelection = row.cockpitId;
      //角色列表
      http.roleList().then(response => {
          this.rolesData = response.data.data;
      })
      //授权信息
      var this_ = this;
      http.getAuthorizeList(row.cockpitId).then(response => {
          var echoData = response.data.data;
          if(echoData.length > 0){
              echoData.map(function(value,index){
                this_.rolesData.map(function(val,i){
                    if (val.roleId == value.roleId) {
                        this_.echodataSelection.push(val);
                        this_.multipleSelection.push(val);//选中
                    }
                })
              });
          }
          //回显
          this_.$nextTick(function(){
              this_.echodataSelection.forEach(row => {
                  this_.$refs.multipleTable.toggleRowSelection(row,true);
              })
          });
      })
      this_.$nextTick(function(){
         this_.dialogAuthorizVisible = true;
      })
    },
    /**
      * 表格选中
      */
    handleSelection(selection) {
        var hash = [];
        selection.forEach(row => {
          if(hash.indexOf(row)==-1){
              hash.push(row);
          }
        })
        this.multipleSelection = hash;
    },
    /**
      * 更新授权
      */
    updateAuthoriz(){
        //保存授权信息
        var this_ = this;
        var roleIds = [];
        this.multipleSelection.forEach(row => {
            roleIds.push(row.roleId);
        })
        var submit = {'cockpitId': this_.cockpitIdSelection,'roleIds':roleIds};
        //提交数据
        http.saveAuthorizeList(submit).then(response => {
          this_.dialogAuthorizVisible = false;
          this_.$message({message: '更新成功',type: 'success'});
        });
        this.echodataSelection = [];
    },
     /**
      * 功能模块
      */
    handleFunc(row,index){
        var this_ = this;
        this_.cockpitIdSelection = row.cockpitId;
        this_.funcValue = [];
        //请求功能模块数据
        listFunc().then(response => {
            this_.funcsData = response.data.data;
        })
        //请求回显数据
        http.getFuncList(row.cockpitId).then(response => {
          var echoData = response.data.data;
          if(echoData.length > 0){
              //回显
              this_.$nextTick(function(){
                  echoData.forEach(row => {
                      this_.funcValue.push(row.funcId);
                  });
              });
          }
        });
        this_.$nextTick(function(){
             this_.dialogFunctionVisible = true;
        })
    },
    /**
      * 更新功能模块
      */
    updateFunction(){
        var this_ = this;
        var submit = {'cockpitId': this.cockpitIdSelection ,'funcIds': this_.funcValue};
        http.saveFuncList(submit).then(response => {
          this_.dialogFunctionVisible = false;
          this_.$message({
              message: '更新成功',
              type: 'success'
            });
        });
    },
    /**
     * 编辑预览
     */
    preview(params){
        var name = escape(params.row.cockpitName);
        var id = params.row.cockpitId;
        var url = '/static/dragging/index.html?from=cockpit&cockitId=' + id + '&name=' + name;
        this.previewUrl = url;
        this.dialogPreviewVisible = true;
    }
  }
}
</script>

<style lang="less" scoped>
  .el-transfer-panel{
    width:270px;
  }
  .editUserModal .ivu-modal{
    top:120px;
  }

  .ivu-modal-body{
    padding: 0px;
  }
  .editUserModal{
    .ivu-modal-body{
      padding-right: 5%;
    }
    .ivu-modal-footer{
      padding-right: 5%;
    }
  }
  .preview_ifame{
     div.el-dialog__header{
        padding:0px 0px 0px;
        button.el-dialog__headerbtn{
            top: 8px;
            right: 15px;
            font-size: 25px;
            i{
              color:#1b1a1a;
            }

        }
     }
     div.el-dialog__body {
        padding: 0;
        font-size: 14px;
        /*height: 100%;*/
    }
  }
.nz-p{
  .ivu-modal{
    .ivu-modal-content{
      .ivu-modal-body {
         padding:0px;
      }
    }
  }
}
</style>
