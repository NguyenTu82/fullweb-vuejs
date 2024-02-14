import TopInfoItem from "@/views/payment/deposit/components/topInfoItem";
import { mapGetters, mapMutations } from "vuex";
import commonJs from "@/assets/js/common/common";

export default {
  title: "リアルタイム入金",
  name: "realtimeDeposit",
  components: {
    TopInfoItem,
  },
  data() {
    return {
      prevRoute: null,
    };
  },
  computed: {
    ...mapGetters(["getBackPage"]),
    ...mapGetters("cashOutAmountNCB", ["getIsWithdrawPage"]),
    BANK_NAME() {
      return commonJs.bankName();
    },
  },
  methods: {
    ...mapMutations(["UPDATE_BACK_PAGE"]),
    goBack() {
      // TODO: 遷移元が「L003 ログイン画面（初回）-3」場合 A000 トップ画面
      // if(this.prevRoute.path == '/home') {
      //   this.$router.push({ name: 'Home' });
      // } else {
      // this.$router.push({ name: 'Deposit' });
      // }
      let backPage = this.getIsWithdrawPage
        ? { name: "PaymentWithdrawal" }
        : { name: "Deposit" };
      console.log("realtime-2.js goBack 11 >> backPage=", backPage);
      if (this.getBackPage) {
        backPage = this.getBackPage;
        this.UPDATE_BACK_PAGE("");
      }
      console.log("realtime-2.js goBack 22 >> backPage=", backPage);
      this.$router.push(backPage);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
};
