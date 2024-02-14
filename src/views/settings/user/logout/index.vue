<template>
  <section class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <p class="modal__text">ログアウトしてよろしいですか。</p>
        <div class="modal__buttons">
          <button
            @click="() => $emit('turnOffModal')"
            class="button button__white button__medium"
          >
            キャンセル
          </button>
          <button @click="logout" class="button button__main button__medium">
            ログアウト
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script src="@/assets/js/page/settings/user/logout/index"></script>
<style scoped></style>
