export default {
  name: "Header",
  components: {},
  props: {
    back_url: {
      default: true,
      type: Boolean,
    },
    prev_url: String,
    displayHeaderMenu: {
      default: true,
      type: Boolean,
    },
    title: String,
  },
  data() {
    return {
      menuShow: false,
    };
  },
  methods: {
    route(link) {
      this.menuShow = false;
      let current_path = this.$router.currentRoute.name;
      if (link === current_path) {
        this.$router.go({ path: this.$router.currentRoute.name, force: true });
      } else {
        this.$router.push({ name: link });
      }
    },

    showLogoutDialog() {
      this.$store.commit("editMsg", {
        isShow: true,
        title: "確認",
        text: "ログアウトします。よろしいですか？",
        type: "confirm",
        btnName: "ログアウト",
        cancelBtn: "キャンセル",
        callBackRoute: { name: "Login" },
      });
    },
  },
};
