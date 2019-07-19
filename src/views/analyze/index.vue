<template>
  <div id="fileSummaryPage">
    <div class="taskSummaryItem" ref="tabsHeight">
      <div class="summaryEchart">
        <Tabs :animated="false"  @on-click="tabsClick" v-model="activeName">
            <TabPane v-for="(item,i) in tabsData" :name="item.name" :label="item.label" :key="i"></TabPane>
        </Tabs>
        <div v-loading="loading" style="" class="mainDiv">
          <div  class="main" v-if="coverIndex.length == 0">
                <el-alert :closable="false"
                    description="暂无数据"
                    type="info"
                    show-icon>
                </el-alert>
          </div>
          <div class="main" v-if="coverIndex.length > 0">

            <div :class="coverIndex.length  <= 4 ? 'divHeight2' : 'divHeight1'">
              <div class="mainTop">
                <div v-on:click="seeContent(item)" v-for="(item,index) in coverIndex" :key="index" class="textbookTOP" v-if="index <= 3">
                  <p>{{item.hieName}}</p>
                  <h4>{{item.reportName}}</h4>
                  <p>{{item.Date}}</p>
                </div>
              </div>
            </div>

            <div v-if="coverIndex.length > 4" class="divHeight1">
              <div class="mainTop">
                <div v-on:click="seeContent(item)" v-for="(item,index) in coverIndex" :key="index" class="textbookTOP" v-if=" index > 3 ">
                  <p>{{item.hieName}}</p>
                  <h4>{{item.reportName}}</h4>
                  <p>{{item.Date}}</p>
                </div>
              </div>
            </div>


          </div>
          <div style="text-align: right;margin-top: 3px">
            <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
          </div>
        </div>
      </div>
    </div>

    <!-- 预览 -->
    <Modal v-model="dialogPreviewVisible" class-name="perviewModel" width="80%" :mask-closable="false" @on-cancel="closefeedBack">
      <p slot="header" style="color:#fff;text-align:left;font-size: 16px">
        <span>查看并下载</span>
      </p>
        <div style="height: 710px">
          <object type="text/x-scriptlet" ref="iframe" v-bind:data="previewUrl" scrolling="no" width="100%" height="100%" frameborder="0">
            <iframe scrolling="no" ref="iframe" v-bind:src="previewUrl" width="100%" height="100%" frameborder="0">
                您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(急速模式)、火狐等主流浏览器。
            </iframe>
          </object>
        </div>
      <div slot="footer" style="text-align: right">
        <Button type="primary" size="large" @click="closeDownload">下载或打印</Button>
        <Button type="primary" size="large" @click="closefeedBack">关闭</Button>
      </div>
    </Modal>

  </div>
</template>
<style lang='less' scoped>
  @import url("./analyze.less");
</style>
<script>

  import Table from '@/components/table'
  import * as http from '@/api/analyze/index'
  import {fetchList} from '@/api/analysis/report'
  import {NeizhenUtil, datarouters} from "../../util/datarouters";

  export default {
    components: {Table},
    data() {
      return{
        divHeight: null,
        loading:false,
        activeName: '',
        tabsData: [],
        coverIndex: [],
        total: 0,
        page: 1,
        pageSize: 6,
        previewUrl:'',
        dialogPreviewVisible:false
      }
    },
    watch: {

    },
    created() {
    },
    mounted() {
      this.getTabsData();
    },
    methods: {
      //关闭弹窗
      closefeedBack() {
          this.dialogPreviewVisible = false
      },
      //下载或打印
      closeDownload(){
          this.$refs.iframe.contentWindow.downloadPdf();
      },
      //获取tab数据
      getTabsData(){
          var that = this;
          http.getLevels({}).then(response => {
            that.activeName = response.data.data[0];
            response.data.data.forEach(e => {
                that.tabsData.push({label:e, name:e});
            });
            that.getList();
          });
      },
      // 获取列表
      getList() {
          var that = this
          that.coverIndex = [];
          that.loading = true;
          fetchList(Object.assign({
            current: that.page,
            size: that.pageSize
          },{'levelName':that.activeName,'enableFlag':'0'})).then(response => {
              that.total = response.data.data.total
              response.data.data.records.forEach(e => {
                  that.coverIndex.push(that.getReportName(e))
                  // {hieName:'1111',reportName:'222222',Date:'55555'},
              })
              that.loading = false;
          })
      },
      //数据封装
      getReportName(data){
           return {
              hieId:data.hieId,
              hieName: data.hieName ,
              reportId:data.reportId,
              templateId:data.templateId,
              reportName: data.levelName + ' 层面质量分析报告',
              Date: data.startTime + '~' + data.endTime,
          }
      },
      // tabs点击
      tabsClick(tab, event) {
         this.getList();
      },
      //查看内容
      seeContent(item){
          this.dialogPreviewVisible = true
          this.previewUrl= '/static/template/reportView.html?reportId='+ item.reportId;
      },
      // 分页查看
      changePage(val) {
        this.page = val;
        this.getList()
      },
    }
  };
</script>
