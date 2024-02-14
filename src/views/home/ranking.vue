<template>
  <div class="dashboard__item card">
    <h2 class="dashboard__title">ランキングから探す<small>RANKING</small></h2>
    <div class="dashboard__ranking">
      <div class="tabs pointer">
        <a
          :class="`tabs__item${activeTab == 1 ? '--selected' : ''}`"
          @click="changeTab(1)"
        >
          国内株式<br />
          ランキング・銘柄
        </a>
        <a
          :class="`tabs__item${activeTab == 2 ? '--selected' : ''}`"
          @click="changeTab(2)"
        >
          米国株式<br />
          ランキング・銘柄
        </a>
        <a
          :class="`tabs__item${activeTab == 3 ? '--selected' : ''}`"
          @click="changeTab(3)"
        >
          投資信託<br />
          ランキング・銘柄
        </a>
      </div>
      <rankingItem :ranking="rankingJp" v-if="activeTab == 1" />
      <rankingItem :ranking="rankingUs" v-if="activeTab == 2" />
      <rankingItem :ranking="rankingFund" v-if="activeTab == 3" />
      <a :href="rankingUrl" class="button button__main button__full"
        >カテゴリー一覧</a
      >
    </div>
  </div>
</template>
<script src="@/assets/js/page/home/ranking"></script>
