<template>

  <!--部门树形弹框-->
  <Modal v-model="choiceDept.state" class-name="depModal" width="50"
         :mask-closable="false" @on-cancel="choiceDept.state = false">
    <p slot="header">
      <span>{{ choiceDept.title }}</span>
    </p>
    <div style="width: 100%">
      <el-input placeholder="输入关键字进行过滤" v-model="searchDeptTree"></el-input>
      <el-tree
        class="filter-tree"
        :data="deptData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        check-strictly
        :show-checkbox="choiceDept.chooseBox"
        @node-click="handleNodeClick"
        :default-expanded-keys="[1]" node-key="id"
        ref="deptTreeChoice"
      ></el-tree>
    </div>
    <div slot="footer" class="basisFooter">
      <div class="btn">
        <Button type="primary" @click="subDeptData">{{ btnText }}</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
  import store from "@/store";

  import {NeizhenUtil, datarouters} from "../../../../util/datarouters";


  export default {

    components: {},
    props: {
      choiceDept: {
        state : false,
        data : [],
        title : '选择部门',
        chooseBox : false,
        type: Object
      }
    },
    watch: {
      searchDeptTree(val) {
        this.$refs.deptTreeChoice.filter(val);
        this.selectedTree = null;
      }

    },
    created() {



    },
    mounted() {
      this.deptData = store.state.chooseDept;


    },



    data() {
      return {

        btnText : "确定",
        parentData : null,
        searchName : '',
        defaultProps: {
          children: "children",
          label: "name"
        },
        state : false,
        selectedTree : null,
        currentPage : 1,
        pageTotal : 0,
        searchDeptTree: "", // 部门搜索框绑定值
        deptData: [], // 部门树形数据赋值
        depModel: false,
        treeSelect: null, //tree选择的数据
        changeDeptData:[],



      };
    },
    methods: {
      loadchargedata() {
        this.$refs.deptTreeChoice.setCheckedKeys([]);
        debugger
        if (this.choiceDept.data[0].type == "2") {
          var that = this;
          this.$AsyncDealData(datarouters.SystemManage.user.userdeptCharge, {userId: this.choiceDept.data[0].userId}, function (data) {
            if (data.data != null) {
              var depIds = [];
              data.data.depts.forEach(e => {
                //depIds.push(e.deptId);
                that.$refs.deptTreeChoice.setChecked(e.deptId, true, false);
              });

            }
          });
        }

      },
      //过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        console.log("tree click", data);
        this.selectedTree = data;
      },

      //确定选择
      subDeptData(){


        var nodes = [];
        if (this.choiceDept.data[0].type == "1") {
          if (this.selectedTree != null) {
            nodes.push(this.selectedTree);
          } else {
            this.$emit("closeSelectTreeMain", this.choiceDept.data, nodes, true);
            return;
          }

        } else {
          nodes = this.$refs.deptTreeChoice.getCheckedNodes(false, false);
        }



        this.$emit("closeSelectTreeMain", this.choiceDept.data, nodes, false);

      }



    }
  }

</script>
