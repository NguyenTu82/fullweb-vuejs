import { mapGetters, mapActions, mapMutations } from "vuex";
import commonJs from "@/assets/js/common/common";
import BrandCart from "@/components/common/carts/brandCartIT";

export default {
  title: "お気に入り銘柄一覧編集・初期画面",
  name: "EditFavoriteIT",
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
    ...mapGetters("stockListIt", ["getListStockLikeIt"]),
  },
  methods: {
    ...mapActions("stockListIt", ["updateFavoriteIt"]),
    ...mapMutations("stockListIt", ["SET_STEP_FAVORITE_IT"]),
    redirectTo(id = 0) {
      this.SET_STEP_FAVORITE_IT(id);
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
  },
  mounted() {
    commonJs.moveUp();
  },
};
