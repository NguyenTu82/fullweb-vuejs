import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["UPDATE_CASH_IN_FINISH"]),
    goBind() {
      localStorage.setItem("BindPage", "realTime");
      this.$router.replace({ name: "BankAccountRegist" });
    },
  },
};
