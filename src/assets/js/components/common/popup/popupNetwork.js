export default {
  props: {
    isShow: { type: Boolean, default: false },
  },
  methods: {
    actionRetry() {
      this.$emit("retry");
    },
  },
};
