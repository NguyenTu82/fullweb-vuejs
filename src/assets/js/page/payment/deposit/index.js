import TabItem from "@/views/payment/deposit/components/tabItem";
import TopInfoItem from "@/views/payment/deposit/components/topInfoItem";
import TabRealTimeCashIn from "@/views/payment/deposit/components/tabRealTimeCashIn";
import TabTransferCashIn from "@/views/payment/deposit/components/tabTransferCashIn";
import { mapGetters, mapMutations, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import TabContent from "@/views/payment/components/tabContent";
export default {
  name: "Deposit",
  components: {
    TabContent,
    TabItem,
    TopInfoItem,
    TabRealTimeCashIn,
    TabTransferCashIn,
  },
  data() {
    return {
      errors: "",
    };
  },
  computed: {
    ...mapGetters(["depositCurrentTab", "showResult", "getpaymentProcess"]),
    breadName() {
      if (this.depositCurrentTab == 1) {
        document.title = 'リアルタイム入金';
        return "リアルタイム入金";
      } else if (this.depositCurrentTab == 2) {
        document.title = '振込入金';
        return "振込入金";
      }
      return "";
    },
  },
  methods: {
    ...mapMutations(["UPDATE_CASH_IN_FINISH", "UPDATE_CASH_IN_STATE"]),
    ...mapActions(["setCashInUserInfo", "paymentRealtimeProcess"]),
  },
  created() {
    if (!this.showResult) this.UPDATE_CASH_IN_FINISH(0);
    // this.setCashInUserInfo();
  },
  mounted() {
    commonJs.moveUp();
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      // vm.comeFromOver(from);
      vm.setCashInUserInfo();

      if (from.name == "RealTimeCashInPwd") {
        vm.UPDATE_CASH_IN_STATE({
          stateName: "realTimeBindState",
          stateValue: 1,
        });
        vm.UPDATE_CASH_IN_STATE({
          stateName: "realTimeCashInState",
          stateValue: 1,
        });
      }
      vm.$refs.realtime.getInfo();
    });
  },
};
