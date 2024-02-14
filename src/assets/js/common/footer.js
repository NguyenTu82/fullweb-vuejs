export default {
  props: {},
  methods: {
    footerLogo() {
      this.$router.push({
        name: "Home",
        query: {},
      });
    },
  },
};
