import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "ログインパスワードの変更｜CHEER証券",
  name: "LoginPassChange",
  components: {
    TopInfo,
  },
  data() {
    return {
      doneFlag: false,
      formdata: [
        {
          id: 1,
          title: "現在のログインパスワード",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
        {
          id: 2,
          title: "新しいログインパスワード",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
        {
          id: 3,
          title: "新しいログインパスワード（確認）",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
      ],
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      RESETPASSWORD: constant.RESETPASSWORD,
    };
  },

  methods: {
    ...mapActions(["changeLoginPwdApi"]),
    handleCheckLogin(item) {
      let reg = constant.reg.pwdregApp;
      if (reg.test(item.value)) {
        item.showmsg = false;
        if (this.formdata[1].value && this.formdata[2].value) {
          let status = this.formdata[1].value == this.formdata[2].value;
          this.formdata[2].showmsg = status ? false : true;
          this.formdata[2].msg = status ? "" : "パスワードが一致しません。";
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
          text: "以前と同じ内容のため、変更となりません。",
          btnName: "OK",
        });
      } else {
        return this.handleSuccess();
      }
    },
    handleSuccess() {
      this.changeLoginPwdApi({
        OLD_PASSWORD: commonJs.hashPwd(this.formdata[0].value),
        NEW_PASSWORD: commonJs.hashPwd(this.formdata[1].value),
      }).then(() => {
        if (this.dataChangeLoginPwd.STATUS === "OK") {
          this.doneFlag = true;
        }
      });
    },
    userSetting() {
      this.$router.push({ name: "UserSetting" });
    },
  },
  computed: {
    ...mapGetters(["dataChangeLoginPwd"]),
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
    pwdValue() {
      this.handleCheckLogin(this.formdata[0]);
    },
    pwdNewValue() {
      this.handleCheckLogin(this.formdata[1]);
    },
    surepwdValue() {
      this.handleCheckLogin(this.formdata[2]);
    },
  },
};
