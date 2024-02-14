import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import processEnvKey from "@/const/processEnvKey";

export default {
  name: "ConditionUS",
  data() {
    return {
      financial: commonConst.Financial,
      stockProfit: {},
      dataList: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    sellable_qty_filter(val){
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
      this.stockProfit = {};
      this.dataList = [];
      let params = {
        COUNTRY_ID: 1,
      };
      httpRequest
        .get("/stocks/holding", {
          params,
          apiType: apiInfo.apiType.STOCK_FRONT,
        })
        .then((res) => {
          console.log("conditionUs.js >> getData res=", res);
          if (res.data.STATUS === "OK") {
            let data = res.data.DATA;
            this.dataList = data.STOCK_BLANCE_REAL;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      httpRequest
        .get("/portfolio").then((res) => {
          if (res.data.STATUS === "OK") {
            // 資産状況（米国株式）
            let assetItem = res.data.DATA.ASSETS[1];
            this.stockProfit = {
              SECURITIES_VALUE: assetItem.EVALUATION_AMOUNT,
              PROFIT_AMOUNT: assetItem.PROFIT_AMOUNT,
              PROFIT_AMOUNT_RATE: assetItem.PROFIT_AMOUNT_RATE
            };
          }
        });
    },
    toUsBuy(brandId) {
      this.$router.push({
        name: "UsBuy",
        query: { brandId: brandId },
      });
    },
    toUsSell(brandId) {
      this.$router.push({
        name: "UsSell",
        query: { brandId: brandId },
      });
    },
    accountType(val) {
      if (!val) {
        return
      } else if (val == 1) {
        return ""
      } else if (val == 2) {
        return ""
      } else if (val == 3) {
        return "NISA"
      }
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
  },
  computed: {
    commonJs() {
      return commonJs;
    },
    processEnv(){
      return commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION);
    }
  },
};
