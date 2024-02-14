import sellStockItaku from "@/views/stockJP/sell/sellStockItaku";
import sellStockTentou from "@/views/stockJP/sell/sellStockTentou";
import { mapGetters, mapActions } from "vuex";
import NavOrder from "@/components/common/navBar/NavOrder";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import modalExpInvest from "@/views/stockJP/components/modal/modalExpInvest";

export default {
  data() {
    return {
      titles: [
        { key: "1", value: "委託取引" },
        { key: "2", value: "店頭取引" },
      ],
      kind: this.$route.query.kind,
      otc_select_brand_cls: 0, //0:対象外 1:対象
      showModalExpInvest: false,
      resetData: false,
    };
  },
  components: {
    modalExpInvest,
    sellStockItaku,
    sellStockTentou,
    NavOrder,
    TopInfo,
  },

  created() {
    this.initPage();
    this.getDataLocalStorage();
  },
  computed: {
    ...mapGetters(["dataBrandInfo"]),
  },
  methods: {
    ...mapActions(["cAPIBrandInfo", "getUser"]),
    onHideModal(data) {
      this[data.name] = data.value;
    },
    getDataLocalStorage() {
      const datas = commonJs.getLocalData("dataConfirm");
      if (Object.entries(datas).length > 0) {
        this.kind = datas.kind;
      }
    },
    changeKind(val) {
      if (this.kind != val) {
        this.kind = val;
        this.resetData = !this.resetData;
      }
    },
    //7-10-13
    initPage() {
      this.cAPIBrandInfo({
        exchange_cls: this.$route.query.exchange_cls,
        stock_cd: this.$route.query.stock_cd,
      }).then(() => {
        if (this.dataBrandInfo) {
          this.getUser();
          const exInvType = this.$store.getters.getExInvType;
          const conformity_brand_level =
            this.dataBrandInfo.conformity_brand_level;
          this.otc_select_brand_cls = this.dataBrandInfo.otc_select_brand_cls;
          if (conformity_brand_level == 3 && exInvType != 1 && exInvType != 2) {
            this.showModalExpInvest = true;
          }
        }
      });
    },
  },
};
