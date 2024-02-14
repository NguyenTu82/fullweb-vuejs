import commonJs from "@/assets/js/common/common";

export default {
  props: ["showPopup", "dataPopup"],
  data() {
    return {};
  },
  methods: {
    closeHandle() {
      this.$emit("hidePopup");
      commonJs.enableScrollOnDocument();
    },
  },
};
