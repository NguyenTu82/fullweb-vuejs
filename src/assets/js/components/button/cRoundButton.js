export default {
  props: ["buttonname", "disabled", "setStyle", "small"],
  methods: {
    clickbtn() {
      if (this.disabled) {
        return;
      }
      this.$emit("clickbtn");
    },
  },
};
