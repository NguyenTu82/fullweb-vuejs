import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import { Decimal } from "decimal.js";
import * as echarts from "echarts";
import processEnvKey from "@/const/processEnvKey";

export default {
  name: "Condition",
  data() {
    return {
      financial: commonConst.Financial,
      newTime: "",
      totalData: {},
      circular: {
        percentStockheld: 0, //传过去的是百分比  米株
        percentCashIn: 0, //預り金
        assets: "", //资产
        profit: "", //收益
        IsProfit: null, //是否盈利
      },
      currentData: {
        TOTAL_ASSETS_AMOUNT: "", //总资产评估额
        TOTAL_PROFIT_AMOUNT: "", //实现损益合计（至今为止的合计）
        TOTAL_DIVIDEND_AMOUNT: "", //股利合计（至今为止的合计）
        DEPOSIT_AMOUNT: "", //存款合计
        BUYABLE_CASH: "", //可购金额
        WITHDRAWABLE_CASH: "", //可出金额
        ASSETS: [],
      },
      assetsEnum: {
        us: "米国株式",
        jp: "国内株式",
        it: "投資信託",
        dp: "預り金",
      },
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
    renderChart() {
      var data = [];
      var charColor = [];
      let currentData = this.currentData;
      let circular = this.circular;
      if (parseFloat(currentData.TOTAL_PROFIT_AMOUNT) !== 0) {
        currentData.ASSETS.map((item) => {
          data.push({
            name: item.ASSET_NAME,
            value: item.EVALUATION_AMOUNT,
          });
        });
        data.push({
          name: "預り金",
          value: currentData.DEPOSIT_AMOUNT,
        });
        charColor = ["#eb6a6a", "#002e9a", "#43deb1", "#cbcbcb"];
      }

      const chart = document.getElementById("chartPie");
      let num = circular.IsProfit == 1 ? "+" : "";
      let color
      if (parseFloat(currentData.TOTAL_PROFIT_AMOUNT) < 0) {
        color = "#45ccff"
      } else if (parseFloat(currentData.TOTAL_PROFIT_AMOUNT) === 0) {
        color = "#333"
      } else if (parseFloat(currentData.TOTAL_PROFIT_AMOUNT) > 0) {
        color = "#eb6a6a"
      }
      console.log(parseFloat(this.currentData.TOTAL_PROFIT_AMOUNT));
      if (chart) {
        const myChart = echarts.init(chart);
        const title = "資産合計";
        let assets = circular.assets ? circular.assets : "-"
        let profit = circular.profit ? circular.profit : "-"
        let option = {
          tooltip: {
            show: false,
          },
          color: charColor,
          title: [
            {
              text:
                "{name|" +
                title +
                "}\n\n{assets|" +
                assets +
                " 円}\n\n{profit|" +
                `${parseFloat(this.currentData.TOTAL_PROFIT_AMOUNT) > 0 ? '+' : ''}` + profit +
                " 円}",
              top: "center",
              left: "center",
              textStyle: {
                rich: {
                  name: {
                    fontSize: 14,
                    fontWeight: "bold",
                  },
                  assets: {
                    fontSize: 16,
                    fontWeight: "bold",
                  },
                  profit: {
                    fontSize: 12,
                    fontWeight: "bold",
                    color
                  },
                },
              },
            },
          ],
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["85%", "100%"],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: {
                show: false,
                position: "center",
              },

              labelLine: {
                show: false,
              },
              data,
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
    },
    isBranch(branchDivision) {
      if (this.branchDivision === branchDivision) {
        return true;
      }
      return false;
    },
    showTime() {
      if (this.newTime.length > 16) {
        this.newTime = this.newTime.slice(16, this.newTime.length);
        return this.newTime.slice(16, this.newTime.length);
      } else {
        return this.newTime;
      }
    },
    numberFormatter(number, decimals) {
      return commonJs.number_format(number, decimals);
    },
    getData() {
      (this.newTime =
        new Date().toISOString().split("T")[0].split("-").join("/") +
        " " +
        (new Date().getHours() +
          ":" +
          ("0" + new Date().getMinutes()).substr(-2))),
        httpRequest.get("/portfolio").then((res) => {
          let data = {};
          if (res.data.STATUS === "OK") {
            data = res.data.DATA;
          }
          this.circular.assets = this.commonJs.handNumberInt(
            data.TOTAL_ASSETS_AMOUNT
          );

          if (data.TOTAL_PROFIT_AMOUNT > 0) {
            this.circular.IsProfit = 1;
          } else if (data.TOTAL_PROFIT_AMOUNT == 0) {
            this.circular.IsProfit = 2;
          } else {
            this.circular.IsProfit = 3;
          }

          this.circular.profit = this.commonJs.handNumberInt(
            data.TOTAL_PROFIT_AMOUNT
          );

          if (
            Object.keys(data).length > 0 &&
            Object.keys(data.ASSETS).length > 0
          ) {
            this.circular.percentStockheld =
              parseFloat(data.ASSETS[0].EVALUATION_AMOUNT) != 0
                ? new Decimal(data.ASSETS[0].EVALUATION_AMOUNT)
                  .dividedBy(new Decimal(data.TOTAL_ASSETS_AMOUNT))
                  .times(100)
                  .toFixed(2)
                : 0;

            this.circular.percentCashIn =
              parseFloat(data.ASSETS[0].TOTAL_ASSETS_AMOUNT) != 0
                ? new Decimal(data.DEPOSIT_AMOUNT)
                  .dividedBy(new Decimal(data.TOTAL_ASSETS_AMOUNT))
                  .times(100)
                  .toFixed(2)
                : 0;

            this.currentData = {
              ...data,
              ASSETS: data.ASSETS.map((m) => ({
                ...m,
                EVALUATION_AMOUNT:
                  parseFloat(m.EVALUATION_AMOUNT) != 0
                    ? m.EVALUATION_AMOUNT
                    : 0,
                PROFIT_AMOUNT:
                  parseFloat(m.PROFIT_AMOUNT) != 0 ? m.PROFIT_AMOUNT : 0,
                ACQUISITION_AMOUNT:
                  parseFloat(m.ACQUISITION_AMOUNT) != 0
                    ? m.ACQUISITION_AMOUNT
                    : 0,
                PROFIT_AMOUNT_RATE:
                  parseFloat(m.PROFIT_AMOUNT_RATE) != 0
                    ? m.PROFIT_AMOUNT_RATE
                    : 0,
              })),
            };
          } else {
            this.circular.percentStockheld = 0;
            this.circular.percentCashIn = 0;
          }

          let total = parseFloat(this.currentData.DEPOSIT_AMOUNT);

          this.currentData.ASSETS.map((item) => {
            total += parseFloat(item.EVALUATION_AMOUNT);
          });

          this.currentData.ASSETS.map((item) => {
            if (item.ASSET_NAME == this.assetsEnum.jp)
              this.circular.domesticStock =
                (parseFloat(item.EVALUATION_AMOUNT) / total) * 100 || 0;
            if (item.ASSET_NAME == this.assetsEnum.it)
              this.circular.assetsTrust =
                (parseFloat(item.EVALUATION_AMOUNT) / total) * 100 || 0;
            if (item.ASSET_NAME == this.assetsEnum.us)
              this.circular.americanStock =
                (parseFloat(item.EVALUATION_AMOUNT) / total) * 100 || 0;
          });

          this.renderChart();
        });
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
