<template>
  <!--dataMessage-->
  <Modal v-model="trackState.state" class="trackModal" width="80%" :mask-closable="false" @on-cancel="closetrendData">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>诊改轨迹</span>
    </p>
    <div class="divCentre">
      <el-row>
        <el-col :span="12">
          <h3 class="left">指标名称:</h3><p class="rightP">{{dataMessage.taskName}}</p>
        </el-col>
        <el-col :span="12">
          <h3 class="left">应用标准:</h3><p class="rightP">国内一流</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h3 class="left">初始值:</h3><p class="rightP">{{dataMessage.disInitialValue ? dataMessage.disInitialValue : '-'}}</p>
        </el-col>
        <el-col :span="12">
          <h3 class="left">目标值:</h3><p class="rightP">{{dataMessage.disTargetValue ? dataMessage.disTargetValue : '-'}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h3 class="left">预警值:</h3><p class="rightP">{{dataMessage.disWarnValue ? dataMessage.disWarnValue : '-'}}</p>
        </el-col>
        <el-col :span="12">
          <h3 class="left">当前值:</h3><p class="rightP">{{dataMessage.disValue ? dataMessage.disValue: '-'}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h3 class="left">解决方案:</h3><p class="rightP">无</p>
        </el-col>
        <el-col :span="12">
          <h3 class="left">创建时间:</h3><p class="rightP">{{dataMessage.createTime}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h3 class="left">质控周期:</h3><p class="rightP">每天
        </p>
        </el-col>
        <el-col :span="12">
          <h3 class="left">状态:</h3><p class="rightP">
          {{dataMessage.state}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="left">
            <h3 class="left2">关联文档:</h3>
            <!---v-if关联文档file.length>2的时候就不显示-->
            <div v-if="file.length > 0">
              <el-tooltip class="item" effect="light" content="点击可放大关联文档" placement="bottom-end">
                <i @click="fileClick(file.targetFiles)" class="el-icon-zoom-in"></i>
              </el-tooltip>
            </div>
          </div>
          <div class="rightP ">
            <div class="text">
              <div class="file"  v-if="file.length > 0" v-for="item in file">
                  <Icon class="listItem" type="ios-paper"/>
                  <p class="listContent">{{item.fileName}}{{item.fileSuffix}}</p>
                  <Button
                    class="textbtn"
                    size="small"
                    @click="preview(item)"
                    type="success"
                    ghost
                  >预览
                  </Button>
              </div>
              <div v-if="file.length == 0" class="wufile">暂无关联文档</div>
              <!--@click="openPreviewModal(item)"-->
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="left" >
            <h3>整改措施:</h3>
            <!--v-if   整改措施没有数据的时候就不显示-->
            <div  v-if="dataMessage.improve">
              <el-tooltip class="item" effect="light" content="点击可放大诊改措施内容" placement="bottom-end">
                <i @click="ClickAbarbeitung" class="el-icon-zoom-in"></i>
              </el-tooltip>
            </div>
          </div>
          <div class="rightP ">
            <div class="text">
               <!--使用 Vue CLI 3 # 我们为最新的 Vue CLI 3 提供了相应的 iView 插件，如果你正在用 Vue CLI 3，可以直接在插件中搜索 iview，安装插件来使用。 使用推荐工程 # 我们也为您准备好了基础工程，以此为基础开发，可以为您省去大量配置和调试环境的时间。 推荐工程：iview-project 如果您使用了我们推荐的工程，可以略过下面的内容直接进入开发阶段，我们也推荐使用这套工程来构建您的项目。 如果您希望自己配置或使用其它工程，请继续往下阅读。-->
              <p v-if="dataMessage.improve"> {{dataMessage.improve}}</p>
              <p v-else class="wufile">暂无整改措施</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div  class="divPeriod">
        <el-row>
          <el-col :span="12">
            <h3><span>修改记录</span></h3>
            <el-table
              :data="AmendTableData1"
              :cell-style = "paddingMy"
              height="80%"
              :header-cell-style="paddingHeader"
              style="width: 100%;">
              <!--logMessage-->
              <el-table-column
                prop="logMessage"
                label="操作"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column
                prop="createTime"
                align="center"
                show-overflow-tooltip
                label="操作时间">
              </el-table-column>
            </el-table>
            <div class="M_search" style="text-align:right;padding: 5px 15px">
              <Page
                :total="AmendPage.total"
                :showTotal="AmendPage.showTotal"
                :current="AmendPage.current"
                :page-size="AmendPage.size"
                @on-change="changeAmendPage"
              ></Page>
            </div>
          </el-col>
          <el-col :span="12">
            <h3><span>质控周期记录</span></h3>
            <el-table
              :data="PeriodTableData1"
              :cell-style = "paddingMy"
              height="80%"
              :header-cell-style="paddingHeader"
              style="width: 100%;min-height: 100px">
              <el-table-column
                prop="createTime"
                label="日期"
                align="center"
                show-overflow-tooltip
                width="180">
              </el-table-column>
              <el-table-column
                prop="state"
                align="center"
                show-overflow-tooltip
                label="记录值">
              </el-table-column>
              <el-table-column
                prop="description"
                align="center"
                show-overflow-tooltip
                label="状态">
              </el-table-column>
            </el-table>
            <div class="M_search" style="text-align:right;padding: 5px 15px">
              <Page
                :total="PeriodPage.total"
                :showTotal="PeriodPage.showTotal"
                :current="PeriodPage.current"
                :page-size="PeriodPage.size"
                @on-change="changePeriodPage"
              ></Page>
            </div>
          </el-col>
        </el-row>
    </div>
    <!--<div  class="divPeriod">

      <div>
        <el-row>
          <el-col :span="12">

          </el-col>

          <el-col :span="12">
            <el-table
              :data="PeriodTableData2"
              :cell-style = "paddingMy"
              :header-cell-style="paddingHeader"
              style="width: 100%;min-height: 100px">
              <el-table-column
                prop="createTime"
                label="日期"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="state"
                align="center"
                label="记录值">
              </el-table-column>
              <el-table-column
                prop="description"
                align="center"
                label="状态">
              </el-table-column>
            </el-table>
          </el-col>

          <div class="M_search" style="text-align:right;padding: 5px 15px">
            <Page
              :total="PeriodPage.total"
              :showTotal="PeriodPage.showTotal"
              :current="PeriodPage.current"
              :page-size="PeriodPage.size"
              @on-change="changePeriodPage"
            ></Page>
          </div>
        </el-row>
      </div>
    </div>-->

    <div  class="divPeriod">
      <h3><span>关联指标</span></h3>
        <el-row>
          <el-col :span="24"  >
            <el-table
              :data="relevanceTableData"
              :cell-style = "paddingMy"
              height="80%"
              :header-cell-style="paddingHeader"
              style="width: 100%">
              <el-table-column
                prop="taskName"
                label="指标"
                align="center"
                show-overflow-tooltip
                width="180">
                <!--levelType-->
                <template slot-scope="scope">
                  <div @click="clickRelevance(scope.row)" style="color:#2d8cf0;cursor: pointer">
                    <!--<p>{{scope.row.taskName}}+{{scope.row.levelType}}-{{scope.row.levelType === '0' ? '上级' : '下级'}}</p>-->
                    <p>{{scope.row.taskName}}{{scope.row.levelType}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="targetValue"
                align="center"
                label="目标值">
                <template slot-scope="scope">
                  <div>
                    <p>{{scope.row.targetValue  ?scope.row.targetValue : '-'}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="warnValue"
                align="center"
                label="预警值">
                <template slot-scope="scope">
                  <div>
                    <p>{{scope.row.warnValue  ?scope.row.warnValue : '-'}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="disValue"
                align="center"
                label="当前值">
                <template slot-scope="scope">
                  <div>
                    <p>{{scope.row.disValue ? scope.row.disValue : '-'}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="runState"
                align="center"
                label="状态">
                <template slot-scope="scope">

                  <div v-show="scope.row.runState=='0'" class="cellHtml"
                      style="color:#ff7f13">
                    <p>未开始</p>
                  </div>
                  <div v-show="scope.row.runState=='1'" class="cellHtml"
                      style="color:#4ac056">
                    <p>运行中</p>
                  </div>
                  <div v-show="scope.row.runState=='2'" class="cellHtml"
                        style="color:#f04409">
                    <p>已结束</p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <div class="M_search" style="text-align:right;padding: 5px 15px">
            <Page
              :total="relevancePage.total"
              :showTotal="relevancePage.showTotal"
              :current="relevancePage.current"
              :page-size="relevancePage.size"
              @on-change="changeRelevancePage"
            ></Page>
          </div>
        </el-row>
    </div>

    <div slot="footer" style="text-align: right">
      <Button type="primary" size="large" @click="closetrendData">关闭</Button>
    </div>
    <!--关联文件-->
    <Modal v-model="fileList.state" width="60%" class="modalDiv" :mask-closable="false" @on-cancel="closeModal1">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>查看关联文档</span>
      </p>
      <div class="fileManage">
        <!--<div class="fileBox"  v-if="fileList.data.length >0"  style="height: 240px">-->
        <div class="fileBox" style="height: 240px">
          <Poptip
            trigger="hover"
            v-for="(item,index) in file"
            :key="index"
            placement="top"
          >
            <div class="fileItem"  @click="preview(item)" style="cursor: pointer">
              <Icon class="listItem" type="ios-paper"/>
              <div class="listText">{{item.fileName + '.' + item.fileSuffix}}</div>
            </div>
            <div slot="content"  @click="preview(item)" style="cursor: pointer">
              <div class="text">{{item.fileName + '.' + item.fileSuffix}}</div>
              <div  class="btn" >
                <Button
                  size="small"
                  @click="preview(item)"
                  type="success"
                  ghost
                >预览</Button>
              </div>
            </div>
          </Poptip>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="closeModal1">关闭</Button>
      </div>
    </Modal>
    <!--整改措施-->
    <Modal v-model="abarbeitung.state" class="modalDiv" width="60%" :mask-closable="false" @on-cancel="closeModal2">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>整改措施</span>
      </p>
      <div class="fileManage">
        <div class="abarbeitungBox" style="height: 240px">
          <!--使用 Vue CLI 3 # 我们为最新的 Vue CLI 3 提供了相应的 iView 插件，如果你正在用 Vue CLI 3，可以直接在插件中搜索 iview，安装插件来使用。 使用推荐工程 # 我们也为您准备好了基础工程，以此为基础开发，可以为您省去大量配置和调试环境的时间。 推荐工程：iview-project 如果您使用了我们推荐的工程，可以略过下面的内容直接进入开发阶段，我们也推荐使用这套工程来构建您的项目。 如果您希望自己配置或使用其它工程，请继续往下阅读。-->
          {{dataMessage.improve}}
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="closeModal2">关闭</Button>
      </div>
    </Modal>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
  </Modal>
</template>

<script>
  import Preview from "@/components/preview";
export default {
  name: "TrackModal",
  components: {Preview},
  props: {
    trackState: {
      type: Object,
      required: true
    }
  },
  data(){
      return{
        param:{
          targetId: null,
          taskId: null,
        },
        parentId: null,
        abarbeitung: { // 整改措施
          data: '',
          state: false //modal层
       },
        fileList: { //关联文件要传过去的数据
          data: [],
          state: false //modal层
        },
        previews: {//预览文件数据
          data: [],
          state: false,
          name: ""
        },
        paddingMy: {
          'padding':'5px 0'
        },
        paddingHeader: {
          'padding':'7px 0',
          'background':'#F3F3F3'
        },
        file: [
          {
          fileName: '',
          fileSuffix:''
        }
          // {name:'布尔值或函数', fileCod:'.png'},
          // {name:'创建不同样式的按钮，不设置为默认样式。', fileCod:'.png'},
          // {name:'所有带浮层的组件，是否将浮层放置在 body 内', fileCod:'.png'},
          /*{name:'或根组件执行', fileCod:'.exl'},
          {name:'布尔值或函数', fileCod:'.png'},
          {name:'布尔值或函数', fileCod:'.png'},
          {name:'布尔值或函数', fileCod:'.png'},
          {name:'布尔值或函数', fileCod:'.png'},
          {name:'布尔值或函数', fileCod:'.png'},
          {name:'创建不同样式的按钮，不设置为默认样式。', fileCod:'.png'},
          {name:'所有带浮层的组件，是否将浮层放置在 body 内', fileCod:'.png'},
          {name:'布尔值或函数', fileCod:'.png'},
          {name:'布尔值或函数', fileCod:'.png'},
          {name:'布尔值或函数', fileCod:'.png'},*/
        ],
        dataMessage: {},
        AmendTableData1: [],
        AmendTableData2: [],
        PeriodTableData1: [],
        PeriodTableData2: [],
        relevanceTableData: [
          {superiorIndex:'专业生师比',
            targetVal:'17:1',
            warningVal:'>17:1',
            currentVal:'17:1',
            state:'已达标',
          },
          {superiorIndex:'专业生师比',
            targetVal:'17:1',
            warningVal:'>17:1',
            currentVal:'17:1',
            state:'已达标',
          },
          {superiorIndex:'专业生师比',
            targetVal:'17:1',
            warningVal:'>17:1',
            currentVal:'17:1',
            state:'已达标',
          },
          {superiorIndex:'专业生师比',
            targetVal:'17:1',
            warningVal:'>17:1',
            currentVal:'17:1',
            state:'已达标',
          },
          {superiorIndex:'专业生师比',
            targetVal:'17:1',
            warningVal:'>17:1',
            currentVal:'17:1',
            state:'已达标',
          },
        ],
        AmendPage: {
          total: 10, //数据总数
          current: 1, // 当前页码
          size: 5, //每页条数
          showTotal: true
        },
        PeriodPage: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        relevancePage: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 5, //每页条数
          showTotal: true
        },
        abarbeitungConent: '配置和调试环境的时间。 推荐工程：iview-project 如果您使用了我们推荐的工程，可以略过下面的内容直接进入开发阶段，我们也推荐使用这套工程来构建您的项目。 如果您希望自己配置或使用其它工程，请继续往下阅读。使用 Vue CLI 3 # 我们为最新的 Vue CLI 3 提供了相应的 iView 插件，如果你正在用 Vue CLI 3，可以直接在插件中搜索 iview，安装插件来使用。 使用推荐工程 # 我们也为您准备好了基础工程，以此为基础开发，可以为您省去大量配置和调试环境的时间。 推荐工程：iview-project 如果您使用了我们推荐的工程，可以略过下面的内容直接进入开发阶段，我们也推荐使用这套工程来构建您的项目。 如果您希望自己配置或使用其它工程，请继续往下阅读。使用 Vue CLI 3 # 我们为最新的 Vue CLI 3 提供了相应的 iView 插件，如果你正在用 Vue CLI 3，可以直接在插件中搜索 iview，安装插件来使用。 使用推荐工程 # 我们也为您准备好了基础工程，以此为基础开发，可以为您省去大量配置和调试环境的时间。 推荐工程：iview-project 如果您使用了我们推荐的工程，可以略过下面的内容直接进入开发阶段，我们也推荐使用这套工程来构建您的项目。 如果您希望自己配置或使用其它工程，请继续往下阅读。',
      }
  },
  watch: {
    trackState: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          if(this.trackState.type === 'targetId'){
            this.param.targetId = this.trackState.id
            this.param.taskId = null
          } else{
            this.param.targetId = null
            this.param.taskId = this.trackState.id
          }
          this.clickRowId()
        });
      },
      deep: true
    }
  },
  mounted(){

  },
  methods: {
    clickRowId(){
      let that = this
      this.$Get("/admin/task/track",this.param , res => {
        // res.data.targetState
        that.dataMessage = res.data
        that.file = res.data.targetFiles
        let state = res.data.targetState==='0'?'未开始':
            res.data.targetState==='1'?'运行中':
            res.data.targetState==='2'?'未开始':'-'
        that.dataMessage['state'] = state
        that.param.taskId = res.data.taskId
        that.parentId = res.data.parentId
        that.AmendGetData()
        that.PeriodGetData()
        that.relevanceGetData()
      })
    },
    AmendGetData(){
      let that = this
      this.$Get("/admin/task/track/operate/page" ,
        Object.assign(that.AmendPage,{taskId: that.param.taskId}),
        res => {
          that.AmendPage.total = res.data.total
          that.AmendTableData1 = res.data.records
      })
    },
    PeriodGetData(){
      let that = this
      that.PeriodTableData1 = []
      // that.PeriodTableData2 = []
      that.$Get("/admin/task/track/circle/page" ,
        Object.assign(that.PeriodPage,{taskId: that.param.taskId})
       , res => {
          that.PeriodPage.total = res.data.total
          that.PeriodTableData1 = res.data.records
          that.PeriodTableData1.forEach(function(item,index) {
            item.state = item.disValue ? item.disValue: '-'
          })
          // let resData  = res.data.records
         /* for(let i=0;i< resData.length;i++){
            if(i % 2===0){
              that.PeriodTableData1.push(resData[i])
              that.PeriodTableData1.forEach(function(item,index) {
                item.state = item.disValue ? item.disValue: '-'
              })

            }else {
              that.PeriodTableData2.push(resData[i])
              that.PeriodTableData2.forEach(function(item,index) {

                item.state = item.disValue ? item.disValue: '-'
              })
            }
          }*/
        })
    },
    relevanceGetData(){
      let that = this
      let paramT={
        taskId: this.param.taskId,
        parentId: this.parentId
        // parentId: '128'
      }
      this.$Get("/admin/task/track/related/page",
        Object.assign(that.relevancePage, paramT), res => {
          that.relevanceTableData =res.data.records
          that.relevancePage.total = res.data.total
          // console.log(111,22,res.data.records)
      })
    },
    clickRelevance(row){
      // console.log(889,row)
      this.param.targetId = null
      this.param.taskId = row.taskId
      this.clickRowId()
    },
    // 查看整改措施
    closeModal2(){
      this.abarbeitung.state = false
    },
    // 查看整改措施
    ClickAbarbeitung(){
      this.abarbeitung.state = true
      this.abarbeitung.data = this.abarbeitungConent ? this.abarbeitungConent : '暂无措施'
    },
    // 关闭关联文件弹
    closeModal1(){
      this.fileList.state = false
    },
    // 放大关联文件弹框
    fileClick(data){
      this.fileList.state = true
      this.fileList.data = data === null ? [] : data
    },
  //   获取任务数据
    //关闭预览
    closePreview (val) {
      this.previews.state = val;
    },
    // 预览getPreviewData
    preview (row) {
      this.previews.name = row.fileSuffix
      this.previews.data = '/mngfile/chunkfile/previewStream/' + row.fileId;
      this.previews.state = true;
      this.$refs.preview.getPreviewData();
    },
  //关闭弹窗
    closetrendData () {
    // console.log("关闭了");
    let flag = false;
    this.$emit("closeTrackModal", flag);
  },
    // 第一个表格分页
    changeAmendPage(val) {
      this.AmendPage.current = val;
      this.AmendGetData()
      // this.getTaskTableData();
      //这里请求表格接口
    },
    // 第二个表格分页
    changePeriodPage(val) {
      this.PeriodPage.current = val;
      this.PeriodGetData()
      // this.getTaskTableData();
      //这里请求表格接口
    },
    // 第三个分页
    changeRelevancePage(val){
      this.relevancePage.current = val;
      this.relevanceGetData()

    }

}
}
</script>

<style lang="less" scoped >
  .divCentre{
    .el-col-12{
      display: flex;
      display:-webkit-flex;
      align-items: flex-start;
      padding-top: 10px;
      >.left{
        width: 20%;
        color: #777;
        text-align: right;
        font-size: 14px;
        /*flex-wrap:wrap;*/
        >h3{
          font-size: 14px;
        }
        i{
          transform:rotateY(180deg);
          font-size: 18px;
          cursor: pointer;
          color: #347ce8 ;
        }
    }
      .rightP{
        width: 80%;
        color: #888;
        font-size: 14px;
        padding-left: 15px;
        text-align:left ;
        /*border: 1px solid red;*/
        .text{
          border: 1px solid #999;
          height:100px;
          padding-bottom: 5px;
          overflow-y: auto;
          width: 90%;
          background: rgba(243, 247, 251, 0.74);
          .file{
            background: #f6f9ff;
            margin-top:3px ;
            margin-bottom:3px ;
            display: flex;
            .listContent{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 70%;
              /*display: inline-block;*/
              /*vertical-align: bottom;*/
            }
            .listItem{
              color: #94c6e7;
              font-size: 25px;
            }
          }
          .wufile{
            font-size: 18px;
            color: #888;
            text-align: center;
            line-height:90px;
          }
          .fileCoent:hover{
            background: #e0f8ff;
          }
        }
      }
    }
  }

  .divAmend{
    margin-top: 15px;
    >h3{
      /*width: 10%;*/
      color: #666;
      /*text-align: right;*/
      font-size: 16px;
      text-align: left;
    }
    .AmendTable{
      border: 1px solid #999;
      .el-col-12{
        padding-top: 4px;
        /*border: 1px solid red;*/
      }
      .el-col-12,.el-col-9,.el-col-15 {
        display: flex;
        display: -webkit-flex;
        align-items: flex-start;

      }
    }
  }

  .divPeriod{
    height: 270px;
    /*border: 1px solid red;*/
    margin-top: 15px;
    .el-row{
      height: 100%;
      .el-col-12{
        height: 100%;
      }
    }
    h3{
      width: 90%;
      color: #666;
      /*text-align: right;*/
      font-size: 16px;
      text-align: left;
      /*border-bottom: 1px solid gainsboro;*/
      margin-bottom: 10px;
      >span{
        border-bottom: 2px solid #4C8CEB;
        padding-bottom: 5px;
        padding-left: 8px;
        padding-right: 8px
      }
    }
  }
  /*.modalDiv{*/
    /*padding: 0 7%;*/
  /*}*/
  .fileBox {
    width: 100%;
    height: 180px;
    padding: 5px 30px;
    overflow-y: auto;
    text-align: center;
    .fileItem {
      float: left;
      width: 125px;
      height: 80px;
      margin: 5px 10px;
      text-align: center;
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
    .content {
      text-align: center;
      .text {
        width: 100%;
        height: 30px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.205);
      }
      .btn {
        // display: inline-block;
        margin: 5px auto;
        height: 30px;
        text-align: center;
        >button{
          width: 80px;
        }
      }
    }
  }
  .abarbeitungBox{
    font-size: 16px;
    padding: 0 7%;
    overflow-y: auto;
  }

  .cellHtml{
    cursor: pointer;
    display: inline-block;
  }



</style>
