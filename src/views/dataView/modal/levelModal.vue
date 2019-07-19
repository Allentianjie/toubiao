<template>
  <div id="preView" style="width:100%">
    <Modal id="preViewBox"
           class-name="vertical-center-modal" v-model="levelData.state" width="60%"
           :mask-closable="false" @on-cancel="closeLevelModal">
      <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
        <span>层面下钻</span>
      </p>
      <div class="fileManage">
          <div class="top1">
            <div class="topCard">
              <div class="contentotal">
                <!--<div>-->
                  <p class="tatle">{{level.name}}</p>
                  <!--<p class="proportion">{{item.proportion}}</p>-->
                <!--</div>-->
                <p class="valueT">{{level.number}}</p>
              </div>
            </div>
          </div>

          <div class="selectDiv">
            <span>选择体系：</span>
            <el-select size="small" v-model="value" placeholder="请选择" @change="changeHierary">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
                        @click="preview(item)"
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
        <Button type="primary" size="large" @click="closeLevelModal">关闭</Button>
        <!-- <Button type="primary" size="large" @click="closeModal">关闭</Button> -->
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
  import {remote} from '@/api/admin/dict'

  export default {
    props: {
      levelData: {
        type: Object,
        required: true
      }
    },
    components: {},
    watch: {
      //
      // "targetForm.summaryMode"(newValue, oldValue) {
      //
      // },
      // "targetForm.dataName"(newValue, oldValue) {
      //
      // }

    },
    data() {
      return{
        level:{
          name: '诊改层面',
          number: '123',
        },
        options: [
          {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
        ],
        value: '选项1',
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

        hieData : [],

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
    },
    computed: {

    },
    filters: {},
    methods: {

      loaddata() {
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
              that.$Get("/admin/hierarchy/getHierarchys", {hieId : that.options[0].value}, function(data){
                if (data.data.length > 0) {
                  that.hieDatas = data.data;
                  that.level.number = data.data.length;
                  that.page.total = data.data.length;

                  that.setShowData(data.data[0]);
                  that.getInsystemData(data.data[0].id);
                }

              });

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

      getInsystemData(id){
        let that = this;
        that.$Get("/admin/hierarchy/hierarchyLevelDrill", {hieId : id}, function(data){

          that.showData.principal = data.data.directorys;
          that.showData.file = data.data.files;

        });

      },


      //关闭添加文件
      closeLevelModal() {
        this.$emit("closeLevelModal", {state: false});
        this.levelData.state = false;
      },
      // 分页
      changePageTable1(val) {
        this.page.current = val;
        this.setShowData(this.hieDatas[val - 1]);
        this.getInsystemData(this.hieDatas[val - 1].id);
      },
      changeHierary(val) {
        var that = this;
        this.$Get("/admin/hierarchy/getHierarchys", {hieId : val}, function(data){
          if (data.data.length > 0) {
            that.hieDatas = data.data;
            that.level.number = data.data.length;
            that.page.total = data.data.length;

            that.setShowData(data.data[0]);
            that.getInsystemData(data.data[0].id);
          }

        });

      }
    }
  };
</script>

<style lang="less" scoped>
  /*@import url("../../diagnosis/modal/normModal.less");*/
  @import url("./setupModal.less");
</style>
