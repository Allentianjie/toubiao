export const chunkSize = 2 * 1024 * 1024;

export const datarouters = {
  "SystemManage" : {
    "department" : {
      "insert": {
        url: "/dept",
        description: "新增部门",
        type: "post",
        restful : false
      },

      "update" : {
        url: "/dept",
        description: "修改部门",
        type: "put",
        restful : false
      },

      "delete" : {
        url: "/dept",
        description: "删除部门",
        type: "delete",
        restful : true,
        restfulparams : ["id"]
      },

      "get" : {
        url: "/dept",
        description: "获得部门",
        type: "get",
        restful : true,
        restfulparams : ["id"]
      },

      "treemenu" : {
        url: "/dept/tree",
        description: "获取树状菜单",
        type: "get"
      },

      "usertreemenu" : {
        url: "/dept/user-tree",
        description: "获取用户树状菜单",
        type: "get"
      },
      "page" : {
        url: "/dept/page",
        description: "获得部门分页",
        type: "get"
      },

    "savedepartcharge" : {
      url: "/dept/saveDeptCharges",
      description: "保存用户部门负责人",
      type: "get"
    },
    "getdepartcharge" : {
      url: "/dept/getDeptCharges",
      description: "获取用户部门负责人",
      type: "get"
    }

    },


    // 字典管理
    "dictionary" : {
      "get": {
        url: "/dict",
        description: "获得字典",
        type: "get",
        restful: true,
        restfulparams: ["id"]
      },

      "page" : {
        url: "/dict/page",
        description: "获得字典分页",
        type: "get"
      },

      "type" : {
        url: "/dict/type",
        description: "通过字典类型获得字典",
        type: "get",
        restful: true,
        restfulparams: ["id"]
      },

      "insert": {
        url: "/dict",
        description: "获得字典",
        type: "post"
      },

      "delete" : {
        url: "/dict",
        description: "删除字典",
        type: "delete",
        restful: true,
        restfulparams: ["id", "type"]
      },

      "update" : {
        url: "/dict",
        description: "修改字典",
        type: "put"
      }

    },

    // 日志管理
    "log" : {
      "page" : {
        url: "/dict/page",
        description: "获得日志分页",
        type: "get"
      }
    },

    //菜单管理
    "menu" : {
      "usermenu" : {
        url : "/menu",
        description: "获得用户菜单",
        type: "get"
      },

      "treemenu" : {
        url : "/menu/tree",
        description: "返回树状菜单",
        type: "get"
      },
      "rolemenu" : {
        url : "/menu/tree",
        description: "返回树状菜单",
        type: "get",
        restful : true,
        restfulparams : ["roleId"]
      },
      "get": {
        url: "/menu",
        description: "获得菜单",
        type: "get",
        restful: true,
        restfulparams: ["id"]
      },

      "insert": {
        url: "/menu",
        description: "新增菜单",
        type: "post"
      },

      "delete" : {
        url: "/menu",
        description: "删除菜单",
        type: "delete",
        restful: true,
        restfulparams: ["id"]
      },

      "update" : {
        url: "/menu",
        description: "修改菜单",
        type: "put"
      }

    },

    // 角色管理

    "role" : {
      "get": {
        url: "/role",
        description: "获得菜单",
        type: "get",
        restful: true,
        restfulparams: ["id"]
      },

      "insert": {
        url: "/role",
        description: "新增菜单",
        type: "post"
      },

      "delete" : {
        url: "/role",
        description: "删除菜单",
        type: "delete",
        restful: true,
        restfulparams: ["id"]
      },

      "update" : {
        url: "/role",
        description: "修改菜单",
        type: "put"
      },

      "roleList" : {
        url : "/role/list",
        description: "角色列表",
        type: "get"

      },

      "page" : {
        url: "/role/page",
        description: "获得角色分页",
        type: "get"

      },

      "roleMenu" : {
        url: "/role/menu",
        description: "更新角色菜单",
        type: "post"
      },
      "userRoles" : {
        url : "/role/userRoles",
        description: "获取用户角色",
        type: "get"
      },
      "saveUserRoles" : {
        url : "/role/saveUserRoles",
        description: "保存用户角色",
        type: "post"
      },
      "arrangeUserRoles" : {
        url : "/role/arrangeUserRoles",
        description: "获取用户所有角色",
        type: "get"
      },
      "roleUsers" : {
        url : "/role/getRoleUsers",
        description: "根据角色获得用户信息",
        type: "get"
      },

      "saveRoleUsers" : {
        url : "/role/saveRoleUsers",
        description: "保存角色用户，批量保存",
        type: "post"
      },

      "removeRoleUsers" : {
        url : "/role/removeRoleUsers",
        description: "删除角色用户",
        type: "get"
      },

      "roleUserTypes" : {
        url : "/role/getRoleUserTypes",
        description: "根据角色获得设置的用户的默认类型",
        type: "get"
      },

      "saveRoleUserTypes" : {
        url : "/role/saveRoleUserTypes",
        description: "保存角色设置的默认用户类型",
        type: "get"
      }

    },

    // 用户管理

    "user" : {
      "info": {
        url: "/user/info",
        description: "用户信息列表",
        type: "get"
      },

      "deptcharge" : {
        url: "/user/deptcharge",
        description: "部门负责人",
        type: "get",
        restful: true,
        restfulparams: ["deptId"]
      },

      "validateName" : {
        url: "/user/validateName",
        description: "验证用户名相同",
        type: "get",
        restful: true,
        restfulparams: ["username"]
      },

      "validateCode" : {
        url: "/user/validateCode",
        description: "验证用户名相同",
        type: "get",
        restful: true,
        restfulparams: ["usercode"]
      },

      "validateOldPwd" : {
        url: "/user/validateOldPassword",
        description: "验证用户旧密码",
        type: "get",
        restful: true,
        restfulparams: ["password"]
      },

      "changeOldPwd" : {
        url: "/user/changePassword",
        description: "更改用户密码",
        type: "get",
        restful: true,
        restfulparams: ["password"]
      },


      "infobyname": {
        url: "/user/info",
        description: "由用户名获取用户信息",
        type: "get",
        restful: true,
        restfulparams: ["username"]
      },

      "detailbyname": {
        url: "/user/detail",
        description: "由用户名获取用户信息",
        type: "get",
        restful: true,
        restfulparams: ["username"]
      },

      "get": {
        url: "/user",
        description: "获得用户",
        type: "get",
        restful: true,
        restfulparams: ["id"]
      },

      "insert": {
        url: "/user",
        description: "新增用户",
        type: "post"
      },

      "delete" : {
        url: "/user",
        description: "删除用户",
        type: "delete",
        restful: true,
        restfulparams: ["id"]
      },

      "update" : {
        url: "/user",
        description: "修改用户",
        type: "put"
      },
      "page" : {
        url: "/user/page",
        description: "获得用户分页",
        type: "get"

      },
      "saveUserManageDepts" : {
        url: "/user/saveUserManageDepts",
        description: "保存用户管理部门",
        type: "post"
      },
      "resetpwd" : {
        url: "/user/resetpwd",
        description: "密码重置",
        type: "get",
        restful: true,
        restfulparams: ["userId"]
      },

      "getUsersByrole" : {
        url: "/user/getUsersByrole",
        description: "密码重置",
        type: "post"
      },

      "userdeptCharge" : {
        url: "/user/userdeptcharge",
        description: "用户负责部门",
        type: "get",
        restful: true,
        restfulparams: ["userId"]
      }





    },

    "filemanage" : {
      "queryFileManage" : {
        url: "/filemanage/queryFileManage",
        description: "查询文件列表",
        type: "post",
      },

      "page" : {
        url: "/filemanage/page",
        description: "查询文件",
        type: "get",
      },

      "delete" : {
        url: "/filemanage",
        description: "查询文件",
        type: "delete",
        restful : true,
        restfulparams : ["fileId"]
      },
      "downfile" : {
        url: "/filemanage/download",
        description: "查询文件",
        type: "post",
        restful : true,
        restfulparams : ["fileId"]
      },

    },

    "hierarchy" : {
      "asynctree" : {
        url: "/hierarchy/loadAsyncTree",
        description: "异步加载树",
        type: "get",
        restful : true,
        restfulparams : ["expandId"]

      },

      "searchTree" : {
        url: "/hierarchy/asyncTreeSearch",
        description: "异步加载树",
        type: "get",
        restful : true,
        restfulparams : ["searchName"]
      },
      "updateReport" : {
        url: "/hierarchy/hierarchyReport",
        description: "异步加载树",
        type: "get",
        restful : true,
        restfulparams : ["himId"]
      },
      "getTop" : {
        url: "/hierarchy",
        description: "获得顶级体系",
        type: "get",
        restful : true,
        restfulparams : ["id"]
      },
      "monitorySummary" : {

        url: "/hierarchy/hierarchyMonitorSummary",
        description: "监控大屏体系统计",
        type: "get",
      }

    },

    "target" : {
      "searchTarget" : {
        url: "/target/searchTarget",
        description: "异步加载树",
        type: "post"
      }
    },

    "taskreport" : {
      "insert" : {
        url: "/task/report",
        description: "插入数据",
        type: "post"
      },
      "update" : {
        url: "/task/report",
        description: "修改数据",
        type: "put"
      },
      "delete" : {
        url: "/task/report",
        description: "删除数据",
        type: "delete",
        restful : true,
        restfulparams : ["reportId"]
      },

      "getTask" : {
        url: "/task/report/get",
        description: "删除数据",
        type: "get",
        restful : true,
        restfulparams : ["taskId"]
      },

      taskMapTarget : {
        url: "/task/report/page/taskMaptarget",
        description: "获取个人任务对应的目标",
        type: "post",
      },


      "page" : {
        url: "/task/report/page",
        description: "获取分页",
        type: "get"
      },
    },

    "sysparams" : {
      "save" : {
        url: "/sysparams/save",
        description: "保存系统参数",
        type: "post"
      },

      "update" : {
        url: "/sysparams/update",
        description: "修改系统参数",
        type: "put"
      },

      "delete" : {
        url: "/sysparams/delete",
        description: "删除系统参数",
        type: "get",
        restful : true,
        restfulparams : ["id"]
      },

      "get" : {
        url: "/sysparams/get",
        description: "获取数据",
        type: "get",
        restful : true,
        restfulparams : ["id"]
      },
      "page" : {
        url: "/sysparams/page",
        description: "分页",
        type: "get"

      },



    }







  }
};

export class NeizhenUtil {


  static noop(){}

  static confirm(global, title, okfunc, cancelfunc) {
    global.$confirm(title, "提示", {
      type: "warning"
    }).then(() => {
      if (okfunc) {
        okfunc(global);
      }

    }).catch(() => {
      if (cancelfunc) {
        cancelfunc.call(this, global);
      }
    });
  }

  static isEmpty(obj) {
    if (obj == undefined || obj == null || obj === "") {
      return true;
    }
    if (typeof(obj) == "Array") {
      if (obj.length == 0) return true;
    }
    return false;
  }

  static isFunction(obj) {
    if (typeof(obj) == "function") {
      return true;
    }

    return false;

  }

  // mapdata 的格式 {id:, name: ,pid:, sort: ,children: }
  static treeDataToStandardTreeData(data, mapdata) {
    var finisthdata = [];



    var treedatatrans = function (resultdata, nextleveldata) {
      nextleveldata.forEach(e => {
        var expand = false;
        if (e.parentId == 0) {
          expand = true;
        }
        var kdata = maketreedata(e, expand);
        if (e[mapdata.children] != null && e[mapdata.children].length > 0) {
          // 有下一级，循环
          treedatatrans(kdata.children, e[mapdata.children]);
        }
        resultdata.push(kdata);
      });

    };

    var maketreedata = function (odata, expand) {
      var treedata = {title : odata[mapdata.name], id : odata[mapdata.id]};
      treedata.extdata = {};
      for (var m in odata) {
        if (m != mapdata.children) {
          treedata.extdata[m] = odata[m];
        } else {

          treedata.expand = expand;
          treedata.children = [];
        }
      }

      return treedata;

    };

    treedatatrans(finisthdata,data);
    // console.log("fdata", finisthdata);

    return finisthdata;


  }


  // 树的归并
  // 树的归并算法 1、主树上级节点存在，则只保留上级节点，上级节点继续查询,仍然存在着子节点的情况,
  // 传入的选择项
  static treeMerge(data, mapdata) {
    let toplevel = 0;

  }

  // mapdata 的格式 {id:, name: , pid: }
  static listToTreeData(data, mapdata) {
    var finishdata = [];

    var callbackdata = function (rootdata, pidvalue, expand) {
      data.forEach(e => {
        if (e[mapdata.pid] == pidvalue) {
          var treedata = maketreedata(e, expand);
          if (treedata.haschildren) {
            callbackdata(treedata.children, e[mapdata.id], true);
          }
          rootdata.push(treedata);
        }
      });

    };

    var maketreedata = function (odata, expand) {
      var treedata = {title : odata[mapdata.name]};
      if (odata.extdata) {
        treedata.extdata = odata.extdata;
      } else {
        treedata.extdata = odata;
      }
      if (haschildren(data, mapdata.pid, odata[mapdata.id])) {
        treedata.expand = expand;
        treedata.haschildren = true;
        treedata.children = [];
      }
      return treedata;

    };

    var haschildren = function (sdata, pidfield, pidvalue) {
      var has = false;
      data.forEach(e => {
        if (e[pidfield] == pidvalue) {
          has = true;
          return false
        }
      });

      return has;

    };

    callbackdata(finishdata, "0", true);
    return finishdata;

  }

  static treedataToListData(tree, listdata) {

    tree.forEach(e => {
      if (e.children.length > 0) {
        this.treedataToListData(e.children, listdata);
      }
      listdata.push(e.extdata);
    });
  }


  static searchTreeDataByTxt(searchtxt, searchlist, searchfiled) {

    var result = [];
    var treeseach = (stxt, slist, sfield, mresult) => {
      slist.forEach(e => {
        if (e.extdata.orignData[sfield].indexOf(stxt) >= 0) {

          mresult.push(e);

        }

        if (e.children.length > 0) {
          treeseach(stxt, e.children, sfield, mresult);
        }
      });
    };



    treeseach(searchtxt, searchlist, searchfiled, result);
    return result;

  }

  // 从搜索树获取一颗完整树
  // mapdata格式 {id:, name: ,pid:, sort: ,children: }
  static getTreeListFromSearchResult(fulltree, searchresult, mapdata) {

    let toplevel = 0;

    var lastresult = [];

    var contains = (id) => {
      var found = false;
      for (var i = 0; i < lastresult.length; i++) {
        var e = lastresult[i];
        if (e[mapdata.id] == id) {
          return true;
        }
      }
      return false;

    };

    var haschildren = function (pidfield, pidvalue) {
      var has = false;
      fulltree.every(e => {
        if (e[pidfield] == pidvalue) {
          has = true;
          return false
        }
      });

      return has;

    };


    var searchparenttree = (searchdata,searchid) => {
      searchdata.forEach(e => {
        if (e.extdata[mapdata.id] == searchid) {
          if (!contains(searchid)) {
            lastresult.push(e.extdata);

          }

          if (searchid != toplevel) {
            searchparenttree(fulltree, e.extdata[mapdata.pid]);

          }

        }

        if (e.children.length > 0) {
          searchparenttree(e.children, searchid);
        }

      })

    };

    var searchchildtree = (searchdata, searchid) => {
      searchdata.forEach(e => {
        if (e.extdata[mapdata.pid] == searchid) {
          if (!contains(searchid)) {
            lastresult.push(e.extdata);

          }

          if (haschildren(mapdata.pid, e.extdata[mapdata.id])) {
            searchchildtree(fulltree, e.extdata[mapdata.id]);
          }
        }

        if (e.children.length > 0) {
          searchchildtree(e.children, searchid);
        }

      });
    };



    searchresult.forEach(e => {
      var pid = e.extdata[mapdata.pid];
      var id = e.extdata[mapdata.id];
      if (!contains(e.extdata[mapdata.id])) {
        lastresult.push(e.extdata);
      }

      // 向上搜索
      searchparenttree(fulltree,pid);
      // 向下搜索
      //searchchildtree(fulltree,id);
    });

    return lastresult;



  }

  // mapdata的格式 {label : , value: }
  static toSelectData(data, mapdata) {
    var finishdata = [];
    data.forEach(e => {
      finishdata.push({label: e[mapdata.label], value : e[mapdata.value], extdata : e});
    });
    return finishdata;
  }

  static selectOptionValue(optiondatas, selectvalue) {
    for (var i = 0; i < optiondatas.length; i++) {
      if (optiondatas[i].value == selectvalue) {
        return i;
      }
    }
    return 0;
  }

  // 选择选择框的默认的值
  static setSelectOption(global, rdata, selectvalue) {

    return global[rdata][this.selectOptionValue(global[rdata], selectvalue)].value;

  }



  // 远程获取字典表信息，并加工成为标准的数据
  // selectData默认为 {label: , value: }
  static remoteDictoSelectData(global, dicurl, rdata, mapdata) {

    var m = global;
    global.$Get(dicurl, null, function (data) {

      var sdata = [];

      data.data.forEach(e => {
        sdata.push({label : e[mapdata.label], value : e[mapdata.value]});
      });


      global[rdata] = sdata;

    });
  }

  static formbind(formvalidate, binddata) {
    for (var x in binddata) {
      if (formvalidate[x]) {
        formvalidate[x] = binddata[x];
      }
    }

  }

  static formclear(formvalidate) {
    for (var x in formvalidate) {
      formvalidate[x] = '';
    }

  }

  // 值替换
  // vfilevalue 格式 {label: , value: }
  static tableValueReplace(h, row, vfiled, vfileValues) {

    var value = row[vfiled];
    var label = '';
    for (var i = 0; i < vfileValues.length; i++) {
      var e = vfileValues[i];
      if (e.value == value) {
        return h("div",[e.label])
        label = e.label;
        break;
      }
    }
    return h("div",[""]);

  }



  static deepClone(obj) {
    var clone = (obj) => {
      var o;
      // 如果  他是对象object的话  , 因为null,object,array  也是'object';
      if (typeof obj === 'object') {

        // 如果  他是空的话
        if (obj === null) {
          o = null;
        }
        else {

          // 如果  他是数组arr的话
          if (obj instanceof Array) {
            o = [];
            for (var i = 0, len = obj.length; i < len; i++) {
              o.push(clone(obj[ i ]));
            }
          }
          // 如果  他是对象object的话
          else {
            o = {};
            for (var j in obj) {
              o[ j ] = clone(obj[ j ]);
            }
          }

        }
      }
      else {
        o = obj;
      }
      return o;
    };

    return clone(obj);
  }


  // 对比两个list是否一致
  static compareList(list1, list2, comparefunc) {
    if (list1 == null && list2 == null) return true;

    if (list1 == null || list2 == null) return false;

    if (list1.length != list2.length) return false;

    var found = [];



    for (var i = 0; i < list1.length; i++) {
      found.push(false);
      for (var j = 0; j < list2.length; i++) {
        if (this.isFunction(comparefunc)) {
          if (comparefunc(list1[i], list2[j])) {
            found[i] = true;
            break;
          }
        } else {
          if (list1[i] == list2[j]) {
            found[i] = true;
            break;
          }
        }
      }
    }

    for (var m = 0; m < found.length; m++) {
      if (!found[m]) {
        return false;
      }
    }

    return true;


  }


  static ojoin(arry, spliter, funcdata) {
    var joinStr = "";
    for (var i = 0; i < arry.length; i++){
      if (this.isObject(arry[i]) && this.isFunction(funcdata)) {
        joinStr += funcdata(arry[i]) + spliter;
      } else {
        if (this.isObject(arry[i])) {
          joinStr += "[Object]" + spliter;
        } else {
          joinStr += arry[i] + spliter;

        }
      }
    }

    return joinStr != "" ? joinStr.substr(0, joinStr.length - 1) : "";

  }

  static isObject(obj) {
    if (typeof(obj) == "object") {
      return true;
    }
    return false;
  }

  static isArray(obj) {
    if (typeof(obj) == "array") {
      return true;
    }
    return false;
  }


  // echart数据抽取
  static extractEchartData(arrys, fields) {

    if (!fields) {
      var sdata = {};
      if (this.isArray(arrys)) {
        fields.forEach(fe => {
          var pushdata = [];
          arrys.forEach(e => {
            if (this.isObject(e)) {
              pushdata.push(e[fe]);
            } else {
              pushdata.push(e);
            }
          });
          sdata[fe] = pushdata;
        });
      }
      return sdata;
    }

    return arrys;
  }


}





