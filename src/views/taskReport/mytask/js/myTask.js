
import {NeizhenUtil, datarouters} from "../../../../util/datarouters";

export class MyTask {
  constructor(global, store) {
    this._global = global;
    this._store = store;
  }


  // 获得是否填报的状态和锁定的状态
  getHimReportFlag(himId) {
    let that = this._global;
    this._global.$AsyncDealData(datarouters.SystemManage.hierarchy.getTop, {
      id : himId
    }, function(data) {

      if (data) {

        that.report.reportFlag = data.data.reportFlag;
        that.report.reportLockFlag = data.data.reportLockFlag;
        that.report.startTime = data.data.startTime;
        that.report.endTime = data.data.endTime;
        that.report.himId = himId;
        if(data.data.reportFlag === '1'){
          that.reportTaskFlag = true
        }

      }
    });
  }

  // 获得任务目标等信息
  getReportList() {










  }



}
