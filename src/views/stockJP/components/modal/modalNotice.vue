<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>{{ title }}</h2>
        <p class="modal__text">{{ content }}</p>
        <div class="modal__buttons">
          <button
            @click="actionConfirm"
            type="button"
            class="button button__main button__medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/stockJP/components/modal/modalNotice.js"></script>
