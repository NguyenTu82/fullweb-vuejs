import { mapGetters, mapActions, mapMutations } from "vuex";
import constant from "@/const/common";
import commonJs from "@/assets/js/common/common";
import BrandCartJP from "@/components/common/carts/brandCartJP";
import FilterCart from "@/views/transaction/jp/components/filterCart";
import ModalConfirm from "@/views/transaction/jp/components/modalConfirm";

export default {
  name: "AddFavoritesJp",
  data() {
    return {
      listNotFavoriteJP: [],
      isBottom: false,
      page: 1,
      listSelectedJP: [],
      isShowFilter: false,
      textSearch: "",
      showTextNull: false,
      perPage: constant.DEFAULT_PER_PAGE,
      isShowTextSelectAll: false,
      isTextError: false,
      timeByReloadApi: null
    };
  },
  components: {
    BrandCartJP,
    FilterCart,
    ModalConfirm,
  },
  computed: {
    ...mapGetters("stockListJp", [
      "getBrandNotFavoritesJp",
      "getTypeTransaction",
      "getBrandFavoritesJpList",
    ]),
  },
  methods: {
    ...mapActions("stockListJp", [
      "getStockListBrandJP",
      "getStockEditFavoriteJP",
    ]),
    ...mapMutations("stockListJp", [
      "CHANGE_BRAND_JP_LIST",
      "SET_STEP_EDIT_FAVORITE_JP",
      "SET_BRAND_FAVORITE_JP_LIST",
      "SET_BRAND_NOT_FAVORITE_JP",
      "SET_TYPE_TRANSACTION",
    ]),
    handleSelectJP(item) {
      if (this.listSelectedJP.indexOf(item) === -1) {
        this.listSelectedJP = [...this.listSelectedJP, item];
      } else {
        this.listSelectedJP = this.listSelectedJP.filter((val) => val !== item);
      }
    },
    handleSelectAll() {
      if (this.isShowTextSelectAll === false) {
        this.listSelectedJP = this.getBrandNotFavoritesJp.map((item) => item);
      } else {
        this.listSelectedJP = [];
      }
      this.show();
    },
    async handleSearch(data, textSearch) {
      this.isShowFilter = false;
      if (data === "SEARCH") {
        this.page = -1;
        this.textSearch = textSearch;
        this.listSelectedJP = [];
        if (textSearch) {
          const res = await this.getStockListBrandJP({
            otc_consign_cls: this.getTypeTransaction,
            stock_nm: textSearch,
          });
          this.page = 1;
          const newListNotLike = res.filter(
            (brand) =>
              !this.getBrandFavoritesJpList.find(
                (item) => item.stock_cd === brand.stock_cd
              )
          );
          this.SET_BRAND_NOT_FAVORITE_JP(newListNotLike);
          this.listNotFavoriteJP = newListNotLike;
          this.showTextNull = !newListNotLike[0] ? true : false;
          this.listNotFavoriteJP = [
            ...commonJs.paginate(newListNotLike, this.perPage, this.page),
          ];
        } else {
          this.handleReset();
          this.textSearch = "";
        }
      }
    },
    isSelected(item) {
      return this.listSelectedJP.indexOf(item) !== -1;
    },
    handleRedirectTo(key, name) {
      if (name === "ADD") {
        const listFavorite = [
          ...this.getBrandFavoritesJpList,
          ...this.listSelectedJP,
        ];
        if (listFavorite.length <= 25) {
          this.SET_BRAND_FAVORITE_JP_LIST(listFavorite);
          this.SET_BRAND_NOT_FAVORITE_JP(
            this.getBrandNotFavoritesJp.filter(
              (brand) => this.listSelectedJP.indexOf(brand) === -1
            )
          );
          this.SET_STEP_EDIT_FAVORITE_JP(0);
        } else {
          this.isTextError = true;
        }
      }
    },
    showFilter() {
      this.isShowFilter = true;
    },
    async handleReset() {
      this.textSearch = "";
      this.showTextNull = false;
      this.CHANGE_BRAND_JP_LIST([]);
      this.SET_BRAND_NOT_FAVORITE_JP([]);
      this.listNotFavoriteJP = [];
      this.listSelectedJP = [];
      this.$refs.FilterCart.handleReset();
    },
    show() {
      this.isShowTextSelectAll =
        this.getBrandNotFavoritesJp.length > 0 &&
        this.getBrandNotFavoritesJp.length === this.listSelectedJP.length;
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
          query: {
            typeTransaction: this.getTypeTransaction,
          },
        });
      });
    },
    handleConfirm(data) {
      if (data === "BACK") {
        this.isTextError = false;
      }
    },
    getReloadTime() {
      return commonJs.getReloadTime();
    },
    formatStockCd(number) {
      return commonJs.formatStockCd(number);
    },
  },
  watch: {
    isBottom() {
      if (this.isBottom && this.page !== -1) {
        this.page += 1;
        if (
          commonJs.paginate(
            this.getBrandNotFavoritesJp,
            this.perPage,
            this.page + 1
          )
        ) {
          this.listNotFavoriteJP = [
            ...this.listNotFavoriteJP,
            ...commonJs.paginate(
              this.getBrandNotFavoritesJp,
              this.perPage,
              this.page
            ),
          ];
        }
      }
    },
    getTypeTransaction() {
      commonJs.moveUp();
    },
    listSelectedJP() {
      this.show();
      this.timeByReloadApi = this.getReloadTime()
    },
  },
  mounted() {
    this.$router.replace({
      query: {
        typeTransaction: this.getTypeTransaction,
      },
    });
    commonJs.moveUp();
    this.SET_TYPE_TRANSACTION(
      this.$route.query.typeTransaction || this.getTypeTransaction
    );
    this.CHANGE_BRAND_JP_LIST([]);
    this.SET_BRAND_NOT_FAVORITE_JP([]);
    this.page = 1;
    this.listNotFavoriteJP = commonJs.paginate(
      this.getBrandNotFavoritesJp,
      this.perPage,
      1
    );
    window.addEventListener("scroll", () => {
      this.isBottom = commonJs.scrollBottom();
    });
  },
  created() {
    this.timeByReloadApi = this.getReloadTime()
  },
};
