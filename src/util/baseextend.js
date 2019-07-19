
//闭包
(function () {

  function isEmpty(obj) {
    if (obj == undefined || obj == null || obj === "") {
      return true;
    }
    if (typeof(obj) == "Array") {
      if (obj.length == 0) return true;
    }
    return false;
  }

  function isFunction(obj) {
    if (typeof(obj) == "function") {
      return true;
    }
    return false;
  }

  function isObject(obj) {
    if (typeof(obj) == "Object") {
      return true;
    }
    return false;
  }


  Array.prototype.contains = function(val, compare)
  {
    for (var i = 0; i < this.length; i++)
    {
      if (!isFunction(compare)) {
        if (this[i] == val) {
          return true;
        }
      } else {
        if (compare(this[i], val)) {
          return true;
        }
      }
    }
    return false;
  };

  // 对象连接
  Array.prototype.oJoin = function(spliter, splitfunc) {
    var joinStr = "";
    for (var i = 0; i < this.length; i++){
      if (isObject(this[i]) && isFunction(splitfunc)) {
        joinStr += splitfunc(this[i]) + spliter;
      } else {
        if (isObject(this[i])) {
          joinStr += "[Object]" + spliter;
        } else {
          joinStr += this[i] + spliter;

        }
      }
    }

    return joinStr != "" ? joinStr.substr(0, joinStr.length - 1) : "";

  };


  Array.prototype.isEmpty = function () {
    return this.length > 0
  };


  Object.prototype.toJson = function () {
    var o;
    if (typeof this === 'object') {

      // 如果  他是空的话
      if (this === null) {
        o = "";
      }
      else {
        o = JSON.stringify(this);
      }
    }
    else {
      o = this;
    }
    return o;
  };

  Object.prototype.clone = function () {
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

    return clone(this);

  };

  Object.prototype.toMap = function () {
    let strMap = new Map();
    for (let k of Reflect.ownKeys(this)) {
      strMap.set(k, Reflect.get(this, k));
    }
    return strMap;
  }


  Object.prototype.propertyValue = function (key) {
    if (this.containsProperty(key)) {
      return this[key];
    }
    return null;
  };

  Object.prototype.containsProperty = function (key) {
    return Reflect.has(this, key);
  };

  Object.prototype.propertyValueType = function (key) {
    var value = this.propertyValue(key);
    if (typeof(value) == "object") {

      // 如果  他是空的话
      if (obj === null) {
        return "null";
      }
      else {
        // 如果  他是数组arr的话
        if (obj instanceof Array) {
          return "array";
        } else {
          return "object";
        }
      }

    }

    return typeof(value);
  };

  Object.prototype.removeKey = function (key) {
    if (Reflect.has(this, key)) {
      Reflect.deleteProperty(this, key);
    }

  };


  // riqi扩展
  // 格式化日期 yyyy-MM-dd
  Date.prototype.formatDate = function () {
    var year,month,day,hour,minute,second;
    var dt = this;
    year = dt.getFullYear();
    month = dt.getMonth().toString().length < 2 ? ("0" + (dt.getMonth() + 1).toString()) : (dt.getMonth() + 1).toString();
    day = dt.getDate().toString().length < 2 ? ("0" + dt.getDate().toString()) : dt.getDate().toString();

    return year + "-" + month + "-" + day;
  };

  // 格式化日期时间 yyyy-MM-dd hh:mm:ss
  Date.prototype.formatDateTime = function () {

    var year,month,day,hour,minute,second;
    var dt = this;
    year = dt.getFullYear();
    month = dt.getMonth().toString().length < 2 ? ("0" + (dt.getMonth() + 1).toString()) : (dt.getMonth() + 1).toString();
    day = dt.getDate().toString().length < 2 ? ("0" + dt.getDate().toString()) : dt.getDate().toString();
    hour = dt.getHours().toString().length < 2 ? ("0" + dt.getHours().toString()) : dt.getHours().toString();
    minute = dt.getMinutes().toString().length < 2 ? ("0" + dt.getMinutes().toString()) : dt.getMinutes().toString();
    second = dt.getSeconds().toString().length < 2 ? ("0" + dt.getSeconds().toString()) : dt.getSeconds().toString();

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

  };

  // 格式化成金额
  // symbol_currency 格式化的金额样式, fixnum 格式化数字小数点后的位数
  Number.prototype.formatCurrency = function (currency_symbol, fixnum, splitnum) {

    var beforesplitnumadd = function(strbeforepoint){
      var strpointbeforeresult = "";
      var j = 1;
      for(var i = strbeforepoint.length - 1 ; i >= 0 ; i--){
        strpointbeforeresult = strbeforepoint[i] + strpointbeforeresult;
        if(j % 3 == 0){
          strpointbeforeresult = "," + strpointbeforeresult;
          j = 1;
        }else{
          j++;
        }

      }
      if(strpointbeforeresult[0] == ",") strpointbeforeresult = strpointbeforeresult.substr(1,strpointbeforeresult.length - 1);
      return strpointbeforeresult;

    };

    var boolsplit = typeof(splitnum) == "undefined" ? false : splitnum;
    var fixlen = typeof(fixnum) == "undefined" ? 0 : fixnum;
    var symbol = "";
    if(typeof(currency_symbol) == "undefined" || currency_symbol.trim() == "" || currency_symbol == null){
      symbol = "";
    }else if(currency_symbol == "cn"){
      symbol = "¥";
    }else if(currency_symbol == "us"){
      symbol = "$";
    }else if(currency_symbol == "eu"){
      symbol = "€";
    }

    var r = (fixlen <= 0 ? this.toString() : this.toFixed(fixlen).toString());

    if (boolsplit) {
      var frontsubstr = r.substr(0, r.lastIndexOf("."));
      var lastsubstr = r.substr(r.lastIndexOf(".") + 1, r.length - r.lastIndexOf("."));
      return symbol + beforesplitnumadd(frontsubstr) + "." + lastsubstr;

    }

    return symbol + r;


  };

  // 转换成百分率  trans 是否进行百分率转换 true, 在数字的基础上乘以100
  // fixnum小数点后的数目
  Number.prototype.formatPercentage = function (trans, fixnum) {
    var fixlen = typeof(fixnum) == "undefined" ? 0 : fixnum;
    if (trans) {
      return (this * 100).toFixed(fixlen);
    } else {
      return this.toFixed(fixlen);
    }

  };

  // 全部替换
  String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1,"gm"),s2);

  }

})();
