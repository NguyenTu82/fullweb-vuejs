import commonJs from "@/assets/js/common/common";

export default {
  props: ["open", "stockHandleType"],
  data() {
    return {
      reinvest: "/assets/images/coin.png",
      receive: "/assets/images/hand.png",
      popupDatas: [],
      showOptionPanel: false,
    };
  },
  watch: {
    stockHandleType: function (newHandleType) {
      this.createPopup(newHandleType);
    },
  },
  methods: {
    createPopup(newHandleType) {
      switch (newHandleType) {
        case "BUY":
          this.popupDatas = [
            {
              id: "B1",
              title: "分配金受取型を購入",
              description: "分配金を預り金へ入金します",
              dividend_cls: "1",
              image: this.reinvest,
            },
            {
              id: "B2",
              title: "分配金再投資型を購入",
              description: "分配金でファンドを自動買付します",
              dividend_cls: "2",
              image: this.receive,
            },
          ];
          break;
        case "SELL":
          this.popupDatas = [
            {
              id: "S1",
              title: "分配金再投資型を売却",
              description: "",
              dividend_cls: "2",
              image: this.reinvest,
            },
            {
              id: "S2",
              title: "分配金受取型を売却",
              description: "",
              dividend_cls: "1",
              image: this.receive,
            },
          ];
          break;
        default:
          break;
      }
    },
    openHandle() {
      commonJs.disableScrollOnDocument();
    },
    closeHandle() {
      this.$emit("hidePopup");
      commonJs.enableScrollOnDocument();
    },
    handleClick(dividend_cls) {
      this.$emit("handleClickPopupData", dividend_cls);
    },
  },
};
