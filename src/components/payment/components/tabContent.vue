<template>
  <div class="grid_buttons">
    <router-link :to="{ name: 'Deposit' }" custom v-slot="{ href }">
      <a
        :href="href"
        :class="`${classNavTabs} ${classNavTabSelected}`"
        data-index="1"
        >入金</a
      >
    </router-link>

    <router-link
      :to="{ name: 'PaymentWithdrawal' }"
      custom
      v-slot="{ href }"
    >
      <a
        :href="href"
        :class="`${classNavTabs} ${classNavTabSelected}`"
        data-index="2"
        >出金</a
      >
    </router-link>

    <router-link
      :to="{ name: 'WithdrawalHistory' }"
      custom
      v-slot="{ href }"
    >
      <a
        :href="href"
        :class="`${classNavTabs} ${classNavTabSelected}`"
        data-index="3"
        >入出金履歴</a
      >
    </router-link>
  </div>
</template>

<script src="@/assets/js/components/payment/components/tabContent.js"></script>

<style scoped></style>
