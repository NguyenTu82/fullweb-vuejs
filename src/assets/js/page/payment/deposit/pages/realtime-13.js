import ListInCard from "@/views/payment/deposit/components/listInCard";
import TopInfoItem from "@/views/payment/deposit/components/topInfoItem";
import { mapGetters, mapMutations } from "vuex";
import iconv from "iconv-lite";
import commonJs from "@/assets/js/common/common";

export default {
  name: "CashInContract3",
  components: { ListInCard, TopInfoItem },
  data() {
    return {
      listInCard: JSON.parse(localStorage.getItem("listInCard")) || [
        {
          title: "振込元金融機関",
          value: "三菱USJ銀行",
        },
        {
          title: "証券口座名義",
          value: "",
        },
      ],
      actionUrl: "",
      kfrRequest: "",
      executeRealtimeContractFlag: false,
    };
  },
  computed: {
    ...mapGetters(["getBackPage"]),
    ...mapGetters("cashOutAmountNCB", ["getIsWithdrawPage"]),
    EXECUTE_REALTIME_CONTRACT_FLAG() {
      return this.executeRealtimeContractFlag;
    },
  },
  methods: {
    ...mapMutations(["UPDATE_BACK_PAGE"]),
    
    async contractStatusPolling() {
      let endFlg = false;
      let realtimeContractInfo = null;
      let detailStatus = null;
      while (!endFlg) {
        if (this.$route.name !== "CashInContract3") {
          return;
        }
        realtimeContractInfo = await this.getRealtimeContractStatus();
        if (!realtimeContractInfo || realtimeContractInfo.STATUS !== "OK") {
          endFlg = true;
          executeRealtimeContractFlag = false;
          return ;
        }
        detailStatus = realtimeContractInfo.DATA.ACCOUNT.DETAIL_STATUS;
        // リアルタイム口座振替契約詳細ステータスが「1：契約済、2：契約キャンセル、3：契約失敗」場合
        if (detailStatus === 1 || detailStatus === 2 || detailStatus === 3) {
          endFlg = true;
          continue;
        }
        await commonJs.sleep(3000);
      }

      // リアルタイム入金画面へ遷移する
      this.$router.push({
        name: "Deposit",
        query: { noticeType: detailStatus },
      });
    },
    async getRealtimeContractStatus() {
      let realtimeContractInfo = await this.$store
        .dispatch("getRealtimeContractStatus")
      .catch((err) => {
        return null;
      });

      return realtimeContractInfo;
    },
    /**
     * Execute real time contract & submit form
     */
    execute() {
      this.$store
        .dispatch("executeRealtimeContract", {
          PAYMENT_ID: 2,
          CHANNEL: 2, // FullWeb
        })
        .then((response) => {
          let data = response["DATA"];
          this.actionUrl = data["NTTD_CONTRACT_TRANSFER_URL"];
          this.kfrRequest = iconv.decode(
            Buffer.from(data["KFR_REQUEST"], "base64"),
            "Shift_JIS"
          );

          if (this.actionUrl && this.kfrRequest) {
            setTimeout(() => {
              // 画面のボタンを非表示にする
              this.executeRealtimeContractFlag = true;
              // 契約結果を監視して、画面を遷移する
              this.contractStatusPolling();
              Document.charset = "Shift_JIS";
              document.getElementById("kfform").submit();
            });
          }
        });
    },

    /**
     * Back to E110-12
     */
    handleBack() {
      this.$router.push({ name: "BankAccountRegist" });
    },

    /**
     * Back to E110-2
     */
    handelSure() {
      let backPage = this.getIsWithdrawPage
        ? { name: "PaymentWithdrawal" }
        : { name: "Deposit" };
      if (this.getBackPage) {
        backPage = this.getBackPage;
        this.UPDATE_BACK_PAGE("");
      }
      this.$router.push(backPage);
    },
  },
};
