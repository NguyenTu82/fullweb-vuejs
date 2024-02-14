<template>
  <section class="modal">
    <div class="tab_wrapper modal_position">
      <div class="modal__content card">
        <h2>表示条件</h2>
        <div class="table">
          <div class="table__box">
            <div class="table__box-title">
              <p>銘柄名</p>
            </div>
            <div class="table__box-value">
              <input
                type="text"
                maxlength="60"
                placeholder="銘柄名"
                class="modal__input"
                v-model="keyword"
              />
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>分配金受取方法</p>
            </div>
            <div class="table__box-value">
              <select
                class="selectbox selectbox__gray"
                name="transaction"
                id=""
                v-model="devidend_cls"
              >
                <option value="">すべて</option>
                <option value="1">受取型</option>
                <option value="2">再投資型</option>
              </select>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>ファンドタイプ</p>
            </div>
            <div class="table__box-value">
              <select
                class="selectbox selectbox__gray"
                name="condition"
                id=""
                v-model="fund_type"
              >
                <option
                  v-for="selct in sortSelect"
                  :key="selct['fund_type_cls']"
                  :value="selct['fund_type_cls']"
                >
                  {{ selct["fund_type_nm"] }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal__buttons">
          <button
            class="button button__white button__medium modal__close"
            @click="() => $emit('hiddenModal')"
          >
            キャンセル
          </button>
          <button
            class="button button__main button__medium"
            @click="getBrandListSearch"
          >
            変更する
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script src="@/assets/js/page/transaction/investment/common/modal"></script>
<style scoped></style>
