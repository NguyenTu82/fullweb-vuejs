import commonJs from "@/assets/js/common/common";

export default {
  name: "BrandCartJP",
  props: [
    "id",
    "brandName",
    "brandCd",
    "stockPrice",
    "ratio",
    "percent",
    "type",
    "markupAsk",
    "markupBid",
    "dividendYield",
    "isSelected",
    "stockCd",
    "exchangeCls",
    "typeTab",
    "otcSelectBrandCls",
  ],
  methods: {
    handleBrandCd() {
      if (this.typeTab && this.type === 1) {
        return this.brandCd[0];
      } else {
        return this.brandCd.join(" / ");
      }
    },
    checkDecimal(value) {
      if (value) {
        if (value.toString().length < 6 && value.toString().split(".")[1]) {
          return 2;
        } else {
          return value.toString().split(".")[1]
            ? value.toString().split(".")[1].length
            : 0;
        }
      } else {
        return 0;
      }
    },
    checkLengthNumber(value = "") {
      if (value) {
        if (value.toString().length < 6 && value.toString().split(".")[1]) {
          return true;
        }
      }
      return false;
    },
    checkNumber(num = "", unit = "") {
      if (
        num != "0.00" &&
        num != "-0.00" &&
        num !== "0" &&
        num !== "0.0" &&
        num
      )
        return `${num} ${unit}`;
      return `-`;
    },
    isShowCart(type, otcSelectBrandCls) {
      if (type == 1) {
        return otcSelectBrandCls === "1" ? true : false;
      } else {
        return true;
      }
    },
    redirectTo(id) {
      if (id) {
        if (this.type == 2) {
          return {
            name: "ConsignmentTransactions",
            query: {
              stock_cd: this.stockCd,
              exchange_cls: this.exchangeCls,
            },
          };
        } else {
          return {
            name: "OverCounterTransactions",
            query: {
              stock_cd: this.stockCd,
              exchange_cls: this.exchangeCls,
            },
          };
        }
      } else {
        return "";
      }
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },
    number_format(number, decimals) {
      return commonJs.number_format(number, decimals);
    },
    handNumberFloat(number, decimals) {
      return commonJs.handNumberFloat(number, decimals);
    },
  },
};
