import CountDown from "@/components/button/countDown";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  components: {
    CountDown,
  },
  data() {
    return {
      doneFlag: false,
      codeData: ["", "", "", ""],
      emailValue: "",
      showtimer: false,
      timercount: "",
      timer: null,
      nowFocusIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["getResetLoginPassData"]),
    ...mapGetters(["getResetLoginPassCodeData"]),
    ctSize() {
      return this.codeData.length;
    },
    lock() {
      const { codeData } = this;
      let num = 0;
      codeData.forEach((item) => {
        if (item) {
          num += 1;
        }
      });
      if (num == 4) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    let getAgainCodeTime = commonJs.getLocalData("getAgainCodeTime");
    if (getAgainCodeTime) {
      let now = moment().format("YYYY/MM/DD HH:mm:ss");
      let diffSeconds = moment(now).diff(moment(getAgainCodeTime)) / 1000;
      if (diffSeconds <= 60) {
        this.$refs.countdownCom.getCode(diffSeconds);
      }
    }
  },
  methods: {
    ...mapActions(["resetLoginPwdCodeApi"]),
    ...mapActions(["resetLoginPwdApi"]),
    onInput(val, index) {
      val = val.replace(/[^0-9]/g, '');
      if (index == this.ctSize - 1) {
        this.codeData[this.ctSize - 1] = val[0];        
      } else if (val.length > 1) {
        let i = index;
        for (i = index; i < this.ctSize && i - index < val.length; i++) {
          this.codeData[i] = val[i];
        }
        this.resetCaret();
      } else {
        this.codeData[index] = val;
      }
      this.onFocus();
    },
    resetCaret() {
      this.$nextTick(() => {
        this.$refs.input[this.ctSize - 1].focus();
      });
    },
    onFocus() {
      let index = this.codeData.findIndex((item) => item == "");
      index = (index + this.ctSize) % this.ctSize;
      this.$nextTick(() => {
        this.$refs.input[index].focus();
      });

      this.nowFocusIndex = index;
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
    getAgainCode() {
      let submitData = commonJs.getLocalData("rstLoginPass");
      this.resetLoginPwdApi(submitData).then(() => {
        if (this.getResetLoginPassData.STATUS === "OK") {
          commonJs.saveLocalData(
            "getAgainCodeTime",
            moment().format("YYYY/MM/DD HH:mm:ss")
          );
          this.$refs.countdownCom.getCode();
          store.commit("showPopup", {
            isShow: true,
            text: "再度送信しました。",
            btnName: "OK",
          });
        }
      });
    },
    handleSend() {
      let submitData = commonJs.getLocalData("rstLoginPass");
      this.resetLoginPwdCodeApi({
        REQUEST_TYPE: 1,
        EMAIL: submitData.EMAIL,
        VERIFY_CODE: this.codeData.join(""),
        UPDATE_VERIFY_STATUS: 0,
      }).then(() => {
        if (this.getResetLoginPassCodeData.STATUS === "OK") {
          commonJs.saveLocalData("hashCode", this.codeData);
          this.$router.push({ name: "ResetLoginPwdInput" });
          this.doneFlag = true;
        }
      });
    },
  },
};
