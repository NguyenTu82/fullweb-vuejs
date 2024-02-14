<template>
  <div class="header">
    <div class="header_inner">
      <template v-if="back_url === true">
        <a
          v-if="back_url && prev_url"
          @click="$router.push({ name: prev_url })"
          class="icon shevron_left icon_pos left"
        ></a>
        <a
          v-else-if="back_url"
          @click="$router.go(-1)"
          class="icon shevron_left icon_pos left"
        ></a>
        <div
          class="menu"
          :class="menuShow ? 'open' : ''"
          @click="menuShow = !menuShow"
        >
          <div class="menu_border"></div>
          <div class="menu_border"></div>
          <div class="menu_border"></div>
        </div>
        <div class="menu_content" :class="menuShow ? 'open' : ''">
          <span @click="nav('/')">ログイン</span>
        </div>
        <div class="menu_bg" :class="menuShow ? 'open' : ''"></div>
      </template>
      <h1 class="header_title">{{ title }}</h1>
    </div>
  </div>
</template>

<script src="@/assets/js/components/common/navBar/NavBar.js"></script>
