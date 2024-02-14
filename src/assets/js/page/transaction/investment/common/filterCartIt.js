export default {
  name: "FilterCart",
  props: ["handleSearch"],
  data() {
    return {
      textSearch: "",
    };
  },
  computed: {},
  methods: {
    handleReset() {
      if (this.textSearch) {
        this.textSearch = "";
        this.$emit("handleSearch", "SEARCH", "");
      }
    },
  },
};
