<template>
    <div style="width:100%;height:100%">
      <!--:height="tableHeight"-->
        <div class="tableBox" ref="tableHeight">
            <Table :height="tableHeight"
                :columns="tableData.columns"
                :data="tableData.data"
                @on-select="frowchecked"
                @on-select-cancel="frowunchecked"
                @on-selection-change="fSelectChange"
                @on-sort-change="fSortChange">
            </Table>
        </div>
        <div class="pageBox">
            <Page show-total
                :current="tableData.currentPage"
                :total="tableData.total"
                size="small"
                :page-size="pageSize =tableData.pageSize ? tableData.pageSize : pageSize"
                placement="top"
                @on-change="fChangePage"
            />
        </div>
    </div>
</template>

<script>
/** 使用表格组件需要传递的参数
 * <Table :tableData="tableData"
 *      @ftablePage="tablePage"
 *      @fSelectTableData="selectTableData"
 *      @fSortChange="sortChangeData"
 * ></Table>

    tableData: {
        columns: []  // 列描述数据对象，是 columns 中的一项  具体配置请参考iview API table文档
        data: [],  //table展示的数据
        total: 100
    }
    ftablePage: 改变分页参数的函数
    fSelectTableData: 表格复选框选中的数据
    fSortChange: 排序当前列的相关数据

    父组件的函数
    tablePage (pageData) {
        this.tableSearch = {...this.tableSearch, ...pageData}
    }
    selectTableData (selectTableData) {
        console.log(selectTableData)
    }
    sortChangeData (sortData) {
        console.log(sortData)
    }
 */
export default {
    props: {
        tableData: {
            type: Object,
            required: true
        }

    },
    mounted () {
        this.tableHeight = this.$refs.tableHeight.offsetHeight
    },
    data () {
        return {
            current: 1, // 当前页码
            // total: 100, // 数据总条数
            pageSize: 10, // 每页条数
            pageSizeOpts: [20, 20, 30, 40, 50], // 每页条数切换的配置
            tableHeight: 100
        }
    },
    methods: {
        fChangePage (current) {
            this.current = current
            this.$emit('ftablePage', {current, pageSize: this.pageSize})
        },
        fChangePageSize (pageSize) {
            this.pageSize = pageSize
            this.current = 1
            this.$emit('ftablePage', {current: 1, pageSize})
        },
        fSelectChange (selection) {
            this.$emit('fSelectTableData', selection)
        },
        frowchecked(selection, index) {
          this.$emit("frowchecked", selection, index);

        },
        frowunchecked(selection, index) {
          this.$emit("frowunchecked", selection, index);
        },
        fSortChange (sortData) {
            this.$emit('fSortChange', sortData)
        }
    }
}
</script>

<style lang="less" scoped>
    .tableBox{
       width: 100%;
       height: calc(100% - 40px);
       background: 'red';
       >div{
           width: 100%;
           height: 100% !important;
       }
    }
    .pageBox{
        height: 40px;
        line-height: 40px;
        text-align: right;
    }
</style>
