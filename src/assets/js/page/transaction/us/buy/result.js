import { mapGetters, mapMutations, mapActions } from "vuex";
import TopInfo from "@/components/common/TopInfo";

export default {
  title: "[買] 米国株式",
  name: "BuyResult",
  data() {
    return {
      principalBuy: {},
      brandInfo: {},
    };
  },
  components: {
    TopInfo,
  },
  computed: {
    ...mapGetters(["getOrderInput"]),
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    async pageInit() {
      const infoData = this.getOrderInput.DATA || {};
      this.principalBuy = infoData.PRINCIPAL_BUY || {};
      this.brandInfo = infoData.BRAND_INFO || {};
    },
  },
  created() {
    this.pageInit();
  },
  watch: {},
};
