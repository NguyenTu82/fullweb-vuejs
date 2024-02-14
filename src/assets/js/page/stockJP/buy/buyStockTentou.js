import Moment from "moment";
import modalRegulation from "@/views/stockJP/components/modal/modalRegulation";
import modalAfterTrading from "@/views/stockJP/components/modal/modalAfterTrading";
import modalNotice from "@/views/stockJP/components/modal/modalNotice";
import modalPDF from "@/views/stockJP/components/modal/modalPDF";
import { mapActions, mapGetters, mapMutations } from "vuex";
import cStepperMoney from "@/components/common/stepper/cStepperMoney";
import modalIframe from "@/views/stockJP/components/modal/modalIframe";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

Moment.locale("zh-cn");

export default {
  title: "店頭画面",

  components: {
    modalPDF,
    modalNotice,
    modalAfterTrading,
    modalRegulation,
    cStepperMoney,
    modalIframe,
  },
  props: {
    stock_cd: { type: String, default: "" },
    resetData: { type: Boolean, default: false },
  },
  data() {
    return {
      money: 0,
      fakeMoney: 0,
      isDisabledStepper: false,
      methodOrder: 1, //1:金額指定 2:全部売却 3:単元未満売却 4:全部買付、店頭取引以外は未指定
      infoBank: 0,
      withdrawByBank: false,
      selectedBank: "",
      isCheckTerm: false,
      transactionPw: "",
      enableBuyButton: false,
      showModalRegulation: false,
      showModalAfterTrading: false,
      showModalNotice: false,
      showModalPDF: false,
      showOrderDataError: true,
      titleNotice: "",
      contentNotice: "",
      stockName: "",
      showModalWarning: false,
      contentRegulation: "",
      priceNow: 0,
      order_rcve_flg: 0,
      buy_available_cash: 0,
      markup_ask: 0,
    };
  },

  watch: {
    resetData() {
      this.transactionPw = "";
      this.isCheckTerm = false;
    },
    money(newVal, oldVal) {
      console.log("buyStockTentou.js watch money>> newVal=", newVal, ",oldVal=", oldVal);
      console.log("buyStockTentou.js watch money>> this.buy_available_cash=", this.buy_available_cash);
      if (newVal >= this.buy_available_cash) {
        this.showOrderDataError = false;
        this.money = this.buy_available_cash;
        newVal = this.buy_available_cash;        
      } else if (newVal < this.buy_available_cash) {
        this.showOrderDataError = true;        
      }
    },
  },

  computed: {
    ...mapGetters([
      "dataBrandInfo",
      "dataBank",
      "dataPDF",
      "dataDeposit",
      "dataOrder",
      "getPaymentOrderBank",
    ]),

    getCurrentTime() {
      return Moment(new Date().getTime()).format("YYYY/MM/DD HH:mm");
    },
    checkFlag() {
      return commonJs.checkFlagOrder(this.dataBrandInfo);
    },
    isOrderButton() {
      let conditionOrder = false;
      if (!this.withdrawByBank) {
        conditionOrder =
          this.money != 0 &&
          this.isCheckTerm &&
          this.transactionPw.length == 4 &&
          this.selectedBank != "";
      } else if (this.withdrawByBank && this.enableBuyButton) {
        conditionOrder = true;
      }
      return conditionOrder;
    },
    checkEnableDepositButton() {
      return (
        this.money != 0 &&
        this.isCheckTerm &&
        this.transactionPw.length == 4 &&
        !this.enableBuyButton
      );
    },
  },
  created() {
    this.initPage();
    this.cAPIGetDataBank();
    this.getDataLocalStorage();
  },
  methods: {
    ...mapMutations([      
      "UPDATE_BACK_PAGE",      
    ]),
    ...mapActions([
      "cAPIBrandInfo",
      "cAPIGetDataBank",
      "cAPIGetPDF",
      "cAPIDeposit",
      "cAPIOrder",
      "paymentOrderBank",
      "paymentOrder",
      "orderDocuments",
      "saveOrderData"
    ]),
    flagBuyTentou() {
      return commonJs.checkFlagBuyTentou(this.dataBrandInfo);
    },
    async initPage() {
      await this.paymentOrderBank({}).then(() => {
        console.log("buyStockTentou.js initPage >> this.getPaymentOrderBank.DATA=", this.getPaymentOrderBank.DATA);
      });
      //7-10-13
      this.cAPIBrandInfo({
        exchange_cls: constant.EXCHANGE_CLS,
        stock_cd: this.stock_cd,
      }).then(() => {
        if (this.dataBrandInfo) {
          this.markup_ask = this.dataBrandInfo.markup_ask;
          this.stockName = `${
            this.dataBrandInfo.stock_nm
          } (${this.dataBrandInfo.stock_cd.slice(0, 4)})`;
          this.priceNow = commonJs.getPriceAtNow(
            this.dataBrandInfo,
            this.dataBrandInfo.todays_base_prc
          );
          this.order_rcve_flg = this.dataBrandInfo.order_rcve_flg;
          this.buy_available_cash = this.dataBrandInfo.buy_available_cash;
          //0：未閲覧、1：閲覧済み
          if (this.dataBrandInfo.document_flg == 0) {
            this.cAPIGetPDF({ BRAND_TYPE: 3, BRAND_ID: this.stock_cd }).then(
              () => {
                if (this.dataPDF != []) {
                  this.showModalPDF = true;
                }
              })
          }
          if (this.checkFlag) {
            this.showModalRegulation = true;
            this.contentRegulation = this.checkFlag;
          }
        }
      })
    },
    getDataLocalStorage() {
      const datas = commonJs.getLocalData("dataConfirm");
      if (datas && datas.kind == 2) {
        this.methodOrder = datas.otc_order_cls;
        this.isDisabledStepper = datas.otc_order_cls == 4;
        this.money = datas.order_amt;
        this.selectedBank = datas.selectedBank;
        commonJs.removeLocalData("dataConfirm");
      }
    },
    onHideModal(data) {
      this[data.name] = data.value;
    },
    onShowModalWarning() {
      this.showModalWarning = true;
    },
    onShowNoticeModal(content, title) {
      this.titleNotice = title;
      this.contentNotice = content;
      this.showModalNotice = true;
    },
    inputPassword(event) {
      this.transactionPw = event.target.value;
    },
    selectMethodOrder(type) {
      if (this.methodOrder == type) return;
      this.isDisabledStepper = type == 4;
      this.methodOrder = type;
      if (type == 4) {
        this.fakeMoney = this.money;
        this.money = this.dataBrandInfo.buy_available_cash;
        this.showOrderDataError = false;
      } else {
        this.money = this.fakeMoney;
        this.showOrderDataError = true;
      }
    },
    inputMoney(value) {
      this.money = parseInt(value) || 0;
    },
    onChange(e) {
      this.selectedBank = e.target.value;
      if (e.target.value != constant.DEFAULT_BANK) {
        if (this.methodOrder == 4) {
          this.isDisabledStepper = false;
          this.onShowNoticeModal(
            "引落先に銀行口座を選択されている場合は、預り金全部買付を選択できません。"
          );
          this.methodOrder = 1;
          this.money = 0;
        }
        this.withdrawByBank = true;
        this.infoBank = e.target.value;
      } else {
        this.withdrawByBank = false;
        this.money = 0;
      }
    },
    actionBack() {
      this.$router.go(-1);
    },
    async actionOrder() {
      const params = {
        stock_cd: this.stock_cd,
        exchange_cls: constant.EXCHANGE_CLS,
        buy_sell_cls: 3, //1:売、3:買
        otc_consign_cls: 1, //1:店頭 2:委託
        order_amt: this.money, //注文金額 店頭取引のみ設定
        otc_order_cls: this.methodOrder, //1:金額指定  4:全部買付
        payment_cls: 1, //1:預り金 買い注文のみ設定
        account_typ_cd: this.dataBrandInfo.account_cls, //1:一般口座 2:特定口座 default
        pin_no: commonJs.hashPwd(this.transactionPw),
        order_rcve_flg: this.dataBrandInfo.order_rcve_flg, //for progress bar hide C411
        order_type: this.dataBrandInfo.order_rcve_flg == 1 ? 4 : 5,
        order_duration_cls: 1, //default follow source android 2022/06/10
        markup_ask: this.markup_ask, //param 参考買値 of C411
        account_cls_nm:
          this.dataBrandInfo.account_cls == 1
            ? this.dataBrandInfo.account_cls_nm
            : `${this.dataBrandInfo.account_cls_nm}（${this.dataBrandInfo.withholding_cls_nm})`, // param 口座区分 of C411
        stock_nm: this.dataBrandInfo.stock_nm, //0-1-3 of C411
        otc_buy_spread: this.dataBrandInfo.otc_buy_spread, //for calculate 金額 C411,
        selectedBank: this.selectedBank, //for when go back to get bank
      };
      this.cAPIBrandInfo({
        exchange_cls: constant.EXCHANGE_CLS,
        stock_cd: this.stock_cd,
      }).then(() => {
        if (this.flagBuyTentou()) {
          this.showModalRegulation = true;
          this.contentRegulation = this.flagBuyTentou();
        } else if (this.dataBrandInfo.order_rcve_flg == 0) {
          this.showModalAfterTrading = true;
        } else {
          //7-10-14
          this.cAPIOrder(params).then(() => {
            if (this.dataOrder) {
              const dataEncrypt = commonJs.aesEncrypt(JSON.stringify(params));
              const resAPIEncrypt = commonJs.aesEncrypt(
                JSON.stringify(this.dataOrder)
              );
              this.$router.push({
                name: "confirmTentou",
                query: {
                  data: dataEncrypt,
                  resAPI: resAPIEncrypt,
                },
              });
            }
          });
        }
      });
    },
    //50_2_124
    actionDeposit() {
      const res = this.getPaymentOrderBank;
      console.log("buyStockTentou.js actionDeposit 11 >> res=", res);
      if (res.DATA.length && res.DATA[0].CONTRACT_STATUS != 0) {        
        let FEE_WITH_TAX = res.DATA[0].PAYMENT_FEE_LIST.find(
          (it) =>
            it.LOWER_AMOUNT_LIMIT <= this.money &&
            this.money <= it.UPPER_AMOUNT_LIMIT
        );        

        const params = {
          PAYMENT_ID: this.dataBank[this.infoBank].PAYMENT_ID,
          AMOUNT: this.money,
          FEE_WITH_TAX:
            this.dataBank[this.infoBank].PAYMENT_FEE_LIST[0].FIXED_FEE_WITH_TAX,
          SECRET: commonJs.hashPwd(this.transactionPw),
        };
        this.cAPIDeposit(params).then(() => {
          switch (this.dataDeposit.RESULT) {
            case "success":
              this.enableBuyButton = true;
              this.isDisabledStepper = true;
              this.onShowNoticeModal(this.dataDeposit.DESCRIPTION, "入金完了");
              break;
            case "failure":
              this.onShowNoticeModal(this.dataDeposit.DESCRIPTION, "入金取消");
              break;
            default:
              this.onShowNoticeModal(this.dataDeposit.DESCRIPTION);
          }
        });

      } else {
        // 跳转到入金   C210 ネット口座振替サービス申込画面
        console.log("buyStockTentou.js actionDeposit 22 >> stock_cd=", this.stock_cd, ",exchange_cls=", constant.EXCHANGE_CLS);
        this.UPDATE_BACK_PAGE({
          name: "BuyStockJP",
          query: { stock_cd: this.stock_cd, exchange_cls: constant.EXCHANGE_CLS, kind: 2 },
        });
        console.log("buyStockTentou.js actionDeposit 33 >> stock_cd=", this.stock_cd, ",exchange_cls=", constant.EXCHANGE_CLS);        
        this.$router.push({
          name: "BankAccountRegist",
        });
      }
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumFloat(number, decimals) {
      return commonJs.handNumFloat(number, decimals);
    }
  },
};
