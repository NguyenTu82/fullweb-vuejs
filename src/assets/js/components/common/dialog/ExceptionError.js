export default {
  name: "myDialog",
  props: {
    dialogConfig: {
      type: Object,
      default() {
        return {
          isShow: false, // 控制是否显示
          text: "default message", // 弹窗提示文字
          type: "prompt", // 弹窗类型  confirm(带取消按钮) prompt(只有ok按钮)
          btnName: null,
          callBackUrl: null,
          title: null,
          cancelBtn: null,
        };
      },
    },
  },
  data() {
    return {
      defaultConfig: {
        isShow: false, // 控制是否显示
        text: "", // 弹窗提示文字
        type: "prompt", // 弹窗类型  confirm(带取消按钮) prompt(只有ok按钮)
        btnName: null,
        callBackUrl: null,
        title: null,
        cancelBtn: null,
      },
    };
  },
  computed: {
    dialogShow: {
      get() {
        return this.dialogConfig.isShow;
      },
      set(value) {
        this.dialogConfig.isShow = false;
        return value;
      },
    },
  },
  methods: {
    close() {
      this.$store.commit("editMsg", {
        ...this.defaultConfig,
      });
    },
    cancel() {
      if (
        typeof this.$store.state.prompt.apiErrorMsgConfig.cancelBtn ==
        "function"
      ) {
        this.$store.state.prompt.apiErrorMsgConfig.cancelBtn();
      }
      this.close();
      // this.$bus.$emit('dialogCancel')
    },
    okClick() {
      if (
        typeof this.$store.state.prompt.apiErrorMsgConfig.okBtn == "function"
      ) {
        this.$store.state.prompt.apiErrorMsgConfig.okBtn();
      }
      this.$store.commit("editMsg", {
        ...this.defaultConfig,
      });
      // this.close();
    },

    callback() {
      if (
        this.$store.state.prompt.apiErrorMsgConfig.callBackUrl == "login.vue"
      ) {
        this.$store.commit("logout");
      }
      this.$router.push({
        name: this.$store.state.prompt.apiErrorMsgConfig.callBackUrl,
      });
      this.okClick();
    },
  },
};
