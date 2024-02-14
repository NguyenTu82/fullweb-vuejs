import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import apiInfo from "@/const/apiInfo";
import Moment from "moment";

export default {
  name: "deposit",
  data() {
    return {
      dataSource: [],
      modal: false,
      goodsData: [
        { id: '3', name: '投資信託' },
        { id: '1', name: '米国株式' },
        { id: '2', name: '国内株式' },
        { id: '0', name: '入出金' },
        { id: '', name: 'すべて' }
      ],
      common: commonJs,
      filterTime: [
        { value: "1", name: "1ヶ月" },
        { value: "2", name: "3ヶ月" },
        { value: "3", name: "6ヶ月" },
      ],
      filterGoods: [
        { value: "1", name: "日本株" },
        { value: "3", name: "米国株" },
        { value: "2", name: "投資信託" },
        { value: "0", name: "すべて" },
      ],
      filterMoney: [
        { value: "IN", name: "入金（増）" },
        { value: "OUT", name: "出金（減）" },
        { value: "ALL", name: "すべて" },
      ],
      params: {
        /* FROM_DATE: '',
        TO_DATE: '', */
        SINCE_SEQ_NO: 0,
        SUMMARY_TYPE: "ALL",
        SINCE_DATE: "",
        PRODUCT_CLS: "0",
        TERM: "1",
      },
    };
  },
  activated() {
    this.getList();
  },
  computed: {
    timeText: function () {
      return this.filterTime.find((item) => item.value === this.params.TERM);
    },
    goodsText: function () {
      return this.filterGoods.find(
        (item) => item.value === this.params.PRODUCT_CLS
      );
    },
    moneyText: function () {
      return this.filterMoney.find(
        (item) => item.value === this.params.SUMMARY_TYPE
      );
    },
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    formatSummaryType(item) {
      if (item.SUMMARY_TYPE_DISP == '入金手数料') return '入金手数料（税込）';
      if (item.SUMMARY_TYPE_DISP == '-') {
        if (item.PRODUCT_CLS == 3 && item.SUMMARY_TYPE == 1) return '購入';
        if (item.PRODUCT_CLS == 3 && item.SUMMARY_TYPE == 2) return '解約';
        if (item.PRODUCT_CLS == 1 && item.SUMMARY_TYPE == 1) return '買付';
        if (item.PRODUCT_CLS == 1 && item.SUMMARY_TYPE == 2) return '売付';
      }
      if (item.SUMMARY_TYPE_DISP == '振込手数料') return '振込手数料（税込）';
      if (item.PRODUCT_CLS == 3 && item.SUMMARY_TYPE == 1) return '購入';
      if (item.PRODUCT_CLS == 3 && item.SUMMARY_TYPE == 2) return '解約';
      return item.SUMMARY_TYPE_DISP;
    },
    dateFilter(val) {
      if (!val) return "-";
      let date = Moment(new Date(val).getTime());
      return date.format("MM/DD");
    },
    conditionsChange() {
      this.modal = true;
    },
    cancel() {
      this.modal = false;
    },
    confirmChange() {
      this.modal = false;
      this.getList();
    },
    getGoodsType(value) {
      let arr = this.goodsData.filter((item) => item.id == value);
      if (arr.length != 0) return arr[0].name;
      return this.goodsData[3].name;
    },
    getList() {
      const params = {
        ...this.params
      }
      params.SUMMARY_TYPE = params.SUMMARY_TYPE == "ALL" ? "" : params.SUMMARY_TYPE;
      httpRequest
        .get("/history/trade", {
          params: params,
          apiType: apiInfo.apiType.STOCK_FRONT,
        })
        .then((res) => {
          let { DATA } = res.data;
          if (res.data.STATUS === "OK") {
            this.dataSource = DATA;
          }
        });
    },
    clearCache() {
      this.dataSource = [];
      this.params.SINCE_SEQ_NO = 0;
      this.params.SINCE_DATE = "";
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.clearCache();
    this.getList();
  },
};
