<template>
  <div class="execution">
    <div class="funBtn">
        <el-button type="primary"
                   @click="handleAdd"
                   con="el-icon-plus"
                   size="small">新 增</el-button>
        <el-button type="primary"
                   icon="el-icon-document"
                   size="small"
                   @click="handleToDataLog">数据日志</el-button>
        <el-button type="primary"
                   @click="handleReturn"
                   con="el-icon-close"
                   size="small">返 回</el-button>
      </div>
    <div class="tableHeight2">
      <el-table :data="tableData"  height="100%" v-loading="tableLoading"
                style="min-width: 100%;min-height: 100%" fit highlight-current-row>
      <el-table-column fixed type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column fixed prop="dataName" label="所属数据" min-width="180" align="center"></el-table-column>
      <el-table-column  prop="deptName" label="所属部门" width="120" align="center"></el-table-column>
      <el-table-column  prop="dataDim" label="时间维度" width="180" align="center"></el-table-column>
      <el-table-column  prop="disValue" label="数值" width="80" align="center"></el-table-column>
      <el-table-column prop="dataType" label="数据类型" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.dataType | dataTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="dataSource" label="来源" width="120" align="center"></el-table-column>
      <el-table-column  prop="createName" label="创建人" width="120" align="center"></el-table-column>
      <el-table-column  prop="createTime" label="创建时间" width="170" align="center"></el-table-column>
      <!--<el-table-column  prop="summaryMode" label="汇总方式" width="100" align="center"></el-table-column>-->
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     icon="el-icon-check"
                     size="small"
                     plain
                     @click="handleEdit(scope.row,scope.index)">编辑</el-button>
          <el-button type="text"
                     icon="el-icon-delete"
                     size="small"
                     plain
                     style="color:#f04409"
                     @click="handleDel(scope.row,scope.index)">删除</el-button>
          <el-button type="text"
                     icon="el-icon-document"
                     size="small"
                     plain
                     @click="handleToValueLog(scope.row,scope.index)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
      <div class="pagination-container" style="text-align: right">
      <el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="page.currentPage"
                     :page-size="page.pageSize" layout="total, prev, pager, next" :total="page.total">
      </el-pagination>
    </div>
    <!--modal-->
    <div>
      <!-- 新增数据值框 -->
      <Modal v-model="showModel" class-name="valueModal"
             width="35"  :mask-closable="false" @on-cancel="handleReset('formValidate')">
        <p slot="header">
          <span>新增</span>
        </p>
        <div id="write">
        <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate2" :label-width="80">
          <FormItem label="数据类型">
            <span>{{dataType|dataTypeFilter}}</span>
          </FormItem>
          <FormItem label="时间类型" v-if="dimCount < 1">
            <Row >
              <RadioGroup v-model="formValidate.dimType">
                <Radio label="1">自然年</Radio>
                <Radio label="2">学年</Radio>
              </RadioGroup>
            </Row>
          </FormItem>
          <FormItem label="选择时间">
            <Row v-if="formValidate.dimType==='1'">
              <DateSelect v-on:dateSelected="dateSelected"></DateSelect>
            </Row>
            <Row  v-if="formValidate.dimType==='2'">
              <Col span="12">
                <Select v-model="formValidate.dimAcyear" placeholder="学年">
                  <Option v-for="(item,index) in academicYear" :key="index" :value="item">{{item}}</Option>
                </Select>
              </Col>
              <Col span="12">
                <Select v-model="formValidate.dimSemester" placeholder="学期">
                  <Option value="1">第一学期</Option>
                  <Option value="2">第二学期</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="数值" prop="value">
            <Row v-if="dataType !== 5">
              <Col :span="13">
                <Input v-model="formValidate.value" placeholder="请输入数据值" />
              </Col>
              <Col :span="11">
                <Input v-model="disValue" disabled placeholder/>
              </Col>
            </Row>
            <Row v-if="dataType === 5">
              <!-- <el-radio v-model="formValidate.dataValue" label="0">否</el-radio>
              <el-radio v-model="formValidate.dataValue" label="1">是</el-radio>-->
              <Col :span="12">
                <Select v-model="value" placeholder="请选择数值">
                  <Option value="0">否</Option>
                  <Option value="1">是</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <!--<Row v-if="dimCount < 1">
              <FormItem label="汇总方式" prop="summaryMode">
                <Select v-model="formValidate.summaryMode" placeholder="请选择汇总方式">
                  <Option value="0">自动汇总</Option>
                  <Option value="1">其他</Option>
                </Select>
              </FormItem>
          </Row>-->
        </Form>
        </div>
        <div slot="footer">
          <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </div>
      </Modal>

      <!-- 修改数据值框 -->
      <Modal v-model="editModel" class-name="valueModal" width="35"
             :mask-closable="false" @on-cancel="handleReset('editForm')">
        <p slot="header">
          <span>修改</span>
        </p>
        <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="80">
          <FormItem label="时间类型" v-if="dimCount <= 1">
            <Row >
              <RadioGroup v-model="editForm.dimType">
                <Radio label="1">自然年</Radio>
                <Radio label="2">学年</Radio>
              </RadioGroup>
            </Row>
          </FormItem>
          <FormItem label="选择时间">
            <Row v-if="editForm.dimType==='1'">
              <DateSelect v-on:dateSelected="dateSelected"></DateSelect>

            </Row>
            <Row  v-if="editForm.dimType==='2'">
              <Col span="12">
                <Select v-model="editForm.dimAcyear" placeholder="学年">
                  <Option v-for="(item,index) in academicYear" :key="index" :value="item">{{item}}</Option>
                </Select>
              </Col>
              <Col span="12">
                <Select v-model="editForm.dimSemester" placeholder="学期">
                  <Option value="1">第一学期</Option>
                  <Option value="2">第二学期</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="数值" prop="dataValue">
            <Input v-model="editForm.dataValue" placeholder="请输入数值" type="number"></Input>
          </FormItem>

          <!--<Row v-if="dimCount <= 1">
            <FormItem label="汇总方式" prop="summaryMode">
              <Select v-model="editForm.summaryMode" placeholder="请选择汇总方式">
                <Option value="0">自动汇总</Option>
                <Option value="1">其他</Option>
              </Select>
            </FormItem>
          </Row>-->
        </Form>
        <div slot="footer">
          <Button type="primary" @click="handleEditSubmit('editForm')">确定</Button>
          <Button @click="handleReset('editForm')" style="margin-left: 8px">取消</Button>
        </div>
      </Modal>
    </div>

  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj, delObj, getDimType} from '@/api/database/dimension'
  import DateSelect from "@/components/dateselect";
  export default {
    name: 'valueIndex',
    components: {DateSelect },
    data () {
      return{
        formValidate: {
          dataId: null,
          deptId: null,
          dimType: '',
          dimYear: '', // 年
          dimMonth: '', // 月
          dimDay: '', // 日
          dimSemester: '', // 学期
          dimAcyear: '', // 学年
          dimWeek: '', // 学周
          dataValue: '', //  数值
          dataSource:'0' //用户创建
         // summaryMode : '' // 汇总方式
        }, // form表单
        editForm: {
          dataId: null,
          deptId: null,
          dimType: '',
          dimYear: '', // 年
          dimMonth: '', // 月
          dimDay: '', // 日
          dimSemester: '', // 学期
          dimAcyear: '', // 学年
          dimWeek: '', // 学周
          dataValue: '', //  数值
          //summaryMode : '' // 汇总方式
        },
        ruleValidate: {
          value: [
            { required: true, message: '数值不能为空', trigger: 'blur' }
          ]
        }, // 验证
        ruleValidate2: {
          value: [
            { required: true, message: '数值不能为空', trigger: 'blur' }
          ]
        }, // 验证
        showModel: false, // 新增弹窗
        editModel:false,  //编辑弹窗
        isEdit: false,
        tableData:[],
        tableLoading: false,
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        dataId: null,
        deptId: null,
        academicYear:[],
        dimType: '1',
        dimCount: null,
        dataDim: '',
        dataType: null,
        value:''
      }
    },
    created(){
      this.dataId = this.$route.query.dataId;
      this.deptId = this.$route.query.deptId;
      this.dataType = this.$route.query.dataType;
      this.getList(this.page,{dataId:this.dataId})
    },
    computed: {
      disValue: function () {
        //根据不同的数据类型展示不同类型的值
        if (this.formValidate.value == undefined) {
          return "";
        } else {
          if (this.dataType == "0") {
            //整数
            return Math.round(this.formValidate.value);
          } else if (this.dataType == "1") {
            //小数
            return parseFloat(this.formValidate.value).toFixed(2);
          } else if (this.dataType == "2") {
            //百分比
            // console.log
            return this.formValidate.value + "%";
          } else if (this.dataType == "3") {
            //千分比
            return this.formValidate.value + "‰";
          } else if (this.dataType == "4") {
            //比例
            return this.formValidate.value + " ：1";
          } else {
            return this.formValidate.value;
          }
        }
      }
    },
    methods: {
      dateSelected(childValue){
        this.dataDim = childValue;
      },
      acYear(){
        this.academicYear = [];
        var date=new Date;
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        if(month>6){
          year +=1;
        }
        for(var i = 0;i<5;i++){
          var ac = (year - i - 1) + '-' + (year - i)
          this.academicYear.push(ac);
        }
      },
      getDimType() {
        getDimType(this.dataId).then(response => {
          this.dimType = response.data.data.dimType;
          this.dimCount = response.data.data.dimCount;
          //this.sumMode = response.data.data.sumMode;
        });
      },
      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.tableData = response.data.data.records;
          if(this.tableData.length > 0){
            this.tableData.forEach(e=>{
              e.dataSource = e.dataSource == '0' ? '用户创建' : '其他';
              //e.summaryMode = e.summaryMode == 0 ? '自动汇总' : '其他';
            });
          }
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        })
      },
      handleAdd(){
        getDimType(this.dataId).then(response => {
          this.dimType = response.data.data.dimType;
          this.dimCount = response.data.data.dimCount;
          this.showModel = true;
          this.isEdit = false;
          this.acYear();
          this.y = '';
          this.ym = '';
          this.ymd = '';
          this.formValidate = {dataId:this.dataId,deptId:this.deptId,dimType: this.dimType, dimYear: '',dimMonth: '', dimDay: '', dimSemester: '', dimAcyear: '', dimWeek: '', dataValue: '',dataSource: '0' }
        });
      },
      // 新增确认
      handleSubmit (name) {
        var mark = false;
        this.$refs[name].validate((valid) => {
          mark = valid;
        })
        if (!mark){
          this.$Message.error('有红色星号标注的为必填项，请输入完整信息!');
          return;
        }
        //mark = false;
        switch (this.dataType) {
          case 0:
            //mark = this.checkDateVale('^-?\d+$',this.formValidate.value);
            this.formValidate.dataValue = Math.round(this.formValidate.value);
            break;
          case 1:
            //mark = this.checkDateVale('^(-?\d+)(\.\d+)?$',this.formValidate.value);
            this.formValidate.dataValue = parseFloat(this.formValidate.value).toFixed(2);
            break;
          case 2:
            //mark = this.checkDateVale('^(-?\d+)(\.\d+)?$',this.formValidate.value);
            this.formValidate.dataValue = parseFloat(this.formValidate.value).toFixed(2) /100;
            break;
          case 3:
            //mark = this.checkDateVale('^(-?\d+)(\.\d+)?$',this.formValidate.value);
            this.formValidate.dataValue = parseFloat(this.formValidate.value).toFixed(2) /1000;
            break;
          case 4: //比例
            //mark = this.checkDateVale('^(-?\d+)(\.\d+)?$',this.formValidate.value);
            this.formValidate.dataValue = parseFloat(this.formValidate.value).toFixed(2) /1000;
            break;
          case 5:
            this.formValidate.dataValue = this.formValidate.value;
            break;
        }
        if(!mark){
          this.$Message.error('请输入正确数据!');
          return;
        }
        //this.formValidate.summaryMode = this.formValidate.summaryMode==null?this.sumMode : this.formValidate.summaryMode
        if(this.formValidate.dimType == '1'){
          this.formValidate.dimAcyear = '';
          this.formValidate.dimSemester = '';
          this.formValidate.dimDay = '';
          this.formValidate.dimMonth = '';
          this.formValidate.dimYear = '';
          this.getDimDate('add');
        }else{
          this.formValidate.dimDay = '';
          this.formValidate.dimMonth = '';
          this.formValidate.dimYear = '';
        }
        addObj(this.formValidate).then(data => {
          this.tableData.push(Object.assign({}, this.formValidate))
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
          this.showModel = false;
          this.getList(this.page,{dataId:this.dataId})
        })
      },
      //验证数据值的合法性
      checkDateVale(reg,value){
        var reg = new RegExp('^(-?\d+)(\.\d+)?$')
        return reg.test(this.formValidate.value);
      },
      // 编辑提交确认
      handleEditSubmit (name) {
        var mark = false;
        this.$refs[name].validate((valid) => {
          mark = valid;
        })
        if (!mark){
          this.$Message.error('有红色星号标注的为必填项，请输入完整信息!');
          return;
        }
        //this.editForm.summaryMode = this.editForm.summaryMode==null?this.sumMode : this.editForm.summaryMode
        if(this.editForm.dimType == '1'){
          this.editForm.dimAcyear = '';
          this.editForm.dimSemester = '';
          this.editForm.dimDay = '';
          this.editForm.dimMonth = '';
          this.editForm.dimYear = '';
          this.getDimDate('edit');
          putObj(this.editForm).then(data => {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.editModel = false;
            this.getList(this.page,{dataId:this.dataId})
          })
        }else{
          this.editForm.dimDay = '';
          this.editForm.dimMonth = '';
          this.editForm.dimYear = '';
          putObj(this.editForm).then(data => {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.editModel = false;
            this.getList(this.page,{dataId:this.dataId})
          })

        }
      },
      getDimDate(type){
        console.log(this.dataDim)
        console.log('2019'.split('-'))
        if(this.dataDim!=null){
          var d = this.dataDim.split('-');
          if(d.length == 3){
            if(type === 'add'){
              this.formValidate.dimYear = d[0];
              this.formValidate.dimMonth = d[1];
              this.formValidate.dimDay = d[2];
            }else{
              this.editForm.dimYear = d[0];
              this.editForm.dimMonth = d[1];
              this.editForm.dimDay = d[2];
            }

          }
          if(d.length == 2){
            if(type === 'add') {
              this.formValidate.dimYear = d[0];
              this.formValidate.dimMonth = d[1];
            }else{
              this.editForm.dimYear = d[0];
              this.editForm.dimMonth = d[1];
            }
          }
          if(d.length == 1){
            if(type === 'add') {
              this.formValidate.dimYear = d[0];
            }else{
              this.editForm.dimYear = d[0];
            }
          }
        }
        return;
      },
      // 取消新增内容
      handleReset (name) {
        this.editModel = false
        if(this.title === '新增'){
          this.$refs[name].resetFields();
        }
      },
      handleEdit(row,index){
        getDimType(this.dataId).then(response => {
          this.dimType = response.data.data.dimType;
          this.dimCount = response.data.data.dimCount;
          //this.sumMode = response.data.data.sumMode;
          this.editModel = true;
          this.acYear();
          this.editForm = {dimId:row.dimId,dataId:this.dataId,deptId:this.deptId, dimType: this.dimType, dimYear: '',dimMonth: '', dimDay: '', dimSemester: row.dimSemester, dimAcyear: row.dimAcyear, dimWeek: '', dataValue: row.dataValue }
        });
        //回显
        if(this.dimType=='1'){
          //TODO 添加日期选择组件回显
        }
      },
      handleDel(row,index) {
        var _this = this
        this.$confirm('是否确认删除属于"' + row.dataName + '"下的此条数据值吗?' ,'提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delObj(row.dimId)
        }).then(data => {
          _this.tableData.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          _this.getList(this.page,{dataId:this.dataId})
        }).catch(function(err) { })
      },

      // 返回页面
      handleReturn () {
        this.$router.push({path: '/basisData',query: {}})
      },
      /**
       * 查看该数据所有日志
       */
      handleToDataLog() {
        var src = '/tolog';
        var dataId = this.dataId;
        var deptId = this.deptId;
        this.$router.push({
          path: src,
          query: {
            dataId:dataId,
            dimId:null,
            deptId:deptId
          }
        })
      },
      /**
       * 查看该数值相关日志
       * @param row
       */
      handleToValueLog(row) {
        var src = '/tolog';
        var dataId = this.dataId;
        var deptId = this.deptId;
        this.$router.push({
          path: src,
          query: {
            dataId: dataId,
            dimId: row.dimId,
            deptId: deptId
          }
        })
      },
      changePage(num) {
        this.page.currentPage = num
        this.getList(page);
      },
      changeSize(size) {
        this.page.pageSize = size
        this.getList(page);
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

<style lang="less">
.valueModal {
  .ivu-date-picker {
    width: 100%;
  }
  .ivu-radio-group {
    height: 32px;
    padding-left: 30px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 32px;
  }
}
</style>

