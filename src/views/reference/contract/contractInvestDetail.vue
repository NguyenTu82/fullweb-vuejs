<style>
/* pageFullScreen在index.css */
#xxxFullScreen {
  background-color: #eee;
}
</style>
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
        <a href="/reference/contract/jp/"><strong>約定一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/contract/investment/"><strong>投資信託</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">銘柄名が入ります</a>
      </nav>
    </TopInfo>

    <section class="reference_order">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link to="/reference/condition" class="button__square"
            >資産状況</router-link
          >
          <router-link to="/reference/order/jp" class="button__square"
            >注文一覧</router-link
          >
          <router-link to="/reference/contract/jp" class="button__square--selected"
            >約定一覧</router-link
          >
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減</router-link
          >
        </div>
        <h1 class="title">約定明細</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <!-- detailクラスはtypographyに記載 -->
            <div class="reference_order__title">
              <h2 class="detail__title">
                {{ currentData.fund_abb_nm }}
                <span v-if="currentData.fund_nickname"
                  >({{ currentData.fund_nickname }})</span
                >
              </h2>
              <div class="reference_order__title-buttons">
                <a class="button button__main"  style="cursor:pointer;"
                    @click="
                              toStockDetail(
                                currentData.inv_trust_assoc_cd,
                              )
                              "> 銘柄情報 </a>
              </div>
            </div>
            <div class="reference_order__tags--between">
              <div class="reference_order__tags">
                <p class="tag">{{ currentData.dividend_handling_cls_nm }}</p>
                <p class="tag" v-if="currentData.fund_attr_cls != 1">
                  {{ currentData.fund_attr_cls_nm }}
                </p>
                <p
                  class="tag"
                  v-for="(item, index) in currentData.fund_type_list"
                  :key="index"
                >
                  {{ item.fund_type_nm }}
                </p>
              </div>
              <div class="reference_order__tags">
                <p class="color_tag--main">約定</p>
                <p
                  :class="{
                    'color_tag--sold': currentData.buy_sell_cls == 1,
                    'color_tag--secondary': currentData.buy_sell_cls == 3,
                  }"
                >
                  {{ currentData.buy_sell_cls_nm }}
                </p>
              </div>
            </div>
            <div class="reference_order__table card card--sphidden">
              <div class="table">
                <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                <list-page
                  :data="infors"
                  :url="HELPGAINLOSS"
                />
                <p class="reference_order__table-emphasis"></p>
              </div>
              <a @click="goBack" class="button button__white button__medium"
                >約定一覧へ</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import contractInvestDetail from "@/assets/js/page/reference/contract/contractInvestDetail";
export default contractInvestDetail;
</script>
