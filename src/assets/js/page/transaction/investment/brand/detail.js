import { Decimal } from "decimal.js";
import FundChart from "@/views/transaction/investment/common/FundChart";
import PopupPriceAmount from "@/views/transaction/investment/common/PopupPriceAmount.vue";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import { mapActions } from "vuex";

export default {
  title: "ホーム",
  name: "InvestBrandDetail",
  components: {
    FundChart,
    PopupPriceAmount,
    TopInfo,
  },
  data() {
    return {
      isLoadingSellOrderInitialInfo: false,
      stockHandleType: "",
      showOptionPanel: false,
      paragraphOpen: false,
      dataInvest: null,
      dataInvestInfo: null,
      dataInvestChart: null,
      fund_chart_period: "2",
      dataFundChart: [],
      inv_trust_assoc_cd: "",
      shortHeightObj: {
        height: "auto",
        remove: false,
        times: 0,
        parentHeight: 0,
      },
      longHeightObj: {
        height: "auto",
        remove: false,
        times: 0,
        parentHeight: 0,
      },
      commonStyle: {
        width: "1.64rem",
        height: "0.4rem",
        color: "#ffffff",
        background: "#7A7A7A",
      },
      dividendCls: null,
      dataInvestSell: null,
      checkRedirectPageSellOrderNumber: false,
      stock: {
        investment: 3
      }
    };
  },
  mounted() {
    this.getDataFundChart().then((res) => {
      this.dataFundChart = res;
    });
    setTimeout(() => {
      this.shortHeightObj.times = 1;
      this.longHeightObj.times = 1;
      setTimeout(() => {
        this.$emit("getNewHeight", this.shortHeightObj.parentHeight);
      }, 300);
    }, 300);
  },

  created() {
    const { inv_trust_assoc_cd } = this.$route.query;
    this.inv_trust_assoc_cd = inv_trust_assoc_cd;
    this.getInvestBrandDetail().then((res) => {
      let resultInfo = res.fund_info_list[0];
      this.dataInvestInfo = resultInfo;
      this.dividendCls = resultInfo.dividend_cls;
      this.dataInvestInfo.brandLabels = [];
      this.dataInvestInfo.brandLabels.push({
        id: resultInfo.dividend_cls,
        name: resultInfo.dividend_cls_nm,
      });
      if (resultInfo.fund_attr_cls !== "1") {
        this.dataInvestInfo.brandLabels.push({
          id: resultInfo.fund_attr_cls,
          name: resultInfo.fund_attr_cls_nm,
        });
      }
      if (resultInfo.fund_type_list && resultInfo.fund_type_list.length) {
        resultInfo.fund_type_list.forEach((item) => {
          this.dataInvestInfo.brandLabels.push({
            id: item.fund_type_cls,
            name: item.fund_type_nm,
          });
        });
      }
      this.dataInvestInfo.listData = resultInfo.buy_fee_list;
      this.dataInvestInfo.buyInfoList = [
        {
          title: "信託報酬／年（税込）",
          value: resultInfo.trust_fee ? `${resultInfo.trust_fee} %` : "0.00 %",
        },
        {
          title: "信託財産留保額",
          value: commonJs.handNumberInt(resultInfo.partial_red_charge),
        },
        {
          title: "約定日",
          value:
            resultInfo.buy_exec_days == 0
              ? "注文日当日"
              : `申込みの${resultInfo.buy_exec_days}営業日後`,
        },
        {
          title: "受渡日",
          value: resultInfo.buy_value_days
            ? `申込みの${resultInfo.buy_value_days}営業日後`
            : "",
        },
        {
          title: "決算日",
          value: `${
            resultInfo.settlement_d
              ? commonJs.handleDateMonth(resultInfo.settlement_d)
              : "決算無し"
          }（${resultInfo.closing_cls_nm || ""}）`,
        },
        {
          title: "償還日",
          value: resultInfo.redemption_d
            ? commonJs.handleCheckUnlimitedDay(resultInfo.redemption_d)
            : "",
        },
        {
          title: "取引締切時間",
          value: `毎営業日 ${
            resultInfo.closing_time && resultInfo.closing_time.slice(0, 5)
          }`,
          time: resultInfo.closing_time && resultInfo.closing_time.slice(0, 5),
          tip: "15:00以降のご注文は翌営業日扱いとなります",
        },
      ];
      const milionCaptial = new Decimal(resultInfo.capital || 0)
        .dividedBy(100000000)
        .toFixed(2);
      const roundReturnLastThreeYears = new Decimal(
        resultInfo.return_last_three_years || 0
      ).toFixed(2);
      this.dataInvestInfo.trendData = {
        return_last_three_years: roundReturnLastThreeYears,
        capital: commonJs.handNumberFloat(milionCaptial, 2),
        last_dividend_d: resultInfo.last_dividend_d,
        last_dividend: commonJs.handNumberInt(resultInfo.last_dividend),
      };
    });
    this.getStocKSellInfo().then((res) => {
      if (res.STATUS == "OK") {
        this.checkRedirectPageSellOrderNumber =
          res.DATA.fund_position_quantity.length;
      }
    });
    this.brandSearchAccess({
      product_cd: this.stock.investment,
      stock_cd: this.$route.query.inv_trust_assoc_cd
    });
  },

  directives: {
    getHeight(el, binding) {
      if (el && binding.value) {
        let heightObj = binding.value;
        if (heightObj.times > 0) {
          heightObj.height = el.clientHeight + "px";
          let shortHeight = el.parentElement.children[2].clientHeight;
          heightObj.parentHeight =
            el.parentElement.clientHeight -
            shortHeight +
            el.clientHeight +
            "px";
          heightObj.remove = true;
        }
      }
    },
  },
  methods: {
    ...mapActions(["brandSearchAccess"]),

    checkAMT(item) {
      if (item.min_amt == 0 && item.max_amt == 999999999)
        return `税抜${
          item.fee_type_cls == 1 ? item.comm_fee_rate : item.comm_fee_rate * 100
        }${item.fee_type_cls == 1 ? "円" : "%"}`;
      if (item.min_amt == 0 && item.max_amt != 999999999)
        return `${commonJs.handNumberMoneyTransfer(item.max_amt)}未満：税抜${
          item.fee_type_cls == 1 ? item.comm_fee_rate : item.comm_fee_rate * 100
        }${item.fee_type_cls == 1 ? "円" : "%"}`;
      if (item.min_amt != 0 && item.max_amt == 999999999)
        return `${commonJs.handNumberMoneyTransfer(item.min_amt)}以上：税抜${
          item.fee_type_cls == 1 ? item.comm_fee_rate : item.comm_fee_rate * 100
        }${item.fee_type_cls == 1 ? "円" : "%"}`;
      if (item.min_amt != 0 && item.max_amt != 999999999)
        return `${commonJs.handNumberMoneyTransfer(
          item.min_amt
        )}以上${commonJs.handNumberMoneyTransfer(item.max_amt)}未満：税抜${
          item.fee_type_cls == 1 ? item.comm_fee_rate : item.comm_fee_rate * 100
        }${item.fee_type_cls == 1 ? "円" : "%"}`;
    },
    showName(e) {
      const find = e.lastIndexOf("_");
      const newText = e.slice(0, find);
      return newText;
    },
    async getInvestBrandDetail() {
      await this.$store.dispatch("getInvestBrandDetail", {
        inv_trust_assoc_cd: this.inv_trust_assoc_cd,
      });
      this.dataInvest = this.$store.getters.getDataInvestDetail?.DATA;
      return this.dataInvest;
    },
    async getDataFundChart(period) {
      await this.$store.dispatch("getInvestBrandDetailChart", {
        period_cls: period || this.fund_chart_period,
        inv_trust_assoc_cd: this.inv_trust_assoc_cd,
      });
      this.dataInvestChart =
        this.$store.getters.getInvestBrandDetailChart.DATA.inv_graph_data_list;
      return this.dataInvestChart;
    },
    updateFundChartPeriod(period) {
      this.fund_chart_period = period;
      this.getDataFundChart(period).then((res) => {
        this.dataFundChart = res;
      });
    },
    pullDownParagraph() {
      this.paragraphOpen = !this.paragraphOpen;
      this.sendNewHeight(
        this.paragraphOpen
          ? this.longHeightObj.parentHeight
          : this.shortHeightObj.parentHeight
      );
    },
    sendNewHeight(height) {
      this.$emit("getNewHeight", height);
    },
    hidePopup() {
      this.showOptionPanel = false;
    },
    openPopup(stockHandleType) {
      if (
        stockHandleType == "SELL" &&
        this.checkRedirectPageSellOrderNumber != 2
      ) {
        let sellCls =
          this.dataInvestSell.DATA.fund_position_quantity[0].dividend_cls;
        this.handleSellOrder(sellCls);
      } else {
        if (this.dividendCls == 3) {
          this.stockHandleType = stockHandleType;
          this.showOptionPanel = true;
        } else {
          switch (stockHandleType) {
            case "BUY":
              this.handleBuyOrder(this.dividendCls);
              break;
            case "SELL":
              this.handleSellOrder(this.dividendCls);
              break;
            default:
              break;
          }
          this.stockHandleType = "";
        }
      }
    },
    handleClickPopupData(dataPopupDividendCls) {
      this.hidePopup();
      switch (this.stockHandleType) {
        case "BUY":
          this.handleBuyOrder(dataPopupDividendCls);
          break;
        case "SELL":
          this.handleSellOrder(dataPopupDividendCls);
          break;
        default:
          break;
      }
      this.stockHandleType = "";
    },
    handleBuyOrder(dataPopupDividendCls) {
      this.$router.push({
        path: "/transaction/investment/buy",
        query: {
          inv_trust_assoc_cd: this.inv_trust_assoc_cd,
          dataPopupDividendCls,
        },
      });
    },
    handleSellOrder(dataPopupDividendCls) {
      this.$router.push({
        path: "/transaction/investment/sell",
        query: {
          inv_trust_assoc_cd: this.inv_trust_assoc_cd,
          dataPopupDividendCls,
        },
      });
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },
    handNumberIntCustom(number) {
      return commonJs.handNumberIntCustom(number);
    },
    async getStocKSellInfo() {
      await this.$store.dispatch("getStocKSellInfo", {
        inv_trust_assoc_cd: this.inv_trust_assoc_cd,
        account_cls: 2,
      });
      this.dataInvestSell = this.$store.getters.getStocKSellInfo;
      return this.dataInvestSell;
    },
  },
};
