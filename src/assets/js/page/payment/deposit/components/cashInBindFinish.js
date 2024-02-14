import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["SET_CASH_IN_STATE"]),

    goCashIn() {
      this.SET_CASH_IN_STATE({
        stateName: "realTimeCashInState",
        stateValue: 1,
      });
    },
  },
};
