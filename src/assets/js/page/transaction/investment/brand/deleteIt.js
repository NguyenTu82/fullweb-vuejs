import { mapGetters, mapMutations, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import BrandCart from "@/components/common/carts/brandCartIT";
import ModalConfirm from "@/views/transaction/investment/common/modalConfirm";

export default {
  title: "お気に入り銘柄一覧編集・削除",
  name: "DeleteFavorite",
  data() {
    return {
      page: 1,
      listData: [],
      selectedDeleteFavorite: [],
      selectedBeforeConfirm: [],
      contentModal: "選択したお気に入り銘柄を削除します。",
      isShowTextSelectAll: false,
    };
  },
  components: {
    BrandCart,
    ModalConfirm,
  },
  computed: {
    ...mapGetters("stockListIt", ["getListStockLikeIt", "getShowModalConfirm"]),
  },
  methods: {
    ...mapActions("stockListIt", [
      "listStockFavoriteIt",
      "toggleModalConfirm",
      "updateFavoriteIt",
    ]),
    ...mapMutations("stockListIt", [
      "SET_STEP_FAVORITE_IT",
      "SET_LIST_STOCK_LIKE_IT",
      "SET_SELECTED_DELETE_FAVORITE",
    ]),
    clearSelected() {
      return (this.selectedDeleteFavorite = []);
    },
    handleConfirm(data) {
      if (data === "OK") {
        this.selectedDeleteFavorite = [
          ...this.selectedDeleteFavorite,
          ...this.selectedBeforeConfirm,
        ];
        this.selectedBeforeConfirm = [];
        this.SET_SELECTED_DELETE_FAVORITE(this.selectedDeleteFavorite);
        this.SET_LIST_STOCK_LIKE_IT(
          this.getListStockLikeIt.filter(
            (val) => !this.selectedDeleteFavorite.includes(val)
          )
        );
        this.SET_STEP_FAVORITE_IT(1);
      }
      this.toggleModalConfirm();
    },
    async handleRedirect(key, type = "") {
      if (type === "DELETE") {
        this.toggleModalConfirm();
        JSON.stringify(this.getListStockLikeIt).length ===
        JSON.stringify(this.selectedBeforeConfirm).length
          ? (this.contentModal = "すべてのお気に入り銘柄を削除します。")
          : (this.contentModal = "選択したお気に入り銘柄を削除します。");
      } else {
        if (this.selectedDeleteFavorite) {
          const favoriteSelect = this.getListStockLikeIt
            .map((val, i) => {
              return {
                inv_trust_assoc_cd: val.inv_trust_assoc_cd,
                show_order: ++i,
              };
            })
            .filter((anyValue) => typeof anyValue !== "undefined");
          await this.updateFavoriteIt({
            favorite_list: favoriteSelect,
          });
        }
        this.SET_STEP_FAVORITE_IT(key);
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
      this.show();
    },
    handleSelectAll() {
      if (this.isShowTextSelectAll === false) {
        this.selectedBeforeConfirm = this.getListStockLikeIt;
      } else {
        this.selectedBeforeConfirm = [];
      }
      this.show();
    },
    show() {
      this.isShowTextSelectAll =
        this.getListStockLikeIt.length === this.selectedBeforeConfirm.length &&
        this.getListStockLikeIt.length > 0;
    },
    isSelected(item) {
      return this.selectedBeforeConfirm.indexOf(item) !== -1;
    },
    getReloadTime() {
      return commonJs.getReloadTime();
    },
  },
  mounted() {
    commonJs.moveUp();
    this.listData = this.getListStockLikeIt;
  },
};
