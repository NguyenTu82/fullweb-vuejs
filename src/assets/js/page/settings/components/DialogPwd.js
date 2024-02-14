import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";

export default {
  name: "DialogPwd",
  props: ["formData", "API"],
  data() {
    return {
      changePasswrod: "",
      // HDH00005_01-404 変更するボタンの初期値：非活性 4桁未満の場合非活性 2022-10-04
      btnFlag: false,
    };
  },
  methods: {
    btnCancel() {
      this.$emit("btnCancel");
      this.changePasswrod = "";
    },
    // HDH00005_01-404 変更するボタンの初期値：非活性 4桁未満の場合非活性 2022-10-04
    isBtnFlag() {
      if (this.changePasswrod === '****' || this.changePasswrod.length < 4) {
        this.btnFlag = false
      } else {
        this.btnFlag = true;
      }
    },
    btnOK() {
      if (!this.btnFlag) return;
      let data = {
        ...this.formData,
        SECRET: commonJs.hashPwd(this.changePasswrod),
      };
      console.log("DialogPwd.js >> btnOK formData", this.formData);
      console.log("DialogPwd.js >> btnOK API", this.API);
      console.log("DialogPwd.js >> btnOK data", data);
      if (!this.API) {
        httpRequest
          .post("/user/ekyc_url", data)
          .then((res) => {
            console.log(res);
            if (res.data.STATUS === "OK" && res.data.DATA.URL) {
              this.$router.push({
                path: "/eKYC",
                query: {
                  URL: res.data.DATA.URL,
                },
              });
            } else if (res.status == 200 && res.data.STATUS == "NG") {
              this.$emit('btnCancel')
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.API == "/user/withdraw_send_verify_code") {
        httpRequest
          .post(this.API, data)
          .then((res) => {
            console.log(res);
            if (res.status == 200 && !res.data.ERROR) {
              const dataBank = JSON.stringify({ data: this.formData, password: commonJs.hashPwd(this.changePasswrod) });
              sessionStorage.setItem("dataBank", dataBank)
              this.$router.push('/confirm2')
            } else if (res.status == 200 && res.data.STATUS == "NG") {
              this.$emit('btnCancel')
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        httpRequest
          .post(this.API, data)
          .then((res) => {
            console.log(res);
            if (res.status == 200 && res.data.STATUS == "OK") {
              this.$router.push("/account");
            } else if (res.status == 200 && res.data.STATUS == "NG") {
              this.$emit('btnCancel')
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
