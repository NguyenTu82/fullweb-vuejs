import { mapGetters, mapMutations, mapActions } from "vuex";
import TopInfo from "@/components/common/TopInfo";

export default {
  title: "[売] 米国株式",
  name: "SellResult",
  data() {
    return {
      principalSell: {},
      brandInfo: {},
    };
  },
  components: { TopInfo },
  computed: {
    ...mapGetters(["getOrderInput"]),
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    async pageInit() {
      const infoData = this.getOrderInput.DATA || {};
      this.principalSell = infoData.PRINCIPAL_SELL || {};
      this.brandInfo = infoData.BRAND_INFO || {};
    },
  },
  created() {
    this.pageInit();
  },
  watch: {},
};
