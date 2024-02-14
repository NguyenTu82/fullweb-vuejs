/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-09 *
@ID Function: E110-14/E110-15 * @Description: リアルタイム入金 */

<template>
  <section class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>{{ title }}</h2>
        <p class="modal__text">{{ content }}</p>
        <div class="modal__buttons">
          <router-link
            :to="{ name: redirectTo }"
            class="button button__main button__medium"
          >
            OK
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/payment/deposit/components/popupPayment"></script>

<style scoped></style>
