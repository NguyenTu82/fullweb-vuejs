import { mapGetters, mapActions, mapMutations } from "vuex";
import commonJs from "@/assets/js/common/common";
import BrandCartJP from "@/components/common/carts/brandCartJP";
import ModalConfirm from "@/views/transaction/jp/components/modalConfirm";

export default {
  name: "DeleteFavoriteJp",
  data() {
    return {
      listSelectedJP: [],
      isShowModalConfirm: false,
      contentModal: "選択したお気に入り銘柄を削除します。",
      isShowTextSelectAll: false,
    };
  },
  components: {
    BrandCartJP,
    ModalConfirm,
  },
  computed: {
    ...mapGetters("stockListJp", [
      "getBrandFavoritesJpList",
      "getTypeTransaction",
      "getBrandNotFavoritesJp",
    ]),
  },
  methods: {
    ...mapActions("stockListJp", ["getStockEditFavoriteJP"]),
    ...mapMutations("stockListJp", [
      "SET_BRAND_FAVORITE_JP_LIST",
      "SET_STEP_EDIT_FAVORITE_JP",
      "SET_BRAND_NOT_FAVORITE_JP",
    ]),
    handleSelectJP(item) {
      if (this.listSelectedJP.indexOf(item) === -1) {
        this.listSelectedJP = [...this.listSelectedJP, item];
      } else {
        this.listSelectedJP = this.listSelectedJP.filter((val) => val !== item);
      }
    },
    handleSelectAll() {
      this.show();
      if (this.isShowTextSelectAll === false) {
        this.listSelectedJP = this.getBrandFavoritesJpList.map((item) => item);
      } else {
        this.listSelectedJP = [];
      }
    },
    isSelected(item) {
      return this.listSelectedJP.includes(item);
    },
    handlePopupConfirm() {
      this.isShowModalConfirm = true;
      JSON.stringify(this.listSelectedJP).length ===
      JSON.stringify(this.getBrandFavoritesJpList).length
        ? (this.contentModal = "すべてのお気に入り銘柄を削除します。")
        : (this.contentModal = "選択したお気に入り銘柄を削除します。");
    },
    handleConfirm(data) {
      if (data === "OK") {
        this.SET_BRAND_FAVORITE_JP_LIST(
          this.getBrandFavoritesJpList.filter(
            (brand) => !this.listSelectedJP.includes(brand)
          )
        );
        this.SET_BRAND_NOT_FAVORITE_JP([
          ...this.getBrandNotFavoritesJp,
          ...this.listSelectedJP,
        ]);
        this.SET_STEP_EDIT_FAVORITE_JP(0);
      }
      this.isShowModalConfirm = false;
    },
    show() {
      this.isShowTextSelectAll =
        this.getBrandFavoritesJpList.length === this.listSelectedJP.length &&
        this.getBrandFavoritesJpList.length > 0;
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
    listSelectedJP() {
      this.show();
    },
  },
  mounted() {
    this.$router.replace({
      query: { typeTransaction: this.getTypeTransaction },
    });
    commonJs.moveUp();
  },
};
