import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import io from "socket.io-client";
import { mapActions, mapGetters } from "vuex";
import Decimal from "decimal.js";

export default {
  name: "MarketConditionInfo",
  components: { TopInfo },
  data() {
    return {
      isOpen: false,
      title: "",
      update_D: "",
      icon_url: "",
      datas: [],
      marketPrice: [],
      source: "vue",
      socket: "",
      indexType: "",
      marketInforId: "",
      marketInfor: "",
      requested: false,
      showBlack: false,
    };
  },
  computed: {
    ...mapGetters(["getDetailUs"]),
    ...mapGetters(["getDetailJP"]),
    ...mapGetters(["getHome"]),
    ...mapGetters("common", ["getRequestConst"]),

    unitStr() {
      return this.$route.query.id === "I0001"
        ? ""
        : this.$route.query.index_type === "EXCHANGE_RATE" ||
          this.$route.query.index_type === "INDEX_PRICE_JP"
        ? "円"
        : "USD";
    },
    chartUrl() {
      const requestConst = this.getRequestConst;
      let url = process.env.VUE_APP_CHART + "/charts/chart.html";
      if (this.requested) {
        url +=
          "?X-Company-Id=" +
          requestConst["X-Company-Id"] +
          "&X-DU=" +
          requestConst["X-DU"] +
          "&X-SV=" +
          requestConst["X-SV"] +
          "&X-PF=" +
          requestConst["X-PF"] +
          "&X-OV=" +
          requestConst["X-OV"] +
          "&X-MD=" +
          requestConst["X-MD"] +
          "&Authorization=" +
          localStorage.getItem(commonJs.getAccessTokenKey()) +
          "&APP_TARGET=" +
          requestConst["APP_TARGET"] +
          "&INDEX_TYPE=" +
          this.$route.query.index_type +
          "&INDEX_ID=" +
          this.$route.query.id +
          "&X-UA=" +
          requestConst["X-UA"];
        return url;
      } else {
        return "";
      }
    },
  },
  created() {
    window.enter_background = this.enter_background;
    window.enter_foreground = this.enter_foreground;
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let indexType = vm.$route.query.index_type;
      let id = vm.$route.query.id;
      let source = vm.$route.query.source;

      vm.indexType = indexType;
      vm.marketInforId = id;

      if (source) {
        vm.source = source;
      }
      if (indexType === "INDEX_PRICE_JP") {
        vm.getJPInfo(id);
      } else {
        vm.getInfo(indexType, id);
      }
    });
  },
  methods: {
    ...mapActions(["getDetailUsData"]),
    ...mapActions(["getDetailJPData"]),
    ...mapActions(["home"]),

    enter_background() {
      this.closeSocket();
    },
    enter_foreground() {
      this.getSocketData();
    },
    closeSocket() {
      this.socket.close && this.socket.close();
    },
    getSocketData() {
      let url = this.$store.state.common.WebSocketUS;
      let uuid = localStorage.getItem("uuid");
      url = url + "?id=" + uuid;
      let socket = io(url, {
        path: "/stock",
        transports: ["websocket"],
        debug: true,
      });
      this.socket = socket;
      socket.on("connect", () => {
        if (this.indexType === "INDEX_PRICE_JP") {
          socket.emit(
            "request_price_index_jp",
            '{ "INDEX_CD_LIST": ["' +
              this.marketInforId +
              '"],"TERMINAL_INFO": { "AU": "test" } }'
          );
        }

        socket.emit("join", "index_delay");
      });
      socket.on("index_delay", () => {
        if (this.indexType === "EXCHANGE_RATE") {
          socket.emit("request_price_fx", '{ "CURRENCY_CD_LIST": ["USD"] }');
        }
        if (this.indexType === "INDEX_PRICE_US") {
          socket.emit(
            "request_price_index_us",
            '{ "INDEX_ID_LIST": "' + this.marketInforId + '" }'
          );
        }
      });
      socket.on("price_index_jp", (data) => {
        let d = JSON.parse(data);
        let result = d.PRICE_INFO;

        this.resetData(result);

        this.marketInfor = Object.assign({}, this.marketInfor);
        this.handleData(this.marketInfor);
      });
      socket.on("price_index_us", (data) => {
        let d = JSON.parse(data);
        let result = d.PRICE_INFO;
        this.resetData(result);

        this.marketInfor = Object.assign({}, this.marketInfor);
        this.handleData(this.marketInfor);
      });
      socket.on("price_fx", (data) => {
        let d = JSON.parse(data);
        let result = d.PRICE_INFO;
        this.resetData(result);

        this.marketInfor = Object.assign({}, this.marketInfor);
        this.handleData(this.marketInfor);
      });
    },
    resetData(result) {
      if (result.BASE) this.marketInfor.PRICE.CURRENT_PRICE = result.BASE;
      if (result.CHANGE)
        this.marketInfor.PRICE.CHANGE_VALUE = parseFloat(result.CHANGE).toFixed(
          2
        );
      if (result.CRATE) this.marketInfor.PRICE.CHANGE_RATE = result.CRATE;
      if (result.HIGH) this.marketInfor.PRICE.HIGH_PRICE = result.HIGH;
      if (result.LOW) this.marketInfor.PRICE.LOW_PRICE = result.LOW;
      if (result.PREV)
        this.marketInfor.PRICE.YESTERDAY_CLOSE_PRICE = result.PREV;
      if (result.OPEN) this.marketInfor.PRICE.OPEN_PRICE = result.OPEN;

      if (result.PREV_D)
        this.marketInfor.PRICE.YESTERDAY_BASE_D = result.PREV_D;

      if (result.HIGH_DT) this.marketInfor.PRICE.HIGH_PRICE_DT = result.HIGH_DT;

      if (result.LOW_DT) this.marketInfor.PRICE.LOW_PRICE_DT = result.LOW_DT;

      if (result.UPDATE) this.marketInfor.PRICE.UPDATE_DT = result.UPDATE;
    },
    getInfo(indexType, id) {
      this.getDetailUsData({ indexType: indexType, id: id }).then(() => {
        if (this.getDetailUs.STATUS === "OK") {
          let data = this.getDetailUs.DATA;
          this.marketInfor = data;

          if (indexType === "INDEX_PRICE_US") {
            this.marketInfor.PRICE.YESTERDAY_BASE_D =
              this.marketInfor.PRICE.CLOSING_PRICE_DATE;
            this.marketInfor.PRICE.YESTERDAY_CLOSE_PRICE =
              this.marketInfor.PRICE.CLOSING_PRICE;
          }
          this.handleData(data);
        }
        this.requested = true;
      });
    },
    getJPInfo(id) {
      this.getDetailJPData({ ind_cd: id }).then(() => {
        this.requested = true;
        let result = this.getDetailJP.DATA;
        let updateText =
          result.trade_dt && result.update_tm
            ? result.trade_dt + " " + result.update_tm
            : null;
        let data = {
          PRICE: {
            INDEX_NAME: result.ind_nm || this.constant.IIS_STOCK_NM[id],
            CURRENT_PRICE: result.last || null,
            CHANGE_VALUE: result.day_before_rate || null,
            CHANGE_RATE: result.day_before_ratio || null,
            YESTERDAY_BASE_D: null,
            YESTERDAY_CLOSE_PRICE: result.todays_base_prc || null,
            OPEN_PRICE: result.open || null,
            HIGH_PRICE_DT: null,
            HIGH_PRICE: result.high || null,
            LOW_PRICE_DT: null,
            LOW_PRICE: result.low || null,
            RATE_DT: null,
            UPDATE_DT: updateText,
            // ICON_URL: require("/assets/icon/ja-1.svg"),
          },
        };
        this.marketInfor = data;
        this.handleData(data);
        this.getSocketData();
      });
    },
    handleData(data) {
      console.log("handleData >> data=", data);
      this.marketPrice = this.getHome.DATA.MARKET_PRICE;
      console.log("handleData >> marketPrice=", this.marketPrice);
      if (data.PRICE.INDEX_NAME === "NYダウ") {
        data.PRICE.CHANGE_RATE = this.marketPrice[2].CHANGE_RATE;
      } else if (data.PRICE.INDEX_NAME === "USD/JPY") {
        data.PRICE.CHANGE_RATE = this.marketPrice[3].CHANGE_RATE;
      }
      console.log("handleData >> 22 data=", data);
      this.title = data.PRICE.INDEX_NAME;
      let flag = 1;
      if (data.PRICE.CHANGE_VALUE < 0) {
        flag = -1;
      } else if (
        data.PRICE.CHANGE_VALUE === null ||
        data.PRICE.CHANGE_VALUE === 0
      ) {
        flag = 0;
      }
      let flagtext = "";
      let flagtext2 = "";
      if (flag === 1) {
        flagtext = "+";
        flagtext2 = "+";
      }

      let rate =
        this.indexType === "EXCHANGE_RATE"
          ? new Decimal(data.PRICE.CHANGE_RATE)
          : data.PRICE.CHANGE_RATE;

      if (this.indexType === "EXCHANGE_RATE") {
        rate = rate.times(1).toFixed(2, Decimal.ROUND_DOWN);
      }

      let info = [
        {
          title: "現在値",
          value: data.PRICE.CURRENT_PRICE
            ? commonJs.handNumber(data.PRICE.CURRENT_PRICE) +
              " " +
              "<small>" +
              this.unitStr +
              "</small>"
            : "ー",
        },
        {
          title: "前日比（率）",
          value:
            (data.PRICE.CHANGE_VALUE
              ? flagtext +
                commonJs.handNumber(data.PRICE.CHANGE_VALUE) +
                " " +
                "<small>" +
                this.unitStr +
                "</small>"
              : "ー" + "<small>" + this.unitStr + "</small>") +
            (rate
              ? "(" + flagtext2 + commonJs.handNumber(rate) + "%)"
              : "(ー%)"),
          flag: flag,
        },
        {
          title: "前日終値",
          date: data.PRICE["YESTERDAY_BASE_D"]
            ? "（" +
              "NY " +
              commonJs.handleDateStr(data.PRICE["YESTERDAY_BASE_D"]) +
              "）"
            : "",
          value: data.PRICE["YESTERDAY_CLOSE_PRICE"]
            ? commonJs.handNumber(data.PRICE["YESTERDAY_CLOSE_PRICE"]) +
              " " +
              "<small>" +
              this.unitStr +
              "</small>"
            : "ー",
        },
        {
          title: "始値",
          value: data.PRICE.OPEN_PRICE
            ? commonJs.handNumber(data.PRICE.OPEN_PRICE) +
              " " +
              "<small>" +
              this.unitStr +
              "</small>"
            : "ー",
        },
        {
          title: "高値",
          value: data.PRICE.HIGH_PRICE
            ? commonJs.handNumber(data.PRICE.HIGH_PRICE) +
              " " +
              "<small>" +
              this.unitStr +
              "</small>"
            : "ー",
        },
        {
          title: "安値",
          value: data.PRICE.LOW_PRICE
            ? commonJs.handNumber(data.PRICE.LOW_PRICE) +
              " " +
              "<small>" +
              this.unitStr +
              "</small>"
            : "ー",
        },
      ];
      this.title = data.PRICE.INDEX_NAME;
      this.icon_url = data.PRICE.ICON_URL;
      this.datas = info;
      if (this.title === "USD/JPY") {
        this.update_D = commonJs.handleDateMinute(data.PRICE.RATE_DT);
      } else {
        this.update_D = data.PRICE.UPDATE_DT
          ? commonJs.handleDateMinute(data.PRICE.UPDATE_DT)
          : "ー";
      }
      this.datas.map((item, index) => {
        this.datas.splice(index, 1, item);
      });
      this.datas = [...this.datas];
      this.$forceUpdate();
    },
    getBack() {
      this.closeSocket();
      this.$router.push({ name: "MarketCondition" });
    },
  },
};
