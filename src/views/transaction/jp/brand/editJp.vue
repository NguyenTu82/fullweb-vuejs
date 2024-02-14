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
        <h1 class="title">お気に入り編集</h1>
        <div class="container card" v-if="getStepEditFavoriteJp === 0">
          <div class="l_tab_wrapper">
            <div class="favorite">
              <div class="favorite__top">
                <div class="favorite__top-left">
                  <img src="/assets/images/pen.png" alt="pen" />
                  <p>お気に入り編集</p>
                  <p class="favorite__top--saved">25銘柄まで登録可能</p>
                </div>
                <a
                  @click="handleSubmit"
                  class="button button__primary--reverse favorite__top-edit"
                >
                  編集完了
                </a>
              </div>
              <div class="favorite__middle">
                <div class="favorite__top-buttons"></div>
                <div class="favorite__top-caution">
                  <a href="https://www.cheer-sec.co.jp/other/app-help/A220.html"
                    >ご注意事項 <img src="/assets/images/question.png" alt="?"
                  /></a>
                  <p>{{ getReloadTime() }}現在</p>
                </div>
              </div>
              <div class="favorite__select">
                <a
                  @click="handleRedirect(1)"
                  class="button favorite__select-button button__main"
                >
                  銘柄を追加する
                </a>
                <a
                  @click="handleRedirect(2)"
                  :class="[
                    'button favorite__select-button button__white',
                    !getBrandFavoritesJpList[0]
                      ? 'favorite__select--disabled'
                      : '',
                  ]"
                >
                  銘柄を削除する
                </a>
              </div>
            </div>
            <div
              v-show="!getBrandFavoritesJpList[0]"
              class="gird_list_null gird_list_null--deflection"
            >
              <span>お気に入りに登録されている銘柄はございません。</span>
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
                :ratio="item.day_before_rate"
                :percent="item.day_before_ratio"
                :markupAsk="item.markup_ask"
                :markupBid="item.markup_bid"
                :dividendYield="item.dividend_yield"
                :otcSelectBrandCls="'1'"
                :type="getTypeTransaction"
              />
            </div>
          </div>
        </div>
        <AddFavoritesJp v-if="getStepEditFavoriteJp === 1" />
        <DeleteFavoritesJp v-if="getStepEditFavoriteJp === 2" />
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/jp/brand/editJp"></script>

<style scoped></style>
