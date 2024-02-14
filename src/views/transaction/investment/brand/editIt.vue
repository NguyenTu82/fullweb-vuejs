<template>
  <div class="container card">
    <div class="l_tab_wrapper">
      <div class="favorite">
        <div class="favorite__top">
          <div class="favorite__top-left">
            <img src="/assets/images/pen.png" alt="pen" />
            <p>お気に入り編集</p>
            <p v-show="getListStockLikeIt[0]" class="favorite__top--saved">
              25銘柄まで登録可能
            </p>
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
          <div class="favorite__top-buttons"></div>
          <div class="favorite__top-caution">
            <a href="https://www.cheer-sec.co.jp/other/app-help/A230.html"
              >ご注意事項 <img src="/assets/images/question.png" alt="?"
            /></a>
          </div>
        </div>
      </div>
      <div class="favorite__select">
        <a
          @click="redirectTo(2)"
          class="button favorite__select-button button__main"
        >
          銘柄を追加する
        </a>
        <a
          @click="redirectTo(3)"
          :class="[
            'button favorite__select-button button__white',
            !getListStockLikeIt[0] ? 'favorite__select--disabled' : '',
          ]"
        >
          銘柄を削除する
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
          :inv_trust_assoc_cd="item.inv_trust_assoc_cd"
          :fund_nicknm="item.fund_nickname || item.fund_nicknm"
          :brand="item"
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
</template>

<script src="@/assets/js/page/transaction/investment/brand/editIt"></script>

<style scoped></style>
