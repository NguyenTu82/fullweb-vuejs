export default {
  name: "Header",
  props: {
    back_url: {
      default: true,
      type: Boolean,
    },
    prev_url: String,
    title: String,
  },
  data() {
    return {
      menuShow: false,
    };
  },
  methods: {
    nav(link) {
      this.$router.push({ path: link });
    },
  },
};
