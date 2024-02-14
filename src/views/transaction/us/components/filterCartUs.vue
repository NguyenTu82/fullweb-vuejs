<template>
  <section class="modal">
    <div class="tab_wrapper modal_position">
      <div class="modal__content card">
        <h2>表示条件</h2>
        <div class="table">
          <div class="table__box">
            <div
              :class="[
                'table__box-title table__box-title--width',
                type === 1 ? 'w-50' : '',
              ]"
            >
              <p>銘柄名・ティッカー</p>
            </div>
            <div class="table__box-value">
              <input
                v-if="type !== 1"
                type="text"
                :placeholder="type !== 1 ? '銘柄名・ティッカー' : ''"
                class="modal__input"
                maxlength="200"
                v-model="textSearch"
              />
              <input
                v-else
                type="text"
                :placeholder="type !== 1 ? 'マイクロソフト' : ''"
                class="modal__input"
                maxlength="200"
                v-model="textSearchAdd"
              />
            </div>
          </div>
          <div v-show="valSearch[0]" class="table__box">
            <div class="table__box-title table__box-title--width">
              <p>株式種類</p>
            </div>
            <div class="table__box-value">
              <select
                class="selectbox selectbox__gray"
                name="transaction"
                id=""
                v-model="etfFlag"
              >
                <option
                  v-for="item in valSearch[0]"
                  :key="item.key"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
          </div>
          <div v-show="valSearch[1]" class="table__box">
            <div class="table__box-title table__box-title--width">
              <p>上場市場</p>
            </div>
            <div class="table__box-value">
              <select
                class="selectbox selectbox__gray"
                name="condition"
                id=""
                v-model="typeStock"
              >
                <option
                  v-for="item in valSearch[1]"
                  :key="item.key"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
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
            @click="
              $emit('handleSearch', 'SEARCH', {
                textSearch: this.textSearch,
                textSearchAdd: this.textSearchAdd,
                marketType: this.typeStock,
                etfFlag: this.etfFlag,
              })
            "
            class="button button__main button__medium"
          >
            変更する
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/transaction/us/brand/components/filterCartUs"></script>

<style scoped></style>
