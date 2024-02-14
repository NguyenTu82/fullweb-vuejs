import { mapActions, mapGetters, mapMutations } from "vuex";
import constant from "@/const/common";
import commonJs from "@/assets/js/common/common";
import ScrollToTopBtn from "@/components/button/ScrollToTopBtn";
import TopInfo from "@/components/common/TopInfo";
import BrandCart from "@/components/common/carts/brandCartUS";
import GirdButton from "@/components/common/navBar/navBarBrand";
import EditFavorites from "@/views/transaction/us/brand/editUs";
import AddFavorite from "@/views/transaction/us/brand/addUs";
import DeleteFavorite from "@/views/transaction/us/brand/deleteUs";

export default {
  title: "お気に入り銘柄一覧",
  name: "FavoriteUS",
  components: {
    ScrollToTopBtn,
    TopInfo,
    BrandCart,
    GirdButton,
    EditFavorites,
    AddFavorite,
    DeleteFavorite,
  },
  data() {
    return {
      page: 1,
      navStock: constant.NAV_STOCK_US,
    };
  },
  computed: {
    ...mapGetters("stocklistus", [
      "getShowModel",
      "getStockLikeUs",
      "getStepEditFavorite",
    ]),
  },
  methods: {
    ...mapActions("stocklistus", [
      "toggleModalFillter",
      "stockLikeUs",
      "reset",
    ]),
    ...mapMutations("stocklistus", [
      "SET_STEP_EDIT_FAVORITE",
      "SET_SELECTED_ADD_FAVORITE",
      "SET_SELECTED_DELETE_FAVORITE",
      // "SET_TEXT_SEARCH"
    ]),
    getReloadTime() {
      return commonJs.getReloadTime();
    },
  },
  watch: {
    $route() {
      this.SET_STEP_EDIT_FAVORITE(0);
    },
    getStepEditFavorite() {
      if (this.getStepEditFavorite === 0) {
        this.SET_SELECTED_ADD_FAVORITE([]);
        this.SET_SELECTED_DELETE_FAVORITE([]);
        this.stockLikeUs({
          page: 1,
        });
      }
    },
  },
  mounted() {
    commonJs.moveUp();
    this.SET_STEP_EDIT_FAVORITE(0);
    this.stockLikeUs({
      page: 1,
    });
    window.addEventListener("beforeunload", () => {
      this.reset();
    });
  },
};
