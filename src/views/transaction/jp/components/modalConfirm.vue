<template>
  <section class="modal">
    <div v-if="!message" class="tab_wrapper modal_position">
      <div class="modal__content card">
        <h2 v-show="title">表示条件</h2>
        <div class="table">
          <p v-show="content" class="table__text--center">{{ content }}</p>
        </div>
        <div class="modal__buttons">
          <button
            @click="$emit('handleConfirm', 'BACK')"
            class="button button__white button__medium modal__close"
          >
            戻る
          </button>
          <button
            @click="$emit('handleConfirm', 'OK')"
            class="button button__main button__medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
    <div v-else class="tab_wrapper modal_position">
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

<script src="@/assets/js/page/transaction/jp/components/modalConfirm"></script>

<style scoped></style>
