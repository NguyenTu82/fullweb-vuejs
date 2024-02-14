import axios from "axios";
import commonJs from "./common";
import store from "@/store/index";
import processEnvKey from "@/const/processEnvKey";
import apiInfo from "@/const/apiInfo";
import router from "@/router";

const service = axios.create();

function setBaseUrl(config) {
  if (config.baseURL) {
    return config;
  }

  let orgUrl = config.url;

  if (config.url.lastIndexOf("/") == config.url.length - 1) {
    config.url = config.url.substring(0, config.url.length - 1);
  }
  if (!config.apiType) {
    config.apiType = apiInfo.apiType.COMMON_FRONT;
  }

  let baseUrlKey = apiInfo.apiUrl[config.apiType].baseUrlKey;
  config.baseURL = commonJs.getProcessEnv(baseUrlKey);

  config.url = orgUrl;
  return config;
}

let requestConst = null;

function getRequestConst() {
  if (requestConst) {
    return requestConst;
  }

  const xCompanyId = commonJs.getProcessEnv(processEnvKey.X_COMPANY_ID);
  const DU = commonJs.getUuid();

  requestConst = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Company-Id": xCompanyId,
    "X-DU": DU,
    "X-SV": "1",
    "X-PF": judgeIosAndroid(),
    "X-UA": navigator.userAgent,
    "X-MD": getModel(),
    "X-OV": getModelData(),
  };

  const appTarget = commonJs.getProcessEnv(processEnvKey.APP_TARGET);
  store.commit(
    "common/setRequestConst",
    Object.assign({}, requestConst, { APP_TARGET: appTarget })
  );

  return requestConst;
}

//X-MD
function getModel() {
  let webLog = {};
  let userAgent = navigator.userAgent;
  let m1 = userAgent.match(/MicroMessenger.*?(?= )/);
  if (m1 && m1.length > 0) {
    webLog.wechat = m1[0];
  }
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    if (userAgent.includes("iPad")) {
      webLog.device = "iPad";
    } else {
      webLog.device = "iPhone";
    }
    m1 = userAgent.match(/iPhone OS .*?(?= )/);
    if (m1 && m1.length > 0) {
      webLog.system = m1[0].replace(/_/g, ".").replace(" OS ", "");
    }
  }
  if (userAgent.includes("Android")) {
    m1 = userAgent.match(/Android.*; ?(.*(?= Build))/);
    if (m1 && m1.length > 1) {
      webLog.device = m1[1];
    }
    m1 = userAgent.match(/Android.*?(?=;)/);
    if (m1 && m1.length > 0) {
      webLog.system = m1[0];
    }
  }
  var data = webLog.system || "";
  return data;
}
//X-PF
// 1: iOS  2: Android  3:Web
function judgeIosAndroid() {
  if (isMobile()) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
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
function isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}
//X-OV
function getModelData() {
  var str = getModel();
  var pattern = new RegExp("[0-9]+");
  var num = str.match(pattern);
  return str && str.substring(num.index);
}

window.ConfigArr = [];

function getTokens() {
  let isIos = false;
  isIos = commonJs.judgeIosAndroid();
  if (isIos) {
    localStorage.setItem("getTokenOver", false);
    window.webkit &&
      window.webkit.messageHandlers.access_token.postMessage(
        "get_access_token"
      );
  } else {
    localStorage.setItem("getTokenOver", false);
    if (window.launcher) {
      window.launcher.access_token("get_access_token");
    }
  }
}

function deleteParam(data) {
  for (let item in data) {
    if (data[item] === "") delete data[item];
  }
  return data;
}

const loading = {
  show() {
    document.getElementById("loading").style.display = "block";
  },

  hide() {
    document.getElementById("loading").style.display = "none";
  },
};

service.defaults.timeout = 8000;

service.handRequestError = (error) => {
  systemErrorAlert(error);
};

service.interceptors.requestInterceptor = service.interceptors.request.use(
  (config) => {
    loading.show();
    config = setBaseUrl(config);
    config.headers.common = getRequestConst();

    if (
      apiInfo.apiType.JP_STOCK === config.apiType ||
      apiInfo.apiType.IT_STOCK === config.apiType ||
      apiInfo.apiType.STOCK_FRONT === config.apiType
    ) {
      config.data = deleteParam(config.data);
    }

    return new Promise((resolve) => {
      let accessTokenKey = commonJs.getAccessTokenKey();
      let token = localStorage.getItem(accessTokenKey);
      if (
        !Object.prototype.hasOwnProperty.call(
          config.headers,
          "Authorization"
        ) &&
        token
      ) {
        config.headers.Authorization = token;
        getTokens();
      }
      resolve(config);
    });
  },
  (error) => {
    service.handRequestError(error);
    return Promise.reject(error);
  }
);

function systemErrorAlert(data) {
  if (data && data.ERROR && data.ERROR.CODE === "E100-0010") {
    let text = "一定時間経過したため自動ログアウトしました。";
    store.commit("editMsg", {
      isShow: true,
      text,
      type: "prompt",
      btnName: "ログイン",
      callBackRoute: {
        name: "Login",
      },
    });
  } else {
    let text = "ネットワーク接続エラーが発生しました。";
    store.commit("editMsg", {
      isShow: true,
      text,
      type: "prompt",
      btnName: "リトライ",
      callBackRoute: "ROUTE_RETRY",
    });
  }
}

service.interceptors.responseInterceptor = service.interceptors.response.use(
  function (response) {
    loading.hide();
    if (
      typeof response !== "object" ||
      typeof response.data !== "object" ||
      (typeof response.data.STATUS !== "object" && typeof response.data.STATUS !== "string")
    ) {
      systemErrorAlert();
    }

    // const response_fake = {
    //   "data": {
    //     "STATUS": "MAINTENANCE",
    //     "ERROR": "NG",
    //     "DATA": {
    //       "MAINTENANCE_TYPE": "MAINTENANCE_TYPE test",
    //       "TITLE": "TITLE test",
    //       "MESSAGE": "メンテナンス中のテストメッセージ",
    //       "MAINTENANCE_URL": "https://www.cheer-sec.co.jp/other/app-help/login.html#id",
    //     }
    //   }
    // }
    if (response.data.STATUS === "NG") {
      commonJs.handError(response);
    } else if (!response.data.STATUS) {
      commonJs.handError(response);
    } else if (response.data.STATUS === "MAINTENANCE") {
      store.dispatch("Maintenance", response.data.DATA);
    } else {
      store.commit("maintenance", {});
    }
    return response;
  },
  function (error) {
    loading.hide();
    let status = error.response && error.response.status;
    if (status >= 400 && status < 600) {
      if (status === 401) {
        store.commit("logout");
        router.push("/settings")
        window.location.reload();
      }
      systemErrorAlert(error.response.data);
    } else if (error.code && error.name === "AxiosError") {
      systemErrorAlert(error);
    }

    return Promise.reject(error);
  }
);

export default service;
