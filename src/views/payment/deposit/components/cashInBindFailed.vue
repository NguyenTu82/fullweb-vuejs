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
      銀行口座振替サービス契約に失敗しました。
    </p>
    <a
      @click="goBind"
      class="button button--textsmall button__main button__full payment__button"
      >リアルタイム入金契約を行う</a
    >
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/cashInBindFailed"></script>

<style lang="less" scoped></style>
