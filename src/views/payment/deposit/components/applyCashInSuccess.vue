<template>
  <div class="sp_wrapper">
    <div style="text-align: center; margin-bottom: 20px">
      <img src="/assets/images/japYen.svg" />
    </div>
    <h2 class="payment__title">リアルタイム入金</h2>
    <a
      href="https://www.cheer-sec.co.jp/other/app-help/E110.html"
      class="payment__title-sub"
      >サービス詳細はこちら</a
    >
    <p class="payment__text payment__text--center">
      ご入金指示を受付けました。
    </p>
    <a
      @click="$router.push({ name: 'WithdrawalHistory' })"
      class="button button--textsmall button__main button__full payment__button"
      >入出金履歴画面へ</a
    >
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/applyCashInSuccess.js"></script>

<style lang="less" scoped></style>
