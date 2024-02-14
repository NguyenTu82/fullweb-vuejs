import buyStockItaku from "@/views/stockJP/buy/buyStockItaku";
import buyStockTentou from "@/views/stockJP/buy/buyStockTentou";
import modalRisk from "@/views/stockJP/components/modal/modalRisk";
import modalExpInvest from "@/views/stockJP/components/modal/modalExpInvest";
import { mapGetters, mapActions } from "vuex";
import NavOrder from "@/components/common/navBar/NavOrder";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  data() {
    return {
      titles: [
        { key: "1", value: "委託取引" },
        { key: "2", value: "店頭取引" },
      ],
      kind: this.$route.query.kind,
      otc_select_brand_cls: 0, //0:対象外 1:対象
      showModalRisk: false,
      showModalExpInvest: false,
      resetData: false,
      contentModalRisk: "",
      showLinkComplexProducts: false, //「複雑な商品の仕組みについて」のリンク
    };
  },
  components: {
    modalRisk,
    modalExpInvest,
    buyStockItaku,
    buyStockTentou,
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
    funcShowModalRisk(level) {
      if (level == 2) {
        this.contentModalRisk = constant.RISK_2;
      } else if (level == 3) {
        this.contentModalRisk = constant.RISK_3;
        this.showLinkComplexProducts = true;
      }
      this.showModalRisk = true;
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
          const purposeType = this.$store.getters.getPurposeType;
          const exInvType = this.$store.getters.getExInvType;
          const conformity_brand_level =
            this.dataBrandInfo.conformity_brand_level;
          this.otc_select_brand_cls = this.dataBrandInfo.otc_select_brand_cls;
          //C410-38
          if ( (conformity_brand_level == 3) &&   (! ( (exInvType.indexOf('1') != -1) || (exInvType.indexOf('2') != -1) ) ) )  {
            this.showModalExpInvest = true;
          }
          //C410-37
          if (purposeType < conformity_brand_level) {
            this.funcShowModalRisk(conformity_brand_level);
          }
        }
      });
    },
  },
};
