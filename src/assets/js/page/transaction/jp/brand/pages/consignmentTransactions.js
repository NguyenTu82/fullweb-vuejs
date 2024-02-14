import { mapGetters } from "vuex";
import MarketInfo from "@/views/transaction/jp/brand/components/marketInfo";
import BoardInfo from "@/views/transaction/jp/brand/components/boardInfo";
import ColumnChart from "@/views/transaction/jp/brand/components/columnChart";
import BuyModal from "@/views/transaction/jp/brand/components/buyModal";
import SellModal from "@/views/transaction/jp/brand/components/sellModal";
import ColumnChartInfo from "@/views/transaction/jp/brand/components/columnChartInfo";
import commonJs from "@/assets/js/common/common";
import TopInfoItem from "@/views/transaction/jp/brand/components/topInfoItem";
import MixedChart from "@/views/transaction/jp/brand/components/mixedChart";

export default {
  name: "ConsignmentTransactions",
  components: {
    MixedChart,
    TopInfoItem,
    SellModal,
    BuyModal,
    ColumnChart,
    BoardInfo,
    MarketInfo,
    ColumnChartInfo,
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
      boardInfo: {
        trd_unit: "",
        mktod_ask_vol: "",
        mktod_bid_vol: "",
        conb_ask_vol: "",
        best_ask_vol_10: "",
        best_ask_vol_9: "",
        best_ask_vol_8: "",
        best_ask_vol_7: "",
        best_ask_vol_6: "",
        best_ask_vol_5: "",
        best_ask_vol_4: "",
        best_ask_vol_3: "",
        best_ask_vol_2: "",
        best_ask_vol_1: "",
        best_ask_10: "",
        best_ask_9: "",
        best_ask_8: "",
        best_ask_7: "",
        best_ask_6: "",
        best_ask_5: "",
        best_ask_4: "",
        best_ask_3: "",
        best_ask_2: "",
        best_ask_1: "",
        best_bid_1: "",
        best_bid_2: "",
        best_bid_3: "",
        best_bid_4: "",
        best_bid_5: "",
        best_bid_6: "",
        best_bid_7: "",
        best_bid_8: "",
        best_bid_9: "",
        best_bid_10: "",
        best_bid_vol_1: "",
        best_bid_vol_2: "",
        best_bid_vol_3: "",
        best_bid_vol_4: "",
        best_bid_vol_5: "",
        best_bid_vol_6: "",
        best_bid_vol_7: "",
        best_bid_vol_8: "",
        best_bid_vol_9: "",
        best_bid_vol_10: "",
        conb_bid_vol: "",
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
      tickSizeRule: [],
      sell: "",
      buy: "",
      offsetStrSell: "",
      offsetStrBuy: "",
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
      Promise.all([
        this.getStockPriceDetail(),
        this.getStockBrandDetail(),
        this.getStockSignDetail(),
      ]).then((result) => {
        const boardInfo = result[2]["DATA"];
        this.sell = boardInfo["best_ask_kind_1"];
        this.buy = boardInfo["best_bid_kind_1"];
        if (this.sell) {
          this.offsetStrSell = commonJs.getStockBoardOffsetStr(this.sell) ?? "-";
        }
        if (this.buy) {
          this.offsetStrBuy = commonJs.getStockBoardOffsetStr(this.buy) ?? "-";
        }
        this.boardInfo.trd_unit = result[0]["DATA"]["trd_unit"];
        if (result[0]["STATUS"] === "OK" && result[1]["STATUS"] === "OK") {
          if (this.getPriceStep(result[0]["DATA"]["last"] ?? 0.0) < 1.0) {
            this.setBoardInfo(boardInfo, true);
          } else {
            this.setBoardInfo(boardInfo);
          }
        }
      });
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

    checkFlag(data) {
      return commonJs.checkFlagOrder(data);
    },

    mixedChart() {
      const VUE_APP_CHART_JP =
        process.env.VUE_APP_CHART + "/charts/jp-chart.html";
      if (this.query.stockCd && this.query.exchangeCls) {
        let mixedChart = document.getElementById("mixed_chart");
        mixedChart && (mixedChart.src = `${VUE_APP_CHART_JP}?Authorization=${this.accessTokenCheer}&X-Company-Id=${this.requestConst["X-Company-Id"]}&X-DU=${this.requestConst["X-DU"]}&X-SV=${this.requestConst["X-SV"]}&X-PF=${this.requestConst["X-PF"]}&X-UA=${this.requestConst["X-UA"]}&X-OV=${this.requestConst["X-OV"]}&X-MD=${this.requestConst["X-MD"]}&APP_TARGET=${this.requestConst["APP_TARGET"]}&BRAND_ID=${this.query.stockCd}&EXCHANGE_CLS=${this.query.exchangeCls}`);
      }
    },

    columnChart() {
      const VUE_APP_CHART_COLUMN =
        process.env.VUE_APP_CHART + "/charts/column-chart.html";
      if (this.query.stockCd && this.query.exchangeCls) {
        let columnChart = document.getElementById("column_chart");
        columnChart && (columnChart.src = `${VUE_APP_CHART_COLUMN}?X-Company-Id=${this.requestConst["X-Company-Id"]}&Authorization=${this.accessTokenCheer}&X-DU=${this.requestConst["X-DU"]}&X-SV=${this.requestConst["X-SV"]}&X-PF=${this.requestConst["X-PF"]}&X-UA=${this.requestConst["X-UA"]}&X-OV=${this.requestConst["X-OV"]}&X-MD=${this.requestConst["X-MD"]}&APP_TARGET=${this.requestConst["APP_TARGET"]}&BRAND_CD=${this.query.stockCd}`);
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
        : "";
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
      this.chartInfo.exp_dividend_yield = data["exp_dividend_yield"];
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
        y_high_price: this.formatFloatAfterDot(
          this.number_format(data["y_high_price"], 1)
        ),
        y_high_price_d: data["y_high_price_d"],
        y_low_price: this.formatFloatAfterDot(
          this.number_format(data["y_low_price"], 1)
        ),
        y_low_price_d: data["y_low_price_d"],
        list_to_high: this.formatFloatAfterDot(
          this.number_format(data["list_to_high"], 1)
        ),
        list_to_high_d: data["list_to_high_d"],
        list_to_low: this.formatFloatAfterDot(
          this.number_format(data["list_to_low"], 1)
        ),
        list_to_low_d: data["list_to_low_d"],
        step_price_1: this.formatFloatAfterDot(
          this.number_format(data["step_price_1"], 1)
        ),
        step_price_tm_1: data["step_price_tm_1"],
        step_price_2: this.formatFloatAfterDot(
          this.number_format(data["step_price_2"], 1)
        ),
        step_price_tm_2: data["step_price_tm_2"],
        step_price_3: this.formatFloatAfterDot(
          this.number_format(data["step_price_3"], 1)
        ),
        step_price_tm_3: data["step_price_tm_3"],
        step_price_4: this.formatFloatAfterDot(
          this.number_format(data["step_price_4"], 1)
        ),
        step_price_tm_4: data["step_price_tm_4"],
      };
    },

    setBoardInfo(data, float = false) {
      this.boardInfo.mktod_ask_vol = this.handNumberInt(data["mktod_ask_vol"]);
      this.boardInfo.mktod_bid_vol = this.handNumberInt(data["mktod_bid_vol"]);
      this.boardInfo.conb_ask_vol = this.handNumberInt(data["conb_ask_vol"]);
      this.boardInfo.best_ask_vol_10 = this.handNumberInt(
        data["best_ask_vol_10"]
      );
      this.boardInfo.best_ask_vol_9 = this.handNumberInt(
        data["best_ask_vol_9"]
      );
      this.boardInfo.best_ask_vol_8 = this.handNumberInt(
        data["best_ask_vol_8"]
      );
      this.boardInfo.best_ask_vol_7 = this.handNumberInt(
        data["best_ask_vol_7"]
      );
      this.boardInfo.best_ask_vol_6 = this.handNumberInt(
        data["best_ask_vol_6"]
      );
      this.boardInfo.best_ask_vol_5 = this.handNumberInt(
        data["best_ask_vol_5"]
      );
      this.boardInfo.best_ask_vol_4 = this.handNumberInt(
        data["best_ask_vol_4"]
      );
      this.boardInfo.best_ask_vol_3 = this.handNumberInt(
        data["best_ask_vol_3"]
      );
      this.boardInfo.best_ask_vol_2 = this.handNumberInt(
        data["best_ask_vol_2"]
      );
      this.boardInfo.best_ask_vol_1 = this.handNumberInt(
        data["best_ask_vol_1"]
      );
      this.boardInfo.best_ask_10 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_10"], 1))
        : this.handNumberInt(data["best_ask_10"]);
      this.boardInfo.best_ask_9 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_9"], 1))
        : this.handNumberInt(data["best_ask_9"]);
      this.boardInfo.best_ask_8 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_8"], 1))
        : this.handNumberInt(data["best_ask_8"]);
      this.boardInfo.best_ask_7 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_7"], 1))
        : this.handNumberInt(data["best_ask_7"]);
      this.boardInfo.best_ask_6 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_6"], 1))
        : this.handNumberInt(data["best_ask_6"]);
      this.boardInfo.best_ask_5 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_5"], 1))
        : this.handNumberInt(data["best_ask_5"]);
      this.boardInfo.best_ask_4 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_4"], 1))
        : this.handNumberInt(data["best_ask_4"]);
      this.boardInfo.best_ask_3 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_3"], 1))
        : this.handNumberInt(data["best_ask_3"]);
      this.boardInfo.best_ask_2 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_2"], 1))
        : this.handNumberInt(data["best_ask_2"]);
      this.boardInfo.best_ask_1 = float
        ? this.numberFloatIsZero(this.number_format(data["best_ask_1"], 1))
        : this.handNumberInt(data["best_ask_1"]);
      this.boardInfo.best_bid_1 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_1"], 1))
        : this.handNumberInt(data["best_bid_1"]);
      this.boardInfo.best_bid_2 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_2"], 1))
        : this.handNumberInt(data["best_bid_2"]);
      this.boardInfo.best_bid_3 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_3"], 1))
        : this.handNumberInt(data["best_bid_3"]);
      this.boardInfo.best_bid_4 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_4"], 1))
        : this.handNumberInt(data["best_bid_4"]);
      this.boardInfo.best_bid_5 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_5"], 1))
        : this.handNumberInt(data["best_bid_5"]);
      this.boardInfo.best_bid_6 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_6"], 1))
        : this.handNumberInt(data["best_bid_6"]);
      this.boardInfo.best_bid_7 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_7"], 1))
        : this.handNumberInt(data["best_bid_7"]);
      this.boardInfo.best_bid_8 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_8"], 1))
        : this.handNumberInt(data["best_bid_8"]);
      this.boardInfo.best_bid_9 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_9"], 1))
        : this.handNumberInt(data["best_bid_9"]);
      this.boardInfo.best_bid_10 = float
        ? this.numberFloatIsZero(this.number_format(data["best_bid_10"], 1))
        : this.handNumberInt(data["best_bid_10"]);
      this.boardInfo.best_bid_vol_1 = this.handNumberInt(
        data["best_bid_vol_1"]
      );
      this.boardInfo.best_bid_vol_2 = this.handNumberInt(
        data["best_bid_vol_2"]
      );
      this.boardInfo.best_bid_vol_3 = this.handNumberInt(
        data["best_bid_vol_3"]
      );
      this.boardInfo.best_bid_vol_4 = this.handNumberInt(
        data["best_bid_vol_4"]
      );
      this.boardInfo.best_bid_vol_5 = this.handNumberInt(
        data["best_bid_vol_5"]
      );
      this.boardInfo.best_bid_vol_6 = this.handNumberInt(
        data["best_bid_vol_6"]
      );
      this.boardInfo.best_bid_vol_7 = this.handNumberInt(
        data["best_bid_vol_7"]
      );
      this.boardInfo.best_bid_vol_8 = this.handNumberInt(
        data["best_bid_vol_8"]
      );
      this.boardInfo.best_bid_vol_9 = this.handNumberInt(
        data["best_bid_vol_9"]
      );
      this.boardInfo.best_bid_vol_10 = this.handNumberInt(
        data["best_bid_vol_10"]
      );
      this.boardInfo.conb_bid_vol = this.handNumberInt(data["conb_bid_vol"]);
    },

    getStockPriceDetail() {
      return this.$store
        .dispatch("getStockDetailJp", {
          stock_cd: this.query.stockCd,
          exchange_cls: this.query.exchangeCls,
        })
        .then(() => {
          let data = this.stockPrice()["DATA"];
          this.setStockDetail(data);
          this.setChartInfo(data);
          this.setMarketInfo(data);
          return this.stockPrice();
        });
    },

    getStockBrandDetail() {
      return this.$store
        .dispatch("getStockBrandJp", {
          stock_cd: this.query.stockCd,
          exchange_cls: this.query.exchangeCls,
        })
        .then(() => {
          const data = this.stockBrand()["DATA"];
          this.tickSizeRule = data["tick_size_rule"];
          this.transLimitFlg = this.checkFlag(data);

          this.transLimitText =
            this.transLimitFlg ? "取引規制あり" : "取引規制なし";
          return this.stockPrice();
        });
    },

    getStockSignDetail() {
      return this.$store
        .dispatch("getStockSignJp", {
          brand_cd: this.query.stockCd,
          exchange_cls: this.query.exchangeCls,
        })
        .then(() => {
          return this.stockSign();
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
          this.stockOwnedList["lst_stock_owned_infor"]?.forEach((value) => {
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
            kind: 1,
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
            kind: 1,
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

    formatFloatAfterDot(number) {
      if (number.split(".")[1] == 0) {
        return number.split(".")[0];
      }
      return number;
    },

    getPriceStep(value) {
      let offSet = 1.0;
      this.tickSizeRule.forEach((item) => {
        if (
          item["min_tick_size_price"] <= value &&
          item["max_tick_size_price"] > value
        ) {
          offSet = item["tick_size"];
          return offSet;
        }
      });
      return offSet;
    },
  },
};
