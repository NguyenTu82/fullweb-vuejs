import axios from "./httpRequest";
import sha256 from "sha256";
import Moment from "moment";
import commonConst from "@/const/common";
import { Decimal } from "decimal.js";
import store from "@/store/index";
import CryptoJS from "crypto-js";
import processEnvKey from "@/const/processEnvKey";
import SecureLS from "secure-ls";
import codeJson from "@/utils/codeJson.json";

const PROCESSES = [];
const SCROLL_HANDLERS_ON_DOCUMENT = {};
const secureLS = new SecureLS({encodingType: "aes", isCompression: false});

export default {
  /**
   * 401 is auth token error
   * 500 is internal Server Error in API
   * else api response
   *
   * @param error
   * @param btnName
   */
  handError(error, btnName = null, title) {
    if (error.data && !error.config.isSkipErrorhand) {
      if (error.data.ERROR.CODE !== "E74009_0012") {
        let mes = error.data.ERROR.MESSAGE
          ? error.data.ERROR.MESSAGE
          : codeJson[error.data.ERROR.CODE] ||
          "エラーが発生しました。<br/>時間をおいて再度お試しください。";
        store.commit("showPopup", {
          isShow: true,
          text: mes,
          btnName: btnName || "OK",
          title: title,
        });
      }
    }
  },
  sleep(time) {
    return new Promise(function(resolve){
    setTimeout(resolve, time);
    });
  },
  // storeから環境変数を取得する
  getProcessEnv(key) {
    let processEnv = store.getters["common/processEnv"];
    if (processEnv && Object.keys(processEnv).includes(key)) {
      return processEnv[key];
    }

    return "";
  },

  isMobile() {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
  },
  
  getBranchDivision() {
    let branchDivision = store.getters["common/branchDivision"];

    return branchDivision;
  },
  getAccessTokenKey() {
    let branchDivision = this.getBranchDivision();
    let accessTokenKey = commonConst.ACCESS_TOKEN_PREFIX + branchDivision;

    return accessTokenKey;
  },
  getChannel() {
    switch (this.getProcessEnv(processEnvKey.BRANCH_DIVISION)) {
      case "CHEER":
        return "2";
      case "NCB":
        return "3";
      default:
        return "";
    }
  },
  //add global methods or properties
  //save locally
  saveLocally: function (pathname, data) {
    try {
      var obj = window.localStorage.nyuukinn;
    } catch (e) {
      alert("ローカルストレージを有効にしてください。");
    }
    if (typeof obj === "undefined") {
      obj = {};
    } else {
      obj = JSON.parse(obj);
    }

    let strArr = pathname.split(".");
    let curObj = obj;
    for (let i = 0; i < strArr.length; ++i) {
      if (i + 1 == strArr.length) {
        curObj[strArr[i]] = data;
      } else {
        if (typeof curObj[strArr[i]] === "undefined") {
          curObj[strArr[i]] = {};
        }
        curObj = curObj[strArr[i]];
      }
    }

    window.localStorage.nyuukinn = JSON.stringify(obj);
  },

  //read locally
  readLocally: function (pathname) {
    try {
      var obj = window.localStorage.nyuukinn;
    } catch (e) {
      alert("ローカルストレージを有効にしてください。");
    }
    if (typeof obj === "undefined") {
      return;
    } else {
      obj = JSON.parse(window.localStorage.nyuukinn);
    }

    var strArr = pathname.split(".");
    var curObj = obj;
    for (var i = 0; i < strArr.length; ++i) {
      if (i + 1 == strArr.length) {
        return curObj[strArr[i]];
      } else {
        if (typeof curObj[strArr[i]] === "undefined") {
          return;
        }
        curObj = curObj[strArr[i]];
      }
    }
  },

  //remove locally
  removeLocally: function (pathname) {
    try {
      var obj = window.localStorage.nyuukinn;
    } catch (e) {
      alert("ローカルストレージを有効にしてください。");
    }
    if (typeof obj === "undefined") {
      return "not found";
    } else {
      obj = JSON.parse(window.localStorage.nyuukinn);
    }

    var strArr = pathname.split(".");
    var curObj = obj;
    for (var i = 0; i < strArr.length; ++i) {
      if (i + 1 == strArr.length) {
        delete curObj[strArr[i]];
        window.localStorage.nyuukinn = JSON.stringify(obj);
        return "remove success";
      } else {
        if (typeof curObj[strArr[i]] === "undefined") {
          return "not found";
        }
        curObj = curObj[strArr[i]];
      }
    }
  },
  saveLocalData: function (name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  },
  getLocalData: function (name) {
    var data =
      localStorage.getItem(name) != "undefined"
        ? JSON.parse(localStorage.getItem(name))
        : null;
    if (data == null) {
      return false;
    } else {
      return data;
    }
  },

  removeAllLocalData: function () {
    localStorage.clear();
  },

  removeLocalData: function (name) {
    localStorage.removeItem(name);
  },

  getDataBySecureLS: function (name) {
    try {
      return secureLS.get(name);
    } catch (e) {
      return null;
    }
  },

  saveDataBySecureLS: function (name, data) {
    secureLS.set(name, data);
  },

  // Removes all the keys that were created by the secure-ls library, even the meta key.
  removeAllDataBySecureLS: function () {
    secureLS.removeAll();
  },

  // Removes all the keys ever created for that particular domain. 
  // Remember localStorage works differently for http and https protocol;
  clearDataBySecureLS: function () {
    secureLS.clear();
  },

  removeDataBySecureLS: function (name) {
    secureLS.remove(name);
  },

  getSecureLSInstance: function() {
    return secureLS;
  },

  getUrlKey: function (name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || ["", ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  },
  // 端末の判定
  judgeIosAndroid() {
    var u = navigator.userAgent;
    var status;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android或はucブラウザ
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios

    if (isAndroid) {
      status = false;
    } else if (isiOS) {
      status = true;
    }
    return status;
  },
  /*@params: cash - String
   *@description: transform cash sum into the given format
   */
  cashFormatter: function (cash) {
    cash = cash + "";
    cash = cash.replace(/[^0-9]/g, "");
    if (cash == "") {
      return "";
    }
    cash = cash.replace(/^(0+)/, "");
    let length = cash.length;
    let tVal = "",
      sIndex = -1;
    while (sIndex + length >= 0) {
      tVal = cash.substr(sIndex, 1) + tVal;
      if (-sIndex % 3 == 0) {
        tVal = "," + tVal;
      }
      sIndex -= 1;
    }
    if (tVal[0] == ",") {
      tVal = tVal.substring(1);
    }

    return tVal;
  },
  // パスワードの暗号化
  hashPwd(pwd) {
    if (pwd) {
      return sha256(pwd);
    } else {
      return "";
    }
  },
  setBackgroundColorOnDocument(color) {
    document.scrollingElement.style.backgroundColor = color;
  },
  // 画面のスクロール機能を無効にする
  disableScrollOnDocument(cb) {
    document.scrollingElement.style.overflow = "hidden";
    cb && cb();
  },
  // 画面のスクロール機能を有効にする
  enableScrollOnDocument(cb) {
    document.scrollingElement.style.overflow = "scroll";
    cb && cb();
  },
  // 画面のスクロールイベントにハンドラー処理を追加する
  addScrollHandlerOnDocument(name, handler) {
    SCROLL_HANDLERS_ON_DOCUMENT[name] = handler;
  },
  // 画面のスクロールイベントのハンドラー処理を削除する
  removeScrollHandlerOnDocument(name) {
    SCROLL_HANDLERS_ON_DOCUMENT[name] = () => {};
  },
  // 画面のスクロールイベントのハンドラー処理を登録する
  registerScrollHandleOnDocument() {
    if (document.onscroll) {
      return;
    }
    document.addEventListener(
      "scroll",
      (function () {
        var touchBottom = false;
        return function () {
          let target = this.scrollingElement;
          let scrollHeight = target.scrollHeight;
          let scrollTop = target.scrollTop;
          let delta = Math.abs(scrollTop - scrollHeight + window.innerHeight);
          if (delta < 1) {
            if (!touchBottom) {
              touchBottom = true;
              for (let func in SCROLL_HANDLERS_ON_DOCUMENT) {
                SCROLL_HANDLERS_ON_DOCUMENT[func]();
              }
            }
          } else {
            touchBottom = false;
          }
        };
      })()
    );
  },
  /**
   * @description: set custom styles to cover the given style
   * @usage: <div v-set-style="styleObj"></div>
   * @notes: styleObj can have the children elements' styles like below
   *  */
  setStyle(el, binding) {
    if (el && binding.value) {
      let lStyle = binding.value;
      deepSetting(el, lStyle);
    }

    function deepSetting(el, sty) {
      for (let p in sty) {
        if (p === "children") {
          let children = sty.children;
          for (let pro in children) {
            deepSetting(el.children[pro], children[pro]);
          }
        } else {
          el.style[p] = sty[p];
        }
      }
    }
  },
  /***
   * 日時の文字列をオブジェクト（日付、時刻)に変換する
   *
   * @param dateStr 日時の文字列
   * @param isFull 二十四時間制
   * @returns {{date: string, time: string}} date:日付 time:時刻
   */
  handleDate(dateStr, isFull) {
    if (dateStr) {
      dateStr = dateStr.split(".")[0];
      dateStr = dateStr.replace(/[-]/g, "/");
      var date = Moment(new Date(dateStr).getTime());
      return {
        date: date.format("YYYY/MM/DD"),
        time: isFull ? date.format("HH:mm") : date.format("HH:mm"),
      };
    }
  },

  /**
   * 日付の変換
   * @param {string} dateStr
   * @returns {String}
   */
  handleDateLang(dateStr) {
    if (dateStr) {
      var date = Moment(new Date(dateStr).getTime());
      return date.format("YYYY年MM月DD日");
    }
  },
  handleCheckUnlimitedDay(dateStr) {
    if (dateStr) {
      var date = Moment(new Date(dateStr).getTime());
      var year = date.format("YYYY");
      if (year === "9999") {
        return "無期限";
      } else {
        return date.format("YYYY年MM月DD日");
      }
    }
  },
  handleCheckIsToDate(dateStr) {
    if (dateStr) {
      var date = Moment(new Date(dateStr).getTime());
      var checkToday = Moment().isSame(date, "day");
      if (checkToday) {
        return "注文日当日";
      } else {
        return "申込みの" + date.format("YYYY年MM月DD日") + "営業日後";
      }
    }
  },
  /**
   * 当年の日付の年を非表示する
   * @param dateStr
   * @returns {string|*}
   */
  handleDateHideYear(dateStr) {
    if (dateStr) {
      dateStr = dateStr.replace(/[-]/g, "/");
      var date = Moment(new Date(dateStr).getTime());
      var y = date.year();
      var date2 = Moment(new Date().getTime()).year();
      if (date2 == y) {
        return date.format("MM/DD HH:mm");
      } else {
        if (dateStr) {
          return date.format("YY/MM/DD HH:mm");
        }
      }
    }
  },
  handleDateYear(dateStr) {
    if (dateStr) {
      dateStr = dateStr.replace(/[-]/g, "/");
      var date = Moment(new Date(dateStr).getTime());
      return date.format("YY/MM/DD HH:mm:ss");
    }
  },
  handleDateStr(dateStr) {
    if (dateStr) {
      dateStr = dateStr.replace(/[-]/g, "/");
    }
    return dateStr;
  },
  handleDateNoYear(dateStr) {
    if (dateStr) {
      dateStr = dateStr.replace(/\-/g, "/");
      var date = Moment(new Date(dateStr).getTime());
      var y = date.year();
      var date2 = Moment(new Date().getTime()).year();
      if (date2 == y) {
        return date.format("MM/DD");
      } else {
        if (dateStr) {
          return date.format("MM/DD");
        }
      }
    }
  },
  handleDateMinute(dateStr) {
    if (dateStr) {
      dateStr = dateStr.replace(/[-]/g, "/");
      let date = Moment(new Date(dateStr).getTime());
      return date.format("YYYY/MM/DD HH:mm");
    }
    return dateStr;
  },
  handleDateSecond(dateStr) {
    if (dateStr) {
      dateStr = dateStr.replace(/[-]/g, "/");
      let date = Moment(new Date(dateStr).getTime());
      return date.format("YYYY/MM/DD HH:mm:ss");
    }
    return dateStr;
  },

  registerProcess(func) {
    if (typeof func === "function") {
      PROCESSES.push(func);
    }
  },
  runAllProcesses() {
    while (PROCESSES.length > 0) {
      PROCESSES[0]();
      PROCESSES.shift();
    }
  },
  jumpEKYC(params, callback) {
    axios
      .post("user/ekyc_url", params)
      .then((resp) => {
        if (resp && resp.data && !resp.data.ERROR) {
          callback && callback(null, resp.data.DATA.URL);
        } else {
          callback && callback(resp.data.ERROR.MESSAGE);
        }
      })
      .catch((error) => {
        callback && callback(error);
      });
  },
  /**
   * 数字をフォーマットする（⇒ #.00）
   * @param number フォーマットする数字
   * @returns {string}
   */
  handNumber(number) {
    try {
      let floatNum = new Decimal(number);
      if (floatNum.greaterThanOrEqualTo(0)) {
        let newNumber = Number(floatNum.toString().match(/^\d+(?:\.\d{0,2})?/));
        return this.number_format2(newNumber, 2);
      } else {
        let newNumber = Number(
          floatNum
            .absoluteValue()
            .toString()
            .match(/^\d+(?:\.\d{0,2})?/)
        );
        return "-" + this.number_format2(newNumber, 2);
      }
    } catch (e) {
      return number;
    }
  },

  handNumberMoneyTransfer(number) {
    var thousand = 10000;
    var myNumber = 100000000;
    try {
      if (number < thousand) {
        return number + "円";
      } else if (number >= thousand && number < myNumber) {
        let checkNum = number / thousand;
        if (Number.isInteger(checkNum)) {
          return checkNum + "万円";
        } else {
          let numberFormat = Math.floor(checkNum * 1000) / 1000;
          return numberFormat + "万円";
        }
      } else if (number >= myNumber) {
        let checkNum = number / myNumber;
        if (Number.isInteger(checkNum)) {
          return checkNum + "億円";
        } else {
          let numberFormat = Math.floor(checkNum * 1000) / 1000;
          return numberFormat + "億円";
        }
      }
    } catch (e) {
      return number;
    }
  },
  /**
   * 数字をフォーマットする（小数をなしにする）
   * @param number 格式化数字
   * @returns {string}
   */
  handNumberInt(number) {
    try {
      let floatNum = new Decimal(number);
      if (floatNum.greaterThanOrEqualTo(0)) {
        let newNumber = Number(floatNum.toString().match(/^\d+(?:\.\d{0,0})?/));
        let s = this.number_format2(newNumber, 0);
        return s.split(".")[0];
      } else {
        let newNumber = Number(
          floatNum
            .absoluteValue()
            .toString()
            .match(/^\d+(?:\.\d{0,0})?/)
        );
        let s = this.number_format2(newNumber, 0);
        let val = s.split(".")[0];
        if (val == 0) {
          return val;
        }
        return "-" + val;
      }
    } catch (e) {
      return number;
    }
  },
  handNumberIntCustom(number) {
    try {
      let floatNum = new Decimal(number);
      if (floatNum.greaterThanOrEqualTo(0)) {
        let newNumber = Number(floatNum.toString().match(/^\d+(?:\.\d{0,0})?/));
        let s = this.number_format2(newNumber, 0);
        return s.split(".")[0];
      } else {
        let newNumber = Number(
          floatNum
            .absoluteValue()
            .toString()
            .match(/^\d+(?:\.\d{0,0})?/)
        );
        let s = this.number_format2(newNumber, 0);
        let val = s.split(".")[0];
        if (val == 0) {
          return val;
        }
        return val;
      }
    } catch (e) {
      return number;
    }
  },
  /**
   * 处理数字的百分比
   * @param number
   * @returns {string}
   */
  handNotNumberFormat(number) {
    try {
      var nuber = new Decimal(number).times(100).toString();
      var xsd = nuber.split(".");
      if (xsd.length == 1) {
        nuber = nuber + ".00";
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          nuber = nuber + "0";
        }
      }
      let index = nuber.indexOf(".");
      return nuber.slice(0, index + 3);
    } catch (e) {
      return number;
    }
  },

  /*  舍弃后面的
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number_format2(num) {
    var v = num + "",
      arr = v.split(".");
    if (num == 0) {
      return "0.00";
    } else if (
      (typeof num === "number" || typeof num === "string") &&
      !isNaN(num - parseFloat(num))
    ) {
      return (
        arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") +
        "." +
        ((arr.length === 1 && "00") ||
          (arr.length === 2 &&
            new Decimal("0." + arr[1]).toFixed(2).toString().split(".")[1]))
      );
    } else {
      return num;
    }
  },

  /***
   * 处理数字保留几位小数
   * @param number 需要处理的数字
   * @param decimals 保留几位小数 默认8位
   * @returns {*}
   */
  handNumberFloat(number, decimals) {
    try {
      let floatNum = new Decimal(number);
      if (decimals) {
        return floatNum.toFixed(decimals, Decimal.ROUND_DOWN);
      } else {
        return Number(floatNum.toString().match(/^-?\d+(?:\.\d{0,8})?/));
      }
    } catch (e) {
      return number;
    }
  },

  /**
   * 处理数字保留小数中间加逗号
   * @param {Number} number       目标数值
   * @param {Number} decimals     保留小数后多少位
   * @param {Boolean} floatCeil   是否向上取整
   */
  handNumFloat(number, decimals = 8, floatCeil = false) {
    try {
      let floatNum = new Decimal(number);
      floatNum = floatNum.toString();
      let leftN = 0,
        rightN = 0;
      if (floatNum.includes(".")) {
        leftN = Number(floatNum.split(".")[0]);
        const floatN = floatNum.split(".")[1];
        if (floatCeil) {
          rightN =
            floatN.length > decimals
              ? Number(floatN.slice(0, decimals)) + 1
              : floatN;
        } else {
          rightN =
            floatN.length > decimals
              ? floatN.slice(decimals, decimals + 1) > 5
                ? Number(floatN.slice(0, decimals)) + 1
                : floatN.slice(0, decimals)
              : floatN;
        }
      } else {
        leftN = floatNum;
        rightN = null;
      }
      leftN = new Decimal(leftN);
      if (leftN.greaterThanOrEqualTo(0)) {
        let newNumber = Number(leftN.toString().match(/^\d+(?:\.\d{0,0})?/));
        let s = this.number_format2(newNumber, 0);
        return s.split(".")[0] + (rightN ? `.${rightN}` : "");
      } else {
        let newNumber = Number(
          leftN
            .absoluteValue()
            .toString()
            .match(/^\d+(?:\.\d{0,0})?/)
        );
        let s = this.number_format2(newNumber, 0);
        let val = s.split(".")[0];
        if (val == 0) {
          return val;
        }
        return "-" + val;
      }
    } catch (e) {
      return number;
    }
  },

  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + "").replace(/[^0-9+-Ee.]/g, "");
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
      sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
      dec = typeof dec_point === "undefined" ? "." : dec_point,
      s = "",
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return "" + Math.ceil(n * k) / k;
      };
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  },
  openEkycWithNative(url) {
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit && window.webkit.messageHandlers.open_ekyc.postMessage(url);
    } else {
      window.launcher && window.launcher.open_ekyc(url);
    }
  },
  openHelpUrlWithNative(url) {
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit && window.webkit.messageHandlers.open_url.postMessage(url);
    } else {
      window.launcher && window.launcher.open_url(url);
    }
  },
  goBackToNative() {
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit && window.webkit.messageHandlers.go_back.postMessage({});
    } else {
      window.launcher && window.launcher.go_back();
    }
  },
  goBackToNativeOrder() {
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit &&
        window.webkit.messageHandlers.go_back_order.postMessage({});
    } else {
      window.launcher && window.launcher.go_back_order();
    }
  },
  goCustomService() {
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit &&
        window.webkit.messageHandlers.open_question.postMessage({});
    } else {
      window.launcher && window.launcher.open_question();
    }
  },
  // 注册resize事件处理遮挡了input
  creatResize() {
    if (!this.judgeIosAndroid()) {
      window.addEventListener("resize", function () {
        if (document.activeElement.tagName === "INPUT") {
          document.activeElement.scrollIntoViewIfNeeded(false);
        }
      });
    }
  },
  VerifyTel(value) {
    const regTel = /^0\d{10}$/;
    return regTel.test(value);
  },
  VerifyEmail(value) {
    const regEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(value);
  },
  dateFormatter(dat, srcSep, tarSep) {
    return dat.split(srcSep).join(tarSep);
  },
  //全角转半角数字
  zenkaku2Hankaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９ー]/g, function (s) {
      if (s == "ー") {
        return "-";
      }
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  },
  ComputeAge(strBirthday) {
    // 格式为"1990-01-01"
    var returnAge,
      strBirthdayArr = strBirthday.split("-"),
      birthYear = strBirthdayArr[0],
      birthMonth = strBirthdayArr[1],
      birthDay = strBirthdayArr[2],
      d = new Date(),
      nowYear = d.getFullYear(),
      nowMonth = d.getMonth() + 1,
      nowDay = d.getDate();

    if (nowYear == birthYear) {
      return 0; //同年 则为0周岁
    }
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff < 0) {
      return -1; //返回-1 表示出生日期输入错误 晚于今天
    }
    if (nowMonth == birthMonth) {
      var dayDiff = nowDay - birthDay; //日之差
      returnAge = dayDiff < 0 ? ageDiff - 1 : ageDiff;
    } else {
      var monthDiff = nowMonth - birthMonth; //月之差
      returnAge = monthDiff < 0 ? ageDiff - 1 : ageDiff;
    }
    return returnAge; //返回周岁年龄
  },
  // 判断此银行名字 是否 属于特殊银行
  SearchSpecialBank(backname) {
    return commonConst.specialBank.filter((item) => {
      if (backname.indexOf(item) != -1) {
        return true;
      }
    });
  },
  verifyWithBiometrics(cb) {
    // cb(1);
    window.biometrics_cb = cb;
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit &&
        window.webkit.messageHandlers.request_biometrics_auth.postMessage(
          "biometrics_cb"
        );
    } else {
      window.launcher &&
        window.launcher.request_biometrics_auth("biometrics_cb");
    }
  },
  requestConst: {},
  //convert characters from half-width to full-width
  hankaku2Zenkaku(str) {
    return str.replace(
      /[A-Za-z0-9\uff0d\u2796\u30fc\u002d\uff70\u2014\u2013\u2212]/g,
      function (s) {
        if (s.match(/[\uff0d\u2796\u30fc\u002d\uff70\u2014\u2013\u2212]/)) {
          return "\u30fc";
        }
        return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
      }
    );
  },
  //remove emoji and space
  removeEmojiNSpace(value) {
    const ranges = [
      "[\u2700-\u27BF]",
      "[\uE000-\uF8FF]",
      "\uD83C[\uDC00-\uDFFF]",
      "\uD83D[\uDC00-\uDFFF]",
      "[\u2011-\u26FF]",
      "\uD83E[\uDD10-\uDDFF]",
      //'\u0020',// eslint-disable-next-line
      //'\u3000'// eslint-disable-next-line
    ];
    let reg = new RegExp(ranges.join("|"), "g");
    return value.replace(reg, "");
  },
  openMaintenaceWithNative(param) {
    let obj = {
      maintenance_url: param.MAINTENANCE_URL || "",
      message: param.MESSAGE || "",
    };
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit &&
        window.webkit.messageHandlers.maintenance.postMessage(obj);
    } else {
      window.launcher && window.launcher.maintenance(JSON.stringify(obj));
    }
  },
  //去掉首尾的空格(全角和半角)，将中间的半角空格转成全角
  trimAndTransSpace(value) {
    return value.trim().replace(/\u0020/g, "\u3000");
  },
  //判断长度为1的字符串是标准全角字符则返回1，是标准半角字符则返回0，其他情况返回-1
  isFullwidthChar(char) {
    try {
      let unicodeLen = char.charCodeAt(0).toString(16).length;
      if (unicodeLen == 4) {
        //标准全角
        return 1;
      }

      if (unicodeLen == 2) {
        //标准半角
        return 0;
      }
    } catch (e) {
      console.error(e);
      return -1;
    }
    return -1;
  },
  /***
   * 去掉末尾的零
   * @param number 需要处理的数字字符串
   * @returns {*}
   */
  trimZero(number) {
    number += "";
    if (number.includes(".")) {
      while (number.match(/0$/)) {
        number = number.replace(/0$/, "");
      }
      if (number.match(/\.$/)) {
        number = number.replace(/\.$/, "");
      }
    }
    return number;
  },
  //判断字符串全部由全角字符组成则返回true，否则返回false
  isAllFullwidthStr(str) {
    try {
      for (let i in str) {
        if (this.isFullwidthChar(str[i]) == 0) {
          //存在半角字符
          return false;
        }
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  //由于在iOS上用日语输入法输入数字时，点击其他输入框，
  //会把当前正在输入的值自动复制到其他输入框中，因此作如下改动，即异步处理blur事件
  asyncProcess(cb) {
    setTimeout(() => {
      cb && cb();
    }, 100);
  },
  disablePaste(el, binding) {
    if (el && binding.value) {
      el.setAttribute("onpaste", "return false;");
    }
  },
  setMinHeight(el, binding) {
    if (el) {
      el.style.height = window.innerHeight - (binding.value || 0) + "px";
    }
  },
  //按需获取照会里注文一览、约定一览过滤弹框下拉选项
  getSelectDataUS(kind) {
    let needs = [];
    switch (kind) {
      case "jp":
        needs = ["trade", "method", "status"];
        break;
      case "us":
        needs = ["trade", "market", "status"];
        break;
      case "it":
        needs = ["trade", "status", "profit", "found"];
        break;
      default:
        needs = [];
        break;
    }
    let data = [
      {
        title: "売買",
        abbr: "trade",
        items: [
          { id: 1, name: "買", ischeck: false },
          { id: 2, name: "売", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
      {
        title: "上場市場",
        abbr: "market",
        items: [
          { id: 1, name: "NYSE", ischeck: false },
          { id: 2, name: "NASDAQ", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
      {
        title: "取引方式",
        abbr: "method",
        items: [
          { id: 1, name: "店頭", ischeck: false },
          { id: 2, name: "委託", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
      {
        title: "分配金受取種類",
        abbr: "profit",
        items: [
          { id: 1, name: "分配金受取型", ischeck: false },
          { id: 2, name: "再投資型", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
      {
        title: "ファンドタイプ",
        abbr: "found",
        items: [
          { id: 1, name: "通貨選択型", ischeck: false },
          { id: 2, name: "レバレッジ型", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
    ];

    try {
      if (needs.length > 0) {
        return data.filter((item) => {
          return needs.includes(item.abbr);
        });
      }
    } catch (e) {
      return data;
    }

    return data;
  },

  getSelectDataJp() {
    let data = [
      {
        title: "売買",
        abbr: "trade",
        items: [
          { id: 3, name: "買", ischeck: false },
          { id: 1, name: "売", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
      {
        title: "状況",
        abbr: "status",
        items: [
          { id: "", name: "すべて", ischeck: true },
          { id: 1, name: "受付済", ischeck: false },
          { id: 2, name: "執行中", ischeck: false },
          { id: 3, name: "執行済", ischeck: false },
          { id: 4, name: "訂正中", ischeck: false },
          { id: 5, name: "訂正済", ischeck: false },
          { id: 6, name: "取消中", ischeck: false },
          { id: 7, name: "取消済", ischeck: false },
          { id: 8, name: "約定済", ischeck: false },
          { id: 9, name: "失効", ischeck: false },
        ],
        isStretch: false,
      },
      {
        title: "取引方式",
        abbr: "method",
        items: [
          { id: 1, name: "店頭", ischeck: false },
          { id: 2, name: "委託", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
    ];

    return data;
  },

  // 注文一览-投资信托
  getSelectDataIt() {
    let data = [
      {
        title: "売買",
        abbr: "trade",
        items: [
          { id: 3, name: "購入", ischeck: false },
          { id: 1, name: "解約", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
      {
        title: "状況",
        abbr: "status",
        items: [
          { id: "", name: "すべて", ischeck: true },
          { id: 1, name: "受付済", ischeck: false },
          { id: 2, name: "執行中", ischeck: false },
          { id: 7, name: "取消済み", ischeck: false },
          { id: 8, name: "約定", ischeck: false },
          { id: 9, name: "失効", ischeck: false },
        ],
        isStretch: false,
      },
      {
        title: "分配金受取種類",
        abbr: "profit",
        items: [
          { id: 1, name: "分配金受取型", ischeck: false },
          { id: 2, name: "再投資型", ischeck: false },
          { id: "", name: "すべて", ischeck: true },
        ],
        isStretch: false,
      },
      {
        title: "ファンドタイプ",
        abbr: "found",
        items: [
          { id: "", name: "すべて", ischeck: true },
          { id: 1, name: "通貨選択型", ischeck: false },
          { id: 2, name: "レバレッジ型", ischeck: false },
          { id: 3, name: "インデックス型", ischeck: false },
          { id: 4, name: "アクティブ型", ischeck: false },
          { id: 5, name: "バランス型", ischeck: false },
          { id: 6, name: "国内株式型", ischeck: false },
          { id: 7, name: "海外株式型", ischeck: false },
          { id: 8, name: "国内REIT型", ischeck: false },
          { id: 9, name: "海外REIT型", ischeck: false },
          { id: 10, name: "コモディティ型", ischeck: false },
          { id: 11, name: "ヘッジファンド型", ischeck: false },
        ],
        isStretch: false,
      },
    ];
    return data;
  },

  //  入出金设置最开始时间
  setStartDate(date) {
    return Moment(new Date(date).getTime())
      .subtract(1, "months")
      .format("YYYY-MM-DD");
  },

  // 当前时间
  getNowDateTime(format = "YYYY/MM/DD HH:mm:ss") {
    return Moment(new Date().getTime()).format(format);
  },

  /**
   * @methodName 与原生交互的方法名
   * @postParam 提交至原生的参数
   * 调用方式 this.commonJs.postMessageToNative('go_brand_detail','123')
   */
  postMessageToNative(methodName, postParam) {
    var isIos = this.judgeIosAndroid();
    if (isIos) {
      console.log(postParam);
      window.webkit.messageHandlers[methodName].postMessage(postParam);
    } else {
      console.log(postParam);
      if (window.launcher) {
        if (typeof postParam == "object") {
          postParam = JSON.stringify(postParam);
        }
        window.launcher[methodName](postParam);
      }
    }
  },
  //去除ORDER_NO重复的项
  filterByOrderNo(arr) {
    let orderNoList = [];
    for (let i = 0, item = null; i < arr.length; ++i) {
      item = arr[i];
      for (let j = 0, elem = null; j < item.DATA.length; ) {
        elem = item.DATA[j];
        if (orderNoList.includes(elem.ORDER_NO)) {
          item.DATA.splice(j, 1);
        } else {
          orderNoList.push(elem.ORDER_NO);
          ++j;
        }
      }
    }
    return arr;
  },

  // Encrypt
  aesEncrypt(txt) {
    const key = "test";
    const iv = "test";

    const cipher = CryptoJS.AES.encrypt(txt, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
    });

    return cipher.toString();
  },

  // Decrypt
  aesDecrypt(txt) {
    const key = "test";
    const iv = "test";

    const cipher = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
    });

    return CryptoJS.enc.Utf8.stringify(cipher).toString();
  },
  getMessageFromCode(code) {
    return codeJson[code] || "";
  },
  handleDateTime(dateStr, isFull) {
    if (dateStr) {
      dateStr = dateStr.split(".")[0];
      dateStr = dateStr.replace(/\-/g, "/");
      var date = Moment(new Date(dateStr).getTime());
      return {
        date: date.format("YYYY/MM/DD"),
        time: isFull ? date.format("HH:mm") : date.format("HH:mm"),
      };
    }
  },
  scrollBottom() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      return true;
    }
  },

  handleDateMonth(dateStr) {
    let yearNow = new Date().getFullYear();
    if (dateStr) {
      let fulldate = dateStr + "/" + yearNow.toString();
      var date = Moment(new Date(fulldate).getTime());
      return date.format("M月DD日");
    }
  },
  getReloadTime() {
    const date = new Date();
    return this.handleDateMinute(date.toString());
  },
  creatud() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  },
  getUuid() {
    let DU = localStorage.getItem("uuid");
    if (!DU) {
      let localDu = this.creatud();
      localStorage.setItem("uuid", localDu);
      return localDu;
    }
    return DU;
  },
  validateIdQueryParam(id) {
    let isNumber = new RegExp("^[0-9]*$");
    return isNumber.test(id);
  },
  formatStockCd(number) {
    const stockCd = number.toString();
    return stockCd.charAt(stockCd.length - 1) == 0 ? number / 10 : number;
  },
  paginate(arr = [], pageSize, pageNumber) {
    const start = pageSize * (pageNumber - 1);
    const end = pageSize * pageNumber;
    return {
      *[Symbol.iterator]() {
        for (let i = start; i < arr.length && i < end; i++) {
          yield arr[i];
        }
      },
    };
  },
  getNow() {
    const today = new Date();
    const date =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    return date + " " + time;
  },
  moveUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
  checkFlagOrder(data) {
    if (data) {
      let content = `● 取引規制 <br><br>`;
      if (data.comm_buy_stop_flg != 0)
        content = content.concat(`${data.comm_buy_stop_flg_nm} <br>`);
      if (data.comm_sell_stop_flg != 0)
        content = content.concat(`${data.comm_sell_stop_flg_nm} <br>`);
      if (data.otc_buy_stop_flg != 0)
        content = content.concat(`${data.otc_buy_stop_flg_nm} <br>`);
      if (data.otc_sell_stop_flg != 0)
        content = content.concat(`${data.otc_sell_stop_flg_nm} <br>`);      
      if (data.price_stabilization_cls != 0)
        content = content.concat(`${data.price_stabilization_cls_nm} <br>`);
      if (data.tender_offer_cls != 0)
        content = content.concat(`${data.tender_offer_cls_nm} <br>`);
      if (data.same_day_deposit_cls != 0)
        content = content.concat(`${data.same_day_deposit_cls_nm} <br>`);
      if (data.fgn_restriction_flg != 0)
        content = content.concat(`${data.fgn_restriction_flg_nm} <br>`);
      if (content != `● 取引規制 <br><br>`) return content;
    }
  },
  checkFlagBuyItaku(data) {
    if (data) {
      let content = `● 取引規制 <br><br>`;
      if (data.comm_buy_stop_flg != 0)
        content = content.concat(`${data.comm_buy_stop_flg_nm} <br>`);
      if (data.price_stabilization_cls != 0)
        content = content.concat(`${data.price_stabilization_cls_nm} <br>`);
      if (data.tender_offer_cls != 0)
        content = content.concat(`${data.tender_offer_cls_nm} <br>`);
      if (data.same_day_deposit_cls != 0)
        content = content.concat(`${data.same_day_deposit_cls_nm} <br>`);
      if (data.fgn_restriction_flg != 0)
        content = content.concat(`${data.fgn_restriction_flg_nm} <br>`);
      if (content != `● 取引規制 <br><br>`) return content;
    }
  },
  checkFlagBuyTentou(data) {
    if (data) {
      let content = `● 取引規制 <br><br>`;
      if (data.otc_buy_stop_flg != 0)
        content = content.concat(`${data.otc_buy_stop_flg_nm} <br>`);
      if (data.price_stabilization_cls != 0)
        content = content.concat(`${data.price_stabilization_cls_nm} <br>`);
      if (data.tender_offer_cls != 0)
        content = content.concat(`${data.tender_offer_cls_nm} <br>`);
      if (data.same_day_deposit_cls != 0)
        content = content.concat(`${data.same_day_deposit_cls_nm} <br>`);
      if (data.fgn_restriction_flg != 0)
        content = content.concat(`${data.fgn_restriction_flg_nm} <br>`);
      if (content != `● 取引規制 <br><br>`) return content;
    }
  },
  checkFlagSellItaku(data) {
    if (data) {
      let content = `● 取引規制 <br><br>`;
      if (data.comm_sell_stop_flg != 0)
        content = content.concat(`${data.comm_sell_stop_flg_nm} <br>`);
      if (data.price_stabilization_cls != 0)
        content = content.concat(`${data.price_stabilization_cls_nm} <br>`);
      if (data.tender_offer_cls != 0)
        content = content.concat(`${data.tender_offer_cls_nm} <br>`);
      if (data.same_day_deposit_cls != 0)
        content = content.concat(`${data.same_day_deposit_cls_nm} <br>`);
      if (data.fgn_restriction_flg != 0)
        content = content.concat(`${data.fgn_restriction_flg_nm} <br>`);
      if (content != `● 取引規制 <br><br>`) return content;
    }
  },
  checkFlagSellTentou(data) {
    if (data) {
      let content = `● 取引規制 <br><br>`;
      if (data.otc_sell_stop_flg != 0)
        content = content.concat(`${data.otc_sell_stop_flg_nm} <br>`);
      if (data.price_stabilization_cls != 0)
        content = content.concat(`${data.price_stabilization_cls_nm} <br>`);
      if (data.tender_offer_cls != 0)
        content = content.concat(`${data.tender_offer_cls_nm} <br>`);
      if (data.same_day_deposit_cls != 0)
        content = content.concat(`${data.same_day_deposit_cls_nm} <br>`);
      if (data.fgn_restriction_flg != 0)
        content = content.concat(`${data.fgn_restriction_flg_nm} <br>`);
      if (content != `● 取引規制 <br><br>`) return content;
    }
  },
  getPriceAtNow(data, value) {
    if (!value || !data) return;
    let sizeRul = 1;
    data.tick_size_rule.forEach((element) => {
      if (
        element.min_tick_size_price <= value &&
        element.max_tick_size_price > value
      ) {
        sizeRul = element.tick_size;
      }
    });
    if (sizeRul >= 1) {
      return this.handNumberInt(value);
    } else {
      return this.number_format(value, 1);
    }
  },
  bankName() {
    switch (this.getProcessEnv(processEnvKey.BRANCH_DIVISION)) {
      case "CHEER":
        return "三菱UFJ銀行";
      case "NCB":
        return "西日本シティ銀行";
      default:
        return "";
    }
  },
  companyName() {
    switch (this.getProcessEnv(processEnvKey.BRANCH_DIVISION)) {
      case "CHEER":
        return "CHEER証券";
      case "NCB":
        return "西日本シティ銀行";
      default:
        return "";
    }
  },
  getScrollTop() {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  },
  getScrollHeight() {
    var scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
    return scrollHeight;
  },
  getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  },
  getStockBoardOffsetStr(vol) {
    let str;
    switch (vol) {
      case "0":
        str = "";
        break;
      case "91":
        str = ".";
        break;
      case "101":
        str = "W";
        break;
      case "102":
        str = "特";
        break;
      case "104":
        str = "前";
        break;
      case "105":
        str = "特";
        break;
      case "109":
        str = "連";
        break;
      case "110":
        str = "連";
        break;
      case "S":
        str = "S";
        break;
      default:
        str = "";
    }
    return str;
  },
  isEmpty(str) {
    return ((typeof str === "undefined") || str.trim() === "" || !str.trim().length);
  }
};
