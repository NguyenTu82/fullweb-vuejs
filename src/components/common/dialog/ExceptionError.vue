<template>
  <section v-if="$store.state.prompt.apiErrorMsgConfig.isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2 v-show="$store.state.prompt.apiErrorMsgConfig.title">
          {{ $store.state.prompt.apiErrorMsgConfig.title }}
        </h2>
        <div class="result__image--top" v-show="$store.state.prompt.apiErrorMsgConfig.showImg">
          <img
            v-bind:src="
              $store.state.prompt.apiErrorMsgConfig.imgSrc
                ? $store.state.prompt.apiErrorMsgConfig.imgSrc
                : '/assets/images/logo.svg'
            "
            alt="メインロゴ"
            v-if="$store.state.prompt.apiErrorMsgConfig.isShow && !isMobile()"
            @click="gotoLogin"
            aria-controls
          />
          <img
            v-bind:src="
              $store.state.prompt.apiErrorMsgConfig.imgSrc
                ? $store.state.prompt.apiErrorMsgConfig.imgSrc
                : '/assets/images/logo.svg'
            "
            alt="メインロゴ"
            v-if="$store.state.prompt.apiErrorMsgConfig.isShow && isMobile()"
            @click="gotoLogin"
          />
        </div>
        <br /><br />
        <p
          class="modal__text"
          v-html="$store.state.prompt.apiErrorMsgConfig.text"
        ></p>
        <div class="modal__buttons">
          <button
            v-if="$store.state.prompt.apiErrorMsgConfig.callBackRoute"
            class="button button__main button__medium"
            @click="callback"
          >
            {{ $store.state.prompt.apiErrorMsgConfig.btnName }}
          </button>
          <button
            v-else-if="$store.state.prompt.apiErrorMsgConfig.btnName"
            @click="okClick"
            class="button button__main button__medium"
          >
            {{ $store.state.prompt.apiErrorMsgConfig.btnName }}
          </button>
          <button
            v-if="$store.state.prompt.apiErrorMsgConfig.cancelBtn"
            class="button button__main button__medium"
            @click="cancel"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ExceptionError",
  data() {
    return {
      defaultConfig: {
        isShow: false, // 控制是否显示
        text: "", // 弹窗提示文字
        type: "prompt", // 弹窗类型  confirm(带取消按钮) prompt(只有ok按钮)
        btnName: null,
        callBackRoute: null,
        title: null,
        cancelBtn: null,
      },
    };
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
        this.$store.state.apiErrorMsgConfig.cancelBtn();
      }
      this.close();
    },
    okClick() {
      if (
        typeof this.$store.state.prompt.apiErrorMsgConfig.okBtn == "function"
      ) {
        this.$store.state.apiErrorMsgConfig.okBtn();
      }
      this.close();
    },
    callback() {
      if (
        this.$store.state.prompt.apiErrorMsgConfig.callBackRoute ==
        "ROUTE_RETRY"
      ) {
        location.reload();
      } else if (
        this.$store.state.prompt.apiErrorMsgConfig.callBackRoute.name == "Login"
      ) {
        this.$store.commit("logout");
        this.$router.push({ name: "Login" });
      } else {
        this.$router.replace(
          this.$store.state.prompt.apiErrorMsgConfig.callBackRoute
        );
      }
      this.okClick();
    },
    gotoLogin() {
      if (!this.isMobile) {
        this.$store.dispatch("LogOut");
      }
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
};
</script>
