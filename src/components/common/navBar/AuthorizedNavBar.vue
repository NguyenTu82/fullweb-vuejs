<template>
  <div>
    <div class="header">
      <div class="header_inner">
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
        <div v-if="this.$store.getters.isAuthenticated">
          <h1 class="header_title" v-html="title"></h1>

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
            <span @click="route('BalanceInquiry')">ホーム</span>
            <span @click="route('withdrawal')">出金</span>
            <span id="logout" @click="showLogoutDialog">ログアウト</span>
          </div>
          <div class="menu_bg" :class="menuShow ? 'open' : ''"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/components/common/navBar/AuthorizedNavBar.js"></script>

<style scoped></style>
