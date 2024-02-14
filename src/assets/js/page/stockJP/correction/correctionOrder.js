import Moment from "moment";
import modalRegulation from "@/views/stockJP/components/modal/modalRegulation";
import listItemBuySell from "@/views/stockJP/components/listItemBuySell";
import { mapActions, mapGetters } from "vuex";
import modalIframe from "@/views/stockJP/components/modal/modalIframe";
import cStepper from "@/components/common/stepper/cStepper";
import cStepperMoney from "@/views/stockJP/components/stepper/cStepperMoney";
import NavOrder from "@/components/common/navBar/NavOrder";
import commonJs from "@/assets/js/common/common";
import TopInfo from "@/components/common/TopInfo";

Moment.locale("zh-cn");

export default {
  title: "訂正画面",

  components: {
    modalIframe,
    listItemBuySell,
    modalRegulation,
    cStepper,
    cStepperMoney,
    NavOrder,
    TopInfo,
  },
  data() {
    return {
      quantity: 0,
      money: 0,
      fakeMoney: 0,
      methodOrder: 2, //1:成行 2:指値
      executionConditions: 0, //0:指定なし 1:寄付 2:引け 3:不成
      expirationDate: 1, //1:本日中、2:今週中、3:期間指定
      transactionPw: "",
      valueDate: "期間指定",
      showModalRegulation: false,
      showModalWarning: false,
      exchange_cls: this.$route.query.exchange_cls,
      stock_cd: this.$route.query.stock_cd,
      titles: [
        { key: "1", value: "委託取引" },
        { key: "2", value: "店頭取引" },
      ],
      detailObj: {},
      isChangeAmount: this.$route.query.change_amount, //1: true, 2: false
      exchange_cls_nm: "",
      stockName: "",
      contentRegulation: "",
      priceStep: 1,
      day_before_ratio: 0,
      min_price_width: 0,
      max_price_width: 0,
      firstPrice: 0,
      firstQuantity: 0,
      totalPrice: 0,
      buy_sell_cls: 3, //1:売、3:買
    };
  },
  created() {
    this.init();
  },

  computed: {
    ...mapGetters([
      "dataBrandInfo",
      "dataStockPriceInfo",
      "dataStockSign",
      "dataOrder",
      "dataDetailOrder",
      "dataStockOwnerList",
      "dataEditOrder",
    ]),
    commonFee() {
      let comFee = "-";
      this.dataBrandInfo.trade_fee.forEach((element) => {
        if (
          element.trade_amt_lower <= this.totalAmount &&
          element.trade_amt_upper > this.totalAmount
        ) {
          comFee = element.comm_fee;
        }
      });
      return comFee;
    },
    totalFee() {
      return this.commonFee ? this.totalAmount - this.commonFee : "-";
    },
    checkFlag() {
      return commonJs.checkFlagOrder(this.dataBrandInfo);
    },
    showOptMarket() {
      if (this.isChangeAmount == 1) {
        return true;
      } else {
        return this.methodOrder == 1;
      }
    },
    showOptSetPrice() {
      if (this.isChangeAmount == 1) {
        return true;
      } else {
        return this.methodOrder == 2;
      }
    },
    totalAmount() {
      return this.money
        ? this.money * this.quantity
        : this.max_price_width * this.quantity;
    },
    flagOrder() {
      return (
        this.quantity !== 0 &&
        (this.money !== 0 || this.methodOrder == 1) &&
        this.transactionPw.length == 4
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
      "cAPIStockOwnerList",
      "cAPIGetDetailOrder",
      "cAPIEditOrder",
    ]),
    flagBuyItaku() {
      return commonJs.checkFlagBuyItaku(this.dataBrandInfo);
    },
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
          this.min_price_width = this.dataBrandInfo.min_price_width;
          this.max_price_width = this.dataBrandInfo.max_price_width;
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
        this.stockName = `${
          this.dataStockPriceInfo.stock_nm
        } (${this.dataStockPriceInfo.stock_cd.slice(0, 4)})`;
        this.day_before_ratio = commonJs.number_format2(this.dataStockPriceInfo.day_before_ratio);
      });

      //7-10-05
      this.cAPIGetDetailOrder({
        ord_no: this.$route.query.ord_no,
      }).then(() => {
        if (this.dataDetailOrder) {
          let item = this.dataDetailOrder.lst_stock_order_details.pop();
          if (item.order_duration_cls == 3) {
            this.valueDate = item.expire_d;
          }
          const dataLocal = commonJs.getLocalData("dataConfirm");
          if (dataLocal) {
            this.money = dataLocal.ord_price || null;
            this.quantity = dataLocal.ord_nominal;
            this.methodOrder = dataLocal.price_cls;
            this.executionConditions = dataLocal.exec_cond_cd;
            commonJs.removeLocalData("dataConfirm");
          } else {
            this.money = item.ord_price;
            this.quantity = item.ord_volume;
            this.methodOrder = item.price_cls;
            this.executionConditions = item.exec_cond_cd;
          }
          this.getPriceStep(this.money);
          this.firstQuantity = item.ord_volume;
          this.buy_sell_cls = item.buy_sell_cls;
          this.firstPrice = item.ord_price;
          this.exchange_cls_nm = item.exchange_cls_nm;
          this.expirationDate = item.order_duration_cls;
          this.detailObj = item;
        }
      });
    },
    selectMethodOrder(type) {
      if (this.methodOrder == type) return;
      this.methodOrder = type;
      if (type == 1) {
        this.money = null;
      } else {
        this.money = this.detailObj.ord_price;
      }
      this.executionConditions = 0;
    },
    selectCondition(type) {
      if (this.executionConditions == type) return;
      this.executionConditions = type;
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
    inputQuantity(value) {
      this.quantity = parseInt(value) || 0;
    },
    inputMoney(value) {
      this.getPriceStep(value);
      this.money = value;
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
    inputPassword(event) {
      this.transactionPw = event.target.value;
    },
    //7-10-14
    actionEditOrder() {
      const params = {
        stock_cd: this.stock_cd,
        exchange_cls: this.exchange_cls,
        buy_sell_cls: parseInt(this.detailObj.buy_sell_cls), //1:売、3:買
        otc_consign_cls: this.detailObj.otc_consign_cls,
        price_cls: this.methodOrder, //1:成行 2:指値
        ord_nominal: this.quantity, //注文数量
        exec_cond_cd: parseInt(this.executionConditions), //0:指定なし 1:寄付 2:引け 3:不成
        account_typ_cd: parseInt(this.detailObj.acc_cls_cd), //1:一般口座 2:特定口座
        pin_no: commonJs.hashPwd(this.transactionPw),
        order_duration_cls: parseInt(this.expirationDate), //1:本日中、2:今週中、3:期間指定
        order_type: 1, //default
        weekend_business_d: this.dataBrandInfo.weekend_business_d,
        account_cls_nm:
          this.dataBrandInfo.account_cls == 1
            ? this.dataBrandInfo.account_cls_nm
            : `${this.dataBrandInfo.account_cls_nm}（${this.dataBrandInfo.withholding_cls_nm})`,
        exchange_cls_nm: this.dataBrandInfo.exchange_cls_nm, //0-1-3 of C411
        stock_nm: this.dataBrandInfo.stock_nm, //0-1-3 of C411
        ord_no: this.detailObj.ord_no,
        expire_d: this.detailObj.expire_d,
        withholding_cls: this.dataBrandInfo.withholding_cls,
        isEditQuantity: this.quantity != this.firstQuantity, //for check show label edit
        isEditAmount: this.money != this.detailObj.ord_price, //for check show label edit
        isEditExecution:
          this.detailObj.exec_cond_cd != this.executionConditions, //for check show label edit
      };
      if (this.expirationDate == 3) params["specify_due_d"] = this.valueDate;
      if (parseInt(this.detailObj.buy_sell_cls) == 3)
        params["payment_cls"] = this.detailObj.pey_mthd_cd;
      if (this.money) params["ord_price"] = this.money;
      if (this.buy_sell_cls == 3 && this.flagBuyItaku()) {
        this.showModalRegulation = true;
        this.contentRegulation = this.flagBuyItaku();
      }else if (this.buy_sell_cls == 1 && this.flagSellItaku()) {
        this.showModalRegulation = true;
        this.contentRegulation = this.flagSellItaku();
      } else {
        this.cAPIEditOrder(params).then(() => {
          if (this.dataEditOrder) {
            const dataEncrypt = commonJs.aesEncrypt(JSON.stringify(params));
            const resAPIEncrypt = commonJs.aesEncrypt(
              JSON.stringify(this.dataEditOrder)
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
      }
    },

    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    cashFormatter(cash, val) {
      return commonJs.cashFormatter(cash, val);
    },
    handNumFloat(number, decimals) {
      return commonJs.handNumFloat(number, decimals);
    },
  },
};
