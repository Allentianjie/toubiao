<template>
  <Modal v-model="addFileState.state" width="40%" :mask-closable="false" @on-cancel="closeModal">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>添加文件</span>
    </p>
    <div>
      <Tabs ref="tabs" type="card" @on-click="tabchange">
        <TabPane label="本地上传" name="tab2">
          <div id="upLoad">
            <Row>
              <Col span="13">
                <Form :label-width="80">
                  <FormItem label="文件名称">
                    <Row>
                      <Col :span="22">
                        <Input v-model="uploadform.fileName" placeholder="文件名称"></Input>
                      </Col>
                      <Col :span="2" style="text-align: right">
                        <Icon @click="clearfile" v-if="candeleteFile" class="deIcon" type="ios-close"/>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem label="文件分类">
                    <Select v-model="uploadform.fileType">
                      <Option

                        v-for="item in lableArr"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}
                      </Option>
                    </Select>
                  </FormItem>
                  <FormItem label="关键字">
                    <Input v-model="uploadform.keyword" placeholder="关键字"></Input>
                  </FormItem>

                  <FormItem label="私有">
                    <Checkbox
                      v-model="uploadform.privateFlag"
                      true-value="1"
                      false-value="0"
                    ></Checkbox>
                  </FormItem>
                  <FormItem label="通用部门">
                    <Input
                      readonly
                      v-model="uploadform.showOpendepts"
                      placeholder="公开部门"
                      @on-focus="showUploadFileOpenDepts"
                      :disabled="uploadform.privateFlag==1"
                    ></Input>
                  </FormItem>
                  <FormItem label="文件描述">
                    <Input
                      type="textarea"
                      :autosize="{minRows: 2,maxRows: 5}"
                      placeholder="文件描述"
                      v-model="uploadform.fileDescription"
                    ></Input>
                  </FormItem>
                  <ChooseDeptTreeModal
                    :chooseDeptState="chooseOpenDepts"
                    ref="chooseDept"
                    @selectOpenDepts="selectOpenDepts"
                  ></ChooseDeptTreeModal>
                </Form>
              </Col>
              <Col span="11" style="padding-left: 30px">
                <h3 class="title" style="padding: 0 0 10px 0">上传单个文件</h3>
                <Upload

                  :disabled="hasExistFile"
                  type="drag"
                  action="/admin/filemanage/savetmpstore"
                  :on-success="handleSuccess"
                  :before-upload="handleBeforeUpload"
                  :on-remove="handleRemoveFile"
                  accept=".xls,.xlsx,.doc,.docx,.pdf,.jpg"
                  :format="formatFileType"

                >
                  <div style="padding: 20px 0">
                    <Icon
                      type="ios-cloud-upload"
                      size="52"
                      style="color: #3399ff"
                    ></Icon>
                    <div class="el-upload__text">
                      将文件拖到此处，或
                      <em style="color: #347ce8">点击上传</em>
                    </div>
                  </div>
                  <div
                    style="color: red;"
                    class="el-upload__tip"
                    slot="tip"
                  >文件支持类型：xls,xlsx,doc,docx,pdf,jpg等
                  </div>

                  <div
                    style="color: red;"
                    class="el-upload__tip"
                    slot="tip"
                  >注意：一次只能上传一个文件
                  </div>
                </Upload>
                <span>{{proName}}</span>
                <Progress v-if="beginupload" :percent="uploadprogress" style="width: 250px"/>

              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
    <div slot="footer" style="text-align: center">
      <!-- <Button type="success" size="large" @click="handleUploadFile()" v-if="onlyupload">上传文件</Button>
     <Button type="success" size="large" @click="handlePreviewFile()" v-if="onlyupload">预览文件测试</Button>-->
      <Button type="primary" size="large" @click="handleSubmit()">{{ btnConfirmTitle }}</Button>

      <!--<Button type="warning" size="large" @click="handleReset()">重置</Button>-->
    </div>
  </Modal>
</template>
<script>
  import Preview from "@/components/preview";
  import {NeizhenUtil, datarouters, chunkSize} from "../util/datarouters";
  import axios from 'axios';
  import {AddFileClass} from "@/views/diagnosis/js/addFile";
  import ChooseDeptTreeModal from '@/views/diagnosis/modal/chooseDeptTree';
  import store from '@/store'

  export default {
    components: {Preview, ChooseDeptTreeModal},
    props: {
      addFileState: {
        type: Object,
        required: true
      }
    },
    mounted() {
      // 获取文件类型
      // debugger
      /*      var that = this;
            this.$Get("/admin/dict/type/file_type", null, function (data) {

              var sdata = [];
              data.data.forEach(e => {
                sdata.push({label : e[mapdata.label], value : e[mapdata.value]});
              })

              that.lableArr = sdata;

            });*/

      //this.modelClass = new AddFileClass(this);

    },
    data() {
      return {
        maxUploadFileSize: 100 * 1024 * 1024, //文件最大上传大小
        src: "",
        selections: [], //选中的文件。
        formatFileType : ["xls","xlsx","doc","docx","pdf","jpg"],
        onlyupload: false,
        openDeptState: false,
        beginupload: false,
        uploadprogress: 0, // 上传gress
        uploadflag: false, // 上传标志
        hasExistFile: false, //上传文件是否存在
        scene: 1,  //场景 1 - 目标文件 2 - 标准文件
        uploadtxt: '选择文件',
        proName: "暂无上传文件",
        candeleteFile : true,  // 是否可删除文件
        btnConfirmTitle : "确认添加",
        searchName: {
          filetype: '',
          fileName: ''
        },
        previews: {
          //预览文件数据
          data: [],
          name: "",//文件名
          state: false
        },
        chooseOpenDepts: {
          state: false,
          data: []
        },
        operation : "add",
        uploadform: {
          fileId : '',
          fileType: '',
          fileName: '',
          keyword: '',
          privateFlag: '0',
          shareDepts: '',
          showOpendepts: '',
          fileDescription: '',
          upfile: [],
          randomName: ''
        },
        modelClass: null,
        uploadFile: {
          columns: [
            {
              title: "文件名",
              key: "name",
              align: "center"
            },
            {
              title: "操作",
              key: "action",
              width: 100,
              align: "center",
              render: (h, params) => {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        icon: "ios-close",
                        type: "text",
                        size: "small"
                      },
                      style: {
                        color: "#77c36a",
                        fontSize: "14px"
                      },
                      on: {
                        click: () => {
                          this.delSelectedFile(params.row);
                        }
                      }
                    },
                    "删除"
                  )
                ]);
              }
            }],
          data: []

        },
        departmentVal: "", //部门值
        department: [
          {
            value: "New York",
            label: "New York"
          },
          {
            value: "London",
            label: "London"
          },
          {
            value: "Sydney",
            label: "Sydney"
          },
          {
            value: "Ottawa",
            label: "Ottawa"
          },
          {
            value: "Paris",
            label: "Paris"
          },
          {
            value: "Canberra",
            label: "Canberra"
          }
        ],
        lableArr: [],
        lableVal: "",
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },

          {
            title: "文件名",
            key: "fileName",
            align: "center"
          },
          {
            title: "操作",
            key: "action",
            width: 180,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      icon: "ios-eye",
                      type: "text",
                      size: "small"
                    },
                    style: {
                      color: "#77c36a",
                      fontSize: "14px"
                    },
                    on: {
                      click: () => {
                        this.openPreviewModal(params.row);
                      }
                    }
                  },
                  "预览"
                )
              ]);
            }
          }
        ],
        fileData: [],
        total: 5,
        page: 1,
        pageSize: 5
      };
    },

    methods: {

      searchDeptName(id) {
        let deptName;

        var searchDeptName = function(searchdata, searchpid) {
          searchdata.forEach(e => {
            if (e.id == searchpid) {
              deptName = e.name;
              return;

            } else {
              if (e.children.length > 0) {
                searchDeptName(e.children, searchpid);
              }
            }
          });
        };



        searchDeptName(store.state.chooseDept,id);

        return deptName;
      },

      loadsData(rows) {
        this.clearuploadinfos();
        var that = this;
        this.scene = this.addFileState.data;
        this.uploadform.fileType=this.scene;
        // 公开部门，默认为登录用户的部门
        if (!rows) {
          this.uploadform.privateFlag = "0";
          this.uploadform.shareDepts = store.state.userInfo.dept_id.toString();
          this.uploadform.showOpendepts = this.searchDeptName(store.state.userInfo.dept_id.toString());
          this.operation = "add";
          this.btnConfirmTitle = "确认添加";
        } else {

          this.btnConfirmTitle = "确认修改";
          this.hasExistFile = true; // 禁止上传
          this.candeleteFile = false;
          this.operation = "update";
          // 填入数据

          this.uploadform.fileName = rows.fileName;
          this.uploadform.keyword = rows.keyword;
          this.uploadform.privateFlag = rows.privateFlag;
          this.uploadform.fileDescription = rows.description;
          this.uploadform.fileId = rows.fileId;
          if (rows.privateFlag == "0") {
            this.$AsyncDealData(datarouters.SystemManage.filemanage.fileDeptAuthorize, {fileId : rows.fileId}, function(data) {

              if (data.data.length > 0) {
                var sharedepts = "";
                var showopendepts = "";

                data.data.forEach(e => {
                  sharedepts += e.deptId + ",";
                  showopendepts += e.name + ","
                });

                that.uploadform.shareDepts = sharedepts.substr(0, sharedepts.lastIndexOf(","));
                that.uploadform.showOpendepts = showopendepts.substr(0, showopendepts.lastIndexOf(","));

              }
            });
          }



        }



        this.$Get("/admin/dict/type/file_type", null, function (data) {
          let sdata = [];
          data.data.forEach(e => {

            if(that.$store.state.permissions['fm_'+e.value ] && that.$store.state.permissions['fm_'+ e.value + "_upload" ]){
              sdata.push({ label: e.label, value: e.value });
            }
          });

          that.lableArr = sdata;

        });


        this.searchFile(1, 5, null, null);

      },
      // 清理上传的信息
      clearuploadinfos() {
        this.beginupload = false;
        this.uploadprogress = 0;
        this.uploadflag = false;
        this.hasExistFile = false;
        this.uploadform.fileType = '';
        this.uploadform.fileName = '';
        this.uploadform.keyword = '';
        this.uploadform.privateFlag = '0';
        this.uploadform.shareDepts = '';
        this.uploadform.showOpendepts = '';
        this.uploadform.fileDescription = '';
        this.uploadform.upfile = [];
        this.uploadform.randomName = '';
        this.hasExistFile = false; // 禁止上传
        this.candeleteFile = true;


      },

      searchFile(pageindex, pagesize, filetype, filename) {
        var that = this;
        this.$AsyncDealData(datarouters.SystemManage.filemanage.queryFileManage, {
          current: that.page,
          size: that.pageSize,
          searchfile: filename,
          filetype: filetype

        }, function (data) {


          if (data) {
            that.fileData = data.data.records;
            that.total = data.data.total;

          }

        }, true);

      },
      queryUploadFile() {
        this.searchFile(1, 5, this.searchName.filetype, this.searchName.fileName);

      },
      closeOpenDepts() {
        // debugger
        this.chooseOpenDepts.state = false;

      },
      loadSelectFileData() {
        var data = [];
        this.uploadform.upfile.forEach(e => {
          data.push({name: e.name});
        });
        return data;
      },
      handleBeforeUpload(file) {
        if (file.size > this.maxUploadFileSize) {
          this.$Message.error("上传文件最大不能超过100M，请检查文件上传大小！");
          return false;
        }

        var extname = file.name.substr(file.name.lastIndexOf(".") + 1, file.name.length - file.name.lastIndexOf("."));
        var foundext = false;
        this.formatFileType.forEach(e => {
          if (e == extname) {
            foundext = true;
          }
        });

        if (!foundext) {
          this.$Message.error("上传的文件类型非指定的文件类型，请选择指定的文件类型");
          return false;
        }


        this.beginupload = true;
        this.uploadprogress = 20; // 上传gress
        this.proName = "开始上传";
        this.handleChunkSubmit(file);
        //this.uploadform.upfile.push(file);
        //this.uploadFile.data = this.loadSelectFileData();
        //console.log("file", file);
        return false;
      },

      clearfile() {
        if (this.hasExistFile) {
          this.$Get("/mngfile/chunkfile/deleteupload", {
            randomName: this.uploadform.randomName,
            orignName: this.uploadform.upfile[0].name
          }, (data) => {
            this.proName = "暂无上传文件";
            this.beginupload = false;
            this.uploadprogress = 0; // 上传gress
            this.hasExistFile = false; //可以上传文件
            this.uploadform.fileName = '';
            this.uploadform.upfile = [];
          });
        }

      },
      // 移除
      handleRemoveFile(file, filelist) {
        this.$Get("/mngfile/chunkfile/deleteupload", {
          randomName: this.uploadform.randomName,
          orignName: file.name
        }, (data) => {
          this.beginupload = false;
          this.uploadprogress = 0; // 上传gress


        });
      },
      delSelectedFile(row) {
        var that = this;
        this.uploadform.upfile.every((e, index) => {
          if (e.name == row.name) {
            that.uploadform.upfile.splice(index, 1);
            return false;
          }

        });
        this.uploadFile.data = this.loadSelectFileData();
      },
      //请求数据
      getdata() {
        this.fileData = [
          {
            id: 1,
            name:
              "关于印发1《高等职业院校内部质量保证体系诊断与改进复核工》"
          },
          {
            id: 2,
            name:
              "关于印发2《高等职业院校内部质量保证体系诊断与改进复核工》"
          },
          {
            id: 3,
            name:
              "关于印发3《高等职业院校内部质量保证体系诊断与改进复核工》"
          }
        ];
      },
      //分页
      changePage(val) {
        this.page = val;
        this.searchFile(val, 5, this.searchName.filetype, this.searchName.fileName);
      },
      //选中行
      selectRow(selection) {
        this.selections = selection;
      },
      //关闭预览
      closePreview(val) {
        this.previews.state = val;
      },
      //打开预览
      openPreviewModal(row) {
        // 把选择的文件数据===>previews.data传给子组件
        var authcode = "";
        this.previews.name = row.fileSuffix
        // this.previews.data = '/admin/filemanage/preview/' + row.fileId;
        this.previews.data = '/mngfile/chunkfile/previewStream/' + row.fileId;

        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      //上传成功
      handleSuccess(response, file, fileList) {

      },

      //预览
      show(row) {

      },
      //关闭添加文件
      closeModal() {
        let flag = false;
        this.$emit("closeMains", flag);
        // this.addFileState=false
      },
      tabchange(name) {
        if (name == "tab1") {
          this.onlyupload = false;
          this.uploadtxt = "选择文件";
        } else {
          this.onlyupload = true;
          this.uploadtxt = "确定";
          this.clearuploadinfos();

          this.uploadform.fileType = NeizhenUtil.setSelectOption(this, "lableArr", this.lableArr[0].value);
        }
      },

      handleDownFile() {
        // 测试下载
        this.$DownLoad("/mngfile/chunkfile/download/9", null);
      },

      handlePreviewFile() {
        this.$Post(
          "/mngfile/chunkfile/preview"
          , {fileId: 9, previewUserId: 1, renew: true}, (data) => {
          }, null, true);
      },

      handleChunkSubmit(file) {
        var that = this;
        var fileChoice = file;
        var randomName;

        var beforeUpload = function () {
          return new Promise((resovle, reject) => {

            var totalChunk = 0;
            // 获取切片总数

            if (fileChoice.size > chunkSize) {
              var chunk = fileChoice.size % chunkSize > 0 ? Math.ceil(fileChoice.size / chunkSize) : Math.floor(fileChoice.size / chunkSize);
              totalChunk = chunk;
            } else {
              totalChunk = 1;
            }

            that.$Get("/mngfile/chunkfile/beforeUpload", {
              index: 0,
              orignFileName: fileChoice.name,
              chunks: totalChunk,
              "fileSize": fileChoice.size
            }, (data) => {
              that.uploadprogress = 20;


              randomName = data.data;
              that.uploadform.randomName = randomName;
              resovle(randomName);
            });
          });
        };
        this.uploadflag = true;
        this.hasExistFile = true;
        this.uploadform.upfile.push(file);

        beforeUpload().then((resolve) => {
          // 上传文件
          that.$ChunkUpload("/mngfile/chunkfile/upload", null, fileChoice, randomName, 0, function (totalslice, currentslice) {
            var base = 20;
            var currentpercent = Math.floor((currentslice / totalslice) * 60)
            that.uploadprogress = base + currentpercent;
          }, function (randomName) {
            that.uploadprogress = 80;
            that.$ChunkUploadGet("/mngfile/chunkfile/uploadFinish/" + randomName, null)
              .then((data) => {
                that.uploadflag = false;
                if (data.data) {
                  that.uploadform.fileName = fileChoice.name.substr(0, fileChoice.name.lastIndexOf("."));
                  that.uploadprogress = 100;
                  that.proName = "文件上传成功";
                  that.beginupload = false;
                  that.$Message.success("上传成功")
                }
              });
          }, function (failcurrent) {

          })

        }, (reject) => {
          that.uploadflag = false;
          return;
        });


      },

      handleSubmit() {
        var that = this;
        if (this.operation == "add") {

          if (this.uploadform.upfile.length < 1) {
            this.$Message.error("未选择文件，请先选择一个文件！");
            return;
          }
          // 保存文件信息
          this.$Post("/admin/chunkfile/save", {
            "fileName": this.uploadform.fileName,
            "fileType": this.uploadform.fileType,
            "keyword": this.uploadform.keyword,
            "privateFlag": this.uploadform.privateFlag,
            "sharedepts": this.uploadform.shareDepts,
            "description": this.uploadform.fileDescription,
            "randomName": this.uploadform.randomName,
            "orignFileName": this.uploadform.upfile[0].name,
            "fileSize": this.uploadform.upfile[0].size
          }, function (data) {
            if (data.data) {
              //this.$emit("closeMains", false, that.scene, data.data);
              that.clearuploadinfos();
              that.$refs.tabs.activeKey = 'tab2';
              // 跳转到选择页
              that.$Message.success("添加文件成功");
              let flag = false;
              that.$emit("closeMains", flag);
            }
          });
        } else {

          this.$Post("/admin/chunkfile/update", {
            "fileId" : this.uploadform.fileId,
            "fileName": this.uploadform.fileName,
            "fileType": this.uploadform.fileType,
            "keyword": this.uploadform.keyword,
            "privateFlag": this.uploadform.privateFlag,
            "sharedepts": this.uploadform.shareDepts,
            "description": this.uploadform.fileDescription

          }, function (data) {
            if (data.data) {
              //this.$emit("closeMains", false, that.scene, data.data);
              that.clearuploadinfos();

              that.$Message.success("添加文件成功");
              let flag = false;
              that.$emit("closeMains", flag);
            }
          });


        }
      },
      showUploadFileOpenDepts() {

        var depts = [];
        this.$refs["chooseDept"].loadData();
        NeizhenUtil.isEmpty(this.uploadform.shareDepts) ? {} : (depts = this.uploadform.shareDepts.split(","));
        this.$refs["chooseDept"].setManageDeptSelected(depts);
        this.chooseOpenDepts.state = true;
      },
      selectOpenDepts(data) {

        if (!NeizhenUtil.isEmpty(data)) {
          var ids = [];
          var names = [];
          data.forEach(e => {
            ids.push(e.id);
            names.push(e.title);
          });
          this.uploadform.shareDepts = ids.join(",");
          this.uploadform.showOpendepts = names.join(",");
        }

        this.chooseOpenDepts.state = false;


      },
      //保存
      handleUploadFile() {
        // 上面选中了文件  存在 this.selections里
        // 接口保存成功
        // debugger
        let flag = false;
        let that = this;
        this.$Upload("/admin/filemanage/tmpfile", {
          "fileName": this.uploadform.fileName,
          "fileType": this.uploadform.fileType,
          "keyword": this.uploadform.keyword,
          "privateFlag": this.uploadform.privateFlag,
          "sharedepts": this.uploadform.shareDepts,
          "description": this.uploadform.fileDescription


        }, this.uploadform.upfile, function (data) {
          if (data.data) {
            that.$confirm("上传文件成功，要继续上传文件？", "提示", {
              type: "warning"
            }).then(() => {
              that.resetUpload();
            }).catch(() => {
            });

          }


        });
        //this.$emit("closeMains", flag);
        // this.addFileState=false
      },
      resetUpload() {
        this.uploadform.fileType = '';
        this.uploadform.fileName = '';
        this.uploadform.keyword = '';
        this.uploadform.privateFlag = '0';
        this.uploadform.shareDepts = '';
        this.uploadform.fileDescription = '';
        this.uploadform.upfile = [];
        this.loadSelectFileData();


      },
      //重置
      handleReset() {

      }
    }
  };
</script>

<style scoped>
  .deIcon:hover {
    cursor: pointer;
  }

  .deIcon {
    font-size: 24px;
    color: red
  }
</style>
