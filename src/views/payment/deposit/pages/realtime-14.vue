<template>
  <div>
    <div class="title result__text--center">契約完了</div>
      <section class="modal">
        <div class="tab_wrapper">
          <div class="modal__content card">
            <p v-if="noticeType === '1'" class="modal__text">銀行口座振替サービスの契約手続きが完了しました。</p>
            <p v-else-if="noticeType === '2'" class="modal__text">銀行口座振替サービス契約をキャンセルしました。</p>
            <p v-else class="modal__text">銀行口座振替サービス契約に失敗しました。</p>
            <div class="modal__buttons">
              <button
                @click="closeWindow"
                class="button button__main button__medium"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>



<script src="@/assets/js/page/payment/deposit/pages/realtime-14"></script>

<style lang="scss" scoped>
</style>