<template>
  <!--部门树形弹框-->
  <Modal v-model="paramModal.state" class-name="depModal" width="80"
         :mask-closable="false" @on-cancel="paramModal.state = false">
    <p slot="header">
      <span>{{ paramModal.title }}</span>
    </p>
    <div style="width: 100%">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="参数名" prop="paramName">
          <Input v-model="formValidate.paramName"></Input>
        </FormItem>
        <FormItem label="描述" prop="paramDesc">
          <Input v-model="formValidate.paramDesc"></Input>
        </FormItem>
        <FormItem label="标识" prop="flag">
          <Input v-model="formValidate.flag"></Input>
        </FormItem>
        <FormItem label="类型" prop="paramType">
          <RadioGroup v-model="formValidate.paramType" >
            <Radio label="输入框" value="0"></Radio>
            <Radio label="下拉框" value="1"></Radio>
            <Radio label="弹出框" value="2"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="数据" v-if="formValidate.paramType=='1'">

          <el-table
            :data="tableData" max-height="200"
            style="width: 100%;height : 100%">
            <el-table-column label="显示" >
              <template slot-scope="scope">
                <span v-html="displayParamTypeLabel" v-if="scope.row.input == 1">

                </span>

                <span v-text="scope.row.label" v-if="scope.row.input == 0">

                </span>


              </template>
            </el-table-column>
            <el-table-column label="值" prop="value" >
              <template slot-scope="scope">
                <span v-html="displayParamTypeValue" v-if="scope.row.input == 1">

                </span>

                <span v-text="scope.row.label" v-if="scope.row.input == 0">

                </span>


              </template>
            </el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button size="small" type="primary" plain  v-if="scope.row.input == 1" @click="saveSelectRowData(scope.row)">保存</el-button>



              </template>
            </el-table-column>

          </el-table>
        </FormItem>

        <FormItem label="弹出框类型" v-if="formValidate.paramType=='2'">
          <RadioGroup v-model="formValidate.values" >
            <Radio label="部门选择" value="0"></Radio>
            <Radio label="角色选择" value="1"></Radio>
            <Radio label="人员选择" value="2"></Radio>
          </RadioGroup>
        </FormItem>




      </Form>



    </div>

    <div slot="footer" class="basisFooter">
      <div class="btn">
        <Button type="primary" @click="saveData">{{ btnText }}</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
  import store from "@/store";

  import {NeizhenUtil, datarouters} from "../../../../util/datarouters";

  import {SysParmsClass} from "./js/params"


  export default {

    components: {},
    props: {
      paramModal: {
        title : '',
        state : false,
        data : [],
        type: Object
      }
    },
    watch: {

    },
    created() {



    },
    mounted() {


    },

    data() {
      return {

        btnText : "确定",
        parentData : null,
        searchName : '',
        operation : "add",
        displayParamTypeLabel : "<el-input v-model=\"scope.row.label\" placeholder=\"请输入显示内容\"></el-input> ",
        displayParamTypeValue : "<el-input v-model=\"scope.row.value\" placeholder=\"请输入值\"></el-input> ",
        formValidate : {
          paramName : '',
          paramDesc : '',
          flag : '',
          paramType : '',
          paramValues : ''
        },
        paramSelectType : {
          label : '',
          value : ''
        },
        ruleValidate: {

          paramName: [
            { required: true, message: '系统参数名', trigger: 'blur' }
          ],

          flag: [
            { required: true, message: '标识不能为空', trigger: 'blur' }
          ]


        },
        tableData : [],

        sysParamsCls : null


      };
    },
    methods: {
      loadDatas(type,id) {
        this.sysParamsCls = new SysParmsClass(this);
        this.clearData();

        if (type == "update") {
          this.sysParamsCls.getParams(id, (data) => {
            this.formValidate.paramName = data.data.paramName;
            this.formValidate.paramDesc = data.data.paramDesc;
            this.formValidate.flag = data.data.flag;
            this.formValidate.paramType = data.data.paramType;
            if (data.data.paramType == "1") {
              try {
                let jsondata = JSON.parse(data.data.values);
                jsondata.forEach(e => {
                  e.input = 0;
                });
                this.tableData = jsondata;
                this.$nextTick(()=> {
                  this.tableData.push({"label" : '', "value" : '', "input" : 1});
                });
              } catch (e) {
              }
            } else {
              this.formValidate.values = data.data.values;
            }



          });
        } else {
          this.tableData.push({"label" : '', "value" : '', "input" : 1});

        }


      },

      saveData() {


      },

      clearData() {
        this.formValidate.paramName = '';
        this.formValidate.paramDesc = '';
        this.formValidate.flag = '';
        this.formValidate.paramValues = '';
        this.tableData = [];


      },

      saveSelectRowData(row) {
        if (row.label == '' || row.value == '') {
          this.$Message.error("数据填写不完整，请重新填写！");
          return;
        }
        var nrowdata = [];
        this.tableData.forEach(e => {
          if (e.input == 0) {
            nrowdata.push(NeizhenUtil.deepClone(e));
          }
        });
        nrowdata.push({"label" : row.label, "value" : row.value, "input" : 0});
        nrowdata.push({"label" : '', "value" : '', "input" : 1});
        this.tableData = nrowdata;

      },

      //关闭
      closeModal() {
        this.$emit("closeRoleUserMain", this.choiceMan.data, [], false, true);



      },

    }
  }
</script>
