import Model from "@/components/common/dialog/Caution";
import moment from "moment";
import {mapActions, mapGetters, mapMutations} from "vuex";
import TopInfo from "@/components/common/TopInfo";
import cStepperMoney from "@/components/common/stepper/cStepperMoney";
import io from "socket.io-client";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "[買] 米国株式",
  name: "BuyUStock",
  data() {
    return {
      initPayment : 0,
      bankArr: [
        {
          PAYMENT_ID: 0,
          BANK_NAME: "選択してください",
          active: true,
        },
        {
          PAYMENT_ID: 1,
          BANK_NAME: "預り金",
          active: true,
        },
      ],
      methodsArr: [
        { id: 1, title: "金額指定", active: true },
        { id: 2, title: "預り金全部買付", active: false },
      ],
      socket: "",
      list: [],
      selectedMethods: 1,
      isDropdown: false, //打开下拉框
      bank: null,
      num: 0,
      inputNum: "",
      tradepwd: "",
      btnsetStyle: "button__disabled",
      btnsetStyle1: "button__disabled",
      baseDate: "",
      baseData: "",
      brandInfo: {},
      principalBuy: {},
      basePrice: "",
      modelShow: false,
      modelContentShow: "",
      pdfList: [],
      brandId: null,
      confirmNum: 0,
      inBuyShow: false,
      inBuyType: "",
      inBuyInfoTipText: "",
      canInBuy: true,
      mattersIsShow: false,
      inClose: false,
      bankInErrShow: false,
      focused: false,
      inSuccess: false, // 入金是否成功
      currentPayment: {
        // PAYMENT_ID: 1
      },
      riskMessage: "",
      firstChange: true,
      num_back: 0,
      agreementMessage: "",
      usBuyConfirmFlag: false
    };
  },
  components: { Model, TopInfo, cStepperMoney },
  beforeRouteLeave(to, from, next) {
    this.closeSocket();
    next();
  },
  watch: {
    tradepwd() {
      const minAmount = parseInt(this.currentPayment.MIN_AMOUNT || 0);
      if (
        this.tradepwd.length == 4 &&
        parseInt(this.num) >= minAmount &&
        this.currentPayment.PAYMENT_ID
      ) {
        // this.btnsetStyle = 'button__main';
        // this.btnsetStyle1 = 'background: #FF5C81;color:#fff';
        this.canInBuy = true;
        if (this.currentPayment.PAYMENT_ID != 1 && this.inClose) {
          this.btnsetStyle1 = "button__secondary";
          this.btnsetStyle = "button__disabled";
        } else {
          if (this.currentPayment.PAYMENT_ID == 1) {
            // this.btnsetStyle1 = 'button__main';
            this.btnsetStyle1 = "button__secondary";
          } else {
            // this.btnsetStyle = 'button__main';
            this.btnsetStyle = "button__main";
          }
        }
      } else {
        this.btnsetStyle = "button__disabled";
        this.btnsetStyle1 = "button__disabled";
        this.canInBuy = false;
      }
    },
    num() {
      const minAmount = parseInt(this.currentPayment.MIN_AMOUNT || 0);
      if (this.tradepwd.length == 4 && parseInt(this.num) >= minAmount) {
        this.canInBuy = true;
        // this.btnsetStyle = 'button__main';
        // this.btnsetStyle1 = 'background: #FF5C81;color:#fff';
        if (this.currentPayment.PAYMENT_ID == 1) {
          // this.btnsetStyle1 = 'button__main';
          this.btnsetStyle1 = "button__secondary";
        } else {
          this.btnsetStyle = "button__main";
          // this.btnsetStyle1 = 'button__disabled';
        }
      } else {
        this.canInBuy = false;
        this.btnsetStyle = "button__disabled";
        this.btnsetStyle1 = "button__disabled";
      }
    },
  },
  computed: {
    ...mapGetters([
      "getOrderDocuments",
      "showRiskModal",
      "showAgreementModal",
      "getOrderInput",
      "getPaymentOrderBank",
      "getPaymentOrder",
      "buyExchangeRate",
      "getUserInfo",
      "getOrderData"
    ]),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getSocketData();
      if (from.name === 'UsBuyConfirm') vm.usBuyConfirmFlag = true;
    });
  },
  methods: {
    ...mapMutations([
      "TOGGLE_RISK_MODAL",
      "TOGGLE_AGREEMENT_MODAL",
      "CHANGE_ORDER_INPUT",
      "CHANGE_ORDER_BUY_DATA",
      "UPDATE_BUY_EXCHANGE_RATE",
      "UPDATE_BACK_PAGE",
      "showPopup"
    ]),
    ...mapActions([
      "orderDocuments",
      "orderInput",
      "paymentOrderBank",
      "paymentOrder",
      "getUserInfoApi",
      "saveOrderData"
    ]),
    enter_background() {
      this.closeSocket();
    },
    enter_foreground() {
      this.getSocketData();
    },
    closeSocket() {
      this.socket.close && this.socket.close();
    },
    getSocketData() {
      let url = this.$store.state.common.WebSocketUS;
      let uuid = localStorage.getItem("uuid");
      url = url + "?id=" + uuid;
      let socket = io(url, {
        path: "/stock",
        transports: ["websocket"],
      });

      this.socket = socket;
      this.openSocket(this.socket);
    },
    openSocket(socket) {
      socket.on("connect", () => {
        socket.emit("join", "us_stock_realtime_1");
      });
      socket.on("us_stock_realtime_1", (data) => {
        let stockData = JSON.parse(data);
        this.UPDATE_BUY_EXCHANGE_RATE(stockData.EXR.BY);
      });
      socket.on("error", (err) => {
        console.log(err);
      });
    },
    inputHandle(value) {
      this.num = parseInt(value) || 0;
      this.num_back = this.num;
    },
    resetData() {
      this.num = 0;
      this.num_back = 0;
      this.baseData = {};
      this.baseDate = "";
      this.tradepwd = "";
      this.basePrice = "";
    },
    htmlText(msg) {
      if (msg) {
        return msg.replace(/\r?\n/g, "<br>");
      }
    },
    async pageInit() {
      const modelInitRes = await this.modelShowInit();
      this.TOGGLE_AGREEMENT_MODAL(false);
      this.TOGGLE_RISK_MODAL(false);
      if (modelInitRes.CONFIRMATION.NEED_AGREEMENT !== 0) {
        await this.orderDocuments({BRAND_TYPE: 3, BRAND_ID: this.brandId});
        this.TOGGLE_AGREEMENT_MODAL(true);
        this.agreementMessage = modelInitRes.CONFIRMATION.AGREEMENT_MESSAGE;
        this.inSuccess = true;
      } else if (modelInitRes.CONFIRMATION.INVALID_PURPOSE_TYPE != 0) {
        this.riskMessage = modelInitRes.CONFIRMATION.PURPOSE_TYPE_MESSAGE || "";
        this.TOGGLE_RISK_MODAL(true);
      }
      await this.paymentOrderBank({}).then(() => {
        if (this.getPaymentOrderBank.DATA.length) {
          this.bankArr = [...this.bankArr, ...this.getPaymentOrderBank.DATA];
        }
        this.bankArr = this.bankArr.map((item) => {
          return {
            active: true,
            ...item,
          };
        });
      });
    },
    modelShowInit() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // 开始加载页面数据
        const infoRes = await this.getBuyInfo();
        if (infoRes.ERROR) this.handleError(infoRes.ERROR);
        // 根据返回，确认弹窗应该弹出那些 设置  modelContentShow 的值
        const infoData = infoRes.DATA || {};
        this.baseData = infoData;
        this.brandInfo = infoData.BRAND_INFO || {};
        this.principalBuy = infoData.PRINCIPAL_BUY || {};
        this.UPDATE_BUY_EXCHANGE_RATE(this.principalBuy.BUY_EXCHANGE_RATE);
        // this.currentPayment = this.principalBuy.PAYMENT_LIST[0] || {};
        resolve(infoRes);
      });
    },
    getBuyInfo() {
      return new Promise((resolve) => {
        this.orderInput({
          BRAND_ID: this.brandId,
          TRANSACTION_TYPE: 2,
          TRADE_TYPE: 1,
          ACCOUNT_PURPOSE_TYPE: 1,
        }).then(() => {

          resolve(this.getOrderInput || {});
        });
      });
    },
    handelSelectBank(e) {
      // 设置注文内容确认按钮状态
      let value = e.target ? e.target.value : e;
      // if (this.firstChange) {
        this.bankArr = this.bankArr.map((item) => {
          return {
            ...item,
            active: item.PAYMENT_ID > 0,
          };
        });
        this.firstChange = false;
      // }
      let item = this.bankArr.find((d) => d.PAYMENT_ID == value);
      let payment = this.principalBuy.PAYMENT_LIST.find(
        (d) => d.PAYMENT_ID == value
      );
      if (this.tradepwd.length == 4 && this.num) {
        if (item.PAYMENT_ID == 1) {
          this.btnsetStyle1 = "button__disabled";
        } else {
          this.btnsetStyle1 = "button__disabled";
        }
      }
      // 如果选择银行的话，預り金全部買付是不能选的
      if (item && item.PAYMENT_ID != 1) {
        if (this.selectedMethods == 2) {
          this.bankInErrShow = true;
        }
        this.methodsArr = this.methodsArr.map((item) => {
          item.active = false;
          return item;
        });
        this.methodsArr[0].active = true;
        this.selectedMethods = this.methodsArr[0].id;
      }
      this.num = null;
      this.num_back = null;
      this.currentPayment = (value && value != 1) ? item : payment;
      this.bank = (item && item.BANK_NAME) || "";
    },
    handelMethods(item) {
      const buyableCash = parseInt(this.principalBuy.BUYABLE_CASH);
      if (!this.currentPayment.PAYMENT_ID) return;
      if (this.currentPayment.PAYMENT_ID != 1 && item.id == 2) {
        return;
      }
      this.methodsArr = this.methodsArr.map((item) => {
        item.active = false;
        return item;
      });
      item.active = true;
      this.selectedMethods = item.id;
      if (item.id == 2) {
        this.num = buyableCash;
      } else {
        this.num = this.num_back;
      }
    },
    closeBankIn() {
      this.bankInErrShow = false;
    },
    actionBack() {
      this.$router.go(-1);
    },
    handleInClick() {
      if (this.currentPayment.PAYMENT_ID == 1) return;
      if (this.currentPayment.PAYMENT_ID != 1 && this.inClose) return;
      if (!this.canInBuy) return;
      const minAmount = parseInt(this.currentPayment.MIN_AMOUNT || 0);
      if (this.tradepwd.length == 4 && this.num >= minAmount) {
        this.paymentOrderBank({}).then(() => {
          const res = this.getPaymentOrderBank;
          console.log("buy index.js handleInClick 11 >> res=", res);
          if (res.DATA.length && res.DATA[0].CONTRACT_STATUS != 0) {
            let FEE_WITH_TAX = res.DATA[0].PAYMENT_FEE_LIST.find(
              (it) =>
                it.LOWER_AMOUNT_LIMIT <= this.num &&
                this.num <= it.UPPER_AMOUNT_LIMIT
            );
            this.paymentOrder({
              PAYMENT_ID: this.currentPayment.PAYMENT_ID, // this.nowBank.PAYMENT_ID
              AMOUNT: this.num,
              FEE_WITH_TAX: FEE_WITH_TAX.FIXED_FEE_WITH_TAX,
              SECRET: commonJs.hashPwd(this.tradepwd), // 取引密码
            }).then(() => {
              const response = this.getPaymentOrder;
              if (response.STATUS == "OK") {
                if (response.DATA.RESULT == "success") {
                  // 成功弹窗
                  this.inBuyInfoTipText = response.DATA.DESCRIPTION;
                  this.inBuyShow = true;
                  this.inBuyType = "success";
                } else {
                  if (response.DATA.DESCRIPTION) {
                    this.inBuyInfoTipText = response.DATA.DESCRIPTION;
                  } else {
                    // 失败弹窗
                    this.inBuyInfoTipText = "銀行口座残高が不足しています。";
                  }
                  this.inBuyShow = true;
                  this.inBuyType = "failure";
                }
              } else {
                // NG但是没有DESCRIPTION，或者DESCRIPTION为空的时候
                this.showPopup({
                  isShow: false
                });
                if (!response.DATA || !response.DATA.DESCRIPTION) {
                  // 失败弹窗
                  this.inBuyInfoTipText = response["ERROR"]["MESSAGE"];
                } else {
                  this.inBuyInfoTipText = response.ERROR.MESSAGE;
                }
                this.inBuyShow = true;
                this.inBuyType = "failure";
              }
            });
          } else {
            // 跳转到入金   C210 ネット口座振替サービス申込画面
            console.log("buy index.js handleInClick 22 >> brandId=", this.brandId);
            this.UPDATE_BACK_PAGE({
              name: "UsBuy",
              query: { brandId: this.brandId },
            });
            console.log("buy index.js handleInClick 33 >> brandId=", this.brandId);
            this.$router.push({
              name: "BankAccountRegist",
            });
          }
        });
      }
    },
    handleConfirmClick() {
      if (this.riskMessage) {
        this.TOGGLE_RISK_MODAL(true);
        return;
      }
      if (this.currentPayment.PAYMENT_ID != 1 && !this.inClose) return;
      const minAmount = parseInt(this.currentPayment.MIN_AMOUNT || 0);
      if (this.tradepwd.length == 4 && this.num >= minAmount) {
        this.CHANGE_ORDER_BUY_DATA({
          num: this.num,
          tradepwd: commonJs.hashPwd(this.tradepwd),
          selectedMethods: this.selectedMethods,
        });
        const data = {
          PAYMENT_ID : this.currentPayment.PAYMENT_ID,
          METHOD : this.selectedMethods,
          NUM : this.num
        }
        this.saveOrderData(data);
        this.$router.push({ name: "UsBuyConfirm" });
      }
    },
    handleError(error) {
      this.modelShow = true;
      this.modelContentShow =
        commonJs.getMessageFromCode(error.CODE) || constant.DEFAULT_ERROR;
    },
    closeModal() {
      this.modelShow = false;
      this.$router.go(-1);
      // this.$store.commit("logout");
    },
    async confirmInBuy(type) {
      if (type == "success") {
        // this.resetData();
        // this.tradepwd = '';
        const infoRes = await this.getBuyInfo();
        const infoData = infoRes.DATA || {};
        this.baseData = infoData;
        this.brandInfo = infoData.BRAND_INFO || {};
        this.principalBuy = infoData.PRINCIPAL_BUY || {};
        this.inClose = true;
        this.btnsetStyle = "button__disabled";
        this.btnsetStyle1 = "button__secondary";
      } else {
        // 关闭弹窗，其他操作不用做
        // 注文内容確認】置灰
        this.btnsetStyle1 = "button__disabled";
      }
      this.inBuyShow = false;
      this.inBuyType = "";
    },
    // 注意事项
    goMatters() {
      this.mattersIsShow = true;
    },
    closeMatter() {
      this.mattersIsShow = false;
    },
    closeAgreement() {
      this.TOGGLE_AGREEMENT_MODAL(false);
      this.$router.go(-1);
    },
    goAgreement() {
      this.TOGGLE_AGREEMENT_MODAL(false);
      this.$router.push({ name: "SettingDocuments" });
    },
    closeRisk() {
      this.TOGGLE_RISK_MODAL(false);
    },
    confirmRisk() {
      this.TOGGLE_RISK_MODAL(false);
      //go to screen F110-口座登録情報
      // this.getUserInfoApi().then(() => {
        // if (this.getUserInfo.STATUS === "OK" && !this.getUserInfo.ERROR) {
          // commonJs.saveLocalData("userInfo", this.getUserInfo.DATA.USER);
          this.$router.push({name:'account'})
        // }
      // });
    },
    getCurrentTime() {
      return moment().format("YYYY/MM/DD HH:mm");
    },
    handleNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },
  },
  created() {
    this.brandId = this.$route.query.brandId || null;
    this.modelContentShow = "";
    this.confirmNum = 0;
    this.riskMessage = "";
    if (this.$route.query.isBack == "back") {
      this.bank = this.bankArr[0].BANK_NAME;
    } else {
      this.bank = null;
    }
  },
  mounted() {
    window.enter_background = this.enter_background;
    window.enter_foreground = this.enter_foreground;
    setTimeout(() => {
      document.scrollingElement.scrollTop = 0;
    });
    this.pageInit().then(r => {
      if (this.usBuyConfirmFlag) {
        this.handelSelectBank(this.getOrderData.PAYMENT_ID);
        this.initPayment = this.getOrderData.PAYMENT_ID;
        this.methodsArr.forEach(function (m) {
          if (m.id === this.getOrderData.METHOD) {
            this.handelMethods(m);
            if (this.getOrderData.METHOD === 1) this.num = this.getOrderData.NUM;
          }
        }, this);
      }
    });
  },
};
