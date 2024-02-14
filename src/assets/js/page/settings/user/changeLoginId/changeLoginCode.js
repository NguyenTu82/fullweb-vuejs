import CountDown from "@/components/button/countDown";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "ログインIDの変更｜CHEER証券",
  name: "LoginIdChangeCode",
  components: {
    CountDown,
    TopInfo,
  },
  data() {
    return {
      doneFlag: false,
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
    ...mapGetters(["dataChangeLoginIdCode"]),
    ...mapGetters(["dataChangeLoginId"]),
    ctSize() {
      return this.codeData.length;
    },
  },
  mounted() {
    let getAgainCodeTimeM120 = commonJs.getLocalData("getAgainCodeTimeM120");
    if (getAgainCodeTimeM120) {
      let now = moment().format("YYYY/MM/DD HH:mm:ss");
      let diffSeconds = moment(now).diff(moment(getAgainCodeTimeM120)) / 1000;
      if (diffSeconds <= 60) {
        this.$refs.countdownCom.getCode(diffSeconds);
      }
    }
  },
  methods: {
    ...mapActions(["changeLoginIdCodeApi"]),
    ...mapActions(["changeLoginIdApi"]),
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
      let submitData = commonJs.getLocalData("loginIdSaveLocalM120");
      this.changeLoginIdApi(submitData).then(() => {
        if (this.dataChangeLoginId.STATUS === "OK") {
          commonJs.saveLocalData(
            "getAgainCodeTimeM120",
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
      let submitData = commonJs.getLocalData("loginIdSaveLocalM120");
      this.changeLoginIdCodeApi({
        EMAIL: submitData.NEW_EMAIL,
        VERIFY_CODE: this.codeData.join(""),
      }).then(() => {
        if (this.dataChangeLoginIdCode.STATUS === "OK") {
          this.doneFlag = true;
        }
      });
    },
  },
};
