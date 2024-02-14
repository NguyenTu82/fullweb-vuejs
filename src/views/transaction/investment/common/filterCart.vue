<template>
  <section class="modal">
    <div class="tab_wrapper modal_position">
      <div class="modal__content card">
        <h2>表示条件</h2>
        <div class="table">
          <div class="table__box">
            <div class="table__box-title table__box-title--width">
              <p>銘柄名</p>
            </div>
            <div class="table__box-value">
              <input
                type="text"
                placeholder="銘柄名"
                class="modal__input"
                maxlength="200"
                v-model="textSearch"
              />
            </div>
          </div>
        </div>
        <div class="modal__buttons">
          <button
            @click="$emit('handleSearch', 'BACK')"
            class="button button__white button__medium modal__close"
          >
            キャンセル
          </button>
          <button
            @click="$emit('handleSearch', 'SEARCH', textSearch)"
            class="button button__main button__medium"
          >
            変更する
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/transaction/investment/common/filterCartIt"></script>

<style lang=""></style>
