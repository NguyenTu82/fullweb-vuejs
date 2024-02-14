<template>
  <section class="modal" v-show="showPopup" v-if="dataPopup">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>
          {{
            dataPopup.RESULT == "success"
              ? "入金完了"
              : "入金できませんでした。"
          }}
        </h2>
        <p class="modal__text">
          {{ dataPopup.DESCRIPTION }}
        </p>
        <div class="modal__buttons">
          <button
            @click="closeHandle()"
            class="button button__white button__medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/transaction/common/PopupShowMessage.js"></script>

<style lang="less" scoped></style>
