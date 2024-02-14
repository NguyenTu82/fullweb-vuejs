import { mapGetters, mapMutations, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import BrandCart from "@/components/common/carts/brandCartUS";
import FilterCart from "@/views/transaction/us/components/filterCartUs";
import ModalConfirm from "@/views/transaction/us/components/modalConfirmUs";

export default {
  title: "お気に入り銘柄一覧編集・追加",
  name: "AddFavorite",
  props: ["listData"],
  data() {
    return {
      page: 1,
      isBottom: false,
      isLoadMore: true,
      selectedAddFavorite: [],
      isShowTextSelectAll: false,
      textSearchAdd: "",
      isTextError: false,
      timeByReloadApi: ''
    };
  },
  components: {
    BrandCart,
    FilterCart,
    ModalConfirm,
  },
  computed: {
    ...mapGetters("stocklistus", [
      "getListStockUs",
      "getStepEditFavorite",
      "getShowModel",
      "getKeywordAdd",
      "getListIdsLike",
      "getStockLikeUs",
      "getSelectedAddFavorite",
      "getIsConfirmFilter",
    ]),
  },
  methods: {
    ...mapMutations("stocklistus", [
      "SET_STEP_EDIT_FAVORITE",
      "SET_KEYWORDS_ADD",
      "SET_SELECTED_ADD_FAVORITE",
      "SET_LISTS_US",
      "SET_STOCK_LIKE_US",
      "SET_IDS_LIKE",
      "SET_IS_CONFIRM_FILTER",
      "SET_KEYWORDS_ADD",
    ]),
    ...mapActions("stocklistus", [
      "stockListUs",
      "stockLikeUs",
      "toggleModalFillter",
      "stockLikeEdit",
    ]),
    clearSelected() {
      return (this.selectedAddFavorite = []);
    },
    async handleRedirect(key, type = null) {
      if (type === "ADD") {
        const newListLike = [
          ...this.getStockLikeUs,
          ...this.getSelectedAddFavorite,
        ];
        if (newListLike.length <= 25) {
          this.SET_STOCK_LIKE_US(newListLike);
          this.SET_LISTS_US(
            this.getStockLikeUs.filter(
              (item) =>
                this.getSelectedAddFavorite.indexOf(item.BRAND_ID) !== -1
            )
          );
          this.SET_IDS_LIKE(this.getStockLikeUs);
          this.SET_SELECTED_ADD_FAVORITE([]);
          this.SET_STEP_EDIT_FAVORITE(key);
        } else {
          this.isTextError = true;
        }
      } else {
        const ids = this.getListIdsLike.join(",");
        await this.stockLikeEdit({
          ids: ids,
        });
        this.SET_SELECTED_ADD_FAVORITE([]);
        this.SET_STEP_EDIT_FAVORITE(key);
      }
    },
    resetFilter() {
      this.page = 1;
      this.SET_KEYWORDS_ADD("");
      this.textSearchAdd = "";
      this.isLoadMore = true;
      this.stockListUs({
        page: this.page,
        notExistsLikes: "1",
        type: false,
        typePage: "ADD",
      });
      this.$refs.FilterCart.handleReset();
    },
    handleSelect(item, type = 0) {
      const data = {
        BRAND_ID: item.BRAND.BRAND_ID,
        BRAND_TYPE: item.BRAND.BRAND_TYPE,
        MARKET_ID: item.BRAND.MARKET_ID,
        BRAND_CD: item.BRAND.BRAND_CD,
        BRAND_NM: item.BRAND.BRAND_NM,
        BRAND_NM_DISP: item.BRAND.BRAND_NM_DISP,
        MARKET_NM: item.BRAND.MARKET_NM,
        EX_DIVIDEND_YIELD: item.BRAND.EX_DIVIDEND_YIELD,
        PRICE: {
          BUY_PRICE: item.PRICE_DELAY.BUY_PRICE,
          SELL_PRICE: item.PRICE_DELAY.SELL_PRICE,
        },
      };
      let selected;
      if (type === 0) {
        if (
          this.getSelectedAddFavorite.find(
            (val) => val.BRAND_ID === item.BRAND.BRAND_ID
          )
        ) {
          selected = this.getSelectedAddFavorite.filter(
            (item) => item.BRAND_ID !== data.BRAND_ID
          );
        } else {
          selected = [...this.getSelectedAddFavorite, data];
        }
      } else {
        selected = [...this.getSelectedAddFavorite, data];
      }
      this.SET_SELECTED_ADD_FAVORITE(selected);
    },
    handleSelectOne(item) {
      this.handleSelect(item);
    },
    handleSelectAll() {
      this.SET_SELECTED_ADD_FAVORITE([]);
      if (this.isShowTextSelectAll === false) {
        this.getListStockUs.map((item) => {
          this.handleSelect(item, 1);
        });
      } else {
        this.SET_SELECTED_ADD_FAVORITE([]);
      }
    },
    isSelected(item) {
      return this.getSelectedAddFavorite.find(
        (val) => val.BRAND_ID === item.BRAND.BRAND_ID
      );
    },
    showButtonSelectAll() {
      this.isShowTextSelectAll =
        this.getSelectedAddFavorite.length !== 0 &&
        this.getSelectedAddFavorite.length >= this.getListStockUs.length
          ? true
          : false;
    },
    showTextSearch() {
      if (!this.getShowModel) {
        this.textSearchAdd =
          this.getIsConfirmFilter && this.getKeywordAdd
            ? this.getKeywordAdd
            : "";
      }
    },
    handleConfirm(data) {
      if (data === "BACK") {
        this.isTextError = false;
      }
    },
    setIsLoadMore() {
      this.page = 1;
      this.isLoadMore = true;
    },
    async handleSearch(name, data) {
      if (name === "SEARCH") {
        this.SET_IS_CONFIRM_FILTER(true);
        this.SET_SELECTED_ADD_FAVORITE([]);
        this.toggleModalFillter();
        this.setIsLoadMore();
        this.SET_KEYWORDS_ADD(data.textSearchAdd);
        this.stockListUs({
          page: 1,
          notExistsLikes: "1",
          type: false,
          typePage: "ADD",
        }).then((res) => {
          if (res.DATA.length < 30) this.isLoadMore = false;
          this.SET_LISTS_US(
            this.getListStockUs.filter((item) => {
              return !this.getStockLikeUs.some(
                (val) => val.BRAND_ID === item.BRAND.BRAND_ID
              );
            })
          );
        });
      } else {
        this.toggleModalFillter();
        this.SET_IS_CONFIRM_FILTER(false);
      }
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
            notExistsLikes: "1",
            type: true,
            typePage: "ADD",
          }).then((res) => {
            if (res.DATA.length < 30) this.isLoadMore = false;
            this.SET_LISTS_US(
              this.getListStockUs.filter((item) => {
                return !this.getStockLikeUs.some(
                  (val) => val.BRAND_ID === item.BRAND.BRAND_ID
                );
              })
            );
          });
      }
    },
    getListStockUs() {
      this.showButtonSelectAll();
      this.timeByReloadApi = this.getReloadTime()
    },
    getSelectedAddFavorite() {
      this.showButtonSelectAll();
      this.getSelectedAddFavorite.length === 0
        ? (this.selectedAddFavorite = [])
        : "";
    },
    getShowModel() {
      this.getShowModel && this.SET_IS_CONFIRM_FILTER(false);
    },
    getIsConfirmFilter() {
      this.getIsConfirmFilter && this.showTextSearch();
    },
  },
  created() {
    commonJs.moveUp();
    this.isLoadMore = true;
    this.textSearchAdd = "";
    this.SET_KEYWORDS_ADD("");
    this.stockListUs({
      page: this.page,
      notExistsLikes: "1",
      type: false,
      typePage: "ADD",
    }).then(() => {
      this.SET_LISTS_US(
        this.getListStockUs.filter((item) => {
          return !this.getStockLikeUs.some(
            (val) => val.BRAND_ID === item.BRAND.BRAND_ID
          );
        })
      );
    });
  },
  mounted() {
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
