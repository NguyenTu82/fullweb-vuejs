export default {
  name: "BuyModal",
  props: ["brandInfor"],
  data() {
    return {
      styleDisabled: "",
    };
  },
  methods: {
    closeBuyModal() {
      this.$emit("closeBuyModal");
    },

    disableButtonDecideAmount() {
      if (
        this.brandInfor["otc_buy_stop_flg"] === "0" &&
        (this.brandInfor["order_rcve_flg"] === "1" ||
          this.brandInfor["order_rcve_flg"] === "2")
      ) {
        return false;
      }
      this.styleDisabled = "background-color: #D6D8D8";
      return true;
    },

    goToBuyStockJp(kind) {
      this.$router.push({
        name: "BuyStockJP",
        query: {
          stock_cd: this.$route.query.stock_cd,
          exchange_cls: this.$route.query.exchange_cls,
          kind: kind,
        },
      });
    },
  },
};
