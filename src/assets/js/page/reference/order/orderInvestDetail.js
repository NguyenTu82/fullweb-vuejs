import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import listPage from "@/views/reference/order/components/listPage";
import message from "@/views/reference/components/Message";
import apiInfo from "@/const/apiInfo";

export default {
    name: "OrderInvestDetail",
    data() {
        return {
            ord_sts_cdArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12],
            infors: [
                { title: "注文番号", value: "－" },
                { title: "注文状況", value: "－" },
                { title: "銘柄名", value: "－" },
                { title: "市場", value: "－" },
                { title: "注文方法", value: "－" },
                { title: "取引区分", value: "－" },
                { title: "売買区分", value: "－" },
                { title: "執行条件", value: "－" },
                { title: "注文有効期限", value: "－" },
                { title: "注文失効日時", value: "－" },
                { title: "注文金額", value: "－" },
                { title: "約定単価", value: "－" },
                { title: "約定数量", value: "－" },
                { title: "受渡金額", value: "－" },
                { title: "決済方法", value: "－" },
                { title: "口座区分", value: "－" },
                { title: "参考為替レート", value: "－" },
            ],
            infors2: [],
            currentData: {},
            type: 0,
            tabIndex: 1,
            localStyle: {}, //0 - '注文明細', 1 - '約定明細'
            showPwdPopup: false,
            listData: [],
            isNotice: false,
            showConfirm: false,
            tradepwd: '',
        };
    },
    components: {
        listPage,
        message
    },
    methods: {
        ...mapMutations("common", [
            "setPageTittle",
            "setPageHeaderType",
            "setPageFooterType",
        ]),
        handleBlur() {
            this.tradepwd = this.commonJs.zenkaku2Hankaku(this.tradepwd);
        },
        handeleErase() {
            httpRequest.post('/hhd-it/it/InvOrderCancelListRegistrationController/exec', {
                order_no: this.currentData.order_no || 1,
                trade_password: this.commonJs.hashPwd(this.tradepwd)
            }, {
                apiType: apiInfo.apiType.FUND_STOCK
            })
                .then((res) => {
                    if (res.data.STATUS === 'OK') {
                        if (this.currentData.sell_buy_cls_nm === "購入") {
                            //  注文 購入 投资信托
                            this.$router.push({
                                path: "/transaction/investment/buy/complete",
                                query: {                                    
                                    name: this.currentData.fund_nickname == null ? this.currentData.fund_nm_short : this.currentData.fund_nm_short + "("+ this.currentData.fund_nickname + ")",
                                    status: 2
                                }
                            })
                        } else if (this.currentData.sell_buy_cls_nm === "解約") {
                            //  注文 解約 投资信托
                            this.$router.push({
                                path: "/transaction/investment/sell/complete",
                                query: {
                                    name: this.currentData.fund_nickname == null ? this.currentData.fund_nm_short : this.currentData.fund_nm_short + "("+ this.currentData.fund_nickname + ")",
                                }
                            })
                        }
                    }
                });
            this.btnCancel()
        },
        btnCancel() {
            this.showPwdPopup = false;
            this.tradepwd = ""
        },
        isBranch(branchDivision) {
            if (this.branchDivision === branchDivision) {
                return true;
            }
            return false;
        },
        requsetInfo() {
            this.currentData = JSON.parse(sessionStorage.getItem("orderInfo"));
            let groupData = JSON.parse(sessionStorage.getItem("itGroupData"));
            let arr = [];
            for (let i = 0; i < groupData.length; i++) {
                let item = groupData[i];
                arr.push({
                    ord_dt: item.order_dt,
                    ord_sts_nm: item.order_sts_nm,
                    ord_sts: item.order_sts,
                    order_amt: item.order_amt,
                });
            }
            this.listData = arr.sort(function (a, b) {
                return a.ord_sts - b.order_sts;
            });

            if (this.currentData) {
                this.currentData.order_sts = parseInt(this.currentData.order_sts);
                this.getData();
            }
        },
        getData() {
            //注文
            const infoS = [
                {title: "注文番号", value: this.currentData.order_no || "－"},
                {
                    title: "注文状況",
                    value:
                        this.currentData.order_sts == 2
                            ? "執行中"
                            : this.currentData.order_sts_nm || "－",
                },
                {
                    title: "注文日時",
                    value: this.currentData.order_dt
                        ? `${this.commonJs.handleDate(this.currentData.order_dt).date} ${this.commonJs.handleDate(this.currentData.order_dt).time
                        }`
                        : "－",
                },
                {
                    title: "注文方法",
                    value: this.currentData.amt_qty_designated_cls_nm || "－",
                },
                {
                    title: "分配金受取種類",
                    value: this.currentData.order_dividend_handling_cls_nm || "－",
                },
                {
                    title: "売買区分",
                    value: this.currentData.sell_buy_cls_nm || "－",
                },
                {
                    title: "口座区分",
                    value:
                        this.currentData.account_cls == 1
                            ? this.currentData.account_cls_nm
                            : `${this.currentData.account_cls_nm}(${this.currentData.withholding_cls_nm})`,
                },
                {
                    title:
                        this.currentData.amt_qty_designated_cls == "3"
                            ? "概算注文金額"
                            : "注文金額",
                    value:
                        (this.commonJs.handNumberInt(this.currentData.order_amt) || "－") +
                        "円",
                    order_comm_fee: this.currentData.order_comm_fee,
                    //todo
                },
                {
                    title: "参考基準価額",
                    value:
                        (this.commonJs.handNumberInt(this.currentData.base_price) || "－") +
                        "円",
                },
                {
                    title:
                        this.currentData.sell_buy_cls == "3"
                            ? "概算購入口数"
                            : this.currentData.amt_qty_designated_cls == "3"
                            ? "売却口数"
                            : "概算売却口数",
                    value:
                        (this.commonJs.handNumberInt(this.currentData.order_qty) || "－") +
                        "口",
                },
                {
                    title: "概算約定金額",
                    value:
                        (this.commonJs.handNumberInt(
                            this.currentData.approximate_trade_amt
                        ) || "－") + "円",
                },
                {
                    title: "概算受渡金額",
                    value:
                        (this.commonJs.handNumberInt(
                            this.currentData.approximate_value_amt
                        ) || "－") + "円",
                },
            ];
            this.infors = infoS;
            const infoS2 = [
                {
                    title: this.currentData.sell_buy_cls == 1 ? "売却口数" : "購入口数",
                    value:
                        (this.commonJs.handNumFloat(this.currentData.trade_qty, 8, true) ||
                            "－") + "口",
                },
                {
                    title: "約定金額",
                    value:
                        (this.commonJs.handNumberInt(this.currentData.trade_amt) || "－") +
                        "円",
                },
                {
                    title: "\xa0\xa0\xa0\xa0\xa0\xa0税込手数料",
                    value:
                        "（" +
                        (this.currentData.order_sts == 8
                            ? this.commonJs.handNumberInt(
                                this.currentData.order_comm_fee +
                                this.currentData.consumption_tax
                            )
                            : "－") +
                        " 円）",
                },
                {
                    title: "受渡金額",
                    value:
                        (this.commonJs.handNumberInt(this.currentData.value_amt) || "－") +
                        "円",
                },
                {
                    title: "約定日",
                    value: this.currentData.trade_d
                        ? this.commonJs.handleDate(this.currentData.trade_d).date
                        : "－",
                },
                {
                    title: "受渡日",
                    value: this.currentData.value_d || "－",
                },
            ];
            this.infors2 = infoS2;
        },
        toStockDetail(inv_trust_assoc_cd) {
            this.$router.push({
                name: "InvestBrandDetail",
                query: { inv_trust_assoc_cd: inv_trust_assoc_cd },
            });
        },
    },
    created() {
        this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
        this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
        this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
        this.requsetInfo();
    },
    computed: {
        commonJs: function () {
            return commonJs;
        },
    },
    mounted() {
    },
};
