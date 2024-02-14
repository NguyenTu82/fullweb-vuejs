<template lang="html">
  <div class="container card">
    <FilterCart
      v-on:handleSearch="handleSearch"
      v-show="isShowFilter"
      ref="FilterCart"
    />
    <ModalConfirm
      v-if="isTextError"
      :message="'お気に入り銘柄は最大25銘柄まで指定可能です。数量を確認し、再度お試し下さい。'"
      v-on:handleConfirm="handleConfirm"
    />
    <div class="l_tab_wrapper">
      <div class="favorite">
        <div class="favorite__top">
          <div class="favorite__top-left">
            <img src="/assets/images/pen.png" alt="pen" />
            <p>お気に入り編集</p>
            <p class="favorite__top--saved">25銘柄まで登録可能</p>
          </div>
          <div class="favorite__top-buttons">
            <a
              @click="handleSubmit"
              class="button button__primary--reverse favorite__top-edit"
              >編集完了</a
            >
          </div>
        </div>
        <div class="favorite__middle">
          <div class="favorite__top-buttons">
            <button
              @click="showFilter()"
              class="button button__main favorite__top-button"
            >
              条件変更
            </button>
            <button
              @click="handleReset()"
              class="button button__white favorite__top-button--reset"
            >
              リセット
            </button>
          </div>
          <div class="favorite__top-caution">
            <a href="https://www.cheer-sec.co.jp/other/app-help/A220.html"
              >ご注意事項 <img src="/assets/images/question.png" alt="?"
            /></a>
            <p>{{ timeByReloadApi }}現在</p>
          </div>
        </div>
        <div class="favorite__bottom">
          <div class="favorite__bottom-flex">
            <button @click="showFilter()" class="favorite__bottom-button">
              <p class="favorite__bottom-requirement">銘柄名・銘柄コード</p>
              <p class="favorite__bottom-value favorite__bottom-textSearch">
                {{ textSearch }}
              </p>
            </button>
          </div>
        </div>
        <div class="favorite__select">
          <button
            @click="handleSelectAll()"
            class="button favorite__select-button--all button__white"
          >
            {{ isShowTextSelectAll ? "すべて解除" : "すべて選択" }}
          </button>
          <a
            @click="handleRedirectTo(0, 'ADD')"
            :class="[
              'button favorite__select-button button__main',
              !listSelectedJP[0] ? 'favorite__select--disabled' : '',
            ]"
          >
            選択した銘柄を追加
          </a>
        </div>
        <div
          v-show="showTextNull || !getBrandNotFavoritesJp[0]"
          class="gird_list_null gird_list_null--deflection"
        >
          <span v-show="textSearch">該当する銘柄はありません。</span>
          <span>条件を変えて検索してください。</span>
        </div>
        <div class="grid_list">
          <BrandCartJP
            v-for="(item, i) in listNotFavoriteJP"
            :key="i"
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
            :type="getTypeTransaction"
            :isSelected="isSelected(item)"
            :otcSelectBrandCls="'1'"
            @click="handleSelectJP(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/transaction/jp/brand/addJp"></script>

<style scoped></style>
