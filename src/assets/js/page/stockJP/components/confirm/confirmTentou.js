import modalNotice from "@/views/stockJP/components/modal/modalNotice";
import { mapActions, mapGetters } from "vuex";
import commonJs from "@/assets/js/common/common";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getDataConfirm();
    });
  },
  components: { modalNotice },
  data() {
    return {
      confirmData: {},
      order_timer_limit: -1,
      showModalNotice: false,
      stock_name: "",
      resAPI: {},
      otc_order_cls: "",
      markup_ask: 0,
      markup_bid: 0,
    };
  },
  watch: {
    order_timer_limit: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.order_timer_limit--;
          }, 1000);
        } else if (value == 0) {
          this.showModalNotice = true;
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["dataExecuteBuy", "dataBrandInfo"]),
  },

  methods: {
    ...mapActions(["cAPIExecuteBuy", "cAPIBrandInfo"]),
    goBack() {
      commonJs.saveLocalData("dataConfirm", this.confirmData);
      this.$router.go(-1);
    },
    getDataConfirm() {
      this.confirmData = commonJs.aesDecrypt(this.$route.query.data);
      this.confirmData = JSON.parse(this.confirmData);
      this.markup_ask = this.confirmData.markup_ask;
      this.markup_bid = this.confirmData.markup_bid;
      switch (this.confirmData.otc_order_cls) {
        case 2:
          this.otc_order_cls = "全部売却";
          break;
        case 4:
          this.otc_order_cls = "預り金全部買付";
          break;
        default:
          this.otc_order_cls = "金額指定";
      }
      if (this.confirmData.order_rcve_flg == 2) {
        this.order_timer_limit = 5;
      }
      this.resAPI = commonJs.aesDecrypt(this.$route.query.resAPI);
      this.resAPI = JSON.parse(this.resAPI);
      this.confirmData["kind"] = 2;
      this.stock_name = `${
        this.confirmData.stock_nm
      } (${this.confirmData.stock_cd.toString().slice(0, 4)})`;
    },
    funcHideNoticeModal() {
      this.showModalNotice = false;
      this.cAPIBrandInfo({
        exchange_cls: this.confirmData.exchange_cls,
        stock_cd: this.confirmData.stock_cd,
      }).then(() => {
        if (this.dataBrandInfo) {
          this.order_timer_limit = 5;
          this.markup_ask = this.dataBrandInfo.markup_ask;
          this.markup_bid = this.dataBrandInfo.markup_bid;
        }
      });
    },
    actionExecuteBuy() {
      const amount_rate = 0.5;
      const body = {
        otc_consign_cls: this.confirmData.otc_consign_cls,
        exchange_cls: this.confirmData.exchange_cls,
        ord_check_no: this.resAPI.ord_check_no,
        insider_agree_cls: 1, //"//1:同意する、2:同意しない
        pin_no: this.confirmData.pin_no,
        account_typ_cd: this.confirmData.account_typ_cd,
        order_duration_cls: this.confirmData.order_duration_cls,
        buy_sell_cls: this.confirmData.buy_sell_cls,
        order_type: this.confirmData.order_type,
        stock_cd: this.confirmData.stock_cd,
        order_amt: this.confirmData.order_amt,
        otc_order_cls: this.confirmData.otc_order_cls,
        ord_price: this.confirmData.markup_ask
      };
      if (this.confirmData.buy_sell_cls == 3) {
        body["payment_cls"] = 1;
        if(this.confirmData.order_type != 4) {
          body["ord_price"] = this.confirmData.markup_ask ? this.confirmData.markup_ask : 0;
        }
      }
      if (this.confirmData.buy_sell_cls == 1) {
        body["withholding_cls"] = this.confirmData.withholding_cls;
        body["ord_nominal"] = this.confirmData.ord_nominal;
        if(this.confirmData.order_type != 4) {
          body["ord_price"] = this.confirmData.markup_bid;
        }
      }
      this.cAPIExecuteBuy(body).then(() => {
        if (this.dataExecuteBuy == "OK") {
          const dataEncrypt = commonJs.aesEncrypt(
            JSON.stringify(this.confirmData)
          );
          this.$router.push({
            name: "orderSuccess",
            query: {
              data: dataEncrypt,
            },
          });
        } else {
          // this.goBack();
        }
      });
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    handNumFloat(number, decimals) {
      return commonJs.handNumFloat(number, decimals);
    },
    handNumberFloat(number) {
      return commonJs.handNumberFloat(number, 8);
    },
  },
};
