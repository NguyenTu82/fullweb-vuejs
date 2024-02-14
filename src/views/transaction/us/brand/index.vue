<template>
  <main>
    <ScrollToTopBtn />
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>米国株式</strong></a>
          <div class="topinfo__breadcrumb-img">
            <img src="/assets/images/arrow_gray.png" alt="矢印" />
          </div>
          <a href="/transaction/us/brand">取扱銘柄一覧</a>
        </router-link>
      </nav>
    </TopInfo>
    <FilterCart
      v-show="getShowModel"
      :valSearch="valSearch"
      v-on:handleSearch="handleSearch"
      ref="FilterCart"
    />
    <section class="brand">
      <div class="wrapper">
        <GirdButton :value="navStock" />
        <h1 class="title">取扱銘柄一覧</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top searchbar__top--between">
                <div class="searchbar__top">
                  <img
                    @click="toggleModalFillter"
                    src="/assets/images/search.png"
                    alt="虫眼鏡"
                  />
                  <p @click="toggleModalFillter">表示条件</p>
                  <button
                    @click="toggleModalFillter"
                    class="button button__main searchbar__top-button"
                  >
                    条件変更
                  </button>
                  <button
                    @click="resetFilter()"
                    class="button button__white searchbar__top-button--reset"
                  >
                    リセット
                  </button>
                </div>
                <div class="searchbar__top-caution">
                  <a href="https://www.cheer-sec.co.jp/other/app-help/A210.html"
                    >ご注意事項 <img src="/assets/images/question.png" alt="?"
                  /></a>
                  <p>{{ timeByReloadApi }}現在</p>
                </div>
              </div>
              <div class="searchbar__bottom">
                <div class="searchbar__bottom-flex">
                  <button
                    @click="toggleModalFillter"
                    class="searchbar__bottom-button"
                  >
                    <p class="searchbar__bottom-requirement">
                      銘柄名・ティッカー
                    </p>
                    <p
                      class="searchbar__bottom-value favorite__bottom-textSearch"
                    >
                      {{ textSearch || "すべて" }}
                    </p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button
                    @click="toggleModalFillter"
                    class="searchbar__bottom-button"
                  >
                    <p class="searchbar__bottom-requirement">株式種類</p>
                    <p class="searchbar__bottom-value">
                      {{ etfFlag || "すべて" }}
                    </p>
                  </button>
                  <button
                    @click="toggleModalFillter"
                    class="searchbar__bottom-button"
                  >
                    <p class="searchbar__bottom-requirement">上場市場</p>
                    <p class="searchbar__bottom-value">
                      {{ marketType || "すべて" }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div class="grid_list">
              <BrandCart
                v-for="(item, index) in getListStockUs"
                :key="index"
                :brandName="item.BRAND.BRAND_NM_DISP"
                :brandCd="[item.BRAND.BRAND_CD, item.BRAND.MARKET_CD]"
                :buyPrice="item.PRICE_DELAY.BUY_PRICE"
                :sellPrice="item.PRICE_DELAY.SELL_PRICE"
                :percent="item.BRAND.EX_DIVIDEND_YIELD"
                :id="item.BRAND.BRAND_ID"
              />
            </div>
            <div v-if="!getListStockUs[0]" class="gird_list_null">
              <span v-if="getKeyword || getMarketType || getEtfFlag"
                >該当する銘柄はありません。</span
              >
              <span>条件を変えて検索してください。</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/us/brand/index"></script>

<style scoped></style>
