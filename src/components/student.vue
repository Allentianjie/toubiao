<template>
  <Modal v-model="PrincipalData.state" width="30%" :mask-closable="false" @on-cancel="closeModal">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>学生管理</span>
    </p>
    <div>
      <div>
        <div class="M_search">
        </div>
        <div style="height:calc(100% - 90px)">
          <!--<el-table :data="tableData" stripe :cell-style="paddingMy" style="width: 100%;" @selection-change="handleSelectionChange">-->
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <!--<el-table-column align="center" prop="name" label="姓名"></el-table-column>-->
          <!--<el-table-column align="center" prop="username" label="用户名"></el-table-column>-->
          <!--</el-table>-->
          <Scroll style="height:calc(100% - 90px)">
            <Table
              ref="purchaseTable"
              :cell-style="paddingMy"
              @on-select="handleSelectRow" @on-select-cancel="handleCancelRow"
              @on-select-all="handleSelectAll" @on-select-all-cancel="handleSelectAll"
              highlight-row
              style="margin-top:5px;width: 100%"
              :data="tableData"
              :columns="columns"
            ></Table>
          </Scroll>
        </div>
        <div class="M_search" style="text-align:right;padding: 5px 15px">
          <Page
            :total="total"
            showTotal
            :current="page"
            :page-size="size"
            @on-change="changeindexPage"
          ></Page>
        </div>
      </div>
    </div>
    <div slot="footer" style="text-align: center">
      <Button type="primary" size="large" @click="handleSubmit()">保存</Button>
      <!--<Button type="warning" size="large" @click="handleReset()">重置</Button>-->
    </div>
  </Modal>
</template>

<script>
  import store from "@/store";
  import {NeizhenUtil, datarouters} from "../util/datarouters";

  export default {
    components: {},
    props: {
      PrincipalData: {
        type: Object,
        required: true
      }
    },
    mounted() {
      // console.log(1, this.selectReset)
    },
    data() {
      return {
        activeName: "one",
        selectedIds: new Set(),//选中的合并项的id
        selectedSum: 0, //选中的总数量
        paddingMy: {
          'padding': '5px 0'
        },
        tableData: [],
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "姓名",
            key: "name",
            align: "center"
          },
          {
            title: "用户名",
            key: "username",
            align: "center"
          }
        ],
        selections: [], //选中人。
        page: 1,
        size: 10,
        total: 0
      };
    },
    created() {
    },
    methods: {
      handleSelectAll(selection) {
        // 取消全选 数组为空
        if (selection.length === 0) {
          // cy 若取消全选，删除保存在selectedIds里和当前table数据的id一致的数据，达到，当前页取消全选的效果
          // 当前页的table数据
          let data = this.$refs.purchaseTable.data
          data.forEach((item) => {
            if (this.selectedIds.has(item.userId)) {
              this.selectedIds.delete(item.userId);
              this.selections.splice(item);
            }
          })

        } else {
          selection.forEach(item => {
            this.selectedIds.add(item.userId);
            this.selections.push(item)
          })
        }
        //同步
        this.selectedSum = this.selectedIds.size
      },
      //  选中某一行
      handleSelectRow(selection, row) {
        this.selectedIds.add(row.userId);
        this.selections.push(row);
      },
      //  取消某一行
      handleCancelRow(selection, row) {
        this.selectedIds.delete(row.userId);
        this.selections.splice(row);
      },
      //  这个函数就放在你点击翻页的函数里就行了（需要注意要在table将数据渲染完毕后执行，否则报错），
      //  达到每次翻页加载时将以前选中的row勾选上的效果
      // cy 给跨页丢失的选中行重新添加选中状态
      setChecked() {
        // 找到绑定的table的ref对应的dom，找到table的objData对象，objData保存的是当前页的数据
        let objData = this.$refs.purchaseTable.objData;
        for (let index in objData) {
          // cy 设置审批状态为拒绝的采购单的默认勾选状态为 禁止
          // if (objData[index].groupAuditStatus === '4') {
          //   objData[index]._isDisabled = true
          // }
          if (this.selectedIds.has(objData[index].userId)) {
            // cy 弊端 每次切换select都会触发table的on-select事件
            // this.$refs.purchaseTable.toggleSelect(index) // 在保存选中的ids的set合集里找与当前页数据id一样的行，使用toggleSelect（index），将这一行选中
            // cy 改进
            objData[index]._isChecked = true
          }
        }
      },
      handleSelectionChange(val) {
        console.log(val)
        this.selections = val
        // this.selections = val;
      },
      loadData() {
        this.selections = [];
        var that = this;
        // this.searchPrincipalUser();
        console.log(this.PrincipalData)
        this.refreshUserData()
      },
//查询列表
      refreshUserData() {
        this.$Get("/admin/user/getUsersPagesForAssign?deptId="
          + this.PrincipalData.data.data.deptId + "&identId="
          + this.PrincipalData.data.data.identId
          + "&current=" + this.page
          + "&size=" + this.size, null, res => {
          this.tableData = res.data.records;
          this.total = res.data.total;
          setTimeout(() => {
            this.setChecked()
          }, 500)
        })
      },

      // 分页查看
      changeindexPage(val) {
        this.page = val;
        //this.getRoleList();
        this.refreshUserData();
      },
      //选中行
      selectRow(selection) {
        this.selections = selection;
      },
      //关闭添加文件
      closeModal() {
        //把选中的传过去 顺便关闭modal
        let data = this.selections;
        this.$emit("closePrincipals", data);
        this.selections = [];
      },
      //保存
      handleSubmit() {
        // 上面选中了文件  存在 this.selections里

        //把选中的传过去 顺便关闭modal
        let data = this.selections;
        this.$emit("closePrincipals", data);
        this.selections = [];
      },
      //重置
      handleReset() {
      }
    }
  };
</script>
<style lang="less" scoped>
  .M_search {
    padding: 13px 15px;
    text-align: left;

    > div {
      margin-right: 2%;
    }

    .ivu-btn-primary {
      margin-right: 10px;
    }
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  ::-webkit-scrollbar {
    width: 6px;
    height: 16px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/

  ::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.63);
    border-radius: 6px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  /*定义滑块 内阴影+圆角*/

  ::-webkit-scrollbar-thumb {
    background-color: #719ad8;
    border-radius: 6px;

    -webkit-box-shadow: inset 0 0 6px rgba(113, 154, 216, 0.3);
  }

  .role {
    // padding: 10px;
    // overflow: hidden;
    // overflow-y: auto;
    // height: 250px;
  }

  .active {
    color: #fff;
    background: #719ad8;
  }

  .department {
    overflow: hidden;
    overflow-y: auto;
    max-height: 400px;
    padding: 10px;
    // border-radius: 3px;
    // -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -o-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    > ul {
      height: 100%;
      padding: 10px;
      // max-height: 400px;
      // overflow: hidden;
      // overflow-y: auto;
      // background: #719ad8;
      > li:hover {
        color: #fff;
        background: #719ad8;
        cursor: pointer;
      }

      > li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        text-decoration: none;
        list-style: none;
        border: 1px solid #ddd;
      }
    }
  }
</style>

