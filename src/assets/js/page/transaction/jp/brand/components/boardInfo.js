import processEnvKey from "@/const/processEnvKey";
import commonJs from "@/assets/js/common/common";

export default {
  name: "BoardInfo",
  props: ["boardInfo", "offsetStrSell", "offsetStrBuy"],
  computed: {
    BINDING_COLOR() {
      switch (commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION)) {
        case "CHEER":
          return "text-green";
        case "NCB":
          return "text-orange";
        default:
          return "";
      }
    },
  },
};
