<template>
  <main>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">{{ title }}</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <h2
              :class="
                buy_sell_cls == 3 ? 'detail__title--buy' : 'detail__title--sell'
              "
            >
              {{ name_stock }}{{ exchangeClsNm ? `／${exchangeClsNm}` : '' }}
            </h2>
          </div>
          <div class="result result--trade">
            <h2 v-show="t_edit">注文訂正</h2>
            <h2>{{ content }}</h2>
            <button
              @click="goToListOrder"
              type="button"
              class="button button__main button__full"
            >
              注文一覧へ
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/stockJP/components/orderSuccess.js"></script>
