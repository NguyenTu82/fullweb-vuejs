<template>
  <section v-show="open" class="modal investment-modal">
    <div class="tab_wrapper" :class="[stockHandleType]">
      <div class="modal__content card">
        <h2>分配金取扱コース</h2>
        <div class="modal__buttons">
          <button
            v-for="popupData in popupDatas"
            :key="popupData.id"
            @click="handleClick(popupData.dividend_cls)"
            class="modal__button"
            :class="
              stockHandleType == 'SELL'
                ? 'modal__button--primary'
                : 'modal__button--secondary'
            "
          >
            <img :src="popupData.image" alt="coin" />
            <div class="modal__button-text">
              <p>
                <strong>{{ popupData.title }}</strong>
              </p>
              <p>{{ popupData.description }}</p>
            </div>
          </button>
        </div>
        <div class="modal__buttons">
          <button
            @click="closeHandle()"
            class="button button__white button__medium"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/transaction/common/PopupPriceAmount.js"></script>
<style lang="less" scoped></style>
