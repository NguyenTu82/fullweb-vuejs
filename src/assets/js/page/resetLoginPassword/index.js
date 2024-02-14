import { mapGetters, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";

export default {
  components: {},
  data() {
    return {
      formData: [
        {
          title: "ログインID",
          modelVal: "",
          type: "text",
          isNumberType: false,
          placeholder: "mail@yourdomain.com",
          formatError: false,
          formatMsg: "メールアドレスの形式になっていません。",
          maxLength: 100,
        },
        {
          title: "お名前",
          modelVal: ["", ""],
          type: "text",
          isNumberType: false,
          placeholder: ["姓", "名"],
          formatError: false,
          formatMsg: "",
          maxLength: [20, 20],
        },
        {
          title: "生年月日",
          modelVal: ["", "", ""],
          maxDay: 31,
          maxMonth: 12,
          minYear: 1901,
          listYear: [],
          maxYear: new Date().getFullYear(),
          type: "number",
          isNumberType: true,
          placeholder: ["1985", "1", "1"],
          formatError: false,
          formatMsg: "生年月日が不正です",
          maxLength: [4, 2, 2],
        },
        {
          title: "携帯電話番号",
          modelVal: "",
          isNumberType: true,
          type: "text",
          placeholder: "例：09012345678",
          formatError: false,
          formatMsg: "フォーマットエラー",
          maxLength: 11,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getResetLoginPassData"]),
    isInputOver() {
      return this.formData.every((item) => {
        if (item.title === "お名前") {
          return (
            item.modelVal[0] !== "" &&
            item.modelVal[1] !== "" &&
            item.formatError === false
          );
        } else if (item.title === "生年月日") {
          return (
            item.modelVal[0] !== "" &&
            item.modelVal[1] !== "" &&
            item.modelVal[2] !== "" &&
            item.formatError === false
          );
        } else {
          return item.modelVal !== "" && item.formatError === false;
        }
      });
    },

    years: function () {
      this.createYearList();
      return this.formData[2].listYear;
    },
  },
  methods: {
    ...mapActions(["resetLoginPwdApi"]),
    format(val) {
      if (!val) {
        return "";
      }
      const replaced = val.replace(/\D/g, "");
      return replaced ? replaced : "";
    },
    handleSend() {
      if (this.isInputOver) {
        this.sendEmailCode();
      }
    },

    createYearList() {
      for (
        let i = this.formData[2].minYear;
        i < this.formData[2].maxYear;
        i++
      ) {
        this.formData[2].listYear.push(i);
      }
    },

    inputChange: function (value, index) {
      switch (index) {
        case 0:
          this.formData[index].formatError = !commonJs.VerifyEmail(value);
          break;
        case 1:
          this.formData[index].formatError = false;
          break;
        case 2:
          if (
            this.formData[index].modelVal[0] !== "" &&
            this.formData[index].modelVal[1] !== "" &&
            this.formData[index].modelVal[2] !== "" &&
            this.formData[index].modelVal[0] > 1900 &&
            this.formData[index].modelVal[0] < new Date().getFullYear() &&
            this.formData[index].modelVal[1] <= 12 &&
            this.formData[index].modelVal[1] > 0 &&
            this.formData[index].modelVal[2] <= 31 &&
            this.formData[index].modelVal[2] > 0
          ) {
            this.formData[index].formatError = false;
          } else this.formData[index].formatError = true;
          break;
        case 3:
          this.formData[index].formatError = !commonJs.VerifyTel(value);
          break;
      }
    },

    sendEmailCode() {
      // format date to yyyy dd mm
      const date_yyyy = this.formData[2].modelVal[0];
      const date_mm =
        this.formData[2].modelVal[1].toString().length < 2
          ? "0" + this.formData[2].modelVal[1]
          : this.formData[2].modelVal[1];
      const date_dd =
        this.formData[2].modelVal[2].toString().length < 2
          ? "0" + this.formData[2].modelVal[2]
          : this.formData[2].modelVal[2];
      const submitData = {
        EMAIL: this.formData[0].modelVal,
        NAME:
          this.formData[1].modelVal[0] + "　" + this.formData[1].modelVal[1],
        BIRTH_D: date_yyyy + date_mm + date_dd,
        TEL_NO_02: this.formData[3].modelVal,
      };
      commonJs.saveLocalData("rstLoginPass", submitData);
      this.resetLoginPwdApi(submitData).then(() => {
        if (this.getResetLoginPassData.STATUS === "OK") {
          this.$router.push({ name: "ResetLoginPwdCode" });
        }
      });
    },
  },
};
