import { mapGetters, mapMutations, mapActions } from "vuex";
import TopInfo from "@/components/common/TopInfo";
import moment from "moment";
import Model from "@/components/common/dialog/Caution";
import commonJs from "@/assets/js/common/common";

export default {
  title: "[買] 米国株式",
  name: "BuyConfirm",
  data() {
    return {
      principalBuy: {},
      brandInfo: {},
      order_timer_limit: 5,
      modelShow: false,
      exchangeRate: 0,
      brandId: 0,
      orderBuyData: {},
      buyConfirmData: {},
    };
  },
  components: {
    TopInfo,
    Model,
  },
  computed: {
    ...mapGetters([
      "getOrderInput",
      "getOrderBuyConfirm",
      "getOrderBuyData",
      "getOrderBuyData",
      "currentUser",
      "getOrderBuyAccepted",
    ]),
  },
  methods: {
    ...mapActions(["orderBuyConfirm", "orderBuyAccepted"]),
    ...mapMutations([]),
    async pageInit() {
      const infoData = this.getOrderInput.DATA || {};
      this.principalBuy = infoData.PRINCIPAL_BUY || {};
      this.brandInfo = infoData.BRAND_INFO || {};
      this.orderBuyData = this.getOrderBuyData;
      this.orderBuyConfirm({
        BRAND_ID: this.brandInfo.BRAND_ID,
        ACCOUNT_TYPE: 2,
        TRANSACTION_TYPE: 2,
        PAYMENT_ID: 1,
        ORDER_METHOD: this.orderBuyData.selectedMethods,
        ORDER_AMOUNT: this.orderBuyData.num,
        ACCOUNT_PURPOSE_TYPE: 1,
        SECRET: this.orderBuyData.tradepwd,
      }).then(() => {
        if (this.getOrderBuyConfirm.STATUS == "OK") {
          this.buyConfirmData = this.getOrderBuyConfirm.DATA || {};
          this.exchangeRate = this.buyConfirmData.ORDER_EXCHANGE_RATE || 0;
        } else {
          this.$router.go(-1);
        }
      });
    },
    getCurrentTime() {
      return moment().format("YYYY/MM/DD HH:mm");
    },
    goToBuy() {},
    closeModal() {
      this.$router.go(-1);
      // this.pageInit().then(() => {
      //   this.modelShow = false;
      //   this.order_timer_limit = 5;
      // });
    },
    sureBuy() {
      this.orderBuyData = this.getOrderBuyData;
      const payload = {
        BRAND_ID: this.brandInfo.BRAND_ID,
        USER_SEQ_NO: this.currentUser.DATA.USER.USER_SEQ_NO,
        ACCOUNT_PURPOSE_TYPE: 1,
        PRINCIPAL_BUY_DATA: {
          ORDER_METHOD: this.orderBuyData.selectedMethods,
          ORDER_EXCHANGE_RATE: this.exchangeRate,
          ORDER_PRICE: this.principalBuy.BUY_PRICE,
          ORDER_AMOUNT: this.orderBuyData.num,
          ORDER_UUID: this.buyConfirmData.ORDER_UUID,
        },
        TRANSACTION_TYPE: 2,
        SECRET: this.orderBuyData.tradepwd,
      };
      this.orderBuyAccepted(payload).then(() => {
        if (this.getOrderBuyAccepted.STATUS == "OK") {
          this.$router.push({ name: "UsBuyResult" });
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
