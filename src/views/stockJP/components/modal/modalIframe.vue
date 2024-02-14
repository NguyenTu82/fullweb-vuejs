<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <iframe :src="urlIframe" width="100%" height="100%"> </iframe>
        <div class="modal__buttons">
          <button
            @click="actionConfirm"
            type="button"
            class="button button__main button__medium"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/stockJP/components/modal/modalIframe.js"></script>
