import listPage from "@/views/reference/order/components/listPage";
import commonConst from "@/const/common";
export default {
  name: "OnnoDetail",
  components:{
    listPage,
    // HDH00005_01-217 �����N���n�[�h�R�[�f�B���O�Ŏ�������h�~�@2022-10-05
    HELPD412: commonConst.HELPD412,
  },
  props: {
    infors: { type: Array, default: () => [] },
    info: { type: Object, default: () => {} },
    currentData: { type: Object, default: () => {} },
    orderStatusDisplay: { type: String, default: () => "" },
    infors2: { type: Array, default: () => [] },
    newCanCancel: { type: Boolean}
  },
  data() {
    return {
      canCancel: false,
    };
  },
  methods: {
    openPopup(){
      this.$emit('openPopup')
    },
    cancelOrder(){
      this.canCancel = false;
    },
    eraseOrder(){
      if (this.canCancel) {
        this.$emit('eraseOrder');
      } else {
        this.canCancel = true;
      }
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
