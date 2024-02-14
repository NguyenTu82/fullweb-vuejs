import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import Moment from "moment";
import processEnvKey from "@/const/processEnvKey";

export default {
  name: "contractJp",
  data() {
    return {
      showModal: false,
      cardList: [],
      tempList: [],
      newList: [],
      list: [],
      common: commonJs,
      searchData: commonConst.getSelectDataJp(),
      isScroll:true,
      params: {
        stock_nm: "",
        buy_sell_cls: "",
        otc_consign_cls: "",
        cont_day_from: commonConst.getDate(),
        cont_day_to: "",
      },
      currentPage:1,
      pageSize:30,
      totalPage:1,
      allData:[]
    };
  },
  mounted() {
    this.handleClearSelect();
    this.resetPage();
    this.newList = [];
    this.list = [];
    this.getList(this.params);
    window.addEventListener('scroll', this.handleScroll);
  },
  activated(){
    this.resetPage();
    this.newList = [];
    this.list = [];
    this.getList(this.params);
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    getTradeDayFrom() {
      if (this.params.cont_day_from) {
        return Moment(this.params.cont_day_from).format("YYYY/MM/DD");
      }
  
      return this.params.cont_day_from;
    },
    getTradeDayTo() {
      if (this.params.cont_day_to) {
          return Moment(this.params.cont_day_to).format("YYYY/MM/DD");
      }
  
      return this.params.cont_day_to;
    },
    buy_sell_cls_text: function () {
      const { items } = this.searchData.find((i) => i.abbr === "buy_sell_cls");
      return items.find((j) => j.id === this.params.buy_sell_cls).name;
    },
    otc_consign_cls_text: function () {
      const { items } = this.searchData.find(
        (i) => i.abbr === "otc_consign_cls"
      );
      return items.find((j) => j.id === this.params.otc_consign_cls).name;
    },
    from_date_text: function () {
      return this.params.cont_day_from
        ? Moment(this.params.cont_day_from).format("YYYY/MM/DD")
        : "";
    },
    to_date_text: function () {
      if (this.params.cont_day_from.slice(0, 4) == this.params.cont_day_to.slice(0, 4)) {
        return this.params.cont_day_to
          ? Moment(this.params.cont_day_to).format("MM/DD")
          : "";
      } else {
        return this.params.cont_day_to
          ? Moment(this.params.cont_day_to).format("YYYY/MM/DD")
          : "";
      }
    },
    processEnv(){
      return commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION);
    }
  },
  methods: {
    resetPage(){
      this.currentPage = 1;
      this.totalPage = 1;
      this.isScroll = true;
      this.allData = [];
    },
    checkShowStock(info) {
      return `${info.MARKET_CD} ${info.otc_consign_cls && info.otc_consign_cls.toString() === "2"
        ? `/ ${info.exchange_cls_nm}`
        : ""
        }`;
    },
    orderStatusDisplay(array, info) {
      let data = array.filter((v) => v.ord_no === info.ord_no);
      if (data[0] && data[0].otc_consign_cls === "2") {
        if (data[0].order_status === "1" || data[0].order_status === "2") {
          return "注文中";
        }
        if (data[0].order_status === "3" && data[0].total_trade_qty <= 0) {
          return "注文済";
        }
        if (data[0].order_status === "4" && data[0].total_trade_qty <= 0) {
          return "注文済（訂正中)";
        }
        if (data[0].order_status === "5" && data[0].total_trade_qty <= 0) {
          return "注文済（訂正済)";
        }
        if (data[0].order_status === "6" && data[0].total_trade_qty <= 0) {
          return "注文済（取消中)";
        }
        if (data[0].order_status === "7" && data[0].total_trade_qty <= 0) {
          return "取消済";
        }
        if (data[0].order_status === "8") {
          return "全部約定";
        }
        if (data[0].order_status === "9" && data[0].total_trade_qty <= 0) {
          return "失効";
        }
        if (data[0].order_status === "3" && data[0].total_trade_qty > 0) {
          return "一部約定（注文済)";
        }
        if (data[0].order_status === "4" && data[0].total_trade_qty > 0) {
          return "一部約定（訂正中)";
        }
        if (data[0].order_status === "5" && data[0].total_trade_qty > 0) {
          return "一部約定（訂正済)";
        }
        if (data[0].order_status === "6" && data[0].total_trade_qty > 0) {
          return "一部約定（取消中)";
        }
        if (data[0].order_status === "7" && data[0].total_trade_qty > 0) {
          return "一部約定（取消済)";
        }
        if (data[0].order_status === "9" && data[0].total_trade_qty > 0) {
          return "一部約定（失効)";
        }
      }
      if (data[0] && data[0].otc_consign_cls === "1") {
        if (data[0].order_status === "1") {
          return "受付済";
        }
        if (data[0].order_status === "7") {
          return "取消済";
        }
        if (data[0].order_status === "8") {
          return "全部約定";
        }
        if (data[0].order_status === "9") {
          return "失効";
        }
      }
      return '';
    },
    deleteSameData(data) {
      let arr = [];
      let orderId = [];
      for (let i = 0; i < data.length; i++) {
        let index = orderId.indexOf(data[i].ord_no);
        if (index == -1) {
          orderId.push(data[i].ord_no);
          arr.push(data[i]);
        } else {
          arr[index].net_amt += parseFloat(data[i].net_amt);
          arr[index].cont_volume += parseFloat(data[i].cont_volume);
          arr[index].transfer_gain_loss += parseFloat(
            data[i].transfer_gain_loss
          );

          if (
            new Date(arr[index].cont_dt).getTime() <
            new Date(data[i].cont_dt).getTime()
          )
            arr[index].cont_dt = data[i].cont_dt;
        }
      }

      return arr;
    },
    jqList(arr) {
      return arr.map((item) => {
        return {
          ORDER_NO: item.cont_no, //约定番号
          BRAND_NM_DISP: item.stock_nm,
          MARKET_NM_SHORT: item.exchange_cls_n,
          BRAND_NM: item.stock_nm, //銘柄名
          BRAND_CD: item.exchange_cls, //銘柄コード
          MARKET_CD:
            item.stock_cd.toString()[item.stock_cd.toString().length - 1] ===
            "0"
              ? item.stock_cd.toString().slice(0, -1)
              : item.stock_cd, //市場コード
          ACCOUNT_TYPE: item.acc_cls_cd, //口座区分
          acc_cls_nm: item.acc_cls_nm,
          TRADE_TYPE:
            parseInt(item.buy_sell_cls) == 3 ? 2 : parseInt(item.buy_sell_cls), //売買区分 1:買 2:売
          SETTLE_D: item.value_d, //受渡日
          TRADE_D: item.trade_d, //约定日
          EXECUTED_PRICE: item.cont_price, //	約定時価格
          SETTLE_AMOUNT: item.net_amt, //受渡金額
          EXECUTED_QTY: item.cont_volume, //約定時数量
          EXECUTED_DT: item.trade_d, //	約定日時
          otc_consign_cls: item.otc_consign_cls, //1:店頭 2:委託
          GROSS_PROFIT: item.transfer_gain_loss, //譲渡損益
          ord_no: item.ord_no,
          buy_sell_cls: item.buy_sell_cls,
          buy_sell_nm: item.buy_sell_nm,
          otc_consign_nm: item.otc_consign_nm,
          cont_dt: item.cont_dt,
          exchange_cls_nm: item.exchange_cls_nm,
        };
      });
    },
    getList(data) {
      let parameterData = {...data};
      if(parameterData.cont_day_from){
        parameterData.cont_day_from = data.cont_day_from.replace(/[-]/g, "/");
      }
      if(parameterData.cont_day_to){
        parameterData.cont_day_to = data.cont_day_to.replace(/[-]/g, "/");
      }
      httpRequest
        .post("/hhd-api/JPStock/StockTradeInfoController/exec", parameterData, {
          apiType: apiInfo.apiType.JP_STOCK,
        })
        .then((res) => {
          this.isScroll = true;
          if (res.data.STATUS === "OK") {
            let arr = res.data.DATA.lst_stock_trade_info;
            // 将相同订单id的数据组装为1条
            arr = this.deleteSameData(arr);
            if (arr.length > 0) {
              let newArr = this.jqList(arr);
              this.hanldeData(newArr);
            }
          }
        });
      let newJqParams = {
        stock_nm: "", //关键词
        buy_sell_cls: "", //売買 1:売、3:買
        order_status: "", //注文状況
        ord_day_from: "", //注文日开始时间
        ord_day_to: "", //注文一览结束时间
        otc_consign_cls: "", //店頭委託区分 1:店頭 2:委託
      };
      httpRequest
        .post("/hhd-api/JPStock/StockOrderListController/exec", newJqParams, {
          apiType: apiInfo.apiType.JP_STOCK,
        })
        .then((res) => {
          if (res.data.STATUS === "OK" && !res.data.ERROR) {
            let arr = res.data.DATA.lst_stock_order || [];
            if (arr.length > 0) {
              this.newList = arr;
            }
          }
        });
    },
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    hanldeData(List) {
      let tempList = [];
      List.map((item) => {
        var date = commonJs.handleDate(item.EXECUTED_DT);
        item.DATE = date != undefined ? date.date : '';
        item.company = item.BRAND_NM_DISP;
        item.stock = item.BRAND_CD + ' | ' + item.MARKET_NM_SHORT;
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
    groupData(Arr) {
      var map = {},
        dest = [];
      for (var i = 0; i < Arr.length; i++) {
        var ai = Arr[i];
        if (!map[ai.DATE]) {
          dest.push({
            TIME: ai.DATE,
            DATA: [ai],
          });
          map[ai.DATE] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.TIME === ai.DATE) {
              dj.DATA.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    handleClearSelect() {
      this.searchData.splice(1, 1);
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
    searchChange() {
      this.showModal = false;
      this.resetPage();
      this.newList = [];
      this.list = [];
      this.getList(this.params);
    },
    clearSearch() {
      for (let obj in this.params) {
        this.params[obj] = "";
      }
      this.resetPage();
      this.newList = [];
      this.list = [];
      this.getList({});
    },
    numberFormatter(number, decimals) {
      return commonJs.number_format(number, decimals);
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
    // 约定详情
    goContractJpDetail(item) {
      sessionStorage.setItem("orderInfo", JSON.stringify(item));
      this.$router.push({
        name: "contractJpDetail",
        params: {
          name: item.name,
        },
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
