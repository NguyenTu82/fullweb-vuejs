export default {
  props: {
    isShow: { type: Boolean, default: false },
  },
  computed: {
    urlIframe() {
      return "https://www.cheer-sec.co.jp/other/app-help/C410.html#caution";
    },
  },
  methods: {
    actionConfirm() {
      this.$emit("confirm", { name: "showModalWarning", value: false });
    },
  },
};
