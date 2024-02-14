<template>
  <TopInfo>
    <nav class="topinfo__breadcrumb">
      <div class="topinfo__breadcrumb-head"></div>
      <router-link to="/home/" v-slot="{ href, navigate }" custom>
        <a :href="href" @click="navigate"><strong>ホーム</strong></a>
      </router-link>
      <div class="topinfo__breadcrumb-img">
        <img src="/assets/images/arrow_gray.png" alt="矢印" />
      </div>
      <router-link to="/ranking/us/" v-slot="{ href, navigate }" custom>
        <a :href="href" @click="navigate">米国株式</a>
      </router-link>
    </nav>
  </TopInfo>
</template>

<script src="@/assets/js/page/ranking/components/topContentUs"></script>
