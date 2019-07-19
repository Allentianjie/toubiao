<template>
  <div id="taskSummaryPage">
    <div class="taskSummaryItem">
        <el-row>
          <el-col :span="5">
              <el-input  v-model="screenTree"  size="small" placeholder="请输入关键字" suffix-icon="el-icon-search">
              </el-input>
              <el-tree class="filter-tree" id="taskTreeL" :default-expanded-keys="[1]"
                       node-key="id" highlight-current
                       :props="defaultProps"
                       :data="treeData"
                       :filter-node-method="filterNode"
                       @node-click="handleNodeClick"
                       ref="tree">
              </el-tree>
          </el-col>
          <el-col :span="19" ref="NineHeight" id="abcHei" style="padding:0 10px">
            <div class="btn">
              <Button @click="openAddfile()" v-if="viewupload" class="add-doc" ghost type="success"icon="ios-add-circle-outline">
                上传文件
              </Button>
            </div>
            <el-tabs class="fileTabs" v-model="activeName" type="card" @tab-click="tabsClick">
                  <el-tab-pane
                    v-for="(item,index) in tabsData"
                    :label="item.label"
                    :name="item.name"
                    :key="item.name"
                  ></el-tab-pane>
                </el-tabs>
            <div class="tableHeight">
                <Table
                  :border="false"
                  height="100%"
                  stripe="false"
                  :tableData="policyData"
                  @ftablePage="fTablePage"
                ></Table>
              </div>
              <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
              <AddFileModal :addFileState="addFileState" ref="addFile" @closeMains="closeMains"></AddFileModal>
          </el-col>
        </el-row>
    </div>
  </div>
</template>
<script>
// import PieChart from "@/components/monitoring/pieCharts_three.vue";

import Table from '@/components/table'
import { NeizhenUtil, datarouters } from "../../util/datarouters";
import Preview from "@/components/preview"; // 加入这个报错先联调成功再改
import AddFileModal from "@/components/AddFile";
import store from "@/store" //stroe 存储
export default {
    components: { Table, Preview ,AddFileModal}, // 加入这个报错先联调成功再改

    data () {
        return {
          activeName2: 'first',
          addFileState: {
            //添加文件传过去的数据
            data: [],
            state: false
          },
            previews: {//预览文件数据
                data: [],
                state: false,
                name: ""
            },
          defaultProps: {
            children: 'children',
            label: 'name',
            isLeaf: 'leaf'
          },
          viewupload : false,
          treeData : [],
          viewallroleId : 99,  // 可看全部文档，不根据管辖部门来分
          viewAllFile : false,
          screenTree: '',
            // taskHeight: '',
            activeName: '31',
            total: 30,
            page: 1,
            pageSize: 10,
            selecttab: 1,
            choiceDeptId : '', // 选择的部门id
            taskHeight : "",

            currentPage: 1,
            currentPageSize: 10,
            policyData: {
                columns: [
                    {
                        title: '文件名称',
                        key: 'fileName',
                        // width: 55,
                        align: 'center'
                    }, {
                        title: '关键字',
                        key: 'keyword',
                        tooltip: true,
                        width: 120,
                        align: 'center'
                    }, /*{
                        title: '公开部门',
                        key: 'createTime',
                        tooltip: true,
                        // width: 120,
                        align: 'center'
                    },*/
                    {
                      title: '创建人',
                      key: 'createByName',
                      tooltip: true,
                      // width: 120,
                      align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 340,
                        align: 'center',
                        render: (h, params) => {
                            var buttons = [
                              h('Button', {
                                props: {
                                  type: 'text',
                                  size: 'small'
                                },
                                style: { color: "#3f7ae6", fontSize: '14px' },
                                on: {
                                  click: () => { this.download(params) }
                                }
                              }, '下载文件'),
                              h('Button', {
                                props: {
                                  type: 'text',
                                  size: 'small'
                                },
                                style: { color: "#3f7ae6", fontSize: '14px' },
                                on: {
                                  click: () => { this.preview(params.row) }
                                }
                              }, '预览文件')
                              // h('span', { style: { color:"#7a7a7a", fontSize:'14px'},},"|"),

                            ];



                          if (store.state.userInfo.user_id == params.row.createBy) {
                              buttons.push(h('Button', {
                                props: {
                                  type: 'text',
                                  size: 'small'
                                },
                                style: { color: "#f04409", fontSize: '14px' },
                                on: {
                                  click: () => { this.editData(params) }
                                }
                              }, '修改'));

                              buttons.push(h('Button', {
                                props: {
                                  type: 'text',
                                  size: 'small'
                                },
                                style: { color: "#f04409", fontSize: '14px' },
                                on: {
                                  click: () => { this.remove(params) }
                                }
                              }, '删除'));
                            }
                            return h('div', buttons);
                        }
                    }
                ],
                data: [],
                total: 0,
                currentPage:1,
                currentPageSize: 10,
            },
            tabsData: [
            ],
            managementData: [],
            teachingData: [],
            developData: []
        }
    },
    watch: {
      screenTree(val) {
        this.$refs.tree.filter(val);
      },

    },
    created () {
    },
    mounted () {
        this.loadData();
        this.$nextTick(() => {
            this.taskHeight = 'height:' + (window.innerHeight - 51) + 'px'
            console.log(55,window.innerHeight)
        });
    },
    methods: {
      filterNode(value, data) {
        let that = this
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      handleNodeClick(data,node){

        this.choiceDeptId = data.id;
        //this.searchData()
        this.searchFile(1, 10, this.selecttab);
      },

      closeMains(val, sence, data) {
        this.addFileState.state = val;
        this.searchFile(this.page, this.pageSize, this.selecttab);
      },
      //打开添加文件
      openAddfile(){

        this.addFileState.data=this.selecttab;
        this.addFileState.state = true;
        this.$refs.addFile.loadsData();
      },
        loadData () {
            let that = this;
            let selectfirst = null;
            let viewall = false;




            if (viewall) {

              this.treeData = this.$store.state.chooseDept;
              this.viewAllFile = true;
            } else {
              this.treeData = this.$store.state.chooseDataScopeDept;
            }

            this.$Get("/admin/dict/type/file_type", null, function (data) {

                let sdata = [];
                data.data.forEach(e => {

                    if(that.$store.state.permissions['fm_'+e.value ]){
                      sdata.push({ label: e.label, name: e.value });
                    }
                });



                that.tabsData = sdata;
                var inittab;
                if (sdata.length > 0) {
                  that.selecttab = sdata[0].name;
                  inittab = sdata[0].name;
                } else {
                  that.selecttab = '';
                }


              if(that.$store.state.permissions['fm_'+ inittab + "_upload" ]){
                that.viewupload = true;
              }


              that.searchFile(that.page, that.pageSize, that.selecttab);



            });


        },

        searchFile (pageindex, pagesize, ftype) {
            var param = {};
            param.current = pageindex;
            param.size = pagesize;
            param.fileType = ftype;
            param.viewAll = this.viewAllFile;
            NeizhenUtil.isEmpty(this.choiceDeptId) ? NeizhenUtil.noop() : (param.deptId = this.choiceDeptId);
            var that = this;
            this.$AsyncDealData(datarouters.SystemManage.filemanage.page, param, function (data) {
                console.log("filedata", data);
                that.policyData.data = data.data.records;
                that.policyData.total = data.data.total;
            });
        },
        // 下载
        download (p) {
            var that = this;
            var id = p.row.fileId;
            that.$DownLoad("/mngfile/chunkfile/download/" + id, null);


        },
        //关闭预览
        closePreview (val) {
            this.previews.state = val;
        },

        // 预览
        preview (p) {

            this.previews.name = p.fileSuffix
            this.previews.data = '/mngfile/chunkfile/previewStream/' + p.fileId;
            this.previews.state = true;
            this.$refs.preview.getPreviewData();
        },
        // 删除
        remove (p) {
            var that = this;
            var id = p.row.fileId;


            this.$confirm('是否确认删除名称为"' + p.row.fileName + '"的记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
            var _that = that;
                that.$AsyncDealData(datarouters.SystemManage.filemanage.delete, { fileId: id }, function (data) {
                    if (data.code === 0) {
                        _that.searchFile(_that.page, _that.pageSize, _that.selecttab);
                    } else if (data.code === 1) {
                        _that.$alert(data.msg, '删除失败提示', {
                            confirmButtonText: '确定',
                        });
                    }
                })
            }).catch(function (err) { })
        },
        fTablePage (pageData) { // 分页

            this.currentPage = pageData.current;
            this.currentPageSize = pageData.pageSize;
            this.page = pageData.current;
            this.policyData.currentPage= pageData.current;
            this.searchFile(pageData.current, pageData.pageSize, this.selecttab);
        },
        // 分页查看
        changePage (val) {
            this.page = val;


        },
        // tabs点击
        tabsClick (tab, event) {




            this.viewupload = false;

            if(this.$store.state.permissions['fm_'+tab.name + "_upload" ]){
              this.viewupload = true;
            }

            this.selecttab = tab.name;
            this.searchFile(this.page, this.pageSize, this.selecttab);
        },

        // 修改文件（只能修改文件的基本信息，不能重新上传文件）
      editData(param) {
        var row = param.row;

        this.addFileState.data=this.selecttab;
        this.addFileState.displayTitle = "修改文件信息";
        this.addFileState.operation = "update";
        this.addFileState.state = true;
        this.$refs.addFile.loadsData(row);

      }

    }
};
</script>

<style lang='less' scoped>
@import url("./index.less");
</style>
