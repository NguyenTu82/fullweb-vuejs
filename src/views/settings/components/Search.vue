<template>
  <section class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2 class="modal__text">{{ searchTitle }}検索</h2>
        <div
          class="modal_tips_title"
          v-show="searchTitle == '郵便番号' && !postFlag"
        >
          以下は検索された住所です。
        </div>
        <div class="modal_tips_con" v-show="searchTitle == '上場企業名'">
          「株式会社」等を除いた会社名を入力してください。
        </div>
        <div class="modal__search" v-if="!postFlag">
          <input
            type="text"
            v-model="searchVal"
            @input="search"
            :placeholder="`${searchTitle}を入力してください`"
            v-show="searchTitle != '郵便番号'"
          />
          <div class="modal__search-list">
            <a
              href="javascript:;"
              :class="isColor === index ? 'bgColor' : ''"
              v-for="(item, index) in enterpriseData"
              :key="index"
              @click="selected(item, index)"
              >{{
                item.COMPANY_NAME ||
                item.WITHDRAW_FACIL_NAME ||
                item.WITHDRAW_SUB_NAME ||
                item.address1 + item.address2 + item.address3
              }}</a
            >
          </div>
        </div>

        <div v-else class="tips">
          入力した郵便番号に該当する住所がありません。「閉じる」ボタンを押して再度入力・住所検索をしてください。住所候補が表示されない場合は、住所を手入力してください
        </div>

        <div class="modal__buttons">
          <a
            href="javascript:;"
            class="button button__white button__medium"
            @click="searchCancel"
          >
            {{ postFlag ? "閉じる" : "キャンセル" }}
          </a>
          <a
            v-show="!postFlag"
            href="javascript:;"
            :class="[
              { disable: !btnFlag },
              'button button__main button__medium',
            ]"
            @click="btnOK"
          >
            選択する
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import search from "@/assets/js/page/settings/components/search";
export default search;
</script>

<style></style>
