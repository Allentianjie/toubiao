<template>
  <div id="flowPage">
    <div class="taskSummaryItem">
      <el-row>
        <el-col :span="5" id="reviseProcessTree">
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="菜单栏目" name="first">
              <div class="flowTreeDiv" >
                <el-tree class="filter-tree"
                         id="taskTreeL"
                         style="max-height:700px"
                         node-key="id"
                         highlight-current
                         :data="treeData"
                         :default-expanded-keys="aExpandedKeys"
                         :filter-node-method="filterNode"
                         :props="defaultProps"
                         @node-click="getNodeData"
                         @node-expand="nodeExpand"
                         @node-collapse="nodeCollapse">
                </el-tree>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="19"  ref="NineHeight" id="rightHeight" >
          <div class="summaryEchart" >
            <div class="filter-container" style="text-align: left;padding-left: 10px">
              <el-button-group>
                <el-button type="primary"
                           icon="plus"
                           @click="handlerAdd">添加
                </el-button>
                <el-button type="primary"
                           icon="edit"
                           @click="handlerEdit">编辑
                </el-button>
                <el-button type="primary"
                           icon="delete"
                           @click="handleDelete">删除
                </el-button>
              </el-button-group>
            </div>
            <el-card class="box-card">
              <el-form :label-position="labelPosition"
                       label-width="100px"
                       :model="form"
                       ref="form">
                <el-form-item label="父级节点"
                              prop="parentId">
                  <el-input v-model="form.parentId"
                            :disabled="true"
                            placeholder="请输入父级节点"></el-input>
                </el-form-item>
                <el-form-item label="节点ID"
                              prop="menuId">
                  <el-input v-model="form.menuId"
                            :disabled="formEdit || formStatus=='update'"
                            placeholder="请输入节点ID"></el-input>
                </el-form-item>
                <el-form-item label="标题"
                              prop="name">
                  <el-input v-model="form.name"
                            :disabled="formEdit"
                            placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="类型"
                              prop="type" style="text-align: left">
                  <el-select class="filter-item"
                             v-model="form.type"
                             :disabled="formEdit"
                             placeholder="请输入资源请求类型">
                    <el-option v-for="item in  typeOptions"
                               :key="item"
                               :label="item | typeFilter"
                               :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="权限标识"
                              prop="permission" v-if="getMenuType=='1'">
                  <el-input v-model="form.permission"
                            :disabled="formEdit"
                            placeholder="请输入权限标识"></el-input>
                </el-form-item>
                <el-form-item label="图标"
                              prop="icon" v-if="getMenuType=='0'">
                  <Row>
                    <Col :span="6">
                      <el-input v-model="form.icon"
                                :disabled="formEdit"
                                @focus="changeIcon"
                                clearable
                                @change="closeIcons"
                                placeholder="请输入图标"></el-input>
                    </Col>
                    <Col :span="4" style="padding-left: 20px">
                        <i v-if="form.icon!=''" :class="form.icon"></i>
                    </Col>
                  </Row>

                </el-form-item>
                <el-form-item label="路径" prop="path" v-if="getMenuType=='0'">
                  <el-input v-model="form.path" placeholder="请输入路径" :disabled="formEdit"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left" label="页面类型" prop="pathType" v-if="getMenuType=='0'">
                  <el-radio-group v-model="form.pathType" :disabled="formEdit">
                    <el-radio label="0"> <span>VUE页面</span></el-radio>
                    <el-radio label="1"><span>超链接页面</span></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="超链接地址" prop="url"  v-if="getPathType == '1' && getMenuType=='0'">
                  <el-input v-model="form.url" placeholder="请输入超链接地址" :disabled="formEdit"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left" label="打开方式" prop="openWith" v-if="getPathType == '1' && getMenuType=='0'">
                  <el-radio-group v-model="form.openWith" :disabled="formEdit">
                    <el-radio label="0"> <span>当前窗口</span></el-radio>
                    <el-radio label="1"><span>新标签页</span></el-radio>
                    <el-radio label="2"><span>弹出窗口</span></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="前端组件"
                              prop="component" v-if="getPathType == '0' && getMenuType=='0'">
                  <el-input v-model="form.component"
                            :disabled="formEdit"
                            placeholder="请输入前端组件路径"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left" label="路由缓冲"
                              prop="component"  v-if="getMenuType=='0'">
                  <el-switch v-model="form.keepAlive"
                             :disabled="formEdit"
                             active-color="#2d8cf0"
                             inactive-color="#ccc"
                             active-value="0"
                             inactive-value="1">
                  </el-switch>
                </el-form-item>
                <el-form-item label="排序"
                              prop="sort">
                  <el-input type="number"
                            v-model="form.sort"
                            :disabled="formEdit"
                            placeholder="请输入排序"></el-input>
                </el-form-item>
                <el-form-item v-if="formStatus == 'update'">
                  <el-button type="primary"
                             @click="update">更新
                  </el-button>
                  <el-button @click="onCancel">取消</el-button>
                </el-form-item>
                <el-form-item v-if="formStatus == 'create'">
                  <el-button type="primary"
                             @click="create" :disabled="formEdit" >保存
                  </el-button>
                  <el-button @click="onCancel" :disabled="formEdit">取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <i-modal  ref="iconModal"  :iconData="iconData" @closeMain="closeMain"></i-modal>
  </div>
</template>

<script>
  import {addObj, delObj, fetchMenuTree, getObj, putObj} from '@/api/admin/menu'
  import iModal from "@/components/iconModal"; //引入修改或添加诊改项目Modal
  export default {
    name: 'menuItem',
    components: {
      iModal
    },
    data() {
      return {
        iconData:{
          state:false
        },
        activeName2: 'first',
        list: null,
        total: null,
        formEdit: true,
        formAdd: true,
        formStatus: 'create',
        showElement: false,
        typeOptions: ['0', '1'],
        methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
        listQuery: {
          name:''
        },
        treeData: [],
        oExpandedKey: {

        },
        oTreeNodeChildren: {

        },
        aExpandedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        labelPosition: 'right',
        form: {
          menuId: null,
          name: '',
          permission: '',
          path: '',
          parentId: null,
          parentName: '',
          icon: '',
          component: '',
          sort: null,
          keepAlive: '0',
          type: '',
          pathType: '0',
          openWith: '0',
          url: ''
        },
        currentId: -1,
        currentName: ''
      }
    },
    filters: {
      typeFilter(type) {
        const typeMap = {
          0: '菜单',
          1: '按钮'
        }
        return typeMap[type]
      }
    },
    created() {
      this.getList()
    },
    computed:{
      getPathType: function() {
        return this.form.pathType
      },
      getMenuType: function() {
        return this.form.type;
      }
    },
    methods: {
        closeIcons(){

        },
      //关闭选择图标
      closeMain(obj) {
        this.form.icon=obj.icon;
        this.iconData.state = obj.state;
      },
      //选择图标
      changeIcon(){
        this.iconData.state = true;
      },
      getList() {
        fetchMenuTree(this.listQuery).then(response => {
          this.treeData = response.data.data
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },

      nodeExpand(data) {
        let aChildren = data.children
        if (aChildren.length > 0) {
          this.oExpandedKey[data.id] = true
          this.oTreeNodeChildren[data.id] = aChildren
        }
        this.setExpandedKeys()
      },
      nodeCollapse(data) {
        this.oExpandedKey[data.id] = false
        // 如果有子节点
        this.treeRecursion(this.oTreeNodeChildren[data.id], (oNode) => {
          this.oExpandedKey[oNode.id] = false
        });
        this.setExpandedKeys()
      },
      setExpandedKeys() {
        let oTemp = this.oExpandedKey
        this.aExpandedKeys = []
        for (let sKey in oTemp) {
          if (oTemp[sKey]) {
            this.aExpandedKeys.push(parseInt(sKey));
          }
        }
      },
      treeRecursion(aChildren, fnCallback) {
        if (aChildren) {
          for (let i = 0; i < aChildren.length; ++i) {
            let oNode = aChildren[i]
            fnCallback && fnCallback(oNode)
            this.treeRecursion(oNode.children, fnCallback)
          }
        }
      },

      getNodeData(data) {
        if (!this.formEdit) {
          this.formStatus = 'update'
        }
        getObj(data.id).then(response => {
          this.form = response.data.data
        })
        this.currentId = data.id
        this.currentName = data.name
        this.showElement = true
      },
      handlerEdit() {
        if (this.form.menuId) {
          this.formEdit = false
          this.formStatus = 'update'
        }
      },
      handlerAdd() {
        this.resetForm()
        this.formEdit = false
        this.formStatus = 'create'
      },
      handleDelete() {
        this.$confirm('此操作将永久删除"'+this.currentName+'",是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(this.currentId).then(res => {
            if(res.data.code==0){
              this.getList()
              this.resetForm()
              this.onCancel()
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              }else{
              this.$notify({
                title: '失败',
                message: '删除失败:' + res.data.msg,
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      },
      update() {
        putObj(this.form).then(res => {
          if(res.data.code==0){
            this.formEdit = true
            this.getList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }else{
            this.$notify({
              title: '失败',
              message: '更新失败:' + res.data.msg,
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      create() {
        addObj(this.form).then(res => {
          if(res.data.code==0){
            this.formEdit = true
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }else{
            this.$notify({
              title: '失败',
              message: '创建失败:' + res.data.msg,
              type: 'success',
              duration: 2000
            })
          }

        })
      },
      onCancel() {
        this.formEdit = true
        this.formStatus = ''
      },
      resetForm() {
        this.form = {
          menuId: null,
          name: '',
          permission: '',
          path: '',
          parentId: this.currentId,
          parentName: '',
          icon: '',
          component: '',
          sort: null,
          keepAlive: '0',
          type: '',
          pathType: '0',
          openWith: '0',
          url: ''
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  #flowPage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 0 1%;

    .taskSummaryItem {
      width: 100%;
      height: 100%;
      //height: calc(160% + 41px);
      margin: 0 auto;
      padding: 10px 0;
      .el-row{
        width: 100%;
        height: 100%;
        padding:20px 2%;
        background: #fff;
        border-radius: 6px;
        .el-tabs{
          width: 100%;
          height: 100%;
          border-radius: 6px;
          .el-tabs__content{
            width: 100%;
            .el-tab-pane{
              width: 100%;
              .flowTreeDiv{
                padding:3% 2% 2%;
                .el-input{
                  margin-bottom: 3%;
                }
              }
            }
          }
        }
        .el-col-19{
          height: 100%;
          //padding-top: 41px;
          .summaryEchart {
            width: 100%;
            padding-left: 1.5%;
            height: 100%;
            .M_search{
              text-align: left;
              margin-bottom: 15px;
              margin-top: 10px;
              >div{
                margin-right: 2%;
              }
            }
            .tableHeight{
              height: calc(100% - 130px);
            }
          }
        }
      }

    }
  }
  //弹框样式
  .fileType{
    color:#2d8cf0;
    cursor: pointer;
    padding: 8px 3px;
    border-bottom: 1px solid rgba(172, 178, 193, 0.42);
  }
  .fileBox {
    width: 100%;
    height: 280px;
    overflow: hidden;
    overflow-y: auto;
    padding: 5px 30px;
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
    height: 30px;
    text-align: center;
    >button{
      width: 80px;
    }
  }

</style>
