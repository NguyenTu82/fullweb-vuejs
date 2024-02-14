export default {
  props: {
    isShow: { type: Boolean, default: false },
    content: { type: String, default: "" },
  },
  methods: {
    actionConfirm() {
      this.$emit("confirm", { name: "showModalRegulation", value: false });
    },
  },
};
