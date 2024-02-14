/* * @Author: KhanhNV * @Date: 2022-07-01 * @Last Modified by: VuPV * @Last
Modified time: 2022-08-08 * @ID Screen: E110-8, 9 */

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
    <div v-if="!bindAgain">
      <p v-show="!errors" class="payment__text payment__text--center">
        ご利用の金融機関からスピーディにご入金
      </p>
      <p v-show="errors" class="payment__text payment__text--center">
        {{ errors }}
      </p>
      <p class="payment__text payment__text&#45;&#45;center">
        <strong>三菱UFJ銀行</strong>
      </p>
    </div>
    <div class="payment__text payment__text--center" v-else>
      銀行口座振替サービス契約をキャンセルしました。
    </div>
    <a
      @click="goBind"
      class="button button--textsmall button__main button__full payment__button"
      >リアルタイム入金契約を行う</a
    >
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/firstCashInBind"></script>

<style scoped></style>
