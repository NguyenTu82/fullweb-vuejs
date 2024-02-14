import {mapMutations} from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import Moment from "moment";
import processEnvKey from "@/const/processEnvKey";

export default {
    name: "contractInvest",
    data() {
        return {
            cardList: [],
            tempList: [],
            newList: [],
            list: [],
            common: commonJs,
            financial: commonConst.Financial,
            searchData: commonConst.getSelectDataIt(),
            params: {
                keyword: "",
                buy_sell_cls: "",
                dividend_handling_cls: "",
                fund_type: "",
                trade_d_from: commonConst.getDate(),
                trade_d_to: "",
            },
            itListData: [],
            fund_type_list_all: [],
            showModal: false,
            isScroll: true,
            tableTypeIt: {
                1: "解約",
                3: "購入",
            },
            currentPage:1,
            pageSize:30,
            totalPage:1,
            allData:[]
        };
    },
    activated() {
        if(this.processEnv == 'NCB'){
            this.$router.back();
            return false;
        }
        this.resetPage();
        this.list = [];
        this.getList(this.params);
        window.addEventListener('scroll', this.handleScroll);
    },
    computed: {
        getTradeDayFrom() {
            if (this.params.trade_d_from) {
                return Moment(this.params.trade_d_from).format("YYYY/MM/DD");
            }
        
            return this.params.trade_d_from;
        },
        getTradeDayTo() {
            if (this.params.trade_d_to) {
                return Moment(this.params.trade_d_to).format("YYYY/MM/DD");
            }
        
            return this.params.trade_d_to;
        },
        buy_sell_cls_text: function () {
            const {items} = this.searchData.find((i) => i.abbr === "buy_sell_cls");
            return items.find((j) => j.id === this.params.buy_sell_cls).name;
        },
        dividend_handling_cls_text: function () {
            const {items} = this.searchData.find(
                (i) => i.abbr === "dividend_handling_cls"
            );
            return items.find((j) => j.id === this.params.dividend_handling_cls).name;
        },
        fund_type_text: function () {
            const {items} = this.searchData.find((i) => i.abbr === "fund_type");
            return items.find((j) => j.id === this.params.fund_type).name;
        },
        trade_d_from_text: function () {
            return this.params.trade_d_from
                ? Moment(this.params.trade_d_from).format("YYYY/MM/DD")
                : "";
        },
        trade_d_to_text: function () {
            return this.params.trade_d_to
                ? Moment(this.params.trade_d_to).format("YYYY/MM/DD")
                : "";
        },
        processEnv(){
            return commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION);
        },
    },
    mounted() {
        if(this.processEnv == 'NCB'){
            this.$router.back();
            return false;
        }
        this.resetPage();
        this.list = [];
        this.getList(this.params);
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        ...mapMutations("common", [
            "setPageTittle",
            "setPageHeaderType",
            "setPageFooterType",
        ]),
        resetPage(){
            this.currentPage = 1;
            this.totalPage = 1;
            this.isScroll = true;
            this.allData = [];
        },
        handleScroll() {
            if (this.isScroll) {
                let getScrollTop = document.documentElement.scrollTop;
                let getClientHeight = document.documentElement.clientHeight;
                let getScrollHeight = document.documentElement.scrollHeight;
                if (getScrollHeight - (getScrollTop + getClientHeight) <= 1) {
                    if(this.currentPage == this.totalPage) return false;
                    this.currentPage++
                    let data = this.allData.slice((this.currentPage-1)*this.pageSize,this.pageSize+((this.currentPage-1)*this.pageSize));
                    this.isScroll = false;
                    setTimeout(()=>{
                        this.list = [...this.list,...data];
                        this.isScroll = true;
                    },200)
                }
            }
        },
        isBranch(branchDivision) {
            if (this.branchDivision === branchDivision) {
                return true;
            }

            return false;
        },
        itList(arr) {
            return arr.map((item) => {
                return {
                    ORDER_NO: item.trade_no, //约定番号
                    BRAND_NM_DISP: item.fund_abb_nm, //名字
                    MARKET_NM_SHORT: item.exchange_cls_n,
                    BRAND_NM: item.stock_nm, //銘柄名
                    BRAND_CD: item.exchange_cls, //銘柄コード
                    MARKET_CD: item.stock_cd, //市場コード
                    ACCOUNT_TYPE: item.account_cls, //口座区分
                    TRADE_TYPE: item.buy_sell_cls, //売買区分 1：解約3：購入
                    SETTLE_D: item.value_d, //受渡日
                    TRADE_D: item.trade_d, //约定日
                    EXECUTED_PRICE: item.trade_price, //	約定時価格
                    SETTLE_AMOUNT: item.value_amount, //受渡金額
                    EXECUTED_QTY: item.trade_qty, //約定時数量
                    EXECUTED_DT: item.trade_d, //	約定日時
                    order_dividend_handling_cls: item.order_dividend_handling_cls, //注文分配金取扱区分
                    dividend_handling_cls: item.dividend_handling_cls, //分配金受取区分
                    dividend_handling_cls_nm: item.dividend_handling_cls_nm, //"再投資型"
                    GROSS_PROFIT: item.capital_gain, //譲渡損益
                    fund_type_list: item.fund_type_list,
                    fund_attr_cls_nm: item.fund_attr_cls_nm,
                    fund_attr_cls: item.fund_attr_cls,
                };
            });
        },
        getList(data) {
            let parameterData = {...data};
            if(parameterData.trade_d_from){
              parameterData.trade_d_from = parameterData.trade_d_from.replace(/[-]/g, "/");
            }
            if(parameterData.trade_d_to){
              parameterData.trade_d_to = parameterData.trade_d_to.replace(/[-]/g, "/");
            }
            httpRequest
                .post("/hhd-it/it/InvTradeInfoListAcquisitionController/exec", parameterData, {
                    apiType: apiInfo.apiType.FUND_STOCK,
                })
                .then((res) => {
                    this.isScroll = true;
                    if (res.data.STATUS === "OK") {
                        let arr = res.data.DATA.trade_info_list;
                        this.itListData = arr;
                        res.data.DATA
                            ? (this.fund_type_list_all = res.data.DATA.fund_type_list_all)
                            : [];
                        if (arr !== null && arr.length > 0) {
                            let newArr = this.itList(arr);
                            this.hanldeData(newArr);
                        }
                    }
                });
        },
        clearSearch() {
            for (let obj in this.params) {
                this.params[obj] = "";
            }
            this.resetPage();
            this.list = [];
            this.getList({});
        },
        hanldeData(List) {
            let tempList = [];
            List.map((item) => {
                var date = commonJs.handleDate(item.EXECUTED_DT);
                item.DATE = date != undefined ? date.date : "";
                item.company = item.BRAND_NM_DISP;
                item.stock = item.BRAND_CD + " | " + item.MARKET_NM_SHORT;
                item.trade_dt = commonJs.handleDate(item.trade_dt);
                tempList.push(item);
            });
            let sortList = tempList.sort(function (a, b) {
                return new Date(b.DATE).getTime() - new Date(a.DATE).getTime();
            });
            let allData = this.filterByOrderNo(sortList);
            this.allData = allData;
            this.totalPage = allData.length > this.pageSize ? Math.ceil(allData.length / this.pageSize) : 1;
            this.list = this.allData.slice((this.currentPage-1)*this.pageSize,this.pageSize+((this.currentPage-1)*this.pageSize));
        },
        filterByOrderNo(arr) {
            if (arr.length == 0) return [];
            let orderNoList = [];
            arr.forEach((item) => {
                if (!orderNoList.some((i) => i.ORDER_NO === item.ORDER_NO)) {
                    orderNoList.push(item);
                }
            });
            return orderNoList;
        },
        goContractDetail(obj) {
            if (sessionStorage.getItem("orderInfo")) {
                sessionStorage.removeItem("orderInfo");
            }
            const info = this.itListData.filter(
                (item) => item.trade_no == obj.ORDER_NO
            )[0];
            sessionStorage.setItem("orderInfo", JSON.stringify(info));
            this.$router.push({
                path: "/reference/contract/invest/detail",
            });
        },
        searchChange() {
            this.showModal = false;
            this.resetPage();
            this.list = [];
            this.getList(this.params);
        },
    },
    created() {
        this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
        this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
        this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    deactivated() {
        window.removeEventListener('scroll', this.handleScroll)
    },
};
