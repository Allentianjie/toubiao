<template>
  <div class="indicatorsImport_wrapper">
    <div v-if="!uploadFile" class="indicatorsImport_header">
      <!--<el-button type="primary" size="small" @click="downloadTemplate()">下载模板</el-button>-->
      <el-button type="primary" size="small">
        <a class="download-btn-a"
           :href="templateAdress" download=""
           title="下载" mce_href="#"><i class="el-icon-download"></i><span>下载模板</span></a></el-button>
      <el-button type="primary" size="small" @click="uploadIndicators()"><i
        class="el-icon-upload2"></i><span>指标上传</span></el-button>
      <label class="item-lable">导入状态：</label>
      <el-select v-model="searchValue" placeholder="请选择状态" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" @click="search()"><i
        class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="primary" size="small" @click="clearSearch"><i
        class="el-icon-delete-solid"></i><span>清空</span></el-button>
      <el-button type="danger" size="small" @click="deleteItem">
        <i class="el-icon-delete-solid"></i><span>删除</span></el-button>
      <el-button type="primary" size="small" @click="createIndicators"><span>创建指标</span></el-button>
    </div>
    <div class="indicatorsImport_content">
      <div v-if="uploadFile" class="indicatorsImport_content_uploadFile">
        <Upload
          type="drag"
          action="/admin/filemanage/savetmpstore"
          :show-upload-list="true"
          :on-success="handleSuccess"
          :before-upload="beforeFileUpload"
          :on-remove="handleRemove"
          accept=".xls,.xlsx"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em style="color: #347ce8">点击上传</em>
            </div>
          </div>
          <div
            style="color: red;"
            class="el-upload__tip"
            slot="tip"
          >文件支持类型：xls,xlsx等，注意：一次只能上传一个文件
          </div>
          <!--<div-->
          <!--style="color: red;"-->
          <!--class="el-upload__tip"-->
          <!--slot="tip"-->
          <!--&gt;注意：一次只能上传一个文件-->
          <!--</div>-->
        </Upload>
        <div class="upload-btn-group">
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <el-button type="primary" size="small" @click="goToBack">返回上一级</el-button>
        </div>
        <!--<el-progress v-if="showProgress" :percentage="percentage" :status="status"></el-progress>-->
      </div>
      <div v-if="!uploadFile" class="indicatorsImport_content_table">
        <el-scrollbar style="width:100%;height: 100%;">
          <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="layTypeDis" label="层面" align="center" min-width="120"></el-table-column>
            <el-table-column prop="dimName" label="维度" align="center" min-width="120"></el-table-column>
            <el-table-column prop="pointName" label="质检点" align="center" min-width="120"></el-table-column>
            <el-table-column prop="targetName" label="指标名称" align="center" min-width="120"></el-table-column>
            <el-table-column prop="createTime" label="处理时间" align="center" min-width="180"></el-table-column>
            <el-table-column prop="impStatus" label="状态" align="center" min-width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.impStatus==0">异常</span>
                <span v-if="scope.row.impStatus==1">新导入</span>
                <span v-if="scope.row.impStatus==2">已创建指标</span>
              </template>
            </el-table-column>
            <el-table-column prop="impResult" label="结果" align="center" min-width="120"></el-table-column>
            <!--<el-table-column prop="" label="操作" align="center" min-width="120">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button type="danger" size="small" @click="deleteOne(scope.row.impId)"><i-->
            <!--class="el-icon-delete-solid"></i><span>删除</span></el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </el-scrollbar>
      </div>
      <div v-if="!uploadFile" class="page-bottom">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20, 50, 100]"
          :page-size="everyPageCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        currentPage: 1,
        everyPageCount: 10,
        totalCount: 0,
        uploadFile: false,
        fileName: '',
        fileList: [],
        form: {
//          type: '1'
        },
        percentage: 0,
        status: "success",
        showProgress: false,
        templateAdress: "static/file/target_template.xlsx",
        searchValue: "",
        multipleSelection: [],
        options: [{
          value: 0,
          label: '异常'
        }, {
          value: 1,
          label: '新导入'
        }, {
          value: 2,
          label: '已创建指标'
        }],
        tableData: []
      }
    },
    watch: {
      uploadFile(newVal, oldVal) {
//        console.log("a: " + newVal, oldVal);
        !newVal && this.getTableData();
      },
    },
    created() {
      this.getTableData()
    },
    mounted() {
    },
    methods: {
      handleSizeChange(val) {
        this.everyPageCount = val;
        this.getTableData()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTableData()
      },
      search() {
        this.getTableData();
      },
      clearSearch() {
        this.searchValue = ''
        this.getTableData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('---', this.multipleSelection)
      },
      createIndicators() {
        this.$Post(`/admin/targetimport/createTarget`, null, res => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '创建成功!'
            });
          } else {
            this.$message({
              type: 'success',
              message: '创建失败!'
            });
          }
        })
      },
      deleteOne(params) {
        let data = {
          impId: params
        }
        this.$confirm('确认删除本条纪录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$Get(`/admin/targetimport`, data, res => {
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getTableData()
            } else {
              this.$message({
                type: 'success',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteItem() {
        this.$confirm('确认删除选中项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids=[]
          this.multipleSelection.forEach(item=>{
            ids.push(item.impId)
          });
          ids=ids.join(',')
          let data={
            ids:ids
          };
          console.log('----ids---',ids,);
          this.$Delete(`/admin/targetimport/batch/`,data, res => {
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getTableData()
            } else {
              this.$message.error('删除失败');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //查询列表数据 tableData
      getTableData() {
        let data = {
          impStatus: this.searchValue,
          current: this.currentPage,
          size: this.everyPageCount,
        };
        this.$Get(`/admin/targetimport/page`, data, res => {
          if (res.code == 0) {
            this.tableData = res.data.records
            this.totalCount = res.data.total
//            this.tableDataLoading = false
          }
        })
      },
      uploadIndicators() {
        this.uploadFile = true
      },
      goToBack() {
        this.uploadFile = false
        this.showProgress = false
        this.fileList = []
      },
      submitUpload() {
        console.log(999, this.fileList)
        if (this.fileList.length > 0) {
          this.showProgress = true
//          this.$refs.upload.submit();
          this.uploadSectionFile(this.fileList);
//          this.uploadSectionFile();
        } else {
          this.$message.closeAll();
          this.$message.warning('请选择要上传的文件')
        }
      },
      uploadSectionFile: function (file) {
        console.log("开始上传", file)
        this.$Upload("/admin/targetimport/upload", null, file, (res) => {
          console.log('-----', res)
          if (res.code == 0) {
            this.$message({
              message: '上传成功！',
              type: 'success'
            });
            this.fileList = [];
            this.goToBack()
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
//        this.$Post('/admin/targetimport/upload', {
//          file: form
//        }, (res) => {
//          console.log(888, res)
//          this.percentage = 100;
//          this.showProgress = false;
//          if (res.code == 0) {
//            this.$message({
//              message: '上传成功！',
//              type: 'success'
//            });
//            this.fileList = []
//          } else {
//            this.$message({
//              message: res.msg,
//              type: 'error'
//            });
//          }
//        })
        console.log("上传结束")
      },
      exceedHander() {
        this.$message.warning('请勿上传多个文件')
      },
      beforeFileUpload(file) {
        console.log(111, file);

        let Xls = file.name.split('.');
        if (Xls[1] === 'xls' || Xls[1] === 'xlsx') {

        } else {
          this.$message.error('上传文件只能是 xls/xlsx 格式!')
          return false
        }
        let isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过10MB!');
          return false;
        }
        this.fileList.push(file);
        return false;
      },
      uploadFileProcess(event, file, fileList) {
//        this.videoFlag = true;
        this.percentage = file.percentage.toFixed(0);
//        this.percentage = Number(file.percentage);
//        this.percentage=50
//        let num="100"
//        console.log('---上传进度对象----', Number(num).toFixed(0),event, file, fileList)
        console.log('---上传进度----', this.percentage, file.percentage, file.percentage.toFixed(0))
      },
      // 文件状态改变
      testOnchange(file, fileList) {
        //this.fileList = fileList;
        this.fileList = [];
        this.fileList.push(file);
        if (this.fileList.length != 0) {
//          this.importUserDialog = true;
        } else {
//          this.importUserDialog = false;
        }
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleSuccess(res, file, fileList) {
        console.log('---上传结果----', res, file, fileList)
        this.percentage = 100;
        this.showProgress = false;
        if (res.code === 20000) {
          this.$message({
            message: '上传成功！',
            type: 'success'
          });
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      }
    }
  }
</script>
<style lang="less">
  .indicatorsImport_wrapper {
    .el-upload-list {
      position: absolute;
      bottom: 50px;
    }
    .el-scrollbar__wrap {
      overflow: auto;
      margin-right: 0 !important;
    }
    .el-progress {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1401 !important;
      background-color: #ffffff;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ivu-upload {
      margin-bottom: 50px;
    }
    .el-upload__tip {
      top: 150px !important;
    }
    /*.ivu-upload-list{*/
    /*margin-bottom: 50px;*/
    /*}*/
  }
</style>
<style lang="less" scoped>
  @import url("./index.less");
</style>
