import commonJs from "@/assets/js/common/common";
import listPage from "@/views/reference/order/components/listPage";
import commonConst from "@/const/common";

export default {
  name: "",
  components:{
    listPage
  },
  data() {
    return {
      extraShow: false,
      ord_sts_cdArr: [0, 1, 2, 3, 4, 5, 6, 11, 12],
      infors: [
        { title: "約定番号", value: "－" },
        { title: "約定日", value: "－" },
        { title: "分配金受取型種類", value: "－" },
        { title: "売買区分", value: "－" },
        { title: "口座区分", value: "－" },
        { title: "価額", value: "－" },
        { title: "約定口数", value: "－" },
        { title: "約定金額", value: "－" },
        { title: "税込手数料", value: "－" },
        { title: "信託財産留保額", value: "－" },
        { title: "受渡金額", value: "－" },
        { title: "受渡日", value: "－" },
        { title: "譲渡損益（特定口座）", value: "－" },
      ],
      infors2: [
        { title: "注文状況", value: "約定済" },
        { title: "買付株価", value: "" },
        { title: "買付株数", value: "－" },
        { title: "執行条件", value: "－" },
        { title: "有効期限", value: "－" },
        { title: "注文日時", value: "－" },
        { title: "注文番号", value: "－" },
      ],
      currentData: {},
      type: 0,
      localStyle: {}, //0 - '注文明細', 1 - '約定明細'
      showPwdPopup: false,
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPGAINLOSS: commonConst.HELPGAINLOSS,
    };
  },
  mounted() {
    this.requsetData();
  },
  methods: {
    requsetData() {
      this.currentData = JSON.parse(sessionStorage.getItem("orderInfo"));
      if (this.currentData) {
        this.getData();
      }
    },
    getData() {
      const infoS = [
        { title: "約定番号", value: this.currentData.trade_no || "－" },
        {
          title: "約定日",
          value: this.currentData.trade_d
            ? commonJs.handleDate(this.currentData.trade_d).date
            : "－",
        },
        {
          title: "分配金受取種類",
          value: this.currentData.order_dividend_handling_cls_nm || "－",
        },
        {
          title: "売買区分",
          value: this.currentData.buy_sell_cls_nm || "－",
        },

        {
          title: "口座区分",
          value:
            this.currentData.account_cls == 1
              ? this.currentData.account_cls_nm
              : `${this.currentData.account_cls_nm}(${this.currentData.withholding_cls_nm})`,
        },
        {
          title: "価額",
          value:
            commonJs.handNumberInt(this.currentData.trade_price) + "\xa0円" ||
            "－" + "\xa0円",
        },
        {
          title: "約定口数",
          value:
            commonJs.handNumFloat(this.currentData.trade_qty) + "\xa0口" ||
            "－" + "\xa0口",
        },
        {
          title: "約定金額",
          value:
            commonJs.handNumberInt(this.currentData.trade_amount) + "\xa0円" ||
            "－" + "\xa0円",
        },
        {
          title: "\xa0\xa0\xa0\xa0\xa0\xa0税込手数料",
          value:
            "（" +
              commonJs.handNumberInt(this.currentData.order_amount_fee) +
              "\xa0円）" || "－" + "\xa0円）",
        },
        {
          title: "受渡金額",
          value:
            commonJs.handNumberInt(this.currentData.value_amount) + "\xa0円" ||
            "－" + "\xa0円",
        },
        {
          title: "受渡日",
          value: commonJs.handleDateStr(this.currentData.value_d) || "－",
        },
        {
          title: "譲渡損益（特定口座）",
          value:
            this.currentData.buy_sell_cls == 3 ||
            (this.currentData.buy_sell_cls == 1 &&
              this.currentData.capital_gain)
              ? (commonJs.handNumberInt(this.currentData.capital_gain) ||
                  "－") + "\xa0円"
              : "－",
        },
      ];
      this.infors = infoS;
    },
    goBack() {
      this.$router.push({ path: "/reference/contract/invest" });
    },
    toStockDetail(inv_trust_assoc_cd) {
      this.$router.push({
          name: "InvestBrandDetail",
          query: { inv_trust_assoc_cd: inv_trust_assoc_cd },
      });
  },
  },
};
