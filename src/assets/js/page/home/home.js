import ranking from "@/views/home/ranking";
import moment from "moment";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import { mapGetters, mapActions } from "vuex";
import httpRequest from "@/assets/js/common/httpRequest";

export default {
  title: "ホーム",
  name: "Home",
  components: {
    ranking,
    TopInfo,
  },
  data() {
    return {
      totalAssetsAmount: 0,
      totalAssetsAmountRate: 0,
      totalProfitAmount: 0,
      marketPrice: [],
      marketNews: [],
      publicNotice: [],
      cash_bal: [],
      currDateTime: "",
      isShowData: true,
      RedPercen: '0%',
      BluePercen: '0%',
      GreenPercen: '0%',
      GrayPercen: '100%',
      assetsEnum: {
        us: "米国株式",
        jp: "国内株式",
        it: "投資信託",
        dp: "預り金",
      },

      valueRed: 0,
      valueGreen: 0,
      valueBlue: 0,
    };
  },
  computed: {
    ...mapGetters(["getHome", "getAvailableCashInfo", "getPortfolio"]),
  },
  methods: {
    ...mapActions(["home", "availableCashInfo", "portfolio"]),
    async pageInit() {
      this.currDateTime = moment().format("YYYY/MM/DD HH:mm");

      this.home().then(() => {
        if (this.getHome.STATUS === "OK") {
          const data = this.getHome.DATA || {};
          this.totalAssetsAmount = data.TOTAL_ASSETS_AMOUNT;
          this.totalAssetsAmountRate = data.TOTAL_ASSETS_AMOUNT_RATE;
          this.totalProfitAmount = data.TOTAL_PROFIT_AMOUNT;
          this.marketPrice = data.MARKET_PRICE;
          this.marketPrice.swapItems(0, 1);
          this.marketPrice = this.marketPrice.reverse();
          this.marketNews = data.MARKET_NEWS;
          this.publicNotice = data.PUBLIC_NOTICE;
        }
      });
      this.portfolio().then(() => {
        let dataPortfolio = {};
        const data = this.getPortfolio.DATA || {};
        if (this.getPortfolio.STATUS === "OK") {
          dataPortfolio = data;
          let total =
            parseFloat(dataPortfolio.DEPOSIT_AMOUNT) > 0
              ? parseFloat(dataPortfolio.DEPOSIT_AMOUNT)
              : 0;
          dataPortfolio.ASSETS.map((item) => {
            total +=
                parseFloat(item.EVALUATION_AMOUNT) > 0
                  ? parseFloat(item.EVALUATION_AMOUNT)
                  : 0;
          });

          

          dataPortfolio.ASSETS.map((item) => {
            if (item.ASSET_NAME == this.assetsEnum.jp)
              this.valueRed = (parseFloat(item.EVALUATION_AMOUNT) / total) * 100
              this.RedPercen = (this.valueRed || 0) + '%';
            
            if (item.ASSET_NAME == this.assetsEnum.us)

              this.valueBlue = (parseFloat(item.EVALUATION_AMOUNT) / total) * 100
              this.BluePercen = ((this.valueBlue + this.valueRed) || 0) + '%';

            if (item.ASSET_NAME == this.assetsEnum.it)

              this.valueGreen = (parseFloat(item.EVALUATION_AMOUNT) / total) * 100
              this.GreenPercen = ((this.valueGreen + this.valueRed + this.valueBlue)|| 0) + '%';

          });
        }
      })  

      Array.prototype.swapItems = function(a, b){
        this[a] = this.splice(b, 1, this[a])[0];
        return this;
      }

      this.availableCashInfo()
        .then(() => {
          const data = this.getAvailableCashInfo.DATA || {};
          const lst_cash_bal = data.lst_cash_bal;
          this.cash_bal = lst_cash_bal[2] || {};
        })
        .catch((err) => {
          commonJs.handError(err, "リトライ");
        });
    },
    resetData() {
      this.marketPrice = [];
      this.marketNews = [];
      this.publicNotice = [];
      this.currDateTime = "";
    },
    reload() {
      this.resetData();
      this.pageInit();
    },
    switchType() {
      this.isShowData = !this.isShowData;
    },
    getDateTime(str) {
      if (str) {
        return moment(new Date(str).getTime()).format("YYYY/MM/DD HH:mm");
      }
      return moment().format("YYYY/MM/DD HH:mm");
    },
    showMoney(str) {
      const num = parseInt(str || 0);
      if (num > 0) {
        return `+${commonJs.handNumberInt(num)}`;
      }
      if (num < 0) {
        return `${commonJs.handNumberInt(num)}`;
      }
      return num;
    },
    showMoneyFloat(str) {
      const num = parseFloat(str || 0);
      if (num > 0) {
        return `+${commonJs.handNumber(num)}`;
      }
      if (num < 0) {
        return `${commonJs.handNumber(num)}`;
      }
      return this.number_format2(num);
    },
    showNewTime(str) {
      const date = moment(str, "YYYY/MM/DD HH:mm");
      return `${date.format("YYYY/MM/DD")}<small>${date.format(
        "HH:mm"
      )}</small>`;
    },
    itemCurrency(item) {
      if (item.INDEX_TYPE == "INDEX_PRICE_US" || item.CURRENCY_CD == "USD") {
        return "USD";
      } else if (
        item.INDEX_TYPE == "INDEX_PRICE_JP" &&
        item.INDEX_CD != "I0001"
      ) {
        return "円";
      }
      return "";
    },
    conditionDetail(index_type, id) {
      this.$router.push({
        name: "MarketConditionInfo",
        query: {
          index_type: index_type,
          id: id,
        },
      });
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },
    number_format2(num) {
      return commonJs.number_format2(num);
    },
  },
  created() {
    this.pageInit();
  },
};
