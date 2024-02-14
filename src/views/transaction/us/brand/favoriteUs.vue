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
          <a href="/transaction/us/brand/favorite">取扱銘柄一覧</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="brand">
      <div class="wrapper">
        <GirdButton :value="navStock" />
        <h1 class="title">
          {{
            getStepEditFavorite == 0 ? "お気に入り銘柄一覧" : "お気に入り編集"
          }}
        </h1>
        <div v-if="getStepEditFavorite == 0" class="container card">
          <div class="l_tab_wrapper">
            <div class="favorite">
              <div class="favorite__top">
                <div class="favorite__top-left"></div>
                <a
                  @click="SET_STEP_EDIT_FAVORITE(1)"
                  class="button button__primary--textcolor favorite__top-edit"
                  >編集</a
                >
              </div>
              <div class="favorite__middle">
                <div class="favorite__top-buttons"></div>
                <div class="favorite__top-caution">
                  <a href="https://www.cheer-sec.co.jp/other/app-help/A210.html"
                    >ご注意事項 <img src="/assets/images/question.png" alt="?"
                  /></a>
                  <p>{{ getReloadTime() }}現在</p>
                </div>
              </div>
            </div>
            <div class="grid_list">
              <BrandCart
                v-for="(item, index) in getStockLikeUs"
                :key="index"
                :brandName="item.BRAND_NM_DISP"
                :brandCd="[item.BRAND_CD, item.MARKET_NM]"
                :buyPrice="item.PRICE.BUY_PRICE || ''"
                :sellPrice="item.PRICE.SELL_PRICE"
                :percent="item.EX_DIVIDEND_YIELD"
                :id="item.BRAND_ID"
              />
            </div>
            <div
              v-if="!getStockLikeUs[0]"
              class="gird_list_null gird_list_null--center"
            >
              <span>お気に入りに登録されている銘柄はございません。</span>
            </div>
          </div>
        </div>
        <EditFavorites v-if="getStepEditFavorite == 1" />
        <AddFavorite v-if="getStepEditFavorite == 2" />
        <DeleteFavorite v-if="getStepEditFavorite == 3" />
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/us/brand/favoriteUs"></script>

<style scoped></style>
