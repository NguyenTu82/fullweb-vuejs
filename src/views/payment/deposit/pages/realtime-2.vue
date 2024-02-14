/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-09 *
@ID Function: E110-11 * @Description: リアルタイム入金 */

<template>
  <main>
    <TopInfoItem></TopInfoItem>
    <section class="payment">
      <div class="wrapper">
        <h1 class="title">ネット口座振替サービス</h1>
        <div class="container card">
          <div class="sp_wrapper">
            <h2 class="payment__title">リアルタイム入金</h2>
            <div class="payment__spacer"></div>
            <p class="payment__text payment__text--center">
              <strong>{{ BANK_NAME }}に口座をお持ちのお客さま</strong>
            </p>
            <div class="payment__two_row_button">
              <router-link
                :to="{ name: 'CashInContract3' }"
                class="button button--textsmall button__main button__full payment__button"
                >内容を確認し登録する</router-link
              >
              <a
                href="#"
                @click="goBack"
                class="button button--textsmall button__white button__full payment__button"
                >キャンセル</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/payment/deposit/pages/realtime-2"></script>

<style scoped></style>
