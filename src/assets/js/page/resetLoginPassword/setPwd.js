import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      title: "パスワード再設定",
      formData: [
        {
          id: 1,
          title: "新しいログインパスワード",
          type: "password",
          value: "",
          showMsg: false,
          msg: "エラー提示文言はいる",
        },
        {
          id: 2,
          title: "新しいログインパスワード（確認）",
          type: "password",
          value: "",
          showMsg: false,
          msg: "エラー提示文言はいる",
        },
      ],
    };
  },
  mounted() {
    this.getStartPwd();
  },
  computed: {
    ...mapGetters(["getResetLoginPassSubmitData"]),

    pwdValue() {
      return this.formData[0].value;
    },
    surepwdValue() {
      return this.formData[1].value;
    },
    pwdTrue() {
      return (
        this.formData[0].value &&
        this.formData[0].showMsg === false &&
        this.formData[1].value &&
        this.formData[1].showMsg === false
      );
    },
  },
  watch: {
    pwdValue() {
      this.handleCheckLogin(this.formData[0]);
    },
    surepwdValue() {
      this.handleCheckLogin(this.formData[1]);
    },
  },
  methods: {
    ...mapActions(["resetLoginPwdSubmitApi"]),

    handleCheckLogin(item) {
      const reg = constant.pwdreg;
      if (reg.test(item.value)) {
        item.showMsg = false;
      } else {
        item.showMsg = true;
        item.value
          ? (item.msg = "パスワードの形式は正しくありません")
          : (item.msg = "入力してください");
      }
    },
    getStartPwd() {
      const pwd = commonJs.getLocalData("loginPwd");
      pwd &&
        (this.formData = this.formData.map((item) => {
          item.value = pwd;
          return item;
        }));
    },

    jumpNext() {
      if (this.pwdTrue) {
        this.handleCheckLogin(this.formData[0]);
        this.handleCheckLogin(this.formData[1]);
        if (
          this.formData[0].showMsg === false &&
          this.formData[1].showMsg === false
        ) {
          this.errorFormat();
          if (this.formData[1].showMsg === false) this.handleSuccess();
        }
      }
    },

    handleSuccess() {
      this.submitEdit();
    },

    submitEdit() {
      const hashCode = commonJs.getLocalData("hashCode");
      const emailValue = commonJs.getLocalData("rstLoginPass").EMAIL;

      this.resetLoginPwdSubmitApi({
        EMAIL: emailValue,
        VERIFY_CODE: hashCode.join(""),
        PASSWORD: commonJs.hashPwd(this.formData[1].value),
      }).then(() => {
        if (this.getResetLoginPassSubmitData.STATUS === "OK") {
          localStorage.removeItem("hashCode");
          localStorage.removeItem("rstLoginPass");
          this.$router.push({ name: "ResetLoginPwdComplete" });
        }
      });
    },
    showAlertTips(text) {
      this.$store.commit("editMsg", {
        isShow: true,
        text: text,
        type: "prompt",
      });
    },

    errorFormat() {
      const status = this.formData[0].value === this.formData[1].value;
      this.formData[1].showMsg = !status;
      this.formData[1].msg = status ? "" : "パスワードが一致しません";
    },
    changeType(item) {
      item.type = item.type === "password" ? "text" : "password";
      this.formData = { ...this.formData };
    },
  },
};
