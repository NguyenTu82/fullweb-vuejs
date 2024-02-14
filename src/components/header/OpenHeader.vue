<template>
  <header class="header nosub">
    <div class="wrapper">
      <div class="header__container">
        <div class="header__container-flexstart">
          <picture class="header__logo">
            <img src="/assets/images/logo.svg" alt="サイトロゴ" />
          </picture>
          <div class="header__open">
            <p>口座開設</p>
            <img src="/assets/images/user.png" alt="人のアイコン" />
          </div>
        </div>
        <div
          v-if="isPreserve"
          class="header__nav-item header__nav-item--nohidden"
        >
          保存して閉じる
          <img src="/assets/images/cancel_b.png" alt="✖︎" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "OpenHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState("common", ["isPreserve"]),
  },
};
</script>
