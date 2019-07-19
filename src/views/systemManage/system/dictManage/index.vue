<template>
  <div class="execution">
    <div class="M_search">
      标签名：<Input placeholder="请输入标签名" v-model="params.label"  style="width: auto" />
      类型：<Input placeholder="请输入类型" v-model="params.type"  style="width: auto" />
      <el-button icon="el-icon-search" @click="searchChange" type="primary" size="small">搜 索</el-button>
      <el-button icon="el-icon-delete" @click="emptySearch" size="small">清 空</el-button>
      <el-button type="primary" @click="handleAdd" icon="el-icon-plus" size="small">新 增</el-button>
    </div>
    <div class="tableHeight2">
      <el-table :data="tableData"  height="100%" v-loading="tableLoading"
                style="min-width: 100%;min-height: 100%" fit highlight-current-row>
      <el-table-column fixed type="index" label="序号" width="65" align="center"></el-table-column>
      <el-table-column fixed prop="value" label="数据值" min-width="90" align="center"></el-table-column>
      <el-table-column  prop="label" label="标签名" width="120" align="center"></el-table-column>
      <el-table-column  prop="type" label="类型" width="140" align="center"></el-table-column>
      <el-table-column  prop="description" label="描述" min-width="130" align="center"></el-table-column>
      <el-table-column  prop="remarks" label="备注" width="180" align="center"></el-table-column>
      <el-table-column  prop="createTime" label="创建时间" width="160" align="center"></el-table-column>
      <el-table-column fixed="right" width="140"  label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     icon="el-icon-edit"
                     size="mini"
                     plain
                     @click="handleEdit(scope.row,scope.index)">编辑</el-button>
          <!--f04409-->
          <el-button type="text"
                     icon="el-icon-delete"
                     size="mini"
                     style="color:#f04409"
                     plain
                     f04409
                     @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

      <div class="pagination-container" style="text-align: right">
      <el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="page.currentPage"
                     :page-size="page.pageSize" layout="total, prev, pager, next" :total="page.total">
      </el-pagination>
    </div>
    <!-- 新增数据字典 -->
    <Modal v-model="showModel" class-name="dictModal" width="50" :mask-closable="false" @on-cancel="handleReset()">
      <p slot="header">
        <span>{{title}}</span>
      </p>
      <Form ref="addForm" :model="addForm"  :label-width="80">
        <Row class="addClass">
          <Col span="12">
            <FormItem label="数据值" prop="value">
              <Input v-model="addForm.value" placeholder="请输入数据值"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="标签名" prop="label">
              <Input v-model="addForm.label" placeholder="请输入标签名"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="类型" prop="type" >
              <Input v-model="addForm.type" placeholder="请输入类型"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="排序" prop="sort">
              <Input v-model="addForm.sort" placeholder="请输入排序"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="描述" prop="description">
              <Input  v-model="addForm.description" placeholder="请输入描述"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注" prop="remarks">
              <Input  v-model="addForm.remarks" placeholder="请输入备注"></Input>
            </FormItem>
          </Col>
          <!--<Col span="12">
            <FormItem label="是否系统" prop="sysFlag" >
              <Select  v-model="addForm.sysFlag" placeholder="请选择类型">
                <Option value="0">是</Option>
                <Option value="1">否</Option>
              </Select>
            </FormItem>
          </Col>-->
          <Col span="12">
            <FormItem label="是否系统" prop="sysFlag" >
              <el-switch
                v-model="sysFlag"
                active-color="#2d8cf0"
                inactive-color="#ccc">
              </el-switch>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="basisFooter">
        <div class="btn">
          <el-button @click="handleSave()" type="primary" size="small" v-if="title=='新增'">保存</el-button>
          <el-button @click="handleUpdate()" type="primary" size="small" v-else>保存</el-button>
          <el-button  @click="handleReset()" style="margin-left: 8px" size="small">取消</el-button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {addObj, delObj, fetchList, putObj} from '@/api/admin/dict'

  export default {
    name: 'dict',
    data() {
      return {
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableLoading: false,
        params:{
          label: null,
          type: null
        },
        title:'新增',
        showModel:false,
        addForm:{
          id: null,
          value: '',
          type: '',
          label: '',
          description: '',
          remarks: '',
          sort: 0,
          sysFlag: 0
        },
        sysFlag: true
      }
    },
    created() {
    },
    mounted: function () {
      this.getList(this.page,this.params);
    },
    methods: {
      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      /**
       * @title 打开新增窗口
       * @detail 调用crud的handleadd方法即可
       *
       **/
      handleAdd: function () {
        this.showModel = true;
        this.title = '新增';
        this.addForm = {id: null, value: '', type: '', label: '', description: '', remarks: '', sort: 0, sysFlag: 0}
        this.sysFlag = true;
      },
      handleEdit(row) {
        this.showModel = true;
        this.title = '修改';
        this.addForm = {id: row.id, value: row.value, type: row.type, label: row.label, description: row.description, remarks: row.remarks, sort: row.sort, sysFlag: row.sysFlag}
        this.sysFlag = row.sysFlag == 0 ? true : false;
        },
      handleReset () {
        this.showModel = false
        this.addForm = {id: null, value: '', type: '', label: '', description: '', remarks: '', sort: 0, sysFlag: 0};
      },
      handleDel: function (id) {
        var _this = this
        this.$confirm('是否确认删除标签名为"' + row.label + '",数据类型为"' + row.type + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(id)
        }).then(() => {
          this.getList(this.page)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        }).catch(function () {
        })
      },
      /**
       * 字典更新
       **/
      handleUpdate: function () {
        this.addForm.sysFlag = this.sysFlag ? 0 : 1;
        putObj(this.addForm).then(() => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          this.getList(this.page,this.params);
          this.showModel = false;
        })
      },
      /**
       * 字典添加
       **/
      handleSave: function () {
        this.addForm.sysFlag = this.sysFlag ? 0 : 1;
        addObj(this.addForm).then(data => {
          this.tableData.push(Object.assign({}, this.addForm))
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
          this.getList(this.page,this.params);
          this.showModel = false;
        })
      },
      searchChange() {
        this.getList(this.page, this.params)
      },
      emptySearch(){
        this.params = {label:null,type:null};
        this.getList(this.page, this.params)
      },
      changePage(num) {
        this.page.currentPage = num
        this.getList(this.page,this.params);
      },
      changeSize(size) {
        this.page.pageSize = size
        this.getList(this.page,this.params);
      }
    }
  }
</script>

<style lang="less" scoped>
  .execution{
    height: 100%;
    background: #fff;
  }
  .valueModal{
    .ivu-date-picker{
      width: 100%;
    }
    .ivu-radio-group{
      height: 32px;
      line-height: 32px;
      margin-bottom: 20px;
      padding-left: 30px;
      font-size: 16px;
    }
  }
</style>

