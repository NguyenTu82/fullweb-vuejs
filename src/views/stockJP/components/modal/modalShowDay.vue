<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>期間指定</h2>
        <p class="modal__text">ご注文の有効期限をご指定ください。</p>
        <div class="modal__term">
          <div>
            <select
              v-model="selectedDay"
              @change="onChange"
              class="selectbox selectbox__gray"
            >
              <option v-for="value in dataArr" :key="value.id">
                {{ value.business_day }}
              </option>
            </select>
          </div>
        </div>
        <div class="modal__buttons">
          <button
            @click="cancelSelect"
            type="button"
            class="button button__white button__medium modal__close"
          >
            キャンセル
          </button>
          <button
            @click="onSelectDay"
            type="button"
            class="button button__main button__medium"
          >
            設定
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/stockJP/components/modal/modalShowDay.js"></script>
