<template>
  <main>
    <ScrollToTopBtn />
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>投資信託</strong></a>
          <div class="topinfo__breadcrumb-img">
            <img src="/assets/images/arrow_gray.png" alt="矢印" />
          </div>
          <a href="/transaction/investment/brand">銘柄一覧</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="brand">
      <div class="wrapper">
        <GirdButton :value="navStock" />
        <h1 class="title" v-if="getStepEditFavoriteIt === 0">
          お気に入り銘柄一覧
        </h1>
        <h1 class="title" v-else>お気に入り編集</h1>
        <div v-if="getStepEditFavoriteIt === 0" class="container card">
          <div class="l_tab_wrapper">
            <div class="favorite">
              <div class="favorite__top">
                <div class="favorite__top-left"></div>
                <a
                  @click="SET_STEP_FAVORITE_IT(1)"
                  class="button button__primary--textcolor favorite__top-edit"
                  >編集</a
                >
              </div>
              <div class="favorite__middle">
                <div class="favorite__top-buttons"></div>
                <div class="favorite__top-caution">
                  <a href="https://www.cheer-sec.co.jp/other/app-help/A230.html"
                    >ご注意事項 <img src="/assets/images/question.png" alt="?"
                  /></a>
                </div>
              </div>
            </div>
            <div class="grid_list">
              <BrandCart
                v-for="(item, index) in getListStockLikeIt"
                :key="index"
                :fund_type_list="item.fund_type_list"
                :fund_abb_nm="item.fund_abb_nm"
                :fund_type_nm="item.fund_type_nm"
                :fund_attr_cls_nm="item.fund_attr_cls_nm"
                :price="item.price"
                :day_before_ratio="item.day_before_ratio"
                :brand="item"
                :inv_trust_assoc_cd="item.inv_trust_assoc_cd"
                :fund_nicknm="item.fund_nickname || item.fund_nicknm"
              />
            </div>
            <div
              v-if="!getListStockLikeIt[0]"
              class="gird_list_null gird_list_null--center"
            >
              <span>お気に入りに登録されている銘柄はございません。</span>
            </div>
          </div>
        </div>
        <EditIt v-if="getStepEditFavoriteIt === 1" />
        <AddIt v-if="getStepEditFavoriteIt === 2" />
        <DeleteIt v-if="getStepEditFavoriteIt === 3" />
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/investment/brand/favoriteIt"></script>

<style scoped></style>
