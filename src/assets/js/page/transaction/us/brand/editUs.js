import { mapGetters, mapMutations, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import BrandCart from "@/components/common/carts/brandCartUS";

export default {
  title: "お気に入り銘柄一覧編集・初期画面",
  name: "EditFavorite",
  data() {
    return {
      page: 1,
      isBottom: false,
    };
  },
  components: {
    BrandCart,
  },
  computed: {
    ...mapGetters("stocklistus", ["getStockLikeUs", "getListIdsLike"]),
  },
  methods: {
    ...mapActions("stocklistus", ["stockLikeEdit"]),
    ...mapMutations("stocklistus", [
      "SET_STEP_EDIT_FAVORITE",
      "SET_SELECTED_ADD_FAVORITE",
      "SET_IDS_LIKE",
    ]),
    handelAddFavorite(key) {
      this.SET_STEP_EDIT_FAVORITE(key);
    },
    async handleRedirect(key) {
      const ids = this.getListIdsLike.join(",");
      await this.stockLikeEdit({
        ids: ids,
      });
      this.SET_SELECTED_ADD_FAVORITE([]);
      this.SET_STEP_EDIT_FAVORITE(key);
    },
    getReloadTime() {
      return commonJs.getReloadTime();
    },
  },
  mounted() {
    commonJs.moveUp();
  },
};
