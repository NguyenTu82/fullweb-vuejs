export default {
  name: "Message",
  props: ["text"],
  data() {
    return {};
  },
  methods: {
    confirm() {
      this.$emit("determine");
    },
  },
};
