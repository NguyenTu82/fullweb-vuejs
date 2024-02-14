//防止重复点击指令
export default {
  install(Vue) {
    Vue.directive("preventClick", {
      inserted(el, binding) {
        el.addEventListener("click", () => {
          if (!el.disabled) {
            el.disabled = true;
            setTimeout(() => {
              el.disabled = false;
            }, binding.value || 3000);
          }
        });
      },
    });
  },
};
