import { mapGetters, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
export default {
  title: "ログイン画面-3",
  name: "TradePwd",
  components: {},
  data() {
    return {
      formdata: [
        {
          id: 1,
          title: "取引暗証番号",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
        {
          id: 2,
          title: "取引暗証番号（確認）",
          value: "",
          showPassword: 0,
          showmsg: false,
          msg: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["inputTradePwdApi", "getUser"]),
    inputLoginId1() {
      this.formdata[0].value = this.formdata[0].value
        .slice(0, 4)
        .replace(/[^\d]/g, "");
    },
    inputLoginId2() {
      this.formdata[1].value = this.formdata[1].value
        .slice(0, 4)
        .replace(/[^\d]/g, "");
    },
    handleCheck(item) {
      let reg = /^[0-9]{4}$/;
      if (reg.test(item.value)) {
        item.showmsg = false;
        if (this.formdata[0].value && this.formdata[1].value) {
          let status = this.formdata[0].value == this.formdata[1].value;
          this.formdata[1].showmsg = status ? false : true;
          this.formdata[1].msg = status ? "" : "取引暗証番号が一致しません";
        }
      } else {
        item.showmsg = true;
        item.value
          ? (item.msg = "半角数字4桁を設定してください")
          : (item.msg = "入力してください");
      }
    },
    jumpNext() {
      if (this.isOver) {
        this.handleCheck(this.formdata[0]);
        this.handleCheck(this.formdata[1]);

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
      this.inputTradePwdApi({
        OLD_SECRET: "",
        NEW_SECRET: commonJs.hashPwd(this.formdata[1].value),
      }).then(() => {
        if (this.dataTradePwd.STATUS === "OK") {
          localStorage.setItem("login2Flag", "false");
          localStorage.setItem("login3Flag", "false");
          this.$router.push({ name: "Home" }).then(() => {
            this.getUser({ apiType: constant.API_TYPE.COMMON }).then(() => {
              this.listInCard = [
                {
                  title: "振込元金融機関",
                  value: "三菱UFJ銀行",
                },
                {
                  title: "証券口座名義",
                  value: this.$store.getters.cashInUserInfo,
                },
              ];
              localStorage.setItem(
                "listInCard",
                JSON.stringify(this.listInCard)
              );
            });
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters(["dataTradePwd"]),
    pwdNewValue() {
      return this.formdata[0].value;
    },
    surepwdValue() {
      return this.formdata[1].value;
    },
    isOver() {
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
    pwdNewValue() {
      this.handleCheck(this.formdata[0]);
    },
    surepwdValue() {
      this.handleCheck(this.formdata[1]);
    },
  },
  created() {
    if (!this.$store.getters.currentUser) {
      this.$router.replace({ path: "/" });
    } else if (
      this.$store.getters.currentUser.DATA.USER.IS_SECRET_CONFIGURED == 1
    ) {
      this.$router.push({ name: "Home" });
    } else if (localStorage.getItem("login3Flag") != "true") {
      this.$router.push({ name: "InputSecurityAccountNumber" });
    }
  },
};
