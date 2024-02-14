import FirstCashInBind from "@/views/payment/deposit/components/firstCashInBind";
import CashInSumOperate from "@/views/payment/deposit/components/cashInSumOperate";
import CashInSumOperateFailed from "@/views/payment/deposit/components/cashInSumOperateFailed";
import ApplyCashInSuccess from "@/views/payment/deposit/components/applyCashInSuccess";
import CashInBindFinish from "@/views/payment/deposit/components/cashInBindFinish";
import CashInBindFailed from "@/views/payment/deposit/components/cashInBindFailed";
import { mapGetters, mapActions, mapMutations } from "vuex";
import commonJs from "@/assets/js/common/common";

export default {
  props: ["errors"],
  title: "リアルタイム入金",
  name: "realtimeDeposit",
  components: {
    FirstCashInBind,
    CashInSumOperate,
    ApplyCashInSuccess,
    CashInSumOperateFailed,
    CashInBindFinish,
    CashInBindFailed,
  },
  data() {
    return {
      paymentData: {},
      bindFailed: false,
      noticeType: null,
      waiting: false,
      fixedFeeWithTax: 0,
      withdrawalAmount: 0,
    };
  },
  computed: {
    ...mapGetters([
      "bindState",
      "cashInState",
      "isCashInSumFinal",
      "paymentAccountData",
    ]),
  },
  methods: {
    ...mapActions(["setPaymentRealtimeAccount"]),
    ...mapMutations([
      "UPDATE_CASH_IN_STATE",
      "UPDATE_REGULAR_CASHIN_SETTINGS",
      "INIT_REGULAR_CASHIN_SETTINGS",
      "OPERATE_REGULAR_CASHIN_SETTINGS",
      "UPDATE_ORIGIN_DATA",
      "INIT_ORIGIN_DATA",
      "UPDATE_SHOW_RESULT",
    ]),
    fixFeeWithTax(data) {
      if (Object.keys(this.paymentData).length > 0) {
        this.paymentData["ACCOUNT_LIST"].forEach((item) => {
          item["PAYMENT_FEE_LIST"].forEach((value) => {
            if (
              data >= value["LOWER_AMOUNT_LIMIT"] &&
              data <= value["UPPER_AMOUNT_LIMIT"]
            ) {
              this.fixedFeeWithTax = value["FIXED_FEE_WITH_TAX"];
              this.withdrawalAmount = commonJs.handNumberInt(
                this.fixedFeeWithTax + data
              );
            }
          });
        });
      }
      if (data === 0) {
        this.withdrawalAmount = 0;
        this.fixedFeeWithTax = 0;
      }
    },
    initRealTimeCashInStates() {
      this.UPDATE_CASH_IN_STATE({
        stateName: "realTimeBindState",
        stateValue: 0,
      });

      this.UPDATE_CASH_IN_STATE({
        stateName: "realTimeCashInState",
        stateValue: 0,
      });
    },
    getInfo() {
      this.setPaymentRealtimeAccount()
        .then(() => {
          this.waiting = true;
          this.paymentData = this.paymentAccountData;
          if (this.paymentData.ACCOUNT_LIST) {
            this.UPDATE_CASH_IN_STATE({
              stateName: "regularCashInMetaInfo",
              stateValue: [
                {
                  title: "金融機関名",
                  value: this.paymentData.ACCOUNT_LIST[0].BANK_NAME
                    ? this.paymentData.ACCOUNT_LIST[0].BANK_NAME
                    : "三菱UFJ銀行",
                },
                {
                  title: "本支店名",
                  value: this.paymentData.ACCOUNT_LIST[0].BRANCH_NAME
                    ? this.paymentData.ACCOUNT_LIST[0].BRANCH_NAME + "支店"
                    : "支店",
                },
                {
                  title: "預金種目",
                  value: this.paymentData.ACCOUNT_LIST[0].ACCOUNT_ITEM_NAME,
                },
                {
                  title: "口座番号",
                  value: this.paymentData.ACCOUNT_LIST[0].ACCOUNT_NUMBER,
                },
              ],
            });
            this.UPDATE_CASH_IN_STATE({
              stateName: "FIXED_FEE_WITH_TAX",
              stateValue:
                this.paymentData.ACCOUNT_LIST[0].PAYMENT_FEE_LIST[0]
                  .FIXED_FEE_WITH_TAX,
            });
            this.UPDATE_CASH_IN_STATE({
              stateName: "realTimeBindState",
              stateValue: 1,
            });
            this.UPDATE_CASH_IN_STATE({
              stateName: "realTimeCashInState",
              stateValue: 0,
            });
            this.UPDATE_CASH_IN_STATE({
              stateName: "regularBindState",
              stateValue: 1,
            });

            if (!this.noticeType) {
              this.UPDATE_CASH_IN_STATE({
                stateName: "realTimeCashInState",
                stateValue: 1,
              });

              this.UPDATE_CASH_IN_STATE({
                stateName: "regularCashInState",
                stateValue: 2,
              });
            }
          }
          if (this.paymentData.AUTO_DEPOSIT_LIST) {
            let data = this.paymentData.AUTO_DEPOSIT_LIST;
            let newData = data.map((item) => {
              let obj = {
                money: parseInt(item.DEPOSIT_AMOUNT),
                day: item.EXECUTION_DAY,
                start: this.Moment(new Date(item.NEXT_EXEC_D).getTime()).format(
                  "YYYY-MM-DD"
                ),
                stage: 2,
                SEQ_NO: item.SEQ_NO,
                status: item.EXECUTION_STATUS,
              };
              return obj;
            });

            this.UPDATE_REGULAR_CASHIN_SETTINGS(newData);

            this.UPDATE_ORIGIN_DATA(JSON.parse(JSON.stringify(newData)));
          } else {
            this.INIT_REGULAR_CASHIN_SETTINGS();
            this.INIT_ORIGIN_DATA();
          }
        })
        .catch(() => {
          this.waiting = true;
        });
    },
  },
  mounted() {
    this.UPDATE_SHOW_RESULT(false);
    this.initRealTimeCashInStates();
    this.noticeType = this.$route.query.noticeType || null;
    if (this.noticeType == 3) {
      this.bindFailed = true;
    } else if (this.noticeType == 2) {
      this.UPDATE_CASH_IN_STATE({
        stateName: "realTimeBindState",
        stateValue: -1,
      });
    }
  },
};
