export default {
  name: "Popup",
  methods: {
    closePopup() {
      this.$store.commit("showPopup", { isShow: false });
    },
  },
};
