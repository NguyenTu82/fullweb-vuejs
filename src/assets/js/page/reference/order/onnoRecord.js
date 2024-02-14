import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
export default {
  name: "OnnoRecord",
  props: ["titleData", "listData", "info", "orderStatusDisplay"],
  data() {
    return {
      isFour: true,
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPD412: commonConst.HELPD412,
    };
  },
  methods: {
    goBrand() {
      this.$parent.goBrand();
    },
    handelDate(value) {
      if (value) {
        let arr = value.split(" ");
        if (arr.length == 2) return arr[1];
      } else return value;
    },
    empty(input) {
      return input === "" || input === null;
    },
    handleStatusOrder(value) {
      let ordStatus = value.ord_sts;
      let exchangeStsNm = value.exchange_sts_nm;

      this.empty(ordStatus) && (ordStatus = "");
      this.empty(exchangeStsNm) && (exchangeStsNm = "");

      return `${ordStatus} ${exchangeStsNm}`;
    },
    handleNumberIsZero(value) {
      return value == 0 ? "-" : `${value} 円`;
    },
    toStockDetail(stock_cd, exchange_cls) {
      let routeName = "ConsignmentTransactions";
      if (exchange_cls == "009") {
        routeName = "OverCounterTransactions";
      }

      let exchangeCls = exchange_cls;
      if (exchangeCls == "009") {
        exchangeCls = "001";
      }
      this.$router.push({
        name: routeName,
        query: { stock_cd: stock_cd, exchange_cls: exchangeCls },
      });
    },
  },
  computed: {
    commonJs() {
      return commonJs;
    },
  },
};
