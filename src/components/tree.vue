<template>
    <div>
        <Tree
        id='taskTreeL'
            :data="baseData"
            @on-check-change="treeDataChecked"
            @on-select-change="treeDataSelected"
            :show-checkbox = showBox
            check-directly
            :check-strictly = "parentBox"
        ></Tree>
    </div>
</template>

<script>
/** 1、如果需要多选框父组件传:showBox=true过来，如果为单选就不用传
 */
export default {
    props: {
        baseData: {
            type: Array,
            required: true
        },
        showBox: {
            type: Boolean
        },
        parentBox: {
          type: Boolean
        },
        selectReset: {
          type: Boolean
        }
    },
  data () {
    return {}
  },
  created () {
      // console.log(88, this.getTree(this.baseData))
    },
    methods: {
        getTree(tree) {
          let arr = [];
          if (!!tree && tree.length !== 0) {
            tree.forEach(item => {
              let obj = {};
              obj.id = item.id;
              obj.title = item.name;
              obj.expand = item.expand;
              obj.children = this.getTree(item.children); // 递归调用
              arr.push(obj);
            });
          }
          return arr;
        },
        treeDataChecked (data) {
            this.$emit('fCheckTreeData', data)
        },
        treeDataSelected (data) {
            if (this.showBox) return
            this.$emit('fSelectTreeData', data)
        }
    }
}
</script>
