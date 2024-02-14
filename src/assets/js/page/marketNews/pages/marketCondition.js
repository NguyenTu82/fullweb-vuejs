import TopInfo from "@/components/common/TopInfo";
import TabContent from "@/views/marketNews/components/tabContent";
import { mapGetters, mapActions } from "vuex";
import Decimal from "decimal.js";
import io from "socket.io-client";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  name: "MarketCondition",
  components: { TopInfo, TabContent },
  data() {
    return {
      list: [],
      marketPrice: [],
      socket: "",
    };
  },
  mounted() {
    this.getlist();
    window.enter_background = this.enter_background;
    window.enter_foreground = this.enter_foreground;
  },
  methods: {
    ...mapActions(["getMarketCondition", "home"]),

    handleDateHideYear(updateDT) {
      return commonJs.handleDateHideYear(updateDT);
    },
    handNumber(num) {
      return commonJs.handNumber(num);
    },
    enter_background() {
      this.closeSocket();
    },
    enter_foreground() {
      this.getSocketData();
    },
    closeSocket() {
      this.socket.close && this.socket.close();
    },
    goDetails(obj) {
      if (obj.INDEX_TYPE === "INDEX_PRICE_JP") {
        this.$router.push({
          name: "MarketConditionInfo",
          query: { index_type: obj.INDEX_TYPE, id: obj.INDEX_CD },
        });
      } else {
        this.$router.push({
          name: "MarketConditionInfo",
          query: { index_type: obj.INDEX_TYPE, id: obj.INDEX_ID },
        });
      }
    },
    getlist() {
      const marketPriceList = this.getMarketCondition().then(() => {
        if (this.marketCondition.STATUS === "OK") {
          return this.handleData(this.marketCondition.DATA, 1);
        }
      });
      Promise.all([marketPriceList]).then((values) => {
        const listData = values.reduce((acc, cur) => {
          cur.forEach((v) => acc.push(v));
          return acc;
        }, []);
        this.list = listData;
        this.list.swapItems(0,1);
        this.list = this.list.reverse();
        this.getSocketData();
      });

      Array.prototype.swapItems = function(a, b){
        this[a] = this.splice(b, 1, this[a])[0];
        return this;
      }
    },
    handleData(data) {
      console.log("handleData >> data=", data);
      this.marketPrice = this.getHome.DATA.MARKET_PRICE;
      console.log("handleData >> marketPrice=", this.marketPrice);
      data[0].CHANGE_RATE = this.marketPrice[2].CHANGE_RATE;
      data[1].CHANGE_RATE = this.marketPrice[3].CHANGE_RATE;
      console.log("handleData >> 22 data=", data);
      data.map((item) => {
        item.VALUE_CHANGE_RATE = item.CHANGE_RATE;
        if (item.CHANGE_RATE !== "-" && item.CHANGE_VALUE !== "-")
          if (!(item.CHANGE_RATE + "").includes("%")) {
            let CHANGE_VALUE = new Decimal(item.CHANGE_VALUE || 0);
            let CHANGE_RATE = new Decimal(item.CHANGE_RATE || 0);

            let times = 1;
            if (item.INDEX_TYPE === "EXCHANGE_RATE") times = 1;

            if (CHANGE_VALUE.greaterThan(0)) {
              if (CHANGE_RATE.greaterThan(0)) {
                item.CHANGE_RATE =
                  "(" +
                  "+" +
                  CHANGE_RATE.times(times).toFixed(2, Decimal.ROUND_DOWN) +
                  "%" +
                  ")";
              } else {
                item.CHANGE_RATE =
                  "(" +
                  CHANGE_RATE.times(times).toFixed(2, Decimal.ROUND_DOWN) +
                  "%" +
                  ")";
              }
              item.CHANGE_VALUE =
                "+" + CHANGE_VALUE.toFixed(2, Decimal.ROUND_DOWN);
            } else {
              item.CHANGE_VALUE = CHANGE_VALUE.toFixed(2, Decimal.ROUND_DOWN);
              item.CHANGE_RATE =
                "(" +
                CHANGE_RATE.times(times).toFixed(2, Decimal.ROUND_DOWN) +
                "%" +
                ")";
            }
          }
      });
      return data.filter(
        (v) =>
          !constant.NONE_DISPLAY_JAPANESE_INDEX_STOCK.includes(v.INDEX_NAME)
      );
    },
    getSocketData() {
      let url = this.$store.state.common.WebSocketUS;
      let uuid = localStorage.getItem("uuid");
      url = url + "?id=" + uuid;
      let socket = io(url, {
        path: "/stock",
        transports: ["websocket"],
      });

      this.socket = socket;
      this.openSocket(this.socket);
    },
    openSocket(socket) {
      socket.on("connect", () => {
        let exchangeData = [];
        let usData = [];
        let jpData = [];

        for (let i = 0; i < this.list.length; i++) {
          let item = this.list[i];
          if (item.INDEX_TYPE === "INDEX_PRICE_JP") jpData.push(item.INDEX_CD);
          if (item.INDEX_TYPE === "EXCHANGE_RATE")
            exchangeData.push(item.CURRENCY_CD);
          if (item.INDEX_TYPE === "INDEX_PRICE_US") usData.push(item.INDEX_ID);
        }
        if (exchangeData.length !== 0) {
          socket.emit(
            "request_price_fx",
            '{ "CURRENCY_CD_LIST": ' + JSON.stringify(exchangeData) + "}"
          );
        }
        if (usData.length !== 0) {
          socket.emit(
            "request_price_index_us",
            '{ "INDEX_ID_LIST": ' + JSON.stringify(usData) + " }"
          );
        }
        if (jpData.length !== 0) {
          socket.emit(
            "request_price_index_jp",
            '{ "INDEX_CD_LIST": ' +
              JSON.stringify(jpData) +
              ',"TERMINAL_INFO": { "AU": "test" } }'
          );
        }
      });

      socket.on("price_index_jp", (data) => {
        this.resetData(data, "jp");
      });
      socket.on("price_index_us", (data) => {
        this.resetData(data, "us");
      });
      socket.on("price_fx", (data) => {
        this.resetData(data, "fx");
      });
      socket.on("error", () => {});
    },
    resetData(data, id) {
      let d = JSON.parse(data);
      let result = d.PRICE_INFO;

      let index = -1;

      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        if (id === "jp") {
          if (d.INDEX_CD === item.INDEX_CD) {
            index = i;
            break;
          }
        }
        if (id === "us") {
          if (
            d.INDEX_ID === item.INDEX_ID &&
            item.INDEX_TYPE === "INDEX_PRICE_US"
          ) {
            index = i;
            break;
          }
        }

        if (id === "fx") {
          if (
            d.CURRENCY_CD === item.CURRENCY_CD &&
            item.INDEX_TYPE === "EXCHANGE_RATE"
          ) {
            index = i;
            break;
          }
        }
      }

      if (index === -1) return;

      if (result.BASE) this.list[index].CURRENT_PRICE = result.BASE;
      if (result.CHANGE)
        this.list[index].CHANGE_VALUE = parseFloat(result.CHANGE).toFixed(2);
      if (result.CRATE) this.list[index].CHANGE_RATE = result.CRATE;
      if (result.HIGH) this.list[index].HIGH_PRICE = result.HIGH;
      if (result.LOW) this.list[index].LOW_PRICE = result.LOW;
      if (result.PREV) this.list[index].YESTERDAY_CLOSE_PRICE = result.PREV;
      if (result.OPEN) this.list[index].OPEN_PRICE = result.OPEN;

      if (result.PREV_D) this.list[index].YESTERDAY_BASE_D = result.PREV_D;

      if (result.HIGH_DT) this.list[index].HIGH_PRICE_DT = result.HIGH_DT;

      if (result.LOW_DT) this.list[index].LOW_PRICE_DT = result.LOW_DT;

      if (result.UPDATE) this.list[index].UPDATE_DT = result.UPDATE;
      this.list = this.handleData(this.list);
    },
  },
  computed: {
    ...mapGetters(["marketCondition", "getHome",]),
  },
};
