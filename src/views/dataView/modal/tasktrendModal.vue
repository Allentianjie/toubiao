<template>
    <Modal v-model="trendData.state" width="40%" :mask-closable="false" @on-cancel="closetrendData">
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>数据变化走势图</span>
        </p>
        <div style="width: 100%;height: 90%">
            <LineChart :lineChartData="LineData"></LineChart>
        </div>
        <div slot="footer" style="text-align: right">
            <Button type="primary" size="large" @click="closetrendData">关闭</Button>
        </div>
    </Modal>
</template>

<script>

import LineChart from "@/components/dataView/trendlineChart";
export default {
    components: { LineChart },
    props: {
        trendData: {
            type: Object,
            required: true
        }
    },
    mounted () {
    },
    data () {
        return {
            LineData: {
                id: '',
                seriesData: {},
            },
        }
    },
    created () {
        this.getTaskEducation(); //获取echart任务数据
    },
    watch: {
        trendData: {
            handler (newValue, oldValue) {
                this.$nextTick(() => {
                    this.getTaskEducation();
                });
            },
            deep: true
        }
    },
    methods: {
        //   获取任务数据
        getTaskEducation () {
            this.LineData = {
                id: "lineTrendId",
                seriesData: this.trendData.data
            };
        },
        //关闭弹窗
        closetrendData () {
            console.log("关闭了");
            let flag = false;
            this.$emit("closeTrackModal", flag);
        },

    }
}
</script>
<style lang="less" scoped>
.role {
    // padding: 10px;
    // overflow: hidden;
    // overflow-y: auto;
    // height: 250px;
}
.department {
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
    // border-radius: 3px;
    // -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // -o-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3), 0 0 40px rgb(255, 255, 255) inset;
    > ul {
        height: 100%;
        background: #719ad8;
        > li {
            width: 100%;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border: 1px solid #ddd;
            text-decoration: none;
            list-style: none;
        }
    }
}
</style>
