import { mapGetters, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

import store from "@/store";
import TopInfo from "@/components/common/TopInfo";
export default {
  title: "取引暗証番号の変更｜CHEER証券",
  name: "TradePassChange",
  components: {
    TopInfo,
  },
  data() {
    return {
      doneFlag: false,
      formdata: [
        {
          id: 1,
          title: "現在の取引暗証番号",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
        {
          id: 2,
          title: "新しい取引暗証番号",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
        {
          id: 3,
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
    ...mapActions(["changeTradePwdApi"]),
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
        if (this.formdata[1].value && this.formdata[2].value) {
          let status = this.formdata[1].value == this.formdata[2].value;
          this.formdata[2].showmsg = status ? false : true;
          this.formdata[2].msg = status ? "" : "取引暗証番号が一致しません";
        }
      } else {
        item.showmsg = true;
        item.value
          ? (item.msg = "半角数字4桁を設定してください")
          : (item.msg = "入力してください");
      }
    },
    jumpNext() {
      if (this.pwdTrue) {
        this.handleCheckLogin(this.formdata[0]);
        this.handleCheckLogin(this.formdata[1]);
        this.handleCheckLogin(this.formdata[2]);

        let badformat = this.formdata.filter((item) => {
          return item.showmsg;
        });

        if (badformat.length == 0) {
          let successStatus = this.formdata.every((item) => {
            return !item.showmsg;
          });

          successStatus && this.judgePwd();
        }
      }
    },
    judgePwd() {
      if (this.formdata[0].value == this.formdata[1].value) {
        store.commit("showPopup", {
          isShow: true,
          text: "以前と同じ内容のため、変更となりません",
          btnName: "OK",
        });
      } else {
        return this.handleSuccess();
      }
    },
    handleSuccess() {
      this.changeTradePwdApi({
        OLD_SECRET: commonJs.hashPwd(this.formdata[0].value),
        NEW_SECRET: commonJs.hashPwd(this.formdata[1].value),
      }).then(() => {
        if (this.dataChangeTradePwd.STATUS === "OK") {
          this.doneFlag = true;
        }
      });
    },
    userSetting() {
      this.$router.push({ name: "UserSetting" });
    },
  },
  computed: {
    ...mapGetters(["dataChangeTradePwd"]),
    pwdValue() {
      return this.formdata[0].value;
    },
    pwdNewValue() {
      return this.formdata[1].value;
    },
    surepwdValue() {
      return this.formdata[2].value;
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
    pwdValue(newValue, oldValue) {
      if (
        constant.reg.numberCase.test(newValue) ||
        constant.reg.numberCase.test(oldValue)
      ) {
        this.handleCheckLogin(this.formdata[0]);
      }
    },
    pwdNewValue(newValue, oldValue) {
      if (
        constant.reg.numberCase.test(newValue) ||
        constant.reg.numberCase.test(oldValue)
      ) {
        this.handleCheckLogin(this.formdata[1]);
      }
    },
    surepwdValue(newValue, oldValue) {
      if (
        constant.reg.numberCase.test(newValue) ||
        constant.reg.numberCase.test(oldValue)
      ) {
        this.handleCheckLogin(this.formdata[2]);
      }
    },
  },
};
