<template>
  <div class="grid_buttons">
    <router-link
      :to="{ name: components.MARKET_CONDITION }"
      custom
      v-slot="{ navigate, href }"
    >
      <a
        :href="href"
        :class="`${classNavTabs} ${classNavTabSelected}`"
        data-index="1"
        @click="navigate"
        >市況</a
      >
    </router-link>

    <router-link
      :to="{ name: components.MARKET_NEWS }"
      custom
      v-slot="{ navigate, href }"
    >
      <a
        :href="href"
        :class="`${classNavTabs}`"
        data-index="2"
        @click="navigate"
        >ニュース</a
      >
    </router-link>
  </div>
</template>

<script src="@/assets/js/page/marketNews/components/tabContent"></script>

<style scoped></style>
