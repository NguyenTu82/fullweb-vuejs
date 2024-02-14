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
        <a href="/reference/deposit">預り金増減</a>
      </nav>
    </TopInfo>

    <section class="modal" v-show="modal">
      <div class="tab_wrapper">
        <div class="modal__content card">
          <h2>表示条件</h2>
          <div class="table">
            <div class="table__box">
              <div class="table__box-title">
                <p>期間</p>
              </div>
              <div class="table__box-value">
                <select
                  class="selectbox selectbox__gray"
                  name="transaction"
                  v-model="params.TERM"
                >
                  <option
                    v-for="item in filterTime"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>商品</p>
              </div>
              <div class="table__box-value">
                <select
                  class="selectbox selectbox__gray"
                  name="transaction"
                  v-model="params.PRODUCT_CLS"
                >
                  <option
                    v-for="item in filterGoods"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>増減</p>
              </div>
              <div class="table__box-value">
                <select
                  class="selectbox selectbox__gray"
                  name="condition"
                  v-model="params.SUMMARY_TYPE"
                >
                  <option
                    v-for="item in filterMoney"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal__buttons">
            <button
              class="button button__white button__medium modal__close"
              @click="cancel"
            >
              キャンセル
            </button>
            <button
              class="button button__main button__medium"
              @click="confirmChange"
            >
              変更する
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="reference_order">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link to="/reference/condition" class="button__square"
            >資産状況</router-link
          >
          <router-link to="/reference/order/jp" class="button__square"
            >注文一覧</router-link
          >
          <router-link to="/reference/contract/jp" class="button__square"
            >約定一覧</router-link
          >
          <router-link to="/reference/deposit" class="button__square--selected"
            >預り金増減</router-link
          >
        </div>
        <h1 class="title">預り金増減</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top">
                <img src="/assets/images/search.png" alt="虫眼鏡" />
                <p>表示条件</p>
                <button
                  class="button button__main searchbar__top-button"
                  @click="conditionsChange"
                >
                  条件変更
                </button>
              </div>
              <div class="searchbar__bottom">
                <div class="searchbar__bottom-flex">
                  <button class="searchbar__bottom-button">
                    <p class="searchbar__bottom-requirement">期間</p>
                    <p class="searchbar__bottom-value">{{ timeText.name }}</p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button class="searchbar__bottom-button">
                    <p class="searchbar__bottom-requirement">商品</p>
                    <p class="searchbar__bottom-value">
                      {{ goodsText.name }}
                    </p>
                  </button>
                  <button class="searchbar__bottom-button">
                    <p class="searchbar__bottom-requirement">増減</p>
                    <p class="searchbar__bottom-value">
                      {{ moneyText.name }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div class="reference_order__spacer">
              <div class="base_color_table property__table card">
                <div class="base_color_table__head four_columns">
                  <p><strong>受渡日</strong></p>
                  <p><strong>商品</strong></p>
                  <p><strong>区分</strong></p>
                  <p>
                    <strong>銘柄名<br />金額（円）</strong>
                  </p>
                </div>

                <div
                  class="item base_color_table__value four_columns cell_large"
                  v-for="(item, index) in dataSource"
                  :key="index"
                >
                  <p>{{ common.handleDateNoYear(item.SETTLE_D) }}</p>
                  <p>{{ getGoodsType(item.PRODUCT_CLS) }}</p>
                  <p>{{ formatSummaryType(item) }}</p>
                  <div class="last_item">
                    <div class="brand_text">
                      {{ item.BRAND_NM || "-" }}
                    </div>
                    <div
                      class="comparison_text"
                      :class="{
                        low: item.AMOUNT < 0,
                        high: item.AMOUNT > 0,
                      }"
                    >
                      <span v-if="item.AMOUNT > 0">+</span
                      >{{ common.handNumberInt(item.AMOUNT) }}<small>円</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import deposit from "@/assets/js/page/reference/deposit";
export default deposit;
</script>
