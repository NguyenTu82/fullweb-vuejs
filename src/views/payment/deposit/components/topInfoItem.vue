<template>
  <TopInfo>
    <nav class="topinfo__breadcrumb">
      <div class="topinfo__breadcrumb-head"></div>
      <router-link :to="{ name: '' }" v-slot="{ href, navigate }" custom>
        <a :href="href" @click="navigate"><strong>入出金</strong></a>
      </router-link>
      <div class="topinfo__breadcrumb-img">
        <img src="/assets/images/arrow_gray.png" alt="矢印" />
      </div>
      <router-link :to="{ name: 'Deposit' }" v-slot="{ href, navigate }" custom>
        <a :href="href" @click="navigate">入金</a>
      </router-link>
      <div class="topinfo__breadcrumb-img">
        <img src="/assets/images/arrow_gray.png" alt="矢印" />
      </div>
      <!-- <router-link :to="{ name: 'Deposit' }" v-slot="{href, navigate}" custom>
        <a :href="href" @click="navigate">{{breadName}}</a>
      </router-link> -->
      <a>{{ breadName }}</a>
    </nav>
  </TopInfo>
</template>

<script src="@/assets/js/page/payment/deposit/components/topInfoItem"></script>

<style scoped></style>
