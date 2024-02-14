<template>
  <div class="table">
    <div v-for="(item, index) in listInCard" :key="index" class="table__box">
      <div class="table__box-title">
        <p>{{ item["title"] }}</p>
      </div>
      <div class="table__box-value table__box-value--result">
        <p>{{ item["value"] }}</p>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/listInCard"></script>

<style scoped></style>
