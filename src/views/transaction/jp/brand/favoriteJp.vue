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
    <section class="brand">
      <div class="wrapper">
        <GirdButton :value="navSlock" />
        <h1 class="title">お気に入り銘柄一覧</h1>
        <div class="container card">
          <div class="tabs two_columns--small brand__tab">
            <a
              @click="changeTab(2)"
              :class="[
                getTypeTransaction == 2 ? 'tabs__item--selected' : 'tabs__item',
              ]"
            >
              委託取引
            </a>
            <a
              @click="changeTab(1)"
              :class="[
                getTypeTransaction == 1 ? 'tabs__item--selected' : 'tabs__item',
              ]"
            >
              店頭取引
            </a>
          </div>
          <div class="l_tab_wrapper">
            <div class="favorite">
              <div class="favorite__top">
                <div class="favorite__top-left"></div>
                <router-link
                  to="/transaction/jp/brand/edit"
                  class="button button__primary--textcolor favorite__top-edit"
                  >編集
                </router-link>
              </div>
              <div class="favorite__middle">
                <div class="favorite__top-buttons"></div>
                <div class="favorite__top-caution">
                  <a
                    href="https://www.cheer-sec.co.jp/other/app-help/A220.html"
                  >
                    ご注意事項
                    <img src="/assets/images/question.png" alt="?"
                  /></a>
                  <p>{{ getReloadTime() }}現在</p>
                </div>
              </div>
            </div>
            <div
              v-show="showTextNull()"
              class="gird_list_null gird_list_null--deflection"
            >
              <p>お気に入りに登録されている銘柄はございません。</p>
            </div>
            <div class="grid_list">
              <BrandCartJP
                v-for="(item, i) in getBrandFavoritesJpList"
                :key="i"
                :id="item.stock_cd"
                :brandName="item.stock_nm"
                :brandCd="[
                  `(${formatStockCd(item.stock_cd)})`,
                  item.exchange_cls_nm,
                ]"
                :stockCd="item.stock_cd"
                :exchangeCls="item.exchange_cls"
                :stockPrice="item.price"
                :ratio="item.day_before_rate || 0"
                :percent="item.day_before_ratio || 0"
                :markupAsk="item.markup_ask || 0"
                :markupBid="item.markup_bid || 0"
                :dividendYield="item.dividend_yield || 0"
                :otcSelectBrandCls="item.otc_select_brand_cls"
                :type="getTypeTransaction"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/jp/brand/favoriteJp"></script>

<style scoped></style>
