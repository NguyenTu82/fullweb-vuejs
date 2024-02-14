<template>
  <section v-if="$store.getters.message.show" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2 v-show="$store.getters.message.title">
          {{ $store.getters.message.title }}
        </h2>
        <p class="modal__text" v-html="$store.getters.message.text"></p>
        <div class="modal__buttons">
          <button
            @click="closePopup()"
            class="button button__main button__medium"
          >
            {{ $store.getters.message.btnName }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/components/common/popup/Popup.js"></script>

<style scoped></style>
