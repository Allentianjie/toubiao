import Vue from "vue";
export const globalData = {
  System : {
    userTypes: [
      {label: "学生", value: "0"},
      {label: "教师", value: "1"},
      {label: "教职工", value: "2"}
    ]
  },


  transfer : function(sourcedata, value) {
    for (var i = 0; i < sourcedata.length; i++) {
      if (sourcedata[i].value == value) {
        return sourcedata[i].label;
      }
    }

    return "";
  },

  // mapdata {label: , value : }
  ajaxTransfer : function (url,param, mapdata, value, setValue) {
    Vue.$Get(url, param, function (data) {
      if (data.code == '0') {
        var sourcedata = data.data;
        for (var i = 0; i < sourcedata.length; i++) {
          if (sourcedata[i][mapdata.value] == value) {
            setValue = sourcedata[i][mapdata.label];
          }
        }

      }

    });
  }
};


