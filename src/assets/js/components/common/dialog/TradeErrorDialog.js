export default {
  name: "TradeErrorDialog",
  props: {
    message: String,
  },
  data() {
    return {
      showDialog: true,
    };
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
      this.$emit("get_dialog", this.showDialog);
    },
  },
};
