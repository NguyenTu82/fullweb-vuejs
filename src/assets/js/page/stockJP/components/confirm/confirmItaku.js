import Moment from "moment";
import { mapActions, mapGetters } from "vuex";
import commonJs from "@/assets/js/common/common";

Moment.locale("zh-cn");
export default {
  data() {
    return {
      confirmData: {},
      resAPI: {},
      exec_cond_cd: "",
      order_duration_cls: "",
      name_stock: "",
      isEditExecution: "",
      title: "",
      textBtn: "",
      isEditQuantity: false,
      isEditAmount: false,
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getDataConfirm();
    });
  },
  computed: {
    ...mapGetters(["dataExecuteBuy", "dataConfirmEditOrder"]),
  },
  methods: {
    ...mapActions(["cAPIExecuteBuy", "cAPIConfirmEditOrder"]),
    getDataConfirm() {
      this.confirmData = commonJs.aesDecrypt(this.$route.query.data);
      this.confirmData = JSON.parse(this.confirmData);
      this.resAPI = commonJs.aesDecrypt(this.$route.query.resAPI);
      this.resAPI = JSON.parse(this.resAPI);
      this.confirmData["kind"] = 1;
      this.name_stock = `${
        this.confirmData.stock_nm
      } (${this.confirmData.stock_cd.toString().slice(0, 4)})／${
        this.confirmData.exchange_cls_nm
      }`;
      this.isEditExecution = this.confirmData.isEditExecution;
      this.isEditQuantity = this.confirmData.isEditQuantity;
      this.isEditAmount = this.confirmData.isEditAmount;
      //0:指定なし 1:寄付 2:引け 3:不成
      switch (this.confirmData.exec_cond_cd) {
        case 2:
          this.exec_cond_cd = "引け";
          break;
        case 3:
          this.exec_cond_cd = "不成";
          break;
        default:
          this.exec_cond_cd = "なし";
      }
      if (this.isEditQuantity || this.isEditAmount || this.isEditExecution) {
        this.textBtn = "訂正する";
        switch (this.confirmData.order_duration_cls) {
          //1:本日中、2:今週中、3:期間指定
          case 2:
            this.order_duration_cls = `\ 今週中 (${this.confirmData.expire_d})`;
            break;
          case 3:
            this.order_duration_cls = `\ 期間指定 (${this.confirmData.expire_d})`;
            break;
          default:
            this.order_duration_cls = `\ 当日 (${this.confirmData.expire_d}) `;
        }
      } else {
        if (this.confirmData.buy_sell_cls == 3) {
          this.textBtn = "買う";
        } else {
          this.textBtn = "売る";
        }
        switch (this.confirmData.order_duration_cls) {
          //1:本日中、2:今週中、3:期間指定
          case 2:
            this.order_duration_cls = `\ 今週中 (${this.confirmData.weekend_business_d})`;
            break;
          case 3:
            this.order_duration_cls = `\ 期間指定 (${this.confirmData.specify_due_d})`;
            break;
          default:
            this.order_duration_cls = `\ 当日 (${Moment(
              new Date().getTime()
            ).format("YYYY/MM/DD")}) `;
        }
      }
    },
    goBack() {
      commonJs.saveLocalData("dataConfirm", this.confirmData);
      this.$router.go(-1);
    },
    //7-10-15
    actionExecute() {
      const body = {
        otc_consign_cls: this.confirmData.otc_consign_cls,
        exchange_cls: this.confirmData.exchange_cls,
        ord_check_no: this.resAPI.ord_check_no,
        withholding_cls: this.confirmData.withholding_cls,
        insider_agree_cls: 1, //"//1:同意する、2:同意しない
        pin_no: this.confirmData.pin_no,
        account_typ_cd: this.confirmData.account_typ_cd,
        order_duration_cls: this.confirmData.order_duration_cls,
        exec_cond_cd: this.confirmData.exec_cond_cd,
        specify_due_d: this.confirmData.specify_due_d,
        buy_sell_cls: this.confirmData.buy_sell_cls,
        price_cls: this.confirmData.price_cls,
        order_type: this.confirmData.order_type,
        stock_cd: this.confirmData.stock_cd,
        ord_price: this.confirmData.ord_price,
        ord_nominal: this.confirmData.ord_nominal,
        ord_no: this.confirmData.ord_no ? this.confirmData.ord_no : "",
      };
      if (this.confirmData.buy_sell_cls == 3) body["payment_cls"] = 1;
      if (this.confirmData.ord_no) {
        this.cAPIConfirmEditOrder(body).then(() => {
          if (this.dataConfirmEditOrder == "OK") {
            const dataEncrypt = commonJs.aesEncrypt(
              JSON.stringify(this.confirmData)
            );
            this.$router.push({
              name: "orderSuccess",
              query: { data: dataEncrypt },
            });
          }
        });
      } else {
        this.cAPIExecuteBuy(body).then(() => {
          if (this.dataExecuteBuy == "OK") {
            const dataEncrypt = commonJs.aesEncrypt(
              JSON.stringify(this.confirmData)
            );
            this.$router.push({
              name: "orderSuccess",
              query: { data: dataEncrypt },
            });
          }
        });
      }
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
  },
};
