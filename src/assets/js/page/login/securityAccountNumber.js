import { mapGetters, mapActions } from "vuex";
export default {
  title: "ログイン画面-2",
  name: "InputSecurityAccountNumber",
  components: {},
  data() {
    return {
      loginId: "",
      showPassword: 0,
    };
  },
  methods: {
    ...mapActions(["verifySecurityAccountNumberApi"]),
    inputLoginId() {
      this.loginId = this.loginId.slice(0, 15).replace(/[^\d]/g, "");
    },
    handleSend() {
      if (this.isOver) {
        this.submitCode();
      }
    },
    submitCode() {
      this.verifySecurityAccountNumberApi({
        SECURITY_ACCOUNT_NUMBER: this.loginId,
      }).then(() => {
        if (this.dataSecurityAccountNumber.STATUS === "OK") {
          localStorage.setItem("login3Flag", "true");
          this.$router.push({ name: "TradePwd" });
        } else if (this.dataSecurityAccountNumber.ERROR.CODE == "E103-0304") {
          localStorage.setItem("login3Flag", "true");
          this.$router.push({ name: "TradePwd" });
        }
      });
    },
  },
  computed: {
    ...mapGetters(["dataSecurityAccountNumber"]),
    isOver() {
      let len = this.loginId.length;
      if (10 < len) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    if (
      !this.$store.getters.currentUser ||
      localStorage.getItem("login2Flag") != "true"
    ) {
      this.$router.replace({ path: "/" });
    } else if (
      this.$store.getters.currentUser.DATA.USER.IS_SECRET_CONFIGURED == 1
    ) {
      this.$router.push({ name: "Home" });
    }
  },
};
