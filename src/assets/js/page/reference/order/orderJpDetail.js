import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import apiInfo from "@/const/apiInfo";
import OnnoDetail from "@/views/reference/order/components/onnoDetail.vue";
import OnnoRecord from "@/views/reference/order/components/onnoRecord.vue";
import codeJson from '@/utils/codeJson';
import message from "@/views/reference/components/Message";

export default {
  name: "OrderJpDetail",
  components: {
    OnnoDetail,
    OnnoRecord,
    message
  },
  data() {
    return {
      tradepwd: '',
      orderType: "detail",
      ord_sts_cdArr: [0, 1, 2, 3, 4, 5, 11, 12],
      info: {
        company: "MSFT｜NASDAQ",
        stock: "マイクロソフト",
      },
      currentData: {},
      showPwdPopup: false,
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
      infors2: [],
      detailsList: [],
      newStatus: [],
      orderStatusDisplay: "",
      currentTradeDataOld: [],
      newCanCancel: false,
      showOptionPanel: false,
    };
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    openPopup() {
      this.showOptionPanel = true;
    },
    modifyOrder(is_modify_amount) {
      let postParam = {
        change_amount: is_modify_amount ? 2 : 1,
        stock_cd: this.currentData.stock_cd,
        exchange_cls: this.currentData.exchange_cls,
        buy_sell_cls: this.currentData.buy_sell_cls,
        ord_no: this.currentData.ord_no // 订单id
      };

      this.$router.push({
        name: 'editOrder',
        query: postParam
      })
      this.showOptionPanel = false;
    },
    handeleErase() {
      const data = {
        ord_no: this.currentData.ord_no, //注文番号
        stock_cd: this.currentData.stock_cd, //銘柄コード
        exchange_cls: this.currentData.exchange_cls, //取引所区分
        buy_sell_cls: this.currentData.buy_sell_cls, //売買区分コード
        pin_no: commonJs.hashPwd(this.tradepwd)
      }
      httpRequest.post('/hhd-api/JPStock/StockOrderCancelService/exec/', data, {
        apiType: apiInfo.apiType.JP_STOCK
      }).then(res => {
        if (res.data.STATUS === 'OK') {
          this.showPwdPopup = false;
          this.newCanCancel = true;
          if (this.currentData.buy_sell_nm === "買付" && this.currentData.otc_consign_nm === "委託") {
            this.$router.push({
              path: "/jp/buy/order/confirm/cancel",
              query: {
                data: commonJs.aesEncrypt(JSON.stringify(this.currentData))
              }
            })
          } else if (this.currentData.buy_sell_nm === "買付" && this.currentData.otc_consign_nm === "店頭") {
            this.$router.push({
              path: "/jp/buy/reserve/cancel",
              query: {
                data: commonJs.aesEncrypt(JSON.stringify(this.currentData))
              }
            })
          } else if (this.currentData.buy_sell_nm === "売付" && this.currentData.otc_consign_nm === "委託") {
            this.$router.push({
              path: "/jp/sell/order/confirm/cancel",
              query: {
                data: commonJs.aesEncrypt(JSON.stringify(this.currentData))
              }
            })
          } else if (this.currentData.buy_sell_nm === "売付" && this.currentData.otc_consign_nm === "店頭") {
            this.$router.push({
              path: "/jp/sell/reserve/cancel",
              query: {
                data: commonJs.aesEncrypt(JSON.stringify(this.currentData))
              }
            })
          }
        }
      })
      this.tradepwd = ""
      this.showPwdPopup = false
    },
    cancelModal() {
      this.showPwdPopup = false;
      this.tradepwd = '';
    },
    handleBlur() {
      this.tradepwd = this.commonJs.zenkaku2Hankaku(this.tradepwd);
    },
    requsetInfo() {
      let orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
      let data = {
        ord_no: orderInfo.ORDER_NO,
      };
      httpRequest
        .post("/hhd-api/JPStock/StockOrderListController/exec", data, {
          apiType: apiInfo.apiType.JP_STOCK,
        })
        .then((res) => {
          if (res.data.STATUS == "NG") {
            const message =
              this.codeJson[res.data.ERROR.CODE] ||
              "システムエラーが発生しました。同様のエラーが続く場合はカスタマーセンターまでお問い合わせください。";
            this.showText = true;
            this.text = message;
          }
          if (res.data.STATUS === "OK") {
            let orderDetail = res.data.DATA.lst_stock_order || [];

            if (orderDetail.length != 0) {
              this.currentData = orderDetail.sort(function (a, b) {
                return b.ord_no - a.ord_no;
              })[0];
            }

            this.currentData.order_status = parseInt(
              this.currentData.order_status
            );

            this.getData();
            this.getOrderHistory();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    requsetInfoNew() {
      let orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

      let data = {
        ord_no: orderInfo.ORDER_NO, //注文番号}
      };
      httpRequest
        .post("/hhd-api/JPStock/StockTradeDetailInfoController/exec/", data, {
          apiType: apiInfo.apiType.JP_STOCK,
        })
        .then((res) => {
          if (res.data.STATUS === "OK") {
            let listData = res.data.DATA.lst_stock_trade_detail_info || [];
            if (listData.length == 0) {
              return;
            }

            if (listData.length != 0) {
              this.currentData = listData.sort(function (a, b) {
                return b.ord_no - a.ord_no;
              })[0];
            }
            this.currentData.order_status = parseInt(
              this.currentData.order_status
            );            
            this.getData();
          }
        });
    },
    requsetInfoOld() {
      let orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
      let data = {
        ord_no: orderInfo.ORDER_NO, //注文番号}
      };
      httpRequest
        .post("/hhd-api/JPStock/StockOrderDetailController/exec/", data, {
          apiType: apiInfo.apiType.JP_STOCK,
        })
        .then((res) => {
          if (res.data.STATUS === "OK") {
            let newOrderDetail = res.data.DATA.lst_stock_order_details || [];
            let newOrderDetailTrade =
              res.data.DATA.lst_stock_order_detail_trade || [];
            if (newOrderDetail.length == 0) {
              return;
            }
            if (newOrderDetail.length != 0) {
              this.currentDataOld = newOrderDetail.sort(function (a, b) {
                return b.ord_sub_no - a.ord_sub_no;
              })[0];
            }
            if (newOrderDetailTrade.length != 0) {
              this.currentTradeDataOld = newOrderDetailTrade;
            }
            this.getData();
          }
        });
    },
    getData() {
      const showStock =
      String(this.currentData.stock_cd)[
        String(this.currentData.stock_cd).length - 1
        ] === "0"
          ? String(this.currentData.stock_cd).slice(0, -1)
          : this.currentData.stock_cd;
      this.info.company =
        "(" + showStock + ")/" + this.currentData.exchange_cls_nm;

      if (this.currentData.otc_consign_cls === "2") {
        if (
          this.currentData.order_status === 1 ||
          this.currentData.order_status === 2
        ) {
          this.orderStatusDisplay = "注文中";
        }
        if (
          this.currentData.order_status === 3 &&
          this.currentData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "注文済";
        }
        if (
          this.currentData.order_status === 4 &&
          this.currentData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "注文済（訂正中)";
        }
        if (
          this.currentData.order_status === 5 &&
          this.currentData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "注文済（訂正済)";
        }
        if (
          this.currentData.order_status === 6 &&
          this.currentData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "注文済（取消中)";
        }
        if (
          this.currentData.order_status === 7 &&
          this.currentData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "取消済";
        }
        if (this.currentData.order_status === 8) {
          this.orderStatusDisplay = "全部約定";
        }
        if (
          this.currentData.order_status === 9 &&
          this.currentData.total_trade_qty <= 0
        ) {
          this.orderStatusDisplay = "失効";
        }
        if (
          this.currentData.order_status === 3 &&
          this.currentData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（注文済)";
        }
        if (
          this.currentData.order_status === 4 &&
          this.currentData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（訂正中)";
        }
        if (
          this.currentData.order_status === 5 &&
          this.currentData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（訂正済)";
        }
        if (
          this.currentData.order_status === 6 &&
          this.currentData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（取消中)";
        }
        if (
          this.currentData.order_status === 7 &&
          this.currentData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（取消済)";
        }
        if (
          this.currentData.order_status === 9 &&
          this.currentData.total_trade_qty > 0
        ) {
          this.orderStatusDisplay = "一部約定（失効)";
        }
      }

      if (this.currentData.otc_consign_cls === "1") {
        if (this.currentData.order_status === 1) {
          this.orderStatusDisplay = "受付済";
        }
        if (this.currentData.order_status === 7) {
          this.orderStatusDisplay = "取消済";
        }
        if (this.currentData.order_status === 8) {
          this.orderStatusDisplay = "全部約定";
        }
        if (this.currentData.order_status === 9) {
          this.orderStatusDisplay = "失効";
        }
      }

      this.info.stock = this.currentData.stock_nm;
      const newStatus = [];
      if (this.currentData.otc_consign_nm) {
        newStatus.push(this.currentData.otc_consign_nm);
      }
      if (this.currentData.order_status_nm) {
        newStatus.push(this.currentData.order_status_nm);
      }
      this.newStatus = newStatus;
      //注文
      const isBuyOrder =
        this.currentData.otc_consign_cls == 1 &&
        this.currentData.otc_order_cls == 2 &&
        this.currentData.buy_sell_cls == 1;
      const infoS = [
        {
          title: "注文番号",
          value: this.currentData.ord_no || "－",
        },
        {
          title: "注文状況",
          value: this.orderStatusDisplay,
        },
        {
          title: "注文日時",
          value: this.currentData.ord_dt,
        },
        {
          title: "注文方法",
          value: this.currentData.otc_order_cls_nm,
          disabled: this.currentData.otc_consign_cls == 2,
        },
        { title: "取引区分", value: this.currentData.otc_consign_nm },
        {
          title: "売買区分",
          value: this.currentData.buy_sell_nm,
        },
        {
          title: "売却株価",
          value: this.currentData.ord_price
            ? this.commonJs.handNumberInt(this.currentData.ord_price) + "\xa0円"
            : "－",
          disabled: !isBuyOrder,
        },
        {
          title: "売却株数",
          value: this.currentData.ord_volume
            ? this.commonJs.handNumFloat(this.currentData.ord_volume) + "\xa0株（口）"
            : "－",
          disabled: !isBuyOrder,
        },
        {
          title: isBuyOrder ? "概算受渡金額" : "注文金額",
          value: this.currentData.order_amt
            ? this.commonJs.handNumFloat(this.currentData.order_amt) + "\xa0円"
            : "－",
          disabled: this.currentData.otc_consign_cls == 2,
        },
        // 1:売 3:買
        {
          title: "注文価格",

          value:
            this.currentData.price_cls_nm +
            (this.currentData.price_cls == 2
              ? " / " +
              this.commonJs.handNumFloat(this.currentData.ord_price) +
              "\xa0円"
              : ""),
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: this.currentData.buy_sell_cls == "3" ? "注文数量" : "売付株数",
          value:
            this.commonJs.handNumFloat(this.currentData.ord_volume) + "\xa0株（口）",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "執行条件",
          value: this.currentData.exec_cond_nm,
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "有効期限",
          value:
            (this.currentData.order_duration_nm == "当日中"
              ? "当日"
              : this.currentData.order_duration_nm) +
            " " +
            "（" +
            this.currentData.order_expiration_date +
            "）",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "市場",
          value: "東証",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "口座区分",
          value:
            this.currentData.acc_cls_nm +
            "（" +
            this.currentData.withholding_nm +
            "）",
        },
      ];

      this.infors = infoS;

      let sumData = this.sumData(this.listData);
      let value_d = "－";
      if (this.listData && this.listData.length != 0)
        value_d =
          this.listData[this.listData.length - 1].value_d ||
          this.currentTradeDataOld[this.currentTradeDataOld.length - 1].value_d;
      let cont_dt = "－";
      if (this.listData && this.listData.length != 0)
        cont_dt = this.listData[this.listData.length - 1].cont_dt;
      const infoS2 = [
        {
          title: "失効日時",
          value: this.currentDataOld
            ? this.currentDataOld.failure_dt || "－"
            : "－",
        },
        {
          title: this.currentData.otc_consign_cls == "1" ? "約定価格" : "平均約定単価",
          value: sumData.new_avg_price
            ? this.commonJs.handNumber(sumData.new_avg_price) + "\xa0円"
            : "－",
        },
        {
          title: "約定数量",
          value: sumData.cont_volume
            ? this.commonJs.handNumFloat(sumData.cont_volume) + "\xa0株（口）"
            : "－",
        },
        {
          title: "約定金額",
          value: sumData.trade_amt
            ? this.commonJs.handNumFloat(sumData.trade_amt) + "\xa0円"
            : "－",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "税込手数料",
          value: sumData.new_fee
            ? this.commonJs.handNumberInt(sumData.new_fee) + "\xa0円"
            : "－",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "受渡金額",
          value: sumData.net_amt
            ? this.commonJs.handNumFloat(sumData.net_amt) + "\xa0円"
            : "－",
          disabled: this.currentData.otc_consign_cls == 1,
        },
        {
          title: "最終約定日時",
          value: cont_dt || "－",
        },
        {
          title: "受渡日",
          value: value_d || "－",
        },
      ];
      this.infors2 = infoS2;
    },
    // 获取注文履历
    getOrderHistory() {
      let data = {
        ord_no: this.currentData.ord_no,
      };
      httpRequest
        .post("/hhd-api/JPStock/OrderHistoryInfoController/exec", data, {
          apiType: apiInfo.apiType.JP_STOCK,
        })
        .then((res) => {
          if (res.data.STATUS == "NG") {
            const message =
              this.codeJson[res.data.ERROR.CODE] ||
              "システムエラーが発生しました。同様のエラーが続く場合はカスタマーセンターまでお問い合わせください。";
            this.showText = true;
            this.text = message;
          }
          if (res.data.STATUS === "OK") {
            this.detailsList = res.data.DATA.lst_result_info || [];
          }
        });
    },
    handeleCancel() {
      this.showPwdPopup = true;
    },
    //计算订单总和
    sumData(data) {
      let cont_volume = 0;
      let cont_amt = 0;
      let net_amt = 0;
      let avg_price = 0;
      let trade_d = null;
      let trade_amt = 0;
      let new_avg_price = 0;
      let new_fee = 0;

      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          cont_volume += parseFloat(item.cont_volume);
          cont_amt += parseFloat(item.cont_amt);
          net_amt += parseFloat(item.net_amt);
          trade_amt += parseFloat(item.trade_amt);
          new_fee += parseFloat(item.fee);
          if (trade_d) trade_d = item.trade_d;
          else {
            if (
              new Date(trade_d).getTime() < new Date(item.trade_d).getTime()
            ) {
              trade_d = item.trade_d;
            }
          }
        }
      }
      avg_price = cont_amt / cont_volume;
      new_avg_price = trade_amt / cont_volume;
      return {
        cont_volume: cont_volume || 0,
        cont_amt: cont_amt || 0,
        net_amt: net_amt || 0,
        avg_price: avg_price || 0,
        trade_d: trade_d,
        new_avg_price: new_avg_price || 0,
        trade_amt: trade_amt || 0,
        new_fee: new_fee || 0,
      };
    },
    handNumberGrossProfit(number) {
      let result = this.commonJs.handNumberInt(number);
      if (result.slice(0, 1) == "-" || result == 0) {
        return result;
      }
      return `+${result}`;
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
  },
  mounted() {
    this.requsetInfo();
    this.requsetInfoNew();
    this.requsetInfoOld();
  },
  computed: {
    commonJs() {
      return commonJs;
    },
    codeJson() {
      return codeJson;
    }
  },
};
