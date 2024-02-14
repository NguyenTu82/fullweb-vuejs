import { mapGetters, mapMutations, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import BrandCart from "@/components/common/carts/brandCartIT";
import FilterCart from "@/views/transaction/investment/common/filterCart";
import ModalConfirm from "@/views/transaction/investment/common/modalConfirm";

export default {
  title: "お気に入り銘柄一覧編集・削除",
  name: "AddFavoriteIt",
  data() {
    return {
      page: 1,
      listData: [],
      selectedBeforeConfirm: [],
      selectedAddFavorite: [],
      contentModal: "選択したお気に入り銘柄を削除します。",
      isShowFilter: false,
      textSearch: "",
      perPage: 30,
      isBottom: false,
      isShowTextSelectAll: false,
      isTextError: false,
      timeByReloadApi: null
    };
  },
  components: {
    BrandCart,
    FilterCart,
    ModalConfirm
  },
  computed: {
    ...mapGetters("stockListIt", [
      "getListStockLikeIt",
      "getListStockIt",
      "getListStockNotFavorite",
    ]),
  },

  created() {
    this.timeByReloadApi = this.getReloadTime()
  },
  methods: {
    ...mapActions("stockListIt", [
      "listStockFavoriteIt",
      "getBrandsData",
      "updateFavoriteIt",
    ]),
    ...mapMutations("stockListIt", [
      "SET_SELECTED_ADD_FAVORITE",
      "SET_LIST_STOCK_LIKE_IT",
      "SET_LIST_STOCK_NOT_FAVORITE",
      "SET_STEP_FAVORITE_IT",
    ]),
    clearSelected() {
      return (this.selectedDeleteFavorite = []);
    },
    handleAddToFavorite() {
      const MAX_STOCK_SELECTED = 25;
      if (this.selectedBeforeConfirm.length != 0){
        this.selectedAddFavorite = [
          ...this.selectedBeforeConfirm,
        ];
      }else{
        this.selectedAddFavorite = [
          ...this.selectedAddFavorite,
          ...this.selectedBeforeConfirm,
        ];
      }
      if (this.selectedAddFavorite.length > MAX_STOCK_SELECTED || this.getListStockLikeIt.length + this.selectedAddFavorite.length > MAX_STOCK_SELECTED) {
        this.isTextError = true;
      } else {
        this.selectedBeforeConfirm = [];
        this.SET_LIST_STOCK_NOT_FAVORITE(
            this.getListStockNotFavorite.filter(
                (item) =>
                    !this.selectedAddFavorite.find((val) => {
                      return val.inv_trust_assoc_cd === item.inv_trust_assoc_cd;
                    })
            )
        );
        this.SET_SELECTED_ADD_FAVORITE(this.selectedAddFavorite);
        this.SET_LIST_STOCK_LIKE_IT([
          ...this.getListStockLikeIt,
          ...this.selectedAddFavorite,
        ]);
        this.SET_STEP_FAVORITE_IT(1);
      }
    },
    handleSelect(item) {
      if (this.selectedBeforeConfirm.indexOf(item) === -1) {
        this.selectedBeforeConfirm = [...this.selectedBeforeConfirm, item];
      } else {
        this.selectedBeforeConfirm = this.selectedBeforeConfirm.filter(
          (val) => val !== item
        );
      }
    },
    handleSelectAll() {
      if (this.isShowTextSelectAll === false) {
        this.selectedBeforeConfirm = this.getListStockNotFavorite;
      } else {
        this.selectedBeforeConfirm = [];
      }
    },
    show() {
      this.isShowTextSelectAll =
        this.getListStockNotFavorite.length > 0 &&
        this.getListStockNotFavorite.length ===
          this.selectedBeforeConfirm.length;
    },
    async handleSearch(type, textSearch) {
      if (type === "SEARCH") {
        this.textSearch = textSearch;
        this.selectedBeforeConfirm = [];
        await this.getBrandsData({
          keyword: textSearch,
          devidend_cls: "",
          fund_type: "",
        });
        this.SET_LIST_STOCK_NOT_FAVORITE(
          this.getListStockIt.filter((item) =>
            this.getListStockNotFavorite.includes(item)
          )
        );
      }
      this.isShowFilter = false;
    },
    toggleFilter() {
      this.isShowFilter = !this.isShowFilter;
    },
    isSelected(item) {
      return this.selectedBeforeConfirm.indexOf(item) !== -1;
    },
    handleReset() {
      this.textSearch = "";
      this.$refs.FilterCart.handleReset();
      this.isShowFilter = false;
    },
    handleSubmit() {
      const favoriteSelect = this.getListStockLikeIt
        .map((val, i) => {
          return {
            inv_trust_assoc_cd: val.inv_trust_assoc_cd,
            show_order: ++i,
          };
        })
        .filter((anyValue) => typeof anyValue !== "undefined");
      this.updateFavoriteIt({
        favorite_list: favoriteSelect,
      });
      this.SET_STEP_FAVORITE_IT(0);
    },
    getReloadTime() {
      return commonJs.getReloadTime();
    },
    handleConfirm(data) {
      if (data === "BACK") {
        this.isTextError = false;
      }
    },
  },
  watch: {
    isBottom() {
      this.page = this.page + 1;
      this.listData = [
        ...this.listData,
        ...commonJs.paginate(
          this.getListStockNotFavorite,
          this.perPage,
          this.page
        ),
      ];
    },
    getListStockNotFavorite() {
      this.page = 1;
      this.listData = commonJs.paginate(
        this.getListStockNotFavorite,
        this.perPage,
        this.page
      );
    },
    selectedBeforeConfirm() {
      this.show();
      this.timeByReloadApi = this.getReloadTime()
    },
  },
  mounted() {
    commonJs.moveUp();
    this.getBrandsData({
      keyword: "",
      devidend_cls: "",
      fund_type: "",
    });
    window.addEventListener("scroll", () => {
      this.isBottom = commonJs.scrollBottom();
    });
  },
};
