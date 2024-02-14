import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import Moment from "moment";
import processEnvKey from "@/const/processEnvKey";

export default {
  name: "orderUs",
  data() {
    return {
      tableType: {
        1: '買付',
        2: '売付'
      },
      financial: commonConst.Financial,
      cardList: [],
      params: {
        stock_nm: "", //关键词
        trade: "", //売買 1:売、3:買
        status: "", //注文状況
        market: "",
        ord_day_from: commonConst.getDate(),
        ord_day_to: "",
        ord_no: 0,
      },
      searchText: {
        keywords: "", //銘柄名検索
        trade_type_text: "すべて", //売買
        order_status_text: "すべて", //状況
        market_text: "すべて", //上場市場
        profit_take_type_text: "すべて", //分配金受取種類
        found_type_text: "すべて", //ファンドタイプ
        trade_method_text: "すべて", //取引方式
        from_date: Moment().format("YYYY/MM/DD"),
        to_date: "",
      },
      showModal: false,
      date: {},
      selectData: commonConst.getSelectDataOrderUS("us"),
      list:[],
      isScroll:true,
      endPageFlg: false,
    };
  },
  activated(){
    this.resetPage();
    this.list = [];
    this.params.SINCE_NO = 0;
    this.getData();
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    resetPage(){
      this.isScroll = true;
      this.endPageFlg = false;
    },
    handleScroll(){
      if(!this.endPageFlg && commonJs.scrollBottom()){
        this.getData();
      }
    },
    isBranch(branchDivision) {
      if (this.branchDivision === branchDivision) {
        return true;
      }
      return false;
    },
    changeParams(val, type) {
      let value = val.target.value;
      this.params[type] = value;
    },
    closeModal() {
      this.showModal = false;
    },
    searchData() {
      this.showModal = false;
      this.renderSearch();
      this.$nextTick(() => {
        this.refresh();
      });
    },
    renderParams() {
      const usSelect = commonConst.getSelectDataOrderUS("us");
      let trade = usSelect
        .find((item) => item.abbr == "trade")
        .items.find((item) => item.name == this.searchText.trade_type_text).id;
      let status = usSelect
        .find((item) => item.abbr == "status")
        .items.find(
          (item) => item.name == this.searchText.order_status_text
        ).id;
      let market = usSelect
        .find((item) => item.abbr == "market")
        .items.find((item) => item.name == this.searchText.market_text).id;
      this.params = {
        stock_nm: this.searchText.keywords,
        trade, //売買 1:売、3:買
        status,
        market,
        ord_day_from:
          this.searchText.from_date != ""
            ? Moment(this.searchText.from_date).format("YYYY/MM/DD")
            : "",
        ord_day_to:
          this.searchText.to_date != ""
            ? Moment(this.searchText.to_date).format("YYYY/MM/DD")
            : "",
      };
    },
    renderSearch() {
      const usSelect = commonConst.getSelectDataOrderUS("us");
      let trade_type_text = usSelect
        .find((item) => item.abbr == "trade")
        .items.find((item) => item.id == this.params.trade).name;
      let order_status_text = usSelect
        .find((item) => item.abbr == "status")
        .items.find((item) => item.id == this.params.status).name;
      let market_text = usSelect
        .find((item) => item.abbr == "market")
        .items.find((item) => item.id == this.params.market).name;
      this.searchText = {
        keywords: this.params.stock_nm,
        trade_type_text,
        market_text,
        order_status_text,
        from_date:
          this.params.ord_day_from && this.params.ord_day_from != ""
            ? Moment(this.params.ord_day_from).format("YYYY/MM/DD")
            : "",
        to_date:
          this.params.ord_day_to && this.params.ord_day_to != ""
            ? Moment(this.params.ord_day_to).format("YYYY/MM/DD")
            : "",
      };
    },

    refresh() {
      this.resetPage();
      this.clearCache();
      this.getData();
    },
    clearCache() {
      this.list = [];
      this.params.SINCE_NO = 0;
    },
    //打开搜索弹层
    openSearch() {
      this.showModal = true;
      this.renderParams();
    },
    // 重制
    handelRemake() {
      this.params = {
        stock_nm: "",
        trade: "", //売買 1:売、3:買
        status: "", //注文状況
        market: "",
        ord_day_from: "",
        ord_day_to: "",
        ord_no: 0,
      };
      this.searchText = {
        keywords: "", //銘柄名検索
        trade_type_text: "すべて", //売買
        order_status_text: "すべて", //状況
        market_text: "すべて", //上場市場
        profit_take_type_text: "すべて", //分配金受取種類
        found_type_text: "すべて", //ファンドタイプ
        trade_method_text: "すべて", //取引方式
        from_date: "",
        to_date: "",
      };
      this.refresh();
    },
    // 注文详情
    goOrderDetail(item) {
      sessionStorage.setItem("orderInfo", JSON.stringify(item));
      this.$router.push({
        name: "orderUsDetail",
        params: {
          name: item.name,
        },
      });
    },
    getData() {
      if (!this.isScroll) {
        return;
      }

      this.isScroll = false;
      let nowTm = new Date().getTime();
      const newParams = {
        TRADE_TYPE: this.params.trade,
        SINCE_NO: this.params.SINCE_NO || 0,
        KEYWORD: this.params.stock_nm,
        MARKET_ID: this.params.market,
        ORDER_STATUS_MAIN: this.params.status,
        TRADE_D_FROM:
          this.params.ord_day_from && this.params.ord_day_from != ""
            ? Moment(this.params.ord_day_from).format("YYYY/MM/DD")
            : "", //开始时间
        TRADE_D_TO: this.params.ord_day_to,
        ORDER_ACCEPT_BASE_D_FROM:
          this.params.ord_day_from && this.params.ord_day_from != ""
            ? Moment(this.params.ord_day_from).format("YYYY/MM/DD")
            : "",
        ORDER_ACCEPT_BASE_D_TO: this.params.ord_day_to,
      };
      httpRequest
        .get("/history/order", {
          params: newParams,
          apiType: apiInfo.apiType.STOCK_FRONT,
        })
        .then((res) => {
          this.isScroll = true;
          if (res.data.STATUS === "OK") {
            if (res.data.DATA.length > 0) {
              if (res.data.DATA.length < 20) {
                this.endPageFlg = true;
              }
              let deltaTm = new Date().getTime() - nowTm;
              if (deltaTm >= 500) {
                this.hanldeData(res.data.DATA);
              } else {
                setTimeout(() => {
                  this.hanldeData(res.data.DATA);
                }, 500 - deltaTm);
              }
            } else {
              this.endPageFlg = true;
            }
          }
        })
        .catch((err) => {
          this.isScroll = true;
          console.log(err);
        });

      // TODO 画面無反応対応SKIPため、解锁
      this.apiLock = false;
    },
    hanldeData(List) {
      let tempList = [];
      this.params.SINCE_NO = List[List.length - 1].ORDER_NO;
      List.map((item) => {
        var date = this.commonJs.handleDate(item.ORDER_ACCEPT_DT);
        item.DATE = date.date;
        item.company = item.BRAND_NM_DISP;
        item.stock = item.BRAND_CD + ' | ' + item.MARKET_NM_SHORT;
        tempList.push(item);
      });

      this.list.push(...tempList);
    },
  },
  mounted() {
    this.list = [];
    this.copyParams = JSON.parse(JSON.stringify(this.params));
    this.getData();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed(){
    window.removeEventListener('scroll', this.handleScroll)
  },
  deactivated(){
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    getOrdDayFrom() {
      if (this.params.ord_day_from) {
        return Moment(this.params.ord_day_from).format("YYYY/MM/DD");
      }

      return this.params.ord_day_from;
    },
    getOrdDayTo() {
      if (this.params.ord_day_to) {
        return Moment(this.params.ord_day_to).format("YYYY/MM/DD");
      }

      return this.params.ord_day_to;
    },
    processEnv(){
      return commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION);
    },
    commonJs() {
      return commonJs;
    },
    handleTDate() {
      var date1 = new Date(this.params.ord_day_from);
      var date2 = new Date(this.params.ord_day_to);
      var y1 = date1.getFullYear();
      var y2 = date2.getFullYear();
      if (y1 == y2) {
        let newDate = this.Moment(new Date(this.params.ord_day_to).getTime());
        return newDate.format("MM/DD");
      } else {
        return this.params.ord_day_to;
      }
    },
  },
};
