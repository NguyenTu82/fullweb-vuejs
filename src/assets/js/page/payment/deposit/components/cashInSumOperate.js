import { mapGetters, mapActions } from "vuex";
import cRoundButton from "@/components/button/cRoundButton";
import cStepperMoney from "@/components/common/stepper/cStepperMoney";
import commonJs from "@/assets/js/common/common";

export default {
  name: "FirstCashIn",
  props: ["paymentData", "fixedFeeWithTax", "withdrawalAmount"],
  components: {
    cStepperMoney,
    cRoundButton,
  },
  data() {
    return {
      money: 0,
      focused: false,
      payment_id: "",
    };
  },
  created() {
    commonJs.creatResize();
  },
  computed: {
    ...mapGetters(["cashInData", "getPaymentConfirm"]),
    UNIT_AMOUNT() {
      return (
        (this.paymentData["ACCOUNT_LIST"] &&
          this.paymentData["ACCOUNT_LIST"][0]["UNIT_AMOUNT"]) ??
        0
      );
    },
    MIN_AMOUNT() {
      return (
        (this.paymentData["ACCOUNT_LIST"] &&
          this.paymentData["ACCOUNT_LIST"][0]["MIN_AMOUNT"]) ??
        0
      );
    },
    MAX_AMOUNT() {
      if (this.UNIT_AMOUNT !== 0) {
        return 100000000 - (100000000 % this.UNIT_AMOUNT);
      }
      return 100000000;
    },
    infos() {
      return this.cashInData.regularCashInMetaInfo;
    },
    feeWithTax() {
      return this.cashInData.FIXED_FEE_WITH_TAX;
    },
    valueFormatter() {
      let fm = commonJs.cashFormatter(this.money);
      return fm || 0;
    },
    totalFee() {
      return commonJs.handNumberInt(this.money + this.fixedFeeWithTax);
    },
  },
  methods: {
    ...mapActions(["paymentRealtimeConfirm"]),
    getInfos() {
      let data = this.cashInData;
      this.infos[0].value = data.PERFECT_FACIL_NM;
      this.infos[1].value = data.PERFECT_ACNT_NUM;
      this.infos[2].value = data.KANA_NAME;
      this.infos = [...this.infos];
    },
    inputHandle(value) {
      this.money = parseInt(value) || 0;
      this.$emit("currentMoney", this.money);
    },
    handelSure() {
      this.payment_id = this.paymentData.ACCOUNT_LIST[0].PAYMENT_ID;
      this.paymentRealtimeConfirm({
        PAYMENT_ID: this.payment_id, //支付方式
        AMOUNT: this.money,
      }).then(() => {
        let data = this.getPaymentConfirm;
        if (data.STATUS == "NG") {
          let text =
            "リアルタイム入金は" +
            (this.paymentData.ACCOUNT_LIST[0].MIN_AMOUNT || 10000) +
            "円よりご利用いただけます。";
          return this.showAlertTips(text);
        }
        if (data.STATUS === "OK") {
          this.money = 0;
          this.$router.push({
            name: "RealTimeCashInPwd",
            query: { data: JSON.stringify(data.DATA) },
          });
        }
      });
    },
    showAlertTips(text) {
      this.$store.commit("showPopup", {
        isShow: true,
        text: text,
        btnName: "OK",
      });
      // this.$root.$store.commit('editMsg', {
      //   isShow: true,
      //   text: text,
      //   type: 'prompt'
      // });
    },
  },
};
