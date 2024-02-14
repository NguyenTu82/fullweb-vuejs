import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import processEnvKey from "@/const/processEnvKey";

export default {
  name: "ConditionJp",
  data() {
    return {
      financial: commonConst.Financial,
      stockProfit: {
        total_stock_asset: 0,
        total_stock_val: 0,
        total_stock_val_per: 0
      },
      dataList: [],
      times: ""
    };
  },
  mounted() {
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    sellabl_eqty_filter(val) {
      return Number(val).toFixed(8);
    },
    isBranch(branchDivision) {
      if (this.branchDivision === branchDivision) {
        return true;
      }
      return false;
    },
    numberFormatter(number, decimals) {
      return commonJs.number_format(number, decimals);
    },
    getData() {
      httpRequest
        .post("hhd-api/JPStock/StockOwnedListController/exec", {}, { apiType: apiInfo.apiType.JP_STOCK, })
        .then((res) => {
          console.log("conditionJp.js >> getData res=", res);
          if (res.data.STATUS === "OK") {
            this.stockProfit = res.data.DATA;
            this.dataList = res.data.DATA.lst_stock_owned_infor;
            this.times = res.data.RESULT_TIME
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toBuyStockJP(stock_cd, exchange_cls) {
      this.$router.push({
        name: "BuyStockJP",
        query: { stock_cd: stock_cd, exchange_cls: exchange_cls, kind: 1 },
      });
    },
    toSellStockJP(stock_cd, exchange_cls) {
      this.$router.push({
        name: "SellStockJP",
        query: { stock_cd: stock_cd, exchange_cls: exchange_cls, kind: 1 },
      });
    },
    coedPro(code) {
      return code.toString()[code.toString().length - 1] ===
        "0" ? code.toString().slice(0, -1) : code
    }
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.getData();
  },
  computed: {
    commonJs() {
      return commonJs;
    },
    processEnv() {
      return commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION);
    }
  },
};
