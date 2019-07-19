
import {NeizhenUtil, datarouters} from "../../util/datarouters";


export class DoubleStandard{
  constructor(global, store) {
    this._global = global;
    this._store = store;
  }

  // 异步加载树
  asyncLoadTree(expandId, resolve) {
    var that = this._global;
    this._global.$AsyncDealData(datarouters.SystemManage.hierarchy.asynctree, {expandId : expandId}, function (data) {
      if (data.data.length > 0) {
        //
        if (data.data[0].parentId == 0) {
          var firstexpand = data.data[0];

          that.defaultExpandIds.push(firstexpand.id);
        }
      }
      resolve(data.data);
    });

  }

  // 初始化树
  loadInitTree() {
    this._global.asyncSearchData = null;
    var that = this._global;
    this._global.$AsyncDealData(datarouters.SystemManage.hierarchy.asynctree, {expandId : 0}, function (data) {
      if (data.data.length > 0) {
        //

        if (data.data[0].parentId == 0) {
          var firstexpand = data.data[0];

          that.defaultExpandIds.push(firstexpand.id);
        }

        that.treeData = data.data;
        that.tableData = [];
      }

    });

  }

  //点击体系树查询结果
  searchHieracyTree(searchName) {
    var that = this._global;
    this._global.$AsyncDealData(datarouters.SystemManage.hierarchy.searchTree, {searchName : searchName}, function (data) {
      that.treeData = data.data;
      that.asyncSearchData = data.data;
      that.tableData = [];
    });

  }

  // 部门树绑定
  deptTreeSet() {
    // this._global.orgtData = this._store.state.chooseDept;
    this._global.orgtData = this._store.state.chooseDataScopeDept;
  }

  //搜索整改目标
  /**
   * 搜索整改目标
   *
   * @param pageindex 页数
   * @param pagesize 每页数量
   * @param himid 体系ID
   * @param depts 所属部门
   * @param directory 负责人
   * @param targetName 目标名称
   *
   *
   * */
  searchTargets(pageindex, pagesize, himid, depts, directory, targetName) {

    var that = this._global;
    var _this = this;


    // debugger
    var queryobj = {
      current : pageindex,
      size : pagesize,
      pointId : NeizhenUtil.isEmpty(himid) ? null : himid,
      depts : NeizhenUtil.isEmpty(depts) ? null : depts,
      direcotName : NeizhenUtil.isEmpty(directory) ? null : directory,
      targetName : NeizhenUtil.isEmpty(targetName)  ? null : targetName
    };
    this._global.$AsyncDealData(datarouters.SystemManage.target.searchTarget, queryobj, function (data) {
      that.tableData = _this.tableDataTransfer(that.selecttab, data.data.records);
      that.total = data.data.total;

    }, true);

  }

  searchHierarchy(id) {
    var that = this._global;
    var _this = this;

    var queryobj = {
      id : id ? id: 1
    };
    this._global.$AsyncDealData(datarouters.SystemManage.hierarchy.getTop, queryobj, function (data) {
      console.log(55555)
      that.tableData = _this.tableHierarchyTransfer(data.data);
      that.total = 1;

    }, true);


  }

  // hierachy 数据转换
  tableHierarchyTransfer(origndata) {
    var outdata = [];
    // var e = origndata;
    origndata.forEach(e => {
      outdata.push({
        name: e.target,
        target: '',
        standard: '',
        current: '',
        startTime: e.startTime,
        endTime: e.endTime,
        targetFiles: e.files,
        standardFiles: e.files,
        id: e.id
      });
    })
    return outdata;
  }

  tableDataTransfer(type, origndata) {
    var outdata = [];
    origndata.forEach(e => {
      outdata.push({
        name : e.targetName,
        target : e.disTargetValue,
        standard : e.disStandardValue,
        current : e.disValue,
        startTime : e.startTime,
        endTime : e.endTime,
        targetFiles : e.targetFiles,
        standardFiles : e.standardFiles
      })
    });
    return outdata;
  }




}
