export default {
  name: "DialogComponent",
  props: {
    dialog: {
      title: null,
      message: null,
      button: {
        value: null,
        link: null,
        params: null,
      },
    },
  },
  data() {
    return {
      showDialog: true,
    };
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
    },
  },
};
