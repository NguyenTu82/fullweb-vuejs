import BrandCart from "@/components/common/carts/brandCartUS";
import ModalConfirm from "@/views/transaction/us/components/modalConfirmUs";
import { mapGetters, mapMutations, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";

export default {
  title: "お気に入り銘柄一覧編集・削除",
  name: "DeleteFavorite",
  props: ["listData"],
  data() {
    return {
      page: 1,
      selectedDeleteFavorite: [],
      contentModal: "選択したお気に入り銘柄を削除します。",
      isShowTextSelectAll: false,
    };
  },
  components: {
    BrandCart,
    ModalConfirm,
  },
  computed: {
    ...mapGetters("stocklistus", [
      "getStockLikeUs",
      "getListIdsLike",
      "getShowModalConfirm",
      "getListStockUs",
    ]),
  },
  methods: {
    ...mapMutations("stocklistus", [
      "SET_STEP_EDIT_FAVORITE",
      "SET_IDS_LIKE",
      "SET_STOCK_LIKE_US",
      "SET_LISTS_US",
    ]),
    ...mapActions("stocklistus", [
      "stockLikeUs",
      "stockLikeEdit",
      "toggleModalConfirm",
    ]),
    clearSelected() {
      return (this.selectedDeleteFavorite = []);
    },
    handleConfirm(data) {
      if (data === "OK") {
        this.SET_STOCK_LIKE_US(
          this.getStockLikeUs.filter(
            (item) => this.selectedDeleteFavorite.indexOf(item.BRAND_ID) === -1
          )
        );
        this.SET_LISTS_US([
          ...this.getListStockUs,
          ...this.getStockLikeUs.filter(
            (item) => this.selectedDeleteFavorite.indexOf(item.BRAND_ID) !== -1
          ),
        ]);
        this.SET_IDS_LIKE(this.getStockLikeUs);
        this.clearSelected();
        this.SET_STEP_EDIT_FAVORITE(1);
      }
      this.toggleModalConfirm();
    },
    handleRedirect(key, type = null) {
      if (type === "DELETE") {
        this.toggleModalConfirm();
        JSON.stringify(this.getListIdsLike).length ===
        JSON.stringify(this.selectedDeleteFavorite).length
          ? (this.contentModal = "すべてのお気に入り銘柄を削除します。")
          : (this.contentModal = "選択したお気に入り銘柄を削除します。");
      } else {
        const ids = this.getListIdsLike.join(",");
        this.stockLikeEdit({
          ids: ids,
        });
        this.clearSelected();
        this.SET_STEP_EDIT_FAVORITE(0);
      }
    },
    handleSelect(id) {
      this.selectedDeleteFavorite.indexOf(id) === -1
        ? (this.selectedDeleteFavorite = [...this.selectedDeleteFavorite, id])
        : (this.selectedDeleteFavorite = this.selectedDeleteFavorite.filter(
            (item) => item !== id
          ));
    },
    handleSelectAll() {
      this.show();
      if (this.isShowTextSelectAll === false) {
        this.selectedDeleteFavorite = this.getStockLikeUs.map(
          (item) => item.BRAND_ID
        );
      } else {
        this.selectedDeleteFavorite = [];
      }
    },
    isSelected(id) {
      return this.selectedDeleteFavorite.indexOf(id) !== -1;
    },
    show() {
      this.isShowTextSelectAll =
        this.selectedDeleteFavorite.length != 0 &&
        this.selectedDeleteFavorite.length >= this.getStockLikeUs.length
          ? true
          : false;
    },
    getReloadTime() {
      return commonJs.getReloadTime();
    },
  },
  watch: {
    selectedDeleteFavorite() {
      this.show();
    },
  },
  mounted() {
    commonJs.moveUp();
  },
};
