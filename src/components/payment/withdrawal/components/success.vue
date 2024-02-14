<template>
  <div class="result result--trade">
    <h2>買注文を受け付けました</h2>
    <div class="result__image">
      <div class="result__image-status">
        <img src="/assets/images/check.png" alt="" />
      </div>
      <img src="/assets/images/phone.png" alt="" />
    </div>
    <button @click="withdrawalHistory" class="button button__main button__full">
      注文一覧へ
    </button>
  </div>
</template>

<script src="@/assets/js/components/payment/withdrawal/components/success.js"></script>

<style scoped></style>
