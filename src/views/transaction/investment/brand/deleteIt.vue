<template>
  <div class="container card">
    <ModalConfirm
      v-if="getShowModalConfirm"
      :content="contentModal"
      v-on:handleConfirm="handleConfirm"
    />
    <div class="l_tab_wrapper">
      <div class="favorite">
        <div class="favorite__top">
          <div class="favorite__top-left">
            <img src="/assets/images/pen.png" alt="pen" />
            <p>お気に入り編集</p>
            <p v-show="getListStockLikeIt[0]" class="favorite__top--saved">
              25 銘柄まで登録可能
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
          </div>
        </div>
      </div>
      <div class="favorite__select">
        <button
          @click="handleSelectAll"
          class="button favorite__select-button--all button__white"
        >
          {{ isShowTextSelectAll ? "すべて解除" : "すべて選択" }}
        </button>
        <a
          @click="handleRedirect(0, 'DELETE')"
          :class="[
            'button favorite__select-button button__main',
            !selectedBeforeConfirm[0] ? 'favorite__select--disabled' : '',
          ]"
        >
          選択した銘柄を削除
        </a>
      </div>
      <div class="grid_list">
        <BrandCart
          v-for="(item, index) in getListStockLikeIt"
          :key="index"
          :fund_type_list="item.fund_type_list"
          :fund_abb_nm="item.fund_abb_nm"
          :fund_type_nm="item.fund_type_nm"
          :price="item.price"
          :fund_attr_cls_nm="item.fund_attr_cls_nm"
          :day_before_ratio="item.day_before_ratio"
          :brand="item"
          :isSelected="isSelected(item)"
          :fund_nicknm="item.fund_nickname || item.fund_nicknm"
          @click="handleSelect(item)"
        />
      </div>
      <div
        v-if="!getListStockLikeIt[0]"
        class="gird_list_null gird_list_null--center"
      >
        <span>条件を変えて検索してください。</span>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/transaction/investment/brand/deleteIt"></script>

<style scoped></style>
