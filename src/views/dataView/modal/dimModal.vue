<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox"
           class-name="vertical-center-modal" v-model="dimData.state" width="80%"
           :mask-closable="false" @on-cancel="closeDimModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>{{ titleText }}</span>
      </p>
      <div class="fileManage">
        <div class="selectDiv">
          <el-row>
            <el-col :span="8">
              <span>选择体系：</span>
              <el-select size="small" v-model="value" placeholder="请选择" @change="changeHierary">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-col>
            <el-col :span="8">
              <span>请输入关键字：</span>
              <el-input size="small" style="width: 50%" v-model="keyword" placeholder="请输入内容"></el-input>
              <Button
                @click="searchkeyword"
                type="primary"
                icon="ios-search"
              >搜 索</Button>
            </el-col>
          </el-row>
        </div>
        <!--<div :style="tableHeight">-->
        <div class="tableHeight">
          <el-table
            :data="taskTableData"
            stripe
            height="100%"
            :header-cell-style="backHeader"
            :cell-style = "paddingMy"
            style="width: 100%;"
          >
            <el-table-column
              min-width="120"
              align="center"
              prop="mingCheng"
              label="名称"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="cursor: pointer;color:#2d8cf0">
                 {{scope.row.hieName}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              min-width="150"
              show-overflow-tooltip
              align="center"
              prop="muBiao"
              label="目标">
              <template slot-scope="scope">
                <span>
                  {{scope.row.target}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="kaiShiTime"
              label="开始时间"
              width="120"
            >
              <template slot-scope="scope">
                  <span>
                    {{scope.row.startTime}}
                  </span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="jieShuTime"
              label="结束时间"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{scope.row.endTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="zhuangTai"
              label="状态"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{scope.row.enableFlag == 0 ? "已启用" : "停用"}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="quanZhong"
              label="权重"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{scope.row.weight}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"

              label="负责人"
              min-width="150"
            >
              <template slot-scope="scope">
                <span>{{ getprincipals(scope.row) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="支撑文件"
              width="100"
            >
              <template slot-scope="scope">
                <el-button size="small" style="color: #3A8EE6" plain @click="fileClick(scope.row,scope.row.files)">支撑文件</el-button>
              </template>
            </el-table-column>

            <!--            <el-table-column align="center" label="操作" min-width="100">
                          <template slot-scope="scope">
                            <div style="color:#2d8cf0;padding-right: 5px">
                              &lt;!&ndash;<p @click="openTaskDetails(scope.row)" style="cursor: pointer;margin-right: 20px">
                                <Icon type="ios-eye-outline" /> 查看
                              </p>&ndash;&gt;
                              <p @click="showNorm(scope.row)" style="cursor: pointer;">
                                <Icon type="ios-eye-outline" /> 查看
                              </p>
                            </div>
                            &lt;!&ndash;@click="showNorm(scope.row)"&ndash;&gt;
                            &lt;!&ndash;searchTaskForm.targetName&ndash;&gt;
                          </template>
                        </el-table-column>-->
          </el-table>
        </div>
        <div class="pageDiv">
          <Page
            :total="page.total"
            :showTotal="page.showTotal"
            :current="page.current"
            :page-size="page.size"
            @on-change="changePageTable1"
          ></Page>
        </div>
      </div>

      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="closeDimModal">关闭</Button>
      </div>
      <!--支撑文件弹框-->
      <Modal v-model="fileList.state" width="40%" :mask-closable="false" @on-cancel="closeModal">
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
          <span>查看支撑文件</span>
        </p>
        <div class="fileManage">

          <div class="fileBox"  v-if="fileList.data.length >0"  style="height: 240px">
            <Poptip
              trigger="hover"
              v-for="(item,index) in fileList.data"
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
          <!--<div v-else style="height: 300px;text-align: center;line-height: 300px;color: grey;font-size: 30px;letter-spacing: 3px">-->
          <div v-else style="height: 300px;text-align: center;">
            <!--暂无支撑文件～-->
            <img src="@/assets/images/wushuju.png" alt="" style="width: 40%;margin-top: 50px">
          </div>
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="primary" size="large" @click="closeModal">关闭</Button>
        </div>
      </Modal>
      <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
    </Modal>
  </div>
</template>

<script>
  import Preview from "@/components/preview";

  export default {
    props: {
      dimData: {
        type: Object,
        required: true
      }
    },
    components: {Preview},
    watch: {
    },
    data() {
      return{
        viewtype : 0,
        titleText : '',
        paddingMy: {
          'padding':'5px 0'
        },
        backHeader:{
          'background': '#f8f8f9'
        },
        previews: {//预览文件数据
          data: [],
          state: false,
          name: ""
        },
        fileList: {
          //支撑文件要传过去的数据
          data: [],
          state: false //modal层
        },
        keyword: '',
        options: [],
        value: '选项1',
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 10, //每页条数
          showTotal: true
        },
        file: [
          {
            fileName: '111',
            fileSuffix:'doc'
          },
          {
            fileName: '111',
            fileSuffix:'doc'
          },
          {
            fileName: '111',
            fileSuffix:'doc'
          },
          {
            fileName: '111',
            fileSuffix:'doc'
          },
        ],
        // tableHeight: 'height: 3rem',
        taskTableData: [

        ]
      }
    },
    created() {

    },
    mounted() {


    },
    computed: {

    },
    filters: {},
    methods: {
      getTaskTableData(){

      },
      loaddata(title, viewtype) {
        this.viewtype = viewtype;
        this.titleText = title;

        var that = this;
        this.$Get("/admin/hierarchy/getHierarchys", null, function(data){
          console.log("pdata",data);
          if (data.code == '0') {
            if (data.data.length > 0) {
              var opts = [];
              data.data.forEach(e => {
                var option = {
                  value : e.id,
                  label : e.hieName
                };
                opts.push(option);
              });
              that.options = opts;
              that.value = that.options[0].value;
              that.$Get("/admin/hierarchy/hierarchyDimPointDrill",
                {current: that.page.current,
                  size : that.page.size,
                  hieId : that.options[0].value,
                  type : that.viewtype,
                  searchName : that.keyword}, function(data){
                if (data.data.records.length > 0) {
                  that.taskTableData = data.data.records;
                  that.page.total = data.data.total;
                }

              });

            }
          }

        });

      },
      // 点击支撑文件
      fileClick(row,targetFiles,standardFiles){
        let data = targetFiles
        this.fileList.state = true
        this.fileList.data = data === null ? [] : data
      },
      //关闭预览
      closePreview (val) {
        this.previews.state = val;
      },
      // 关闭支撑文件通知
      closeModal(){
        this.fileList.state = false
      },
      // 预览
      preview (p) {
        // console.log(p)
        this.previews.name = p.fileSuffix
        this.previews.data = '/mngfile/chunkfile/previewStream/' + p.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      //关闭添加文件
      closeDimModal() {
        this.$emit("closeDimModal", {state: false});
        this.dimData.state = false;
      },
      // 分页
      changePageTable1(val) {
        this.page.current = val;
        var that = this;
        that.$Get("/admin/hierarchy/hierarchyDimPointDrill",
          {current: that.page.current,
            size : that.page.size,
            hieId : that.value,
            type : that.viewtype,
            searchName : that.keyword}, function(data){
          if (data.data.records.length > 0) {
            that.taskTableData = data.data.records;
            that.page.total = data.data.total;
          }

        });


      },

      getprincipals(row) {
        if (row.directors.length > 0) {
          var names = "";
          row.directors.forEach(e => {
            names += e.directorName + ","
          });
          return names;
        }

        return "";
      },
      changeHierary(val) {
        console.log("tt", this.keyword);
        var that = this;
        that.$Get("/admin/hierarchy/hierarchyDimPointDrill",
          {current: 1,
            size : that.page.size,
            hieId : that.value,
            type : that.viewtype,
            searchName : that.keyword}, function(data){
          if (data.data.records.length > 0) {
            that.taskTableData = data.data.records;
            that.page.total = data.data.total;
          }

        });

      },
      searchkeyword() {
        this.changeHierary();

      }
    }
  };
</script>

<style lang="less" scoped>
  @import url("./setupModal.less");
</style>
