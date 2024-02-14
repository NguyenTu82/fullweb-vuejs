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
        <a href="">商品等に関する広告メールの変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">商品等に関する広告メールの変更</h1>
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
                    <p>現在の商品等に関する広告メール</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-value">
                      <p>{{ showText }}</p>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しい商品等に関する広告メール</p>
                  </div>
                  <div class="table__box-value">
                    <p class="settings__table-text--nospace">
                      当社からの商品等に関する広告メールを受け取りますか。
                    </p>
                    <p class="settings__table-text">
                      ※手続・取引関連の重要なメールは、本設定に関わらずお送りいたします
                    </p>
                    <div class="settings__table-input-buttons">
                      <button
                        :class="
                          formData.MAIL_INFO_FLG === 1
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="isYes"
                      >
                        受け取る
                      </button>
                      <button
                        :class="
                          formData.MAIL_INFO_FLG === 0
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="isNo"
                      >
                        受け取らない
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
import mail from "@/assets/js/page/settings/account/mail";
export default mail;
</script>

<style></style>
