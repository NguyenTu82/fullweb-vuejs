<template>
  <TopInfo>
    <nav class="topinfo__breadcrumb">
      <div class="topinfo__breadcrumb-head"></div>
      <router-link :to="{ name: 'Home' }" v-slot="{ href, navigate }" custom>
        <a :href="href" @click="navigate"><strong>国内株式</strong></a>
      </router-link>
      <div class="topinfo__breadcrumb-img">
        <img src="/assets/images/arrow_gray.png" alt="矢印" />
      </div>
      <router-link
        :to="{ name: 'StockListJP' }"
        v-slot="{ href, navigate }"
        custom
      >
        <a :href="href" @click="navigate"><strong>銘柄一覧</strong></a>
      </router-link>
      <div class="topinfo__breadcrumb-img">
        <img src="/assets/images/arrow_gray.png" alt="矢印" />
      </div>
      <a>個別銘柄情報</a>
    </nav>
  </TopInfo>
</template>

<script src="@/assets/js/page/transaction/jp/brand/components/topInfoItem"></script>

<style scoped></style>
