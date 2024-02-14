import { mapGetters } from "vuex";
export default {
  props: ["errors"],
  name: "FirstCashIn",
  methods: {
    goBind() {
      localStorage.setItem("BindPage", "realTime");
      this.$router.replace({ name: "BankAccountRegist" });
    },
  },
  computed: {
    ...mapGetters(["cashInData"]),
    bindAgain() {
      return this.cashInData.realTimeBindState == -1;
    },
  },
};
