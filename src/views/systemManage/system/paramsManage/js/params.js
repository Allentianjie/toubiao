import {NeizhenUtil, datarouters} from "../../../../../util/datarouters";

export class SysParamsClass {
  constructor(global) {
    this._global = global

  }

  saveParams(obj) {
    var that = this;

    this._global.$AsyncDealData(datarouters.SystemManage.sysparams.save, obj, (data) => {
      that.pageParams(1 , 10, null);
      that._global.$Message.success("保存成功！");
    });

  }

  updateParams(obj) {
    var that = this;
    this._global.$AsyncDealData(datarouters.SystemManage.sysparams.update, obj, (data) => {
      that.pageParams(1 , 10, null);
      that._global.$Message.success("保存成功！");
    });

  }


  pageParams(pageindex, pagesize, filterName) {
    var that = this;
    var obj = {};
    obj.current = pageindex;
    obj.size = pagesize;
    if (!NeizhenUtil.isEmpty(filterName)) {
      obj.filterName = filterName;
    }

    this._global.$AsyncDealData(datarouters.SystemManage.sysparams.page, obj, (data) => {
      console.log(data);
      if (data.data.records.length > 0) {
        var showdata = [];
        data.data.records.forEach(e => {

          var me = {}
          Object.assign(me, e, {rowoptype : 0, operation : "update"});
          showdata.push(me);
        });
        this._global.tableData = showdata;


      } else {
        this._global.tableData = [];
      }


      this._global.total = data.data.total;

    });
  }

  getParams(id, callback) {
    var that = this;
    this._global.$AsyncDealData(datarouters.SystemManage.sysparams.get, {"id" : id}, (data) => {
      callback(data);
    });
  }

  deleteParams(id) {
    var that = this;
    this._global.$AsyncDealData(datarouters.SystemManage.sysparams.delete, {"id" : id}, (data) => {
      that.pageParams(1 , 10, null);
      that._global.$Message.success("删除参数成功！");
    });
  }

}
