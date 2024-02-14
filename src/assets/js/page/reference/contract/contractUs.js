import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import Moment from "moment";
import processEnvKey from "@/const/processEnvKey";

export default {
  name: "contractUs",
  data() {
    return {
      cardList: [],
      tempList: [],
      newList: [],
      list: [],
      common: commonJs,
      financial: commonConst.Financial,
      searchData: commonConst.getSelectDataUs(),
      params: {
        KEYWORD: "",
        ORDER_STATUS_MAIN: 101,
        SINCE_NO: 0,
        TRADE_TYPE: "",
        MARKET_ID: "",
        ORDER_ACCEPT_BASE_D_FROM: commonConst.getDate(),
        ORDER_ACCEPT_BASE_D_TO: "",
        TRADE_D_FROM: commonConst.getDate(),
        TRADE_D_TO: "",
      },
      showModal: false,
      isScroll:true,
      currentPage:1,
      pageSize:30,
      totalPage:1,
      allData:[]
    };
  },
  activated(){
    this.resetPage();
    this.list = [];
    this.params.SINCE_NO = 0;
    this.getList(this.params);
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    getTradeDayFrom() {
      if (this.params.ORDER_ACCEPT_BASE_D_FROM) {
        return Moment(this.params.ORDER_ACCEPT_BASE_D_FROM).format("YYYY/MM/DD");
      }
  
      return this.params.ORDER_ACCEPT_BASE_D_FROM;
    },
    getTradeDayTo() {
      if (this.params.ORDER_ACCEPT_BASE_D_TO) {
          return Moment(this.params.ORDER_ACCEPT_BASE_D_TO).format("YYYY/MM/DD");
      }
  
      return this.params.ORDER_ACCEPT_BASE_D_TO;
    },
    TRADE_TYPE_TEXT: function () {
      const { items } = this.searchData.find((i) => i.abbr === "TRADE_TYPE");
      return items.find((j) => j.id === this.params.TRADE_TYPE).name;
    },
    MARKET_ID_TEXT: function () {
      const { items } = this.searchData.find((i) => i.abbr === "MARKET_ID");
      return items.find((j) => j.id === this.params.MARKET_ID).name;
    },
    ORDER_ACCEPT_BASE_D_FROM_TEXT: function () {
      return this.params.ORDER_ACCEPT_BASE_D_FROM
        ? Moment(this.params.ORDER_ACCEPT_BASE_D_FROM).format("YYYY/MM/DD")
        : "";
    },
    ORDER_ACCEPT_BASE_D_TO_TEXT: function () {
      return this.params.ORDER_ACCEPT_BASE_D_TO
        ? Moment(this.params.ORDER_ACCEPT_BASE_D_TO).format("YYYY/MM/DD")
        : "";
    },
    processEnv(){
      return commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION);
    }
  },
  mounted() {
    this.resetPage();
    this.list = [];
    this.params.SINCE_NO = 0;
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
    clearSearch() {
      for (let obj in this.params) {
        this.params[obj] = "";
      }
      this.resetPage();
      this.list = [];
      this.params.SINCE_NO = 0;
      this.getList({});
    },
    checkShowStock(info) {
      return `${info.stock} ${
        info.otc_consign_cls && info.otc_consign_cls.toString() === "2"
          ? `/ ${info.exchange_cls_nm}`
          : ""
      }`;
    },
    searchChange() {
      this.showModal = false;
      this.resetPage();
      this.list = [];
      this.params.SINCE_NO = 0;
      this.getList(this.params);
    },
    getList(data) {
      let parameterData = {...data};
      if (JSON.stringify(parameterData) != "{}") {
        parameterData.ORDER_ACCEPT_BASE_D_FROM = parameterData.ORDER_ACCEPT_BASE_D_FROM.replace(/[-]/g, "/");
        parameterData.ORDER_ACCEPT_BASE_D_TO = parameterData.ORDER_ACCEPT_BASE_D_TO.replace(/[-]/g, "/");
        parameterData.TRADE_D_FROM = parameterData.ORDER_ACCEPT_BASE_D_FROM;
        parameterData.TRADE_D_TO = parameterData.ORDER_ACCEPT_BASE_D_TO;
      } else {
        parameterData.SINCE_NO = 0;
      }
      parameterData.ORDER_STATUS_MAIN = 101;
      let nowTm = new Date().getTime();
      httpRequest
        .get("/history/order", {
          params: parameterData,
          apiType: apiInfo.apiType.STOCK_FRONT,
        })
        .then((res) => {
          this.isScroll = true;
          if (res.data.STATUS === "OK") {
            if (res.data.DATA.length > 0) {
              let deltaTm = new Date().getTime() - nowTm;
              if (deltaTm >= 500) {
                this.hanldeData(res.data.DATA);
              } else {
                setTimeout(() => {
                  this.hanldeData(res.data.DATA);
                }, 500 - deltaTm);
              }
            }
          }
        });
    },
    hanldeData(List) {
      let tempList = []
      let order_no_list = List.map((item) => item.ORDER_NO);
      let minOrderNo = Math.min(...order_no_list);
      this.params.SINCE_NO = minOrderNo;
      List.map((item) => {
        item.DATE = item.EXECUTED_DT ? commonJs.handleDateMinute(item.EXECUTED_DT) : "";  
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
    goContractJpDetail(obj) {
      if (sessionStorage.getItem("orderInfo")) {
        sessionStorage.removeItem("orderInfo");
      }
      sessionStorage.setItem("orderInfo", JSON.stringify(obj));
      this.$router.push({
        path: "/reference/contract/us/detail",
      });
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
  },
  destroyed(){
    window.removeEventListener('scroll', this.handleScroll)
  },
  deactivated(){
    window.removeEventListener('scroll', this.handleScroll)
  },
};
