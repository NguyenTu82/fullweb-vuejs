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
      tradeTypeBox: {
        1: "買付",
        2: "売付",
      },
      info: {
        company: "MSFT｜NASDAQ",
        stock: "マイクロソフト/ MICROSOFT CORP.",
      },
      infos: [
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
      infos2: [],
      currentData: {},
      type: 0,
      localStyle: {}, //0 - '注文明細', 1 - '約定明細'
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPGAINLOSS: commonConst.HELPGAINLOSS,
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/reference/contract/us" });
    },
    getData() {
      if (sessionStorage.getItem("orderInfo")) {
        this.type = this.$route.query.type;
        //todo 有未确认的字段
        this.currentData = JSON.parse(sessionStorage.getItem("orderInfo"));
        this.info.company = this.currentData.stock;
        let name = this.currentData.BRAND_NM_DISP
          ? this.currentData.BRAND_NM_DISP
          : "--";
        this.info.stock = name + "/ " + this.currentData.BRAND_NM_EN;
        //约定
        const infoS = [
          { title: "約定番号", value: this.currentData.ORDER_NO },
          {
            title: "約定日時",
            value: commonJs.handleDateMinute(this.currentData.EXECUTED_DT),
          },
          { title: "取引区分", value: this.currentData.TRANSACTION_TYPE },
          {
            title: "売買区分",
            value: this.currentData.TRADE_TYPE === 1 ? "買付" : "売付",
          },
          { title: "口座区分", value: this.currentData.ACCOUNT_TYPE },
          {
            title: "約定単価",
            value: this.currentData.EXECUTED_PRICE
              ? commonJs.handNumber(this.currentData.EXECUTED_PRICE) + "\xa0USD"
              : "－",
          },
          {
            title: "約定数量",
            value: this.currentData.EXECUTED_QTY
              ? commonJs.handNumberFloat(this.currentData.EXECUTED_QTY, 8) +
                "\xa0株"
              : "－",
          },
          {
            title: "為替レート",
            value: this.currentData.EXECUTED_EXCHANGE_RATE
              ? "USD/JPY  " +
                commonJs.handNumberFloat(
                  this.currentData.EXECUTED_EXCHANGE_RATE,
                  2
                )
              : "－",
          },
          {
            title: "受渡金額",
            value: this.currentData.SETTLE_AMOUNT
              ? commonJs.handNumberInt(this.currentData.SETTLE_AMOUNT) +
                "\xa0円"
              : "－",
          },
          { title: "決済方法", value: this.currentData.PAYMENT_ID },
          {
            title: "受渡日",
            value: commonJs.handleDateStr(this.currentData.SETTLE_D),
          },
          {
            title: "譲渡損益（特定口座）",
            value:
              this.currentData.GROSS_PROFIT &&
              this.currentData.GROSS_PROFIT != "-"
                ? this.handNumberGrossProfit(this.currentData.GROSS_PROFIT) +
                  "\xa0円"
                : "－\xa0円",
          },
        ];
        this.infos = infoS;
      }
    },
    handNumberGrossProfit(number) {
      let result = this.commonJs.handNumberInt(number);
      if (result.slice(0, 1) == "-" || result == 0) {
        return result;
      }
      return `+${result}`;
    },
    toStockDetail(brandId) {
      this.$router.push({
        name: "UsBrandDetail",
        query: { brandId: brandId },
      });
    },
  },
  mounted() {
    this.getData();
  },
};
