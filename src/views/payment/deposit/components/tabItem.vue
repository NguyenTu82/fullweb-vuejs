<template>
  <div class="tabs tabs--pagetab">
    <a
      :class="`${classNavTabs} ${
        depositCurrentTab == 1 && classNavTabSelected
      }`"
      @click="navigate(1)"
      >リアルタイム入金</a
    >
    <a
      :class="`${classNavTabs} ${
        depositCurrentTab == 2 && classNavTabSelected
      }`"
      @click="navigate(2)"
      >振込入金</a
    >
    <!-- <a :class="`${classNavTabs}`" @click="navigate(3)">毎月定期入金</a> -->
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/tabItem"></script>

<style scoped></style>
