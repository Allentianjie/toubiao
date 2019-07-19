<template>
    <Modal v-model="fileList.state" width="40%" :mask-closable="false" @on-cancel="closeModal">
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>文件管理</span>
        </p>
        <div class="fileManage">
            <Divider orientation="left">目标支撑文件</Divider>
            <div class="fileBox">
                <Poptip
                    trigger="hover"
                    v-for="(item,index) in fileData.target"
                    :key="index"
                    placement="top"
                >
                    <div class="fileItem">
                        <Icon class="listItem" type="ios-paper"/>
                        <div class="listText">{{item.fileName + '.' + item.fileSuffix}}</div>
                    </div>
                    <div slot="content">
                        <div class="text">{{item.fileName + '.' + item.fileSuffix}}</div>
                        <Button
                            class="btn"
                            size="small"
                            @click="openPreviewModal(item)"
                            type="success"
                            ghost
                        >预览</Button>
                    </div>
                </Poptip>
            </div>
            <Divider orientation="left">标准支撑文件</Divider>
            <div class="fileBox">
                <Poptip
                    trigger="hover"
                    v-for="(item,index) in fileData.standard"
                    :key="index"
                    placement="top"
                >
                    <div class="fileItem">
                        <Icon class="listItem" type="ios-paper"/>
                        <div class="listText">{{item.fileName + '.' + item.fileSuffix}}</div>
                    </div>
                    <div slot="content">
                        <div class="text">{{item.fileName + '.' + item.fileSuffix}}</div>
                        <Button
                            class="btn"
                            size="small"
                            @click="openPreviewModal(item)"
                            type="success"
                            ghost
                        >预览</Button>
                    </div>
                </Poptip>
            </div>
            <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
        </div>
        <div slot="footer" style="text-align: center">
            <Button type="primary" size="large" @click="closeModal">关闭</Button>
        </div>
    </Modal>
</template>

<script>
import Preview from "@/components/preview";
export default {
    components: { Preview },
    props: {
        fileList: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            previews: {//预览文件数据
                data: [],
                state: false,
                name: ""
            },
            data: {},
            fileData: {//文件列表
                target: [],
                standard: []
            }
        };
    },
    methods: {
        //关闭预览
        closePreview (val) {
            this.previews.state = val;
        },

        //打开预览
        openPreviewModal (row) {
            // 把选择的文件数据===>previews.data传给子组件
            var authcode = "";
            this.previews.name = row.fileSuffix
            this.previews.data = '/mngfile/chunkfile/previewStream/' + row.fileId;
            this.previews.state = true;
            this.$refs.preview.getPreviewData();
        },
        // 查询该id下的文件
        getFileList () {
            this.data = this.fileList.data;
            //这里根据当前点击id请求文件列表
            this.fileData.target = this.data.targetFiles
            this.fileData.standard = this.data.standardFiles
        },
        //关闭添加文件
        closeModal () {
            let flag = false;
            this.$emit("closeMains", flag);
        }
    }
};
</script>

<style lang="less" scoped>
.fileBox {
    width: 100%;
    min-height: 180px;
    padding: 5px 30px;
    .fileItem {
        float: left;
        width: 60px;
        height: 80px;
        margin: 5px 10px;
        .listItem {
            font-size: 55px;
            display: inline-block;
            color: #79b4ec;
        }
        .listText {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
.content {
    text-align: center;
}
.text {
    width: 100%;
    height: 30px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
}
.btn {
    // display: inline-block;
    margin: 5px auto;
    width: 100%;
    height: 30px;
    text-align: center;
}
</style>
