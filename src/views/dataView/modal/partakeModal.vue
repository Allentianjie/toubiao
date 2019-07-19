<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox"
           class-name="vertical-center-modal" v-model="partakeData.state" width="70%"
           :mask-closable="false" @on-cancel="closePartakeModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>诊改参与详情</span>
      </p>
      <div class="fileManage">
        <div class="top2">
          <div class="topCard">
            <div class="contentotal">
              <!--<div>-->
              <p class="tatle" style="font-size: 0.2rem">{{partake.name}}</p>
              <!--<p class="proportion">{{item.proportion}}</p>-->
              <!--</div>-->
              <p class="valueT">{{partake.number}}</p>
            </div>
          </div>
          <div class="topCard">
            <div class="contentotal">
              <!--<div>-->
              <p class="tatle" style="font-size: 0.2rem">{{nopartake.name}}</p>
              <!--<p class="proportion">{{item.proportion}}</p>-->
              <!--</div>-->
              <p class="valueT">{{nopartake.number}}</p>
            </div>
          </div>
        </div>

        <div class="selectDiv">
          <span>选择体系：</span>
          <el-select size="small" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>当前获取：</span>
          <el-select @change="changeOption" size="small" v-model="changeIndex" placeholder="请选择">
            <el-option label="参与的" value="1"></el-option>
            <el-option label="未参与的" value="2"></el-option>
          </el-select>
        </div>
        <div class="lineA"></div>
        <!--部门表格-->
        <div v-show="nameIndex=='1'" class="tableHeight2">
          <el-table :data="deptTableData" stripe height="100%" :header-cell-style="backHeader"
                    :cell-style = "paddingMy" style="min-width: 100%;min-height: 100%">
            <el-table-column align="center" prop="deptName" label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="cursor: pointer;color:#2d8cf0">
                 {{scope.row.deptName}}
                </span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="teach" label="是否教学单位">
              <template slot-scope="scope">
                <span>
                  {{scope.row.organType == '0' ? "否" : "是"}}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="state" label="参与状态">
              <template slot-scope="scope">
                  <span>
                    {{scope.row.state}}
                  </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="person" label="部门负责人">
              <template slot-scope="scope">
                <span>{{scope.row.person}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--职工表格-->
        <div v-show="nameIndex=='2'" class="tableHeight2">
          <el-table :data="workerTableData" stripe height="100%" :header-cell-style="backHeader" :cell-style = "paddingMy" style="min-width: 100%;min-height: 100%">
            <el-table-column align="center" prop="name" label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="cursor: pointer;color:#2d8cf0">
                 {{scope.row.userName}}
                </span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="deptName" label="部门">
              <template slot-scope="scope">
                <span>
                  {{scope.row.deptName}}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="state" label="参与状态">
              <template slot-scope="scope">
                  <span>
                    {{scope.row.state}}
                  </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="person" label="部门负责人">
              <template slot-scope="scope">
                <span>{{scope.row.person}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--学生表格-->
        <div v-show="nameIndex=='3'" class="tableHeight2">
          <el-table :data="studentTableData" stripe  height="100%" :header-cell-style="backHeader" :cell-style = "paddingMy" style="min-width: 100%;min-height: 100%">
            <el-table-column align="center" prop="name" label="姓名" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="cursor: pointer;color:#2d8cf0">
                 {{scope.row.userName}}
                </span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="class" label="班级">
              <template slot-scope="scope">
                <span>
                  {{scope.row.class}}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="major" label="专业">
              <template slot-scope="scope">
                  <span>
                    {{scope.row.major}}
                  </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="college" label="院系">
              <template slot-scope="scope">
                <span>{{scope.row.college}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Instructor" label="辅导员">
              <template slot-scope="scope">
                <span>{{scope.row.Instructor}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="state" label="参与状态">
              <template slot-scope="scope">
                <span>{{scope.row.state}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--教师表格-->
        <div v-show="nameIndex=='4'" class="tableHeight2">
          <el-table :data="teacherTableData" stripe height="100%" :header-cell-style="backHeader" :cell-style = "paddingMy" style="min-width: 100%;min-height: 100%">
            <el-table-column align="center" prop="name" label="姓名" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="cursor: pointer;color:#2d8cf0">
                 {{scope.row.userName}}
                </span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="college" label="院系">
              <template slot-scope="scope">
                <span>
                  {{scope.row.college}}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="state" label="参与状态">
              <template slot-scope="scope">
                  <span>
                    {{scope.row.state}}
                  </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="person" label="负责人">
              <template slot-scope="scope">
                <span>{{scope.row.person}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pageDiv">
          <Page
            :total="page.total"
            :showTotal="page.showTotal"
            :current="page.current"
            :page-size="page.size"
            @on-change="changePageTable1"
          ></Page>
        </div>

      </div>
      <div slot="footer" style="text-align: center">
        <!--<Button type="primary" size="large" @click="closePartakeModal">保存</Button>-->
        <Button type="warning" size="large" @click="closePartakeModal">关闭</Button>
        <!-- <Button type="primary" size="large" @click="closeModal">关闭</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
  import df from "@/api/utils";
  import store from "@/store";
  import {
    fetchList,
    fetchValueList,
    fetchValueLists,
    getObj,
    addObj,
    putObj,
    delObj,
    getTree
  } from "@/api/database/database";
  import {remote} from '@/api/admin/dict'

  export default {
    props: {
      partakeData: {
        type: Object,
        required: true
      }
    },
    components: {},
    watch: {

      "targetForm.summaryMode"(newValue, oldValue) {

      },
      "targetForm.dataName"(newValue, oldValue) {

      }

    },
    data() {
      return{
        changeIndex:"1",
        nameIndex:"",
        paddingMy: {
          'padding':'5px 0'
        },
        backHeader:{
          'background': '#f8f8f9'
        },
        partake:{
          name: '',
          number: '',
        },
        nopartake:{
          name: '',
          number: '',
        },
        options: [],
        value: '',
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        // tableHeight: 'height: 3rem',
        deptTableData: [],
        workerTableData:[],
        studentTableData:[],
        teacherTableData:[],
      }
    },
    mounted() {
    },
    computed: {

    },
    filters: {},
    methods: {
      changeOption(val){
        this.changeIndex=val;
        if(this.nameIndex==1){//参与部门Workers
          this.getDeptData(this.value);
        }else if(this.nameIndex==2){//参与职工
          this.getWorkerData(this.value);
        }else if(this.nameIndex==3){//参与学生
          this.getStudentData(this.value);
        }else if(this.nameIndex==4){//参与教师
          this.getTeacherData(this.value);
        }
      },
      //判断参与
      getName(){

        var that = this;
        this.nameIndex=this.partakeData.data;this.nameIndex=this.partakeData.data;
        this.$Get("/admin/hierarchy/getHierarchys", null, function(data){
          console.log("pdata",data);
          if (data.code == '0') {
            if (data.data.length > 0) {
              var opts = [];
              data.data.forEach(e => {
                var option = {
                  value : e.id,
                  label : e.hieName
                };
                opts.push(option);
              });
              that.options = opts;
              that.value = that.options[0].value;
              if(that.nameIndex==1){//参与部门Workers
                that.getDeptData(that.value);
              }else if(that.nameIndex==2){//参与职工
                that.getWorkerData(that.value);
              }else if(that.nameIndex==3){//参与学生
                that.getStudentData(that.value);
              }else if(that.nameIndex==4){//参与教师
                that.getTeacherData(that.value);
              }
            }
          }
        });
      },
      getTeacherData(hieId){//教师赋值
        var parturl = "/admin/summaryDrill/getPaticipateUsers";
        var noparturl = "/admin/summaryDrill/getUnPaticipateUsers";
        var usertype = 1;
        var that = this;
        this.$Get(parturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
          that.partake={name: '参与教师',number: data.data.total};
        });
        this.$Get(noparturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
          that.nopartake={name: '未参与教师',number: data.data.total};
        });
        if(that.changeIndex==1){
          this.$Get(parturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
            that.partake={name: '参与教师',number: data.data.total};
            that.teacherTableData = data.data.records;
            that.page.total= data.data.total
          });
        }else {
          this.$Get(noparturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
            that.nopartake={name: '未参与教师',number: data.data.total};
            that.teacherTableData = data.data.records;
            that.page.total= data.data.total
          });
        }
        // this.teacherTableData=
      },
      getStudentData(hieId){//学生赋值
        var parturl = "/admin/summaryDrill/getPaticipateUsers";
        var noparturl = "/admin/summaryDrill/getUnPaticipateUsers";
        var usertype = 0;
        var that = this;
        this.$Get(parturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
          that.partake={name: '参与学生',number: data.data.total};
        });
        this.$Get(noparturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
          that.nopartake={name: '未参与学生',number: data.data.total};
        });
        if(that.changeIndex==1){
          this.$Get(parturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
            that.partake={name: '参与学生',number: data.data.total};
            that.studentTableData = data.data.records;
            that.page.total= data.data.total
          });
        }else {
          this.$Get(noparturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
            that.nopartake={name: '未参与学生',number: data.data.total};
            that.studentTableData = data.data.records;
            that.page.total= data.data.total
          });
        }
      },
      getWorkerData(hieId){//职工赋值

        var parturl = "/admin/summaryDrill/getPaticipateUsers";
        var noparturl = "/admin/summaryDrill/getUnPaticipateUsers";
        var usertype = 2;
        var that = this;
        this.$Get(parturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
          that.partake={name: '参与职工',number: data.data.total};
        });
        this.$Get(noparturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
          that.nopartake={name: '未参与职工',number: data.data.total};
        });
        if(that.changeIndex==1){
          this.$Get(parturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
            that.partake={name: '参与职工',number: data.data.total};
            that.workerTableData = data.data.records;
            that.page.total= data.data.total
          });
        }else {
          this.$Get(noparturl, {hieId : hieId, type : usertype,current:that.page.current,size:that.page.size}, function (data) {
            that.nopartake={name: '未参与职工',number: data.data.total};
            that.workerTableData = data.data.records;
            that.page.total= data.data.total
          });

        }
        // this.workerTableData=
      },
      getDeptData(hieId){//部门数据赋值
        var parturl = "/admin/summaryDrill/getPaticipateDepartments";
        var noparturl = "/admin/summaryDrill/getUnPaticipateDepartments";
        var that = this;
        this.$Get(parturl, {hieId : hieId,current:that.page.current,size:that.page.size}, function (data) {
          that.partake={name: '参与部门',number: data.data.total};
        });
        this.$Get(noparturl, {hieId : hieId,current:that.page.current,size:that.page.size}, function (data) {
          that.nopartake={name: '未参与部门',number: data.data.total};
        });
        if(this.changeIndex==1){
          this.$Get(parturl, {hieId : hieId,current:that.page.current,size:that.page.size}, function (data) {
            that.partake={name: '参与部门',number: data.data.total};
            that.deptTableData=data.data.records;
            that.page.total=data.data.total;
          });
        }else {
          this.$Get(noparturl, {hieId : hieId,current:that.page.current,size:that.page.size}, function (data) {
            that.nopartake={name: '未参与部门',number: data.data.total};
            that.deptTableData=data.data.records;
            that.page.total=data.data.total
          });
        }
        // this.deptTableData=
      },
      //关闭添加文件
      closePartakeModal() {
        this.$emit("closePartakeModal", {state: false});
        this.partakeData.state = false;
        this.page= {
            total: 0, //数据总数
            current: 1, // 当前页码
            size: 10, //每页条数
            showTotal: true
        };
        this. partake={
            name: '',
            number: '',
        };
        this. nopartake={
            name: '',
            number: '',
        };
        this.changeIndex = 1
      },
      // 分页
      changePageTable1(val) {
        this.page.current = val;
        if(this.nameIndex==1){//参与部门Workers
          this.getDeptData(this.value);
        }else if(this.nameIndex==2){//参与职工
          this.getWorkerData(this.value);
        }else if(this.nameIndex==3){//参与学生
          this.getStudentData(this.value);
        }else if(this.nameIndex==4){//参与教师
          this.getTeacherData(this.value);
        }
      },
    }
  };
</script>

<style lang="less" scoped>
  @import url("../../diagnosis/modal/normModal.less");
  @import url("./setupModal.less");
  .tableHeight2{
    min-height: 75%;
    max-height: 80%;
  }
</style>
