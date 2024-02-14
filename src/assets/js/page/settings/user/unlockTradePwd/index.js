import TopInfo from "@/components/common/TopInfo";
import { mapGetters, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "取引暗証番号のロック解除申請｜CHEER証券",
  name: "TradePassUnlock",
  components: {
    TopInfo,
  },
  data() {
    return {
      formData: [
        {
          id: 1,
          title: "お名前",
          modelVal: ["", ""],
          type: "text",
          placeholder: ["姓", "名"],
          formatError: false,
          formatMsg: "",
          maxLength: [20, 20],
        },
        {
          id: 2,
          title: "生年月日",
          modelVal: ["", "", ""],
          maxDay: 31,
          maxMonth: 12,
          minYear: 1901,
          listYear: [],
          maxYear: new Date().getFullYear(),
          type: "number",
          placeholder: ["1985", "1", "1"],
          formatError: false,
          formatMsg: "生年月日が不正です",
        },
        {
          id: 3,
          title: "携帯電話番号",
          modelVal: "",
          type: "text",
          placeholder: "例：09012345678",
          formatError: false,
          formatMsg: "フォーマットエラー",
          maxLength: 11,
        },
      ],
    };
  },

  methods: {
    ...mapActions(["unlockTradePwdApi"]),
    format(val) {
      if (!val) {
        return "";
      }
      const replaced = val.replace(/\D/g, "");
      return replaced ? replaced : "";
    },
    createYearList() {
      for (
        let i = this.formData[1].minYear;
        i < this.formData[1].maxYear;
        i++
      ) {
        this.formData[1].listYear.push(i);
      }
    },
    inputChange: function (value, index) {
      switch (index) {
        case 0:
          this.formData[index].formatError = false;
          break;
        case 1:
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
      }
    },
    telCheck(item) {
      if (commonJs.VerifyTel(item.modelVal)) {
        item.formatError = false;
      } else {
        item.formatError = true;
      }
    },
    handleSend() {
      let date_yyyy = this.formData[1].modelVal[0];
      let date_mm =
        this.formData[1].modelVal[1].toString().length < 2
          ? "0" + this.formData[1].modelVal[1]
          : this.formData[1].modelVal[1];
      let date_dd =
        this.formData[1].modelVal[2].toString().length < 2
          ? "0" + this.formData[1].modelVal[2]
          : this.formData[1].modelVal[2];
      let submitData = {
        NAME:
          this.formData[0].modelVal[0] + "　" + this.formData[0].modelVal[1],
        BIRTH_D: date_yyyy + date_mm + date_dd,
        TEL_NO_02: this.formData[2].modelVal,
      };
      commonJs.saveLocalData("unlockTradePwdSaveLocalM160", submitData);
      this.unlockTradePwdApi(submitData).then(() => {
        console.log("handleSend unlockTradePwdApi >>> this.dataUnlockTradePwd=", this.dataUnlockTradePwd);
        if (this.dataUnlockTradePwd.STATUS === "OK") {
          this.$router.push({ name: "TradePassUnlockCode" });
        }
      });
    },
    userSetting() {
      this.$router.push({ name: "UserSetting" });
    },
  },
  computed: {
    ...mapGetters(["dataUnlockTradePwd"]),
    years: function () {
      this.createYearList();
      return this.formData[1].listYear;
    },
    telValue() {
      return this.formData[2].modelVal;
    },
    inputTrue() {
      return this.formData.every((item) => {
        if (item.id == 1) {
          return (
            item.modelVal[0] && item.modelVal[1] && item.formatError == false
          );
        } else if (item.id == 2) {
          return (
            item.modelVal[0] &&
            item.modelVal[1] &&
            item.modelVal[2] &&
            item.formatError == false
          );
        } else {
          return item.modelVal && item.formatError == false;
        }
      });
    },
  },
  watch: {
    telValue(newValue, oldValue) {
      if (
        constant.reg.numberCase.test(newValue) ||
        constant.reg.numberCase.test(oldValue)
      ) {
        this.telCheck(this.formData[2]);
      }
    },
  },
};
