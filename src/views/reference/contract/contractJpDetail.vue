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
        <a href="/reference/contract/jp/"><strong>国内株式</strong></a>
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
            >資産状況
          </router-link>
          <router-link to="/reference/order/jp" class="button__square"
            >注文一覧
          </router-link>
          <router-link to="/reference/contract/jp" class="button__square--selected"
            >約定一覧
          </router-link>
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減
          </router-link>
        </div>
        <h1 class="title">約定明細</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <!-- detailクラスはtypographyに記載 -->
            <div class="reference_order__title">
              <h2 class="detail__title">{{ currentData.stock_nm }}</h2>
              <div class="reference_order__title-buttons">
                <a class="button button__main"  style="cursor:pointer;"
                    @click="
                              toStockDetail(
                                currentData.stock_cd,
                                currentData.exchange_cls,
                              )
                              "> 銘柄情報 </a>
              </div>
            </div>
            <div class="reference_order__tags" style="color: #7a7a7a">
              <h3>
                {{
                  currentData.stock_cd &&
                  currentData.stock_cd.toString()[
                    currentData.stock_cd.toString().length - 1
                  ] === "0"
                    ? `(${currentData.stock_cd.toString().slice(0, -1)})`
                    : `(${currentData.stock_cd})`
                }}
                <template v-if="currentData.otc_consign_cls == 2">
                  / {{ currentData.exchange_cls_nm }}
                </template>
              </h3>
            </div>
            <div class="reference_order__tags">
              <p class="color_tag--main">{{ orderStatusDisplay }}</p>
              <p
                :class="{
                  'color_tag--secondary': currentData.buy_sell_cls == 3,
                  'color_tag--primary': currentData.buy_sell_cls == 1,
                }"
              >
                {{ currentData.buy_sell_nm }}
              </p>
            </div>
            <div class="reference_order__table card card--sphidden">
              <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
              <div class="table">
                <list-page
                  :data="infors"
                  :url="HELPGAINLOSS"
                />
                <p
                  class="reference_order__table-emphasis"
                  v-if="currentData.otc_consign_cls == 2"
                >
                  注文内容
                </p>
                <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                <list-page
                  :data="infors2"
                  :failed="[3, 5].includes(currentData.ORDER_STATUS)"
                  :url="HELPGAINLOSS"
                />
              </div>
              <a class="button button__white button__medium" @click="goBack"
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
import contractJpDetail from "@/assets/js/page/reference/contract/contractJpDetail";

export default contractJpDetail;
</script>
