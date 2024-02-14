import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["UPDATE_CASH_IN_FINISH"]),
    jumpList() {
      this.UPDATE_CASH_IN_FINISH(0);
      this.$router.push({ name: "Deposit" });
    },
  },
};
