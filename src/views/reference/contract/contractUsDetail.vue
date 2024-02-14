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
        <a href="/reference/contract/us/"><strong>約定一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/contract/us/"><strong>米国株式</strong></a>
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
              <h2 class="detail__title">{{ info.stock }}</h2>
              <div class="reference_order__title-buttons">
                <a class="button button__main"  style="cursor:pointer;"
                    @click="
                            toStockDetail(
                              currentData.BRAND_ID,
                            )
                            "> 銘柄情報 </a>                
              </div>
            </div>
            <p class="detail__exchange">{{ info.company }}</p>
            <div class="reference_order__tags">
              <p
                class="color_tag--main"
                v-if="
                  [0, 1, 2, 3, 4, 5, 11, 12].includes(currentData.ORDER_STATUS)
                "
              >
                {{ currentData.ORDER_STATUS_DISP }}
              </p>
              <p
                :class="{
                  'color_tag--secondary': currentData.TRADE_TYPE == 1,
                  'color_tag--primary': currentData.TRADE_TYPE == 3 || currentData.TRADE_TYPE == 2,
                }"
                v-if="
                  currentData.TRADE_TYPE === 2 || currentData.TRADE_TYPE === 1
                "
              >
                {{ tradeTypeBox[currentData.TRADE_TYPE] }}
              </p>
            </div>
            <div class="reference_order__table card card--sphidden">
              <div class="table">
                <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                <list-page
                  :data="infos"
                  :url="HELPGAINLOSS"
                />
                <p class="reference_order__table-emphasis"></p>
                <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                <list-page
                  :data="infos2"
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
import contractUsDetail from "@/assets/js/page/reference/contract/contractUsDetail";

export default contractUsDetail;
</script>
