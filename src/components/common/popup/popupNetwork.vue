<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <div class="modal__buttons">
          <img class="modal__image-cen" src="/assets/images/logo.png" />
        </div>
        <p class="modal__text">
          通信エラーが発生しました。<br />
          時間をおいて再度お試しください。
        </p>
        <div class="modal__buttons">
          <button
            @click="actionRetry"
            type="button"
            class="button button__main button__medium"
          >
            リトライ
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/components/common/popup/popupNetwork.js"></script>
