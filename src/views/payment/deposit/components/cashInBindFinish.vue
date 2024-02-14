/* * @Author: KhanhNV * @Date: 2022-07-01 * @Last Modified by: VuPV * @Last
Modified time: 2022-08-08 * @ID Screen: E110-4 */

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
      銀行口座振替サービスの契約手続きが完了しました。
    </p>
    <a
      @click="goCashIn"
      class="button button--textsmall button__main button__full payment__button"
      >入金する</a
    >
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/cashInBindFinish"></script>

<style lang="less" scoped></style>
