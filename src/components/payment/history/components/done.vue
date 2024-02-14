<template>
  <section class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>出金取消完了</h2>
        <p class="modal__text">
          出金取消を受け付けました。<br />
          入出金履歴画面で結果を確認してください。
        </p>
        <div class="modal__buttons">
          <button
            @click="backHistoryPayment"
            class="button button__main button__medium"
          >
            入出金履歴へ
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/components/payment/history/components/done.js"></script>

<style scoped></style>
