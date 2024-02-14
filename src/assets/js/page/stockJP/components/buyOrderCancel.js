import commonJs from "@/assets/js/common/common";

export default {
  data() {
    return {
      confirmData: {},
      name_stock: "",
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
      this.name_stock = `${this.confirmData.stock_nm} (${this.confirmData.stock_cd.toString().slice(0, 4)})`;
      this.exchangeClsNm = this.confirmData.exchange_cls_nm;
    },
    goToListOrder() {
      // go to Screen D410 注文一覧
      this.$router.push({
        name: "orderJp"
      });
    },
  },
};
