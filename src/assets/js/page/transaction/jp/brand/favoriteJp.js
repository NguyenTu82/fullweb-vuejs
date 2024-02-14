import { mapActions, mapGetters, mapMutations } from "vuex";
import constant from "@/const/common";
import commonJs from "@/assets/js/common/common";
import ScrollToTopBtn from "@/components/button/ScrollToTopBtn";
import TopInfo from "@/components/common/TopInfo";
import GirdButton from "@/components/common/navBar/navBarBrand";
import BrandCartJP from "@/components/common/carts/brandCartJP";

export default {
  name: "StockFavoriteJp",
  components: {
    ScrollToTopBtn,
    TopInfo,
    GirdButton,
    BrandCartJP,
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
    ]),
  },
  methods: {
    ...mapActions("stockListJp", ["getStockListFavoriteJP"]),
    ...mapMutations("stockListJp", [
      "SET_TYPE_TRANSACTION",
      "SET_GET_TEXT_SEARCH",
    ]),
    changeTab(key) {
      if (key != this.getTypeTransaction) {
        this.SET_GET_TEXT_SEARCH("");
        this.SET_TYPE_TRANSACTION(key);
        this.getStockListFavoriteJP({
          otc_consign_cls: key,
        });
      }
    },
    showTextNull() {
      let flg = true;
      if (this.getBrandFavoritesJpList[0]) {
        if (this.getTypeTransaction == 2) {
          flg = false;
        } else {
          this.getBrandFavoritesJpList.filter((brand) => {
            if (brand.otc_select_brand_cls == "1") {
              flg = false;
            }
          });
        }
      }
      return flg;
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
    this.getStockListFavoriteJP({
      otc_consign_cls: this.typeTransaction,
    });
  },
  mounted() {
    this.$router.replace({
      query: { typeTransaction: this.getTypeTransaction },
    });
    this.$route.query.typeTransaction &&
      this.SET_TYPE_TRANSACTION(this.$route.query.typeTransaction);
    commonJs.moveUp();
    window.addEventListener("beforeunload", () => {
      this.SET_GET_TEXT_SEARCH("");
    });
  },
};
