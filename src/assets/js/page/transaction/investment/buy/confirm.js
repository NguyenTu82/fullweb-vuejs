import commonJs from "@/assets/js/common/common";
import TopInfo from "@/components/common/TopInfo";

export default {
  title: "ホーム",
  name: "InvestStockBuyOrderConfirm",
  components: {
    TopInfo,
  },
  data() {
    return {
      infoArr: [
        { title: "参考基準価額（MM/DD）", value: "" },
        { title: "分配金受取方法", value: "" },
        { title: "売買区分", value: "" },
        { title: "注文方法", value: "" },
        { title: "口座区分", value: "" },
        { title: "注文金額", value: "" },
        { title: "概算約定金額", value: "" },
        { title: "概算購入口数", value: "" },
        { title: "約定日", value: "" },
        { title: "受渡日", value: "" },
      ],
      datas: {},
      inv_trust_assoc_cd: "",
      dividend_handling_cls: "",
    };
  },
  created() {
    this.inv_trust_assoc_cd = this.$route.query.inv_trust_assoc_cd || "";
    this.dividend_handling_cls = this.$route.query.dividend_handling_cls || "";
    this.account_cls = this.$route.query.account_cls || "";
    this.payment_cls = this.$route.query.payment_cls || "";
    this.amt_qty_designated_cls =
      this.$route.query.amt_qty_designated_cls || "";
    this.order_amt = this.$route.query.order_amt || "";
    this.password = this.$route.query.password || "";
    this.handleBuyStockOrder().then((res) => {
      this.datas = this.datas.DATA;
      res = this.datas;
      this.ord_check_no = this.datas.ord_check_no;
      (this.datas.infoArr = [
        {
          title: `参考基準価額（${res.base_price_current_dt}）`,
          value: `${commonJs.handNumberInt(res.base_price)}${this.initPrice(
            1
          )}`,
        },
        { title: "分配金受取方法", value: res.order_dividend_handling_cls_nm },
        { title: "売買区分", value: "購入" },
        { title: "注文方法", value: res.amt_qty_designated_cls_nm || "-" },
        {
          title: "口座区分",
          value: `${res.account_cls_nm}（${res.withholding_cls_nm}）`,
        },
        {
          title: "注文金額",
          value: `${commonJs.handNumberInt(res.order_amt)}${this.initPrice(
            1
          )}<br /><small>(概算手数料(税込）${commonJs.handNumberInt(
            res.approximate_comm_fee
          )}${this.initPrice(1)}）</small>`,
        },
        {
          title: "概算約定金額",
          value: `${commonJs.handNumberInt(
            res.approximate_trade_amt
          )}${this.initPrice(1)}`,
        },
        {
          title: "概算購入口数",
          value: `${commonJs.handNumberInt(
            res.approximate_trade_qty
          )}${this.initPrice(0)}`,
        },
        { title: "約定日", value: commonJs.handleDate(res.trade_d).date },
        { title: "受渡日", value: commonJs.handleDate(res.value_d).date },
      ]),
        (this.datas.brandLabels = []);
      if (res.fund_attr_cls !== "1") {
        this.datas.brandLabels.push({
          id: res.fund_attr_cls,
          name: res.fund_attr_cls_nm,
        });
      }
      if (res.fund_type_list && res.fund_type_list.length) {
        res.fund_type_list.forEach((item) => {
          this.datas.brandLabels.push({
            id: item.fund_type_cls,
            name: item.fund_type_nm,
          });
        });
      }
    });
  },
  methods: {
    initPrice(value) {
      return value ? ["<small>円</small>"] : ["<small>口</small>"];
    },
    async handleBuyStockOrder() {
      await this.$store
        .dispatch("handleBuyStockOrder", {
          inv_trust_assoc_cd: this.inv_trust_assoc_cd,
          dividend_handling_cls: this.dividend_handling_cls,
          account_cls: "2",
          amt_qty_designated_cls: this.amt_qty_designated_cls,
          order_amt: this.order_amt,
          password: this.password,
        })
        .then(() => {
          const res = this.$store.getters.handleBuyStockOrder;
          this.datas = res;
          return res;
        });
    },
    handleBackBuyOrder() {
      this.$router.push({
        path: "/transaction/investment/buy",
        query: {
          inv_trust_assoc_cd: this.inv_trust_assoc_cd,
          dataPopupDividendCls: this.dividend_handling_cls,
          order_amt: this.$route.query.order_amt,
          PAYMENT_ID: this.$route.query.PAYMENT_ID,
          amt_qty_designated_cls: this.$route.query.amt_qty_designated_cls,
        },
      });
    },
    async handleConfirmBuyOrder() {
      await this.$store.dispatch("handleRegistrationBuyStockOrder", {
        inv_trust_assoc_cd: this.inv_trust_assoc_cd,
        dividend_handling_cls: this.$route.query.dividend_handling_cls,
        account_cls: this.$route.query.account_cls || "2",
        amt_qty_designated_cls: this.amt_qty_designated_cls,
        order_amt: this.order_amt,
        appl_d: this.datas.appl_d,
        ord_check_no: this.ord_check_no,
      });
      let res = this.$store.getters.handleRegistrationBuyStockOrder;
      if (res.STATUS == "OK") {
        this.handleRedirectBuyComplete();
      }
    },
    handleRedirectBuyComplete() {
      let strName = this.datas.fund_nickname == null ? this.datas.fund_nm_short : this.datas.fund_nm_short + "("+ this.datas.fund_nickname + ")";
      
      this.$router.push({
        path: "/transaction/investment/buy/complete",
        query: {
          name: strName,
          status: 1,
        },
      });
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handleDate(number) {
      return commonJs.handleDate(number);
    },
  },
};
