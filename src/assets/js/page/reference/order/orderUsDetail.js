import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonJs from "@/assets/js/common/common";
import listPage from "@/views/reference/order/components/listPage";

export default {
  name: "OrderUsDetail",
  data() {
    return {
      tradeTypeBox: {
        1: '買付',
        2: '売付'
      },
      info: {
        company: 'MSFT｜NASDAQ',
        stock: 'マイクロソフト/ MICROSOFT CORP.'
      },
      infors: [
        { title: '注文番号', value: '－' },
        { title: '注文状況', value: '－' },
        { title: '銘柄名', value: '－' },
        { title: '市場', value: '－' },
        { title: '注文方法', value: '－' },
        { title: '取引区分', value: '－' },
        { title: '売買区分', value: '－' },
        { title: '執行条件', value: '－' },
        { title: '注文有効期限', value: '－' },
        { title: '注文失効日時', value: '－' },
        { title: '注文金額', value: '－' },
        { title: '約定単価', value: '－' },
        { title: '約定数量', value: '－' },
        { title: '受渡金額', value: '－' },
        { title: '決済方法', value: '－' },
        { title: '口座区分', value: '－' },
        { title: '参考為替レート', value: '－' }
      ],
      infors2: [],
      currentData: {},
      type: 0,
      localStyle: {}, //0 - '注文明細', 1 - '約定明細'
    };
  },
  components:{
    listPage
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    getData() {
      if (sessionStorage.getItem('orderInfo')) {
        this.currentData = JSON.parse(sessionStorage.getItem('orderInfo'));
        this.info.company = this.currentData.stock;
        let name = this.currentData.BRAND_NM_DISP
            ? this.currentData.BRAND_NM_DISP
            : '--';
        this.info.stock = name + '/ ' + this.currentData.BRAND_NM_EN;
        if (this.type == 0) {
          //注文
          const infoS = [
            { title: '注文番号', value: this.currentData.ORDER_NO },
            {
              title: '注文状況',
              value: this.currentData.ORDER_STATUS_DISP
            },
            {
              title: '注文日時',
              value: this.commonJs.handleDateMinute(
                  this.currentData.ORDER_ACCEPT_DT
              )
            },
            { title: '注文方法', value: this.currentData.ORDER_METHOD_TEXT },
            { title: '取引区分', value: this.currentData.TRANSACTION_TYPE },
            // { title: '市場', value: '東証' },
            {
              title: '売買区分',
              value: this.currentData.TRADE_TYPE === 1 ? '買付' : '売付'
            },
            {
              title: '注文金額',
              value: this.currentData.ORDER_AMOUNT
                  ? this.commonJs.handNumberInt(this.currentData.ORDER_AMOUNT) +
                  '\xa0円'
                  : '－',
              // disabled:true
            },
            { title: '口座区分', value: this.currentData.ACCOUNT_TYPE },
            { title: '決済方法', value: this.currentData.PAYMENT_ID }
          ];
          this.infors = infoS;
          let order_failed_dt = '－';
          let exchange_rate_str = this.currentData.ORDER_EXCHANGE_RATE
              ? 'USD/JPY  ' +
              this.commonJs.handNumberFloat(
                  this.currentData.ORDER_EXCHANGE_RATE,
                  2
              )
              : '－';
          //约定和不是不成立的数据显示‘-’
          if (this.currentData.ORDER_FAILED_DT) {
            order_failed_dt = this.commonJs.handleDateMinute(
                this.currentData.ORDER_FAILED_DT
            );
          }
          if (4 == parseInt(this.currentData.ORDER_STATUS)) {
            //是约定时显示约定汇率
            exchange_rate_str = this.currentData.EXECUTED_EXCHANGE_RATE
                ? 'USD/JPY  ' +
                this.commonJs.handNumberFloat(
                    this.currentData.EXECUTED_EXCHANGE_RATE,
                    2
                )
                : '－';
          }

          const infoS2 = [
            { title: '不成立日時', value: order_failed_dt },
            {
              title: '約定単価',
              value: this.currentData.ORDER_PRICE
                  ? this.commonJs.handNumber(this.currentData.ORDER_PRICE) +
                  '\xa0USD'
                  : '－'
            },
            {
              title: '約定数量',
              value: this.currentData.ORDER_QTY
                  ? this.commonJs.handNumberFloat(this.currentData.ORDER_QTY, 8) +
                  '\xa0株'
                  : '－'
            },
            {
              title: '為替レート',
              value: exchange_rate_str
            },
            {
              title: '受渡金額',
              value: this.currentData.ORDER_AMOUNT
                  ? this.commonJs.handNumberInt(this.currentData.ORDER_AMOUNT) +
                  '\xa0円'
                  : '－'
            }
          ];
          this.infors2 = infoS2;
        } else {
          //约定
          const infoS = [
            { title: '約定番号', value: this.currentData.ORDER_NO },
            {
              title: '約定日時',
              value: this.commonJs.handleDateMinute(
                  this.currentData.EXECUTED_DT
              )
            },
            { title: '取引区分', value: this.currentData.TRANSACTION_TYPE },
            {
              title: '売買区分',
              value: this.currentData.TRADE_TYPE === 1 ? '買付' : '売付'
            },
            { title: '口座区分', value: this.currentData.ACCOUNT_TYPE },
            {
              title: '約定単価',
              value: this.currentData.EXECUTED_PRICE
                  ? this.commonJs.handNumber(this.currentData.EXECUTED_PRICE) +
                  '\xa0USD'
                  : '－'
            },
            {
              title: '約定数量',
              value: this.currentData.EXECUTED_QTY
                  ? this.commonJs.handNumberFloat(
                  this.currentData.EXECUTED_QTY,
                  8
              ) + '\xa0株'
                  : '－'
            },
            {
              title: '為替レート',
              value: this.currentData.EXECUTED_EXCHANGE_RATE
                  ? 'USD/JPY  ' +
                  this.commonJs.handNumberFloat(
                      this.currentData.EXECUTED_EXCHANGE_RATE,
                      2
                  )
                  : '－'
            },
            {
              title: '受渡金額',
              value: this.currentData.SETTLE_AMOUNT
                  ? this.commonJs.handNumberInt(this.currentData.SETTLE_AMOUNT) +
                  '\xa0円'
                  : '－'
            },
            { title: '決済方法', value: this.currentData.PAYMENT_ID },
            {
              title: '受渡日',
              value: this.commonJs.handleDateStr(this.currentData.SETTLE_D)
              // value: this.commonJs.handleDateMinute(this.currentData.SETTLE_D)
            },
            // { title: '市場', value: '東証' },
            {
              title: '譲渡損益（特定口座）',
              value:
                  this.currentData.GROSS_PROFIT &&
                  this.currentData.GROSS_PROFIT != '-'
                      ? this.handNumberGrossProfit(this.currentData.GROSS_PROFIT) +
                      '\xa0円'
                      : '－\xa0円'
            }
          ];
          this.infors = infoS;
        }
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
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.getData();
  },
  mounted() {},
  computed: {
    commonJs() {
      return commonJs;
    },
  },
};
