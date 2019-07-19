<template>
  <div class="execution" style="background: #fff;height: 100%">
    <div class="M_search">
      参数过滤：<Input placeholder="请输入过滤条件" v-model="searchName.filterName" style="width: auto"/>
      <el-button type="primary" icon="el-icon-search" plain @click="searchParams" size="small">搜索</el-button>
      <el-button type="primary" :disabled="adddisable" plain @click="insertData" size="small">新增</el-button>
    </div>
    <div class="tableHeight2">
      <el-table :data="tableData" height="100%" style="min-width: 100%;min-height: 100%">
        <el-table-column label="参数名">
          <template slot-scope="scope">
            <span style="color:red" v-if="scope.row.rowoptype == 1">*</span>
            <el-input v-model="scope.row.paramName" placeholder="请输入内容" v-if="scope.row.rowoptype == 1" style="width: 90%"></el-input>
            <span v-if="scope.row.rowoptype == 0">{{ scope.row.paramName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="400">
          <template slot-scope="scope">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1.3, maxRows: 4}"
              placeholder="请输入内容"
              v-model="scope.row.paramDesc" v-if="scope.row.rowoptype == 1" style="width: 100%">
            </el-input>
            <span v-if="scope.row.rowoptype == 0">{{ scope.row.paramDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标识">
          <template slot-scope="scope">
            <span style="color:red" v-if="scope.row.rowoptype == 1">*</span>
            <el-input v-model="scope.row.flag" placeholder="请输入内容" v-if="scope.row.rowoptype == 1" style="width: 90%"></el-input>
            <span v-if="scope.row.rowoptype == 0">{{ scope.row.flag }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.value" placeholder="请输入内容" v-if="scope.row.rowoptype == 1" style="width: 90%"></el-input>
            <span v-if="scope.row.rowoptype == 0">{{ scope.row.value }}</span>
          </template>

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" v-if="scope.row.rowoptype == 1" @click="saveRowData(scope.row)">
              保存
            </el-button>
            <el-button type="warning" plain size="mini" v-if="scope.row.rowoptype == 0"
                       @click="updateRowData(scope.row)">修改
            </el-button>
            <el-button type="warning" plain size="mini" v-if="scope.row.rowoptype == 1"
                       @click="cancelRowData(scope.row)">撤销
            </el-button>
            <el-button type="danger" plain size="mini" v-if="scope.row.operation=='update'"
                       @click="deleteRowData(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>


      </el-table>
    </div>
    <div class="pagination-container" style="text-align: right">
      <el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="initPage.current"
                     :page-size="initPage.size" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Tree from '@/store'

  import {NeizhenUtil, datarouters} from "../../../../util/datarouters"

  import {SysParamsClass} from "./js/params"

  export default {

    data() {
      return {
        searchName: {
          filterName: ''
        },
        adddisable: false,
        tableData: [],
        total: 0,
        sysParamsCls: null,
        initPage: {current: 0, size: 10}


      }
    },
    created() {

    },
    mounted() {
      this.sysParamsCls = new SysParamsClass(this);

      this.sysParamsCls.pageParams(this.initPage.current, this.initPage.size, null);


    },
    watch: {},
    methods: {
      searchParams() {
        this.sysParamsCls.pageParams(this.initPage.current, this.initPage.size, this.searchName.filterName);
      },

      changePage(num) {
        this.initPage.current = num;
        this.searchParams();
      },
      changeSize(size) {
        this.initPage.size = size;
        this.searchParams();
      },
      insertData() {
        var mdata = [];
        mdata.splice(0, 1, {
          paramName: '',
          paramDesc: '',
          flag: '',
          value: '',
          rowoptype: 1,
          operation: "add"
        });
        this.tableData.forEach(e => {
          mdata.push(e);
        });

        this.tableData = mdata;
        this.adddisable = true;


      },

      updateRowData(row) {
        row.rowoptype = 1;
        row.operation = "update";
        this.adddisable = true;
      },

      saveRowData(row) {
        if (NeizhenUtil.isEmpty(row.paramName) || NeizhenUtil.isEmpty(row.flag)) {
          this.$Message.error("必填项缺少值，请填入必须的必填项！");
          return;
        }

        if (row.operation == "update") {
          // 修改
          this.sysParamsCls.updateParams(row);
        } else {
          // 新增
          this.sysParamsCls.saveParams(row);
        }
      },

      cancelRowData(row) {
        row.rowoptype = 0;

        this.adddisable = false;
        if (row.operation == "add") {
          var sdata = this.tableData;
          sdata.splice(0, 1);
          this.tableData = sdata;
        }

      },

      deleteRowData(row) {
        var _this = this
        this.$confirm('是否确认删除参数 ' + row.paramName + ' 吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          _this.sysParamsCls.deleteParams(row.id);
        }).catch(function (err) {
        })
      }


    }


  }
</script>
