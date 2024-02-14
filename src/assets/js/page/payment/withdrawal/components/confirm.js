import Success from "@/views/payment/withdrawal/components/success";
import commonJs from "@/assets/js/common/common";

export default {
  title: "撤退を確認する",
  name: "ConfirmWithdrawal",
  components: {
    Success,
  },
  props: ["amountWithdrawal", "feeWithdrawal", "infoWithdrawal"],
  data() {
    return {
      tradepwd: "",
      successConfirm: false,
      withdrawFullFlg: 0,
    };
  },
  computed: {
    TransferAmount() {
      if (typeof this.amountWithdrawal == "string") {
        return parseInt(this.amountWithdrawal.replaceAll(",", ""));
      }
      return this.amountWithdrawal;
    },
  },
  methods: {
    handleFormatDate(data) {
      if (data) {
        return commonJs.dateFormatter(data, "-", "/");
      } else {
        return "";
      }
    },
    handleBackUsDetail() {
      this.$emit("backData", {
        backConfirmDraw: false,
        resetInput: 0,
      });
    },
    handleBlur() {
      this.tradepwd = commonJs.zenkaku2Hankaku(this.tradepwd);
    },
    submitConfirm() {
      let value = this.amountWithdrawal;
      if (typeof this.amountWithdrawal == "string") {
        value = parseInt(this.amountWithdrawal.replaceAll(",", ""));
      }

      if (this.tradepwd) {
        this.$store
          .dispatch("executeConfirmAmount", {
            WITHDRAW_FULL_FLG: this.withdrawFullFlg,
            WITHDRAW_AMOUNT: value,
            COMMISSION: this.feeWithdrawal,
            UUID: localStorage.getItem("uuid"),
            PASSWORD: commonJs.hashPwd(this.tradepwd),
          })
          .then(() => {
            if (this.$store.getters.getExecConfirm.STATUS === "OK") {
              this.successConfirm = true;
            }
          });
      }
    },
    cashFormatter(cash) {
      return commonJs.cashFormatter(cash) || 0;
    },
  },
};
