import { mapActions, mapGetters, mapMutations } from "vuex";
import constant from "@/const/common";
import commonJs from "@/assets/js/common/common";
import ScrollToTopBtn from "@/components/button/ScrollToTopBtn";
import TopInfo from "@/components/common/TopInfo";
import GirdButton from "@/components/common/navBar/navBarBrand";
import BrandCart from "@/components/common/carts/brandCartIT";
import EditIt from "@/views/transaction/investment/brand/editIt";
import AddIt from "@/views/transaction/investment/brand/addIt";
import DeleteIt from "@/views/transaction/investment/brand/deleteIt";

export default {
  title: "お気に入り銘柄一覧",
  name: "FavoriteIT",
  components: {
    ScrollToTopBtn,
    TopInfo,
    GirdButton,
    BrandCart,
    EditIt,
    AddIt,
    DeleteIt,
  },
  data() {
    return {
      navStock: constant.NAV_STOCK_IT,
    };
  },
  computed: {
    ...mapGetters("stockListIt", [
      "getListStockLikeIt",
      "getStepEditFavoriteIt",
    ]),
  },
  methods: {
    ...mapActions("stockListIt", ["listStockFavoriteIt"]),
    ...mapMutations("stockListIt", ["SET_STEP_FAVORITE_IT"]),
    getReloadTime() {
      return commonJs.getReloadTime();
    },
  },
  watch: {
    $route() {
      this.SET_STEP_FAVORITE_IT(0);
    },
  },
  created() {
    this.listStockFavoriteIt({
      favorite_cls: "1",
    });
  },
  mounted() {
    commonJs.moveUp();
  },
  beforeUnmount() {
    this.SET_STEP_FAVORITE_IT(0);
  },
};
