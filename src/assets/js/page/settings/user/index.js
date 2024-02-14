import TopInfo from "@/components/common/TopInfo";
export default {
  title: "アカウント・設定変更｜CHEER証券",
  name: "UserSetting",
  components: {
    TopInfo,
  },
  data() {
    return {};
  },
  methods: {
    changeLoginId() {
      this.$router.push({ name: "LoginIdChange" });
    },
    changeLoginPass() {
      this.$router.push({ name: "LoginPassChange" });
    },
    changeTradePass() {
      this.$router.push({ name: "TradePassChange" });
    },
    resetTradePass() {
      this.$router.push({ name: "TradePassReset" });
    },
    unlockTradePass() {
      this.$router.push({ name: "TradePassUnlock" });
    },
  },
};
