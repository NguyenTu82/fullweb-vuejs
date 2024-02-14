import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";

export default {
  title: "ログインIDの変更｜CHEER証券",
  name: "LoginIdChange",
  components: {
    TopInfo,
  },
  data() {
    return {
      formdata: [
        {
          id: 1,
          title: "現在のログインID（メールアドレス）",
          value: "",
          type: "text",
          placeholder: "mail@mail.com",
          showmsg: false,
          msg: "",
        },
        {
          id: 2,
          title: "新しいログインID（メールアドレス）",
          value: "",
          type: "text",
          placeholder: "mail@mail.com",
          showmsg: false,
          msg: "",
        },
        {
          id: 3,
          title: "新しいログインID（確認）",
          value: "",
          type: "text",
          placeholder: "新しいログインIDを入力してください",
          showmsg: false,
          msg: "",
        },
        {
          id: 4,
          title: "取引暗証番号",
          value: "",
          type: "password",
          placeholder: "****",
          showmsg: false,
          msg: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["dataChangeLoginId"]),
    mailValue() {
      return this.formdata[0].value;
    },
    mailNewValue() {
      return this.formdata[1].value;
    },
    suremailValue() {
      return this.formdata[2].value;
    },
    mailTrue() {
      let status = this.formdata.every((item) => {
        if (item.value) {
          return true;
        } else {
          return false;
        }
      });
      return status;
    },
  },
  watch: {
    mailValue() {
      this.emailInputChange(this.formdata[0]);
    },
    mailNewValue() {
      this.emailInputChange(this.formdata[1]);
    },
    suremailValue() {
      this.emailInputChange(this.formdata[2]);
    },
  },
  methods: {
    ...mapActions(["changeLoginIdApi"]),
    format(val) {
      if (!val) {
        return "";
      }
      const replaced = val.replace(/\D/g, "");
      return replaced ? replaced : "";
    },
    emailInputChange(item) {
      if (commonJs.VerifyEmail(item.value)) {
        item.showmsg = false;
      } else {
        item.showmsg = true;
        item.msg = "メールアドレスの形式になっていません。";
      }
    },
    judgeMail() {
      if (this.formdata[0].value == this.formdata[1].value) {
        store.commit("showPopup", {
          isShow: true,
          text: "現在の登録内容と同じ内容です。",
          btnName: "OK",
        });
      } else if (this.formdata[1].value != this.formdata[2].value) {
        store.commit("showPopup", {
          isShow: true,
          text: "確認用メールアドレスと新しいメールアドレスが一致しません",
          btnName: "OK",
        });
      } else return this.handleSuccess();
    },
    handleSuccess() {
      let submitData = {
        OLD_EMAIL: this.formdata[0].value,
        NEW_EMAIL: this.formdata[1].value,
        SECRET: commonJs.hashPwd(this.formdata[3].value),
      };
      commonJs.saveLocalData("loginIdSaveLocalM120", submitData);
      this.changeLoginIdApi(submitData).then(() => {
        if (this.dataChangeLoginId.STATUS === "OK") {
          this.$router.push({ name: "LoginIdChangeCode" });
        }
      });
    },
    userSetting() {
      this.$router.push({ name: "UserSetting" });
    },
  },
};
