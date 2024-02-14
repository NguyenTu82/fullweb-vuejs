import { mapActions, mapGetters, mapMutations } from "vuex";
import constant from "@/const/common";
import commonJs from "@/assets/js/common/common";
import ScrollToTopBtn from "@/components/button/ScrollToTopBtn";
import TopInfo from "@/components/common/TopInfo";
import GirdButton from "@/components/common/navBar/navBarBrand";
import BrandCartJP from "@/components/common/carts/brandCartJP";
import AddFavoritesJp from "@/views/transaction/jp/brand/addJp";
import DeleteFavoritesJp from "@/views/transaction/jp/brand/deleteJp";

export default {
  name: "EditFavoriteStockJp",
  components: {
    ScrollToTopBtn,
    TopInfo,
    GirdButton,
    BrandCartJP,
    AddFavoritesJp,
    DeleteFavoritesJp,
  },
  data() {
    return {
      navSlock: constant.NAV_STOCK_JP,
    };
  },
  computed: {
    ...mapGetters("stockListJp", [
      "getBrandFavoritesJpList",
      "getTypeTransaction",
      "getStepEditFavoriteJp",
    ]),
  },
  methods: {
    ...mapActions("stockListJp", [
      "getStockListFavoriteJP",
      "getStockEditFavoriteJP",
      "getStockListBrandJP",
    ]),
    ...mapMutations("stockListJp", [
      "SET_STEP_EDIT_FAVORITE_JP",
      "SET_BRAND_FAVORITE_JP_LIST",
      "SET_BRAND_NOT_FAVORITE_JP",
    ]),
    handleRedirect(key) {
      this.SET_STEP_EDIT_FAVORITE_JP(key);
    },
    handleSubmit() {
      const newListLike = this.getBrandFavoritesJpList;
      this.getStockEditFavoriteJP({
        list_client_stock_info: newListLike,
      }).then(() => {
        this.SET_BRAND_FAVORITE_JP_LIST(newListLike);
        this.$router.push({
          path: "/transaction/jp/brand/favorite",
          name: "FavoriteJP",
          query: { typeTransaction: this.getTypeTransaction },
        });
      });
    },
    getReloadTime() {
      return commonJs.getReloadTime();
    },
    formatStockCd(number) {
      return commonJs.formatStockCd(number);
    },
  },
  watch: {
    getTypeTransaction() {
      commonJs.moveUp();
      this.$router.replace({
        query: { typeTransaction: this.getTypeTransaction },
      });
    },
  },
  created() {
    this.SET_STEP_EDIT_FAVORITE_JP(0);
    this.SET_BRAND_NOT_FAVORITE_JP([]);
    this.getStockListFavoriteJP({
      otc_consign_cls: this.getTypeTransaction,
    });
  },
  mounted() {
    this.$router.replace({
      query: { typeTransaction: this.getTypeTransaction },
    });
    commonJs.moveUp();
    window.addEventListener("beforeunload", () => {
      this.SET_GET_TEXT_SEARCH("");
    });
  },
};
