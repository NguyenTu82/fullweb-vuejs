import { mapActions, mapGetters, mapMutations } from "vuex";
import constant from "@/const/common";
import commonJs from "@/assets/js/common/common";
import FilterCart from "@/views/transaction/jp/components/filterCart";
import ScrollToTopBtn from "@/components/button/ScrollToTopBtn";
import TopInfo from "@/components/common/TopInfo";
import GirdButton from "@/components/common/navBar/navBarBrand";
import BrandCartJP from "@/components/common/carts/brandCartJP";

export default {
  title: "ホーム",
  name: "StockListJP",
  components: {
    ScrollToTopBtn,
    TopInfo,
    GirdButton,
    BrandCartJP,
    FilterCart,
  },
  data() {
    return {
      dataListBrandJP: [],
      navSlock: constant.NAV_STOCK_JP,
      isShowFilter: false,
      textSearch: "",
      isBottom: false,
      page: 1,
      perPage: constant.DEFAULT_PER_PAGE,
      timeByReloadApi: null
    };
  },
  computed: {
    ...mapGetters("stockListJp", [
      "getDataBrandJPList",
      "getTypeTransaction", // 2: 委託取引,  1:店頭取引
      "getTextSearch",
    ]),
    getQueryTypeTransaction() {
      return this.$route.query.typeTransaction;
    },
    getQueryTextSearch() {
      return this.$route.query.textSearch;
    },
  },
  methods: {
    ...mapActions("stockListJp", ["getStockListBrandJP"]),
    ...mapMutations("stockListJp", [
      "CHANGE_BRAND_JP_LIST",
      "SET_TYPE_TRANSACTION",
      "SET_GET_TEXT_SEARCH",
    ]),
    showFilter() {
      this.isShowFilter = true;
      this.$forceUpdate();
    },
    resetListBrand() {
      this.CHANGE_BRAND_JP_LIST([]);
      this.dataListBrandJP = [];
    },
    async handleSearch(data, textSearch) {
      this.isShowFilter = false;
      this.$router.replace({
        query: { typeTransaction: this.getTypeTransaction },
      });
      if (data === "SEARCH") {
        this.SET_GET_TEXT_SEARCH(textSearch);
        if (textSearch) {
          this.textSearch = textSearch;
          this.resetListBrand();
          this.page = 1;
          this.getStockListBrandJP({
            stock_nm: textSearch,
            otc_consign_cls: this.getTypeTransaction,
          }).then((res) => {
            this.timeByReloadApi = this.getReloadTime()
            this.dataListBrandJP = commonJs.paginate(res, this.perPage, 1);
          });
        } else {
          this.resetListBrand();
          this.textSearch = "";
        }
      }
    },
    handleReset() {
      this.$refs.FilterCart.handleReset();
      this.resetListBrand();
      this.SET_GET_TEXT_SEARCH("");
      this.textSearch = "";
      this.timeByReloadApi = commonJs.getNow();
      this.$router.replace({
        query: { typeTransaction: this.getTypeTransaction },
      });
    },
    async changeTab(tab, textSearch = "", isCallApi = true) {
      this.page = 1;
      if (tab != this.getTypeTransaction) {
        this.SET_GET_TEXT_SEARCH("");
        this.SET_TYPE_TRANSACTION(tab);
        this.resetListBrand();
        if (isCallApi) {
          this.getStockListBrandJP({
            stock_nm: textSearch,
            otc_consign_cls: this.getTypeTransaction,
          }).then((res) => {
            this.timeByReloadApi = this.getReloadTime()
            this.dataListBrandJP = commonJs.paginate(res, this.perPage, 1);
          });
        }
      }
    },
    getReloadTime() {
      return commonJs.getReloadTime();
    },
    formatStockCd(number) {
      return commonJs.formatStockCd(number);
    },
    async initPage() {
      this.resetListBrand();
      this.getQueryTypeTransaction &&
        this.SET_TYPE_TRANSACTION(this.getQueryTypeTransaction);
      if (this.getQueryTextSearch) {
        this.textSearch = this.getQueryTextSearch;
        this.getStockListBrandJP({
          stock_nm: this.textSearch,
          otc_consign_cls: this.getTypeTransaction,
        }).then((res) => {
          this.timeByReloadApi = this.getReloadTime()
          this.dataListBrandJP = commonJs.paginate(res, this.perPage, 1);
        });
      } else {
        this.$router.replace({
          query: { typeTransaction: this.getTypeTransaction },
        });
        if (this.getTextSearch) {
          this.textSearch = this.getTextSearch;
          this.getStockListBrandJP({
            stock_nm: this.getTextSearch,
            otc_consign_cls: this.getTypeTransaction,
          }).then((res) => {
            this.timeByReloadApi = this.getReloadTime()
            this.dataListBrandJP = commonJs.paginate(res, this.perPage, 1);
          });
        }
      }
    },
  },
  watch: {
    getStockListBrandJP(){
      this.timeByReloadApi = this.getReloadTime()
    },
    isBottom() {
      if (this.isBottom) {
        this.page += 1;
        if (this.getDataBrandJPList) {
          this.dataListBrandJP = [
            ...this.dataListBrandJP,
            ...commonJs.paginate(
              this.getDataBrandJPList,
              this.perPage,
              this.page
            ),
          ];
        }
      }
    },
    getTypeTransaction() {
      commonJs.moveUp();
      this.resetListBrand();
      this.$router.replace({
        query: { typeTransaction: this.getTypeTransaction },
      });
      !this.getQueryTextSearch && (this.textSearch = "");
      this.$refs.FilterCart && this.$refs.FilterCart.handleReset();
    },
    $route(to) {
      if (
        to.fullPath.includes("consignment_transactions") ||
        to.fullPath.includes("over_counter_transactions")
      ) {
        this.SET_GET_TEXT_SEARCH("");
      }
      to.fullPath.includes("/ranking/jp") && this.SET_GET_TEXT_SEARCH("");
    },
  },
  created() {
    this.initPage();
    this.timeByReloadApi = this.getReloadTime()
    window.addEventListener("scroll", () => {
      this.isBottom = commonJs.scrollBottom();
    });
  },
  mounted() {
    commonJs.moveUp();
    window.addEventListener("beforeunload", () => {
      this.SET_GET_TEXT_SEARCH("");
    });
  },
};
