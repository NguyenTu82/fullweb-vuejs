export default {
  props: {
    isShow: { type: Boolean, default: false },
  },
  methods: {
    actionConfirm() {
      this.$emit("confirm", { name: "showModalExpInvest", value: false });
    },
  },
};
