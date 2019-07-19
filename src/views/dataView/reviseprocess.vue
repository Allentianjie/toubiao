<template>
  <div id="flowPage">
    <div class="taskSummaryItem">
      <el-row>
        <el-col :span="5" id="reviseProcessTree">
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="组织机构选择" name="first">
              <div :style="taskHeight" class="flowTreeDiv" >
                <!--@blur="screenInput"-->
                <el-input  v-model="screenTree"  size="small" placeholder="请输入关键字" suffix-icon="el-icon-search">
                </el-input>
                <el-tree :data="treeData"  highlight-current :props="defaultProps" :filter-node-method="filterNode"
                         node-key="id" @node-click="handleNodeClick" ref="tree"></el-tree>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="19" ref="NineHeight" id="rightHeight" >
          <div class="summaryEchart" >
            <FlowChart :flowChartData="flowChartData"></FlowChart>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
  import FlowChart from "@/components/dataView/flowChart.vue";
  // import PictorialBarChart from "@/components/taskHall/pictorialBarChart";
  export default {
    name: "index",
    components: {FlowChart},
    data() {
      return {
        taskHeight:'',
        activeName2: 'first',
        screenTree: '', // 筛选树形
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }
        ],
        flowChartData:{},

      }
    },
    created() {

    },
    mounted () {
      this.getFlowChartData()
      this.$nextTick(() => {
        this.taskHeight = 'height:'+ (this.$refs.NineHeight.$el.offsetHeight - 41) + 'px'
      });
    },
    watch: {
      screenTree(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        let that = this
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 树形选择
      handleNodeClick(data,node){
        if(data.children && data.children.length >0) return
        console.log(1, data);
        console.log(2, node);
      },
      getFlowChartData () {
        // console.log(1111)
        this.flowChartData = {
          id:'flowChartID'
        }
      }
    }
  };
</script>

<style lang='less' scoped>
  @import url("./reviseprocess.less");
</style>
