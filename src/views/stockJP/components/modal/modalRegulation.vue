<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      
      <div class="modal__content card">
        <p class="modal__text-left">以下の取引規制が行われておりますのでご注意ください。OKを押下すると取引画面に遷移いたします。</p><br>
        <p v-html="content" class="modal__text-left"></p>
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

<script src="@/assets/js/page/stockJP/components/modal/modalRegulation.js"></script>
