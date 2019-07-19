<template>
  <div class="execution">
    <div class="funBtn">
      <el-button type="primary"
                 @click="handleReturn"
                 con="el-icon-close"
                 size="small">返 回</el-button>
    </div>
    <div class="tableHeight-two">
      <el-table :data="tableData" height="100%" v-loading="tableData.loading"
                fit highlight-current-row style="min-width: 100%;min-height: 100%;">
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="数据名称"  show-overflow-tooltip  prop="dataName" align="center"></el-table-column>
        <el-table-column label="描述"   show-overflow-tooltip  prop="description" align="center"></el-table-column>
        <el-table-column label="前值" prop="beforeVal" align="center"></el-table-column>
        <el-table-column label="后值" prop="afterVal" align="center"></el-table-column>
        <el-table-column label="类型" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.operateType| operateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="createName" align="center" width="100"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center" width="180"></el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#19be6b" v-if="scope.row.enableFlag === '0'">启用</span>
            <span v-else style="color:#ed4014">禁用</span>
<!--<el-tag :type="scope.row.enableFlag | statusFilter">{{scope.row.enableFlag | isStatus}}</el-tag>-->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="text"
                       icon="el-icon-delete"
                       size="small"
                       plain
                       style="color:#f04409"
                       @click="handleDel(scope.row,scope.index)">删除</el-button>
            <el-button type="text"
                       v-if="scope.row.enableFlag == 0"
                       icon="icon-lock"
                       size="small"
                       plain
                       @click="handlelock(scope.row,scope.index)">禁用</el-button>
            <el-button type="text"
                       v-if="scope.row.enableFlag == 1"
                       icon="icon-lock"
                       size="small"
                       plain
                       @click="handlelock(scope.row,scope.index)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="text-align: right">
        <el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="page.currentPage"
                       :page-size="page.pageSize" layout="total, prev, pager, next" :total="page.total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
  import { fetchList,delObj,lockObj} from '@/api/database/databaselog'
  export default {
    name: 'databaselog',
    data() {
      return {
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableLoading: false,
        dataId:null,
        dimId:null,
        deptId:null
      }
    },
    created() {
      this.dataId = this.$route.query.dataId;
      this.dimId = this.$route.query.dimId;
      this.deptId = this.$route.query.deptId;
      this.getList(this.page,{dataId:this.dataId,dimId:this.dimId});
    },
    mounted: function() { },
    computed: {
    },
    methods: {
      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size:page.pageSize
        }, params)).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      handleDel: function(row, index) {
        var _this = this
        this.$confirm('是否确认删除当前记录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delObj(row.logId)
        }).then(data => {
          _this.tableData.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getList(this.page,{dataId:this.dataId,dimId:this.dimId})
        }).catch(function(err) { })
      },
      handlelock(row, index){
        var enableObj = {logId:row.logId,enableFlag:row.enableFlag};
        var msg = row.enableFlag == '0' ? '禁用成功' : '启用成功'
        lockObj(row).then(data => {
          this.tableData.splice(index, 1, Object.assign({}, row))
          this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          })
          this.getList(this.page,{dataId:this.dataId,dimId:this.dimId})
        })
      },
      handleReturn () {
        var dataId = this.dataId;
        var deptId = this.deptId;
        this.$router.push({path: '/valueIndex', query: {dataId: dataId,deptId:deptId}})
      },
      changePage(num) {
        this.page.currentPage = num
        this.getList(this.page,{dataId:this.dataId,dimId:this.dimId});
      },
      changeSize(size) {
        this.page.pageSize = size
        this.getList(this.page,{dataId:this.dataId,dimId:this.dimId});
      }
    },
    filters: {
      // statusFilter(value) {
      //   var output = ''
      //   switch (value) {
      //     case '1':
      //       output = 'danger'
      //       break
      //     case '0':
      //       output = 'success'
      //       break
      //   }
      //   return output
      // },
      // isStatus(value) {
      //   var output = ''
      //   switch (value) {
      //     case '0':
      //       output = '启用'
      //       break
      //     case '1':
      //       output = '禁用'
      //       break
      //   }
      //   return output
      // },
      operateFilter(value) {
        var output = ''
        switch (value) {
          case 'A':
            output = '新增'
            break
          case 'E':
            output = '修改'
            break
          case 'D':
            output = '删除'
            break
        }
        return output
      }
    }
  }
</script>

<style scoped>
</style>
