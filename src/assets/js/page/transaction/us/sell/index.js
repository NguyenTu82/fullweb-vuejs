import Model from "@/components/common/dialog/Caution";
import moment from "moment";
import { mapGetters, mapMutations, mapActions } from "vuex";
import TopInfo from "@/components/common/TopInfo";
import cStepperMoney from "@/components/common/stepper/cStepperMoney";
import io from "socket.io-client";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "[売] 米国株式",
  name: "SellUStock",
  data() {
    return {
      methodsArr: [
        { id: 1, title: "金額指定", active: true },
        { id: 2, title: "全部売却", active: false },
      ],
      socket: "",
      selectedMethods: 1,
      num: 0,
      inputNum: "",
      tradepwd: "",
      btnsetStyle: "button__disabled",
      baseDate: "",
      brandInfo: {},
      principalSell: {},
      basePrice: "",
      modelShow: false,
      modelContentShow: "",
      pdfList: [],
      brandId: null,
      inBuyInfoTipText: "",
      canInBuy: true,
      mattersIsShow: false,
      inClose: false,
      focused: false,
      inSuccess: false, // 入金是否成功
      riskMessage: "",
      accountSeqNo: "",
      num_back: 0,
      agreementMessage: "",
      usSellConfirmFlag: false
    };
  },
  components: { Model, TopInfo, cStepperMoney },
  watch: {
    tradepwd() {
      const minAmount = parseInt(this.principalSell.MIN_AMOUNT || 0);

      if (this.tradepwd.length == 4 && ((parseInt(this.num) >= minAmount && this.selectedMethods == 1) || (parseInt(this.num) > 0 && this.selectedMethods == 2))) {
        this.canInBuy = true;
        this.btnsetStyle = "button__primary";
      } else {
        this.btnsetStyle = "button__disabled";
        this.canInBuy = false;
      }
    },
    num() {
      const minAmount = parseInt(this.principalSell.MIN_AMOUNT || 0);
      if (this.tradepwd.length == 4 && parseInt(this.num) >= minAmount) {
        this.canInBuy = true;
        this.btnsetStyle = "button__primary";
      } else {
        this.canInBuy = false;
        this.btnsetStyle = "button__disabled";
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
      "sellExchangeRate",
      "getOrderSellData"
    ]),
    firstPlus() {
      if (this.principalSell.MIN_AMOUNT) {
        if (
          parseInt(this.principalSell.SELL_ORDER_AMOUNT) <
          parseInt(this.principalSell.MIN_AMOUNT)
        ) {
          return 0;
        }
        return parseInt(this.principalSell.MIN_AMOUNT);
      }
      return 500;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getSocketData();
      if (from.name === 'UsSellConfirm') vm.usSellConfirmFlag = true;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.closeSocket();
    next();
  },
  methods: {
    ...mapMutations([
      "TOGGLE_RISK_MODAL",
      "TOGGLE_AGREEMENT_MODAL",
      "CHANGE_ORDER_INPUT",
      "CHANGE_ORDER_SELL_DATA",
      "UPDATE_SELL_EXCHANGE_RATE",
    ]),
    ...mapActions([
      "orderDocuments",
      "orderInput",
      "paymentOrderBank",
      "paymentOrder",
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
        this.UPDATE_SELL_EXCHANGE_RATE(stockData.EXR.SL);
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
      this.num_back = null;
      this.baseDate = "";
      this.tradepwd = "";
      this.basePrice = "";
    },
    actionBack() {
      this.$router.go(-1);
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
    },
    modelShowInit() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const infoRes = await this.getSellInfo();
        if (infoRes.ERROR) this.handleError(infoRes.ERROR);
        const infoData = infoRes.DATA || {};
        this.brandInfo = infoData.BRAND_INFO || {};
        this.principalSell = infoData.PRINCIPAL_SELL || {};
        this.accountSeqNo = infoData.ACCOUNT_SEQ_NO;
        this.UPDATE_SELL_EXCHANGE_RATE(this.principalSell.SELL_EXCHANGE_RATE);
        resolve(infoRes);
      });
    },
    getSellInfo() {
      return new Promise((resolve) => {
        this.orderInput({
          BRAND_ID: this.brandId,
          TRANSACTION_TYPE: 2,
          TRADE_TYPE: 2,
          ACCOUNT_PURPOSE_TYPE: 1,
        }).then(() => {
          resolve(this.getOrderInput || {});
        });
      });
    },
    handelMethods(item) {
      this.tradepwd = "";
      const sellableCash = parseInt(this.principalSell.SELL_ORDER_AMOUNT);
      this.methodsArr = this.methodsArr.map((item) => {
        item.active = false;
        return item;
      });
      item.active = true;
      this.selectedMethods = item.id;
      if (item.id == 2) {
        this.num = sellableCash;
      } else {
        this.num = this.num_back;
      }
    },
    handleConfirmClick() {
      let minAmount = 0;
      if (this.selectedMethods == 1) {
        minAmount = parseInt(this.principalSell.MIN_AMOUNT || 0);
      } else {   //HDH00005_01-172 全部売却　500円未満　でも注文できるように修正
        minAmount = 1;
      }
      if (this.tradepwd.length === 4 && this.num >= minAmount) {
        this.CHANGE_ORDER_SELL_DATA({
          num: this.num,
          tradepwd: commonJs.hashPwd(this.tradepwd),
          selectedMethods: this.selectedMethods,
          accountSeqNo: this.accountSeqNo,
          sellAbleQty: this.principalSell.SELLABLE_QTY
        });
        this.$router.push({ name: "UsSellConfirm" });
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
    },
    async confirmInBuy(type) {
      if (type == "success") {
        this.resetData();
        const infoRes = await this.getSellInfo();
        const infoData = infoRes.DATA || {};
        this.brandInfo = infoData.BRAND_INFO || {};
        this.principalSell = infoData.PRINCIPAL_SELL || {};
      } else {
        this.btnsetStyle1 = "button__disabled";
      }
      this.inClose = true;
    },
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
    getCurrentTime() {
      return moment().format("YYYY/MM/DD HH:mm");
    },
    handleNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },
    handNumFloat(number, decimals) {
      return commonJs.handNumFloat(number, decimals, true);
    },
    handNumberFloat(number) {
      return commonJs.handNumberFloat(number, 8);
    },
  },
  created() {
    this.brandId = this.$route.query.brandId || null;
    this.modelContentShow = "";
    this.pageInit().then(r => {
      if (this.usSellConfirmFlag) {
        this.methodsArr.forEach(function (m) {
          if (m.id === this.getOrderSellData.selectedMethods) {
            this.handelMethods(m);
            if (this.getOrderSellData.selectedMethods === 1) this.num = this.getOrderSellData.num;
          }
        }, this);
      }
    });
  },
  mounted() {
    setTimeout(() => {
      document.scrollingElement.scrollTop = 0;
    });
  },
};
