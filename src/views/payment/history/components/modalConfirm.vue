<template>
  <section class="modal">
    <div class="tab_wrapper modal_position">
      <div class="modal__content card">
        <p class="modal__text">{{ message }}</p>
        <div class="modal__buttons">
          <button
            @click="$emit('handleConfirm', 'BACK')"
            class="button button__main button__medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script src="@/assets/js/page/payment/history/components/modalConfirm"></script>
<style scoped></style>
