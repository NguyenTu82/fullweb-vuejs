import axios from "axios";
import store from "../store/index";
import commonJs from "./common";

const service = axios.create({
  baseURL: process.env.API,
  timeout: 80000, // request timeout
});

//pc or 移动端判断方法
function isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

//X-PF 1: iOS  2: Android  3:Web
function judgeIosAndroid() {
  if (isMobile()) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      return "Android";
    } else if (isiOS) {
      return "iOS";
    } else {
      return "不明";
    }
  } else {
    return "Web";
  }
}
//X-DU
function creatud() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}
function getUuid() {
  // var DU = commonJs.getUrlKey('DU');
  // if (!DU) {
  //     var localDu = localStorage.getItem('X-DU');
  //     var status = localDu === undefined;
  //     !status && (localDu = creatud());
  //     return localDu;
  // } else {
  //     localStorage.setItem('X-DU', localDu);
  //     return DU;
  // }
  var DU = localStorage.getItem("uuid");
  if (!DU) {
    var localDu = creatud();
    localStorage.setItem("uuid", localDu);
    return localDu;
  }
  return DU;
}
var DU = getUuid();
//X-MD 手机型号
function getModel() {
  let webLog = {};
  let userAgent = navigator.userAgent;
  // 获取微信版本
  let m1 = userAgent.match(/MicroMessenger.*?(?= )/);
  if (m1 && m1.length > 0) {
    webLog.wechat = m1[0];
  }
  // 苹果手机
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    // 获取设备名
    if (userAgent.includes("iPad")) {
      webLog.device = "iPad";
    } else {
      webLog.device = "iPhone";
    }
    // 获取操作系统版本
    m1 = userAgent.match(/iPhone OS .*?(?= )/);
    if (m1 && m1.length > 0) {
      webLog.system = m1[0].replace(/_/g, ".").replace(" OS ", "");
    }
  }
  // 安卓手机
  if (userAgent.includes("Android")) {
    // 获取设备名
    m1 = userAgent.match(/Android.*; ?(.*(?= Build))/);
    if (m1 && m1.length > 1) {
      webLog.device = m1[1];
    }
    // 获取操作系统版本
    m1 = userAgent.match(/Android.*?(?=;)/);
    if (m1 && m1.length > 0) {
      webLog.system = m1[0];
    }
  }
  var data = webLog.system || "";
  return data;
}
//x-ov 手机型号后面的数字
function getModelData() {
  var status = judgeIosAndroid();
  if (status != "Web") {
    var str = getModel();
    var pattern = new RegExp("[0-9]+");
    var num = str.match(pattern);
    return str.substring(num.index);
  }
}

function setBaseUrl(config) {
  //正式环境
  if (process.env.NODE_ENV === "production") {
    config.baseURL = process.env.CommonFrontApi;
  }

  return config;
}

if (process.env.NODE_ENV === "development") {
  store.commit("seDev", true);
} else {
  store.commit("seDev", false);
}
if (process.env.NODE_ENV === "production") {
  store.commit("setVueAppVuejsEnv", process.env.VueJsJSEnv);
}

// 1.添加请求拦截器
service.interceptors.request.use(
  (config) => {
    config = setBaseUrl(config);
    config.headers.common = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Company-Id": process.env.XCompanyId,
      "X-DU": DU,
      "X-SV": "1",
      "X-PF": judgeIosAndroid(),
      "X-UA": navigator.userAgent,
      "X-MD": getModel(),
      "X-OV": getModelData(),
    };
    // 在发送请求之前做些什么（在请求头中加token）
    // let token = sessionStorage.getItem('Authorization')
    // if (!config.headers.hasOwnProperty('Authorization') && token) {
    //     config.headers.Authorization = token;
    // }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//3.添加响应拦截器
service.interceptors.response.use(
  function (response) {
    //维护模式处理
    if (response.data.STATUS === "MAINTENANCE") {
      commonJs.openMaintenaceWithNative(response.data.DATA);
    } else {
      return response;
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
