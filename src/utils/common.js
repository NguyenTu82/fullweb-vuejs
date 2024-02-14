import sha256 from "sha256";
import constant from "./constant";
export default {
  //add global methods or properties
  //save locally
  saveLocally: function (pathname, data) {
    try {
      var obj = window.localStorage.kouzakaisetsu;
    } catch (e) {
      alert("请开启本地存储许可！");
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

    window.localStorage.kouzakaisetsu = JSON.stringify(obj);
  },

  //read locally
  readLocally: function (pathname) {
    try {
      var obj = window.localStorage.kouzakaisetsu;
    } catch (e) {
      alert("请开启本地存储许可！");
    }
    if (typeof obj === "undefined") {
      return;
    } else {
      obj = JSON.parse(window.localStorage.kouzakaisetsu);
    }

    if (pathname == "kouzakaisetsu") {
      return obj;
    }

    let strArr = pathname.split(".");
    let curObj = obj;
    for (let i = 0; i < strArr.length; ++i) {
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
      var obj = window.localStorage.kouzakaisetsu;
    } catch (e) {
      alert("请开启本地存储许可！");
    }
    if (typeof obj === "undefined") {
      return "not found";
    } else {
      obj = JSON.parse(window.localStorage.kouzakaisetsu);
    }

    let strArr = pathname.split(".");
    let curObj = obj;
    for (let i = 0; i < strArr.length; ++i) {
      if (i + 1 == strArr.length) {
        delete curObj[strArr[i]];
        window.localStorage.kouzakaisetsu = JSON.stringify(obj);
        return "remove success";
      } else {
        if (typeof curObj[strArr[i]] === "undefined") {
          return "not found";
        }
        curObj = curObj[strArr[i]];
      }
    }
  },
  //clear locally
  clearLocally: function () {
    window.localStorage.clear();
  },

  saveLocalData: function (name, data, erase) {
    const alreadysave = JSON.parse(localStorage.getItem("csavedata"));
    let obj = {};
    if (alreadysave) {
      obj = Object.assign(alreadysave, { [name]: data });
    } else {
      obj = { [name]: data };
    }
    if (erase) {
      delete obj[name];
    }
    localStorage.setItem("csavedata", JSON.stringify(obj));
  },
  getLocalData: function (name) {
    const data = JSON.parse(localStorage.getItem("csavedata"));

    if (data == null) return false;
    if (data[name] == undefined) return false;

    return data[name];
  },

  getUrlKey: function (name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [""])[1].replace(/\+/g, "%20")
      ) || null
    );
  },

  judgeIosAndroid() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端或者uc浏览器
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isAndroid) return false;
    if (isiOS) return true;
  },

  // savelocal
  saveLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  },

  // getlocalstorage
  getlocalstorage(name) {
    let data = JSON.parse(localStorage.getItem(name));
    if (data == null) return false;
    return data;
  },

  // remove localstorage
  removeLocalstorage(name) {
    localStorage.removeItem(name);
  },

  /**
   * 加密密码(后期可能会换)
   */
  hashPwd(pwd) {
    return sha256(pwd);
  },

  // Telephone Verifying with Regular Expression
  verifyTel(tel) {
    return /^0\d{10}$/.test(tel);
  },
  // Telephone Verifying in Career with Regular Expression
  isTelInCorrect(telephone1, telephone2, telephone3) {
    let leftTel = telephone1 + telephone2;
    let rightTel = telephone3;
    return !/^0\d{5,6}$/.test(leftTel) || rightTel.length != 4;
  },

  // Birthday verifying between 20 and 80 years old (included 20 only)
  verifyBirthday(birthday) {
    let today = new Date();
    let deltaYear = today.getFullYear() - birthday.year;
    let deltaMonth = today.getMonth() + 1 - birthday.month;
    let deltaDay = today.getDate() - birthday.day;
    if (deltaYear < 20 || deltaYear > 80) {
      return deltaYear < 20 ? "younger" : "older";
    } else if (deltaYear > 20 && deltaYear < 80) {
      return "";
    } else if (deltaYear == 20) {
      if (deltaMonth < 0) {
        return "younger";
      } else if (deltaMonth == 0) {
        if (deltaDay < 0) {
          return "younger";
        } else {
          return "";
        }
      } else {
        return "";
      }
    } else {
      //deltaYear == 80
      if (deltaMonth < 0) {
        return "";
      } else if (deltaMonth == 0) {
        if (deltaDay < 0) {
          return "";
        } else {
          return "older";
        }
      } else {
        return "older";
      }
    }
  },
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
  // 判断此银行名字 是否 属于特殊银行
  SearchSpecialBank(backname) {
    return constant.specialBank.filter((item) => {
      if (backname.indexOf(item) != -1) {
        return true;
      }
    });
  },
  disableScrollOnDocument(cb) {
    document.scrollingElement.style.overflow = "hidden";
    cb && cb();
  },
  enableScrollOnDocument(cb) {
    document.scrollingElement.style.overflow = "scroll";
    cb && cb();
  },
  //由于在iOS上用日语输入法输入数字时，点击其他输入框，
  //会把当前正在输入的值自动复制到其他输入框中，因此作如下改动，即异步处理blur事件
  asyncProcess(cb) {
    setTimeout(() => {
      cb && cb();
    }, 100);
  },
  openEkycWithNative(url) {
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit && window.webkit.messageHandlers.open_ekyc.postMessage(url);
    } else {
      window.launcher && window.launcher.open_ekyc(url);
    }
  },
  goBackToLogin() {
    let isIos = this.judgeIosAndroid();
    if (isIos) {
      window.webkit.messageHandlers.go_back.postMessage({});
    } else {
      if (window.launcher) {
        window.launcher.go_back();
      }
    }
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
  disablePaste(el, binding) {
    if (el && binding.value) {
      el.setAttribute("onpaste", "return false;");
    }
  },
  need_back_physically() {
    let isIos = this.judgeIosAndroid();
    if (!isIos) {
      window.launcher &&
        window.launcher.need_back_physically("go_back_physically");
    }
  },
  base64ToFlie(base64) {
    let arr = base64.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], { type: mime });
  },
  init_get_i_from_native() {
    let isIos = this.judgeIosAndroid();
    if (!isIos) {
      window.launcher && window.launcher.init_get_i_from_native();
    }
  },
};
