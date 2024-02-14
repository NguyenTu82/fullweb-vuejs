export default {
  name: "Model",
  props: {
    show: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  methods: {
    clearMove(e) {
      e.stopPropagation();
    },
  },
};
