import { mapActions, mapGetters, mapMutations } from "vuex";
import constant from "@/const/common";
import commonJs from "@/assets/js/common/common";
import ScrollToTopBtn from "@/components/button/ScrollToTopBtn";
import TopInfo from "@/components/common/TopInfo";
import BrandCart from "@/components/common/carts/brandCartUS";
import GirdButton from "@/components/common/navBar/navBarBrand";
import FilterCart from "@/views/transaction/us/components/filterCartUs";

export default {
  title: "取扱銘柄の一覧表示",
  name: "Favorites",
  components: {
    ScrollToTopBtn,
    TopInfo,
    FilterCart,
    BrandCart,
    GirdButton,
  },
  data() {
    return {
      isBottom: false,
      isLoadMore: true,
      preListStockUs: [],
      page: 1,
      navStock: constant.NAV_STOCK_US,
      valSearch: [constant.TYPE_STOCK_US, constant.LIST_MARKET_US],
      textSearch: "",
      etfFlag: "",
      marketType: "",
      timeByReloadApi: null
    };
  },
  computed: {
    ...mapGetters("stocklistus", [
      "getShowModel",
      "getListStockUs",
      "getKeyword",
      "getMarketType",
      "getEtfFlag",
      "getIsConfirmFilter",
      "getStockLikeUs",
    ]),
    getQueryTextSearch() {
      return this.$route.query.textSearch;
    },
  },
  methods: {
    ...mapActions("stocklistus", [
      "toggleModalFillter",
      "stockListUs",
      "reset",
    ]),
    ...mapMutations("stocklistus", [
      "SET_SHOW_MODAL",
      "SET_TEXT_SEARCH",
      "SET_IS_CONFIRM_FILTER",
      "SET_TEXT_SEARCH",
      "SET_SELECTED_ADD_FAVORITE",
      "SET_MARKET_TYPE",
      "SET_ETF_FLAG",
    ]),
    handeTextFilter(arr, key) {
      return arr.filter((item) => item.value == key)[0].label;
    },
    setIsLoadMore() {
      this.page = 1;
      this.isLoadMore = true;
    },
    resetFilter() {
      this.removeQuery();
      this.page = 1;
      this.reset();
      this.textSearch = "";
      this.etfFlag = "";
      this.marketType = "";
      this.isLoadMore = true;
      this.stockListUs({
        page: this.page,
      });
      this.timeByReloadApi = commonJs.getNow();
      this.$refs.FilterCart.handleReset();
    },
    showTextSearch() {
      if (!this.getShowModel) {
        this.textSearch =
          this.getIsConfirmFilter && this.getKeyword ? this.getKeyword : "";
      }
    },
    async handleSearch(name, data) {
      if (name === "SEARCH") {
        this.removeQuery();
        this.SET_IS_CONFIRM_FILTER(true);
        this.SET_SELECTED_ADD_FAVORITE([]);
        this.toggleModalFillter();
        this.setIsLoadMore();
        this.SET_TEXT_SEARCH(data.textSearch);
        this.SET_MARKET_TYPE(data.marketType);
        this.SET_ETF_FLAG(data.etfFlag);
        this.etfFlag = this.handeTextFilter(this.valSearch[0], this.getEtfFlag);
        this.marketType = this.handeTextFilter(
          this.valSearch[1],
          this.getMarketType
        );
        this.stockListUs({
          type: false,
          page: 1,
        }).then((res) => {
          this.timeByReloadApi = this.getReloadTime()
          if (res.DATA.length < 30) this.isLoadMore = false;
        });
      } else {
        this.toggleModalFillter();
        this.SET_IS_CONFIRM_FILTER(false);
      }
    },
    initPage() {
      if (this.getQueryTextSearch) {
        this.SET_MARKET_TYPE("");
        this.SET_ETF_FLAG("");
        this.SET_TEXT_SEARCH(this.getQueryTextSearch);
      }
      this.textSearch = this.getKeyword;
      this.etfFlag = this.handeTextFilter(this.valSearch[0], this.getEtfFlag);
      this.marketType = this.handeTextFilter(
        this.valSearch[1],
        this.getMarketType
      );
      this.isLoadMore = true;
      this.stockListUs({
        page: this.page,
      }).then((res) => {
        this.timeByReloadApi = this.getReloadTime()
        if (res.DATA.length < 30) this.isLoadMore = false;
      });
    },
    removeQuery() {
      this.$router.replace({
        path: "/transaction/us/brand",
      });
    },
    getReloadTime() {
      return commonJs.getReloadTime();
    },
  },
  watch: {
    isBottom() {
      if (this.isBottom && this.getListStockUs[0]) {
        this.page += 1;
        this.isLoadMore &&
          this.stockListUs({
            page: this.page,
            type: true,
          }).then((res) => {
            if (res.DATA.length < 30) this.isLoadMore = false;
          });
      }
    },
    getShowModel() {
      this.getShowModel && this.SET_IS_CONFIRM_FILTER(false);
    },
    getIsConfirmFilter() {
      this.getIsConfirmFilter && this.showTextSearch();
    },
    textSearch() {
      this.textSearch && this.SET_TEXT_SEARCH(this.textSearch);
    },
    $route(to) {
      to.fullPath.includes("/ranking/us") && this.SET_TEXT_SEARCH("");
    },
    stockListUs() {
      this.timeByReloadApi = this.getReloadTime()
    }
  },
  mounted() {
    this.SET_SHOW_MODAL(false);
    this.initPage();
    commonJs.moveUp();
    window.addEventListener("beforeunload", () => {
      this.reset();
    });
    window.addEventListener(
      "scroll",
      () => {
        this.isBottom = commonJs.scrollBottom();
      },
      {
        passive: true,
      }
    );
  },
};
