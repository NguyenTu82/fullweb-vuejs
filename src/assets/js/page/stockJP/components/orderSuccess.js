import commonJs from "@/assets/js/common/common";

export default {
  data() {
    return {
      confirmData: {},
      name_stock: "",
      title: "",
      content: "",
      buy_sell_cls: 3,
      t_edit: false,
      exchangeClsNm: ""
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getDataConfirm();
    });
  },
  methods: {
    getDataConfirm() {
      this.confirmData = commonJs.aesDecrypt(this.$route.query.data);
      this.confirmData = JSON.parse(this.confirmData);
      this.name_stock = `${
        this.confirmData.stock_nm
      } (${this.confirmData.stock_cd.toString().slice(0, 4)})`;
      this.buy_sell_cls = this.confirmData.buy_sell_cls;
      this.t_edit = !!this.confirmData.ord_no;
      this.exchangeClsNm = this.confirmData.exchange_cls_nm;
      if (this.buy_sell_cls == 3) {
        this.title = "[買] 国内株式";
        this.content = this.t_edit
          ? "注文訂正を受け付けました"
          : "買注文を受け付けました";
      } else {
        this.title = "[売] 国内株式";
        this.content = this.t_edit
          ? "注文訂正を受け付けました"
          : "売注文を受け付けました";
      }
    },
    goToListOrder() {
      // go to Screen D410 注文一覧
      this.$router.push({
        name: "orderJp"
      });
    },
  },
};
