import { mapActions, mapGetters, mapMutations } from "vuex";
import commonJs from "@/assets/js/common/common";

export default {
  title: "ログイン画面",
  name: "Login",
  components: {},
  data() {
    return {
      url: "https://www.cheer-sec.co.jp/other/app-help/login.html#id",
      form: {
        username: "",
        password: "",
      },
      errors: "",
      showPassword: 0,
      passwordReserve: commonJs.getDataBySecureLS("save_login_pass"),
      emailReserve: commonJs.getDataBySecureLS("save_login_id"),
      autoLogin: commonJs.getDataBySecureLS("auto_login"),
      disableAutoFlag:
        commonJs.getDataBySecureLS("save_login_pass") == 1 &&
        commonJs.getDataBySecureLS("save_login_id") == 1
          ? false
          : true,
      listInCard: [
        {
          title: "振込元金融機関",
          value: "三菱USJ銀行",
        },
        {
          title: "証券口座名義",
          value: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["LogIn", "getUser"]),
    ...mapMutations("common", ["setPageHeaderType", "setPageFooterType"]),
    ...mapMutations(["showPopup"]),

    validationLogin(username, password) {
      if (commonJs.isEmpty(username) || commonJs.isEmpty(password)) {
        this.showPopup({
          isShow: true,
          text: "ログインIDとパスワードを入力してください",
          btnName: "OK"
        })
        return false;
      }

      return true;
    },

    async login(username, password) {
      const requestBody = {
        USERNAME: username,
        PASSWORD: commonJs.hashPwd(password),
        AUTO_LOGIN: "1",
      };

      if (this.validationLogin(requestBody.USERNAME, requestBody.PASSWORD)) {
        try {
          await this.LogIn(requestBody);
          if (this.$store.getters.currentUser.STATUS == "OK") {
            commonJs.saveDataBySecureLS("save_login_id", this.emailReserve);
            commonJs.saveDataBySecureLS("save_login_pass", this.passwordReserve);
            commonJs.saveDataBySecureLS("auto_login", this.autoLogin);
            // Save username, password
            if (this.emailReserve == 1) {
              commonJs.saveDataBySecureLS("user_id", username);
            } else {
              commonJs.removeDataBySecureLS("user_id");
            }
            // Save password
            if (this.passwordReserve == 1) {
              commonJs.saveDataBySecureLS("user_pwd", password);
            } else {
              commonJs.removeDataBySecureLS("user_pwd");
            }

            // For first login, move to login 2 screen
            if (
                this.$store.getters.currentUser.DATA.USER.IS_SECRET_CONFIGURED == 1
            ) {
              this.$router.push({ name: "Home" }).then(() => {
                this.getUser().then(() => {
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
            } else {
              localStorage.setItem("login2Flag", "true");
              await this.$router.push({ name: "InputSecurityAccountNumber" });
            }
          } else {
            this.errors = this.$store.getters.currentUser.ERROR.MESSAGE;
          }
        } catch (error) {
          this.$store.commit("logout");
        }
      }
    },
    submit() {
      this.login(this.form.username, this.form.password);
    },
  },
  computed: {
    ...mapGetters("common", ["branchDivision"]),
    saveEmailValue() {
      return this.emailReserve;
    },
    savePassValue() {
      return this.passwordReserve;
    },
  },
  watch: {
    saveEmailValue() {
      if (this.emailReserve == 1 && this.passwordReserve == 1) {
        this.disableAutoFlag = false;
      } else {
        this.disableAutoFlag = true;
        this.autoLogin = 0;
      }
    },
    savePassValue() {
      if (this.emailReserve == 1 && this.passwordReserve == 1) {
        this.disableAutoFlag = false;
      } else {
        this.disableAutoFlag = true;
        this.autoLogin = 0;
      }
    },
  },
  created() {
    let accessTokenKey = commonJs.getAccessTokenKey();
    if (localStorage.getItem(accessTokenKey)) {
      this.$router.push({ name: "Home" });
    }

    // Autologin
    let autoLogin = commonJs.getDataBySecureLS("auto_login");
    let username = commonJs.getDataBySecureLS("user_id");
    let password = commonJs.getDataBySecureLS("user_pwd");
    let isLogout = this.$route.query.isLogout;

    if (autoLogin == 1 && isLogout != "true") {
      // Decrypt username and password, and do login
      if (username && password) {
        this.login(username, password);
      }
    } else if (username || password) {
      if (username) {
        this.form.username = username;
      }
      if (password) {
        this.form.password = password;
      }
    }
  },
};
