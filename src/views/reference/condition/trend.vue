<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/reference/condition/"><strong>資産・照会</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/condition/"><strong>資産状況</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/trend">余力管理</a>
      </nav>
    </TopInfo>

    <section class="property">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link to="/reference/condition" class="button__square--selected"
            >資産状況</router-link
          >
          <router-link to="/reference/order/jp" class="button__square"
            >注文一覧</router-link
          >
          <router-link to="/reference/contract/jp" class="button__square"
            >約定一覧</router-link
          >
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減</router-link
          >
        </div>
        <h1 class="title">余力管理</h1>
        <div class="card container">
          <div class="tab_wrapper">
            <div class="property__trend">
              <h2>余力管理</h2>
              <p class="property__time">
                {{ common.handleDateMinute(resultTime) }}更新
              </p>
            </div>
            <div class="base_color_table property__table card">
              <div class="base_color_table__head four_columns">
                <p><strong>基準日</strong></p>
                <p><strong>預り金</strong></p>
                <p><strong>買付余力</strong></p>
                <p><strong>出金余力</strong></p>
              </div>
              <div
                class="base_color_table__value four_columns cell_large"
                v-for="(item, index) in dataSource && dataSource.slice(0, 6)"
                :key="index"
              >
                <p class="base_color_table__value-date">
                  {{ item.base_d }}
                </p>
                <p class="base_color_table__value-price">
                  {{ common.handNumberInt(item.cash_balance) || 0
                  }}<small>円</small>
                </p>
                <p class="base_color_table__value-price">
                  {{ common.handNumberInt(item.buy_available_capacity) || 0
                  }}<small>円</small>
                </p>
                <p
                  class="base_color_table__value-price click"
                  @click="details(item, index)"
                >
                  {{
                    common.handNumberInt(item.withdrawal_available_capacity) ||
                    0
                  }}<small>円</small>
                  <img
                    src="/assets/images/arrow.png"
                    alt=">"
                    style="transform: translateY(0); top: 65%"
                  />
                </p>
              </div>
            </div>
          </div>
          <router-link to="/reference/condition" class="button button__full button__white"
            >資産残高一覧へ</router-link
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import trend from "@/assets/js/page/reference/condition/trend";
export default trend;
</script>
<style scoped>
.base_color_table__value img {
  transform: rotateY(0) !important;
  top: 65% !important;
}
</style>
