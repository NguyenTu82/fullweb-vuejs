import {mapMutations} from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import Moment from "moment";
import processEnvKey from "@/const/processEnvKey";

export default {
    name: "orderJp",
    data() {
        return {
            textDetail: "",
            jqParams: {
                stock_nm: "",
                buy_sell_cls: "", //売買 1:売、3:買
                order_status: "", //注文状況
                ord_day_from: commonConst.getDate(),
                ord_day_to: "",
                otc_consign_cls: "", //店頭委託区分 1:店頭 2:委託
            },
            isScroll: true,
            list: [],
            tempList: [],
            allData:[],
            showModal: false,
            selectData: commonConst.getSelectDataJp(),
            currentPage:1,
            pageSize:30,
            totalPage:1
        };
    },
    mounted() {
        this.resetPage()
        this.list = [];
        this.jpListRequest(this.jqParams);
        window.addEventListener('scroll', this.handleScroll);
    },
    activated() {
        this.resetPage();
        this.list = [];
        this.jpListRequest(this.jqParams);
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
        handleScroll(){
            if(this.isScroll){
                let getScrollTop = document.documentElement.scrollTop;
                let getClientHeight = document.documentElement.clientHeight;
                let getScrollHeight = document.documentElement.scrollHeight;
                if( getScrollHeight - (getScrollTop + getClientHeight) <= 1){
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
        //动态绑定值
        changeParams(val, type) {
            let value = val.target.value;
            this.jqParams[type] = value;
        },
        //重置初始条件
        resetParams() {
            for (let obj in this.jqParams) {
                this.jqParams[obj] = "";
            }
            this.list = [];
            this.resetPage();
            this.$nextTick(() => {
                this.jpListRequest({});
            });
        },
        //打开搜索弹层
        openSearch() {
            this.showModal = true;
            // this.renderParams();
        },
        closeModal() {
            this.showModal = false;
        },
        openModal() {
            this.showModal = false;
            this.resetPage();
            this.list = [];
            this.jpListRequest(this.jqParams);
        },
        // 日股请求
        jpListRequest(data) {
            let parameterData = {...data};
            if(parameterData.ord_day_from){
                parameterData.ord_day_from = parameterData.ord_day_from.replace(/[-]/g, "/");
            }
            if(parameterData.ord_day_to){
                parameterData.ord_day_to = parameterData.ord_day_to.replace(/[-]/g, "/");
            }
            httpRequest
                .post("/hhd-api/JPStock/StockOrderListController/exec", parameterData, {
                    apiType: apiInfo.apiType.JP_STOCK,
                })
                .then((res) => {
                    this.isScroll = true;
                    if (res.data.STATUS === "OK" && !res.data.ERROR) {
                        let arr = res.data.DATA.lst_stock_order || [];
                        if (arr.length > 0) {
                            let newArr = this.jpList(arr);
                            this.hanldeData(newArr);
                        }
                    }
                });
        },
        jpList(arr) {
            return arr.map((item) => {
                return {
                    ORDER_NO: item.ord_no, //注文番号
                    BRAND_NM_DISP: item.stock_nm,
                    MARKET_NM_SHORT: item.exchange_cls_nm,
                    BRAND_NM: item.stock_nm, //銘柄名
                    BRAND_CD:
                        item.stock_cd.toString()[item.stock_cd.toString().length - 1] ===
                        "0"
                            ? item.stock_cd.toString().slice(0, -1)
                            : item.stock_cd, //銘柄コード
                    otc_consign_nm: item.otc_consign_nm,
                    otc_consign_cls: item.otc_consign_cls,
                    buy_sell_nm: item.buy_sell_nm,
                    otc_order_cls: item.otc_order_cls,
                    ACCOUNT_TYPE: item.acc_cls_cd, //口座区分
                    buy_sell_cls: item.buy_sell_cls,
                    TRADE_TYPE:
                        parseInt(item.buy_sell_cls) == 3 ? 2 : parseInt(item.buy_sell_cls), //売買区分 1:買 2:売
                    ORDER_AMOUNT: item.order_amt, //	注文金額
                    ORDER_PRICE: item.ord_price, // 注文時価格
                    price_cls_nm: item.price_cls_nm,
                    price_cls: item.price_cls,
                    ORDER_QTY: item.ord_volume, //注文時数量
                    order_status_num: item.order_status,
                    ORDER_STATUS: item.order_status_nm || "", // 注文状況 1:注文中 2:取消中 3:取消済 4:約定 5:失効 11:一部約定(注文中) 12:一部約定(取消中) 13:一部約定(取消済) 14:一部約定(失効)
                    ORDER_ACCEPT_DT: item.ord_dt, //	注文受付日時
                    total_trade_qty: item.total_trade_qty,
                };
            });
        },
        hanldeData(List) {
            let tempList = [];
            List.map((item) => {
                var date = this.commonJs.handleDate(item.ORDER_ACCEPT_DT);
                item.DATE = date.date;
                item.company = item.BRAND_NM_DISP;
                item.stock = item.BRAND_CD + " | " + item.MARKET_NM_SHORT;
                tempList.push(item);
            });

            let dataList = tempList;

            this.list = dataList.sort(function (a, b) {
                return new Date(b.DATE).getTime() - new Date(a.DATE).getTime();
            });

            let BRAND_CD_SORT = this.list.sort(function (a, b) {
                if (a.BRAND_CD != b.BRAND_CD) return a.BRAND_CD - b.BRAND_CD;
                return (
                    new Date(b.ORDER_ACCEPT_DT).getTime() -
                    new Date(a.ORDER_ACCEPT_DT).getTime()
                );
            });

            let sort = BRAND_CD_SORT.sort(function (a, b) {
                return b.ORDER_NO - a.ORDER_NO;
            });

            const sort_order = sort.sort(function (a, b) {
                return b.ORDER_NO - a.ORDER_NO;
            });

            let allData = this.filterByOrderNo(sort_order);
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
        orderStatusDisplay(info) {
            if (["1", "2", "3", "4", "5", "6"].includes(info.order_status_num)) {
                if (info.otc_consign_cls === "1") {
                    this.textDetail = "注文明細・取消";
                }
                if (info.otc_consign_cls === "2") {
                    this.textDetail = "注文明細・訂正・取消";
                }
            }
            if (["7", "8", "9"].includes(info.order_status_num)) {
                this.textDetail = "注文明細";
            }

            if (info.otc_consign_cls === "2") {
                if (info.order_status_num === "1" || info.order_status_num === "2") {
                    return "注文中";
                }
                if (info.order_status_num === "3" && info.total_trade_qty <= 0) {
                    return "注文済";
                }
                if (info.order_status_num === "4" && info.total_trade_qty <= 0) {
                    return "注文済（訂正中)";
                }
                if (info.order_status_num === "5" && info.total_trade_qty <= 0) {
                    return "注文済（訂正済)";
                }
                if (info.order_status_num === "6" && info.total_trade_qty <= 0) {
                    return "注文済（取消中)";
                }
                if (info.order_status_num === "7" && info.total_trade_qty <= 0) {
                    return "取消済";
                }
                if (info.order_status_num === "8") {
                    return "全部約定";
                }
                if (info.order_status_num === "9" && info.total_trade_qty <= 0) {
                    return "失効";
                }
                if (info.order_status_num === "3" && info.total_trade_qty > 0) {
                    return "一部約定（注文済)";
                }
                if (info.order_status_num === "4" && info.total_trade_qty > 0) {
                    return "一部約定（訂正中)";
                }
                if (info.order_status_num === "5" && info.total_trade_qty > 0) {
                    return "一部約定（訂正済)";
                }
                if (info.order_status_num === "6" && info.total_trade_qty > 0) {
                    return "一部約定（取消中)";
                }
                if (info.order_status_num === "7" && info.total_trade_qty > 0) {
                    return "一部約定（取消済)";
                }
                if (info.order_status_num === "9" && info.total_trade_qty > 0) {
                    return "一部約定（失効)";
                }
            }

            if (info.otc_consign_cls === "1") {
                if (info.order_status_num === "1") {
                    return "受付済";
                }
                if (info.order_status_num === "7") {
                    return "取消済";
                }
                if (info.order_status_num === "8") {
                    return "全部約定";
                }
                if (info.order_status_num === "9") {
                    return "失効";
                }
            }
            return "";
        },
        groupData(Arr) {
            var dateList = [],
                dest = [];
            for (var i = 0; i < Arr.length; i++) {
                var ai = Arr[i];
                let index = dateList.indexOf(ai.DATE);
                if (index == -1) {
                    dest.push({
                        TIME: ai.DATE,
                        DATA: [ai],
                    });
                    dateList.push(ai.DATE);
                } else {
                    dest[index].DATA.push(ai);
                }
            }
            return dest;
        },
        // 注文详情
        goOrderDetail(item) {
            sessionStorage.setItem("orderInfo", JSON.stringify(item));
            this.$router.push({
                name: "orderJpDetail",
                params: {
                    name: item.name,
                },
            });
        },
        renderOrderStatus(item) {
            let orderStatusDisplay = "";
            if (item.otc_consign_cls === "2") {
                if (item.order_status_num === "1" || item.order_status_num === "2") {
                    orderStatusDisplay = "注文中";
                }
                if (item.order_status_num === "3" && item.total_trade_qty <= 0) {
                    orderStatusDisplay = "注文済";
                }
                if (item.order_status_num === "4" && item.total_trade_qty <= 0) {
                    orderStatusDisplay = "注文済（訂正中)";
                }
                if (item.order_status_num === "5" && item.total_trade_qty <= 0) {
                    orderStatusDisplay = "注文済（訂正済)";
                }
                if (item.order_status_num === "6" && item.total_trade_qty <= 0) {
                    orderStatusDisplay = "注文済（取消中)";
                }
                if (item.order_status_num === "7" && item.total_trade_qty <= 0) {
                    orderStatusDisplay = "取消済";
                }
                if (item.order_status_num === "8") {
                    orderStatusDisplay = "全部約定";
                }
                if (item.order_status_num === "9" && item.total_trade_qty <= 0) {
                    orderStatusDisplay = "失効";
                }
                if (item.order_status_num === "3" && item.total_trade_qty > 0) {
                    orderStatusDisplay = "一部約定（注文済)";
                }
                if (item.order_status_num === "4" && item.total_trade_qty > 0) {
                    orderStatusDisplay = "一部約定（訂正中)";
                }
                if (item.order_status_num === "5" && item.total_trade_qty > 0) {
                    orderStatusDisplay = "一部約定（訂正済)";
                }
                if (item.order_status_num === "6" && item.total_trade_qty > 0) {
                    orderStatusDisplay = "一部約定（取消中)";
                }
                if (item.order_status_num === "7" && item.total_trade_qty > 0) {
                    orderStatusDisplay = "一部約定（取消済)";
                }
                if (item.order_status_num === "9" && item.total_trade_qty > 0) {
                    orderStatusDisplay = "一部約定（失効)";
                }
            }

            if (item.otc_consign_cls === "1") {
                if (item.order_status_num === "1") {
                    orderStatusDisplay = "受付済";
                }
                if (item.order_status_num === "7") {
                    orderStatusDisplay = "取消済";
                }
                if (item.order_status_num === "8") {
                    orderStatusDisplay = "全部約定";
                }
                if (item.order_status_num === "9") {
                    orderStatusDisplay = "失効";
                }
            }
            return orderStatusDisplay;
        },
        renderBtnDetail(item) {
            let textDetail = "";
            if (["1", "2", "3", "4", "5", "6"].includes(item.order_status_num)) {
                if (item.otc_consign_cls === "1") {
                    textDetail = "注文明細・取消";
                }
                if (item.otc_consign_cls === "2") {
                    textDetail = "注文明細・訂正・取消";
                }
            }
            if (["7", "8", "9"].includes(item.order_status_num)) {
                textDetail = "注文明細";
            }
            return textDetail;
        },
    },
    created() {
        this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
        this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
        this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    },

    computed: {
        getOrdDayFrom() {
        if (this.jqParams.ord_day_from) {
            return Moment(this.jqParams.ord_day_from).format("YYYY/MM/DD");
        }
    
        return this.jqParams.ord_day_from;
        },
        getOrdDayTo() {
        if (this.jqParams.ord_day_to) {
            return Moment(this.jqParams.ord_day_to).format("YYYY/MM/DD");
        }
    
        return this.jqParams.ord_day_to;
        },
        buy_sell_cls_text: function () {
            const {items} = this.selectData.find((i) => i.abbr === "buy_sell_cls");
            return items.find((j) => j.id === this.jqParams.buy_sell_cls).name;
        },
        order_status_text: function () {
            const {items} = this.selectData.find((i) => i.abbr === "order_status");
            return items.find((j) => j.id === this.jqParams.order_status).name;
        },
        otc_consign_cls_text: function () {
            const {items} = this.selectData.find(
                (i) => i.abbr === "otc_consign_cls"
            );
            return items.find((j) => j.id === this.jqParams.otc_consign_cls).name;
        },
        ord_day_from_text: function () {
            return this.jqParams.ord_day_from
                ? Moment(this.jqParams.ord_day_from).format("YYYY/MM/DD")
                : "";
        },
        ord_day_to_text: function () {
            return this.jqParams.ord_day_to
                ? Moment(this.jqParams.ord_day_to).format("YYYY/MM/DD")
                : "";
        },
        commonJs() {
            return commonJs;
        },
        processEnv() {
            return commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION);
        },
    },
    deactivated(){
        window.removeEventListener('scroll', this.handleScroll)
    },
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll)
    }
};
