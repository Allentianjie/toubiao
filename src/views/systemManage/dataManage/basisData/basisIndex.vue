<template>
    <div>
      <Row style="height:100%">
        <Col span="5"  style="height:100%">
          <div class="M_search userTree">
            <Input placeholder="输入关键字进行过滤" v-model="searchDeptTree" style="width: auto"> <Icon  type="ios-search" slot="suffix" /></Input>
            <el-tree id="taskTreeL" class="filter-tree"
                     :data="deptData"
                     :props="defaultProps"
                     :default-expanded-keys="[1]"
                     node-key="id"
                     :filter-node-method="filterNode"
                     @node-click="handleNodeClick"
                     ref="deptTree"
                     :highlight-current=true
            >
            </el-tree>
          </div>
        </Col>
        <Col span="19" style="height:100%">
          <div class="M_search">
            名称：<Input placeholder="请输入数据名称" v-model="search.dataName"  style="width: auto" />
            用户名：<Input placeholder="请输入用户名" v-model="search.createName"  style="width: auto" />
            <el-button icon="el-icon-search" @click="searchBtn" type="primary" size="small">搜 索</el-button>
            <el-button icon="el-icon-delete" @click="emptyBtn" size="small">清 空</el-button>
            <el-button class="funaddBtn" icon="el-icon-plus" @click="AddData('add')" type="primary" size="small">新增(校级)</el-button>
          </div>
          <div class="vasisTabs">
            <Tabs type="card" @on-click="tabClick"  v-model="tab.active">
              <TabPane v-for="(item,index) in tab.layData" :key="index" :label="item.label" :name="item.value">
              </TabPane>
            </Tabs>
          </div>
          <div class="tableHeight"  style="height: calc(100% - 160px)">
            <el-table
            :data="tableData"
            style="min-width: 100%;min-height: 100%"
            row-key="dataId"
            border
            lazy
            :load="load"
            :header-cell-style="backHeader" height="100%" :cell-style="heightGg" v-loading="tableData.loading" fit highlight-current-row
            >
            <!--<el-table :data="tableData" :header-cell-style="backHeader" height="100%" :cell-style="heightGg" v-loading="tableData.loading" fit highlight-current-row style="width: 100%;">-->
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column label="名称" show-overflow-tooltip width="200" prop="dataName" align="left"></el-table-column>
              <el-table-column label="父级"  show-overflow-tooltip  prop="parentName" align="left"></el-table-column>
              <el-table-column label="类型"  align="left">
                <template slot-scope="scope">
                  <span>{{scope.row.dataType | dataTypeFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" prop="dataUnit" align="left"></el-table-column>
              <el-table-column label="当前值"  show-overflow-tooltip  prop="disValue" align="left"></el-table-column>
              <el-table-column label="部门"  show-overflow-tooltip  prop="deptName" align="left"></el-table-column>
              <el-table-column label="创建人"  show-overflow-tooltip  prop="createName" align="center" width="100"></el-table-column>
              <el-table-column label="创建时间" prop="createTime" align="center" width="180"></el-table-column>
              <el-table-column label="状态" align="center" width="100">
                <template slot-scope="scope">
                  <span style="color:#19be6b" v-if="scope.row.enableFlag === '0'">启用</span>
                  <span v-else style="color:#ed4014">禁用</span>
                </template>
              </el-table-column>
              <el-table-column label="汇总方式" align="center" width="100">
                <template slot-scope="scope">
                  <span  v-if="scope.row.summaryMode === 0">自动</span>
                  <span v-else>其他</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="200" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button type="text"
                             icon="el-icon-view"
                             size="mini"
                             plain
                             @click="viewData(scope.row)">查看</el-button>
                  <!--<el-button type="text"
                             icon="el-icon-edit"
                             size="mini"
                             v-if="scope.row.canEdit === '1'"
                             plain
                             @click="editData(scope.row)">编辑</el-button>-->
                  <el-button type="text"
                             icon="el-icon-edit"
                             size="mini"
                             plain
                             @click="editData(scope.row)">编辑</el-button>
                  <!--f04409-->
                  <el-button type="text"
                             icon="el-icon-delete"
                             size="mini"
                             style="color:#f04409"
                             v-if="scope.row.canEdit === '1'"
                             plain
                             f04409
                             @click="remove(scope.row)">删除</el-button>
                  <el-button type="text"
                             icon="el-icon-plus"
                             size="mini"
                             v-if="scope.row.canAddSub === '1'"
                             plain
                             @click="addChild(scope.row)">添加子级</el-button>
                  <el-button type="text"
                             size="mini"
                             plain
                             @click="sumData(scope.row)">汇总数据</el-button>
                  <el-button type="text"
                             icon="el-icon-tickets"
                             size="mini"
                             plain
                             @click="numManage(scope.row)"
                  >数值管理</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-container" style="text-align: right">
            <el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="page.currentPage"
                           :page-size="page.pageSize" layout="total, prev, pager, next" :total="page.total">
            </el-pagination>
          </div>
        </Col>
      </Row>
        <!-- 新增基础数据框 -->
        <Modal v-model="showModel" class-name="basisModal" width="50" :mask-closable="false" @on-cancel="handleReset('formValidate')" >
          <p slot="header">
            <span>{{title}}</span>
          </p>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Row class="addClass">
              <Col span="12">
                <FormItem label="名称" prop="dataName">
                  <Input v-model="formValidate.dataName" placeholder="请输入名称" @on-blur="checkDataName('add')"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="部门" prop="deptId">
                  <Select  v-model="formValidate.deptId" placeholder="请选择部门">
                    <Option v-for="(item,index) in selectDeptData" :label="item.name" :key="index" :value="item.deptId" ></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12" v-if="visParent">
                <FormItem label="层面" prop="layType" >
                  <Select  v-model="formValidate.layType" placeholder="请选择层面">
                    <Option v-for="(item,index) in layData" :label="item.label" :key="index" :value="item.value" ></Option>
                  </Select>
                </FormItem>
              </Col>
              <!--<Col span="12" v-if="visParent">
                <FormItem label="标识" prop="identName">
                  <Input  v-model="formValidate.identName" placeholder="请输入标识"></Input>
                </FormItem>
              </Col>-->
              <Col span="12" v-if="visParent">
                <FormItem label="类型" prop="dataType" >
                  <Select  v-model="formValidate.dataType" placeholder="请选择类型" @on-change="changeDataType">
                    <Option v-for="(item,index) in dataTypeDatas" :label="item.name" :key="index" :value="item.id" ></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12" v-if="visParent">
                <FormItem label="单位" prop="dataUnit">
                  <Input  v-model="formValidate.dataUnit" placeholder="请输入单位"></Input>
                </FormItem>
              </Col>
              <Col span="12" v-if="visParent">
                <FormItem label="示例" prop="dataEg">
                  <Input v-model="formValidate.dataEg" placeholder="请输入示例"></Input>
                </FormItem>
              </Col>
              <Col span="12" v-if="visParent">
                <FormItem label="汇总方式" prop="summaryMode" >
                  <Select  v-model="formValidate.summaryMode" placeholder="请选择汇总方式">
                    <Option v-for="(item,index) in summaryModeDatas" :label="item.name" :key="index" :value="item.id" ></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12" v-if="visParent">
                <FormItem label="计算方式" prop="calculateMode" >
                  <Select  v-model="formValidate.calculateMode" placeholder="请选择计算方式" :disabled="calcDisabled">
                    <Option v-for="(item,index) in calcModeDatas" :label="item.name" :key="index" :value="item.id" ></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="状态" >
                  <i-switch v-model="switch1" @on-change="change" />
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div slot="footer" class="basisFooter">
            <div class="btn">
              <el-button @click="handleSubmit('formValidate')" type="primary" size="small">保存</el-button>
              <el-button  @click="handleReset('formValidate')" style="margin-left: 8px" size="small">取消</el-button>
            </div>
          </div>
        </Modal>
        <!-- 查看对话框 -->
        <Modal v-model="viewModel" class-name="basisModal" width="50" :mask-closable="false" @on-cancel="viewModel = false">
          <p slot="header">
            <span>查看基础数据详情</span>
          </p>
          <Form ref="viewForm" :model="viewForm" :label-width="80">
            <Row class="addClass">
              <Col span="12">
                <FormItem label="名称" prop="dataName">
                  <Input disabled="disabled" v-model="viewForm.dataName"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="父级" prop="parentName" >
                  <Input disabled="disabled"  v-model="viewForm.parentName"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="部门" prop="deptName">
                  <Input disabled="disabled" v-model="viewForm.deptName"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="层面" prop="layType" >
                  <Input disabled="disabled" v-model="viewForm.layType"></Input>
                </FormItem>
              </Col>
             <!-- <Col span="12">
                <FormItem label="标识" prop="identName">
                  <Input disabled="disabled"  v-model="viewForm.identName" ></Input>
                </FormItem>
              </Col>-->
              <Col span="12">
                <FormItem label="类型" prop="dataType" >
                  <Input disabled="disabled" v-model="viewForm.dataType"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="单位" prop="dataUnit">
                  <Input  disabled="disabled" v-model="viewForm.dataUnit" ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="示例" prop="dataEg">
                  <Input  disabled="disabled"  v-model="viewForm.dataEg"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="汇总方式" prop="summaryMode">
                  <Input  disabled="disabled"  v-model="viewForm.summaryMode"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="计算方式" prop="calculateMode">
                  <Input  disabled="disabled"  v-model="viewForm.calculateMode"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="创建人" >
                  <Input disabled="disabled"  v-model="viewForm.createName"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="创建时间" >
                  <Input disabled="disabled"  v-model="viewForm.createTime"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="修改人" >
                  <Input  disabled="disabled" v-model="viewForm.updateName"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="修改时间" >
                  <Input disabled="disabled"  v-model="viewForm.updateTime"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="状态" >
                  <Input disabled="disabled" v-model="viewForm.enableFlag"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div slot="footer" class="basisFooter">
            <div class="btn">
              <el-button   @click="viewModel = false" size="small">返回</el-button>
            </div>
          </div>
        </Modal >
        <!--编辑/修改弹窗-->
        <Modal v-model="editModel" class-name="basisModal" width="50" :mask-closable="false" @on-cancel="editModel = false">
        <p slot="header">
          <span>{{title}}</span>
        </p>
        <!--编辑的内容-->
        <Form class="editModal" ref="formValidate1" :model="formValidate" :rules="ruleValidate1" :label-width="80">
          <Row class="addClass">
            <Col span="12">
              <FormItem label="名称" prop="dataName">
                <Input v-model="formValidate.dataName" placeholder="请输入名称" @on-blur="checkDataName('edit')"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="部门" prop="deptId">
                <Select  v-model="formValidate.deptId" placeholder="请选择部门">
                  <Option v-for="(item,index) in selectDeptData" :label="item.name" :key="index" :value="item.deptId" ></Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="层面" prop="layType" >
                <Select  v-model="formValidate.layType" placeholder="请选择层面">
                  <Option v-for="(item,index) in layData" :label="item.label" :key="index" :value="item.value"></Option>
                </Select>
              </FormItem>
            </Col>
            <!--<Col span="12" v-if="isEdit">
              <FormItem label="标识" prop="identName">
                <Input  v-model="formValidate.identName" placeholder="请输入标识"></Input>
              </FormItem>
            </Col>-->
            <Col span="12" v-if="isEdit">
              <FormItem label="类型" prop="dataType" >
                <Select  v-model="formValidate.dataType" placeholder="请选择类型" @on-change="changeDataType">
                  <Option v-for="(item,index) in dataTypeDatas" :label="item.name" :key="index" :value="item.id" ></Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12" v-if="isEdit">
              <FormItem label="单位" prop="dataUnit">
                <Input  v-model="formValidate.dataUnit" placeholder="请输入单位"></Input>
              </FormItem>
            </Col>
            <Col span="12" v-if="isEdit">
              <FormItem label="示例" prop="dataEg">
                <Input v-model="formValidate.dataEg" placeholder="请输入示例"></Input>
              </FormItem>
            </Col>
            <Col span="12" v-if="isEdit">
              <FormItem label="汇总方式" prop="summaryMode" >
                <Select  v-model="formValidate.summaryMode" placeholder="请选择汇总方式">
                  <Option v-for="(item,index) in summaryModeDatas" :label="item.name" :key="index" :value="item.id" ></Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12" v-if="isEdit">
              <FormItem label="计算方式" prop="calculateMode" >
                <Select  v-model="formValidate.calculateMode" placeholder="请选择计算方式" :disabled="calcDisabled">
                  <Option v-for="(item,index) in calcModeDatas" :label="item.name" :key="index" :value="item.id" ></Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="状态" >
                <i-switch  v-model="switch1"  @on-change="change"/>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer" class="basisFooter">
          <div class="btn">
            <el-button @click="handleSubmit('formValidate1')" type="primary" size="small">保存</el-button>
            <el-button  @click="editModel = false" style="margin-left: 8px" size="small">取消</el-button>
          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { fetchList, getObj, addObj, putObj, delObj,checkDataName,fetchSub,sumData } from '@/api/database/database'
  import { remote } from '@/api/admin/dict'
  import {fetchDeptTree,fetchTree,getSon} from "@/api/admin/dept";
  //import Table from '@/components/table'
  import store from "@/store";
  export default {
    components: {Tree},
    name: 'index',
    data () {
      return{
        backHeader:{
          'background': '#f8f8f9'
        },
        heightGg:{
          'padding': '4px 0'
        },
        tab: {      //tab标签
          active: '-1',
          layData: []
        },
        layData: [],//新增和修改时使用
        visParent: true,  //添加父级数据时显示相关字段，添加子级则隐藏
        switch1: true, // switch开关状态
        editModel: false, // 修改编辑弹窗
        viewModel: false, //查看弹窗
        searchDeptTree: '', // 部门搜索框绑定值
        disabled: false, // 查看输入框不可用
        deptData: [], // 部门树形数据赋值
        selectDeptData: [], //新增数据时部门数据
        tableLoading: false,
        search:{
          dataName: '', // 名称
          createName: '', // 用户名
          deptId: null, // 部门ID
          deptName: '',
          layType: null
        }, // 搜索三个输入框内容绑定
        formValidate: {
          dataId: null,
          parentId: '', // 父级ID
          deptName: '', // 部门N
          deptId: '', // 部门N
          dataName: '', // 名称-
          dataType: null, // 类型-
          dataUnit: '', // 单位-
          enableFlag: 0,
          layType: null, // 层面 -
          identId: null,  //标识id
          identName: '', // 标识-
          dataEg: '',// 示例-
          summaryMode: 0, //默认自动汇总
          calculateMode: 0
        }, // 新增的绑定值
        viewForm: {
          parentName: '', // 父级name
          depName: '', // 部门N
          dataName: '', // 名称-
          dataType: null, // 类型-
          dataUnit: '', // 单位-
          createName: '', // 创建人-
          createTime: '', // 创建时间-
          enableFlag: '', // 状态-
          layType: null, // 层面 -
          identName: '', // 标识-
          dataEg: '', // 示例-
          updateName: '', // 修改人-
          updateTime: '', // x修改时间-
          summaryMode:'',
          calculateMode: ''
        },
        dataTypeDatas:[
          {id:0,name:'整数'},
          {id:1,name:'小数'},
          {id:2,name:'百分比'},
          {id:3,name:'千分比'},
          {id:4,name:'比列'},
          {id:5,name:'布尔'},
        ],
        summaryModeDatas: [
          {id:0,name:'自动'},
          {id:1,name:'其他'}
        ],
        calcModeDatas:[
          {id:0,name:'求和'},
          {id:1,name:'求平均'},
          {id:2,name:'其他'}
        ],
        ruleValidate: { // 验证
          dataName: [
            {
              required: true,
              message: "请输入数据名称"
            }
          ],
          deptId: [
            {
              required: true,
              message: "请选择部门"
            }
          ],
          dataType: [
            {
              required: true,
              message: "请选择数据类型"
            }
          ],
          layType: [
            {
              required: true,
              message: "请选择所属层面"
            },
            ],
          summaryMode: [
            {
              required: true,
              message: "请选择汇总类型"
            }
          ],
          calculateMode: [
            {
              required: true,
              message: "请选择计算类型"
            }
          ]
        }, // form验证
        ruleValidate1: { // 验证
          dataName: [
            {
              required: true,
              message: "请输入数据名称"
            }
          ],
          deptId: [
            {
              required: true,
              message: "请选择部门"
            }
          ],
          dataType: [
            {
              required: true,
              message: "请选择数据类型"
            }
          ],
          layType: [
            {
              required: true,
              message: "请选择所属层面"
            },
          ],
          summaryMode: [
            {
              required: true,
              message: "请选择汇总类型"
            }
          ],
          calculateMode: [
            {
              required: true,
              message: "请选择计算类型"
            }
          ]
        },
        showModel: false, // 新增、修改的弹窗
        tableData: [],
        title: '新增', // 弹窗的title
        formChildren:{
          name: '',
          depName: '', // 部门N
          depId: '', // 部门N
        },// 新增子级的绑定值
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        calcDisabled: false,
        isEdit: false,
        isOnly: true,
      }
    },
    created(){
      this.getLayType();  //加载层面
      this.getList(this.page,{layType:this.tab.active});//获取列表
      this.getDeptTree();
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      getLayType(){
        remote('lay_type').then(response => {
          this.tab.layData.push({label:'全部',value:'-1'});
          response.data.data.forEach(e=>{
            this.tab.layData.push(e);
            var lay = {label:'',value: null};
            lay.label = e.label;
            lay.value = parseInt(e.value);
            this.layData.push(lay);
          });
        })
      },
      changeDataType(){
        switch(this.formValidate.dataType){
          case 0: case 1:
            this.calcDisabled = false;
            this.formValidate.calculateMode = 0;
            break;
          case 2: case 3: case 4:
            this.calcDisabled = true;
            this.formValidate.calculateMode = 1;
            break;
          case 5:
            this.calcDisabled = true;
            this.formValidate.calculateMode = 2;
            break;
        }
      },
      checkDataName(type){
        var dataId = type === 'edit' ? this.formValidate.dataId : '';
        checkDataName(this.formValidate.dataName,dataId).then(response => {
          this.isOnly = response.data.data == '1' ? true : false;
          if(response.data.data == '0'){
            this.$Message.error('当前名称已经占用，请重新输入名称!');
          }
        });
      },
      getList(page,params){
        this.tableLoading = true;
        this.tableData = [];
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      getDeptTree(){
         this.deptData = store.state.chooseDept;
      },
      // 状态开关
      change (status) {
        this.formValidate.enableFlag = status === false ? 1 : 0
      },
      // 搜索按钮
      searchBtn(){
        this.getList(this.page,this.search)
      },
      // 清空按钮
      emptyBtn(){
        this.search.dataName = ''
        this.search.createName = ''
        this.search.deptName = ''
        this.search.deptId = null
        this.search.layType = this.tab.active
        this.getList(this.page,{layType:this.tab.active})
      },
      // 弹框确认
      handleSubmit (name) {
        var mark = false;
        this.$refs[name].validate((valid) => {
          mark = valid;
        })
        if (!mark){
          this.$Message.error('有红色星号标注的为必填项，请输入完整信息!');
          return;
        }
        if (!this.isOnly){
          this.$Message.error('当前名称已经占用，请重新输入名称!');
          return;
        }
        this.formValidate.enableFlag = this.switch1 ? 0 : 1
        if(this.formValidate.parentId==0){
          //标识名称
          this.formValidate.identName = this.formValidate.dataName.replace("全校","");
        }
        addObj(this.formValidate).then(data => {
          console.log(data.data)
          if(data.data.code == 0){
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            if(this.title ==='修改'){
              this.editModel = false;
            }else{
              this.showModel = false;
            }

            this.getList(this.page,{layType:this.tab.active})
          }else{
            this.$Message.error('保存失败，失败原因：' + data.data.msg);
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
      // 新增校级数据
      AddData (params) {
        this.visParent = true;
        this.title = '新增';
        this.switch1 = true
        this.formValidate.parentId = 0
        this.formValidate.dataId  = null;
        this.formValidate.parentName = ''
        this.formValidate.deptName = ''
        this.formValidate.deptId = null
        this.formValidate.dataName = ''
        this.formValidate.dataType = ''
        this.formValidate.dataUnit = ''
        this.formValidate.enableFlag = 1
        this.formValidate.layType = null
        this.formValidate.identName= ''
        this.formValidate.identId = null;
        this.formValidate.dataEg = ''
        getSon(0).then(data => {
          this.selectDeptData = data.data.data;
          this.formValidate.deptId = this.selectDeptData[0].deptId;
          this.showModel = true
        });
      },
      //修改
      editData (params) {
        this.title = '修改';
        getObj(params.dataId).then(data => {
          this.formValidate = data.data.data;
          this.switch1 = this.formValidate.enableFlag == 1 ? false : true;
          this.selectDeptData = data.data.data.depts;
          if(this.formValidate.parentId===0){
            this.isEdit = true;
          }else{
            this.isEdit = false;
          }
          switch(this.formValidate.dataType){
            case 0: case 1: {
              this.calcDisabled = false;
              break;
            }
            case 2: case 3: case 4:{
              this.formValidate.calculateMode=1;
              this.calcDisabled = true;
              break;
            }
            case 5:{
              this.formValidate.calculateMode=2;
              this.calcDisabled = true;
              break;
            }
          }
          this.editModel = true;
        });
      },
      //汇总数据
      sumData(params){
        sumData(params.identId).then(data => {
         if(data.data.code==0){
           this.$message({
             showClose: true,
             message: '汇总成功',
             type: 'success'
           })
           this.getList(this.page,this.search);
         }else{
           this.$message({
             showClose: true,
             message: '汇总失败,失败原因：'+data.data.msg,
             type: 'error'
           })
         }
        });
      },
      viewData(params){
        this.viewModel = true;
        getObj(params.dataId).then(data => {
          this.viewForm = data.data.data;
          this.layData.forEach(e=>{
              if(this.viewForm .layType== e.value){
                this.viewForm.layType = e.label;
              }
          })
          this.viewForm.enableFlag = data.data.data.enableFlag === '0' ? '正常' : '禁用'
          this.viewForm.summaryMode = data.data.data.summaryMode ===0? '自动' : '其他'
          var calcMode = ''
          switch (data.data.data.calculateMode) {
            case 0:
              calcMode = '求和'
              break
            case 1:
              calcMode = '求平均'
              break
            case 2:
              calcMode = '其他'
              break
          }
          this.viewForm.calculateMode = calcMode;
          var dataType = ''
          switch (data.data.data.dataType) {
            case 0:
              dataType = '整数'
              break
            case 1:
              dataType = '小数'
              break
            case 2:
              dataType = '百分比'
              break
            case 3:
              dataType = '千分比'
              break
            case 4:
              dataType = '比例'
              break
            case 5:
              dataType = '布尔'
              break
          }
          this.viewForm.dataType = dataType;
        })
      },
      // 删除弹窗
      remove (params) {
        var _this = this
        this.$confirm('是否确认删除名称为\'' + params.dataName +'\'的数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delObj(params.dataId)
        }).then(data => {
          if(data.data.code === 0){
            _this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            _this.getList(this.page,{layType:this.tab.active});
          }else{
            _this.$message({
              showClose: true,
              message: '删除失败，失败原因：'+ data.data.msg,
              type: 'error'
            })
          }

        }).catch(function(err) { })
      },
      // 添加子级
      addChild (params) {
        this.title = '新增子级数据'
        this.visParent = false;
        this.showModel = true;
        this.formValidate.dataId = null;
        this.formValidate.parentId = params.dataId;
        this.formValidate.deptName = '';
        this.formValidate.deptId = '';
        this.formValidate.dataName = ''
        this.formValidate.dataType = params.dataType;
        this.formValidate.dataUnit = params.dataUnit;
        this.formValidate.enableFlag = 1
        this.formValidate.layType = params.layType
        this.formValidate.identId = params.identId;
        this.formValidate.identName= params.identName;
        this.formValidate.dataEg = params.dataEg;
        this.formValidate.summaryMode = params.summaryMode;
        this.formValidate.calculateMode = params.calculateMode;
        getSon(params.deptId).then(data => {
          this.selectDeptData = data.data.data;
        });
      },
      // 数值管理跳转页面
      numManage (params) {
        this.$router.push({path: '/valueIndex', query: {dataId: params.dataId,deptId:params.deptId}})
      },
      tabClick(tab) {
        this.tab.active = tab;
        this.search.layType = tab;
        this.baseData = [];
        this.page.currentPage = 1;
        this.getList(this.page,this.search)
      },
      changePage(num) {
        this.page.currentPage = num
        this.search.layType = this.tab.active
        this.getList(this.page,this.search);
      },
      changeSize(size) {
        this.page.pageSize = size
        this.search.layType = this.tab.active
        this.getList(this.page,this.search);
      },
      handleNodeClick(data) {
        console.log(data);
        this.search.deptId = data.id;
        this.search.layType = this.tab.active;
        if(this.deptForcsType  === 'dep'){
          this.search.deptId = data.id;
          this.search.deptName = data.name;
        }else{
          this.formValidate.deptName = data.name;
          this.formValidate.deptId = data.id;
        }
        this.getList(this.page,this.search);
      },
      load(tree, treeNode, resolve) {
        fetchSub(tree.dataId).then(response => {
          resolve(response.data.data);
        });
      }
    },
    watch: {
      searchDeptTree(val) {
        this.$refs.deptTree.filter(val);
      }
    },
    filters: {
      dataTypeFilter(value) {
        var output = ''
        switch (value) {
          case 0:
            output = '整数'
            break
          case 1:
            output = '小数'
            break
          case 2:
            output = '百分比'
            break
          case 3:
            output = '千分比'
            break
          case 4:
            output = '比例'
            break
          case 5:
            output = '布尔'
            break
        }
        return output
      }
    }
  }
</script>

<style lang="less" scoped>
  .userTree {
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
    padding: 15px 15px;
    .ivu-tree {
      text-align: left;
    }
  }
</style>
