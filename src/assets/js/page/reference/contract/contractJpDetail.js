import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import apiInfo from "@/const/apiInfo";
import listPage from "@/views/reference/order/components/listPage";
import commonConst from "@/const/common";

export default {
  name: "contractJpDetail",
  data() {
    return {
      extraShow: false,
      infors: [
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
      infors2: [
        { title: "注文状況", value: "約定済" },
        { title: "買付株価", value: "" },
        { title: "買付株数", value: "－" },
        { title: "執行条件", value: "－" },
        { title: "有効期限", value: "－" },
        { title: "注文日時", value: "－" },
        { title: "注文番号", value: "－" },
      ],
      list: [
        {
          col0: "約定",
          col1: "2020/10/26 13:00:00",
          col2: "9,790円",
          col3: "30",
        },
      ],
      currentData: {},
      saveData: {},
      type: 0,
      localStyle: {}, //0 - '注文明細', 1 - '約定明細'
      showPwdPopup: false,
      orderData: {},
      orderStatusDisplay: "",
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPGAINLOSS: commonConst.HELPGAINLOSS,
    };
  },
  created() {},
  mounted() {
    let orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    this.saveData = orderInfo;
    this.requsetInfo();
    this.jqListRequest();
  },
  components:{
    listPage
  },
  methods: {
    requsetInfo() {
      let data = this.saveData;
      if (data) {
        httpRequest
          .post(
            "/hhd-api/JPStock/StockTradeDetailInfoController/exec",
            { ord_no: data.ord_no },
            { apiType: apiInfo.apiType.JP_STOCK }
          )
          .then((res) => {
            if (res.data.STATUS === "OK") {
              let childData = JSON.parse(
                JSON.stringify(res.data.DATA.lst_stock_trade_detail_info)
              );
              let resultData = res.data.DATA.lst_stock_trade_detail_info;
              if (resultData.length != 0) {
                this.currentData = this.deleteSameData(resultData)[0];
                this.currentData.avgPrice = (
                  this.currentData.trade_amt / this.currentData.cont_volume
                ).toFixed(2);
              }
              this.currentData.otc_consign_cls = parseInt(
                this.currentData.otc_consign_cls
              );
              const groupDate = childData.reduce((acc, item) => {
                const itemDate = commonJs.handleDate(item.cont_dt);
                let find = 0;
                for (let i = 0; i < itemDate.time.length; i++) {
                  if (itemDate.time[i] === ":") {
                    find++;
                  }
                }
                if (!acc[itemDate.date]) {
                  acc[itemDate.date] = [];
                }
                acc[itemDate.date].push({
                  col0: "約定",
                  col1: find < 2 ? `${itemDate.time}:00` : itemDate.time,
                  col2: commonJs.handNumberInt(item.cont_price) + "\xa0円",
                  col3: commonJs.handNumberInt(
                    +item.cont_volume
                  ) /* + '\xa0株' */,
                });
                return acc;
              }, {});

              this.list = groupDate;
              this.getData();
            } else {
              const message =
                "システムエラーが発生しました。同様のエラーが続く場合はカスタマーセンターまでお問い合わせください。";
              alert(message);
            }
          });
      }
    },
    getData() {
      if (this.orderData.otc_consign_cls === "2") {
        if (
          this.orderData.order_status === "1" ||
          this.orderData.order_status === "2"
        ) {
          this.orderStatusDisplay = "注文中";
        }
        if (
          this.orderData.order_status === "3" &&
          this.orderData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "注文済";
        }
        if (
          this.orderData.order_status === "4" &&
          this.orderData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "注文済（訂正中)";
        }
        if (
          this.orderData.order_status === "5" &&
          this.orderData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "注文済（訂正済)";
        }
        if (
          this.orderData.order_status === "6" &&
          this.orderData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "注文済（取消中)";
        }
        if (
          this.orderData.order_status === "7" &&
          this.orderData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "取消済";
        }
        if (this.orderData.order_status === "8") {
          this.orderStatusDisplay = "全部約定";
        }
        if (
          this.orderData.order_status === "9" &&
          this.orderData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "失効";
        }
        if (
          this.orderData.order_status === "3" &&
          this.orderData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（注文済)";
        }
        if (
          this.orderData.order_status === "4" &&
          this.orderData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（訂正中)";
        }
        if (
          this.orderData.order_status === "5" &&
          this.orderData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（訂正済)";
        }
        if (
          this.orderData.order_status === "6" &&
          this.orderData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（取消中)";
        }
        if (
          this.orderData.order_status === "7" &&
          this.orderData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（取消済)";
        }
        if (
          this.orderData.order_status === "9" &&
          this.orderData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（失効)";
        }
      }

      if (this.orderData.otc_consign_cls === "1") {
        if (this.orderData.order_status === "1") {
          this.orderStatusDisplay = "受付済";
        }
        if (this.orderData.order_status === "7") {
          this.orderStatusDisplay = "取消済";
        }
        if (this.orderData.order_status === "8") {
          this.orderStatusDisplay = "全部約定";
        }
        if (this.orderData.order_status === "9") {
          this.orderStatusDisplay = "失効";
        }
      }

      const infoS = [
        {
          title: "注文番号",
          value: this.currentData.ord_no,
          /* disabled: this.currentData.otc_consign_cls == 2 */
        },
        {
          title: "約定日",
          value: commonJs.handleDate(this.currentData.cont_dt).date,
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "約定日時",
          value: this.currentData.cont_dt,
          disabled: this.currentData.otc_consign_cls == 2,
        },
        { title: "取引区分", value: this.currentData.otc_consign_nm },
        {
          title: "売買区分",
          value: this.currentData.buy_sell_nm,
        },
        // { title: '引落先', value: '三菱UFJ銀行' },
        {
          title: "口座区分",
          value:
            this.saveData.acc_cls_nm == "特定"
              ? "特定（源泉徴収あり）"
              : this.saveData.acc_cls_nm,
        },
        {
          title: "約定単価",
          value: this.currentData.cont_price
            ? `${commonJs.handNumberInt(this.currentData.cont_price)}\xa0円`
            : "－",
          disabled: this.currentData.otc_consign_cls == 2,
        },
        {
          title: "約定数量",
          value: this.currentData.cont_volume
            ? this.currentData.otc_consign_cls == 1
              ? `${commonJs.handNumberFloat(
                  this.currentData.cont_volume
                )}\xa0株`
              : `${commonJs.handNumberInt(this.currentData.cont_volume)}\xa0株`
            : "－",
        },
        {
          title: "平均約定単価",
          value: this.currentData.avgPrice
            ? `${commonJs.handNumberInt(this.currentData.avgPrice)}\xa0円`
            : "－",
          groupChildren: this.list,
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "約定金額",
          value: this.currentData.trade_amt
            ? `${commonJs.handNumFloat(this.currentData.trade_amt)}\xa0円`
            : "－",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "税込手数料",
          value: this.currentData.fee
            ? `${commonJs.handNumberInt(this.currentData.fee)}\xa0円`
            : "－",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "受渡金額",
          value: this.currentData.net_amt
            ? `${commonJs.handNumFloat(this.currentData.net_amt)}\xa0円`
            : "－",
        },
        {
          title: "受渡日",
          value: this.saveData.SETTLE_D
            ? commonJs.handleDateStr(this.saveData.SETTLE_D)
            : "－",
        },
        {
          title: "市場",
          value: "東証",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "譲渡損益（特定口座）",
          value: this.saveData.GROSS_PROFIT
            ? `${commonJs.handNumberInt(this.saveData.GROSS_PROFIT)}\xa0円`
            : "－ 円",
        },
      ];
      this.infors = infoS;

      const infoS1 = [
        {
          title: "注文状況",
          value: this.orderStatusDisplay,
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "注文単価",
          value:
            this.orderData.price_cls == 1
              ? "成行"
              : `指値/${commonJs.handNumFloat(this.orderData.ord_price)}` +
                "\xa0円",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "注文数量",
          value: this.orderData.ord_volume
            ? `${commonJs.handNumFloat(this.orderData.ord_volume)}\xa0株`
            : "－",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "執行条件",
          value:
            this.orderData.exec_cond_nm == "指定なし"
              ? "なし"
              : this.orderData.exec_cond_nm,
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "有効期限",
          value: `${
            (this.orderData.order_duration_nm == "当日中"
              ? "当日"
              : this.orderData.order_duration_nm) +
            " " +
            "（" +
            this.orderData.order_expiration_date +
            "）"
          }`,
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "注文日時",
          value: this.orderData.ord_dt,
          disabled: this.currentData.otc_consign_cls == 1,
        },
      ];
      this.infors2 = infoS1;
    },
    jqListRequest() {
      let jqParams = {
        ord_no: this.saveData.ord_no, //起始ID 0 分页
      };
      httpRequest
        .post("/hhd-api/JPStock/StockOrderListController/exec", jqParams, {
          apiType: apiInfo.apiType.JP_STOCK,
        })
        .then((res) => {
          if (res.data.STATUS === "OK" && !res.data.ERROR) {
            let arr = res.data.DATA.lst_stock_order || [];
            if (arr.length != 0) this.orderData = arr[0];
            this.getData();
          } else {
            const message =
              "システムエラーが発生しました。同様のエラーが続く場合はカスタマーセンターまでお問い合わせください。";
            alert(message);
          }
        });
    },
    goBack() {
      this.$router.push({
        path: "/reference/contract/jp",
      });
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
          arr[index].trade_amt += parseFloat(data[i].trade_amt);
          arr[index].cont_volume += parseFloat(data[i].cont_volume);
          arr[index].net_amt += parseFloat(data[i].net_amt);
          arr[index].fee += parseFloat(data[i].fee);
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
    toStockDetail(stock_cd, exchange_cls) {
      let routeName = "ConsignmentTransactions";
      if (exchange_cls == "009") {
        routeName = "OverCounterTransactions";
      }

      let exchangeCls = exchange_cls;
      if (exchangeCls == "009") {
        exchangeCls = "001";
      }

      this.$router.push({
        name: routeName,
        query: { stock_cd: stock_cd, exchange_cls: exchangeCls },
      });
    },    
  },
};
