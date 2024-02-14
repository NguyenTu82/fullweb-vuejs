import {mapMutations} from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import processEnvKey from "@/const/processEnvKey";

export default {
    name: "ConditionInvest",
    data() {
        return {
            financial: commonConst.Financial,
            stockProfit: {},
            dataList: {
                1: "通貨選択型",
                2: "レバレッジ型",
                3: "インデックス型",
                4: "アクティブ型",
                5: "バランス型",
                6: "国内株式型",
                7: "海外株式型",
                8: "国内REIT型",
                9: "海外REIT型",
                10: "コモディティ型",
                11: "ヘッジファンド型",
                12: "すべて"
            }
        };
    },
    mounted() {
        if (this.processEnv == 'NCB') {
            this.$router.back();
            return false;
        }
        this.getData();
    },
    methods: {
        ...mapMutations("common", [
            "setPageTittle",
            "setPageHeaderType",
            "setPageFooterType",
        ]),
        isBranch(branchDivision) {
            if (this.branchDivision === branchDivision) {
                return true;
            }

            return false;
        },

        getData() {
            let data = {};
            httpRequest
                .post("/hhd-it/it/GetBalanceSearchController/exec/", data, {apiType: apiInfo.apiType.FUND_STOCK})
                .then((res) => {
                    console.log("conditionInvest.js >> getData res=", res);
                    if (res.data.STATUS === "OK") {
                        let data = res.data.DATA;
                        this.stockProfit = data;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        toInvestStockBuyOrder(inv_trust_assoc_cd) {
            this.$router.push({
                name: "InvestStockBuyOrder",
                query: { inv_trust_assoc_cd: inv_trust_assoc_cd },
            });
        },
        toInvestStockSellOrder(inv_trust_assoc_cd) {
            this.$router.push({
                name: "InvestStockSellOrder",
                query: { inv_trust_assoc_cd: inv_trust_assoc_cd },
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
        },
    },
};
