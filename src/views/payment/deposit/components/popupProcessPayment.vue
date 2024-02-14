/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-09 *
@ID Function: E110-16 * @Description: リアルタイム入金 */

<template>
  <section class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>入金処理中</h2>
        <div class="modal__dummy"></div>
        <div class="modal__buttons">
          <a
            href="/pages/payment/deposit/"
            class="button button__disabled button__medium"
          >
            OK
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/payment/deposit/components/popupProcessPayment.js"></script>

<style scoped></style>
