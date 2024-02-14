export default {
  title: "ユーザーのログアウト",
  name: "UserLogout",
  components: {},
  data() {
    return {};
  },
  methods: {
    logout() {
      // Logout
      this.$router.replace({ path: "/", query: { isLogout: "true" } });
      this.$store.commit("logout");
    },
  },
};
