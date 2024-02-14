import { mapMutations, mapGetters } from "vuex";
import appLayout from "@/components/layout/appLayout";
import popupNetwork from "@/components/common/popup/popupNetwork";

export default {
  name: "App",
  data() {
    return {
      onLine: navigator.onLine,
    };
  },
  components: {
    appLayout,
    popupNetwork,
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeUnmount() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  methods: {
    ...mapMutations("common", [
      "initProcessEnv",
      "setWebSocketUS",
      "setWebSocketJP",
    ]),
    ...mapGetters("common", ["processEnv", "branchDivision"]),
    getProcessEnv() {
      let processEnv = process.env;
      let result = {};
      if (processEnv && Object.keys(processEnv).length > 0) {
        Object.keys(processEnv).forEach((key) => {
          result[key] = processEnv[key];
        });
      }
      return result;
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    },
    retry() {
      this.onLine = navigator.onLine;
    },
  },
  created() {
    let processEnv = this.getProcessEnv();
    this.initProcessEnv(processEnv);
    this.setWebSocketUS(processEnv.VUE_APP_SOCKET_US);
    this.setWebSocketJP(processEnv.VUE_APP_SOCKET_JP);
  },
};
