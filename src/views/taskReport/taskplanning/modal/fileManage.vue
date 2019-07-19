<template>
    <Modal v-model="fileList.state" width="40%" :mask-closable="false" @on-cancel="closeModals">
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>文件管理</span>
        </p>
        <div class="fileManage">
            <Button
                v-show="addbtnState"
                @click="openAddFile"
                class="btn"
                ghost
                type="success"
                size="small"
                icon="ios-add-circle-outline"
            >添加文件</Button>
            <AddFileModal :addFileState="addFileState" @closeMains="closeMains"></AddFileModal>
            <Divider orientation="left">规划文件</Divider>
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
                            class="textbtn"
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
            <Button type="primary" size="large" @click="closeModals">关闭</Button>
        </div>
    </Modal>
</template>

<script>
import AddFileModal from "@/views/diagnosis/modal/addFile"; //添加文件
import Preview from "@/components/preview";
export default {
    components: { Preview, AddFileModal },
    props: {
        fileList: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            addbtnState: false,
            previews: {
                nameL: "",
                //预览文件数据
                data: [],
                state: false
            },
            data: {},
            fileData: {
                //文件列表
                target: [],
                standard: []
            },
            addFileState: {
                state: false,
                data: []
            }
        };
    },
    methods: {
        // 关闭添加文件框
        closeMains (val) {
            let that = this;
            that.addFileState.state = val;
        },
        // 打开添加文件框
        openAddFile () {
            this.addFileState.data = []; //传是哪个场景下的id
            this.addFileState.state = true;
        },
        //关闭预览
        closePreview (val) {
            this.previews.state = val;
        },

        //打开预览
        openPreviewModal (row) {
            //把选择的文件数据===>previews.data传给子组件
            this.previews.name = row.fileSuffix
            this.previews.data = '/mngfile/chunkfile/previewStream/' + row.fileId;
            this.previews.state = true;
            this.$refs.preview.getPreviewData();
        },
        // 查询该id下的文件
        getFileList () {
            //历史查看
            this.data = this.fileList.data;
            //这里根据历史点击id请求文件列表
            this.fileData.target = this.data.targetFiles;
        },
        //关闭添加文件
        closeModals () {
            let flag = false;
            this.$emit("closeFileManage", flag);
        }
    }
};
</script>

<style lang="less" scoped>
.fileManage {
    position: relative;
    .btn {
        position: absolute;
        right: 0;
        top: -15px;
        z-index: 1000;
    }
}
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

.text {
    width: 100%;
    height: 30px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
}
.textbtn {
    // display: inline-block;
    margin: 5px auto;
    width: 100%;
    height: 30px;
    text-align: center;
}
</style>
