import { mapGetters, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

import TopInfo from "@/components/common/TopInfo";
export default {
  title: "取引暗証番号の再設定｜CHEER証券",
  name: "TradePassResetNew",
  components: {
    TopInfo,
  },
  data() {
    return {
      doneFlag: false,
      formdata: [
        {
          id: 1,
          title: "新しい取引暗証番号",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
        {
          id: 2,
          title: "新しい取引暗証番号（確認）",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
      ],
    };
  },

  methods: {
    ...mapActions(["resetTradePwdNewApi"]),
    format(val) {
      if (!val) {
        return "";
      }
      const replaced = val.replace(/\D/g, "");
      return replaced ? replaced : "";
    },
    handleCheckLogin(item) {
      let reg = /^[0-9]{4}$/;
      if (reg.test(item.value)) {
        item.showmsg = false;
        if (this.formdata[0].value && this.formdata[1].value) {
          let status = this.formdata[0].value == this.formdata[1].value;
          this.formdata[1].showmsg = status ? false : true;
          this.formdata[1].msg = status ? "" : "パスワードが一致しません";
        }
      } else {
        item.showmsg = true;
        item.value
          ? (item.msg = "パスワードの形式は正しくありません")
          : (item.msg = "入力してください");
      }
    },
    jumpNext() {
      if (this.pwdTrue) {
        this.handleCheckLogin(this.formdata[0]);
        this.handleCheckLogin(this.formdata[1]);

        let badformat = this.formdata.filter((item) => {
          return item.showmsg;
        });

        if (badformat.length == 0) {
          let successStatus = this.formdata.every((item) => {
            return !item.showmsg;
          });

          successStatus && this.handleSuccess();
        }
      }
    },
    handleSuccess() {
      this.resetTradePwdNewApi({
        VERIFY_CODE: commonJs.getLocalData("tradeEmailCodeM150"),
        SECRET: commonJs.hashPwd(this.formdata[1].value),
      }).then(() => {
        if (this.dataResetTradePwdNew.STATUS === "OK") {
          this.doneFlag = true;
        }
      });
    },
    resetCode() {
      this.$router.push({ name: "TradePassResetCode" });
    },
  },
  computed: {
    ...mapGetters(["dataResetTradePwdNew"]),
    pwdNewValue() {
      return this.formdata[0].value;
    },
    surepwdValue() {
      return this.formdata[1].value;
    },
    pwdTrue() {
      let status = this.formdata.every((item) => {
        if (item.value && item.showmsg == false) {
          return true;
        } else {
          return false;
        }
      });
      return status;
    },
  },
  watch: {
    pwdNewValue(newValue, oldValue) {
      if (
        constant.reg.numberCase.test(newValue) ||
        constant.reg.numberCase.test(oldValue)
      ) {
        this.handleCheckLogin(this.formdata[0]);
      }
    },
    surepwdValue(newValue, oldValue) {
      if (
        constant.reg.numberCase.test(newValue) ||
        constant.reg.numberCase.test(oldValue)
      ) {
        this.handleCheckLogin(this.formdata[1]);
      }
    },
  },
};
