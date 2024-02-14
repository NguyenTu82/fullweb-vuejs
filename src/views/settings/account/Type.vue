<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/account/"><strong>口座情報</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">ご希望の取引種類の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">ご希望の取引種類の変更</h1>
        <div class="container card">
          <div class="card__help">
            <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
            <a
              :href="HELPACCOUNT"
              target="_blank"
              >本画面のヘルプ
              <img src="/assets/images/question.png" alt="" />
            </a>
          </div>
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>現在のご希望の取引種類</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-value">
                      <p>{{ oldType }}</p>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しいご希望の取引種類</p>
                  </div>
                  <div class="table__box-value">
                    <p class="settings__table-text--nospace">
                      ご希望の取引種類を選択してください
                    </p>
                    <div class="settings__table-input-buttons">
                      <button
                        v-for="item in typesData"
                        :key="item.id"
                        :class="
                          item.ischeck
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="checked(item.id)"
                      >
                        {{ item.title }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings__confirm">
                <a
                  href="javascript:;"
                  @click="$router.back()"
                  class="button button__white button__medium"
                  >キャンセル</a
                >
                <a
                  href="javascript:;"
                  :class="[
                    { disable: !btnFlag },
                    'button button__main button__medium',
                  ]"
                  @click="change"
                  >変更する</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <dialog-pwd
    v-if="showDialog"
    :formData="formData"
    :API="API"
    @btnCancel="cancel"
  ></dialog-pwd>
</template>

<script>
import type1 from "@/assets/js/page/settings/account/type";
export default type1;
</script>

<style></style>
