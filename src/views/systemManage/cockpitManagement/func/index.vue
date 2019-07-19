<template>
  <div>
      <div class="M_search">
          名 称：<Input placeholder="名称" v-model="search.funcName"  style="width: auto" />
          创建者：<Input placeholder="创建者" v-model="search.createName"  style="width: auto" />
         <!-- <Button type="primary" icon="ios-search"  @click="searchBtn">搜 索</Button>
          <Button icon="ios-trash"  @click="emptyBtn">清 空</Button>-->
        <el-button icon="el-icon-search" @click="searchBtn" type="primary" size="small">搜 索</el-button>
        <el-button icon="el-icon-delete" @click="emptyBtn" size="small">清 空</el-button>
        <el-button class="funaddBtn" icon="el-icon-plus" @click="EditData('add')" type="primary" size="small">新增</el-button>
      </div>
      <div class="tableHeight tableHeight3">
           <Table :tableData="userData"  @ftablePage="fTablePage" ></Table>
      </div>
      <div>
      <!-- 新增修改用户框 -->
      <Modal v-model="showModel" class-name="editUserModal" width="50"  :mask-closable="false" @on-cancel="handleReset('formValidate')">
        <p slot="header" style="color:#fff;text-align:left;font-size: 16px">
          <span>{{title}}</span>
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Row>
            <Col span="12">
              <FormItem label="名  称" prop="funcName" >
                <Input v-model="formValidate.funcName" placeholder="请输入模块名称"></Input>
              </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="说  明" prop="remark" >
                  <Input v-model="formValidate.remark"></Input>
                </FormItem>
            </Col>
          </Row>
          <div v-if ="this.title === '编辑'" class="editClass">
          <Row>
              <Col span="12">
                <FormItem label="功能标记"  prop="funcSign">
                  <i-select :model.sync="formValidate.funcSign" v-model="formValidate.funcSign">
                      <i-option value="110">系统内置</i-option>
                      <i-option value="111">用户创建</i-option>
                  </i-select>

                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="创建者" prop="createName">
                  <Input disabled v-model="formValidate.createName"></Input>
                </FormItem>
              </Col>
            </Row>
          <Row>
              <Col span="12">
                <FormItem label="创建时间" prop="createTime" >
                  <Input disabled v-model="formValidate.createTime"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="修改时间" prop="updateTime">
                  <Input disabled v-model="formValidate.updateTime"></Input>
                </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span="12">
                <FormItem label="状态" prop="delState">
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

  </div>
</template>

<script>
  import Table from '@/components/table'
  import * as http from '@/api/cockpit/funcmodule'

  export default {
    components: {Table},
    name: 'index',
    data () {
      return{
        loading:false,
        search : {
          createName: '',
          funcName: ''
        },
        formValidate: {
          funcId: '',
          funcName: '',
          funcSign: '',
          remark: '',
          createName: '',
          createTime: '', // 创建时间
          updateTime: '', // 修改时间
          delState: '' // 状态
        },
        ruleValidate: {
          funcName: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ]
        },
        showModel: false,
        userData: {
          columns: [
            {
              title: '序号',
              type: 'index',
              width: 55,
              align: 'center'
            },{
              title: '模块名称',
              key: 'funcName',
              align: 'left',
              tooltip: true,
              ellipsis:true,
            },
            {
              title: '标  记',
              key: 'funcSign',
              width: 90 ,
               render: (h, params) =>{
                let state = params.row.funcSign;
                if (state == '110') {
                  return h('div',[h('span',{style:{}},'系统内置')]);
                }else if(state == '111'){
                  return h('div',[h('span',{style:{}},"用户自建")]);
                }
              }
            },
            {
              title: '说明',
              key: 'remark',
              tooltip: true,
              ellipsis:true,
            },
            {
              title: '创建者',
              key: 'createName',
              width: 60,
              tooltip: true,
              ellipsis:true,
            },
            {
              title: '创建时间',
              key: 'createTime',
              tooltip: true,
              ellipsis:true,
            },
            {
              title: '修改时间',
              key: 'updateTime',
              ellipsis:true,
              tooltip: true
            },
            {
              title: '状态',
              key: 'delFlag',
              width: 60,
              render: (h, params) =>{
                let state = params.row.delFlag;
                if (state == '0') {
                  return h('div',
                    [h('span',{style:{color:"#19be6b"}},'启用')])
                }else if(state == '1'){
                  return h('div',[h('span',{style:{color:"#ed4014"}},"删除")])}
              }
            },
            {
              title: '操作',
              key: 'action',
              width: 200,
              align: 'center',
              render: (h, params) => {
                return h('div', [

                  h('Button', {
                    props: {icon:"ios-create-outline",type: 'text',size: 'small'},
                    style: {color:"#3f7ae6",fontSize:'14px'},
                    on: {click: () => {this.EditData('edit', params)}}}, '编辑'),

                  h('Button', {
                    props: {icon:"ios-trash-outline",type: 'text',size: 'small'},
                    style: {color:"#f04409",fontSize:'14px'},
                    on: {click: () => { this.remove(params)}}
                  }, '删除'),
                ]);
              }
            }

          ],
          data: [],
          total: 0
        },
        title: '新增',
      }
    },
    created(){
      this.getList({current:1,size:10}, null);
    },
    methods: {
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
        this.search.funcName=''
        this.getList({current:1,size:10}, this.search);
      },
      // 新增确认
      handleSubmit (name) {
        var _this = this;
        let title = this.title;
        this.$refs[name].validate((valid) => {
          if (valid) {
            if( title === '新增'){
                  var name = _this.formValidate.funcName;
                  http.checkFuncName(name).then(response => {
                      let result = response.data.data
                      if (result !== null) {
                        _this.$Message.error('模块名称已存在,请重新输入!');
                        _this.formValidate.funcName = '';
                      } else {
                          _this.loading = true;
                          _this.formValidate.funcSign = 110;//默认系统内置 111 为用户自建
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
        });
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
        let that = this
        this.title = type === 'add' ? '新增' : '编辑'
        if(type === 'edit') {
          this.formValidate.funcId = params.row.funcId
          this.formValidate.funcName = params.row.funcName
          this.formValidate.remark = params.row.remark
          //this.formValidate.funcSign = (params.row.funcSign == '110' ? '系统内置' : '用户自建')
          this.formValidate.funcSign = params.row.funcSign
          this.formValidate.createName = params.row.createName
          this.formValidate.createTime = params.row.createTime
          this.formValidate.updateTime = params.row.updateTime
          this.formValidate.delState = params.row.delState
        }else {
          this.$refs['formValidate'].resetFields();
        }
        this.showModel = true
      },
      // 删除
      remove(p) {
        var _this = this
        this.$confirm('是否确认删除名称为"' + p.row.funcName + '"的记录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(function() {
            return http.delObj(p.row.funcId);
        }).then(data => {
           _this.userData.total = (_this.userData.total - 1);
           _this.userData.data.splice(p.index, 1);
           _this.$Message.success('删除成功！');
        }).catch(function(err) { })
      },
      fTablePage (pageData) { // 分页
        this.tableSearch = {...this.tableSearch, ...pageData}
        //分页查询
        var pageParam = {current:pageData.current,size:pageData.pageSize}
        this.getList(pageParam, null)
      },
    }
  }
</script>

<style lang="less" scoped>

</style>

