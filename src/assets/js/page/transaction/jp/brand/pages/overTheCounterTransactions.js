import TopInfoItem from "@/views/transaction/jp/brand/components/topInfoItem";
import { mapGetters } from "vuex";
import MixedChart from "@/views/transaction/jp/brand/components/mixedChart";
import ColumnChart from "@/views/transaction/jp/brand/components/columnChart";
import BuyModal from "@/views/transaction/jp/brand/components/buyModal";
import SellModal from "@/views/transaction/jp/brand/components/sellModal";
import MarketInfoOverCounterTrans from "@/views/transaction/jp/brand/components/marketInfoOverCounterTrans";
import ColumnChartInfo from "@/views/transaction/jp/brand/components/columnChartInfo";
import commonJs from "@/assets/js/common/common";

export default {
  name: "OverCounterTransactions",
  components: {
    ColumnChartInfo,
    MarketInfoOverCounterTrans,
    SellModal,
    BuyModal,
    ColumnChart,
    MixedChart,
    TopInfoItem,
  },
  data() {
    return {
      title: "銘柄情報",
      query: {
        stockCd: "",
        exchangeCls: "",
      },
      stockPriceDetail: {
        stockTitle: "",
        exchangeNm: "",
        last: "",
        dayBeforeRate: "",
        dayBeforeRatio: "",
      },
      chartInfo: {
        todaysBasePrc: "",
        open: "",
        high: "",
        low: "",
        volume: "",
        per: "",
        dividendYield: "",
      },
      transLimitFlg: 0,
      transLimitText: "",
      marketInfo: {
        volume: "",
        mkt_cap: "",
        per: "",
        dividend: "",
        trd_unit: "",
        trd_prc: "",
        vwap: "",
        pbr: "",
        ex_divid_d: "",
        fin_res_d: "",
        ex_rights_d: "",
        y_high_price: "",
        y_high_price_d: "",
        y_low_price: "",
        y_low_price_d: "",
        list_to_high: "",
        list_to_high_d: "",
        list_to_low: "",
        list_to_low_d: "",
        step_price_1: "",
        step_price_tm_1: "",
        step_price_2: "",
        step_price_tm_2: "",
        step_price_3: "",
        step_price_tm_3: "",
        step_price_4: "",
        step_price_tm_4: "",
      },
      listResultInfo: null,
      buyModal: false,
      sellModal: false,
      requestConst: null,
      accessTokenCheer:
        localStorage.getItem(commonJs.getAccessTokenKey()) ?? "",
      stockOwnedList: [],
      soldQuantity: 0,
      styleDisabled: "background-color: #D6D8D8; color: #fff; border:unset",
      stockBrandJp: {
        markup_ask: 0,
        markup_bid: 0,
      },
    };
  },
  created() {
    this.requestConst = this.getRequestConst();
  },
  mounted() {
    this.query.stockCd = this.$route.query.stock_cd;
    this.query.exchangeCls = this.$route.query.exchange_cls;
    this.mixedChart();
    this.columnChart();
    if (
      commonJs.validateIdQueryParam(this.query.stockCd) &&
      commonJs.validateIdQueryParam(this.query.exchangeCls)
    ) {
      this.getStockPriceDetail();
      this.getStockBrandDetail();
      this.getResultInfo();
      this.getStockOwned();
    }
  },
  computed: {
    DATE() {
      return {
        date: this.Moment().format("YYYY/MM/DD"),
        time: this.Moment().format("HH:mm"),
      };
    },
  },
  methods: {
    ...mapGetters([
      "stockPrice",
      "stockBrand",
      "stockSign",
      "resultInfo",
      "stockOwned",
    ]),
    ...mapGetters("common", ["getRequestConst"]),

    mixedChart() {
      const VUE_APP_CHART_JP =
        process.env.VUE_APP_CHART + "/charts/jp-chart.html";
      if (this.query.stockCd && this.query.exchangeCls) {
        let mixedChart = document.getElementById("mixed_chart");
        mixedChart &&
          (mixedChart.src = `${VUE_APP_CHART_JP}?Authorization=${this.accessTokenCheer}&X-Company-Id=${this.requestConst["X-Company-Id"]}&X-DU=${this.requestConst["X-DU"]}&X-SV=${this.requestConst["X-SV"]}&X-PF=${this.requestConst["X-PF"]}&X-UA=${this.requestConst["X-UA"]}&X-OV=${this.requestConst["X-OV"]}&X-MD=${this.requestConst["X-MD"]}&APP_TARGET=${this.requestConst["APP_TARGET"]}&BRAND_ID=${this.query.stockCd}&EXCHANGE_CLS=${this.query.exchangeCls}`);
      }
    },

    columnChart() {
      const VUE_APP_CHART_COLUMN =
        process.env.VUE_APP_CHART + "/charts/column-chart.html";
      if (this.query.stockCd && this.query.exchangeCls) {
        let columnChart = document.getElementById("column_chart");
        columnChart &&
          (columnChart.src = `${VUE_APP_CHART_COLUMN}?X-Company-Id=${this.requestConst["X-Company-Id"]}&Authorization=${this.accessTokenCheer}&X-DU=${this.requestConst["X-DU"]}&X-SV=${this.requestConst["X-SV"]}&X-PF=${this.requestConst["X-PF"]}&X-UA=${this.requestConst["X-UA"]}&X-OV=${this.requestConst["X-OV"]}&X-MD=${this.requestConst["X-MD"]}&APP_TARGET=${this.requestConst["APP_TARGET"]}&BRAND_CD=${this.query.stockCd}`);
      }
    },

    setStockDetail(data) {
      let stockCd = data["stock_cd"];
      if (stockCd.endsWith("0")) {
        stockCd = stockCd.slice(0, stockCd.length - 1);
      }
      this.stockPriceDetail.stockTitle = `${data["stock_nm"]}(${stockCd})`;
      this.stockPriceDetail.exchangeNm = data["exchange_cls_nm"];
      this.stockPriceDetail.last = data["last"]
        ? this.handNumberInt(data["last"])
        : "-";
      this.stockPriceDetail.dayBeforeRate = data["day_before_rate"];
      this.stockPriceDetail.dayBeforeRatio = data["day_before_ratio"];
    },

    setChartInfo(data) {
      this.chartInfo.todaysBasePrc = this.numberFloatIsZero(
        this.number_format(data["todays_base_prc"], 1)
      );
      this.chartInfo.open = this.numberFloatIsZero(
        this.number_format(data["open"], 1)
      );
      this.chartInfo.high = this.numberFloatIsZero(
        this.number_format(data["high"], 1)
      );
      this.chartInfo.low = this.numberFloatIsZero(
        this.number_format(data["low"], 1)
      );
      this.chartInfo.volume = this.handNumberInt(data["volume"]);
      this.chartInfo.per = this.numberFloatIsZero(
        this.number_format(data["per"], 2)
      );
      this.chartInfo.dividend_yield = data["dividend_yield"];
    },

    setMarketInfo(data) {
      this.marketInfo = {
        volume: this.handNumberInt(data["volume"]),
        mkt_cap: data["mkt_cap"],
        per: this.numberFloatIsZero(this.number_format(data["per"], 2)),
        dividend: "-",
        trd_unit: data["trd_unit"],
        trd_prc: data["trd_prc"],
        vwap: this.handNumberInt(data["vwap"]),
        pbr: this.numberFloatIsZero(this.number_format(data["pbr"], 2)),
        ex_divid_d: data["ex_divid_d"],
        fin_res_d: data["fin_res_d"],
        ex_rights_d: data["ex_rights_d"],
        y_high_price: this.handNumberInt(data["y_high_price"]),
        y_high_price_d: data["y_high_price_d"],
        y_low_price: this.handNumberInt(data["y_low_price"]),
        y_low_price_d: data["y_low_price_d"],
        list_to_high: this.handNumberInt(data["list_to_high"]),
        list_to_high_d: data["list_to_high_d"],
        list_to_low: this.handNumberInt(data["list_to_low"]),
        list_to_low_d: data["list_to_low_d"],
        step_price_1: this.handNumberInt(data["step_price_1"]),
        step_price_tm_1: data["step_price_tm_1"],
        step_price_2: this.handNumberInt(data["step_price_2"]),
        step_price_tm_2: data["step_price_tm_2"],
        step_price_3: this.handNumberInt(data["step_price_3"]),
        step_price_tm_3: data["step_price_tm_3"],
        step_price_4: this.handNumberInt(data["step_price_4"]),
        step_price_tm_4: data["step_price_tm_4"],
      };
    },

    setStockBrandJp(data) {
      let markup_ask = 0;
      let markup_bid = 0;
      let markup_ask_formated = this.number_format(data["markup_ask"], 2);
      let markup_bid_formated = this.number_format(data["markup_bid"], 2);

      if (data["markup_ask"] === null || data["markup_ask"] === "") {
        markup_ask = "-";
      } else {
        markup_ask = this.numberFloatCustom(markup_ask_formated);
      }

      if (data["markup_bid"] === null || data["markup_bid"] === "") {
        markup_bid = "-";
      } else {
        markup_bid = this.numberFloatCustom(markup_bid_formated);
      }

      this.stockBrandJp.markup_ask = markup_ask;
      this.stockBrandJp.markup_bid = markup_bid;
    },

    getStockPriceDetail() {
      this.$store
        .dispatch("getStockDetailJp", {
          stock_cd: this.query.stockCd,
          exchange_cls: this.query.exchangeCls,
        })
        .then(() => {
          let data = this.stockPrice()["DATA"];
          this.setStockDetail(data);
          this.setChartInfo(data);
          this.setMarketInfo(data);
        });
    },

    getStockBrandDetail() {
      this.$store
        .dispatch("getStockBrandJp", {
          stock_cd: this.query.stockCd,
          exchange_cls: this.query.exchangeCls,
        })
        .then(() => {
          const data = this.stockBrand()["DATA"];
          this.setStockBrandJp(data);
          if (
            data["comm_buy_stop_flg"] > 1 ||
            data["comm_sell_stop_flg"] > 1 ||
            data["otc_buy_stop_flg"] > 1 ||
            data["otc_sell_stop_flg"] > 1 ||
            data["price_stabilization_cls"] > 1 ||
            data["tender_offer_cls"] > 1 ||
            data["same_day_deposit_cls"] > 1 ||
            data["fgn_restriction_flg"] > 1 ||
            data["notice_flg"] == 1
          ) {
            this.transLimitFlg = 1;
            if (
              data["price_stabilization_cls"] > 1 ||
              data["tender_offer_cls"] > 1 ||
              data["same_day_deposit_cls"] > 1 ||
              data["fgn_restriction_flg"] > 1 ||
              data["notice_flg"] == 1
            ) {
              this.transLimitFlg = 2;
            }
          }
          this.transLimitText =
            this.transLimitFlg > 0 ? "取引規制あり" : "取引規制なし";
        });
    },

    getResultInfo() {
      this.$store
        .dispatch("getResultInfo", {
          stock_cd: this.query.stockCd,
        })
        .then(() => {
          this.listResultInfo = this.resultInfo()["DATA"]["lst_result_info"];
        });
    },

    getStockOwned() {
      this.$store
        .dispatch("getStockOwnedList", {
          stock_cd: this.query.stockCd,
        })
        .then(() => {
          this.stockOwnedList = this.stockOwned()["DATA"];
          this.stockOwnedList["lst_stock_owned_infor"].forEach((value) => {
            if (value["stock_cd"] == this.query.stockCd) {
              this.soldQuantity = value["sold_quantity"];
            }
            if (this.soldQuantity > 0) {
              this.styleDisabled = "";
            }
          });
        });
    },

    openBuyModal() {
      let data = this.stockBrand()["DATA"];
      if (data["otc_select_brand_cls"] === "0") {
        this.$router.push({
          name: "BuyStockJP",
          query: {
            stock_cd: this.$route.query.stock_cd,
            exchange_cls: this.$route.query.exchange_cls,
            kind: 2,
          },
        });
      } else {
        this.buyModal = true;
      }
    },

    openSellModal() {
      let data = this.stockBrand()["DATA"];
      if (data["otc_select_brand_cls"] === "0") {
        this.$router.push({
          name: "SellStockJP",
          query: {
            stock_cd: this.$route.query.stock_cd,
            exchange_cls: this.$route.query.exchange_cls,
            kind: 2,
          },
        });
      } else {
        this.sellModal = true;
      }
    },

    closeBuyModal() {
      this.buyModal = false;
    },

    closeSellModal() {
      this.sellModal = false;
    },

    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },

    handNumberFloat(number, decimals) {
      return commonJs.handNumberFloat(number, decimals);
    },

    number_format(number, decimals) {
      return commonJs.number_format(number, decimals);
    },

    numberFloatIsZero(number) {
      return number == 0 ? null : number;
    },

    numberFloatCustom(number) {
      if (number.split(".")[1] == 0) {
        return number.split(".")[0];
      } else if (number[number.length - 1] == 0) {
        return number.slice(0, number.length - 1);
      }
      return 0;
    },
  },
};
