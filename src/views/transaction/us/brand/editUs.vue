<template>
  <div class="container card">
    <div class="l_tab_wrapper">
      <div class="favorite">
        <div class="favorite__top">
          <div class="favorite__top-left">
            <img src="/assets/images/pen.png" alt="pen" />
            <p>お気に入り編集</p>
            <p v-show="getStockLikeUs[0]" class="favorite__top--saved">
              25銘柄まで登録可能
            </p>
          </div>
          <div class="favorite__top-buttons">
            <a
              @click="handleRedirect(0)"
              class="button button__primary--reverse favorite__top-edit"
              >編集完了</a
            >
          </div>
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
      <div class="favorite__select">
        <a
          @click="handelAddFavorite(2)"
          class="button favorite__select-button button__main"
        >
          銘柄を追加する
        </a>
        <a
          @click="handelAddFavorite(3)"
          :class="[
            'button favorite__select-button button__white',
            !getStockLikeUs[0] ? 'favorite__select--disabled' : '',
          ]"
        >
          銘柄を削除する
        </a>
      </div>
      <div class="grid_list">
        <BrandCart
          v-for="(item, index) in getStockLikeUs"
          :key="index"
          :brandName="item.BRAND_NM_DISP"
          :brandCd="[item.BRAND_CD, item.MARKET_NM]"
          :buyPrice="item.PRICE.BUY_PRICE"
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
</template>

<script src="@/assets/js/page/transaction/us/brand/editUs"></script>

<style scoped></style>
