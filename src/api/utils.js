// const url = 'http://172.20.14.59:9999'
import axios from "axios"
import {
  Loading
} from 'element-ui';
import {
  Message
} from 'element-ui';
import CryptoJS from "crypto-js";
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default {

  //获取list对象的id
  assemblId: function (arr) {
    let arr1 = [];
    if (arr == '') {} else {
      for (let i = 0; i < arr.length; i++) {
        arr1.push(arr[i].id);
      }
    }
    return arr1;
  },
  //获取list对象的name
  assemblName: function (arr) {
    let str = "";
    if (arr == '') {} else {
      for (let i = 0; i < arr.length; i++) {
        str = str + "," + arr[i].name;
      }
      str = str.substring(1);
    }
    return str;
  },
  //获取路径传参值
  getUrlParam: function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
      return unescape(r[2]);
    return null; // 返回参数值
  },

  /**
   * long型日期格式化为YYYY-MM-dd HH:mm:ss
   * @param date
   * @returns {string}
   */
  dateFormat: function (date) {
    if (date == null || date == '') {
      return '';
    } else {
      let mDate = new Date(date);
      let seperator1 = "-";
      let seperator2 = ":";
      let month = mDate.getMonth() + 1;
      let strDate = mDate.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let hour = mDate.getHours();
      if (hour <= 9 && hour >= 0) {
        hour = '0' + hour;
      }

      let minutes = mDate.getMinutes();
      if (minutes <= 9 && minutes >= 0) {
        minutes = '0' + minutes;
      }
      let currentdate = mDate.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + hour + seperator2 + minutes;
      return currentdate;
    }
  },
  /**
   * 获取网站跟路径
   */
  getRootPath: function () {
    // let strFullPath = window.document.location.href;
    // let strPath = window.document.location.pathname;
    // let pos = strFullPath.indexOf(strPath);
    // let prePath = strFullPath.substring(0, pos);
    // let postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    //let postPath="/" + location.pathname.split("/")[1];
    //         return(prePath+postPath);
    //         return (prePath);//这里没有项目名，就直接返回前缀

    // 采用hash模式strPath路径获取出错，重新写的方法
    let strFullPath = window.document.location.href;
    let pathList = strFullPath.split("/");
    let prePath = pathList[0] + "/" + pathList[1] + "/" + pathList[2];
    return prePath;
  },

  /**
   * 获取websocket路径
   */
  getSocketPath: function () {
    let path = this.getRootPath();
    let rePath = path.split(":")[0];
    return path.replace(rePath, "ws");
  },


  parseTreeToRow(node, data = [], row = []) {
    if (!node.children) {
      data.push(row);
    } else {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const cell = {
          value: child.value
        };
        /******************添加的代码******************/
        //深度克隆父亲，因为后代共用了该引用数据
        const extendRow = [...JSON.parse(JSON.stringify(row)), cell];
        if (extendRow.length === 1) { //第一列
          extendRow[0].rowspan = 1;
        } else if (extendRow.length > 1) {
          //将该行的最后一列的rowspan赋给上一列
          //再将自身置为1(避免最后一列无值)
          extendRow[extendRow.length - 2].rowspan = i === 0 ? this.computeLeafCount(node) : 0;
          extendRow[extendRow.length - 1].rowspan = 1;
        }
        /******************添加的代码******************/
        this.parseTreeToRow(child, data, extendRow);
      }
    }
    return data;
  },

  /**
 1. 计算某个节点下叶子节点的数量
 2. @param { Object }    node        节点
 3. @returns { Number }  leafCount   叶子节点的数量
   */
  computeLeafCount(node) {
    if (!node.children) {
      node.rowspan = 1;
      return 1;
    } else {
      let leafCount = 0;
      for (let i = 0; i < node.children.length; i++) {
        leafCount = leafCount + this.computeLeafCount(node.children[i]);
      }
      node.rowspan = leafCount;
      return leafCount;
    }
  }


}

/**
 * 获取文件后缀名
 */
export const getfileName = (name) => {
  let index = name.lastIndexOf(".")
  let str = name.substring(index + 1, name.length)
  return str;
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}
/**
 *加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        })
      result[ele] = encrypted.toString()
    })
  }
  return result
}
