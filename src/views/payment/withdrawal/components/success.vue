<template>
  <div class="result result--trade success">
    <h2 class="fs-medium">出金依頼を受け付けました。</h2>
    <!--              <div class="result__image">-->
    <!--                <div class="result__image-status">-->
    <!--                  <img src="/assets/images/check.png" alt="" />-->
    <!--                </div>-->
    <!--                <img src="/assets/images/phone.png" alt="" />-->
    <!--              </div>-->
    <button @click="withdrawalHistory" class="button button__main button__full">
      入出金履歴へ
    </button>
  </div>
</template>
<script src="@/assets/js/page/payment/withdrawal/components/success"></script>
<style scoped></style>
