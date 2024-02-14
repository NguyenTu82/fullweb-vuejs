import TopInfoItem from "@/views/payment/deposit/components/topInfoItem";
import cRoundButton from "@/components/button/cRoundButton";
import LoadingDialog from "@/views/payment/deposit/components/loadingDialog";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  title: "リアルタイム入金",
  name: "realtimeDeposit",
  components: {
    TopInfoItem,
    cRoundButton,
    LoadingDialog,
  },
  data() {
    return {
      pwd: "",
      isIos: commonJs.judgeIosAndroid(),
      confirmData: {},
      stage: constant.REAL_TIME_CASH_IN_DIALOG_STAGE.CLOSE,
      pinError: false,
    };
  },
  computed: {
    ...mapGetters(["cashInData", "getPaymentConfirm", "getPaymentAccepted"]),
    infos() {
      return this.cashInData.regularCashInMetaInfo;
    },
    COMPANY_NAME() {
      return commonJs.companyName();
    },
  },
  methods: {
    ...mapActions(["paymentRealtimeAccepted"]),
    ...mapMutations(["UPDATE_CASH_IN_FINISH", "UPDATE_SHOW_RESULT"]),
    getInfo() {
      this.pwd = "";
      this.confirmData = JSON.parse(this.$route.query.data);
    },
    handleBack() {
      this.$router.back();
    },
    handleBlurPwd() {
      this.pwd = commonJs.zenkaku2Hankaku(this.pwd);
    },
    pwdChange(event) {
      this.pwd = event.target.value;
    },
    handelSure() {
      this.stage = constant.REAL_TIME_CASH_IN_DIALOG_STAGE.LOADING;
      this.paymentRealtimeAccepted({
        PAYMENT_ID: this.confirmData.PAYMENT_ID, //支付方式
        AMOUNT: this.confirmData.AMOUNT,
        FEE_WITH_TAX: this.confirmData.FEE_WITH_TAX,
        SECRET: commonJs.hashPwd(this.pwd),
      })
        .then(() => {
          const data = this.getPaymentAccepted;
          if (data.STATUS === "NG") {
            this.stage = constant.REAL_TIME_CASH_IN_DIALOG_STAGE.ERROR;
            if (data.ERROR.CODE == "E005-0014") {
              this.pinError = data.ERROR;
            }
          }
          if (data.STATUS === "OK") {
            this.pinError = false;
            this.stage = constant.REAL_TIME_CASH_IN_DIALOG_STAGE.SUCCESS;
          }
        })
        .catch(() => {
          this.stage = constant.REAL_TIME_CASH_IN_DIALOG_STAGE.ERROR_API;
        });
    },
    showAlertTips(text) {
      this.$root.$store.commit("editMsg", {
        isShow: true,
        text: text,
        type: "prompt",
      });
    },
    handleOkDialog() {
      switch (this.stage) {
        case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.SUCCESS:
          this.stage = constant.REAL_TIME_CASH_IN_DIALOG_STAGE.CLOSE;
          this.UPDATE_SHOW_RESULT(true);
          this.UPDATE_CASH_IN_FINISH(1);
          this.$router.push({ name: "Deposit" });
          break;
        case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.ERROR:
        case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.ERROR_API:
          this.UPDATE_SHOW_RESULT(true);
          this.UPDATE_CASH_IN_FINISH(2);
          this.stage = constant.REAL_TIME_CASH_IN_DIALOG_STAGE.CLOSE;
          this.$router.push({ name: "Deposit" });
          break;
        default:
          break;
      }
    },
    cashFormatter(cash) {
      return commonJs.cashFormatter(cash);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getInfo();
    });
  },
};
