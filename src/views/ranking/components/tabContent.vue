<template>
  <div class="grid_buttons">
    <router-link :to="{ name: 'RankingJp' }" custom v-slot="{ navigate, href }">
      <a
        :href="href"
        :class="`${classNavTabs} ${classNavTabSelected}`"
        data-index="1"
        @click="navigate"
        >国内株式</a
      >
    </router-link>

    <router-link :to="{ name: 'RankingUs' }" custom v-slot="{ navigate, href }">
      <a
        :href="href"
        :class="`${classNavTabs} ${classNavTabSelected}`"
        data-index="2"
        @click="navigate"
        >米国株式</a
      >
    </router-link>
    <router-link
      :to="{ name: 'RankingInvestment' }"
      custom
      v-slot="{ navigate, href }"
    >
      <a
        v-show="showCheer"
        :href="href"
        :class="`${classNavTabs}`"
        data-index="3"
        @click="navigate"
        >投資信託</a
      >
    </router-link>
  </div>
</template>

<script src="@/assets/js/page/ranking/components/tabContent"></script>
