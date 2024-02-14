import Moment from "moment";
import modalRegulation from "@/views/stockJP/components/modal/modalRegulation";
import modalAfterTrading from "@/views/stockJP/components/modal/modalAfterTrading";
import modalPDF from "@/views/stockJP/components/modal/modalPDF";
import { mapActions, mapGetters } from "vuex";
import cStepperMoney from "@/components/common/stepper/cStepperMoney";
import modalIframe from "@/views/stockJP/components/modal/modalIframe";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

Moment.locale("zh-cn");

export default {
  title: "店頭画面",

  components: {
    modalPDF,
    modalAfterTrading,
    modalRegulation,
    cStepperMoney,
    modalIframe,
  },
  props: {
    stock_cd: { type: String, default: "" },
    resetData: { type: Boolean, default: false },
  },
  watch: {
    resetData() {
      this.transactionPw = "";
      this.isCheckTerm = false;
    },
    money(newVal, oldVal) {
      console.log("sellStockTentou.js watch money>> newVal=", newVal, ",oldVal=", oldVal);
      console.log("sellStockTentou.js watch money>> this.sold_amt=", this.sold_amt);
      if (newVal >= this.sold_amt) {
        this.showOrderDataError = false;
        this.money = this.sold_amt;
        newVal = this.sold_amt;        
        console.log("sellStockTentou.js watch money>> 55");
      } else if (newVal < this.sold_amt) {
        this.showOrderDataError = true;
        console.log("sellStockTentou.js watch money>> 66");
      }
      if (newVal === null) {
        this.showOrderDataError = false;
        console.log("sellStockTentou.js watch money>> 77");
      }
    },
  },
  data() {
    return {
      money: 0,
      fakeMoney: 0,
      isDisabledStepper: false,
      methodOrder: 1, //1:金額指定 2:全部売却
      isCheckTerm: false,
      transactionPw: "",
      showModalRegulation: false,
      showModalAfterTrading: false,
      showModalPDF: false,
      showModalWarning: false,
      showOrderDataError: true,
      stockName: "",
      contentRegulation: "",
      priceNow: 0,
      order_rcve_flg: 0,
      sold_amt: 0,
      sold_quantity: 0,
      markup_bid: 0
    };
  },

  computed: {
    ...mapGetters(["dataBrandInfo", "dataPDF", "dataOrder"]),

    getCurrentTime() {
      return Moment(new Date().getTime()).format("YYYY/MM/DD HH:mm");
    },
    checkFlag() {
      return commonJs.checkFlagOrder(this.dataBrandInfo);
    },
    isOrderButton() {
      return (
        this.money != 0 && this.isCheckTerm && this.transactionPw.length == 4
      );
    },
  },
  created() {
    this.initPage();
    this.getDataLocalStorage();
  },
  methods: {
    ...mapActions(["cAPIBrandInfo", "cAPIGetPDF", "cAPIOrder"]),
    flagSellTentou() {
      return commonJs.checkFlagSellTentou(this.dataBrandInfo);
    },
    initPage() {
      //7-10-13
      this.cAPIBrandInfo({
        exchange_cls: constant.EXCHANGE_CLS,
        stock_cd: this.stock_cd,
      }).then(() => {
        if (this.dataBrandInfo) {
          this.stockName = `${
            this.dataBrandInfo.stock_nm
          } (${this.dataBrandInfo.stock_cd.slice(0, 4)})`;
          this.priceNow = commonJs.getPriceAtNow(
            this.dataBrandInfo,
            this.dataBrandInfo.todays_base_prc
          );
          this.order_rcve_flg = this.dataBrandInfo.order_rcve_flg;
          this.sold_amt = this.dataBrandInfo.sold_amt;
          this.sold_quantity = this.dataBrandInfo.sold_quantity;
          this.markup_bid = this.dataBrandInfo.markup_bid;
          //0：未閲覧、1：閲覧済み
          if (this.dataBrandInfo.document_flg == 0) {
            this.cAPIGetPDF({ BRAND_TYPE: 3, BRAND_ID: this.stock_cd }).then(
              () => {
                if (this.dataPDF != []) {
                  this.showModalPDF = true;
                }
              }
            );
          }
          if (this.checkFlag) {
            this.showModalRegulation = true;
            this.contentRegulation = this.checkFlag;
          }
        }
      });
    },
    getDataLocalStorage() {
      const datas = commonJs.getLocalData("dataConfirm");
      if (datas && datas.kind == 2) {
        this.methodOrder = datas.otc_order_cls;
        this.isDisabledStepper = datas.otc_order_cls == 2;
        this.money = this.isDisabledStepper ? null : datas.order_amt;
        commonJs.removeLocalData("dataConfirm");
      }
    },
    onHideModal(data) {
      this[data.name] = data.value;
    },
    onShowModalWarning() {
      this.showModalWarning = true;
    },
    inputPassword(event) {
      this.transactionPw = event.target.value;
    },
    selectMethodOrder(type) {
      if (this.methodOrder == type) return;
      this.isDisabledStepper = type == 2;
      this.methodOrder = type;
      if (type == 2) {
        this.fakeMoney = this.money;
        this.money = null;
        this.showOrderDataError = false;
      } else {
        this.money = this.fakeMoney;
        this.showOrderDataError = true;
      }
    },
    inputMoney(value) {
      this.money = value;
    },

    async actionOrder() {
      const params = {
        otc_consign_cls: 1, //1:店頭 2:委託
        exchange_cls: constant.EXCHANGE_CLS,
        pin_no: commonJs.hashPwd(this.transactionPw),
        account_typ_cd: this.dataBrandInfo.account_cls, //1:一般口座 2:特定口座 default
        otc_order_cls: this.methodOrder, //1:金額指定  2:全部売却
        withholding_cls: this.dataBrandInfo.withholding_cls,
        order_duration_cls: 1, //default follow source android 2022/06/10
        buy_sell_cls: 1, //1:売、3:買
        order_type: this.dataBrandInfo.order_rcve_flg == 1 ? 4 : 5,
        stock_cd: this.stock_cd,
        order_rcve_flg: this.dataBrandInfo.order_rcve_flg, //for progress bar hide C411
        account_cls_nm:
          this.dataBrandInfo.account_cls == 1
            ? this.dataBrandInfo.account_cls_nm
            : `${this.dataBrandInfo.account_cls_nm}（${this.dataBrandInfo.withholding_cls_nm})`, // param 口座区分 of C511
        stock_nm: this.dataBrandInfo.stock_nm, //0-1-3 of C411
        otc_sell_spread: this.dataBrandInfo.otc_sell_spread, //for calculate 参考売付株価 C511,
        sold_amt: this.dataBrandInfo.sold_amt, //for calculate 概算受渡金額 C511,
        markup_bid: this.markup_bid, //for calculate 概算受渡金額 C511,
      };
      if (this.methodOrder == 2)
        params["ord_nominal"] = this.dataBrandInfo.sold_quantity;
      if (this.methodOrder == 1) params["order_amt"] = this.money;
      this.cAPIBrandInfo({
        exchange_cls: constant.EXCHANGE_CLS,
        stock_cd: this.stock_cd,
      }).then(() => {
        if (this.flagSellTentou()) {
          this.showModalRegulation = true;
          this.contentRegulation = this.flagSellTentou();
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
    actionBack() {
      this.$router.go(-1);
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumFloat(number, decimals) {
      return commonJs.handNumFloat(number, decimals);
    },
  },
};
