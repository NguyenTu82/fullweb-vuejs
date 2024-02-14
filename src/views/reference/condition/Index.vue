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
        <h1 class="title">資産状況</h1>
        <div class="property__list card">
          <div class="tab_wrapper">
            <div class="property__item property__item--grid">
              <div class="chart card">
                <div class="chart__head">
                  <p>{{ showTime() }}現在</p>
                  <img
                    src="/assets/images/reload.png"
                    alt="リロード"
                    @click="getData"
                  />
                </div>
                <div class="chart__spie" id="chartPie" ref="chartPie"></div>
                <div class="chart__buttons">
                  <router-link
                    to="/reference/trend"
                    class="button button__main button__small"
                    >余力管理</router-link
                  >
                </div>
              </div>
              <div class="property__list">
                <div v-for="(item, index) in currentData.ASSETS" :key="index">
                  <router-link
                    :to="
                      item.ASSET_NAME == '国内株式'
                        ? '/reference/condition/jp'
                        : item.ASSET_NAME == '米国株式'
                        ? '/reference/condition/us'
                        : '/reference/condition/invest'
                    "
                    :class="[
                      'property__list-item',
                      item.ASSET_NAME == '国内株式'
                        ? 'property__list-item--secondary'
                        : item.ASSET_NAME == '米国株式'
                        ? 'property__list-item--primary'
                        : '',
                      'card',
                    ]"
                  >
                    <p>
                      <span>{{ item.ASSET_NAME }}</span>
                    </p>
                    <div class="property__list-item-price">
                      <p class="comparison_text">
                        {{
                          item.EVALUATION_AMOUNT
                            ? commonJs.handNumberInt(item.EVALUATION_AMOUNT)
                            : "-"
                        }}<small>円</small>
                      </p>
                      <template v-if="item.ASSET_NAME !== '投資信託'">
                        <p
                          class="comparison_text"
                          :class="{
                            high: parseFloat(item.PROFIT_AMOUNT) > 0,
                            black: parseFloat(item.PROFIT_AMOUNT) == 0,
                            low: parseFloat(item.PROFIT_AMOUNT) < 0,
                          }"
                        >
                          <!-- <span v-if="parseFloat(item.PROFIT_AMOUNT > 0)">+</span> -->
                          {{parseFloat(item.PROFIT_AMOUNT > 0) ? "+" : ""}}{{
                            item.PROFIT_AMOUNT || item.PROFIT_AMOUNT == 0
                              ? commonJs.handNumberInt(item.PROFIT_AMOUNT)
                              : ""
                          }}<small>円</small>
                        </p>
                      </template>
                      <p v-else class="black">-</p>
                      <img src="/assets/images/arrow.png" />
                    </div>
                  </router-link>
                </div>

                <div
                  class="property__list-item property__list-item--smoke card"
                >
                  <p><span>預り金</span></p>
                  <div class="property__list-item-price">
                    <p class="comparison_text">
                      {{
                        currentData.DEPOSIT_AMOUNT
                          ? commonJs.handNumberInt(currentData.DEPOSIT_AMOUNT)
                          : "-"
                      }}
                      <small>円</small>
                    </p>
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
import condition from "@/assets/js/page/reference/condition/index";
export default condition;
</script>
