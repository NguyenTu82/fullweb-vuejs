export default {
  props: {
    isShow: { type: Boolean, default: false },
  },
  methods: {
    actionConfirm() {
      this.$emit("confirm", { name: "showModalAfterTrading", value: false });
    },
  },
};
