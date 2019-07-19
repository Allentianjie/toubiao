<template>
    <div id="preView" style="width:100%;text-align:center">
        <Modal
            id="preViewBox"
            class-name="vertical-center-modal"
            v-model="previews.state"
            width="60%;height:100%"
            :mask-closable="false"
            @on-cancel="closeModal"
        >
            <div v-show="Loading" class="loadingIcon">
                <i class="el-icon-loading"></i>
            </div>

            <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
                <span>预览文件</span>
            </p>
            <div v-if="imgState" class="img">
                <img :src="src" alt>
            </div>
            <div v-else class="doc">
                <div class="arrow">
                    <Button @click="changePdfPage(0)" type="text" ghost>上一页</Button>
                    <span>{{currentPage}} / {{pageCount}}</span>
                    <Button @click="changePdfPage(1)" type="text" ghost>下一页</Button>
                </div>
                <div class="pdf" style="height:100%">
                    <pdf
                        :src="src"
                        :page="currentPage"
                        @num-pages="pageCount=$event"
                        @page-loaded="currentPage=$event"
                        @loaded="loadPdfHandler"
                    ></pdf>
                </div>
                <!-- <iframe class="prism-player" :src="pdfUrl" width="100%" height="100%"></iframe> -->
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="warning" size="large" @click="closeModal()">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { Loading } from "element-ui";
import pdf from "vue-pdf";
import store from "@/store";
import { getfileName } from "@/api/utils"; //引入截取文件后缀名
import axios from "axios";
export default {
    components: {
        pdf
    },
    props: {
        previews: {
            type: Object,
            required: true
        }
    },
    mounted() {
        // console.log(111)
    },
    data() {
        return {
            pdfUrl: "",
            Loading: false,
            imgState: true,
            src: "",
            numPages: null,
            loadedRatio: 0,
            currentPage: 1,
            pdfpages: [],
            pageCount: ""
        };
    },
    methods: {
        //获取预览文件
        getPreviewData() {
            let name = this.previews.name; //获取后缀名
            if (name == "jpg" || name == "png") {
                //图片文件
                //图片的预览方式
                this.src = "";
                this.Loading = true;
                let url = this.previews.data;
                // console.log(url)
                axios
                    .get(url, {
                        responseType: "arraybuffer"
                    })
                    .then(response => {
                        return (
                            "data:image/png;base64," +
                            btoa(
                                new Uint8Array(response.data).reduce(
                                    (data, byte) =>
                                        data + String.fromCharCode(byte),
                                    ""
                                )
                            )
                        );
                    })
                    .then(data => {
                        //接收转换后的Base64图片
                        this.src = data;
                        this.Loading = false;
                        this.imgState = true;
                    });
                // this.imgState=true
            } else {
                //非图片文件
                this.src = "";
                this.Loading = true;
                let url = this.previews.data;
                var headers = {
                    Authorization: `Bearer ${store.state.token}`
                };
                var loadingTask = pdf.createLoadingTask({
                    url: url,
                    httpHeaders: headers
                });
                this.src = loadingTask;
                this.currentPage = 1;
                this.src.then(pdf => {
                    this.Loading = false;
                    this.imgState = false;
                    this.pageCount = pdf.numPages;
                });

                // console.log(this.previews.data)
                // this.$Get(this.previews.data,null,res=>{
                //     // 当然上面的是可以的，但是此access_token 是有时效性的，只是放在这边当作个例子，至于最后我为什么加了个测试.pdf 是可以在浏览器标签叶上显示
                // window.open('/static/pdf/web/viewer.html?file=' + encodeURIComponent(url))
                // 有效 服务器配置跨域处理
                // window.open('/static/pdf/web/viewer.html?file=' + url)
                // })
                // 这儿的url， 就是通过 axios 进行请求的地址，只不过换成了从导航url进行请求的方式
                // let url = "/mngfile/chunkfile/previewStream/7" + ".pdf";
                // this.pdfUrl = `/static/pdf/web/viewer.html?file=${encodeURIComponent(
                //     url
                // )}`;
            }
        },
        // 将返回的流数据转换为url
        getObjectURL(file) {
            let url = null;
            if (window.createObjectURL != undefined) {
                // basic
                url = window.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                // webkit or chrome
                try {
                    url = window.webkitURL.createObjectURL(file);
                } catch (error) {}
            } else if (window.URL != undefined) {
                // mozilla(firefox)
                try {
                    url = window.URL.createObjectURL(file);
                } catch (error) {}
            }
            return url;
        },
        changePdfPage(val) {
            //翻页
            if (val === 0 && this.currentPage > 1) {
                this.currentPage--;
            }
            if (val === 1 && this.currentPage < this.pageCount) {
                this.currentPage++;
            }
        },
        // pdf加载时
        loadPdfHandler(e) {
            this.currentPage = 1; // 加载的时候先加载第一页
        },
        //关闭
        closeModal() {
            console.log("关闭了");
            let flag = false;
            this.$emit("closePreview", flag);
            this.imgState = true;
            this.src = "";
        },
        error(err) {
            this.$Loading.finish();
            console.log("preview error", err);
            this.$Message.error("加载文件错误，请检查文件是否存在！");
        },
        fileloaded() {
            this.$Loading.finish();
        }
    }
};
</script>
<style lang="less" scoped>
.pdf {
    overflow: hidden;
    overflow-y: auto;
}
.arrow {
    position: absolute;
    top: 50px;
    right: 10px;
    z-index: 1000;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 200px;
    height: 50px;
    padding: 5px;
    margin: 0 auto;
    text-align: center;
    background: rgba(40, 40, 71, 0.493) !important;
    > span {
        display: inline-block;
        width: 80px;
        color: #fff;
    }
}
.img {
    position: relative;
    z-index: 1000;

    // background: saddlebrown;
    overflow: auto;
    width: 100%;
    height: 100%;
}
.text {
    position: relative;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #000018;
}
.loadingIcon {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1100;
    width: 50px;
    height: 50px;
    margin-top: -25px;
    margin-left: -25px;
    color: #0000c4;
    font-size: 30px;
}
</style>
