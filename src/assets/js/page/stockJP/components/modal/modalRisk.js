import router from "@/router";
import commonJs from "@/assets/js/common/common";
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    isShow: { type: Boolean, default: false },
    content: { type: String, default: "" },
    showLinkComplexProducts: { type: Boolean, default: false }, //「複雑な商品の仕組みについて」のリンク
  },
  methods: {
    ...mapActions(["getUserInfoApi"]),

    actionCancel() {
      this.$emit("cancel", { name: "showModalRisk", value: false });
      this.$router.go(-1);
    },
    actionConfirm() {
      this.$emit("cancel", { name: "showModalRisk", value: false });
      //go to screen F110-口座登録情報
      this.getUserInfoApi().then(() => {
        if (this.getUserInfo.STATUS === "OK" && !this.getUserInfo.ERROR) {
          commonJs.saveLocalData("userInfo", this.getUserInfo.DATA.USER);
          router.push({name:'account'})
        }
      });
    },
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  }
};
