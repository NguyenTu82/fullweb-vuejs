export default {
  props: {
    isShow: { type: Boolean, default: false },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
  },

  methods: {
    actionConfirm() {
      this.$emit("confirm", { name: "showModalNotice", value: false });
    },
  },
};
