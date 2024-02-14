<template>
  <main>
    <ScrollToTopBtn />
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>国内株式</strong></a>
          <div class="topinfo__breadcrumb-img">
            <img src="/assets/images/arrow_gray.png" alt="矢印" />
          </div>
          <a href="/transaction/jp/brand">銘柄一覧</a>
        </router-link>
      </nav>
    </TopInfo>
    <FilterCart
      v-on:handleSearch="handleSearch"
      v-show="isShowFilter"
      :valSearch="textSearch"
      ref="FilterCart"
    />
    <section class="brand">
      <div class="wrapper">
        <GirdButton :value="navSlock" />
        <h1 class="title">取扱銘柄一覧</h1>
        <div class="container card">
          <div class="tabs two_columns--small brand__tab">
            <a
              @click="changeTab(2, '', false)"
              :class="[
                getTypeTransaction == 2 ? 'tabs__item--selected' : 'tabs__item',
              ]"
            >
              委託取引
            </a>
            <a
              @click="changeTab(1, '', false)"
              :class="[
                getTypeTransaction == 1 ? 'tabs__item--selected' : 'tabs__item',
              ]"
            >
              店頭取引
            </a>
          </div>
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top searchbar__top--between">
                <div class="searchbar__top">
                  <img
                    @click="showFilter()"
                    src="/assets/images/search.png"
                    alt="虫眼鏡"
                  />
                  <p @click="showFilter()">表示条件</p>
                  <button
                    @click="showFilter()"
                    class="button button__main searchbar__top-button"
                  >
                    条件変更
                  </button>
                  <button
                    class="button button__white searchbar__top-button--reset"
                    @click="handleReset"
                  >
                    リセット
                  </button>
                </div>
                <div class="searchbar__top-caution">
                  <a href="https://www.cheer-sec.co.jp/other/app-help/A220.html"
                    >ご注意事項 <img src="/assets/images/question.png" alt="?"
                  /></a>
                  <p>{{ timeByReloadApi }} 現在</p>
                </div>
              </div>
              <div class="searchbar__bottom">
                <div class="searchbar__bottom-flex">
                  <button
                    @click="showFilter()"
                    class="searchbar__bottom-button"
                  >
                    <p class="searchbar__bottom-requirement">
                      銘柄名・銘柄コード
                    </p>
                    <p
                      class="searchbar__bottom-value favorite__bottom-textSearch"
                    >
                      {{ textSearch }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="!getDataBrandJPList[0]"
              class="gird_list_null gird_list_null--deflection"
            >
              <span v-if="textSearch">該当する銘柄はありません。条件を変えて検索してください。</span>
              <span v-else>条件を入力して検索してください。</span>
            </div>
            <div class="grid_list">
              <BrandCartJP
                v-for="(item, i) in this.dataListBrandJP"
                :key="i"
                :id="item.stock_cd"
                :brandName="item.stock_nm"
                :brandCd="[
                  `(${formatStockCd(item.stock_cd)})`,
                  item.exchange_cls_nm,
                ]"
                :stockCd="item.stock_cd"
                :exchangeCls="item.exchange_cls"
                :stockPrice="item.ref_price"
                :ratio="item.day_before_rate"
                :percent="item.day_before_ratio"
                :markupAsk="item.markup_ask"
                :markupBid="item.markup_bid"
                :dividendYield="item.dividend_yield"
                :otcSelectBrandCls="'1'"
                :type="getTypeTransaction"
                :typeTab="1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/jp/brand/index"></script>

<style scoped></style>
