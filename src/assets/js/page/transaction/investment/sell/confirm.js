import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";

export default {
  components: {
    TopInfo,
  },
  props: {},
  data() {
    return {
      inv_trust_assoc_cd: null,
      amount_cls: null,
      order_qty: null,
      dividend_handling_cls: null,
      password: null,
      datas: {},
      ord_check_no: "",
      actualNum: "",
    };
  },
  created() {
    this.inv_trust_assoc_cd = this.$route.query.inv_trust_assoc_cd || "";
    this.dividend_handling_cls = this.$route.query.dividend_handling_cls || "";
    this.amount_cls = this.$route.query.amount_cls || "";
    this.order_qty = this.$route.query.order_qty || "";
    this.password = this.$route.query.password || "";
    this.actualNum = this.$route.query.actualNum || "";
    this.handleSellOrderConfirmation().then((res) => {
      if (res.STATUS == "OK") {
        this.datas = res.DATA;
      }
    });
  },
  methods: {
    async handleSellOrderConfirmation() {
      const param = {
        inv_trust_assoc_cd: this.inv_trust_assoc_cd,
        dividend_handling_cls: this.dividend_handling_cls,
        account_cls: this.$route.query.account_cls || "2",
        amount_cls: this.$route.query.amount_cls,
        order_qty: this.order_qty,
        password: this.password,
      };
      return await this.$store
        .dispatch("handleSellOrderConfirmation", param)
        .then((res) => {
          return res;
        });
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    async handleInvSellOrderRegistrationController() {
      const param = {
        inv_trust_assoc_cd: this.inv_trust_assoc_cd,
        dividend_handling_cls: this.datas.order_dividend_handling_cls,
        account_cls: this.$route.query.account_cls || "2",
        amount_cls: this.amount_cls,
        order_qty: this.order_qty,
        appl_d: this.datas.appl_d,
        ord_check_no: this.datas.ord_check_no,
      };
      await this.$store
        .dispatch("handleInvSellOrderRegistrationController", param)
        .then((res) => {
          if (res.STATUS == "OK") {
            this.handleRedirectSellComplete();
          }
        });
    },
    handleRedirectSellComplete() {
      this.$router.push({
        path: "/transaction/investment/sell/complete",
        query: {
          name: this.datas.fund_abb_nm,
          sellBuyCls: 1,
          confirmCanelBuySuccess: false,
        },
      });
    },
    handleBackSellOrder() {
      this.$router.push({
        path: "/transaction/investment/sell",
        query: {
          inv_trust_assoc_cd: this.inv_trust_assoc_cd,
          dataPopupDividendCls: this.dividend_handling_cls,
          order_qty: this.order_qty,
          amount_cls: this.amount_cls,
          actualNum: this.actualNum,
        },
      });
    },
  },
};
