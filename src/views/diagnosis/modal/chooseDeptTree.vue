<template>
    <Modal
        v-model="chooseDeptState.state"
        width="40%"
        :mask-closable="false"
        @on-cancel="closeModal"
    >
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>选择公开部门</span>
        </p>
        <div>
            <Tree :baseData="chooseDeptData" @fCheckTreeData="deptTreeCheck" :showBox="true" :parentBox="true"></Tree>
        </div>

        <div slot="footer" style="text-align: right">
            <Button type="primary" size="large" @click="chooseOpenDepts">选择</Button>
        </div>
    </Modal>
</template>

<script>
import { NeizhenUtil, datarouters } from "../../../util/datarouters";
import Tree from "@/components/tree";
import store from '@/store'
export default {
    props: {
        chooseDepts: '',
        chooseDeptState: {
            type: Object,
            required: true
        }
    },
    components: { Tree },
    mounted () {

    },
    data () {
        return {
            defaultDeptTreeData: [],
            chooseDeptData: [],
            deptTreeSelected: []
        }
    },
    methods: {
        loadData () {
            var that = this;
            // //获得部门树
            // this.$AsyncDealData(datarouters.SystemManage.department.treemenu, null, function(data){
            //   console.log(data.data);
            let storeData = store.state.chooseDataScopeDept;
            var m = NeizhenUtil.treeDataToStandardTreeData(storeData, { "id": "id", "name": "name", "pid": "parentId", "children": "children" });
            that.defaultDeptTreeData = m;
            that.chooseDeptData = that.defaultDeptTreeData;
            // });
            // console.log(store.state.chooseDept)

        },
        deptTreeCheck (selection) {
            console.log(selection);
            this.deptTreeSelected = selection;
        },

        // 过滤子树
        deptfilterChildTree (treeData) {

        },

        chooseOpenDepts () {
            var data = this.deptTreeSelected;
            console.log(data);
            this.$emit("selectOpenDepts", data);
        },

        closeModal () {

            this.$emit("closeOpenDepts");
        },
        setManageDeptSelected (managedepts) {
            var defaultdata = NeizhenUtil.deepClone(this.defaultDeptTreeData);

            // debugger
            var that = this;


            var settreeselected = function (startdata, kdata) {
                startdata.forEach(e => {
                    if (e.id == kdata) {
                        e.checked = true;
                        e.indeterminate = false;
                    } else if (e.children != null && e.children.length > 0) {
                        settreeselected(e.children, kdata);
                    }
                });
            };

            //treereset(defaultdata);

            if (managedepts != null && managedepts.length > 0) {

                managedepts.forEach(e => {
                    settreeselected(defaultdata, e);

                });

                this.chooseDeptData = defaultdata;
            } else {
                this.chooseDeptData = defaultdata;
            }


            //treereset(defaultdata);


        }

    }

};

</script>
