import TopInfo from "@/components/common/TopInfo";
import TabContent from "@/components/payment/components/tabContent";
import ConfirmWithdrawal from "@/components/payment/withdrawal/components/confirm";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "撤退",
  name: "PaymentWithdrawal",
  components: {
    TabContent,
    TopInfo,
    ConfirmWithdrawal,
  },
  data() {
    return {
      setSelectAmount: 1,
      amoutInput: 0,
      amoutNewInput: "",
      focused: false,
      withdrawInfo: {},
      getDataAmount: {},
      disabledInput: false,
      disabledIncrease: false,
      disabledButton: false,
      disabledReduce: true,
      showConfirmWhithdrawal: false,
      withdrawFullFlg: 0,
    };
  },
  mounted() {
    // this.specifyAmount();
  },
  created() {
    this.specifyAmount();
    this.amoutInput = 0;
  },
  computed: {
    WITHDRAW_SCHEDULED_DATE() {
      let dat = this.getDataAmount.WITHDRAW_ACNT_INF.WITHDRAW_SCHEDULED_DATE;
      if (dat) {
        return commonJs.dateFormatter(dat, "-", "/");
      } else {
        return "";
      }
    },

    WITHDRAW_AVAILABLE_AMOUNT() {
      return this.getDataAmount.WITHDRAW_ACNT_INF.WITHDRAW_AVAILABLE_AMOUNT;
    },

    WITHDRAW_LOWER_AMOUNT() {
      return this.getDataAmount.WITHDRAW_LIMITED_INF.WITHDRAW_LOWER_AMOUNT;
    },

    WITHDRAW_FEE() {
      if (Object.keys(this.getDataAmount).length === 0) return 0;
      for (let i = 0; i < this.getDataAmount?.COMMISSION_INF.length; ++i) {
        if (
          this.amoutInput >= this.getDataAmount.COMMISSION_INF[i].START &&
          this.amoutInput <= this.getDataAmount.COMMISSION_INF[i].END
        ) {
          return this.getDataAmount.COMMISSION_INF[i].FEE;
        }
      }
      return this.getDataAmount.COMMISSION_INF[0].FEE;
    },
  },
  methods: {
    backConfirm(data) {
      this.showConfirmWhithdrawal = data.backConfirmDraw;
      // this.brandList  = data.newData
      this.amoutInput = data.resetInput;
    },
    confirmWithdraw() {
      let value = this.amoutInput;
      if (typeof this.amoutInput == "string") {
        value = parseInt(this.amoutInput.replaceAll(",", ""));
      }
      if (
        value < this.getDataAmount.COMMISSION_INF[0].FEE &&
        this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT >
          this.getDataAmount.COMMISSION_INF[0].FEE
      ) {
        let fee = this.getDataAmount.COMMISSION_INF[0].FEE;
        this.amoutInput = value;
        if (value < fee && value !== "0" && value !== "") {
          this.amoutInput = fee + 1;
        } else if (value === "") {
          this.amoutInput = 0;
        } else if (value == this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT) {
          this.amoutInput = this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT;
        }
      } else if (value <= this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT) {
        this.$store
          .dispatch("getConfirmAmount", {
            WITHDRAW_FULL_FLG: this.withdrawFullFlg,
            WITHDRAW_AMOUNT: value,
            COMMISSION: this.WITHDRAW_FEE,
            UUID: localStorage.getItem("uuid"),
          })
          .then(() => {
            if (this.$store.getters.getDrawConfirm.STATUS == "OK") {
              this.showConfirmWhithdrawal = true;
            }
          });
      }
    },

    inputHandle(event) {
      let value = parseInt(event.target.value.slice(0, 10)) || 0;
      if (value != 0) {
        event.target.value = value;
        this.amoutInput = event.target.value;
      }
      if (event.target.value > this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT) {
        this.amoutInput = this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT;
        this.disabledIncrease = true;
        this.disabledReduce = false;
      } else if (value == this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT) {
        this.amoutInput = commonJs.cashFormatter(
          this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT
        );
        this.disabledIncrease = true;
      }
    },

    inputHandle2(e) {
      let value = e.target.value;

      if (typeof value == "string") {
        this.amoutInput = commonJs.cashFormatter(value);
        value = parseInt(this.amoutInput.replaceAll(",", ""));
      }
      let fee = this.getDataAmount.COMMISSION_INF[0].FEE;
      this.disabledIncrease = false;
      this.disabledReduce = false;

      if (value < fee && value !== "0" && value !== "") {
        this.amoutInput = fee + 1;
      } else if (value === "") {
        this.amoutInput = 0;
      } else if (value == this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT) {
        this.amoutInput = this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT;
        this.disabledIncrease = true;
        this.disabledReduce = false;
      } else if (value > this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT) {
        this.amoutInput = this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT;
        this.disabledIncrease = true;
      } else {
        this.amoutInput = value;
      }
    },

    increaseAmount() {
      if (typeof this.amoutInput == "string") {
        if (
          parseInt(this.amoutInput.replaceAll(",", "")) <
          this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT
        ) {
          this.amoutInput = parseInt(this.amoutInput.replaceAll(",", "")) + 100;
          this.disabledIncrease =
            this.amoutInput == this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT
              ? true
              : false;
          this.disabledReduce = false;
        }
      } else {
        if (this.amoutInput < this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT) {
          this.amoutInput = this.amoutInput + 100;
          this.disabledIncrease = false;
          this.disabledReduce = false;
          if (
            parseInt(this.amoutInput) ==
            this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT
          ) {
            this.disabledIncrease = true;
          }
        }
      }
    },

    reducAmount() {
      if (typeof this.amoutInput == "string") {
        this.amoutInput = parseInt(this.amoutInput.replaceAll(",", "")) - 100;
        if (this.amoutInput > 100) {
          this.disabledIncrease = true;
          if (parseInt(this.amoutInput) == 0) {
            this.disabledReduce = true;
          } else if (
            parseInt(this.amoutInput - 100) <
            parseInt(this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT)
          ) {
            this.disabledIncrease = false;
          }
        } else {
          this.amoutInput = 0;
          this.disabledReduce = true;
        }
      } else {
        if (this.amoutInput > 100) {
          this.amoutInput = parseInt(this.amoutInput) - 100;
          this.disabledIncrease = true;
          if (parseInt(this.amoutInput) == 0) {
            this.disabledReduce = true;
          } else if (
            parseInt(this.amoutInput - 100) <
            parseInt(this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT)
          ) {
            this.disabledIncrease = false;
          }
        } else {
          this.amoutInput = 0;
          this.disabledReduce = true;
        }
      }
    },

    specifyAmount() {
      this.setSelectAmount = 1;
      this.disabledInput = false;
      this.disabledIncrease = false;
      this.disabledReduce = true;
      this.amoutInput = 0;

      this.$store
        .dispatch("getDrawAmount", {
          apiType: constant.API_TYPE.COMMON,
        })
        .then(() => {
          this.withdrawInfo =
            this.$store.getters.getDataDrawAmount.DATA.WITHDRAW_ACNT_INF;
          this.getDataAmount = this.$store.getters.getDataDrawAmount.DATA;
        });
    },

    fullAmount() {
      this.setSelectAmount = 2;
      this.disabledInput = true;
      this.disabledIncrease = true;
      this.disabledReduce = true;
      this.amoutInput = this.withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT;
    },

    cashFormatter(cash) {
      return commonJs.cashFormatter(cash);
    },
  },
};
