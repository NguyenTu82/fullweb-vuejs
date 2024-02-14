import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import apiInfo from "@/const/apiInfo";
import Moment from "moment";
import processEnvKey from "@/const/processEnvKey";

export default {
  name: "orderInvest",
  data() {
    return {
      financial: commonConst.Financial,
      tempList:[],
      cardList: [],
      originItData: [],
      tableTypeIt: {
        1: "解約",
        3: "購入",
      },
      fund_type_list_all: [],
      itlistData: [], //投资信托列表
      params: {
        keywords: "", //关键词
        trade: "", //売買
        status: "", //注文状況
        profit: "",
        found: "",
        from_date: commonConst.getDate(), //注文日开始时间
        to_date: "", //注文一览结束时间
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
      apiLock: false, //api锁，防止重复请求引起的数据重叠
      showModal: false,
      isScroll:true,
      date: {},
      selectData: commonConst.getSelectDataOrderIt(),
      list:[],
      currentPage:1,
      pageSize:30,
      totalPage:1,
      allData:[]
    };
  },
  activated(){
    if(this.processEnv == 'NCB'){
      this.$router.back();
      return false;
    }
    this.resetPage();
    this.list = [];
    this.getData();
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
      const itSelect = commonConst.getSelectDataOrderIt();
      let trade = itSelect
        .find((item) => item.abbr == "trade")
        .items.find((item) => item.name == this.searchText.trade_type_text).id;
      let status = itSelect
        .find((item) => item.abbr == "status")
        .items.find(
          (item) => item.name == this.searchText.order_status_text
        ).id;
      let profit = itSelect
        .find((item) => item.abbr == "profit")
        .items.find(
          (item) => item.name == this.searchText.profit_take_type_text
        ).id;
      let found = itSelect
        .find((item) => item.abbr == "found")
        .items.find((item) => item.name == this.searchText.found_type_text).id;
      this.params = {
        keywords: this.searchText.keywords, //关键词
        trade, // 1:解約 :購入
        status, //注文状況
        profit,
        found,
        from_date:
          this.searchText.from_date != ""
            ? Moment(this.searchText.from_date).format("YYYY/MM/DD")
            : "", //注文日开始时间
        to_date:
          this.searchText.to_date != ""
            ? Moment(this.searchText.to_date).format("YYYY/MM/DD")
            : "", //注文一览结束时间
        // ord_no: this.params.SINCE_NO //起始ID 0 分页
      };
    },
    renderSearch() {
      const itSelect = commonConst.getSelectDataOrderIt();
      let trade_type_text = itSelect
        .find((item) => item.abbr == "trade")
        .items.find((item) => item.id == this.params.trade).name;
      let order_status_text = itSelect
        .find((item) => item.abbr == "status")
        .items.find((item) => item.id == this.params.status).name;
      let profit_take_type_text = itSelect
        .find((item) => item.abbr == "profit")
        .items.find((item) => item.id == this.params.profit).name;
      let found_type_text = itSelect
        .find((item) => item.abbr == "found")
        .items.find((item) => item.id == this.params.found).name;
      this.searchText = {
        keywords: this.params.keywords,
        trade_type_text,
        profit_take_type_text,
        order_status_text,
        found_type_text,
        from_date:
          this.params.from_date && this.params.from_date != ""
            ? Moment(this.params.from_date).format("YYYY/MM/DD")
            : "",
        to_date:
          this.params.to_date && this.params.to_date != ""
            ? Moment(this.params.to_date).format("YYYY/MM/DD")
            : "",
      };
    },

    refresh() {
      this.resetPage();
      this.clearCache();
      this.getData();
      this.params.SINCE_NO = 0;
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
        keywords: "", //关键词
        trade: "", //売買
        status: "", //注文状況
        profit: "",
        found: "",
        from_date: "", //注文日开始时间
        to_date: "", //注文一览结束时间
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

    getData() {
      // 西安 HDH00005_01-338 ② 10/5
      let itParams = {
        keyword: this.params.keywords, //关键词
        buy_sell_cls: this.params.trade, //売買 1:売、3:買
        order_sts: this.params.status, //注文状況
        order_d_from: this.params.from_date
          ? Moment(this.params.from_date).format("YYYY/MM/DD")
          : "", //开始时间
        order_d_to: this.params.to_date ? Moment(this.params.to_date).format("YYYY/MM/DD") : "", //结束时间
        dividend_handling_cls: this.params.profit, // 分配金受取区分 1：分配金受取型 2：再投資型
        fund_type: this.params.found, //ファンドタイプ 1：通貨選択型 2：レバレッジ型3：インデックス4：アクティブ型
      };
      httpRequest
        .post(
          "/hhd-it/it/InvOrderInfoListAcquisitionController/exec",
          itParams,
          { apiType: apiInfo.apiType.FUND_STOCK }
        )
        .then((res) => {
          this.isScroll = true;
          if (res.data.STATUS === "OK" && !res.data.ERROR) {
            let infoList = res.data.DATA.order_info_list;
            if (this.fund_type_list_all.length <= 0)
              this.fund_type_list_all = res.data.DATA.fund_type_list_all;
            let handelData = this.splitRepeatData(infoList);
            let arr = handelData.repeatData;
            this.originItData = infoList;
            if (arr.length > 0) {
              this.itlistData = arr;
              let newArr = this.itList(arr);
              this.hanldeData(newArr);
            }
          }
        });
    },
    splitRepeatData(data) {
      let result = [];

      let groupData = [];
      let ids = [];

      if (data) {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let index = ids.indexOf(item.order_no);
          if (index == -1) {
            result.push(item);
            ids.push(item.order_no);
            groupData.push([item]);
          } else {
            let repeatData = result[index];
            if (repeatData.order_sts < item.order_sts) result[index] = item;
            groupData[index].push(item);
          }
        }
      }

      return {
        repeatData: result,
        groupData: groupData,
      };
    },
    itList(arr) {
      return arr.map((item) => {
        return {
          ORDER_NO: item.order_no, //注文番号
          BRAND_NM_DISP: item.fund_nm_short, //基金名字
          fund_nm_short: item.fund_nm_short,
          MARKET_NM_SHORT: item.exchange_cls_nm,
          BRAND_NM: item.stock_nm, //銘柄名
          BRAND_CD: item.exchange_cls, //銘柄コード
          ACCOUNT_TYPE: item.account_cls, //口座区分
          TRADE_TYPE: item.sell_buy_cls, //売買区分 1：解約3：購入
          ORDER_AMOUNT: item.order_amt, //	注文金額
          ORDER_PRICE: item.ord_price, // 注文時価格
          ORDER_QTY: item.order_qty, //注文時数量
          ORDER_STATUS: item.order_sts, // 注文状況 1：受付済 2：執行中7：取消済み8：約定9：失効
          ORDER_ACCEPT_DT: item.order_dt, //	注文受付日時
          order_dividend_handling_cls: item.order_dividend_handling_cls, //注文分配金取扱区分
          dividend_handling_cls: item.dividend_handling_cls, //分配金受取区分
          dividend_handling_cls_nm: item.dividend_handling_cls_nm, //"再投資型"
          fund_type_list: item.fund_type_list,
          fund_attr_cls_nm: item.fund_attr_cls_nm,
          fund_attr_cls: item.fund_attr_cls,
          order_sts: item.order_sts,
          order_sts_nm: item.order_sts_nm,
          fund_nickname: item.fund_nickname,
        };
      });
    },

    hanldeData(List) {
      //处理分组
      let tempList = [];
      List.map((item) => {
        var date = this.commonJs.handleDate(item.ORDER_ACCEPT_DT);
        item.DATE = date.date;
        item.company = item.BRAND_NM_DISP;
        item.stock = item.BRAND_CD + ' | ' + item.MARKET_NM_SHORT;
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
    getOriginItData(item) {
      let data = this.originItData.filter((d) => {
        return item.ORDER_NO == d.order_no;
      });

      return data;
    },
    getItlistData(item) {
      let data = this.itlistData.filter((d) => {
        let date = this.commonJs.handleDate(d.order_dt).date;
        return date == item.DATE && item.ORDER_NO == d.order_no;
      });

      if (data.length != 0) return data[0];
      return {};
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
    // 注文详情
    goOrderDetail(item) {
      sessionStorage.setItem(
        "orderInfo",
        JSON.stringify(this.getItlistData(item))
      );
      sessionStorage.setItem(
        "itGroupData",
        JSON.stringify(this.getOriginItData(item))
      );

      this.$router.push({
        name: "orderInvestDetail",
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
  mounted() {
    if(this.processEnv == 'NCB'){
      this.$router.back();
      return false;
    }
    this.resetPage();
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
    commonJs() {
      return commonJs;
    },
    processEnv(){
      return commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION);
    },
    getOrdDayFrom() {
    if (this.params.from_date) {
        return Moment(this.params.from_date).format("YYYY/MM/DD");
    }

    return this.params.from_date;
    },
    getOrdDayTo() {
    if (this.params.to_date) {
        return Moment(this.params.to_date).format("YYYY/MM/DD");
    }

    return this.params.to_date;
    },
    handleTDate() {
      var date1 = new Date(this.params.from_date);
      var date2 = new Date(this.params.to_date);
      var y1 = date1.getFullYear();
      var y2 = date2.getFullYear();
      if (y1 == y2) {
        let newDate = this.Moment(new Date(this.params.to_date).getTime());
        return newDate.format("MM/DD");
      } else {
        return this.params.to_date;
      }
    },
  },
};
