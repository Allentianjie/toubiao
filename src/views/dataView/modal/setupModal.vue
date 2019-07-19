<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox"
           class-name="vertical-center-modal" v-model="setupData.state" width="60%"
           :mask-closable="false" @on-cancel="closeSetupModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>体系下钻</span>
      </p>
      <div class="fileManage">
        <div class="top2">
          <div class="topCard" v-for="(item,index) in insystemData" v-if="index < 5" :key="index">
            <div class="contentotal">
              <div>
                <p class="tatle">{{item.name}}</p>
              </div>
              <p class="valueT">{{item.value}}</p>
            </div>
          </div>
        </div>

        <div class="lineA"></div>

        <div class="divCentre">
          <el-row>
            <el-col :span="12">
              <h3 class="left">名称:</h3><p class="rightP">{{ showData.hieName }}</p>
            </el-col>
            <el-col :span="12">
              <h3 class="left">目标:</h3><p class="rightP">{{ showData.hieTarget }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <h3 class="left">启用:</h3><p class="rightP">{{ showData.hieEnabled }}</p>
            </el-col>
            <el-col :span="12">
              <h3 class="left">权重:</h3><p class="rightP">{{ showData.hieWeight }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <h3 class="left">开始时间:</h3><p class="rightP">{{ showData.hieStartTime }}</p>
            </el-col>
            <el-col :span="12">
              <h3 class="left">结束时间:</h3><p class="rightP">{{ showData.hieEndTime }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="left">
                <h3 class="left2">负责人:</h3>
              </div>
              <div class="rightP ">
                <div class="text">
                  <span class="listSpan" v-for="item in showData.principal">{{item.userName}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="left" >
                <h3>支撑文件:</h3>
                <!--v-if   整改措施没有数据的时候就不显示-->
              </div>
              <div class="rightP ">
                <div class="text">
                  <div class="file"  v-for="item in showData.file">
                    <Icon class="listItem" type="ios-paper"/>
                    <p class="listContent">{{item.fileName}}</p>
                    <Button
                      class="textbtn"
                      size="small"
                      @click="preview(item.fileId)"
                      type="success"
                      ghost
                    >预览
                    </Button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="left" >
                <h3>备注说明:</h3>
                <!--v-if   整改措施没有数据的时候就不显示-->
              </div>
              <div class="rightP ">
                <div class="text">
                  <span class="">{{showData.remark}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
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
        <Button type="primary" size="large" @click="closeSetupModal">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import df from "@/api/utils";
  import store from "@/store";
  import {
    fetchList,
    fetchValueList,
    fetchValueLists,
    getObj,
    addObj,
    putObj,
    delObj,
    getTree
  } from "@/api/database/database";
  import {NeizhenUtil, datarouters} from "@/util/datarouters";
  import {remote} from '@/api/admin/dict'

  export default {
    props: {
      setupData: {
        type: Object,
        required: true
      }
    },
    components: {},
    watch: {
    },
    data() {
      return{
        hierarchyTreeData:[],
        insystemData: [//指标数量数据
          {name : "诊改体系", value : '0', proportion:'2.14%',},
          {name : "诊改体系", value : '0', proportion:'2.14%',},
          {name : "诊改体系", value : '0', proportion:'2.14%',},
          {name : "诊改体系", value : '0', proportion:'2.14%',},
          {name : "诊改体系", value : '0', proportion:'2.14%',}
        ],
        level:{
          name: '诊改层面',
          number: '123',
        },
        options: [],
        value: '',
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 1, //每页条数
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
        explain: '使用 Vue CLI 3 # 我们为最新的 Vue CLI 3 提供了相应的 iView 插件，如果你正在用 Vue CLI 3，可以直接在插件中搜索 iview，安装插件来使用。 使用推荐工程 # 我们也为您准备好了基础工程，以此为基础开发，可以为您省去大量配置和调试环境的时间。 推荐工程：iview-project 如果您使用了我们推荐的工程，可以略过下面的内容直接进入开发阶段，我们也推荐使用这套工程来构建您的项目。 如果您希望自己配置或使用其它工程，请继续往下阅读。使用 Vue CLI 3 # 我们为最新的 Vue CLI 3 提供了相应的 iView 插件，如果你正在用 Vue CLI 3，可以直接在插件中搜索 iview，安装插件来使用。 使用推荐工程 # 我们也为您准备好了基础工程，以此为基础开发，可以为您省去大量配置和调试环境的时间。 推荐工程：iview-project 如果您使用了我们推荐的工程，可以略过下面的内容直接进入开发阶段，我们也推荐使用这套工程来构建您的项目。 如果您希望自己配置或使用其它工程，请继续往下阅读。使用 Vue CLI 3 # 我们为最新的 Vue CLI 3 提供了相应的 iView 插件，如果你正在用 Vue CLI 3，可以直接在插件中搜索 iview，安装插件来使用。 使用推荐工程 # 我们也为您准备好了基础工程，以此为基础开发，可以为您省去大量配置和调试环境的时间。 推荐工程：iview-project 如果您使用了我们推荐的工程，可以略过下面的内容直接进入开发阶段，我们也推荐使用这套工程来构建您的项目。 如果您希望自己配置或使用其它工程，请继续往下阅读。',
        principal: [
          {name: '小明',id:1},
          {name: '小兰',id:1},
          {name: '小兰',id:1},
          {name: '小兰',id:1},
          {name: '小兰',id:1},
          {name: '小兰',id:1},
          {name: '小兰',id:1},
          {name: '小兰',id:1},
        ],
        hieDatas :[],
        showData : {
          hieName : "",
          hieTarget : "",
          hieEnabled : "",
          hieWeight : "",
          hieStartTime : "",
          hieEndTime : "",
          principal : [],
          file :[],
          remark : ""


        }
      }
    },
    mounted() {
      //this.getInsystemData();
      this.getDiagnosisData()
    },
    computed: {

    },
    filters: {},
    methods: {
      preview(id) {

      },
      loaddata() {
        // 获取所有体系
        var that = this;
        this.$Get("/admin/hierarchy/getHierarchys", null, function(data){
          console.log("pdata",data);
          if (data.code == '0') {
            if (data.data.length > 0) {
              that.page.total = data.data.length;
              that.hieDatas = data.data;

              that.setShowData(data.data[0]);


              that.getInsystemData(data.data[0].id);

            }
          }

        });

      },

      setShowData(data) {
        this.showData.hieName = data.hieName;
        this.showData.hieTarget = data.target;
        this.showData.hieEnabled = "已启用";
        this.showData.hieWeight = data.weight;
        this.showData.hieStartTime = data.startTime;
        this.showData.hieEndTime = data.endTime;
        this.showData.remark = data.remark;

      },
      // 请求体系数据
      getDiagnosisData() {
        this.$Get("/admin/hierarchy", {}, data=> {
          this.hierarchyTreeData = data.data;
          console.log(1, this.hierarchyTreeData)
        });
      },
      // 顶部请求
      getInsystemData(id){
        let that = this;
        that.$Get("/admin/hierarchy/hierarchyDrill", {hieId : id}, function(data){
          let totalData = [];
          totalData.push({name : "层面数量", value : data.data.levelcount, });
          totalData.push({name : "维度数量", value : data.data.dimcount, });
          totalData.push({name : "质控点数量", value : data.data.pointcount, });
          totalData.push({name : "指标数量", value : data.data.targetcount, });
          totalData.push({name : "任务数量", value : data.data.taskcount, });
          that.showData.principal = data.data.directorys;
          that.showData.file = data.data.files;
          that.insystemData = totalData;
        });

      },
      //关闭添加文件
      closeSetupModal() {
        this.$emit("closeSetupModal", {state: false});
        this.setupData.state = false;
      },
      changePageTable1(val) {
        this.page.current = val;
        this.setShowData(this.hieDatas[val - 1]);


        this.getInsystemData(this.hieDatas[val - 1]);
      },
    }
  };
</script>

<style lang="less" scoped>
  /*@import url("../../diagnosis/modal/normModal.less");*/
  @import url("./setupModal.less");

</style>
