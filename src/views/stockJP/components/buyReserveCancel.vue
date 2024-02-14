<template>
  <main>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">[買] 国内株式</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <h2 class="detail__title--buy">
              {{ name_stock }}
            </h2>
          </div>
          <div class="result result--trade">
            <h2>注文取消</h2>
            <h2>予約注文を取消しました</h2>
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

<script src="@/assets/js/page/stockJP/components/buyReserveCancel.js"></script>
