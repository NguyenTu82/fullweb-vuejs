import Done from "@/components/payment/history/components/done";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "キャンセル",
  name: "Cancel",
  components: {
    Done,
  },
  data() {
    return {
      tradepwd: "",
      DoneCancelPayment: false,
    };
  },
  created() {
    console.log(this.cancelId);
  },
  props: ["cancelId"],

  watch: {},
  methods: {
    offCancel() {
      this.$emit("turnOffCancel");
    },
    handleBlur() {
      this.tradepwd = commonJs.zenkaku2Hankaku(this.tradepwd);
    },
    submitCancel() {
      if (this.tradepwd) {
        this.$store
          .dispatch("cancelCashOut", {
            apiType: constant.API_TYPE.COMMON,
            SEQ_NO: this.cancelId.SCHEDULE_SEQ_NO,
            PASSWORD: commonJs.hashPwd(this.tradepwd),
          })
          .then(() => {
            console.log(this.$store.getters.getCancelCashout);
            if (this.$store.getters.getCancelCashout.STATUS == "OK") {
              this.DoneCancelPayment = true;
            }
          });
      }
    },
    cashFormatter(cash) {
      return commonJs.cashFormatter(cash);
    },
  },
};
