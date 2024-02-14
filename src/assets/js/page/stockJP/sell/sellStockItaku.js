import Moment from "moment";
import modalShowDay from "@/views/stockJP/components/modal/modalShowDay";
import modalRegulation from "@/views/stockJP/components/modal/modalRegulation";
import listItemBuySell from "@/views/stockJP/components/listItemBuySell";
import { mapActions, mapGetters } from "vuex";
import modalIframe from "@/views/stockJP/components/modal/modalIframe";
import cStepper from "@/components/common/stepper/cStepper";
import cStepperMoney from "@/views/stockJP/components/stepper/cStepperMoney";
import modalPDF from "@/views/stockJP/components/modal/modalPDF";
import commonJs from "@/assets/js/common/common";

Moment.locale("zh-cn");

export default {
  name: "buyOrderItaku",
  title: "委託画面",

  props: {
    exchange_cls: { type: String, default: "" },
    stock_cd: { type: String, default: "" },
    resetData: { type: Boolean, default: false },
  },
  watch: {
    resetData() {
      this.transactionPw = "";
      this.isCheckTerm = false;
    },
  },
  components: {
    modalIframe,
    listItemBuySell,
    modalShowDay,
    modalRegulation,
    cStepper,
    cStepperMoney,
    modalPDF,
  },
  data() {
    return {
      quantity: 0,
      money: 0,
      methodOrder: 2, //1:成行 2:指値
      executionConditions: 0, //0:指定なし 1:寄付 2:引け 3:不成
      expirationDate: 1, //1:本日中、2:今週中、3:期間指定
      transactionPw: "",
      showModalGetDay: false,
      valueDate: "期間指定",
      isCheckTerm: false,
      showModalRegulation: false,
      showModalWarning: false,
      showModalPDF: false,
      stockName: "",
      businessDayList: [],
      buy_available_cash: 0,
      trading_unit: 0,
      min_price_width: 0,
      max_price_width: 0,
      exchange_cls_nm: "",
      priceStep: 1,
      day_before_rate: 0,
      day_before_ratio: 0,
      last: 0,
      sold_quantity: 0,
      contentRegulation: "",
      priceNow: 0,
      account_cls_nm: "",
      otc_select_brand_cls: 0
    };
  },
  created() {
    this.init();
    this.getDataLocalStorage();
  },

  computed: {
    ...mapGetters([
      "dataBrandInfo",
      "dataStockPriceInfo",
      "dataStockSign",
      "dataOrder",
      "dataPDF",
    ]),
    checkFlag() {
      return commonJs.checkFlagOrder(this.dataBrandInfo);
    },
    totalFee() {
      if (this.money === 0 || this.quantity === 0) {
        return "-";
      }
      return commonJs.handNumberInt(this.money * this.quantity);
    },
    flagOrder() {
      return (
        this.quantity != 0 &&
        (this.money != 0 || this.methodOrder == 1) &&
        this.transactionPw.length == 4 &&
        this.isCheckTerm
      );
    },
    getCurrentTime() {
      return Moment(new Date().getTime()).format("YYYY/MM/DD HH:mm");
    },
  },
  methods: {
    ...mapActions([
      "cAPIBrandInfo",
      "cAPIStockPriceInfo",
      "cAPIStockSign",
      "cAPIOrder",
      "cAPIGetPDF",
    ]),
    flagSellItaku() {
      return commonJs.checkFlagSellItaku(this.dataBrandInfo);
    },
    init() {
      //7-10-13
      this.cAPIBrandInfo({
        exchange_cls: this.exchange_cls,
        stock_cd: this.stock_cd,
      }).then(() => {
        if (this.dataBrandInfo) {
          this.buy_available_cash = this.dataBrandInfo.buy_available_cash;
          this.exchange_cls_nm = this.dataBrandInfo.exchange_cls_nm;
          this.trading_unit = this.dataBrandInfo.trading_unit;
          this.min_price_width = this.dataBrandInfo.min_price_width;
          this.max_price_width = this.dataBrandInfo.max_price_width;
          this.sold_quantity = this.dataBrandInfo.sold_quantity;
          this.businessDayList = this.dataBrandInfo.business_day_list;
          this.stockName = `${
            this.dataBrandInfo.stock_nm
          } (${this.dataBrandInfo.stock_cd.slice(0, 4)})`;
          this.account_cls_nm =
            this.dataBrandInfo.account_cls == 1
              ? this.dataBrandInfo.account_cls_nm
              : `${this.dataBrandInfo.account_cls_nm}（${this.dataBrandInfo.withholding_cls_nm})`
          this.otc_select_brand_cls = this.dataBrandInfo.otc_select_brand_cls;
          this.getPriceStep(this.last);
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
      //7-33-05
      this.cAPIStockSign({
        exchange_cls: this.exchange_cls,
        brand_cd: this.stock_cd,
      });

      //7-33-01
      this.cAPIStockPriceInfo({
        exchange_cls: this.exchange_cls,
        stock_cd: this.stock_cd,
      }).then(() => {
        if (this.dataStockPriceInfo) {
          this.day_before_rate = this.dataStockPriceInfo.day_before_rate;
          this.day_before_ratio = commonJs.number_format2(this.dataStockPriceInfo.day_before_ratio);
          this.last = this.dataStockPriceInfo.last;
          this.priceNow = commonJs.getPriceAtNow(this.dataBrandInfo, this.last);
        }
      });
    },
    getPriceStep(value) {
      this.dataBrandInfo.tick_size_rule.forEach((element) => {
        if (
          element.min_tick_size_price <= value &&
          element.max_tick_size_price > value
        ) {
          this.priceStep = element.tick_size;
        }
      });
    },
    getDataLocalStorage() {
      const datas = commonJs.getLocalData("dataConfirm");
      if (datas && datas.kind == 1) {
        this.quantity = datas.ord_nominal;
        this.methodOrder = datas.price_cls;
        this.money = datas.ord_price;
        this.executionConditions = datas.exec_cond_cd;
        this.expirationDate = datas.order_duration_cls;
        if (datas.order_duration_cls == 3) {
          this.valueDate = datas.specify_due_d;
        }
        commonJs.removeLocalData("dataConfirm");
      }
    },
    onHideModal(data) {
      this[data.name] = data.value;
    },
    onShowModalWarning() {
      this.showModalWarning = true;
    },
    setValueMoney(value) {
      this.money = value;
    },
    selectValueDate(value) {
      if (this.businessDayList.length != 0 && value == "") {
        this.valueDate = this.businessDayList[0].business_day;
      } else {
        this.valueDate = value;
      }
    },
    selectExpirationDate(type) {
      if (type == 3) {
        this.showModalGetDay = true;
      }
      this.expirationDate = type;
    },
    selectCondition(type) {
      if (this.executionConditions == type) return;
      if (type == 3) this.expirationDate = 1;
      this.executionConditions = type;
    },
    selectMethodOrder(type) {
      if (this.methodOrder == type) return;
      if (type == 2) {
        this.money = 0;
      } else {
        this.money = "";
      }
      this.methodOrder = type;
      this.expirationDate = 1;
      this.executionConditions = 0;
    },
    inputQuantity(value) {
      this.quantity = parseInt(value) || 0;
    },
    inputMoney(value) {
      this.getPriceStep(value);
      this.money = value;
    },
    inputPassword(event) {
      this.transactionPw = event.target.value;
    },
    actionOrder() {
      const params = {
        stock_cd: this.stock_cd,
        exchange_cls: this.exchange_cls,
        buy_sell_cls: 1, //1:売、3:買
        withholding_cls: this.dataBrandInfo.withholding_cls,
        otc_consign_cls: 2, //1:店頭 2:委託
        price_cls: this.methodOrder, //1:成行 2:指値
        ord_nominal: this.quantity, //注文数量
        ord_price: this.money, //注文価格
        exec_cond_cd: this.executionConditions, //0:指定なし 1:寄付 2:引け 3:不成
        account_typ_cd: this.dataBrandInfo.account_cls, //1:一般口座 2:特定口座
        pin_no: commonJs.hashPwd(this.transactionPw),
        order_duration_cls: this.expirationDate, //1:本日中、2:今週中、3:期間指定
        order_type: 1, //default itaku
        weekend_business_d: this.dataBrandInfo.weekend_business_d,
        account_cls_nm: this.account_cls_nm, // param 口座区分 of C411
        exchange_cls_nm: this.dataBrandInfo.exchange_cls_nm, //0-1-3 of C411
        stock_nm: this.dataBrandInfo.stock_nm, //0-1-3 of C411
      };
      if (this.expirationDate == 3) params["specify_due_d"] = this.valueDate;

      //first call api 7-10-13
      this.cAPIBrandInfo({
        exchange_cls: this.exchange_cls,
        stock_cd: this.stock_cd,
      }).then(() => {
        if (this.flagSellItaku()) {
          this.showModalRegulation = true;
          this.contentRegulation = this.flagSellItaku();
        }
        //7-10-14
        else
          this.cAPIOrder(params).then(() => {
            if (this.dataOrder) {
              const dataEncrypt = commonJs.aesEncrypt(JSON.stringify(params));
              const resAPIEncrypt = commonJs.aesEncrypt(
                JSON.stringify(this.dataOrder)
              );
              this.$router.push({
                name: "confirmItaku",
                query: {
                  data: dataEncrypt,
                  resAPI: resAPIEncrypt,
                },
              });
            }
          });
      });
    },
    actionBack() {
      this.$router.go(-1);
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumFloat(number) {
      return commonJs.handNumFloat(number);
    },
    handNumberFloat(number) {
      return this.commonJs.handNumberFloat(number, 8);
    },
  },
};
