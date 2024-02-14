import { mapGetters, mapMutations, mapActions } from "vuex";
import TopInfo from "@/components/common/TopInfo";
import Model from "@/components/common/dialog/Caution";
import commonJs from "@/assets/js/common/common";

export default {
  title: "[売] 米国株式",
  name: "SellConfirm",
  data() {
    return {
      principalSell: {},
      brandInfo: {},
      order_timer_limit: 5,
      modelShow: false,
      exchangeRate: 0,
      brandId: 0,
      orderSellData: {},
      sellConfirmData: {},
    };
  },
  components: {
    TopInfo,
    Model,
  },
  computed: {
    ...mapGetters([
      "getOrderInput",
      "getOrderSellConfirm",
      "getOrderSellData",
      "currentUser",
      "getOrderSellAccepted",
    ]),
  },
  methods: {
    ...mapActions(["orderSellConfirm", "orderSellAccepted"]),
    ...mapMutations([]),
    async pageInit() {
      const infoData = this.getOrderInput.DATA || {};
      this.principalSell = infoData.PRINCIPAL_SELL || {};
      this.brandInfo = infoData.BRAND_INFO || {};
      this.orderSellData = this.getOrderSellData;
      this.orderSellConfirm({
        BRAND_ID: this.brandInfo.BRAND_ID,
        ACCOUNT_TYPE: 2,
        TRANSACTION_TYPE: 2,
        ACCOUNT_SEQ_NO: this.orderSellData.accountSeqNo,
        ORDER_METHOD: this.orderSellData.selectedMethods,
        ORDER_AMOUNT: this.orderSellData.num,
        ACCOUNT_PURPOSE_TYPE: 1,
        SECRET: this.orderSellData.tradepwd,
      }).then(() => {
        if (this.getOrderSellConfirm.STATUS == "OK") {
          this.sellConfirmData = this.getOrderSellConfirm.DATA || {};
          this.exchangeRate = this.sellConfirmData.ORDER_EXCHANGE_RATE || 0;
        } else {
          this.$router.go(-1);
        }
      });
    },
    closeModal() {
      this.$router.go(-1);
      // this.pageInit().then(() => {
      //   this.modelShow = false;
      //   this.order_timer_limit = 5;
      // });
    },
    sureSell() {
      const payload = {
        BRAND_ID: this.brandInfo.BRAND_ID,
        ACCOUNT_SEQ_NO: this.orderSellData.accountSeqNo,
        ACCOUNT_PURPOSE_TYPE: 1,
        PRINCIPAL_SELL_DATA: {
          ORDER_QTY: this.sellConfirmData.ORDER_QTY,
          ORDER_METHOD: this.orderSellData.selectedMethods,
          ORDER_PRICE: this.principalSell.SELL_PRICE,
          ORDER_AMOUNT: this.orderSellData.num,
          ORDER_UUID: this.sellConfirmData.ORDER_UUID,
        },
        TRANSACTION_TYPE: 2,
        SECRET: this.orderSellData.tradepwd,
      };
      this.orderSellAccepted(payload).then(() => {
        if (this.getOrderSellAccepted.STATUS == "OK") {
          this.$router.push({ name: "UsSellResult" });
        } else {
          this.$router.go(-1);
        }
      });
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },
    handNumFloat(number) {
      return commonJs.handNumFloat(number);
    },
    handNumberFloat(number) {
      return this.commonJs.handNumberFloat(number, 8);
    },
  },
  created() {
    this.pageInit();
  },
  watch: {
    order_timer_limit: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.order_timer_limit--;
          }, 1000);
        } else if (value == 0) {
          this.modelShow = true;
        }
      },
      immediate: true,
    },
  },
};
