import CountDown from "@/components/button/countDown";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "取引暗証番号の再設定｜CHEER証券",
  name: "TradePassResetCode",
  components: {
    CountDown,
    TopInfo,
  },
  data() {
    return {
      codeData: ["", "", "", ""],
      emailValue: "",
      inputOver: false,
      showtimer: false,
      timercount: "",
      timer: null,
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPMAIL: constant.HELPMAIL,
    };
  },
  computed: {
    ...mapGetters(["dataResetTradePwdCode"]),
    ...mapGetters(["dataResetTradePwd"]),
    ctSize() {
      return this.codeData.length;
    },
  },
  mounted() {
    let getAgainCodeTimeM150 = commonJs.getLocalData("getAgainCodeTimeM150");
    if (getAgainCodeTimeM150) {
      let now = moment().format("YYYY/MM/DD HH:mm:ss");
      let diffSeconds = moment(now).diff(moment(getAgainCodeTimeM150)) / 1000;
      if (diffSeconds <= 60) {
        this.$refs.countdownCom.getCode(diffSeconds);
      }
    }
  },
  methods: {
    ...mapActions(["resetTradePwdCodeApi"]),
    ...mapActions(["resetTradePwdApi"]),
    onInput(e) {
      if (!this.codeData[3]) {
        this.inputOver = false;
      }
      let tmp_value = e.target.value;
      if (tmp_value && !constant.reg.numberCase.test(tmp_value)) {
        e.target.value = tmp_value.replace(/[^0-9]/g, "");
        return;
      }
      this.onFocus();
      if (this.codeData[3]) {
        this.inputOver = true;
      }
    },
    onKeydown(val, index) {
      if (val == "") {
        if (index > 0) {
          this.codeData[index - 1] = "";
          this.$nextTick(() => {
            this.$refs.input[index - 1].focus();
          });
        }
      }
    },
    onFocus() {
      let index = this.codeData.findIndex((item) => item == "");
      index = (index + this.ctSize) % this.ctSize;
      this.$nextTick(() => {
        this.$refs.input[index].focus();
      });
    },
    getAgainCode() {
      let submitData = commonJs.getLocalData("resetTradePwdSaveLocalM150");
      this.resetTradePwdApi(submitData).then(() => {
        if (this.dataResetTradePwd.STATUS === "OK") {
          commonJs.saveLocalData(
            "getAgainCodeTimeM150",
            moment().format("YYYY/MM/DD HH:mm:ss")
          );
          this.$refs.countdownCom.getCode();
          store.commit("showPopup", {
            isShow: true,
            text: "再度送付しました",
            btnName: "OK",
          });
        }
      });
    },
    handleSend() {
      const emailCode = this.codeData.join("");
      this.resetTradePwdCodeApi({
        REQUEST_TYPE: 4,
        EMAIL: this.$store.getters.currentUser.DATA.USER.EMAIL,
        VERIFY_CODE: emailCode,
        UPDATE_VERIFY_STATUS: 0,
      }).then(() => {
        if (this.dataResetTradePwdCode.STATUS === "OK") {
          commonJs.saveLocalData("tradeEmailCodeM150", emailCode);
          this.$router.push({ name: "TradePassResetNew" });
        }
      });
    },
  },
};
