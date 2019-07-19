<template>
  <!--部门树形弹框-->
  <Modal v-model="deptState.state" class-name="depModal" width="50"
         :mask-closable="false" @on-cancel="closeModal">
    <p slot="header">
      <span>请选择部门机构</span>
    </p>
    <div class="userTree">
      <!--<Input v-model="searchDeptTree"  placeholder="请输入需要搜索的内容" style="width: 100%" />
      <Tree :baseData="deptData" @fSelectTreeData="setDept" :showBox="false"></Tree>-->
      <el-input placeholder="输入关键字进行过滤" v-model="searchDeptTree"></el-input>
      <el-tree
        class="filter-tree"
        :data="deptData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :default-expanded-keys="[1]" node-key="id"
        ref="deptTree2"
      ></el-tree>
    </div>
    <div slot="footer" class="basisFooter">
      <div class="btn">
        <Button type="primary" @click="subDeptData">确定</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
  import store from "@/store";
  export default {
    components: {},
    props: {
      deptState: {
        type: Object
      }
    },
    watch: {
      searchDeptTree(val) {
        this.$refs.deptTree2.filter(val);
      }
    },
    mounted() {
      // console.log(1, this.selectReset)
    },
    data() {
      return {
        defaultProps: {
          children: "children",
          label: "name"
        },
        searchDeptTree: "", // 部门搜索框绑定值
        deptData: [], // 部门树形数据赋值
        depModel: false,
        treeSelect: null, //tree选择的数据
        changeDeptData:[]
      };
    },
    methods: {
      //确定选择
      subDeptData(){
        console.log("关闭了");
        let data = this.changeDeptData;
        this.$emit("closeDeptModal", data);
      },
      //关闭
      closeModal() {
        console.log("关闭了");
        let data = [];
        this.$emit("closeDeptModal", data);
      },
      //过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //选择部门树节点
      handleNodeClick(data) {
        this.changeDeptData=data
      },
      //获取部门数据
      getDeptTree() {
        let param = {
          // deptId: this.changeDeptData.id,
          // hieId: this.searchForm.hieId,
          // size: this.page.size,
          // current: this.page.current
        };
        this.$Get("/admin/dept/treeForRank", param, res => {
          if(this.deptState.data.type==0){
            this.deptData = res.data
          }else {
            this.deptData = res.data
          }
        })


        // console.log(store.state.chooseDept)
        // this.deptData = store.state.chooseDataScopeDept;// 从store里面获取管辖部门树
      }
    }
  };
</script>
<style lang="less" scoped>
</style>
