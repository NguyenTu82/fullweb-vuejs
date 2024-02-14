export default {
  name: "SellModal",
  props: ["brandInfor"],
  data() {
    return {
      styleDisabled: "",
    };
  },
  methods: {
    closeSellModal() {
      this.$emit("closeSellModal");
    },

    disableButtonDecideAmount() {
      if (
        this.brandInfor["otc_sell_stop_flg"] === "0" &&
        (this.brandInfor["order_rcve_flg"] === "1" ||
          this.brandInfor["order_rcve_flg"] === "2")
      ) {
        return false;
      }
      this.styleDisabled = "background-color: #D6D8D8";
      return true;
    },

    goToSellStockJp(kind) {
      this.$router.push({
        name: "SellStockJP",
        query: {
          stock_cd: this.$route.query.stock_cd,
          exchange_cls: this.$route.query.exchange_cls,
          kind: kind,
        },
      });
    },
  },
};
